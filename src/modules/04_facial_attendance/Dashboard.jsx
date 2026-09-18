import React from 'react';
import { Camera, CheckCircle2, Clock, AlertTriangle, UserCheck, ShieldCheck } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import CalendarMatrix from '../../components/common/CalendarMatrix';
import { ComplianceBarChart } from '../../components/common/Charts';

export default function Dashboard({ logs = [], selectedInstituteCode }) {
  const filtered = logs.filter(l => selectedInstituteCode === 'all' || l.instituteCode === selectedInstituteCode);
  const onTime = filtered.filter(l => l.status === 'On Time').length;
  const late = filtered.filter(l => l.status.includes('Late')).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Camera className="w-6 h-6 mr-2 text-indigo-600" /> Facial Check-in AI & Attendance Command Hub
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Live entrance camera streams, biometric match confidence, and automated parent SMS notifications.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Today Check-ins" value={filtered.length.toString()} subtext="Live Facial Matches" icon={UserCheck} color="blue" badge="AI Active" />
        <KPICard title="On-Time Rate" value="94.2%" subtext="Prompt Arrival" icon={CheckCircle2} color="green" badge="High" />
        <KPICard title="Late Check-ins" value={`${late} Flagged`} subtext="Parent SMS Dispatched" icon={Clock} color="amber" badge="Alert" />
        <KPICard title="AI Confidence Avg" value="98.9%" subtext="Zero False Positives" icon={ShieldCheck} color="purple" badge="SOC2 Certified" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarMatrix title="Campus Biometric Attendance Matrix" subtitle="September, 2026 Student Check-in Log" />
        <ComplianceBarChart title="Daily Entrance Stream Compliance" target={100} current={94} statusMessage="94% students checked in within 10 minutes of gate open" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Live Entrance Camera Event Stream</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.slice(0, 6).map(l => (
            <div key={l.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3">
              <img src={l.photo} alt={l.studentName} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-slate-900 truncate">{l.studentName}</p>
                <p className="text-[11px] text-slate-500">{l.cameraDoor}</p>
                <div className="flex justify-between items-center text-[10px] pt-1">
                  <span className="font-bold text-emerald-600">{l.status}</span>
                  <span className="font-mono text-slate-400">{l.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
