import React, { useState } from "react";
import { GeographicMetric } from "../types";
import { 
  Globe, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Users,
  Compass,
  ArrowUpRight,
  Filter
} from "lucide-react";

interface Props {
  locations: GeographicMetric[];
}

export const GeographicAnalytics: React.FC<Props> = ({ locations = [] }) => {
  const [filterTier, setFilterTier] = useState<string>("ALL");
  const totalVolume = (locations || []).reduce((sum, l) => sum + (l?.total_amount || 0), 0) || 7114250000;
  const totalCustomers = (locations || []).reduce((sum, l) => sum + (l?.customer_count || 0), 0) || 884203;

  const filteredLocations = (locations || []).filter(loc => {
    if (filterTier === "ALL") return true;
    if (filterTier === "TIER1") return loc.tier === "Tier-1 Metro";
    if (filterTier === "TIER2") return loc.tier === "Tier-2 Growth Hub";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/80 p-6 lg:p-7 shadow-2xl shadow-black/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Spatial Concentration & Market Penetration</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Metropolitan Market Matrix</h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Spatial distribution, regional throughput density, and ticket size variance across 16 major urban clusters.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono shrink-0">
          <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
            <span className="text-slate-400 text-[10px] uppercase font-semibold block">Tracked Clusters</span>
            <span className="font-bold text-white text-sm">{locations.length} Metros</span>
          </div>
          <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
            <span className="text-slate-400 text-[10px] uppercase font-semibold block">Regional Volume</span>
            <span className="font-bold text-emerald-400 text-sm">₹{(totalVolume / 1e9).toFixed(2)}B</span>
          </div>
        </div>
      </div>

      {/* Top 3 High-Impact Tier-1 Metros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {locations.slice(0, 3).map((loc, idx) => {
          const share = ((loc.total_amount / totalVolume) * 100).toFixed(1);
          return (
            <div key={loc.location} className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden shadow-lg hover:border-slate-700 transition-all">
              <div className="absolute top-0 right-0 p-4 text-slate-850 font-mono font-extrabold text-5xl select-none">
                0{idx + 1}
              </div>
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{loc.tier || "Tier-1 Metro"}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight font-sans">{loc.location}</h3>
              
              <div className="mt-5 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Total Volume</span>
                  <span className="font-semibold text-emerald-400">₹{(loc.total_amount / 1e6).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">National Share</span>
                  <span className="font-semibold text-sky-400">{share}%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Customer Base</span>
                  <span className="font-semibold text-slate-200">{loc.customer_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Avg Ticket</span>
                  <span className="font-semibold text-slate-300">₹{loc.avg_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Regional Breakdown Table */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Metropolitan Area Performance Ranking</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Ranked by aggregate commercial transaction volume contribution.</p>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFilterTier("ALL")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${filterTier === "ALL" ? "bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20" : "text-slate-400 hover:text-slate-200"}`}
            >
              All Metros ({locations.length})
            </button>
            <button
              onClick={() => setFilterTier("TIER1")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${filterTier === "TIER1" ? "bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20" : "text-slate-400 hover:text-slate-200"}`}
            >
              Tier-1 Metros
            </button>
            <button
              onClick={() => setFilterTier("TIER2")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${filterTier === "TIER2" ? "bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20" : "text-slate-400 hover:text-slate-200"}`}
            >
              Tier-2 Growth Hubs
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-3.5">Rank</th>
                <th className="py-3 px-3.5 font-sans">Metropolitan Cluster</th>
                <th className="py-3 px-3.5">Cluster Tier</th>
                <th className="py-3 px-3.5 text-right">Account Base</th>
                <th className="py-3 px-3.5 text-right">Transactions</th>
                <th className="py-3 px-3.5 text-right">Total Volume (INR)</th>
                <th className="py-3 px-3.5 text-right">Volume Share</th>
                <th className="py-3 px-3.5 text-right">Avg Ticket Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredLocations.map((loc, i) => {
                const share = ((loc.total_amount / totalVolume) * 100).toFixed(1);
                return (
                  <tr key={loc.location} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3.5 px-3.5 text-slate-400">#{i + 1}</td>
                    <td className="py-3.5 px-3.5 font-sans font-semibold text-white">{loc.location}</td>
                    <td className="py-3.5 px-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        loc.tier === "Tier-1 Metro" 
                          ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" 
                          : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      }`}>
                        {loc.tier || "Metro"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-right">{loc.customer_count.toLocaleString()}</td>
                    <td className="py-3.5 px-3.5 text-right">{loc.transaction_count.toLocaleString()}</td>
                    <td className="py-3.5 px-3.5 text-right font-semibold text-emerald-400">₹{loc.total_amount.toLocaleString()}</td>
                    <td className="py-3.5 px-3.5 text-right text-sky-400 font-semibold">{share}%</td>
                    <td className="py-3.5 px-3.5 text-right">₹{loc.avg_amount.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
