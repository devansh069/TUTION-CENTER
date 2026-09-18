import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  DollarSign,
  Download,
  Calendar,
  Filter,
  UserCheck,
  ShieldCheck,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { REPORTS_DATA } from './whatsappCrmData';

export default function WhatsAppReports({ instituteCode = 'all', activeTab = 'rep_conversion_roi' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_conversion_roi');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wide border border-emerald-200">
            Module 18 • Business Intelligence & ROI
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <BarChart3 className="w-6.5 h-6.5 mr-2 text-emerald-600" /> WhatsApp Conversion ROI & Latency Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full-funnel attribution from paid Meta click-to-WhatsApp campaigns to paid tuition fees and response SLA audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('WhatsApp Funnel & Latency Dossier exported.')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" /> Export CRM Audit PDF
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setCurrentTab('rep_conversion_roi')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              currentTab === 'rep_conversion_roi'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Conversion Funnel ROI
          </button>
          <button
            onClick={() => setCurrentTab('rep_channel_velocity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              currentTab === 'rep_channel_velocity'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" /> Response Latency Benchmarks
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Quarter-to-Date (Q3)</option>
            <option>Full Year 2026</option>
          </select>
        </div>
      </div>

      {/* Tab 1: Conversion Funnel ROI */}
      {currentTab === 'rep_conversion_roi' && (
        <div className="space-y-6">
          {/* Top 4 Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Total Inbound WhatsApp Leads</span>
              <p className="text-2xl font-black text-slate-900 mt-1">1,280 Leads</p>
              <span className="text-[11px] font-semibold text-emerald-600">840 from Meta • 310 Google • 130 QR</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Paid Enrolments Won</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">382 Students</p>
              <span className="text-[11px] font-semibold text-emerald-700">29.8% End-to-End Funnel Conversion</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Aggregate Tuition Revenue</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">INR 2.35 Cr</p>
              <span className="text-[11px] font-semibold text-indigo-500">From WhatsApp Inquiries Only</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Blended ROAS (Return On Ad Spend)</span>
              <p className="text-2xl font-black text-purple-600 mt-1">9.8x</p>
              <span className="text-[11px] font-semibold text-purple-600">Spend: INR 2.4L • Return: INR 2.35 Cr</span>
            </div>
          </div>

          {/* Visual Step-by-Step Funnel */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-900">
              Inquiry Progression & Stage Drop-off Forensic
            </h3>
            <p className="text-xs text-slate-500">
              Tracking lead qualification velocity from initial ad impression to trial demo and fee remittance.
            </p>

            <div className="space-y-3">
              {REPORTS_DATA.conversionRoi.funnelSummary.map((st, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{st.stage}</span>
                    <div className="flex items-center gap-3">
                      {idx > 0 && (
                        <span className="text-rose-600 font-bold text-[11px]">
                          -{st.dropPct} drop-off
                        </span>
                      )}
                      <span className="font-mono font-black text-slate-900 text-sm">
                        {st.count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${st.color}`}
                      style={{ width: `${Math.max(8, (st.count / 18450) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Channel ROI Table */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">Ad Campaign Attribution & ROI</h3>
                <p className="text-xs text-slate-500">Channel spend, cost per lead, and revenue generation</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3.5">Marketing Channel</th>
                    <th className="p-3.5">Ad Spend</th>
                    <th className="p-3.5">Leads Generated</th>
                    <th className="p-3.5">Cost Per Lead (CPL)</th>
                    <th className="p-3.5">Paid Enrolments</th>
                    <th className="p-3.5">Tuition Revenue</th>
                    <th className="p-3.5 text-right">ROAS Multiple</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REPORTS_DATA.conversionRoi.adChannelRoi.map((ch, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{ch.channel}</td>
                      <td className="p-3.5 font-mono text-slate-600">{ch.spend}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-800">{ch.leads}</td>
                      <td className="p-3.5 font-mono text-indigo-600 font-bold">{ch.cpl}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600">{ch.enrolments}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">{ch.revenueGenerated}</td>
                      <td className="p-3.5 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {ch.roas}
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

      {/* Tab 2: Response Latency Benchmarks */}
      {currentTab === 'rep_channel_velocity' && (
        <div className="space-y-6">
          {/* Top Latency Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">AI Bot Median First Response</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">1.2 sec</p>
              <span className="text-[11px] font-semibold text-emerald-700">Autonomous 24/7 Greeting & Brochure</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">Counselor Median Response</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">14.2 mins</p>
              <span className="text-[11px] font-semibold text-indigo-500">Human Consultation Handover</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">SLA Compliance Rate</span>
              <p className="text-2xl font-black text-slate-900 mt-1">98.4%</p>
              <span className="text-[11px] font-semibold text-emerald-600">Target: &lt; 15 mins human response</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-slate-400">After-Hours Query Coverage</span>
              <p className="text-2xl font-black text-purple-600 mt-1">100% Active</p>
              <span className="text-[11px] font-semibold text-purple-600">Zero unhandled night inquiries</span>
            </div>
          </div>

          {/* First Response Time Distribution */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-900">
              First Response Time (FRT) Frequency Spectrum
            </h3>
            <p className="text-xs text-slate-500">Breakdown of inquiry response velocities across all 1,280 contacts</p>

            <div className="space-y-3">
              {REPORTS_DATA.responseLatency.latencyDistribution.map((b, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{b.bucket}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {b.count} chats ({b.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counselor Response Leaderboard */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">Academic Counselor SLA Scorecard</h3>
                <p className="text-xs text-slate-500">Response speed, trial booking conversion, and parent satisfaction</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3.5">Academic Counselor</th>
                    <th className="p-3.5">Campus</th>
                    <th className="p-3.5">Active Inquiries</th>
                    <th className="p-3.5">Avg First Response</th>
                    <th className="p-3.5">Trial Demo Conversion</th>
                    <th className="p-3.5 text-right">Parent Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REPORTS_DATA.responseLatency.counselorScorecard.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                          {c.name.charAt(0)}
                        </div>
                        {c.name}
                      </td>
                      <td className="p-3.5 text-slate-600 font-semibold">{c.campus}</td>
                      <td className="p-3.5 font-mono text-slate-800 font-bold">{c.activeChats}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600">{c.avgFirstResponse}</td>
                      <td className="p-3.5 font-mono font-bold text-indigo-600">{c.demoConversion}</td>
                      <td className="p-3.5 text-right font-bold text-amber-600">{c.rating}</td>
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
