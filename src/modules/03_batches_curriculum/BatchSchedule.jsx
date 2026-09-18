import React, { useState } from 'react';
import { Calendar, Search, Clock, Users, MapPin } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function BatchSchedule({ batches = [], selectedInstituteCode }) {
  const [search, setSearch] = useState('');
  const filtered = batches.filter(b => {
    const scope = selectedInstituteCode === 'all' || b.instituteCode === selectedInstituteCode;
    const s = b.name.toLowerCase().includes(search.toLowerCase()) || b.teacher.toLowerCase().includes(search.toLowerCase());
    return scope && s;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Master Class Schedule & Timetable</h1>
        <p className="text-xs text-slate-500 mt-0.5">Lecture room allocations, timing slots, and daily faculty session assignments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Scheduled Batches" value={filtered.length.toString()} subtext="Daily Active Cohorts" icon={Calendar} color="blue" />
        <KPICard title="Lecture Halls Used" value="18 Halls" subtext="Campus Capacity" icon={MapPin} color="green" />
        <KPICard title="Peak Time Slot" value="08:00 - 12:00" subtext="Morning Entrance Hub" icon={Clock} color="amber" />
        <KPICard title="Enrolled Students" value="880 Students" subtext="In Active Batches" icon={Users} color="purple" />
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search batch by name, faculty lead..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">{filtered.length} Batches</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(b => (
          <div key={b.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600">{b.id}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">{b.name}</h4>
                <p className="text-xs text-slate-500">{b.instituteName}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">{b.status}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
              <p>Faculty: <strong className="text-slate-800">{b.teacher}</strong></p>
              <p>Room: <strong className="text-slate-800">{b.room}</strong> ({b.students} / {b.capacity} Seats)</p>
              <p className="flex items-center text-slate-500"><Clock className="w-3 h-3 mr-1" /> {b.time}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-600">{b.syllabusPct}% Complete</span>
              <span className="font-bold text-slate-600">{b.streamLive ? '🎥 Streaming' : 'In-Person'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
