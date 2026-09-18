import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Download, TrendingUp, Star, ThumbsUp, 
  CheckCircle2, Clock, ShieldCheck, Sparkles, Building2, MessageSquare
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { SLA_PERFORMANCE_DATA, CSAT_ANALYTICS_DATA } from './helpSupportData';

export default function Reports({ instituteCode = 'ALL', activeTab = 'rep_sla' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_sla');

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Sub-Category Tab Toggles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
              Customer Success Telemetry
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Aggregated All Centers' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Helpdesk Intelligence & Service Quality Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit campus turnaround times, SLA compliance breaches, and parent/student customer satisfaction (CSAT) ratings.
          </p>
        </div>

        {/* Sub-Category Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setCurrentTab('rep_sla')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_sla'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>SLA Performance</span>
          </button>
          <button
            onClick={() => setCurrentTab('rep_csat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_csat'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>CSAT Analytics</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 1: SLA PERFORMANCE                                           */}
      {/* ========================================================================= */}
      {currentTab === 'rep_sla' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* 4 Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="emerald"
              title="SLA Compliance Rate"
              value={SLA_PERFORMANCE_DATA.overallCompliance}
              subtitle="Target: 98.0% Benchmark"
              icon="🛡️"
              badge="High Compliance"
            />
            <KPICard
              theme="indigo"
              title="Mean Time to Resolve"
              value={SLA_PERFORMANCE_DATA.averageMTTR}
              subtitle="Max Target: 4.0 Hours"
              icon="⏱️"
              badge="66% Faster"
            />
            <KPICard
              theme="amber"
              title="First-Contact Resolution"
              value={SLA_PERFORMANCE_DATA.firstContactResolution}
              subtitle="Resolved without escalation"
              icon="⚡"
              badge="Strong FCR"
            />
            <KPICard
              theme="purple"
              title="Term Tickets Resolved"
              value={`${SLA_PERFORMANCE_DATA.totalTicketsResolvedThisTerm} Closed`}
              subtitle="Across All Campuses"
              icon="✅"
              badge="Quarter Total"
            />
          </div>

          {/* Peak Hours Inflow Pattern Visual */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Hourly Ticket Inflow Distribution (Peak Hours Analysis)
                </h3>
                <p className="text-xs text-slate-500">Incoming issue volume over typical campus operating hours</p>
              </div>
              <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Peak Window: 08:00 AM – 10:00 AM
              </span>
            </div>

            {/* Inflow Bar Graph */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100">
              {SLA_PERFORMANCE_DATA.hourlyInflowPattern.map((item, idx) => {
                const maxVol = 35;
                const heightPct = Math.round((item.volume / maxVol) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <span className="text-xs font-bold text-slate-700 mb-1 group-hover:text-blue-600 transition">
                      {item.volume}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-300 ${
                        item.peak 
                          ? 'bg-blue-600 group-hover:bg-blue-700 shadow-md shadow-blue-500/20' 
                          : 'bg-blue-100 group-hover:bg-blue-200'
                      }`}
                    />
                    <span className="text-[11px] mt-2 font-bold text-slate-500">
                      {item.hour}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-500 pt-1">
              Morning volume spike coincides with student turnstile check-ins and morning live online class logins. Helpdesk staffing is doubled between 08:00 AM – 10:00 AM.
            </p>
          </div>

          {/* Campus SLA Benchmark Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Campus-Wise SLA Compliance Benchmarks</h3>
                <p className="text-xs text-slate-500">Comparing resolution turnaround across each branch institute</p>
              </div>
              <button
                onClick={() => alert("SLA Performance CSV exported.")}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center gap-1.5 w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export SLA Data</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Campus Name</th>
                    <th className="py-3 px-4">SLA Compliance Rate</th>
                    <th className="py-3 px-4">Avg Turnaround Time</th>
                    <th className="py-3 px-4">Open Tickets Queue</th>
                    <th className="py-3 px-4 text-right">Operational Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SLA_PERFORMANCE_DATA.campusBreakdown.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">{c.campus}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">{c.compliance}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{c.avgResolution}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{c.activeTickets} Tickets</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Exemplary'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
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

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 2: CSAT ANALYTICS                                            */}
      {/* ========================================================================= */}
      {currentTab === 'rep_csat' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* 4 Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="amber"
              title="Overall CSAT Rating"
              value={`${CSAT_ANALYTICS_DATA.overallCSAT} / 5.0`}
              subtitle="From Parent & Student Reviews"
              icon="⭐"
              badge="Top 5% League"
            />
            <KPICard
              theme="emerald"
              title="Net Promoter Score"
              value={CSAT_ANALYTICS_DATA.npsScore}
              subtitle="Advocacy & Word of Mouth"
              icon="🏆"
              badge="World Class"
            />
            <KPICard
              theme="indigo"
              title="Delighted Parents"
              value={CSAT_ANALYTICS_DATA.sentimentBreakdown.delighted}
              subtitle="5-Star Verified Experience"
              icon="❤️"
              badge="High Loyalty"
            />
            <KPICard
              theme="rose"
              title="Disputed Issues"
              value={CSAT_ANALYTICS_DATA.sentimentBreakdown.unhappy}
              subtitle="Escalated & Handled by Director"
              icon="⚠️"
              badge="Under 1% Target"
            />
          </div>

          {/* Sentiment Bar Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Parent & Student Sentiment Distribution</h3>
            <p className="text-xs text-slate-500">Post-resolution ratings collected via mobile app push prompts</p>

            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: '89.2%' }} className="bg-emerald-500 h-full" title="Delighted 89.2%" />
              <div style={{ width: '8.4%' }} className="bg-blue-400 h-full" title="Satisfied 8.4%" />
              <div style={{ width: '1.8%' }} className="bg-amber-400 h-full" title="Neutral 1.8%" />
              <div style={{ width: '0.6%' }} className="bg-rose-500 h-full" title="Dissatisfied 0.6%" />
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs pt-1 font-semibold">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Delighted (89.2%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-700">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span>Satisfied (8.4%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Neutral (1.8%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Unhappy (0.6%)</span>
              </div>
            </div>
          </div>

          {/* Department CSAT Performance Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Service Desk CSAT Ratings by Department</h3>
            <p className="text-xs text-slate-500">Tracking satisfaction scores across support specializations</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Department Helpdesk</th>
                    <th className="py-3 px-4">CSAT Rating</th>
                    <th className="py-3 px-4">Resolved Query Volume</th>
                    <th className="py-3 px-4 text-right">Excellence Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CSAT_ANALYTICS_DATA.departmentRatings.map((dep, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">{dep.department}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-amber-500 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {dep.csat.toFixed(2)} / 5.0
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">
                        {dep.resolvedVolume} Tickets
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {dep.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verified Parent Reviews Highlights */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Verified Parent Support Feedback Highlights
              </h3>
              <button
                onClick={() => alert("CSAT feedback quotes exported.")}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Reviews</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CSAT_ANALYTICS_DATA.parentFeedbackHighlights.map((fb, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{fb.parent}</span>
                      <span className="text-[10px] text-slate-400">{fb.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      "{fb.comment}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-[10px] text-emerald-600 font-bold">
                    ✓ Verified Mobile App Resolution
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
