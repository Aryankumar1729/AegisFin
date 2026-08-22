export interface KPIOverview {
  total_customers: number;
  total_transactions: number;
  total_transaction_value: number;
  total_transaction_value_inr?: number;
  avg_transaction_value: number;
  avg_transaction_value_inr?: number;
  total_account_balance: number;
  avg_account_balance: number;
  avg_transactions_per_customer?: number;
  customer_retention_rate?: number;
  metro_concentration_pct?: number;
}

export interface RFMSegment {
  customer_segment: string;
  customer_count: number;
  total_monetary: number;
  avg_monetary: number;
  avg_frequency: number;
  avg_recency: number;
  color_code?: string;
  strategy_tagline?: string;
}

export interface GeographicMetric {
  location: string;
  customer_count: number;
  transaction_count: number;
  total_amount: number;
  avg_amount: number;
  tier?: "Tier-1 Metro" | "Tier-2 Growth Hub" | "Regional";
}

export interface MonthlyTrend {
  month: string;
  transaction_count: number;
  total_amount: number;
  avg_amount: number;
  active_customers: number;
  mom_growth_pct?: number;
}

export interface SQLFile {
  filename: string;
  title: string;
  content: string;
  description?: string;
}

export interface ChurnRiskCohort {
  cohort_name: string;
  customer_count: number;
  volume_at_risk: number;
  avg_inactivity_days: number;
  risk_level: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
  recommended_playbook: string;
}

export interface PipelineStageMetric {
  step: string;
  name: string;
  status: "PASSED" | "OPTIMAL" | "VALIDATED";
  rows: string;
  latency: string;
  details: string;
}

