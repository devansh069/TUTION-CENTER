import React, { useState } from 'react';
import { 
  Video, 
  Clock, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  Play, 
  Calendar, 
  BookOpen, 
  UserCheck, 
  Zap, 
  Search,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  Send
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { LIVE_CLASSES_SCHEDULE_DATA, BATCHES_DATA } from '../../data/erpData';
import ActiveWebRTCStreams from './ActiveWebRTCStreams';

export default function Dashboard({ instituteCode = 'all', onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'ongoing_webcam'
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const targetCode = (instituteCode || 'all').toLowerCase();
  const scheduleData = LIVE_CLASSES_SCHEDULE_DATA.filter(c => {
    const matchInst = targetCode === 'all' || !c.instituteCode || c.instituteCode.toLowerCase() === targetCode;
    const matchBatch = selectedBatch === 'all' || c.batch === selectedBatch;
    const matchSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.onlineTeacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchInst && matchBatch && matchSearch;
  });

  const liveNowCount = scheduleData.filter(c => c.status === 'Live Now').length;
  const upcomingCount = scheduleData.filter(c => c.status.includes('Upcoming')).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-extrabold uppercase tracking-wide border border-rose-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              {liveNowCount} Live Streams Active
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" /> Speech AI Transcription & Feedback Active
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Video className="w-6 h-6 mr-2 text-indigo-600" /> Live WebRTC Classroom Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Batch-wise online classes overview, real laptop camera streaming, live AI transcription, student attendance, and teacher feedback evaluation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('ongoing_webcam')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center shadow-sm transition-all"
          >
            <Video className="w-4 h-4 mr-1.5" /> Launch Real Webcam Class Portal
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" /> 1. Batch Online Classes Overview & Schedule
        </button>

        <button
          onClick={() => setActiveTab('ongoing_webcam')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'ongoing_webcam'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Video className="w-4 h-4" /> 2. Ongoing Class & Real Laptop Camera WebRTC Portal
        </button>
      </div>

      {/* VIEW 1: BATCH OVERVIEW & SCHEDULE */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Scheduled Classes Today" value={`${scheduleData.length} Classes`} subtext="Across All Batches" icon={Calendar} color="blue" />
            <KPICard title="Live Now Streams" value={`${liveNowCount} Streaming`} subtext="WebRTC Multi-Bitrate" icon={Video} color="green" />
            <KPICard title="Avg Attendance Rate" value="95.7%" subtext="194 / 203 Students Joined" icon={UserCheck} color="purple" />
            <KPICard title="AI Teacher Rating Avg" value="95.1%" subtext="Calculated from Speech AI" icon={Sparkles} color="amber" />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text"
                placeholder="Search class title, subject, or teacher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
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

          {/* Batch Online Classes Overview Matrix */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base">Batch Online Classes Schedule & Time Matrix</h3>
                <p className="text-xs text-slate-500">Overview of which batch has which online subject class scheduled and when</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
                {scheduleData.length} Online Classes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {scheduleData.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    item.status === 'Live Now' 
                      ? 'bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-indigo-500/40 shadow-xl' 
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        item.status === 'Live Now' ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {item.batch}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                        item.status === 'Live Now' ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status === 'Live Now' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>}
                        {item.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-base mb-1 line-clamp-2">{item.title}</h4>
                    <p className={`text-xs font-semibold mb-3 ${item.status === 'Live Now' ? 'text-indigo-300' : 'text-indigo-600'}`}>
                      Subject: {item.subject}
                    </p>

                    <div className={`p-3 rounded-xl border text-xs space-y-1 mb-4 ${
                      item.status === 'Live Now' ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                    }`}>
                      <p className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{item.scheduleTime}</span>
                      </p>
                      <p className="flex items-center gap-1.5 font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Online Educator: <strong>{item.onlineTeacher}</strong></span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Attendance</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {item.status === 'Live Now' ? `${item.viewersJoined} / ${item.totalEnrolled} (${item.attendanceRate}%)` : `Starts at ${item.scheduleTime.split(',')[1] || '2:00 PM'}`}
                      </span>
                    </div>

                    <button 
                      onClick={() => setActiveTab('ongoing_webcam')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-1 ${
                        item.status === 'Live Now'
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-black'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> {item.status === 'Live Now' ? 'Join Live Stream' : 'View Portal'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ONGOING CLASS & REAL WEBCAM PORTAL */}
      {activeTab === 'ongoing_webcam' && (
        <ActiveWebRTCStreams instituteCode={instituteCode} />
      )}
    </div>
  );
}
