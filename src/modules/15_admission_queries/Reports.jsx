import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Download, TrendingUp, DollarSign, Users, Award, 
  CheckCircle2, Clock, ArrowRight, Sparkles, Building2, Layers, Filter
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { LEAD_INFLOW_TRENDS_DATA, CHANNEL_METRICS_DATA } from './admissionQueriesData';

export default function AdmissionQueriesReports({ instituteCode = 'ALL', activeTab = 'rep_inflow' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_inflow');

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
              Admissions CRM Telemetry
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Aggregated All Centers' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Admissions Intelligence & Conversion Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit student inquiry trajectories, channel acquisition costs, and enrollment closing rates across campuses.
          </p>
        </div>

        {/* Sub-Category Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setCurrentTab('rep_inflow')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_inflow'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Lead Inflow Trends</span>
          </button>
          <button
            onClick={() => setCurrentTab('rep_source')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'rep_source'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Conversion by Channel</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-CATEGORY 1: LEAD INFLOW TRENDS                                        */}
      {/* ========================================================================= */}
      {currentTab === 'rep_inflow' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* 4 Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="indigo"
              title="Total Inflow Volume"
              value="1,482 Leads"
              subtitle="6-Month Academic Trajectory"
              icon="📥"
              badge="+28% YoY"
            />
            <KPICard
              theme="emerald"
              title="Peak Registration Inflow"
              value="June (1,482 Leads)"
              subtitle="Board Exam Results Spike"
              icon="📈"
              badge="Seasonal Peak"
            />
            <KPICard
              theme="amber"
              title="Average Days to Close"
              value="4.2 Days"
              subtitle="First Call to Token Advance"
              icon="⚡"
              badge="High Velocity"
            />
            <KPICard
              theme="purple"
              title="Gross Token Value"
              value="₹2.45 Cr Booked"
              subtitle="318 Confirmed Enrollments"
              icon="💰"
              badge="Beat Target"
            />
          </div>

          {/* Monthly Trajectory Graph */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Monthly Inflow vs. Walk-ins vs. Enrollments</h3>
                <p className="text-xs text-slate-500">Tracking conversion efficiency from April to September 2026</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-indigo-600">
                  <span className="w-3 h-3 rounded bg-indigo-600" /> Leads Inbound
                </span>
                <span className="flex items-center gap-1.5 text-blue-500">
                  <span className="w-3 h-3 rounded bg-blue-400" /> Walk-ins Show
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="w-3 h-3 rounded bg-emerald-500" /> Enrolled
                </span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-52 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-slate-100">
              {LEAD_INFLOW_TRENDS_DATA.monthlyTrajectory.map((item, idx) => {
                const maxVal = 1500;
                const leadH = Math.round((item.leads / maxVal) * 100);
                const walkH = Math.round((item.walkins / maxVal) * 100);
                const enrollH = Math.round((item.enrollments / maxVal) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="flex items-end gap-1 w-full justify-center">
                      <div style={{ height: `${leadH}%` }} className="w-3 md:w-5 bg-indigo-600 rounded-t-md" title={`Leads: ${item.leads}`} />
                      <div style={{ height: `${walkH}%` }} className="w-3 md:w-5 bg-blue-400 rounded-t-md" title={`Walk-ins: ${item.walkins}`} />
                      <div style={{ height: `${enrollH}%` }} className="w-3 md:w-5 bg-emerald-500 rounded-t-md" title={`Enrolled: ${item.enrollments}`} />
                    </div>
                    <span className={`text-xs mt-3 font-bold ${item.peak ? 'text-indigo-700' : 'text-slate-500'}`}>
                      {item.month} {item.peak && '★'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Campus Demand Comparison Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Campus-to-Campus Admissions Demand Benchmarking</h3>
                <p className="text-xs text-slate-500">Comparing inquiry inflow, physical walk-in rates, and booked revenue across centers</p>
              </div>
              <button
                onClick={() => alert("Inflow Trends CSV exported.")}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center gap-1.5 w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Trends CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Campus Center</th>
                    <th className="py-3 px-4">Total Inquiries</th>
                    <th className="py-3 px-4">Walk-in Show Rate</th>
                    <th className="py-3 px-4">Enrolled Seats</th>
                    <th className="py-3 px-4">Revenue Booked</th>
                    <th className="py-3 px-4 text-right">Performance Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LEAD_INFLOW_TRENDS_DATA.campusDemandComparison.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">{c.campus}</td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600">{c.totalInquiries} Leads</td>
                      <td className="py-3 px-4 font-semibold text-slate-700">{c.walkinRate}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">{c.enrolled} Students</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{c.revenue}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
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
      {/* SUB-CATEGORY 2: CONVERSION BY CHANNEL                                     */}
      {/* ========================================================================= */}
      {currentTab === 'rep_source' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* 4 Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              theme="emerald"
              title="Top Conversion Channel"
              value="Parent Word-of-Mouth"
              subtitle="38.4% Conversion Rate"
              icon="⭐"
              badge="Highest Yield"
            />
            <KPICard
              theme="indigo"
              title="Top Volume Generator"
              value="School Outreach & Seminars"
              subtitle="480 Leads • 98 Admissions"
              icon="🏫"
              badge="Mass Outreach"
            />
            <KPICard
              theme="amber"
              title="Lowest Cost per Admission"
              value="₹365 / Student"
              subtitle="Via Parent Community Referrals"
              icon="💰"
              badge="Maximum ROI"
            />
            <KPICard
              theme="purple"
              title="Total Revenue Sourced"
              value="₹2.71 Crores"
              subtitle="Across All Acquisition Channels"
              icon="🏆"
              badge="All Channels"
            />
          </div>

          {/* Sourcing Channel Performance Matrix Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Channel Acquisition Matrix & ROI Analysis</h3>
                <p className="text-xs text-slate-500">Comprehensive breakdown of CPL, CPA, and total student fees realized</p>
              </div>
              <button
                onClick={() => alert("Channel Conversion Data exported.")}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center gap-1.5 w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Channel Data</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Sourcing Channel</th>
                    <th className="py-3 px-4">Inquiries Received</th>
                    <th className="py-3 px-4">Walk-in Showups</th>
                    <th className="py-3 px-4">Enrolled Seats</th>
                    <th className="py-3 px-4">Conversion Rate</th>
                    <th className="py-3 px-4">Cost / Admission</th>
                    <th className="py-3 px-4">Booked Revenue</th>
                    <th className="py-3 px-4 text-right">Strategic Tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CHANNEL_METRICS_DATA.map((ch, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-800">{ch.channel}</td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600">{ch.leadsReceived}</td>
                      <td className="py-3 px-4 font-medium text-slate-700">{ch.walkins}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">{ch.enrolled} Students</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{ch.conversionRate}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{ch.costPerAdmission}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">{ch.revenueBooked}</td>
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
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Strategic Admissions Budget Recommendation:
              </span>
              <p className="text-xs text-slate-600 max-w-3xl">
                Parent word-of-mouth referrals yield a <strong>38.4% conversion rate</strong> at a negligible CPA of ₹365. 
                Reallocate 15% of the Meta social media budget towards the Parent Referral Tuition Fee Credit program.
              </p>
            </div>
            <button
              onClick={() => alert("Parent Referral Incentive Policy updated.")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm shrink-0"
            >
              Update Referral Policy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
