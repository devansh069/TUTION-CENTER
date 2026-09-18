// Centralized Mock Data for Module 18: WhatsApp Lead Funnel & CRM

export const PIPELINE_STAGES = [
  { id: 'new_inbound', title: 'New Inbound Leads', color: 'border-blue-400 bg-blue-50/40 text-blue-800' },
  { id: 'ai_qualified', title: 'AI Bot Qualified', color: 'border-purple-400 bg-purple-50/40 text-purple-800' },
  { id: 'demo_scheduled', title: 'Counselor Demo Booked', color: 'border-amber-400 bg-amber-50/40 text-amber-800' },
  { id: 'quotation_sent', title: 'Fee Quotation Sent', color: 'border-indigo-400 bg-indigo-50/40 text-indigo-800' },
  { id: 'enrolled_won', title: 'Enrolled / Closed Won', color: 'border-emerald-400 bg-emerald-50/40 text-emerald-800' },
  { id: 'lost', title: 'Closed Lost / Dropped', color: 'border-rose-400 bg-rose-50/40 text-rose-800' }
];

export const WHATSAPP_LEADS = [
  {
    id: 'LEAD-901',
    leadName: 'Aditi Deshmukh',
    parentName: 'Col. Vikram Deshmukh',
    phone: '+91 98201-44589',
    course: 'JEE Advanced Super-30 (Grade 11)',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    stage: 'demo_scheduled',
    temperature: 'Hot',
    leadScore: 92,
    counselor: 'Priya Sharma (Senior Academic Counselor)',
    lastMessage: 'Can we attend the demo lecture on Saturday at 10 AM?',
    lastMessageTime: '10 mins ago',
    source: 'Meta Click-to-WhatsApp Ad (JEE 2027 Campaign)',
    unreadCount: 1,
    tags: ['High Intent', 'Hostel Required', 'Maths Olympiad Ranker'],
    chatHistory: [
      { sender: 'lead', text: 'Hello, I saw your Instagram ad regarding the JEE 2027 2-year classroom batch in Kota.', time: 'Yesterday, 04:15 PM' },
      { sender: 'bot', text: 'Namaste Col. Deshmukh! Welcome to Alpha Institute. We have sent you our JEE 2027 curriculum dossier & fee structure PDF. May I know the student\'s current Grade 10 score?', time: 'Yesterday, 04:15 PM' },
      { sender: 'lead', text: 'Aditi scored 96.4% in CBSE 10th and cleared the Regional Math Olympiad.', time: 'Yesterday, 04:18 PM' },
      { sender: 'bot', text: 'Outstanding! Aditi qualifies for our Super-30 scholarship test. Would you like to schedule a free faculty 1-on-1 demo lecture this week?', time: 'Yesterday, 04:18 PM' },
      { sender: 'counselor', text: 'Hello Col. Deshmukh, I am Priya Sharma, Head Counselor at Alpha. I have reserved 2 seats for Saturday\'s Physics demo with Er. Sanjay Verma.', time: 'Today, 09:30 AM' },
      { sender: 'lead', text: 'Can we attend the demo lecture on Saturday at 10 AM?', time: 'Today, 09:42 AM' }
    ]
  },
  {
    id: 'LEAD-902',
    leadName: 'Rohan Mehra',
    parentName: 'Sunita Mehra',
    phone: '+91 98112-67890',
    course: 'NEET Ultimate Intensive (Grade 12)',
    instituteCode: 'apex',
    instituteName: 'Apex Medical Prep',
    stage: 'quotation_sent',
    temperature: 'Hot',
    leadScore: 88,
    counselor: 'Dr. Vivek Menon',
    lastMessage: 'Received the fee quotation. Does the fee include hostel & mock test series?',
    lastMessageTime: '25 mins ago',
    source: 'Google Search Ads (Delhi Medical Coaching)',
    unreadCount: 2,
    tags: ['Repeat Inquirer', 'Scholarship 25% Applied'],
    chatHistory: [
      { sender: 'lead', text: 'Hi, inquiring about 1-year NEET repeater batch with test series.', time: 'Sep 17, 11:10 AM' },
      { sender: 'bot', text: 'Welcome to Apex Medical Prep! Our 2026-27 NEET Repeaters batch produced 42 AIIMS selections last year. Attached is our syllabus & fee guide.', time: 'Sep 17, 11:10 AM' },
      { sender: 'counselor', text: 'Hi Sunita ji, Dr. Vivek here. Based on Rohan\'s previous NEET score (540), we have offered a 25% Merit Concession. The formal proforma invoice of Rs. 1,45,000 has been sent to your WhatsApp.', time: 'Today, 08:30 AM' },
      { sender: 'lead', text: 'Received the fee quotation. Does the fee include hostel & mock test series?', time: 'Today, 08:50 AM' }
    ]
  },
  {
    id: 'LEAD-903',
    leadName: 'Karan Jaiswal',
    parentName: 'Rajesh Jaiswal (CA)',
    phone: '+91 97234-55120',
    course: 'CA Foundation & Inter Dual Track',
    instituteCode: 'beta',
    instituteName: 'Beta Commerce Academy (CA)',
    stage: 'enrolled_won',
    temperature: 'Hot',
    leadScore: 99,
    counselor: 'Ananya Gupta',
    lastMessage: 'Payment of Rs. 65,000 completed via Razorpay UPI. Sent transaction screenshot.',
    lastMessageTime: '1 hour ago',
    source: 'Student Referral (Batch 2025 All-India Rank 4)',
    unreadCount: 0,
    tags: ['Fee Paid', 'Receipt Generated', 'Batch A Confirmed'],
    chatHistory: [
      { sender: 'lead', text: 'Hi Beta Academy, I want to enroll Karan for the November 2026 CA Foundation batch.', time: 'Sep 16, 02:00 PM' },
      { sender: 'counselor', text: 'Hello Mr. Jaiswal! Delighted to connect. Here is our UPI Payment Link for direct admission: https://pay.eduzenith.net/beta/ca-2026', time: 'Sep 16, 03:15 PM' },
      { sender: 'lead', text: 'Payment of Rs. 65,000 completed via Razorpay UPI. Sent transaction screenshot.', time: 'Today, 01:15 PM' },
      { sender: 'bot', text: '🎉 Payment Verified! Welcome Karan Jaiswal to Beta Commerce Academy. Receipt #REC-CA-892 has been generated and emailed.', time: 'Today, 01:16 PM' }
    ]
  },
  {
    id: 'LEAD-904',
    leadName: 'Tanvi Saxena',
    parentName: 'Dr. Alok Saxena',
    phone: '+91 99887-12345',
    course: 'Full-Stack AI & Python Bootcamp',
    instituteCode: 'delta',
    instituteName: 'Delta Coding Academy',
    stage: 'new_inbound',
    temperature: 'Warm',
    leadScore: 74,
    counselor: 'Unassigned (Bot Triage)',
    lastMessage: 'Is this course suitable for a Grade 9 student with basic Scratch knowledge?',
    lastMessageTime: '3 mins ago',
    source: 'Website Sticky Floating WhatsApp Widget',
    unreadCount: 1,
    tags: ['Young Prodigy', 'Weekend Batch'],
    chatHistory: [
      { sender: 'lead', text: 'Is this course suitable for a Grade 9 student with basic Scratch knowledge?', time: '3 mins ago' },
      { sender: 'bot', text: 'Hello Dr. Saxena! Yes, our Junior Python & Generative AI track starts from fundamental logic before advancing to PyTorch. Downloading brochure...', time: '2 mins ago' }
    ]
  },
  {
    id: 'LEAD-905',
    leadName: 'Manish Chawla',
    parentName: 'Sanjay Chawla',
    phone: '+91 98450-89123',
    course: 'CLAT 2027 2-Year Comprehensive',
    instituteCode: 'zenith',
    instituteName: 'Zenith Humanities & Law',
    stage: 'ai_qualified',
    temperature: 'Warm',
    leadScore: 81,
    counselor: 'Deepak Varma',
    lastMessage: 'Selected Option 2: Evening Batch (5 PM to 7:30 PM)',
    lastMessageTime: '40 mins ago',
    source: 'National Newspaper QR Code Campaign',
    unreadCount: 0,
    tags: ['Mock Test Requested', 'Legal Aptitude'],
    chatHistory: [
      { sender: 'lead', text: 'Scanned the QR code from Times of India. Wanted details for CLAT 2027.', time: 'Today, 11:00 AM' },
      { sender: 'bot', text: 'Welcome to Zenith Humanities & Law! We have 2 batch schedules: [1] Morning 8 AM [2] Evening 5 PM. Which one suits Manish?', time: 'Today, 11:01 AM' },
      { sender: 'lead', text: 'Selected Option 2: Evening Batch (5 PM to 7:30 PM)', time: 'Today, 11:05 AM' }
    ]
  },
  {
    id: 'LEAD-906',
    leadName: 'Sameer Khan',
    parentName: 'Farhan Khan',
    phone: '+91 97110-23490',
    course: 'JEE Main Crash Course 2026',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    stage: 'lost',
    temperature: 'Cold',
    leadScore: 35,
    counselor: 'Priya Sharma',
    lastMessage: 'Distance is too far from our residence in Gurugram. Will opt for online self-paced.',
    lastMessageTime: 'Yesterday',
    source: 'Meta Lead Gen Ads',
    unreadCount: 0,
    tags: ['Location Constraint', 'Self-Paced Prospect'],
    chatHistory: [
      { sender: 'lead', text: 'What is the location for offline crash course?', time: 'Sep 16, 10:00 AM' },
      { sender: 'counselor', text: 'Our offline classroom center is at South Extension-II, New Delhi.', time: 'Sep 16, 10:15 AM' },
      { sender: 'lead', text: 'Distance is too far from our residence in Gurugram. Will opt for online self-paced.', time: 'Sep 17, 03:20 PM' }
    ]
  }
];

export const BOT_WORKFLOWS = [
  {
    id: 'BOT-WF-01',
    name: '24/7 Prospect Inbound Greeting & Course Brochure Dispatcher',
    trigger: 'Incoming WhatsApp message from unsaved number or keyword "BROCHURE"',
    description: 'Instantly welcomes leads within 1.2s, collects prospective student details, and automatically transmits high-res course PDF brochure with syllabus breakdown.',
    keywords: ['HI', 'HELLO', 'BROCHURE', 'ADMISSION', 'FEES', 'SYLLABUS'],
    status: 'Active',
    responseDelay: '1.2s',
    totalExecutions: 8490,
    successRate: '98.6%',
    category: 'Lead Capture'
  },
  {
    id: 'BOT-WF-02',
    name: 'Free 1-on-1 Faculty Demo Lecture Slot Scheduler',
    trigger: 'Lead clicks "[Book Free Demo]" interactive button or sends keyword "DEMO"',
    description: 'Synchronizes with faculty calendar, presents 3 upcoming classroom & online trial slots, and generates instant Google Calendar & WhatsApp entry confirmation.',
    keywords: ['DEMO', 'TRIAL', 'SCHEDULE', 'SAMPLE CLASS', 'VISIT'],
    status: 'Active',
    responseDelay: '1.5s',
    totalExecutions: 3240,
    successRate: '94.2%',
    category: 'Acquisition'
  },
  {
    id: 'BOT-WF-03',
    name: 'Fee Due & UPI Instant Quick-Pay Link Generator',
    trigger: 'Webhook trigger on Tuition Fee Due Date or keyword "PAY FEE"',
    description: 'Fetches student outstanding balance from ERP Module 05, creates dynamic Razorpay / UPI intent link, and transmits official GST receipt upon successful payment.',
    keywords: ['PAY', 'FEE LINK', 'DUES', 'INSTALLMENT', 'RECEIPT'],
    status: 'Active',
    responseDelay: '2.0s',
    totalExecutions: 11200,
    successRate: '99.4%',
    category: 'Finance'
  },
  {
    id: 'BOT-WF-04',
    name: 'Parent Facial Biometric Turnstile Check-in / Latecomer Alert',
    trigger: 'Automated campus gate turnstile hardware event (Module 02)',
    description: 'Pushes instant biometric check-in confirmation with entry photo and timestamp to parent WhatsApp within 800ms of student tap.',
    keywords: ['GATE', 'ATTENDANCE', 'ENTRY', 'CHECKIN'],
    status: 'Active',
    responseDelay: '0.8s',
    totalExecutions: 45890,
    successRate: '99.8%',
    category: 'Campus Safety'
  }
];

export const REPORTS_DATA = {
  conversionRoi: {
    funnelSummary: [
      { stage: 'Meta & Google Ad Clicks', count: 18450, dropPct: '0%', color: 'bg-blue-500' },
      { stage: 'Inbound WhatsApp Initiated', count: 1280, dropPct: '93.1%', color: 'bg-emerald-500' },
      { stage: 'AI Bot Qualified Leads', count: 890, dropPct: '30.5%', color: 'bg-purple-500' },
      { stage: 'Trial Demo Lecture Attended', count: 510, dropPct: '42.7%', color: 'bg-amber-500' },
      { stage: 'Official Paid Enrolments', count: 382, dropPct: '25.1%', color: 'bg-indigo-600' }
    ],
    adChannelRoi: [
      {
        channel: 'Meta Click-to-WhatsApp (Instagram & FB)',
        spend: 'INR 1,20,000',
        leads: 840,
        cpl: 'INR 142.8',
        enrolments: 248,
        revenueGenerated: 'INR 1,48,80,000',
        roas: '12.4x'
      },
      {
        channel: 'Google Search Ads (Intent "Coaching Near Me")',
        spend: 'INR 85,000',
        leads: 310,
        cpl: 'INR 274.1',
        enrolments: 94,
        revenueGenerated: 'INR 61,10,000',
        roas: '7.18x'
      },
      {
        channel: 'Campus Banners & Newspaper QR Code',
        spend: 'INR 35,000',
        leads: 130,
        cpl: 'INR 269.2',
        enrolments: 40,
        revenueGenerated: 'INR 26,00,000',
        roas: '7.42x'
      }
    ],
    campusConversionLeaderboard: [
      { campus: 'Alpha Institute (Kota & Delhi)', inquiries: 540, demos: 240, enrolled: 182, rate: '33.7%', badge: 'Top Performer' },
      { campus: 'Apex Medical Prep (Delhi)', inquiries: 360, demos: 160, enrolled: 112, rate: '31.1%', badge: 'High Value' },
      { campus: 'Beta Commerce Academy (Mumbai)', inquiries: 220, demos: 80, enrolled: 58, rate: '26.3%', badge: 'Consistent' },
      { campus: 'Delta Coding Academy (Bengaluru)', inquiries: 95, demos: 42, enrolled: 22, rate: '23.1%', badge: 'Growing' },
      { campus: 'Zenith Humanities & Law (Hyderabad)', inquiries: 65, demos: 28, enrolled: 18, rate: '27.6%', badge: 'Emerging' }
    ]
  },
  responseLatency: {
    kpis: {
      botMedianLatency: '1.2s',
      counselorMedianLatency: '14.2 mins',
      slaComplianceRate: '98.4%',
      afterHoursCoverage: '100% (24/7 AI Bot Active)'
    },
    latencyDistribution: [
      { bucket: '< 5 Seconds (Instant AI Bot)', percentage: 76.5, count: 980, color: 'bg-emerald-500' },
      { bucket: '5 - 60 Seconds (Complex Bot Query)', percentage: 12.5, count: 160, color: 'bg-blue-500' },
      { bucket: '1 - 15 Minutes (Counselor Handover)', percentage: 7.8, count: 100, color: 'bg-amber-500' },
      { bucket: '15 - 60 Minutes (High Traffic Surge)', percentage: 2.4, count: 31, color: 'bg-purple-500' },
      { bucket: '> 60 Minutes (Breached SLA)', percentage: 0.8, count: 9, color: 'bg-rose-500' }
    ],
    counselorScorecard: [
      { name: 'Priya Sharma', campus: 'Alpha Kota', activeChats: 48, avgFirstResponse: '8.4 mins', demoConversion: '46.2%', rating: '4.9 ★' },
      { name: 'Dr. Vivek Menon', campus: 'Apex Delhi', activeChats: 36, avgFirstResponse: '11.2 mins', demoConversion: '42.8%', rating: '4.8 ★' },
      { name: 'Ananya Gupta', campus: 'Beta Mumbai', activeChats: 28, avgFirstResponse: '12.0 mins', demoConversion: '39.4%', rating: '4.7 ★' },
      { name: 'Deepak Varma', campus: 'Zenith Hyderabad', activeChats: 19, avgFirstResponse: '15.5 mins', demoConversion: '36.8%', rating: '4.6 ★' }
    ]
  }
};
