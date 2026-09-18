import React, { useState, useEffect } from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import { INSTITUTES_DATA } from '../../data/erpData';

export default function InstitutesReports({ instituteCode = 'ALL', activeTab: initialTab }) {
  const [selectedReport, setSelectedReport] = useState(initialTab || 'rep_growth');

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
          title="Consolidated Revenue"
          value="$345,000"
          subtitle="Monthly Inflow Run-rate"
          icon="💰"
          trend="+18.4%"
          badge="Q3 Active"
        />
        <KPICard
          theme="emerald"
          title="Average Seat Load"
          value="88.9%"
          subtitle="4,710 / 5,250 Total Desks"
          icon="🪑"
          badge="Optimal"
        />
        <KPICard
          theme="amber"
          title="Faculty-Student Ratio"
          value="1:29"
          subtitle="Benchmark: < 1:35"
          icon="👨‍🏫"
          badge="Exceeds Target"
        />
        <KPICard
          theme="rose"
          title="Licensing Compliance"
          value="100%"
          subtitle="Zero SLA or Regulatory Drift"
          icon="⚖️"
          badge="Verified"
        />
      </div>

      {/* Report Tab Selector */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedReport('rep_growth')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            selectedReport === 'rep_growth'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>📈</span> 1. Institute Growth & Enrollment Dynamics
        </button>
        <button
          onClick={() => setSelectedReport('rep_capacity')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            selectedReport === 'rep_capacity'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>🪑</span> 2. Classroom & Batch Capacity Utilization
        </button>
        <button
          onClick={() => setSelectedReport('rep_comparison')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            selectedReport === 'rep_comparison'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>⚖️</span> 3. Cross-Branch Comparative Benchmark
        </button>
      </div>

      {/* ==================================================== */}
      {/* REPORT 1: INSTITUTE GROWTH & ENROLLMENT DYNAMICS     */}
      {/* ==================================================== */}
      {selectedReport === 'rep_growth' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Student Enrollment Trajectory (Last 6 Months)</h3>
              <p className="text-xs text-slate-500 mb-4">Total active student enrollment progression across all 5 centers</p>
              <TrendAnalyticsChart
                data={[
                  { label: 'May', value: 3930 },
                  { label: 'Jun', value: 4140 },
                  { label: 'Jul', value: 4365 },
                  { label: 'Aug', value: 4510 },
                  { label: 'Sep', value: 4610 },
                  { label: 'Oct', value: 4710 },
                ]}
                color="#3b82f6"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Monthly Billing Revenue Velocity ($)</h3>
              <p className="text-xs text-slate-500 mb-4">Consolidated monthly gross fee realizations</p>
              <TrendAnalyticsChart
                data={[
                  { label: 'May', value: 278000 },
                  { label: 'Jun', value: 298000 },
                  { label: 'Jul', value: 317500 },
                  { label: 'Aug', value: 329000 },
                  { label: 'Sep', value: 337200 },
                  { label: 'Oct', value: 345000 },
                ]}
                color="#10b981"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Campus-wise Growth Velocity & Retention Ratios</h3>
            <p className="text-xs text-slate-500 mb-4">Quarterly growth velocity, student retention and projected Q4 seat intake targets</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Campus Title</th>
                    <th className="py-3 px-4">Students May 2026</th>
                    <th className="py-3 px-4">Students Oct 2026</th>
                    <th className="py-3 px-4">Net Intake</th>
                    <th className="py-3 px-4">Growth %</th>
                    <th className="py-3 px-4">Retention %</th>
                    <th className="py-3 px-4 text-right">Q4 Forecast</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INSTITUTES_DATA.map((inst) => {
                    const firstMonth = inst.performanceChart?.[0]?.students || 500;
                    const latestMonth = inst.metrics.students;
                    const net = latestMonth - firstMonth;
                    const growth = Math.round((net / firstMonth) * 100);
                    return (
                      <tr key={inst.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">{inst.name}</td>
                        <td className="py-3 px-4 font-mono text-slate-600">{firstMonth}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">{latestMonth}</td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-600">+{net} students</td>
                        <td className="py-3 px-4 font-bold text-blue-600">+{growth}%</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                            98.2% Retained
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">
                          {Math.round(latestMonth * 1.08)} Seats
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
      {/* REPORT 2: CLASSROOM & CAPACITY UTILIZATION REPORT    */}
      {/* ==================================================== */}
      {selectedReport === 'rep_capacity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Campus Seat Load Saturation (%)</h3>
              <p className="text-xs text-slate-500 mb-4">Percentage of total physical desk capacity currently enrolled</p>
              <ComplianceBarChart
                data={INSTITUTES_DATA.map((inst) => ({
                  label: inst.shortCode,
                  value: Math.round((inst.metrics.students / inst.metrics.studentCapacity) * 100)
                }))}
                color="#6366f1"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Slot Saturation: Morning vs Evening</h3>
              <p className="text-xs text-slate-500 mb-4">Average room utilization by session period</p>
              <ComplianceBarChart
                data={[
                  { label: 'Morning Slot (08:00 - 12:00)', value: 92 },
                  { label: 'Afternoon Slot (12:30 - 04:00)', value: 84 },
                  { label: 'Evening Peak (04:30 - 08:30)', value: 96 },
                  { label: 'Weekend Star Batches', value: 98 },
                ]}
                color="#f59e0b"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Smart Classroom & Lecture Hall Operational Audit</h3>
            <p className="text-xs text-slate-500 mb-4">Air conditioning status, PTZ WebRTC cameras, desk capacity and peak hour load</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Hall / Lab ID</th>
                    <th className="py-3 px-4">Campus Location</th>
                    <th className="py-3 px-4">Desk Capacity</th>
                    <th className="py-3 px-4">Peak Occupancy</th>
                    <th className="py-3 px-4">WebRTC 4K PTZ Camera</th>
                    <th className="py-3 px-4">HVAC / Smart Screen</th>
                    <th className="py-3 px-4 text-right">Expansion Need</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">Lecture Hall A (Physics)</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">Alpha Institute NYC</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">130 Seats</td>
                    <td className="py-3 px-4 font-bold text-amber-600">92% Occupied</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">Online (60fps)</span></td>
                    <td className="py-3 px-4 text-slate-600 font-medium">Dual 85" Smart Display</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded text-[10px]">Adequate</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">Audit Hall 1 (CA Inter)</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">Beta Commerce London</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">100 Seats</td>
                    <td className="py-3 px-4 font-bold text-rose-600">95% Occupied</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">Online (30fps)</span></td>
                    <td className="py-3 px-4 text-slate-600 font-medium">Interactive Stylus Podiums</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-bold rounded text-[10px]">Expand Q1</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">Bio-Medical Auditorium</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">Apex Medical Boston</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">120 Seats</td>
                    <td className="py-3 px-4 font-bold text-blue-600">91% Occupied</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">Online (60fps)</span></td>
                    <td className="py-3 px-4 text-slate-600 font-medium">3D Anatomical Projection</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded text-[10px]">Adequate</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">Robotics & AI Lab</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">Delta Tech SFO</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">50 Workstations</td>
                    <td className="py-3 px-4 font-bold text-rose-600">100% Saturated</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">Online (60fps)</span></td>
                    <td className="py-3 px-4 text-slate-600 font-medium">GPU Tensor Server Racks</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded text-[10px]">Urgent Add 20</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">Moot Court Hall 1</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">Zenith Law Toronto</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">45 Seats</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">88% Occupied</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">Online (30fps)</span></td>
                    <td className="py-3 px-4 text-slate-600 font-medium">Acoustic Audio Array</td>
                    <td className="py-3 px-4 text-right"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded text-[10px]">Adequate</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* REPORT 3: CROSS-BRANCH COMPARATIVE BENCHMARK         */}
      {/* ==================================================== */}
      {selectedReport === 'rep_comparison' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Monthly Revenue per Student Comparison ($)</h3>
              <p className="text-xs text-slate-500 mb-4">Monetization yield across center profiles</p>
              <ComplianceBarChart
                data={INSTITUTES_DATA.map((inst) => ({
                  label: inst.shortCode,
                  value: Math.round(inst.metrics.monthlyRevenue / inst.metrics.students)
                }))}
                color="#0ea5e9"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Facial Attendance Punctuality Rate (%)</h3>
              <p className="text-xs text-slate-500 mb-4">Biometric attendance verification fidelity across branches</p>
              <ComplianceBarChart
                data={INSTITUTES_DATA.map((inst) => ({
                  label: inst.shortCode,
                  value: inst.metrics.attendanceRate
                }))}
                color="#10b981"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Cross-Branch Executive Performance Benchmark</h3>
            <p className="text-xs text-slate-500 mb-4">Complete comparison of academic, financial, attendance and operational metrics</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Branch Center</th>
                    <th className="py-3 px-4">Revenue / Student</th>
                    <th className="py-3 px-4">Student : Teacher</th>
                    <th className="py-3 px-4">Facial Check-in</th>
                    <th className="py-3 px-4">Fee Default Rate</th>
                    <th className="py-3 px-4">Parent App Rating</th>
                    <th className="py-3 px-4 text-right">Composite Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INSTITUTES_DATA.map((inst, index) => {
                    const revPerStudent = Math.round(inst.metrics.monthlyRevenue / inst.metrics.students);
                    const ratio = Math.round(inst.metrics.students / inst.metrics.teachers);
                    const defaultRate = ((inst.metrics.pendingFees / inst.metrics.monthlyRevenue) * 100).toFixed(1);
                    return (
                      <tr key={inst.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {inst.name} <span className="text-slate-400 font-normal">({inst.city})</span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">${revPerStudent} / mo</td>
                        <td className="py-3 px-4 font-semibold text-slate-700">1 : {ratio}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px] border border-emerald-200">
                            {inst.metrics.attendanceRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-slate-600">{defaultRate}%</td>
                        <td className="py-3 px-4 font-bold text-amber-600">⭐ 4.8 / 5.0</td>
                        <td className="py-3 px-4 text-right">
                          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full font-bold text-[10px]">
                            Rank #{index + 1}
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
    </div>
  );
}
