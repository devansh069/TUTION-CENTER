import React, { useState, useMemo } from 'react';
import KPICard from '../../components/common/KPICard';
import { BATCHES_DATA } from '../../data/erpData';

export default function SyllabusTracker({ instituteCode = 'ALL' }) {
  const [selectedBatchId, setSelectedBatchId] = useState('ALL');

  const targetBatches = useMemo(() => {
    let list = instituteCode === 'ALL'
      ? BATCHES_DATA
      : BATCHES_DATA.filter(b => b.instituteCode === instituteCode);

    if (selectedBatchId !== 'ALL') {
      list = list.filter(b => b.id === selectedBatchId);
    }
    return list;
  }, [instituteCode, selectedBatchId]);

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Network Syllabus Pacing"
          value="78.5% Average"
          subtitle="Across All Active Cohorts"
          icon="📖"
          badge="100% Aligned"
        />
        <KPICard
          theme="emerald"
          title="Curriculum Target Date"
          value="Nov 15, 2026"
          subtitle="Pre-Mock Revision Window"
          icon="🎯"
          badge="45 Days Remaining"
        />
        <KPICard
          theme="amber"
          title="Batches in Green Zone"
          value="85% On-Schedule"
          subtitle="Optimal Lecture Pacing"
          icon="⏱️"
          badge="Standard Velocity"
        />
        <KPICard
          theme="rose"
          title="Pacing Alerts"
          value="1 Minor Delay"
          subtitle="Extra Lectures Auto-Queued"
          icon="⚠️"
          badge="Covered"
        />
      </div>

      {/* Filter and Switcher */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Curriculum Syllabus Roadmap & Chapter Pacing</h3>
          <p className="text-xs text-slate-500">Unit-by-unit lecture hours, homework links and milestone test verification</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filter Batch:</span>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Active Batches</option>
            {BATCHES_DATA.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Batch Detailed Syllabus Trackers */}
      <div className="space-y-6">
        {targetBatches.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            {/* Batch Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {b.id}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-base">{b.name}</h4>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[10px] border border-emerald-200">
                    {b.overallSyllabusPct}% Completed
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Goal: <strong className="text-slate-800">{b.goal}</strong> • Lead: <strong>{b.teacher}</strong>
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">{b.students} / {b.capacity} Students</div>
                <div className="text-[11px] text-slate-500">{b.totalWeeklyHours} Lecture Hours/Week</div>
              </div>
            </div>

            {/* Subject-Wise Micro Pacing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {b.subjects?.map((sub, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{sub.name}</span>
                    <span className="text-blue-600 font-bold">{sub.syllabusPct}%</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Faculty: <strong className="text-slate-700">{sub.teacher}</strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Hours Logged: {sub.completedHours} / {sub.totalHours} hrs</span>
                    <span>({sub.hoursPerWeek} hrs/wk)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${sub.syllabusPct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Topic Units Checklist Table */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Topic-Level Curriculum Roadmap & Milestone Pacing
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200 text-[10px] uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Curriculum Module / Unit</th>
                      <th className="py-2.5 px-3">Lecture Hours</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Progress</th>
                      <th className="py-2.5 px-3 text-right">HW & Mock Test Linked</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {b.curriculumUnits?.map((unit, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{unit.unit}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">{unit.hours} hrs</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            unit.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : unit.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}>
                            {unit.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${unit.progress}%` }}
                              ></div>
                            </div>
                            <span className="font-mono text-[11px] font-bold text-slate-700">{unit.progress}%</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-600">
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold">
                            HW Set {idx + 1} & Mock Linked
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
