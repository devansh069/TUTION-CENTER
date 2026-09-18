import React from 'react';
import { BookOpen, CheckCircle2, Clock, Smartphone } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function HomeworkTracker({ exams = [], selectedInstituteCode }) {
  const filtered = exams.filter(e => (selectedInstituteCode === 'all' || e.instituteCode === selectedInstituteCode) && e.type === 'Homework');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-indigo-600" /> Daily Homework Assignments & Uploads
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Mobile app scan uploads, faculty evaluation timelines, and parent sign-offs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Assignments" value={`${filtered.length} HWs`} subtext="This Term" icon={BookOpen} color="blue" />
        <KPICard title="Mobile Upload Rate" value="94.8%" subtext="App PDF Scanner" icon={Smartphone} color="green" />
        <KPICard title="Evaluated on Time" value="96.2%" subtext="Faculty SLA" icon={CheckCircle2} color="purple" />
        <KPICard title="Parent Verified" value="92.0%" subtext="Signed in App" icon={Clock} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Homework Title</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Batch</th>
              <th className="p-3">Max Marks</th>
              <th className="p-3">Upload Rate</th>
              <th className="p-3 text-right">Parent Approval</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{e.title}</td>
                <td className="p-3 text-slate-600">{e.instituteName}</td>
                <td className="p-3 font-semibold text-slate-700">{e.batchName}</td>
                <td className="p-3 font-mono">{e.maxScore} Marks</td>
                <td className="p-3 font-bold text-indigo-600">{e.submissionPct}% Uploaded</td>
                <td className="p-3 text-right font-bold text-emerald-600">{e.parentApprovalPct}% Approved</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
