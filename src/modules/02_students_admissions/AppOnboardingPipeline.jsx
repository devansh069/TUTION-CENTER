import React from 'react';
import { Smartphone, Check, Clock, UserCheck, AlertCircle } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function AppOnboardingPipeline({ students = [], selectedInstituteCode }) {
  const filtered = students.filter(s => selectedInstituteCode === 'all' || s.instituteCode === selectedInstituteCode);
  const stages = ['App Link Sent', 'Photo Upload Pending', 'First Fee Pending', 'Fully Active'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Smartphone className="w-6 h-6 mr-2 text-indigo-600" /> Student & Parent Mobile App Onboarding Pipeline
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time status of student mobile app provisioning, biometric setup, and fee linkage.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total App Invites" value="4,890 Sent" subtext="SMS & Email Links" icon={Smartphone} color="blue" />
        <KPICard title="Downloaded & Logged" value="4,210 Active" subtext="86% Install Rate" icon={Check} color="green" />
        <KPICard title="Biometric Enrolled" value="3,980 Faces" subtext="AI Model Trained" icon={UserCheck} color="purple" />
        <KPICard title="Onboarding Dropout" value="3.2%" subtext="Under 5% Threshold" icon={AlertCircle} color="amber" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map(stage => {
          const stageStudents = filtered.filter(s => s.onboardingStage === stage);
          return (
            <div key={stage} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-800">{stage}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200">{stageStudents.length}</span>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {stageStudents.map(s => (
                  <div key={s.id} className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <p className="font-bold text-xs text-slate-900">{s.name}</p>
                    <p className="text-[11px] text-indigo-600 font-mono">{s.id}</p>
                    <p className="text-[10px] text-slate-500">Parent: {s.parentName}</p>
                  </div>
                ))}
                {stageStudents.length === 0 && (
                  <p className="text-xs text-slate-400 italic py-4 text-center">No students in this stage</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
