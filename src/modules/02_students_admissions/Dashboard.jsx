import React, { useState, useMemo } from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { STUDENTS_DATA, INSTITUTES_DATA } from '../../data/erpData';

export default function StudentsDashboard({ instituteCode = 'ALL', onNavigate }) {
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  // Filter students based on current scope
  const targetStudents = useMemo(() => {
    if (!instituteCode || instituteCode === 'ALL') return STUDENTS_DATA;
    return STUDENTS_DATA.filter(s => s.instituteCode === instituteCode);
  }, [instituteCode]);

  // Aggregate metrics
  const stats = useMemo(() => {
    const total = targetStudents.length;
    const paid = targetStudents.filter(s => s.feeStatus === 'Paid').length;
    const defaulters = targetStudents.filter(s => s.feeStatus === 'Defaulter').length;
    const appActive = targetStudents.filter(s => s.appStatus === 'Active').length;
    const facialEnrolled = targetStudents.filter(s => s.facialVerified).length;
    const kitsIssued = targetStudents.filter(s => s.admissionKitReceived).length;
    const booksIssued = targetStudents.filter(s => s.bookSetReceived).length;
    const ptmSigned = targetStudents.filter(s => s.reportApproved).length;

    const totalFeesCollected = targetStudents.reduce((acc, s) => acc + (s.feePaid || 0), 0);
    const totalFeesPending = targetStudents.reduce((acc, s) => acc + (s.feePending || 0), 0);
    const avgAttendance = total > 0
      ? (targetStudents.reduce((acc, s) => acc + s.attendanceRate, 0) / total).toFixed(1)
      : '95.2';

    return {
      total,
      paid,
      defaulters,
      appActive,
      facialEnrolled,
      kitsIssued,
      booksIssued,
      ptmSigned,
      totalFeesCollected,
      totalFeesPending,
      avgAttendance
    };
  }, [targetStudents]);

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Enrolled Student Roster"
          value={`${stats.total.toLocaleString()} Students`}
          subtitle="4,710 Enterprise Active"
          icon="🎓"
          trend="+14.2% MoM"
          badge="100% KYC Verified"
        />
        <KPICard
          theme="emerald"
          title="Mobile App & Parent Link"
          value={`${stats.appActive} Active`}
          subtitle={`${Math.round((stats.appActive / (stats.total || 1)) * 100)}% Parent Ecosystem`}
          icon="📱"
          trend="+9.4%"
          badge="Daily Active"
        />
        <KPICard
          theme="amber"
          title="Fees Cleared & Flow"
          value={`$${(stats.totalFeesCollected / 1000).toFixed(0)}k Collected`}
          subtitle={`Pending Dues: $${(stats.totalFeesPending / 1000).toFixed(0)}k`}
          icon="💳"
          badge={`${stats.paid} Paid in Full`}
        />
        <KPICard
          theme="rose"
          title="Biometric & Kits Handed"
          value={`${stats.kitsIssued} Kits Issued`}
          subtitle={`${stats.booksIssued} Book Sets • ${stats.facialEnrolled} Faces`}
          icon="📦"
          badge="Deliverables"
        />
      </div>

      {/* Real-time Telemetry Ribbon (8 Critical Indicators) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">New Admissions</div>
          <div className="text-base font-black text-blue-600 mt-0.5">+48 This Mo</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Starter Kits</div>
          <div className="text-base font-black text-emerald-600 mt-0.5">{stats.kitsIssued} Handed</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Book Sets</div>
          <div className="text-base font-black text-indigo-600 mt-0.5">{stats.booksIssued} Issued</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">HW Completion</div>
          <div className="text-base font-black text-slate-800 mt-0.5">96.4% Avg</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Tests Held</div>
          <div className="text-base font-black text-amber-600 mt-0.5">4 Major Mock</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">PTM Attended</div>
          <div className="text-base font-black text-purple-600 mt-0.5">94.8% Signed</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Teacher Rating</div>
          <div className="text-base font-black text-emerald-600 mt-0.5">⭐ 4.88 / 5</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Dropout Rate</div>
          <div className="text-base font-black text-slate-700 mt-0.5">0.8% Low</div>
        </div>
      </div>

      {/* Main Grid: Student Roster & Onboarding Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Student Roster & Onboarding Journey */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>🎓</span> Live Student Master Roster & Deliverables Status
                </h3>
                <p className="text-xs text-slate-500">Click any student to view complete 360° admission dossier, parent KYC, books & test marks</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('student_master')}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100 transition"
              >
                Full Student Master ➔
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Student & Roll No</th>
                    <th className="py-3 px-4">Batch & Target Exam</th>
                    <th className="py-3 px-4">Parent Contact</th>
                    <th className="py-3 px-4">Books & Kit</th>
                    <th className="py-3 px-4">Attendance</th>
                    <th className="py-3 px-4 text-right">Fee Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {targetStudents.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedStudentModal(s)}
                      className="hover:bg-blue-50/50 cursor-pointer transition"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-2xs"
                          />
                          <div>
                            <div className="font-bold text-slate-900 hover:text-blue-600 transition">{s.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{s.id} • {s.rollNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{s.batchName}</div>
                        <div className="text-[11px] text-blue-600 font-medium">{s.targetExam}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800">{s.parentName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{s.parentPhone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span
                            className={`px-1.5 py-0.5 rounded font-bold ${
                              s.bookSetReceived ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {s.bookSetReceived ? '📚 Books: Yes' : '📚 Books: No'}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded font-bold ${
                              s.admissionKitReceived ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {s.admissionKitReceived ? '🎒 Kit: Yes' : '🎒 Kit: Pending'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">
                        <span className={`px-2 py-0.5 rounded-md text-[11px] ${
                          s.attendanceRate >= 95 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {s.attendanceRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                            s.feeStatus === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : s.feeStatus === 'Partial'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {s.feeStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Admission & Onboarding Lifecycle Stepper */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Standard 5-Step Admission & Mobile Setup Flow</h3>
                <p className="text-xs text-slate-500">Walk-in Inquiry ➔ Diagnostic Test ➔ Fee & Kit Handover ➔ Biometric AI ➔ Parent App Linked</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
                Automated Pipeline
              </span>
            </div>
            <div className="py-2">
              <ApprovalFlowStepper currentStage={4} />
            </div>
          </div>

          {/* Admission Trends Trajectory Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Student Intake & Enrollment Velocity</h3>
                <p className="text-xs text-slate-500">New confirmed admissions across active tuition centers</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                +24.6% Admissions Beat
              </span>
            </div>
            <TrendAnalyticsChart
              data={[
                { label: 'May', value: 120 },
                { label: 'Jun', value: 210 },
                { label: 'Jul', value: 280 },
                { label: 'Aug', value: 195 },
                { label: 'Sep', value: 240 },
                { label: 'Oct', value: 310 },
              ]}
              color="#6366f1"
            />
          </div>
        </div>

        {/* Right Column: Fees Flow, Book Sets, Target Exam Breakdown */}
        <div className="space-y-6">
          {/* Fees Inflow & Deliverables Widget */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <span>💰</span> Fees Flow & Deliverables
              </h4>
              <span className="text-[11px] font-bold text-blue-600">Realized 94%</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-[11px] font-bold text-emerald-900">Total Fees Cleared</div>
                  <div className="text-[10px] text-emerald-700">Online & Bank Wire</div>
                </div>
                <div className="text-sm font-black text-emerald-800 font-mono">
                  ${(stats.totalFeesCollected / 1000).toFixed(0)}k
                </div>
              </div>

              <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-[11px] font-bold text-rose-900">Defaulter Receivables</div>
                  <div className="text-[10px] text-rose-700">{stats.defaulters} Pending Followup</div>
                </div>
                <div className="text-sm font-black text-rose-800 font-mono">
                  ${(stats.totalFeesPending / 1000).toFixed(0)}k
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-[11px] font-bold text-blue-900">Starter Kits Handed Out</div>
                  <div className="text-[10px] text-blue-700">Bags, ID Cards, Notebooks</div>
                </div>
                <div className="text-sm font-black text-blue-800 font-mono">
                  {stats.kitsIssued} Kits
                </div>
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-[11px] font-bold text-indigo-900">Complete Book Sets Issued</div>
                  <div className="text-[10px] text-indigo-700">Volume 1 to 4 Modules</div>
                </div>
                <div className="text-sm font-black text-indigo-800 font-mono">
                  {stats.booksIssued} Sets
                </div>
              </div>
            </div>
          </div>

          {/* Student Flow Funnel (Came vs Left) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <span>🔄</span> Net Student Inflow & Retention
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Total Admissions Joined</span>
                <span className="font-bold text-emerald-600 font-mono">+1,482 Students</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Relocations / Dropouts</span>
                <span className="font-bold text-rose-600 font-mono">-12 Students</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Net Retained Roster</span>
                <span className="font-bold text-slate-900 font-mono">1,470 (99.2%)</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-600">Parent PTM Approval Ratio</span>
                <span className="font-bold text-blue-600 font-mono">98.4% Signed</span>
              </div>
            </div>
          </div>

          {/* Target Exam Focus Distribution */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-slate-800 mb-1">Target Exam Breakdown</h4>
            <p className="text-xs text-slate-500">Student enrollment by competitive stream</p>
            <ComplianceBarChart
              data={[
                { label: 'IIT-JEE Adv', value: 1450 },
                { label: 'NEET Medical', value: 1120 },
                { label: 'CA Foundation', value: 920 },
                { label: 'AI & Coding', value: 640 },
                { label: 'CLAT & Law', value: 580 },
              ]}
              color="#3b82f6"
            />
          </div>
        </div>
      </div>

      {/* 360° Comprehensive Student Profile Modal (When clicking any student) */}
      {selectedStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <img
                  src={selectedStudentModal.avatar}
                  alt={selectedStudentModal.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">{selectedStudentModal.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {selectedStudentModal.rollNo}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      selectedStudentModal.feeStatus === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      Fee: {selectedStudentModal.feeStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedStudentModal.instituteName} • {selectedStudentModal.batchName} ({selectedStudentModal.grade})
                  </p>
                  <p className="text-xs text-blue-600 font-bold mt-0.5">
                    Target Goal: {selectedStudentModal.targetExam}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Grid 1: Personal, Parent & Legal KYC Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="text-[10px] font-bold uppercase text-slate-400">Personal & Identity</div>
                <div className="text-slate-800">DOB: <strong>{selectedStudentModal.dob}</strong></div>
                <div className="text-slate-800">Gender / Blood: <strong>{selectedStudentModal.gender} • {selectedStudentModal.bloodGroup}</strong></div>
                <div className="text-slate-800">Aadhaar/ID: <span className="font-mono">{selectedStudentModal.aadhaarNumber}</span></div>
                <div className="text-slate-600 text-[11px] pt-1">Address: {selectedStudentModal.address}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="text-[10px] font-bold uppercase text-slate-400">Guardian & Parent Dossier</div>
                <div className="font-bold text-slate-900">{selectedStudentModal.parentName}</div>
                <div className="text-slate-600">Occupation: {selectedStudentModal.parentOccupation}</div>
                <div className="text-slate-700 font-mono">Phone: {selectedStudentModal.parentPhone}</div>
                <div className="text-slate-700 font-mono">Email: {selectedStudentModal.parentEmail}</div>
                <div className="text-rose-600 font-semibold text-[11px]">Emergency: {selectedStudentModal.emergencyContact}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="text-[10px] font-bold uppercase text-slate-400">Fees Record & Receipts</div>
                <div className="flex justify-between text-slate-700">
                  <span>Total Course Fee:</span>
                  <span className="font-mono font-bold">${selectedStudentModal.courseFeeTotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Amount Cleared:</span>
                  <span className="font-mono font-bold">${selectedStudentModal.feePaid?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-700">
                  <span>Balance Due:</span>
                  <span className="font-mono font-bold">${selectedStudentModal.feePending?.toLocaleString()}</span>
                </div>
                <div className="pt-1 text-[11px] text-slate-500">
                  Method: {selectedStudentModal.paymentMethod} • {selectedStudentModal.installmentsCleared}
                </div>
              </div>
            </div>

            {/* Grid 2: Physical Deliverables (Kit & Book Set) */}
            <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
              <h4 className="font-bold text-xs text-blue-900 mb-2">Physical Deliverables & Dispatch Tracking</h4>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-blue-200">
                  <div className="text-[10px] text-slate-500">Admission Starter Kit</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {selectedStudentModal.admissionKitReceived ? '✅ Handed to Student' : '⏳ Pending Issue'}
                  </div>
                  <div className="text-[10px] text-slate-400">{selectedStudentModal.kitDispatchDate}</div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-blue-200">
                  <div className="text-[10px] text-slate-500">Study Material Book Set</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {selectedStudentModal.bookSetReceived ? '✅ Modules Received' : '⏳ Withheld / Pending'}
                  </div>
                  <div className="text-[10px] text-slate-400">{selectedStudentModal.bookSetVolume}</div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-blue-200">
                  <div className="text-[10px] text-slate-500">Uniform & Crest Blazer</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {selectedStudentModal.uniformKitReceived ? '✅ Issued & Tailored' : '⏳ Pending Sizing'}
                  </div>
                  <div className="text-[10px] text-slate-400">Campus Standard Kit</div>
                </div>
              </div>
            </div>

            {/* Grid 3: Subject-wise Faculty Teaching Him */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-xs text-slate-900">Subject-wise Faculty Assigned to Student</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-200">
                    <tr>
                      <th className="py-2">Subject</th>
                      <th className="py-2">Teacher Name</th>
                      <th className="py-2">Weekly Hours</th>
                      <th className="py-2 text-right">Student Rating Given</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedStudentModal.subjectsTaught?.map((sub, i) => (
                      <tr key={i}>
                        <td className="py-2 font-bold text-slate-800">{sub.subject}</td>
                        <td className="py-2 font-semibold text-slate-700">{sub.teacher}</td>
                        <td className="py-2 font-mono text-slate-600">{sub.hoursPerWeek} hrs / week</td>
                        <td className="py-2 text-right font-bold text-amber-600">⭐ {sub.feedbackScore} / 5.0</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grid 4: Homework & Exam Test Marks Record */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-xs text-slate-900">Homework & Exam Test Performance Record</h4>
                <span className="text-[11px] font-bold text-blue-600">
                  HW Submission Rate: {selectedStudentModal.hwSubmissionRate}%
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-200">
                    <tr>
                      <th className="py-2">Test Name</th>
                      <th className="py-2">Date Held</th>
                      <th className="py-2">Score Obtained</th>
                      <th className="py-2">Percentile</th>
                      <th className="py-2 text-right">Rank Achieved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedStudentModal.testMarksRecord?.map((test, i) => (
                      <tr key={i}>
                        <td className="py-2 font-bold text-slate-800">{test.testName}</td>
                        <td className="py-2 text-slate-500 font-mono text-[11px]">{test.date}</td>
                        <td className="py-2 font-mono font-bold text-blue-600">{test.score}</td>
                        <td className="py-2 font-mono font-semibold text-emerald-600">{test.percentile}</td>
                        <td className="py-2 text-right font-bold text-slate-800">{test.rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grid 5: PTM Record, Monthly Report Approval & Student Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5">
                <div className="text-[10px] font-bold uppercase text-emerald-800">PTM & Monthly Progress Report</div>
                <div className="text-slate-800">Last PTM Date: <strong>{selectedStudentModal.lastPtmDate}</strong></div>
                <div className="text-slate-700">Remarks: <em>"{selectedStudentModal.parentMeetingRemarks}"</em></div>
                <div className="pt-1 text-emerald-800 font-bold flex items-center gap-1">
                  <span>✓</span> Parent Sign-off in App: {selectedStudentModal.reportApproved ? 'Approved & Signed' : 'Pending Signature'}
                </div>
              </div>

              <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1.5">
                <div className="text-[10px] font-bold uppercase text-indigo-800">Student & Parent Feedback on Teachers</div>
                <div className="flex items-center gap-1 font-bold text-amber-600">
                  Overall Rating: ⭐ {selectedStudentModal.teacherFeedbackRating} / 5.0
                </div>
                <div className="text-slate-700 italic">
                  "{selectedStudentModal.studentAppRemarks}"
                </div>
                <div className="text-[10px] text-slate-500 pt-1">
                  Submitted via Zenith Student Mobile App v2.4
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedStudentModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
              >
                Close Profile
              </button>
              <button
                onClick={() => {
                  alert(`Admission Form PDF exported for ${selectedStudentModal.name}`);
                  setSelectedStudentModal(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition flex items-center gap-1.5"
              >
                <span>🖨️</span> Print Official Admission Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
