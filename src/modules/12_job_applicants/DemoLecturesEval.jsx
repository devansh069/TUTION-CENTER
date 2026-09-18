import React from 'react';
import { Star, Video, CheckCircle2 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function DemoLecturesEval({ applicants = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Video className="w-6 h-6 mr-2 text-indigo-600" /> Demo Lecture Evaluation Scorecards
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Faculty subject matter experts and senior director ratings on candidate teaching demos.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Demos Conducted" value="18 Demos" subtext="Recorded on WebRTC" icon={Video} color="blue" />
        <KPICard title="Avg Score" value="4.7 / 5.0" subtext="Pedagogy Benchmark" icon={Star} color="green" />
        <KPICard title="Subject Clarity" value="94.2%" subtext="Board Approval" icon={CheckCircle2} color="purple" />
        <KPICard title="Final Offers" value="4 Approved" subtext="Joining Next Month" icon={CheckCircle2} color="amber" />
      </div>
    </div>
  );
}
