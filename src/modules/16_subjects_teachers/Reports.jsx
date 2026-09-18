import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Sparkles, 
  Star, 
  Users, 
  Video, 
  CheckCircle2, 
  PieChart, 
  TrendingUp 
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { BATCH_SUBJECTS_TEACHERS_DATA } from '../../data/erpData';

export default function Reports({ activeTab: propActiveTab }) {
  const [currentTab, setCurrentTab] = useState(propActiveTab || 'rep_utilization');
  const tab = propActiveTab || currentTab;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-7 h-7 mr-2.5 text-indigo-600" /> Faculty Utilization & AI Speech Feedback Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Comparative performance analytics for Online Stream Educators vs Offline Classroom Educators.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center shadow-sm">
          <Download className="w-4 h-4 mr-1.5" /> Export Faculty Report (CSV)
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setCurrentTab('rep_utilization')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            tab === 'rep_utilization' || tab === 'rep_hours'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Faculty Utilization Hours Curve
        </button>

        <button
          onClick={() => setCurrentTab('rep_feedback')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            tab === 'rep_feedback' || tab === 'rep_rating'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" /> AI Speech Rating & Feedback Breakdown
        </button>
      </div>

      {/* TAB 1: FACULTY UTILIZATION */}
      {(tab === 'rep_utilization' || tab === 'rep_hours' || tab === 'reports') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Average Weekly Load" value="23.4 Hours" subtext="Under 28h Max Ceiling" icon={TrendingUp} color="blue" />
            <KPICard title="Online Stream Load" value="96 Hours" subtext="WebRTC Masterclasses" icon={Video} color="green" />
            <KPICard title="Offline Classroom Load" value="88 Hours" subtext="In-Person Lectures & Labs" icon={Users} color="purple" />
            <KPICard title="Faculty Utilization Rate" value="94.2%" subtext="Optimal Distribution" icon={CheckCircle2} color="amber" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-base">Dual Educator Allocation Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Batch Name</th>
                    <th className="p-3">Subject Title</th>
                    <th className="p-3">Online Educator (Live)</th>
                    <th className="p-3">Offline Educator (Classroom)</th>
                    <th className="p-3 text-right">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BATCH_SUBJECTS_TEACHERS_DATA.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{item.batch}</td>
                      <td className="p-3 font-bold text-indigo-600">{item.subject}</td>
                      <td className="p-3 text-slate-800">{item.onlineTeacher.name} (Online)</td>
                      <td className="p-3 text-slate-800">{item.offlineTeacher.name} (Offline)</td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-600">46 Hrs / Batch</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI SPEECH RATING BREAKDOWN */}
      {(tab === 'rep_feedback' || tab === 'rep_rating') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Avg AI Speech Score" value="94.8%" subtext="Speech AI Speech-to-Text" icon={Sparkles} color="blue" />
            <KPICard title="Top Online Educator" value="Dr. Harrison Wells" subtext="94.8% Score ⭐ 4.9" icon={Star} color="green" />
            <KPICard title="Top Offline Educator" value="Prof. Rajesh Gupta" subtext="92.5% Score ⭐ 4.8" icon={Star} color="purple" />
            <KPICard title="Auto-Replacements" value="1 Replaced" subtext="Optimized Faculty Quality" icon={CheckCircle2} color="amber" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-base">Educator AI Speech Score & Quality Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Educator Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Batch & Subject</th>
                    <th className="p-3">AI Speech Score</th>
                    <th className="p-3">Student Star Rating</th>
                    <th className="p-3 text-right">Speech Quality Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BATCH_SUBJECTS_TEACHERS_DATA.map(item => (
                    <React.Fragment key={item.id}>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{item.onlineTeacher.name}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">Online</span></td>
                        <td className="p-3 text-slate-700">{item.batch} • {item.subject}</td>
                        <td className="p-3 font-mono font-bold text-emerald-600">{item.onlineTeacher.aiScore}%</td>
                        <td className="p-3 font-bold text-amber-600">⭐ {item.onlineTeacher.rating} / 5.0</td>
                        <td className="p-3 text-right text-slate-600 italic">"{item.onlineTeacher.transcriptionQuality}"</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{item.offlineTeacher.name}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">Offline</span></td>
                        <td className="p-3 text-slate-700">{item.batch} • {item.subject}</td>
                        <td className="p-3 font-mono font-bold text-slate-800">
                          <span className={item.offlineTeacher.aiScore < 70 ? 'text-rose-600 font-extrabold' : 'text-emerald-600'}>
                            {item.offlineTeacher.aiScore}%
                          </span>
                        </td>
                        <td className="p-3 font-bold text-amber-600">⭐ {item.offlineTeacher.rating} / 5.0</td>
                        <td className="p-3 text-right text-slate-600 italic">"{item.offlineTeacher.transcriptionQuality}"</td>
                      </tr>
                    </React.Fragment>
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
