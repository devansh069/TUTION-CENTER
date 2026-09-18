import React, { useState } from 'react';

export default function RoleHierarchyMatrix({ instituteCode }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const permissions = [
    { module: 'Institutes & Branches', create: true, edit: true, delete: false, export: true, superOnly: true },
    { module: 'Student Admissions & KYC', create: true, edit: true, delete: false, export: true, superOnly: false },
    { module: 'Batches & Curriculum', create: true, edit: true, delete: false, export: true, superOnly: false },
    { module: 'Facial Check-in Biometrics', create: true, edit: true, delete: false, export: true, superOnly: false },
    { module: 'Fee Ledger & Cash Reconcile', create: true, edit: false, delete: false, export: true, superOnly: false },
    { module: 'GST Tax Invoicing & Refunds', create: false, edit: false, delete: false, export: true, superOnly: true },
    { module: 'Homework & Exam Scores', create: true, edit: true, delete: true, export: true, superOnly: false },
    { module: 'Payroll & Faculty Salary', create: false, edit: false, delete: false, export: true, superOnly: true },
    { module: 'System Security & Root DB', create: false, edit: false, delete: false, export: false, superOnly: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-800">RBAC Matrix: Role Permission Blueprint</h2>
            <p className="text-xs text-slate-500">Matrix grid mapping modules to Create, Read, Update, Delete (CRUD) and Data Export privileges</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Active Blueprint:</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
              v2.8 Production Enforced
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">ERP Module Area</th>
                <th className="py-3 px-4 text-center">Super Admin</th>
                <th className="py-3 px-4 text-center">Center Director</th>
                <th className="py-3 px-4 text-center">Senior Faculty</th>
                <th className="py-3 px-4 text-center">Fee Cashier</th>
                <th className="py-3 px-4 text-center">Telecaller Counselor</th>
                <th className="py-3 px-4 text-right">Scope Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                    {p.superOnly && <span className="text-rose-500 font-bold text-[10px]" title="Restricted to Super Admin">🔒</span>}
                    {p.module}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">FULL CRUD</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.superOnly ? (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded font-medium text-[10px]">DENIED</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">CRU (Branch)</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {['Batches & Curriculum', 'Homework & Exam Scores', 'Facial Check-in Biometrics'].includes(p.module) ? (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">ACADEMIC RW</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded font-medium text-[10px]">READ ONLY</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {['Fee Ledger & Cash Reconcile', 'Student Admissions & KYC'].includes(p.module) ? (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">FINANCE RW</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded font-medium text-[10px]">NO ACCESS</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {['Student Admissions & KYC'].includes(p.module) ? (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-[10px]">LEAD CREATE</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded font-medium text-[10px]">NO ACCESS</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[11px] font-mono text-slate-500">
                      {p.superOnly ? 'Tenant-Global' : 'Center-Isolated'}
                    </span>
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
