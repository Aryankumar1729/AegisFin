import React, { useState } from "react";
import { Sidebar, TopHeader } from "./components/Header";
import { ExecutiveDashboard } from "./components/ExecutiveDashboard";
import { RFMExplorer } from "./components/RFMExplorer";
import { RiskCohortAnalytics } from "./components/RiskCohortAnalytics";
import { GeographicAnalytics } from "./components/GeographicAnalytics";
import { TableauSpecs } from "./components/TableauSpecs";
import { DataQualityPipeline } from "./components/DataQualityPipeline";
import { kpiData, monthlyTrendData, rfmSegmentData, geographicData } from "./data/mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <div className="flex h-screen w-full bg-[#080C14] font-sans text-slate-100 overflow-hidden selection:bg-sky-500 selection:text-white relative">
      {/* Ambient background light glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-0"></div>

      {/* SIDEBAR NAVIGATION */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-transparent z-10">
        {/* HEADER BAR */}
        <TopHeader />

        {/* VIEWPORT CONTENT AREA */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-6 flex-1 max-w-7xl w-full mx-auto">
            {activeTab === "overview" && (
              <ExecutiveDashboard
                kpis={kpiData}
                monthlyTrends={monthlyTrendData}
                locations={geographicData}
                onNavigateTab={setActiveTab}
              />
            )}
            {activeTab === "rfm" && <RFMExplorer rfmSegments={rfmSegmentData} />}
            {activeTab === "risk" && <RiskCohortAnalytics />}
            {activeTab === "geographic" && <GeographicAnalytics locations={geographicData} />}
            {activeTab === "tableau" && <TableauSpecs />}
            {activeTab === "pipeline" && <DataQualityPipeline />}
          </div>

          {/* SYSTEM ARCHITECTURE FOOTER */}
          <footer className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-850 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="px-3 py-1 bg-slate-900/80 rounded-xl text-[10px] font-mono text-slate-400 border border-slate-800 shadow-sm">
                Python 3.11 / Pandas
              </span>
              <span className="px-3 py-1 bg-slate-900/80 rounded-xl text-[10px] font-mono text-slate-400 border border-slate-800 shadow-sm">
                SQLite WebAssembly
              </span>
              <span className="px-3 py-1 bg-slate-900/80 rounded-xl text-[10px] font-mono text-slate-400 border border-slate-800 shadow-sm">
                React 19 / TypeScript 5.8
              </span>
              <span className="px-3 py-1 bg-slate-900/80 rounded-xl text-[10px] font-mono text-slate-400 border border-slate-800 shadow-sm">
                Tableau Architecture
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-[11px] text-slate-500 font-mono">
                AegisFin Analytics Platform • Enterprise Edition
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
