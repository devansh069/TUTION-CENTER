import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Helpdesk SLA & Customer Sentiment Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Customer satisfaction (CSAT) scores, volume trends, and resolution statistics.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="CSAT Score" value="4.88 / 5.0" subtext="From Parent Feedback" icon={BarChart3} color="green" />
        <KPICard title="First Contact Resolution" value="84.5%" subtext="Solved on First Touch" icon={BarChart3} color="blue" />
        <KPICard title="Total Resolved" value="384 Tickets" subtext="Quarterly Total" icon={BarChart3} color="purple" />
        <KPICard title="Escalation Rate" value="1.2%" subtext="Under 3% Threshold" icon={BarChart3} color="amber" />
      </div>
    </div>
  );
}
