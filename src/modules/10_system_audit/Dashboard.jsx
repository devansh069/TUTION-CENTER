import React, { useState, useMemo } from 'react';
import { 
  Shield, Server, CheckCircle2, AlertTriangle, Key, Lock, 
  ArrowRight, Sparkles, Terminal, Activity, Eye, Download, 
  ShieldCheck, Globe, Database, Hash, ChevronRight, FileText
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { SYSTEM_AUDIT_LOGS, SECURITY_BREACH_LOGS } from './systemAuditData';

export default function SystemAuditDashboard({ instituteCode = 'ALL', onNavigate }) {
  const [auditLogs] = useState(SYSTEM_AUDIT_LOGS);
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [inspectLog, setInspectLog] = useState(null);

  // Multi-tenant institute filter
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(l => {
      const matchCampus = isAllInstitutes || l.instituteCode === 'global' || l.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchSeverity = selectedSeverity === 'ALL' || l.severity === selectedSeverity;
      return matchCampus && matchSeverity;
    });
  }, [auditLogs, instituteCode, isAllInstitutes, selectedSeverity]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cockpit Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-bold text-xs rounded-full border border-indigo-400/30 flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                Zero Trust System Audit & Cryptographic Ledger
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SOC-2 Type II Invariance Active
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Enterprise Audit Trail & Breach Telemetry</span>
            </h1>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              Cryptographically hashed append-only logs for all administrative mutations, impossible travel velocity detection, and database tenant isolation.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate?.('audit_trail')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Hash className="w-4 h-4" />
              <span>Immutable Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('security_logs')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Breach Logs</span>
            </button>
            <button
              onClick={() => onNavigate?.('reports')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Drift & Geo Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Total Immutable Logs"
          value="148,920 Events"
          subtitle="100% Hash-Chained Blocks"
          icon="🛡️"
          badge="SOC-2 Ready"
        />
        <KPICard
          theme="emerald"
          title="Threat Defense Yield"
          value="100% Blocked"
          subtitle="Zero Data Breaches in 365d"
          icon="🔒"
          badge="Zero Trust"
        />
        <KPICard
          theme="purple"
          title="Multi-Tenant DB Shards"
          value="5 Isolated Shards"
          subtitle="AES-256 GCM Envelope"
          icon="🗄️"
          badge="Row-Level ACL"
        />
        <KPICard
          theme="amber"
          title="Active Privilege Grants"
          value="2 JIT Tokens"
          subtitle="Auto-Decaying in < 4 Hours"
          icon="⚡"
          badge="Strict TTL"
        />
      </div>

      {/* Split Visual Security Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Threat Stream & WAF Radar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-rose-600" />
                  Live Intrusion Defense & WAF Telemetry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automated threat mitigation across Cloudflare Edge & Campus Gateways
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                WAF Online (Active)
              </span>
            </div>

            <div className="space-y-3">
              {SECURITY_BREACH_LOGS.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">
                        {item.id}
                      </span>
                      <strong className="text-slate-800">{item.incidentType}</strong>
                      <span className="text-[10px] text-slate-400">({item.threatSource.split('(')[0]})</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{item.attackVector}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                      Action: {item.wafAction}
                    </span>
                  </div>
                  <span className="font-mono text-rose-600 font-black text-xs shrink-0">
                    Risk: {item.riskScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>40 Gbps Scrubbing Capacity • 0 Malicious Ingress</span>
            <button 
              onClick={() => onNavigate?.('security_logs')}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              Open Threat Center <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Cryptographic Hash Chain Architecture Stepper */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Hash className="w-4 h-4 text-indigo-600" />
                  Append-Only Ledger Hash Chain Architecture
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Blockchain-like Merkle tree validation preventing retroactive log tampering
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                SHA-256 Chained
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Stage 1: Mutation Interceptor Daemon</span>
                    <span className="font-mono text-emerald-600 font-semibold">&lt; 2ms Latency</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Intercepts administrative database write operations and fee discount adjustments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Stage 2: Cryptographic Payload Hashing</span>
                    <span className="font-mono text-emerald-600 font-semibold">SHA-256 Envelope</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Chained with previous block digest. Zero deletion or rollback capability.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Stage 3: Merkle Tree Anchor in Core DB</span>
                    <span className="font-mono text-emerald-600 font-semibold">Hourly Root Synced</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Root hashes published to encrypted multi-region S3 storage vaults.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Stage 4: Continuous Forensic Verification</span>
                    <span className="font-mono text-indigo-600 font-semibold">100% Unbroken</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Independent checksum scans verify integrity of all 148,920 stored records.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Last Verified Block: <strong className="font-mono text-slate-800">#BLK-9408</strong></span>
            <button 
              onClick={() => onNavigate?.('audit_trail')}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              View Full Chain <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Live System Audit Events Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              Recent High-Severity Administrative Mutations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live immutable stream of administrative privilege escalations, fee overrides, and scoring adjustments.
            </p>
          </div>

          {/* Severity Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs self-start sm:self-auto">
            {['ALL', 'Critical', 'High', 'Medium'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedSeverity(tab)}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  selectedSeverity === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All Severities' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Block ID</th>
                <th className="py-3 px-4">Actor & Role</th>
                <th className="py-3 px-4">Action Executed</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Client IP / Device</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-center">Severity</th>
                <th className="py-3 px-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-600">
                    {l.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{l.actor}</div>
                    <div className="text-[10px] text-slate-400">{l.role}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[11px] font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                      {l.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium max-w-xs truncate">
                    {l.targetResource}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {l.ip}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {l.timestamp}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      l.severity === 'Critical'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : l.severity === 'High'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {l.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setInspectLog(l)}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] transition inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Proof
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Modal */}
      {inspectLog && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {inspectLog.id}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">
                  Cryptographic Mutation Certificate
                </h3>
              </div>
              <button 
                onClick={() => setInspectLog(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[10px] block">Actor Name</span>
                  <span className="font-bold text-slate-800">{inspectLog.actor}</span>
                  <div className="text-[11px] text-slate-500">{inspectLog.role}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Timestamp</span>
                  <span className="font-bold text-slate-800">{inspectLog.timestamp}</span>
                  <div className="text-[11px] text-slate-500">{inspectLog.ip}</div>
                </div>
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1">
                <span className="text-indigo-900 font-bold block text-[11px]">Mutation Details:</span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{inspectLog.details}</p>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Block Hash Signature
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    VALID MERKLE LEAF
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-emerald-100 break-all">
                  {inspectLog.sha256Hash}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setInspectLog(null)}
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
