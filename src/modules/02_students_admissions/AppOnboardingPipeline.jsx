import React, { useState, useMemo } from 'react';
import KPICard from '../../components/common/KPICard';
import { STUDENTS_DATA } from '../../data/erpData';

export default function AppOnboardingPipeline({ instituteCode = 'ALL' }) {
  const [selectedStage, setSelectedStage] = useState('ALL');

  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((s) => {
      return instituteCode === 'ALL' || s.instituteCode === instituteCode;
    });
  }, [instituteCode]);

  const stages = [
    {
      id: 'App Link Sent',
      label: '1. App Invite Sent',
      desc: 'SMS & Email link sent to parent',
      color: 'border-l-indigo-500',
      badgeBg: 'bg-indigo-50 text-indigo-700'
    },
    {
      id: 'Photo Upload Pending',
      label: '2. Biometric Photo Setup',
      desc: 'Facial AI registration at gate',
      color: 'border-l-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700'
    },
    {
      id: 'First Fee Pending',
      label: '3. Fees & Kit Clearance',
      desc: 'Installment 1 & books release',
      color: 'border-l-blue-500',
      badgeBg: 'bg-blue-50 text-blue-700'
    },
    {
      id: 'Fully Active',
      label: '4. Fully Onboarded & Active',
      desc: 'Parent app linked & biometric verified',
      color: 'border-l-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="App Invites Generated"
          value="4,890 Sent"
          subtitle="SMS & WhatsApp OTP Links"
          icon="📱"
          badge="100% Sent"
        />
        <KPICard
          theme="emerald"
          title="Parent App Adoption"
          value="89.4% Rate"
          subtitle="4,210 Active Mobile Logins"
          icon="👨‍👩‍👧"
          badge="Daily Active"
        />
        <KPICard
          theme="amber"
          title="Facial Check-in Ready"
          value="3,980 Faces"
          subtitle="Edge Camera Neural Models"
          icon="📸"
          badge="99.2% Accuracy"
        />
        <KPICard
          theme="rose"
          title="Kit & Books Handed"
          value="96.2% Handed"
          subtitle="Physical Modules Dispatched"
          icon="📦"
          badge="Tracked"
        />
      </div>

      {/* Onboarding Stage Pipeline Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-900">Student & Parent Mobile App Onboarding Pipeline</h2>
            <p className="text-xs text-slate-500">
              Track student onboarding progression from inquiry to facial capture, fee clearance, starter kit handover and mobile parent linking
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
              Avg Onboarding Time: 18 Mins
            </span>
          </div>
        </div>

        {/* 4 Stage Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((stg) => {
            const list = filteredStudents.filter((s) => s.onboardingStage === stg.id);
            return (
              <div key={stg.id} className="bg-slate-50/70 rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between">
                <div>
                  <div className={`p-3 bg-white rounded-xl border border-slate-200 border-l-4 ${stg.color} shadow-2xs mb-3`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-900">{stg.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${stg.badgeBg}`}>
                        {list.length} Students
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{stg.desc}</p>
                  </div>

                  {/* Student Cards in Stage */}
                  <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
                    {list.map((s) => (
                      <div
                        key={s.id}
                        className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={s.avatar}
                              alt={s.name}
                              className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                            />
                            <div>
                              <div className="font-bold text-slate-900 text-xs">{s.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{s.rollNo}</div>
                            </div>
                          </div>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            s.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {s.feeStatus}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-600 space-y-0.5">
                          <div>Campus: <strong className="text-slate-800">{s.instituteName}</strong></div>
                          <div>Batch: <span className="font-medium text-blue-600">{s.batchName}</span></div>
                          <div>Parent: {s.parentName} ({s.parentPhone})</div>
                        </div>

                        {/* Deliverables checklist */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <span className={`font-bold ${s.bookSetReceived ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {s.bookSetReceived ? '✓ Books Issued' : '⏳ Books Pending'}
                          </span>
                          <span className={`font-bold ${s.facialVerified ? 'text-blue-600' : 'text-rose-500'}`}>
                            {s.facialVerified ? '✓ Face Enrolled' : '⏳ Face Pending'}
                          </span>
                        </div>
                      </div>
                    ))}

                    {list.length === 0 && (
                      <div className="p-6 text-center text-xs text-slate-400 italic">
                        All students cleared past this step
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80">
                  <button 
                    onClick={() => alert(`Triggering auto-follow-up alerts for ${stg.label}`)}
                    className="w-full py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] rounded-xl transition text-center shadow-2xs"
                  >
                    Ping Pending Students 🔔
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
