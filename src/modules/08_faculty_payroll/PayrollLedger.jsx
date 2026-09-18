import React from 'react';
import { DollarSign, Download, CreditCard, ShieldCheck } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function PayrollLedger({ faculty = [], selectedInstituteCode }) {
  const filtered = faculty.filter(f => selectedInstituteCode === 'all' || f.instituteCode === selectedInstituteCode);
  const total = filtered.reduce((s, f) => s + f.monthlySalary, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-indigo-600" /> Faculty Payroll & Honorarium Ledger
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Monthly salary disbursements, hourly lecture rates, and tax deduction statements.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Payroll" value={`$${total.toLocaleString()}`} subtext="September Disbursements" icon={DollarSign} color="green" />
        <KPICard title="Avg Hourly Rate" value="$110 / hr" subtext="Lecture Compensation" icon={CreditCard} color="blue" />
        <KPICard title="Disbursed Status" value="100% Cleared" subtext="Direct Bank ACH" icon={ShieldCheck} color="purple" />
        <KPICard title="TDS & Tax Deducted" value="10.0% TDS" subtext="Withheld for Filing" icon={DollarSign} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Faculty Name</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Hourly Rate</th>
              <th className="p-3">Hours Taught</th>
              <th className="p-3">Gross Honorarium</th>
              <th className="p-3 text-right">Net Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(f => (
              <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{f.name}</td>
                <td className="p-3 text-slate-600">{f.instituteName}</td>
                <td className="p-3 font-mono font-bold">${f.hourlyRate}/hr</td>
                <td className="p-3 font-semibold">{f.hoursTaught}h</td>
                <td className="p-3 font-mono">${f.monthlySalary.toLocaleString()}</td>
                <td className="p-3 text-right font-mono font-bold text-emerald-600">${(f.monthlySalary * 0.9).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
