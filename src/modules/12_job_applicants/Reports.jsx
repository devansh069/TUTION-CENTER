import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Talent Acquisition & Hiring Velocity Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Time-to-hire metrics, talent acquisition channels, and faculty qualification audits.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Time-to-Hire" value="16 Days" subtext="Industry Avg: 30d" icon={BarChart3} color="green" />
        <KPICard title="Offer Acceptance" value="91.2%" subtext="High Conversion" icon={BarChart3} color="blue" />
        <KPICard title="Sourcing Channels" value="LinkedIn & Alum" subtext="Top Performing" icon={BarChart3} color="purple" />
        <KPICard title="Cost per Hire" value="$450 Avg" subtext="Low Acquisition Cost" icon={BarChart3} color="amber" />
      </div>
    </div>
  );
}
