import React, { useState } from 'react';

export const MODULE_DEFINITIONS = [
  {
    id: '00_ai_copilot',
    title: 'AI Intelligence Suite',
    icon: '🤖',
    pages: [
      { id: 'dashboard', label: 'AI Suite Command Hub' },
      { id: 'ai_dropout_predictor', label: '1. AI Student Dropout Predictor' },
      { id: 'ai_ocr_grader', label: '2. AI Vision OCR HW Auto-Grader' },
      { id: 'ai_substitutions', label: '3. AI Faculty Substitution Engine' },
      { id: 'ai_ptm_copilot', label: '4. AI PTM Report Copilot' },
      { id: 'ai_fee_recovery', label: '5. AI Fee Recovery Predictor' },
      { id: 'ai_anti_spoof', label: '6. AI Turnstile Anti-Spoof' },
    ],
    reports: [
      { id: 'rep_ai_accuracy', label: 'AI Model Precision & ROI' }
    ]
  },
  {
    id: '01_institutes_branches',
    title: 'Institutes & Branches',
    icon: '🏛️',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'institutes_directory', label: 'Institutes Directory' },
      { id: 'branch_hierarchy', label: 'Branch Hierarchy' },
    ],
    reports: [
      { id: 'rep_growth', label: 'Institute Growth' },
      { id: 'rep_capacity', label: 'Capacity Utilization' },
      { id: 'rep_comparison', label: 'Branch Comparison' },
    ]
  },
  {
    id: '02_students_admissions',
    title: 'Students & Admissions',
    icon: '🎓',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'student_master', label: 'Student Master Directory' },
      { id: 'app_onboarding', label: 'App Onboarding Pipeline' },
    ],
    reports: [
      { id: 'rep_trends', label: 'Admission Trends' },
      { id: 'rep_kyc', label: 'KYC Compliance' },
      { id: 'rep_retention', label: 'Retention Ratios' },
    ]
  },
  {
    id: '03_batches_curriculum',
    title: 'Batches & Curriculum',
    icon: '🗓️',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'all_batches', label: 'All Batches Directory & Create' },
      { id: 'batch_schedule', label: 'Batch Schedule Matrix' },
      { id: 'syllabus_tracker', label: 'Syllabus Tracker' },
    ],
    reports: [
      { id: 'rep_capacity', label: 'Batch Capacity Report' },
      { id: 'rep_syllabus', label: 'Syllabus Velocity' },
    ]
  },
  {
    id: '04_facial_attendance',
    title: 'Facial Check-in & Attendance',
    icon: '📸',
    pages: [
      { id: 'dashboard', label: 'Dashboard & Matrix' },
      { id: 'live_stream', label: 'Live Biometric Stream' },
      { id: 'late_anomalies', label: 'Late & Absent Anomalies' },
    ],
    reports: [
      { id: 'rep_late_comers', label: 'Late Comers & Violations' },
      { id: 'rep_punctuality', label: 'Punctuality & Honor Roll' },
      { id: 'rep_faculty_leave', label: 'Faculty Leaves & Pay Cuts' },
      { id: 'rep_biometric', label: 'Biometric Hardware Audit' },
    ]
  },
  {
    id: '05_fees_finance',
    title: 'Fees & Finance',
    icon: '💳',
    pages: [
      { id: 'dashboard', label: 'Fees & Financial Control Hub' },
      { id: 'batch_fee_discounts', label: 'Batch Fees & Student Discounts' },
      { id: 'operating_expenses', label: 'Operating Expenses & Salaries' },
      { id: 'fee_ledger', label: 'Fee Ledger & Receipts' },
      { id: 'defaulters', label: 'Defaulter Recovery Desk' },
      { id: 'gst_invoicing', label: 'GST & Invoicing' },
    ],
    reports: [
      { id: 'rep_collection', label: 'Collection Summary' },
      { id: 'rep_ageing', label: 'Defaulters Ageing' },
      { id: 'rep_gst', label: 'Tax & GST Filings' },
    ]
  },
  {
    id: '06_hw_exam',
    title: 'Homework & Exam',
    icon: '📝',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'exam_engine', label: 'Exam & Test Engine' },
      { id: 'hw_tracker', label: 'Homework Submission Desk' },
    ],
    reports: [
      { id: 'rep_scores', label: 'Score Distribution' },
      { id: 'rep_submissions', label: 'Submission Compliance' },
    ]
  },
  {
    id: '07_parent_ptm',
    title: 'Parent App & PTM',
    icon: '👨‍👩‍👧',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'ptm_scheduler', label: 'PTM Slot Scheduler' },
      { id: 'monthly_signoffs', label: 'Monthly Report Sign-offs' },
    ],
    reports: [
      { id: 'rep_signoff', label: 'Sign-off Audit' },
      { id: 'rep_grievance', label: 'Parent Grievances' },
    ]
  },
  {
    id: '08_faculty_payroll',
    title: 'Faculty & Payroll',
    icon: '👨‍🏫',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'educators_roster', label: 'Educators Master Roster' },
      { id: 'payroll_ledger', label: 'Monthly Payroll Ledger' },
      { id: 'teacher_ratings', label: 'Faculty App Ratings' },
    ],
    reports: [
      { id: 'rep_payroll', label: 'Salary Disbursement Report' },
      { id: 'rep_utilization', label: 'Workload Utilization' },
    ]
  },
  {
    id: '09_inventory_management',
    title: 'Inventory Management',
    icon: '📦',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'books_materials', label: 'Books & Study Materials' },
      { id: 'uniforms_kits', label: 'Uniforms & Starter Kits' },
    ],
    reports: [
      { id: 'rep_turnover', label: 'Stock Valuation & Turnover' },
      { id: 'rep_alerts', label: 'Low Stock Warnings' },
    ]
  },
  {
    id: '10_system_audit',
    title: 'System Audit',
    icon: '🛡️',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'audit_trail', label: 'Immutable Audit Trail' },
      { id: 'security_logs', label: 'Security Breach Logs' },
    ],
    reports: [
      { id: 'rep_drift', label: 'Privilege Drift Audit' },
      { id: 'rep_anomalies', label: 'Geographical Anomalies' },
    ]
  },
  {
    id: '11_help_support',
    title: 'Help & Support',
    icon: '🎧',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'tickets_inbox', label: 'Live Ticket Inbox' },
      { id: 'sla_escalations', label: 'SLA Escalations Desk' },
    ],
    reports: [
      { id: 'rep_sla', label: 'SLA Performance' },
      { id: 'rep_csat', label: 'CSAT Analytics' },
    ]
  },
  {
    id: '12_job_applicants',
    title: 'Job Applicants',
    icon: '💼',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'recruitment_pipeline', label: 'Recruitment Pipeline' },
      { id: 'demo_lectures', label: 'Demo Lecture Evaluation' },
    ],
    reports: [
      { id: 'rep_pipeline', label: 'Hiring Funnel Velocity' },
      { id: 'rep_channels', label: 'Recruitment Channel ROI' },
    ]
  },
  {
    id: '13_live_classes',
    title: 'Live Classes & WebRTC',
    icon: '🎥',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'webrtc_stream', label: 'Active WebRTC Streams' },
      { id: 'recorded_cdn', label: 'Recorded Lectures CDN' },
    ],
    reports: [
      { id: 'rep_bandwidth', label: 'Bandwidth & Concurrency' },
      { id: 'rep_engagement', label: 'Student Live Attention' },
    ]
  },
  {
    id: '14_roles_permissions',
    title: 'Roles & Permissions',
    icon: '🔐',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'roles_matrix', label: 'Role Permission Matrix' },
      { id: 'category_access', label: 'Category Access & Edit Grid' },
      { id: 'roles_users', label: 'User Accounts Manager' },
    ],
    reports: [
      { id: 'rep_elevation', label: 'Elevation Velocity' },
      { id: 'rep_mfa', label: 'MFA Adoption' },
    ]
  },
  {
    id: '15_admission_queries',
    title: 'Admission Queries',
    icon: '📞',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'queries_leads', label: 'Lead Funnel & Sources' },
      { id: 'queries_walkin', label: 'Walk-in Reception Desk' },
    ],
    reports: [
      { id: 'rep_inflow', label: 'Lead Inflow Trends' },
      { id: 'rep_source', label: 'Conversion by Channel' },
    ]
  },
  {
    id: '16_subjects_teachers',
    title: 'Subjects & Teachers',
    icon: '📖',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'subjects_matrix', label: 'Subject Allocation Matrix' },
      { id: 'subjects_workload', label: 'Faculty Workload Planner' },
    ],
    reports: [
      { id: 'rep_utilization', label: 'Faculty Hours Curve' },
      { id: 'rep_feedback', label: 'Student Rating Breakdown' },
    ]
  },
  {
    id: '17_smtp_email',
    title: 'SMTP / Email Gateway',
    icon: '📧',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'email_campaigns', label: 'Email & SMS Campaigns' },
      { id: 'templates_library', label: 'Email & SMS Templates' },
      { id: 'send_logs', label: 'Send History & Logs' },
      { id: 'smtp_relay', label: 'SMTP Relay Telemetry' },
    ],
    reports: [
      { id: 'rep_deliverability', label: 'Deliverability & Open Rates' },
      { id: 'rep_bounce_audit', label: 'Spam & Hard Bounce Audit' },
    ]
  },
  {
    id: '18_whatsapp_crm',
    title: 'WhatsApp Lead Funnel & CRM',
    icon: '💬',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'lead_pipeline', label: 'WhatsApp Lead Pipeline Kanban' },
      { id: 'bot_automations', label: 'AI Bot Workflows' },
    ],
    reports: [
      { id: 'rep_conversion_roi', label: 'Conversion Funnel ROI' },
      { id: 'rep_channel_velocity', label: 'Response Latency Benchmarks' },
    ]
  },
  {
    id: '20_franchise_royalty',
    title: 'Franchise & Multi-Branch Royalty',
    icon: '👑',
    pages: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'branch_onboarding', label: 'Branch Onboarding' },
      { id: 'royalty_ledgers', label: 'Royalty Collections & Ledgers' },
      { id: 'resource_requisitions', label: 'Resource & Stock Requisitions' },
    ],
    reports: [
      { id: 'royalty_revenue', label: 'Royalty & Revenue' },
      { id: 'geographical', label: 'Geographical Spread' },
      { id: 'compliance_audit', label: 'Compliance & Audits' },
    ]
  },
  {
    id: '21_audit_trail',
    title: 'Audit Trail & Activity Logs',
    icon: '📜',
    pages: [
      { id: 'dashboard', label: 'Activity Logs & IP Telemetry' }
    ],
    reports: []
  },
  {
    id: '22_work_allotment',
    title: 'Work Allotment & Delegation',
    icon: '📋',
    pages: [
      { id: 'dashboard', label: 'Task Allotment & Reply Threads' }
    ],
    reports: []
  }
];

export default function Sidebar({
  activeModule,
  setActiveModule,
  activePage,
  setActivePage,
  activeReportTab,
  setActiveReportTab,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  const [expandedModules, setExpandedModules] = useState({ [activeModule]: true });
  const [expandedReports, setExpandedReports] = useState({ [activeModule]: true });
  const [searchFilter, setSearchFilter] = useState('');

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const toggleReports = (modId, e) => {
    e.stopPropagation();
    setExpandedReports(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const filteredModules = MODULE_DEFINITIONS.filter(m => {
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    return (
      m.title.toLowerCase().includes(query) ||
      m.pages.some(p => p.label.toLowerCase().includes(query)) ||
      m.reports.some(r => r.label.toLowerCase().includes(query))
    );
  });

  return (
    <aside
      className={`bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col z-30 shadow-[1px_0_10px_rgba(0,0,0,0.03)] ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      } fixed inset-y-0 left-0`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between bg-white">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-base shadow-sm">
              E
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>EDUMISSION</span>
                <span className="text-[9px] uppercase font-black bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">
                  Super Admin
                </span>
              </div>
              <div className="text-[10px] text-slate-600 font-medium">EduMission Tuition Center Cloud</div>
            </div>
          </div>
        )}

        {sidebarCollapsed && (
          <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-base shadow-sm">
            E
          </div>
        )}

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition text-xs"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Search Bar */}
      {!sidebarCollapsed && (
        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search 16 modules & reports..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
            <span className="absolute left-2.5 top-2 text-slate-400 text-xs">🔍</span>
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1.5 custom-scrollbar">
        {filteredModules.map((mod) => {
          const isCurrentMod = activeModule === mod.id;
          const isExpanded = expandedModules[mod.id] || isCurrentMod;
          const isRepExpanded = expandedReports[mod.id] !== false;

          return (
            <div key={mod.id} className="rounded-xl transition-all">
              {/* Main Module Accordion Trigger */}
              <button
                onClick={() => {
                  setActiveModule(mod.id);
                  setActivePage('dashboard');
                  toggleModule(mod.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isCurrentMod
                    ? 'bg-blue-50/80 text-blue-900 font-bold border border-blue-100 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
                title={mod.title}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base flex-shrink-0">{mod.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="truncate text-left">{mod.title}</span>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <span className={`text-[10px] text-slate-400 transform transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                )}
              </button>

              {/* Nested Sub-pages (Matching Reference Screenshot 1) */}
              {!sidebarCollapsed && isExpanded && (
                <div className="mt-1 ml-4 pl-3 border-l border-slate-200 space-y-0.5 py-1">
                  {mod.pages.map((p) => {
                    const isPageActive = isCurrentMod && activePage === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveModule(mod.id);
                          setActivePage(p.id);
                        }}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-all ${
                          isPageActive
                            ? 'bg-blue-600 text-white font-bold shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isPageActive ? 'bg-white' : 'bg-slate-400'
                        }`}></span>
                        <span className="truncate">{p.label}</span>
                      </button>
                    );
                  })}

                  {/* Nested Reports Accordion with Sub-Reports */}
                  <div className="pt-0.5">
                    <button
                      onClick={(e) => toggleReports(mod.id, e)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-all ${
                        isCurrentMod && activePage === 'reports'
                          ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-100'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        <span className="font-semibold">Reports</span>
                      </div>
                      <span className={`text-[9px] text-slate-400 transform transition-transform ${
                        isRepExpanded ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    </button>

                    {/* Sub-Reports List */}
                    {isRepExpanded && (
                      <div className="ml-3 pl-2.5 border-l border-indigo-100 space-y-0.5 mt-0.5">
                        {mod.reports.map((rep) => {
                          const isRepActive = isCurrentMod && activePage === 'reports' && activeReportTab === rep.id;
                          return (
                            <button
                              key={rep.id}
                              onClick={() => {
                                setActiveModule(mod.id);
                                setActivePage('reports');
                                setActiveReportTab(rep.id);
                              }}
                              className={`w-full flex items-center gap-2 px-2 py-1 rounded text-[11px] transition-all ${
                                isRepActive
                                  ? 'text-indigo-700 font-bold bg-indigo-50'
                                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span className={`w-1 h-1 rounded-full ${
                                isRepActive ? 'bg-indigo-600' : 'bg-slate-300'
                              }`}></span>
                              <span className="truncate">{rep.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
              👑
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">EduMission Super Admin</div>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Multi-Tenant Root
                </div>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <span className="text-slate-400 text-xs">⚙️</span>
          )}
        </div>
      </div>
    </aside>
  );
}
