import React from 'react';
import { BarChart3, Download, Star } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports({ ptms = [], selectedInstituteCode }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Parent Satisfaction & PTM Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Parent feedback sentiment, meeting attendance rates, and digital sign-off velocity audits.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Parent NPS Score" value="+78 Net" subtext="World-Class Benchmark" icon={Star} color="green" />
        <KPICard title="PTM Attendance Rate" value="94.2%" subtext="Parent Engagement" icon={BarChart3} color="blue" />
        <KPICard title="Sign-off Velocity" value="1.8 Days" subtext="Time to Approve" icon={BarChart3} color="purple" />
        <KPICard title="Resolution Rate" value="99.0%" subtext="Queries Resolved" icon={BarChart3} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Campus</th>
              <th className="p-3">Scheduled PTMs</th>
              <th className="p-3">Attendance %</th>
              <th className="p-3">Parent Rating</th>
              <th className="p-3 text-right">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ptms.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{p.instituteName}</td>
                <td className="p-3 font-semibold">45 Meetings / Term</td>
                <td className="p-3 font-bold text-indigo-600">96.5%</td>
                <td className="p-3 font-bold text-amber-500">★ 4.9 / 5.0</td>
                <td className="p-3 text-right font-bold text-emerald-600">Exemplary Engagement</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
