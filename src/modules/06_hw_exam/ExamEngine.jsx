import React, { useState } from 'react';
import { Award, Search, BookOpen, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function ExamEngine({ exams = [], selectedInstituteCode }) {
  const [search, setSearch] = useState('');
  const filtered = exams.filter(e => {
    const scope = selectedInstituteCode === 'all' || e.instituteCode === selectedInstituteCode;
    const s = e.title.toLowerCase().includes(search.toLowerCase()) || e.batchName.toLowerCase().includes(search.toLowerCase());
    return scope && s && e.type === 'Exam';
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Competitive Exam & Test Engine</h1>
        <p className="text-xs text-slate-500 mt-0.5">Mock entrance tests, percentile rankings, subject-wise score analytics, and rank cards.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Scheduled Tests" value={filtered.length.toString()} subtext="Active Exam Series" icon={BookOpen} color="blue" />
        <KPICard title="Top Score" value="695 / 720" subtext="NEET Anatomy Mock" icon={Award} color="green" />
        <KPICard title="Pass Percentage" value="96.4%" subtext="Across All Batches" icon={Award} color="purple" />
        <KPICard title="Evaluated Tests" value="100%" subtext="Zero Pending Grading" icon={Award} color="amber" />
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search exam title, batch..." className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" />
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center border border-slate-200">
          <Download className="w-3.5 h-3.5 mr-1" /> Export Scorecards
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Exam Series</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Batch</th>
              <th className="p-3">Max Marks</th>
              <th className="p-3">Class Avg</th>
              <th className="p-3 text-right">Top Performer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{e.title}</td>
                <td className="p-3 text-slate-600">{e.instituteName}</td>
                <td className="p-3 text-slate-700 font-semibold">{e.batchName}</td>
                <td className="p-3 font-mono font-bold text-slate-800">{e.maxScore}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{e.avgScore}</td>
                <td className="p-3 text-right font-bold text-indigo-600">{e.topRanker}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
