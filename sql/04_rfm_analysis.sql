-- =================================================================
-- AegisFin Analytics Suite: 04_rfm_analysis.sql
-- Recency, Frequency & Monetary Value Quantile Architecture
-- =================================================================

-- Query 14: Base RFM Calculation Query
-- Computes raw Recency (days relative to 2016-11-01), Frequency, and Monetary Value per customer.
WITH raw_rfm AS (
    SELECT 
        customer_id,
        MAX(transaction_date) AS last_tx_date,
        -- Recency: Days between reference date 2016-11-01 and last transaction
        JULIANDAY('2016-11-01') - JULIANDAY(MAX(transaction_date)) AS recency_days,
        COUNT(transaction_id) AS frequency_count,
        SUM(transaction_amount) AS monetary_value
    FROM transactions
    GROUP BY customer_id
)
SELECT 
    customer_id,
    last_tx_date,
    CAST(recency_days AS INT) AS recency_days,
    frequency_count,
    ROUND(monetary_value, 2) AS monetary_value_inr
FROM raw_rfm
ORDER BY monetary_value_inr DESC
LIMIT 20;

-- Query 15: NTILE Quintile Scoring Breakdown (R, F, M Scores)
-- Assigns 1-5 scores using NTILE window functions across Recency, Frequency, and Monetary.
WITH base_metrics AS (
    SELECT 
        customer_id,
        JULIANDAY('2016-11-01') - JULIANDAY(MAX(transaction_date)) AS recency,
        COUNT(transaction_id) AS frequency,
        SUM(transaction_amount) AS monetary
    FROM transactions
    GROUP BY customer_id
)
SELECT 
    customer_id,
    CAST(recency AS INT) AS recency,
    frequency,
    ROUND(monetary, 2) AS monetary,
    -- Recency score: Inverse NTILE (lower recency days gets higher score 5)
    NTILE(5) OVER (ORDER BY recency ASC) AS r_score_asc,
    (6 - NTILE(5) OVER (ORDER BY recency ASC)) AS r_score,
    NTILE(5) OVER (ORDER BY frequency ASC) AS f_score,
    NTILE(5) OVER (ORDER BY monetary ASC) AS m_score
FROM base_metrics
LIMIT 20;

-- Query 16: RFM Distribution & Average Metrics per Quintile Score
-- Examines mean monetary value, frequency, and recency for each R, F, M score tier.
SELECT 
    r_score,
    COUNT(customer_id) AS customer_count,
    ROUND(AVG(recency), 1) AS avg_recency_days,
    ROUND(AVG(frequency), 2) AS avg_frequency,
    ROUND(AVG(monetary_value), 2) AS avg_monetary_inr
FROM customer_rfm
GROUP BY r_score
ORDER BY r_score DESC;

-- Query 17: Monetary Score Tier Financial Contribution
SELECT 
    m_score,
    COUNT(customer_id) AS customer_count,
    ROUND(SUM(monetary_value), 2) AS total_segment_monetary_inr,
    ROUND(AVG(monetary_value), 2) AS avg_customer_spend_inr,
    ROUND(SUM(monetary_value) * 100.0 / (SELECT SUM(monetary_value) FROM customer_rfm), 2) AS pct_share_of_total_monetary
FROM customer_rfm
GROUP BY m_score
ORDER BY m_score DESC;
