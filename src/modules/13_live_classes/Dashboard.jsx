import React from 'react';
import { Video, Radio, Users, Server } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { ComplianceBarChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';

export default function Dashboard({ liveClasses = [], selectedInstituteCode }) {
  const filtered = liveClasses.filter(l => selectedInstituteCode === 'all' || l.instituteCode === selectedInstituteCode);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Video className="w-6 h-6 mr-2 text-indigo-600" /> Live Hybrid Classrooms & WebRTC Stream Hub
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time classroom broadcasters, bandwidth telemetry, and CDN lecture archives.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Active Live Rooms" value={`${filtered.filter(l => l.status.includes('Live')).length} Live`} subtext="Streaming to Mobile App" icon={Radio} color="rose" badge="ON AIR" />
        <KPICard title="Concurrent Viewers" value="312 Students" subtext="Real-Time App Stream" icon={Users} color="green" badge="Connected" />
        <KPICard title="Stream Bitrate" value="4.8 Mbps" subtext="1080p 60fps Crystal" icon={Video} color="blue" badge="Zero Jitter" />
        <KPICard title="Server Cluster" value="4 WebRTC Nodes" subtext="Global Edge CDN" icon={Server} color="purple" badge="Healthy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceBarChart title="WebRTC Stream Health & Jitter Audit" target={100} current={99} statusMessage="99.8% packet delivery with zero frame drops across centers" />
        <ApprovalFlowStepper title="Lecture Recording & CDN Archive Workflow" subtitle="Live Broadcast -> Real-time Transcode -> Cloud Video CDN -> Available in App" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Active Classroom Broadcasts</h3>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Stream Title</th>
              <th className="p-3">Batch</th>
              <th className="p-3">Instructor</th>
              <th className="p-3">Viewers</th>
              <th className="p-3">Bitrate</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-900">{l.title}</td>
                <td className="p-3 text-slate-600">{l.batchName}</td>
                <td className="p-3 font-semibold">{l.teacher}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{l.viewers} Watching</td>
                <td className="p-3 font-mono text-slate-500">{l.bitrate} ({l.resolution})</td>
                <td className="p-3 text-right"><span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">● {l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
