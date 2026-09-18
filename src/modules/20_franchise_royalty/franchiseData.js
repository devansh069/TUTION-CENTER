export const FRANCHISE_METRICS = {
  totalActiveBranches: 42,
  totalInactiveBranches: 3,
  onboardingBranches: 7,
  totalRoyaltyCurrentMonth: 1845000, // In INR
  avgComplianceScore: 94.5,
  royaltyGrowthYoY: 18.2, // Percentage
};

export const BRANCHES = [
  {
    id: 'BR-001',
    name: 'Zenith Andheri West',
    owner: 'Ramesh Patel',
    region: 'Mumbai',
    status: 'Active',
    royaltyModel: 'Revenue Share (15%)',
    agreementExpiry: '2028-05-14',
    complianceScore: 98,
    monthlyRevenue: 2450000,
    students: 450,
  },
  {
    id: 'BR-002',
    name: 'Zenith Kothrud',
    owner: 'Anjali Sharma',
    region: 'Pune',
    status: 'Active',
    royaltyModel: 'Fixed Tier 1',
    agreementExpiry: '2027-11-20',
    complianceScore: 92,
    monthlyRevenue: 1800000,
    students: 310,
  },
  {
    id: 'BR-003',
    name: 'Zenith HSR Layout',
    owner: 'Karthik N',
    region: 'Bangalore',
    status: 'Active',
    royaltyModel: 'Revenue Share (15%)',
    agreementExpiry: '2026-08-10',
    complianceScore: 85,
    monthlyRevenue: 3100000,
    students: 520,
  },
  {
    id: 'BR-004',
    name: 'Zenith Salt Lake',
    owner: 'Debashis Roy',
    region: 'Kolkata',
    status: 'Onboarding',
    royaltyModel: 'Fixed Tier 2',
    agreementExpiry: '2029-01-15',
    complianceScore: 45, // Still onboarding
    monthlyRevenue: 0,
    students: 0,
  }
];

export const ONBOARDING_PIPELINE = [
  {
    id: 'ONB-101',
    applicantName: 'Vikram Singh',
    location: 'Jaipur (Malviya Nagar)',
    stage: 'Application Review',
    appliedDate: '2026-09-10',
    assignedManager: 'Priya D.',
  },
  {
    id: 'ONB-102',
    applicantName: 'Sneha Reddy',
    location: 'Hyderabad (Gachibowli)',
    stage: 'Legal Agreement',
    appliedDate: '2026-08-22',
    assignedManager: 'Rahul M.',
  },
  {
    id: 'ONB-103',
    applicantName: 'Amit Desai',
    location: 'Ahmedabad (SG Highway)',
    stage: 'Infrastructure Setup',
    appliedDate: '2026-08-05',
    assignedManager: 'Priya D.',
  },
];

export const ROYALTY_LEDGER = [
  {
    invoiceId: 'INV-ROY-9021',
    branchId: 'BR-001',
    branchName: 'Zenith Andheri West',
    billingMonth: 'Aug 2026',
    amountDue: 367500, // 15% of 24.5L
    dueDate: '2026-09-05',
    status: 'Paid',
    paymentMode: 'NEFT',
    paidDate: '2026-09-02',
  },
  {
    invoiceId: 'INV-ROY-9022',
    branchId: 'BR-002',
    branchName: 'Zenith Kothrud',
    billingMonth: 'Aug 2026',
    amountDue: 150000, // Fixed
    dueDate: '2026-09-05',
    status: 'Pending',
    paymentMode: '-',
    paidDate: '-',
  },
  {
    invoiceId: 'INV-ROY-9023',
    branchId: 'BR-003',
    branchName: 'Zenith HSR Layout',
    billingMonth: 'Aug 2026',
    amountDue: 465000, // 15% of 31L
    dueDate: '2026-09-05',
    status: 'Overdue',
    paymentMode: '-',
    paidDate: '-',
  },
];

export const RESOURCE_REQUISITIONS = [
  {
    orderId: 'REQ-5510',
    branchName: 'Zenith Kothrud',
    items: 'Physics Std 11 Modules (x200), Chemistry (x200)',
    orderDate: '2026-09-15',
    status: 'Processing',
    totalValue: 145000,
  },
  {
    orderId: 'REQ-5511',
    branchName: 'Zenith HSR Layout',
    items: 'Student ID Card Ribbons (x500), Uniform Sets (x100)',
    orderDate: '2026-09-16',
    status: 'Dispatched',
    totalValue: 85000,
  },
  {
    orderId: 'REQ-5512',
    branchName: 'Zenith Andheri West',
    items: 'Marketing Brochures Q3 (x5000)',
    orderDate: '2026-09-18',
    status: 'Pending Approval',
    totalValue: 12000,
  },
];
