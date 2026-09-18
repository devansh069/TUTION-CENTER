import React from 'react';
import { AlertTriangle, Clock, Send, CheckCircle2 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function LateAbsentAnomalies({ logs = [], selectedInstituteCode }) {
  const filtered = logs.filter(l => selectedInstituteCode === 'all' || l.instituteCode === selectedInstituteCode);
  const anomalies = filtered.filter(l => l.status.includes('Late') || l.status.includes('Absent'));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-rose-600" /> Late Arrivals & Absenteeism Exceptions
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Automated SMS dispatch audit and student anomaly counseling triggers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Anomaly Flags" value={`${anomalies.length} Students`} subtext="Late or Absent" icon={AlertTriangle} color="rose" />
        <KPICard title="Parent SMS Sent" value="100% Delivered" subtext="Automated App Push" icon={Send} color="green" />
        <KPICard title="Counselor Follow-up" value="4 Pending" subtext="Requires Call" icon={Clock} color="amber" />
        <KPICard title="Repeat Offenders" value="1 Student" subtext="3+ Lates this month" icon={AlertTriangle} color="purple" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Student & ID</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Incident Door</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Parent SMS Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {anomalies.map(l => (
              <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{l.studentName} <span className="text-slate-400 font-mono font-normal">({l.studentId})</span></td>
                <td className="p-3 text-slate-600">{l.instituteName}</td>
                <td className="p-3 text-slate-600">{l.cameraDoor} • {l.timestamp}</td>
                <td className="p-3"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">{l.status}</span></td>
                <td className="p-3 text-right font-bold text-emerald-600">✓ SMS Delivered to Parent</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
