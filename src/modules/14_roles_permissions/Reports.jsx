import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, KeyRound, Clock, Zap, CheckCircle2, 
  AlertTriangle, Download, Smartphone, Key, Lock,
  Check, Building2
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { ELEVATION_VELOCITY_DATA, MFA_ADOPTION_DATA } from './rolesPermissionsData';

export default function RolesReports({ instituteCode = 'ALL', activeTab = 'rep_elevation' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_elevation');
  const [pushSent, setPushSent] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const handlePushReminder = () => {
    setPushSent(true);
    setTimeout(() => setPushSent(false), 4000);
  };

  const handleExportCSV = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Sub-category Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Access Governance Telemetry • Zero Trust v4.2
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Aggregated All Centers' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Access Governance & Security Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit privilege elevation velocities, turnaround time windows, and multi-factor hardware authentication adoption.
          </p>
        </div>

        {/* Sub-Category Toggle Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setCurrentTab('rep_elevation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_elevation'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Elevation Velocity</span>
          </button>
          <button
            onClick={() => setCurrentTab('rep_mfa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_mfa'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>MFA Adoption</span>
          </button>
        </div>
      </div>

      {/* Global feedback alerts */}
      {pushSent && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Security broadcast dispatched: 2 non-compliant accounts pinged via SMS & Authenticator push with 24h grace period.
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">Enforced</span>
        </div>
      )}

      {exportNotice && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            Privilege audit ledger exported as CSV (SOC-2 Compliance Format). Download started automatically.
          </span>
          <span className="font-bold text-[11px] bg-blue-100 px-2 py-0.5 rounded text-blue-700">200 OK</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 1: ELEVATION VELOCITY (rep_elevation)                        */}
      {/* ========================================================================= */}
      {currentTab === 'rep_elevation' && (
        <div className="space-y-6">
          {/* Top 4 Elevation KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="indigo"
              title="Elevation Requests"
              value="19 Active"
              subtitle="Last 30 Days Across Campuses"
              icon="⚡"
              badge="SOC-2 Audited"
            />
            <KPICard
              theme="emerald"
              title="Mean Turnaround Time"
              value={ELEVATION_VELOCITY_DATA.meanTurnaroundTime}
              subtitle="Target: Sub-30 Mins"
              icon="⏱️"
              badge="Optimal SLA"
            />
            <KPICard
              theme="amber"
              title="Auto-Expiry Window"
              value={ELEVATION_VELOCITY_DATA.autoExpiryHours}
              subtitle="Strict Time-to-Live (TTL)"
              icon="⏳"
              badge="Zero Drift"
            />
            <KPICard
              theme="rose"
              title="Approval Yield"
              value="89.5%"
              subtitle="17 Approved • 2 Rejected"
              icon="🛡️"
              badge="Strict Checks"
            />
          </div>

          {/* Velocity Trend & Policy Rules Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 6-Month Elevation Velocity Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    Privilege Elevation Velocity (Last 6 Months)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monthly distribution of temporary role elevation tickets requested, authorized, and denied.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-3 h-3 rounded-sm bg-indigo-600"></span> Requested
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500"></span> Approved
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-3 h-3 rounded-sm bg-rose-400"></span> Denied
                  </span>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="space-y-4 pt-2">
                {ELEVATION_VELOCITY_DATA.monthlyRequests.map((item) => {
                  const maxVal = 40;
                  const reqWidth = (item.requested / maxVal) * 100;
                  const appWidth = (item.approved / maxVal) * 100;

                  return (
                    <div key={item.month} className="group">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700 w-8">{item.month}</span>
                          {item.peak && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                              Peak Exam Prep Rush
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                          <span>Total: <strong className="text-slate-800">{item.requested}</strong></span>
                          <span>Approved: <strong className="text-emerald-700">{item.approved}</strong></span>
                          <span>Denied: <strong className="text-rose-600">{item.rejected}</strong></span>
                        </div>
                      </div>

                      {/* Stacked relative progress display */}
                      <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden flex items-center p-0.5 gap-1">
                        <div 
                          className="h-full bg-indigo-600 rounded-md transition-all duration-500" 
                          style={{ width: `${reqWidth}%` }}
                          title={`Requested: ${item.requested}`}
                        />
                        <div 
                          className="h-full bg-emerald-500 rounded-md opacity-90 transition-all duration-500" 
                          style={{ width: `${appWidth}%` }}
                          title={`Approved: ${item.approved}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  Average Approval Speed: <strong>14.2 minutes</strong> (Under 30m SLA threshold)
                </span>
                <span className="text-[11px] text-slate-400">Updated: Today, 01:15 AM</span>
              </div>
            </div>

            {/* Just-In-Time Policy Governance Info */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  JIT Access Directives
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Enforced security parameters for temporary credential escalations.
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Dual-Sign-off Threshold
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Fee concessions above 15% and student KYC record deletion require simultaneous approval by Campus Director & Super Admin.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      Auto-Revocation Daemon
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Privilege grants automatically decay after 24 hours. Zero dormant session tokens are permitted in Redis cache.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Audit Trail Invariance
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      All elevation events are logged into PostgreSQL immutable audit tables with client IP, geofence, and user agent hashes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={handleExportCSV}
                  className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 border border-indigo-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Elevation Audit Ledger (CSV)
                </button>
              </div>
            </div>
          </div>

          {/* Campus Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Campus Elevation Frequency & Turnaround Ledger
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparison across 5 multi-tenant tuition centers during current financial quarter.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                5 Active Campuses
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Campus / Institute</th>
                    <th className="py-3 px-4 text-center">Requests Raised</th>
                    <th className="py-3 px-4 text-center">Approved</th>
                    <th className="py-3 px-4 text-center">Approval Rate</th>
                    <th className="py-3 px-4 text-center">Avg Response</th>
                    <th className="py-3 px-4 text-right">Audit Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ELEVATION_VELOCITY_DATA.campusBreakdown.map((item, idx) => {
                    const rate = Math.round((item.approved / item.totalRequests) * 100);
                    return (
                      <tr key={idx} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800">{item.campus}</div>
                          <div className="text-[10px] text-slate-400">Enterprise Node ID: #CAMP-{101 + idx}</div>
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-slate-700">
                          {item.totalRequests}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-emerald-600">
                          {item.approved}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                            {rate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-semibold text-slate-600">
                          {item.avgMinutes}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 2: MFA ADOPTION (rep_mfa)                                     */}
      {/* ========================================================================= */}
      {currentTab === 'rep_mfa' && (
        <div className="space-y-6">
          {/* Top 4 MFA KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="emerald"
              title="Enterprise MFA Adoption"
              value={MFA_ADOPTION_DATA.overallMfaRate}
              subtitle="All Active Staff Accounts"
              icon="🛡️"
              badge="SOC-2 Grade"
            />
            <KPICard
              theme="indigo"
              title="Protected Accounts"
              value={`${MFA_ADOPTION_DATA.totalProtectedAccounts} Staff`}
              subtitle="Hardware & TOTP Secured"
              icon="🔑"
              badge="Compliant"
            />
            <KPICard
              theme="amber"
              title="Pending Enforcement"
              value={`${MFA_ADOPTION_DATA.unprotectedAccounts} Users`}
              subtitle="Grace Period Active"
              icon="⚠️"
              badge="Follow-up Req"
            />
            <KPICard
              theme="purple"
              title="Hardware Key Share"
              value="8% FIDO2"
              subtitle="Directors & Root Admins"
              icon="💻"
              badge="Phish-Proof"
            />
          </div>

          {/* MFA Methods Breakdown & Instant Enforcement Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* MFA Method Breakdown */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    Authentication Method Distribution
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Breakdown of second-factor methods configured across 128 registered enterprise accounts.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                  NIST SP 800-63B
                </span>
              </div>

              {/* Progress visual bar */}
              <div className="h-6 w-full bg-slate-100 rounded-xl overflow-hidden flex p-0.5 gap-1 mb-6">
                <div className="h-full bg-blue-600 rounded-lg flex items-center justify-center text-[10px] text-white font-bold" style={{ width: '64%' }} title="Google Authenticator (64%)">
                  64%
                </div>
                <div className="h-full bg-indigo-600 rounded-lg flex items-center justify-center text-[10px] text-white font-bold" style={{ width: '28%' }} title="Microsoft Authenticator (28%)">
                  28%
                </div>
                <div className="h-full bg-emerald-600 rounded-lg flex items-center justify-center text-[10px] text-white font-bold" style={{ width: '8%' }} title="Hardware Key (8%)">
                  8%
                </div>
              </div>

              {/* Method detail cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                    <span className="font-bold text-slate-800 text-xs">Google Authenticator</span>
                  </div>
                  <div className="text-xl font-black text-blue-700">64%</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">82 Active Users • TOTP 30s</div>
                  <span className="mt-2 inline-block text-[10px] font-semibold text-blue-600 bg-blue-100/60 px-1.5 py-0.5 rounded">
                    Mobile Authenticator
                  </span>
                </div>

                <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                    <span className="font-bold text-slate-800 text-xs">Microsoft Auth</span>
                  </div>
                  <div className="text-xl font-black text-indigo-700">28%</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">36 Active Users • Push/TOTP</div>
                  <span className="mt-2 inline-block text-[10px] font-semibold text-indigo-600 bg-indigo-100/60 px-1.5 py-0.5 rounded">
                    Enterprise Push
                  </span>
                </div>

                <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                    <span className="font-bold text-slate-800 text-xs">FIDO2 YubiKey</span>
                  </div>
                  <div className="text-xl font-black text-emerald-700">8%</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">10 Active Users • Hardware Token</div>
                  <span className="mt-2 inline-block text-[10px] font-semibold text-emerald-600 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                    Phishing-Resistant
                  </span>
                </div>
              </div>
            </div>

            {/* Instant Push Reminder Action Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 mb-1">
                  <Key className="w-4 h-4 text-indigo-600" />
                  MFA Enforcement Gate
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Zero Trust compliance policy status for non-enrolled accounts.
                </p>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-xs mb-4">
                  <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    2 Unprotected Accounts Detected
                  </div>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    Counselor (USR-106) and Junior Faculty (USR-114) have not paired a mobile TOTP device.
                  </p>
                  <div className="mt-2 text-[10px] text-amber-700 font-semibold">
                    Policy Deadline: In 18 Hours (Automatic session lockout upon expiry).
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SMS fallback codes strictly prohibited (NIST SP 800-63B)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hardware keys required for Root Admins & Finance Cashiers</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <button
                  onClick={handlePushReminder}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Dispatch 2FA Enforcement Ping
                </button>
              </div>
            </div>
          </div>

          {/* Campus MFA Compliance Benchmark Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Campus-by-Campus MFA Compliance Comparison
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-tenant campus breakdown of two-factor hardware & app enrollment.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                Avg Compliance: 98.4%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Campus Center</th>
                    <th className="py-3 px-4 text-center">Compliance Rate</th>
                    <th className="py-3 px-4 text-center">Enrolled Accounts</th>
                    <th className="py-3 px-4 text-center">Pending 2FA</th>
                    <th className="py-3 px-4 text-center">Primary Method</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MFA_ADOPTION_DATA.campusMfaCompliance.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {row.campus}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-black text-slate-900 text-sm font-mono">
                          {row.compliance}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-emerald-700">
                        {row.mfaActive} Users
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.pending > 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                            {row.pending} pending
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">0</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-600">
                        {idx % 2 === 0 ? 'Google TOTP + Hardware' : 'Microsoft Authenticator'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                          row.compliance === '100%'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          <Check className="w-3 h-3" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
