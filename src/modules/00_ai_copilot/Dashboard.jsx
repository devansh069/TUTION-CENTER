import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, AlertTriangle, FileText, UserCheck, HeartHandshake, 
  DollarSign, ShieldAlert, CheckCircle2, Search, ArrowUpRight, 
  RefreshCw, Zap, Brain, Send, Eye, Award, Calendar, Camera,
  TrendingUp, Activity, Cpu, CheckCircle, BarChart3, Filter
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { 
  AI_DROPOUT_PREDICTOR_DATA, 
  AI_OCR_SUBMISSIONS_DATA, 
  AI_SUBSTITUTIONS_DATA, 
  AI_PTM_BRIEFS_DATA, 
  AI_RECOVERY_LEADS_DATA, 
  AI_SPOOF_LOGS_DATA
} from '../../data/erpData';

export default function AIDashboard({ instituteCode = 'all', activeTab = 'all' }) {
  const [currentAiFeature, setCurrentAiFeature] = useState(activeTab || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [notification, setNotification] = useState(null);

  // Sync state whenever activeTab prop changes from sidebar navigation
  useEffect(() => {
    if (activeTab && activeTab !== 'dashboard') {
      setCurrentAiFeature(activeTab);
    } else {
      setCurrentAiFeature('all');
    }
  }, [activeTab]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Filter datasets by institute
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  const dropouts = useMemo(() => {
    return AI_DROPOUT_PREDICTOR_DATA.filter(d => {
      const matchInst = isAll || d.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || d.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || d.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRisk = riskFilter === 'ALL' || (riskFilter === 'HIGH' && d.dropoutRisk >= 60) || (riskFilter === 'MEDIUM' && d.dropoutRisk < 60 && d.dropoutRisk >= 40);
      return matchInst && matchSearch && matchRisk;
    });
  }, [instituteCode, isAll, searchTerm, riskFilter]);

  const ocrSubmissions = useMemo(() => {
    return AI_OCR_SUBMISSIONS_DATA.filter(o => {
      const matchInst = isAll || o.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || o.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || o.subject.toLowerCase().includes(searchTerm.toLowerCase());
      return matchInst && matchSearch;
    });
  }, [instituteCode, isAll, searchTerm]);

  const substitutions = useMemo(() => {
    return AI_SUBSTITUTIONS_DATA.filter(s => isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  }, [instituteCode, isAll]);

  const ptmBriefs = useMemo(() => {
    return AI_PTM_BRIEFS_DATA.filter(b => {
      const matchInst = isAll || b.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || b.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || b.parentName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchInst && matchSearch;
    });
  }, [instituteCode, isAll, searchTerm]);

  const recoveryLeads = useMemo(() => {
    return AI_RECOVERY_LEADS_DATA.filter(r => {
      const matchInst = isAll || r.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || r.parentName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchInst && matchSearch;
    });
  }, [instituteCode, isAll, searchTerm]);

  const spoofLogs = useMemo(() => {
    return AI_SPOOF_LOGS_DATA.filter(s => isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  }, [instituteCode, isAll]);

  // Dynamic Header Titles depending on active AI feature
  const featureTitles = {
    all: { title: "AI Intelligence Suite & Predictive Copilot", sub: "Command hub for all 6 real-time machine learning & vision AI automation engines." },
    ai_dropout_predictor: { title: "1. AI Student Dropout & Rank Predictor", sub: "Flags at-risk students 3–4 weeks before failure based on Attendance decay, HW delays, and Mock test percentile drops." },
    ai_ocr_grader: { title: "2. AI Vision OCR HW & Exam Auto-Grader", sub: "Scans student handwritten math/physics answer sheets, checks step derivations, flags sign mistakes, and awards partial marks." },
    ai_substitutions: { title: "3. AI Smart Faculty Substitution Optimizer", sub: "Instantly finds clash-free, highly-qualified substitute faculty whenever an instructor is absent or late." },
    ai_ptm_copilot: { title: "4. AI PTM Report Copilot for Teachers", sub: "Generates 1-page parent meeting dossiers with strengths, weak topics, and custom talk track scripts." },
    ai_fee_recovery: { title: "5. AI Fee Recovery & Payment Propensity Predictor", sub: "Predicts payment likelihood and drafts localized WhatsApp reminders at optimal response hours." },
    ai_anti_spoof: { title: "6. AI Turnstile Anti-Spoof & Buddy Punching Detector", sub: "Edge neural network blocking screen photos, 3D silicone masks, and dual-tailgating attendance fraud." },
    rep_ai_accuracy: { title: "AI Model Precision, Latency & Financial ROI Audit", sub: "Deep telemetry report tracking F1 scores, vision OCR accuracy, inference speed, and estimated annual cost savings." }
  };

  const currentMeta = featureTitles[currentAiFeature] || featureTitles.all;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-3 text-xs font-semibold animate-bounce">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-extrabold uppercase tracking-wide border border-purple-200 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-600 animate-spin" /> Next-Gen AI Automation Engine
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
              6 AI Sub-Engines Active
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Brain className="w-6.5 h-6.5 mr-2 text-indigo-600" /> {currentMeta.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">{currentMeta.sub}</p>
        </div>

        {/* Global Action Trigger */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => showToast("Triggered real-time neural model sync across all campuses.")}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Sync AI Models
          </button>
        </div>
      </div>

      {/* Top 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="At-Risk Dropout Flags" 
          value={`${AI_DROPOUT_PREDICTOR_DATA.filter(d => d.dropoutRisk >= 60).length} High-Risk Students`} 
          subtext="Early Warning System Active" 
          icon={AlertTriangle} 
          color="rose" 
          badge="3-Wk Early Notice" 
        />
        <KPICard 
          title="Vision OCR HW Grading" 
          value="75% Time Saved" 
          subtext="Step-by-step Partial Marks" 
          icon={FileText} 
          color="blue" 
          badge="Vision AI v4.2" 
        />
        <KPICard 
          title="AI Fee Recovery Rate" 
          value="88% Propensity" 
          subtext="Multi-Lingual WhatsApp Nudges" 
          icon={DollarSign} 
          color="green" 
          badge="Empathetic AI" 
        />
        <KPICard 
          title="Turnstile Anti-Spoofing" 
          value="99.8% Liveness" 
          subtext="Photo Screen Fraud Blocked" 
          icon={ShieldAlert} 
          color="purple" 
          badge="Edge AI Active" 
        />
      </div>

      {/* 6 AI FEATURES NAV TABS */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setCurrentAiFeature('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            currentAiFeature === 'all' || currentAiFeature === 'dashboard' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All 6 AI Engines
        </button>
        <button
          onClick={() => setCurrentAiFeature('ai_dropout_predictor')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentAiFeature === 'ai_dropout_predictor' ? 'bg-white text-rose-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-500" />
          1. AI Dropout & Rank Predictor
        </button>
        <button
          onClick={() => setCurrentAiFeature('ai_ocr_grader')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentAiFeature === 'ai_ocr_grader' ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 mr-1 text-blue-500" />
          2. Vision OCR HW Auto-Grader
        </button>
        <button
          onClick={() => setCurrentAiFeature('ai_substitutions')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentAiFeature === 'ai_substitutions' ? 'bg-white text-purple-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 mr-1 text-purple-500" />
          3. Smart Faculty Substitution
        </button>
        <button
          onClick={() => setCurrentAiFeature('ai_ptm_copilot')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentAiFeature === 'ai_ptm_copilot' ? 'bg-white text-emerald-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5 mr-1 text-emerald-500" />
          4. AI PTM Report Copilot
        </button>
        <button
          onClick={() => setCurrentAiFeature('ai_fee_recovery')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentAiFeature === 'ai_fee_recovery' ? 'bg-white text-amber-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 mr-1 text-amber-500" />
          5. Fee Recovery Predictor
        </button>
        <button
          onClick={() => setCurrentAiFeature('ai_anti_spoof')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentAiFeature === 'ai_anti_spoof' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 mr-1 text-slate-800" />
          6. Anti-Spoof Detector
        </button>
      </div>

      {/* FILTER & SEARCH BAR (when a specific AI feature is active) */}
      {currentAiFeature !== 'all' && currentAiFeature !== 'dashboard' && currentAiFeature !== 'rep_ai_accuracy' && (
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${currentMeta.title}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {currentAiFeature === 'ai_dropout_predictor' && (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-600 flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" /> Risk Level:
              </span>
              <button 
                onClick={() => setRiskFilter('ALL')} 
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${riskFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                All
              </button>
              <button 
                onClick={() => setRiskFilter('HIGH')} 
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${riskFilter === 'HIGH' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}
              >
                High Risk (≥60%)
              </button>
              <button 
                onClick={() => setRiskFilter('MEDIUM')} 
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${riskFilter === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}
              >
                Moderate (40-59%)
              </button>
            </div>
          )}
        </div>
      )}

      {/* SECTION 1: AI STUDENT DROPOUT & RANK PREDICTOR */}
      {(currentAiFeature === 'all' || currentAiFeature === 'dashboard' || currentAiFeature === 'ai_dropout_predictor') && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-black uppercase">
                AI Feature 01 • Predictive Risk Engine
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900 mt-1 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-rose-600" /> AI Student Dropout & Rank Predictor
              </h3>
              <p className="text-xs text-slate-500">
                Flags at-risk students 3–4 weeks before failure based on Attendance decay, HW delays, and Mock test percentile drops.
              </p>
            </div>
            <button 
              onClick={() => showToast("Batch Risk Scan Completed: Scanned 1,240 records across active branches.")}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200"
            >
              Run Batch Risk Scan
            </button>
          </div>

          {dropouts.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No student dropout alerts matched the search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dropouts.map(d => (
                <div key={d.studentId} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-rose-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={d.photo} alt={d.studentName} className="w-11 h-11 rounded-xl object-cover border border-slate-300 shadow-2xs" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{d.studentName}</h4>
                        <p className="text-xs text-slate-500">{d.batchName} • <span className="font-mono text-slate-700 font-bold">{d.studentId}</span></p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                      d.dropoutRisk >= 70 ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      d.dropoutRisk >= 50 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {d.dropoutRisk}% Risk ({d.riskLevel})
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-700">
                      <span className="font-semibold text-slate-500">Attendance Decay:</span>
                      <span className="font-bold text-rose-600">{d.attendanceDrop}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span className="font-semibold text-slate-500">HW Submission:</span>
                      <span className="font-bold text-amber-600">{d.homeworkDelayRate}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span className="font-semibold text-slate-500">Mock Percentile:</span>
                      <span className="font-bold text-rose-700">{d.testPercentileDecay}</span>
                    </div>
                  </div>

                  <div className="text-xs">
                    <span className="font-bold text-slate-700 block mb-1">AI Root Cause Analysis:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600 italic">
                      {d.primaryRootCauses.map((rc, i) => (
                        <li key={i}>{rc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs gap-2">
                    <span className="text-[11px] font-semibold text-indigo-700 truncate">💡 {d.aiRecommendation}</span>
                    <button 
                      onClick={() => showToast(`Scheduled AI Counselor Call with ${d.parentName} (${d.parentPhone})`)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shrink-0 shadow-2xs"
                    >
                      Schedule PTM Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: AI HANDWRITTEN HOMEWORK VISION OCR AUTO-GRADER */}
      {(currentAiFeature === 'all' || currentAiFeature === 'dashboard' || currentAiFeature === 'ai_ocr_grader') && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black uppercase">
                AI Feature 02 • Computer Vision OCR
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900 mt-1 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" /> AI Handwritten Homework & Exam Auto-Grader
              </h3>
              <p className="text-xs text-slate-500">
                Scans student handwritten math/physics answer sheets, checks step derivations, flags vector sign mistakes in red, and awards partial marks.
              </p>
            </div>
            <button 
              onClick={() => showToast("Re-running Vision AI OCR engine across pending submissions queue...")}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200"
            >
              Re-scan Pending Sheets
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ocrSubmissions.map(s => (
              <div key={s.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-blue-300 transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{s.studentName} — <span className="text-indigo-600">{s.topic}</span></h4>
                    <p className="text-xs text-slate-500">{s.subject} • Submitted {s.submittedTime}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                    {s.aiGradedScore} / {s.maxScore} Marks ({s.aiGradePercentage}%)
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <img src={s.uploadedScan} alt="Handwritten Scan" className="w-24 h-24 rounded-lg object-cover border border-slate-300 shrink-0 shadow-2xs" />
                  <div className="flex-1 space-y-1.5 text-xs">
                    <span className="font-bold text-slate-700 block text-[11px]">Step-by-Step Vision Audit:</span>
                    {s.stepsAudit.map(st => (
                      <div key={st.stepNo} className="p-1.5 rounded-md bg-white border border-slate-200 text-[11px] flex justify-between">
                        <span>Step {st.stepNo}: {st.description}</span>
                        <span className={`font-bold ${st.status.includes('Error') || st.status.includes('Mistake') ? 'text-rose-600' : 'text-emerald-600'}`}>
                          +{st.points} pt ({st.status})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900">
                  <span className="font-bold block text-[10px] uppercase tracking-wider text-indigo-700">AI Grading Insight:</span>
                  {s.aiFeedback}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: AI SMART FACULTY SUBSTITUTION OPTIMIZER */}
      {(currentAiFeature === 'all' || currentAiFeature === 'dashboard' || currentAiFeature === 'ai_substitutions') && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-black uppercase">
                AI Feature 03 • Resource & Timetable Optimizer
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900 mt-1 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-purple-600" /> AI Smart Faculty Substitution Optimizer
              </h3>
              <p className="text-xs text-slate-500">
                When a faculty member is late or absent, the AI checks campus availability and qualifications to recommend top substitute teachers.
              </p>
            </div>
            <button 
              onClick={() => showToast("AI Smart Faculty Scheduler: Scanned all campus time-slots. 0 timetable conflicts found.")}
              className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200"
            >
              Scan Faculty Roster
            </button>
          </div>

          {substitutions.map(sub => (
            <div key={sub.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-purple-300 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-100 text-rose-800">
                    ABSENT FACULTY: {sub.absentFaculty}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{sub.affectedBatch} — {sub.absentSubject}</h4>
                  <p className="text-xs text-slate-500">Class Slot: {sub.classTime} • Reason: {sub.reason}</p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-xs text-slate-700">AI Recommended Substitutes (Zero Schedule Clash):</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sub.recommendations.map(r => (
                    <div key={r.facultyId} className="p-3 rounded-lg bg-white border border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{r.facultyName} <span className="text-slate-400 font-normal">({r.qualification})</span></p>
                        <p className="text-[11px] text-emerald-600 font-semibold">{r.availability} • Rating {r.rating}★</p>
                      </div>
                      <button 
                        onClick={() => showToast(`Deployed ${r.facultyName} as substitute for ${sub.affectedBatch}. Mobile alert sent.`)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs"
                      >
                        {r.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 4: AI PTM REPORT COPILOT */}
      {(currentAiFeature === 'all' || currentAiFeature === 'dashboard' || currentAiFeature === 'ai_ptm_copilot') && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                AI Feature 04 • Executive PTM Scripting
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900 mt-1 flex items-center">
                <HeartHandshake className="w-5 h-5 mr-2 text-emerald-600" /> AI PTM Report Copilot for Teachers
              </h3>
              <p className="text-xs text-slate-500">
                Generates a 1-page parent meeting brief with student strengths, vulnerable topics, and tailored advice scripts.
              </p>
            </div>
            <button 
              onClick={() => showToast("Generated 24 Parent-Teacher Meeting AI Dossiers in PDF format.")}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200"
            >
              Batch Generate PDF Dossiers
            </button>
          </div>

          {ptmBriefs.map(b => (
            <div key={b.studentId} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-300 transition-all">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{b.studentName} — <span className="text-indigo-600">{b.batchName}</span></h4>
                  <p className="text-xs text-slate-500">Parent: <span className="font-bold text-slate-800">{b.parentName}</span> • Grade: <span className="font-bold text-emerald-600">{b.overallGrade}</span></p>
                </div>
                <button 
                  onClick={() => showToast(`Printed Executive AI PTM Dossier for ${b.studentName}`)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs"
                >
                  Print PTM Dossier
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                  <span className="font-extrabold text-emerald-900 block mb-1">🌟 Key Strengths:</span>
                  <ul className="list-disc pl-4 space-y-1 text-emerald-800">
                    {b.keyStrengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                  <span className="font-extrabold text-amber-900 block mb-1">⚠️ Vulnerable Focus Topics:</span>
                  <ul className="list-disc pl-4 space-y-1 text-amber-800">
                    {b.vulnerableTopics.map((v, i) => <li key={i}>{v}</li>)}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-indigo-700 block mb-1">💬 Teacher Talk Track Script:</span>
                <p className="italic">"{b.parentScript}"</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 5: AI FEE RECOVERY & PROPENSITY PREDICTOR */}
      {(currentAiFeature === 'all' || currentAiFeature === 'dashboard' || currentAiFeature === 'ai_fee_recovery') && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-black uppercase">
                AI Feature 05 • Empathetic Financial Recovery
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900 mt-1 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-amber-600" /> AI Fee Recovery & Propensity-to-Pay Predictor
              </h3>
              <p className="text-xs text-slate-500">
                Predicts payment likelihood and drafts personalized WhatsApp reminders in regional languages scheduled at optimal hours.
              </p>
            </div>
            <button 
              onClick={() => showToast("AI Multi-lingual WhatsApp dispatch queued for 12 overdue accounts.")}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200"
            >
              Dispatch Batch WhatsApp Nudges
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recoveryLeads.map(r => (
              <div key={r.studentId} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-amber-300 transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{r.parentName} <span className="text-slate-400 font-normal">({r.studentName})</span></h4>
                    <p className="text-xs font-mono text-rose-600 font-bold">${r.overdueAmount} Overdue ({r.daysOverdue} days)</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-800">
                    {r.recoveryScore}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Language: <strong>{r.suggestedLanguage}</strong></span>
                    <span>Best Time: <strong>{r.suggestedScheduleTime}</strong></span>
                  </div>
                  <p className="p-2 bg-slate-50 rounded-lg border border-slate-100 italic text-slate-700">
                    "{r.draftWhatsAppMessage}"
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-600 font-bold">✓ Payment Gateway Link Attached</span>
                  <button 
                    onClick={() => showToast(`Dispatched AI WhatsApp Reminder to ${r.parentPhone}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs"
                  >
                    Send WhatsApp Nudge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: AI TURNSTILE ANTI-SPOOF & BUDDY PUNCHING DETECTOR */}
      {(currentAiFeature === 'all' || currentAiFeature === 'dashboard' || currentAiFeature === 'ai_anti_spoof') && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-black uppercase">
                AI Feature 06 • Edge Anti-Spoof Vision
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900 mt-1 flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2 text-slate-800" /> AI Turnstile Anti-Spoof & Buddy-Punching Detector
              </h3>
              <p className="text-xs text-slate-500">
                Flags digital photo screen spoofing, 3D silicone mask fraud, and dual-tailgating buddy punching attempts.
              </p>
            </div>
            <button 
              onClick={() => showToast("Recalibrated Edge Camera Liveness Thresholds to 99.8% precision.")}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300"
            >
              Recalibrate Edge Sensors
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spoofLogs.map(s => (
              <div key={s.id} className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold border border-rose-500/30">
                    SECURITY FRAUD DETECTED
                  </span>
                  <span className="text-slate-400 text-xs font-mono">{s.timestamp}</span>
                </div>

                <div className="flex space-x-3 items-center">
                  <img src={s.snapshot} alt="Spoof Snapshot" className="w-16 h-16 rounded-lg object-cover border border-rose-500/40 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">{s.claimedName}</h4>
                    <p className="text-xs text-rose-400 font-semibold">{s.detectedType}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Location: {s.gateDoor}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-800 text-xs font-mono text-emerald-400 border border-slate-700 flex justify-between">
                  <span>Spoof Confidence: {s.spoofConfidence}%</span>
                  <span>{s.gateAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORT VIEW: AI MODEL PRECISION & ROI (rep_ai_accuracy) */}
      {(currentAiFeature === 'rep_ai_accuracy' || currentAiFeature === 'reports') && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex justify-between items-start pb-4 border-b border-slate-200">
            <div>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase">
                AI System Audit Report
              </span>
              <h3 className="font-heading text-xl font-black text-slate-900 mt-1 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> AI Model Precision, Latency & Financial ROI Audit
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive machine learning performance metric telemetry, GPU cloud latency logs, and administrative cost reduction metrics.
              </p>
            </div>
            <button 
              onClick={() => showToast("Exported AI Telemetry & Precision Audit PDF report.")}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-xs"
            >
              Export Audit PDF
            </button>
          </div>

          {/* Model Metrics Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">Dropout Predictor F1</span>
              <h4 className="text-2xl font-black text-rose-900">0.924</h4>
              <p className="text-[11px] text-rose-600 font-medium">94.2% True Positive Recall</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">Vision OCR Precision</span>
              <h4 className="text-2xl font-black text-blue-900">99.1%</h4>
              <p className="text-[11px] text-blue-600 font-medium">Math Derivation Accuracy</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">Avg Inference Latency</span>
              <h4 className="text-2xl font-black text-emerald-900">142 ms</h4>
              <p className="text-[11px] text-emerald-600 font-medium">Edge GPU Cloud Latency</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">Est. Annual ROI</span>
              <h4 className="text-2xl font-black text-amber-900">$42,500</h4>
              <p className="text-[11px] text-amber-600 font-medium">Saved via Fee & Retention AI</p>
            </div>
          </div>

          {/* Detailed Telemetry Breakdown Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900">6 Sub-Engine Performance Audit Table</h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">AI Sub-Engine Module</th>
                    <th className="p-3">Underlying Tech Architecture</th>
                    <th className="p-3">Precision / F1</th>
                    <th className="p-3">Latency</th>
                    <th className="p-3">Monthly Inferences</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">1. Student Dropout Predictor</td>
                    <td className="p-3">XGBoost + LSTM Time-Series</td>
                    <td className="p-3 text-emerald-600 font-bold">94.2%</td>
                    <td className="p-3 font-mono">180 ms</td>
                    <td className="p-3 font-mono">14,200</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Optimal</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">2. Vision OCR Auto-Grader</td>
                    <td className="p-3">TrOCR + Transformer Fine-tuned</td>
                    <td className="p-3 text-emerald-600 font-bold">99.1%</td>
                    <td className="p-3 font-mono">420 ms</td>
                    <td className="p-3 font-mono">28,500</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Optimal</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">3. Faculty Substitution Engine</td>
                    <td className="p-3">Constraint Satisfaction Solver</td>
                    <td className="p-3 text-emerald-600 font-bold">100.0%</td>
                    <td className="p-3 font-mono">45 ms</td>
                    <td className="p-3 font-mono">1,840</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Optimal</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">4. PTM Report Copilot</td>
                    <td className="p-3">LLM Prompt Chaining + RAG</td>
                    <td className="p-3 text-emerald-600 font-bold">96.8%</td>
                    <td className="p-3 font-mono">650 ms</td>
                    <td className="p-3 font-mono">4,120</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Optimal</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">5. Fee Recovery Predictor</td>
                    <td className="p-3">Logistic Regression + Sentiment</td>
                    <td className="p-3 text-emerald-600 font-bold">88.4%</td>
                    <td className="p-3 font-mono">110 ms</td>
                    <td className="p-3 font-mono">8,900</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Optimal</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">6. Turnstile Anti-Spoofing</td>
                    <td className="p-3">Edge Neural Vision + Liveness</td>
                    <td className="p-3 text-emerald-600 font-bold">99.8%</td>
                    <td className="p-3 font-mono">35 ms</td>
                    <td className="p-3 font-mono">92,000</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Optimal</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
