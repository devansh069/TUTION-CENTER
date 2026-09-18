import React, { useState } from 'react';

export default function UserAccountsManager({ instituteCode }) {
  const [filterRole, setFilterRole] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { name: 'Dr. Vikram Malhotra', email: 'v.malhotra@zenith-superadmin.in', role: 'Super Admin', center: 'Global HQ', mfa: true, lastLogin: '10 mins ago', status: 'Active' },
    { name: 'Sunita Rao', email: 's.rao@alpha-kota.in', role: 'Center Director', center: 'Alpha Center Kota', mfa: true, lastLogin: '24 mins ago', status: 'Active' },
    { name: 'Rajesh Verma', email: 'r.verma@beta-mumbai.in', role: 'Center Director', center: 'Beta South Mumbai', mfa: true, lastLogin: '1 hr ago', status: 'Active' },
    { name: 'Prof. Arvind Nambiar', email: 'a.nambiar@apex-delhi.in', role: 'Senior Faculty', center: 'Apex Janakpuri', mfa: true, lastLogin: 'Just now', status: 'Active' },
    { name: 'Meera Chawla', email: 'm.chawla@delta-bengaluru.in', role: 'Finance / Cashier', center: 'Delta Koramangala', mfa: true, lastLogin: '3 hrs ago', status: 'Active' },
    { name: 'Kavita Joshi', email: 'k.joshi@alpha-kota.in', role: 'Counselor / Telecaller', center: 'Alpha Center Kota', mfa: false, lastLogin: 'Yesterday', status: 'Pending 2FA' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-800">Privileged Staff Accounts Directory</h2>
            <p className="text-xs text-slate-500">Manage user credentials, Multi-Factor Authentication (TOTP), center scoping and revoke access</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search user by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm">
              <span>+</span> Provision User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Allocated Center Scope</th>
                <th className="py-3 px-4">MFA Protection</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[11px] font-bold">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">{u.center}</td>
                  <td className="py-3 px-4">
                    {u.mfa ? (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                        Enforced (TOTP)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[10px] font-bold">
                        Unenforced ⚠️
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{u.lastLogin}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold hover:bg-slate-200 transition">
                      Edit Scope
                    </button>
                    <button className="px-2 py-1 bg-rose-50 text-rose-600 rounded text-[11px] font-semibold hover:bg-rose-100 transition">
                      Revoke
                    </button>
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
