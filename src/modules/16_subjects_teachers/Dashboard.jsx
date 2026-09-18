import React, { useState } from 'react';
import KPICard from '../../components/common/KPICard';
import { ComplianceBarChart } from '../../components/common/Charts';
import CalendarMatrix from '../../components/common/CalendarMatrix';
import { MOCK_SUBJECTS, MOCK_FACULTY } from '../../data/erpData';

export default function SubjectsTeachersDashboard({ instituteCode, onNavigate }) {
  const [selectedDept, setSelectedDept] = useState('ALL');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Active Subjects Offered"
          value={`${MOCK_SUBJECTS.length} Master Subjects`}
          subtitle="Physics, Chem, Math, Bio"
          icon="📚"
          badge="100% Aligned"
        />
        <KPICard
          theme="emerald"
          title="Teaching Faculty Roster"
          value={`${MOCK_FACULTY.length} Master Educators`}
          subtitle="Avg Experience: 8.4 Yrs"
          icon="👨‍🏫"
          badge="Top Rated"
        />
        <KPICard
          theme="amber"
          title="Average Faculty Workload"
          value="24.2 Hrs / Wk"
          subtitle="Max Cap: 28 Hrs"
          icon="⏱️"
          badge="Optimal Capacity"
        />
        <KPICard
          theme="rose"
          title="Faculty Substitute Alerts"
          value="0 Conflicts"
          subtitle="Automated Timetable AI"
          icon="🗓️"
          badge="Resolved"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Master Subject Directory & Faculty Allocation</h3>
                <p className="text-xs text-slate-500">Core engineering, medical and foundation subjects mapped to HODs and teaching loads</p>
              </div>
              <button onClick={() => onNavigate('subjects_matrix')} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition">
                Allocation Matrix 📋
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Subject Code & Name</th>
                    <th className="py-3 px-4">Target Exam Target</th>
                    <th className="py-3 px-4">Head of Department (HOD)</th>
                    <th className="py-3 px-4">Assigned Batches</th>
                    <th className="py-3 px-4 text-right">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_SUBJECTS.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{s.name}</div>
                        <div className="text-[11px] text-blue-600 font-mono font-bold">{s.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[11px] font-bold">
                          {s.target}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">{s.hod}</td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{s.batches} Batches</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">{s.hoursPerWeek} hrs/wk</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1">Academic Lecture Matrix Calendar (Monthly View)</h3>
            <p className="text-xs text-slate-500 mb-4">Faculty lecture schedule across branches matching ERP schedule grid</p>
            <CalendarMatrix />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Weekly Teaching Hours per Subject</h3>
            <p className="text-xs text-slate-500 mb-4">Aggregated load across all branches</p>
            <ComplianceBarChart
              data={[
                { label: 'Adv Physics', value: 48 },
                { label: 'Adv Maths', value: 52 },
                { label: 'Org Chem', value: 42 },
                { label: 'Inorg Chem', value: 36 },
                { label: 'Botany/Zoo', value: 40 },
                { label: 'NTSE Math', value: 24 },
              ]}
              color="#0ea5e9"
            />
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">⭐ Student Feedback Ratings</h4>
            <p className="text-xs text-emerald-700 leading-relaxed mb-4">
              96.8% favorable feedback for subject clarity, doubt resolution speed and speed of homework checking submitted via Student Mobile App.
            </p>
            <button onClick={() => onNavigate('subjects_workload')} className="w-full py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm transition">
              View Faculty Workload Planner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
