import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, Search, Clock, CheckCircle2, AlertTriangle, 
  MessageSquare, User, Phone, Mail, Send, Check, ShieldAlert,
  ArrowRight, X, Sparkles, Filter, CornerDownRight
} from 'lucide-react';
import { MOCK_TICKETS } from './helpSupportData';

export default function TicketInbox({ instituteCode = 'ALL' }) {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);

  // New reply text in modal
  const [replyText, setReplyText] = useState('');

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchCampus = isAllInstitutes || t.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchStatus = statusFilter === 'ALL' 
        ? true 
        : statusFilter === 'OPEN'
        ? t.status !== 'Resolved'
        : statusFilter === 'CRITICAL'
        ? t.priority === 'Critical' && t.status !== 'Resolved'
        : t.status === statusFilter;
      const matchCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
      const matchSearch = !searchTerm ||
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.parentName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCampus && matchStatus && matchCategory && matchSearch;
    });
  }, [tickets, instituteCode, isAllInstitutes, statusFilter, categoryFilter, searchTerm]);

  // Handle adding reply to thread
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicketModal) return;

    const newReply = {
      sender: 'Super Admin Agent',
      role: 'Support Specialist',
      time: 'Just now',
      message: replyText.trim()
    };

    const updatedThread = [...(selectedTicketModal.thread || []), newReply];

    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketModal.id) {
        return {
          ...t,
          status: 'In Progress',
          thread: updatedThread
        };
      }
      return c;
    }));

    setSelectedTicketModal(prev => ({
      ...prev,
      status: 'In Progress',
      thread: updatedThread
    }));

    setReplyText('');
  };

  // Mark ticket as resolved
  const handleMarkResolved = () => {
    if (!selectedTicketModal) return;

    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketModal.id) {
        return {
          ...t,
          status: 'Resolved',
          slaTimeLeft: 'Resolved by Admin',
          escalationLevel: 'Standard'
        };
      }
      return t;
    }));

    alert(`Ticket #${selectedTicketModal.ticketNo} marked as RESOLVED.`);
    setSelectedTicketModal(null);
  };

  // Escalate to Director
  const handleEscalateDirector = () => {
    if (!selectedTicketModal) return;

    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketModal.id) {
        return {
          ...t,
          escalationLevel: 'Level 3 (Director Action)',
          priority: 'Critical'
        };
      }
      return t;
    }));

    alert(`Ticket #${selectedTicketModal.ticketNo} escalated to Campus Director urgent queue.`);
    setSelectedTicketModal(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
              Live Helpdesk Queue
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredTickets.length} Tickets
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Live Support Ticket Inbox & Triage Queue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized parent, student, and hardware issue dispatch desk. Click any ticket to open resolution workspace.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Search by ticket #, student, keyword..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none shadow-2xs"
          >
            <option value="ALL">All Categories</option>
            <option value="Billing & Accounts">Billing & Accounts</option>
            <option value="Biometric Hardware">Biometric Hardware</option>
            <option value="Mobile App & WebRTC">Mobile App & WebRTC</option>
            <option value="Academic & Faculty">Academic & Faculty</option>
            <option value="PTM & Counseling">PTM & Counseling</option>
            <option value="Books & Inventory">Books & Inventory</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'ALL', label: 'All Tickets' },
          { id: 'OPEN', label: 'Unresolved Active' },
          { id: 'CRITICAL', label: 'Critical Escalations' },
          { id: 'In Progress', label: 'In Progress' },
          { id: 'Resolved', label: 'Resolved Archive' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              statusFilter === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTickets.length === 0 ? (
          <div className="col-span-2 p-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-400">
            No support tickets match the current filters.
          </div>
        ) : (
          filteredTickets.map(t => (
            <div
              key={t.id}
              onClick={() => setSelectedTicketModal(t)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600">{t.ticketNo}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">{t.createdTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-blue-600 transition">
                    {t.title}
                  </h3>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${
                  t.priority === 'Critical'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : t.priority === 'High'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {t.priority}
                </span>
              </div>

              {/* Student and Parent info */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student: <strong className="text-slate-800">{t.studentName}</strong> ({t.studentRoll})</span>
                  <span className="font-semibold text-slate-700">{t.category}</span>
                </div>
                <div className="text-slate-500">Parent: <strong className="text-slate-700">{t.parentName}</strong> • {t.parentPhone}</div>
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {t.description}
              </p>

              {/* Card Footer: SLA & Status */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>SLA: <strong className={t.slaElapsedPct > 80 ? 'text-rose-600' : 'text-slate-800'}>{t.slaTimeLeft}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    t.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700'
                      : t.status === 'In Progress'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    ● {t.status}
                  </span>

                  <span className="text-blue-600 font-bold text-xs group-hover:underline flex items-center gap-0.5">
                    Open Ticket →
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Interactive 360° Ticket Resolution Modal */}
      {selectedTicketModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {selectedTicketModal.ticketNo}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    selectedTicketModal.priority === 'Critical'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {selectedTicketModal.priority} Priority
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {selectedTicketModal.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-2">
                  {selectedTicketModal.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Campus: <strong className="text-slate-800">{selectedTicketModal.instituteName}</strong> • Logged {selectedTicketModal.createdTime}
                </p>
              </div>

              <button
                onClick={() => setSelectedTicketModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>
            </div>

            {/* Requester Profile Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate & Student:</span>
                <div className="font-bold text-slate-900">{selectedTicketModal.studentName}</div>
                <div className="text-slate-600 font-mono">Roll: {selectedTicketModal.studentRoll}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parent / Guardian:</span>
                <div className="font-bold text-slate-900">{selectedTicketModal.parentName}</div>
                <div className="text-slate-600 font-mono">{selectedTicketModal.parentPhone} • {selectedTicketModal.parentEmail}</div>
              </div>
            </div>

            {/* Issue Description */}
            <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-100 text-xs space-y-1">
              <span className="font-bold text-blue-900 text-[11px] uppercase tracking-wider">Issue Description:</span>
              <p className="text-slate-700 leading-relaxed">{selectedTicketModal.description}</p>
            </div>

            {/* Simulated Live Conversation Thread */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                Conversation & Activity Log:
              </span>
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {selectedTicketModal.thread?.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      msg.role === 'Parent' || msg.role === 'Student'
                        ? 'bg-slate-50 border-slate-200 ml-4'
                        : 'bg-indigo-50/60 border-indigo-100 mr-4'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1 text-[11px]">
                      <span className="font-bold text-slate-900">{msg.sender} ({msg.role})</span>
                      <span className="text-slate-400 font-mono">{msg.time}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Canned Response Buttons */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-600 text-[11px] uppercase tracking-wider block">
                Insert Quick Canned Resolution:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Amended GST Tax receipt generated and sent to parent WhatsApp.",
                  "Biometric facial vector re-synced at Gate A turnstile.",
                  "PTM slot confirmed for Saturday 11:30 AM with Botany HOD.",
                  "Live stream session routed to London CDN edge node."
                ].map((canned, i) => (
                  <button
                    key={i}
                    onClick={() => setReplyText(canned)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] transition text-left"
                  >
                    + {canned}
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Reply Input Box */}
            <div className="space-y-2 text-xs">
              <div className="flex gap-2">
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type support response or internal agent note..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Assigned Agent:</span>
                <strong className="text-slate-800">{selectedTicketModal.assignedAgent}</strong>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleEscalateDirector}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition"
                >
                  Escalate to Director
                </button>
                <button
                  onClick={handleMarkResolved}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Resolved</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
