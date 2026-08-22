-- =================================================================
-- AegisFin Analytics Suite: 02_transaction_analysis.sql
-- Monthly Throughput Trends, Size Distribution & Temporal Patterns
-- =================================================================

-- Query 5: Monthly Transaction Volume & Monetary Value Trends
-- Breaks down transaction counts, total value, and average value by calendar month.
SELECT 
    month,
    COUNT(transaction_id) AS monthly_transaction_count,
    ROUND(SUM(transaction_amount), 2) AS monthly_transaction_value_inr,
    ROUND(AVG(transaction_amount), 2) AS avg_transaction_value_inr,
    COUNT(DISTINCT customer_id) AS monthly_active_customers
FROM transactions
GROUP BY month
ORDER BY month ASC;

-- Query 6: Transaction Amount Bucket Distribution (Size Segmentation)
-- Categorizes transactions into size tiers (< 500, 500-2K, 2K-10K, 10K-50K, 50K+)
SELECT 
    CASE 
        WHEN transaction_amount < 500 THEN '1. Micro (< ₹500)'
        WHEN transaction_amount BETWEEN 500 AND 1999.99 THEN '2. Small (₹500 - ₹2,000)'
        WHEN transaction_amount BETWEEN 2000 AND 9999.99 THEN '3. Medium (₹2,000 - ₹10,000)'
        WHEN transaction_amount BETWEEN 10000 AND 49999.99 THEN '4. Large (₹10,000 - ₹50,000)'
        ELSE '5. Very Large (₹50,000+)'
    END AS transaction_size_tier,
    COUNT(transaction_id) AS transaction_count,
    ROUND(SUM(transaction_amount), 2) AS total_amount_inr,
    ROUND(COUNT(transaction_id) * 100.0 / (SELECT COUNT(*) FROM transactions), 2) AS pct_of_total_transactions,
    ROUND(SUM(transaction_amount) * 100.0 / (SELECT SUM(transaction_amount) FROM transactions), 2) AS pct_of_total_value
FROM transactions
GROUP BY 1
ORDER BY 1 ASC;

-- Query 7: Peak Hourly Transaction Patterns
-- Extracts hour of the day from transaction_time to pinpoint peak banking traffic.
SELECT 
    SUBSTR(transaction_time, 1, 2) AS transaction_hour,
    COUNT(transaction_id) AS tx_count,
    ROUND(SUM(transaction_amount), 2) AS total_value_inr,
    ROUND(AVG(transaction_amount), 2) AS avg_value_inr
FROM transactions
GROUP BY transaction_hour
ORDER BY tx_count DESC;
