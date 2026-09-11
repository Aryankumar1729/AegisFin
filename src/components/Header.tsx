import React, { useState } from "react";
import { 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  FileSpreadsheet, 
  Cpu, 
  Activity, 
  AlertTriangle,
  Search,
  Calendar,
  Sparkles,
  ChevronDown,
  Bell,
  Download,
  CheckCircle2,
  Share2,
  Database
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigationGroups = [
    {
      group: "CORE ANALYTICS",
      items: [
        { id: "overview", label: "Executive Intelligence", icon: BarChart3, badge: "Live" },
        { id: "rfm", label: "Behavioral RFM Studio", icon: Layers, badge: "6 Tiers" },
        { id: "risk", label: "Churn & Retention Risk", icon: AlertTriangle, badge: "At-Risk" },
      ]
    },
    {
      group: "SPATIAL & QUERY STUDIO",
      items: [
        { id: "geographic", label: "Metropolitan Matrix", icon: Activity, badge: "16 Hubs" },
      ]
    },
    {
      group: "DATA ARCHITECTURE",
      items: [
        { id: "pipeline", label: "ETL Telemetry & Health", icon: Cpu, badge: "99.8%" },
        { id: "tableau", label: "BI & Dashboard Specs", icon: FileSpreadsheet, badge: "Specs" },
      ]
    }
  ];

  return (
    <aside className="w-68 bg-slate-950/90 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none z-20">
      {/* Brand Identity Header */}
      <div className="p-5 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base tracking-tight text-white font-sans">
                Aegis<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Fin</span>
              </h1>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-md">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wide">
              Customer Analytics Suite
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-3.5 py-4 overflow-y-auto space-y-5">
        {navigationGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              {group.group}
            </div>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative ${
                      isActive
                        ? "bg-sky-500/15 text-white font-semibold shadow-sm shadow-sky-500/10 border border-sky-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-sky-400 rounded-r-full shadow-sm shadow-sky-400"></span>
                    )}

                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive ? "text-sky-400" : "text-slate-400 group-hover:text-slate-200"
                      }`} />
                      <span>{item.label}</span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-sky-400/20 text-sky-300 border border-sky-400/30 font-semibold"
                        : "bg-slate-900 text-slate-400 border border-slate-800/80 group-hover:text-slate-300"
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Telemetry Status Pill */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/40">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-300 uppercase font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              SQLite WASM
            </span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              OPTIMAL
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span className="text-slate-400">Indexed Rows:</span>
            <span className="font-semibold text-slate-200">1,048,575</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export const TopHeader: React.FC = () => {
  const [timeRange, setTimeRange] = useState("Aug 2016 – Oct 2016");

  return (
    <header className="h-16 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/70 px-6 lg:px-8 flex items-center justify-between shrink-0 z-10">
      {/* Search Input Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search accounts, segments, transactions, cities..."
            className="w-full bg-slate-900/70 border border-slate-800/80 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/30 transition-all font-sans"
          />
        </div>
      </div>

      {/* Global Controls & Status Cluster */}
      <div className="flex items-center gap-3">
        {/* Time Window Selector */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/70 border border-slate-800/80 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-300 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          <span>{timeRange}</span>
        </div>

        {/* Live Ingestion Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/70 border border-slate-800/80 rounded-xl px-3 py-1.5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium">Dataset: Active</span>
        </div>

        {/* User / Session Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800/80">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-sm">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-xs text-sky-400 font-mono">
              AF
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
