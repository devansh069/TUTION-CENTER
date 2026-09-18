import React, { useState, useMemo } from 'react';
import { 
  Video, Star, CheckCircle2, Play, Pause, Clock, AlertTriangle, 
  User, Award, ThumbsUp, ThumbsDown, Sparkles, Sliders, Check, RefreshCw
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { MOCK_APPLICANTS } from './jobApplicantsData';

export default function DemoLecturesEval({ instituteCode = 'ALL' }) {
  const [candidates, setCandidates] = useState(MOCK_APPLICANTS);
  const [selectedDemoModal, setSelectedDemoModal] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Interactive rubric evaluation state inside modal
  const [rubricScores, setRubricScores] = useState({
    conceptClarity: 5.0,
    pedagogyBoard: 4.8,
    examShortcuts: 4.9,
    dictionPresence: 4.8
  });
  const [evaluatorNotes, setEvaluatorNotes] = useState('');

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter candidates with demo lectures
  const demoCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchCampus = isAllInstitutes || c.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchStatus = activeFilter === 'ALL' || c.demoStatus === activeFilter;
      return matchCampus && matchStatus && c.demoTopic;
    });
  }, [candidates, instituteCode, isAllInstitutes, activeFilter]);

  const openEvaluationModal = (candidate) => {
    setSelectedDemoModal(candidate);
    setIsPlaying(false);
    setRubricScores(candidate.demoScores || {
      conceptClarity: 4.8,
      pedagogyBoard: 4.7,
      examShortcuts: 4.8,
      dictionPresence: 4.7
    });
    setEvaluatorNotes(candidate.evaluatorNotes || '');
  };

  const handleDecision = (decisionType) => {
    if (!selectedDemoModal) return;

    setCandidates(prev => prev.map(c => {
      if (c.id === selectedDemoModal.id) {
        return {
          ...c,
          demoStatus: decisionType === 'Approve' ? 'Completed' : decisionType === 'ReDemo' ? 'Scheduled' : 'Rejected',
          status: decisionType === 'Approve' ? 'Director Round' : decisionType === 'ReDemo' ? 'Re-Demo Required' : 'Archived',
          stage: decisionType === 'Approve' ? 'Director Interview' : c.stage,
          evaluatorNotes: evaluatorNotes || c.evaluatorNotes
        };
      }
      return c;
    }));

    alert(`Decision registered: Candidate marked as "${decisionType}" for ${selectedDemoModal.candidateName}`);
    setSelectedDemoModal(null);
  };

  const totalAverageScore = useMemo(() => {
    const sum = rubricScores.conceptClarity + rubricScores.pedagogyBoard + rubricScores.examShortcuts + rubricScores.dictionPresence;
    return (sum / 4).toFixed(2);
  }, [rubricScores]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Pedagogy Quality Standard
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              WebRTC Classroom Recordings & Panel Scoring
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <Video className="w-6 h-6 text-indigo-600" />
            Faculty Demo Lecture Evaluation Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate live teaching sessions, smartboard legibility, subject mastery, and student engagement before final appointment.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          {['ALL', 'Completed', 'Scheduled'].map(status => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilter === status 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {status === 'ALL' ? 'All Demos' : status}
            </button>
          ))}
        </div>
      </div>

      {/* 4 KPI Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Teaching Demos Audited"
          value={`${demoCandidates.length} Sessions`}
          subtitle="Recorded via WebRTC Studio"
          icon="📹"
          badge="Evaluated"
        />
        <KPICard
          theme="emerald"
          title="Average Pedagogy Score"
          value="4.76 / 5.0"
          subtitle="Strict 4-Pillar Evaluation"
          icon="⭐"
          badge="High Rigor"
        />
        <KPICard
          theme="amber"
          title="Student Cohort Approval"
          value="95.4% Positive"
          subtitle="Sample batch feedback cards"
          icon="🎓"
          badge="High Engagement"
        />
        <KPICard
          theme="purple"
          title="Passed to Director"
          value="5 Approved"
          subtitle="Final compensation round"
          icon="✅"
          badge="Ready for Offer"
        />
      </div>

      {/* Demo Sessions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {demoCandidates.map(candidate => (
          <div
            key={candidate.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-400 hover:shadow-md transition space-y-4"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={candidate.avatar}
                  alt={candidate.candidateName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{candidate.candidateName}</h3>
                  <div className="text-xs text-indigo-600 font-semibold">{candidate.role}</div>
                  <div className="text-[11px] text-slate-500">{candidate.qualification}</div>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                candidate.demoStatus === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                ● {candidate.demoStatus}
              </span>
            </div>

            {/* Demo Topic Banner */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Assigned Teaching Topic:
              </div>
              <div className="text-xs font-bold text-slate-800 leading-snug">
                "{candidate.demoTopic}"
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>📍 {candidate.demoRoom}</span>
                <span>🗓️ {candidate.demoDate}</span>
                <span className="font-mono font-semibold text-indigo-600">⏱️ {candidate.demoVideoDuration}</span>
              </div>
            </div>

            {/* Rubric Score Pillars Snapshot */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
                <div className="text-[10px] text-slate-500">Concepts</div>
                <div className="font-bold text-indigo-700">★ {candidate.demoScores?.conceptClarity || '4.8'}</div>
              </div>
              <div className="p-2 rounded-lg bg-blue-50/50 border border-blue-100">
                <div className="text-[10px] text-slate-500">Board Work</div>
                <div className="font-bold text-blue-700">★ {candidate.demoScores?.pedagogyBoard || '4.7'}</div>
              </div>
              <div className="p-2 rounded-lg bg-amber-50/50 border border-amber-100">
                <div className="text-[10px] text-slate-500">Shortcuts</div>
                <div className="font-bold text-amber-700">★ {candidate.demoScores?.examShortcuts || '4.9'}</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <div className="text-[10px] text-slate-500">Presence</div>
                <div className="font-bold text-emerald-700">★ {candidate.demoScores?.dictionPresence || '4.8'}</div>
              </div>
            </div>

            {/* Evaluator notes excerpt */}
            <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
              "{candidate.evaluatorNotes}"
            </p>

            {/* CTA action */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Campus: <strong className="text-slate-800">{candidate.instituteName}</strong>
              </div>

              <button
                onClick={() => openEvaluationModal(candidate)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Open Video Player & Rubric</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated WebRTC Demo Lecture Player & Interactive Scorecard Modal */}
      {selectedDemoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDemoModal.avatar}
                  alt={selectedDemoModal.candidateName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{selectedDemoModal.candidateName}</h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {selectedDemoModal.subject}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Topic: <strong className="text-slate-800">"{selectedDemoModal.demoTopic}"</strong> • {selectedDemoModal.demoRoom}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDemoModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>
            </div>

            {/* Split Screen: Left = Video Player Simulator, Right = Interactive Rubric */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Video Player Simulation */}
              <div className="lg:col-span-7 space-y-3">
                <div className="relative rounded-2xl bg-slate-950 aspect-video flex flex-col justify-between p-4 overflow-hidden shadow-lg border border-slate-800 text-white">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-xs z-10">
                    <span className="px-2.5 py-1 bg-red-600/90 text-white font-bold rounded-md flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      REC • WebRTC HD 1080p
                    </span>
                    <span className="bg-black/60 px-2 py-1 rounded font-mono text-[11px] backdrop-blur-md">
                      Room: {selectedDemoModal.demoRoom}
                    </span>
                  </div>

                  {/* Center Play Overlay */}
                  <div className="flex flex-col items-center justify-center z-10 cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                    <div className="w-14 h-14 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl transition transform hover:scale-110">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300 mt-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                      {isPlaying ? 'Playing Simulated Teaching Demo' : 'Click to Play Smartboard Demo'}
                    </span>
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="space-y-2 z-10">
                    {/* Scrub bar */}
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div className="bg-indigo-500 h-full w-[45%]" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>08:14 / {selectedDemoModal.demoVideoDuration}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-white/10 rounded font-mono text-[10px]">1.25x Speed</span>
                        <span className="px-2 py-0.5 bg-white/10 rounded font-mono text-[10px]">Smartboard Sync</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Demo Timestamps & Student Panel Reviews */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                    Observed Milestones in Demo:
                  </span>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>⏱️ <strong>02:45</strong> — Problem formulation on blackboard</span>
                      <span className="text-emerald-600 font-bold">Clear Layout</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>⏱️ <strong>07:15</strong> — Introducing 30-second competitive shortcut</span>
                      <span className="text-indigo-600 font-bold">High Yield</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>⏱️ <strong>14:20</strong> — Answering student query on edge-case friction</span>
                      <span className="text-emerald-600 font-bold">Conceptually Accurate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive 4-Pillar Rubric Scorecard */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-indigo-600" />
                      4-Pillar Evaluation Rubric
                    </h4>
                    <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-mono font-black text-xs">
                      {totalAverageScore} / 5.0
                    </span>
                  </div>

                  {/* Rubric Sliders / Stars */}
                  <div className="space-y-3 pt-1">
                    {/* Pillar 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>1. Conceptual Depth & Accuracy</span>
                        <span className="font-bold text-indigo-600">★ {rubricScores.conceptClarity}</span>
                      </div>
                      <input
                        type="range"
                        min="3.0"
                        max="5.0"
                        step="0.1"
                        value={rubricScores.conceptClarity}
                        onChange={e => setRubricScores({ ...rubricScores, conceptClarity: parseFloat(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                      />
                    </div>

                    {/* Pillar 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>2. Pedagogy & Smartboard Work</span>
                        <span className="font-bold text-indigo-600">★ {rubricScores.pedagogyBoard}</span>
                      </div>
                      <input
                        type="range"
                        min="3.0"
                        max="5.0"
                        step="0.1"
                        value={rubricScores.pedagogyBoard}
                        onChange={e => setRubricScores({ ...rubricScores, pedagogyBoard: parseFloat(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                      />
                    </div>

                    {/* Pillar 3 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>3. Exam Shortcuts & Problem Solving</span>
                        <span className="font-bold text-indigo-600">★ {rubricScores.examShortcuts}</span>
                      </div>
                      <input
                        type="range"
                        min="3.0"
                        max="5.0"
                        step="0.1"
                        value={rubricScores.examShortcuts}
                        onChange={e => setRubricScores({ ...rubricScores, examShortcuts: parseFloat(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                      />
                    </div>

                    {/* Pillar 4 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>4. Energy, Diction & Tone</span>
                        <span className="font-bold text-indigo-600">★ {rubricScores.dictionPresence}</span>
                      </div>
                      <input
                        type="range"
                        min="3.0"
                        max="5.0"
                        step="0.1"
                        value={rubricScores.dictionPresence}
                        onChange={e => setRubricScores({ ...rubricScores, dictionPresence: parseFloat(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Panel Notes Text Area */}
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700">HOD / Super Admin Remarks:</label>
                  <textarea
                    rows={3}
                    value={evaluatorNotes}
                    onChange={e => setEvaluatorNotes(e.target.value)}
                    placeholder="Enter specific feedback on pedagogy, subject mastery, student query handling..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                {/* Decision Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleDecision('Approve')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Demo → Advance to Director Round</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDecision('ReDemo')}
                      className="py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Request 2nd Demo</span>
                    </button>
                    <button
                      onClick={() => handleDecision('Reject')}
                      className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>Archive / Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
