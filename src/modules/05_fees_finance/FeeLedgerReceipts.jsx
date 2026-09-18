import React, { useState } from 'react';
import { DollarSign, Search, Download, CreditCard } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function FeeLedgerReceipts({ transactions = [], selectedInstituteCode }) {
  const [search, setSearch] = useState('');
  const filtered = transactions.filter(t => {
    const scope = selectedInstituteCode === 'all' || t.instituteCode === selectedInstituteCode;
    const s = t.studentName.toLowerCase().includes(search.toLowerCase()) || t.receiptNo.toLowerCase().includes(search.toLowerCase());
    return scope && s;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Master Fee Receipts Ledger</h1>
        <p className="text-xs text-slate-500 mt-0.5">Full audit trail of all student mobile app payments, UPI collections, and downloadable receipts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Transactions" value={filtered.length.toString()} subtext="Processed Receipts" icon={CreditCard} color="blue" />
        <KPICard title="UPI Gateway Share" value="74.5%" subtext="Mobile Payments" icon={DollarSign} color="green" />
        <KPICard title="Card / Netbanking" value="21.0%" subtext="Digital Banking" icon={CreditCard} color="purple" />
        <KPICard title="Cash Counter" value="4.5%" subtext="Branch Deposits" icon={DollarSign} color="amber" />
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search receipt #, student name..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium"
          />
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center border border-slate-200">
          <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Receipt #</th>
              <th className="p-3">Student</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Amount (Net + GST)</th>
              <th className="p-3">Date & Mode</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-indigo-600">{t.receiptNo}</td>
                <td className="p-3 font-bold text-slate-900">{t.studentName}</td>
                <td className="p-3 text-slate-600">{t.instituteName}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">${t.amount} <span className="text-[10px] text-slate-400">(+${t.gstTax} Tax)</span></td>
                <td className="p-3 text-slate-600">{t.date} • {t.paymentMode}</td>
                <td className="p-3 text-right">
                  <button className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-600 hover:text-white transition-colors">
                    Download PDF
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
