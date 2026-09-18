import React, { useState, useMemo } from 'react';
import { 
  FileCheck, CheckCircle2, Clock, Search, 
  Download, Eye, AlertTriangle, ShieldCheck, Send, Check
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { MONTHLY_SIGNOFFS_DATA } from './parentPtmData';

export default function MonthlySignoffs({ instituteCode = 'ALL' }) {
  const [dossiers, setDossiers] = useState(MONTHLY_SIGNOFFS_DATA);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('ALL');
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [reminderSentId, setReminderSentId] = useState(null);
  const [exportNotice, setExportNotice] = useState(false);

  // Multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filtered = useMemo(() => {
    return dossiers.filter(d => {
      const scope = isAllInstitutes || d.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchSearch = 
        d.studentName.toLowerCase().includes(search.toLowerCase()) || 
        d.rollNo.toLowerCase().includes(search.toLowerCase()) ||
        d.parentName.toLowerCase().includes(search.toLowerCase());
      
      let matchTab = true;
      if (statusTab === 'SIGNED') matchTab = d.signatureStatus.includes('Signed');
      if (statusTab === 'PENDING') matchTab = d.signatureStatus.includes('Pending');
      if (statusTab === 'DISPUTED') matchTab = d.signatureStatus.includes('Disputed');

      return scope && matchSearch && matchTab;
    });
  }, [dossiers, instituteCode, isAllInstitutes, search, statusTab]);

  const handleSendReminder = (id, parentName) => {
    setReminderSentId(id);
    setTimeout(() => setReminderSentId(null), 3500);
  };

  const handleExportCSV = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Cryptographic Digital Sign-off Vault
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Aggregated All Centers' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Monthly Student Report Digital Sign-off Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit guardian review timestamps, biometric authorizations, and paperless progress card sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Sign-off Audit (CSV)
          </button>
        </div>
      </div>

      {/* Reminder Notification */}
      {reminderSentId && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Automated WhatsApp & Mobile Push reminder dispatched for report #{reminderSentId} with secure 24-hr sign-off link.
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">Dispatched</span>
        </div>
      )}

      {exportNotice && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            Compiled August 2026 Parent Sign-off Ledger into SOC-2 compliant CSV format.
          </span>
          <span className="font-bold text-[11px] bg-blue-100 px-2 py-0.5 rounded text-blue-700">200 OK</span>
        </div>
      )}

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="blue"
          title="Generated Progress Cards"
          value="4,890 Dossiers"
          subtitle="August 2026 Batch Term"
          icon="📄"
          badge="100% Rendered"
        />
        <KPICard
          theme="emerald"
          title="Signed & Approved"
          value="98.2% Approved"
          subtitle="4,802 Validated Signatures"
          icon="✍️"
          badge="SOC-2 Validated"
        />
        <KPICard
          theme="amber"
          title="Pending Parent Review"
          value="88 Reports"
          subtitle="Push Notifications Active"
          icon="⏳"
          badge="Grace Active"
        />
        <KPICard
          theme="rose"
          title="Parent Contested / Disputes"
          value="3 Under Review"
          subtitle="Grading Re-evaluations"
          icon="⚠️"
          badge="Dean Triage"
        />
      </div>

      {/* Filter and Tab Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search student name, roll number, or guardian..."
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium"
          />
        </div>

        {/* Status Tab Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs self-start md:self-auto">
          <button
            onClick={() => setStatusTab('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              statusTab === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Dossiers ({dossiers.length})
          </button>
          <button
            onClick={() => setStatusTab('SIGNED')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              statusTab === 'SIGNED' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Signed & Approved
          </button>
          <button
            onClick={() => setStatusTab('PENDING')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              statusTab === 'PENDING' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending Sign-off
          </button>
          <button
            onClick={() => setStatusTab('DISPUTED')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              statusTab === 'DISPUTED' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Disputed (3)
          </button>
        </div>
      </div>

      {/* Main Dossier Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Student & Batch</th>
                <th className="py-3 px-4">Campus Center</th>
                <th className="py-3 px-4 text-center">Attendance %</th>
                <th className="py-3 px-4 text-center">Score Avg</th>
                <th className="py-3 px-4">Guardian Device & Hash</th>
                <th className="py-3 px-4 text-center">Sign-off Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(d => {
                const isSigned = d.signatureStatus.includes('Signed');
                const isDisputed = d.signatureStatus.includes('Disputed');

                return (
                  <tr key={d.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{d.studentName}</div>
                      <div className="text-[11px] text-indigo-600 font-mono font-semibold">
                        {d.rollNo} • {d.rankInBatch}
                      </div>
                      <div className="text-[10px] text-slate-400">{d.gradeBatch}</div>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-700">
                      {d.instituteName}
                      <div className="text-[10px] text-slate-400">Advisor: {d.academicAdvisor}</div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-black text-slate-900 font-mono">
                        {d.attendancePercent}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        {d.avgScorePercent}%
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-mono text-[11px] text-slate-700 font-bold truncate">
                        {d.signatureHash}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {d.guardianDevice}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isSigned
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isDisputed
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {isSigned ? <Check className="w-3 h-3 text-emerald-600" /> : isDisputed ? <AlertTriangle className="w-3 h-3 text-rose-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                        {d.signatureStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedDossier(d)}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] transition inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Inspect
                        </button>
                        {!isSigned && !isDisputed && (
                          <button
                            onClick={() => handleSendReminder(d.id, d.parentName)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-xs"
                          >
                            <Send className="w-3 h-3" />
                            Ping
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Digital Dossier Modal */}
      {selectedDossier && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  📄
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Monthly Progress Card & Digital Certificate
                  </h3>
                  <p className="text-xs text-slate-500">{selectedDossier.reportMonth} • {selectedDossier.studentName}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDossier(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Academic Metrics Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Biometric Attendance</span>
                  <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{selectedDossier.attendancePercent}%</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Exemplary</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Composite Score Avg</span>
                  <div className="text-lg font-black text-indigo-600 font-mono mt-0.5">{selectedDossier.avgScorePercent}%</div>
                  <span className="text-[10px] text-indigo-600 font-semibold">{selectedDossier.rankInBatch}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Batch Ranking</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">{selectedDossier.rankInBatch.split('/')[0]}</div>
                  <span className="text-[10px] text-slate-500 font-semibold">In {selectedDossier.gradeBatch.split('•')[1] || 'Batch'}</span>
                </div>
              </div>

              {/* Digital Certificate Hash Box */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Cryptographic Signature Certificate
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    VALID SHA-256
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-emerald-100">
                  {selectedDossier.signatureHash}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div>Verified By: <strong>{selectedDossier.parentName}</strong></div>
                  <div>Device: <strong>{selectedDossier.guardianDevice}</strong></div>
                  <div className="col-span-2 text-slate-500">Timestamp: {selectedDossier.signedTimestamp}</div>
                </div>
              </div>

              {/* Remarks Box */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block text-[11px]">Guardian Feedback Remarks:</span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  "{selectedDossier.parentRemarks}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Advisor Sign-off: Dr. V. K. Bansal</span>
              <button
                onClick={() => setSelectedDossier(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
