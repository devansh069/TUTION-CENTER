import React, { useState } from 'react';
import { Building, MapPin, User, FileText, CheckCircle2, Clock, ChevronRight, Filter } from 'lucide-react';
import { ONBOARDING_PIPELINE } from './franchiseData';

export default function BranchOnboarding() {
  const [filter, setFilter] = useState('ALL');
  
  const filteredPipeline = filter === 'ALL' 
    ? ONBOARDING_PIPELINE 
    : ONBOARDING_PIPELINE.filter(app => app.stage === filter);

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Application Review': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Legal Agreement': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Infrastructure Setup': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">Branch Onboarding Pipeline</h2>
          <p className="text-xs text-slate-500">Track and manage new franchise applications and setup phases.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-xs text-xs">
          {['ALL', 'Application Review', 'Legal Agreement', 'Infrastructure Setup'].map(stage => (
            <button
              key={stage}
              onClick={() => setFilter(stage)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                filter === stage ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kanban-style lists or simple list view */}
        <div className="md:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredPipeline.map(app => (
              <div key={app.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <Building className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      {app.applicantName}
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-500 rounded">{app.id}</span>
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {app.location}</span>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {app.assignedManager}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Applied</div>
                    <div className="text-xs font-mono font-semibold text-slate-700">{app.appliedDate}</div>
                  </div>
                  
                  <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold w-40 text-center ${getStageColor(app.stage)}`}>
                    {app.stage}
                  </div>
                  
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
