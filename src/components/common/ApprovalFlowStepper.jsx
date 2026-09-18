import React from 'react';
import { Send, CheckCircle2, Clock, XCircle, ShieldCheck } from 'lucide-react';

export default function ApprovalFlowStepper({ title = "Approval Workflow Status", subtitle = "September, 2026 Cycle" }) {
  const steps = [
    { name: 'Submitted', role: 'Staff / Faculty', status: 'done', icon: Send },
    { name: 'L1 Center Review', role: 'Dept Head', status: 'done', icon: CheckCircle2 },
    { name: 'L2 Accounts Check', role: 'Finance Desk', status: 'done', icon: CheckCircle2 },
    { name: 'L3 Campus Director', role: 'Center Admin', status: 'done', icon: CheckCircle2 },
    { name: 'L4 Regional Audit', role: 'Regional Lead', status: 'current', icon: Clock },
    { name: 'Super Admin Release', role: 'Company Owner', status: 'upcoming', icon: ShieldCheck },
  ];

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-heading text-base font-bold text-slate-900">{title}</h3>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{subtitle}</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          Stage 4 of 6 Active
        </span>
      </div>

      {/* Metric Breakdown Bars */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center"><Send className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Submitted Invoices / Batches</span>
          <span className="text-slate-900 font-mono">184 hrs (100%)</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div className="w-full bg-blue-500 h-full rounded-full" />
        </div>

        <div className="flex justify-between text-xs font-bold text-slate-700 pt-1">
          <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Center Verified & Approved</span>
          <span className="text-emerald-700 font-mono">142 hrs (77%)</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div className="w-[77%] bg-emerald-500 h-full rounded-full" />
        </div>
      </div>

      {/* Step Flow Nodes (Matching Screenshot 2 Flow) */}
      <div className="pt-3 border-t border-slate-100">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
          Multi-Tier Approval Pipeline
        </div>
        <div className="flex items-center justify-between relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            let badgeBg = "bg-slate-100 text-slate-400 border-slate-200";
            if (step.status === 'done') badgeBg = "bg-emerald-50 text-emerald-600 border-emerald-300";
            if (step.status === 'current') badgeBg = "bg-amber-50 text-amber-600 border-amber-300 ring-2 ring-amber-400/30";

            return (
              <div key={idx} className="flex flex-col items-center text-center group cursor-pointer">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${badgeBg} shadow-xs transition-transform group-hover:scale-110`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 mt-1.5 whitespace-nowrap">{step.name}</span>
                <span className="text-[9px] text-slate-400 font-medium">{step.role}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
