import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports({ batches = [], selectedInstituteCode }) {
  const filtered = batches.filter(b => selectedInstituteCode === 'all' || b.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Academic & Batch Performance Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Audits of classroom room utilization, syllabus delay telemetry, and batch saturation.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Batches" value={filtered.length.toString()} subtext="In Active Scope" icon={BarChart3} color="blue" />
        <KPICard title="Avg Batch Size" value="68 Students" subtext="Optimal Cohort" icon={BarChart3} color="green" />
        <KPICard title="Room Capacity Load" value="89.2%" subtext="Classroom Utilization" icon={BarChart3} color="purple" />
        <KPICard title="Syllabus Velocity" value="1.2 Chapters/wk" subtext="Standard Pacing" icon={BarChart3} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Batch Name</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Subject Lead</th>
              <th className="p-3">Students / Max</th>
              <th className="p-3">Syllabus Progress</th>
              <th className="p-3 text-right">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(b => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{b.name}</td>
                <td className="p-3 text-slate-600">{b.instituteName}</td>
                <td className="p-3 font-semibold">{b.teacher}</td>
                <td className="p-3 font-mono">{b.students} / {b.capacity}</td>
                <td className="p-3 font-bold text-indigo-600">{b.syllabusPct}%</td>
                <td className="p-3 text-right font-bold text-emerald-600">On Track</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
