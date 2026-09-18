import React, { useState } from 'react';
import { Video, Database, Download, Play, Search, Clock, Users, Sparkles, Filter } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { LIVE_CLASSES_SCHEDULE_DATA, BATCHES_DATA } from '../../data/erpData';

export default function RecordedLecturesCDN() {
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const recordedLectures = [
    { id: 'REC-101', title: 'Electromagnetic Induction & Faraday Laws', batch: 'Batch A - JEE 2026', subject: 'Advanced Physics', teacher: 'Dr. Harrison Wells', duration: '1h 30m', views: 420, date: '18 Sep 2026', cdnUrl: 'https://cdn.edumission.org/video/jee-physics-em.mp4', resolution: '1080p HD' },
    { id: 'REC-102', title: 'SN1 vs SN2 Reaction Mechanisms Mastery', batch: 'Batch B - NEET 2026', subject: 'Organic Chemistry', teacher: 'Prof. Ananya Roy', duration: '1h 25m', views: 380, date: '17 Sep 2026', cdnUrl: 'https://cdn.edumission.org/video/neet-chem-sn.mp4', resolution: '1080p HD' },
    { id: 'REC-103', title: 'Corporate Restructuring & Insolvency Case Laws', batch: 'Batch C - CA Foundation', subject: 'Corporate Law', teacher: 'Catherine Miller, FCA', duration: '1h 40m', views: 290, date: '16 Sep 2026', cdnUrl: 'https://cdn.edumission.org/video/ca-law-corp.mp4', resolution: '1080p HD' },
    { id: 'REC-104', title: 'Quadratic Equations & Polynomial Proofs', batch: 'Batch D - Foundation 10th', subject: 'Mathematics', teacher: 'Er. Vivek Sharma', duration: '1h 15m', views: 510, date: '19 Sep 2026', cdnUrl: 'https://cdn.edumission.org/video/fnd-math-poly.mp4', resolution: '1080p HD' },
  ];

  const filtered = recordedLectures.filter(r => {
    const matchBatch = selectedBatch === 'all' || r.batch === selectedBatch;
    const matchSearch = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBatch && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <Database className="w-7 h-7 mr-2.5 text-indigo-600" /> Recorded Live Lectures & HLS Video CDN
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cloud lecture recordings automatically indexed by batch, subject, and online educator for student mobile app revision.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center shadow-sm">
          <Download className="w-4 h-4 mr-1.5" /> Export CDN Index (CSV)
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Archived Lectures" value="2,450 Videos" subtext="Indexed Across Batches" icon={Video} color="blue" />
        <KPICard title="CDN Storage Usage" value="624 GB / 950 GB" subtext="65.6% Storage Quota" icon={Database} color="green" />
        <KPICard title="Student Revision Playbacks" value="48,200 Views" subtext="Watchtime Analytics" icon={Users} color="purple" />
        <KPICard title="Transcoding Engine" value="100% Ready" subtext="HLS 720p / 1080p Adaptive" icon={Sparkles} color="amber" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input 
            type="text"
            placeholder="Search recorded lecture title or subject..."
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

      {/* Recorded Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((lecture) => (
          <div key={lecture.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-xs font-bold">
                  {lecture.batch}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                  {lecture.resolution}
                </span>
              </div>

              <h3 className="font-heading text-base font-bold text-slate-900 mb-1">{lecture.title}</h3>
              <p className="text-xs font-semibold text-indigo-600 mb-3">{lecture.subject} • {lecture.teacher}</p>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {lecture.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-400" /> {lecture.views} Views</span>
                <span className="ml-auto font-mono text-[11px] text-slate-400">{lecture.date}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="font-mono text-[10px] text-slate-400 font-semibold truncate max-w-[200px]">{lecture.cdnUrl}</span>
              <button className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1">
                <Play className="w-3.5 h-3.5 fill-current" /> Play Stream
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
