// ============================================================================
// ROLES & PERMISSIONS DATA STORE (Module 14)
// Multi-tenant RBAC, Privileged User Accounts, MFA & Elevation Telemetry
// ============================================================================

export const MASTER_ROLES = [
  { 
    role: 'Super Admin', 
    count: 4, 
    scope: 'Global Enterprise HQ', 
    access: 'All Centers, Financial Ledgers, Tax Invoicing, Root DB, Payroll Release', 
    badge: 'Unrestricted',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  { 
    role: 'Center Director / Campus Head', 
    count: 18, 
    scope: 'Assigned Campus Center', 
    access: 'Campus Admissions, Faculty Rosters, Local Cash Drawer, Attendance Overrides', 
    badge: 'Branch Admin',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  { 
    role: 'Senior Faculty / HOD', 
    count: 54, 
    scope: 'Academic Department', 
    access: 'Curriculum Velocity, Question Bank, Mock Tests, Grading, Doubt Sessions', 
    badge: 'Academics Only',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  { 
    role: 'Finance / Cashier', 
    count: 14, 
    scope: 'Branch Cash Desk', 
    access: 'Fee Receipt Generation, Defaulter Calling Desk, GST Invoicing, Day Cash Drawer', 
    badge: 'Financial Desk',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  { 
    role: 'Counselor / Telecaller', 
    count: 28, 
    scope: 'CRM Lead Funnel', 
    access: 'Inbound Inquiries, Walk-in Reception Pass, Demo Bookings, Seat Token Entry', 
    badge: 'Sales CRM',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  { 
    role: 'Inventory Keeper', 
    count: 8, 
    scope: 'Logistics Depot', 
    access: 'Kit Dispatches, Study Module Barcode Scanning, Uniform Stock Replenish', 
    badge: 'Logistics Depot',
    color: 'bg-slate-100 text-slate-700 border-slate-200'
  },
];

export const STAFF_ACCOUNTS = [
  {
    id: 'USR-101',
    name: 'Dr. Vikram Malhotra',
    email: 'v.malhotra@zenith-superadmin.in',
    phone: '+1 (555) 100-8801',
    role: 'Super Admin',
    instituteCode: 'global',
    instituteName: 'Global Enterprise HQ',
    mfaEnabled: true,
    mfaMethod: 'Hardware YubiKey (FIDO2)',
    lastLogin: '10 mins ago',
    ipAddress: '192.168.1.104 (Manhattan HQ)',
    status: 'Active',
    elevationLevel: 'Root Super Admin',
    createdDate: 'Jan 2024'
  },
  {
    id: 'USR-102',
    name: 'Sunita Rao',
    email: 's.rao@alpha-kota.in',
    phone: '+1 (555) 234-8902',
    role: 'Center Director',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    mfaEnabled: true,
    mfaMethod: 'Google Authenticator (TOTP)',
    lastLogin: '24 mins ago',
    ipAddress: '10.0.4.18 (Alpha Center)',
    status: 'Active',
    elevationLevel: 'Branch Director',
    createdDate: 'Mar 2024'
  },
  {
    id: 'USR-103',
    name: 'Catherine Miller, FCA',
    email: 'c.miller@betacommerce.co.uk',
    phone: '+44 20 7946 0912',
    role: 'Center Director',
    instituteCode: 'beta',
    instituteName: 'Beta Commerce Academy & CA Foundation',
    mfaEnabled: true,
    mfaMethod: 'Microsoft Authenticator',
    lastLogin: '1 hr ago',
    ipAddress: '172.16.2.90 (London Central)',
    status: 'Active',
    elevationLevel: 'Branch Director',
    createdDate: 'Apr 2024'
  },
  {
    id: 'USR-104',
    name: 'Prof. Arvind Nambiar',
    email: 'a.nambiar@apex-delhi.in',
    phone: '+1 (555) 819-3321',
    role: 'Senior Faculty / HOD',
    instituteCode: 'apex',
    instituteName: 'Apex Medical & Pre-Engineering Prep',
    mfaEnabled: true,
    mfaMethod: 'Google Authenticator (TOTP)',
    lastLogin: 'Just now',
    ipAddress: '10.2.1.44 (Medical Studio)',
    status: 'Active',
    elevationLevel: 'Academic HOD',
    createdDate: 'Jun 2024'
  },
  {
    id: 'USR-105',
    name: 'Meera Chawla',
    email: 'm.chawla@delta-bengaluru.in',
    phone: '+1 (555) 612-4099',
    role: 'Finance / Cashier',
    instituteCode: 'delta',
    instituteName: 'Delta Coding Academy & AI Scholars',
    mfaEnabled: true,
    mfaMethod: 'Google Authenticator (TOTP)',
    lastLogin: '3 hrs ago',
    ipAddress: '192.168.10.15 (Delta Cash Desk)',
    status: 'Active',
    elevationLevel: 'Standard Cashier',
    createdDate: 'Jul 2024'
  },
  {
    id: 'USR-106',
    name: 'Kavita Joshi',
    email: 'k.joshi@alpha-kota.in',
    phone: '+1 (555) 392-1085',
    role: 'Counselor / Telecaller',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    mfaEnabled: false,
    mfaMethod: 'Pending 2FA Setup',
    lastLogin: 'Yesterday',
    ipAddress: '10.0.4.88 (Counseling Lounge)',
    status: 'Pending 2FA',
    elevationLevel: 'CRM Desk',
    createdDate: 'Aug 2024'
  },
  {
    id: 'USR-107',
    name: 'Adv. Meenakshi Sundaram',
    email: 'm.sundaram@zenith-law.org',
    phone: '+1 (555) 438-7713',
    role: 'Center Director',
    instituteCode: 'zenith',
    instituteName: 'Zenith Humanities & Law Foundation',
    mfaEnabled: true,
    mfaMethod: 'Hardware YubiKey (FIDO2)',
    lastLogin: '45 mins ago',
    ipAddress: '10.8.0.12 (Zenith Law Library)',
    status: 'Active',
    elevationLevel: 'Branch Director',
    createdDate: 'Sep 2024'
  },
  {
    id: 'USR-108',
    name: 'Rajesh Tiwari',
    email: 'r.tiwari@logistics.edu',
    phone: '+1 (555) 902-3115',
    role: 'Inventory Keeper',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    mfaEnabled: true,
    mfaMethod: 'Google Authenticator (TOTP)',
    lastLogin: '4 hrs ago',
    ipAddress: '10.0.6.2 (Central Depot)',
    status: 'Active',
    elevationLevel: 'Warehouse Staff',
    createdDate: 'Feb 2024'
  }
];

export const ELEVATION_REQUESTS = [
  {
    id: 'ELV-701',
    user: 'Meera Chawla',
    role: 'Finance / Cashier',
    campus: 'Delta Coding Academy',
    instituteCode: 'delta',
    requestedPrivilege: 'Fee Discount Override (>15%)',
    reason: 'Parent approved for 20% Olympiad grant by Director. Standard cashier limit is capped at 10%.',
    urgency: 'Critical',
    timeRemaining: '45 mins left',
    status: 'Pending Approval',
    requestedTime: 'Today, 10:15 AM'
  },
  {
    id: 'ELV-702',
    user: 'Kavita Joshi',
    role: 'Counselor / Telecaller',
    campus: 'Alpha Institute of Science & Tech',
    instituteCode: 'alpha',
    requestedPrivilege: 'Bulk Lead CSV Export',
    reason: 'Generating student outreach list for Kota School Physics seminar callbacks.',
    urgency: 'Medium',
    timeRemaining: '2h 10m left',
    status: 'Pending Approval',
    requestedTime: 'Today, 09:30 AM'
  },
  {
    id: 'ELV-703',
    user: 'Prof. Arvind Nambiar',
    role: 'Senior Faculty / HOD',
    campus: 'Apex Medical Prep',
    instituteCode: 'apex',
    requestedPrivilege: 'Mock Exam Key Re-scoring',
    reason: 'Ambiguous question in Chemistry Section C requires re-evaluation of 140 student scores.',
    urgency: 'High',
    timeRemaining: '1h 05m left',
    status: 'Pending Approval',
    requestedTime: 'Today, 08:45 AM'
  }
];

export const PERMISSIONS_MATRIX_DATA = [
  {
    module: 'Institutes & Branches',
    superAdmin: 'FULL CRUD',
    centerDirector: 'READ ONLY',
    seniorFaculty: 'DENIED 🔒',
    financeCashier: 'DENIED 🔒',
    telecallerCounselor: 'DENIED 🔒',
    inventoryKeeper: 'DENIED 🔒',
    superOnly: true,
    scopeLimit: 'Global Enterprise HQ'
  },
  {
    module: 'Student Admissions & KYC Dossier',
    superAdmin: 'FULL CRUD',
    centerDirector: 'BRANCH CRUD',
    seniorFaculty: 'READ ONLY',
    financeCashier: 'FEE STATUS ONLY',
    telecallerCounselor: 'LEADS ENTRY',
    inventoryKeeper: 'KIT DISPATCH',
    superOnly: false,
    scopeLimit: 'Assigned Campus Center'
  },
  {
    module: 'Batches & Curriculum Timetable',
    superAdmin: 'FULL CRUD',
    centerDirector: 'BRANCH CRUD',
    seniorFaculty: 'SYLLABUS UPDATE',
    financeCashier: 'READ ONLY',
    telecallerCounselor: 'BATCH SCHEDULE',
    inventoryKeeper: 'DENIED 🔒',
    superOnly: false,
    scopeLimit: 'Academic Department'
  },
  {
    module: 'Facial Attendance & Biometrics',
    superAdmin: 'FULL CRUD',
    centerDirector: 'OVERRIDE GATE',
    seniorFaculty: 'CLASS CHECK-IN',
    financeCashier: 'DENIED 🔒',
    telecallerCounselor: 'DENIED 🔒',
    inventoryKeeper: 'DENIED 🔒',
    superOnly: false,
    scopeLimit: 'Campus Turnstiles'
  },
  {
    module: 'Fee Ledger & Cash Reconcile',
    superAdmin: 'FULL CRUD',
    centerDirector: 'VIEW & APPROVE',
    seniorFaculty: 'DENIED 🔒',
    financeCashier: 'RECEIPT & DRAWER',
    telecallerCounselor: 'TOKEN VIEW',
    inventoryKeeper: 'DENIED 🔒',
    superOnly: false,
    scopeLimit: 'Cash Counter Drawer'
  },
  {
    module: 'GST Tax Invoicing & Refunds',
    superAdmin: 'FULL CRUD',
    centerDirector: 'ENDORSE ONLY',
    seniorFaculty: 'DENIED 🔒',
    financeCashier: 'PRINT INVOICE',
    telecallerCounselor: 'DENIED 🔒',
    inventoryKeeper: 'DENIED 🔒',
    superOnly: true,
    scopeLimit: 'Global Enterprise HQ'
  },
  {
    module: 'Homework & Exam Test Engine',
    superAdmin: 'FULL CRUD',
    centerDirector: 'BRANCH CRUD',
    seniorFaculty: 'CREATE & GRADE',
    financeCashier: 'DENIED 🔒',
    telecallerCounselor: 'DENIED 🔒',
    inventoryKeeper: 'DENIED 🔒',
    superOnly: false,
    scopeLimit: 'Academic Faculty'
  },
  {
    module: 'Staff Payroll & Salary Ledger',
    superAdmin: 'FULL CRUD',
    centerDirector: 'TIMESHEET VERIFY',
    seniorFaculty: 'DENIED 🔒',
    financeCashier: 'DENIED 🔒',
    telecallerCounselor: 'DENIED 🔒',
    inventoryKeeper: 'DENIED 🔒',
    superOnly: true,
    scopeLimit: 'Global Enterprise HQ'
  },
  {
    module: 'System Security & Root DB Vault',
    superAdmin: 'FULL CRUD',
    centerDirector: 'DENIED 🔒',
    seniorFaculty: 'DENIED 🔒',
    financeCashier: 'DENIED 🔒',
    telecallerCounselor: 'DENIED 🔒',
    inventoryKeeper: 'DENIED 🔒',
    superOnly: true,
    scopeLimit: 'Root Super Admin Only'
  }
];

export const ELEVATION_VELOCITY_DATA = {
  monthlyRequests: [
    { month: 'Apr', requested: 18, approved: 16, rejected: 2 },
    { month: 'May', requested: 24, approved: 21, rejected: 3 },
    { month: 'Jun', requested: 36, approved: 32, rejected: 4, peak: true },
    { month: 'Jul', requested: 28, approved: 25, rejected: 3 },
    { month: 'Aug', requested: 22, approved: 20, rejected: 2 },
    { month: 'Sep', requested: 19, approved: 17, rejected: 2 },
  ],
  meanTurnaroundTime: '14.2 Minutes',
  autoExpiryHours: '24 Hours Max',
  campusBreakdown: [
    { campus: 'Alpha Institute of Science & Tech', totalRequests: 42, approved: 38, avgMinutes: '12.4m', status: 'Optimal' },
    { campus: 'Beta Commerce Academy & CA Foundation', totalRequests: 28, approved: 25, avgMinutes: '15.1m', status: 'Standard' },
    { campus: 'Apex Medical & Pre-Engineering Prep', totalRequests: 34, approved: 31, avgMinutes: '13.8m', status: 'Optimal' },
    { campus: 'Delta Coding Academy & AI Scholars', totalRequests: 22, approved: 20, avgMinutes: '11.2m', status: 'Fast Track' },
    { campus: 'Zenith Humanities & Law Foundation', totalRequests: 21, approved: 17, avgMinutes: '18.5m', status: 'Normal' },
  ]
};

export const MFA_ADOPTION_DATA = {
  overallMfaRate: '98.4%',
  totalProtectedAccounts: 126,
  unprotectedAccounts: 2,
  methodShare: [
    { method: 'Google Authenticator (TOTP)', percentage: 64, color: 'bg-blue-600' },
    { method: 'Microsoft Authenticator', percentage: 28, color: 'bg-indigo-600' },
    { method: 'Hardware Security Key (FIDO2/YubiKey)', percentage: 8, color: 'bg-emerald-600' }
  ],
  campusMfaCompliance: [
    { campus: 'Alpha Institute of Science & Tech', compliance: '100%', mfaActive: 38, pending: 0, status: '100% Enforced' },
    { campus: 'Delta Coding Academy & AI Scholars', compliance: '100%', mfaActive: 18, pending: 0, status: '100% Enforced' },
    { campus: 'Beta Commerce Academy (CA)', compliance: '98.0%', mfaActive: 24, pending: 1, status: 'Policy Met' },
    { campus: 'Apex Medical Prep', compliance: '97.2%', mfaActive: 28, pending: 1, status: 'Policy Met' },
    { campus: 'Zenith Humanities & Law', compliance: '95.0%', mfaActive: 18, pending: 0, status: 'Policy Met' },
  ]
};

export const ROLE_DEFINITIONS_LIST = [
  { key: 'superAdmin', name: 'Super Admin', color: 'indigo', badge: 'Tier-1 Root' },
  { key: 'centerDirector', name: 'Center Director', color: 'blue', badge: 'Tier-2 Branch' },
  { key: 'seniorFaculty', name: 'Senior Faculty / HOD', color: 'emerald', badge: 'Tier-3 Academic' },
  { key: 'financeCashier', name: 'Finance / Cashier', color: 'amber', badge: 'Tier-4 Ledger' },
  { key: 'counselor', name: 'Counselor / Telecaller', color: 'purple', badge: 'Tier-5 CRM Desk' },
  { key: 'inventoryKeeper', name: 'Inventory Keeper', color: 'cyan', badge: 'Tier-6 Logistics' }
];

export const CATEGORY_ACCESS_RULES = [
  {
    id: 'cat_institutes',
    moduleNumber: '01',
    categoryName: 'Institutes & Multi-Branch',
    icon: '🏛️',
    domain: 'Administration',
    scopeBoundary: 'Global Enterprise HQ',
    description: 'Branch provisioning, campus metadata, infrastructure geo-tagging, and global quota limits.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: false, edit: false, delete: false, export: true, approve: false, level: 'READ ONLY' },
      seniorFaculty: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_admissions',
    moduleNumber: '02',
    categoryName: 'Student Admissions & KYC',
    icon: '🎓',
    domain: 'Admissions & Records',
    scopeBoundary: 'Assigned Campus Center',
    description: 'Enrolling students, KYC document verification, guardian profile dossiers, and batch linking.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: true, edit: true, delete: false, export: true, approve: true, level: 'BRANCH CRUD' },
      seniorFaculty: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'READ ONLY' },
      financeCashier: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'FEE STATUS ONLY' },
      counselor: { view: true, create: true, edit: true, delete: false, export: false, approve: false, level: 'LEADS ENTRY' },
      inventoryKeeper: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'KIT DISPATCH' }
    }
  },
  {
    id: 'cat_batches',
    moduleNumber: '03',
    categoryName: 'Batches & Curriculum Timetable',
    icon: '📅',
    domain: 'Academics',
    scopeBoundary: 'Academic Department',
    description: 'Classroom scheduling, faculty timetables, batch slotting, and academic syllabus pacing.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: true, edit: true, delete: false, export: true, approve: true, level: 'BRANCH CRUD' },
      seniorFaculty: { view: true, create: false, edit: true, delete: false, export: true, approve: false, level: 'SYLLABUS UPDATE' },
      financeCashier: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'READ ONLY' },
      counselor: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'BATCH SCHEDULE' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_attendance',
    moduleNumber: '04',
    categoryName: 'Facial Attendance & Biometrics',
    icon: '📸',
    domain: 'Operations & Security',
    scopeBoundary: 'Campus Turnstiles & Gates',
    description: 'Real-time facial check-ins, automated SMS alerts to parents, and latecomer anomaly logs.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: false, edit: true, delete: false, export: true, approve: true, level: 'OVERRIDE GATE' },
      seniorFaculty: { view: true, create: true, edit: false, delete: false, export: false, approve: false, level: 'CLASS CHECK-IN' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'ATTENDANCE VIEW' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_fee_ledger',
    moduleNumber: '05',
    categoryName: 'Fee Ledger & Cash Reconcile',
    icon: '💰',
    domain: 'Finance & Accounts',
    scopeBoundary: 'Cash Counter Drawer',
    description: 'Tuition installments, UPI/card reconciliation, late payment fine waivers, and daily cash drawer balance.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: false, edit: false, delete: false, export: true, approve: true, level: 'VIEW & APPROVE' },
      seniorFaculty: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      financeCashier: { view: true, create: true, edit: true, delete: false, export: true, approve: false, level: 'RECEIPT & DRAWER' },
      counselor: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'FEE STATUS VIEW' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_gst_invoicing',
    moduleNumber: '06',
    categoryName: 'GST Tax Invoicing & Refunds',
    icon: '🧾',
    domain: 'Finance & Accounts',
    scopeBoundary: 'Global Enterprise HQ',
    description: 'Official HSN/SAC code GST tax invoices, credit notes, cancellation audits, and refund vouchers.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: false, edit: false, delete: false, export: true, approve: false, level: 'ENDORSE ONLY' },
      seniorFaculty: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      financeCashier: { view: true, create: true, edit: false, delete: false, export: true, approve: false, level: 'PRINT INVOICE' },
      counselor: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_homework_exam',
    moduleNumber: '07',
    categoryName: 'Homework & Exam Engine',
    icon: '📝',
    domain: 'Academics',
    scopeBoundary: 'Academic Faculty Desk',
    description: 'Weekly tests, objective OMR question paper generation, grading scorecards, and ranking percentiles.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: true, edit: true, delete: false, export: true, approve: true, level: 'BRANCH CRUD' },
      seniorFaculty: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'CREATE & GRADE' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'SCORE VIEW' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_payroll',
    moduleNumber: '08',
    categoryName: 'Staff Payroll & Salary Ledger',
    icon: '👥',
    domain: 'Human Resources',
    scopeBoundary: 'Global Enterprise HQ',
    description: 'Faculty hourly pay, PF/ESI deductions, timesheet verification, monthly payslip dispatches.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: false, edit: false, delete: false, export: false, approve: true, level: 'TIMESHEET VERIFY' },
      seniorFaculty: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_inventory',
    moduleNumber: '09',
    categoryName: 'Inventory & Student Kits',
    icon: '📦',
    domain: 'Operations & Logistics',
    scopeBoundary: 'Warehouse Depot',
    description: 'Textbooks, uniform distribution, stationery stock thresholds, barcode tracking, and supplier POs.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: false, edit: false, delete: false, export: true, approve: true, level: 'STOCK OVERSIGHT' },
      seniorFaculty: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'REQUEST MATERIAL' },
      financeCashier: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'RECEIPT AUDIT' },
      counselor: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      inventoryKeeper: { view: true, create: true, edit: true, delete: true, export: true, approve: false, level: 'DEPOT MANAGER' }
    }
  },
  {
    id: 'cat_system_audit',
    moduleNumber: '10',
    categoryName: 'System Audit & Root Security',
    icon: '🛡️',
    domain: 'Security & Governance',
    scopeBoundary: 'Root Vault Only',
    description: 'PostgreSQL immutable audit trail, unauthorized IP breaches, rate limiting, and raw database snapshots.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: false, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      seniorFaculty: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_help_support',
    moduleNumber: '11',
    categoryName: 'Help & Support Live Desk',
    icon: '🎧',
    domain: 'Operations & Support',
    scopeBoundary: 'Support Triage Desk',
    description: 'Parent ticket escalation, SLA breach countdowns, dispute mediation, and resolution CSAT ratings.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: true, edit: true, delete: false, export: true, approve: true, level: 'BRANCH ESCALATIONS' },
      seniorFaculty: { view: true, create: true, edit: true, delete: false, export: false, approve: false, level: 'ACADEMIC TICKETS' },
      financeCashier: { view: true, create: false, edit: true, delete: false, export: false, approve: false, level: 'FEE DISPUTES' },
      counselor: { view: true, create: true, edit: true, delete: false, export: false, approve: false, level: 'PARENT QUERIES' },
      inventoryKeeper: { view: true, create: false, edit: true, delete: false, export: false, approve: false, level: 'DISPATCH QUERIES' }
    }
  },
  {
    id: 'cat_job_applicants',
    moduleNumber: '12',
    categoryName: 'Job Applicants & Hiring',
    icon: '💼',
    domain: 'Human Resources',
    scopeBoundary: 'Talent Acquisition Desk',
    description: 'Faculty applicant pipeline, demo lecture evaluation scoring rubrics, offer letters, and onboarding.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: true, edit: true, delete: false, export: true, approve: true, level: 'BRANCH HIRING' },
      seniorFaculty: { view: true, create: false, edit: true, delete: false, export: false, approve: true, level: 'DEMO EVALUATOR' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_live_classes',
    moduleNumber: '13',
    categoryName: 'Live Classes & WebRTC',
    icon: '🎥',
    domain: 'Academics & Streaming',
    scopeBoundary: 'Virtual Classroom CDN',
    description: 'Low-latency WebRTC streams, student live presence telemetry, and cloud recordings archival.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: false, edit: false, delete: false, export: true, approve: false, level: 'STREAM MONITOR' },
      seniorFaculty: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'HOST BROADCAST' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'ATTENDANCE VIEW' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_roles_permissions',
    moduleNumber: '14',
    categoryName: 'Roles & Permission Control',
    icon: '🔐',
    domain: 'Security & Governance',
    scopeBoundary: 'Root Vault & RBAC Matrix',
    description: 'Zero Trust policy enforcement, privilege elevation requests, MFA device provisioning, and staff account lockouts.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: false, edit: false, delete: false, export: true, approve: false, level: 'READ ONLY' },
      seniorFaculty: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_admission_queries',
    moduleNumber: '15',
    categoryName: 'Admission Queries & CRM',
    icon: '📞',
    domain: 'Admissions & CRM',
    scopeBoundary: 'Reception & Telecall Desk',
    description: 'Inbound lead funnels, walk-in inquiries reception desk, callback scheduling, and conversion analytics.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: true, edit: true, delete: false, export: true, approve: true, level: 'BRANCH CRUD' },
      seniorFaculty: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'ACADEMIC COUNSEL' },
      financeCashier: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'TOKEN FEE STATUS' },
      counselor: { view: true, create: true, edit: true, delete: true, export: true, approve: false, level: 'FULL CRM DESK' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  },
  {
    id: 'cat_subjects_teachers',
    moduleNumber: '16',
    categoryName: 'Subjects & Faculty Allocation',
    icon: '📖',
    domain: 'Academics',
    scopeBoundary: 'Academic Dean Office',
    description: 'Course syllabus structures, subject-to-teacher matrix allocation, workload curves, and student rating analytics.',
    roles: {
      superAdmin: { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' },
      centerDirector: { view: true, create: true, edit: true, delete: false, export: true, approve: true, level: 'BRANCH CRUD' },
      seniorFaculty: { view: true, create: false, edit: true, delete: false, export: true, approve: true, level: 'HOD ALLOCATION' },
      financeCashier: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' },
      counselor: { view: true, create: false, edit: false, delete: false, export: false, approve: false, level: 'SUBJECT VIEW' },
      inventoryKeeper: { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' }
    }
  }
];

