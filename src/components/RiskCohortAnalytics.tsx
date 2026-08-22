import React, { useState } from "react";
import { ChurnRiskCohort } from "../types";
import { 
  AlertTriangle, 
  ShieldAlert, 
  TrendingDown, 
  Zap, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { churnRiskCohortsData } from "../data/mockData";

export const RiskCohortAnalytics: React.FC = () => {
  const [selectedCohort, setSelectedCohort] = useState<string>(churnRiskCohortsData[0].cohort_name);
  const [discountIntervention, setDiscountIntervention] = useState<number>(18);

  const totalAtRiskUsers = churnRiskCohortsData.reduce((acc, c) => acc + c.customer_count, 0);
  const totalVolumeAtRisk = churnRiskCohortsData.reduce((acc, c) => acc + c.volume_at_risk, 0);

  const estimatedSavedVolume = Math.round(totalVolumeAtRisk * (discountIntervention / 100) * 0.65);
  const estimatedSavedAccounts = Math.round(totalAtRiskUsers * (discountIntervention / 100) * 0.55);

  const activeCohortData = churnRiskCohortsData.find(c => c.cohort_name === selectedCohort) || churnRiskCohortsData[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/80 p-6 lg:p-7 shadow-2xl shadow-black/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Predictive Churn & Retention Risk Engine</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Retention Risk Cohort Analysis</h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Real-time churn risk classification based on recency decay, balance turnover velocity, and channel drop-off thresholds.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono shrink-0">
          <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
            <span className="text-slate-400 text-[10px] uppercase font-semibold block">Accounts At Risk</span>
            <span className="font-bold text-amber-400 text-sm">{totalAtRiskUsers.toLocaleString()}</span>
          </div>
          <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
            <span className="text-slate-400 text-[10px] uppercase font-semibold block">Total Volume At Risk</span>
            <span className="font-bold text-rose-400 text-sm">₹{(totalVolumeAtRisk / 1e6).toFixed(1)}M</span>
          </div>
        </div>
      </div>

      {/* Cohort Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {churnRiskCohortsData.map((cohort) => {
          const isSelected = selectedCohort === cohort.cohort_name;

          return (
            <div
              key={cohort.cohort_name}
              onClick={() => setSelectedCohort(cohort.cohort_name)}
              className={`rounded-2xl p-5 cursor-pointer transition-all duration-300 border shadow-lg flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 border-amber-400/90 ring-2 ring-amber-400/30 shadow-amber-500/10 scale-[1.01]"
                  : "bg-slate-900/70 backdrop-blur-xl border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider ${
                    cohort.risk_level === "CRITICAL" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                    cohort.risk_level === "HIGH" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                    cohort.risk_level === "MODERATE" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" :
                    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {cohort.risk_level} RISK
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {cohort.avg_inactivity_days}d Inactive
                  </span>
                </div>

                <h3 className="font-bold text-white text-xs leading-snug font-sans">{cohort.cohort_name}</h3>

                <div className="mt-3.5 space-y-1.5 text-xs font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between text-slate-400">
                    <span>Accounts:</span>
                    <span className="text-white font-semibold">{cohort.customer_count.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Volume at Risk:</span>
                    <span className="text-rose-400 font-semibold">₹{(cohort.volume_at_risk / 1e6).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
                <span className="text-[10px] font-mono text-sky-400 uppercase font-semibold block mb-0.5">Automated Playbook:</span>
                <p className="line-clamp-2 leading-relaxed text-slate-400">{cohort.recommended_playbook}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Churn Mitigation Simulation Engine */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 lg:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-sans">Automated Churn Mitigation Simulator</h3>
              <p className="text-xs text-slate-400 mt-0.5">Simulate promotional yield and saved throughput against promotional spend.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 font-bold">
            Simulated ROI Model: 4.8×
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Target Promotional Campaign Intensity:</span>
              <span className="text-sky-400 font-bold text-sm">{discountIntervention}% Recovery Budget</span>
            </div>
            
            <input
              type="range"
              min={5}
              max={40}
              step={1}
              value={discountIntervention}
              onChange={(e) => setDiscountIntervention(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-500 border border-slate-800"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Low Intensity (5%)</span>
              <span>Moderate (20%)</span>
              <span>High Intensity (40%)</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Adjust campaign budget parameter to model projected customer retention yield and saved throughput volume across all 4 risk cohorts.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 text-xs font-mono space-y-3 shadow-inner">
            <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-slate-800/80">
              <span>Projected Saved Volume:</span>
              <span className="text-emerald-400 font-extrabold text-base">₹{(estimatedSavedVolume / 1e6).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Retained Customer Accounts:</span>
              <span className="text-white font-bold">{estimatedSavedAccounts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Projected Net ROI Multiple:</span>
              <span className="text-sky-400 font-bold">{(4.2 + (discountIntervention * 0.05)).toFixed(1)}× Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
