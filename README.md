# AegisFin — Enterprise Banking Customer Intelligence & Transaction Analytics Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11-yellow?logo=python)](https://python.org)
[![SQLite](https://img.shields.io/badge/SQLite-WASM-003B57?logo=sqlite)](https://sqlite.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)

**AegisFin** is a full-stack commercial banking intelligence and transaction analytics platform. It provides end-to-end data pipelines, quantile-based RFM behavioral segmentation, churn risk modeling, interactive SQL query execution, and high-performance BI dashboards across 1,000,000+ banking transactions.

---

## 🏛️ System Architecture

```
+-----------------------------------------------------------------------------------+
|                           AEGISFIN DATA INTELLIGENCE PLATFORM                     |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ Data Generation & Ingestion ]                                                  |
|         │                                                                         |
|         ▼                                                                         |
|  [ Python ETL Engine (src/data_cleaning.py) ]                                     |
|     ├── Missing Value & DOB Imputation                                            |
|     ├── 16 Metropolitan Cluster Standardizations                                  |
|     └── Relational Decomposition (customers, transactions, locations)             |
|         │                                                                         |
|         ▼                                                                         |
|  [ RFM Quantile Behavioral Engine (src/rfm_analysis.py) ]                         |
|     ├── Recency Score (R: 1-5 via Quantile Inactivity Windows)                    |
|     ├── Frequency Score (F: 1-5 via Transaction Velocity)                         |
|     └── Monetary Score (M: 1-5 via Aggregate Throughput Volume)                  |
|         │                                                                         |
|         ▼                                                                         |
|  [ Storage Layer (PostgreSQL 15 & SQLite WASM) ]                                  |
|     ├── B-Tree Composite Indexing                                                 |
|     └── 7 Production Analytical SQL Suites (sql/*.sql)                            |
|         │                                                                         |
|         ▼                                                                         |
|  [ Express.js Backend & Interactive Analytics UI (React 19 + Tailwind CSS) ]      |
|     ├── Executive Banking Liquidity & KPI Telemetry                               |
|     ├── RFM Behavioral Studio & Commercial Playbooks                              |
|     ├── Churn Risk Cohorts & Retention Mitigation Simulator                       |
|     ├── Live SQL Studio with In-Memory WebAssembly Execution                      |
|     └── Metro Market Concentration Heatmaps                                       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## ✨ Key Capabilities & Modules

### 1. Executive Liquidity & KPI Telemetry
- Real-time aggregation of **Gross Processed Volume (₹2.34B)**, **Active Account Base (884K+ accounts)**, **Average Ticket Size (₹6,880.89)**, and **Mean Velocity**.
- Pareto 80/20 customer concentration visualizers.
- Monthly transaction volume trajectories and growth velocity charts.

### 2. Behavioral RFM Quantile Engine
- Quantile-based classification across 6 distinct behavioral tiers:
  - **Champions:** Highest Recency, Frequency & Monetary (Score 555).
  - **Loyal Customers:** Consistent transaction velocity and recurring volume.
  - **Big Spenders:** High single-ticket transaction volume with substantial deposit reserves.
  - **Potential Loyalists:** Recently onboarded accounts with accelerating throughput.
  - **At Risk:** Historically high spend with declining recency (30–60+ days dormancy).
  - **Dormant / Lost:** Lapsed accounts with low recency, frequency, and monetary scores.

### 3. Predictive Churn & Retention Risk Engine
- Automated risk classification across 4 risk tiers (**Critical, High, Moderate, Low**).
- Real-time calculation of **Volume-at-Risk** and **Dormancy Windows**.
- Interactive **Churn Mitigation Simulator** modeling project retention yields and ROI for targeted commercial cashback/fee-waiver campaigns.

### 4. Live SQL Studio (WASM Execution Engine)
- In-memory execution of production-grade analytical SQL queries directly in the browser via SQLite WebAssembly.
- Query performance benchmarking (execution latency in milliseconds, row counts, and error telemetry).
- Comprehensive SQL query library covering:
  - `01_business_overview.sql`
  - `02_transaction_analysis.sql`
  - `03_customer_analysis.sql`
  - `04_rfm_analysis.sql`
  - `05_segmentation.sql`
  - `06_geographic_analysis.sql`
  - `07_advanced_sql.sql`

### 5. Metropolitan Market Penetration Matrix
- Spatial analysis across 16 primary Indian metropolitan clusters (Mumbai, New Delhi, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, etc.).
- Tier-1 Metro vs. Tier-2 Growth Hub categorization and volume contribution rankings.

### 6. Tableau & BI Architecture Blueprints
- Standardized calculated fields and Level-of-Detail (LOD) expressions for Tableau Desktop and Power BI.
- Complete 12-column responsive layout blueprints.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript 5.8, Tailwind CSS v4, Lucide Icons |
| **Data Engine & Storage** | SQLite 3 (sql.js WebAssembly), PostgreSQL 15 DDLs |
| **Backend API** | Node.js, Express.js, TypeScript |
| **ETL & Data Science** | Python 3.11, Pandas, NumPy, Scikit-Learn, Jupyter |
| **Typography & Styling** | Google Fonts (*Plus Jakarta Sans*, *JetBrains Mono*), Dark Glassmorphism |

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher
- **Python**: v3.9+ (optional for re-running ETL pipelines)

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/aegisfin-analytics-suite.git
cd aegisfin-analytics-suite

# Install Node dependencies
npm install
```

### 2. Run the Development Server
```bash
# Starts both the Vite frontend and Express WASM SQL backend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. (Optional) Run the Python ETL Pipeline
```bash
# Generate synthetic raw banking dataset with realistic anomalies
python3 src/generate_data.py

# Execute cleaning, median DOB imputation, and schema normalization
python3 src/data_cleaning.py

# Calculate RFM quantiles and behavioral segmentation
python3 src/rfm_analysis.py

# Build SQLite database and composite B-tree indexes
python3 src/database.py
```

---

## 📊 Database Schema

```sql
-- Customers Dimension Table
CREATE TABLE customers (
    customer_id VARCHAR(20) PRIMARY KEY,
    gender VARCHAR(1),
    dob DATE,
    age INTEGER,
    location VARCHAR(100),
    account_balance DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- High-Volume Transactions Fact Table
CREATE TABLE transactions (
    transaction_id VARCHAR(30) PRIMARY KEY,
    customer_id VARCHAR(20) REFERENCES customers(customer_id),
    transaction_date DATE NOT NULL,
    transaction_time TIME,
    month VARCHAR(7),
    hour INTEGER,
    transaction_amount DECIMAL(15, 2) NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Behavioral RFM Analytical Table
CREATE TABLE customer_rfm (
    customer_id VARCHAR(20) PRIMARY KEY REFERENCES customers(customer_id),
    recency INTEGER,
    frequency INTEGER,
    monetary_value DECIMAL(15, 2),
    r_score INTEGER,
    f_score INTEGER,
    m_score INTEGER,
    rfm_score VARCHAR(3),
    customer_segment VARCHAR(50)
);
```

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
