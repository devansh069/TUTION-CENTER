import { useState } from 'react';
import { 
  Building2, ArrowLeft, Shield, MapPin, Mail, Phone, 
  User, CheckCircle2, Layers, DollarSign, Database, 
  Cpu, Award, BookOpen, Clock, Lock, Sparkles, Save, Check
} from 'lucide-react';

export default function AddInstitutePage({ onBack, onSaveInstitute }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tradeName: '',
    shortCode: '',
    tagline: '',
    establishedYear: '2024',
    affiliationBoard: 'CBSE / State Board / National Olympiad Forum',
    websiteUrl: '',
    instituteType: 'Hybrid Coaching (Offline + Online)',
    primaryStream: 'Engineering & Medical (IIT-JEE / NEET)',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    totalClassrooms: '18',
    labCount: '4 Specialized Labs',
    libraryCapacity: '120 Seats',
    biometricInstalled: 'Yes - Facial Recognition + RFID',
    cctvMonitoring: 'Yes - 32 IP Cameras',
    smartBoardsInstalled: '14 Interactive Flat Panels',
    directorName: '',
    directorDesignation: 'Founder & Managing Director',
    directorQualification: 'Ph.D. / M.Tech / M.Sc.',
    directorPhone: '',
    directorWhatsapp: '',
    directorEmail: '',
    headOfAcademics: '',
    academicPhone: '',
    accountantName: '',
    accountantEmail: '',
    gstinNumber: '',
    cinNumber: '',
    panNumber: '',
    registeredEntityName: '',
    bankName: '',
    bankAccountNumber: '',
    bankIfscCode: '',
    bankBranch: '',
    taxExemption80G: 'No',
    targetExams: ['IIT-JEE Advanced', 'NEET-UG', 'Foundation K-10'],
    studentCapacity: '1500',
    batchSizeLimit: '60 Students/Batch',
    academicCycle: 'April 2025 - March 2026',
    mediumOfInstruction: 'English & Bilingual',
    packageTier: 'Enterprise Max',
    billingFrequency: 'Annual',
    allocatedStorageGB: '250',
    monthlySmsCredits: '50000',
    whiteLabeledApp: 'Yes - Custom Android & iOS Parent App',
    subdomainPrefix: '',
    adminMasterUsername: '',
    adminInitialPassword: 'EduZenith#2026'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxToggle = (exam) => {
    setFormData(prev => {
      const exists = prev.targetExams.includes(exam);
      return {
        ...prev,
        targetExams: exists ? prev.targetExams.filter(e => e !== exam) : [...prev.targetExams, exam]
      };
    });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.city) {
      alert('Please fill at least the Institute Legal Name and City.');
      return;
    }

    const newCode = (formData.shortCode || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 6));
    const newInstitute = {
      id: `inst-${Date.now()}`,
      code: newCode.toLowerCase(),
      name: formData.name,
      shortCode: formData.shortCode || `${newCode.toUpperCase().slice(0, 4)}-HQ`,
      tagline: formData.tagline || 'Excellence in Coaching & Competitive Exams',
      city: `${formData.city}, ${formData.state || 'Metro'}`,
      address: `${formData.addressLine1 || formData.city}, ${formData.postalCode || ''}`,
      director: formData.directorName || 'Executive Director',
      directorPhone: formData.directorPhone || '+1 (555) 123-9900',
      directorEmail: formData.directorEmail || `director@${newCode.toLowerCase()}.edu`,
      established: formData.establishedYear,
      gstin: formData.gstinNumber || '27AABCZ8890K1Z8',
      cinNumber: formData.cinNumber || 'U80902DL2024PTC192831',
      packageTier: formData.packageTier,
      billingCycle: formData.billingFrequency,
      packageExpiry: 'Sep 30, 2027',
      daysRemaining: 365,
      status: 'Active',
      metrics: {
        students: 240,
        studentCapacity: parseInt(formData.studentCapacity) || 1200,
        teachers: 14,
        supportStaff: 6,
        batches: 6,
        monthlyRevenue: 28400,
        pendingFees: 2400,
        attendanceRate: 96.0,
        storageUsedGB: 18,
        storageTotalGB: parseInt(formData.allocatedStorageGB) || 250,
        smsQuotaUsed: 2400,
        smsQuotaTotal: parseInt(formData.monthlySmsCredits) || 50000,
      },
      performanceChart: [
        { month: 'Jun', students: 80, revenue: 9500, attendance: 93 },
        { month: 'Jul', students: 130, revenue: 15400, attendance: 94 },
        { month: 'Aug', students: 185, revenue: 21800, attendance: 95 },
        { month: 'Sep', students: 240, revenue: 28400, attendance: 96 },
      ],
      subjectBreakdown: [
        { subject: 'Advanced Physics', faculty: 'Lead Senior Faculty', passRate: 94, avgScore: 82, batches: 3 },
        { subject: 'Chemistry Laboratory', faculty: 'Lead Chemist', passRate: 92, avgScore: 80, batches: 3 },
      ],
      batchesList: [
        { id: 'NEW-01', name: 'Elite Foundation Batch A', teacher: 'Lead Senior Faculty', room: 'Hall 101', students: 60, time: '08:30 AM - 11:30 AM', syllabusPct: 20, status: 'In Session' }
      ]
    };

    setIsSubmitted(true);
    setTimeout(() => {
      onSaveInstitute(newInstitute);
    }, 900);
  };

  const steps = [
    { num: 1, title: 'Identity & Academics', desc: 'Brand, Boards, Type' },
    { num: 2, title: 'Campus & Facilities', desc: 'Address, Labs, Tech' },
    { num: 3, title: 'Leadership & Staff', desc: 'Director, Dean, HR' },
    { num: 4, title: 'Tax & Bank Compliance', desc: 'GSTIN, PAN, Account' },
    { num: 5, title: 'Cloud ERP Allocation', desc: 'Package, Storage, Seats' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto pb-16">
      
      {/* Return Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button 
          onClick={onBack}
          className="flex items-center text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2 rounded-xl transition-colors w-fit shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          ← Back to All Institutes Directory
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">Draft Status:</span>
          <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            ● Ready for Provisioning
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900">
                Register & Provision New Coaching Campus
              </h1>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Multi-Tenant Onboarding
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Complete institutional registration dossier. Submitting this form deploys a dedicated database shard, provisions administrator credentials, sets up biometric attendance telemetry, and binds the GST invoicing ledger.
            </p>
          </div>
        </div>

        {/* Step Wizard Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {steps.map(s => {
            const isDone = activeStep > s.num;
            const isCurrent = activeStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(s.num)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isCurrent 
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-xs' 
                    : isDone 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>Step {s.num}</span>
                  {isDone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-2 h-2 rounded-full bg-current opacity-40"></span>}
                </div>
                <div className="font-semibold text-xs text-slate-900 truncate">{s.title}</div>
                <div className="text-[10px] text-slate-500 truncate">{s.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Multi-Step Form (Light Theme) */}
      <form onSubmit={handleFinalSubmit} className="space-y-6">
        
        {/* STEP 1: Basic Identity */}
        {activeStep === 1 && (
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-indigo-600" />
                Step 1: Institutional Identity & Academic Streams
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Enter legal business names, affiliations, and educational focus</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Registered Institute Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Apex Global Academy of Sciences & Competitive Coaching"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Brand / Trade Display Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Apex Academy"
                  value={formData.tradeName}
                  onChange={(e) => handleChange('tradeName', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Branch Code / Acronym (3-4 Letters)</label>
                <input 
                  type="text"
                  placeholder="e.g. APEX-BOS"
                  value={formData.shortCode}
                  onChange={(e) => handleChange('shortCode', e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all uppercase placeholder:text-slate-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Motto / Tagline</label>
                <input 
                  type="text"
                  placeholder="e.g. Empowering Top 100 All-India Ranks Since 2018"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Founded / Established Year</label>
                <input 
                  type="number"
                  placeholder="2024"
                  value={formData.establishedYear}
                  onChange={(e) => handleChange('establishedYear', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Delivery Model</label>
                <select 
                  value={formData.instituteType}
                  onChange={(e) => handleChange('instituteType', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 cursor-pointer"
                >
                  <option>Hybrid Coaching (Offline + Online Recorded)</option>
                  <option>100% In-Person Physical Center</option>
                  <option>Virtual Academy (Pure Cloud Zoom/WebRTC)</option>
                  <option>Residential Gurukul / Boarding Coaching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Official Campus Website URL</label>
                <input 
                  type="url"
                  placeholder="https://www.apexacademy.edu"
                  value={formData.websiteUrl}
                  onChange={(e) => handleChange('websiteUrl', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Target Stream</label>
                <select 
                  value={formData.primaryStream}
                  onChange={(e) => handleChange('primaryStream', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 cursor-pointer"
                >
                  <option>Engineering & Medical (IIT-JEE / NEET)</option>
                  <option>Commerce, CA Foundation, CS & CMA</option>
                  <option>Civil Services & UPSC / State PSC</option>
                  <option>Law Entrance (CLAT, AILET, LSAT)</option>
                  <option>K-12 Foundation Olympiads (NTSE, KVPY)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">Curriculum / Competitive Exams Prepared Here</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['IIT-JEE Advanced', 'NEET-UG', 'CBSE Class 12', 'Foundation K-10', 'CA Foundation', 'CLAT Law', 'SAT / ACT Abroad', 'State Board'].map(exam => (
                  <label key={exam} className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:border-indigo-300">
                    <input 
                      type="checkbox"
                      checked={formData.targetExams.includes(exam)}
                      onChange={() => handleCheckboxToggle(exam)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{exam}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="button" 
                onClick={() => setActiveStep(2)}
                className="gradient-brand text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-500/20 hover:opacity-95"
              >
                Continue to Campus & Facilities →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Physical Campus */}
        {activeStep === 2 && (
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                Step 2: Campus Infrastructure, Labs & Hardware Telemetry
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Physical campus footprint, lecture hall capacities, and smart classroom tech</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Building No, Street, Campus Landmark *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Apex Tower, 45 Knowledge Park 3, Tech Hub Boulevard"
                  value={formData.addressLine1}
                  onChange={(e) => handleChange('addressLine1', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">City / Metropolitan Area *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Boston"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">State / Province</label>
                <input 
                  type="text"
                  placeholder="e.g. Massachusetts"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Zip / Postal Code</label>
                <input 
                  type="text"
                  placeholder="e.g. 02115"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Total Physical Classrooms</label>
                <input 
                  type="number"
                  placeholder="18"
                  value={formData.totalClassrooms}
                  onChange={(e) => handleChange('totalClassrooms', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Laboratories Available</label>
                <input 
                  type="text"
                  placeholder="Physics, Chem & Bio Simulation Labs"
                  value={formData.labCount}
                  onChange={(e) => handleChange('labCount', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Reading Room & Library Capacity</label>
                <input 
                  type="text"
                  placeholder="120 Reading Desks"
                  value={formData.libraryCapacity}
                  onChange={(e) => handleChange('libraryCapacity', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Biometric Turnstiles Integration</label>
                <select 
                  value={formData.biometricInstalled}
                  onChange={(e) => handleChange('biometricInstalled', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 cursor-pointer"
                >
                  <option>Yes - Facial Recognition + RFID Card Punch</option>
                  <option>Yes - Fingerprint Biometric Device</option>
                  <option>Manual App-based QR Attendance</option>
                  <option>None (To be provisioned later)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Interactive Smart Boards</label>
                <input 
                  type="text"
                  placeholder="14 ViewSonic / Maxhub 75' Panels"
                  value={formData.smartBoardsInstalled}
                  onChange={(e) => handleChange('smartBoardsInstalled', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setActiveStep(1)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
              >
                ← Back
              </button>
              <button 
                type="button" 
                onClick={() => setActiveStep(3)}
                className="gradient-brand text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-500/20 hover:opacity-95"
              >
                Continue to Leadership & Staff →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Leadership & Staff */}
        {activeStep === 3 && (
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-indigo-600" />
                Step 3: Campus Leadership & Administrative Heads
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Contact coordinates for the institute director, academic dean, and accounts lead</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Director / Founder Full Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Dr. Arthur Pendelton"
                  value={formData.directorName}
                  onChange={(e) => handleChange('directorName', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Highest Academic Degree</label>
                <input 
                  type="text"
                  placeholder="e.g. Ph.D. in Theoretical Physics, MIT"
                  value={formData.directorQualification}
                  onChange={(e) => handleChange('directorQualification', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Director Direct Phone *</label>
                <input 
                  type="tel"
                  required
                  placeholder="+1 (555) 345-6789"
                  value={formData.directorPhone}
                  onChange={(e) => handleChange('directorPhone', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">WhatsApp Priority Alert Number</label>
                <input 
                  type="tel"
                  placeholder="+1 (555) 345-6789"
                  value={formData.directorWhatsapp}
                  onChange={(e) => handleChange('directorWhatsapp', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Official Campus Email *</label>
                <input 
                  type="email"
                  required
                  placeholder="director@apexacademy.edu"
                  value={formData.directorEmail}
                  onChange={(e) => handleChange('directorEmail', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Head of Academics / Principal</label>
                <input 
                  type="text"
                  placeholder="e.g. Prof. Sarah Jenkins"
                  value={formData.headOfAcademics}
                  onChange={(e) => handleChange('headOfAcademics', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Accounts & Billing Manager</label>
                <input 
                  type="text"
                  placeholder="e.g. Michael Vance, CPA"
                  value={formData.accountantName}
                  onChange={(e) => handleChange('accountantName', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Accounts Contact Email</label>
                <input 
                  type="email"
                  placeholder="finance@apexacademy.edu"
                  value={formData.accountantEmail}
                  onChange={(e) => handleChange('accountantEmail', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setActiveStep(2)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
              >
                ← Back
              </button>
              <button 
                type="button" 
                onClick={() => setActiveStep(4)}
                className="gradient-brand text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-500/20 hover:opacity-95"
              >
                Continue to Tax & Bank Compliance →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Legal & Bank */}
        {activeStep === 4 && (
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                Step 4: GST Compliance, Incorporation & Fee Settlement Bank Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Required for automated GST invoice generation and student online fee disbursement</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">GSTIN Identification Number *</label>
                <input 
                  type="text"
                  placeholder="e.g. 27AABCV8901M1Z4"
                  value={formData.gstinNumber}
                  onChange={(e) => handleChange('gstinNumber', e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Corporate Reg. No / CIN / Society No</label>
                <input 
                  type="text"
                  placeholder="e.g. U80902MA2024PTC182910"
                  value={formData.cinNumber}
                  onChange={(e) => handleChange('cinNumber', e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Entity PAN / Federal Tax ID</label>
                <input 
                  type="text"
                  placeholder="e.g. AABCV8901M"
                  value={formData.panNumber}
                  onChange={(e) => handleChange('panNumber', e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Registered Legal Entity Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Apex Educational Services LLP"
                  value={formData.registeredEntityName}
                  onChange={(e) => handleChange('registeredEntityName', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Settlement Bank Name</label>
                <input 
                  type="text"
                  placeholder="e.g. JPMorgan Chase Bank / HDFC Bank"
                  value={formData.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Account Number</label>
                <input 
                  type="password"
                  placeholder="••••••••••••9482"
                  value={formData.bankAccountNumber}
                  onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">IFSC / SWIFT / Routing Code</label>
                <input 
                  type="text"
                  placeholder="e.g. CHASUS33XXX"
                  value={formData.bankIfscCode}
                  onChange={(e) => handleChange('bankIfscCode', e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Non-Profit 80G / 12A Tax Exempt Status</label>
                <select 
                  value={formData.taxExemption80G}
                  onChange={(e) => handleChange('taxExemption80G', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 cursor-pointer"
                >
                  <option value="No">No - Standard Commercial Coaching Entity (18% GST Applicable)</option>
                  <option value="Yes">Yes - Registered Trust / Society (Exempt)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setActiveStep(3)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
              >
                ← Back
              </button>
              <button 
                type="button" 
                onClick={() => setActiveStep(5)}
                className="gradient-brand text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-500/20 hover:opacity-95"
              >
                Continue to Cloud ERP Allocation →
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Cloud ERP */}
        {activeStep === 5 && (
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center">
                <Database className="w-5 h-5 mr-2 text-indigo-600" />
                Step 5: Cloud Shard Provisioning, Quotas & Master Credentials
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Configure software limits, storage allocation, and super admin initial credentials</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">ERP Subscription Tier</label>
                <select 
                  value={formData.packageTier}
                  onChange={(e) => handleChange('packageTier', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 cursor-pointer font-semibold"
                >
                  <option value="Enterprise Max">Enterprise Max (Unlimited Live Streaming + Full White-label)</option>
                  <option value="Pro Academy">Pro Academy (Up to 1,500 Students + Automated Dunning)</option>
                  <option value="Growth Tier">Growth Tier (Up to 800 Students + Standard Support)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Billing Contract Terms</label>
                <select 
                  value={formData.billingFrequency}
                  onChange={(e) => handleChange('billingFrequency', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 cursor-pointer"
                >
                  <option value="Annual">Annual Pre-paid (Includes 2 Months Free)</option>
                  <option value="Multi-Year (3 Yrs)">Multi-Year Institutional Lock-in (3 Yrs)</option>
                  <option value="Quarterly">Quarterly Milestone Billing</option>
                  <option value="Monthly">Monthly Retainer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Max Student Seat Capacity</label>
                <input 
                  type="number"
                  value={formData.studentCapacity}
                  onChange={(e) => handleChange('studentCapacity', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Cloud Storage Limit (Video & PDFs)</label>
                <select 
                  value={formData.allocatedStorageGB}
                  onChange={(e) => handleChange('allocatedStorageGB', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 cursor-pointer"
                >
                  <option value="250">250 GB CDN High-Speed Storage</option>
                  <option value="500">500 GB CDN High-Speed Storage</option>
                  <option value="1000">1 TB (1000 GB) Dedicated Object Storage</option>
                  <option value="100">100 GB Standard Storage</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Monthly SMS & WhatsApp Credit Allocation</label>
                <input 
                  type="number"
                  value={formData.monthlySmsCredits}
                  onChange={(e) => handleChange('monthlySmsCredits', e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Custom Portal Subdomain</label>
                <div className="flex items-center">
                  <input 
                    type="text"
                    placeholder="apex-boston"
                    value={formData.subdomainPrefix}
                    onChange={(e) => handleChange('subdomainPrefix', e.target.value.toLowerCase())}
                    className="w-full bg-white border border-slate-300 text-slate-900 rounded-l-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 font-mono transition-all"
                  />
                  <span className="bg-slate-100 border border-l-0 border-slate-300 text-slate-600 text-xs px-3 py-3 rounded-r-xl font-mono">
                    .eduzenith.cloud
                  </span>
                </div>
              </div>
            </div>

            {/* Generated Credentials Summary */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <p className="text-xs font-bold text-indigo-900 flex items-center">
                  <Lock className="w-3.5 h-3.5 mr-1.5 text-indigo-700" /> Campus Head Administrator Login (Initial Master Account)
                </p>
                <p className="text-xs text-slate-700 mt-1 font-mono">
                  Username: <strong className="text-slate-900">{formData.directorEmail || 'admin@campus.edu'}</strong> | Default Temp Password: <strong className="text-emerald-700 font-mono">{formData.adminInitialPassword}</strong>
                </p>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full w-fit">
                Auto-Issued by Super Admin
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setActiveStep(4)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 w-full sm:w-auto"
              >
                ← Back to Tax Compliance
              </button>
              
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button 
                  type="button"
                  onClick={onBack}
                  className="px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitted}
                  className="gradient-brand text-white font-extrabold text-xs px-8 py-3 rounded-xl shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all flex items-center justify-center w-full sm:w-auto"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2 animate-spin text-white" />
                      Provisioning Campus Shard...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Submit & Deploy Institute Cluster
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}

      </form>

    </div>
  );
}
