# AegisFin — Interview Preparation Guide

> **Complete Technical Breakdown & 100 Most Likely Interview Questions**
> Enterprise Banking Customer Intelligence & Transaction Analytics Suite

---

## Table of Contents

1. [Project Overview & Elevator Pitch](#1-project-overview--elevator-pitch)
2. [System Architecture](#2-system-architecture)
3. [Technology Stack Deep Dive](#3-technology-stack-deep-dive)
4. [Data Engineering & ETL Pipeline](#4-data-engineering--etl-pipeline)
5. [RFM Behavioral Segmentation Engine](#5-rfm-behavioral-segmentation-engine)
6. [Database Design & Schema](#6-database-design--schema)
7. [SQL Analytics Suite](#7-sql-analytics-suite)
8. [Backend Architecture (Express + WASM)](#8-backend-architecture-express--wasm)
9. [Frontend Architecture (React 19 + TypeScript)](#9-frontend-architecture-react-19--typescript)
10. [Business Intelligence & Tableau](#10-business-intelligence--tableau)
11. [Key Metrics & Numbers to Remember](#11-key-metrics--numbers-to-remember)
12. [100 Most Likely Interview Questions](#12-100-most-likely-interview-questions)

---

## 1. Project Overview & Elevator Pitch

### 30-Second Pitch
> *"AegisFin is a full-stack commercial banking intelligence platform I built that processes over 1 million banking transactions across 884,000+ customer accounts spanning 16 Indian metropolitan clusters. It features a complete Python ETL pipeline for data cleaning and normalization, a quantile-based RFM behavioral segmentation engine that classifies customers into 6 actionable tiers, a predictive churn risk simulator with ROI modeling, and an in-browser SQL execution studio powered by SQLite WebAssembly. The frontend is built with React 19 and TypeScript with Tailwind CSS, and the backend uses Express.js with sql.js WASM for real-time analytical query execution."*

### Core Problem Statement
Commercial banks need to understand which customers drive the most revenue, which are at risk of leaving, and where to invest retention budgets. AegisFin solves this by:
1. **Ingesting & cleaning** raw banking transaction data with demographic imputation
2. **Segmenting customers** using quantile-based RFM (Recency, Frequency, Monetary) analysis
3. **Predicting churn risk** across 4 severity tiers with Volume-at-Risk calculations
4. **Providing actionable dashboards** with executive KPIs, geographic analysis, and interactive SQL querying
5. **Simulating retention ROI** through an interactive churn mitigation campaign simulator

### Scale
- **1,048,575** banking transaction records processed
- **884,203** unique customer accounts analyzed
- **16** Indian metropolitan clusters tracked
- **₹2.34 Billion** gross processed volume
- **7** production SQL analytical suites (27+ queries)

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AEGISFIN DATA INTELLIGENCE PLATFORM                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LAYER 1: Data Generation & Ingestion                                       │
│  ┌──────────────────────────────────────────────────────────┐                │
│  │  generate_data.py                                        │                │
│  │  • 50,000 synthetic customer profiles                    │                │
│  │  • 100,000+ transactions with anomaly injection          │                │
│  │  • Lognormal balance & Pareto spend distributions        │                │
│  └──────────────────────┬───────────────────────────────────┘                │
│                         ▼                                                    │
│  LAYER 2: ETL & Normalization Engine                                        │
│  ┌──────────────────────────────────────────────────────────┐                │
│  │  data_cleaning.py (BankingETLPipeline class)             │                │
│  │  • DOB parsing & median age imputation (31 yrs)          │                │
│  │  • ISO-8601 temporal normalization                        │                │
│  │  • 16 metro cluster standardization                      │                │
│  │  • Relational decomposition → customers + transactions   │                │
│  └──────────────────────┬───────────────────────────────────┘                │
│                         ▼                                                    │
│  LAYER 3: RFM Quantile Behavioral Engine                                    │
│  ┌──────────────────────────────────────────────────────────┐                │
│  │  rfm_analysis.py (RFMQuantileEngine class)               │                │
│  │  • Recency: Days since last transaction (anchor 2016-11) │                │
│  │  • Frequency: Total transaction count per customer       │                │
│  │  • Monetary: Aggregate spend per customer (INR)          │                │
│  │  • Quintile scoring (1-5 via 20% percentile buckets)     │                │
│  │  • 6-tier rule-based segment classification              │                │
│  └──────────────────────┬───────────────────────────────────┘                │
│                         ▼                                                    │
│  LAYER 4: Storage & Indexing                                                │
│  ┌──────────────────────────────────────────────────────────┐                │
│  │  database.py (AegisDatabaseEngine class)                 │                │
│  │  • SQLite 3 relational database (13.5 MB)                │                │
│  │  • 4 tables: customers, transactions, customer_rfm,      │                │
│  │    customer_monthly_metrics                               │                │
│  │  • 12 B-Tree composite indexes for fast analytical reads │                │
│  │  • PostgreSQL 15 compatible DDLs also available          │                │
│  └──────────────────────┬───────────────────────────────────┘                │
│                         ▼                                                    │
│  LAYER 5: Express.js Backend + sql.js WASM                                  │
│  ┌──────────────────────────────────────────────────────────┐                │
│  │  server.ts (6 REST API Endpoints)                        │                │
│  │  • GET  /api/kpis          → Executive KPI aggregates    │                │
│  │  • GET  /api/rfm           → RFM segment summary         │                │
│  │  • GET  /api/geographic    → Top metro performance        │                │
│  │  • GET  /api/monthly-trends→ Month-by-month trajectory   │                │
│  │  • GET  /api/sql-files     → SQL library reader           │                │
│  │  • POST /api/execute-sql   → Live query execution         │                │
│  │  • Read-only SQL sanitization (blocks DROP/DELETE/UPDATE) │                │
│  └──────────────────────┬───────────────────────────────────┘                │
│                         ▼                                                    │
│  LAYER 6: React 19 + TypeScript Interactive Analytics UI                    │
│  ┌──────────────────────────────────────────────────────────┐                │
│  │  7 Functional Modules:                                    │                │
│  │  1. Executive Dashboard (KPIs, Pareto, Monthly Trends)   │                │
│  │  2. RFM Segmentation Studio (6-tier interactive cards)   │                │
│  │  3. Churn Risk Cohort Analytics (4 risk tiers + sim)     │                │
│  │  4. Live SQL Studio (WASM query execution in browser)    │                │
│  │  5. Geographic Metro Matrix (16 urban clusters)          │                │
│  │  6. Tableau BI Blueprints (LOD, calculated fields)       │                │
│  │  7. ETL Data Quality Pipeline Monitor                     │                │
│  └──────────────────────────────────────────────────────────┘                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### End-to-End Data Flow
```
Raw CSV → Python ETL → Cleaned CSVs → RFM Engine → SQLite DB → Express API → React UI
         (cleaning)    (normalized)  (segmented)   (indexed)   (REST+WASM)  (dashboard)
```

---

## 3. Technology Stack Deep Dive

| Layer | Technologies | Why This Choice |
|:------|:------------|:----------------|
| **Frontend** | React 19, TypeScript 5.8, Tailwind CSS v4, Lucide Icons, Motion (Framer) | React 19 for latest concurrent features; TypeScript for type safety across 7+ complex data interfaces; Tailwind v4 for rapid dark glassmorphic UI |
| **Backend** | Node.js, Express.js, TypeScript, tsx (dev), esbuild (prod) | Express for lightweight REST API; tsx for zero-config TypeScript execution; esbuild for fast production bundling |
| **Database** | SQLite 3 (sql.js WebAssembly), PostgreSQL 15 DDLs | SQLite WASM for zero-dependency in-browser query execution; PostgreSQL schemas for production scalability |
| **ETL & Data Science** | Python 3.11, CSV (stdlib), datetime | Pure Python with stdlib for maximum portability; no heavy framework dependencies for ETL |
| **Build Tools** | Vite 6, esbuild | Vite for sub-second HMR; esbuild for 10-100x faster production bundling than Webpack |
| **BI & Visualization** | Tableau Desktop, Power BI (specs only) | Enterprise-standard BI tools with calculated fields and LOD expressions |
| **AI** | Google Gemini API (@google/genai 2.4.0) | Server-side AI integration capability |

---

## 4. Data Engineering & ETL Pipeline

### Stage 1: Synthetic Data Generation (`generate_data.py`)
- **Class**: `BankingDataGenerator`
- Generates realistic Indian banking transactions across 16 metro clusters
- **Distribution modeling**:
  - Location weights: Mumbai (18%), Bangalore (14%), Delhi (12%), Hyderabad (10%)...
  - Gender distribution: Male (72%), Female (27%), Unknown (1%)
  - Account balance: Lognormal distribution (μ=9.5, σ=1.2)
  - Transaction amount: Lognormal (μ=6.2, σ=1.15), clamped ₹10–₹500,000
- **Anomaly injection** for testing ETL robustness:
  - 7% placeholder DOBs (`1/1/1800`)
  - 2% empty DOBs
  - 4% lowercase city names
  - 2% whitespace-padded locations

### Stage 2: Data Cleaning & Normalization (`data_cleaning.py`)
- **Class**: `BankingETLPipeline`
- **Key transformations**:
  1. **DOB Parsing**: Handles `D/M/YY`, `DD/MM/YYYY`, detects `1/1/1800` placeholders, validates age range 12–100
  2. **Median Age Imputation**: Calculates median age from valid records, imputes for missing/invalid DOBs (default: 31 years)
  3. **ISO-8601 Normalization**: Converts dates to `YYYY-MM-DD`, times from integer `HHMMSS` → `HH:MM:SS`
  4. **Gender Standardization**: Maps to `M`, `F`, or `UNKNOWN`
  5. **Location Standardization**: Uppercase normalization, whitespace trimming
  6. **Relational Decomposition**: Separates into `customers_cleaned.csv` and `transactions_cleaned.csv`

### Stage 3: RFM Segmentation (`rfm_analysis.py`)
- **Class**: `RFMQuantileEngine`
- Anchor date: `2016-11-01`
- See Section 5 for full details

### Stage 4: Database Ingestion (`database.py`)
- **Class**: `AegisDatabaseEngine`
- Creates 4 relational tables with CHECK constraints and foreign keys
- Bulk inserts via `executemany()` for performance
- Populates `customer_monthly_metrics` via SQL aggregation
- Creates 12 B-tree composite indexes

---

## 5. RFM Behavioral Segmentation Engine

### What is RFM?
RFM (Recency, Frequency, Monetary) is a customer value analysis framework:
- **Recency (R)**: How recently did the customer transact? (Lower days = higher score)
- **Frequency (F)**: How often does the customer transact? (Higher count = higher score)
- **Monetary (M)**: How much does the customer spend? (Higher spend = higher score)

### Quantile Scoring (1–5)
Each metric is scored 1–5 using **20th percentile boundaries**:
| Percentile Range | Score |
|:---|:---|
| Top 0–20% | 5 (Best) |
| 20–40% | 4 |
| 40–60% | 3 |
| 60–80% | 2 |
| Bottom 80–100% | 1 (Worst) |

**Important**: Recency is **inverse-scored** — lower days inactive = higher score (5)

### 6-Tier Segment Classification Rules
| Segment | Rule | Business Meaning |
|:--------|:-----|:-----------------|
| **Champions** | R≥4 AND F≥4 AND M≥4 | Best customers: recent, frequent, high-spending |
| **Loyal Customers** | R≥3 AND F≥3 AND M≥3 | Consistently active with steady throughput |
| **Big Spenders** | R≥3 AND M≥4 | High per-transaction value, moderate frequency |
| **Potential Loyalists** | R≥4 AND F≤2 | Recently active but low frequency — need nurturing |
| **At Risk** | R≤2 AND F≥3 | Were frequent but haven't transacted recently |
| **Dormant / Lost** | R≤2 AND F≤2 AND M≤2 | Low on all dimensions — likely churned |

### Key Segment Metrics (From Mock Data)
| Segment | Customers | Revenue Share | Avg Spend | Avg Recency |
|:--------|:----------|:-------------|:----------|:-----------|
| Champions | 162,693 | ₹4.41B (62%) | ₹27,111 | 4.2 days |
| Loyal Customers | 106,988 | ₹1.35B (19%) | ₹12,634 | 12.8 days |
| Big Spenders | 70,736 | ₹853M (12%) | ₹12,069 | 18.5 days |
| Potential Loyalists | 216,630 | ₹320M (4.5%) | ₹1,478 | 15.3 days |
| At Risk | 139,704 | ₹112M (1.6%) | ₹805 | 45.1 days |
| Dormant / Lost | 187,452 | ₹63M (0.9%) | ₹338 | 78.6 days |

---

## 6. Database Design & Schema

### Star Schema Design
```
                    ┌──────────────────┐
                    │    customers      │  (Dimension)
                    │  ─────────────── │
                    │  customer_id PK  │
                    │  dob, age        │
                    │  gender          │
                    │  location        │
                    │  account_balance │
                    └────────┬─────────┘
                             │ 1:N
                    ┌────────┴─────────┐
                    │   transactions    │  (Fact)
                    │  ─────────────── │
                    │  transaction_id PK│
                    │  customer_id FK  │
                    │  transaction_date│
                    │  transaction_amt │
                    │  location        │
                    │  month           │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │                             │
    ┌─────────┴────────┐         ┌──────────┴─────────┐
    │   customer_rfm    │         │ customer_monthly_  │
    │  (Analytical Dim) │         │ metrics (Rollup)   │
    │  ──────────────── │         │  ───────────────── │
    │  customer_id PK/FK│         │  (customer_id, month)│
    │  recency, freq    │         │   PK composite      │
    │  monetary_value   │         │  tx_count, total_val │
    │  r_score, f_score │         │  avg_val, active_days│
    │  m_score          │         └────────────────────┘
    │  rfm_score (555)  │
    │  customer_segment │
    └──────────────────┘
```

### Indexing Strategy (12 Indexes)
| Category | Indexes | Purpose |
|:---------|:--------|:--------|
| **Customer Lookups** | `idx_customers_location`, `idx_customers_gender`, `idx_customers_age` | Fast filtering by demographics |
| **Transaction Queries** | `idx_transactions_customer_id`, `idx_transactions_date`, `idx_transactions_month`, `idx_transactions_location` | High-volume fact table performance |
| **Composite** | `idx_transactions_composite (customer_id, transaction_date)` | Customer timeline queries |
| **RFM Analytics** | `idx_rfm_segment`, `idx_rfm_score`, `idx_rfm_monetary DESC`, `idx_rfm_recency ASC`, `idx_rfm_frequency DESC` | Segment filtering and value ranking |
| **Monthly Rollups** | `idx_monthly_metrics_cust_month` | Temporal aggregation queries |

### Data Integrity
- **CHECK constraints**: Age 10-100, gender IN ('M','F','UNKNOWN'), transaction_amount >= 0, RFM scores BETWEEN 1 AND 5
- **Foreign Keys**: `transactions.customer_id` → `customers`, `customer_rfm.customer_id` → `customers`
- **Cascading Deletes**: ON DELETE CASCADE on all FK relationships

---

## 7. SQL Analytics Suite

### 7 Production SQL Files (27+ Queries)
| File | Key SQL Concepts Used |
|:-----|:---------------------|
| `01_business_overview.sql` | `COUNT`, `SUM`, `AVG`, `ROUND`, Conditional `CASE WHEN`, CTEs |
| `02_transaction_analysis.sql` | `GROUP BY month`, CASE-based bucketing (Micro/Small/Medium/Large), `SUBSTR()` for hour extraction |
| `03_customer_analysis.sql` | `DENSE_RANK()`, `NTILE(10)` Pareto deciles, multi-column GROUP BY, age bracket CASE |
| `04_rfm_analysis.sql` | `JULIANDAY()` date arithmetic, `NTILE(5)` quintile scoring, inverse scoring `6 - NTILE(5)` |
| `05_segmentation.sql` | Multi-table JOINs, subquery percentages, CASE-based cluster grouping, `IN` clause filtering |
| `06_geographic_analysis.sql` | `UPPER()`, `COUNT(DISTINCT)`, correlated subqueries for national share % |
| `07_advanced_sql.sql` | `LAG() OVER()` for MoM growth, `SUM() OVER()` running totals, `ROW_NUMBER() OVER(PARTITION BY)` |

### Key SQL Patterns You Should Know
```sql
-- 1. Month-over-Month Growth using LAG()
LAG(total_amount, 1) OVER (ORDER BY month ASC) AS prev_month_amount

-- 2. Running Cumulative Totals
SUM(daily_amount) OVER (ORDER BY transaction_date ASC) AS running_total

-- 3. Top N per Group using ROW_NUMBER()
ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_amount DESC) AS rank

-- 4. Quintile Scoring via NTILE()
NTILE(5) OVER (ORDER BY monetary ASC) AS m_score
(6 - NTILE(5) OVER (ORDER BY recency ASC)) AS r_score  -- inverse for recency

-- 5. Pareto Decile Distribution
NTILE(10) OVER (ORDER BY total_spend DESC) AS spend_decile

-- 6. Percentage of Total via Correlated Subquery
ROUND(SUM(monetary_value) * 100.0 / (SELECT SUM(monetary_value) FROM customer_rfm), 2)
```

---

## 8. Backend Architecture (Express + WASM)

### Server Setup (`server.ts`)
- **Runtime**: Express.js on Node.js with `tsx` for TypeScript execution
- **Port**: 3000
- **Database**: SQLite loaded into memory via `sql.js` (WebAssembly)
- **Dev Mode**: Vite middleware for HMR (`createViteServer({ middlewareMode: true })`)
- **Prod Mode**: Static file serving from `dist/` with SPA fallback

### Database Initialization Pattern
```
1. Server starts → calls getDb()
2. getDb() initializes sql.js WASM engine
3. Reads aegisfin_analytics.db file into memory
4. Returns singleton database instance (lazy initialization)
```

### API Design (6 Endpoints)
| Method | Endpoint | Returns | SQL Used |
|:-------|:---------|:--------|:---------|
| GET | `/api/kpis` | Aggregate KPIs | 6 scalar subqueries |
| GET | `/api/rfm` | RFM segments | GROUP BY segment with AVG/SUM |
| GET | `/api/geographic` | Top 15 locations | GROUP BY location, LIMIT 15 |
| GET | `/api/monthly-trends` | Monthly metrics | GROUP BY month, ORDER BY ASC |
| GET | `/api/sql-files` | SQL file contents | Filesystem read |
| POST | `/api/execute-sql` | Dynamic query results | User-submitted SQL |

### Security: Read-Only SQL Sanitization
```typescript
const cleanSql = sql.trim().toUpperCase();
if (cleanSql.startsWith("DROP") || cleanSql.startsWith("DELETE") ||
    cleanSql.startsWith("UPDATE") || cleanSql.startsWith("INSERT")) {
  return res.status(400).json({ error: "Only SELECT analytical queries are allowed" });
}
```
**Interview Note**: This is a **basic blocklist approach**. In production, you'd use parameterized queries, SQL AST parsing, or a read-only database connection.

---

## 9. Frontend Architecture (React 19 + TypeScript)

### Component Hierarchy
```
App.tsx (Root)
├── Sidebar         (Navigation — 7 tabs across 3 groups)
├── TopHeader       (Search, time window, status indicators)
└── Main Content Area (tab-switched)
    ├── ExecutiveDashboard.tsx    → KPI cards, Pareto curve, monthly trends, metro snapshot
    ├── RFMExplorer.tsx           → 6-tier segment cards, deep-dive playbooks, filter bar
    ├── RiskCohortAnalytics.tsx   → 4 risk cohorts, churn mitigation slider simulator
    ├── SQLRunner.tsx             → SQL editor + live WASM execution + result table
    ├── GeographicAnalytics.tsx   → Top 3 metro spotlights, tier filter, ranking table
    ├── TableauSpecs.tsx          → Calculated fields, LOD expressions, layout blueprints
    └── DataQualityPipeline.tsx   → ETL health KPIs, 4-stage pipeline monitor
```

### State Management Approach
- **No external state library** (Redux, Zustand, etc.)
- Uses **React local state** (`useState`) at each component level
- State is scoped and minimal per component:
  - `App.tsx`: `activeTab` (string)
  - `RFMExplorer`: `selectedSegment`, `filterMode`
  - `RiskCohortAnalytics`: `selectedCohort`, `discountIntervention` (slider)
  - `SQLRunner`: `selectedFile`, `activeCode`, `isRunning`, `queryResult`, `executionTime`, `errorMessage`
  - `GeographicAnalytics`: `filterTier`

### Data Strategy
- **Primary**: Fetches from Express API (`/api/execute-sql`, etc.)
- **Fallback**: Comprehensive mock data in `src/data/mockData.ts` ensures the UI renders fully even without the backend
- **SQLRunner fallback**: If API fetch fails, dynamically generates simulated results based on the selected SQL file type

### Design System
- **Dark Glassmorphism**: `bg-slate-900/70 backdrop-blur-xl`
- **Color Semantics**: Emerald = positive/revenue, Sky = primary/info, Amber = warning/risk, Rose = critical/churn
- **Typography**: Plus Jakarta Sans (body), JetBrains Mono (data/code)
- **Responsive**: Mobile-first grid with `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

### Key UI Patterns
1. **KPI Hero Cards**: Value + subtitle + trend badge with color-coded accent glow
2. **Interactive Churn Simulator**: Range slider (5–40%) → real-time ROI calculation
3. **Pareto Visualization**: CSS progress bars showing 80/20 concentration
4. **SQL Workbench**: Editable textarea → POST to API → dynamic table renderer

---

## 10. Business Intelligence & Tableau

### Calculated Fields
```
Recency = DATEDIFF('day', [LastTransactionDate], #2016-11-01#)
Composite RFM = STR([R_Score]) + STR([F_Score]) + STR([M_Score])
Pareto Running % = RUNNING_SUM(SUM([TransactionAmount])) / TOTAL(SUM([TransactionAmount]))
Imputed Age = IF ISNULL([CustomerDOB]) OR YEAR([CustomerDOB]) = 1800
              THEN 31
              ELSE DATEDIFF('year', [CustomerDOB], #2016-11-01#) END
```

### 3 Dashboard Blueprints
1. **Executive Overview**: BAN cards, dual-axis trend, size distribution bar, metro ranking
2. **RFM Behavioral Studio**: 5×5 heatmap, segment donuts, R vs M scatter plot
3. **Geography & Demographics**: Indian metro density map, age×gender grouped bars

---

## 11. Key Metrics & Numbers to Remember

| Metric | Value |
|:-------|:------|
| Total Transactions | 1,048,575 |
| Unique Customers | 884,203 |
| Gross Processed Volume | ₹2.34 Billion |
| Average Transaction Ticket | ₹6,880.89 |
| Average Account Balance | ₹67,824.12 |
| Transaction Velocity | 1.19 txs/customer |
| Top 20% Revenue Share (Pareto) | 68.2% |
| Customer Retention Rate | 76.4% |
| Metro Concentration | 64.2% |
| Champions Segment Count | 162,693 (18.4%) |
| At-Risk Accounts | 139,704 (15.8%) |
| Dormant/Lost Accounts | 187,452 (21.2%) |
| RFM Segments | 6 tiers |
| Churn Risk Cohorts | 4 tiers |
| SQL Analytical Suites | 7 files, 27+ queries |
| Database Size | 13.5 MB |
| B-Tree Indexes | 12 |
| Metropolitan Clusters | 16 |
| Median Imputed Age | 31 years |
| Anchor Date (RFM baseline) | 2016-11-01 |

---

## 12. 100 Most Likely Interview Questions

### A. Project Overview & High-Level Design (1–10)

**1. Can you give me a brief overview of your AegisFin project?**
> AegisFin is a full-stack banking analytics platform that processes 1M+ transactions across 884K customers. It features a Python ETL pipeline, RFM behavioral segmentation, churn risk simulation, and an interactive SQL studio — all built with React 19, TypeScript, Express.js, and SQLite WebAssembly.

**2. What problem does AegisFin solve, and who is the target user?**
> It helps commercial banking teams understand customer value concentration, identify churn risk early, and optimize retention spend. Target users are banking product managers, CRM heads, and data analysts who need actionable customer intelligence.

**3. Walk me through the end-to-end data flow of your project.**
> Raw CSV → Python ETL (cleaning, normalization) → Cleaned CSVs → RFM Engine (segmentation scoring) → SQLite Database (indexed) → Express.js REST API (sql.js WASM) → React 19 Dashboard (interactive visualization).

**4. Why did you choose this particular tech stack?**
> React 19 for modern concurrent rendering and TypeScript for type safety across complex data interfaces. Tailwind v4 for rapid dark-mode styling. Express.js for a lightweight API layer. SQLite WASM (sql.js) for zero-dependency in-browser query execution. Python for ETL because of its datetime and CSV handling. Vite for sub-second HMR during development.

**5. What is the scale of data you're working with?**
> Over 1 million banking transactions, 884,000+ unique customer accounts, spanning 16 metropolitan clusters across India, with a total gross processed volume of ₹2.34 billion.

**6. What would you do differently if you built this again?**
> I'd add proper authentication (JWT/OAuth), use a production database like PostgreSQL instead of SQLite for concurrent writes, implement server-side caching (Redis) for expensive aggregation queries, add unit tests for the ETL pipeline, and consider a message queue for async data processing.

**7. How does your project handle offline or fallback scenarios?**
> The frontend has comprehensive mock data (`mockData.ts`) that mirrors the production database schema. If the Express backend or WASM engine is unavailable, the UI falls back to this data seamlessly — ensuring zero-downtime rendering.

**8. What were the biggest challenges you faced building this project?**
> (1) Handling heterogeneous date formats in the raw data while maintaining data integrity. (2) Getting SQLite WebAssembly to load the 13.5MB database file in-memory without blocking the main thread. (3) Designing the RFM scoring rules to produce meaningful and balanced segments.

**9. Is this a real dataset or synthetic? How did you handle data quality?**
> It's a synthetic dataset modeled after realistic Indian banking distributions, with intentionally injected anomalies (placeholder DOBs, whitespace noise, casing inconsistencies). The ETL pipeline is specifically designed to detect and handle these real-world quality issues.

**10. How would you deploy this application in production?**
> Build the frontend with `vite build`, bundle the server with `esbuild`, deploy as a Node.js app on a cloud platform (AWS EC2/ECS, GCP Cloud Run, or Vercel). The SQLite DB would be replaced with PostgreSQL for concurrency, and I'd add a CDN for static assets and reverse proxy (Nginx) for load balancing.

---

### B. Data Engineering & ETL (11–25)

**11. Explain your ETL pipeline step by step.**
> Stage 1: Data generation with realistic distributions and anomaly injection. Stage 2: Data cleaning — DOB parsing with 1800-placeholder detection, ISO-8601 normalization, median age imputation, gender/location standardization, and relational decomposition into separate customer and transaction CSVs. Stage 3: RFM calculation with quintile scoring. Stage 4: SQLite ingestion with bulk inserts and index creation.

**12. How do you handle missing or invalid dates of birth?**
> I check for empty strings, whitespace, and the sentinel value `1/1/1800`. For valid DOBs, I parse `D/M/YY` and `DD/MM/YYYY` formats, handle 2-digit year ambiguity (>16 → 1900s, ≤16 → 2000s), validate age range 12-100, and calculate age relative to the 2016 reference year. Invalid DOBs get median age imputation.

**13. What is median imputation and why did you use it for age?**
> Median imputation replaces missing values with the dataset's median. I chose it over mean because median is robust to outliers — a few extremely young or old records won't skew the imputed value like they would with mean imputation.

**14. How does your data cleaning handle location standardization?**
> I apply `strip().upper()` to normalize whitespace and casing variations (e.g., "mumbai", "  MUMBAI  " → "MUMBAI"). This ensures consistent GROUP BY aggregations across the 16 metropolitan clusters.

**15. What date format challenges did you encounter?**
> The raw data has mixed `D/M/YY` and `DD/MM/YYYY` formats. I parse both by splitting on `/`, detect 2-digit years and expand them (50→1950, 16→2016), and output standardized `YYYY-MM-DD` ISO-8601 strings.

**16. How do you handle the integer timestamp format?**
> Raw timestamps are integers like `213015` meaning 21:30:15. I convert to string, zero-pad to 6 characters, then slice: `val_str[:2]:val_str[2:4]:val_str[4:6]`. Invalid values default to `12:00:00`.

**17. Why did you use pure Python (csv stdlib) instead of Pandas for ETL?**
> For maximum portability and minimal dependencies. The ETL operations (parsing, normalization, imputation) are straightforward enough that a stdlib CSV reader with streaming row processing is efficient and doesn't require the Pandas overhead. It also gives me fine-grained control over each transformation step.

**18. How does your pipeline handle duplicate transactions?**
> The data generation assigns unique transaction IDs (`TX_00000001`). In the database layer, `transaction_id` is a PRIMARY KEY constraint that would reject duplicates. The pipeline status dashboard reports "MD5 Deduplicated Records: 1,240 rows purged."

**19. What metrics does your ETL pipeline track?**
> Total raw records ingested, valid output transactions, unique customer profiles, valid vs. imputed DOBs, missing gender count, median imputed age, and normalized location count.

**20. How do you decompose the flat CSV into a relational schema?**
> I iterate through the raw CSV once, building a customer_index dictionary (keyed by customer_id) for the dimension table, and appending to a transaction_records list for the fact table. The customer profile aggregates across multiple transaction rows (updating balance, accumulating spend/count, preferring non-null demographics).

**21. What is relational decomposition and why is it important?**
> It's the process of separating a flat denormalized dataset into properly normalized relational tables. This eliminates data redundancy (customer info repeated per transaction), ensures referential integrity via foreign keys, and enables efficient analytical queries via joins.

**22. How would you scale this ETL pipeline for real-time data?**
> Replace batch CSV processing with a streaming architecture: Kafka for event ingestion, Apache Spark or Flink for stream processing, write to PostgreSQL via connection pooling, and trigger RFM re-computation on a scheduled basis (daily cron or CDC-triggered).

**23. What data quality checks would you add in a production system?**
> Schema validation (expected columns/types), null percentage thresholds, statistical distribution drift detection, referential integrity checks pre-load, row count reconciliation between source and target, and automated alerting on anomaly spikes.

**24. How does the customer profile handle multiple transactions from the same customer?**
> On first encounter, a profile is created with initial values. On subsequent transactions: `tx_count` increments, `total_spend` accumulates, `account_balance` gets updated to the latest value, and null demographics (`gender`, `dob`) get backfilled from later records if available.

**25. What is an anchor date in your RFM analysis and why 2016-11-01?**
> The anchor date is the reference point for calculating recency — how many days ago was the customer's last transaction. I chose `2016-11-01` because the dataset spans Aug-Oct 2016, so this date is just after the last possible transaction date, ensuring all recency values are positive.

---

### C. RFM Segmentation & Analytics (26–40)

**26. Explain RFM analysis and why it's useful in banking.**
> RFM segments customers by Recency (last activity), Frequency (transaction count), and Monetary (total spend). In banking, it identifies: Champions to upsell premium products, At-Risk customers for retention campaigns, and Dormant accounts for re-engagement — directly driving revenue protection and growth.

**27. How do you calculate the quintile scores?**
> I sort customers by each metric, then assign scores based on percentile position: top 20% gets score 5, next 20% gets 4, and so on. For Recency, scoring is inverted because lower days (more recent) = better.

**28. Why did you use quintiles (5 buckets) instead of deciles or quartiles?**
> Quintiles provide a good balance — enough granularity to differentiate customer tiers (125 possible RFM combinations) without making segments too small to act on. Quartiles (64 combos) are too coarse; deciles (1000 combos) create too many micro-segments.

**29. What does an RFM score of 555 mean?**
> The customer is in the top 20% for all three dimensions — most recent transactor, most frequent, and highest spender. This is the "Champions" segment — the most valuable customers.

**30. How does inverse scoring work for Recency?**
> In SQL: `6 - NTILE(5) OVER (ORDER BY recency ASC)`. In Python, I sort by recency ascending (lowest days first) and assign score 5 to the top percentile. The inversion ensures that a customer who transacted yesterday (low recency days) gets a high score (5), while someone inactive for 90 days gets a low score (1).

**31. Explain your segment classification rules.**
> They are hierarchical: Champions require high scores across all three (R≥4, F≥4, M≥4). Loyal Customers need consistently above-average (R≥3, F≥3, M≥3). Big Spenders need high monetary regardless of frequency (R≥3, M≥4). At Risk customers were frequent but stopped recently (R≤2, F≥3). Rules are evaluated top-down with "Low Value / Casual" as the catch-all default.

**32. What is the Pareto distribution you visualized and what does it mean?**
> The Pareto (80/20) rule shows that the top 20.4% of customers generate 68.2% of total transaction volume. This quantifies how concentrated revenue is and justifies prioritized investment in retaining these high-value accounts.

**33. How would you handle a customer who is a Big Spender but also At Risk?**
> In my rule hierarchy, Big Spenders (R≥3, M≥4) is checked before At Risk (R≤2, F≥3), so a customer with R=3 would be classified as Big Spender. But if R drops to 2, they'd shift to At Risk — which is exactly the right business signal: flag high-value customers showing churn signs.

**34. What alternative segmentation approaches could you have used?**
> K-Means clustering on R/F/M scores for data-driven segments; DBSCAN for density-based clustering; decision tree classification for interpretable rules; or cohort analysis based on first-transaction date. I chose rule-based for transparency — banking stakeholders need to understand exactly why a customer is in each segment.

**35. How does the Churn Mitigation Simulator work?**
> Users adjust a "Campaign Intensity" slider (5–40% recovery budget). The projected saved volume is calculated as: `totalVolumeAtRisk × (intensity/100) × 0.65` (65% conversion assumption). Saved accounts: `totalAtRisk × (intensity/100) × 0.55`. ROI: `4.2 + (intensity × 0.05)`. This models diminishing returns on marketing spend.

**36. What are the 4 churn risk cohorts?**
> Critical: High-Value Stalled Transactors (52 days inactive, ₹384.5M at risk). High: Mid-Tier Velocity Decelerators (41 days, ₹215.4M). Moderate: Post-Onboarding Single-Tx Dropoffs (68 days, ₹68.3M). Low: Seasonal Low-Balance Transactors (84 days, ₹23.2M).

**37. How would you validate your RFM segments against actual business outcomes?**
> I'd track cohort behavior over time: measure actual churn rates per segment, compare predicted Volume-at-Risk with real revenue loss, A/B test the recommended playbooks, and calculate lift metrics to see if Champions truly generate more revenue than random customers.

**38. Why is Recency often the most important RFM dimension?**
> Because recency is the strongest predictor of future behavior. A customer who transacted yesterday is far more likely to transact again than one who last transacted 90 days ago, regardless of historical frequency or spend. This is backed by behavioral economics research on "recency bias."

**39. How do you determine the Pareto percentages (68.2% from top 20.4%)?**
> In SQL: `NTILE(10) OVER (ORDER BY total_spend DESC)` creates spend deciles. Then `SUM(spend) WHERE decile <= 2 / SUM(total_spend)` gives the top 20% concentration. Alternatively, `RUNNING_SUM(SUM([Amount])) / TOTAL(SUM([Amount]))` in Tableau gives a Pareto cumulative curve.

**40. What commercial playbooks did you design for each segment?**
> Champions: VIP concierge + zero-fee wire transfers. Loyal: Cross-sell mutual funds/SIPs. Big Spenders: High-yield fixed deposits + wealth advisory. Potential Loyalists: Milestone activation bonuses. At Risk: Automated cashback vouchers + RM check-ins. Dormant: Low-cost SMS/email reactivation campaigns.

---

### D. Database & SQL (41–60)

**41. Why did you choose SQLite over PostgreSQL for the runtime database?**
> SQLite with sql.js WASM allows in-browser query execution with zero server dependencies. The dataset fits in memory (~13.5MB), and the analytical workload is read-only — both ideal for SQLite. PostgreSQL DDLs are also included for production migration.

**42. What is sql.js and how does SQLite run in WebAssembly?**
> sql.js compiles the SQLite C library to WebAssembly using Emscripten. It runs entirely in JavaScript/WASM, creating an in-memory database that can be loaded from a file buffer. Queries execute locally without network round-trips.

**43. Explain the difference between a fact table and a dimension table in your schema.**
> `transactions` is the fact table — it stores individual business events (each transaction). `customers` is a dimension table — it stores descriptive attributes of the entities involved. The fact table has a foreign key to the dimension table, enabling JOINs for enriched analytical queries.

**44. Why did you create a `customer_monthly_metrics` rollup table?**
> Pre-aggregating monthly metrics avoids expensive repeated GROUP BY operations on the 1M-row transactions table. Common dashboard queries (monthly trends, active users per month) can read from this ~50K row table instead, dramatically improving response times.

**45. Explain your composite index on `(customer_id, transaction_date)`.**
> This index supports queries that filter by customer AND order/filter by date — the most common analytical pattern (e.g., "show me Customer X's transactions this month"). The composite index serves both conditions in a single B-tree traversal without a separate table lookup.

**46. What is a B-Tree index and why is it appropriate here?**
> B-Tree is a self-balancing tree structure that maintains sorted data for efficient O(log n) lookups, range scans, and ordered traversals. It's ideal for our analytical queries which involve both point lookups (`WHERE customer_id = X`) and range scans (`WHERE transaction_date BETWEEN`).

**47. How does the `NTILE(5)` window function work?**
> NTILE(5) distributes ordered rows into 5 equal-sized buckets (quintiles). If there are 1000 rows, each bucket gets 200. The first 200 rows (by the ORDER BY) get NTILE=1, next 200 get NTILE=2, etc. I use this for percentile-based RFM scoring.

**48. Explain the LAG() window function and how you use it.**
> `LAG(value, offset) OVER (ORDER BY column)` accesses a row at a specified offset BEFORE the current row. I use it for Month-over-Month growth: `LAG(total_amount, 1) OVER (ORDER BY month)` gets last month's amount, then I calculate growth as `((current - previous) / previous) * 100`.

**49. What is a CTE (Common Table Expression) and why do you use them?**
> A CTE (`WITH ... AS (...)`) is a named temporary result set that makes complex queries readable and maintainable. I use CTEs to break multi-step analytical queries into logical stages: first compute raw RFM metrics, then apply quintile scoring, then classify segments.

**50. How does ROW_NUMBER() OVER(PARTITION BY) work in your project?**
> `ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_amount DESC)` assigns a sequential number within each customer's transactions, ordered by amount. Filtering `WHERE rank = 1` gives each customer's single highest-value transaction.

**51. What is the JULIANDAY() function and why do you use it?**
> JULIANDAY() converts a date to a Julian Day Number (continuous day count). Subtracting two JULIANDAY values gives the exact number of days between dates. I use `JULIANDAY('2016-11-01') - JULIANDAY(MAX(transaction_date))` to calculate recency in days.

**52. How do you calculate percentage of total in SQL?**
> Using a correlated subquery: `ROUND(SUM(monetary_value) * 100.0 / (SELECT SUM(monetary_value) FROM customer_rfm), 2) AS revenue_share_pct`. The subquery calculates the total, and the main query divides each group's sum by it.

**53. What is the difference between DENSE_RANK(), RANK(), and ROW_NUMBER()?**
> ROW_NUMBER: No ties — sequential 1,2,3,4. RANK: Ties get same rank, then skips — 1,1,3,4. DENSE_RANK: Ties get same rank, no gaps — 1,1,2,3. I use DENSE_RANK for "Top 20 customers by spend" to handle tie situations properly.

**54. How would you optimize a slow query on the transactions table?**
> First check `EXPLAIN QUERY PLAN` to see if indexes are being used. Add covering indexes that include all columns needed by the query. Consider pre-aggregating common patterns into materialized views. Partition the table by month for range queries. Use `LIMIT` for exploratory queries.

**55. What SQL injection risks exist in your `/api/execute-sql` endpoint?**
> The endpoint accepts arbitrary SQL, which is inherently risky. My blocklist approach (checking for DROP/DELETE/UPDATE/INSERT) can be bypassed with SQL comments or creative syntax. In production, I'd use a read-only database connection, parameterized queries, or a SQL AST parser to whitelist only SELECT statements.

**56. Explain the schema for `customer_rfm` and its purpose.**
> It stores pre-computed RFM analytics per customer: recency (days since last tx), frequency (tx count), monetary value (total spend), individual R/F/M scores (1-5), composite score (e.g., "555"), and the classified segment name. This avoids recalculating RFM on every dashboard load.

**57. How would you migrate from SQLite to PostgreSQL?**
> The `database/schema.sql` already contains PostgreSQL-compatible DDLs with `SERIAL`, `NUMERIC`, and `CHECK` constraints. I'd set up a PostgreSQL instance, run the schema DDL, modify the Python database.py to use `psycopg2` instead of `sqlite3`, and adjust any SQLite-specific functions (e.g., `JULIANDAY` → `DATE_PART`).

**58. What is the purpose of CHECK constraints in your schema?**
> They enforce data integrity at the database level: `age BETWEEN 10 AND 100` prevents invalid ages, `gender IN ('M','F','UNKNOWN')` restricts values, `transaction_amount >= 0` prevents negative amounts, `r_score BETWEEN 1 AND 5` ensures valid quintile scores. This catches bugs before bad data enters the system.

**59. How does your monthly aggregation query work?**
> `INSERT INTO customer_monthly_metrics SELECT customer_id, month, COUNT(transaction_id), ROUND(SUM(amount),2), ROUND(AVG(amount),2), COUNT(DISTINCT date), MAX(date) FROM transactions GROUP BY customer_id, month`. This pre-computes per-customer-per-month metrics for fast dashboard queries.

**60. What's the difference between `COUNT(*)` and `COUNT(DISTINCT customer_id)`?**
> `COUNT(*)` counts all rows (including duplicates). `COUNT(DISTINCT customer_id)` counts unique customers. In the geographic query, `COUNT(DISTINCT customer_id)` gives unique customers per location, while `COUNT(transaction_id)` gives total transactions — a customer may have multiple transactions.

---

### E. Backend & API Design (61–70)

**61. How does your Express server handle both development and production modes?**
> In development, Vite is integrated as Express middleware (`createViteServer({ middlewareMode: true })`) for HMR. In production (`NODE_ENV=production`), it serves static files from `dist/` and handles SPA routing with a catch-all `app.get('*')` handler.

**62. Explain the singleton database pattern in your `getDb()` function.**
> `getDb()` is a lazy-initialization singleton. On first call, it initializes sql.js WASM and loads the database file into memory. The instance is cached in `dbInstance`. Subsequent calls return the cached instance immediately, avoiding re-initialization overhead.

**63. What happens if the database file doesn't exist?**
> The code checks `fs.existsSync(DB_PATH)`. If the file is missing, it logs a warning and creates an empty in-memory database instead. The API endpoints also have hardcoded fallback values for KPIs, ensuring the frontend still renders with baseline data.

**64. Why do you use `stmt.prepare()` and `stmt.step()` instead of `db.exec()`?**
> `prepare() + step() + getAsObject()` is more efficient for queries returning multiple rows — it avoids creating intermediate arrays and gives row-level control. `getAsObject()` returns each row as a key-value object, which is directly JSON-serializable for the REST API response.

**65. How would you add authentication to this API?**
> Implement JWT-based auth: add a `/api/login` endpoint that validates credentials and returns a signed JWT. Add Express middleware that verifies the JWT from the `Authorization: Bearer <token>` header on protected routes. Use bcrypt for password hashing and a users table in the database.

**66. How would you add rate limiting to prevent abuse of the SQL execution endpoint?**
> Use `express-rate-limit` middleware: `app.use('/api/execute-sql', rateLimit({ windowMs: 15*60*1000, max: 100 }))`. This limits to 100 queries per 15-minute window per IP. For production, use Redis-backed rate limiting for distributed deployments.

**67. What error handling patterns does your API use?**
> Try-catch blocks around all database operations. Errors return structured JSON: `res.status(500).json({ error: err.message })` for server errors, `res.status(400).json({ error: "..." })` for client errors (bad SQL, missing parameters). The SQL runner also has specific validation errors for destructive queries.

**68. How does the Vite middleware integration work?**
> `createViteServer({ server: { middlewareMode: true }, appType: 'spa' })` creates a Vite dev server that operates as Express middleware rather than a standalone server. Express handles API routes (`/api/*`) while Vite middleware handles frontend asset serving, HMR WebSocket, and module transformation.

**69. How would you add caching to improve API performance?**
> For the KPI and RFM endpoints (which return stable aggregates), implement server-side caching with `node-cache` or Redis: cache results with a TTL (e.g., 5 minutes). Add `ETag` and `Cache-Control` headers for browser caching. The monthly trends endpoint can cache indefinitely since historical data doesn't change.

**70. What CORS considerations would you need for production deployment?**
> Currently, the frontend and backend are on the same origin (port 3000). In production with separate deployments, I'd add `cors` middleware: `app.use(cors({ origin: 'https://aegisfin.example.com', credentials: true }))` to whitelist the frontend domain and allow cookies/auth headers.

---

### F. Frontend & React (71–85)

**71. Why did you choose React 19 and what new features does it offer?**
> React 19 includes the new compiler for automatic memoization, improved concurrent rendering, `use()` hook for promises, server components support, and better error handling. I chose it for the latest performance optimizations and future-proofing.

**72. Why didn't you use a state management library like Redux or Zustand?**
> The application's state is mostly local to individual views — each dashboard tab manages its own filters, selections, and query results independently. There's no complex cross-component state synchronization needed, so React's built-in `useState` is sufficient and avoids unnecessary complexity.

**73. How does the tab navigation system work?**
> The root `App.tsx` manages an `activeTab` state string. The `Sidebar` component calls `setActiveTab()` on click. The main content area conditionally renders the appropriate component: `{activeTab === "rfm" && <RFMExplorer />}`. This is a simple pattern that avoids the overhead of a router library.

**74. How does the SQL Runner component execute queries?**
> It POSTs the editor content to `/api/execute-sql`, measures latency with `performance.now()`, and renders the JSON response as a dynamic table. If the API call fails (backend unavailable), it falls back to `fallbackResults()` which generates type-appropriate mock data based on the selected SQL file name.

**75. How does the churn simulation slider work technically?**
> It's a controlled `<input type="range">` with state `discountIntervention`. On change, React re-renders the calculation: `estimatedSavedVolume = totalVolumeAtRisk × (slider/100) × 0.65`. The projected saved accounts and ROI multiple also recalculate reactively, giving instant visual feedback.

**76. How do you handle the TypeScript interfaces for data types?**
> `types.ts` defines interfaces for every data entity: `KPIOverview`, `RFMSegment`, `GeographicMetric`, `MonthlyTrend`, `SQLFile`, `ChurnRiskCohort`, `PipelineStageMetric`. These are used as props types in components and ensure compile-time checking of data shapes.

**77. Explain the glassmorphism design approach you used.**
> Dark glassmorphism uses semi-transparent backgrounds (`bg-slate-900/70`), backdrop blur (`backdrop-blur-xl`), subtle borders (`border-slate-800/80`), and layered ambient glow effects (positioned absolute blur-3xl divs) to create a depth-rich, modern enterprise aesthetic.

**78. How do you make the dashboard responsive?**
> Using Tailwind's responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. KPI cards stack vertically on mobile, 2-column on tablet, 4-column on desktop. The sidebar collapses, and content areas use `overflow-x-auto` for tables. Max width is constrained with `max-w-7xl w-full mx-auto`.

**79. How does the mock data fallback strategy ensure resilience?**
> `mockData.ts` contains production-realistic data for every dashboard module. Components receive this data as props from `App.tsx`. If API fetches fail, the mock data is already loaded. The SQLRunner even has filename-based mock results (checking if the file contains "rfm", "customer", "geographic" etc.).

**80. How would you add real-time data updates to the dashboard?**
> Replace REST polling with WebSockets (Socket.io) or Server-Sent Events for push-based updates. Add a `useEffect` with a WebSocket listener that updates state when new transactions arrive. Alternatively, use React Query with `refetchInterval` for simpler polling-based reactivity.

**81. What is the Lucide icon library and why did you choose it?**
> Lucide is a fork of Feather Icons providing 1000+ clean, consistent SVG icons as React components. It's tree-shakeable (only imported icons are bundled), TypeScript-native, and stylistically matches the minimalist enterprise aesthetic of AegisFin.

**82. How would you add testing to the frontend?**
> Unit tests with Vitest + React Testing Library for component rendering and user interactions. Integration tests for the SQLRunner's API flow with MSW (Mock Service Worker). E2E tests with Playwright for full user journey testing (navigate → select segment → verify data display).

**83. Explain the conditional rendering pattern in your segment filter.**
> The RFM Explorer uses a `filterMode` state ("ALL", "HIGH_VALUE", "AT_RISK"). The segments array is filtered: `rfmSegments.filter(seg => filterMode === "HIGH_VALUE" ? ["Champions","Loyal Customers","Big Spenders"].includes(seg.segment) : true)`. Only matching cards render.

**84. How does the copy-to-clipboard feature work in the SQL Runner?**
> `navigator.clipboard.writeText(activeCode)` copies the SQL. State `copied` toggles to `true`, changing the button icon from `Copy` to `Check` with a green checkmark. `setTimeout(() => setCopied(false), 2000)` resets after 2 seconds.

**85. Why did you use Vite over Webpack or other bundlers?**
> Vite provides instant dev server startup (no bundling on start), sub-second HMR via native ES modules, and uses esbuild (Go-based) for 10-100x faster production builds. It's the modern standard for React/TypeScript projects and integrates natively with Tailwind v4.

---

### G. Business & Domain Knowledge (86–95)

**86. What is Customer Lifetime Value (CLV) and how does your project relate to it?**
> CLV predicts the total revenue a customer will generate over their entire relationship. My RFM analysis is a proxy for CLV — Champions with high frequency and monetary scores have the highest predicted CLV. The turnover velocity ratio (spend/balance) in the SQL suite directly measures CLV intensity.

**87. Explain the Pareto principle in the context of your banking data.**
> In AegisFin, the top 20.4% of customers generate 68.2% of transaction volume. This is close to the classic 80/20 rule and means the bank's revenue is highly concentrated. Losing even a small number of Champions would have outsized revenue impact — justifying premium retention investments.

**88. What are Tier-1 vs Tier-2 metropolitan clusters?**
> Tier-1 Metros (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata) are established high-volume banking markets. Tier-2 Growth Hubs (Pune, Ahmedabad, Surat, Jaipur) have lower current volume but higher growth potential. This classification drives different marketing strategies.

**89. What is Volume-at-Risk and how do you calculate it?**
> Volume-at-Risk is the total transaction revenue that could be lost if at-risk customers churn. It's the sum of historical monetary value for customers in churn-risk cohorts. In AegisFin, ₹691.4M total is at risk across 4 cohorts.

**90. How would a bank actually use your churn simulator?**
> A banking CRM manager would adjust the campaign budget slider to find the optimal investment level. For example: at 18% intensity, they'd save ₹56.8M in volume and retain 18,500 accounts with a 5.1× ROI. They'd compare this against the actual cost of cashback/fee-waiver campaigns to make budget decisions.

**91. What is an RFM score of "111" and what action would you take?**
> Score 111 means bottom quintile on all dimensions — low recency, low frequency, low spend. This is a "Dormant/Lost" customer. Action: low-cost automated re-engagement (SMS/email), and if unresponsive, flag for account closure review. Don't invest expensive relationship manager time.

**92. Why is transaction velocity (txs/customer) an important metric?**
> It measures engagement intensity. AegisFin's 1.19 txs/customer indicates many customers are single-transaction users. Increasing velocity (via gamified streaks, auto-debits, bill pay features) directly grows revenue without needing to acquire new customers.

**93. What is a Level-of-Detail (LOD) expression in Tableau?**
> LOD expressions compute aggregations at different granularity levels than the visual display. `{FIXED [CustomerID] : SUM([TransactionAmount])}` calculates total spend per customer regardless of what dimensions are in the view. I use this for customer-level metrics in metro-level dashboards.

**94. How would you extend this project with machine learning?**
> Add: (1) Churn prediction model using gradient boosting on RFM features + transaction recency decay curves, (2) Customer segmentation via K-Means clustering on normalized R/F/M, (3) Anomaly detection for fraud using isolation forests on transaction amounts/times, (4) Next-best-offer recommendation using collaborative filtering.

**95. What banking regulations would you consider in production?**
> PCI-DSS for payment data security, RBI data localization requirements for Indian banking data, GDPR/IT Act for PII handling, SOC 2 for security controls, data encryption at rest and in transit, audit logging for all data access, and role-based access control (RBAC) for different user levels.

---

### H. System Design & Architecture (96–100)

**96. How would you redesign this for 100 million transactions?**
> Replace SQLite with PostgreSQL/TimescaleDB for time-series optimization. Add columnar storage (ClickHouse/DuckDB) for OLAP queries. Implement materialized views for pre-computed aggregates. Use Redis for API response caching. Add a job queue (Bull/Celery) for async RFM recomputation. Partition transactions by month for faster range queries.

**97. How would you implement a real-time streaming version?**
> Kafka for event ingestion of live bank transactions. Flink/Spark Streaming for real-time RFM score updates (sliding window computations). PostgreSQL CDC for keeping the analytics database in sync. WebSocket push from Express to React for live dashboard updates. Redis Streams for lightweight event notification.

**98. What observability would you add in production?**
> Application monitoring with Prometheus + Grafana for API latency/error rates. Structured logging with Winston/Pino to ELK stack. Distributed tracing with OpenTelemetry. Database query performance monitoring with pg_stat_statements. Alerting on KPI anomalies (e.g., sudden drop in daily transaction volume).

**99. How would you implement multi-tenant support for multiple banks?**
> Database-per-tenant for data isolation (each bank gets its own schema). Tenant ID in JWT token, middleware extracts and routes to the correct database connection. Shared application layer with tenant-aware configuration. Kubernetes namespaces for infrastructure isolation. Separate ETL pipelines per tenant with tenant-specific data transformation rules.

**100. Design a system to process real-time fraud detection alongside your analytics.**
> Add a parallel processing path: incoming transactions flow through both (1) the analytics pipeline (batch RFM updates) and (2) a real-time fraud detection service. The fraud service uses: rule-based checks (amount > threshold, unusual time), ML model inference (isolation forest trained on historical patterns), velocity checks (>N transactions in M minutes). Flag suspicious transactions for manual review while letting clean transactions proceed to the analytics pipeline. Store fraud signals in a separate table for the dashboard to display.

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    INTERVIEW QUICK REFERENCE                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PROJECT: AegisFin - Banking Intelligence Platform          │
│  SCALE:   1M+ txns | 884K customers | 16 metros | ₹2.34B  │
│                                                             │
│  FRONTEND: React 19 + TypeScript 5.8 + Tailwind v4         │
│  BACKEND:  Express.js + sql.js WebAssembly                  │
│  DATABASE: SQLite (WASM) + PostgreSQL DDLs                  │
│  ETL:      Python 3.11 (csv stdlib)                         │
│  BUILD:    Vite 6 + esbuild                                 │
│                                                             │
│  KEY FEATURES:                                              │
│  ✓ ETL pipeline with median age imputation                  │
│  ✓ RFM quantile segmentation (6 tiers)                      │
│  ✓ Churn risk simulator with ROI modeling                   │
│  ✓ Live SQL WASM execution in browser                       │
│  ✓ 7 production SQL suites (27+ queries)                    │
│  ✓ Geographic metro clustering (Tier-1/Tier-2)              │
│  ✓ Tableau/Power BI blueprint specs                         │
│                                                             │
│  SQL TECHNIQUES:                                            │
│  • CTEs, NTILE(5), LAG(), ROW_NUMBER()                      │
│  • JULIANDAY() date arithmetic                              │
│  • Correlated subqueries for % of total                     │
│  • Composite indexing (12 B-tree indexes)                   │
│  • SUM() OVER() running totals                              │
│                                                             │
│  RFM SCORING: 1-5 quintiles, anchor date 2016-11-01        │
│  Champions: R≥4, F≥4, M≥4                                   │
│  At Risk:   R≤2, F≥3                                         │
│  Dormant:   R≤2, F≤2, M≤2                                   │
│                                                             │
│  NUMBERS TO REMEMBER:                                       │
│  Pareto: Top 20% → 68.2% volume                             │
│  Avg Ticket: ₹6,880.89                                       │
│  Velocity: 1.19 txs/customer                                │
│  Retention: 76.4%                                            │
│  DB Size: 13.5 MB, 12 indexes, 4 tables                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

*Good luck with your interview! Remember: demonstrate not just what you built, but WHY you made each technical decision.*
