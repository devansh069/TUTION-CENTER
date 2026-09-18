import React, { useState } from 'react';
import { Users, Search, Star, Award, Mail } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function EducatorsRoster({ faculty = [], selectedInstituteCode }) {
  const [search, setSearch] = useState('');
  const filtered = faculty.filter(f => {
    const scope = selectedInstituteCode === 'all' || f.instituteCode === selectedInstituteCode;
    const s = f.name.toLowerCase().includes(search.toLowerCase()) || f.subject.toLowerCase().includes(search.toLowerCase());
    return scope && s;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Faculty Educators Master Roster</h1>
        <p className="text-xs text-slate-500 mt-0.5">Faculty credentials, qualifications, active batch allocations, and student ratings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Faculty" value={filtered.length.toString()} subtext="Subject Matter Experts" icon={Users} color="blue" />
        <KPICard title="Ph.D. & Masters Ratio" value="92.4%" subtext="Advanced Degrees" icon={Award} color="green" />
        <KPICard title="Mean Faculty Rating" value="4.84 / 5.0" subtext="Student Score" icon={Star} color="amber" />
        <KPICard title="Active Batches" value="85 Batches" subtext="Across Centers" icon={Users} color="purple" />
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search educator name, specialty..." className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" />
        </div>
        <span className="text-xs font-bold text-slate-500">{filtered.length} Faculty Members</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(f => (
          <div key={f.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                <p className="text-xs text-indigo-600 font-medium">{f.subject}</p>
                <p className="text-[11px] text-slate-400">{f.instituteName}</p>
              </div>
              <span className="text-xs font-bold text-amber-500 flex items-center">★ {f.rating}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
              <p>Credentials: <strong className="text-slate-800">{f.qualification}</strong></p>
              <p>Batches Handled: <strong className="text-slate-800">{f.activeBatches} Batches</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
