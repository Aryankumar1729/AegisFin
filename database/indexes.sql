-- =================================================================
-- AegisFin: Performance Optimization & Relational Indexing Strategy
-- Target DB: PostgreSQL 15+ / SQLite 3.40+
-- =================================================================

-- 1. Index on Customer Lookup & Geographic Filtering
CREATE INDEX IF NOT EXISTS idx_customers_location ON customers(location);
CREATE INDEX IF NOT EXISTS idx_customers_gender ON customers(gender);
CREATE INDEX IF NOT EXISTS idx_customers_age ON customers(age_imputed);

-- 2. Indexes on High-Volume Transactions Fact Table
CREATE INDEX IF NOT EXISTS idx_transactions_customer_id ON transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_transactions_month ON transactions(month);
CREATE INDEX IF NOT EXISTS idx_transactions_location ON transactions(location);
CREATE INDEX IF NOT EXISTS idx_transactions_composite ON transactions(customer_id, transaction_date);

-- 3. Indexes on RFM Analytical Table for Segment & High-Value Queries
CREATE INDEX IF NOT EXISTS idx_rfm_segment ON customer_rfm(customer_segment);
CREATE INDEX IF NOT EXISTS idx_rfm_score ON customer_rfm(rfm_score);
CREATE INDEX IF NOT EXISTS idx_rfm_monetary ON customer_rfm(monetary_value DESC);
CREATE INDEX IF NOT EXISTS idx_rfm_recency ON customer_rfm(recency ASC);
CREATE INDEX IF NOT EXISTS idx_rfm_frequency ON customer_rfm(frequency DESC);

-- 4. Composite Index for Monthly Aggregates
CREATE INDEX IF NOT EXISTS idx_monthly_metrics_cust_month ON customer_monthly_metrics(customer_id, month);
