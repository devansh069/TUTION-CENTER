import React from 'react';
import { MOCK_FACULTY } from '../../data/erpData';

export default function FacultyWorkloadPlanner({ instituteCode }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-800">Faculty Weekly Workload & Capacity Planner</h2>
            <p className="text-xs text-slate-500">Analyze lecture load, doubt room hours, paper setting and avoid educator burnout</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
              Average Utilization: 86.4%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_FACULTY.map((f, i) => {
            const load = 20 + (i * 2);
            const max = 28;
            const pct = Math.round((load / max) * 100);
            return (
              <div key={f.id} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      {f.name.split(' ')[1]?.[0] || 'F'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-xs">{f.name} ({f.subject})</div>
                      <div className="text-[11px] text-slate-500">{f.center} • {f.designation}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800">{load} hrs / week</span>
                    <span className="text-[11px] text-slate-500 ml-1">({pct}% capacity)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pct > 90 ? 'bg-rose-500' : pct > 75 ? 'bg-blue-600' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
