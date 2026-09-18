import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports({ auditLogs = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> System Governance & SOC2 Compliance Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Periodic compliance audits, user access reviews, and session vulnerability reports.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Audit Dossier
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Compliance Score" value="100% Compliant" subtext="SOC2 & GDPR" icon={BarChart3} color="green" />
        <KPICard title="Access Reviews" value="Quarterly Done" subtext="Zero Orphan Accounts" icon={BarChart3} color="blue" />
        <KPICard title="MFA Enforcement" value="100% Enforced" subtext="All Staff & Admin" icon={BarChart3} color="purple" />
        <KPICard title="Backup Redundancy" value="Daily Encrypted" subtext="3-2-1 Backup Strategy" icon={BarChart3} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Audit Domain</th>
              <th className="p-3">Benchmark</th>
              <th className="p-3">Frequency</th>
              <th className="p-3 text-right">Audit Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-3 font-bold text-slate-900">Multi-Tenant Database Isolation</td>
              <td className="p-3 text-slate-600">Strict Row-Level Partition</td>
              <td className="p-3 text-slate-500">Continuous Automated</td>
              <td className="p-3 text-right font-bold text-emerald-600">✓ PASSED</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-3 font-bold text-slate-900">Privileged Session Management</td>
              <td className="p-3 text-slate-600">15-Min Inactivity Timeout</td>
              <td className="p-3 text-slate-500">Real-time Session Watcher</td>
              <td className="p-3 text-right font-bold text-emerald-600">✓ PASSED</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
