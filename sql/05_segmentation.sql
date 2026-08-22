-- =================================================================
-- AegisFin Analytics Suite: 05_segmentation.sql
-- Customer Segment Profiles & Commercial Value Classification
-- =================================================================

-- Query 18: Complete RFM Customer Segment Summary
-- Aggregates customer count, total revenue, average spend, frequency, and recency by RFM segment.
SELECT 
    customer_segment,
    COUNT(customer_id) AS customer_count,
    ROUND(COUNT(customer_id) * 100.0 / (SELECT COUNT(*) FROM customer_rfm), 2) AS segment_customer_pct,
    ROUND(SUM(monetary_value), 2) AS total_segment_spend_inr,
    ROUND(SUM(monetary_value) * 100.0 / (SELECT SUM(monetary_value) FROM customer_rfm), 2) AS segment_revenue_share_pct,
    ROUND(AVG(monetary_value), 2) AS avg_spend_per_customer_inr,
    ROUND(AVG(frequency), 2) AS avg_transactions_per_customer,
    ROUND(AVG(recency), 1) AS avg_days_since_last_tx
FROM customer_rfm
GROUP BY customer_segment
ORDER BY total_segment_spend_inr DESC;

-- Query 19: Identification of High-Value "Champions" Segment
-- Pulls the top Champions for VIP loyalty programs and wealth management targeting.
SELECT 
    r.customer_id,
    c.gender,
    c.age_imputed AS age,
    r.location,
    r.rfm_score,
    r.recency AS days_inactive,
    r.frequency AS total_transactions,
    r.monetary_value AS total_spend_inr,
    c.account_balance AS current_balance_inr
FROM customer_rfm r
JOIN customers c ON r.customer_id = c.customer_id
WHERE r.customer_segment = 'Champions'
ORDER BY r.monetary_value DESC
LIMIT 20;

-- Query 20: Identification of "At Risk" & High-Value "Dormant" Customers
-- Targets customers who generated high historical value but haven't transacted recently (Re-engagement target).
SELECT 
    r.customer_id,
    r.customer_segment,
    r.rfm_score,
    r.recency AS days_inactive,
    r.frequency AS total_transactions,
    r.monetary_value AS total_historical_spend_inr,
    c.account_balance AS current_balance_inr,
    r.location
FROM customer_rfm r
JOIN customers c ON r.customer_id = c.customer_id
WHERE r.customer_segment IN ('At Risk', 'Dormant / Lost')
  AND r.monetary_value > 2000
ORDER BY r.monetary_value DESC
LIMIT 20;

-- Query 21: Segment Revenue Concentration Ratio
-- Measures business dependency on Champions + Loyal Customers vs. rest of portfolio.
WITH segment_groups AS (
    SELECT 
        CASE 
            WHEN customer_segment IN ('Champions', 'Loyal Customers', 'Big Spenders') THEN 'Core High-Value Customers'
            WHEN customer_segment IN ('Potential Loyalists', 'Low Value / Casual') THEN 'Growth & Casual Base'
            ELSE 'At-Risk & Dormant'
        END AS segment_cluster,
        customer_id,
        monetary_value
    FROM customer_rfm
)
SELECT 
    segment_cluster,
    COUNT(customer_id) AS total_customers,
    ROUND(COUNT(customer_id) * 100.0 / (SELECT COUNT(*) FROM customer_rfm), 2) AS customer_pct,
    ROUND(SUM(monetary_value), 2) AS total_revenue_inr,
    ROUND(SUM(monetary_value) * 100.0 / (SELECT SUM(monetary_value) FROM customer_rfm), 2) AS revenue_share_pct
FROM segment_groups
GROUP BY segment_cluster
ORDER BY total_revenue_inr DESC;
