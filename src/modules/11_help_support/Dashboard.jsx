import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, Clock, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowRight, Sparkles, Filter, Search, MessageSquare, Phone, User, Check
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { MOCK_TICKETS, CATEGORY_DISTRIBUTION_DATA } from './helpSupportData';

export default function Dashboard({ instituteCode = 'ALL', onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter tickets by multi-tenant campus and filters
  const filteredTickets = useMemo(() => {
    return MOCK_TICKETS.filter(t => {
      const matchCampus = isAllInstitutes || t.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
      const matchSearch = !searchTerm ||
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.parentName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCampus && matchCategory && matchSearch;
    });
  }, [instituteCode, isAllInstitutes, categoryFilter, searchTerm]);

  // Compute metrics
  const openCount = filteredTickets.filter(t => t.status !== 'Resolved').length;
  const criticalCount = filteredTickets.filter(t => t.priority === 'Critical' && t.status !== 'Resolved').length;
  const resolvedCount = filteredTickets.filter(t => t.status === 'Resolved').length;
  const atRiskCount = filteredTickets.filter(t => t.escalationLevel.includes('At Risk') || t.escalationLevel.includes('Critical')).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cockpit Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 font-bold text-xs rounded-full border border-blue-400/30 flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                Customer Success & Student Care Command
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Helpdesk Live • 4h SLA Target Active
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Help & Support Center Operations Hub</span>
            </h1>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              Real-time triage of student academic queries, parent fee invoice disputes, biometric turnstile hardware issues, and mobile app streaming support across campuses.
            </p>
          </div>

          {/* Direct CTA Navigation */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate?.('tickets_inbox')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Live Ticket Inbox ({openCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('sla_escalations')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>SLA Escalations Desk ({atRiskCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pastel Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Active Support Queue"
          value={`${openCount} Open Tickets`}
          subtitle={`${criticalCount} Critical • ${filteredTickets.length} Total Today`}
          icon="🎧"
          badge="Queue Monitored"
        />
        <KPICard
          theme="emerald"
          title="Mean Resolution Time (MTTR)"
          value="1.35 Hours"
          subtitle="Strict 4.0h SLA Target"
          icon="⏱️"
          badge="SLA Met 97.6%"
        />
        <KPICard
          theme="amber"
          title="First-Contact Resolution"
          value="86.4% FCR"
          subtitle="Resolved without escalation"
          icon="⚡"
          badge="High Efficiency"
        />
        <KPICard
          theme="rose"
          title="SLA Risk Escalations"
          value={`${atRiskCount} Action Req.`}
          subtitle="Under 60 minutes SLA remaining"
          icon="⚠️"
          badge="Urgent Triage"
        />
      </div>

      {/* Mid-Grid: Category Volume Breakdown + Quick Triage Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket Volume by Category */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                Ticket Volume by Category
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Distribution of parent, student, and hardware helpdesk requests</p>
            </div>
          </div>

          <div className="py-3 space-y-3.5">
            {CATEGORY_DISTRIBUTION_DATA.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    {cat.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-normal text-[11px]">Avg {cat.avgResolutionHours}</span>
                    <span className="font-bold text-slate-900 font-mono">{cat.count} Tickets ({cat.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${cat.percentage * 2.5}%` }} 
                    className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Primary Driver: <strong className="text-emerald-700 font-bold">Billing & GST Fee Invoicing (34%)</strong></span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200">
              Automated Receipts Active
            </span>
          </div>
        </div>

        {/* SLA Health & Fast Escalation Desk Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                SLA Compliance & Escalation Pipeline
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Automated director escalation tiers</p>
            </div>
            <button
              onClick={() => onNavigate?.('sla_escalations')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Escalations Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Tier Stages */}
          <div className="space-y-3 py-2 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
              <div className="flex-1">
                <div className="font-bold text-emerald-900">Tier 1: Frontline Agent Triage (0 – 2 Hours)</div>
                <div className="text-[11px] text-emerald-700">Campus front desk or accountant handles within standard window. 86.4% resolved here.</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0"></span>
              <div className="flex-1">
                <div className="font-bold text-amber-900">Tier 2: HOD / Branch Manager Alert (2 – 3.5 Hours)</div>
                <div className="text-[11px] text-amber-700">Triggered when 75% of SLA expires. Immediate push notification sent to center director.</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0"></span>
              <div className="flex-1">
                <div className="font-bold text-rose-900">Tier 3: Executive Super Admin Escalation (&gt;4 Hours)</div>
                <div className="text-[11px] text-rose-700">Direct breach intervention. Manual director override and student apology waiver issued.</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate?.('tickets_inbox')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Inspect All Active Support Tickets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Master Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Current Priority Tickets & Incident Queue</h3>
            <p className="text-xs text-slate-500">Active tickets requiring helpdesk attention across departments and campuses</p>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <input
                type="text"
                placeholder="Search ticket #, title, student..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Billing & Accounts">Billing & Accounts</option>
              <option value="Biometric Hardware">Biometric Hardware</option>
              <option value="Mobile App & WebRTC">Mobile App & WebRTC</option>
              <option value="Academic & Faculty">Academic & Faculty</option>
              <option value="PTM & Counseling">PTM & Counseling</option>
              <option value="Books & Inventory">Books & Inventory</option>
            </select>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Ticket # & Time</th>
                <th className="py-3 px-4">Issue Title & Description</th>
                <th className="py-3 px-4">Student & Requester</th>
                <th className="py-3 px-4">Campus</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority & SLA Left</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-blue-600">{t.ticketNo}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{t.createdTime}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-bold text-slate-900 truncate">{t.title}</div>
                    <div className="text-[11px] text-slate-500 truncate">{t.description}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{t.studentName}</div>
                    <div className="text-[11px] text-slate-500">{t.parentName} ({t.studentRoll})</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">
                      {t.instituteName}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-700 font-semibold text-[11px]">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.priority === 'Critical'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : t.priority === 'High'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {t.priority}
                      </span>
                      <span className="font-mono text-[11px] text-slate-600 font-semibold">
                        ⏱️ {t.slaTimeLeft}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate?.('tickets_inbox')}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      Open Ticket →
                    </button>
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
