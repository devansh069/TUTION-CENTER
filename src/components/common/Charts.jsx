import React, { useState } from 'react';
import { BarChart3, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

export function ComplianceBarChart({ data, title = 'Monthly Compliance', target = 184, current = 92, statusMessage = "Compliance on track this month" }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-heading text-base font-bold text-slate-900">{title}</h3>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Working month: Sep 2026</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          Target: {target}h / Current: {current}h
        </span>
      </div>

      {/* SVG Bar Visualization */}
      <div className="h-44 flex items-end justify-around pt-6 pb-2 border-b border-slate-100">
        <div className="flex flex-col items-center h-full justify-end group">
          <span className="text-xs font-bold text-blue-600 mb-1">{target}</span>
          <div style={{ height: '85%' }} className="w-10 rounded-t-lg bg-blue-600 shadow-xs group-hover:scale-105 transition-transform" />
          <span className="text-[11px] mt-2 font-bold text-slate-600">Total Required</span>
        </div>

        <div className="flex flex-col items-center h-full justify-end group">
          <span className="text-xs font-bold text-cyan-600 mb-1">{current}</span>
          <div style={{ height: '48%' }} className="w-10 rounded-t-lg bg-cyan-500 shadow-xs group-hover:scale-105 transition-transform" />
          <span className="text-[11px] mt-2 font-bold text-slate-600">Logged</span>
        </div>

        <div className="flex flex-col items-center h-full justify-end group">
          <span className="text-xs font-bold text-emerald-600 mb-1">{Math.round(current * 0.95)}</span>
          <div style={{ height: '44%' }} className="w-10 rounded-t-lg bg-emerald-500 shadow-xs group-hover:scale-105 transition-transform" />
          <span className="text-[11px] mt-2 font-bold text-slate-600">Approved</span>
        </div>

        <div className="flex flex-col items-center h-full justify-end group">
          <span className="text-xs font-bold text-amber-600 mb-1">{target - current}</span>
          <div style={{ height: '40%' }} className="w-10 rounded-t-lg bg-amber-400 shadow-xs group-hover:scale-105 transition-transform" />
          <span className="text-[11px] mt-2 font-bold text-slate-600">Pending</span>
        </div>
      </div>

      <div className="mt-4 pt-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">{statusMessage}</span>
        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
          {Math.round((current / target) * 100)}% Rate
        </span>
      </div>
    </div>
  );
}

export function TrendAnalyticsChart({ data = [], title = 'Network Trajectory', subtitle = '6-Month gross performance metric' }) {
  const [activeIdx, setActiveIdx] = useState(data.length - 1);
  const maxVal = Math.max(...data.map(d => d.revenue || d.value || 100));

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" /> {title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-bold">
          <span className="flex items-center text-indigo-600"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 mr-1.5" /> Inflow ($)</span>
          <span className="flex items-center text-emerald-600"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 mr-1.5" /> Attendance %</span>
        </div>
      </div>

      <div className="h-52 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100">
        {data.map((item, idx) => {
          const val = item.revenue || item.value || 0;
          const heightPct = Math.round((val / maxVal) * 100);
          const isSelected = activeIdx === idx;

          return (
            <div 
              key={idx} 
              onMouseEnter={() => setActiveIdx(idx)}
              className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
            >
              {isSelected && (
                <div className="mb-2 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold shadow-md whitespace-nowrap">
                  ${(val / 1000).toFixed(1)}k
                </div>
              )}
              <div 
                style={{ height: `${heightPct}%` }}
                className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 ${
                  isSelected ? 'bg-indigo-600 scale-105 shadow-md shadow-indigo-500/20' : 'bg-indigo-100 hover:bg-indigo-200'
                }`}
              />
              <span className={`text-xs mt-3 font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-500'}`}>
                {item.month || `M${idx + 1}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
