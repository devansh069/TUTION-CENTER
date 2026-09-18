import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, ShieldCheck, Server, Search, Filter, 
  Globe, Lock, ShieldAlert, CheckCircle2, Ban, Eye, 
  RefreshCw, Terminal, Check, X, Sparkles
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { SECURITY_BREACH_LOGS } from './systemAuditData';

export default function SecurityBreachLogs({ instituteCode = 'ALL' }) {
  const [incidents, setIncidents] = useState(SECURITY_BREACH_LOGS);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [actionAlert, setActionAlert] = useState('');

  // Multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filtered = useMemo(() => {
    return incidents.filter(item => {
      const scope = isAllInstitutes || item.instituteCode === 'global' || item.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchSearch = 
        item.incidentType.toLowerCase().includes(search.toLowerCase()) || 
        item.threatSource.toLowerCase().includes(search.toLowerCase()) ||
        item.targetAccount.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'ALL' || item.incidentType.toLowerCase().includes(filterType.toLowerCase());
      return scope && matchSearch && matchType;
    });
  }, [incidents, instituteCode, isAllInstitutes, search, filterType]);

  const handleBanIp = (id, ipStr) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'Banned Globally' } : inc));
    setActionAlert(`Rogue IP from incident #${id} permanently blacklisted across all 5 campus firewalls and Cloudflare Edge.`);
    setTimeout(() => setActionAlert(''), 4000);
  };

  const handleDismiss = (id) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'Dismissed / False Positive' } : inc));
    setActionAlert(`Incident #${id} dismissed as benign false positive. Rule threshold recalibrated.`);
    setTimeout(() => setActionAlert(''), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold border border-rose-200 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Intrusion Detection System (IDS / WAF)
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Global Multi-Tenant Threat Radar' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Security Breach Logs & Anomaly Detection
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time telemetry on impossible travel events, credential stuffing, SQL injection attempts, and automated edge mitigations.
          </p>
        </div>
      </div>

      {/* Action Notice */}
      {actionAlert && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {actionAlert}
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">Mitigated</span>
        </div>
      )}

      {/* 4 Mini KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="emerald"
          title="Active Security Breaches"
          value="0 Incidents"
          subtitle="Zero Data Compromises"
          icon="🛡️"
          badge="A+ Secure"
        />
        <KPICard
          theme="amber"
          title="Blocked Brute-Force"
          value="14 Rogue IPs"
          subtitle="Automated Edge Scrubbing"
          icon="🚫"
          badge="WAF Active"
        />
        <KPICard
          theme="purple"
          title="Database Envelope"
          value="100% Encrypted"
          subtitle="Multi-Tenant Row Partitions"
          icon="🗄️"
          badge="AES-256 GCM"
        />
        <KPICard
          theme="blue"
          title="Scrubbing Bandwidth"
          value="40 Gbps Edge"
          subtitle="DDoS & Flood Protection"
          icon="⚡"
          badge="Low Latency"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search threat type, origin IP, country, or targeted account..."
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 font-medium"
          />
        </div>

        {/* Filter Type Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Threat Vector:</span>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="ALL">All Threat Vectors</option>
            <option value="Impossible Travel">Impossible Travel Velocity</option>
            <option value="Brute-force">Brute-Force Attack</option>
            <option value="SQL Injection">SQL Injection (WAF)</option>
            <option value="Concurrent">Concurrent Session</option>
            <option value="Exfiltration">Exfiltration Rate-Limit</option>
          </select>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Incident ID</th>
                <th className="py-3 px-4">Threat Classification</th>
                <th className="py-3 px-4">Origin Geolocation & IP</th>
                <th className="py-3 px-4">Target Account / Resource</th>
                <th className="py-3 px-4 text-center">Risk Score</th>
                <th className="py-3 px-4">Firewall Action</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono font-bold text-rose-600">
                    {item.id}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{item.incidentType}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.firewallRule}</div>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-slate-700">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      {item.threatSource}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <strong className="text-slate-800">{item.targetAccount}</strong>
                    <div className="text-[10px] text-slate-400">{item.targetCampus}</div>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-black ${
                      item.riskScore > 85 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {item.riskScore} / 100
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-700 font-semibold text-[11px]">
                    {item.wafAction}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedIncident(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Forensics
                      </button>
                      <button
                        onClick={() => handleBanIp(item.id, item.threatSource)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-xs"
                      >
                        <Ban className="w-3 h-3" />
                        Ban IP
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forensics Dossier Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-base">
                  🚨
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Incident Forensic Dossier: {selectedIncident.id}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedIncident.incidentType} • Risk Score: {selectedIncident.riskScore}%</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedIncident(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] block">Rogue Origin</span>
                  <strong className="text-slate-800">{selectedIncident.threatSource}</strong>
                  <div className="text-[10px] text-slate-400 mt-0.5">{selectedIncident.timestamp}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Target Victim</span>
                  <strong className="text-slate-800">{selectedIncident.targetAccount}</strong>
                  <div className="text-[10px] text-slate-500 mt-0.5">{selectedIncident.targetCampus}</div>
                </div>
              </div>

              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1">
                <span className="text-rose-900 font-bold block text-[11px]">Attack Vector & Signature:</span>
                <p className="text-slate-700 leading-relaxed text-[11px] font-mono">{selectedIncident.attackVector}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block text-[11px]">Enforced WAF Rule:</span>
                <div className="font-mono text-indigo-700 text-[11px] bg-white p-2 rounded-lg border border-slate-200">
                  {selectedIncident.firewallRule}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                  Result: {selectedIncident.wafAction}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <button
                onClick={() => {
                  handleDismiss(selectedIncident.id);
                  setSelectedIncident(null);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition"
              >
                Dismiss / False Positive
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleBanIp(selectedIncident.id, selectedIncident.threatSource);
                    setSelectedIncident(null);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition shadow-sm flex items-center gap-1"
                >
                  <Ban className="w-3 h-3" /> Ban IP Globally
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
