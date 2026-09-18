import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Download, Clock, CheckCircle2, 
  AlertTriangle, Smartphone, Check, TrendingUp,
  FileCheck, Users, Building2
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { SIGNOFF_AUDIT_DATA, PARENT_GRIEVANCES_DATA } from './parentPtmData';

export default function ParentPTMReports({ instituteCode = 'ALL', activeTab = 'rep_signoff' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_signoff');
  const [grievanceList, setGrievanceList] = useState(PARENT_GRIEVANCES_DATA.ticketsList);
  const [resolvedNotice, setResolvedNotice] = useState('');
  const [exportNotice, setExportNotice] = useState(false);

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const handleResolveGrievance = (id, parentName) => {
    setGrievanceList(prev => prev.map(g => g.id === id ? { ...g, status: 'Resolved' } : g));
    setResolvedNotice(`Grievance #${id} for ${parentName} resolved and parent app notification dispatched.`);
    setTimeout(() => setResolvedNotice(''), 3500);
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
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
              Parent Engagement & Audit Telemetry
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Aggregated All Centers' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Guardian Analytics & Satisfaction Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit monthly student card sign-off velocity and track parent grievance resolution benchmarks.
          </p>
        </div>

        {/* Sub-Category Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setCurrentTab('rep_signoff')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_signoff'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Sign-off Audit</span>
          </button>
          <button
            onClick={() => setCurrentTab('rep_grievance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_grievance'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Parent Grievances</span>
          </button>
        </div>
      </div>

      {/* Global Alerts */}
      {resolvedNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {resolvedNotice}
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">Resolved</span>
        </div>
      )}

      {exportNotice && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            Audit ledger exported as CSV (SOC-2 Compliance Format).
          </span>
          <span className="font-bold text-[11px] bg-blue-100 px-2 py-0.5 rounded text-blue-700">200 OK</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 1: SIGN-OFF AUDIT (rep_signoff)                              */}
      {/* ========================================================================= */}
      {currentTab === 'rep_signoff' && (
        <div className="space-y-6">
          {/* Top 4 Sign-off Audit KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="emerald"
              title="Mean Sign-off Velocity"
              value={SIGNOFF_AUDIT_DATA.meanTurnaroundDays}
              subtitle="Target: Sub-3 Days"
              icon="⏱️"
              badge="Optimal Speed"
            />
            <KPICard
              theme="indigo"
              title="Signature Integrity"
              value={SIGNOFF_AUDIT_DATA.verificationYield}
              subtitle="Cryptographic SHA-256 Ledger"
              icon="🛡️"
              badge="SOC-2 Valid"
            />
            <KPICard
              theme="blue"
              title="Auto-Reminder Conversion"
              value={SIGNOFF_AUDIT_DATA.reminderConversionRate}
              subtitle="Signed Within 24h of Push"
              icon="📲"
              badge="High Response"
            />
            <KPICard
              theme="amber"
              title="Paperless Environmental Gain"
              value={SIGNOFF_AUDIT_DATA.sheetsSaved}
              subtitle="Conserved This Academic Term"
              icon="🌱"
              badge="100% Digital"
            />
          </div>

          {/* 6-Month Trend & Push Channel Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 6-Month Compliance Trend Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    Monthly Report Digital Sign-off Velocity (Last 6 Months)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monthly ratio of generated student progress dossiers approved within the 7-day grace window.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-3 h-3 rounded-sm bg-emerald-600"></span> Signed On-Time
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-3 h-3 rounded-sm bg-amber-400"></span> Delayed (&gt;7d)
                  </span>
                </div>
              </div>

              {/* Bar visualization */}
              <div className="space-y-4 pt-2">
                {SIGNOFF_AUDIT_DATA.monthlyComplianceTrend.map((item) => {
                  const maxTotal = 5000;
                  const signedWidth = (item.signedOnTime / maxTotal) * 100;
                  const delayedWidth = (item.delayed / maxTotal) * 100;

                  return (
                    <div key={item.month}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700 w-16">{item.month}</span>
                          {item.current && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                              Current Audit Cycle
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
                          <span>Total: <strong className="text-slate-800">{item.generated}</strong></span>
                          <span>On-Time: <strong className="text-emerald-700">{item.signedOnTime}</strong></span>
                          <span>Compliance: <strong className="text-indigo-700">{item.compliance}</strong></span>
                        </div>
                      </div>

                      <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden flex items-center p-0.5 gap-1">
                        <div
                          className="h-full bg-emerald-600 rounded-md transition-all duration-500"
                          style={{ width: `${signedWidth}%` }}
                        />
                        <div
                          className="h-full bg-amber-400 rounded-md transition-all duration-500"
                          style={{ width: `${delayedWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  Average parent sign-off completion: <strong>1.8 days</strong> from publication
                </span>
                <span className="text-[11px] text-slate-400">Updated: Today, 01:45 AM</span>
              </div>
            </div>

            {/* Notification Channel Share */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 mb-1">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  Push Channel Efficacy
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Conversion and open rates by guardian alert gateway.
                </p>

                <div className="space-y-3.5">
                  {SIGNOFF_AUDIT_DATA.channelShare.map((ch, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>{ch.channel}</span>
                        <span className="text-indigo-700">{ch.percentage}% Share</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${ch.color} rounded-full`} style={{ width: `${ch.percentage}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <span>Open & Verification Rate:</span>
                        <strong className="text-emerald-700">{ch.openRate}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={handleExportCSV}
                  className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 border border-indigo-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Sign-off Audit (CSV)
                </button>
              </div>
            </div>
          </div>

          {/* Campus Sign-off Compliance Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Campus-by-Campus Digital Sign-off Compliance Roster
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparison across 5 multi-tenant tuition centers during current academic cycle.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                Avg Compliance: 98.2%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Campus Center</th>
                    <th className="py-3 px-4 text-center">Reports Generated</th>
                    <th className="py-3 px-4 text-center">Signed & Approved</th>
                    <th className="py-3 px-4 text-center">Compliance Rate</th>
                    <th className="py-3 px-4 text-center">Avg Turnaround</th>
                    <th className="py-3 px-4 text-right">Audit Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SIGNOFF_AUDIT_DATA.campusSignoffTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {row.campus}
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-slate-700">
                        {row.reports}
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-emerald-700">
                        {row.signed}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                          {row.compliance}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-semibold text-slate-600">
                        {row.avgDays}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
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

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 2: PARENT GRIEVANCES (rep_grievance)                         */}
      {/* ========================================================================= */}
      {currentTab === 'rep_grievance' && (
        <div className="space-y-6">
          {/* Top 4 Grievance KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="blue"
              title="Parent Grievances Filed"
              value={`${PARENT_GRIEVANCES_DATA.totalFiled} Inquiries`}
              subtitle="Current Academic Month"
              icon="📩"
              badge="Active Triage"
            />
            <KPICard
              theme="emerald"
              title="Mean Resolution TAT"
              value={PARENT_GRIEVANCES_DATA.meanResolutionHours}
              subtitle="SLA Target: Sub-6 Hours"
              icon="⏱️"
              badge="SLA Met"
            />
            <KPICard
              theme="indigo"
              title="First-Contact Resolution"
              value={PARENT_GRIEVANCES_DATA.firstContactResolution}
              subtitle="Resolved in Single Interaction"
              icon="✅"
              badge="High Efficiency"
            />
            <KPICard
              theme="amber"
              title="Director Escalations"
              value={`${PARENT_GRIEVANCES_DATA.directorEscalations} Critical`}
              subtitle="Awaiting Executive Sign-off"
              icon="⚠️"
              badge="Priority 1"
            />
          </div>

          {/* Root Cause Breakdown Row */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Parent Grievance Category & Root Cause Breakdown
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Classification of parent feedback tickets filed via mobile app and reception help desk.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                24 Total Inquiries
              </span>
            </div>

            {/* Visual breakdown bars */}
            <div className="space-y-3 pt-1">
              {PARENT_GRIEVANCES_DATA.categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{cat.category}</span>
                    <div className="flex items-center gap-2 font-mono text-slate-500">
                      <span>{cat.count} tickets</span>
                      <strong className="text-slate-800">{cat.percentage}%</strong>
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Parent Grievances Resolution Ledger */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Live Parent Inquiries & Executive Escalations Queue
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Resolution timeline, sentiment tracking, and director intervention notes.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                {grievanceList.length} Tickets
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Parent & Student</th>
                    <th className="py-3 px-4">Campus</th>
                    <th className="py-3 px-4">Grievance Category</th>
                    <th className="py-3 px-4">Summary & Director Remarks</th>
                    <th className="py-3 px-4 text-center">Urgency</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grievanceList.map(g => (
                    <tr key={g.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                          {g.id}
                        </span>
                        <div className="font-bold text-slate-900 mt-0.5">{g.parentName}</div>
                        <div className="text-[11px] text-slate-500">{g.studentName}</div>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-700">
                        {g.campus}
                        <div className="text-[10px] text-slate-400">Filed: {g.filedDate}</div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-800 max-w-xs">
                        {g.category}
                      </td>

                      <td className="py-3 px-4 max-w-sm">
                        <div className="text-slate-700 text-[11px] line-clamp-2">
                          {g.summary}
                        </div>
                        <div className="mt-1 text-[10px] text-indigo-700 bg-indigo-50/70 p-1.5 rounded-lg border border-indigo-100">
                          <strong>Director:</strong> {g.directorRemarks}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          g.urgency === 'Critical'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : g.urgency === 'High'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {g.urgency}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          g.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : g.status === 'Under Investigation'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}>
                          {g.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {g.status !== 'Resolved' ? (
                          <button
                            onClick={() => handleResolveGrievance(g.id, g.parentName)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-xs"
                          >
                            <Check className="w-3 h-3" />
                            Resolve
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Closed
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
    </div>
  );
}
