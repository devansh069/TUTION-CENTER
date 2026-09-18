import React, { useState, useMemo } from 'react';
import { 
  Users, UserPlus, Search, Filter, ShieldCheck, Key, 
  Smartphone, Lock, Unlock, RefreshCw, CheckCircle2, AlertTriangle, X
} from 'lucide-react';
import { STAFF_ACCOUNTS } from './rolesPermissionsData';

export default function UserAccountsManager({ instituteCode = 'ALL' }) {
  const [users, setUsers] = useState(STAFF_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [mfaFilter, setMfaFilter] = useState('ALL');
  const [showProvisionModal, setShowProvisionModal] = useState(false);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Center Director',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    mfaMethod: 'Google Authenticator (TOTP)',
    enforceMfa: true
  });

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchCampus = isAllInstitutes || u.instituteCode.toLowerCase() === instituteCode.toLowerCase() || u.instituteCode === 'global';
      const matchRole = roleFilter === 'ALL' || u.role.includes(roleFilter);
      const matchMfa = mfaFilter === 'ALL' 
        ? true 
        : mfaFilter === 'ACTIVE' 
        ? u.mfaEnabled 
        : !u.mfaEnabled;
      const matchSearch = !searchTerm ||
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCampus && matchRole && matchMfa && matchSearch;
    });
  }, [users, instituteCode, isAllInstitutes, roleFilter, mfaFilter, searchTerm]);

  // Handle Provisioning
  const handleProvisionUser = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    const created = {
      id: `USR-${100 + users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone || '+1 (555) 000-0000',
      role: newUser.role,
      instituteCode: newUser.instituteCode,
      instituteName: newUser.instituteName,
      mfaEnabled: newUser.enforceMfa,
      mfaMethod: newUser.mfaMethod,
      lastLogin: 'Never logged in (New)',
      ipAddress: 'Pending First Session',
      status: 'Active',
      elevationLevel: 'Standard Level',
      createdDate: 'Sep 2026'
    };

    setUsers([created, ...users]);
    setShowProvisionModal(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'Center Director',
      instituteCode: 'alpha',
      instituteName: 'Alpha Institute of Science & Tech',
      mfaMethod: 'Google Authenticator (TOTP)',
      enforceMfa: true
    });
    alert(`Staff account provisioned: ${created.name} (${created.email}). Welcome onboarding email sent.`);
  };

  const handleToggleLock = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Locked' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleResetMfa = (userName) => {
    alert(`MFA configuration reset link & QR code dispatched to ${userName}'s official registered phone and email.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Privileged Staff Identity
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredUsers.length} Protected User Accounts
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <Users className="w-6 h-6 text-purple-600" />
            Privileged Staff Accounts Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage user credentials, Multi-Factor Authentication (MFA), center scoping restrictions, and lock compromised sessions.
          </p>
        </div>

        {/* Provision User CTA */}
        <button
          onClick={() => setShowProvisionModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision New Staff User</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search staff by name, email, role..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Center Director">Center Director</option>
            <option value="Senior Faculty">Senior Faculty</option>
            <option value="Finance / Cashier">Finance / Cashier</option>
            <option value="Counselor">Counselor / Telecaller</option>
            <option value="Inventory Keeper">Inventory Keeper</option>
          </select>

          <select
            value={mfaFilter}
            onChange={e => setMfaFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All MFA States</option>
            <option value="ACTIVE">MFA Enforced Only</option>
            <option value="PENDING">Pending 2FA Setup</option>
          </select>
        </div>
      </div>

      {/* User Accounts Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Staff Member & ID</th>
                <th className="py-3 px-4">Master Role Title</th>
                <th className="py-3 px-4">Allocated Campus Scope</th>
                <th className="py-3 px-4">MFA Security Protection</th>
                <th className="py-3 px-4">Last Active & IP Session</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {u.instituteName}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {u.mfaEnabled ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {u.mfaMethod}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px] flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Pending Setup
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-700">{u.lastLogin}</div>
                    <div className="font-mono text-[10px] text-slate-400">{u.ipAddress}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      ● {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleResetMfa(u.name)}
                        title="Re-send 2FA Setup Link"
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>MFA</span>
                      </button>
                      <button
                        onClick={() => handleToggleLock(u.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                          u.status === 'Active'
                            ? 'bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white'
                            : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white'
                        }`}
                      >
                        {u.status === 'Active' ? (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Lock</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3" />
                            <span>Unlock</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision New Staff Modal */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-black text-slate-900">Provision New Staff Account</h3>
              </div>
              <button
                onClick={() => setShowProvisionModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProvisionUser} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Staff Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Anand Ranganathan"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="a.ranganathan@institute.edu"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newUser.phone}
                    onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+1 (555) 300-1200"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assign Master Role</label>
                  <select
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="Center Director">Center Director</option>
                    <option value="Senior Faculty / HOD">Senior Faculty / HOD</option>
                    <option value="Finance / Cashier">Finance / Cashier</option>
                    <option value="Counselor / Telecaller">Counselor / Telecaller</option>
                    <option value="Inventory Keeper">Inventory Keeper</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Campus Scope</label>
                  <select
                    value={newUser.instituteCode}
                    onChange={e => {
                      const names = {
                        alpha: 'Alpha Institute of Science & Tech',
                        beta: 'Beta Commerce Academy & CA',
                        apex: 'Apex Medical Prep',
                        delta: 'Delta Coding Academy',
                        zenith: 'Zenith Humanities & Law'
                      };
                      setNewUser({ 
                        ...newUser, 
                        instituteCode: e.target.value,
                        instituteName: names[e.target.value] || 'Campus Center'
                      });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="alpha">Alpha Institute (Tech)</option>
                    <option value="beta">Beta Commerce (CA)</option>
                    <option value="apex">Apex Medical (NEET)</option>
                    <option value="delta">Delta Coding (AI)</option>
                    <option value="zenith">Zenith Humanities (Law)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-purple-900 block">Enforce Multi-Factor Authentication</span>
                  <span className="text-[11px] text-purple-700">Require TOTP setup upon first login</span>
                </div>
                <input
                  type="checkbox"
                  checked={newUser.enforceMfa}
                  onChange={e => setNewUser({ ...newUser, enforceMfa: e.target.checked })}
                  className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProvisionModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Create & Dispatch Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
