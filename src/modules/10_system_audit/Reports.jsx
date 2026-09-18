import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Download, ShieldCheck, Clock, CheckCircle2, 
  AlertTriangle, Globe, MapPin, Check, TrendingUp, ShieldAlert,
  Users, Building2, RefreshCw, Lock, Zap
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { PRIVILEGE_DRIFT_DATA, GEO_ANOMALIES_DATA } from './systemAuditData';

export default function SystemAuditReports({ instituteCode = 'ALL', activeTab = 'rep_drift' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_drift');
  const [driftList, setDriftList] = useState(PRIVILEGE_DRIFT_DATA.driftAnomaliesList);
  const [realignNotice, setRealignNotice] = useState('');
  const [exportNotice, setExportNotice] = useState(false);

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const handleRealign = (id, userName) => {
    setDriftList(prev => prev.map(d => d.id === id ? { ...d, status: 'Re-aligned to Baseline', riskLevel: 'Resolved' } : d));
    setRealignNotice(`Privilege drift #${id} for ${userName} revoked. Baseline RBAC permissions restored.`);
    setTimeout(() => setRealignNotice(''), 3500);
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
              Security Governance & Forensic Audit
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Global Multi-Tenant Matrix' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Privilege Drift & Geographical Telemetry Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit out-of-band role elevations, time-bound access decay, and physically impossible travel velocity events.
          </p>
        </div>

        {/* Sub-Category Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setCurrentTab('rep_drift')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_drift'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Privilege Drift Audit</span>
          </button>
          <button
            onClick={() => setCurrentTab('rep_anomalies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_anomalies'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Geographical Anomalies</span>
          </button>
        </div>
      </div>

      {/* Global Alerts */}
      {realignNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {realignNotice}
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">Re-aligned</span>
        </div>
      )}

      {exportNotice && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            Exported SOC-2 Type II audit telemetry report into CSV format.
          </span>
          <span className="font-bold text-[11px] bg-blue-100 px-2 py-0.5 rounded text-blue-700">200 OK</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 1: PRIVILEGE DRIFT AUDIT (rep_drift)                         */}
      {/* ========================================================================= */}
      {currentTab === 'rep_drift' && (
        <div className="space-y-6">
          {/* Top 4 Drift KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="emerald"
              title="Privilege Drift Index"
              value={PRIVILEGE_DRIFT_DATA.driftRiskIndex}
              subtitle="Target: &lt; 2.0% Tolerable"
              icon="🛡️"
              badge="SOC-2 Optimal"
            />
            <KPICard
              theme="indigo"
              title="Orphan Accounts Purged"
              value={PRIVILEGE_DRIFT_DATA.orphanPurged}
              subtitle="Last 90 Days Policy Sweep"
              icon="🧹"
              badge="Clean"
            />
            <KPICard
              theme="amber"
              title="Active JIT Grants"
              value={`${PRIVILEGE_DRIFT_DATA.activeJitGrants} Grants`}
              subtitle="Decaying Automatically &lt; 24h"
              icon="⏳"
              badge="Strict TTL"
            />
            <KPICard
              theme="purple"
              title="Director Access Reviews"
              value={PRIVILEGE_DRIFT_DATA.quarterlyReviewsCompleted}
              subtitle="Quarterly Sign-off Attestation"
              icon="✍️"
              badge="Attested"
            />
          </div>

          {/* 6-Month Privilege Elevation & Auto-Decay Compliance */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Privilege Elevation & Auto-Decay Velocity (Last 6 Months)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tracks temporary credential grants against automated TTL expiration to prevent privilege accumulation.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <span className="w-3 h-3 rounded-sm bg-indigo-600"></span> Requested
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500"></span> Auto-Decayed On-Time
                </span>
              </div>
            </div>

            {/* Visual Bar Comparison */}
            <div className="space-y-3.5 pt-2">
              {PRIVILEGE_DRIFT_DATA.monthlyDriftTrend.map((item) => {
                const maxVal = 40;
                const reqW = (item.elevationRequests / maxVal) * 100;
                const decW = (item.autoDecayed / maxVal) * 100;

                return (
                  <div key={item.month}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700 w-12">{item.month}</span>
                        {item.current && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200">
                            Current Month
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
                        <span>Requested: <strong className="text-slate-800">{item.elevationRequests}</strong></span>
                        <span>Decayed: <strong className="text-emerald-700">{item.autoDecayed}</strong></span>
                        <span>Drift: <strong className={item.driftEvents > 0 ? 'text-rose-600' : 'text-slate-500'}>{item.driftEvents}</strong></span>
                      </div>
                    </div>

                    <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden flex items-center p-0.5 gap-1">
                      <div className="h-full bg-indigo-600 rounded-md" style={{ width: `${reqW}%` }} />
                      <div className="h-full bg-emerald-500 rounded-md" style={{ width: `${decW}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Role-Wise Drift Anomaly Ledger Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  Live Privilege Drift Anomaly Ledger
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Accounts holding escalated permissions deviating from base role templates.
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Export Ledger
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Staff Member & Role</th>
                    <th className="py-3 px-4">Campus Center</th>
                    <th className="py-3 px-4">Baseline Role RBAC</th>
                    <th className="py-3 px-4">Drifted Elevation Grant</th>
                    <th className="py-3 px-4">TTL Expiration</th>
                    <th className="py-3 px-4 text-center">Risk Level</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {driftList.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{item.userName}</div>
                        <div className="text-[10px] text-slate-400">{item.role}</div>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-700">
                        {item.campus}
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {item.baselinePermission}
                      </td>

                      <td className="py-3 px-4">
                        <strong className="text-indigo-700 font-bold block">{item.driftedPermission}</strong>
                        <span className="text-[10px] text-slate-400">{item.grantedReason}</span>
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-600">
                        {item.timeRemaining}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.riskLevel === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : item.riskLevel === 'Low'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {item.riskLevel}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {item.riskLevel !== 'Resolved' ? (
                          <button
                            onClick={() => handleRealign(item.id, item.userName)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] transition inline-flex items-center gap-1"
                          >
                            <Lock className="w-3 h-3" />
                            Revoke JIT
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold text-[11px] inline-flex items-center gap-1">
                            <Check className="w-3 h-3" /> Baseline
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 2: GEOGRAPHICAL ANOMALIES (rep_anomalies)                    */}
      {/* ========================================================================= */}
      {currentTab === 'rep_anomalies' && (
        <div className="space-y-6">
          {/* Top 4 Geo KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="rose"
              title="Impossible Travel Events"
              value={`${GEO_ANOMALIES_DATA.impossibleTravelIncidents} Flagged`}
              subtitle="Aerodynamically Impossible Logins"
              icon="✈️"
              badge="High Risk"
            />
            <KPICard
              theme="amber"
              title="Foreign IP Geoblocks"
              value={`${GEO_ANOMALIES_DATA.foreignIpBlocks} Dropped`}
              subtitle="Outside India Geofence"
              icon="🌍"
              badge="WAF Dropped"
            />
            <KPICard
              theme="emerald"
              title="Turnstile Geofence Sync"
              value={GEO_ANOMALIES_DATA.geofenceCompliance}
              subtitle="Physical Turnstile vs Network IP"
              icon="📍"
              badge="Accurate"
            />
            <KPICard
              theme="indigo"
              title="Active Campus Geofences"
              value={`${GEO_ANOMALIES_DATA.activeCampusNodes} Campuses`}
              subtitle="Kota • Mumbai • Delhi • BLR • HYD"
              icon="🏛️"
              badge="Protected"
            />
          </div>

          {/* Impossible Velocity Incident Log */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Globe className="w-4 h-4 text-rose-600" />
                  Impossible Travel Velocity Detection Roster
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Flagged sessions where elapsed time between geographical locations defies commercial aircraft velocity (&gt; 900 km/h).
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                2 Critical Anomalies
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Victim Account</th>
                    <th className="py-3 px-4">Origin Location & Time</th>
                    <th className="py-3 px-4">Anomaly Location & Time</th>
                    <th className="py-3 px-4 text-center">Calculated Speed</th>
                    <th className="py-3 px-4">Enforced Countermeasure</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {GEO_ANOMALIES_DATA.impossibleTravelLogs.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {item.user}
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                        <div className="font-semibold text-slate-800">{item.originLocation}</div>
                        <div className="text-[10px] text-slate-400">{item.originTime}</div>
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-rose-700">
                        <div className="font-bold">{item.anomalyLocation}</div>
                        <div className="text-[10px] text-slate-400">{item.anomalyTime}</div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-200">
                          {item.calculatedVelocity}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-[11px] text-slate-700 font-semibold">
                        {item.actionTaken}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Campus Geofencing Configuration & Subnets Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Campus Geofence Parameters & IP Subnet Whitelist
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Physical perimeter radius and biometric facial turnstile subnet boundaries.
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Export Geo Config
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Campus Center</th>
                    <th className="py-3 px-4">City / Region</th>
                    <th className="py-3 px-4">Geofence Radius</th>
                    <th className="py-3 px-4">Whitelisted IP Subnets</th>
                    <th className="py-3 px-4 text-center">Turnstiles Enforced</th>
                    <th className="py-3 px-4 text-right">Audit Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {GEO_ANOMALIES_DATA.campusGeofenceMatrix.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {c.campus}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {c.city}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {c.geofenceRadius}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-indigo-600">
                        {c.allowedSubnets}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-100">
                          {c.turnstilesEnforced}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          {c.status}
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
