import React, { useState, useMemo } from 'react';
import { 
  Briefcase, Search, Star, Filter, ArrowRight, ArrowLeft, 
  CheckCircle2, Clock, User, Award, Mail, Phone, Building2, 
  FileText, ExternalLink, X, ChevronRight, Video
} from 'lucide-react';
import { MOCK_APPLICANTS } from './jobApplicantsData';

const PIPELINE_COLUMNS = [
  { id: 'Sourced & Screening', title: 'Sourced & Screening', color: 'border-t-blue-500', bg: 'bg-blue-50/40' },
  { id: 'Written Test', title: 'Written Subject Test', color: 'border-t-cyan-500', bg: 'bg-cyan-50/40' },
  { id: 'Demo Lecture Round', title: 'Demo Lecture Round', color: 'border-t-amber-500', bg: 'bg-amber-50/40' },
  { id: 'Director Interview', title: 'Director / HOD Round', color: 'border-t-indigo-500', bg: 'bg-indigo-50/40' },
  { id: 'Offer Extended', title: 'Offer Extended', color: 'border-t-purple-500', bg: 'bg-purple-50/40' },
  { id: 'Joined & Onboarded', title: 'Joined & Onboarded', color: 'border-t-emerald-500', bg: 'bg-emerald-50/40' },
];

export default function RecruitmentPipeline({ instituteCode = 'ALL' }) {
  const [candidates, setCandidates] = useState(MOCK_APPLICANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedCandidateModal, setSelectedCandidateModal] = useState(null);

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchCampus = isAllInstitutes || c.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchSubject = selectedSubject === 'ALL' || c.subject === selectedSubject;
      const matchSearch = !searchTerm ||
        c.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.qualification.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCampus && matchSubject && matchSearch;
    });
  }, [candidates, instituteCode, isAllInstitutes, selectedSubject, searchTerm]);

  // Advance candidate stage
  const advanceCandidate = (candidateId, nextStage) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return { ...c, stage: nextStage };
      }
      return c;
    }));
    if (selectedCandidateModal && selectedCandidateModal.id === candidateId) {
      setSelectedCandidateModal(prev => ({ ...prev, stage: nextStage }));
    }
  };

  // Move back candidate stage
  const rewindCandidate = (candidateId, prevStage) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return { ...c, stage: prevStage };
      }
      return c;
    }));
    if (selectedCandidateModal && selectedCandidateModal.id === candidateId) {
      setSelectedCandidateModal(prev => ({ ...prev, stage: prevStage }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
              Interactive Kanban
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredCandidates.length} Active Candidates in Board
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <Briefcase className="w-6 h-6 text-indigo-600" />
            Faculty Recruitment Pipeline Board
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage-by-stage hiring tracker for coaching educators. Click any candidate to view 360° interview dossier.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Search candidate by name, role..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>

          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none shadow-2xs"
          >
            <option value="ALL">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
            <option value="Commerce & CA">Commerce & CA</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Humanities & Law">Humanities & Law</option>
          </select>
        </div>
      </div>

      {/* Multi-Stage Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
        {PIPELINE_COLUMNS.map((col, colIdx) => {
          const colCandidates = filteredCandidates.filter(c => c.stage === col.id);
          const prevCol = colIdx > 0 ? PIPELINE_COLUMNS[colIdx - 1].id : null;
          const nextCol = colIdx < PIPELINE_COLUMNS.length - 1 ? PIPELINE_COLUMNS[colIdx + 1].id : null;

          return (
            <div 
              key={col.id} 
              className={`rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 flex flex-col min-h-[580px] shadow-xs border-t-4 ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60">
                <span className="font-bold text-slate-800 text-xs tracking-tight">
                  {col.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 font-mono font-bold text-[11px] border border-slate-200 shadow-2xs">
                  {colCandidates.length}
                </span>
              </div>

              {/* Candidate Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px] pr-0.5">
                {colCandidates.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium">
                    No candidates
                  </div>
                ) : (
                  colCandidates.map(candidate => (
                    <div
                      key={candidate.id}
                      onClick={() => setSelectedCandidateModal(candidate)}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer space-y-2.5 group"
                    >
                      {/* Top Header inside card */}
                      <div className="flex items-start gap-2.5">
                        <img
                          src={candidate.avatar}
                          alt={candidate.candidateName}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-indigo-600 transition">
                            {candidate.candidateName}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium truncate">
                            {candidate.role}
                          </p>
                        </div>
                      </div>

                      {/* Subject & Experience Tags */}
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
                          {candidate.subject}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                          {candidate.experience}
                        </span>
                      </div>

                      {/* Qualification */}
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                        🎓 {candidate.qualification}
                      </p>

                      {/* Rating & Expected CTC */}
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                        <span className="font-bold text-amber-500 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {candidate.rating.toFixed(1)}
                        </span>
                        <span className="font-mono font-semibold text-slate-700">
                          {candidate.expectedCTC}
                        </span>
                      </div>

                      {/* Stage Shift Quick Action Buttons */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        {prevCol ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              rewindCandidate(candidate.id, prevCol);
                            }}
                            title={`Move back to ${prevCol}`}
                            className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        ) : <span />}

                        <span className="text-[10px] text-indigo-600 font-bold group-hover:underline">
                          View Dossier 🔍
                        </span>

                        {nextCol ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              advanceCandidate(candidate.id, nextCol);
                            }}
                            title={`Advance to ${nextCol}`}
                            className="px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-[10px] transition flex items-center gap-1"
                          >
                            <span>Next</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Done
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate 360° Profile Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <img
                  src={selectedCandidateModal.avatar}
                  alt={selectedCandidateModal.candidateName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-600 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">{selectedCandidateModal.candidateName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {selectedCandidateModal.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {selectedCandidateModal.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    {selectedCandidateModal.role} • {selectedCandidateModal.specialization}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    Assigned Target Campus: {selectedCandidateModal.instituteName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>
            </div>

            {/* Profile Grid Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                  Academic & Professional Credentials
                </h4>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Qualification:</span>
                  <div className="font-bold text-slate-800">{selectedCandidateModal.qualification}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Teaching Experience:</span>
                  <div className="font-bold text-slate-800">{selectedCandidateModal.experience} Active Teaching</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Previous Institutes Worked:</span>
                  <div className="font-semibold text-slate-700">{selectedCandidateModal.previousInstitutes}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Sourcing Channel:</span>
                  <div className="font-semibold text-indigo-600">{selectedCandidateModal.sourcingChannel}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                  Compensation & Logistics
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Current CTC:</span>
                    <div className="font-bold text-slate-800 font-mono">{selectedCandidateModal.currentCTC}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Expected CTC:</span>
                    <div className="font-bold text-emerald-600 font-mono">{selectedCandidateModal.expectedCTC}</div>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Notice Period / Availability:</span>
                  <div className="font-semibold text-slate-800">{selectedCandidateModal.noticePeriod}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Contact Direct:</span>
                  <div className="font-medium text-slate-700">{selectedCandidateModal.email}</div>
                  <div className="font-mono text-slate-500">{selectedCandidateModal.phone}</div>
                </div>
              </div>
            </div>

            {/* Demo Lecture Summary Section */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-indigo-600" />
                  Demo Lecture Topic & Evaluation Notes
                </h4>
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                  Status: {selectedCandidateModal.demoStatus}
                </span>
              </div>
              <p className="font-semibold text-slate-800">
                Topic: "{selectedCandidateModal.demoTopic}"
              </p>
              <p className="text-slate-600 italic bg-white p-3 rounded-xl border border-indigo-100">
                "{selectedCandidateModal.evaluatorNotes}"
              </p>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Current Stage:</span>
                <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs">
                  {selectedCandidateModal.stage}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => alert(`Official offer letter draft generated for ${selectedCandidateModal.candidateName}`)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Generate Offer Draft
                </button>
                <button
                  onClick={() => {
                    const currentIdx = PIPELINE_COLUMNS.findIndex(col => col.id === selectedCandidateModal.stage);
                    if (currentIdx < PIPELINE_COLUMNS.length - 1) {
                      advanceCandidate(selectedCandidateModal.id, PIPELINE_COLUMNS[currentIdx + 1].id);
                    }
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                >
                  <span>Advance to Next Stage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
