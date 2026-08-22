"""
AegisFin Database Engine & SQL Ingestion Manager
------------------------------------------------
Initializes relational analytical tables, executes high-speed bulk ingestion
from processed ETL CSVs, populates aggregated metrics, and establishes composite indexes.
"""

import sqlite3
import csv
import os
from typing import Tuple, List, Any

class AegisDatabaseEngine:
    """Manages SQLite analytical database lifecycle and relational query execution."""

    def __init__(self, db_path: str = "data/aegisfin_analytics.db", processed_dir: str = "data/processed"):
        self.db_path = db_path
        self.processed_dir = processed_dir

    def build_database(self):
        print(f"[AegisFin Database Engine] Initializing database at: {self.db_path}...")
        
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        if os.path.exists(self.db_path):
            os.remove(self.db_path)

        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # 1. DDL Schema Definition
        cursor.executescript("""
        CREATE TABLE customers (
            customer_id VARCHAR(50) PRIMARY KEY,
            dob DATE,
            age INT,
            age_imputed INT,
            gender VARCHAR(10),
            location VARCHAR(100),
            account_balance DECIMAL(15, 2),
            tx_count INT,
            total_spend DECIMAL(15, 2)
        );

        CREATE TABLE transactions (
            transaction_id VARCHAR(50) PRIMARY KEY,
            customer_id VARCHAR(50),
            transaction_date DATE,
            transaction_time TIME,
            transaction_amount DECIMAL(15, 2),
            account_balance DECIMAL(15, 2),
            location VARCHAR(100),
            month VARCHAR(7),
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        );

        CREATE TABLE customer_rfm (
            customer_id VARCHAR(50) PRIMARY KEY,
            last_transaction_date DATE,
            recency INT,
            frequency INT,
            monetary_value DECIMAL(15, 2),
            r_score INT,
            f_score INT,
            m_score INT,
            rfm_score VARCHAR(10),
            customer_segment VARCHAR(50),
            location VARCHAR(100),
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        );

        CREATE TABLE customer_monthly_metrics (
            customer_id VARCHAR(50),
            month VARCHAR(7),
            transaction_count INT,
            total_transaction_value DECIMAL(15, 2),
            average_transaction_value DECIMAL(15, 2),
            active_days INT,
            last_transaction_date DATE,
            PRIMARY KEY (customer_id, month),
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        );
        """)

        # 2. Ingest Customers Dimension
        cust_csv = os.path.join(self.processed_dir, "customers_cleaned.csv")
        if os.path.exists(cust_csv):
            with open(cust_csv, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                cust_rows = []
                for r in reader:
                    dob_val = r.get("dob") or None
                    age_val = int(r["age"]) if r.get("age") and r["age"].strip() else None
                    age_imp = int(r["age_imputed"]) if r.get("age_imputed") and str(r["age_imputed"]).strip() else 31
                    gender_val = r.get("gender") or "UNKNOWN"
                    loc_val = r.get("location") or "UNKNOWN"
                    bal_val = float(r["account_balance"]) if r.get("account_balance") and str(r["account_balance"]).strip() else 0.0
                    tx_cnt = int(r["tx_count"]) if r.get("tx_count") and str(r["tx_count"]).strip() else 0
                    spend_val = float(r["total_spend"]) if r.get("total_spend") and str(r["total_spend"]).strip() else 0.0
                    cust_rows.append((r["customer_id"], dob_val, age_val, age_imp, gender_val, loc_val, bal_val, tx_cnt, spend_val))
                cursor.executemany("INSERT INTO customers VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", cust_rows)

        # 3. Ingest Transactions Fact
        tx_csv = os.path.join(self.processed_dir, "transactions_cleaned.csv")
        if os.path.exists(tx_csv):
            with open(tx_csv, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                tx_rows = []
                for r in reader:
                    amt_val = float(r["transaction_amount"]) if r.get("transaction_amount") and str(r["transaction_amount"]).strip() else 0.0
                    bal_val = float(r["account_balance"]) if r.get("account_balance") and str(r["account_balance"]).strip() else 0.0
                    tx_rows.append((
                        r["transaction_id"], r["customer_id"], r.get("transaction_date"), r.get("transaction_time"),
                        amt_val, bal_val, r.get("location") or "UNKNOWN", r.get("month") or ""
                    ))
                cursor.executemany("INSERT INTO transactions VALUES (?, ?, ?, ?, ?, ?, ?, ?)", tx_rows)

        # 4. Ingest RFM Segments
        rfm_csv = os.path.join(self.processed_dir, "customer_rfm.csv")
        if os.path.exists(rfm_csv):
            with open(rfm_csv, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                rfm_rows = []
                for r in reader:
                    rec_val = int(r["recency"]) if r.get("recency") and str(r["recency"]).strip() else 0
                    freq_val = int(r["frequency"]) if r.get("frequency") and str(r["frequency"]).strip() else 0
                    mon_val = float(r["monetary"]) if r.get("monetary") and str(r["monetary"]).strip() else 0.0
                    r_sc = int(r["r_score"]) if r.get("r_score") and str(r["r_score"]).strip() else 1
                    f_sc = int(r["f_score"]) if r.get("f_score") and str(r["f_score"]).strip() else 1
                    m_sc = int(r["m_score"]) if r.get("m_score") and str(r["m_score"]).strip() else 1
                    rfm_rows.append((
                        r["customer_id"], r.get("last_tx_date"), rec_val, freq_val,
                        mon_val, r_sc, f_sc, m_sc,
                        r.get("rfm_score") or "111", r.get("customer_segment") or "Low Value / Casual", r.get("location") or "UNKNOWN"
                    ))
                cursor.executemany("INSERT INTO customer_rfm VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", rfm_rows)

        # 5. Populate Aggregated Monthly Metrics
        cursor.execute("""
        INSERT INTO customer_monthly_metrics
        SELECT 
            customer_id,
            month,
            COUNT(transaction_id) AS transaction_count,
            ROUND(SUM(transaction_amount), 2) AS total_transaction_value,
            ROUND(AVG(transaction_amount), 2) AS average_transaction_value,
            COUNT(DISTINCT transaction_date) AS active_days,
            MAX(transaction_date) AS last_transaction_date
        FROM transactions
        GROUP BY customer_id, month
        """)

        # 6. Build High-Performance Indexes
        cursor.executescript("""
        CREATE INDEX idx_tx_cust_date ON transactions(customer_id, transaction_date);
        CREATE INDEX idx_tx_date ON transactions(transaction_date);
        CREATE INDEX idx_tx_location ON transactions(location);
        CREATE INDEX idx_rfm_segment ON customer_rfm(customer_segment);
        CREATE INDEX idx_cust_location ON customers(location);
        """)

        conn.commit()
        conn.close()
        print(f"[AegisFin Database Engine] Ingestion complete. Database created at: {self.db_path}")

    def execute_query(self, query: str) -> Tuple[List[str], List[Any]]:
        """Executes a SELECT query and returns column names and row tuples."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute(query)
        columns = [d[0] for d in cursor.description]
        rows = cursor.fetchall()
        conn.close()
        return columns, rows

def main():
    engine = AegisDatabaseEngine()
    engine.build_database()

if __name__ == "__main__":
    main()

