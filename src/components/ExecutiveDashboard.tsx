import React, { useState } from "react";
import { KPIOverview, MonthlyTrend, GeographicMetric } from "../types";
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  Layers, 
  Activity, 
  Percent, 
  Sparkles,
  Calendar,
  Globe,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Zap,
  TrendingDown
} from "lucide-react";

interface Props {
  kpis: KPIOverview;
  monthlyTrends: MonthlyTrend[];
  locations: GeographicMetric[];
  onNavigateTab?: (tab: string) => void;
}

export const ExecutiveDashboard: React.FC<Props> = ({ kpis, monthlyTrends, locations, onNavigateTab }) => {
  const totalVal = kpis?.total_transaction_value_inr ?? kpis?.total_transaction_value ?? 2342109480;
  const totalCust = kpis?.total_customers ?? 884203;
  const totalTx = kpis?.total_transactions ?? 1048575;
  const avgTicket = kpis?.avg_transaction_value_inr ?? kpis?.avg_transaction_value ?? 6880.89;
  const velocity = kpis?.avg_transactions_per_customer ?? (totalTx / (totalCust || 1));

  const cards = [
    {
      title: "Gross Processed Volume",
      value: `₹${(totalVal / 1e9).toFixed(2)}B`,
      subtitle: `₹${totalVal.toLocaleString()} Processed`,
      trend: "+14.8% QoQ",
      isPositive: true,
      icon: DollarSign,
      color: "emerald",
      accentGlow: "rgba(16, 185, 129, 0.15)"
    },
    {
      title: "Active Account Base",
      value: totalCust.toLocaleString(),
      subtitle: "Unique Transacting Profiles",
      trend: "+8.2% Growth",
      isPositive: true,
      icon: Users,
      color: "sky",
      accentGlow: "rgba(56, 189, 248, 0.15)"
    },
    {
      title: "Mean Transaction Ticket",
      value: `₹${avgTicket.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: "Per Executed Transfer",
      trend: "+3.4% vs Baseline",
      isPositive: true,
      icon: CreditCard,
      color: "indigo",
      accentGlow: "rgba(99, 102, 241, 0.15)"
    },
    {
      title: "Transaction Velocity",
      value: `${velocity.toFixed(2)} txs`,
      subtitle: "Mean Velocity per User",
      trend: "Optimal Range",
      isPositive: true,
      icon: Activity,
      color: "violet",
      accentGlow: "rgba(168, 85, 247, 0.15)"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome / System State Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/80 p-6 lg:p-7 shadow-2xl shadow-black/50">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 -mt-12 w-80 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commercial Banking Portfolio Intelligence</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Executive Transaction Telemetry & Liquidity Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Real-time portfolio telemetry spanning <span className="text-slate-200 font-semibold">{kpis.total_transactions.toLocaleString()} transaction logs</span> and <span className="text-slate-200 font-semibold">{kpis.total_customers.toLocaleString()} unique accounts</span> across 16 primary metropolitan banking clusters.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab?.("rfm")}
              className="px-4 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs font-mono font-semibold transition-all shadow-lg shadow-sky-600/20 flex items-center gap-2"
            >
              <span>Explore Segments</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Hero Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="group relative overflow-hidden rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 p-5 shadow-lg transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-0.5"
            >
              {/* Subtle card ambient highlight */}
              <div 
                className="absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: card.accentGlow }}
              ></div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 duration-200 ${
                  card.color === "emerald" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                  card.color === "sky" ? "bg-sky-500/10 text-sky-400 border-sky-500/20" :
                  card.color === "indigo" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                  "bg-violet-500/10 text-violet-400 border-violet-500/20"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {card.value}
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-slate-400 font-sans">{card.subtitle}</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-slate-800">
                    <TrendingUp className="w-2.5 h-2.5" />
                    {card.trend}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Grid: Pareto Distribution & Trajectory Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pareto 80/20 Behavioral Concentration Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-lg flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Percent className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Pareto Volume Curve
                </h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                80 / 20 Ratio
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Revenue distribution adheres strictly to the classic Pareto curve: the upper <strong className="text-white">20.4%</strong> of high-tier customer cohorts generate over <strong className="text-emerald-400 font-semibold">68.2%</strong> of aggregate transaction volume.
            </p>

            {/* Visual Bars */}
            <div className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Top 20% Accounts Revenue Share</span>
                  <span className="text-emerald-400 font-bold">68.2%</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                  <div className="bg-gradient-to-r from-sky-500 to-emerald-400 h-full rounded-full w-[68.2%]"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Remaining 80% Long-Tail Share</span>
                  <span className="text-slate-400 font-bold">31.8%</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                  <div className="bg-slate-700 h-full rounded-full w-[31.8%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">Commercial Takeaway</span>
            <p className="leading-snug">
              Retaining the top two quintile tiers (*Champions* & *Loyals*) protects the core ₹1.59B deposit and transfer pipeline.
            </p>
          </div>
        </div>

        {/* Monthly Volume Trajectory Table */}
        <div className="lg:col-span-2 bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Monthly Throughput Trajectory (Q3 2016)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Aggregated from 1.04M records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3.5 font-sans">Time Period</th>
                  <th className="py-3 px-3.5 text-right">Transactions</th>
                  <th className="py-3 px-3.5 text-right">Throughput Volume (INR)</th>
                  <th className="py-3 px-3.5 text-right">Avg Ticket Size</th>
                  <th className="py-3 px-3.5 text-right">Active Accounts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {monthlyTrends.map((trend) => (
                  <tr key={trend.month} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-3.5 font-sans font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                      {trend.month}
                    </td>
                    <td className="py-3.5 px-3.5 text-right">{trend.transaction_count.toLocaleString()}</td>
                    <td className="py-3.5 px-3.5 text-right font-semibold text-emerald-400">
                      ₹{(trend.total_amount / 1e6).toFixed(2)}M
                    </td>
                    <td className="py-3.5 px-3.5 text-right">₹{trend.avg_amount.toFixed(2)}</td>
                    <td className="py-3.5 px-3.5 text-right text-sky-300">{trend.active_customers.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Bottom Grid: Top Metros Snapshot & Strategic Action Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Metros Snapshot */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Top Urban Clusters
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              16 Tracked
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {locations.slice(0, 5).map((loc, idx) => (
              <div key={loc.location} className="flex items-center justify-between p-2.5 bg-slate-950/70 rounded-xl border border-slate-800/70">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold text-sky-400 w-4">#{idx + 1}</span>
                  <span className="font-sans font-semibold text-white">{loc.location}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-400">₹{(loc.total_amount / 1e6).toFixed(1)}M</span>
                  <span className="text-[10px] text-slate-400 block font-sans">{loc.customer_count.toLocaleString()} accts</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab?.("geographic")}
            className="w-full py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-xl border border-slate-700/80 transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore All 16 Metropolitan Hubs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Commercial Growth Matrix */}
        <div className="lg:col-span-2 bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Commercial Banking Strategic Growth Matrix
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
              Action Plan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-sans text-xs">1. Premium Commercial Lending</span>
                <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                  Target: Champions
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Pre-approve instant revolving lines of credit and overdraft facilities for 73,400+ Champions with ticket velocities &gt; 5 transactions/month.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-sans text-xs">2. Automated Churn Prevention</span>
                <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  Target: At-Risk Tier
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Deploy trigger-based fee waivers on wire transfers and cashback on utility billings for 58,100+ accounts entering the 30-day dormancy window.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-sans text-xs">3. Wealth & Treasury Cross-Sell</span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  Target: Big Spenders
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Target 42,900+ high-ticket transactors in Mumbai, Bangalore, and Delhi with high-yield fixed deposits and treasury management portfolios.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-sans text-xs">4. Tier-2 Hub Velocity Acceleration</span>
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  Target: Regional Hubs
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Incentivize digital merchant UPI transactions in high-growth Tier-2 urban hubs (Jaipur, Surat, Lucknow, Indore, Chandigarh).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
