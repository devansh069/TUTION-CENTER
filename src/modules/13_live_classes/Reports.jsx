import React, { useState } from 'react';
import { BarChart3, Download, Zap, Users, Sparkles, Video, ShieldCheck, CheckCircle2 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { LIVE_CLASSES_SCHEDULE_DATA } from '../../data/erpData';

export default function Reports({ activeTab: propActiveTab }) {
  const [currentTab, setCurrentTab] = useState(propActiveTab || 'rep_bandwidth');
  const tab = propActiveTab || currentTab;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-7 h-7 mr-2.5 text-indigo-600" /> WebRTC Streaming & Student Engagement Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Network edge node bandwidth utilization, stream concurrency, and AI speech transcript quality feedback.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center shadow-sm">
          <Download className="w-4 h-4 mr-1.5" /> Export Live Analytics (CSV)
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setCurrentTab('rep_bandwidth')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            tab === 'rep_bandwidth' || tab === 'rep_concurrency'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" /> Bandwidth & WebRTC Concurrency
        </button>

        <button
          onClick={() => setCurrentTab('rep_engagement')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            tab === 'rep_engagement' || tab === 'rep_attention'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" /> Student Live Attention & Speech Ratings
        </button>
      </div>

      {/* TAB 1: BANDWIDTH & CONCURRENCY */}
      {(tab === 'rep_bandwidth' || tab === 'rep_concurrency' || tab === 'reports') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Peak Concurrent Streams" value="1,840 Connections" subtext="Live Student Viewers" icon={Users} color="blue" />
            <KPICard title="Total Bandwidth Pushed" value="4.8 Tbps" subtext="Global CDN Edge" icon={Zap} color="green" />
            <KPICard title="Average WebRTC Latency" value="112 ms" subtext="Sub-Second Real Time" icon={ShieldCheck} color="purple" />
            <KPICard title="Stream Buffer Failures" value="0.02%" subtext="Zero Packet Loss" icon={CheckCircle2} color="amber" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-base">Live WebRTC Stream Node Concurrency Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Stream Title</th>
                    <th className="p-3">Batch</th>
                    <th className="p-3">Instructor</th>
                    <th className="p-3">Concurrent Viewers</th>
                    <th className="p-3">Bitrate Quality</th>
                    <th className="p-3 text-right">Edge Server Node</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LIVE_CLASSES_SCHEDULE_DATA.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{item.title}</td>
                      <td className="p-3 font-bold text-indigo-600">{item.batch}</td>
                      <td className="p-3 text-slate-800">{item.onlineTeacher}</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">{item.viewersJoined} / {item.totalEnrolled} Viewers</td>
                      <td className="p-3 font-mono text-slate-700">{item.bitrate}</td>
                      <td className="p-3 text-right font-mono font-semibold text-slate-500">{item.serverNode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT LIVE ATTENTION */}
      {(tab === 'rep_engagement' || tab === 'rep_attention') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Live Engagement Index" value="96.2%" subtext="Active Screen Focus" icon={Sparkles} color="blue" />
            <KPICard title="Doubts Asked in Meet" value="142 Questions" subtext="100% Teacher Answered" icon={Users} color="green" />
            <KPICard title="Avg Class Duration" value="88 Minutes" subtext="Full Retention" icon={Video} color="purple" />
            <KPICard title="AI Speech Rating Avg" value="95.1%" subtext="Calculated from Transcript" icon={CheckCircle2} color="amber" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-base">Student Live Attention & Speech Quality Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Class Title</th>
                    <th className="p-3">Target Batch</th>
                    <th className="p-3">Online Teacher</th>
                    <th className="p-3">Attendance Rate</th>
                    <th className="p-3">AI Speech Score</th>
                    <th className="p-3 text-right">Engagement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LIVE_CLASSES_SCHEDULE_DATA.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{item.title}</td>
                      <td className="p-3 text-slate-600">{item.batch}</td>
                      <td className="p-3 font-bold text-slate-800">{item.onlineTeacher}</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">{item.attendanceRate}% Joined</td>
                      <td className="p-3 font-mono font-bold text-indigo-600">{item.aiScore}%</td>
                      <td className="p-3 text-right">
                        <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          High Engagement
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
