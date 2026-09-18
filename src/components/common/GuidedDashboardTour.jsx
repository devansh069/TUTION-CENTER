import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Play,
  RotateCcw,
  Sparkle
} from 'lucide-react';

export const TOUR_STEPS = [
  {
    step: 1,
    moduleId: '00_ai_copilot',
    title: 'AI Copilot & Automation Hub',
    icon: '🤖',
    category: 'AI Assistant',
    description: 'Ask AI copilot anything about tuition center stats, automated student drop-out predictions, fee reminders, and intelligent timetable generation.',
    highlight: 'Real-time AI query engine with natural language ERP search.'
  },
  {
    step: 2,
    moduleId: '01_institutes_branches',
    title: 'Institutes & Branch Hierarchy',
    icon: '🏫',
    category: 'Multi-Tenant HQ',
    description: 'Manage multiple tuition campuses, regional branches, franchise locations, and global campus capacity.',
    highlight: 'Centralized multi-tenant branch metrics and branch creation.'
  },
  {
    step: 3,
    moduleId: '02_students_admissions',
    title: 'Students Master & Admissions',
    icon: '🎓',
    category: 'Student Lifecycle',
    description: '360° student directory, digital admission forms, parent contact profiles, and academic streak tracking.',
    highlight: 'Complete student directory with document verification & active status.'
  },
  {
    step: 4,
    moduleId: '03_batches_curriculum',
    title: 'Batches & Curriculum Roster',
    icon: '📅',
    category: 'Academic Operations',
    description: 'Manage IIT-JEE, NEET, CA Foundation & Board batches, syllabus completion meters, and weekly timetable schedules.',
    highlight: 'Create new batches with intake capacity and subject schedules.'
  },
  {
    step: 5,
    moduleId: '04_facial_attendance',
    title: 'Facial Attendance AI & Live Webcams',
    icon: '📸',
    category: 'Edge Vision AI',
    description: 'Real laptop camera WebRTC biometric scanning, anti-spoofing liveness verification, and instant turnstile gate unlocks.',
    highlight: 'Live laptop webcam stream with real-time AI bounding box match.'
  },
  {
    step: 6,
    moduleId: '05_fees_finance',
    title: 'Fees, Finance & Operating Expenses',
    icon: '💰',
    category: 'Financial Management',
    description: 'Batch fee pricing, student discounts, fixed & variable operating expenses, salary payouts, and financial KPI ledger.',
    highlight: 'Interactive expense tables and batch-wise discount management.'
  },
  {
    step: 7,
    moduleId: '06_hw_exam',
    title: 'Homework Desk & Live Exam Engine',
    icon: '📝',
    category: 'Evaluation & Testing',
    description: 'Batch telemetry progress bars, student PDF answer sheet attachments, percentile rank cards, and WebRTC AI proctored live exams.',
    highlight: 'Create & Go Live Exam modal with PDF answer sheet preview.'
  },
  {
    step: 8,
    moduleId: '07_parent_ptm',
    title: 'Parent App & PTM Scheduler',
    icon: '👨‍👩‍👧',
    category: 'Parent Engagement',
    description: 'Parent-Teacher Meeting slot booking, monthly progress report sign-offs, and parent grievance inbox.',
    highlight: 'Digital PTM scheduling with automatic WhatsApp invitations.'
  },
  {
    step: 9,
    moduleId: '08_faculty_payroll',
    title: 'Faculty Master & Payroll Ledger',
    icon: '👨‍🏫',
    category: 'Human Resources',
    description: 'Educators master roster, monthly payroll processing, net salary disbursement, and student app faculty ratings.',
    highlight: 'Automated payroll ledger with salary component breakdown.'
  },
  {
    step: 10,
    moduleId: '09_inventory_management',
    title: 'Book Sets & Welcome Kits Inventory',
    icon: '📦',
    category: 'Tuition Stock Desk',
    description: 'Batch-wise study material book sets, student admission welcome kits (backpack, RFID card, bottle), and low stock reorder alerts.',
    highlight: 'Student handover log and paired RFID tag encoding.'
  },
  {
    step: 11,
    moduleId: '10_system_audit',
    title: 'Immutable Audit Trail & Security Logs',
    icon: '🛡️',
    category: 'Security & Governance',
    description: 'Tamper-proof system activity log, unauthorized login breach detection, and IP address geolocation tracking.',
    highlight: 'Real-time security threat logging and audit compliance.'
  },
  {
    step: 12,
    moduleId: '11_help_support',
    title: 'Help Desk & Support Tickets',
    icon: '🎧',
    category: 'Customer Service',
    description: 'Centralized ticketing system for parent queries, app technical issues, SLA countdown timers, and ticket assignment.',
    highlight: 'SLA escalation tracking and one-click ticket resolution.'
  },
  {
    step: 13,
    moduleId: '12_job_applicants',
    title: 'Faculty Recruitment & Job Applicants',
    icon: '👔',
    category: 'Talent Acquisition',
    description: 'Hiring funnel velocity, candidate demo lecture scheduling, director interview rounds, and offer letter generation.',
    highlight: 'Applicant pipeline tracking from screening to onboarding.'
  },
  {
    step: 14,
    moduleId: '13_live_classes',
    title: 'Live Classes & WebRTC Broadcast',
    icon: '🎥',
    category: 'Digital Classroom',
    description: 'Batch online class time matrix, real laptop webcam streaming, live speech AI transcription, student meet roster, and teacher feedback rating.',
    highlight: 'Live speech-to-text transcript and AI educator feedback score.'
  },
  {
    step: 15,
    moduleId: '14_roles_permissions',
    title: 'Roles & Fine-Grained Permissions',
    icon: '🔐',
    category: 'Access Control',
    description: 'Role-based access matrix (Super Admin, Branch Director, Educator, Accountant), module category permissions, and MFA adoption.',
    highlight: 'User permission edit grid and security policy enforcement.'
  },
  {
    step: 16,
    moduleId: '15_admission_queries',
    title: 'Admission Queries & Lead Funnel',
    icon: '📞',
    category: 'Sales CRM',
    description: 'Walk-in enquiry desk, website lead capture, demo class scheduling, and counselor conversion metrics.',
    highlight: 'Lead funnel stage tracking and follow-up reminders.'
  },
  {
    step: 17,
    moduleId: '16_subjects_teachers',
    title: 'Subjects & Dual Educator Allocation',
    icon: '📖',
    category: 'Faculty Allocation',
    description: 'Batch -> Subject -> 2 Teachers mapping (Online Educator + Offline Educator), AI speech feedback scores, and 1-click auto-replacement.',
    highlight: '⚡ Auto-Replace Educator button for low feedback scores.'
  },
  {
    step: 18,
    moduleId: '17_smtp_email',
    title: 'SMTP & Email Gateway Engine',
    icon: '📧',
    category: 'Communication',
    description: 'Automated email dispatch, SMTP server health, HTML template builder, and delivery bounce rate analytics.',
    highlight: 'Real-time SMTP dispatch logs and bulk mail sender.'
  },
  {
    step: 19,
    moduleId: '18_whatsapp_crm',
    title: 'WhatsApp Bot & Parent CRM',
    icon: '💬',
    category: 'Messaging',
    description: 'Official Meta WhatsApp Business API, automated attendance alerts, fee reminders, and interactive parent bot.',
    highlight: 'One-click WhatsApp campaign sender and delivery receipts.'
  },
  {
    step: 20,
    moduleId: '20_franchise_royalty',
    title: 'Franchise Network & Royalty Ledger',
    icon: '🏬',
    category: 'Network Operations',
    description: 'Franchise partner performance, monthly royalty fee calculation, brand compliance audits, and revenue sharing.',
    highlight: 'Royalty payment tracking and franchise growth analytics.'
  },
  {
    step: 21,
    moduleId: '21_audit_trail',
    title: 'Activity Log & IP Tracker',
    icon: '📝',
    category: 'Activity Monitoring',
    description: 'Detailed activity logs with user IP address, device location, action timestamp, and system module affected.',
    highlight: 'Comprehensive activity history with instant search & filter.'
  },
  {
    step: 22,
    moduleId: '22_work_allotment',
    title: 'Admin Work Allotment & Task Replies',
    icon: '📌',
    category: 'Task Management',
    description: 'Admin task assignment to institution users, real-time response & reply thread tracking, and task completion status.',
    highlight: 'Interactive task response thread with status updates.'
  }
];

export default function GuidedDashboardTour({ onNavigate }) {
  // Center Welcome Popup state - defaults to TRUE on page load / refresh
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = () => {
    setShowWelcomePopup(false);
    setIsTourActive(true);
    setCurrentStepIndex(0);
    const firstStep = TOUR_STEPS[0];
    onNavigate(firstStep.moduleId, 'dashboard');
  };

  const closeTour = () => {
    setIsTourActive(false);
    setShowWelcomePopup(false);
  };

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      const nextStep = TOUR_STEPS[nextIdx];
      onNavigate(nextStep.moduleId, 'dashboard');
    } else {
      closeTour();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      const prevStep = TOUR_STEPS[prevIdx];
      onNavigate(prevStep.moduleId, 'dashboard');
    }
  };

  const handleStepClick = (index) => {
    setCurrentStepIndex(index);
    onNavigate(TOUR_STEPS[index].moduleId, 'dashboard');
  };

  const stepObj = TOUR_STEPS[currentStepIndex];
  const progressPct = Math.round(((currentStepIndex + 1) / TOUR_STEPS.length) * 100);

  return (
    <>
      {/* 1. CENTER SCREEN WELCOME POPUP (ON PAGE LOAD / REFRESH) */}
      {showWelcomePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 relative text-center space-y-5 animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowWelcomePopup(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon & Badge */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-xl text-white">
              🚀
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs border border-indigo-200">
                Welcome to EduMission ERP
              </span>
              <h2 className="font-heading text-2xl font-black text-slate-900 mt-2">
                Take a Tour of All 22 Module Dashboards?
              </h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
                Experience an interactive guided walk-through across all module dashboards—including Real WebRTC Live Classes, Facial Attendance AI, Fees & Finance, Batch Book Sets, and AI Teacher Speech Evaluation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                Explore ERP Myself
              </button>
              <button
                onClick={startTour}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-current" /> Start Guided Tour 🎉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CENTER STEP-BY-STEP GUIDED TOUR MODAL */}
      {isTourActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-indigo-500/50 space-y-4 relative animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-xl shadow-md">
                  {stepObj.icon}
                </span>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800">
                    {stepObj.category} • Dashboard {stepObj.step} of {TOUR_STEPS.length}
                  </span>
                  <h3 className="font-heading font-black text-lg text-white mt-0.5">{stepObj.title}</h3>
                </div>
              </div>

              <button
                onClick={closeTour}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {stepObj.description}
              </p>

              <div className="p-3.5 rounded-xl bg-indigo-950/70 border border-indigo-800/60 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-200 font-semibold">
                  <strong className="text-white">Key Feature:</strong> {stepObj.highlight}
                </p>
              </div>
            </div>

            {/* Progress Bar & Dots */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Tour Progress: {progressPct}%</span>
                <span>{currentStepIndex + 1} / {TOUR_STEPS.length} Dashboards</span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>

              {/* Step Dots */}
              <div className="flex flex-wrap gap-1.5 pt-1 justify-center max-h-12 overflow-y-auto pr-1">
                {TOUR_STEPS.map((s, idx) => (
                  <button
                    key={s.step}
                    onClick={() => handleStepClick(idx)}
                    className={`w-6 h-6 rounded-lg text-[10px] font-bold font-mono transition-all flex items-center justify-center ${
                      idx === currentStepIndex
                        ? 'bg-indigo-600 text-white shadow-md scale-110 ring-2 ring-indigo-300'
                        : idx < currentStepIndex
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                    title={s.title}
                  >
                    {s.step}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  currentStepIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-slate-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={closeTour}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Exit Tour
                </button>

                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-indigo-500/25 transition-all"
                >
                  {currentStepIndex === TOUR_STEPS.length - 1 ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Finish Tour 🎉
                    </>
                  ) : (
                    <>
                      Next Dashboard <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
