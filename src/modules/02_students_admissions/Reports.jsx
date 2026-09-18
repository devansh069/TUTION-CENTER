import React, { useState, useEffect } from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import { STUDENTS_DATA, INSTITUTES_DATA } from '../../data/erpData';

export default function StudentsReports({ instituteCode = 'ALL', activeTab: initialTab }) {
  const [selectedReport, setSelectedReport] = useState(initialTab || 'rep_trends');

  useEffect(() => {
    if (initialTab) {
      setSelectedReport(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Gross Admissions Inflow"
          value="1,482 Enrolled"
          subtitle="Current Academic Cycle"
          icon="📈"
          trend="+28.4% YoY"
          badge="High Growth"
        />
        <KPICard
          theme="emerald"
          title="Annual Retention Rate"
          value="99.2% Retained"
          subtitle="Only 12 Dropouts/Relocations"
          icon="🤝"
          badge="Top Decile"
        />
        <KPICard
          theme="amber"
          title="Books & Kit Delivery"
          value="96.2% Dispatched"
          subtitle="Physical Modules Handed"
          icon="📦"
          badge="Zero Deficit"
        />
        <KPICard
          theme="rose"
          title="Teacher Feedback Rating"
          value="⭐ 4.88 / 5.0"
          subtitle="From Parent & Student App"
          icon="⭐"
          badge="Exemplary"
        />
      </div>

      {/* Report Tab Selector */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedReport('rep_trends')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            selectedReport === 'rep_trends'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>📈</span> 1. Admission Trends & Lead Inflow
        </button>
        <button
          onClick={() => setSelectedReport('rep_kyc')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            selectedReport === 'rep_kyc'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>📦</span> 2. KYC, Deliverables & Biometric AI Compliance
        </button>
        <button
          onClick={() => setSelectedReport('rep_retention')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            selectedReport === 'rep_retention'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>🎯</span> 3. Student Retention & Academic Performance
        </button>
      </div>

      {/* ==================================================== */}
      {/* REPORT 1: ADMISSION TRENDS & INFLOW DYNAMICS         */}
      {/* ==================================================== */}
      {selectedReport === 'rep_trends' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Monthly New Confirmed Admissions</h3>
              <p className="text-xs text-slate-500 mb-4">New student seats finalized across coaching centers</p>
              <TrendAnalyticsChart
                data={[
                  { label: 'May', value: 120 },
                  { label: 'Jun', value: 210 },
                  { label: 'Jul', value: 280 },
                  { label: 'Aug', value: 195 },
                  { label: 'Sep', value: 240 },
                  { label: 'Oct', value: 310 },
                ]}
                color="#3b82f6"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Admissions by Acquisition Channel</h3>
              <p className="text-xs text-slate-500 mb-4">Lead generation conversion effectiveness</p>
              <ComplianceBarChart
                data={[
                  { label: 'School Seminars', value: 480 },
                  { label: 'Google Ads Search', value: 390 },
                  { label: 'Parent Referral', value: 310 },
                  { label: 'Walk-ins', value: 180 },
                  { label: 'Social & Reels', value: 122 },
                ]}
                color="#6366f1"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Target Stream Enrollment & Revenue Potential</h3>
            <p className="text-xs text-slate-500 mb-4">Admissions breakdown by competitive entrance target</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Competitive Target Course</th>
                    <th className="py-3 px-4">Seats Enrolled</th>
                    <th className="py-3 px-4">Average Annual Fee</th>
                    <th className="py-3 px-4">Gross Potential</th>
                    <th className="py-3 px-4">Conversion Ratio</th>
                    <th className="py-3 px-4 text-right">Target Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">IIT-JEE 2-Year Advanced Pinnacle</td>
                    <td className="py-3 px-4 font-bold text-slate-800">1,450 Students</td>
                    <td className="py-3 px-4 font-mono text-slate-600">$1,850 / yr</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">$2,682,500</td>
                    <td className="py-3 px-4 font-bold text-blue-600">32.4% Lead-to-Admission</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">96% Full</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">NEET Pre-Medical Super-60 Rankers</td>
                    <td className="py-3 px-4 font-bold text-slate-800">1,120 Students</td>
                    <td className="py-3 px-4 font-mono text-slate-600">$1,950 / yr</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">$2,184,000</td>
                    <td className="py-3 px-4 font-bold text-blue-600">28.6% Lead-to-Admission</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">93% Full</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">CA Foundation & Inter Regular</td>
                    <td className="py-3 px-4 font-bold text-slate-800">920 Students</td>
                    <td className="py-3 px-4 font-mono text-slate-600">$1,800 / yr</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">$1,656,000</td>
                    <td className="py-3 px-4 font-bold text-blue-600">34.2% Lead-to-Admission</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">92% Full</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">AI & Coding Fellowship (Class 11)</td>
                    <td className="py-3 px-4 font-bold text-slate-800">640 Students</td>
                    <td className="py-3 px-4 font-mono text-slate-600">$1,750 / yr</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">$1,120,000</td>
                    <td className="py-3 px-4 font-bold text-blue-600">24.5% Lead-to-Admission</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded text-[10px]">80% Full</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">CLAT National Law Entrance Super 40</td>
                    <td className="py-3 px-4 font-bold text-slate-800">580 Students</td>
                    <td className="py-3 px-4 font-mono text-slate-600">$1,400 / yr</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">$812,000</td>
                    <td className="py-3 px-4 font-bold text-blue-600">31.0% Lead-to-Admission</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">89% Full</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* REPORT 2: KYC & DELIVERABLES COMPLIANCE              */}
      {/* ==================================================== */}
      {selectedReport === 'rep_kyc' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Study Material Book Sets Delivery %</h3>
              <p className="text-xs text-slate-500 mb-4">Percentage of admitted students with physical books handed</p>
              <ComplianceBarChart
                data={INSTITUTES_DATA.map((inst) => ({
                  label: inst.shortCode,
                  value: 96
                }))}
                color="#10b981"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Facial Biometric AI Registration %</h3>
              <p className="text-xs text-slate-500 mb-4">Gate AI training completion rate</p>
              <ComplianceBarChart
                data={INSTITUTES_DATA.map((inst) => ({
                  label: inst.shortCode,
                  value: inst.metrics.attendanceRate
                }))}
                color="#6366f1"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Campus Deliverables & Logistics Audit Ledger</h3>
            <p className="text-xs text-slate-500 mb-4">Kits, uniforms, textbook modules and pending delivery SLAs by center</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Tuition Center</th>
                    <th className="py-3 px-4">Students Enrolled</th>
                    <th className="py-3 px-4">Starter Kits Handed</th>
                    <th className="py-3 px-4">Book Sets Issued</th>
                    <th className="py-3 px-4">Uniforms Tailored</th>
                    <th className="py-3 px-4">Pending Withheld (Fee Dues)</th>
                    <th className="py-3 px-4 text-right">Logistics Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INSTITUTES_DATA.map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{inst.name}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{inst.metrics.students}</td>
                      <td className="py-3 px-4 font-mono text-emerald-600 font-bold">{Math.round(inst.metrics.students * 0.98)} Kits</td>
                      <td className="py-3 px-4 font-mono text-blue-600 font-bold">{Math.round(inst.metrics.students * 0.96)} Sets</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{Math.round(inst.metrics.students * 0.95)} Uniforms</td>
                      <td className="py-3 px-4 font-mono font-semibold text-rose-600">{Math.round(inst.metrics.students * 0.04)} Withheld</td>
                      <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">On-Schedule</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* REPORT 3: STUDENT RETENTION & ACADEMIC PERFORMANCE   */}
      {/* ==================================================== */}
      {selectedReport === 'rep_retention' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Student Retention vs Dropouts (Came vs Left)</h3>
              <p className="text-xs text-slate-500 mb-4">Total joined vs total discontinued over academic term</p>
              <ComplianceBarChart
                data={[
                  { label: 'New Admissions (+)', value: 1482 },
                  { label: 'Family Relocations (-)', value: 8 },
                  { label: 'Medical Discontinue (-)', value: 4 },
                  { label: 'Net Retained Roster (=)', value: 1470 },
                ]}
                color="#10b981"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Parent App Monthly PTM Sign-Off Rate (%)</h3>
              <p className="text-xs text-slate-500 mb-4">Parent approval of student monthly performance dossier</p>
              <ComplianceBarChart
                data={[
                  { label: 'Alpha Kota', value: 98.4 },
                  { label: 'Beta London', value: 99.1 },
                  { label: 'Apex Boston', value: 97.8 },
                  { label: 'Delta SFO', value: 96.5 },
                  { label: 'Zenith Toronto', value: 94.2 },
                ]}
                color="#0ea5e9"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Student Academic Rankers & Teacher Feedback Ratings</h3>
            <p className="text-xs text-slate-500 mb-4">National test score performers and feedback submitted on teaching staff via mobile app</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Student & Roll No</th>
                    <th className="py-3 px-4">Campus & Batch</th>
                    <th className="py-3 px-4">Latest Mock Test</th>
                    <th className="py-3 px-4">Score & Percentile</th>
                    <th className="py-3 px-4">HW Rate</th>
                    <th className="py-3 px-4">Teacher Rating Given</th>
                    <th className="py-3 px-4 text-right">PTM Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {STUDENTS_DATA.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {s.name} <span className="text-[10px] text-slate-400 font-mono">({s.rollNo})</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        {s.instituteName} • {s.batchName}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {s.testMarksRecord?.[0]?.testName || 'Grand Mock 01'}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">
                        {s.testMarksRecord?.[0]?.score || '284 / 300'} ({s.testMarksRecord?.[0]?.percentile || '99.8%'})
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">
                        {s.hwSubmissionRate}%
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-600">
                        ⭐ {s.teacherFeedbackRating} / 5.0
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                          s.reportApproved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {s.reportApproved ? '✓ Parent Signed' : '⏳ Pending'}
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
    </div>
  );
}
