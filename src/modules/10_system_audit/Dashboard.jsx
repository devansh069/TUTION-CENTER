import React from 'react';
import { Shield, Server, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { ComplianceBarChart } from '../../components/common/Charts';

export default function Dashboard({ auditLogs = [], selectedInstituteCode }) {
  const filtered = auditLogs.filter(l => selectedInstituteCode === 'all' || l.instituteCode === 'global' || l.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-indigo-600" /> Global Security & System Audit Command Hub
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Immutable administrative audit trails, security breach monitoring, and multi-tenant database isolation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Audit Logs" value={`${filtered.length} Events`} subtext="100% Immutable" icon={Shield} color="blue" badge="Logged" />
        <KPICard title="Security Audits" value="Passed 100%" subtext="Zero Breaches Detected" icon={CheckCircle2} color="green" badge="SOC2 Ready" />
        <KPICard title="Database Vaults" value="5 Isolated DBs" subtext="Multi-Tenant Shards" icon={Server} color="purple" badge="Encrypted" />
        <KPICard title="Privilege Escalations" value="0 Critical" subtext="Strict RBAC Matrix" icon={Key} color="amber" badge="Secure" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceBarChart title="System Security & Access Compliance" target={100} current={100} statusMessage="100% compliance across MFA and role boundary policies" />
        <ApprovalFlowStepper title="Privileged Access Request Workflow" subtitle="Staff Request -> Center Admin Endorsement -> Super Admin Grant" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Live System Audit Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">User & Role</th>
                <th className="p-3">Action Executed</th>
                <th className="p-3">Scope</th>
                <th className="p-3">IP / Device</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{l.user} <span className="text-slate-400 font-normal">({l.role})</span></td>
                  <td className="p-3 text-slate-700 font-medium">{l.action}</td>
                  <td className="p-3 font-mono text-slate-600 uppercase">{l.instituteCode}</td>
                  <td className="p-3 font-mono text-slate-500">{l.ip}</td>
                  <td className="p-3 text-slate-400">{l.timestamp}</td>
                  <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">{l.severity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
