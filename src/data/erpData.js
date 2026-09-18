// ==========================================
// MASTER MULTI-TENANT DATA STORE
// For Tuition Center Super Admin ERP
// ==========================================

export const INSTITUTES_DATA = [
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
    region: 'North America East',
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
    established: '2018',
    gstin: '27BBCDE1234K1ZL',
    cinNumber: 'U80903MH2018PTC301928',
    packageTier: 'Professional Plus',
    billingCycle: 'Annual',
    packageExpiry: 'Jan 15, 2027',
    daysRemaining: 119,
    status: 'Active',
    region: 'UK & Europe',
    metrics: {
      students: 920,
      studentCapacity: 1000,
      teachers: 32,
      supportStaff: 12,
      batches: 16,
      monthlyRevenue: 68000,
      pendingFees: 8200,
      attendanceRate: 95.8,
      storageUsedGB: 124,
      storageTotalGB: 200,
      smsQuotaUsed: 12300,
      smsQuotaTotal: 35000,
    },
    performanceChart: [
      { month: 'May', students: 780, revenue: 56000, attendance: 93 },
      { month: 'Jun', students: 810, revenue: 59000, attendance: 94 },
      { month: 'Jul', students: 860, revenue: 63000, attendance: 95 },
      { month: 'Aug', students: 890, revenue: 65000, attendance: 96 },
      { month: 'Sep', students: 905, revenue: 66500, attendance: 95 },
      { month: 'Oct', students: 920, revenue: 68000, attendance: 96 },
    ]
  },
  {
    id: 'inst-03',
    code: 'apex',
    name: 'Apex Medical & Pre-Engineering Prep',
    shortCode: 'APEX-BOS',
    tagline: 'Target NEET & Medical Olympiad Specialists',
    city: 'Boston, Massachusetts',
    address: '88 Longwood Avenue, Medical District, MA 02115',
    director: 'Dr. Alistair Sterling, MD',
    directorPhone: '+1 (617) 555-0199',
    directorEmail: 'a.sterling@apexmedical.edu',
    established: '2019',
    gstin: '07AAECU8891M1ZJ',
    cinNumber: 'U80201KA2019PTC318294',
    packageTier: 'Enterprise Max',
    billingCycle: 'Annual',
    packageExpiry: 'Mar 10, 2027',
    daysRemaining: 173,
    status: 'Active',
    region: 'North America East',
    metrics: {
      students: 1120,
      studentCapacity: 1200,
      teachers: 38,
      supportStaff: 15,
      batches: 18,
      monthlyRevenue: 82500,
      pendingFees: 14100,
      attendanceRate: 93.6,
      storageUsedGB: 146,
      storageTotalGB: 200,
      smsQuotaUsed: 15100,
      smsQuotaTotal: 40000,
    },
    performanceChart: [
      { month: 'May', students: 940, revenue: 68000, attendance: 91 },
      { month: 'Jun', students: 990, revenue: 72000, attendance: 92 },
      { month: 'Jul', students: 1040, revenue: 76000, attendance: 94 },
      { month: 'Aug', students: 1080, revenue: 79000, attendance: 93 },
      { month: 'Sep', students: 1100, revenue: 81000, attendance: 94 },
      { month: 'Oct', students: 1120, revenue: 82500, attendance: 94 },
    ]
  },
  {
    id: 'inst-04',
    code: 'delta',
    name: 'Delta Coding Academy & AI Scholars',
    shortCode: 'DLTA-SFO',
    tagline: 'Next-Gen Robotics, Coding & AI Education',
    city: 'San Francisco, California',
    address: '500 Howard Street, Silicon Center, CA 94105',
    director: 'Eng. Marcus Vance, MS CS',
    directorPhone: '+1 (415) 555-0144',
    directorEmail: 'm.vance@deltacoding.io',
    established: '2021',
    gstin: '29AACCD9921P1ZK',
    cinNumber: 'U80904MH2021PTC352918',
    packageTier: 'Growth Plan',
    billingCycle: 'Monthly',
    packageExpiry: 'Nov 30, 2026',
    daysRemaining: 73,
    status: 'Active',
    region: 'North America West',
    metrics: {
      students: 640,
      studentCapacity: 800,
      teachers: 24,
      supportStaff: 9,
      batches: 12,
      monthlyRevenue: 52000,
      pendingFees: 6400,
      attendanceRate: 96.1,
      storageUsedGB: 92,
      storageTotalGB: 150,
      smsQuotaUsed: 8900,
      smsQuotaTotal: 30000,
    },
    performanceChart: [
      { month: 'May', students: 510, revenue: 41000, attendance: 94 },
      { month: 'Jun', students: 540, revenue: 44000, attendance: 95 },
      { month: 'Jul', students: 580, revenue: 47000, attendance: 96 },
      { month: 'Aug', students: 600, revenue: 49000, attendance: 96 },
      { month: 'Sep', students: 620, revenue: 50500, attendance: 96 },
      { month: 'Oct', students: 640, revenue: 52000, attendance: 96 },
    ]
  },
  {
    id: 'inst-05',
    code: 'zenith',
    name: 'Zenith Humanities & Law Foundation',
    shortCode: 'ZNTH-TOR',
    tagline: 'Premier CLAT, Judiciary & Civics Coaching',
    city: 'Toronto, Ontario',
    address: '250 University Avenue, Law District, ON M5H 3E5',
    director: 'Barrister Elena Rostova, LL.M.',
    directorPhone: '+1 (416) 555-0188',
    directorEmail: 'e.rostova@zenithlaw.ca',
    established: '2020',
    gstin: '33AABCL4412J1ZR',
    cinNumber: 'U80100TN2020PTC341928',
    packageTier: 'Standard Tier',
    billingCycle: 'Annual',
    packageExpiry: 'Dec 18, 2026',
    daysRemaining: 91,
    status: 'Active',
    region: 'Canada East',
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
    ]
  }
];

export const MOCK_TUITION_CENTERS = INSTITUTES_DATA;

export const STUDENTS_DATA = [
  { id: 'STU-1001', name: 'Aarav Sharma', instituteCode: 'alpha', instituteName: 'Alpha Institute', batchName: 'JEE Advanced Pinnacle', grade: 'Class 12th', parentName: 'Rajesh Sharma', parentPhone: '+1 555-0192', feeStatus: 'Paid', feeAmount: 1450, appStatus: 'Active', attendanceRate: 98.2, facialVerified: true, reportApproved: true, onboardingStage: 'Fully Active', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' },
  { id: 'STU-1002', name: 'Ananya Deshmukh', instituteCode: 'alpha', instituteName: 'Alpha Institute', batchName: 'NEET Super-60 Batch A', grade: 'Class 12th', parentName: 'Dr. Sunita Deshmukh', parentPhone: '+1 555-0183', feeStatus: 'Paid', feeAmount: 1600, appStatus: 'Active', attendanceRate: 96.5, facialVerified: true, reportApproved: true, onboardingStage: 'Fully Active', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
  { id: 'STU-1003', name: 'Rohan Verma', instituteCode: 'alpha', instituteName: 'Alpha Institute', batchName: 'Foundation Olympiad', grade: 'Class 10th', parentName: 'Vikram Verma', parentPhone: '+1 555-0144', feeStatus: 'Defaulter', feeAmount: 950, appStatus: 'Pending', attendanceRate: 84.0, facialVerified: false, reportApproved: false, onboardingStage: 'Photo Upload Pending', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { id: 'STU-2001', name: 'Emily Watson', instituteCode: 'beta', instituteName: 'Beta Commerce', batchName: 'CA Inter Regular', grade: 'CA Inter', parentName: 'Charles Watson', parentPhone: '+44 20 7946 0991', feeStatus: 'Paid', feeAmount: 1800, appStatus: 'Active', attendanceRate: 99.1, facialVerified: true, reportApproved: true, onboardingStage: 'Fully Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
  { id: 'STU-2002', name: 'Liam Davies', instituteCode: 'beta', instituteName: 'Beta Commerce', batchName: 'Taxation Fast-Track', grade: 'CA Foundation', parentName: 'Arthur Davies', parentPhone: '+44 20 7946 0992', feeStatus: 'Partial', feeAmount: 1200, appStatus: 'Active', attendanceRate: 91.4, facialVerified: true, reportApproved: false, onboardingStage: 'First Fee Pending', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  { id: 'STU-3001', name: 'Sophia Miller', instituteCode: 'apex', instituteName: 'Apex Medical', batchName: 'NEET Target Top 100', grade: 'Class 12th', parentName: 'Dr. Robert Miller', parentPhone: '+1 617-555-0129', feeStatus: 'Paid', feeAmount: 2100, appStatus: 'Active', attendanceRate: 97.8, facialVerified: true, reportApproved: true, onboardingStage: 'Fully Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
  { id: 'STU-4001', name: 'Ethan Hunt', instituteCode: 'delta', instituteName: 'Delta Tech', batchName: 'AI & ML Cohort 4', grade: 'Class 11th', parentName: 'Matthew Hunt', parentPhone: '+1 415-555-8911', feeStatus: 'Paid', feeAmount: 1500, appStatus: 'Active', attendanceRate: 95.0, facialVerified: true, reportApproved: true, onboardingStage: 'Fully Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
  { id: 'STU-5001', name: 'Chloe Dubois', instituteCode: 'zenith', instituteName: 'Zenith Foundation', batchName: 'CLAT Super 40', grade: 'Class 12th', parentName: 'Marc Dubois', parentPhone: '+1 416-555-4309', feeStatus: 'Defaulter', feeAmount: 1100, appStatus: 'Pending', attendanceRate: 88.5, facialVerified: false, reportApproved: false, onboardingStage: 'App Link Sent', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' }
];

export const BATCHES_DATA = [
  { id: 'B101', name: 'JEE Advanced Pinnacle 2025', instituteCode: 'alpha', instituteName: 'Alpha Institute', teacher: 'Dr. Harrison', subject: 'Advanced Physics', room: 'Lecture Hall A', students: 120, capacity: 130, time: '08:00 AM - 11:30 AM', syllabusPct: 78, status: 'In Session', streamLive: true },
  { id: 'B102', name: 'NEET Super-60 Batch A', instituteCode: 'alpha', instituteName: 'Alpha Institute', teacher: 'Dr. Emily Vance', subject: 'Cellular Biology', room: 'Bio-Lab 2', students: 60, capacity: 60, time: '12:00 PM - 03:00 PM', syllabusPct: 82, status: 'Upcoming Today', streamLive: false },
  { id: 'B103', name: 'Foundation Olympiad Gr. 10', instituteCode: 'alpha', instituteName: 'Alpha Institute', teacher: 'Er. Vivek Sharma', subject: 'Pure Mathematics', room: 'Room 304', students: 45, capacity: 50, time: '04:00 PM - 06:30 PM', syllabusPct: 65, status: 'Scheduled', streamLive: false },
  { id: 'B201', name: 'CA Inter Regular Batch 2025', instituteCode: 'beta', instituteName: 'Beta Commerce', teacher: 'Catherine Miller, FCA', subject: 'Financial Audit', room: 'Audit Hall 1', students: 95, capacity: 100, time: '09:00 AM - 01:00 PM', syllabusPct: 70, status: 'In Session', streamLive: true },
  { id: 'B202', name: 'Taxation Special Fast-Track', instituteCode: 'beta', instituteName: 'Beta Commerce', teacher: 'CA Priya Patel', subject: 'Direct Taxation', room: 'Seminar Hall 3', students: 80, capacity: 85, time: '02:00 PM - 05:00 PM', syllabusPct: 85, status: 'Upcoming Today', streamLive: false },
  { id: 'B301', name: 'NEET Target Top 100 Rankers', instituteCode: 'apex', instituteName: 'Apex Medical', teacher: 'Dr. Alistair Sterling', subject: 'Human Anatomy', room: 'Auditorium 1', students: 110, capacity: 120, time: '08:30 AM - 12:30 PM', syllabusPct: 88, status: 'In Session', streamLive: true },
  { id: 'B401', name: 'AI & Machine Learning Cohort 4', instituteCode: 'delta', instituteName: 'Delta Tech', teacher: 'Karan Mehta', subject: 'Python & AI', room: 'Computer Lab Alpha', students: 50, capacity: 50, time: '10:00 AM - 01:00 PM', syllabusPct: 75, status: 'In Session', streamLive: true },
  { id: 'B501', name: 'CLAT & Law Entrance Super 40', instituteCode: 'zenith', instituteName: 'Zenith Foundation', teacher: 'Adv. S. Narayanan', subject: 'Constitutional Law', room: 'Moot Court Hall', students: 40, capacity: 45, time: '09:00 AM - 12:00 PM', syllabusPct: 70, status: 'In Session', streamLive: false }
];

export const FACIAL_LOGS_DATA = [
  { id: 'FAC-801', studentName: 'Aarav Sharma', studentId: 'STU-1001', instituteCode: 'alpha', instituteName: 'Alpha Institute', batchName: 'JEE Advanced Pinnacle', timestamp: '08:02 AM Today', confidence: 99.4, status: 'On Time', smsSent: true, cameraDoor: 'Gate A Entrance', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' },
  { id: 'FAC-802', studentName: 'Ananya Deshmukh', studentId: 'STU-1002', instituteCode: 'alpha', instituteName: 'Alpha Institute', batchName: 'NEET Super-60 Batch A', timestamp: '11:58 AM Today', confidence: 98.7, status: 'On Time', smsSent: true, cameraDoor: 'Gate B Entrance', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
  { id: 'FAC-803', studentName: 'Rohan Verma', studentId: 'STU-1003', instituteCode: 'alpha', instituteName: 'Alpha Institute', batchName: 'Foundation Olympiad', timestamp: '09:25 AM Today', confidence: 89.1, status: 'Late (25m)', smsSent: true, cameraDoor: 'Gate A Entrance', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { id: 'FAC-804', studentName: 'Emily Watson', studentId: 'STU-2001', instituteCode: 'beta', instituteName: 'Beta Commerce', batchName: 'CA Inter Regular', timestamp: '08:55 AM Today', confidence: 99.8, status: 'On Time', smsSent: true, cameraDoor: 'Main Lobby Cam', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
  { id: 'FAC-805', studentName: 'Liam Davies', studentId: 'STU-2002', instituteCode: 'beta', instituteName: 'Beta Commerce', batchName: 'Taxation Fast-Track', timestamp: '02:15 PM Today', confidence: 94.2, status: 'Late (15m)', smsSent: true, cameraDoor: 'Main Lobby Cam', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  { id: 'FAC-806', studentName: 'Sophia Miller', studentId: 'STU-3001', instituteCode: 'apex', instituteName: 'Apex Medical', batchName: 'NEET Target Top 100', timestamp: '08:28 AM Today', confidence: 99.1, status: 'On Time', smsSent: true, cameraDoor: 'Auditorium Gate 1', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
  { id: 'FAC-807', studentName: 'Ethan Hunt', studentId: 'STU-4001', instituteCode: 'delta', instituteName: 'Delta Tech', batchName: 'AI & ML Cohort 4', timestamp: '09:56 AM Today', confidence: 97.9, status: 'On Time', smsSent: true, cameraDoor: 'Lab Alpha Camera', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
  { id: 'FAC-808', studentName: 'Chloe Dubois', studentId: 'STU-5001', instituteCode: 'zenith', instituteName: 'Zenith Foundation', batchName: 'CLAT Super 40', timestamp: 'Yesterday', confidence: 0.0, status: 'Absent (2 Days)', smsSent: true, cameraDoor: 'Front Portal', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' }
];

export const INVENTORY_DATA = [
  { id: 'INV-101', itemCode: 'BK-JEE-PHY', name: 'JEE Advanced Physics Modules Vol 1-4', instituteCode: 'alpha', category: 'Study Material', inStock: 450, minRequired: 100, unitCost: 45, reorderStatus: 'Sufficient Stock', supplier: 'Pearson Academic Press' },
  { id: 'INV-102', itemCode: 'BK-NEET-BIO', name: 'NEET Comprehensive Biology Question Bank', instituteCode: 'alpha', category: 'Study Material', inStock: 280, minRequired: 80, unitCost: 38, reorderStatus: 'Sufficient Stock', supplier: 'McGraw Hill Ed' },
  { id: 'INV-103', itemCode: 'UNIF-BLAZ-L', name: 'Alpha Institute Crest Blazer (L)', instituteCode: 'alpha', category: 'Uniform Kits', inStock: 42, minRequired: 50, unitCost: 32, reorderStatus: 'Low Stock Alert', supplier: 'Apparel Corp USA' },
  { id: 'INV-201', itemCode: 'BK-CA-LAW', name: 'Corporate & Economic Laws Statutory Handbook', instituteCode: 'beta', category: 'Study Material', inStock: 180, minRequired: 50, unitCost: 55, reorderStatus: 'Sufficient Stock', supplier: 'Taxmann Publishers' },
  { id: 'INV-301', itemCode: 'KIT-MED-DIS', name: 'Pre-Med Anatomical Model & Dissection Kits', instituteCode: 'apex', category: 'Lab Kits', inStock: 15, minRequired: 30, unitCost: 110, reorderStatus: 'Reorder Placed', supplier: 'BioMed Scientific' },
  { id: 'INV-401', itemCode: 'ROB-ARD-KIT', name: 'Arduino Robotics & Microcontroller Starter Kit', instituteCode: 'delta', category: 'Hardware Kits', inStock: 60, minRequired: 20, unitCost: 75, reorderStatus: 'Sufficient Stock', supplier: 'SparkFun Electronics' }
];

export const HELP_SUPPORT_DATA = [
  { id: 'TKT-9101', ticketNo: 'HD-2026-091', title: 'Parent unable to open monthly report PDF in App', studentName: 'Rohan Verma', instituteCode: 'alpha', priority: 'High', status: 'Open', category: 'Mobile App Issue', createdTime: '2 hours ago', slaTimeLeft: '4h 15m' },
  { id: 'TKT-9102', ticketNo: 'HD-2026-092', title: 'Facial check-in camera 2 offline after WiFi glitch', studentName: 'System Gate B', instituteCode: 'alpha', priority: 'Critical', status: 'In Progress', category: 'Hardware Device', createdTime: '4 hours ago', slaTimeLeft: '1h 30m' },
  { id: 'TKT-9103', ticketNo: 'HD-2026-093', title: 'GST invoice request for corporate company sponsor', studentName: 'Emily Watson', instituteCode: 'beta', priority: 'Medium', status: 'Resolved', category: 'Billing & Accounts', createdTime: 'Yesterday', slaTimeLeft: 'SLA Met' },
  { id: 'TKT-9104', ticketNo: 'HD-2026-094', title: 'Parent requests reschedule of faculty PTM meeting', studentName: 'Sophia Miller', instituteCode: 'apex', priority: 'Low', status: 'Open', category: 'PTM Scheduling', createdTime: '5 hours ago', slaTimeLeft: '18h 00m' }
];

export const JOB_APPLICANTS_DATA = [
  { id: 'JOB-401', candidateName: 'Dr. Vivek Sengupta', role: 'Head of Physical Sciences', instituteCode: 'alpha', experience: '12 Yrs', qualification: 'Ph.D. Cambridge', stage: 'Demo Lecture Scheduled', rating: 4.8, status: 'Interviewing', appliedDate: 'Sep 10, 2026' },
  { id: 'JOB-402', candidateName: 'Pooja Kashyap', role: 'Senior Organic Chemist', instituteCode: 'alpha', experience: '8 Yrs', qualification: 'M.Sc. Delhi Univ', stage: 'Final Director Round', rating: 4.6, status: 'Shortlisted', appliedDate: 'Sep 12, 2026' },
  { id: 'JOB-403', candidateName: 'Marcus Wright, FCA', role: 'Faculty - Corporate Finance', instituteCode: 'beta', experience: '10 Yrs', qualification: 'FCA England', stage: 'Offer Letter Released', rating: 4.9, status: 'Selected', appliedDate: 'Sep 05, 2026' },
  { id: 'JOB-404', candidateName: 'Dr. Elena Vasquez', role: 'Physiology & Zoology Lead', instituteCode: 'apex', experience: '6 Yrs', qualification: 'MD Johns Hopkins', stage: 'Application Review', rating: 4.4, status: 'Screening', appliedDate: 'Sep 16, 2026' }
];

export const LIVE_CLASSES_DATA = [
  { id: 'LIV-601', title: 'JEE Pinnacle: Electromagnetic Induction Masterclass', instituteCode: 'alpha', batchName: 'JEE Advanced Pinnacle', teacher: 'Dr. Harrison', viewers: 118, bitrate: '4.8 Mbps', resolution: '1080p 60fps', status: 'Live Now', serverNode: 'US-East WebRTC 1' },
  { id: 'LIV-602', title: 'CA Inter: Corporate Restructuring & Insolvency Case', instituteCode: 'beta', batchName: 'CA Inter Regular', teacher: 'Catherine Miller, FCA', viewers: 94, bitrate: '4.2 Mbps', resolution: '1080p 30fps', status: 'Live Now', serverNode: 'EU-West WebRTC 2' },
  { id: 'LIV-603', title: 'NEET Super-60: Genetic Code & Translation Mechanism', instituteCode: 'apex', batchName: 'NEET Target Top 100', teacher: 'Dr. Emily Vance', viewers: 58, bitrate: '3.9 Mbps', resolution: '720p 60fps', status: 'Scheduled 02:00 PM', serverNode: 'US-East WebRTC 3' },
  { id: 'LIV-604', title: 'Delta AI: Neural Network Backprop from Scratch', instituteCode: 'delta', batchName: 'AI & ML Cohort 4', teacher: 'Karan Mehta', viewers: 50, bitrate: '5.2 Mbps', resolution: '1080p 60fps', status: 'Live Now', serverNode: 'US-West WebRTC 1' }
];

export const ADMISSION_QUERIES_DATA = [
  { id: 'LEAD-301', studentName: 'Kabir Malhotra', parentName: 'Sunil Malhotra', instituteCode: 'alpha', interestedCourse: '2-Year IIT-JEE Integrated', source: 'Website Enquiry Form', phone: '+1 555-0177', followUpDate: 'Today 04:00 PM', status: 'Demo Class Booked', counselor: 'Priya Sharma' },
  { id: 'LEAD-302', studentName: 'Meera Iyer', parentName: 'Girish Iyer', instituteCode: 'alpha', interestedCourse: '1-Year NEET Repeater Batch', source: 'Walk-in Campus Visit', phone: '+1 555-0188', followUpDate: 'Tomorrow 11:00 AM', status: 'Counseling Done', counselor: 'Ankit Mehta' },
  { id: 'LEAD-303', studentName: 'Oliver Brown', parentName: 'David Brown', instituteCode: 'beta', interestedCourse: 'CA Foundation Express', source: 'Google Ads Search', phone: '+44 20 7946 0881', followUpDate: 'Sep 21, 2026', status: 'Fees Structure Sent', counselor: 'Sarah Jenkins' },
  { id: 'LEAD-304', studentName: 'Chloe Scott', parentName: 'Dr. Mark Scott', instituteCode: 'apex', interestedCourse: 'NEET Pre-Med Super 100', source: 'Referral by Alumnus', phone: '+1 617-555-0199', followUpDate: 'Sep 20, 2026', status: 'Admission Form Issued', counselor: 'Dr. Nancy Drew' }
];

export const SUBJECTS_ALLOCATION_DATA = [
  { id: 'SUB-01', subject: 'Advanced Physics', instituteCode: 'alpha', leadFaculty: 'Dr. Harrison', totalBatches: 6, totalStudents: 380, weeklyHours: 24, passRate: 96, avgScore: 84 },
  { id: 'SUB-02', subject: 'Organic Chemistry', instituteCode: 'alpha', leadFaculty: 'Prof. Ananya Roy', totalBatches: 5, totalStudents: 310, weeklyHours: 20, passRate: 91, avgScore: 79 },
  { id: 'SUB-03', subject: 'Pure Mathematics', instituteCode: 'alpha', leadFaculty: 'Er. Vivek Sharma', totalBatches: 7, totalStudents: 440, weeklyHours: 28, passRate: 88, avgScore: 82 },
  { id: 'SUB-04', subject: 'Cellular Biology', instituteCode: 'alpha', leadFaculty: 'Dr. Emily Vance', totalBatches: 6, totalStudents: 320, weeklyHours: 24, passRate: 94, avgScore: 88 },
  { id: 'SUB-05', subject: 'Financial Audit', instituteCode: 'beta', leadFaculty: 'Catherine Miller, FCA', totalBatches: 5, totalStudents: 290, weeklyHours: 22, passRate: 98, avgScore: 86 },
  { id: 'SUB-06', subject: 'Corporate Law', instituteCode: 'beta', leadFaculty: 'Adv. David Ross', totalBatches: 4, totalStudents: 240, weeklyHours: 18, passRate: 92, avgScore: 80 },
  { id: 'SUB-07', subject: 'Human Anatomy', instituteCode: 'apex', leadFaculty: 'Dr. Alistair Sterling', totalBatches: 6, totalStudents: 360, weeklyHours: 26, passRate: 97, avgScore: 89 },
  { id: 'SUB-08', subject: 'AI & Data Science', instituteCode: 'delta', leadFaculty: 'Karan Mehta', totalBatches: 4, totalStudents: 190, weeklyHours: 18, passRate: 98, avgScore: 91 }
];

export const MOCK_FACULTY = [
  { id: 'FAC-01', name: 'Dr. Harrison Wells', subject: 'Advanced Physics', qualification: 'Ph.D. MIT', designation: 'HOD Physics', center: 'Alpha Center Kota', rating: 4.9 },
  { id: 'FAC-02', name: 'Prof. Ananya Roy', subject: 'Organic Chemistry', qualification: 'Ph.D. IIT Bombay', designation: 'Senior Faculty', center: 'Alpha Center Kota', rating: 4.8 },
  { id: 'FAC-03', name: 'Er. Vivek Sharma', subject: 'Pure Mathematics', qualification: 'B.Tech IIT Delhi', designation: 'HOD Mathematics', center: 'Beta South Mumbai', rating: 4.9 },
  { id: 'FAC-04', name: 'Dr. Emily Vance', subject: 'Cellular Biology', qualification: 'MD AIIMS', designation: 'HOD Medical', center: 'Apex Janakpuri Delhi', rating: 4.9 },
  { id: 'FAC-05', name: 'Catherine Miller, FCA', subject: 'Financial Audit', qualification: 'FCA London', designation: 'Director of Commerce', center: 'Delta Koramangala', rating: 4.8 },
];

export const MOCK_SUBJECTS = [
  { id: 'SUB-01', name: 'Advanced Physics (Mechanics & EM)', target: 'IIT-JEE Advanced', hod: 'Dr. Harrison Wells', batches: 6, hoursPerWeek: 24 },
  { id: 'SUB-02', name: 'Organic & Inorganic Chemistry', target: 'IIT-JEE / NEET', hod: 'Prof. Ananya Roy', batches: 5, hoursPerWeek: 20 },
  { id: 'SUB-03', name: 'Higher Calculus & Vectors', target: 'IIT-JEE Advanced', hod: 'Er. Vivek Sharma', batches: 7, hoursPerWeek: 28 },
  { id: 'SUB-04', name: 'Zoology & Human Physiology', target: 'NEET Medical Star', hod: 'Dr. Emily Vance', batches: 6, hoursPerWeek: 24 },
  { id: 'SUB-05', name: 'Auditing & Corporate Laws', target: 'CA Foundation / Inter', hod: 'Catherine Miller, FCA', batches: 5, hoursPerWeek: 22 },
];
