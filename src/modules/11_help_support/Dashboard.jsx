import React from 'react';
import { HelpCircle, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { ComplianceBarChart } from '../../components/common/Charts';

export default function Dashboard({ tickets = [], selectedInstituteCode }) {
  const filtered = tickets.filter(t => selectedInstituteCode === 'all' || t.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <HelpCircle className="w-6 h-6 mr-2 text-indigo-600" /> Help & Support Command Hub
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Customer service helpdesk queue, parent ticket resolutions, and campus hardware SLAs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Open Tickets" value={`${filtered.filter(t => t.status !== 'Resolved').length} Open`} subtext="Incoming Queries" icon={HelpCircle} color="blue" badge="Active" />
        <KPICard title="Mean Resolution Time" value="1.4 Hours" subtext="SLA: Under 4 Hours" icon={Clock} color="green" badge="SLA Met" />
        <KPICard title="Resolved Tickets" value={`${filtered.filter(t => t.status === 'Resolved').length} Resolved`} subtext="This Term" icon={CheckCircle2} color="purple" badge="Closed" />
        <KPICard title="Critical Escalations" value="1 Ticket" subtext="Hardware Turnstile" icon={AlertTriangle} color="rose" badge="Urgent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceBarChart title="Helpdesk SLA Resolution Compliance" target={100} current={96} statusMessage="96% tickets resolved within 4-hour target SLA window" />
        <ApprovalFlowStepper title="Ticket Escalation Resolution Pipeline" subtitle="Ticket Logged -> Triage -> Dept Lead -> Resolved" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Support Ticket Queue</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Ticket #</th>
                <th className="p-3">Issue Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">SLA Time Left</th>
                <th className="p-3">Priority</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-600">{t.ticketNo}</td>
                  <td className="p-3 font-bold text-slate-900">{t.title}</td>
                  <td className="p-3 text-slate-600">{t.category}</td>
                  <td className="p-3 font-mono text-slate-600">{t.slaTimeLeft}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${t.priority === 'Critical' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>{t.priority}</span></td>
                  <td className="p-3 text-right font-bold text-emerald-600">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
