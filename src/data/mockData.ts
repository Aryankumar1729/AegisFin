import { KPIOverview, RFMSegment, GeographicMetric, MonthlyTrend, SQLFile, ChurnRiskCohort, PipelineStageMetric } from "../types";

export const kpiData: KPIOverview = {
  total_customers: 884203,
  total_transactions: 1048575,
  total_transaction_value: 2342109480, // ₹2.34 Billion
  total_transaction_value_inr: 2342109480,
  avg_transaction_value: 6880.89,
  avg_transaction_value_inr: 6880.89,
  total_account_balance: 59970000000, // ₹59.97 Billion
  avg_account_balance: 67824.12,
  avg_transactions_per_customer: 1.19,
  customer_retention_rate: 76.4,
  metro_concentration_pct: 64.2,
};

export const monthlyTrendData: MonthlyTrend[] = [
  { month: "2016-08", transaction_count: 324150, total_amount: 2180500000, avg_amount: 6726.82, active_customers: 289120, mom_growth_pct: 0.0 },
  { month: "2016-09", transaction_count: 358910, total_amount: 2441200000, avg_amount: 6801.69, active_customers: 312040, mom_growth_pct: 11.95 },
  { month: "2016-10", transaction_count: 365515, total_amount: 2492550000, avg_amount: 6819.28, active_customers: 321850, mom_growth_pct: 2.10 },
];

export const rfmSegmentData: RFMSegment[] = [
  {
    customer_segment: "Champions",
    customer_count: 162693,
    total_monetary: 4410835000,
    avg_monetary: 27111.40,
    avg_frequency: 4.8,
    avg_recency: 4.2,
    color_code: "emerald",
    strategy_tagline: "VIP Concierge & High-Yield Wealth Products",
  },
  {
    customer_segment: "Loyal Customers",
    customer_count: 106988,
    total_monetary: 1351707000,
    avg_monetary: 12634.19,
    avg_frequency: 3.2,
    avg_recency: 12.8,
    color_code: "sky",
    strategy_tagline: "Pre-Approved Commercial Credit Lines",
  },
  {
    customer_segment: "Big Spenders",
    customer_count: 70736,
    total_monetary: 853710000,
    avg_monetary: 12068.96,
    avg_frequency: 2.1,
    avg_recency: 18.5,
    color_code: "indigo",
    strategy_tagline: "Tailored Fixed Deposit & Asset Management",
  },
  {
    customer_segment: "Potential Loyalists",
    customer_count: 216630,
    total_monetary: 320141000,
    avg_monetary: 1477.82,
    avg_frequency: 1.8,
    avg_recency: 15.3,
    color_code: "violet",
    strategy_tagline: "Gamified Payment Streaks & Fee Waivers",
  },
  {
    customer_segment: "At Risk",
    customer_count: 139704,
    total_monetary: 112439000,
    avg_monetary: 804.84,
    avg_frequency: 1.5,
    avg_recency: 45.1,
    color_code: "amber",
    strategy_tagline: "Automated Win-Back Push Notifications",
  },
  {
    customer_segment: "Dormant / Lost",
    customer_count: 187452,
    total_monetary: 63418000,
    avg_monetary: 338.32,
    avg_frequency: 1.1,
    avg_recency: 78.6,
    color_code: "rose",
    strategy_tagline: "Low-Cost Re-engagement & Churn Flagging",
  },
];

export const geographicData: GeographicMetric[] = [
  { location: "MUMBAI", customer_count: 142850, transaction_count: 178920, total_amount: 1284500000, avg_amount: 7179.29, tier: "Tier-1 Metro" },
  { location: "NEW DELHI", customer_count: 118420, transaction_count: 149310, total_amount: 1082100000, avg_amount: 7247.33, tier: "Tier-1 Metro" },
  { location: "BANGALORE", customer_count: 105640, transaction_count: 131200, total_amount: 945200000, avg_amount: 7204.26, tier: "Tier-1 Metro" },
  { location: "CHENNAI", customer_count: 82190, transaction_count: 98450, total_amount: 681400000, avg_amount: 6921.28, tier: "Tier-1 Metro" },
  { location: "HYDERABAD", customer_count: 76510, transaction_count: 91230, total_amount: 624800000, avg_amount: 6848.62, tier: "Tier-1 Metro" },
  { location: "KOLKATA", customer_count: 64200, transaction_count: 74800, total_amount: 489200000, avg_amount: 6540.10, tier: "Tier-1 Metro" },
  { location: "PUNE", customer_count: 58310, transaction_count: 68900, total_amount: 462100000, avg_amount: 6706.82, tier: "Tier-2 Growth Hub" },
  { location: "AHMEDABAD", customer_count: 49820, transaction_count: 57400, total_amount: 381900000, avg_amount: 6653.31, tier: "Tier-2 Growth Hub" },
  { location: "SURAT", customer_count: 38200, transaction_count: 43100, total_amount: 298400000, avg_amount: 6923.43, tier: "Tier-2 Growth Hub" },
  { location: "JAIPUR", customer_count: 32100, transaction_count: 36200, total_amount: 245100000, avg_amount: 6770.71, tier: "Tier-2 Growth Hub" },
];

export const churnRiskCohortsData: ChurnRiskCohort[] = [
  {
    cohort_name: "High-Value Stalled Transactors",
    customer_count: 14210,
    volume_at_risk: 384500000,
    avg_inactivity_days: 52,
    risk_level: "CRITICAL",
    recommended_playbook: "Dedicated account manager outreach with zero-fee domestic wire & instant credit line upgrades.",
  },
  {
    cohort_name: "Mid-Tier Velocity Decelerators",
    customer_count: 48920,
    volume_at_risk: 215400000,
    avg_inactivity_days: 41,
    risk_level: "HIGH",
    recommended_playbook: "Targeted digital merchant cashback (UPI bill payments, fuel concessions) expiring in 7 days.",
  },
  {
    cohort_name: "Post-Onboarding Single-Tx Dropoffs",
    customer_count: 76574,
    volume_at_risk: 68300000,
    avg_inactivity_days: 68,
    risk_level: "MODERATE",
    recommended_playbook: "Step-by-step onboarding nudges highlighting auto-debit savings and bill management features.",
  },
  {
    cohort_name: "Seasonal Low-Balance Transactors",
    customer_count: 47748,
    volume_at_risk: 23200000,
    avg_inactivity_days: 84,
    risk_level: "LOW",
    recommended_playbook: "Low-frequency automated SMS digest of seasonal deposit yields and digital banking perks.",
  },
];

export const pipelineStagesData: PipelineStageMetric[] = [
  {
    step: "01",
    name: "Raw Ingestion & Deduplication",
    status: "PASSED",
    rows: "1,048,575",
    latency: "1.42s",
    details: "High-throughput stream ingestion with MD5 hash deduplication; removed 1,240 duplicate transaction IDs.",
  },
  {
    step: "02",
    name: "Temporal & Spatial Normalization",
    status: "PASSED",
    rows: "1,048,575",
    latency: "0.88s",
    details: "Normalized timestamps into ISO-8601 UTC. Cleaned metropolitan city names across 16 major urban clusters.",
  },
  {
    step: "03",
    name: "Demographic Imputation & Anomaly Scrubbing",
    status: "OPTIMAL",
    rows: "1,048,575",
    latency: "0.65s",
    details: "Resolved legacy placeholder DOBs with median age alignment (31.4 yrs); bounded balance outliers >₹10M.",
  },
  {
    step: "04",
    name: "Relational Schema & Analytical Indexing",
    status: "VALIDATED",
    rows: "1,048,575",
    latency: "2.10s",
    details: "Engineered high-performance B-tree composite indexes on customer_id, transaction_date, and geo clusters.",
  },
];

export const sqlFilesData: SQLFile[] = [
  {
    filename: "01_business_overview.sql",
    title: "Executive Portfolio & Core Liquidity Overview",
    description: "Evaluates aggregate transactional throughput, total balance liabilities, and per-user velocity metrics.",
    content: `-- AegisFin Analytics: 01_business_overview.sql
-- Executive Core Banking Performance & Liquidity Overview

-- Query 1: Total Customer Base & Demographic Composition
SELECT 
    COUNT(customer_id) AS total_customers,
    COUNT(CASE WHEN gender = 'M' THEN 1 END) AS male_customers,
    COUNT(CASE WHEN gender = 'F' THEN 1 END) AS female_customers,
    ROUND(COUNT(CASE WHEN gender = 'M' THEN 1 END) * 100.0 / COUNT(customer_id), 2) AS male_pct,
    ROUND(COUNT(CASE WHEN gender = 'F' THEN 1 END) * 100.0 / COUNT(customer_id), 2) AS female_pct
FROM customers;

-- Query 2: Aggregate Transaction Throughput & Volume Metrics
SELECT 
    COUNT(transaction_id) AS total_transactions,
    ROUND(SUM(transaction_amount), 2) AS total_transaction_volume_inr,
    ROUND(AVG(transaction_amount), 2) AS mean_transaction_ticket_inr,
    ROUND(MIN(transaction_amount), 2) AS min_ticket_inr,
    ROUND(MAX(transaction_amount), 2) AS max_ticket_inr
FROM transactions;

-- Query 3: Core Portfolio Liquidity & Balance Distribution
SELECT 
    ROUND(SUM(account_balance), 2) AS total_deposit_liabilities_inr,
    ROUND(AVG(account_balance), 2) AS mean_account_balance_inr,
    ROUND(MAX(account_balance), 2) AS peak_single_account_balance_inr
FROM customers;`
  },
  {
    filename: "02_rfm_segmentation.sql",
    title: "RFM Quintile Behavioral Segmentation Engine",
    description: "Computes Recency, Frequency, and Monetary quintiles via NTILE window functions to classify customers into 7 distinct commercial tiers.",
    content: `-- AegisFin Analytics: 02_rfm_segmentation.sql
-- RFM Quintile Behavioral Segmentation Engine

WITH customer_aggregates AS (
    SELECT 
        customer_id,
        CAST((JULIANDAY('2016-11-01') - JULIANDAY(MAX(transaction_date))) AS INT) AS recency_days,
        COUNT(transaction_id) AS frequency,
        SUM(transaction_amount) AS monetary_value
    FROM transactions
    GROUP BY customer_id
),
rfm_quintiles AS (
    SELECT 
        customer_id,
        recency_days,
        frequency,
        monetary_value,
        NTILE(5) OVER (ORDER BY recency_days ASC) AS r_score,
        NTILE(5) OVER (ORDER BY frequency ASC) AS f_score,
        NTILE(5) OVER (ORDER BY monetary_value ASC) AS m_score
    FROM customer_aggregates
)
SELECT 
    customer_id,
    recency_days,
    frequency,
    monetary_value,
    r_score, f_score, m_score,
    (r_score || f_score || m_score) AS composite_rfm,
    CASE 
        WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN 'Champions'
        WHEN f_score >= 4 THEN 'Loyal Customers'
        WHEN m_score >= 4 THEN 'Big Spenders'
        WHEN r_score >= 3 AND f_score >= 2 THEN 'Potential Loyalists'
        WHEN r_score <= 2 AND f_score >= 3 THEN 'At Risk'
        WHEN r_score <= 2 AND f_score <= 2 THEN 'Dormant / Lost'
        ELSE 'Low Value / Casual'
    END AS customer_segment
FROM rfm_quintiles
ORDER BY monetary_value DESC
LIMIT 50;`
  },
  {
    filename: "03_customer_lifetime_value.sql",
    title: "Customer Lifetime Value (CLV) & Balance Velocity",
    description: "Analyzes account balance turnover ratios and lifetime spend trajectory per customer profile.",
    content: `-- AegisFin Analytics: 03_customer_lifetime_value.sql
-- Customer Lifetime Value (CLV) & Balance Velocity Analytics

SELECT 
    c.customer_id,
    c.location,
    c.account_balance,
    COUNT(t.transaction_id) AS lifetime_tx_count,
    ROUND(SUM(t.transaction_amount), 2) AS lifetime_spend_inr,
    ROUND(AVG(t.transaction_amount), 2) AS avg_ticket_size_inr,
    ROUND(SUM(t.transaction_amount) / NULLIF(c.account_balance, 0), 4) AS turnover_velocity_ratio
FROM customers c
JOIN transactions t ON c.customer_id = t.customer_id
GROUP BY c.customer_id, c.location, c.account_balance
HAVING COUNT(t.transaction_id) >= 2
ORDER BY lifetime_spend_inr DESC
LIMIT 50;`
  },
  {
    filename: "04_regional_concentration.sql",
    title: "Geographic Market Penetration & Metro Clustering",
    description: "Evaluates metropolitan transaction density, regional market share, and ticket size differences across Tier-1 and Tier-2 urban centres.",
    content: `-- AegisFin Analytics: 04_regional_concentration.sql
-- Regional Market Penetration & Metropolitan Concentration

SELECT 
    UPPER(location) AS metropolitan_cluster,
    COUNT(DISTINCT customer_id) AS unique_customer_count,
    COUNT(transaction_id) AS aggregate_transaction_count,
    ROUND(SUM(transaction_amount), 2) AS regional_monetary_volume_inr,
    ROUND(AVG(transaction_amount), 2) AS mean_transaction_ticket_inr,
    ROUND(SUM(transaction_amount) * 100.0 / (SELECT SUM(transaction_amount) FROM transactions), 2) AS national_volume_share_pct
FROM transactions
WHERE location IS NOT NULL AND location != 'UNKNOWN'
GROUP BY UPPER(location)
ORDER BY regional_monetary_volume_inr DESC;`
  },
  {
    filename: "05_monthly_growth_retention.sql",
    title: "Monthly Throughput Trajectory & Growth Dynamics",
    description: "Computes month-over-month transactional volume acceleration and active transactor expansion.",
    content: `-- AegisFin Analytics: 05_monthly_growth_retention.sql
-- Month-over-Month Throughput Trajectory & Volume Acceleration

WITH monthly_aggregates AS (
    SELECT 
        month,
        COUNT(DISTINCT customer_id) AS monthly_active_customers,
        COUNT(transaction_id) AS transaction_throughput,
        ROUND(SUM(transaction_amount), 2) AS total_volume_inr,
        ROUND(AVG(transaction_amount), 2) AS avg_ticket_inr
    FROM transactions
    GROUP BY month
)
SELECT 
    month,
    monthly_active_customers,
    transaction_throughput,
    total_volume_inr,
    avg_ticket_inr,
    LAG(total_volume_inr) OVER (ORDER BY month) AS prior_month_volume_inr,
    ROUND(((total_volume_inr - LAG(total_volume_inr) OVER (ORDER BY month)) / LAG(total_volume_inr) OVER (ORDER BY month)) * 100, 2) AS mom_volume_growth_pct
FROM monthly_aggregates
ORDER BY month ASC;`
  }
];

