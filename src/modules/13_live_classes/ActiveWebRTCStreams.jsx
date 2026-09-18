import React from 'react';
import { Video, Radio, Server, Zap } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function ActiveWebRTCStreams({ liveClasses = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Active Live Streams Telemetry</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time edge broadcaster health, student live chat moderation, and latency audits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {liveClasses.map(l => (
          <div key={l.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">● {l.status}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{l.title}</h4>
              </div>
              <span className="font-mono font-bold text-xs text-emerald-600">{l.viewers} Viewers</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
              <p>Faculty: <strong className="text-slate-800">{l.teacher}</strong> ({l.batchName})</p>
              <p>Server Node: <strong className="text-slate-800 font-mono">{l.serverNode}</strong></p>
              <p>Format: <strong className="text-slate-800">{l.resolution} @ {l.bitrate}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
