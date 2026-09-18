import React from 'react';
import { AlertTriangle, Send, Phone, DollarSign } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function DefaulterRecovery({ transactions = [], selectedInstituteCode }) {
  const filtered = transactions.filter(t => selectedInstituteCode === 'all' || t.instituteCode === selectedInstituteCode);
  const defaulters = filtered.filter(t => t.status === 'Overdue' || t.status === 'Partial');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-rose-600" /> Defaulters Recovery & Dunning Matrix
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Overdue fee recovery pipeline categorized by aging buckets (30 days, 60 days, 90+ days).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Defaulter Balance" value="$42,800" subtext="Across 185 Students" icon={DollarSign} color="rose" />
        <KPICard title="30-60 Days Overdue" value="$28,500" subtext="1st Warning Sent" icon={AlertTriangle} color="amber" />
        <KPICard title="60+ Days Critical" value="$14,300" subtext="Final Escalation" icon={AlertTriangle} color="purple" />
        <KPICard title="Recovery Rate" value="88.5%" subtext="Via Mobile App Link" icon={DollarSign} color="green" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Student & ID</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Overdue Amount</th>
              <th className="p-3">Aging</th>
              <th className="p-3 text-right">App Payment Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {defaulters.map(t => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{t.studentName} <span className="text-slate-400 font-mono font-normal">({t.receiptNo})</span></td>
                <td className="p-3 text-slate-600">{t.instituteName}</td>
                <td className="p-3 font-mono font-bold text-rose-600">${t.amount}</td>
                <td className="p-3 font-bold text-amber-700">{t.daysOverdue} Days Overdue</td>
                <td className="p-3 text-right">
                  <button className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-600 hover:text-white transition-colors">
                    Send App Payment Push
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
