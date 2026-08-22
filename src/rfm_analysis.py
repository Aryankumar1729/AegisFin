"""
AegisFin RFM Behavioral Segmentation Engine
--------------------------------------------
Computes Recency, Frequency, and Monetary metrics from normalized banking transactions.
Assigns quintile scores (1 to 5) across each dimension and classifies customers into
actionable commercial business segments.
"""

import csv
import os
from datetime import datetime
from typing import Dict, List, Any

class RFMQuantileEngine:
    """Parametric RFM analytics engine for customer segmentation & value concentration."""

    def __init__(self, 
                 tx_path: str = "data/processed/transactions_cleaned.csv", 
                 output_path: str = "data/processed/customer_rfm.csv",
                 anchor_date: str = "2016-11-01"):
        self.tx_path = tx_path
        self.output_path = output_path
        self.anchor_date = datetime.strptime(anchor_date, "%Y-%m-%d")

    @staticmethod
    def classify_segment(r: int, f: int, m: int) -> str:
        """Rule-based segmentation mapping from 3-digit RFM quintiles."""
        if r >= 4 and f >= 4 and m >= 4:
            return "Champions"
        elif r >= 3 and f >= 3 and m >= 3:
            return "Loyal Customers"
        elif r >= 3 and m >= 4:
            return "Big Spenders"
        elif r >= 4 and f <= 2:
            return "Potential Loyalists"
        elif r <= 2 and f >= 3:
            return "At Risk"
        elif r <= 2 and f <= 2 and m <= 2:
            return "Dormant / Lost"
        return "Low Value / Casual"

    def compute_rfm(self):
        print(f"[AegisFin RFM Engine] Processing transaction data from {self.tx_path}...")
        
        customer_map: Dict[str, Dict[str, Any]] = {}

        with open(self.tx_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                cust_id = row["customer_id"]
                amount = float(row["transaction_amount"])
                tx_date = datetime.strptime(row["transaction_date"], "%Y-%m-%d")
                location = row["location"]

                if cust_id not in customer_map:
                    customer_map[cust_id] = {
                        "customer_id": cust_id,
                        "last_tx_date": tx_date,
                        "frequency": 0,
                        "monetary": 0.0,
                        "location": location
                    }

                record = customer_map[cust_id]
                record["frequency"] += 1
                record["monetary"] += amount
                if tx_date > record["last_tx_date"]:
                    record["last_tx_date"] = tx_date

        rfm_records: List[Dict[str, Any]] = []
        for cust in customer_map.values():
            recency_days = (self.anchor_date - cust["last_tx_date"]).days
            rfm_records.append({
                "customer_id": cust["customer_id"],
                "last_tx_date": cust["last_tx_date"].strftime("%Y-%m-%d"),
                "recency": recency_days,
                "frequency": cust["frequency"],
                "monetary": round(cust["monetary"], 2),
                "location": cust["location"]
            })

        total_customers = len(rfm_records)
        if total_customers == 0:
            print("[AegisFin RFM Engine] No customer records found.")
            return

        # 1. Recency Quintiles (Lower days = higher score 5)
        rfm_records.sort(key=lambda x: x["recency"])
        for i, item in enumerate(rfm_records):
            percentile = i / total_customers
            if percentile < 0.20:
                r_score = 5
            elif percentile < 0.40:
                r_score = 4
            elif percentile < 0.60:
                r_score = 3
            elif percentile < 0.80:
                r_score = 2
            else:
                r_score = 1
            item["r_score"] = r_score

        # 2. Frequency Quintiles (Higher tx count = higher score 5)
        rfm_records.sort(key=lambda x: x["frequency"], reverse=True)
        for i, item in enumerate(rfm_records):
            percentile = i / total_customers
            if percentile < 0.20:
                f_score = 5
            elif percentile < 0.40:
                f_score = 4
            elif percentile < 0.60:
                f_score = 3
            elif percentile < 0.80:
                f_score = 2
            else:
                f_score = 1
            item["f_score"] = f_score

        # 3. Monetary Quintiles (Higher spend = higher score 5)
        rfm_records.sort(key=lambda x: x["monetary"], reverse=True)
        for i, item in enumerate(rfm_records):
            percentile = i / total_customers
            if percentile < 0.20:
                m_score = 5
            elif percentile < 0.40:
                m_score = 4
            elif percentile < 0.60:
                m_score = 3
            elif percentile < 0.80:
                m_score = 2
            else:
                m_score = 1
            item["m_score"] = m_score

        # 4. Composite Score and Classification
        segment_stats: Dict[str, Dict[str, Any]] = {}
        for item in rfm_records:
            r, f, m = item["r_score"], item["f_score"], item["m_score"]
            item["rfm_score"] = f"{r}{f}{m}"
            seg = self.classify_segment(r, f, m)
            item["customer_segment"] = seg
            
            if seg not in segment_stats:
                segment_stats[seg] = {"count": 0, "total_monetary": 0.0}
            segment_stats[seg]["count"] += 1
            segment_stats[seg]["total_monetary"] += item["monetary"]

        # Write to processed output
        with open(self.output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=[
                "customer_id", "last_tx_date", "recency", "frequency", "monetary",
                "r_score", "f_score", "m_score", "rfm_score", "customer_segment", "location"
            ])
            writer.writeheader()
            writer.writerows(rfm_records)

        print("\n[AegisFin RFM Engine] Customer Segmentation Results:")
        print(f" • Total Cohorts Analyzed: {total_customers:,}")
        for seg_name, data in sorted(segment_stats.items(), key=lambda x: x[1]["total_monetary"], reverse=True):
            user_pct = (data["count"] / total_customers) * 100
            print(f"   - {seg_name:<20}: {data['count']:>7,} users ({user_pct:>5.1f}%) | ₹{data['total_monetary']:>12,.2f}")
        print(f" • Segmentation Matrix Output: {self.output_path}")

def main():
    engine = RFMQuantileEngine()
    engine.compute_rfm()

if __name__ == "__main__":
    main()

