import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  Mail,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Trash2,
  Ban
} from 'lucide-react';
import { REPORTS_DATA } from './smtpEmailData';

export default function SmtpReports({ instituteCode = 'all', activeTab = 'rep_deliverability' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_deliverability');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [quarantine, setQuarantine] = useState(REPORTS_DATA.bounceAudit.quarantineList);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePurge = (address) => {
    setQuarantine(prev => prev.filter(item => item.address !== address));
    showToast(`Recipient "${address}" permanently scrubbed from all institute marketing and transaction rosters.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
            Module 17 • Intelligence & Quality Analytics
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <BarChart3 className="w-6.5 h-6.5 mr-2 text-indigo-600" /> Deliverability & Reputation Audits
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            ISP feedback loops, carrier bounce forensics, engagement telemetry, and anti-spam compliance scoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Deliverability Dossier exported in PDF format.')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" /> Export Compliance PDF
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setCurrentTab('rep_deliverability')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              currentTab === 'rep_deliverability'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Deliverability & Open Rates
          </button>
          <button
            onClick={() => setCurrentTab('rep_bounce_audit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              currentTab === 'rep_bounce_audit'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" /> Spam & Hard Bounce Audit
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Quarter-to-Date (Q3)</option>
            <option>Full Academic Year 2026</option>
          </select>
        </div>
      </div>

      {/* Tab 1: Deliverability & Open Rates */}
      {currentTab === 'rep_deliverability' && (
        <div className="space-y-6">
          {/* Top Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Total Transmissions Dispatched</span>
              <p className="text-2xl font-black text-slate-900 mt-1">111,060</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-slate-500">
                <span>📧 48,920 Email</span>
                <span>•</span>
                <span>💬 62,140 SMS</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">ISP Delivery Success</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">99.82%</p>
              <span className="text-[11px] font-semibold text-emerald-600">Top Tier Google & Microsoft Inbox Placed</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Mean Email Open Rate</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">68.4%</p>
              <span className="text-[11px] font-semibold text-indigo-500">Benchmark: +26% over EdTech average</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Peak Engagement Window</span>
              <p className="text-lg font-black text-slate-900 mt-1.5">07:30 - 08:45 PM</p>
              <span className="text-[11px] font-semibold text-slate-500">Evening Parent Review Hours</span>
            </div>
          </div>

          {/* Monthly Trend Visualizer */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-heading text-sm font-bold text-slate-900 mb-1">
              6-Month Rolling Deliverability Volume & Inbox Rate
            </h3>
            <p className="text-xs text-slate-500 mb-5">Continuous tracking across Amazon SES and Indian Telco DLT gateways</p>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {REPORTS_DATA.deliverability.monthlyTrend.map((m) => (
                <div
                  key={m.month}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
                    m.current
                      ? 'bg-indigo-50/50 border-indigo-200 ring-2 ring-indigo-500/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs text-slate-800">{m.month}</span>
                    <span className="font-mono text-[10px] font-extrabold text-emerald-600">{m.rate}</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-slate-900 text-sm">{m.delivered.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">of {m.emails.toLocaleString()} sent</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Responsiveness Breakdown */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">Campus Engagement & Read Rates</h3>
                <p className="text-xs text-slate-500">How parents and students interact with notices per institute</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3.5">Campus / Institute</th>
                    <th className="p-3.5">Dispatches (30D)</th>
                    <th className="p-3.5">Open Rate</th>
                    <th className="p-3.5">Click-Through Rate</th>
                    <th className="p-3.5 text-right">Engagement Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REPORTS_DATA.deliverability.campusResponsiveness.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{c.campus}</td>
                      <td className="p-3.5 font-mono text-slate-600">{c.sent.toLocaleString()}</td>
                      <td className="p-3.5 font-mono font-bold text-indigo-600">{c.openRate}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600">{c.clickRate}</td>
                      <td className="p-3.5 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
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

      {/* Tab 2: Spam & Hard Bounce Audit */}
      {currentTab === 'rep_bounce_audit' && (
        <div className="space-y-6">
          {/* Top Bounce Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Total Bounces Caught</span>
              <p className="text-2xl font-black text-rose-600 mt-1">18 Instances</p>
              <span className="text-[11px] font-semibold text-slate-500">Overall Rate: 0.036%</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Spam Complaint Rate</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">0.008%</p>
              <span className="text-[11px] font-semibold text-emerald-600">Threshold limit: &lt; 0.10% (Optimal)</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Sender IP Reputation</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">99 / 100</p>
              <span className="text-[11px] font-semibold text-indigo-500">Talos & ReturnPath Whitelisted</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Quarantined Records</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{quarantine.length} Active</p>
              <span className="text-[11px] font-semibold text-slate-500">Isolated from future blasts</span>
            </div>
          </div>

          {/* Bounce Categorization Breakdown */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-900">
              Bounce Classification & Root-Cause Analysis
            </h3>
            <p className="text-xs text-slate-500">Forensic categorization of rejected mail and SMS dispatches</p>

            <div className="space-y-3">
              {REPORTS_DATA.bounceAudit.categories.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{cat.reason}</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {cat.count} events ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quarantined Recipient Ledger */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">Quarantined Recipient Blacklist</h3>
                <p className="text-xs text-slate-500">
                  Addresses automatically barred from mail campaigns to safeguard sender domain reputation.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3.5">Address / Phone</th>
                    <th className="p-3.5">Channel</th>
                    <th className="p-3.5">Origin Campus</th>
                    <th className="p-3.5">Bounce Reason</th>
                    <th className="p-3.5">Quarantine Date</th>
                    <th className="p-3.5">System Action</th>
                    <th className="p-3.5 text-right">Purge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quarantine.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-slate-400">
                        Quarantine list is empty. All recipient records are clean.
                      </td>
                    </tr>
                  ) : (
                    quarantine.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{item.address}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.type === 'Email' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-700 font-semibold">{item.campus}</td>
                        <td className="p-3.5 font-semibold text-rose-600">{item.bounceType}</td>
                        <td className="p-3.5 font-mono text-slate-500">{item.date}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700 text-[10px]">
                            {item.action}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handlePurge(item.address)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Purge Recipient"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
