-- =================================================================
-- AegisFin: Enterprise Banking Customer & Transaction Analytics
-- Relational Analytical Database Schema Definition (PostgreSQL / SQLite Compatible)
-- =================================================================

DROP TABLE IF EXISTS customer_monthly_metrics CASCADE;
DROP TABLE IF EXISTS customer_rfm CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS locations CASCADE;

-- 1. LOCATIONS DIMENSION TABLE
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    location_name VARCHAR(100) UNIQUE NOT NULL,
    state VARCHAR(50),
    region_zone VARCHAR(50),
    is_metro BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CUSTOMERS DIMENSION TABLE
CREATE TABLE customers (
    customer_id VARCHAR(50) PRIMARY KEY,
    dob DATE,
    age INT CHECK (age IS NULL OR (age >= 10 AND age <= 100)),
    age_imputed INT DEFAULT 31,
    gender VARCHAR(10) CHECK (gender IN ('M', 'F', 'UNKNOWN')),
    location VARCHAR(100),
    account_balance NUMERIC(15, 2) DEFAULT 0.00,
    tx_count INT DEFAULT 0,
    total_spend NUMERIC(15, 2) DEFAULT 0.00,
    first_transaction_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TRANSACTIONS FACT TABLE
CREATE TABLE transactions (
    transaction_id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    transaction_date DATE NOT NULL,
    transaction_time TIME NOT NULL,
    transaction_amount NUMERIC(15, 2) NOT NULL CHECK (transaction_amount >= 0),
    account_balance NUMERIC(15, 2) NOT NULL,
    location VARCHAR(100),
    month VARCHAR(7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. CUSTOMER RFM ANALYTICAL TABLE
CREATE TABLE customer_rfm (
    customer_id VARCHAR(50) PRIMARY KEY REFERENCES customers(customer_id) ON DELETE CASCADE,
    last_transaction_date DATE NOT NULL,
    recency INT NOT NULL, -- Days since 2016-11-01
    frequency INT NOT NULL, -- Transaction count
    monetary_value NUMERIC(15, 2) NOT NULL, -- Total transaction amount INR
    r_score INT CHECK (r_score BETWEEN 1 AND 5),
    f_score INT CHECK (f_score BETWEEN 1 AND 5),
    m_score INT CHECK (m_score BETWEEN 1 AND 5),
    rfm_score VARCHAR(10) NOT NULL, -- e.g., '555'
    customer_segment VARCHAR(50) NOT NULL, -- e.g., 'Champions', 'At Risk'
    location VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. CUSTOMER MONTHLY AGGREGATES TABLE
CREATE TABLE customer_monthly_metrics (
    customer_id VARCHAR(50) NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    month VARCHAR(7) NOT NULL, -- YYYY-MM format
    transaction_count INT NOT NULL DEFAULT 0,
    total_transaction_value NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    average_transaction_value NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    active_days INT NOT NULL DEFAULT 0,
    last_transaction_date DATE NOT NULL,
    PRIMARY KEY (customer_id, month)
);
