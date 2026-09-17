import { useState, useMemo } from 'react';
import { 
  Building2, Users, GraduationCap, Calendar, Video, 
  HelpCircle, MessageSquare, Briefcase, Plus, Search, 
  Bell, ChevronDown, ChevronRight, TrendingUp, BarChart3,
  DollarSign, MapPin, Mail, Phone, Shield, Star, X, CheckCircle2,
  FileText, Activity, AlertCircle, Database, Smartphone, BookOpen, Clock,
  ArrowUpRight, ArrowLeft, Filter, Layers, Zap, Award, Server,
  SlidersHorizontal, Download, ExternalLink, Check, AlertTriangle,
  Sun, Moon
} from 'lucide-react';

// --- Seed Data ---

const INITIAL_INSTITUTES = [
  {
    id: 'inst-01',
    code: 'alpha',
    name: 'Alpha Institute of Science & Tech',
    shortCode: 'ALPH-NYC',
    tagline: 'Premier IIT-JEE & Medical Entrance Hub',
    city: 'Manhattan, New York',
    address: '124 Academic Way, Tech Corridor, NY 10001',
    director: 'Dr. Robert Chen, Ph.D.',
    directorPhone: '+1 (555) 234-8901',
    directorEmail: 'r.chen@alphainstitute.edu',
    established: '2016',
    gstin: '27AABCU9603R1ZM',
    cinNumber: 'U80302DL2016PTC291823',
    packageTier: 'Enterprise Max',
    billingCycle: 'Annual',
    packageExpiry: 'Nov 24, 2026',
    daysRemaining: 67,
    status: 'Active',
    metrics: {
      students: 1450,
      studentCapacity: 1600,
      teachers: 48,
      supportStaff: 18,
      batches: 24,
      monthlyRevenue: 94500,
      pendingFees: 12400,
      attendanceRate: 94.2,
      storageUsedGB: 184,
      storageTotalGB: 250,
      smsQuotaUsed: 18500,
      smsQuotaTotal: 50000,
    },
    performanceChart: [
      { month: 'May', students: 1210, revenue: 78000, attendance: 91 },
      { month: 'Jun', students: 1290, revenue: 84000, attendance: 93 },
      { month: 'Jul', students: 1350, revenue: 89000, attendance: 92 },
      { month: 'Aug', students: 1390, revenue: 91000, attendance: 95 },
      { month: 'Sep', students: 1420, revenue: 92500, attendance: 93 },
      { month: 'Oct', students: 1450, revenue: 94500, attendance: 94 },
    ],
    subjectBreakdown: [
      { subject: 'Advanced Physics', faculty: 'Dr. Harrison', passRate: 96, avgScore: 84, batches: 6 },
      { subject: 'Organic Chemistry', faculty: 'Prof. Ananya Roy', passRate: 91, avgScore: 79, batches: 5 },
      { subject: 'Pure Mathematics', faculty: 'Er. Vivek Sharma', passRate: 88, avgScore: 82, batches: 7 },
      { subject: 'Cellular Biology', faculty: 'Dr. Emily Vance', passRate: 94, avgScore: 88, batches: 6 },
    ],
    batchesList: [
      { id: 'B101', name: 'JEE Advanced Pinnacle 2025', teacher: 'Dr. Harrison', room: 'Lecture Hall A', students: 120, time: '08:00 AM - 11:30 AM', syllabusPct: 78, status: 'In Session' },
      { id: 'B102', name: 'NEET Super-60 Batch A', teacher: 'Dr. Emily Vance', room: 'Bio-Lab 2', students: 60, time: '12:00 PM - 03:00 PM', syllabusPct: 82, status: 'Upcoming Today' },
      { id: 'B103', name: 'Foundation Olympiad Gr. 10', teacher: 'Er. Vivek Sharma', room: 'Room 304', students: 45, time: '04:00 PM - 06:30 PM', syllabusPct: 65, status: 'Scheduled' },
      { id: 'B104', name: 'Board Booster Weekend Batch', teacher: 'Prof. Ananya Roy', room: 'Hall B', students: 85, time: 'Sat/Sun Only', syllabusPct: 90, status: 'Active' },
    ]
  },
  {
    id: 'inst-02',
    code: 'beta',
    name: 'Beta Commerce Academy & CA Foundation',
    shortCode: 'BETA-LDN',
    tagline: 'Chartered Accountancy & Business Analytics',
    city: 'London, Central City',
    address: '45 Finsbury Square, Financial Center, EC2A 1AE',
    director: 'Ms. Catherine Miller, FCA',
    directorPhone: '+44 20 7946 0912',
    directorEmail: 'c.miller@betacommerce.co.uk',
    established: '2019',
    gstin: '07AAECB4812K1Z9',
    cinNumber: 'U74999DL2019PTC345612',
    packageTier: 'Enterprise Max',
    billingCycle: 'Annual',
    packageExpiry: 'Dec 12, 2026',
    daysRemaining: 85,
    status: 'Active',
    metrics: {
      students: 920,
      studentCapacity: 1100,
      teachers: 32,
      supportStaff: 12,
      batches: 16,
      monthlyRevenue: 68200,
      pendingFees: 8200,
      attendanceRate: 96.1,
      storageUsedGB: 112,
      storageTotalGB: 200,
      smsQuotaUsed: 11200,
      smsQuotaTotal: 40000,
    },
    performanceChart: [
      { month: 'May', students: 780, revenue: 56000, attendance: 94 },
      { month: 'Jun', students: 820, revenue: 61000, attendance: 95 },
      { month: 'Jul', students: 850, revenue: 64000, attendance: 96 },
      { month: 'Aug', students: 890, revenue: 66000, attendance: 95 },
      { month: 'Sep', students: 905, revenue: 67200, attendance: 97 },
      { month: 'Oct', students: 920, revenue: 68200, attendance: 96 },
    ],
    subjectBreakdown: [
      { subject: 'Financial Accounting & Audit', faculty: 'Catherine Miller, FCA', passRate: 98, avgScore: 86, batches: 5 },
      { subject: 'Corporate Law & Ethics', faculty: 'Adv. David Ross', passRate: 92, avgScore: 80, batches: 4 },
      { subject: 'Business Economics', faculty: 'Dr. Liam Wright', passRate: 94, avgScore: 83, batches: 4 },
      { subject: 'Direct & Indirect Taxation', faculty: 'CA Priya Patel', passRate: 89, avgScore: 78, batches: 3 },
    ],
    batchesList: [
      { id: 'B201', name: 'CA Inter Regular Batch 2025', teacher: 'Catherine Miller, FCA', room: 'Audit Hall 1', students: 95, time: '09:00 AM - 01:00 PM', syllabusPct: 70, status: 'In Session' },
      { id: 'B202', name: 'Taxation Special Fast-Track', teacher: 'CA Priya Patel', room: 'Seminar Hall 3', students: 80, time: '02:00 PM - 05:00 PM', syllabusPct: 85, status: 'Upcoming Today' },
      { id: 'B203', name: 'Corporate Law Weekend', teacher: 'Adv. David Ross', room: 'Hall 102', students: 60, time: 'Sat/Sun 10:00 AM', syllabusPct: 55, status: 'Scheduled' },
    ]
  },
  {
    id: 'inst-03',
    code: 'apex',
    name: 'Apex Medical Institute of Sciences',
    shortCode: 'APEX-BOS',
    tagline: 'Specialized NEET-UG & Pre-Med Coaching',
    city: 'Boston, Massachusetts',
    address: '88 Longwood Avenue, Medical District, MA 02115',
    director: 'Dr. Alistair Sterling, MD',
    directorPhone: '+1 (617) 555-0144',
    directorEmail: 'dean@apexmedical.org',
    established: '2014',
    gstin: '29AABCA7712M1Z3',
    cinNumber: 'U80903KA2014PTC078129',
    packageTier: 'Enterprise Max',
    billingCycle: 'Semi-Annual',
    packageExpiry: 'Oct 30, 2026',
    daysRemaining: 42,
    status: 'Active',
    metrics: {
      students: 1180,
      studentCapacity: 1250,
      teachers: 41,
      supportStaff: 15,
      batches: 20,
      monthlyRevenue: 82400,
      pendingFees: 14500,
      attendanceRate: 93.8,
      storageUsedGB: 165,
      storageTotalGB: 250,
      smsQuotaUsed: 22000,
      smsQuotaTotal: 50000,
    },
    performanceChart: [
      { month: 'May', students: 990, revenue: 69000, attendance: 92 },
      { month: 'Jun', students: 1040, revenue: 73000, attendance: 94 },
      { month: 'Jul', students: 1090, revenue: 76000, attendance: 93 },
      { month: 'Aug', students: 1120, revenue: 78500, attendance: 95 },
      { month: 'Sep', students: 1150, revenue: 80200, attendance: 94 },
      { month: 'Oct', students: 1180, revenue: 82400, attendance: 94 },
    ],
    subjectBreakdown: [
      { subject: 'Human Anatomy & Genetics', faculty: 'Dr. Alistair Sterling', passRate: 97, avgScore: 89, batches: 6 },
      { subject: 'Physical & Inorganic Chem', faculty: 'Dr. Marcus Webb', passRate: 90, avgScore: 81, batches: 5 },
      { subject: 'Zoology & Physiology', faculty: 'Dr. Rebecca Stone', passRate: 95, avgScore: 87, batches: 5 },
      { subject: 'Medical Biophysics', faculty: 'Prof. Simon Lee', passRate: 86, avgScore: 76, batches: 4 },
    ],
    batchesList: [
      { id: 'B301', name: 'NEET Target Top 100 Rankers', teacher: 'Dr. Alistair Sterling', room: 'Auditorium 1', students: 110, time: '08:30 AM - 12:30 PM', syllabusPct: 88, status: 'In Session' },
      { id: 'B302', name: 'Biophysics Problem Solving', teacher: 'Prof. Simon Lee', room: 'Lab Hall B', students: 75, time: '01:30 PM - 04:30 PM', syllabusPct: 62, status: 'Upcoming Today' },
    ]
  },
  {
    id: 'inst-04',
    code: 'delta',
    name: 'Delta Tech & Engineering School',
    shortCode: 'DELT-SFO',
    tagline: 'STEM Foundation, AI & Robotics Academy',
    city: 'San Francisco, California',
    address: '742 Silicon Valley Pkwy, CA 94105',
    director: 'Karan Mehta, M.S. Stanford',
    directorPhone: '+1 (415) 555-8921',
    directorEmail: 'karan@deltatech.edu',
    established: '2021',
    gstin: '06AABCD1982J1Z4',
    cinNumber: 'U72900HR2021PTC098231',
    packageTier: 'Pro Academy',
    billingCycle: 'Annual',
    packageExpiry: 'Nov 10, 2026',
    daysRemaining: 53,
    status: 'Active',
    metrics: {
      students: 760,
      studentCapacity: 900,
      teachers: 26,
      supportStaff: 9,
      batches: 14,
      monthlyRevenue: 71400,
      pendingFees: 6100,
      attendanceRate: 95.5,
      storageUsedGB: 95,
      storageTotalGB: 150,
      smsQuotaUsed: 8900,
      smsQuotaTotal: 30000,
    },
    performanceChart: [
      { month: 'May', students: 620, revenue: 58000, attendance: 94 },
      { month: 'Jun', students: 660, revenue: 62000, attendance: 95 },
      { month: 'Jul', students: 690, revenue: 65000, attendance: 95 },
      { month: 'Aug', students: 720, revenue: 68000, attendance: 96 },
      { month: 'Sep', students: 745, revenue: 70000, attendance: 95 },
      { month: 'Oct', students: 760, revenue: 71400, attendance: 96 },
    ],
    subjectBreakdown: [
      { subject: 'Python, AI & Data Structures', faculty: 'Karan Mehta', passRate: 98, avgScore: 91, batches: 4 },
      { subject: 'AP Calculus BC', faculty: 'Elena Rostova', passRate: 93, avgScore: 84, batches: 4 },
      { subject: 'Robotics & Microcontrollers', faculty: 'Jayden Brooks', passRate: 96, avgScore: 89, batches: 3 },
      { subject: 'Quantum Mechanics Intro', faculty: 'Dr. Alan Vance', passRate: 87, avgScore: 78, batches: 3 },
    ],
    batchesList: [
      { id: 'B401', name: 'AI & Machine Learning Cohort 4', teacher: 'Karan Mehta', room: 'Computer Lab Alpha', students: 50, time: '10:00 AM - 01:00 PM', syllabusPct: 75, status: 'In Session' },
      { id: 'B402', name: 'Robotics Build & Test Lab', teacher: 'Jayden Brooks', room: 'Hardware Lab', students: 40, time: '02:00 PM - 05:00 PM', syllabusPct: 80, status: 'Scheduled' },
    ]
  },
  {
    id: 'inst-05',
    code: 'zenith',
    name: 'Zenith Foundation & Humanities Hub',
    shortCode: 'ZENI-TOR',
    tagline: 'Liberal Arts, Civil Services & Law Entrance',
    city: 'Toronto, Ontario',
    address: '320 University Ave, Suite 600, M5G 1V2',
    director: 'Prof. Margaret Trudeau',
    directorPhone: '+1 (416) 555-4321',
    directorEmail: 'contact@zenithfoundation.ca',
    established: '2020',
    gstin: '33AABCZ9921E1Z0',
    cinNumber: 'U80904TN2020PTC139821',
    packageTier: 'Growth Tier',
    billingCycle: 'Monthly',
    packageExpiry: 'Oct 02, 2026',
    daysRemaining: 14,
    status: 'Renewal Due',
    metrics: {
      students: 580,
      studentCapacity: 650,
      teachers: 21,
      supportStaff: 8,
      batches: 11,
      monthlyRevenue: 48000,
      pendingFees: 9200,
      attendanceRate: 91.5,
      storageUsedGB: 68,
      storageTotalGB: 100,
      smsQuotaUsed: 6200,
      smsQuotaTotal: 25000,
    },
    performanceChart: [
      { month: 'May', students: 490, revenue: 41000, attendance: 90 },
      { month: 'Jun', students: 510, revenue: 43000, attendance: 91 },
      { month: 'Jul', students: 535, revenue: 44500, attendance: 92 },
      { month: 'Aug', students: 550, revenue: 46000, attendance: 91 },
      { month: 'Sep', students: 565, revenue: 47200, attendance: 92 },
      { month: 'Oct', students: 580, revenue: 48000, attendance: 91 },
    ],
    subjectBreakdown: [
      { subject: 'Constitutional Law & Jurisprudence', faculty: 'Adv. S. Narayanan', passRate: 94, avgScore: 82, batches: 3 },
      { subject: 'World History & Geopolitics', faculty: 'Prof. Margaret Trudeau', passRate: 95, avgScore: 87, batches: 3 },
      { subject: 'Critical Reasoning & Logic', faculty: 'James Sinclair', passRate: 88, avgScore: 79, batches: 3 },
      { subject: 'Public Policy & Administration', faculty: 'Dr. Fatima Noor', passRate: 91, avgScore: 83, batches: 2 },
    ],
    batchesList: [
      { id: 'B501', name: 'CLAT & Law Entrance Super 40', teacher: 'Adv. S. Narayanan', room: 'Moot Court Hall', students: 40, time: '09:00 AM - 12:00 PM', syllabusPct: 70, status: 'In Session' },
      { id: 'B502', name: 'Civil Services GS Prelims 2025', teacher: 'Prof. Margaret Trudeau', room: 'Hall 201', students: 65, time: '01:00 PM - 04:00 PM', syllabusPct: 60, status: 'Upcoming Today' },
    ]
  }
];

// --- Subcategories Definition for Left Sidebar ---

const SIDEBAR_MODULES = [
  {
    id: 'institutes',
    name: 'Institutes & Branches',
    icon: Building2,
    badge: '5 Active',
    subcategories: [
      { id: 'inst-overview', name: 'Institutes Directory' },
      { id: 'inst-hierarchy', name: 'Branch Hierarchy' },
      { id: 'inst-packages', name: 'Subscription Packages' },
      { id: 'inst-onboarding', name: 'Onboarding & Approvals' }
    ]
  },
  {
    id: 'teachers',
    name: 'Faculty & Educators',
    icon: Users,
    badge: '168 Staff',
    subcategories: [
      { id: 'fac-directory', name: 'Global Faculty Roster' },
      { id: 'fac-subject-map', name: 'Subject Allocation' },
      { id: 'fac-payroll', name: 'Payroll & Hourly Rates' },
      { id: 'fac-reviews', name: 'Student Feedback & Ratings' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & GST Billing',
    icon: DollarSign,
    badge: '$364k MTD',
    subcategories: [
      { id: 'fin-collections', name: 'Fee Collection Ledgers' },
      { id: 'fin-gst-invoicing', name: 'GST Invoices & Tax B2B' },
      { id: 'fin-defaulters', name: 'Defaulter Recovery' },
      { id: 'fin-expenses', name: 'Center Operating Costs' }
    ]
  },
  {
    id: 'students',
    name: 'Students & Admissions',
    icon: GraduationCap,
    badge: '4,890',
    subcategories: [
      { id: 'stu-records', name: 'Student Master Directory' },
      { id: 'stu-leads', name: 'Admissions & Inquiries' },
      { id: 'stu-biometric', name: 'Biometric Attendance' },
      { id: 'stu-parent-portal', name: 'Parent App Accounts' }
    ]
  },
  {
    id: 'batches',
    name: 'Academics & Batches',
    icon: Calendar,
    badge: '85 Live',
    subcategories: [
      { id: 'bat-master', name: 'Batch Master Schedule' },
      { id: 'bat-curriculum', name: 'Syllabus & Lesson Plans' },
      { id: 'bat-study-material', name: 'Question Bank & Notes' },
      { id: 'bat-tests', name: 'Exam & Test Engine' }
    ]
  },
  {
    id: 'live',
    name: 'Live & Hybrid Classes',
    icon: Video,
    badge: '14 Active',
    subcategories: [
      { id: 'live-streams', name: 'Active Live Classrooms' },
      { id: 'live-recordings', name: 'Recorded Lectures CDN' },
      { id: 'live-telemetry', name: 'Zoom / WebRTC Health' }
    ]
  },
  {
    id: 'support',
    name: 'Support & Helpdesk',
    icon: HelpCircle,
    badge: '3 Open',
    subcategories: [
      { id: 'sup-tickets', name: 'Grievances & Escalations' },
      { id: 'sup-sla', name: 'Helpdesk SLA Tracker' },
      { id: 'sup-docs', name: 'Admin Knowledge Base' }
    ]
  },
  {
    id: 'admin-queries',
    name: 'Administration & Audit',
    icon: MessageSquare,
    badge: null,
    subcategories: [
      { id: 'adm-audit', name: 'Global Audit Logs' },
      { id: 'adm-rbac', name: 'Role & Access Control' },
      { id: 'adm-api', name: 'API Keys & Webhooks' }
    ]
  },
  {
    id: 'job-applicants',
    name: 'Recruitment & Jobs',
    icon: Briefcase,
    badge: '12 New',
    subcategories: [
      { id: 'job-postings', name: 'Open Faculty Positions' },
      { id: 'job-candidates', name: 'Candidate Pipeline' },
      { id: 'job-interviews', name: 'Demo Lectures & Tests' }
    ]
  }
];

// --- Component: Left Sidebar with Subcategories & Branding ---

function Sidebar({ activeModule, setActiveModule, activeSubcategory, setActiveSubcategory, onResetToGlobal }) {
  const [expandedModules, setExpandedModules] = useState({
    institutes: true,
    teachers: false,
    finance: false,
    students: false,
    batches: false,
    live: false,
    support: false,
    'admin-queries': false,
    'job-applicants': false,
  });

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  return (
    <aside className="w-72 h-screen border-r border-border-subtle bg-bg-surface flex flex-col fixed left-0 top-0 z-30 select-none transition-colors duration-300">
      
      {/* Brand Header */}
      <div 
        onClick={onResetToGlobal}
        className="h-20 flex items-center px-6 border-b border-border-subtle cursor-pointer group hover:bg-bg-surface-hover transition-colors"
      >
        <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-heading font-extrabold text-lg text-text-primary tracking-tight">EduZenith</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 border border-indigo-500/30">ERP</span>
          </div>
          <p className="text-[11px] text-text-secondary font-medium tracking-wide">Multi-Institute Cloud Pro</p>
        </div>
      </div>

      {/* Super Admin Status Pill */}
      <div className="px-5 py-3 border-b border-border-subtle bg-bg-surface-hover">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-text-secondary">Cluster: US-East Multi-Tenant</span>
          </div>
          <span className="text-[10px] font-bold text-indigo-500 dark:text-[#818cf8] bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">v3.4.2</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        <p className="px-3 pt-2 text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
          Management Modules
        </p>

        {SIDEBAR_MODULES.map((mod) => {
          const isSelected = activeModule === mod.id;
          const isExpanded = expandedModules[mod.id];
          const Icon = mod.icon;

          return (
            <div key={mod.id} className="space-y-0.5">
              <button
                onClick={() => {
                  setActiveModule(mod.id);
                  toggleModule(mod.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                  isSelected 
                    ? 'bg-indigo-50 dark:bg-[#181f30] text-indigo-900 dark:text-white font-semibold shadow-sm border border-indigo-500/30' 
                    : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'
                }`}
              >
                <div className="flex items-center min-w-0">
                  <div className={`p-1.5 rounded-lg mr-2.5 transition-colors ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-[#161d2d] text-text-secondary group-hover:text-indigo-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs tracking-tight truncate">{mod.name}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  {mod.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-[#1d2538] text-text-secondary">
                      {mod.badge}
                    </span>
                  )}
                  <ChevronRight className={`w-3.5 h-3.5 text-text-secondary transition-transform duration-200 ${
                    isExpanded ? 'rotate-90 text-indigo-500' : ''
                  }`} />
                </div>
              </button>

              {/* Subcategories Accordion */}
              {isExpanded && (
                <div className="ml-7 pl-3 border-l border-border-subtle py-1 space-y-0.5 animate-in fade-in duration-200">
                  {mod.subcategories.map((sub) => {
                    const isSubSelected = activeSubcategory === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setActiveModule(mod.id);
                          setActiveSubcategory(sub.id);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[12px] transition-colors flex items-center justify-between ${
                          isSubSelected
                            ? 'text-indigo-700 dark:text-indigo-300 font-semibold bg-indigo-500/10'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
                        }`}
                      >
                        <span className="truncate">{sub.name}</span>
                        {isSubSelected && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-border-subtle bg-bg-base">
        <div className="flex items-center justify-between p-2 rounded-xl bg-bg-surface border border-border-subtle">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Super Admin" 
                className="w-9 h-9 rounded-xl object-cover border border-indigo-500/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-bg-surface"></span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-text-primary truncate">Elena Rostova</p>
              <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-medium tracking-wide truncate">Chief Administrator</p>
            </div>
          </div>
          <button title="Settings" className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-lg transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </aside>
  );
}

// --- Component: Top Bar with Dynamic Institute Selector Dropdown ---

function TopBar({ institutes, selectedInstituteCode, onSelectInstitute, onOpenAddModal, isDarkMode, toggleDarkMode }) {
  const selectedObj = institutes.find(i => i.code === selectedInstituteCode);

  return (
    <header className="h-20 border-b border-border-subtle bg-bg-surface/85 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-8">
      
      {/* Left: Dynamic Institute Dropdown */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1">
            Active Scope View
          </span>
          <div className="relative">
            <select 
              value={selectedInstituteCode}
              onChange={(e) => onSelectInstitute(e.target.value)}
              className="appearance-none bg-bg-surface-hover border border-border-subtle focus:border-indigo-500 text-text-primary font-medium text-sm rounded-xl pl-4 pr-11 py-2.5 outline-none transition-all w-80 cursor-pointer shadow-lg shadow-black/5 dark:shadow-black/20"
            >
              <option value="all">🌐 All Institutes (Global Aggregate View)</option>
              <option disabled>────────── INDIVIDUAL INSTITUTES ──────────</option>
              {institutes.map((inst) => (
                <option key={inst.code} value={inst.code}>
                  🏛️ {inst.name} ({inst.city})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-indigo-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Selected Institute Status Tag if specific */}
        {selectedObj && (
          <div className="hidden xl:flex items-center space-x-2 pl-4 border-l border-border-subtle mt-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/30 font-semibold flex items-center">
              <Zap className="w-3 h-3 mr-1 text-indigo-500 dark:text-indigo-400" /> {selectedObj.packageTier}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">
              ● {selectedObj.status}
            </span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        
        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search institutes, faculty, GSTIN (Ctrl+K)..." 
            className="bg-bg-surface-hover border border-border-subtle text-text-primary text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all w-72 placeholder:text-text-secondary"
          />
        </div>

        {/* Quick Diagnostics Indicator */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-xl bg-bg-surface-hover border border-border-subtle">
          <Server className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs text-text-secondary font-medium">5/5 Nodes Online</span>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-2.5 text-text-secondary hover:text-text-primary bg-bg-surface-hover border border-border-subtle rounded-xl transition-all"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 text-text-secondary hover:text-text-primary bg-bg-surface-hover border border-border-subtle rounded-xl transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-bg-surface"></span>
        </button>

        {/* Export Telemetry */}
        <button 
          title="Export CSV Audit"
          className="p-2.5 text-text-secondary hover:text-text-primary bg-bg-surface-hover border border-border-subtle rounded-xl transition-all hidden sm:block"
        >
          <Download className="w-4 h-4" />
        </button>

      </div>
    </header>
  );
}

// --- Component: Interactive Dynamic Bar Chart (SVG Rendered) ---

function AnalyticsChart({ data, title, subtitle }) {
  const [activeBar, setActiveBar] = useState(data.length - 1);
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="glass-card p-6 rounded-2xl border border-border-subtle bg-bg-surface">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-2">
        <div>
          <h3 className="font-heading text-lg font-bold text-text-primary flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-indigo-500" /> {title}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4 text-xs font-semibold">
          <div className="flex items-center text-indigo-500 dark:text-indigo-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 mr-1.5"></span> Monthly Inflow ($)
          </div>
          <div className="flex items-center text-emerald-600 dark:text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 dark:bg-emerald-400 mr-1.5"></span> Attendance Avg (%)
          </div>
        </div>
      </div>

      {/* SVG Bar Chart Visualization */}
      <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-border-subtle">
        {data.map((item, idx) => {
          const heightPct = Math.round((item.revenue / maxRevenue) * 100);
          const isSelected = activeBar === idx;

          return (
            <div 
              key={item.month} 
              onMouseEnter={() => setActiveBar(idx)}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              {/* Tooltip on active */}
              {isSelected && (
                <div className="mb-2 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold shadow-lg shadow-indigo-500/30 whitespace-nowrap animate-in fade-in zoom-in-90 duration-150">
                  ${(item.revenue / 1000).toFixed(1)}k • {item.attendance}% Attn
                </div>
              )}

              {/* Bar */}
              <div 
                style={{ height: `${heightPct}%` }}
                className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 relative ${
                  isSelected 
                    ? 'gradient-brand shadow-lg shadow-indigo-500/25 scale-105' 
                    : 'bg-indigo-100 dark:bg-[#1c2438] group-hover:bg-indigo-200 dark:group-hover:bg-[#25304a]'
                }`}
              >
                {/* Secondary metric dot */}
                <div 
                  style={{ bottom: `${item.attendance * 0.9}%` }}
                  className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow"
                />
              </div>

              {/* Label */}
              <span className={`text-xs mt-3 font-semibold transition-colors ${
                isSelected ? 'text-indigo-600 dark:text-white' : 'text-text-secondary'
              }`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Highlight metrics banner */}
      <div className="mt-4 pt-2 flex items-center justify-between text-xs text-[#94a3b8]">
        <span>Current Selected Month: <strong className="text-white">{data[activeBar].month}</strong></span>
        <span>Gross Volume: <strong className="text-indigo-300">${data[activeBar].revenue.toLocaleString()}</strong></span>
        <span>Student Count: <strong className="text-white">{data[activeBar].students} Enrolled</strong></span>
      </div>
    </div>
  );
}

// --- Component 1: Global Multi-Institute Directory & Aggregate View ---
// (Visible when selectedInstituteCode === 'all')

function GlobalInstitutesOverview({ institutes, onSelectInstitute, onOpenAddModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');

  // Aggregated totals across all institutes
  const summary = useMemo(() => {
    return institutes.reduce((acc, curr) => {
      acc.totalStudents += curr.metrics.students;
      acc.totalCapacity += curr.metrics.studentCapacity;
      acc.totalTeachers += curr.metrics.teachers;
      acc.totalBatches += curr.metrics.batches;
      acc.totalRevenue += curr.metrics.monthlyRevenue;
      acc.totalPending += curr.metrics.pendingFees;
      return acc;
    }, { totalStudents: 0, totalCapacity: 0, totalTeachers: 0, totalBatches: 0, totalRevenue: 0, totalPending: 0 });
  }, [institutes]);

  const filteredInstitutes = institutes.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.gstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || inst.packageTier === filterTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome & Top Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-3xl font-extrabold text-text-primary tracking-tight">
              All Institutes Command Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-500 dark:text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              Global Surveillance
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            Real-time aggregate telemetry across {institutes.length} affiliated coaching campuses, {summary.totalStudents.toLocaleString()} students, and {summary.totalTeachers} educators.
          </p>
        </div>

        {/* The 'Add Institute' Button (Prominently placed as requested!) */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenAddModal}
            className="gradient-brand hover:opacity-95 text-white font-semibold px-5 py-3 rounded-xl text-sm flex items-center shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 mr-2 stroke-[2.5]" />
            Register New Institute
          </button>
        </div>
      </div>

      {/* Global Top KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Institutes */}
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-border-subtle bg-bg-surface relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Total Coaching Centers</p>
              <h3 className="font-heading text-3xl font-extrabold text-text-primary mt-1">{institutes.length} Centers</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>4 Operational • 1 Renewal Pending</span>
          </div>
        </div>

        {/* Card 2: Total Enrolled Students */}
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-border-subtle bg-bg-surface relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Total Active Students</p>
              <h3 className="font-heading text-3xl font-extrabold text-text-primary mt-1">{summary.totalStudents.toLocaleString()}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>+14.8% Enrollment Growth YoY</span>
          </div>
        </div>

        {/* Card 3: Total Teaching Staff */}
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-border-subtle bg-bg-surface relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Global Faculty Base</p>
              <h3 className="font-heading text-3xl font-extrabold text-text-primary mt-1">{summary.totalTeachers} Educators</h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            <Activity className="w-3.5 h-3.5 mr-1" />
            <span>98.4% Teacher Check-in Today</span>
          </div>
        </div>

        {/* Card 4: Global Monthly Gross Inflows */}
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-border-subtle bg-bg-surface relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Total Network Revenue</p>
              <h3 className="font-heading text-3xl font-extrabold text-text-primary mt-1">${summary.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-semibold">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>${summary.totalPending.toLocaleString()} Pending Dues</span>
          </div>
        </div>

      </div>

      {/* Proactive Value-Add: Network Diagnostics Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-border-subtle bg-bg-surface flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">Cluster Cloud Storage</p>
              <p className="text-lg font-bold text-text-primary font-heading">624 GB / 950 GB</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">65.6%</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border-subtle bg-bg-surface flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">Live Hybrid Classrooms</p>
              <p className="text-lg font-bold text-text-primary font-heading">14 Rooms Streaming</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">Zero Jitter</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border-subtle bg-bg-surface flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">Parent App Telemetry</p>
              <p className="text-lg font-bold text-text-primary font-heading">3,892 Logins Today</p>
            </div>
          </div>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-2 py-1 rounded-md">79.5% MAU</span>
        </div>
      </div>

      {/* Institutes Table & Filter Section */}
      <div className="glass-card rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden">
        
        {/* Table Controls Header */}
        <div className="p-6 border-b border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bg-surface-hover">
          <div>
            <h2 className="font-heading text-xl font-bold text-text-primary flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
              All Affiliated Institutes Directory ({filteredInstitutes.length})
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Select any institute row to inspect deep metrics, GST breakdowns, batches, and live performance charts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter institute or city..." 
                className="bg-bg-surface border border-border-subtle text-text-primary text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:border-indigo-500 transition-all w-52 placeholder:text-text-secondary"
              />
            </div>

            {/* Filter by Package */}
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="bg-bg-surface border border-border-subtle text-text-primary text-xs rounded-xl px-3 py-2 outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Packages</option>
              <option value="Enterprise Max">Enterprise Max</option>
              <option value="Pro Academy">Pro Academy</option>
              <option value="Growth Tier">Growth Tier</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-surface-hover text-text-secondary text-[11px] font-bold uppercase tracking-wider border-b border-border-subtle">
                <th className="px-6 py-4">Institute & Location</th>
                <th className="px-6 py-4">Campus Director</th>
                <th className="px-6 py-4">Students / Capacity</th>
                <th className="px-6 py-4">Faculty</th>
                <th className="px-6 py-4">Subscription Plan</th>
                <th className="px-6 py-4">Monthly Inflow</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Deep View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm">
              {filteredInstitutes.map((inst) => {
                const capacityPct = Math.round((inst.metrics.students / inst.metrics.studentCapacity) * 100);

                return (
                  <tr 
                    key={inst.id} 
                    onClick={() => onSelectInstitute(inst.code)}
                    className="hover:bg-bg-surface-hover transition-colors cursor-pointer group"
                  >
                    {/* Name & Location */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-600/30 dark:to-purple-600/30 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center font-heading font-extrabold text-indigo-700 dark:text-white text-sm shrink-0">
                          {inst.shortCode.split('-')[0]}
                        </div>
                        <div>
                          <div className="font-bold text-text-primary group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors flex items-center">
                            {inst.name}
                            <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 dark:text-indigo-400" />
                          </div>
                          <div className="text-xs text-text-secondary flex items-center mt-0.5">
                            <MapPin className="w-3 h-3 mr-1 text-text-secondary" /> {inst.city}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Director */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-text-primary text-xs">{inst.director}</div>
                      <div className="text-[11px] text-text-secondary font-mono mt-0.5">{inst.directorEmail}</div>
                    </td>

                    {/* Students & Capacity Bar */}
                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-text-primary">
                        {inst.metrics.students.toLocaleString()} / <span className="text-text-secondary">{inst.metrics.studentCapacity}</span>
                      </div>
                      <div className="w-28 bg-slate-200 dark:bg-[#1a2234] rounded-full h-1.5 mt-1.5 overflow-hidden">
                        <div 
                          style={{ width: `${capacityPct}%` }}
                          className={`h-full rounded-full ${capacityPct > 90 ? 'bg-amber-400' : 'bg-indigo-500'}`}
                        />
                      </div>
                    </td>

                    {/* Teachers */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-[#cbd5e1]">{inst.metrics.teachers} Faculty</span>
                      <div className="text-[11px] text-[#64748b]">{inst.metrics.batches} Active Batches</div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                        {inst.packageTier}
                      </span>
                      <div className="text-[10px] text-[#64748b] mt-1">Exp: {inst.packageExpiry}</div>
                    </td>

                    {/* Monthly Volume */}
                    <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-400">
                      ${inst.metrics.monthlyRevenue.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center w-fit ${
                        inst.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${inst.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                        {inst.status}
                      </span>
                    </td>

                    {/* Button */}
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectInstitute(inst.code);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#192236] hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold transition-all border border-[#232e47]"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-[#1e2638] bg-[#0c101b] flex justify-between items-center text-xs text-[#8291a7]">
          <span>Showing all {filteredInstitutes.length} registered tuition centers</span>
          <span>Click any row to switch Super Admin scope to that campus</span>
        </div>
      </div>

    </div>
  );
}

// --- Component 2: Deep Detailed Single Institute View (With Interactive Graphs) ---
// (Visible when an individual institute is selected in the top dropdown!)

function DetailedInstituteView({ institute, onBackToGlobal }) {
  const [activeTab, setActiveTab] = useState('batches'); // 'batches' | 'subjects' | 'gst-billing' | 'infrastructure'

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Return Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <button 
          onClick={onBackToGlobal}
          className="flex items-center text-xs font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-white bg-bg-surface hover:bg-bg-surface-hover border border-border-subtle px-3.5 py-2 rounded-xl transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          ← Back to All Institutes Overview
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-text-secondary">Campus Unique Code:</span>
          <span className="text-xs font-mono font-bold text-text-primary bg-bg-surface px-2 py-1 rounded border border-border-subtle">
            {institute.shortCode}
          </span>
          <button className="text-xs bg-bg-surface hover:bg-bg-surface-hover text-text-primary px-3 py-1.5 rounded-lg border border-border-subtle flex items-center transition-colors">
            <FileText className="w-3.5 h-3.5 mr-1.5 text-indigo-500 dark:text-indigo-400" /> Export Full Dossier PDF
          </button>
        </div>
      </div>

      {/* Institute Hero Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-border-subtle relative overflow-hidden bg-bg-surface">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center font-heading font-extrabold text-white text-2xl shadow-xl shadow-indigo-500/25 shrink-0">
              {institute.shortCode.split('-')[0]}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-text-primary">
                  {institute.name}
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center">
                  <Check className="w-3 h-3 mr-1 stroke-[3]" /> Verified Campus
                </span>
                <span className="px-3 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                  {institute.packageTier}
                </span>
              </div>
              <p className="text-sm text-indigo-700 dark:text-indigo-300/90 font-medium mb-2">{institute.tagline}</p>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-text-secondary">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-indigo-500 dark:text-indigo-400" /> {institute.address}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-text-secondary" /> Est. {institute.established}</span>
                <span className="flex items-center"><Shield className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" /> GSTIN: {institute.gstin}</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Box */}
          <div className="p-4 rounded-2xl bg-bg-surface-hover border border-border-subtle flex flex-col justify-center min-w-[260px]">
            <div className="flex items-center space-x-3 mb-2">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt={institute.director} 
                className="w-10 h-10 rounded-xl object-cover border border-indigo-500/40"
              />
              <div>
                <p className="text-xs font-bold text-text-primary">{institute.director}</p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">Managing Director</p>
              </div>
            </div>
            <div className="text-xs space-y-1 text-text-secondary">
              <p className="flex items-center"><Mail className="w-3 h-3 mr-1.5 text-text-secondary" /> {institute.directorEmail}</p>
              <p className="flex items-center"><Phone className="w-3 h-3 mr-1.5 text-text-secondary" /> {institute.directorPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Institute Specific Key Performance Indicators (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-border-subtle bg-bg-surface">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Campus Students</p>
              <h3 className="font-heading text-3xl font-extrabold text-text-primary mt-1">
                {institute.metrics.students}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
          <div className="text-xs text-[#94a3b8]">
            Capacity: <strong className="text-white">{institute.metrics.studentCapacity} Seats</strong> ({Math.round(institute.metrics.students / institute.metrics.studentCapacity * 100)}% Filled)
          </div>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-[#1e2638]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-[#8291a7] uppercase tracking-wider">Instructors & Staff</p>
              <h3 className="font-heading text-3xl font-extrabold text-white mt-1">
                {institute.metrics.teachers} Faculty
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="text-xs text-purple-400 font-semibold">
            +{institute.metrics.supportStaff} Administration & Lab Staff
          </div>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-[#1e2638]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-[#8291a7] uppercase tracking-wider">Monthly Gross Volume</p>
              <h3 className="font-heading text-3xl font-extrabold text-white mt-1 font-mono">
                ${institute.metrics.monthlyRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="text-xs text-amber-400 font-semibold">
            ${institute.metrics.pendingFees.toLocaleString()} Uncollected Defaulter Balance
          </div>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-[#1e2638]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-[#8291a7] uppercase tracking-wider">Biometric Attendance</p>
              <h3 className="font-heading text-3xl font-extrabold text-white mt-1">
                {institute.metrics.attendanceRate}%
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="text-xs text-emerald-400 font-semibold">
            Above Network Benchmark (91.0%)
          </div>
        </div>

      </div>

      {/* Interactive Charts & Graphs Section (As explicitly requested in the audio!) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: 6-Month Inflow & Attendance Progression Bar Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart 
            data={institute.performanceChart}
            title={`${institute.name} • 6-Month Trajectory`}
            subtitle="Hover over any bar to inspect monthly gross revenue collections and student attendance averages"
          />
        </div>

        {/* Right 1 Col: Subscription Quota & Cloud Telemetry Panel */}
        <div className="glass-card p-6 rounded-2xl border border-[#1e2638] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-indigo-400" />
                Plan & License Quotas
              </h3>
              <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/15 px-2 py-0.5 rounded border border-indigo-500/30">
                {institute.packageTier}
              </span>
            </div>

            <p className="text-xs text-[#94a3b8] mb-5">
              License valid through <strong className="text-white">{institute.packageExpiry}</strong> ({institute.daysRemaining} days remaining).
            </p>

            {/* Quota 1: Cloud Storage */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-[#8291a7] flex items-center"><Database className="w-3.5 h-3.5 mr-1" /> Cloud Video & PDF CDN</span>
                <span className="text-white font-mono">{institute.metrics.storageUsedGB} GB / {institute.metrics.storageTotalGB} GB</span>
              </div>
              <div className="w-full bg-[#182030] rounded-full h-2 overflow-hidden">
                <div 
                  style={{ width: `${(institute.metrics.storageUsedGB / institute.metrics.storageTotalGB) * 100}%` }}
                  className="bg-indigo-500 h-full rounded-full"
                />
              </div>
            </div>

            {/* Quota 2: SMS Credits */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-[#8291a7] flex items-center"><Smartphone className="w-3.5 h-3.5 mr-1" /> Parent SMS & OTP Credits</span>
                <span className="text-white font-mono">{institute.metrics.smsQuotaUsed.toLocaleString()} / {institute.metrics.smsQuotaTotal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-[#182030] rounded-full h-2 overflow-hidden">
                <div 
                  style={{ width: `${(institute.metrics.smsQuotaUsed / institute.metrics.smsQuotaTotal) * 100}%` }}
                  className="bg-purple-500 h-full rounded-full"
                />
              </div>
            </div>

            {/* Quota 3: Student Capacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#8291a7] flex items-center"><Users className="w-3.5 h-3.5 mr-1" /> Registered Student Roster</span>
                <span className="text-white font-mono">{institute.metrics.students} / {institute.metrics.studentCapacity}</span>
              </div>
              <div className="w-full bg-[#182030] rounded-full h-2 overflow-hidden">
                <div 
                  style={{ width: `${(institute.metrics.students / institute.metrics.studentCapacity) * 100}%` }}
                  className="bg-emerald-400 h-full rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1e2638] mt-6 flex gap-3">
            <button className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/20">
              Upgrade Tier
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-[#161d2d] hover:bg-[#1f283d] text-[#cbd5e1] font-semibold text-xs transition-colors border border-[#242f47]">
              Renew License
            </button>
          </div>
        </div>

      </div>

      {/* Detailed Tabbed Multi-Section Views */}
      <div className="glass-card rounded-2xl border border-[#1e2638] overflow-hidden">
        
        {/* Tab Headers */}
        <div className="px-6 border-b border-[#1e2638] bg-[#0e121e] flex items-center space-x-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('batches')}
            className={`py-4 text-xs font-bold border-b-2 transition-all flex items-center shrink-0 ${
              activeTab === 'batches' 
                ? 'border-indigo-500 text-white' 
                : 'border-transparent text-[#64748b] hover:text-[#94a3b8]'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
            Active Batches & Schedule ({institute.batchesList.length})
          </button>

          <button 
            onClick={() => setActiveTab('subjects')}
            className={`py-4 text-xs font-bold border-b-2 transition-all flex items-center shrink-0 ${
              activeTab === 'subjects' 
                ? 'border-indigo-500 text-white' 
                : 'border-transparent text-[#64748b] hover:text-[#94a3b8]'
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2 text-emerald-400" />
            Subject Performance & Exam Averages
          </button>

          <button 
            onClick={() => setActiveTab('gst-billing')}
            className={`py-4 text-xs font-bold border-b-2 transition-all flex items-center shrink-0 ${
              activeTab === 'gst-billing' 
                ? 'border-indigo-500 text-white' 
                : 'border-transparent text-[#64748b] hover:text-[#94a3b8]'
            }`}
          >
            <DollarSign className="w-4 h-4 mr-2 text-amber-400" />
            GST Compliance & Fee Ledgers
          </button>
        </div>

        {/* Tab Content 1: Batches */}
        {activeTab === 'batches' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-[#8291a7] border-b border-[#1e2638]">
                    <th className="pb-3">Batch Code & Title</th>
                    <th className="pb-3">Assigned Faculty</th>
                    <th className="pb-3">Room / Lab</th>
                    <th className="pb-3">Strength</th>
                    <th className="pb-3">Session Timing</th>
                    <th className="pb-3">Syllabus Progress</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182033] text-xs">
                  {institute.batchesList.map((batch) => (
                    <tr key={batch.id} className="hover:bg-[#131929] transition-colors">
                      <td className="py-3.5 font-bold text-white">
                        <div>{batch.name}</div>
                        <div className="text-[10px] text-indigo-400 font-mono">ID: {batch.id}</div>
                      </td>
                      <td className="py-3.5 text-[#cbd5e1]">{batch.teacher}</td>
                      <td className="py-3.5 text-[#8291a7] font-medium">{batch.room}</td>
                      <td className="py-3.5 text-white font-semibold">{batch.students} Students</td>
                      <td className="py-3.5 text-[#94a3b8]">{batch.time}</td>
                      <td className="py-3.5">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-[#1a2336] rounded-full h-1.5 overflow-hidden">
                            <div style={{ width: `${batch.syllabusPct}%` }} className="bg-indigo-500 h-full rounded-full" />
                          </div>
                          <span className="text-[11px] text-indigo-300 font-semibold">{batch.syllabusPct}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          batch.status === 'In Session' 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                        }`}>
                          {batch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content 2: Subject Performance */}
        {activeTab === 'subjects' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {institute.subjectBreakdown.map((subj) => (
                <div key={subj.subject} className="p-4 rounded-xl bg-[#131828] border border-[#1e273d] flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-sm">{subj.subject}</h4>
                    <p className="text-xs text-indigo-400 mt-0.5">Faculty Lead: {subj.faculty}</p>
                    <p className="text-[11px] text-[#64748b] mt-1">{subj.batches} Parallel Batches Conducted</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-xs text-[#94a3b8]">Avg Score: <strong className="text-emerald-400 font-bold">{subj.avgScore}/100</strong></div>
                    <div className="text-xs text-[#94a3b8]">Pass Rate: <strong className="text-white font-bold">{subj.passRate}%</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 3: GST Compliance & Ledger */}
        {activeTab === 'gst-billing' && (
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col md:flex-row justify-between md:items-center gap-3">
              <div>
                <p className="text-xs font-bold text-indigo-300">GSTIN Registered Identity</p>
                <p className="text-lg font-mono font-extrabold text-white">{institute.gstin}</p>
                <p className="text-xs text-[#94a3b8]">CIN: {institute.cinNumber}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors">
                  Generate GSTR-1 Ledger
                </button>
                <button className="px-4 py-2 rounded-xl bg-[#192236] text-[#cbd5e1] hover:text-white text-xs font-bold transition-colors">
                  Dunning Defaulter Reminders
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#131828] border border-[#1e273d]">
                <p className="text-xs text-[#8291a7]">CGST (9%) Remitted</p>
                <p className="text-xl font-bold text-white mt-1 font-mono">${(institute.metrics.monthlyRevenue * 0.09).toFixed(0)}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#131828] border border-[#1e273d]">
                <p className="text-xs text-[#8291a7]">SGST (9%) Remitted</p>
                <p className="text-xl font-bold text-white mt-1 font-mono">${(institute.metrics.monthlyRevenue * 0.09).toFixed(0)}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#131828] border border-[#1e273d]">
                <p className="text-xs text-[#8291a7]">Total Tax Liability</p>
                <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">${(institute.metrics.monthlyRevenue * 0.18).toFixed(0)}</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

// --- Component 3: Add New Institute Modal ---

function AddInstituteModal({ isOpen, onClose, onAddInstitute }) {
  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    city: '',
    address: '',
    director: '',
    directorPhone: '',
    directorEmail: '',
    gstin: '',
    cinNumber: '',
    packageTier: 'Enterprise Max',
    studentCapacity: 1200,
    tagline: 'Excellence in Coaching & Test Preparation'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.city) return;

    const newCode = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8);
    const newInstitute = {
      id: `inst-${Date.now()}`,
      code: newCode,
      name: formData.name,
      shortCode: formData.shortCode || `${newCode.toUpperCase().slice(0, 4)}-HUB`,
      tagline: formData.tagline,
      city: formData.city,
      address: formData.address || `${formData.city} Campus`,
      director: formData.director || 'Campus Director',
      directorPhone: formData.directorPhone || '+1 (555) 000-0000',
      directorEmail: formData.directorEmail || `contact@${newCode}.edu`,
      established: '2026',
      gstin: formData.gstin || '27AABCT9921M1Z0',
      cinNumber: formData.cinNumber || 'U80902DL2026PTC998122',
      packageTier: formData.packageTier,
      billingCycle: 'Annual',
      packageExpiry: 'Sep 18, 2027',
      daysRemaining: 365,
      status: 'Active',
      metrics: {
        students: 120,
        studentCapacity: parseInt(formData.studentCapacity) || 1000,
        teachers: 8,
        supportStaff: 4,
        batches: 4,
        monthlyRevenue: 14500,
        pendingFees: 1200,
        attendanceRate: 95.0,
        storageUsedGB: 12,
        storageTotalGB: 200,
        smsQuotaUsed: 1200,
        smsQuotaTotal: 50000,
      },
      performanceChart: [
        { month: 'Jun', students: 40, revenue: 5000, attendance: 92 },
        { month: 'Jul', students: 65, revenue: 8000, attendance: 93 },
        { month: 'Aug', students: 90, revenue: 11000, attendance: 95 },
        { month: 'Sep', students: 120, revenue: 14500, attendance: 95 },
      ],
      subjectBreakdown: [
        { subject: 'Foundation Mathematics', faculty: 'Lead Instructor', passRate: 95, avgScore: 84, batches: 2 },
        { subject: 'Integrated Sciences', faculty: 'Lead Instructor', passRate: 92, avgScore: 80, batches: 2 },
      ],
      batchesList: [
        { id: 'B901', name: 'Starter Batch Cohort A', teacher: 'Lead Instructor', room: 'Main Hall', students: 45, time: '09:00 AM - 12:00 PM', syllabusPct: 15, status: 'In Session' }
      ]
    };

    onAddInstitute(newInstitute);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0d111d] border border-[#232d44] rounded-3xl shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#1e2638] bg-[#121626] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-white">Register New Coaching Institute</h2>
              <p className="text-xs text-[#94a3b8]">Deploy dedicated multi-tenant database & ERP cluster</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#64748b] hover:text-white p-2 rounded-xl hover:bg-[#1c2438] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Section 1 */}
          <div>
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">
              1. Identity & Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Full Legal Institute Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Zenith Olympiad & Engineering Academy" 
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Campus City / Region *</label>
                <input 
                  type="text" 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="e.g. Chicago, Illinois" 
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Branch Code (3-4 Letters)</label>
                <input 
                  type="text" 
                  value={formData.shortCode}
                  onChange={(e) => setFormData({...formData, shortCode: e.target.value.toUpperCase()})}
                  placeholder="e.g. ZENI-CHI" 
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 font-mono transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Physical Address</label>
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="e.g. 500 Michigan Avenue, Suite 400" 
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Director Details */}
          <div className="pt-4 border-t border-[#1e2638]">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">
              2. Campus Director & Administrative Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Director Name</label>
                <input 
                  type="text" 
                  value={formData.director}
                  onChange={(e) => setFormData({...formData, director: e.target.value})}
                  placeholder="e.g. Prof. Arthur Pendelton" 
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Official Email</label>
                <input 
                  type="email" 
                  value={formData.directorEmail}
                  onChange={(e) => setFormData({...formData, directorEmail: e.target.value})}
                  placeholder="director@institute.com" 
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Contact Phone</label>
                <input 
                  type="tel" 
                  value={formData.directorPhone}
                  onChange={(e) => setFormData({...formData, directorPhone: e.target.value})}
                  placeholder="+1 (555) 000-1122" 
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">GSTIN / Tax ID</label>
                <input 
                  type="text" 
                  value={formData.gstin}
                  onChange={(e) => setFormData({...formData, gstin: e.target.value.toUpperCase()})}
                  placeholder="e.g. 27AABCV9901M1Z5" 
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 font-mono transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Package Selection */}
          <div className="pt-4 border-t border-[#1e2638]">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">
              3. ERP License Tier & Capacity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Subscription Tier</label>
                <select 
                  value={formData.packageTier}
                  onChange={(e) => setFormData({...formData, packageTier: e.target.value})}
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Enterprise Max">Enterprise Max (Unlimited Live Rooms + 250GB Storage)</option>
                  <option value="Pro Academy">Pro Academy (Up to 1,500 Students + 150GB Storage)</option>
                  <option value="Growth Tier">Growth Tier (Up to 800 Students + 100GB Storage)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Initial Student Seat Limit</label>
                <input 
                  type="number" 
                  value={formData.studentCapacity}
                  onChange={(e) => setFormData({...formData, studentCapacity: e.target.value})}
                  className="w-full bg-[#131929] border border-[#232d44] text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#1e2638] flex items-center justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#8291a7] hover:text-white hover:bg-[#1a2336] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="gradient-brand text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
            >
              Deploy & Activate Institute
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

// --- Dashboard Component 1: Faculty & Educators ---
function FacultyDashboard({ onReturn }) {
  const dummyTeachers = [
    { id: 'FAC-01', name: 'Dr. Harrison', subject: 'Advanced Physics', rating: 4.9, status: 'Active', branches: 3 },
    { id: 'FAC-02', name: 'Prof. Ananya Roy', subject: 'Organic Chemistry', rating: 4.7, status: 'Active', branches: 2 },
    { id: 'FAC-03', name: 'Er. Vivek Sharma', subject: 'Pure Mathematics', rating: 4.5, status: 'Active', branches: 4 },
    { id: 'FAC-04', name: 'Adv. David Ross', subject: 'Corporate Law', rating: 4.2, status: 'On Leave', branches: 1 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <h2 className="font-heading text-2xl font-bold text-text-primary flex items-center">
            Faculty & Educators Overview
          </h2>
          <p className="text-xs text-text-secondary mt-1">Real-time performance and rating tracking for teaching staff.</p>
        </div>
        <button onClick={onReturn} className="bg-bg-surface hover:bg-bg-surface-hover text-text-primary px-4 py-2 rounded-xl text-xs font-semibold border border-border-subtle transition-colors">
          Return to Institutes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
          <p className="text-xs text-text-secondary uppercase font-bold mb-1">Total Faculty Members</p>
          <h3 className="text-3xl font-bold text-text-primary">168</h3>
          <p className="text-xs text-emerald-500 font-semibold mt-1">↑ 12 hired this month</p>
        </div>
        <div className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
          <p className="text-xs text-text-secondary uppercase font-bold mb-1">Average Global Rating</p>
          <h3 className="text-3xl font-bold text-text-primary">4.7 / 5.0</h3>
          <p className="text-xs text-indigo-500 font-semibold mt-1">Based on 14k student reviews</p>
        </div>
        <div className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
          <p className="text-xs text-text-secondary uppercase font-bold mb-1">Active Leave Requests</p>
          <h3 className="text-3xl font-bold text-text-primary">8</h3>
          <p className="text-xs text-amber-500 font-semibold mt-1">Requires approval</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl border border-border-subtle bg-bg-surface mt-6 h-64 flex flex-col justify-end relative overflow-hidden group">
        <div className="absolute top-4 left-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">Faculty Rating Distribution</h3>
        </div>
        {/* Mock Chart Area */}
        <div className="flex items-end justify-around h-32 w-full mt-10">
          <div className="w-12 bg-indigo-200 dark:bg-indigo-900 rounded-t-md h-[20%]" title="1-2 Stars"></div>
          <div className="w-12 bg-indigo-300 dark:bg-indigo-700 rounded-t-md h-[40%]" title="3 Stars"></div>
          <div className="w-12 bg-indigo-400 dark:bg-indigo-500 rounded-t-md h-[70%]" title="4 Stars"></div>
          <div className="w-12 bg-indigo-500 dark:bg-indigo-400 rounded-t-md h-[100%]" title="5 Stars"></div>
        </div>
        <div className="flex items-center justify-around w-full mt-2 text-xs text-text-secondary font-bold">
          <span>1-2 Stars</span>
          <span>3 Stars</span>
          <span>4 Stars</span>
          <span>5 Stars</span>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-border-subtle overflow-hidden mt-6 bg-bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-surface-hover text-text-secondary text-[11px] font-bold uppercase tracking-wider border-b border-border-subtle">
                <th className="px-6 py-4">Faculty ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Core Subject</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Student Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm">
              {dummyTeachers.map((row) => (
                <tr key={row.id} className="hover:bg-bg-surface-hover transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-indigo-500">{row.id}</td>
                  <td className="px-6 py-4 font-bold text-text-primary">{row.name}</td>
                  <td className="px-6 py-4 text-text-secondary">{row.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      row.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold flex items-center text-text-primary">
                    <Star className="w-3.5 h-3.5 text-amber-400 mr-1 fill-amber-400" /> {row.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Dashboard Component 2: Finance & GST ---
function FinanceDashboard({ onReturn }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <h2 className="font-heading text-2xl font-bold text-text-primary flex items-center">
            Finance & GST Billing
          </h2>
          <p className="text-xs text-text-secondary mt-1">Aggregate network revenue and tax liabilities.</p>
        </div>
        <button onClick={onReturn} className="bg-bg-surface hover:bg-bg-surface-hover text-text-primary px-4 py-2 rounded-xl text-xs font-semibold border border-border-subtle transition-colors">
          Return to Institutes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
          <p className="text-xs text-text-secondary uppercase font-bold mb-1">Month-To-Date Revenue</p>
          <h3 className="text-3xl font-bold text-text-primary font-mono">$364,250</h3>
          <p className="text-xs text-emerald-500 font-semibold mt-1">↑ +8.4% vs last month</p>
        </div>
        <div className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
          <p className="text-xs text-text-secondary uppercase font-bold mb-1">Pending Collections</p>
          <h3 className="text-3xl font-bold text-amber-500 font-mono">$42,800</h3>
          <p className="text-xs text-text-secondary font-semibold mt-1">Across 185 students</p>
        </div>
        <div className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
          <p className="text-xs text-text-secondary uppercase font-bold mb-1">Projected GST Liability</p>
          <h3 className="text-3xl font-bold text-text-primary font-mono">$65,565</h3>
          <p className="text-xs text-indigo-500 font-semibold mt-1">Due in 14 days</p>
        </div>
      </div>
      
      <div className="glass-card p-6 rounded-xl border border-border-subtle bg-bg-surface h-64 flex items-center justify-center">
        <p className="text-text-secondary font-semibold">Detailed Financial Graphs loading...</p>
      </div>
    </div>
  );
}

// --- Dashboard Component 3: Students & Admissions ---
function StudentsDashboard({ onReturn }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <h2 className="font-heading text-2xl font-bold text-text-primary flex items-center">
            Students & Admissions
          </h2>
          <p className="text-xs text-text-secondary mt-1">Global student directory and enrollment metrics.</p>
        </div>
        <button onClick={onReturn} className="bg-bg-surface hover:bg-bg-surface-hover text-text-primary px-4 py-2 rounded-xl text-xs font-semibold border border-border-subtle transition-colors">
          Return to Institutes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
          <p className="text-xs text-text-secondary uppercase font-bold mb-1">Total Active Students</p>
          <h3 className="text-3xl font-bold text-text-primary font-mono">4,890</h3>
        </div>
        <div className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
          <p className="text-xs text-text-secondary uppercase font-bold mb-1">New Leads (This Week)</p>
          <h3 className="text-3xl font-bold text-indigo-500 font-mono">214</h3>
        </div>
      </div>
      
      <div className="glass-card p-6 rounded-xl border border-border-subtle bg-bg-surface h-64 flex items-center justify-center">
        <p className="text-text-secondary font-semibold">Admissions Funnel Graph loading...</p>
      </div>
    </div>
  );
}

// --- Generic Dashboard Fallback ---
function GenericDashboard({ activeModule, activeSubcategory, modules, onReturn }) {
  const mod = modules.find(m => m.id === activeModule);
  const subMod = mod?.subcategories.find(s => s.id === activeSubcategory);
  
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <h2 className="font-heading text-2xl font-bold text-text-primary flex items-center">
             {mod?.name} 
          </h2>
          <p className="text-xs text-text-secondary mt-1">
             Module view for <strong className="text-indigo-500">{subMod?.name}</strong>.
          </p>
        </div>
        <button onClick={onReturn} className="bg-bg-surface hover:bg-bg-surface-hover text-text-primary px-4 py-2 rounded-xl text-xs font-semibold border border-border-subtle transition-colors">
          Return to Institutes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card p-5 rounded-xl border border-border-subtle bg-bg-surface">
            <p className="text-xs text-text-secondary uppercase font-bold mb-1">Metric {i}</p>
            <h3 className="text-xl font-bold text-text-primary font-mono">{Math.floor(Math.random() * 5000)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Container App ---

export default function App() {
  const [institutes, setInstitutes] = useState(INITIAL_INSTITUTES);
  const [selectedInstituteCode, setSelectedInstituteCode] = useState('all');
  const [activeModule, setActiveModule] = useState('institutes');
  const [activeSubcategory, setActiveSubcategory] = useState('inst-overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  const currentInstitute = useMemo(() => {
    return institutes.find(i => i.code === selectedInstituteCode) || null;
  }, [institutes, selectedInstituteCode]);

  const handleAddInstitute = (newInst) => {
    setInstitutes(prev => [newInst, ...prev]);
    setSelectedInstituteCode(newInst.code);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex w-full min-h-screen bg-bg-base text-text-primary transition-colors duration-300">
        
        <Sidebar 
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          activeSubcategory={activeSubcategory}
          setActiveSubcategory={setActiveSubcategory}
          onResetToGlobal={() => setSelectedInstituteCode('all')}
        />

        <div className="flex-1 ml-72 flex flex-col min-h-screen">
          
          <TopBar 
            institutes={institutes}
            selectedInstituteCode={selectedInstituteCode}
            onSelectInstitute={(code) => setSelectedInstituteCode(code)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />

          <main className="flex-1 p-8 max-w-[1520px] w-full mx-auto">
            {activeModule === 'institutes' ? (
              selectedInstituteCode === 'all' ? (
                <GlobalInstitutesOverview 
                  institutes={institutes}
                  onSelectInstitute={(code) => setSelectedInstituteCode(code)}
                  onOpenAddModal={() => setIsAddModalOpen(true)}
                />
              ) : (
                currentInstitute && (
                  <DetailedInstituteView 
                    institute={currentInstitute}
                    onBackToGlobal={() => setSelectedInstituteCode('all')}
                  />
                )
              )
            ) : activeModule === 'teachers' ? (
              <FacultyDashboard onReturn={() => { setActiveModule('institutes'); setSelectedInstituteCode('all'); }} />
            ) : activeModule === 'finance' ? (
              <FinanceDashboard onReturn={() => { setActiveModule('institutes'); setSelectedInstituteCode('all'); }} />
            ) : activeModule === 'students' ? (
              <StudentsDashboard onReturn={() => { setActiveModule('institutes'); setSelectedInstituteCode('all'); }} />
            ) : (
              <GenericDashboard 
                activeModule={activeModule}
                activeSubcategory={activeSubcategory}
                modules={SIDEBAR_MODULES}
                onReturn={() => { setActiveModule('institutes'); setSelectedInstituteCode('all'); }}
              />
            )}
          </main>
        </div>

        <AddInstituteModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddInstitute={handleAddInstitute}
        />
      </div>
    </div>
  );
}
