import React from 'react';
import { Camera, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function LiveBiometricStream({ logs = [], selectedInstituteCode }) {
  const filtered = logs.filter(l => selectedInstituteCode === 'all' || l.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Camera className="w-6 h-6 mr-2 text-indigo-600" /> Live AI Facial Stream & Door Feeds
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time snapshots from hardware tablets installed across tuition turnstiles.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Camera Nodes" value="10 Online" subtext="Turnstile Tablets" icon={Camera} color="blue" />
        <KPICard title="Match Latency" value="120 ms" subtext="Instant Gate Open" icon={Zap} color="green" />
        <KPICard title="Active Stream Health" value="100% Online" subtext="No Jitter Detected" icon={ShieldCheck} color="purple" />
        <KPICard title="Today Total Passes" value={filtered.length.toString()} subtext="Biometric Authenticated" icon={CheckCircle2} color="amber" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(l => (
          <div key={l.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start space-x-4 hover:shadow-md transition-all">
            <img src={l.photo} alt={l.studentName} className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-200 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 text-sm truncate">{l.studentName}</h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">{l.status}</span>
              </div>
              <p className="text-xs text-indigo-600 font-medium">{l.instituteName}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{l.cameraDoor}</p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
                <span>⏱️ {l.timestamp}</span>
                <span className="font-mono font-bold text-emerald-600">{l.confidence}% AI Match</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
