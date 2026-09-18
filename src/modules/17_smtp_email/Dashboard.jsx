import React from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Server,
  Zap,
  MessageSquare,
  FileText,
  Layers,
  ArrowUpRight,
  Clock,
  Radio,
  ExternalLink
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { CAMPAIGNS_DATA, RELAY_NODES_DATA } from './smtpEmailData';

export default function SmtpDashboard({ instituteCode = 'all', onNavigate }) {
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';
  const recentCampaigns = CAMPAIGNS_DATA.filter(
    c => isAll || c.instituteCode?.toLowerCase() === instituteCode?.toLowerCase()
  ).slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
            Module 17 • Enterprise Communications Hub
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Mail className="w-6.5 h-6.5 mr-2 text-indigo-600" /> SMTP & Multi-Channel Communications Gateway
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified mission control for high-deliverability AWS SES email blasts, TRAI-compliant DLT SMS alerts, and relay infrastructure telemetry.
          </p>
        </div>

        {/* Quick Nav Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate && onNavigate('17_smtp_email', 'email_campaigns')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" /> Dispatch Campaign
          </button>
          <button
            onClick={() => onNavigate && onNavigate('17_smtp_email', 'templates_library')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" /> Templates Library
          </button>
        </div>
      </div>

      {/* Top 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Total Dispatches Sent"
          value="111,060 Msg"
          subtext="48.9k Email • 62.1k SMS"
          icon={Send}
          color="blue"
        />
        <KPICard
          title="Deliverability Score"
          value="99.82%"
          subtext="Verified Inbox Placement"
          icon={CheckCircle2}
          color="green"
        />
        <KPICard
          title="Aggregate Open Rate"
          value="74.6%"
          subtext="Email Opens & SMS ACKs"
          icon={BarChart3}
          color="purple"
        />
        <KPICard
          title="DNS & Relay Health"
          value="100% Strict"
          subtext="SPF / DKIM / DMARC Pass"
          icon={ShieldCheck}
          color="amber"
        />
      </div>

      {/* Throughput & Volume Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Real-time Dispatch Volume Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">
                  Dual-Channel Transmission Velocity (Today)
                </h3>
                <p className="text-xs text-slate-500">Live outbound traffic split across Amazon SES & Telco DLT gateways</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Radio className="w-3 h-3 animate-pulse" /> Live Telemetry
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <Mail className="w-4 h-4 text-blue-600" /> Amazon SES Email Relay
                  </div>
                  <p className="text-2xl font-black text-blue-950 mt-1">48,920</p>
                  <span className="text-[11px] font-semibold text-blue-700">99.8% Inbox Placement</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-800">48.9% Quota</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '48.9%' }} />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <MessageSquare className="w-4 h-4 text-emerald-600" /> Gupshup DLT SMS Relay
                  </div>
                  <p className="text-2xl font-black text-emerald-950 mt-1">62,140</p>
                  <span className="text-[11px] font-semibold text-emerald-700">100% TRAI Compliant</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800">24.8% Quota</span>
                  <div className="w-16 h-2 bg-emerald-200 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '24.8%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs mt-3">
              <span className="text-slate-600 font-semibold">Active DNS Protections:</span>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-emerald-700 font-bold">✓ SPF PASS</span>
                <span className="text-emerald-700 font-bold">✓ DKIM 2048-bit PASS</span>
                <span className="text-emerald-700 font-bold">✓ DMARC p=reject</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need detailed packet analysis or bounce root causes?</span>
            <button
              onClick={() => onNavigate && onNavigate('17_smtp_email', 'reports', 'rep_deliverability')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Open Deliverability Reports <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Relay Node Quick Status */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-indigo-600" /> Relay Infrastructure
              </h3>
              <button
                onClick={() => onNavigate && onNavigate('17_smtp_email', 'smtp_relay')}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
              >
                Telemetry →
              </button>
            </div>

            <div className="space-y-3">
              {RELAY_NODES_DATA.map((n) => (
                <div key={n.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs truncate max-w-[170px]" title={n.name}>
                      {n.name}
                    </div>
                    <div className="font-mono text-[10px] text-slate-500">{n.protocol}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600 text-xs font-mono">{n.latencyMs} ms</span>
                    <span className="block text-[10px] text-slate-400 font-semibold">{n.reputationScore} Rep</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('17_smtp_email', 'send_logs')}
            className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            Inspect Send History & Header Logs
          </button>
        </div>
      </div>

      {/* Recent Dispatched Campaigns */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900">Recent Communication Campaigns</h3>
            <p className="text-xs text-slate-500">Live analytics on recent automated and batch communication dispatches</p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('17_smtp_email', 'email_campaigns')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            View All Campaigns <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3.5">Campaign ID</th>
                <th className="p-3.5">Campaign Title & Target</th>
                <th className="p-3.5">Channel</th>
                <th className="p-3.5">Recipients</th>
                <th className="p-3.5">Open Rate</th>
                <th className="p-3.5">Click Rate</th>
                <th className="p-3.5">Dispatched Date</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-indigo-600">{c.id}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{c.title}</div>
                    <div className="text-[11px] text-slate-500">{c.targetAudience}</div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.channel.includes('Email') && c.channel.includes('SMS')
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : c.channel === 'Email'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {c.channel}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-800">{c.totalRecipients.toLocaleString()}</td>
                  <td className="p-3.5 font-mono font-bold text-indigo-600">{c.openRate}</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-600">{c.clickRate}</td>
                  <td className="p-3.5 text-slate-600">{c.dispatchedDate}</td>
                  <td className="p-3.5 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : c.status === 'Active'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
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
  );
}
