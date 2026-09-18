import React from 'react';
import { GraduationCap, Smartphone, Camera, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { ComplianceBarChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';

export default function Dashboard({ students = [], selectedInstituteCode }) {
  const filtered = students.filter(s => selectedInstituteCode === 'all' || s.instituteCode === selectedInstituteCode);
  const paidCount = filtered.filter(s => s.feeStatus === 'Paid').length;
  const defaulters = filtered.filter(s => s.feeStatus === 'Defaulter').length;
  const appUsers = filtered.filter(s => s.appStatus === 'Active').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Students & Admissions Command Hub</h1>
        <p className="text-xs text-slate-500 mt-0.5">Live student roster, mobile app onboarding health, fee status, and attendance telemetry.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Enrolled Students" value={filtered.length.toString()} subtext="Across Active Batches" icon={GraduationCap} color="blue" badge="Enrolled" />
        <KPICard title="Mobile App Active" value={`${appUsers} Users`} subtext="86% Daily Active Parents" icon={Smartphone} color="green" badge="Connected" />
        <KPICard title="Biometric AI Verified" value={`${filtered.filter(s => s.facialVerified).length} Students`} subtext="Facial Check-in Ready" icon={Camera} color="purple" badge="High Confidence" />
        <KPICard title="Fee Defaulters" value={`${defaulters} Students`} subtext="Auto-reminder queued" icon={AlertTriangle} color="rose" badge="Action Required" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceBarChart title="Student Monthly Attendance Compliance" target={100} current={94} statusMessage="Average attendance is above 91% network target" />
        <ApprovalFlowStepper title="Admission & Mobile Onboarding Flow" subtitle="Inquiry -> Admission Form -> Fee Payment -> App Setup" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading text-base font-bold text-slate-900">Recent Student Admissions</h3>
          <span className="text-xs font-bold text-slate-500">{filtered.length} Students</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Student & ID</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Batch & Grade</th>
                <th className="p-3">Parent Name</th>
                <th className="p-3">App Sync</th>
                <th className="p-3 text-right">Fee Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900 flex items-center space-x-2">
                    <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-lg object-cover border border-slate-200" />
                    <span>{s.name} <span className="text-slate-400 font-mono font-normal">({s.id})</span></span>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{s.instituteName}</td>
                  <td className="p-3 text-slate-700">{s.batchName} ({s.grade})</td>
                  <td className="p-3 text-slate-600">{s.parentName}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">📱 {s.appStatus}</span></td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${s.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{s.feeStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
