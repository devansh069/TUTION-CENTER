import React from 'react';
import { DollarSign, AlertTriangle, FileText, CreditCard, TrendingUp } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';

export default function Dashboard({ transactions = [], selectedInstituteCode }) {
  const filtered = transactions.filter(t => selectedInstituteCode === 'all' || t.instituteCode === selectedInstituteCode);
  const paid = filtered.filter(t => t.status === 'Paid').reduce((s, t) => s + t.amount, 0);
  const overdue = filtered.filter(t => t.status === 'Overdue').reduce((s, t) => s + t.amount, 0);
  const gst = Math.round(paid * 0.18);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Fees & Financial Control Hub</h1>
        <p className="text-xs text-slate-500 mt-0.5">Consolidated fee collection ledgers, automated mobile app receipts, GST tax liabilities, and defaulters.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Collected Fees" value={`$${paid.toLocaleString()}`} subtext="Mobile App Receipts Issued" icon={DollarSign} color="green" badge="Paid" />
        <KPICard title="Overdue Defaulters" value={`$${overdue.toLocaleString()}`} subtext="Aging 30+ Days" icon={AlertTriangle} color="rose" badge="Action Required" />
        <KPICard title="GST Liability (18%)" value={`$${gst.toLocaleString()}`} subtext="CGST 9% + SGST 9%" icon={FileText} color="blue" badge="Due in 14d" />
        <KPICard title="Digital Invoices" value={`${filtered.length} Receipts`} subtext="UPI, App & Card" icon={CreditCard} color="purple" badge="100% Tax Compliant" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendAnalyticsChart title="6-Month Fee Inflow vs Target" subtitle="Monthly collection progression across payment modes" />
        <ApprovalFlowStepper title="Fee Refund & Discount Approval Flow" subtitle="Counselor Request -> Branch Accountant -> Super Admin Partner" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Recent Fee Transactions & Receipts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Receipt #</th>
                <th className="p-3">Student</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Method</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-600">{t.receiptNo}</td>
                  <td className="p-3 font-bold text-slate-900">{t.studentName}</td>
                  <td className="p-3 text-slate-600">{t.instituteName}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">${t.amount}</td>
                  <td className="p-3 text-slate-600">{t.paymentMode}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${t.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{t.status}</span>
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
