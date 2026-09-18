// Comprehensive Mock Datasets for Module 10: System Audit (Multi-Tenant Cloud ERP)

export const SYSTEM_AUDIT_LOGS = [
  {
    id: 'LOG-9401',
    actor: 'Devansh P. Singh',
    role: 'Root Super Admin',
    action: 'ROLE_ELEVATION_GRANTED',
    targetResource: 'Staff User USR-104 (Meera Chawla)',
    instituteCode: 'delta',
    instituteName: 'Delta Coding Academy',
    ip: '10.0.4.12 (Enterprise HQ VPN)',
    timestamp: 'Today, 01:24:18 AM IST',
    sha256Hash: 'SHA256: 7f8a19b2c340ef82bc1944810023aae1',
    severity: 'High',
    status: 'VERIFIED IN BLOCK',
    details: 'Granted temporary JIT elevation for Fee Discount Override (>15%) with 24-hour auto-decay TTL.'
  },
  {
    id: 'LOG-9402',
    actor: 'Dr. V. K. Bansal',
    role: 'Senior Faculty / HOD',
    action: 'MOCK_EXAM_RESCORE',
    targetResource: 'Batch JEE-Super-30 (Physics Section C)',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    ip: '103.21.144.92 (Kota Campus LAN)',
    timestamp: 'Today, 12:45:02 AM IST',
    sha256Hash: 'SHA256: 9e01bc334710ff21a88b7719cc029a14',
    severity: 'Medium',
    status: 'VERIFIED IN BLOCK',
    details: 'Re-evaluated 140 student scores following ambiguity correction in Question 18.'
  },
  {
    id: 'LOG-9403',
    actor: 'Meera Chawla',
    role: 'Finance / Cashier',
    action: 'FEE_DISCOUNT_APPLIED',
    targetResource: 'Invoice #INV-2026-8801 (Varun Joshi)',
    instituteCode: 'delta',
    instituteName: 'Delta Coding Academy',
    ip: '10.0.6.18 (Cash Counter POS)',
    timestamp: 'Yesterday, 06:12:44 PM IST',
    sha256Hash: 'SHA256: 4a22c109f788aa33b012999cc714bb50',
    severity: 'Medium',
    status: 'VERIFIED IN BLOCK',
    details: 'Processed 20% Olympiad scholarship waiver approved under Token #ELV-701.'
  },
  {
    id: 'LOG-9404',
    actor: 'Kavita Joshi',
    role: 'Counselor / Telecaller',
    action: 'BULK_LEAD_EXPORT',
    targetResource: 'Lead Inflow Roster (340 Records)',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    ip: '103.21.144.95 (Kota Telecalling Desk)',
    timestamp: 'Yesterday, 04:30:19 PM IST',
    sha256Hash: 'SHA256: 3c1a998e6d5b001a44e97710bc41a902',
    severity: 'High',
    status: 'VERIFIED IN BLOCK',
    details: 'Exported Kota School Physics seminar callbacks with watermarked PII data.'
  },
  {
    id: 'LOG-9405',
    actor: 'Adv. Meenakshi Sundaram',
    role: 'Center Director',
    action: 'USER_ACCOUNT_LOCKED',
    targetResource: 'Junior Counselor USR-114',
    instituteCode: 'zenith',
    instituteName: 'Zenith Humanities & Law',
    ip: '10.8.0.12 (Zenith Director Office)',
    timestamp: 'Yesterday, 02:15:30 PM IST',
    sha256Hash: 'SHA256: a120ef98c41235bc09881140df612300',
    severity: 'Critical',
    status: 'VERIFIED IN BLOCK',
    details: 'Emergency lockout triggered after 5 consecutive failed MFA OTP verification attempts.'
  },
  {
    id: 'LOG-9406',
    actor: 'Automated DB Daemon',
    role: 'System Root Engine',
    action: 'DB_SHARD_BACKUP',
    targetResource: 'PostgreSQL Multi-Tenant Core (All 5 Shards)',
    instituteCode: 'global',
    instituteName: 'Global Enterprise HQ',
    ip: '127.0.0.1 (Local Core Cron)',
    timestamp: 'Yesterday, 01:00:00 AM IST',
    sha256Hash: 'SHA256: 88fbc10294e81a33c09199a012bcfe44',
    severity: 'Info',
    status: 'VERIFIED IN BLOCK',
    details: 'Completed daily automated snapshot with AES-256 GCM envelope encryption.'
  },
  {
    id: 'LOG-9407',
    actor: 'CA Anand Singhania',
    role: 'Center Director',
    action: 'GST_INVOICE_CANCELLED',
    targetResource: 'Credit Note #CRN-0941',
    instituteCode: 'beta',
    instituteName: 'Beta Commerce Academy (CA)',
    ip: '10.2.1.8 (Mumbai Director Terminal)',
    timestamp: 'Sep 17, 2026 • 05:40 PM IST',
    sha256Hash: 'SHA256: 55d01248c891ff44a012bb993411a007',
    severity: 'Medium',
    status: 'VERIFIED IN BLOCK',
    details: 'Refund credit note endorsed for student relocation from Mumbai to Pune branch.'
  },
  {
    id: 'LOG-9408',
    actor: 'Rajesh Tiwari',
    role: 'Inventory Keeper',
    action: 'STOCK_THRESHOLD_OVERRIDE',
    targetResource: 'JEE Chemistry Modules Kit #KIT-CHEM-12',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    ip: '10.0.6.2 (Central Depot Terminal)',
    timestamp: 'Sep 17, 2026 • 11:22 AM IST',
    sha256Hash: 'SHA256: e8011cd488921f00a91277103348bb91',
    severity: 'Low',
    status: 'VERIFIED IN BLOCK',
    details: 'Adjusted buffer reorder threshold from 50 units to 30 units for festival week.'
  }
];

export const SECURITY_BREACH_LOGS = [
  {
    id: 'SEC-109',
    incidentType: 'Impossible Travel Velocity',
    riskScore: 98,
    threatSource: 'Frankfurt, Germany (AS3320 • IP: 185.220.101.5)',
    targetAccount: 'USR-102 (CA Anand Singhania)',
    targetCampus: 'Beta Commerce Academy (CA)',
    instituteCode: 'beta',
    wafAction: 'Session Terminated & Account Locked',
    timestamp: 'Today, 01:10 AM IST',
    status: 'Mitigated',
    attackVector: 'User logged in from Mumbai Office (IP 103.44.12.1) at 12:58 AM; 12 minutes later attempted administrative API call from Frankfurt Tor exit node.',
    firewallRule: 'WAF-GEO-04 (Impossible Air Velocity > 900 km/h)'
  },
  {
    id: 'SEC-110',
    incidentType: 'Brute-force SSH & API Gateway',
    riskScore: 89,
    threatSource: 'Bucharest, Romania (AS9009 • IP: 194.26.29.114)',
    targetAccount: 'PostgreSQL Root Admin Port (5432)',
    targetCampus: 'Global Enterprise HQ Vault',
    instituteCode: 'global',
    wafAction: 'IP Dropped & Banned (Permanent)',
    timestamp: 'Yesterday, 11:42 PM IST',
    status: 'Quarantined',
    attackVector: '1,420 rapid credential spray attempts detected in 45 seconds targeting /api/v1/auth/root.',
    firewallRule: 'WAF-RATE-LIMIT (Threshold: >30 req/min banned for 24h)'
  },
  {
    id: 'SEC-111',
    incidentType: 'SQL Injection via Lead Form',
    riskScore: 84,
    threatSource: 'Shenzhen, China (AS4134 • IP: 112.96.173.20)',
    targetAccount: 'Public Admission Query Gateway',
    targetCampus: 'Apex Medical Prep',
    instituteCode: 'apex',
    wafAction: 'Payload Sanitized & Request Dropped',
    timestamp: 'Yesterday, 08:15 PM IST',
    status: 'Mitigated',
    attackVector: 'Malicious payload in parent_contact field: " UNION SELECT username, password_hash FROM admin_users; --',
    firewallRule: 'WAF-SQLI-DEEP (Signature: UNION SELECT string concatenation)'
  },
  {
    id: 'SEC-112',
    incidentType: 'Concurrent Session from Rogue Geofence',
    riskScore: 76,
    threatSource: 'Singapore (AS13335 • IP: 104.28.155.10)',
    targetAccount: 'USR-106 (Kavita Joshi)',
    targetCampus: 'Alpha Institute of Science & Tech',
    instituteCode: 'alpha',
    wafAction: 'MFA Step-Up Challenge (Failed)',
    timestamp: 'Yesterday, 03:50 PM IST',
    status: 'Mitigated',
    attackVector: 'Session cookie cloned; second login attempted outside Kota campus turnstile network. Prompted for Hardware FIDO2 key and failed.',
    firewallRule: 'WAF-MFA-STEPUP (Client fingerprint mismatch)'
  },
  {
    id: 'SEC-113',
    incidentType: 'Exfiltration Rate-Limit Spike',
    riskScore: 68,
    threatSource: 'Bengaluru, India (AS55836 • IP: 157.48.201.8)',
    targetAccount: 'USR-108 (Rajesh Tiwari)',
    targetCampus: 'Delta Coding Academy',
    instituteCode: 'delta',
    wafAction: 'Export Blocked & Admin Notified',
    timestamp: 'Sep 17, 2026 • 02:10 PM IST',
    status: 'Resolved',
    attackVector: 'Scripted loop attempting to download 2,000 student kit serial numbers in CSV format within 10 seconds.',
    firewallRule: 'WAF-EXP-THROTTLE (Max 200 records per export batch)'
  }
];

export const PRIVILEGE_DRIFT_DATA = {
  driftRiskIndex: '0.4% Low Risk',
  orphanPurged: '14 Accounts',
  activeJitGrants: 2,
  quarterlyReviewsCompleted: '100% Completed',
  monthlyDriftTrend: [
    { month: 'Apr', elevationRequests: 18, autoDecayed: 18, manualRevoked: 0, driftEvents: 0 },
    { month: 'May', elevationRequests: 24, autoDecayed: 23, manualRevoked: 1, driftEvents: 0 },
    { month: 'Jun', elevationRequests: 36, autoDecayed: 34, manualRevoked: 2, driftEvents: 1 },
    { month: 'Jul', elevationRequests: 28, autoDecayed: 27, manualRevoked: 1, driftEvents: 0 },
    { month: 'Aug', elevationRequests: 22, autoDecayed: 21, manualRevoked: 1, driftEvents: 0 },
    { month: 'Sep', elevationRequests: 19, autoDecayed: 17, manualRevoked: 2, driftEvents: 0, current: true }
  ],
  driftAnomaliesList: [
    {
      id: 'DFT-301',
      userName: 'Meera Chawla',
      role: 'Finance / Cashier',
      campus: 'Delta Coding Academy',
      instituteCode: 'delta',
      baselinePermission: 'FEE LEDGER & RECEIPT ONLY',
      driftedPermission: 'Fee Concession Override (>15%)',
      timeRemaining: '45 mins left',
      grantedReason: 'Token #ELV-701 approved for Olympiad scholarship.',
      status: 'Active JIT (Decaying in 45m)',
      riskLevel: 'Medium'
    },
    {
      id: 'DFT-302',
      userName: 'Dr. V. K. Bansal',
      role: 'Senior Faculty / HOD',
      campus: 'Alpha Institute of Science & Tech',
      instituteCode: 'alpha',
      baselinePermission: 'CREATE & GRADE TEST ONLY',
      driftedPermission: 'Mock Exam Key Re-scoring Engine',
      timeRemaining: '1h 05m left',
      grantedReason: 'Token #ELV-703 for Section C chemistry rescore.',
      status: 'Active JIT (Decaying in 1h)',
      riskLevel: 'Low'
    },
    {
      id: 'DFT-303',
      userName: 'Rajesh Tiwari',
      role: 'Inventory Keeper',
      campus: 'Alpha Institute',
      instituteCode: 'alpha',
      baselinePermission: 'DEPOT STOCK DISPATCH',
      driftedPermission: 'Direct Vendor PO Approval',
      timeRemaining: 'Expired Yesterday',
      grantedReason: 'Emergency stationery PO during book shortage.',
      status: 'Purged & Re-aligned',
      riskLevel: 'Resolved'
    }
  ]
};

export const GEO_ANOMALIES_DATA = {
  impossibleTravelIncidents: 2,
  foreignIpBlocks: 14,
  geofenceCompliance: '99.8%',
  activeCampusNodes: 5,
  impossibleTravelLogs: [
    {
      id: 'GEO-501',
      user: 'CA Anand Singhania (Director)',
      instituteCode: 'beta',
      originLocation: 'Mumbai Campus (103.44.12.1)',
      originTime: 'Today, 12:58 AM IST',
      anomalyLocation: 'Frankfurt, Germany (185.220.101.5)',
      anomalyTime: 'Today, 01:10 AM IST (12m elapsed)',
      calculatedVelocity: '8,420 km/h (Impossible Air Speed)',
      actionTaken: 'Session Terminated • Token Banned • WhatsApp Alert Sent',
      status: 'Mitigated'
    },
    {
      id: 'GEO-502',
      user: 'Kavita Joshi (Counselor)',
      instituteCode: 'alpha',
      originLocation: 'Kota Campus Turnstile (103.21.144.92)',
      originTime: 'Yesterday, 03:20 PM IST',
      anomalyLocation: 'Singapore (104.28.155.10)',
      anomalyTime: 'Yesterday, 03:50 PM IST (30m elapsed)',
      calculatedVelocity: '6,200 km/h (Tor Proxy Cloned Session)',
      actionTaken: 'MFA Push Challenged • Session Revoked',
      status: 'Mitigated'
    }
  ],
  campusGeofenceMatrix: [
    { campus: 'Alpha Institute of Science & Tech', city: 'Kota, Rajasthan', geofenceRadius: '150m Circle', allowedSubnets: '103.21.144.0/24', turnstilesEnforced: '100% Strict', status: 'Compliant' },
    { campus: 'Beta Commerce Academy (CA)', city: 'Mumbai, Maharashtra', geofenceRadius: '200m Circle', allowedSubnets: '103.44.12.0/24', turnstilesEnforced: '100% Strict', status: 'Compliant' },
    { campus: 'Apex Medical Prep', city: 'New Delhi, NCR', geofenceRadius: '250m Circle', allowedSubnets: '115.112.80.0/24', turnstilesEnforced: '99.5% Strict', status: 'Compliant' },
    { campus: 'Delta Coding Academy', city: 'Bengaluru, Karnataka', geofenceRadius: '180m Circle', allowedSubnets: '182.74.40.0/24', turnstilesEnforced: '100% Strict', status: 'Compliant' },
    { campus: 'Zenith Humanities & Law', city: 'Hyderabad, Telangana', geofenceRadius: '300m Circle', allowedSubnets: '122.175.90.0/24', turnstilesEnforced: '99.2% Strict', status: 'Compliant' }
  ]
};
