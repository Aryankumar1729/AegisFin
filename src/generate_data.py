"""
AegisFin Data Synthesis Engine
------------------------------
Generates high-fidelity commercial banking transaction records modeled after
multi-city retail banking datasets for ETL pipeline testing and validation.
"""

import csv
import random
import os
from datetime import datetime, timedelta
from typing import List, Dict, Any

class BankingDataGenerator:
    """Synthetic transaction generator simulating realistic Indian banking distributions."""
    
    METRO_CLUSTERS = [
        ("MUMBAI", 0.18), ("BANGALORE", 0.14), ("NEW DELHI", 0.12), ("HYDERABAD", 0.10),
        ("PUNE", 0.08), ("CHENNAI", 0.08), ("KOLKATA", 0.06), ("GURGAON", 0.05),
        ("THANE", 0.04), ("NOIDA", 0.04), ("AHMEDABAD", 0.03), ("SURAT", 0.02),
        ("LUCKNOW", 0.02), ("JAIPUR", 0.02), ("PATNA", 0.01), ("INDORE", 0.01)
    ]
    
    GENDER_DIST = [("M", 0.72), ("F", 0.27), ("", 0.01)]

    def __init__(self, raw_path: str = "data/raw/Bank_Transactions.csv"):
        self.raw_path = raw_path
        os.makedirs(os.path.dirname(self.raw_path), exist_ok=True)

    def generate_customer_pool(self, num_customers: int) -> List[Dict[str, Any]]:
        cities = [c[0] for c in self.METRO_CLUSTERS]
        city_weights = [c[1] for c in self.METRO_CLUSTERS]
        genders = [g[0] for g in self.GENDER_DIST]
        gender_weights = [g[1] for g in self.GENDER_DIST]

        customers = []
        for i in range(1, num_customers + 1):
            cust_id = f"C{1000000 + i}"
            
            # Anomaly injection for testing data cleaning: placeholder DOBs (1/1/1800)
            rand_val = random.random()
            if rand_val < 0.07:
                dob = "1/1/1800"
            elif rand_val < 0.09:
                dob = ""
            else:
                age = random.randint(19, 68)
                birth_year = 2016 - age
                dob = f"{random.randint(1, 28)}/{random.randint(1, 12)}/{birth_year}"

            gender = random.choices(genders, weights=gender_weights)[0]
            loc = random.choices(cities, weights=city_weights)[0]
            
            # Whitespace and casing noise
            if random.random() < 0.04:
                loc = loc.lower()
            elif random.random() < 0.02:
                loc = f"  {loc} "

            customers.append({
                "cust_id": cust_id,
                "dob": dob,
                "gender": gender,
                "location": loc,
                "base_balance": round(random.lognormvariate(9.5, 1.2), 2)
            })
        return customers

    def generate_dataset(self, num_customers: int = 50000, total_transactions: int = 100000):
        print(f"[AegisFin] Synthesizing {total_transactions:,} transactions across {num_customers:,} accounts...")
        customer_pool = self.generate_customer_pool(num_customers)
        
        start_date = datetime(2016, 8, 1)
        end_date = datetime(2016, 10, 31)
        date_span_days = (end_date - start_date).days

        with open(self.raw_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "TransactionID", "CustomerID", "CustomerDOB", "CustGender",
                "CustLocation", "CustAccountBalance", "TransactionDate",
                "TransactionTime", "TransactionAmount (INR)"
            ])

            for idx in range(1, total_transactions + 1):
                tx_id = f"TX_{idx:08d}"
                cust = random.choice(customer_pool)
                
                tx_day = start_date + timedelta(days=random.randint(0, date_span_days))
                tx_date_str = f"{tx_day.day}/{tx_day.month}/{str(tx_day.year)[-2:]}"
                
                # Integer format HHMMSS
                tx_time_int = random.randint(0, 23) * 10000 + random.randint(0, 59) * 100 + random.randint(0, 59)
                
                # Pareto distributed spend amount
                amount = round(random.lognormvariate(6.2, 1.15), 2)
                amount = max(10.0, min(amount, 500000.0))
                
                balance = max(0.0, round(cust["base_balance"] + random.uniform(-1500, 4500), 2))

                writer.writerow([
                    tx_id, cust["cust_id"], cust["dob"], cust["gender"],
                    cust["location"], f"{balance:.2f}", tx_date_str,
                    tx_time_int, f"{amount:.2f}"
                ])

        print(f"[AegisFin] Successfully generated raw dataset at: {self.raw_path}")

def main():
    generator = BankingDataGenerator()
    generator.generate_dataset(num_customers=50000, total_transactions=100000)

if __name__ == "__main__":
    main()

