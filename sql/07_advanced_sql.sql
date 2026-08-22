-- =================================================================
-- AegisFin Analytics Suite: 07_advanced_sql.sql
-- Month-over-Month Growth, Running Totals, Window Rankings & CTEs
-- =================================================================

-- Query 24: Month-over-Month (MoM) Growth in Transaction Volume & Value using LAG()
-- Calculates monthly percentage growth in total INR transacted and transaction volume.
WITH monthly_aggregates AS (
    SELECT 
        month,
        COUNT(transaction_id) AS tx_count,
        SUM(transaction_amount) AS total_amount
    FROM transactions
    GROUP BY month
),
monthly_lagged AS (
    SELECT 
        month,
        tx_count,
        total_amount,
        LAG(tx_count, 1) OVER (ORDER BY month ASC) AS prev_month_tx_count,
        LAG(total_amount, 1) OVER (ORDER BY month ASC) AS prev_month_amount
    FROM monthly_aggregates
)
SELECT 
    month,
    tx_count,
    ROUND(total_amount, 2) AS total_amount_inr,
    prev_month_tx_count,
    ROUND(prev_month_amount, 2) AS prev_month_amount_inr,
    ROUND(((tx_count - prev_month_tx_count) * 100.0 / prev_month_tx_count), 2) AS tx_volume_growth_pct,
    ROUND(((total_amount - prev_month_amount) * 100.0 / prev_month_amount), 2) AS tx_value_growth_pct
FROM monthly_lagged
ORDER BY month ASC;

-- Query 25: Cumulative Cumulative Spend & Running Totals using SUM() OVER()
-- Computes daily transaction totals and running cumulative transaction volume over time.
WITH daily_totals AS (
    SELECT 
        transaction_date,
        COUNT(transaction_id) AS daily_tx_count,
        SUM(transaction_amount) AS daily_amount
    FROM transactions
    GROUP BY transaction_date
)
SELECT 
    transaction_date,
    daily_tx_count,
    ROUND(daily_amount, 2) AS daily_amount_inr,
    SUM(daily_tx_count) OVER (ORDER BY transaction_date ASC) AS running_tx_count,
    ROUND(SUM(daily_amount) OVER (ORDER BY transaction_date ASC), 2) AS running_total_amount_inr
FROM daily_totals
ORDER BY transaction_date ASC
LIMIT 30;

-- Query 26: Top Transaction per Customer using ROW_NUMBER()
-- Identifies each customer's single highest value transaction along with date and time.
WITH ranked_transactions AS (
    SELECT 
        customer_id,
        transaction_id,
        transaction_date,
        transaction_time,
        transaction_amount,
        location,
        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_amount DESC) AS rank_by_amount
    FROM transactions
)
SELECT 
    customer_id,
    transaction_id,
    transaction_date,
    transaction_time,
    ROUND(transaction_amount, 2) AS max_single_transaction_amount_inr,
    location
FROM ranked_transactions
WHERE rank_by_amount = 1
ORDER BY max_single_transaction_amount_inr DESC
LIMIT 20;
