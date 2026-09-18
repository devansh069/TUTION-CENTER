// ============================================================================
// ADMISSION QUERIES & CRM LEADS DATA STORE (Module 15)
// Multi-tenant realistic data for Student Inquiries, Leads & Walk-ins
// ============================================================================

export const MOCK_INQUIRIES = [
  {
    id: 'INQ-9401',
    studentName: 'Rohan Deshmukh',
    studentGrade: 'Class 12 Passed (Target JEE 2027)',
    phone: '+91 98201 44891',
    parentName: 'Pradeep Deshmukh',
    parentPhone: '+91 98201 44890',
    parentEmail: 'pradeep.deshmukh@infraeng.com',
    parentOccupation: 'Senior Civil Engineer',
    course: 'IIT-JEE Advanced Dropper Batch',
    source: 'Google Search Ads',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    stage: '2. Phone Academic Profiling',
    status: 'Counseling Scheduled',
    counselor: 'Pooja Nair (Senior Academic Counselor)',
    createdDate: 'Today, 10:15 AM',
    priority: 'High',
    previousMarks: 'Class 12: 92.4% PCM',
    diagnosticTestScore: '84% (Tier-2 Waiver 15%)',
    proposedFee: '$6,800 / yr',
    tokenAdvancePaid: '$800',
    notes: 'Student scored 96.2%ile in JEE Main previously. Specifically looking for Advanced Problem-Solving Cohort under Dr. Vivek Sengupta.',
    callHistory: [
      { date: 'Today, 10:20 AM', counselor: 'Pooja Nair', summary: 'Introductory counseling call completed. Parent agreed to visit campus for scholarship test tomorrow.' }
    ]
  },
  {
    id: 'INQ-9402',
    studentName: 'Ananya Singhal',
    studentGrade: 'Class 11 Entering (2-Yr Medical)',
    phone: '+91 98112 55902',
    parentName: 'Dr. Alok Singhal',
    parentPhone: '+91 98112 55900',
    parentEmail: 'dr.alok.singhal@apollo.org',
    parentOccupation: 'Cardiologist',
    course: 'NEET Super-60 Medical Foundation',
    source: 'School Seminar',
    instituteCode: 'apex',
    instituteName: 'Apex Medical & Pre-Engineering Prep',
    stage: '3. Diagnostic Scholarship Test & Demo',
    status: 'Demo Lecture Taken',
    counselor: 'Vikram Joshi (Head of Admissions)',
    createdDate: 'Today, 11:30 AM',
    priority: 'High',
    previousMarks: 'Class 10 ICSE: 97.6%',
    diagnosticTestScore: '94% (Merit Scholarship 25%)',
    proposedFee: '$7,200 / yr',
    tokenAdvancePaid: '$1,000',
    notes: 'Parent attended seminar at DPS. Highly enthusiastic about anatomy labs and bio smartboard lectures.',
    callHistory: [
      { date: 'Yesterday, 04:00 PM', counselor: 'Vikram Joshi', summary: 'Attended sample demo lecture with Dr. Emily Vance. Scored 94% on biology diagnostic.' }
    ]
  },
  {
    id: 'INQ-9403',
    studentName: 'Kabir Sengupta',
    studentGrade: 'Class 10 (NTSE & Board Prep)',
    phone: '+91 98303 66103',
    parentName: 'Dr. Vivek Sengupta',
    parentPhone: '+91 98303 66100',
    parentEmail: 'v.sengupta@academicmail.com',
    parentOccupation: 'University Professor',
    course: 'Foundation K-10 Olympiad Batch',
    source: 'Parent Referral',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    stage: '5. Seat Token Paid & Enrolled',
    status: 'Token Advance Paid',
    counselor: 'Pooja Nair',
    createdDate: 'Today, 12:45 PM',
    priority: 'Immediate',
    previousMarks: 'Class 9: 95.0%',
    diagnosticTestScore: '96% (30% Academic Grant)',
    proposedFee: '$4,500 / yr',
    tokenAdvancePaid: '$1,200',
    notes: 'Token advance received via UPI counter. Kit and book sets assigned. Ready for batch orientation.',
    callHistory: [
      { date: 'Today, 12:45 PM', counselor: 'Pooja Nair', summary: 'Seat reserved in Saturday morning batch. Student dossier transferred to Master Directory.' }
    ]
  },
  {
    id: 'INQ-9404',
    studentName: 'Diya Murthy',
    studentGrade: 'Class 12 (CBSE + JEE)',
    phone: '+91 98404 77204',
    parentName: 'Krishna Murthy',
    parentPhone: '+91 98404 77200',
    parentEmail: 'k.murthy@cloudtech.com',
    parentOccupation: 'Software Architect',
    course: 'CBSE + JEE 2-Yr Integrated',
    source: 'Instagram Ad Campaign',
    instituteCode: 'delta',
    instituteName: 'Delta Coding Academy & AI Scholars',
    stage: '2. Phone Academic Profiling',
    status: 'Follow-up Call 2',
    counselor: 'Meera Rao (Counselor)',
    createdDate: 'Yesterday, 03:20 PM',
    priority: 'Medium',
    previousMarks: 'Class 11: 89.2%',
    diagnosticTestScore: '78%',
    proposedFee: '$5,900 / yr',
    tokenAdvancePaid: '$0',
    notes: 'Parent requested weekend doubt classes due to school regular hours. Follow up call scheduled today at 4 PM.',
    callHistory: [
      { date: 'Yesterday, 03:30 PM', counselor: 'Meera Rao', summary: 'Explained hybrid lecture recordings and weekend test series.' }
    ]
  },
  {
    id: 'INQ-9405',
    studentName: 'Aarav Choudhary',
    studentGrade: 'Class 11 (CA Foundation Track)',
    phone: '+91 98705 88305',
    parentName: 'Mukesh Choudhary',
    parentPhone: '+91 98705 88300',
    parentEmail: 'mukesh@choudharycpa.com',
    parentOccupation: 'Practicing Chartered Accountant',
    course: 'CA Foundation & Mercantile Law',
    source: 'Direct Website Inquiry',
    instituteCode: 'beta',
    instituteName: 'Beta Commerce Academy & CA Foundation',
    stage: '4. Fee Offer Letter Issued',
    status: 'Scholarship Offer Sent',
    counselor: 'Catherine Miller, FCA',
    createdDate: 'Yesterday, 11:00 AM',
    priority: 'High',
    previousMarks: 'Class 10 CBSE: 94.8%',
    diagnosticTestScore: '90%',
    proposedFee: '$5,200 / yr',
    tokenAdvancePaid: '$0',
    notes: 'Father is an alumnus. Fee offer letter issued with 10% alumni family benefit. Expecting token deposit by Friday.',
    callHistory: [
      { date: 'Yesterday, 02:15 PM', counselor: 'Catherine Miller, FCA', summary: 'Detailed curriculum discussion regarding corporate law modules.' }
    ]
  },
  {
    id: 'INQ-9406',
    studentName: 'Ishita Jain',
    studentGrade: 'Class 12 (Target AIIMS NEET)',
    phone: '+91 98606 99406',
    parentName: 'Sadhna Jain',
    parentPhone: '+91 98606 99400',
    parentEmail: 'sadhna.jain@medlabs.in',
    parentOccupation: 'Pathologist',
    course: 'NEET Super-60 Medical Foundation',
    source: 'Parent Referral',
    instituteCode: 'apex',
    instituteName: 'Apex Medical & Pre-Engineering Prep',
    stage: '1. Inbound Inquiries',
    status: 'Fresh Lead',
    counselor: 'Meera Rao',
    createdDate: 'Today, 09:00 AM',
    priority: 'Immediate',
    previousMarks: 'Class 11: 91.0%',
    diagnosticTestScore: 'Pending Test',
    proposedFee: '$7,200 / yr',
    tokenAdvancePaid: '$0',
    notes: 'Direct referral from Dr. Rajesh Sharma. Inbound call received this morning.',
    callHistory: []
  },
  {
    id: 'INQ-9407',
    studentName: 'Zoya Khan',
    studentGrade: 'Class 12 Passed (CLAT Aspirant)',
    phone: '+91 98907 11507',
    parentName: 'Farhan Khan',
    parentPhone: '+91 98907 11500',
    parentEmail: 'farhan.khan@legaladvocates.com',
    parentOccupation: 'High Court Senior Counsel',
    course: 'CLAT 1-Year Crash & Legal Aptitude',
    source: 'Newspaper Frontpage Ad',
    instituteCode: 'zenith',
    instituteName: 'Zenith Humanities & Law Foundation',
    stage: '3. Diagnostic Scholarship Test & Demo',
    status: 'Scholarship Test Cleared',
    counselor: 'Adv. Meenakshi Sundaram',
    createdDate: 'Yesterday, 01:15 PM',
    priority: 'High',
    previousMarks: 'Class 12: 96.0% Humanities',
    diagnosticTestScore: '92% (20% Merit Waiver)',
    proposedFee: '$6,400 / yr',
    tokenAdvancePaid: '$500',
    notes: 'Scored 92% in legal reasoning test. Attending physical counseling in center today at 2 PM.',
    callHistory: [
      { date: 'Yesterday, 04:30 PM', counselor: 'Meenakshi Sundaram', summary: 'Discussed moot court training and national law school mock tests.' }
    ]
  }
];

// Physical Walk-in Reception Queue
export const WALKIN_VISITORS = [
  {
    token: 'WLK-108',
    student: 'Rohan Deshmukh',
    parent: 'Pradeep Deshmukh (Father)',
    phone: '+91 98201 44891',
    course: 'IIT-JEE 2027 Dropper Batch',
    center: 'Alpha Institute of Science & Tech',
    instituteCode: 'alpha',
    time: '10:15 AM',
    waitTime: '12 Mins',
    status: 'With Director in Cabin 2',
    counselor: 'Pooja Nair',
    testRoom: 'Cabin 2 (Director Round)',
    visitorBadge: 'VIS-901'
  },
  {
    token: 'WLK-109',
    student: 'Ishita Jain',
    parent: 'Sadhna Jain (Mother)',
    phone: '+91 98606 99406',
    course: 'NEET Super-60 Medical',
    center: 'Apex Medical Prep',
    instituteCode: 'apex',
    time: '11:00 AM',
    waitTime: '5 Mins',
    status: 'Writing Scholarship Test',
    counselor: 'Vikram Joshi',
    testRoom: 'Room 102 (Test Lab)',
    visitorBadge: 'VIS-902'
  },
  {
    token: 'WLK-110',
    student: 'Tanmay Bhatia',
    parent: 'Sanjay Bhatia (Father)',
    phone: '+91 98110 22334',
    course: 'Class 10 NTSE Foundation',
    center: 'Apex Medical Prep',
    instituteCode: 'apex',
    time: '11:45 AM',
    waitTime: '18 Mins',
    status: 'Waiting in Reception Lounge',
    counselor: 'Meera Rao',
    testRoom: 'Lounge Sofa 3',
    visitorBadge: 'VIS-903'
  },
  {
    token: 'WLK-111',
    student: 'Zoya Khan',
    parent: 'Farhan Khan (Father)',
    phone: '+91 98907 11507',
    course: 'CLAT UG Legal Aptitude',
    center: 'Zenith Humanities & Law',
    instituteCode: 'zenith',
    time: '12:20 PM',
    waitTime: '8 Mins',
    status: 'Fee Negotiation Stage',
    counselor: 'Meenakshi Sundaram',
    testRoom: 'Counseling Desk 4',
    visitorBadge: 'VIS-904'
  },
  {
    token: 'WLK-112',
    student: 'Aarav Choudhary',
    parent: 'Mukesh Choudhary (Father)',
    phone: '+91 98705 88305',
    course: 'CA Foundation & Mercantile Law',
    center: 'Beta Commerce Academy',
    instituteCode: 'beta',
    time: '12:50 PM',
    waitTime: '3 Mins',
    status: 'Token Advance Payment Counter',
    counselor: 'Catherine Miller, FCA',
    testRoom: 'Cash Counter Desk 1',
    visitorBadge: 'VIS-905'
  }
];

// Conversion & Channel Performance Metrics
export const CHANNEL_METRICS_DATA = [
  {
    channel: 'Parent Word-of-Mouth Referrals',
    leadsReceived: 310,
    walkins: 245,
    enrolled: 119,
    conversionRate: '38.4%',
    costPerLead: '₹140',
    costPerAdmission: '₹365',
    revenueBooked: '₹92.4 Lakhs',
    badge: 'Highest Conversion Yield'
  },
  {
    channel: 'School Outreach & Seminars',
    leadsReceived: 480,
    walkins: 185,
    enrolled: 98,
    conversionRate: '20.4%',
    costPerLead: '₹420',
    costPerAdmission: '₹2,058',
    revenueBooked: '₹76.0 Lakhs',
    badge: 'High Bulk Volume'
  },
  {
    channel: 'Google Search & Maps Ads',
    leadsReceived: 390,
    walkins: 128,
    enrolled: 56,
    conversionRate: '14.4%',
    costPerLead: '₹850',
    costPerAdmission: '₹5,910',
    revenueBooked: '₹43.5 Lakhs',
    badge: 'High Intent Search'
  },
  {
    channel: 'Branch Direct Walk-ins',
    leadsReceived: 180,
    walkins: 180,
    enrolled: 62,
    conversionRate: '34.4%',
    costPerLead: '₹0',
    costPerAdmission: '₹0',
    revenueBooked: '₹48.2 Lakhs',
    badge: 'Pure Organic Footfall'
  },
  {
    channel: 'Instagram & Meta Social Ads',
    leadsReceived: 122,
    walkins: 42,
    enrolled: 15,
    conversionRate: '12.3%',
    costPerLead: '₹620',
    costPerAdmission: '₹5,040',
    revenueBooked: '₹11.6 Lakhs',
    badge: 'Youth Engagement'
  }
];

// Inflow Trajectory & Trend Data
export const LEAD_INFLOW_TRENDS_DATA = {
  monthlyTrajectory: [
    { month: 'Apr', leads: 680, walkins: 310, enrollments: 142 },
    { month: 'May', leads: 920, walkins: 460, enrollments: 218 },
    { month: 'Jun', leads: 1482, walkins: 632, enrollments: 318, peak: true },
    { month: 'Jul', leads: 1210, walkins: 540, enrollments: 275 },
    { month: 'Aug', leads: 890, walkins: 380, enrollments: 184 },
    { month: 'Sep', leads: 1040, walkins: 490, enrollments: 236 },
  ],
  dayOfWeekPattern: [
    { day: 'Mon', volume: 110 },
    { day: 'Tue', volume: 135 },
    { day: 'Wed', volume: 142 },
    { day: 'Thu', volume: 128 },
    { day: 'Fri', volume: 165 },
    { day: 'Sat', volume: 290, peak: true },
    { day: 'Sun', volume: 380, peak: true },
  ],
  campusDemandComparison: [
    { campus: 'Alpha Institute of Science & Tech', totalInquiries: 512, walkinRate: '46.2%', enrolled: 124, revenue: '₹96.2L', status: 'Highest Demand' },
    { campus: 'Apex Medical Prep', totalInquiries: 384, walkinRate: '44.8%', enrolled: 88, revenue: '₹68.4L', status: 'High Yield' },
    { campus: 'Beta Commerce Academy (CA)', totalInquiries: 248, walkinRate: '38.5%', enrolled: 48, revenue: '₹37.2L', status: 'Stable' },
    { campus: 'Delta Coding Academy (AI)', totalInquiries: 186, walkinRate: '35.0%', enrolled: 34, revenue: '₹26.4L', status: 'Growing' },
    { campus: 'Zenith Humanities & Law', totalInquiries: 152, walkinRate: '39.2%', enrolled: 24, revenue: '₹18.6L', status: 'Optimal' },
  ]
};
