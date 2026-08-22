"""
AegisFin Banking ETL & Normalization Pipeline
---------------------------------------------
Performs high-integrity ingestion, schema validation, temporal formatting,
demographic imputation, and relational decomposition of banking transactions.
"""

import csv
import os
from datetime import datetime
from typing import Dict, Tuple, Optional, Any, List

class BankingETLPipeline:
    """Enterprise ETL orchestrator for processing raw retail banking transaction logs."""

    def __init__(self, raw_path: str = "data/raw/Bank_Transactions.csv", processed_dir: str = "data/processed"):
        self.raw_path = raw_path
        self.processed_dir = processed_dir
        os.makedirs(self.processed_dir, exist_ok=True)
        
        self.metrics = {
            "total_raw_records": 0,
            "valid_transactions": 0,
            "unique_customer_profiles": 0,
            "valid_dobs": 0,
            "imputed_dobs": 0,
            "normalized_locations": 0,
            "missing_gender_count": 0,
            "median_imputed_age": 31
        }

    @staticmethod
    def parse_customer_dob(dob_str: Optional[str]) -> Tuple[Optional[str], Optional[int], bool]:
        """
        Parses date-of-birth strings while handling invalid historical placeholders (e.g. 1/1/1800).
        Returns: (iso_dob_string, calculated_age_in_2016, is_valid_boolean)
        """
        if not dob_str or not dob_str.strip():
            return None, None, False
        
        cleaned = dob_str.strip()
        if "1800" in cleaned or cleaned == "1/1/1800":
            return None, None, False

        parts = cleaned.split("/")
        if len(parts) == 3:
            try:
                day, month, year = int(parts[0]), int(parts[1]), int(parts[2])
                if year < 100:
                    year += 1900 if year > 16 else 2000
                dob_dt = datetime(year, month, day)
                age = 2016 - year
                if 12 <= age <= 100:
                    return dob_dt.strftime("%Y-%m-%d"), age, True
            except ValueError:
                pass
        return None, None, False

    @staticmethod
    def parse_iso_date(date_str: Optional[str]) -> Optional[str]:
        """Converts heterogeneous date formats (D/M/YY or DD/MM/YYYY) to standard ISO-8601 (YYYY-MM-DD)."""
        if not date_str or not date_str.strip():
            return None
        parts = date_str.strip().split("/")
        if len(parts) == 3:
            try:
                d, m, y = int(parts[0]), int(parts[1]), int(parts[2])
                if y < 100:
                    y += 2000
                return datetime(y, m, d).strftime("%Y-%m-%d")
            except ValueError:
                pass
        return None

    @staticmethod
    def format_iso_time(time_val: Any) -> str:
        """Formats integer timestamps (e.g. 213015) into ISO-8601 time string (21:30:15)."""
        try:
            val_str = str(int(float(time_val))).zfill(6)
            return f"{val_str[:2]}:{val_str[2:4]}:{val_str[4:6]}"
        except (ValueError, TypeError):
            return "12:00:00"

    def execute_pipeline(self):
        print("[AegisFin ETL] Commencing data ingestion & decomposition pipeline...")
        
        customer_index: Dict[str, Dict[str, Any]] = {}
        transaction_records: List[Dict[str, Any]] = []

        with open(self.raw_path, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                self.metrics["total_raw_records"] += 1
                
                tx_id = row["TransactionID"].strip()
                cust_id = row["CustomerID"].strip()
                raw_dob = row.get("CustomerDOB", "")
                raw_gender = (row.get("CustGender") or "UNKNOWN").strip().upper()
                raw_location = (row.get("CustLocation") or "UNKNOWN").strip().upper()
                raw_balance = float(row["CustAccountBalance"]) if row.get("CustAccountBalance") else 0.0
                raw_date = row.get("TransactionDate", "")
                raw_time = row.get("TransactionTime", 0)
                raw_amount = float(row["TransactionAmount (INR)"]) if row.get("TransactionAmount (INR)") else 0.0

                # 1. Demographic Scrubbing
                dob_iso, calculated_age, is_dob_valid = self.parse_customer_dob(raw_dob)
                if is_dob_valid:
                    self.metrics["valid_dobs"] += 1
                else:
                    self.metrics["imputed_dobs"] += 1

                gender = raw_gender if raw_gender in ["M", "F"] else "UNKNOWN"
                if gender == "UNKNOWN":
                    self.metrics["missing_gender_count"] += 1

                location = raw_location if raw_location else "UNKNOWN"
                self.metrics["normalized_locations"] += 1

                # 2. Date & Time Transformation
                iso_date = self.parse_iso_date(raw_date)
                if not iso_date:
                    continue
                
                iso_time = self.format_iso_time(raw_time)
                month_key = iso_date[:7]

                self.metrics["valid_transactions"] += 1

                # 3. Customer Dimension Ingestion
                if cust_id not in customer_index:
                    customer_index[cust_id] = {
                        "customer_id": cust_id,
                        "dob": dob_iso,
                        "age": calculated_age,
                        "gender": gender,
                        "location": location,
                        "account_balance": raw_balance,
                        "tx_count": 0,
                        "total_spend": 0.0
                    }

                profile = customer_index[cust_id]
                profile["tx_count"] += 1
                profile["total_spend"] += raw_amount
                profile["account_balance"] = raw_balance
                if calculated_age and not profile["age"]:
                    profile["age"] = calculated_age
                    profile["dob"] = dob_iso
                if gender != "UNKNOWN" and profile["gender"] == "UNKNOWN":
                    profile["gender"] = gender
                if location != "UNKNOWN" and profile["location"] == "UNKNOWN":
                    profile["location"] = location

                # 4. Fact Transaction Record
                transaction_records.append({
                    "transaction_id": tx_id,
                    "customer_id": cust_id,
                    "transaction_date": iso_date,
                    "transaction_time": iso_time,
                    "transaction_amount": raw_amount,
                    "account_balance": raw_balance,
                    "location": location,
                    "month": month_key
                })

        self.metrics["unique_customer_profiles"] = len(customer_index)

        # Median age imputation for records without valid DOB
        valid_ages = [c["age"] for c in customer_index.values() if c["age"] is not None]
        median_age = int(sorted(valid_ages)[len(valid_ages) // 2]) if valid_ages else 31
        self.metrics["median_imputed_age"] = median_age

        for profile in customer_index.values():
            profile["age_imputed"] = profile["age"] if profile["age"] is not None else median_age

        # Write Cleaned Transactions Fact Table
        tx_csv_path = os.path.join(self.processed_dir, "transactions_cleaned.csv")
        with open(tx_csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=[
                "transaction_id", "customer_id", "transaction_date", "transaction_time",
                "transaction_amount", "account_balance", "location", "month"
            ])
            writer.writeheader()
            writer.writerows(transaction_records)

        # Write Cleaned Customers Dimension Table
        cust_csv_path = os.path.join(self.processed_dir, "customers_cleaned.csv")
        with open(cust_csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=[
                "customer_id", "dob", "age", "age_imputed", "gender", "location",
                "account_balance", "tx_count", "total_spend"
            ])
            writer.writeheader()
            for c in customer_index.values():
                writer.writerow({
                    "customer_id": c["customer_id"],
                    "dob": c["dob"] or "",
                    "age": c["age"] if c["age"] is not None else "",
                    "age_imputed": c["age_imputed"],
                    "gender": c["gender"],
                    "location": c["location"],
                    "account_balance": f"{c['account_balance']:.2f}",
                    "tx_count": c["tx_count"],
                    "total_spend": f"{c['total_spend']:.2f}"
                })

        print("\n[AegisFin ETL] Execution Summary:")
        print(f" • Ingested Raw Records:       {self.metrics['total_raw_records']:,}")
        print(f" • Valid Output Transactions:   {self.metrics['valid_transactions']:,}")
        print(f" • Unique Customer Entities:    {self.metrics['unique_customer_profiles']:,}")
        print(f" • Cleaned Valid DOBs:          {self.metrics['valid_dobs']:,}")
        print(f" • Imputed Placeholder DOBs:    {self.metrics['imputed_dobs']:,} (Median: {median_age} yrs)")
        print(f" • Processed CSV Directory:     {self.processed_dir}/")

def main():
    pipeline = BankingETLPipeline()
    pipeline.execute_pipeline()

if __name__ == "__main__":
    main()

