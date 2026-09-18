import React, { useState } from 'react';
import KPICard from '../../components/common/KPICard';
import { ComplianceBarChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { MOCK_TUITION_CENTERS } from '../../data/erpData';

export default function RolesDashboard({ instituteCode, onNavigate }) {
  const [selectedRole, setSelectedRole] = useState('All');

  const roleStats = [
    { role: 'Super Admin', count: 4, scope: 'Global Enterprise', access: 'All Centers, Financials, Root DB' },
    { role: 'Center Director / Admin', count: 18, scope: 'Assigned Center', access: 'Center Admissions, Cash Drawer, Staff' },
    { role: 'Senior Faculty / HOD', count: 54, scope: 'Academic Dept', access: 'Curriculum, Test Engine, Batch Marks' },
    { role: 'Finance / Cashier', count: 14, scope: 'Branch Cash Counter', access: 'Fee Receipts, Defaulter Calling, Invoices' },
    { role: 'Counselor / Telecaller', count: 28, scope: 'CRM Lead Funnel', access: 'Leads, Walk-ins, Demo Bookings' },
    { role: 'Inventory Keeper', count: 8, scope: 'Logistics Depot', access: 'Kit Dispatches, Stock Recounts' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="RBAC Roles Configured"
          value="6 Master Roles"
          subtitle="Enterprise Matrix"
          icon="🛡️"
          badge="128 Permissions"
        />
        <KPICard
          theme="emerald"
          title="Active Privileged Users"
          value="126 Staff"
          subtitle="Multi-tenant Scope"
          icon="👥"
          trend="+12%"
          badge="Zero Trust Active"
        />
        <KPICard
          theme="amber"
          title="MFA Enforced Rate"
          value="98.4%"
          subtitle="2FA Authenticator TOTP"
          icon="📱"
          badge="SOC-2 / ISO"
        />
        <KPICard
          theme="rose"
          title="Policy Drift Flags"
          value="0 Drift"
          subtitle="Daily Auto Compliance"
          icon="⚖️"
          badge="Audited"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">RBAC Role Hierarchy & Security Delegation</h3>
                <p className="text-xs text-slate-500">Fine-grained permission gates across Super Admin, Center Director, Faculty & Cashiers</p>
              </div>
              <button onClick={() => onNavigate('roles_matrix')} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition">
                Modify Matrix ⚙️
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Role Title</th>
                    <th className="py-3 px-4">Assigned Staff</th>
                    <th className="py-3 px-4">Scope Level</th>
                    <th className="py-3 px-4">Permissions Blueprint</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roleStats.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {r.role}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">{r.count} users</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200">
                          {r.scope}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">{r.access}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                          Enforced
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1">Privilege Elevation Approval Workflow</h3>
            <p className="text-xs text-slate-500 mb-4">Center admin temporary permission expansion requires dual sign-off</p>
            <ApprovalFlowStepper currentStage={2} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Privileged Users Distribution</h3>
            <p className="text-xs text-slate-500 mb-4">Active logins per branch center</p>
            <ComplianceBarChart
              data={[
                { label: 'SuperHQ', value: 4 },
                { label: 'Alpha', value: 34 },
                { label: 'Beta', value: 26 },
                { label: 'Apex', value: 31 },
                { label: 'Delta', value: 19 },
                { label: 'Zenith', value: 12 },
              ]}
              color="#6366f1"
            />
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">🛡️ Zero-Trust Session Auditing</h4>
            <p className="text-xs text-indigo-700 leading-relaxed mb-4">
              All administrative sessions auto-terminate after 25 minutes of inactivity. Concurrent logins from divergent IP geolocation are rejected and flagged in Security Audit.
            </p>
            <button onClick={() => onNavigate('roles_users')} className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-sm transition">
              Manage User Credentials & MFA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
