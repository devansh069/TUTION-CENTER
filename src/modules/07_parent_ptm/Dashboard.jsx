import React from 'react';
import { Smartphone, CalendarCheck, FileCheck, Star, Users } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import CalendarMatrix from '../../components/common/CalendarMatrix';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';

export default function Dashboard({ ptms = [], selectedInstituteCode }) {
  const filtered = ptms.filter(p => selectedInstituteCode === 'all' || p.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Parent App Engagement & PTM Command Hub</h1>
        <p className="text-xs text-slate-500 mt-0.5">Guardian mobile app logins, monthly student report digital sign-offs, and faculty meeting schedules.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Scheduled PTMs" value={`${filtered.length} Meetings`} subtext="Appointments Active" icon={CalendarCheck} color="blue" badge="PTM Active" />
        <KPICard title="Parent Trust Rating" value="4.9 / 5.0" subtext="From Monthly Reviews" icon={Star} color="green" badge="High Trust" />
        <KPICard title="Reports Approved" value="98.2%" subtext="Parent Digital Sign-off" icon={FileCheck} color="purple" badge="Signed" />
        <KPICard title="Parent App DAU" value="3,890 Logins" subtext="Daily Active Guardians" icon={Smartphone} color="amber" badge="86% Adoption" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarMatrix title="Parent-Teacher Meeting Appointment Slots" subtitle="September, 2026 Faculty Calendar" />
        <ApprovalFlowStepper title="Monthly Student Report Approval Flow" subtitle="Generated -> Sent to Parent App -> Reviewed -> Digitally Signed" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Upcoming Parent-Faculty Meetings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Parent & Student</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Faculty</th>
                <th className="p-3">Scheduled Slot</th>
                <th className="p-3">Meeting Agenda</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{p.parentName} <span className="text-slate-400 font-normal">({p.studentName})</span></td>
                  <td className="p-3 text-slate-600">{p.instituteName}</td>
                  <td className="p-3 font-semibold text-slate-800">{p.facultyName}</td>
                  <td className="p-3 text-slate-600">{p.scheduledDate} @ {p.timeSlot}</td>
                  <td className="p-3 text-slate-700">{p.agenda}</td>
                  <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px]">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
