import React, { useState } from "react";
import { RFMSegment } from "../types";
import { 
  Layers, 
  HelpCircle, 
  Trophy, 
  UserX, 
  Target, 
  Zap, 
  DollarSign, 
  Award, 
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Percent,
  TrendingUp,
  Activity,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface Props {
  rfmSegments: RFMSegment[];
}

export const RFMExplorer: React.FC<Props> = ({ rfmSegments = [] }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("Champions");
  const [filterMode, setFilterMode] = useState<string>("ALL");

  const totalCustomers = (rfmSegments || []).reduce((acc, curr) => acc + (curr?.customer_count || 0), 0) || 884203;
  const totalMonetary = (rfmSegments || []).reduce((acc, curr) => acc + (curr?.total_monetary || 0), 0) || 7114250000;

  const segmentProfiles: Record<string, { 
    tagline: string; 
    description: string; 
    actionPlaybook: string; 
    retentionRisk: string; 
    icon: any; 
    badgeColor: string; 
    borderGlow: string;
  }> = {
    "Champions": {
      tagline: "Highest Recency, Frequency & Monetary (Score 555)",
      description: "Core high-throughput transactors accounting for the majority of commercial volume. High affinity for premium financial products.",
      actionPlaybook: "Exclusive VIP concierge desk, zero-fee RTGS/IMPS wire transfers, and priority commercial credit underwriting.",
      retentionRisk: "Low (Active < 7 Days)",
      icon: Trophy,
      badgeColor: "emerald",
      borderGlow: "rgba(16, 185, 129, 0.4)"
    },
    "Loyal Customers": {
      tagline: "Consistent Activity & Recurring Ticket Velocity",
      description: "Dependable account base with high frequency and steady account balance throughput across all banking channels.",
      actionPlaybook: "Cross-sell mutual funds, systematic investment plans (SIP), and customized commercial credit cards.",
      retentionRisk: "Low (Active < 15 Days)",
      icon: Award,
      badgeColor: "sky",
      borderGlow: "rgba(56, 189, 248, 0.4)"
    },
    "Big Spenders": {
      tagline: "High Single-Transaction Volume & Substantial Balances",
      description: "Moderate frequency transactors who execute large lump-sum transfers and maintain high deposit reserves.",
      actionPlaybook: "Target with high-yield fixed deposits, treasury management solutions, and personalized portfolio advisory.",
      retentionRisk: "Moderate",
      icon: DollarSign,
      badgeColor: "indigo",
      borderGlow: "rgba(99, 102, 241, 0.4)"
    },
    "Potential Loyalists": {
      tagline: "Recent Onboarding with Accelerating Velocity",
      description: "Recently active accounts with high potential to transition into the Loyal or Champions tiers with proper incentives.",
      actionPlaybook: "Deliver milestone-driven activation bonuses (e.g. fee waivers on 5th monthly transaction).",
      retentionRisk: "Low-to-Moderate",
      icon: Target,
      badgeColor: "violet",
      borderGlow: "rgba(168, 85, 247, 0.4)"
    },
    "At Risk": {
      tagline: "High Historical Spend with Dropping Recency",
      description: "Historically valuable accounts that have not transacted in 30–60+ days. Significant commercial risk if churned.",
      actionPlaybook: "Automated event-triggered cashback vouchers on bill payments and targeted relationship manager check-ins.",
      retentionRisk: "High (Action Required)",
      icon: Zap,
      badgeColor: "amber",
      borderGlow: "rgba(245, 158, 11, 0.4)"
    },
    "Dormant / Lost": {
      tagline: "Inactive for >75 Days across All Dimensions",
      description: "Lapsed accounts with low recency, frequency, and monetary scores. High candidate pool for churn modeling.",
      actionPlaybook: "Low-cost automated email/SMS reactivation campaigns; flag accounts for predictive churn modeling.",
      retentionRisk: "Critical",
      icon: UserX,
      badgeColor: "rose",
      borderGlow: "rgba(244, 63, 94, 0.4)"
    }
  };

  const filteredSegments = rfmSegments.filter(seg => {
    if (filterMode === "HIGH_VALUE") return ["Champions", "Loyal Customers", "Big Spenders"].includes(seg.customer_segment);
    if (filterMode === "AT_RISK") return ["At Risk", "Dormant / Lost"].includes(seg.customer_segment);
    return true;
  });

  const activeSegmentData = rfmSegments.find(s => s.customer_segment === selectedSegment) || rfmSegments[0];
  const activeProfile = segmentProfiles[activeSegmentData?.customer_segment] || {
    tagline: "Custom Behavioral Cohort",
    description: "Custom segment based on behavioral parameters.",
    actionPlaybook: "Tailor product communication to customer preferences.",
    retentionRisk: "Moderate",
    icon: Sparkles,
    badgeColor: "sky",
    borderGlow: "rgba(56, 189, 248, 0.4)"
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/80 p-6 lg:p-7 shadow-2xl shadow-black/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Behavioral Quantile Intelligence Engine</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">RFM Customer Segmentation Studio</h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Quantile-driven behavioral segmentation mapping <span className="text-slate-200 font-semibold">{totalCustomers.toLocaleString()} accounts</span> across Recency, Frequency, and Monetary quintiles.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono shrink-0">
          <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
            <span className="text-slate-400 text-[10px] uppercase font-semibold block">Total Analyzed Accounts</span>
            <span className="font-bold text-white text-sm">{totalCustomers.toLocaleString()}</span>
          </div>
          <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
            <span className="text-slate-400 text-[10px] uppercase font-semibold block">Gross Revenue Volume</span>
            <span className="font-bold text-emerald-400 text-sm">₹{(totalMonetary / 1e9).toFixed(2)}B</span>
          </div>
        </div>
      </div>

      {/* Filter Switcher Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setFilterMode("ALL")}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${filterMode === "ALL" ? "bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20" : "text-slate-400 hover:text-slate-200"}`}
          >
            All Segments ({rfmSegments.length})
          </button>
          <button
            onClick={() => setFilterMode("HIGH_VALUE")}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${filterMode === "HIGH_VALUE" ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20" : "text-slate-400 hover:text-slate-200"}`}
          >
            High-Value Core (3)
          </button>
          <button
            onClick={() => setFilterMode("AT_RISK")}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${filterMode === "AT_RISK" ? "bg-rose-600 text-white font-bold shadow-md shadow-rose-600/20" : "text-slate-400 hover:text-slate-200"}`}
          >
            At-Risk / Lapsed (2)
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
          Click any card to load action strategy
        </span>
      </div>

      {/* Segment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSegments.map((seg) => {
          const info = segmentProfiles[seg.customer_segment] || {
            tagline: "Custom Profile",
            description: "Custom segment",
            actionPlaybook: "Standard engagement",
            retentionRisk: "Moderate",
            icon: HelpCircle,
            badgeColor: "slate",
            borderGlow: "rgba(148, 163, 184, 0.4)"
          };
          const Icon = info.icon;
          const userShare = ((seg.customer_count / totalCustomers) * 100).toFixed(1);
          const revenueShare = ((seg.total_monetary / totalMonetary) * 100).toFixed(1);
          const isSelected = selectedSegment === seg.customer_segment;

          return (
            <div
              key={seg.customer_segment}
              onClick={() => setSelectedSegment(seg.customer_segment)}
              className={`rounded-2xl p-5 cursor-pointer transition-all duration-300 border shadow-lg relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 border-sky-400/90 ring-2 ring-sky-400/30 shadow-sky-500/10 scale-[1.01]"
                  : "bg-slate-900/70 backdrop-blur-xl border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${
                      info.badgeColor === "emerald" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      info.badgeColor === "sky" ? "bg-sky-500/10 text-sky-400 border-sky-500/20" :
                      info.badgeColor === "indigo" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                      info.badgeColor === "violet" ? "bg-violet-500/10 text-violet-400 border-violet-500/20" :
                      info.badgeColor === "amber" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                      "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs font-sans">{seg.customer_segment}</h3>
                      <p className="text-[10px] font-mono text-slate-400">{info.retentionRisk}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-950 text-sky-400 border border-slate-800 shadow-inner">
                    {userShare}% Base
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono my-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Customer Base</span>
                    <span className="font-bold text-slate-200">{seg.customer_count.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Total Spend</span>
                    <span className="font-bold text-emerald-400">₹{(seg.total_monetary / 1e6).toFixed(1)}M ({revenueShare}%)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Avg Spend</span>
                    <span className="font-bold text-slate-300">₹{seg.avg_monetary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Avg Inactivity</span>
                    <span className="font-bold text-slate-300">{seg.avg_recency} days</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">{info.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Strategy Playbook
                </span>
                <span className="text-[10px] font-mono text-slate-400">Freq: {seg.avg_frequency.toFixed(1)} txs</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Segment Deep Dive Playbook */}
      {activeSegmentData && (
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 lg:p-7 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm sm:text-base font-sans">
                  {activeSegmentData.customer_segment} — Strategic Growth Playbook
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeProfile.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1.5 bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl font-bold shadow-inner">
                Volume Share: {((activeSegmentData.total_monetary / totalMonetary) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">Commercial Profile & Behavior</span>
              <p className="text-slate-300 leading-relaxed text-xs">{activeProfile.description}</p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">Recommended Action Matrix</span>
              <p className="text-slate-200 leading-relaxed text-xs font-medium">{activeProfile.actionPlaybook}</p>
            </div>
          </div>
        </div>
      )}

      {/* RFM Full Metrics Table */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Detailed RFM Quintile Distribution Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-3.5 font-sans">Segment Name</th>
                <th className="py-3 px-3.5 text-right">Account Base</th>
                <th className="py-3 px-3.5 text-right">Account Share</th>
                <th className="py-3 px-3.5 text-right">Total Monetary (INR)</th>
                <th className="py-3 px-3.5 text-right">Volume Share</th>
                <th className="py-3 px-3.5 text-right">Mean User Spend</th>
                <th className="py-3 px-3.5 text-right">Mean Frequency</th>
                <th className="py-3 px-3.5 text-right">Mean Recency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {rfmSegments.map((seg) => (
                <tr key={seg.customer_segment} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-3.5 font-sans font-semibold text-white">{seg.customer_segment}</td>
                  <td className="py-3.5 px-3.5 text-right">{seg.customer_count.toLocaleString()}</td>
                  <td className="py-3.5 px-3.5 text-right text-slate-400">{((seg.customer_count / totalCustomers) * 100).toFixed(1)}%</td>
                  <td className="py-3.5 px-3.5 text-right font-semibold text-emerald-400">₹{seg.total_monetary.toLocaleString()}</td>
                  <td className="py-3.5 px-3.5 text-right text-emerald-400 font-semibold">{((seg.total_monetary / totalMonetary) * 100).toFixed(1)}%</td>
                  <td className="py-3.5 px-3.5 text-right">₹{seg.avg_monetary.toFixed(2)}</td>
                  <td className="py-3.5 px-3.5 text-right">{seg.avg_frequency.toFixed(1)} txs</td>
                  <td className="py-3.5 px-3.5 text-right">{seg.avg_recency} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
