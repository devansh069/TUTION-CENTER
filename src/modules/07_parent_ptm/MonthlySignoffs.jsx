import React from 'react';
import { FileCheck, CheckCircle2, Clock, Smartphone } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function MonthlySignoffs({ ptms = [], selectedInstituteCode }) {
  const filtered = ptms.filter(p => selectedInstituteCode === 'all' || p.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <FileCheck className="w-6 h-6 mr-2 text-indigo-600" /> Monthly Report Digital Sign-off Tracker
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Parent verification and biometric/digital approval signatures on monthly student progress cards.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Reports Generated" value="4,890 PDFs" subtext="Monthly Batch Engine" icon={FileCheck} color="blue" />
        <KPICard title="Signed & Approved" value="98.2%" subtext="4,802 Parents Signed" icon={CheckCircle2} color="green" />
        <KPICard title="Pending Signatures" value="88 Reports" subtext="Push Reminder Sent" icon={Clock} color="amber" />
        <KPICard title="Mobile App Verified" value="100%" subtext="Secure OTP / Biometric" icon={Smartphone} color="purple" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Parent & Student</th>
              <th className="p-3">Campus</th>
              <th className="p-3">Monthly Report Period</th>
              <th className="p-3">Digital Signature</th>
              <th className="p-3 text-right">Approval Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{p.parentName} <span className="text-slate-400 font-normal">({p.studentName})</span></td>
                <td className="p-3 text-slate-600">{p.instituteName}</td>
                <td className="p-3 font-medium">September 2026 Monthly Card</td>
                <td className="p-3 font-mono text-[11px] text-slate-600">{p.reportSigned ? 'SIG-SHA256: 4f8a...92e1' : 'Pending Signature'}</td>
                <td className="p-3 text-right">
                  {p.reportSigned ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">✓ Signed & Approved</span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px]">Pending Parent Sign-off</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
