import React, { useState } from 'react';
import { Users, Video, Clock, CheckCircle2, AlertTriangle, Sparkles, Star } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { BATCH_SUBJECTS_TEACHERS_DATA } from '../../data/erpData';

export default function FacultyWorkloadPlanner() {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'online' | 'offline'

  const educatorsList = [];

  BATCH_SUBJECTS_TEACHERS_DATA.forEach(item => {
    // Online Teacher
    educatorsList.push({
      id: item.onlineTeacher.id,
      name: item.onlineTeacher.name,
      type: 'Online Educator',
      batch: item.batch,
      subject: item.subject,
      photo: item.onlineTeacher.photo,
      rating: item.onlineTeacher.rating,
      aiScore: item.onlineTeacher.aiScore,
      weeklyHours: 24,
      maxHours: 28,
      status: item.onlineTeacher.status
    });

    // Offline Teacher
    educatorsList.push({
      id: item.offlineTeacher.id,
      name: item.offlineTeacher.name,
      type: 'Offline Educator',
      batch: item.batch,
      subject: item.subject,
      photo: item.offlineTeacher.photo,
      rating: item.offlineTeacher.rating,
      aiScore: item.offlineTeacher.aiScore,
      weeklyHours: 22,
      maxHours: 28,
      status: item.offlineTeacher.status
    });
  });

  const filtered = educatorsList.filter(e => {
    if (filterType === 'online') return e.type.includes('Online');
    if (filterType === 'offline') return e.type.includes('Offline');
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-indigo-600" /> Faculty Weekly Workload & Capacity Planner
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Workload distribution for Online Stream Educators vs Offline Classroom Educators per batch.
          </p>
        </div>

        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
          >
            All Educators
          </button>
          <button
            onClick={() => setFilterType('online')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center ${filterType === 'online' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
          >
            <Video className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Online Only
          </button>
          <button
            onClick={() => setFilterType('offline')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center ${filterType === 'offline' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
          >
            <Users className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Offline Only
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Assigned Faculty" value={`${educatorsList.length} Teachers`} subtext="Dual Mode Allocation" icon={Users} color="blue" />
        <KPICard title="Average Workload" value="23 Hrs / Week" subtext="Optimal Ceiling 28 Hrs" icon={Clock} color="green" />
        <KPICard title="Online Stream Load" value="96 Hours Total" subtext="4 Batches Streamed" icon={Video} color="purple" />
        <KPICard title="Offline Lab & Class" value="88 Hours Total" subtext="In-Person Lectures" icon={CheckCircle2} color="amber" />
      </div>

      {/* Workload Roster Cards */}
      <div className="space-y-4">
        {filtered.map((e) => {
          const pct = Math.round((e.weeklyHours / e.maxHours) * 100);
          return (
            <div key={e.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={e.photo} alt={e.name} className="w-11 h-11 rounded-xl object-cover border border-slate-300" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{e.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        e.type.includes('Online') ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {e.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{e.batch} • {e.subject}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-700">
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">{e.weeklyHours} hrs / week</span>
                    <span className="text-[11px] text-slate-500 block">({pct}% capacity)</span>
                  </div>
                  <div className="text-right pl-3 border-l border-slate-200">
                    <span className="font-mono font-extrabold text-emerald-600 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Score: {e.aiScore}%
                    </span>
                    <span className="text-[10px] text-slate-400">⭐ {e.rating} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    pct > 90 ? 'bg-rose-500' : pct > 75 ? 'bg-indigo-600' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
