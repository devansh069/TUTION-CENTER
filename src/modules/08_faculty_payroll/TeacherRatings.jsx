import React from 'react';
import { Star, MessageSquare, Award, CheckCircle2 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function TeacherRatings({ faculty = [], selectedInstituteCode }) {
  const filtered = faculty.filter(f => selectedInstituteCode === 'all' || f.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Star className="w-6 h-6 mr-2 text-amber-500 fill-amber-500" /> Faculty Reviews & Student Rating Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Anonymous student evaluations, lecture quality scorecards, and teaching benchmarks.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Global Educator Avg" value="4.84 / 5.0" subtext="14,200 Total Reviews" icon={Star} color="amber" />
        <KPICard title="5-Star Educators" value="85.4%" subtext="Top Tier Teaching" icon={Award} color="green" />
        <KPICard title="Student Responses" value="96.2%" subtext="High Survey Feedback" icon={MessageSquare} color="blue" />
        <KPICard title="Teaching Excellence" value="100% Retained" subtext="Zero Retention Loss" icon={CheckCircle2} color="purple" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Faculty Name</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Average Rating</th>
              <th className="p-3 text-right">Review Sentiment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(f => (
              <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{f.name}</td>
                <td className="p-3 text-slate-600">{f.instituteName}</td>
                <td className="p-3 font-semibold">{f.subject}</td>
                <td className="p-3 font-bold text-amber-500">★ {f.rating} / 5.0</td>
                <td className="p-3 text-right font-bold text-emerald-600">98% Positive Sentiment</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
