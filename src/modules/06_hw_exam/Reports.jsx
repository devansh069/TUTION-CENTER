import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports({ exams = [], selectedInstituteCode }) {
  const filtered = exams.filter(e => selectedInstituteCode === 'all' || e.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Academic & Test Performance Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Subject weakness identification, percentile distribution, and comparative class benchmarks.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Tests & HW" value={filtered.length.toString()} subtext="Across All Batches" icon={BarChart3} color="blue" />
        <KPICard title="Network Avg Score" value="82.4%" subtext="Consistent Growth" icon={BarChart3} color="green" />
        <KPICard title="Highest Pass Rate" value="98.0%" subtext="Beta Commerce CA" icon={BarChart3} color="purple" />
        <KPICard title="Evaluation Speed" value="24 Hours" subtext="Average Turnaround" icon={BarChart3} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Title</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Type</th>
              <th className="p-3">Max Marks</th>
              <th className="p-3">Class Avg</th>
              <th className="p-3 text-right">Evaluation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{e.title}</td>
                <td className="p-3 text-slate-600">{e.instituteName}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">{e.type}</span></td>
                <td className="p-3 font-mono">{e.maxScore}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{e.avgScore}</td>
                <td className="p-3 text-right font-bold text-emerald-600">100% Graded</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
