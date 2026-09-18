import React, { useState } from 'react';
import { CalendarCheck, Search, Clock, Users } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function PTMScheduler({ ptms = [], selectedInstituteCode }) {
  const [search, setSearch] = useState('');
  const filtered = ptms.filter(p => {
    const scope = selectedInstituteCode === 'all' || p.instituteCode === selectedInstituteCode;
    const s = p.parentName.toLowerCase().includes(search.toLowerCase()) || p.studentName.toLowerCase().includes(search.toLowerCase());
    return scope && s;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Parent-Teacher Meeting (PTM) Scheduler</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage appointment bookings requested through the Student & Parent mobile app.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Scheduled PTMs" value={filtered.length.toString()} subtext="Confirmed Slots" icon={CalendarCheck} color="blue" />
        <KPICard title="Completed PTMs" value="142 Completed" subtext="This Term" icon={CalendarCheck} color="green" />
        <KPICard title="Pending Requests" value="4 Pending" subtext="Parent App Requests" icon={Clock} color="amber" />
        <KPICard title="Avg Duration" value="25 Mins" subtext="Consultation Time" icon={Users} color="purple" />
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parent, student, faculty..." className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" />
        </div>
        <span className="text-xs font-bold text-slate-500">{filtered.length} Appointments</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(p => (
          <div key={p.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{p.parentName}</h4>
                <p className="text-xs text-indigo-600 font-medium">Student: {p.studentName}</p>
                <p className="text-[11px] text-slate-400">{p.instituteName}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">{p.status}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
              <p>Faculty: <strong className="text-slate-800">{p.facultyName}</strong></p>
              <p className="flex items-center text-slate-500"><Clock className="w-3 h-3 mr-1" /> {p.scheduledDate} @ {p.timeSlot}</p>
              <p className="text-slate-700 pt-1 border-t border-slate-200/60 font-medium">Agenda: {p.agenda}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
