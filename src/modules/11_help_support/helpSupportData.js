// ============================================================================
// HELP & SUPPORT DATA STORE (Module 11)
// Multi-tenant realistic ticketing & helpdesk telemetry for Coaching Centers
// ============================================================================

export const MOCK_TICKETS = [
  {
    id: 'TKT-9101',
    ticketNo: 'HD-2026-091',
    title: 'Parent requests GST Tax invoice with corporate sponsor entity name',
    studentName: 'Aarav Sharma',
    studentRoll: 'ALPH-2026-081',
    parentName: 'Dr. Rajesh Sharma',
    parentPhone: '+1 (555) 234-8901',
    parentEmail: 'rajesh.sharma@corporate.com',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    category: 'Billing & Accounts',
    priority: 'High',
    status: 'In Progress',
    slaHoursTotal: 4,
    slaTimeLeft: '45 mins remaining',
    slaElapsedPct: 82,
    escalationLevel: 'Level 2 (At Risk)',
    assignedAgent: 'Pooja Nair (Branch Accountant)',
    createdTime: 'Today, 09:15 AM',
    description: 'Parent paid annual IIT-JEE tuition fees ($7,800) via portal. Needs the company GSTIN and corporate legal address amended on the digital invoice for enterprise corporate reimbursement before Friday.',
    thread: [
      { sender: 'Dr. Rajesh Sharma', role: 'Parent', time: '09:15 AM', message: 'Hello, I paid the second installment today. Could you please re-issue the GST invoice with my employer legal entity name and GSTIN for our education allowance claim?' },
      { sender: 'Pooja Nair', role: 'Support Agent', time: '09:40 AM', message: 'Good morning Dr. Sharma. I have received the corporate entity details and am regenerating the B2B tax invoice from the GST compliance ledger now.' }
    ],
    csatRating: 5.0
  },
  {
    id: 'TKT-9102',
    ticketNo: 'HD-2026-092',
    title: 'Facial recognition turnstile fails to recognize student at Gate A portal',
    studentName: 'Rohan Verma',
    studentRoll: 'ALPH-2026-094',
    parentName: 'Mr. Sunil Verma',
    parentPhone: '+1 (555) 345-6789',
    parentEmail: 'sunil.verma@techmail.com',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    category: 'Biometric Hardware',
    priority: 'Critical',
    status: 'Open',
    slaHoursTotal: 2,
    slaTimeLeft: '22 mins remaining',
    slaElapsedPct: 88,
    escalationLevel: 'Level 2 (Critical)',
    assignedAgent: 'Vikram Joshi (Hardware Lead)',
    createdTime: 'Today, 08:30 AM',
    description: 'Student recently updated spectacles. Biometric turnstile camera at Gate A Turnstile #1 reported anti-spoofing confidence drop to 78% and failed to unlock gate. Re-capture of high-res facial vector requested.',
    thread: [
      { sender: 'Security Guard Booth', role: 'Gate Staff', time: '08:30 AM', message: 'Student Rohan Verma (Roll #ALPH-2026-094) manual override pass issued at Gate A. Face match failed twice. Needs re-enrollment.' }
    ],
    csatRating: null
  },
  {
    id: 'TKT-9103',
    ticketNo: 'HD-2026-093',
    title: 'Live WebRTC hybrid lecture video stream stuttering on student tablet',
    studentName: 'Emily Watson',
    studentRoll: 'BETA-2026-042',
    parentName: 'Mrs. Claire Watson',
    parentPhone: '+44 20 7946 0912',
    parentEmail: 'claire.watson@londonmail.co.uk',
    instituteCode: 'beta',
    instituteName: 'Beta Commerce Academy & CA Foundation',
    category: 'Mobile App & WebRTC',
    priority: 'Medium',
    status: 'In Progress',
    slaHoursTotal: 6,
    slaTimeLeft: '3h 15m remaining',
    slaElapsedPct: 45,
    escalationLevel: 'Standard',
    assignedAgent: 'Karan Mehta (Streaming Engineer)',
    createdTime: 'Today, 10:00 AM',
    description: 'During the live CA Inter Corporate Law broadcast, student experienced packet loss and audio buffering on the mobile app. CDN edge server node investigation required.',
    thread: [
      { sender: 'Emily Watson', role: 'Student', time: '10:00 AM', message: 'The live class for Corporate Restructuring kept stuttering around 10:15 AM even though my home Wi-Fi is 150 Mbps.' },
      { sender: 'Karan Mehta', role: 'IT Support', time: '10:25 AM', message: 'We routed your app session to the London Primary CDN Edge Node. Please force-close and re-open the live stream.' }
    ],
    csatRating: 4.8
  },
  {
    id: 'TKT-9104',
    ticketNo: 'HD-2026-094',
    title: 'Parent requests reschedule of faculty PTM meeting slot to weekend',
    studentName: 'Ananya Deshmukh',
    studentRoll: 'APEX-2026-018',
    parentName: 'Sanjay Deshmukh',
    parentPhone: '+1 (555) 789-0123',
    parentEmail: 'sanjay.deshmukh@medcorp.com',
    instituteCode: 'apex',
    instituteName: 'Apex Medical & Pre-Engineering Prep',
    category: 'PTM & Counseling',
    priority: 'Low',
    status: 'Open',
    slaHoursTotal: 12,
    slaTimeLeft: '9h 40m remaining',
    slaElapsedPct: 20,
    escalationLevel: 'Standard',
    assignedAgent: 'Meera Rao (Academic Counselor)',
    createdTime: 'Today, 08:45 AM',
    description: 'Parent has official surgery duty on Friday afternoon during the assigned PTM slot. Requesting rescheduling to Saturday 11:30 AM with Dr. Emily Vance (Botany HOD).',
    thread: [
      { sender: 'Sanjay Deshmukh', role: 'Parent', time: '08:45 AM', message: 'Good morning, I have scheduled hospital duty on Friday at 2:00 PM. Could our PTM slot be shifted to Saturday morning?' }
    ],
    csatRating: null
  },
  {
    id: 'TKT-9105',
    ticketNo: 'HD-2026-095',
    title: 'Missing NEET Chemistry Module Vol-3 study material book from starter kit',
    studentName: 'Kabir Sengupta',
    studentRoll: 'APEX-2026-033',
    parentName: 'Dr. Vivek Sengupta',
    parentPhone: '+1 (555) 392-1084',
    parentEmail: 'v.sengupta@academicmail.com',
    instituteCode: 'apex',
    instituteName: 'Apex Medical & Pre-Engineering Prep',
    category: 'Books & Inventory',
    priority: 'Medium',
    status: 'Resolved',
    slaHoursTotal: 8,
    slaTimeLeft: 'Resolved in 1.2h',
    slaElapsedPct: 100,
    escalationLevel: 'Standard',
    assignedAgent: 'Rajesh Tiwari (Inventory Keeper)',
    createdTime: 'Yesterday, 02:30 PM',
    description: 'Starter kit received at campus reception contained Volumes 1, 2, and 4, but Volume 3 (Organic Chemistry NEET Target) was missing from the box. Handed over from branch reserve depot.',
    thread: [
      { sender: 'Kabir Sengupta', role: 'Student', time: '02:30 PM', message: 'Hello, my kit only had 3 books. Volume 3 is missing.' },
      { sender: 'Rajesh Tiwari', role: 'Inventory Keeper', time: '03:15 PM', message: 'Apologies Kabir. Volume 3 has been handed over at the counter and barcode scanned into your student master record.' }
    ],
    csatRating: 5.0
  },
  {
    id: 'TKT-9106',
    ticketNo: 'HD-2026-096',
    title: 'Merit scholarship 20% discount not deducted on 2nd fee installment',
    studentName: 'Liam Davies',
    studentRoll: 'BETA-2026-059',
    parentName: 'Sarah Davies',
    parentPhone: '+44 20 7946 0419',
    parentEmail: 'sarah.davies@lawfirm.co.uk',
    instituteCode: 'beta',
    instituteName: 'Beta Commerce Academy & CA Foundation',
    category: 'Billing & Accounts',
    priority: 'High',
    status: 'In Progress',
    slaHoursTotal: 4,
    slaTimeLeft: '1h 10m remaining',
    slaElapsedPct: 70,
    escalationLevel: 'Level 1 (At Risk)',
    assignedAgent: 'Catherine Miller, FCA (Center Director)',
    createdTime: 'Today, 10:30 AM',
    description: 'Student qualified for 20% Olympiad merit waiver. Portal auto-generated invoice shows standard rate without scholarship deduction. Needs approval stepper reversal.',
    thread: [
      { sender: 'Sarah Davies', role: 'Parent', time: '10:30 AM', message: 'Hi, our offer letter states Liam receives a 20% merit discount. The portal is requesting the full £2,400 instead of £1,920.' }
    ],
    csatRating: null
  },
  {
    id: 'TKT-9107',
    ticketNo: 'HD-2026-097',
    title: 'Student unable to access recorded video lecture CDN archives from home',
    studentName: 'Diya Murthy',
    studentRoll: 'DELT-2026-012',
    parentName: 'Krishna Murthy',
    parentPhone: '+1 (555) 612-4098',
    parentEmail: 'k.murthy@cloudtech.com',
    instituteCode: 'delta',
    instituteName: 'Delta Coding Academy & AI Scholars',
    category: 'Mobile App & WebRTC',
    priority: 'Low',
    status: 'Resolved',
    slaHoursTotal: 6,
    slaTimeLeft: 'Resolved in 45m',
    slaElapsedPct: 100,
    escalationLevel: 'Standard',
    assignedAgent: 'Karan Mehta (Streaming Engineer)',
    createdTime: 'Yesterday, 04:15 PM',
    description: 'Authentication token expired on student mobile app session. App forced cache reset resolved video playback permissions.',
    thread: [
      { sender: 'Diya Murthy', role: 'Student', time: '04:15 PM', message: 'Videos say Access Denied 403 when I try to replay the Tree Algorithms lecture.' },
      { sender: 'Karan Mehta', role: 'IT Support', time: '04:55 PM', message: 'Token re-issued. Please tap Settings -> Refresh Cache in your student portal.' }
    ],
    csatRating: 5.0
  },
  {
    id: 'TKT-9108',
    ticketNo: 'HD-2026-098',
    title: 'Urgent 1-on-1 faculty doubt clarification request for Calculus mock exam',
    studentName: 'Rohan Deshmukh',
    studentRoll: 'ZENI-2026-004',
    parentName: 'Meenakshi Deshmukh',
    parentPhone: '+1 (555) 438-7712',
    parentEmail: 'meenakshi@lawfoundation.org',
    instituteCode: 'zenith',
    instituteName: 'Zenith Humanities & Law Foundation',
    category: 'Academic & Faculty',
    priority: 'Medium',
    status: 'Open',
    slaHoursTotal: 8,
    slaTimeLeft: '4h 30m remaining',
    slaElapsedPct: 44,
    escalationLevel: 'Standard',
    assignedAgent: 'Dr. Vivek Sengupta (Physics Lead)',
    createdTime: 'Today, 07:30 AM',
    description: 'Student requests 20-minute physical desk consultation with Mathematics teacher to review mistakes in Section B of the mock entrance test.',
    thread: [
      { sender: 'Rohan Deshmukh', role: 'Student', time: '07:30 AM', message: 'Sir, I lost 12 marks in the definite integral section. Could I meet the mathematics faculty today during doubt hours?' }
    ],
    csatRating: null
  }
];

// Ticket Category breakdown
export const CATEGORY_DISTRIBUTION_DATA = [
  { category: 'Billing & Fee Receipts', count: 48, percentage: 34, color: 'bg-emerald-500', avgResolutionHours: '1.8h' },
  { category: 'Biometric Turnstiles & Access', count: 28, percentage: 20, color: 'bg-indigo-500', avgResolutionHours: '0.8h' },
  { category: 'Mobile App & Live Video', count: 32, percentage: 23, color: 'bg-blue-500', avgResolutionHours: '1.2h' },
  { category: 'Academic Doubt Slots', count: 18, percentage: 13, color: 'bg-amber-500', avgResolutionHours: '2.5h' },
  { category: 'PTM & Parent Inquiries', count: 14, percentage: 10, color: 'bg-purple-500', avgResolutionHours: '3.2h' }
];

// SLA Performance Telemetry
export const SLA_PERFORMANCE_DATA = {
  overallCompliance: '97.6%',
  averageMTTR: '1.35 Hours',
  firstContactResolution: '86.4%',
  totalTicketsResolvedThisTerm: 384,
  slaThresholdHours: '4.0 Hours',
  campusBreakdown: [
    { campus: 'Alpha Institute of Science & Tech', compliance: '98.8%', avgResolution: '1.1 Hours', activeTickets: 14, status: 'Exemplary' },
    { campus: 'Beta Commerce Academy & CA Foundation', compliance: '96.5%', avgResolution: '1.6 Hours', activeTickets: 8, status: 'On Target' },
    { campus: 'Apex Medical & Pre-Engineering Prep', compliance: '97.2%', avgResolution: '1.4 Hours', activeTickets: 11, status: 'On Target' },
    { campus: 'Delta Coding Academy & AI Scholars', compliance: '99.1%', avgResolution: '0.9 Hours', activeTickets: 5, status: 'Exemplary' },
    { campus: 'Zenith Humanities & Law Foundation', compliance: '96.0%', avgResolution: '1.8 Hours', activeTickets: 4, status: 'Normal' },
  ],
  hourlyInflowPattern: [
    { hour: '07:00 AM', volume: 6 },
    { hour: '08:00 AM', volume: 22, peak: true },
    { hour: '09:00 AM', volume: 34, peak: true },
    { hour: '11:00 AM', volume: 18 },
    { hour: '01:00 PM', volume: 12 },
    { hour: '03:00 PM', volume: 26, peak: true },
    { hour: '05:00 PM', volume: 19 },
    { hour: '07:00 PM', volume: 8 },
  ]
};

// Customer Satisfaction (CSAT) Analytics
export const CSAT_ANALYTICS_DATA = {
  overallCSAT: 4.88,
  npsScore: '+76 Net Promoter Score',
  sentimentBreakdown: {
    delighted: '89.2%',
    satisfied: '8.4%',
    neutral: '1.8%',
    unhappy: '0.6%'
  },
  departmentRatings: [
    { department: 'Front Desk & Reception', csat: 4.92, resolvedVolume: 120, badge: 'Highest Rated' },
    { department: 'Accounts & Fee Billing Desk', csat: 4.86, resolvedVolume: 142, badge: 'Fastest Response' },
    { department: 'Academic Counseling & PTM Desk', csat: 4.89, resolvedVolume: 84, badge: 'High Empathy' },
    { department: 'IT, Mobile App & Biometrics', csat: 4.82, resolvedVolume: 98, badge: 'Technical Rigor' },
  ],
  parentFeedbackHighlights: [
    {
      parent: 'Dr. Rajesh Sharma (Parent of Aarav)',
      rating: 5.0,
      comment: 'The accounts team re-issued our corporate GST invoice within 40 minutes on WhatsApp. Outstanding efficiency for working parents.',
      date: 'Yesterday'
    },
    {
      parent: 'Mrs. Claire Watson (Parent of Emily)',
      rating: 5.0,
      comment: 'Technical IT re-routed Emily’s tablet to the London CDN node immediately during the live CA Inter lecture. No more stutter.',
      date: '2 days ago'
    },
    {
      parent: 'Sanjay Deshmukh (Parent of Ananya)',
      rating: 4.8,
      comment: 'Appreciated the prompt rescheduling of our PTM slot around hospital duty shifts. Very cooperative center administration.',
      date: '3 days ago'
    }
  ]
};
