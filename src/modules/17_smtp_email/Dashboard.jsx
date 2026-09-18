import React from 'react';
import { Mail, CheckCircle2, AlertTriangle, Send, ShieldCheck, RefreshCw, BarChart3 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { SMTP_EMAIL_DATA } from '../../data/erpData';

export default function SmtpDashboard({ instituteCode = 'all' }) {
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';
  const filtered = SMTP_EMAIL_DATA.filter(e => isAll || e.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-3 border-b border-slate-200">
        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase tracking-wide border border-blue-200">
          Module 17 • Enterprise Communications
        </span>
        <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
          <Mail className="w-6.5 h-6.5 mr-2 text-indigo-600" /> SMTP / Email Gateway & Dispatcher
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          High-deliverability SMTP relay telemetry, automated monthly scorecards, fee receipts, and bulk email campaign tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Emails Dispatched" value="48,920 Sent" subtext="This Month Cycle" icon={Send} color="blue" />
        <KPICard title="Deliverability Rate" value="99.82%" subtext="Clean IP Sender Score" icon={CheckCircle2} color="green" />
        <KPICard title="Mean Open Rate" value="68.4%" subtext="Parent App Notification" icon={BarChart3} color="purple" />
        <KPICard title="Hard Bounce Rate" value="< 0.04%" subtext="Auto-Cleaned Contacts" icon={ShieldCheck} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <h3 className="font-heading text-sm font-bold text-slate-900 mb-4">Live SMTP Relay Dispatch Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Message ID</th>
                <th className="p-3">Subject & Campaign</th>
                <th className="p-3">Recipient Email</th>
                <th className="p-3">Type</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Open Status</th>
                <th className="p-3 text-right">Delivery Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-600">{e.id}</td>
                  <td className="p-3 font-bold text-slate-900">{e.subject}</td>
                  <td className="p-3 font-mono text-slate-600">{e.recipient}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">{e.type}</span></td>
                  <td className="p-3 font-mono text-slate-500">{e.timestamp}</td>
                  <td className="p-3 font-bold text-indigo-600">{e.openRate}</td>
                  <td className="p-3 text-right font-bold text-emerald-600">✓ {e.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
