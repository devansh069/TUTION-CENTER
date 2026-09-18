import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Mail, Smartphone, CheckCircle2, 
  Copy, Eye, Edit3, Trash2, Tag, ShieldCheck, Sparkles, AlertCircle, Check
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { TEMPLATES_DATA } from './smtpEmailData';

export default function TemplatesManager({ instituteCode = 'ALL' }) {
  const [templates, setTemplates] = useState(TEMPLATES_DATA);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'Email', 'SMS'
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [copiedVar, setCopiedVar] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Form state
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'Email',
    category: 'Academics',
    subject: '',
    dltId: '',
    body: '',
  });

  const filtered = templates.filter(t => {
    const matchTab = activeTab === 'ALL' || t.type === activeTab;
    const matchSearch = 
      t.name.toLowerCase().includes(search.toLowerCase()) || 
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleCopyVariable = (varName) => {
    navigator.clipboard?.writeText(varName);
    setCopiedVar(varName);
    setTimeout(() => setCopiedVar(''), 2000);
  };

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    if (!newTemplate.name || !newTemplate.body) return;

    const newId = `TMP-${newTemplate.type === 'Email' ? 'EML' : 'SMS'}-0${templates.length + 1}`;
    const entry = {
      id: newId,
      type: newTemplate.type,
      category: newTemplate.category,
      name: newTemplate.name,
      subject: newTemplate.subject || `Notification from Zenith ERP`,
      dltId: newTemplate.type === 'SMS' ? (newTemplate.dltId || 'DLT-140716889211099') : undefined,
      variables: ['{{student_name}}', '{{parent_name}}', '{{date}}'],
      previewText: newTemplate.body,
      usageCount: 0,
      status: newTemplate.type === 'SMS' ? 'DLT Registered (TRAI)' : 'Approved & Active',
      format: newTemplate.type === 'SMS' ? 'GSM 7-bit (160 char limit)' : 'HTML Rich Responsive',
      lastModified: 'Today, Just Now'
    };

    setTemplates([entry, ...templates]);
    setShowCreateModal(false);
    setSuccessNotice(`Template #${newId} "${newTemplate.name}" created and synced to gateway!`);
    setTimeout(() => setSuccessNotice(''), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              Standardized Messaging Repository
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Global Multi-Tenant Hub' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Email & SMS Templates Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage responsive HTML progress cards, fee invoices, and TRAI DLT-approved transactional SMS alert templates.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Create New Template
        </button>
      </div>

      {/* Action Notification */}
      {successNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {successNotice}
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">Saved</span>
        </div>
      )}

      {/* 4 Mini KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Active Templates"
          value={`${templates.length} Templates`}
          subtitle="Email HTML & SMS DLT"
          icon="📄"
          badge="Verified"
        />
        <KPICard
          theme="emerald"
          title="TRAI DLT Whitelisted"
          value="100% Compliant"
          subtitle="Zero Carrier Spam Drop"
          icon="🛡️"
          badge="Telecom Pass"
        />
        <KPICard
          theme="blue"
          title="Dynamic Variables"
          value="8 Tags Supported"
          subtitle="{student}, {amount}, {link}"
          icon="🏷️"
          badge="Personalized"
        />
        <KPICard
          theme="purple"
          title="Cumulative Transmissions"
          value="53,400+ Sends"
          subtitle="Lifetime Template Usage"
          icon="📨"
          badge="High Reliability"
        />
      </div>

      {/* Search & Channel Switcher */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search template name, subject, or category..."
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
          />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Templates ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('Email')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeTab === 'Email' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3 h-3" />
            Email Templates
          </button>
          <button
            onClick={() => setActiveTab('SMS')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              activeTab === 'SMS' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            SMS Templates (DLT)
          </button>
        </div>
      </div>

      {/* Templates Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(t => (
          <div 
            key={t.id} 
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-3.5 hover:border-slate-300 transition flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                      {t.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      t.type === 'Email' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {t.type}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Category: <strong>{t.category}</strong>
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1.5">{t.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{t.subject}</p>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {t.status}
                </span>
              </div>

              {/* Preview Box */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Preview Payload:
                </span>
                <p className="text-slate-700 text-[11px] leading-relaxed line-clamp-2">
                  {t.previewText}
                </p>
                {t.dltId && (
                  <div className="mt-2 text-[10px] text-indigo-700 font-mono font-semibold pt-1.5 border-t border-slate-200/60">
                    TRAI DLT Entity ID: {t.dltId}
                  </div>
                )}
              </div>

              {/* Dynamic Variables */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Available Merge Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {t.variables.map(v => (
                    <button
                      key={v}
                      onClick={() => handleCopyVariable(v)}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-mono transition inline-flex items-center gap-1"
                      title="Click to copy variable"
                    >
                      <span>{v}</span>
                      {copiedVar === v ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5 text-slate-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Dispatches: <strong className="text-slate-800">{t.usageCount.toLocaleString()}</strong></span>
              <button
                onClick={() => setPreviewTemplate(t)}
                className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
              >
                <Eye className="w-3 h-3" /> Inspect Live Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Inspect Live Preview */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">{previewTemplate.type === 'Email' ? '📧' : '📱'}</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {previewTemplate.name}
                  </h3>
                  <p className="text-xs text-slate-500">{previewTemplate.type} • {previewTemplate.format}</p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 text-[10px] block font-bold uppercase">Rendered Subject Line:</span>
                <div className="font-bold text-slate-800 text-[11px]">
                  {previewTemplate.subject.replace('{{student_name}}', 'Aarav Sharma').replace('{{month_year}}', 'August 2026')}
                </div>
              </div>

              <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-200">
                  <span>Handset Simulation</span>
                  <span>Zenith Communications Engine</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl shadow-xs text-slate-800 text-xs leading-relaxed font-sans">
                  {previewTemplate.previewText
                    .replace('{{parent_name}}', 'Sunita Sharma')
                    .replace('{{student_name}}', 'Aarav Sharma')
                    .replace('{{attendance_pct}}', '96.4')
                    .replace('{{score_avg}}', '88.5')
                    .replace('{{month_year}}', 'August 2026')
                    .replace('{{amount}}', '24,500')
                    .replace('{{time}}', '07:58 AM')}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create New Template */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base">
                  📝
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Draft New Communication Template
                  </h3>
                  <p className="text-xs text-slate-500">Configure merge variables and telecom registration details</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTemplate} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Template Format *</label>
                  <select
                    value={newTemplate.type}
                    onChange={e => setNewTemplate({ ...newTemplate, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none"
                  >
                    <option value="Email">Email (HTML Responsive)</option>
                    <option value="SMS">SMS (DLT Telecom Approved)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Functional Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={e => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none"
                  >
                    <option value="Academics">Academics & Tests</option>
                    <option value="Finance">Finance & Receipts</option>
                    <option value="Security">Security & Biometrics</option>
                    <option value="Administration">Administration & PTM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Template Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saturday Doubt Session Cancellation Alert"
                  value={newTemplate.name}
                  onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject Line / DLT Header</label>
                <input
                  type="text"
                  placeholder="e.g. Notice: Class Schedule Adjustment for {{batch_name}}"
                  value={newTemplate.subject}
                  onChange={e => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Message Body Content *</label>
                  {newTemplate.type === 'SMS' && (
                    <span className={`text-[10px] font-mono font-bold ${
                      (newTemplate.body?.length || 0) > 160 ? 'text-rose-600' : 'text-slate-500'
                    }`}>
                      {newTemplate.body?.length || 0} / 160 Chars (1 SMS segment)
                    </span>
                  )}
                </div>
                <textarea
                  rows="3"
                  required
                  placeholder="Type your message with dynamic variables: Dear {{parent_name}}, your ward {{student_name}}..."
                  value={newTemplate.body}
                  onChange={e => setNewTemplate({ ...newTemplate, body: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Click-to-insert variables helper */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Click to append variable into body:</span>
                <div className="flex flex-wrap gap-1">
                  {['{{student_name}}', '{{parent_name}}', '{{batch_name}}', '{{due_amount}}', '{{time}}', '{{portal_link}}'].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setNewTemplate({ ...newTemplate, body: (newTemplate.body || '') + ' ' + v })}
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 text-[10px] font-mono transition"
                    >
                      + {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  Save & Whitelist Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
