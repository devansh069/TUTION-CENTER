import React, { useState } from 'react';
import { BarChart3, Download, GraduationCap, Users } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports({ students = [], selectedInstituteCode }) {
  const [tab, setTab] = useState('retention');
  const filtered = students.filter(s => selectedInstituteCode === 'all' || s.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Student Enrollment & Retention Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Demographic analytics, year-over-year retention rates, and dropout risk matrix.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300 transition-colors">
          <Download className="w-4 h-4 mr-1.5" /> Export Data (CSV / PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Gross Enrollment" value={filtered.length.toString()} subtext="Active Students" icon={GraduationCap} color="blue" />
        <KPICard title="Retention Rate" value="96.2%" subtext="Term over Term" icon={BarChart3} color="green" />
        <KPICard title="Class 12th Share" value="48.5%" subtext="Board / JEE Focus" icon={Users} color="purple" />
        <KPICard title="Dropout Risk Flag" value="2.4%" subtext="Under Investigation" icon={BarChart3} color="amber" />
      </div>

      <div className="p-1 bg-slate-100 rounded-xl flex space-x-1 max-w-md">
        <button onClick={() => setTab('retention')} className={`flex-1 py-2 text-xs font-bold rounded-lg ${tab === 'retention' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}>Retention Matrix</button>
        <button onClick={() => setTab('demographics')} className={`flex-1 py-2 text-xs font-bold rounded-lg ${tab === 'demographics' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}>Class Demographics</button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Student</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Attendance Rate</th>
                <th className="p-3">Parent App Approval</th>
                <th className="p-3 text-right">Retention Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{s.name}</td>
                  <td className="p-3 text-slate-600">{s.instituteName}</td>
                  <td className="p-3 font-semibold">{s.grade}</td>
                  <td className="p-3 font-mono font-bold text-indigo-600">{s.attendanceRate}%</td>
                  <td className="p-3">{s.reportApproved ? <span className="text-emerald-600 font-bold">✓ Signed</span> : <span className="text-amber-600 font-bold">Pending</span>}</td>
                  <td className="p-3 text-right font-bold text-emerald-600">Stable / High Retention</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
