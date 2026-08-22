-- =================================================================
-- AegisFin Analytics Suite: 06_geographic_analysis.sql
-- Geographic Market Performance & Regional Transaction Density
-- =================================================================

-- Query 22: Top 15 Locations by Total Transaction Volume & Value
-- Ranks key Indian cities (Mumbai, Bangalore, Delhi, Hyderabad, Pune, Chennai, Gurgaon, Kolkata, etc.)
SELECT 
    location,
    COUNT(DISTINCT customer_id) AS active_customers,
    COUNT(transaction_id) AS total_transactions,
    ROUND(SUM(transaction_amount), 2) AS total_transaction_value_inr,
    ROUND(AVG(transaction_amount), 2) AS avg_transaction_value_inr,
    ROUND(SUM(transaction_amount) * 100.0 / (SELECT SUM(transaction_amount) FROM transactions), 2) AS location_market_share_pct
FROM transactions
WHERE location IS NOT NULL AND location != 'UNKNOWN'
GROUP BY location
ORDER BY total_transaction_value_inr DESC
LIMIT 15;

-- Query 23: Regional Market Maturity Matrix (Customer Density vs. Avg Ticket Size)
-- Identifies regions with large customer bases but lower average transaction sizes vs. high ticket cities.
WITH city_metrics AS (
    SELECT 
        location,
        COUNT(DISTINCT customer_id) AS customer_count,
        COUNT(transaction_id) AS tx_count,
        SUM(transaction_amount) AS total_val,
        AVG(transaction_amount) AS avg_ticket_size
    FROM transactions
    WHERE location IS NOT NULL AND location != 'UNKNOWN'
    GROUP BY location
)
SELECT 
    location,
    customer_count,
    tx_count,
    ROUND(total_val, 2) AS total_value_inr,
    ROUND(avg_ticket_size, 2) AS avg_ticket_size_inr,
    CASE 
        WHEN customer_count >= 1000 AND avg_ticket_size >= 1500 THEN 'Tier 1: High Density & High Value'
        WHEN customer_count >= 1000 AND avg_ticket_size < 1500 THEN 'Tier 2: High Density, Low Ticket (Expansion Target)'
        WHEN customer_count < 1000 AND avg_ticket_size >= 1500 THEN 'Tier 3: Low Density, High Ticket (VIP Growth)'
        ELSE 'Tier 4: Emerging / Niche Market'
    END AS regional_market_tier
FROM city_metrics
ORDER BY customer_count DESC
LIMIT 20;
