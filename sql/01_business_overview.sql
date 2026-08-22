-- =================================================================
-- AegisFin Analytics Suite: 01_business_overview.sql
-- High-Level Executive Banking Metrics & Liquidity Telemetry
-- =================================================================

-- Query 1: Total Customer Base & Demographic Composition
-- Calculates total registered unique accounts and demographic distribution.
SELECT 
    COUNT(customer_id) AS total_customers,
    COUNT(CASE WHEN gender = 'M' THEN 1 END) AS male_customers,
    COUNT(CASE WHEN gender = 'F' THEN 1 END) AS female_customers,
    ROUND(COUNT(CASE WHEN gender = 'M' THEN 1 END) * 100.0 / COUNT(customer_id), 2) AS male_pct
FROM customers;

-- Query 2: Total Transaction Volume & Total Monetary Value (INR)
-- Aggregate volume, total value, and overall average transaction size across the dataset.
SELECT 
    COUNT(transaction_id) AS total_transactions,
    ROUND(SUM(transaction_amount), 2) AS total_transaction_value_inr,
    ROUND(AVG(transaction_amount), 2) AS avg_transaction_value_inr,
    ROUND(MIN(transaction_amount), 2) AS min_transaction_value_inr,
    ROUND(MAX(transaction_amount), 2) AS max_transaction_value_inr
FROM transactions;

-- Query 3: Total Account Balance Liabilities & Average Balance per Customer
-- Evaluates the total liquidity/balance maintained by customers across accounts.
SELECT 
    ROUND(SUM(account_balance), 2) AS total_account_balance_inr,
    ROUND(AVG(account_balance), 2) AS avg_account_balance_per_customer_inr,
    ROUND(MAX(account_balance), 2) AS max_single_account_balance_inr
FROM customers;

-- Query 4: Key Portfolio Averages per Customer
-- Computes average transactions per customer and average monetary contribution per customer.
WITH customer_summary AS (
    SELECT 
        customer_id,
        COUNT(transaction_id) AS tx_count,
        SUM(transaction_amount) AS total_spend
    FROM transactions
    GROUP BY customer_id
)
SELECT 
    ROUND(AVG(tx_count), 2) AS avg_transactions_per_customer,
    ROUND(AVG(total_spend), 2) AS avg_total_spend_per_customer_inr,
    ROUND(MAX(tx_count), 2) AS max_transactions_by_single_customer
FROM customer_summary;
