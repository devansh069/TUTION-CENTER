import React from 'react';
import {
  MessageSquare,
  CheckCircle2,
  Phone,
  Send,
  ArrowRight,
  UserPlus,
  Sparkles,
  Bot,
  Kanban,
  Zap,
  TrendingUp,
  Clock,
  ExternalLink,
  Flame,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { WHATSAPP_LEADS, BOT_WORKFLOWS } from './whatsappCrmData';

export default function WhatsAppCrmDashboard({ instituteCode = 'all', onNavigate }) {
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';
  const filteredLeads = WHATSAPP_LEADS.filter(
    w => isAll || w.instituteCode?.toLowerCase() === instituteCode?.toLowerCase()
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wide border border-emerald-200">
            Module 18 • WhatsApp Business Cloud Suite
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <MessageSquare className="w-6.5 h-6.5 mr-2 text-emerald-600" /> WhatsApp Lead Funnel & CRM
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Meta Cloud API chatbot automations, lead prospect funnels, fee payment push, and automated brochure dispatchers.
          </p>
        </div>

        {/* Quick Nav CTAs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate && onNavigate('18_whatsapp_crm', 'lead_pipeline')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <Kanban className="w-3.5 h-3.5" /> Open Kanban Pipeline
          </button>
          <button
            onClick={() => onNavigate && onNavigate('18_whatsapp_crm', 'bot_automations')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-600" /> Bot Automations
          </button>
        </div>
      </div>

      {/* Top 4 Real-time KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="WhatsApp Leads Captured"
          value="1,280 Inquiries"
          subtext="This Month Funnel"
          icon={MessageSquare}
          color="green"
        />
        <KPICard
          title="AI Bot Response Latency"
          value="1.2 sec Avg"
          subtext="Instant Prospect Reply"
          icon={Sparkles}
          color="purple"
        />
        <KPICard
          title="Demo Class Conversion"
          value="42.8%"
          subtext="Walk-in Bookings"
          icon={UserPlus}
          color="blue"
        />
        <KPICard
          title="WhatsApp API Health"
          value="100% Active"
          subtext="Meta Approved Tier-3"
          icon={CheckCircle2}
          color="amber"
        />
      </div>

      {/* Pipeline Stage Distribution & Bot Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pipeline Stages Velocity Card */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">
                  Live Lead Stage Velocity & Pipeline Funnel
                </h3>
                <p className="text-xs text-slate-500">Active distribution of prospective students across engagement stages</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Zap className="w-3 h-3 animate-pulse" /> 1,280 Active
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-2">
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <span className="text-[10px] font-bold uppercase text-blue-600 block">1. Inbound Leads</span>
                <span className="text-xl font-black text-blue-950">240</span>
                <span className="text-[10px] text-blue-700 block">Fresh Webhooks</span>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100">
                <span className="text-[10px] font-bold uppercase text-purple-600 block">2. AI Qualified</span>
                <span className="text-xl font-black text-purple-950">380</span>
                <span className="text-[10px] text-purple-700 block">Course Profiled</span>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
                <span className="text-[10px] font-bold uppercase text-amber-600 block">3. Demo Scheduled</span>
                <span className="text-xl font-black text-amber-950">280</span>
                <span className="text-[10px] text-amber-700 block">Trial Booked</span>
              </div>
              <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[10px] font-bold uppercase text-indigo-600 block">4. Quotation Sent</span>
                <span className="text-xl font-black text-indigo-950">190</span>
                <span className="text-[10px] text-indigo-700 block">Fee Due Link</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <span className="text-[10px] font-bold uppercase text-emerald-600 block">5. Enrolled Won</span>
                <span className="text-xl font-black text-emerald-950">140</span>
                <span className="text-[10px] text-emerald-700 block">Fee Receipt Paid</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">6. Drop-offs</span>
                <span className="text-xl font-black text-slate-800">50</span>
                <span className="text-[10px] text-slate-500 block">Nurture Queue</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need cost per lead & ROAS conversion analytics?</span>
            <button
              onClick={() => onNavigate && onNavigate('18_whatsapp_crm', 'reports', 'rep_conversion_roi')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              Conversion Funnel ROI <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Bot Active Automations Preview */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-emerald-600" /> Active AI Bots
              </h3>
              <button
                onClick={() => onNavigate && onNavigate('18_whatsapp_crm', 'bot_automations')}
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800"
              >
                All Bots →
              </button>
            </div>

            <div className="space-y-3">
              {BOT_WORKFLOWS.slice(0, 3).map((bot) => (
                <div key={bot.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs truncate max-w-[170px]" title={bot.name}>
                      {bot.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{bot.category} • {bot.responseDelay} SLA</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600 text-xs font-mono">{bot.successRate}</span>
                    <span className="block text-[10px] text-slate-400 font-semibold">{bot.totalExecutions.toLocaleString()} calls</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('18_whatsapp_crm', 'reports', 'rep_channel_velocity')}
            className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Response Latency & Counselor SLA
          </button>
        </div>
      </div>

      {/* Live Inbound Lead Stream */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900">Priority WhatsApp Leads & Conversations</h3>
            <p className="text-xs text-slate-500">High intent prospects awaiting counselor interaction or demo booking</p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('18_whatsapp_crm', 'lead_pipeline')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
          >
            Open Kanban Board <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {filteredLeads.map((w) => (
            <div key={w.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-200 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-slate-900 text-sm">{w.leadName}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        w.temperature === 'Hot'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {w.temperature === 'Hot' ? '🔥 Hot' : '⚡ Warm'}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-emerald-700 font-semibold mt-0.5">
                    {w.phone} • {w.course}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 uppercase tracking-tight">
                  {w.stage.replace('_', ' ')}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">
                  Last WhatsApp Message • {w.lastMessageTime}:
                </span>
                <p className="italic font-medium">"{w.lastMessage}"</p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 flex justify-between items-center">
                <span className="font-semibold text-[11px] truncate max-w-[200px]">
                  👤 Counselor: <strong>{w.counselor.split(' ')[0]} {w.counselor.split(' ')[1]}</strong>
                </span>
                <button
                  onClick={() => onNavigate && onNavigate('18_whatsapp_crm', 'lead_pipeline')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs flex items-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" /> Chat Live
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
