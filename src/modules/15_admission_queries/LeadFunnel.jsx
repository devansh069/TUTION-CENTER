import React, { useState } from 'react';

export default function LeadFunnel({ instituteCode }) {
  const [selectedStage, setSelectedStage] = useState('ALL');

  const stages = [
    { name: '1. New Web & Referral Inquiries', count: 1482, val: '₹11.2 Cr Potential', color: 'border-l-indigo-500' },
    { name: '2. Telephonic Academic Profiling', count: 964, val: '65.0% Qualified', color: 'border-l-blue-500' },
    { name: '3. Diagnostic Scholarship Test & Demo', count: 632, val: '42.6% Show Rate', color: 'border-l-amber-500' },
    { name: '4. Fee Offer Letter Issued', count: 420, val: '28.3% Closing Stage', color: 'border-l-purple-500' },
    { name: '5. Seat Token Paid & Enrolled', count: 318, val: '₹2.45 Cr Booked', color: 'border-l-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-800">Admissions Sales Funnel & Pipeline Velocity</h2>
            <p className="text-xs text-slate-500">Stage-by-stage drop-off analytics, counselor closing ratios and conversion velocity</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
              Current Conv Rate: 21.4%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {stages.map((stage, idx) => (
            <div key={idx} className={`p-4 rounded-xl bg-slate-50/80 border-l-4 ${stage.color} border border-slate-200 shadow-sm`}>
              <div className="text-[11px] font-bold text-slate-500 mb-1">{stage.name}</div>
              <div className="text-xl font-black text-slate-800">{stage.count}</div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-1">{stage.val}</div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl">
          <h4 className="text-xs font-bold text-blue-900 mb-1">Counselor Performance Benchmark (This Month)</h4>
          <p className="text-xs text-blue-700">
            Top Counselor: <strong>Pooja Nair (Kota)</strong> with 84 converted seats (₹65.2L). Second: <strong>Vikram Joshi (Mumbai)</strong> with 68 converted seats (₹54.8L).
          </p>
        </div>
      </div>
    </div>
  );
}
