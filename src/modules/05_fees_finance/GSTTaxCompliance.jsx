import React from 'react';
import { FileText, ShieldCheck, Download, DollarSign } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function GSTTaxCompliance({ transactions = [], selectedInstituteCode }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-indigo-600" /> B2B GST Compliance & Tax Ledgers
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">GSTR-1 tax compliance ledgers, CGST 9% + SGST 9% reconciliations, and HSN/SAC breakdowns.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total GST Remitted" value="$65,565" subtext="18% Standard Tax" icon={DollarSign} color="blue" />
        <KPICard title="CGST Component" value="$32,782.50" subtext="9% Central Ledger" icon={FileText} color="green" />
        <KPICard title="SGST Component" value="$32,782.50" subtext="9% State Ledger" icon={FileText} color="purple" />
        <KPICard title="Filing Status" value="GSTR-1 Ready" subtext="Fully Reconciled" icon={ShieldCheck} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">GSTR-1 Invoicing Reconciliations</h3>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Invoice #</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Gross Taxable</th>
              <th className="p-3">CGST (9%)</th>
              <th className="p-3">SGST (9%)</th>
              <th className="p-3 text-right">HSN/SAC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.slice(0, 6).map(t => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-indigo-600">{t.receiptNo}</td>
                <td className="p-3 font-bold text-slate-900">{t.studentName}</td>
                <td className="p-3 font-mono font-bold text-slate-800">${t.amount}</td>
                <td className="p-3 font-mono text-emerald-600">${(t.amount * 0.09).toFixed(1)}</td>
                <td className="p-3 font-mono text-emerald-600">${(t.amount * 0.09).toFixed(1)}</td>
                <td className="p-3 text-right font-mono text-slate-500">999293 (Tuition)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
