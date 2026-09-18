import React from 'react';
import { BarChart3, TrendingUp, Download, PieChart, Activity, Map, Building2 } from 'lucide-react';

export default function Reports({ activeTab = 'royalty_revenue' }) {
  const tabs = [
    { id: 'royalty_revenue', label: 'Royalty & Revenue', icon: TrendingUp },
    { id: 'geographical', label: 'Geographical Spread', icon: Map },
    { id: 'compliance_audit', label: 'Compliance & Audits', icon: Activity },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" /> Franchise Reports & Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-1">Deep-dive insights into network performance and compliance.</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-2">
          <Download className="w-4 h-4 text-slate-500" /> Export PDF Report
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo-200' : 'text-slate-400'}`} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 min-h-[400px] flex flex-col items-center justify-center text-center shadow-xs">
        {activeTab === 'royalty_revenue' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Revenue Growth Analytics</h3>
            <p className="text-sm text-slate-500">
              Interactive YoY royalty collection charts and branch-wise revenue breakdowns will be visualized here using Recharts.
            </p>
          </div>
        )}
        
        {activeTab === 'geographical' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Map className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Regional Performance Heatmap</h3>
            <p className="text-sm text-slate-500">
              A map view showing active franchise concentration, regional revenue disparities, and emerging markets.
            </p>
          </div>
        )}

        {activeTab === 'compliance_audit' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Brand & Legal Compliance</h3>
            <p className="text-sm text-slate-500">
              Audit scorecards for all branches tracking infrastructure quality, legal agreement validity, and brand guideline adherence.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
