import React from 'react';
import { AlertTriangle, Clock, ShieldCheck } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function SlaEscalations({ tickets = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-rose-600" /> SLA Escalation Tracker
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Tickets approaching breach thresholds and automated director notifications.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="At Risk of Breach" value="1 Ticket" subtext="Under 2h Remaining" icon={AlertTriangle} color="amber" />
        <KPICard title="SLA Breached" value="0 Tickets" subtext="100% On-Time" icon={ShieldCheck} color="green" />
        <KPICard title="Avg Response Time" value="12 Mins" subtext="First Contact" icon={Clock} color="blue" />
        <KPICard title="Director Escalations" value="0 Active" subtext="Smooth Operations" icon={ShieldCheck} color="purple" />
      </div>
    </div>
  );
}
