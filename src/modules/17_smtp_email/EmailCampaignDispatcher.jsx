import React, { useState, useMemo } from 'react';
import { 
  Send, Plus, Search, Filter, Mail, MessageSquare, CheckCircle2, 
  Clock, BarChart3, Users, Globe, ArrowRight, Eye, MousePointer, 
  AlertCircle, Sparkles, Check, Smartphone, Layers
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { CAMPAIGNS_DATA, TEMPLATES_DATA } from './smtpEmailData';

export default function EmailCampaignDispatcher({ instituteCode = 'ALL' }) {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [dispatchAlert, setDispatchAlert] = useState('');

  // New Campaign Form State
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    channel: 'Email',
    targetAudience: 'Grade 12 • JEE Super-30 & Foundation',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    subject: '',
    templateUsed: 'Monthly Academic Progress Card',
    recipientsCount: 350
  });

  // Multi-tenant filter
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filtered = useMemo(() => {
    return campaigns.filter(c => {
      const scope = isAllInstitutes || c.instituteCode === 'global' || c.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchSearch = 
        c.title.toLowerCase().includes(search.toLowerCase()) || 
        c.subject.toLowerCase().includes(search.toLowerCase()) ||
        c.targetAudience.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
      const matchChannel = channelFilter === 'ALL' || c.channel.toLowerCase().includes(channelFilter.toLowerCase());
      return scope && matchSearch && matchStatus && matchChannel;
    });
  }, [campaigns, instituteCode, isAllInstitutes, search, statusFilter, channelFilter]);

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.title) return;

    const newId = `CMP-${700 + campaigns.length + 1}`;
    const entry = {
      id: newId,
      title: newCampaign.title,
      channel: newCampaign.channel,
      targetAudience: newCampaign.targetAudience,
      instituteCode: newCampaign.instituteCode,
      instituteName: newCampaign.instituteName,
      totalRecipients: parseInt(newCampaign.recipientsCount) || 350,
      delivered: parseInt(newCampaign.recipientsCount) || 350,
      opened: Math.round((newCampaign.recipientsCount || 350) * 0.72),
      openRate: '72.0%',
      clicked: Math.round((newCampaign.recipientsCount || 350) * 0.38),
      clickRate: '38.0%',
      bounced: 0,
      status: 'Active',
      dispatchedDate: 'Just Now (Queued in SES Relay)',
      senderAddress: 'broadcast@eduzenith-cloud.com',
      subject: newCampaign.subject || newCampaign.title,
      templateUsed: newCampaign.templateUsed
    };

    setCampaigns([entry, ...campaigns]);
    setShowModal(false);
    setDispatchAlert(`Campaign #${newId} "${newCampaign.title}" initialized and dispatched across relay queue!`);
    setTimeout(() => setDispatchAlert(''), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200 flex items-center gap-1">
              <Send className="w-3.5 h-3.5 text-indigo-600" />
              Mass Communication Broadcast Engine
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Global Multi-Tenant Hub' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Email & SMS Campaign Dispatcher
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Orchestrate batch broadcasts, test score blasts, holiday advisories, and track real-time open and click telemetry.
          </p>
        </div>

        {/* Create Campaign Action */}
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Create & Launch Campaign
        </button>
      </div>

      {/* Dispatch Alert */}
      {dispatchAlert && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {dispatchAlert}
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">Broadcasting</span>
        </div>
      )}

      {/* 4 Mini Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="blue"
          title="Active & Queued"
          value={campaigns.filter(c => c.status === 'Active' || c.status === 'Scheduled').length.toString() + ' Campaigns'}
          subtitle="Running in SES Relay Queue"
          icon="🚀"
          badge="In Flight"
        />
        <KPICard
          theme="indigo"
          title="Audience Reached"
          value="18,400 Parents"
          subtitle="Across 5 Tuition Centers"
          icon="👥"
          badge="High Scale"
        />
        <KPICard
          theme="emerald"
          title="Mean Open Rate"
          value="68.4%"
          subtitle="Industry Avg: 45.0%"
          icon="👁️"
          badge="Above Target"
        />
        <KPICard
          theme="purple"
          title="Click-Through Rate (CTR)"
          value="34.2%"
          subtitle="Digital Sign & Pay Links"
          icon="🖱️"
          badge="High Intent"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search campaign title, subject, or audience batch..."
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={channelFilter}
            onChange={e => setChannelFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="ALL">All Channels</option>
            <option value="email">Email Only</option>
            <option value="sms">SMS Only</option>
            <option value="dual">Dual (Email + SMS)</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Campaigns Grid Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(c => (
          <div 
            key={c.id} 
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:border-slate-300 transition flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                      {c.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {c.channel}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1.5">{c.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{c.subject}</p>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                  c.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : c.status === 'Scheduled'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {c.status}
                </span>
              </div>

              {/* Audience & Scope */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Target Audience:</span>
                  <span className="font-bold text-slate-800">{c.instituteName}</span>
                </div>
                <div className="text-slate-700 font-semibold">{c.targetAudience}</div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                  Template: {c.templateUsed} • Dispatched: {c.dispatchedDate}
                </div>
              </div>

              {/* Progress Analytics Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center pt-3">
                <div className="p-2 rounded-lg bg-blue-50/50 border border-blue-100">
                  <span className="text-[10px] text-slate-500 font-bold block">Recipients</span>
                  <div className="font-mono text-sm font-black text-blue-700">{c.totalRecipients}</div>
                  <span className="text-[9px] text-emerald-600 font-semibold">100% Sent</span>
                </div>
                <div className="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
                  <span className="text-[10px] text-slate-500 font-bold block">Open Rate</span>
                  <div className="font-mono text-sm font-black text-indigo-700">{c.openRate}</div>
                  <span className="text-[9px] text-slate-400">{c.opened} Readers</span>
                </div>
                <div className="p-2 rounded-lg bg-purple-50/50 border border-purple-100">
                  <span className="text-[10px] text-slate-500 font-bold block">Click Rate</span>
                  <div className="font-mono text-sm font-black text-purple-700">{c.clickRate}</div>
                  <span className="text-[9px] text-slate-400">{c.clicked} Clicks</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Bounced: <strong className="text-slate-700">{c.bounced}</strong></span>
              <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
                View Transmission Ledger →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create & Launch Campaign */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base">
                  🚀
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Dispatch New Email / SMS Broadcast
                  </h3>
                  <p className="text-xs text-slate-500">Target parents and students with automated deliverability tracking</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JEE Mock 6 Rank Scorecards & Solution Key"
                  value={newCampaign.title}
                  onChange={e => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Channel Format</label>
                  <select
                    value={newCampaign.channel}
                    onChange={e => setNewCampaign({ ...newCampaign, channel: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none"
                  >
                    <option value="Email">Email (HTML Responsive)</option>
                    <option value="SMS">SMS (DLT Telecom 160-Char)</option>
                    <option value="Dual (Email + SMS)">Dual (Email + SMS Fallback)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campus Center</label>
                  <select
                    value={newCampaign.instituteCode}
                    onChange={e => {
                      const names = {
                        alpha: 'Alpha Institute of Science & Tech',
                        beta: 'Beta Commerce Academy (CA)',
                        apex: 'Apex Medical Prep',
                        delta: 'Delta Coding Academy',
                        zenith: 'Zenith Humanities & Law',
                        global: 'All Campuses (Enterprise Super Admin)'
                      };
                      setNewCampaign({
                        ...newCampaign,
                        instituteCode: e.target.value,
                        instituteName: names[e.target.value] || 'All Campuses'
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none"
                  >
                    <option value="global">All Campuses (Aggregated)</option>
                    <option value="alpha">Alpha Institute (Kota)</option>
                    <option value="beta">Beta Commerce (Mumbai)</option>
                    <option value="apex">Apex Medical (Delhi)</option>
                    <option value="delta">Delta Coding (Bengaluru)</option>
                    <option value="zenith">Zenith Humanities (Hyderabad)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Audience Group</label>
                  <select
                    value={newCampaign.targetAudience}
                    onChange={e => setNewCampaign({ ...newCampaign, targetAudience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none"
                  >
                    <option value="Grade 12 • JEE Super-30 & Foundation">Grade 12 • JEE Super-30</option>
                    <option value="CA Foundation • Batch Alpha">CA Foundation Batch</option>
                    <option value="NEET Target AIIMS • Batch Alpha">NEET Target AIIMS</option>
                    <option value="Q3 Fee Defaulters (>15 days late)">Q3 Fee Defaulters</option>
                    <option value="All Registered Guardians (4,890 Parents)">All Registered Guardians</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Use Pre-Built Template</label>
                  <select
                    value={newCampaign.templateUsed}
                    onChange={e => setNewCampaign({ ...newCampaign, templateUsed: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none"
                  >
                    {TEMPLATES_DATA.map(t => (
                      <option key={t.id} value={t.name}>
                        [{t.type}] {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Subject Line / SMS Header</label>
                <input
                  type="text"
                  placeholder="e.g. Important Update: Official Test Scorecard Published"
                  value={newCampaign.subject}
                  onChange={e => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                <span className="text-slate-600 text-xs">Simulate test delivery to admin first?</span>
                <button
                  type="button"
                  onClick={() => alert('Test probe email & SMS dispatched to admin@eduzenith-cloud.com. Check inbox!')}
                  className="px-2.5 py-1 bg-white border border-indigo-200 text-indigo-700 font-bold text-[11px] rounded-lg shadow-xs hover:bg-indigo-100"
                >
                  Send Test Preview
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  Confirm & Broadcast Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
