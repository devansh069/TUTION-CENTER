import React from 'react';
import { Calendar, BookOpen, Users, Video, Clock } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import CalendarMatrix from '../../components/common/CalendarMatrix';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';

export default function Dashboard({ batches = [], selectedInstituteCode }) {
  const filtered = batches.filter(b => selectedInstituteCode === 'all' || b.instituteCode === selectedInstituteCode);
  const totalStudents = filtered.reduce((s, b) => s + b.students, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Batches & Academics Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">Live timetable schedules, classroom capacity utilization, and curriculum progression.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Active Batches" value={`${filtered.length} Batches`} subtext="In Session Today" icon={Calendar} color="blue" badge="Live" />
        <KPICard title="Batch Enrollment" value={`${totalStudents} Seats`} subtext="Seat Load Capacity" icon={Users} color="green" badge="88% Fill" />
        <KPICard title="Syllabus Completion" value="78.5% Avg" subtext="Target: Nov 15th" icon={BookOpen} color="amber" badge="On Track" />
        <KPICard title="Live Hybrid Streams" value="14 Active" subtext="Broadcasted to App" icon={Video} color="purple" badge="HD Zero Jitter" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarMatrix title="Master Batch Lecture Timesheet" subtitle="September, 2026 Timetable" />
        <ApprovalFlowStepper title="Curriculum Lesson Plan Approval Pipeline" subtitle="Teacher Draft -> Dept Head -> Director -> Published" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Live Session Master Roster</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Batch & ID</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Faculty</th>
                <th className="p-3">Room & Timing</th>
                <th className="p-3">Syllabus %</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{b.name} <span className="text-slate-400 font-mono font-normal">({b.id})</span></td>
                  <td className="p-3 text-slate-600">{b.instituteName}</td>
                  <td className="p-3 font-bold text-slate-800">{b.teacher}</td>
                  <td className="p-3 text-slate-600">{b.room} • {b.time}</td>
                  <td className="p-3 font-bold text-indigo-600">{b.syllabusPct}% Done</td>
                  <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
