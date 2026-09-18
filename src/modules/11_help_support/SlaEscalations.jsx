import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, Clock, ShieldCheck, CheckCircle2, User, 
  ArrowRight, Bell, Zap, RefreshCw, Phone, ShieldAlert, Sparkles
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { MOCK_TICKETS } from './helpSupportData';

export default function SlaEscalations({ instituteCode = 'ALL' }) {
  const [tickets, setTickets] = useState(MOCK_TICKETS);

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter escalations / tickets approaching SLA deadline
  const escalatedTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchCampus = isAllInstitutes || t.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const isUrgent = t.status !== 'Resolved' && (t.slaElapsedPct >= 60 || t.priority === 'Critical');
      return matchCampus && isUrgent;
    });
  }, [tickets, instituteCode, isAllInstitutes]);

  const handleDispatchAction = (ticketId, actionName) => {
    alert(`Escalation Action Executed: "${actionName}" for Ticket #${ticketId}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold border border-rose-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              Real-Time SLA Guardian
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Turnaround SLA: 4.0 Hours Max Guarantee
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            SLA Escalations & Incident Breach Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mission-critical monitor for issues approaching SLA expiration, hardware turnstile disruptions, and director intervention triggers.
          </p>
        </div>

        {/* Live Auto-Refresh indicator */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
          <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
          <span>Polling Live SLAs (10s)</span>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="rose"
          title="At-Risk of SLA Breach"
          value={`${escalatedTickets.length} Incidents`}
          subtitle="Elapsed >60% of SLA Window"
          icon="⚠️"
          badge="Urgent Action"
        />
        <KPICard
          theme="emerald"
          title="Breached Tickets Today"
          value="0 Breaches"
          subtitle="100% On-Time Record"
          icon="🛡️"
          badge="Clean Record"
        />
        <KPICard
          theme="indigo"
          title="First Response Velocity"
          value="11.4 Mins"
          subtitle="Target: Under 20 Mins"
          icon="⚡"
          badge="Rapid Triage"
        />
        <KPICard
          theme="amber"
          title="Director Interventions"
          value="1 Active Level 3"
          subtitle="Turnstile Hardware Override"
          icon="🚨"
          badge="Monitored"
        />
      </div>

      {/* Active Escalation Incident Cards */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <span>Active Burning SLA Escalations Queue</span>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
            {escalatedTickets.length} Critical
          </span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {escalatedTickets.map(ticket => (
            <div
              key={ticket.id}
              className="p-5 rounded-2xl bg-white border-2 border-rose-200 shadow-sm space-y-4 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    SLA
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-rose-600">{ticket.ticketNo}</span>
                      <span className="text-slate-300">•</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        {ticket.escalationLevel}
                      </span>
                      <span className="text-xs text-slate-500">{ticket.instituteName}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{ticket.title}</h4>
                  </div>
                </div>

                {/* Remaining SLA countdown */}
                <div className="text-right">
                  <div className="text-xs font-bold text-rose-600 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    <span>{ticket.slaTimeLeft}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Total SLA: {ticket.slaHoursTotal}h Window</div>
                </div>
              </div>

              {/* Burn Rate Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>SLA Time Expended: {ticket.slaElapsedPct}%</span>
                  <span className="text-rose-600 font-bold">Action Needed Before Breach</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${ticket.slaElapsedPct}%` }}
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full transition-all duration-300"
                  />
                </div>
              </div>

              {/* Context and Assigned Agent */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-slate-500">Student: <strong className="text-slate-800">{ticket.studentName}</strong> • {ticket.parentName} ({ticket.parentPhone})</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{ticket.description}</p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <span className="text-slate-400 text-[10px] block">Assigned Lead:</span>
                  <strong className="text-slate-800">{ticket.assignedAgent}</strong>
                </div>
              </div>

              {/* Escalation Action Bar */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  Trigger Escalation Protocol:
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDispatchAction(ticket.ticketNo, 'Emergency Staff SMS Push')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                  >
                    Ping Assigned Agent
                  </button>
                  <button
                    onClick={() => handleDispatchAction(ticket.ticketNo, 'Technician Auto-Dispatch')}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-xl transition flex items-center gap-1"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dispatch Specialist</span>
                  </button>
                  <button
                    onClick={() => handleDispatchAction(ticket.ticketNo, 'Director Executive Override')}
                    className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Director Override</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware Telemetry Alert Box */}
      <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            Connected Campus Turnstiles & Server Node Health
          </h4>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
            7 of 8 Nodes Healthy
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Gate A Turnstile #1 at Alpha Institute has logged 2 facial confidence degradations due to morning light glares. Automated camera exposure re-calibration script deployed.
        </p>
      </div>
    </div>
  );
}
