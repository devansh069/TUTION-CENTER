import React, { useState, useMemo } from 'react';
import { Award, Search, BookOpen, Download, Video, CheckCircle2, PlusCircle, X } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { EXAM_SERIES_DATA, BATCHES_DATA } from '../../data/erpData';

export default function ExamEngine({ instituteCode = 'all' }) {
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examList, setExamList] = useState(EXAM_SERIES_DATA);

  const [newExam, setNewExam] = useState({
    title: '',
    subject: 'Physics, Chemistry & Maths',
    batchName: BATCHES_DATA[0]?.name || 'JEE Advanced Pinnacle 2025',
    duration: '3 Hours',
    maxScore: 300,
    isLive: true
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filteredExams = useMemo(() => {
    return examList.filter(e => {
      const scope = isAll || e.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !search || 
        e.title.toLowerCase().includes(search.toLowerCase()) || 
        e.batchName.toLowerCase().includes(search.toLowerCase()) || 
        e.subject.toLowerCase().includes(search.toLowerCase());
      return scope && matchSearch;
    });
  }, [examList, instituteCode, isAll, search]);

  const handleCreateExam = (e) => {
    e.preventDefault();
    if (!newExam.title) {
      alert("Please enter an Exam Title.");
      return;
    }
    const created = {
      id: `EXAM-${Date.now()}`,
      title: newExam.title,
      subject: newExam.subject,
      batchName: newExam.batchName,
      examDate: new Date().toISOString().split('T')[0],
      duration: newExam.duration,
      maxScore: Number(newExam.maxScore),
      classAvg: 228,
      topScore: 288,
      topRanker: "Aarav Sharma (Rank 1)",
      isLive: newExam.isLive,
      instituteCode: instituteCode || 'alpha',
      studentReports: [
        {
          studentId: "STU-1001",
          studentName: "Aarav Sharma",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          score: "288 / 300",
          percentile: "99.90%",
          rank: 1,
          status: "Evaluated & Graded",
          weakTopics: "Optics Derivation",
          strengthTopics: "Rotational Kinematics"
        }
      ]
    };
    setExamList([created, ...examList]);
    setIsExamModalOpen(false);
    showToast(`Launched Live Exam "${created.title}" for ${created.batchName}!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-black uppercase tracking-wide border border-indigo-200">
            Competitive Testing & WebRTC Live Engine
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Award className="w-6.5 h-6.5 mr-2 text-indigo-600" /> Competitive Exam & Test Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mock entrance tests, percentile rankings, subject-wise score analytics, live WebRTC proctoring, and student rank cards.
          </p>
        </div>

        <button 
          onClick={() => setIsExamModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs flex items-center"
        >
          <Video className="w-4 h-4 mr-1.5" /> + Create & Go Live Exam
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Scheduled Test Series" value={`${filteredExams.length} Series`} subtext="Active Exam Pipeline" icon={BookOpen} color="blue" badge="Term Series" />
        <KPICard title="Top Entrance Score" value="695 / 720" subtext="NEET Anatomy Mock" icon={Award} color="green" badge="Air Rank #1" />
        <KPICard title="Class Pass Percentage" value="96.4%" subtext="Across All Batches" icon={Award} color="purple" badge="Qualified" />
        <KPICard title="Evaluated Tests" value="100%" subtext="Zero Pending Grading" icon={CheckCircle2} color="amber" badge="AI Auto-Graded" />
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search exam title, subject, or batch name..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" 
          />
        </div>
        <button 
          onClick={() => showToast("Exported Exam Scorecards CSV report.")}
          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center border border-slate-200"
        >
          <Download className="w-3.5 h-3.5 mr-1" /> Export Scorecards
        </button>
      </div>

      {/* EXAMS TABLE */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Exam Title & Subject</th>
                <th className="p-3">Target Batch</th>
                <th className="p-3">Duration & Max Score</th>
                <th className="p-3">Class Avg Score</th>
                <th className="p-3">Top Performer</th>
                <th className="p-3 text-right">Proctoring Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredExams.map(e => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-slate-900 block">{e.title}</span>
                    <span className="text-[10px] text-indigo-600 font-bold">{e.subject}</span>
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{e.batchName}</td>
                  <td className="p-3 font-mono font-bold text-slate-800">{e.duration} • Max {e.maxScore}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{e.classAvg}</td>
                  <td className="p-3 font-bold text-indigo-600">{e.topRanker}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      e.isLive ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {e.isLive ? '● Live Stream Active' : 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE EXAM MODAL */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-heading font-black text-slate-900 text-base flex items-center">
                <Video className="w-5 h-5 mr-2 text-indigo-600" /> Create & Go Live Competitive Exam
              </h3>
              <button onClick={() => setIsExamModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Exam Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. All India JEE Advanced Grand Sprint Mock 05" 
                  value={newExam.title} 
                  onChange={(e) => setNewExam({...newExam, title: e.target.value})} 
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject Scope</label>
                  <input 
                    type="text" 
                    value={newExam.subject} 
                    onChange={(e) => setNewExam({...newExam, subject: e.target.value})} 
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Max Score Marks</label>
                  <input 
                    type="number" 
                    value={newExam.maxScore} 
                    onChange={(e) => setNewExam({...newExam, maxScore: e.target.value})} 
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Batch</label>
                <select 
                  value={newExam.batchName} 
                  onChange={(e) => setNewExam({...newExam, batchName: e.target.value})} 
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                >
                  {BATCHES_DATA.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setIsExamModalOpen(false)} 
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md flex items-center"
                >
                  <Video className="w-3.5 h-3.5 mr-1" /> Launch & Go Live Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
