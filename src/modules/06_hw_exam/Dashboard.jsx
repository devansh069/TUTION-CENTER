import React, { useState, useMemo } from 'react';
import { BookOpen, Award, CheckCircle2, FileText, PlusCircle, Search, Download, Video, FileCheck, Layers, ArrowUpRight, X, Eye, Percent, AlertCircle } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { BATCHES_DATA, HW_ASSIGNMENTS_DATA, EXAM_SERIES_DATA, STUDENT_FEES_DISCOUNT_DATA } from '../../data/erpData';

export default function HWExamDashboard({ instituteCode = 'all', onNavigate }) {
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // State
  const [selectedBatchId, setSelectedBatchId] = useState(BATCHES_DATA[0]?.id || 'B101');
  const [activeSection, setActiveSection] = useState('hw'); // 'hw' or 'exam'
  const [isHwModalOpen, setIsHwModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Dynamic HW and Exam datasets
  const [hwList, setHwList] = useState(HW_ASSIGNMENTS_DATA);
  const [examList, setExamList] = useState(EXAM_SERIES_DATA);

  // Create HW Form State
  const [newHw, setNewHw] = useState({
    title: '',
    subject: 'Advanced Physics',
    batchName: BATCHES_DATA[0]?.name || 'JEE Advanced Pinnacle 2025',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    instructions: ''
  });

  // Create Exam Form State
  const [newExam, setNewExam] = useState({
    title: '',
    subject: 'Physics & Chemistry',
    batchName: BATCHES_DATA[0]?.name || 'JEE Advanced Pinnacle 2025',
    duration: '3 Hours',
    maxScore: 300,
    isLive: true
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter batches scoped to institute
  const filteredBatches = useMemo(() => {
    return BATCHES_DATA.filter(b => isAll || b.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  }, [instituteCode, isAll]);

  // Selected Batch details
  const currentBatch = useMemo(() => {
    return filteredBatches.find(b => b.id === selectedBatchId) || filteredBatches[0] || BATCHES_DATA[0];
  }, [selectedBatchId, filteredBatches]);

  // Aggregate Metrics
  const totalExamsCount = filteredBatches.length * 7;
  const totalHwCount = filteredBatches.length * 14;

  // Create HW Handler
  const handleCreateHw = (e) => {
    e.preventDefault();
    if (!newHw.title) {
      alert("Please enter a Homework Title.");
      return;
    }
    const created = {
      id: `HW-${Date.now()}`,
      title: newHw.title,
      subject: newHw.subject,
      batchName: newHw.batchName,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: newHw.dueDate,
      totalSubmissions: 45,
      maxCapacity: 50,
      submissionRate: "90.0%",
      checkedRate: "100%",
      avgScore: 88,
      instituteCode: instituteCode || 'alpha',
      studentSubmissions: [
        {
          studentId: "STU-1001",
          studentName: "Aarav Sharma",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          score: "92 / 100",
          status: "Graded & Checked",
          pdfFile: `${newHw.title.replace(/\s+/g, '_')}_Aarav.pdf`,
          submittedAt: "Just now",
          aiGradeFeedback: "Detailed derivation submitted. Clear problem solving notation."
        }
      ]
    };
    setHwList([created, ...hwList]);
    setIsHwModalOpen(false);
    showToast(`Assigned new homework "${created.title}" to batch ${created.batchName}!`);
  };

  // Create & Go Live Exam Handler
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
      classAvg: 220,
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
    showToast(`Created & Launched Live Exam "${created.title}" for ${created.batchName}!`);
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
          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-black uppercase tracking-wide border border-blue-200">
            Batch Homework & Live Exam Suite
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <BookOpen className="w-6.5 h-6.5 mr-2 text-blue-600" /> Homework & Examination Command Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Batch-wise homework submission telemetry, student PDF attachments, live exam proctoring, and automated score cards.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsHwModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-2xs flex items-center"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1" /> Create Homework
          </button>
          <button 
            onClick={() => setIsExamModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs flex items-center"
          >
            <Video className="w-3.5 h-3.5 mr-1" /> Create & Go Live Exam
          </button>
        </div>
      </div>

      {/* Top 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Exams Conducted" value={`${totalExamsCount} Exams`} subtext="Weekly & Grand Mock Series" icon={BookOpen} color="blue" badge="Term Exams" />
        <KPICard title="Homework Assignments" value={`${totalHwCount} Sets`} subtext="Student App PDF Uploads" icon={FileText} color="purple" badge="Active Assignments" />
        <KPICard title="Network HW Completion" value="96.8%" subtext="96% App Submission Rate" icon={CheckCircle2} color="green" badge="High Velocity" />
        <KPICard title="Live Proctoring Streams" value="3 Exams Live" subtext="WebRTC Multi-Cam Stream" icon={Video} color="amber" badge="Zero Cheat AI" />
      </div>

      {/* SECTION 1: BATCH-WISE EXAM & HW DATA CALL RIBBON */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-indigo-600" /> Batch-Wise Exam & Homework Telemetry Call Data
            </h3>
            <p className="text-xs text-slate-500">Summary showing which batch has how many exams, how many homework sets, and progress velocity.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredBatches.map((b, idx) => {
            const batchExamsCount = 6 + (idx * 2);
            const batchHwCount = 14 + (idx * 4);
            const hwRate = 95 + idx;
            const isSelected = b.id === selectedBatchId;

            return (
              <div 
                key={b.id} 
                onClick={() => setSelectedBatchId(b.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                  isSelected ? 'bg-indigo-50/70 border-indigo-500 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-white text-indigo-700 font-mono text-[10px] font-bold border border-slate-200">
                      {b.code || b.id}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{b.name}</h4>
                  </div>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black">
                      Active Batch
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-400 text-[10px] block">Exams Conducted:</span>
                    <strong className="text-indigo-600 text-sm font-black">{batchExamsCount} Exams</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-400 text-[10px] block">Homework Sets:</span>
                    <strong className="text-purple-600 text-sm font-black">{batchHwCount} Sets</strong>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-slate-600 text-[11px]">
                    <span>HW Submission Rate:</span>
                    <span className="font-bold text-emerald-600">{hwRate}% Completion</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${hwRate}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: BATCH-SPECIFIC DETAILED REPORT (2 SECTIONS: HW & EXAM) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-3">
          <div>
            <span className="text-[10px] uppercase font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Selected Cohort: {currentBatch.name}
            </span>
            <h3 className="font-heading text-lg font-black text-slate-900 mt-1">
              Batch Report Breakdown — 2 Sections
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSection('hw')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
                activeSection === 'hw' ? 'bg-purple-600 text-white shadow-xs font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" /> Section A: Homework Desk (Student PDFs)
            </button>
            <button
              onClick={() => setActiveSection('exam')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
                activeSection === 'exam' ? 'bg-indigo-600 text-white shadow-xs font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Video className="w-3.5 h-3.5 mr-1.5" /> Section B: Exam Engine & Score Cards
            </button>
          </div>
        </div>

        {/* SECTION A: HOMEWORK DESK WITH STUDENT PDF ATTACHMENTS */}
        {activeSection === 'hw' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-slate-900 flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-purple-600" /> Student Homework Submissions & Attached PDF Answer Sheets
              </h4>
              <button 
                onClick={() => setIsHwModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-2xs"
              >
                + Assign New Homework
              </button>
            </div>

            <div className="space-y-3">
              {hwList.map(hw => (
                <div key={hw.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-mono text-[10px] font-bold">
                        {hw.subject}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{hw.title}</h4>
                      <p className="text-xs text-slate-500">Assigned: {hw.assignedDate} • Due: <strong className="text-rose-600">{hw.dueDate}</strong></p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {hw.submissionRate} Submissions ({hw.checkedRate} Checked)
                    </span>
                  </div>

                  {/* Student Submissions List with Attached PDFs */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="font-bold text-xs text-slate-700 block">Student PDF Submissions:</span>
                    {hw.studentSubmissions.map((st, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 flex justify-between items-center text-xs">
                        <div className="flex items-center space-x-3">
                          <img src={st.photo} alt={st.studentName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                          <div>
                            <span className="font-bold text-slate-900 block">{st.studentName}</span>
                            <span className="text-[11px] text-slate-500">Score: <strong className="text-emerald-600">{st.score}</strong> • Submitted {st.submittedAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Attached PDF Button */}
                          <button 
                            onClick={() => showToast(`Opened Attached PDF: ${st.pdfFile}`)}
                            className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold border border-rose-200 flex items-center hover:bg-rose-100 text-[11px]"
                          >
                            <FileText className="w-3.5 h-3.5 mr-1 text-rose-600" />
                            📄 {st.pdfFile}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION B: EXAM ENGINE & STUDENT SCORE REPORTS */}
        {activeSection === 'exam' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-slate-900 flex items-center">
                <Video className="w-4 h-4 mr-1.5 text-indigo-600" /> Competitive Exam Series & Student Rank Reports
              </h4>
              <button 
                onClick={() => setIsExamModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs"
              >
                + Create & Go Live Exam
              </button>
            </div>

            <div className="space-y-3">
              {examList.map(ex => (
                <div key={ex.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold">
                          {ex.subject}
                        </span>
                        {ex.isLive && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-[10px] uppercase animate-pulse flex items-center">
                            <Video className="w-3 h-3 mr-1" /> Live Exam Active
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{ex.title}</h4>
                      <p className="text-xs text-slate-500">Date: {ex.examDate} • Duration: {ex.duration} • Max Score: {ex.maxScore}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xs text-slate-700 block">Class Avg: {ex.classAvg}</span>
                      <span className="text-xs font-bold text-indigo-600">Top Ranker: {ex.topRanker}</span>
                    </div>
                  </div>

                  {/* Student Score Reports */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="font-bold text-xs text-slate-700 block">Student Rank & Percentile Cards:</span>
                    {ex.studentReports.map((sr, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 flex justify-between items-center text-xs">
                        <div className="flex items-center space-x-3">
                          <img src={sr.photo} alt={sr.studentName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                          <div>
                            <span className="font-bold text-slate-900 block">{sr.studentName} (Rank #{sr.rank})</span>
                            <span className="text-[11px] text-slate-500">Score: <strong className="text-emerald-600">{sr.score}</strong> • Percentile: <strong className="text-indigo-600">{sr.percentile}</strong></span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[10px] block">
                            {sr.status}
                          </span>
                          <span className="text-[10px] text-slate-400">Weak: {sr.weakTopics}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CREATE HOMEWORK MODAL */}
      {isHwModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-heading font-black text-slate-900 text-base flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-600" /> Assign New Homework Assignment
              </h3>
              <button onClick={() => setIsHwModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHw} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Homework Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Thermodynamics & Heat Transfer HW 05" 
                  value={newHw.title} 
                  onChange={(e) => setNewHw({...newHw, title: e.target.value})} 
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input 
                    type="text" 
                    value={newHw.subject} 
                    onChange={(e) => setNewHw({...newHw, subject: e.target.value})} 
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={newHw.dueDate} 
                    onChange={(e) => setNewHw({...newHw, dueDate: e.target.value})} 
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Batch</label>
                <select 
                  value={newHw.batchName} 
                  onChange={(e) => setNewHw({...newHw, batchName: e.target.value})} 
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                >
                  {filteredBatches.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setIsHwModalOpen(false)} 
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md"
                >
                  Publish Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE & GO LIVE EXAM MODAL */}
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
                  {filteredBatches.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 flex justify-between items-center">
                <span className="font-bold text-indigo-900">WebRTC Live Stream Proctoring</span>
                <input 
                  type="checkbox" 
                  checked={newExam.isLive} 
                  onChange={(e) => setNewExam({...newExam, isLive: e.target.checked})} 
                  className="w-4 h-4 text-indigo-600 rounded"
                />
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
