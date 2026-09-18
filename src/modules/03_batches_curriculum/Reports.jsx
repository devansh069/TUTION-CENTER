import React, { useState, useEffect } from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import { BATCHES_DATA } from '../../data/erpData';

export default function BatchesReports({ instituteCode = 'ALL', activeTab: initialTab }) {
  const [selectedReport, setSelectedReport] = useState(initialTab || 'rep_capacity');

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
          title="Network Seat Fill"
          value="91.2% Occupancy"
          subtitle="520 / 570 Active Desks"
          icon="🪑"
          trend="+6.4%"
          badge="High Demand"
        />
        <KPICard
          theme="emerald"
          title="Syllabus Pacing Index"
          value="100% On-Track"
          subtitle="Target: Nov 15 Deadline"
          icon="📖"
          badge="Zero Delay"
        />
        <KPICard
          theme="amber"
          title="Homework Completion"
          value="96.8% Average"
          subtitle="Daily Submissions Tracked"
          icon="📝"
          badge="High Rigor"
        />
        <KPICard
          theme="rose"
          title="Test Score Average"
          value="84.6% Mean"
          subtitle="6 Mock Tests Conducted"
          icon="🎯"
          badge="Competitive"
        />
      </div>

      {/* Report Switcher Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedReport('rep_capacity')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            selectedReport === 'rep_capacity'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>🪑</span> 1. Batch Capacity & Classroom Utilization Report
        </button>
        <button
          onClick={() => setSelectedReport('rep_syllabus')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            selectedReport === 'rep_syllabus'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>📖</span> 2. Curriculum Velocity, HW & Test Performance
        </button>
      </div>

      {/* ==================================================== */}
      {/* REPORT 1: BATCH CAPACITY & ROOM UTILIZATION          */}
      {/* ==================================================== */}
      {selectedReport === 'rep_capacity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Batch Seat Load Saturation (%)</h3>
              <p className="text-xs text-slate-500 mb-4">Enrolled students versus maximum desk capacity</p>
              <ComplianceBarChart
                data={BATCHES_DATA.map((b) => ({
                  label: b.id,
                  value: Math.round((b.students / b.capacity) * 100)
                }))}
                color="#6366f1"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Classroom Occupancy by Time Band</h3>
              <p className="text-xs text-slate-500 mb-4">Saturation across morning, afternoon, and evening slots</p>
              <ComplianceBarChart
                data={[
                  { label: 'Morning Slot (08:00 - 11:30)', value: 96 },
                  { label: 'Afternoon Slot (12:00 - 03:30)', value: 88 },
                  { label: 'Evening Peak (04:00 - 07:00)', value: 92 },
                  { label: 'Weekend OMR Mock Slots', value: 100 },
                ]}
                color="#0ea5e9"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Classroom Room Allocation & Saturation Audit</h3>
            <p className="text-xs text-slate-500 mb-4">Desk inventory, allocated batch, and air conditioning/PTZ camera readiness</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Lecture Room / Lab</th>
                    <th className="py-3 px-4">Allocated Batch</th>
                    <th className="py-3 px-4">Campus</th>
                    <th className="py-3 px-4">Enrolled / Max</th>
                    <th className="py-3 px-4">Occupancy %</th>
                    <th className="py-3 px-4 text-right">Expansion Need</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BATCHES_DATA.map((b) => {
                    const pct = Math.round((b.students / b.capacity) * 100);
                    return (
                      <tr key={b.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">{b.room}</td>
                        <td className="py-3 px-4 font-semibold text-blue-600">{b.name}</td>
                        <td className="py-3 px-4 text-slate-600">{b.instituteName}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">{b.students} / {b.capacity}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            pct >= 95 ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {pct}% Saturation
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            pct >= 95 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {pct >= 95 ? 'Waitlist Active' : 'Desks Available'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* REPORT 2: CURRICULUM VELOCITY, HW & TEST MARKS       */}
      {/* ==================================================== */}
      {selectedReport === 'rep_syllabus' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Batch Syllabus Completion (%)</h3>
              <p className="text-xs text-slate-500 mb-4">Progress toward November 15 pre-mock completion deadline</p>
              <ComplianceBarChart
                data={BATCHES_DATA.map((b) => ({
                  label: b.id,
                  value: b.overallSyllabusPct
                }))}
                color="#10b981"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Homework Submission Compliance (%)</h3>
              <p className="text-xs text-slate-500 mb-4">On-time homework submission rate across cohorts</p>
              <ComplianceBarChart
                data={BATCHES_DATA.map((b) => ({
                  label: b.id,
                  value: Math.round(b.hwCompletionRate)
                }))}
                color="#f59e0b"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Cross-Batch Academic Performance & Rigor Audit</h3>
            <p className="text-xs text-slate-500 mb-4">Syllabus %, homework compliance, mock test averages and lead faculty in charge</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Batch & Code</th>
                    <th className="py-3 px-4">Lead Faculty</th>
                    <th className="py-3 px-4">Weekly Hours</th>
                    <th className="py-3 px-4">Syllabus %</th>
                    <th className="py-3 px-4">HW Submission</th>
                    <th className="py-3 px-4">Test Avg</th>
                    <th className="py-3 px-4 text-right">Attendance %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BATCHES_DATA.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{b.name}</div>
                        <div className="text-[10px] text-blue-600 font-mono">{b.code}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{b.teacher}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{b.totalWeeklyHours} hrs/wk</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">{b.overallSyllabusPct}%</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{b.hwCompletionRate}%</td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-600">{b.testAverageScore}%</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[10px] border border-emerald-200">
                          {b.attendanceRate}%
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
