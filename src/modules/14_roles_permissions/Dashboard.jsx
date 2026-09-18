import React, { useState, useMemo } from 'react';
import { 
  Shield, Key, Users, Lock, CheckCircle2, AlertTriangle, 
  ArrowRight, Sparkles, Smartphone, ShieldCheck, Eye, RefreshCw, X
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { MASTER_ROLES, STAFF_ACCOUNTS, ELEVATION_REQUESTS } from './rolesPermissionsData';

export default function RolesDashboard({ instituteCode = 'ALL', onNavigate }) {
  const [elevationList, setElevationList] = useState(ELEVATION_REQUESTS);

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter staff by campus scope
  const filteredStaff = useMemo(() => {
    return STAFF_ACCOUNTS.filter(u => {
      const matchCampus = isAllInstitutes || u.instituteCode.toLowerCase() === instituteCode.toLowerCase() || u.instituteCode === 'global';
      return matchCampus;
    });
  }, [instituteCode, isAllInstitutes]);

  const handleElevationDecision = (requestId, decision) => {
    setElevationList(prev => prev.map(r => {
      if (r.id === requestId) {
        return { ...r, status: decision };
      }
      return r;
    }));
    alert(`Elevation request #${requestId} marked as "${decision}". Policy expiration timer set to 24 hours.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cockpit Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 font-bold text-xs rounded-full border border-purple-400/30 flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                Zero Trust Security Governance Cloud
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SOC-2 Type II Compliance Verified
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>RBAC Roles, Permissions & Security Matrix</span>
            </h1>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              Enforce role-based boundaries across center directors, academic faculty, fee cashiers, and counselors. Monitor multi-factor authentication (MFA) and temporary privilege elevations.
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate?.('category_access')}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/30 transition flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Category Access Grid</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('roles_matrix')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-purple-300" />
              <span>Role Matrix</span>
            </button>
            <button
              onClick={() => onNavigate?.('roles_users')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Staff Accounts</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pastel Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="RBAC Roles Configured"
          value="6 Master Roles"
          subtitle="128 Granular Privileges"
          icon="🛡️"
          badge="Zero Drift"
        />
        <KPICard
          theme="emerald"
          title="Active Privileged Staff"
          value={`${filteredStaff.length} Accounts`}
          subtitle="Multi-tenant Scope Protected"
          icon="👥"
          trend="+12%"
          badge="Zero Trust Active"
        />
        <KPICard
          theme="purple"
          title="MFA Enforced Rate"
          value="98.4% Enforced"
          subtitle="TOTP Authenticator & FIDO2"
          icon="📱"
          badge="SOC-2 / ISO"
        />
        <KPICard
          theme="rose"
          title="Elevation Requests"
          value={`${elevationList.filter(e => e.status === 'Pending Approval').length} Pending`}
          subtitle="Director / Partner Approval"
          icon="⚡"
          badge="Time Sensitive"
        />
      </div>

      {/* Master Roles Breakdown Visual Cards */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              6 Master Enterprise Privilege Roles
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Role definitions, user counts, and operational access boundaries</p>
          </div>
          <button
            onClick={() => onNavigate?.('roles_matrix')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View Full CRUD Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MASTER_ROLES.map((r, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2.5 flex flex-col justify-between hover:border-purple-300 transition">
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-xs">{r.role}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${r.color}`}>
                    {r.badge}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-indigo-700">Scope: {r.scope}</div>
                <p className="text-[11px] text-slate-600 leading-relaxed bg-white p-2 rounded-lg border border-slate-100">
                  {r.access}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium">Assigned Users:</span>
                <span className="font-mono font-bold text-slate-800">{r.count} Staff Members</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgent Privilege Elevation Requests Desk */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Key className="w-4 h-4 text-purple-600" />
              Privilege Elevation Request Triage Desk
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Temporary time-bound access requests requiring Super Admin sign-off</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            Auto-Expires in 24 Hours
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Request ID & Staff</th>
                <th className="py-3 px-4">Current Role & Campus</th>
                <th className="py-3 px-4">Requested Elevation</th>
                <th className="py-3 px-4">Business Justification</th>
                <th className="py-3 px-4">SLA Time Left</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Decision Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {elevationList.map(req => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{req.user}</div>
                    <div className="font-mono text-[10px] text-purple-600 font-bold">{req.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{req.role}</div>
                    <div className="text-[11px] text-slate-500">{req.campus}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 font-bold text-[11px] border border-purple-200">
                      {req.requestedPrivilege}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="text-slate-600 text-[11px] leading-snug">{req.reason}</p>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-rose-600">
                    ⏱️ {req.timeRemaining}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : req.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {req.status === 'Pending Approval' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleElevationDecision(req.id, 'Approved')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition"
                        >
                          Approve 24h
                        </button>
                        <button
                          onClick={() => handleElevationDecision(req.id, 'Rejected')}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">Processed</span>
                    )}
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
