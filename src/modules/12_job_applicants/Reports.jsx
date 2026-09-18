import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Download, TrendingUp, DollarSign, Users, Award, 
  CheckCircle2, Clock, ArrowRight, Sparkles, Filter, Building2, Layers
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { FUNNEL_VELOCITY_DATA, CHANNEL_ROI_DATA } from './jobApplicantsData';

export default function Reports({ instituteCode = 'ALL', activeTab = 'rep_pipeline' }) {
  // Sync tab with sidebar or allow local tab toggling
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_pipeline');

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Sub-category Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
              Talent Acquisition Intelligence
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Aggregated All Campuses' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Recruitment Analytics & Intelligence Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit hiring pipeline velocity, stage drop-offs, and channel acquisition ROI for faculty recruitment.
          </p>
        </div>

        {/* Sub-Category Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setCurrentTab('rep_pipeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_pipeline'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Hiring Funnel Velocity</span>
          </button>
          <button
            onClick={() => setCurrentTab('rep_channels')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_channels'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Recruitment Channel ROI</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 1: HIRING FUNNEL VELOCITY                                    */}
      {/* ========================================================================= */}
      {currentTab === 'rep_pipeline' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Top 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="indigo"
              title="Candidates Sourced"
              value="203 Total"
              subtitle="Current hiring season"
              icon="👥"
              badge="Top of Funnel"
            />
            <KPICard
              theme="emerald"
              title="Avg Time-to-Hire"
              value="13.8 Days"
              subtitle="Industry benchmark: 30 Days"
              icon="⚡"
              badge="54% Faster"
            />
            <KPICard
              theme="amber"
              title="Demo Pass Rate"
              value="55.2% Qualified"
              subtitle="32 demos → 19 director rounds"
              icon="📹"
              badge="Strict Standard"
            />
            <KPICard
              theme="purple"
              title="Offer-to-Join Yield"
              value="94.7% Joined"
              subtitle="18 joined of 19 extended"
              icon="🤝"
              badge="Exceptional Fit"
            />
          </div>

          {/* Funnel Stage Progression & Bottleneck Diagnosis */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Stage-by-Stage Velocity & Drop-off Breakdown</h3>
                <p className="text-xs text-slate-500">Tracking candidates volume and average turnaround days per milestone</p>
              </div>
              <button
                onClick={() => alert("Hiring Funnel CSV exported.")}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center gap-1.5 w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Funnel CSV</span>
              </button>
            </div>

            <div className="space-y-4">
              {FUNNEL_VELOCITY_DATA.stages.map((stage, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-mono font-bold">
                        0{idx + 1}
                      </span>
                      <span>{stage.name}</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="text-slate-500">
                        Avg Time in Stage: <strong className="text-slate-800 font-mono">{stage.avgDaysInStage} Days</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                        Drop-off: {stage.dropOffPct}
                      </span>
                      <span className="font-mono font-bold text-indigo-700 text-xs">
                        {stage.count} Active
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${Math.round((stage.count / 203) * 100)}%` }} 
                      className={`h-full ${stage.color} rounded-full transition-all duration-300`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Campus Hiring Velocity Comparison Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Campus-to-Campus Hiring Velocity Benchmarking</h3>
            <p className="text-xs text-slate-500">Comparative time-to-hire turnaround metrics across all network campuses</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Campus Name</th>
                    <th className="py-3 px-4">Avg Time-to-Hire</th>
                    <th className="py-3 px-4">Target Benchmark</th>
                    <th className="py-3 px-4">Offers Accepted</th>
                    <th className="py-3 px-4 text-right">Performance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {FUNNEL_VELOCITY_DATA.campusVelocityComparison.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">{c.campus}</td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600">{c.avgDaysToHire}</td>
                      <td className="py-3 px-4 text-slate-500">{c.target}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{c.offersAccepted} Educators</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Fast Track'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : c.status === 'Optimal'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
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
      {/* SUB-CATEGORY 2: RECRUITMENT CHANNEL ROI                                    */}
      {/* ========================================================================= */}
      {currentTab === 'rep_channels' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Top 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="emerald"
              title="Top ROI Channel"
              value="Faculty Referrals"
              subtitle="15.8% Conversion • 96.4% Retention"
              icon="⭐"
              badge="Highest Yield"
            />
            <KPICard
              theme="indigo"
              title="Top Volume Channel"
              value="LinkedIn Talent"
              subtitle="72 Applicants • 4 Hires"
              icon="💼"
              badge="Global Reach"
            />
            <KPICard
              theme="amber"
              title="Lowest Cost per Hire"
              value="$60 / Hire"
              subtitle="Direct Institute Website Portal"
              icon="💰"
              badge="Organic Inbound"
            />
            <KPICard
              theme="purple"
              title="Executive Headhunters"
              value="4.92 / 5.0"
              subtitle="Senior HOD Quality Rating"
              icon="🏆"
              badge="Elite Talent"
            />
          </div>

          {/* Sourcing Channel Performance Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Channel Efficiency & Quality of Hire Matrix</h3>
                <p className="text-xs text-slate-500">Comparing acquisition cost, demo qualification rate, and 1-year faculty retention</p>
              </div>
              <button
                onClick={() => alert("Channel ROI intelligence exported.")}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center gap-1.5 w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export ROI Data</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Sourcing Channel</th>
                    <th className="py-3 px-4">Applicants Received</th>
                    <th className="py-3 px-4">Screened → Demo</th>
                    <th className="py-3 px-4">Hires Joined</th>
                    <th className="py-3 px-4">Conversion %</th>
                    <th className="py-3 px-4">Cost / Hire</th>
                    <th className="py-3 px-4">1-Yr Retention</th>
                    <th className="py-3 px-4 text-right">Strategic Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CHANNEL_ROI_DATA.map((ch, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{ch.channel}</div>
                        <div className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                          ★ {ch.qualityRating} Pedagogy Rating
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">
                        {ch.applicants} Candidates
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {ch.screened} → <strong className="text-indigo-600">{ch.demoGiven} Demos</strong>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">
                        {ch.offersAccepted} Educators
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {ch.conversionRate}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                        {ch.costPerHire}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        {ch.retentionRate1Yr}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {ch.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Insight Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Strategic Talent Acquisition Recommendation:
              </span>
              <p className="text-xs text-slate-600 max-w-3xl">
                Faculty referrals yield a <strong>96.4% 1-year retention rate</strong> with an acquisition cost 80% lower than agency search.
                Recommend increasing the internal referral bonus to $1,000 for IIT-JEE Advanced Physics and NEET Botany leads.
              </p>
            </div>
            <button
              onClick={() => alert("Referral incentive campaign policy drafted.")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm shrink-0"
            >
              Update Referral Policy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
