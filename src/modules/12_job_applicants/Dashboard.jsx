import React from 'react';
import { Briefcase, Users, Star, CheckCircle2 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { ComplianceBarChart } from '../../components/common/Charts';

export default function Dashboard({ applicants = [], selectedInstituteCode }) {
  const filtered = applicants.filter(a => selectedInstituteCode === 'all' || a.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-indigo-600" /> Faculty Recruitment & Job Applicants Hub
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Educator hiring pipeline, demo lectures evaluation scorecards, and offer releases.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Active Candidates" value={`${filtered.length} Applicants`} subtext="Faculty Pipeline" icon={Users} color="blue" badge="Active" />
        <KPICard title="Demo Lectures Set" value="4 Demos" subtext="Scheduled This Week" icon={Star} color="amber" badge="In Evaluation" />
        <KPICard title="Offers Extended" value="1 Selected" subtext="CA Faculty London" icon={CheckCircle2} color="green" badge="Offer Out" />
        <KPICard title="Candidate Acceptance" value="88.5%" subtext="High Sourcing Fit" icon={Briefcase} color="purple" badge="High" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceBarChart title="Faculty Hiring Target vs Onboarded" target={12} current={10} statusMessage="10 out of 12 required senior faculty positions filled" />
        <ApprovalFlowStepper title="Faculty Recruitment & Hiring Pipeline" subtitle="Applied -> Screening -> Demo Lecture -> Director Round -> Offer" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Current Candidate Pipeline</h3>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Candidate</th>
              <th className="p-3">Role Applied</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Stage</th>
              <th className="p-3 text-right">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(a => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{a.candidateName} <span className="text-slate-400 font-normal">({a.qualification})</span></td>
                <td className="p-3 text-slate-700 font-semibold">{a.role}</td>
                <td className="p-3 text-slate-600">{a.experience}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px]">{a.stage}</span></td>
                <td className="p-3 text-right font-bold text-amber-500">★ {a.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
