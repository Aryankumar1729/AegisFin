import React from "react";
import { 
  ShieldAlert, 
  CheckCircle2, 
  Server, 
  Terminal, 
  RefreshCw, 
  Cpu, 
  Activity, 
  AlertTriangle,
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { pipelineStagesData } from "../data/mockData";

export const DataQualityPipeline: React.FC = () => {
  const qualityKpis = [
    { label: "Missing Values (Tx Amount)", val: "0.00%", status: "OPTIMAL", color: "text-emerald-400", sub: "100% Complete" },
    { label: "MD5 Deduplicated Records", val: "1,240 rows", status: "PURGED", color: "text-sky-400", sub: "0.12% Anomaly" },
    { label: "Location Standardization", val: "99.85%", status: "OPTIMAL", color: "text-emerald-400", sub: "16 Clusters" },
    { label: "Temporal ISO-8601 Integrity", val: "100.00%", status: "VERIFIED", color: "text-emerald-400", sub: "UTC Formatted" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/80 p-6 lg:p-7 shadow-2xl shadow-black/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Automated Ingestion & Cleansing Telemetry</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">ETL Pipeline & Data Quality Health</h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            End-to-end telemetry for the Python Pandas & SQLite ingestion pipeline, data cleansing rules, and relational indexing.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs shrink-0">
          <span className="px-4 py-2 bg-slate-950/80 text-emerald-400 border border-slate-800/80 rounded-2xl shadow-inner flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ETL Status: Optimal
          </span>
        </div>
      </div>

      {/* Health Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {qualityKpis.map((m, idx) => (
          <div key={idx} className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl shadow-lg hover:border-slate-700 transition-all">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-semibold">{m.label}</p>
            <p className={`text-2xl font-extrabold font-mono tracking-tight ${m.color}`}>{m.val}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-300 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                {m.status}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Stages Progression */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 lg:p-7 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Sequential Pipeline Execution Stages</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Automated batch ingestion and relational transformation stages.</p>
          </div>
          <span className="text-[10px] font-mono text-sky-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-semibold shadow-inner">
            Total Pipeline Latency: ~5.05s
          </span>
        </div>

        <div className="space-y-3">
          {pipelineStagesData.map((step) => (
            <div key={step.step} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700/80 transition-colors">
              <div className="flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-xl bg-slate-900 text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-800 shrink-0 shadow-sm">
                  {step.step}
                </span>
                <div>
                  <h4 className="font-bold text-white text-xs font-sans">{step.name}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{step.details}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 font-mono text-xs self-end sm:self-center">
                <span className="text-slate-400 text-[11px] bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  {step.latency}
                </span>
                <span className="text-slate-300 text-[11px]">{step.rows} rows</span>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold text-[10px]">
                  {step.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
