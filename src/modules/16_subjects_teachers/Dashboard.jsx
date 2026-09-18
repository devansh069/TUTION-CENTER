import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Video, 
  UserCheck, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Zap, 
  Search, 
  Filter,
  ShieldAlert
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { BATCH_SUBJECTS_TEACHERS_DATA, BATCHES_DATA } from '../../data/erpData';

export default function Dashboard({ instituteCode = 'all' }) {
  const [data, setData] = useState(BATCH_SUBJECTS_TEACHERS_DATA);
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceToast, setReplaceToast] = useState(null);

  const targetCode = (instituteCode || 'all').toLowerCase();
  const filteredData = data.filter(item => {
    const matchInst = targetCode === 'all' || !item.instituteCode || item.instituteCode.toLowerCase() === targetCode;
    const matchBatch = selectedBatch === 'all' || item.batch === selectedBatch;
    const matchSearch = !searchQuery || 
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.onlineTeacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.offlineTeacher.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchInst && matchBatch && matchSearch;
  });

  const lowFeedbackCount = data.filter(d => d.replacementRecommended || d.onlineTeacher.aiScore < 70 || d.offlineTeacher.aiScore < 70).length;

  // Handle 1-Click AI Replacement of Educator
  const handleReplaceEducator = (subjectId, type) => {
    setData(prev => prev.map(item => {
      if (item.id === subjectId) {
        if (type === 'offline') {
          const oldName = item.offlineTeacher.name;
          const newName = item.backupTeacher || 'Pooja Kashyap, M.Sc';
          setReplaceToast({ oldName, newName, subject: item.subject });
          return {
            ...item,
            replacementRecommended: false,
            offlineTeacher: {
              ...item.offlineTeacher,
              name: newName,
              aiScore: 94.5,
              rating: 4.9,
              status: 'Replaced via AI Optimization',
              transcriptionQuality: 'High clarity & active student engagement'
            }
          };
        }
      }
      return item;
    }));

    setTimeout(() => {
      setReplaceToast(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Replacement Toast Alert */}
      {replaceToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-indigo-500/30 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <p className="font-bold text-sm text-indigo-300">⚡ Educator Auto-Replaced Successfully!</p>
            <p className="text-xs text-slate-300">
              Replaced <strong className="text-rose-300">{replaceToast.oldName}</strong> with <strong className="text-emerald-300">{replaceToast.newName}</strong> for {replaceToast.subject}.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
              Dual Educator Mapping • Online & Offline Sync
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" /> AI Speech Transcript Evaluator Active
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <BookOpen className="w-6 h-6 mr-2 text-indigo-600" /> Batches, Subjects & Dual Educator Allocation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Every batch subject has 2 assigned educators (Online Class & Offline Class). AI transcript feedback automatically flags low performance for educator replacement.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Subject Mappings" value={`${filteredData.length} Subjects`} subtext="Dual Faculty Assigned" icon={BookOpen} color="blue" />
        <KPICard title="Online Educators" value="100% Assigned" subtext="Live WebRTC Streaming" icon={Video} color="green" />
        <KPICard title="Offline Educators" value="100% Assigned" subtext="In-Person Classroom & Labs" icon={Users} color="purple" />
        <KPICard title="AI Low Feedback Alerts" value={`${lowFeedbackCount} Recommended`} subtext={lowFeedbackCount > 0 ? "Replacement Triggered" : "All Scores Optimal"} icon={ShieldAlert} color={lowFeedbackCount > 0 ? "rose" : "amber"} />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search subject or faculty name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full sm:w-56 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="all">All Batches</option>
            {BATCHES_DATA.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Batches -> Subjects -> Dual Educator Cards */}
      <div className="space-y-6">
        {filteredData.map((item) => (
          <div 
            key={item.id} 
            className={`p-6 rounded-2xl bg-white border transition-all shadow-xs ${
              item.replacementRecommended ? 'border-rose-300 ring-2 ring-rose-100' : 'border-slate-200 hover:border-indigo-300'
            }`}
          >
            {/* Subject Card Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 gap-2 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-xs font-bold">
                    {item.batch}
                  </span>
                  {item.replacementRecommended && (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[11px] flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5" /> AI Low Feedback Alert: Replacement Needed
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">{item.subject}</h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Backup Faculty Pool:</span>
                <span className="text-xs font-bold text-slate-700">{item.backupTeacher}</span>
              </div>
            </div>

            {/* Dual Educator Mapping Grid (Online Educator vs Offline Educator) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1. ONLINE EDUCATOR */}
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-150 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                      <Video className="w-3 h-3" /> Online Class Educator
                    </span>
                    <span className="flex items-center text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" /> {item.onlineTeacher.rating} / 5.0
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={item.onlineTeacher.photo} 
                      alt={item.onlineTeacher.name} 
                      className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-200" 
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{item.onlineTeacher.name}</h4>
                      <p className="text-xs text-indigo-600 font-semibold">{item.onlineTeacher.status}</p>
                    </div>
                  </div>

                  {/* AI Speech Transcript Feedback Box */}
                  <div className="bg-white p-3 rounded-lg border border-indigo-100 space-y-1 mb-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium flex items-center">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500 mr-1" /> AI Speech Score:
                      </span>
                      <span className="font-mono font-extrabold text-emerald-600">{item.onlineTeacher.aiScore}%</span>
                    </div>
                    <p className="text-[11px] text-slate-600 italic">
                      "{item.onlineTeacher.transcriptionQuality}"
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-indigo-100/60 text-right">
                  <span className="text-[11px] font-bold text-indigo-700">Assigned for Live WebRTC Streams</span>
                </div>
              </div>

              {/* 2. OFFLINE EDUCATOR */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                item.offlineTeacher.aiScore < 70 ? 'bg-rose-50/60 border-rose-200' : 'bg-emerald-50/50 border-emerald-150'
              }`}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                      <Users className="w-3 h-3" /> Offline Class Educator
                    </span>
                    <span className="flex items-center text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" /> {item.offlineTeacher.rating} / 5.0
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={item.offlineTeacher.photo} 
                      alt={item.offlineTeacher.name} 
                      className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-200" 
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{item.offlineTeacher.name}</h4>
                      <p className={`text-xs font-bold ${item.offlineTeacher.aiScore < 70 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {item.offlineTeacher.status}
                      </p>
                    </div>
                  </div>

                  {/* AI Speech Transcript Feedback Box */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1 mb-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium flex items-center">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" /> AI Speech Score:
                      </span>
                      <span className={`font-mono font-extrabold ${item.offlineTeacher.aiScore < 70 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {item.offlineTeacher.aiScore}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 italic">
                      "{item.offlineTeacher.transcriptionQuality}"
                    </p>
                  </div>
                </div>

                {/* 1-Click Replace Button if Score is Low */}
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600">In-Person Lectures & Doubt Labs</span>
                  
                  {item.offlineTeacher.aiScore < 70 ? (
                    <button 
                      onClick={() => handleReplaceEducator(item.id, 'offline')}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center gap-1 animate-bounce"
                    >
                      <Zap className="w-3.5 h-3.5" /> ⚡ Auto-Replace Educator
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Performance Approved
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
