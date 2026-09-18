import React from 'react';
import { Briefcase, Search, Star } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function RecruitmentPipeline({ applicants = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Recruitment Pipeline Board</h1>
        <p className="text-xs text-slate-500 mt-0.5">Track educator candidate milestones from application to campus onboarding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applicants.map(a => (
          <div key={a.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{a.candidateName}</h4>
                <p className="text-xs text-indigo-600 font-medium">{a.role}</p>
              </div>
              <span className="text-xs font-bold text-amber-500">★ {a.rating}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
              <p>Experience: <strong className="text-slate-800">{a.experience}</strong></p>
              <p>Degree: <strong className="text-slate-800">{a.qualification}</strong></p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-700">{a.stage}</span>
              <button className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-600 hover:text-white transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
