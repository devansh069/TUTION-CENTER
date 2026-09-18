import React, { useState } from 'react';
import { HelpCircle, Search, Clock, CheckCircle2 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function TicketInbox({ tickets = [], selectedInstituteCode }) {
  const [search, setSearch] = useState('');
  const filtered = tickets.filter(t => {
    const scope = selectedInstituteCode === 'all' || t.instituteCode === selectedInstituteCode;
    const s = t.title.toLowerCase().includes(search.toLowerCase()) || t.ticketNo.toLowerCase().includes(search.toLowerCase());
    return scope && s;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Support Ticket Inbox & Queue</h1>
        <p className="text-xs text-slate-500 mt-0.5">Centralized helpdesk for students, parents, and tuition center staff.</p>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets..." className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" />
        </div>
        <span className="text-xs font-bold text-slate-500">{filtered.length} Tickets</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(t => (
          <div key={t.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-600">{t.ticketNo}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">{t.title}</h4>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.priority === 'Critical' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>{t.priority}</span>
            </div>
            <p className="text-xs text-slate-500">Raised for: <strong className="text-slate-700">{t.studentName}</strong> • {t.category}</p>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span>⏱️ SLA Left: <strong className="text-slate-800">{t.slaTimeLeft}</strong></span>
              <button className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-600 hover:text-white transition-colors">
                Resolve Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
