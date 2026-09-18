import React from 'react';
import { BarChart3, Download, DollarSign } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports({ transactions = [], selectedInstituteCode }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Financial Intelligence & Collection Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Profitability audits, collection forecasts, and defaulters aging telemetry.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Gross Inflow MTD" value="$364,500" subtext="Target: $350k" icon={DollarSign} color="green" />
        <KPICard title="Defaulter Dues" value="$42,800" subtext="11.7% of Volume" icon={BarChart3} color="rose" />
        <KPICard title="Projected Revenue" value="$410,000" subtext="Next Month" icon={BarChart3} color="blue" />
        <KPICard title="Profit Margin" value="38.4%" subtext="After Faculty Costs" icon={BarChart3} color="purple" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Period</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Gross Fees</th>
              <th className="p-3">GST Remitted</th>
              <th className="p-3">Defaulter Balance</th>
              <th className="p-3 text-right">Collection Efficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map(t => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-medium text-slate-500">{t.date}</td>
                <td className="p-3 font-bold text-slate-900">{t.instituteName}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">${t.amount}</td>
                <td className="p-3 font-mono text-slate-600">${t.gstTax}</td>
                <td className="p-3 font-mono text-rose-600">{t.daysOverdue > 0 ? `$${t.amount}` : '$0'}</td>
                <td className="p-3 text-right font-bold text-emerald-600">94.8%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
