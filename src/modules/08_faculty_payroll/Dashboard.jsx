import React from 'react';
import { Users, DollarSign, Star, Zap, TrendingUp } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import CalendarMatrix from '../../components/common/CalendarMatrix';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';

export default function Dashboard({ faculty = [], selectedInstituteCode }) {
  const filtered = faculty.filter(f => selectedInstituteCode === 'all' || f.instituteCode === selectedInstituteCode);
  const totalPayroll = filtered.reduce((s, f) => s + f.monthlySalary, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Faculty Roster & Payroll Command Hub</h1>
        <p className="text-xs text-slate-500 mt-0.5">Educator performance ratings, class workload hours, and monthly salary disbursements.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Teaching Faculty" value={`${filtered.length} Educators`} subtext="Under Management" icon={Users} color="blue" badge="Staff" />
        <KPICard title="Average Student Rating" value="4.84 / 5.0" subtext="From 14,200 Student Reviews" icon={Star} color="amber" badge="Exemplary" />
        <KPICard title="Monthly Payroll Overhead" value={`$${totalPayroll.toLocaleString()}`} subtext="Direct Bank Disbursals" icon={DollarSign} color="green" badge="Disbursed" />
        <KPICard title="Hourly Rate Average" value="$110 / hr" subtext="Senior Entrance Faculty" icon={Zap} color="purple" badge="Competitive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarMatrix title="Faculty Teaching Hours Timesheet" subtitle="September, 2026 Verified Workload Log" />
        <ApprovalFlowStepper title="Monthly Faculty Payroll Approval Pipeline" subtitle="Hours Verified -> Accountant Calc -> Director Sign -> Disbursed" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Faculty Staff Directory & Workload</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Educator & ID</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Subject Specialty</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Hours Taught</th>
                <th className="p-3 text-right">Monthly Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(f => (
                <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{f.name} <span className="text-slate-400 font-mono font-normal">({f.id})</span></td>
                  <td className="p-3 text-slate-600">{f.instituteName}</td>
                  <td className="p-3 font-semibold text-slate-800">{f.subject} ({f.qualification})</td>
                  <td className="p-3 font-bold text-amber-500">★ {f.rating}</td>
                  <td className="p-3 font-bold text-slate-700">{f.hoursTaught}h</td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-600">${f.monthlySalary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
