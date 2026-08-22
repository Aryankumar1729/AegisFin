import React from "react";
import { FileText, Layers, Layout, BarChart2, CheckCircle2, ArrowUpRight, Sparkles, Sliders } from "lucide-react";

export const TableauSpecs: React.FC = () => {
  const calculatedFields = [
    {
      name: "[Aegis Composite RFM]",
      formula: "STR([R Score Quintile]) + STR([F Score Quintile]) + STR([M Score Quintile])",
      purpose: "Combines individual quintile integers into a standardized 3-digit behavioral score (e.g. '555' for Champions)."
    },
    {
      name: "[Monetary Pareto Running Cumulative %]",
      formula: "RUNNING_SUM(SUM([Transaction Amount (INR)])) / TOTAL(SUM([Transaction Amount (INR)]))",
      purpose: "Computes running cumulative volume percentage for Pareto 80/20 concentration visualizers."
    },
    {
      name: "[Account Inactivity Window (Days)]",
      formula: "DATEDIFF('day', [Customer Last Transaction Date], #2016-11-01#)",
      purpose: "Calculates recency dormancy relative to the dataset anchor baseline observation date."
    },
    {
      name: "[Behavioral Tier Assignment]",
      formula: "IF [R Score] >= 4 AND [F Score] >= 4 AND [M Score] >= 4 THEN 'Champions' ELSEIF [F Score] >= 4 THEN 'Loyal Customers' ELSEIF [M Score] >= 4 THEN 'Big Spenders' ELSE 'Other' END",
      purpose: "Maps composite numerical RFM quintiles to commercial relationship categories."
    }
  ];

  const dashboardBlueprints = [
    {
      title: "1. Executive Core Banking Overview",
      dimensions: "1920 × 1080 (16:9 Desktop HD)",
      components: "Top BAN metric cards, Monthly Volume Trajectory area chart, Metro market share treemap, Tier-1 concentration bar chart.",
      colorPalette: "Deep Slate background (#080C14), Sapphire Blue (#38bdf8), Emerald Green (#10b981), Cyan Accent (#06b6d4)."
    },
    {
      title: "2. Behavioral RFM Customer Segmentation Studio",
      dimensions: "1920 × 1080 (16:9 Desktop HD)",
      components: "5×5 RFM Heatmap matrix, Segment spend treemap, Recency vs Frequency scatter plot, Cohort drilldown table.",
      colorPalette: "Emerald (Champions), Sky Blue (Loyal), Violet (Potential), Amber (At-Risk), Coral Rose (Dormant)."
    },
    {
      title: "3. Spatial Market Penetration & Ticket Velocity",
      dimensions: "1920 × 1080 (16:9 Desktop HD)",
      components: "Geographic bubble map across 16 Indian metros, Tier-1 vs Tier-2 ticket variance chart, Account balance turnover ratio distribution.",
      colorPalette: "Slate dark baseline, Cyan regional overlays, Emerald high-spend indicators."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/80 p-6 lg:p-7 shadow-2xl shadow-black/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Business Intelligence & Dashboard Architecture</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Tableau & Power BI Architecture Blueprint</h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Calculated fields, Level-of-Detail (LOD) expressions, and design specifications for Tableau Desktop and Power BI workbooks.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs shrink-0">
          <span className="px-4 py-2 bg-slate-950/80 text-sky-400 border border-slate-800/80 rounded-2xl shadow-inner font-semibold">
            Tableau 2023.3+ / Power BI
          </span>
        </div>
      </div>

      {/* Calculated Fields Spec Table */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 lg:p-7 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Tableau Calculated Fields & LOD Expressions</h3>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 shadow-inner">
            Field Blueprint
          </span>
        </div>

        <div className="space-y-3.5">
          {calculatedFields.map((field, idx) => (
            <div key={idx} className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 space-y-2.5 hover:border-slate-700/80 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-400">{field.name}</span>
                <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800 uppercase font-bold">
                  Formula
                </span>
              </div>
              <div className="font-mono text-xs text-emerald-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 overflow-x-auto selection:bg-emerald-500/30">
                {field.formula}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed"><strong className="text-slate-200">Business Objective:</strong> {field.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Blueprints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {dashboardBlueprints.map((spec, idx) => (
          <div key={idx} className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-xs leading-snug font-sans">{spec.title}</h3>
                <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                  {spec.dimensions}
                </span>
              </div>
              <div className="text-xs space-y-2.5 text-slate-300 mt-3">
                <p><strong className="text-sky-400 text-[11px] uppercase font-mono block">Components:</strong> {spec.components}</p>
                <p><strong className="text-indigo-400 text-[11px] uppercase font-mono block mt-2">Color Palette:</strong> {spec.colorPalette}</p>
              </div>
            </div>
            <div className="pt-3.5 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Layout Architecture</span>
              <span className="text-emerald-400 font-semibold">12-Column Responsive</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
