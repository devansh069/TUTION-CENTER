import React, { useState, useMemo } from 'react';
import { ShieldCheck, Search, Filter, Download, MapPin, Globe, Cpu, AlertTriangle, CheckCircle2, User, Clock } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { AUDIT_TRAIL_DATA } from '../../data/erpData';

export default function AuditTrailDashboard({ instituteCode = 'all' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filteredLogs = useMemo(() => {
    return AUDIT_TRAIL_DATA.filter(log => {
      const matchInst = isAll || log.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || 
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.action.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRisk = riskFilter === 'ALL' || log.riskLevel === riskFilter;
      return matchInst && matchSearch && matchRisk;
    });
  }, [instituteCode, isAll, searchTerm, riskFilter]);

  const totalLogs = filteredLogs.length;
  const securityAlertsCount = filteredLogs.filter(l => l.riskLevel === 'Security Alert').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-black uppercase tracking-wide border border-indigo-200">
            Security & System Compliance Telemetry
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <ShieldCheck className="w-6.5 h-6.5 mr-2 text-indigo-600" /> Activity Audit Trail & IP Telemetry Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable system activity ledger recording exact user actions, IP address, campus location, and device details.
          </p>
        </div>

        <button 
          onClick={() => showToast("Exported System Audit Trail Log (CSV).")}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-2xs flex items-center"
        >
          <Download className="w-4 h-4 mr-1.5" /> Export Logs (CSV)
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Total Activity Logs" 
          value={`${totalLogs} Logs Recorded`} 
          subtext="Immutable System Trail" 
          icon={ShieldCheck} 
          color="indigo" 
          badge="100% Tracked" 
        />
        <KPICard 
          title="Security Risk Alerts" 
          value={`${securityAlertsCount} Security Flags`} 
          subtext="Turnstile & Auth Anomalies" 
          icon={AlertTriangle} 
          color="rose" 
          badge="Real-time Guard" 
        />
        <KPICard 
          title="Active IP Subnets" 
          value="5 IP Ranges" 
          subtext="Kota, Mumbai & Delhi Nodes" 
          icon={Globe} 
          color="blue" 
          badge="Geofenced" 
        />
        <KPICard 
          title="Audit Compliance" 
          value="99.98% Healthy" 
          subtext="Zero Data Tampering" 
          icon={CheckCircle2} 
          color="green" 
          badge="SOC-2 Ready" 
        />
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search action, IP address, user name, or campus place..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-600 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" /> Risk Filter:
          </span>
          <button 
            onClick={() => setRiskFilter('ALL')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${riskFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            All Logs
          </button>
          <button 
            onClick={() => setRiskFilter('Normal')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${riskFilter === 'Normal' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}
          >
            Normal
          </button>
          <button 
            onClick={() => setRiskFilter('Sensitive Audit')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${riskFilter === 'Sensitive Audit' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}
          >
            Sensitive
          </button>
          <button 
            onClick={() => setRiskFilter('Security Alert')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${riskFilter === 'Security Alert' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}
          >
            Security Alerts
          </button>
        </div>
      </div>

      {/* AUDIT LOG TELEMETRY TABLE */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-indigo-600" /> User Activity & Geolocation IP Audit Telemetry Table
            </h3>
            <p className="text-xs text-slate-500">Includes exact timestamp, IP address, campus location/place, browser specs, and security risk level.</p>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User & Role</th>
                <th className="p-3">Action Executed</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Location / Place</th>
                <th className="p-3">Device / Browser</th>
                <th className="p-3 text-right">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-[11px] text-slate-500 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                    {log.timestamp}
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-slate-900 block">{log.userName}</span>
                    <span className="text-[10px] text-indigo-600 font-semibold">{log.userRole}</span>
                  </td>
                  <td className="p-3 font-bold text-slate-800">{log.action}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">{log.ipAddress}</td>
                  <td className="p-3">
                    <span className="flex items-center text-slate-700">
                      <MapPin className="w-3 h-3 mr-1 text-rose-500 shrink-0" />
                      {log.location}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">{log.deviceInfo}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      log.riskLevel === 'Security Alert' ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse' :
                      log.riskLevel === 'Sensitive Audit' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {log.riskLevel}
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
