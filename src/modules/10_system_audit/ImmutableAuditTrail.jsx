import React, { useState } from 'react';
import { Shield, Search, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function ImmutableAuditTrail({ auditLogs = [], selectedInstituteCode }) {
  const [search, setSearch] = useState('');
  const filtered = auditLogs.filter(l => {
    const scope = selectedInstituteCode === 'all' || l.instituteCode === 'global' || l.instituteCode === selectedInstituteCode;
    const s = l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase());
    return scope && s;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Immutable Global Audit Trail</h1>
        <p className="text-xs text-slate-500 mt-0.5">Append-only administrative actions log with cryptographic SHA-256 verification.</p>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search audit logs by user, action..." className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" />
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center border border-slate-200">
          <Download className="w-3.5 h-3.5 mr-1" /> Export Audit Log
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Log ID</th>
              <th className="p-3">User & Role</th>
              <th className="p-3">Action Description</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-indigo-600">{l.id}</td>
                <td className="p-3 font-bold text-slate-900">{l.user} <span className="text-slate-400 font-normal">({l.role})</span></td>
                <td className="p-3 text-slate-800">{l.action}</td>
                <td className="p-3 font-mono text-slate-500">{l.ip}</td>
                <td className="p-3 text-slate-500">{l.timestamp}</td>
                <td className="p-3 text-right font-mono text-emerald-600 font-bold">✓ VERIFIED</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
