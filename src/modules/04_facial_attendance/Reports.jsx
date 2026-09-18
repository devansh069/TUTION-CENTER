import React from 'react';
import { BarChart3, Download, Camera } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports({ logs = [], selectedInstituteCode }) {
  const filtered = logs.filter(l => selectedInstituteCode === 'all' || l.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Biometric AI Attendance Audit Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Biometric match accuracy benchmarks, camera uptime telemetry, and notification audits.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Facial Scans" value="4,890 Scans" subtext="This Month" icon={Camera} color="blue" />
        <KPICard title="Mean AI Confidence" value="98.9%" subtext="Model Precision" icon={BarChart3} color="green" />
        <KPICard title="Camera Uptime" value="99.98%" subtext="Network Reliability" icon={BarChart3} color="purple" />
        <KPICard title="Parent App Push Rate" value="100%" subtext="Zero Gateway Drops" icon={BarChart3} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Event ID</th>
              <th className="p-3">Student</th>
              <th className="p-3">Campus</th>
              <th className="p-3">AI Confidence</th>
              <th className="p-3">Door / Gate</th>
              <th className="p-3 text-right">Audit Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono text-indigo-600 font-bold">{l.id}</td>
                <td className="p-3 font-bold text-slate-900">{l.studentName}</td>
                <td className="p-3 text-slate-600">{l.instituteName}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{l.confidence}%</td>
                <td className="p-3 text-slate-600">{l.cameraDoor}</td>
                <td className="p-3 text-right font-bold text-emerald-600">Passed / Valid Match</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
