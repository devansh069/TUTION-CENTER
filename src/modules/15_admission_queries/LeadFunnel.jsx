import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Search, Phone, Mail, User, Award, 
  ArrowRight, ArrowLeft, CheckCircle2, DollarSign, Calendar, 
  Sparkles, FileText, Send, X, ExternalLink, MessageSquare
} from 'lucide-react';
import { MOCK_INQUIRIES } from './admissionQueriesData';

const STAGES = [
  { id: '1. Inbound Inquiries', title: '1. Inbound Inquiries', color: 'border-t-indigo-500' },
  { id: '2. Phone Academic Profiling', title: '2. Academic Profiling', color: 'border-t-blue-500' },
  { id: '3. Diagnostic Scholarship Test & Demo', title: '3. Test & Demo Class', color: 'border-t-amber-500' },
  { id: '4. Fee Offer Letter Issued', title: '4. Offer Letter Issued', color: 'border-t-purple-500' },
  { id: '5. Seat Token Paid & Enrolled', title: '5. Enrolled & Token Paid', color: 'border-t-emerald-500' },
];

export default function LeadFunnel({ instituteCode = 'ALL' }) {
  const [leads, setLeads] = useState(MOCK_INQUIRIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [selectedLeadModal, setSelectedLeadModal] = useState(null);
  const [newCallNote, setNewCallNote] = useState('');

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchCampus = isAllInstitutes || l.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchCourse = courseFilter === 'ALL' || l.course.includes(courseFilter);
      const matchSearch = !searchTerm ||
        l.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.id.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCampus && matchCourse && matchSearch;
    });
  }, [leads, instituteCode, isAllInstitutes, courseFilter, searchTerm]);

  // Stage shifting
  const advanceLead = (leadId, nextStage) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return { ...l, stage: nextStage };
      }
      return l;
    }));
    if (selectedLeadModal && selectedLeadModal.id === leadId) {
      setSelectedLeadModal(prev => ({ ...prev, stage: nextStage }));
    }
  };

  const rewindLead = (leadId, prevStage) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return { ...l, stage: prevStage };
      }
      return l;
    }));
    if (selectedLeadModal && selectedLeadModal.id === leadId) {
      setSelectedLeadModal(prev => ({ ...prev, stage: prevStage }));
    }
  };

  const handleAddCallNote = () => {
    if (!newCallNote.trim() || !selectedLeadModal) return;

    const newLog = {
      date: 'Just now',
      counselor: 'Active Counselor',
      summary: newCallNote.trim()
    };

    const updatedHistory = [...(selectedLeadModal.callHistory || []), newLog];

    setLeads(prev => prev.map(l => {
      if (l.id === selectedLeadModal.id) {
        return { ...l, callHistory: updatedHistory };
      }
      return l;
    }));

    setSelectedLeadModal(prev => ({ ...prev, callHistory: updatedHistory }));
    setNewCallNote('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
              Interactive Admissions CRM Pipeline
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredLeads.length} Prospective Students
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Lead Funnel & Sales Pipeline Board
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage-by-stage admissions tracker. Move leads through counseling milestones or open a lead card for 360° profiling.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Search lead by student or parent..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>

          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none shadow-2xs"
          >
            <option value="ALL">All Courses</option>
            <option value="IIT-JEE">IIT-JEE Engineering</option>
            <option value="NEET">NEET Medical Prep</option>
            <option value="Foundation">Foundation K-10</option>
            <option value="CA">CA Commerce</option>
            <option value="CLAT">CLAT Law Entrance</option>
          </select>
        </div>
      </div>

      {/* 5-Stage Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
        {STAGES.map((col, colIdx) => {
          const colLeads = filteredLeads.filter(l => l.stage === col.id);
          const prevCol = colIdx > 0 ? STAGES[colIdx - 1].id : null;
          const nextCol = colIdx < STAGES.length - 1 ? STAGES[colIdx + 1].id : null;

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
                  {colLeads.length}
                </span>
              </div>

              {/* Lead Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px] pr-0.5">
                {colLeads.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium">
                    No active leads
                  </div>
                ) : (
                  colLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLeadModal(lead)}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer space-y-2.5 group"
                    >
                      {/* Top inside card */}
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                            {lead.id}
                          </span>
                          <h4 className="font-bold text-slate-900 text-xs mt-1 group-hover:text-indigo-600 transition">
                            {lead.studentName}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {lead.course}
                          </p>
                        </div>

                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">
                          {lead.source}
                        </span>
                      </div>

                      {/* Parent & Contact */}
                      <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-0.5">
                        <div>👤 Parent: <strong className="text-slate-800">{lead.parentName}</strong></div>
                        <div className="font-mono text-slate-500 text-[10px]">{lead.parentPhone}</div>
                      </div>

                      {/* Previous Marks & Diagnostic */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Past: <strong className="text-slate-700">{lead.previousMarks}</strong></span>
                        <span className="font-bold text-indigo-700">{lead.diagnosticTestScore}</span>
                      </div>

                      {/* Proposed Fee & Token */}
                      {lead.proposedFee && (
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                          <span className="text-slate-400">Offer: <strong className="text-slate-700 font-mono">{lead.proposedFee}</strong></span>
                          <span className="text-emerald-700 font-bold font-mono">Token: {lead.tokenAdvancePaid}</span>
                        </div>
                      )}

                      {/* Stage Shift Controls */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        {prevCol ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              rewindLead(lead.id, prevCol);
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
                              advanceLead(lead.id, nextCol);
                            }}
                            title={`Advance to ${nextCol}`}
                            className="px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-[10px] transition flex items-center gap-1"
                          >
                            <span>Next</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Enrolled
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

      {/* Lead 360° Profile Modal */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                    {selectedLeadModal.id}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    Source: {selectedLeadModal.source}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {selectedLeadModal.instituteName}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  {selectedLeadModal.studentName}
                </h3>
                <p className="text-xs text-indigo-700 font-semibold mt-0.5">
                  Target Course: {selectedLeadModal.course} • {selectedLeadModal.studentGrade}
                </p>
              </div>

              <button
                onClick={() => setSelectedLeadModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>
            </div>

            {/* Profile Grid Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                  Parent / Guardian Dossier
                </h4>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Parent Name:</span>
                  <div className="font-bold text-slate-800">{selectedLeadModal.parentName}</div>
                  <div className="text-[11px] text-slate-500">{selectedLeadModal.parentOccupation}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Phone & Email:</span>
                  <div className="font-mono text-slate-700">{selectedLeadModal.parentPhone}</div>
                  <div className="text-slate-500">{selectedLeadModal.parentEmail}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                  Academic Credentials & Fee Offer
                </h4>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Past Academic Record:</span>
                  <div className="font-bold text-slate-800">{selectedLeadModal.previousMarks}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Scholarship Diagnostic Score:</span>
                  <div className="font-bold text-indigo-600">{selectedLeadModal.diagnosticTestScore}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Proposed Fee:</span>
                    <div className="font-mono font-bold text-slate-900">{selectedLeadModal.proposedFee}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Token Received:</span>
                    <div className="font-mono font-bold text-emerald-600">{selectedLeadModal.tokenAdvancePaid}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Counseling Notes & Call History */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3 text-xs">
              <h4 className="font-bold text-indigo-950 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-indigo-600" />
                Counselor Follow-up History & Remarks
              </h4>
              <p className="text-slate-700 italic bg-white p-3 rounded-xl border border-indigo-100">
                "{selectedLeadModal.notes}"
              </p>

              {/* Call logs */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  Logged Call Notes:
                </span>
                {selectedLeadModal.callHistory?.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between text-[11px]">
                    <span className="text-slate-700">{c.summary}</span>
                    <span className="text-slate-400 font-mono shrink-0 ml-2">{c.date}</span>
                  </div>
                ))}
              </div>

              {/* Add note input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newCallNote}
                  onChange={e => setNewCallNote(e.target.value)}
                  placeholder="Log new counseling call note or parent response..."
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <button
                  onClick={handleAddCallNote}
                  disabled={!newCallNote.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Call</span>
                </button>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Current Pipeline Stage:</span>
                <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs">
                  {selectedLeadModal.stage}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => alert(`Fee offer letter generated for ${selectedLeadModal.studentName} with proposed fee ${selectedLeadModal.proposedFee}`)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Generate Offer Letter
                </button>
                <button
                  onClick={() => {
                    const currentIdx = STAGES.findIndex(s => s.id === selectedLeadModal.stage);
                    if (currentIdx < STAGES.length - 1) {
                      advanceLead(selectedLeadModal.id, STAGES[currentIdx + 1].id);
                    }
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                >
                  <span>Advance Stage</span>
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
