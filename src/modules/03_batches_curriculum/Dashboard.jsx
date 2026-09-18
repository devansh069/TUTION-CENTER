import React, { useState, useMemo } from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import CalendarMatrix from '../../components/common/CalendarMatrix';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { BATCHES_DATA } from '../../data/erpData';

export default function BatchesDashboard({ instituteCode = 'ALL', onNavigate }) {
  const [selectedBatchModal, setSelectedBatchModal] = useState(null);
  const [attendanceBatchId, setAttendanceBatchId] = useState(BATCHES_DATA[0]?.id || 'B101');

  // Filter batches based on scope
  const targetBatches = useMemo(() => {
    if (!instituteCode || instituteCode === 'ALL') return BATCHES_DATA;
    return BATCHES_DATA.filter((b) => b.instituteCode === instituteCode);
  }, [instituteCode]);

  // Aggregate telemetry
  const stats = useMemo(() => {
    const totalBatches = targetBatches.length;
    const totalStudents = targetBatches.reduce((acc, b) => acc + (b.students || 0), 0);
    const totalCapacity = targetBatches.reduce((acc, b) => acc + (b.capacity || 0), 0);
    const avgSyllabus = totalBatches > 0
      ? Math.round(targetBatches.reduce((acc, b) => acc + (b.overallSyllabusPct || 0), 0) / totalBatches)
      : 76;
    const avgAttendance = totalBatches > 0
      ? (targetBatches.reduce((acc, b) => acc + (b.attendanceRate || 0), 0) / totalBatches).toFixed(1)
      : '97.2';
    const fillRate = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 91;

    return {
      totalBatches,
      totalStudents,
      totalCapacity,
      avgSyllabus,
      avgAttendance,
      fillRate
    };
  }, [targetBatches]);

  // Selected batch for daily attendance graph
  const currentAttendanceBatch = useMemo(() => {
    return targetBatches.find(b => b.id === attendanceBatchId) || targetBatches[0] || BATCHES_DATA[0];
  }, [attendanceBatchId, targetBatches]);

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Total Active Batches"
          value={`${stats.totalBatches} Cohorts`}
          subtitle={`${stats.totalStudents} Enrolled • ${stats.totalCapacity} Max Seats`}
          icon="🗓️"
          trend="+12.5%"
          badge={`${stats.fillRate}% Fill Rate`}
        />
        <KPICard
          theme="emerald"
          title="Daily Attendance Average"
          value={`${stats.avgAttendance}% Present`}
          subtitle="Biometric AI Verified Roster"
          icon="📸"
          trend="+2.4%"
          badge="High Fidelity"
        />
        <KPICard
          theme="amber"
          title="Syllabus Completion"
          value={`${stats.avgSyllabus}% Finished`}
          subtitle="Target Deadline: Nov 15, 2026"
          icon="📖"
          badge="100% On-Schedule"
        />
        <KPICard
          theme="rose"
          title="Live Lecture Streams"
          value={`${targetBatches.filter(b => b.streamLive).length} WebRTC Live`}
          subtitle="Direct Broadcast to Student App"
          icon="🎥"
          badge="Zero Lag (60fps)"
        />
      </div>

      {/* Real-time Telemetry Ribbon (8 Critical Gauges) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Batches</div>
          <div className="text-base font-black text-blue-600 mt-0.5">{stats.totalBatches} Active</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Seat Fill Rate</div>
          <div className="text-base font-black text-emerald-600 mt-0.5">{stats.fillRate}% Load</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Weekly Hours</div>
          <div className="text-base font-black text-indigo-600 mt-0.5">148 Hrs/Wk</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">HW Completion</div>
          <div className="text-base font-black text-slate-800 mt-0.5">96.8% Avg</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Tests Held</div>
          <div className="text-base font-black text-amber-600 mt-0.5">6 Mocks Done</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Upcoming Tests</div>
          <div className="text-base font-black text-purple-600 mt-0.5">4 Scheduled</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">PTZ Cameras</div>
          <div className="text-base font-black text-emerald-600 mt-0.5">12 Online</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Substitutes</div>
          <div className="text-base font-black text-slate-700 mt-0.5">0 Conflicts</div>
        </div>
      </div>

      {/* Daily Attendance Graph of Each Batch (User Requirement) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>📊</span> Daily Attendance Trend Graph (Per Batch)
            </h3>
            <p className="text-xs text-slate-500">
              7-Day facial biometric attendance telemetry for selected batch: <strong className="text-blue-600">{currentAttendanceBatch?.name}</strong>
            </p>
          </div>
          {/* Batch Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Inspect Batch:</span>
            <select
              value={attendanceBatchId}
              onChange={(e) => setAttendanceBatchId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {targetBatches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 7-Day Attendance Graph Component */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          <div className="lg:col-span-3">
            <TrendAnalyticsChart
              data={currentAttendanceBatch?.dailyAttendance?.map(d => ({
                label: `${d.day} (${d.date})`,
                value: d.rate
              })) || []}
              color="#10b981"
            />
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="font-bold text-slate-900 text-sm">{currentAttendanceBatch?.name}</div>
            <div className="space-y-1 text-slate-600">
              <div>Campus: <strong className="text-slate-800">{currentAttendanceBatch?.instituteName}</strong></div>
              <div>Faculty Lead: <strong className="text-slate-800">{currentAttendanceBatch?.teacher}</strong></div>
              <div>Room: {currentAttendanceBatch?.room}</div>
            </div>
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="flex justify-between">
                <span>Enrolled Students:</span>
                <span className="font-bold text-slate-900">{currentAttendanceBatch?.students} / {currentAttendanceBatch?.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Attendance:</span>
                <span className="font-bold text-emerald-600">{currentAttendanceBatch?.attendanceRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Hours:</span>
                <span className="font-bold text-blue-600">{currentAttendanceBatch?.totalWeeklyHours} hrs/wk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Batch Master Cards Roster (Requested: Goal, Max Students, Subjects, Teachers, Hours, Progress Bars for everything!) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>📚</span> Master Batches & Curriculum Roster
            </h3>
            <p className="text-xs text-slate-500">
              Complete batch breakdown with Goal, Seat Capacity, Assigned Faculty, Weekly Hours and Multi-Progress Gauges
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate && onNavigate('batch_schedule')}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100 transition"
            >
              Weekly Timetable Grid 🗓️
            </button>
            <button
              onClick={() => onNavigate && onNavigate('syllabus_tracker')}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition"
            >
              Curriculum Roadmap 📋
            </button>
          </div>
        </div>

        {/* Dense Batch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {targetBatches.map((b) => {
            const seatFillPct = Math.round((b.students / b.capacity) * 100);
            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Header & Goal */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {b.id}
                        </span>
                        <h4 className="font-bold text-base text-slate-900">{b.name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{b.instituteName}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50/80 text-amber-900 rounded-lg text-xs font-semibold border border-amber-200">
                        <span>🎯 Goal:</span>
                        <span>{b.goal}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex-shrink-0 ${
                      b.status === 'In Session' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      ● {b.status}
                    </span>
                  </div>

                  {/* Top Progress Bars: Seats & Overall Syllabus */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {/* Seat Load Progress */}
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-slate-600">Seat Load:</span>
                        <span className="font-bold text-blue-600">{b.students} / {b.capacity} ({seatFillPct}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${seatFillPct >= 95 ? 'bg-rose-500' : 'bg-blue-600'}`}
                          style={{ width: `${seatFillPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Overall Syllabus Progress */}
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-slate-600">Syllabus Completion:</span>
                        <span className="font-bold text-emerald-600">{b.overallSyllabusPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${b.overallSyllabusPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Progress Bars: Homework, Test Average, Attendance */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-blue-50/50 rounded-xl border border-blue-100">
                      <div className="text-[10px] text-blue-800 font-semibold uppercase">HW Completed</div>
                      <div className="text-sm font-black text-blue-900">{b.hwCompletionRate}%</div>
                      <div className="w-full bg-blue-100 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{ width: `${b.hwCompletionRate}%` }}></div>
                      </div>
                    </div>

                    <div className="p-2 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <div className="text-[10px] text-emerald-800 font-semibold uppercase">Test Score Avg</div>
                      <div className="text-sm font-black text-emerald-900">{b.testAverageScore}%</div>
                      <div className="w-full bg-emerald-100 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-emerald-600 h-full" style={{ width: `${b.testAverageScore}%` }}></div>
                      </div>
                    </div>

                    <div className="p-2 bg-indigo-50/50 rounded-xl border border-indigo-100">
                      <div className="text-[10px] text-indigo-800 font-semibold uppercase">Biometric Scan</div>
                      <div className="text-sm font-black text-indigo-900">{b.attendanceRate}%</div>
                      <div className="w-full bg-indigo-100 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-indigo-600 h-full" style={{ width: `${b.attendanceRate}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Subject-wise Teachers Assigned, Hours & Subject Progress Bar */}
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      Assigned Subject Faculty & Syllabus Pacing
                    </div>
                    <div className="space-y-2">
                      {b.subjects?.map((sub, i) => (
                        <div key={i} className="p-2 bg-white rounded-lg border border-slate-200/70 space-y-1">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-slate-800">{sub.name}</span>
                            <span className="text-blue-600 font-bold">{sub.syllabusPct}% Done</span>
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-500">
                            <span>Teacher: <strong className="text-slate-700">{sub.teacher}</strong></span>
                            <span>{sub.hoursPerWeek} hrs/wk ({sub.completedHours}/{sub.totalHours} hrs)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{ width: `${sub.syllabusPct}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500">
                    <span>Room: <strong className="text-slate-800">{b.room}</strong></span> • <span>{b.time}</span>
                  </div>
                  <button
                    onClick={() => setSelectedBatchModal(b)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1 shadow-sm"
                  >
                    <span>🔍</span> Full Schedule & Dossier
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Master Lecture Matrix Calendar & Curriculum Approval Stepper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Lecture Timesheet & Room Allocation Grid</h3>
              <p className="text-xs text-slate-500">Monthly schedule matrix matching ERP calendar standards</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              September 2026
            </span>
          </div>
          <CalendarMatrix />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">Curriculum Modification Approval Workflow</h3>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-xs border border-blue-200">
                Stage 3: HOD Audit
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              New syllabus unit additions, extra faculty lecture requests and test schedule adjustments require multi-tier authorization
            </p>
            <ApprovalFlowStepper currentStage={3} />
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span>⚡</span> Real-time AI Timetable Optimization
            </div>
            <p className="text-[11px] text-blue-700 leading-relaxed">
              Timetable AI ensures zero classroom overlap across faculty members and balances educator workload under 28 weekly hours.
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Batch 360° Modal (Full Schedule, Curriculum, HW, Tests) */}
      {selectedBatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {selectedBatchModal.code}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{selectedBatchModal.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {selectedBatchModal.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedBatchModal.instituteName} • Classroom: <strong className="text-slate-700">{selectedBatchModal.room}</strong>
                </p>
                <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200 text-xs font-bold text-amber-900">
                  🎯 Target Goal: {selectedBatchModal.goal}
                </div>
              </div>
              <button
                onClick={() => setSelectedBatchModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Section 1: Full Weekly Timetable Schedule */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase text-[10px] border-b border-slate-200 pb-1">
                Full Weekly Class Schedule Timetable
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-200">
                    <tr>
                      <th className="py-2">Day of Week</th>
                      <th className="py-2">Timing Slot</th>
                      <th className="py-2">Subject</th>
                      <th className="py-2">Assigned Educator</th>
                      <th className="py-2">Room / Lab</th>
                      <th className="py-2 text-right">WebRTC Stream</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedBatchModal.schedule?.map((slot, i) => (
                      <tr key={i}>
                        <td className="py-2 font-bold text-slate-800">{slot.day}</td>
                        <td className="py-2 font-mono text-slate-600">{slot.time}</td>
                        <td className="py-2 font-semibold text-blue-600">{slot.subject}</td>
                        <td className="py-2 text-slate-700">{slot.teacher}</td>
                        <td className="py-2 text-slate-500 font-mono text-[11px]">{slot.room}</td>
                        <td className="py-2 text-right">
                          {slot.isLive ? (
                            <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded font-bold text-[10px] border border-rose-200">
                              Live Stream
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px]">
                              In-Person
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Curriculum Units & Syllabus Progress */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase text-[10px] border-b border-slate-200 pb-1">
                Curriculum Topic Breakdown & Milestone Pacing
              </div>
              <div className="space-y-2">
                {selectedBatchModal.curriculumUnits?.map((unit, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-900">{unit.unit}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        unit.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        unit.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {unit.status} ({unit.progress}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Estimated Duration: {unit.hours} Lecture Hours</span>
                      <span>Milestone Target: In Syllabus</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${unit.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Homework & Tests Records */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
                <div className="font-bold text-blue-900 uppercase text-[10px] border-b border-blue-200 pb-1">
                  Homework Sets Tracking
                </div>
                {selectedBatchModal.homeworkRecords?.map((hw, i) => (
                  <div key={i} className="p-2 bg-white rounded-lg border border-blue-200/70 space-y-1">
                    <div className="font-bold text-slate-800">{hw.topic}</div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Submitted: <strong>{hw.submittedPct}%</strong></span>
                      <span>Checked: <strong>{hw.checkedPct}%</strong></span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-bold">Batch Avg: {hw.avgScore}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                <div className="font-bold text-emerald-900 uppercase text-[10px] border-b border-emerald-200 pb-1">
                  Exam & Test Series Records
                </div>
                {selectedBatchModal.testRecords?.map((test, i) => (
                  <div key={i} className="p-2 bg-white rounded-lg border border-emerald-200/70 space-y-1">
                    <div className="font-bold text-slate-800">{test.testName}</div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Date: {test.date}</span>
                      <span>Max: {test.totalMarks} Marks</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-blue-600 font-semibold">Batch Avg: {test.batchAvg}</span>
                      <span className="text-emerald-700 font-bold">Top: {test.topScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedBatchModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
              >
                Close Timetable
              </button>
              <button
                onClick={() => {
                  alert(`Batch Timetable PDF printed for ${selectedBatchModal.name}`);
                  setSelectedBatchModal(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition flex items-center gap-1.5"
              >
                <span>🖨️</span> Export Full Batch Schedule (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
