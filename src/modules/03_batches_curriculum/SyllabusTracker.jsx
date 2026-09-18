import React from 'react';
import { BookOpen, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function SyllabusTracker({ batches = [], selectedInstituteCode }) {
  const filtered = batches.filter(b => selectedInstituteCode === 'all' || b.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-indigo-600" /> Syllabus Tracker & Curriculum Pacing
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Topic-level curriculum pacing against target board and competitive exam timelines.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Average Completion" value="78.5%" subtext="Across All Batches" icon={CheckCircle2} color="green" />
        <KPICard title="Target Deadline" value="Nov 15, 2026" subtext="Before Mock Series" icon={Clock} color="blue" />
        <KPICard title="Batches On Track" value="85%" subtext="Optimal Pacing" icon={BookOpen} color="purple" />
        <KPICard title="Delay Alerts" value="2 Batches" subtext="Extra Classes Scheduled" icon={AlertTriangle} color="amber" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(b => (
          <div key={b.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 text-sm">{b.name}</h4>
              <span className="text-xs font-bold text-indigo-600">{b.syllabusPct}% Finished</span>
            </div>
            <p className="text-xs text-slate-500">{b.subject} • Faculty: <strong className="text-slate-800">{b.teacher}</strong></p>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div style={{ width: `${b.syllabusPct}%` }} className="bg-indigo-600 h-full rounded-full" />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
              <span>Classroom: {b.room}</span>
              <span className="text-emerald-600 font-bold">On Schedule</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
