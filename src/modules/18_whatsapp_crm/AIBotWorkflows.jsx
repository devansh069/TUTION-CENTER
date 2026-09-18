import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Zap,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  Sliders,
  Send,
  Smartphone,
  BookOpen,
  Calendar,
  DollarSign,
  ShieldCheck,
  X,
  RefreshCw,
  Plus,
  ArrowRight
} from 'lucide-react';
import { BOT_WORKFLOWS } from './whatsappCrmData';

export default function AIBotWorkflows() {
  const [workflows, setWorkflows] = useState(BOT_WORKFLOWS);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simMessages, setSimMessages] = useState([
    { sender: 'bot', text: 'Namaste! Welcome to Zenith Cloud Academy. Type "BROCHURE" for 2026-27 courses, "DEMO" to book a trial lecture, or "FEES" for payment links.', time: '10:00 AM' }
  ]);
  const [simInput, setSimInput] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleWorkflowStatus = (id) => {
    setWorkflows(prev =>
      prev.map(w => {
        if (w.id !== id) return w;
        const newStatus = w.status === 'Active' ? 'Paused' : 'Active';
        showToast(`Workflow "${w.name}" marked as ${newStatus}.`);
        return { ...w, status: newStatus };
      })
    );
  };

  const handleSimSend = (forcedText) => {
    const textToSend = forcedText || simInput;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend.trim(), time: 'Just now' };
    const updated = [...simMessages, userMsg];
    setSimMessages(updated);
    setSimInput('');

    // Determine bot automated response based on keyword matching
    const upper = textToSend.toUpperCase();
    setTimeout(() => {
      let reply = '';
      let options = [];

      if (upper.includes('BROCHURE') || upper.includes('SYLLABUS') || upper.includes('COURSE')) {
        reply = '📄 Transmitted: Alpha & Apex 2026-27 Master Prospectus & Syllabus Guide (PDF, 4.2 MB). Click below to book a free 1-on-1 demo with our senior faculty:';
        options = ['Book Free Demo', 'Tuition Fee Structure'];
      } else if (upper.includes('DEMO') || upper.includes('TRIAL') || upper.includes('SCHEDULE')) {
        reply = '📅 3 Trial Slots Available for JEE / NEET Demo:\n1. Saturday 10:00 AM (Physics • Er. Sanjay Verma)\n2. Saturday 04:00 PM (Chemistry • Dr. Roy)\n3. Sunday 11:00 AM (Maths • Prof. Sen)';
        options = ['Confirm Sat 10 AM', 'Confirm Sun 11 AM'];
      } else if (upper.includes('FEE') || upper.includes('PAY') || upper.includes('DUES')) {
        reply = '💳 Official Razorpay UPI Payment Link: https://pay.eduzenith.net/checkout/fee-due\nInstant 100% tax receipt generated upon payment completion.';
      } else if (upper.includes('GATE') || upper.includes('ATTENDANCE')) {
        reply = '📸 Turnstile Check-in Alert: Student Aarav Sharma scanned face at Kota Main Gate at 07:58 AM. Verified on campus.';
      } else {
        reply = '🤖 Thanks for your message! Our academic counselor Priya Sharma has been notified and will connect with you in under 5 minutes.';
      }

      setSimMessages(prev => [...prev, { sender: 'bot', text: reply, time: 'Just now', options }]);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast */}
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
            Module 18 • Conversational AI & Webhooks
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Bot className="w-6.5 h-6.5 mr-2 text-emerald-600" /> AI Bot Workflows & Automations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Meta WhatsApp Cloud API event triggers, 24/7 autonomous brochure dispatchers, and trial lecture reservation bots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSimulator(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <Smartphone className="w-4 h-4" /> Live Mobile Simulator
          </button>
        </div>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Total Bot Triggers</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">68,820</p>
            <span className="text-[10px] font-semibold text-emerald-600">This Month Cycle</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Mean Bot Latency</span>
            <p className="text-xl font-black text-indigo-600 mt-0.5">1.2 sec</p>
            <span className="text-[10px] font-semibold text-slate-500">Autonomous Instant SLA</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Execution Success</span>
            <p className="text-xl font-black text-emerald-600 mt-0.5">98.6%</p>
            <span className="text-[10px] font-semibold text-emerald-600">Clean Meta API Webhooks</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Counselor Handover</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">14.2%</p>
            <span className="text-[10px] font-semibold text-slate-500">Warm Human Escalations</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Bot Workflows Grid */}
      <div className="space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-emerald-600" /> Active Autonomous Bot Workflows
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-200 transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {wf.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {wf.category}
                      </span>
                    </div>
                    <h4 className="font-heading font-black text-sm text-slate-900 mt-1.5">
                      {wf.name}
                    </h4>
                  </div>

                  <button
                    onClick={() => toggleWorkflowStatus(wf.id)}
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      wf.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {wf.status === 'Active' ? <Play className="w-3 h-3 fill-emerald-800" /> : <Pause className="w-3 h-3" />}
                    {wf.status}
                  </button>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{wf.description}</p>

                {/* Trigger conditions */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-slate-700 shrink-0">Trigger:</span>
                    <span className="text-slate-600 italic">{wf.trigger}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Keyword Hooks:</span>
                    {wf.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-emerald-700 border border-slate-200"
                      >
                        "{kw}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics & Action Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Delay</span>
                    <span className="font-mono font-bold text-slate-800">{wf.responseDelay}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Executions</span>
                    <span className="font-mono font-bold text-slate-800">{wf.totalExecutions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Success</span>
                    <span className="font-mono font-bold text-emerald-600">{wf.successRate}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowSimulator(true);
                    handleSimSend(wf.keywords[0]);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  Test In Phone
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Mobile Handset Simulator Modal */}
      {showSimulator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 p-4 rounded-[40px] shadow-2xl border-4 border-slate-800 max-w-sm w-full relative">
            {/* Top Phone Speaker / Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

            {/* Inner Phone Screen */}
            <div className="bg-[#efeae2] rounded-3xl h-[600px] flex flex-col overflow-hidden text-xs">
              {/* WhatsApp App Bar */}
              <div className="bg-emerald-800 text-white p-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                    🤖
                  </div>
                  <div>
                    <div className="font-bold text-xs">Zenith AI Admission Bot</div>
                    <div className="text-[9px] text-emerald-200">Online • Typically replies instantly</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSimulator(false)}
                  className="p-1 rounded-full text-emerald-200 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
                {simMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-2.5 rounded-xl shadow-2xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                      }`}
                    >
                      <p className="whitespace-pre-line text-[11px]">{msg.text}</p>
                      <span className="text-[9px] text-slate-400 block text-right mt-0.5">{msg.time}</span>
                    </div>

                    {/* Interactive Button Chips */}
                    {msg.options && (
                      <div className="flex flex-col gap-1 mt-1 w-full max-w-[85%]">
                        {msg.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleSimSend(opt)}
                            className="w-full py-1.5 px-3 bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-[11px] rounded-lg border border-emerald-200 text-center transition-colors shadow-2xs"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Preset Keyword Shortcuts */}
              <div className="bg-slate-100 p-1.5 border-t border-slate-200 flex items-center gap-1 overflow-x-auto shrink-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase shrink-0 px-1">Test:</span>
                {['BROCHURE', 'DEMO', 'FEES', 'GATE'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleSimSend(kw)}
                    className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-mono font-bold border border-slate-200 hover:bg-emerald-50 shrink-0"
                  >
                    {kw}
                  </button>
                ))}
              </div>

              {/* Input bar */}
              <div className="p-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 shrink-0">
                <input
                  type="text"
                  placeholder="Type keyword..."
                  value={simInput}
                  onChange={(e) => setSimInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSimSend()}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                />
                <button
                  onClick={() => handleSimSend()}
                  className="p-2 rounded-xl bg-emerald-600 text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
