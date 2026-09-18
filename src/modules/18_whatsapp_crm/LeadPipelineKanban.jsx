import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Flame,
  Zap,
  Snowflake,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  Send,
  Phone,
  Paperclip,
  CheckCheck,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  DollarSign,
  Calendar,
  BookOpen,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PIPELINE_STAGES, WHATSAPP_LEADS } from './whatsappCrmData';

export default function LeadPipelineKanban({ instituteCode = 'all' }) {
  const [leads, setLeads] = useState(WHATSAPP_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempFilter, setTempFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState(null);
  const [newChatText, setNewChatText] = useState('');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [newLeadForm, setNewLeadForm] = useState({
    leadName: '',
    parentName: '',
    phone: '',
    course: 'JEE Advanced Super-30 (Grade 11)',
    instituteCode: 'alpha',
    temperature: 'Hot'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter leads based on institute, search query, and temperature
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchInst = isAll || l.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchTemp = tempFilter === 'ALL' || l.temperature.toLowerCase() === tempFilter.toLowerCase();
      const matchQuery =
        !searchQuery ||
        l.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.counselor.toLowerCase().includes(searchQuery.toLowerCase());

      return matchInst && matchTemp && matchQuery;
    });
  }, [leads, instituteCode, isAll, tempFilter, searchQuery]);

  // Move lead to previous or next stage
  const handleMoveStage = (leadId, direction) => {
    const stageIds = PIPELINE_STAGES.map(s => s.id);
    setLeads(prev =>
      prev.map(lead => {
        if (lead.id !== leadId) return lead;
        const currentIndex = stageIds.indexOf(lead.stage);
        let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex >= stageIds.length) nextIndex = stageIds.length - 1;
        const newStage = stageIds[nextIndex];
        const newStageTitle = PIPELINE_STAGES.find(s => s.id === newStage)?.title;
        showToast(`${lead.leadName} advanced to "${newStageTitle}" stage!`);
        return { ...lead, stage: newStage };
      })
    );
  };

  // Change lead stage directly
  const handleChangeStage = (leadId, newStage) => {
    setLeads(prev =>
      prev.map(lead => (lead.id === leadId ? { ...lead, stage: newStage } : lead))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => ({ ...prev, stage: newStage }));
    }
    const stageTitle = PIPELINE_STAGES.find(s => s.id === newStage)?.title;
    showToast(`Lead moved to "${stageTitle}".`);
  };

  // Send message in the chat modal
  const handleSendMessage = () => {
    if (!newChatText.trim() || !selectedLead) return;
    const msgObj = {
      sender: 'counselor',
      text: newChatText.trim(),
      time: 'Just now'
    };

    const updatedLead = {
      ...selectedLead,
      chatHistory: [...selectedLead.chatHistory, msgObj],
      lastMessage: newChatText.trim(),
      lastMessageTime: 'Just now',
      unreadCount: 0
    };

    setLeads(prev => prev.map(l => (l.id === selectedLead.id ? updatedLead : l)));
    setSelectedLead(updatedLead);
    setNewChatText('');
    showToast('WhatsApp message sent via Cloud API.');

    // Simulated parent auto-reply after 1.5s
    setTimeout(() => {
      const parentReply = {
        sender: 'lead',
        text: 'Thank you for the update. We are reviewing the syllabus and will confirm shortly.',
        time: 'Just now'
      };
      setLeads(current =>
        current.map(l => {
          if (l.id !== selectedLead.id) return l;
          return {
            ...l,
            chatHistory: [...l.chatHistory, parentReply],
            lastMessage: parentReply.text,
            lastMessageTime: 'Just now'
          };
        })
      );
      setSelectedLead(curr => {
        if (!curr || curr.id !== selectedLead.id) return curr;
        return {
          ...curr,
          chatHistory: [...curr.chatHistory, parentReply],
          lastMessage: parentReply.text
        };
      });
    }, 1600);
  };

  // Quick Action in Chat
  const handleQuickAction = (actionType) => {
    let actionText = '';
    if (actionType === 'brochure') {
      actionText = '📄 Transmitted Official Curriculum & Fee Dossier 2026-27 (PDF, 4.2 MB)';
    } else if (actionType === 'demo') {
      actionText = '📅 Demo Lecture Invitation Link: Saturday 10:00 AM IST with Senior Faculty.';
    } else if (actionType === 'payment') {
      actionText = '💳 Razorpay Instant UPI Gateway Link: https://pay.eduzenith.net/checkout/fee-q3';
    }

    setNewChatText(actionText);
  };

  // Handle Add Lead
  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.leadName || !newLeadForm.phone) return;

    const newEntry = {
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      leadName: newLeadForm.leadName,
      parentName: newLeadForm.parentName || 'Parent / Guardian',
      phone: newLeadForm.phone,
      course: newLeadForm.course,
      instituteCode: newLeadForm.instituteCode,
      instituteName:
        newLeadForm.instituteCode === 'alpha'
          ? 'Alpha Institute of Science & Tech'
          : newLeadForm.instituteCode === 'apex'
          ? 'Apex Medical Prep'
          : 'Beta Commerce Academy',
      stage: 'new_inbound',
      temperature: newLeadForm.temperature,
      leadScore: 85,
      counselor: 'Priya Sharma (Senior Counselor)',
      lastMessage: 'Inbound WhatsApp inquiry initiated.',
      lastMessageTime: 'Just now',
      source: 'Direct WhatsApp Cloud API Webhook',
      unreadCount: 1,
      tags: ['New Inbound', 'Web Inflow'],
      chatHistory: [
        { sender: 'lead', text: `Hi, I am interested in ${newLeadForm.course}. Please share details.`, time: 'Just now' },
        { sender: 'bot', text: 'Namaste! Welcome to Zenith Cloud Academy. Our AI counselor is fetching the requested course details.', time: 'Just now' }
      ]
    };

    setLeads([newEntry, ...leads]);
    setShowNewLeadModal(false);
    showToast(`New WhatsApp Lead #${newEntry.id} registered!`);
    setNewLeadForm({
      leadName: '',
      parentName: '',
      phone: '',
      course: 'JEE Advanced Super-30 (Grade 11)',
      instituteCode: 'alpha',
      temperature: 'Hot'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wide border border-emerald-200">
            Module 18 • Visual CRM Pipeline
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <MessageSquare className="w-6.5 h-6.5 mr-2 text-emerald-600" /> WhatsApp Lead Pipeline Kanban
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage-by-stage visual inquiry progression from WhatsApp Meta Ads click to paid student enrollment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewLeadModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Inbound Lead
          </button>
        </div>
      </div>

      {/* Filter & Metric Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by student name, phone, course, or counselor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
          />
        </div>

        {/* Temperature Pill Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Lead Intent:</span>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {['ALL', 'Hot', 'Warm', 'Cold'].map((temp) => (
              <button
                key={temp}
                onClick={() => setTempFilter(temp)}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  tempFilter === temp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {temp === 'Hot' ? '🔥 Hot' : temp === 'Warm' ? '⚡ Warm' : temp === 'Cold' ? '❄️ Cold' : 'All Leads'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 items-start min-h-[600px]">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === stage.id);

          return (
            <div
              key={stage.id}
              className={`w-72 shrink-0 rounded-2xl border ${stage.color} p-3.5 flex flex-col max-h-[750px] shadow-xs`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-black text-xs text-slate-900 tracking-tight">
                    {stage.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white shadow-2xs border border-slate-200">
                    {stageLeads.length}
                  </span>
                </div>
              </div>

              {/* Column Lead Cards */}
              <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {stageLeads.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs italic">
                    No leads in this stage.
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all space-y-2.5 cursor-pointer relative group"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-slate-500">
                          {lead.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {lead.unreadCount > 0 && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          )}
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              lead.temperature === 'Hot'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : lead.temperature === 'Warm'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {lead.temperature === 'Hot' ? '🔥 Hot' : lead.temperature === 'Warm' ? '⚡ Warm' : '❄️ Cold'}
                          </span>
                        </div>
                      </div>

                      {/* Lead Identity */}
                      <div>
                        <h4 className="font-heading font-black text-xs text-slate-900 leading-snug">
                          {lead.leadName}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">{lead.course}</p>
                      </div>

                      {/* Last Message Snippet */}
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700 leading-snug">
                        <span className="text-slate-400 text-[9px] uppercase font-bold block mb-0.5">
                          Last Message • {lead.lastMessageTime}
                        </span>
                        <p className="italic line-clamp-2">"{lead.lastMessage}"</p>
                      </div>

                      {/* Counselor & Source */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                        <span className="truncate max-w-[130px] font-semibold text-slate-600">
                          👤 {lead.counselor.split(' ')[0]} {lead.counselor.split(' ')[1]}
                        </span>
                        <span className="font-mono text-emerald-700 font-bold">
                          Score {lead.leadScore}
                        </span>
                      </div>

                      {/* Quick Move Stage Arrows */}
                      <div
                        className="pt-2 border-t border-slate-100 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleMoveStage(lead.id, 'prev')}
                          disabled={stage.id === 'new_inbound'}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20"
                          title="Previous Stage"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                        >
                          Chat ({lead.chatHistory.length})
                        </button>
                        <button
                          onClick={() => handleMoveStage(lead.id, 'next')}
                          disabled={stage.id === 'lost' || stage.id === 'enrolled_won'}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20"
                          title="Next Stage"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive WhatsApp Live Chat Thread Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full h-[88vh] flex flex-col overflow-hidden">
            {/* WhatsApp Header */}
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm border-2 border-emerald-400">
                  {selectedLead.leadName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-sm text-white">
                      {selectedLead.leadName}
                    </h3>
                    <span className="font-mono text-[11px] text-emerald-200 font-normal">
                      ({selectedLead.phone})
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200 truncate">
                    {selectedLead.course} • {selectedLead.instituteName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Stage dropdown changer */}
                <select
                  value={selectedLead.stage}
                  onChange={(e) => handleChangeStage(selectedLead.id, e.target.value)}
                  className="bg-emerald-900 text-emerald-100 text-xs rounded-xl px-2.5 py-1.5 font-semibold border border-emerald-700 focus:outline-none"
                >
                  {PIPELINE_STAGES.map((s) => (
                    <option key={s.id} value={s.id} className="bg-slate-800 text-white">
                      {s.title}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-full hover:bg-emerald-700 text-emerald-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Action Chips Bar */}
            <div className="bg-emerald-50/70 border-b border-emerald-100 p-2.5 px-4 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
              <span className="text-emerald-800 font-bold text-[11px] shrink-0">⚡ Quick Actions:</span>
              <button
                onClick={() => handleQuickAction('brochure')}
                className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 font-semibold hover:bg-emerald-100 shrink-0 text-[11px] flex items-center gap-1 shadow-2xs"
              >
                <BookOpen className="w-3 h-3 text-emerald-600" /> Send Syllabus PDF
              </button>
              <button
                onClick={() => handleQuickAction('demo')}
                className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 font-semibold hover:bg-emerald-100 shrink-0 text-[11px] flex items-center gap-1 shadow-2xs"
              >
                <Calendar className="w-3 h-3 text-emerald-600" /> Book Demo Slot
              </button>
              <button
                onClick={() => handleQuickAction('payment')}
                className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 font-semibold hover:bg-emerald-100 shrink-0 text-[11px] flex items-center gap-1 shadow-2xs"
              >
                <DollarSign className="w-3 h-3 text-emerald-600" /> Send UPI Fee Link
              </button>
            </div>

            {/* Chat Messages Feed */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#efeae2]"
              style={{
                backgroundImage: 'radial-gradient(#d1d7db 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            >
              {selectedLead.chatHistory.map((chat, idx) => {
                const isLead = chat.sender === 'lead';
                const isBot = chat.sender === 'bot';

                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isLead ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs shadow-xs relative leading-relaxed ${
                        isLead
                          ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200'
                          : isBot
                          ? 'bg-emerald-100 text-emerald-950 rounded-tr-xs border border-emerald-300'
                          : 'bg-[#d9fdd3] text-slate-900 rounded-tr-xs border border-emerald-200'
                      }`}
                    >
                      {!isLead && (
                        <span className="text-[10px] font-bold block mb-1 text-emerald-800 flex items-center gap-1">
                          {isBot ? '🤖 Zenith AI Copilot' : `👤 ${selectedLead.counselor.split(' ')[0]}`}
                        </span>
                      )}
                      <p className="whitespace-pre-line">{chat.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                        <span>{chat.time}</span>
                        {!isLead && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2 shrink-0">
              <input
                type="text"
                placeholder="Type WhatsApp message or use quick canned responses above..."
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newChatText.trim()}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Inbound Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-black text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" /> Register Inbound WhatsApp Lead
              </h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-lg"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Student / Prospect Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ishaan Bansal"
                  value={newLeadForm.leadName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, leadName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Parent Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rakesh Bansal"
                  value={newLeadForm.parentName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, parentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">WhatsApp Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98XXX-XXXXX"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Course</label>
                <select
                  value={newLeadForm.course}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, course: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-semibold text-slate-800"
                >
                  <option>JEE Advanced Super-30 (Grade 11)</option>
                  <option>NEET Ultimate Intensive (Grade 12)</option>
                  <option>CA Foundation & Inter Dual Track</option>
                  <option>Full-Stack AI & Python Bootcamp</option>
                  <option>CLAT 2027 2-Year Comprehensive</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Campus</label>
                  <select
                    value={newLeadForm.instituteCode}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, instituteCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-semibold text-slate-800"
                  >
                    <option value="alpha">Alpha Kota & Delhi</option>
                    <option value="apex">Apex Medical Delhi</option>
                    <option value="beta">Beta Commerce Mumbai</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lead Temperature</label>
                  <select
                    value={newLeadForm.temperature}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, temperature: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-semibold text-slate-800"
                  >
                    <option value="Hot">🔥 Hot Intent</option>
                    <option value="Warm">⚡ Warm</option>
                    <option value="Cold">❄️ Cold</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  Save Inbound Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
