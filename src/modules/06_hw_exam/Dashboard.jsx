import React from 'react';
import { BookOpen, Award, CheckCircle2, FileCheck, TrendingUp } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';

export default function Dashboard({ exams = [], selectedInstituteCode }) {
  const filtered = exams.filter(e => selectedInstituteCode === 'all' || e.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Homework & Examination Command Hub</h1>
        <p className="text-xs text-slate-500 mt-0.5">Competitive exam results, student homework submission velocity, and parent report sign-offs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Tests & Exams" value={`${filtered.length} Conducted`} subtext="Weekly & Mock Series" icon={BookOpen} color="blue" badge="Term Series" />
        <KPICard title="Network Avg Score" value="82.4%" subtext="Above Competitive Cutoff" icon={Award} color="green" badge="High Rank" />
        <KPICard title="HW Submission Rate" value="94.8%" subtext="Uploaded via Student App" icon={CheckCircle2} color="purple" badge="94% Submissions" />
        <KPICard title="Parent Signed Reports" value="98.2%" subtext="Digital App Approval" icon={FileCheck} color="amber" badge="Verified" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceBarChart title="Class Exam Participation Compliance" target={100} current={98} statusMessage="98% student attendance in JEE/NEET term tests" />
        <ApprovalFlowStepper title="Test Paper Release & Moderation Flow" subtitle="Draft -> Head Moderation -> Printing -> Mobile Upload" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Recent Test Results & Evaluation</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Exam Title</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Max Marks</th>
                <th className="p-3">Class Avg</th>
                <th className="p-3 text-right">Top Ranker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{e.title}</td>
                  <td className="p-3 text-slate-600">{e.instituteName}</td>
                  <td className="p-3 font-semibold">{e.batchName}</td>
                  <td className="p-3 font-mono">{e.maxScore}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{e.avgScore}</td>
                  <td className="p-3 text-right font-bold text-indigo-600">{e.topRanker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
