import React, { useState } from 'react';
import { GraduationCap, Search, Filter, Mail, Phone, CheckCircle2 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function StudentMaster({ students = [], selectedInstituteCode }) {
  const [search, setSearch] = useState('');
  const [feeFilter, setFeeFilter] = useState('all');

  const filtered = students.filter(s => {
    const matchesScope = selectedInstituteCode === 'all' || s.instituteCode === selectedInstituteCode;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchesFee = feeFilter === 'all' || s.feeStatus === feeFilter;
    return matchesScope && matchesSearch && matchesFee;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Student Master Directory</h1>
        <p className="text-xs text-slate-500 mt-0.5">Comprehensive student records, batch assignments, and emergency guardian details.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Records" value={filtered.length.toString()} subtext="Active Roster" icon={GraduationCap} color="blue" />
        <KPICard title="Attendance Rate" value="95.8%" subtext="Network Average" icon={CheckCircle2} color="green" />
        <KPICard title="Parent App Link" value="94.2%" subtext="Connected Guardians" icon={Phone} color="purple" />
        <KPICard title="Clearance Rate" value="89.5%" subtext="Fees Up to Date" icon={Mail} color="amber" />
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search student by name, student ID..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium"
          />
        </div>
        <select value={feeFilter} onChange={e => setFeeFilter(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-indigo-600 font-medium cursor-pointer">
          <option value="all">All Fee Clearances</option>
          <option value="Paid">Paid Only</option>
          <option value="Partial">Partial Dues</option>
          <option value="Defaulter">Defaulters</option>
        </select>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Student & ID</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Guardian & Contact</th>
                <th className="p-3">Biometric Photo</th>
                <th className="p-3 text-right">Fee Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900 flex items-center space-x-2.5">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-xl object-cover border border-slate-200" />
                    <div>
                      <p>{s.name}</p>
                      <p className="text-[10px] text-indigo-600 font-mono font-normal">{s.id}</p>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{s.instituteName}</td>
                  <td className="p-3 font-semibold text-slate-800">{s.batchName}</td>
                  <td className="p-3 text-slate-600">
                    <p className="font-bold text-slate-800">{s.parentName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{s.parentPhone}</p>
                  </td>
                  <td className="p-3">
                    {s.facialVerified ? (
                      <span className="text-emerald-600 font-bold flex items-center text-[11px]"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Enrolled</span>
                    ) : (
                      <span className="text-amber-600 font-bold text-[11px]">Pending Photo</span>
                    )}
                  </td>
                  <td className="p-3 text-right font-bold">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] ${s.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{s.feeStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
