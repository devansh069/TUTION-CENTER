import React, { useState, useMemo } from 'react';
import KPICard from '../../components/common/KPICard';
import { STUDENTS_DATA } from '../../data/erpData';

export default function StudentMaster({ instituteCode = 'ALL' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [feeFilter, setFeeFilter] = useState('ALL');
  const [deliverableFilter, setDeliverableFilter] = useState('ALL');
  const [activeDossierModal, setActiveDossierModal] = useState(null);

  // Filter logic
  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((s) => {
      const matchScope = instituteCode === 'ALL' || s.instituteCode === instituteCode;
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.batchName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.parentPhone?.includes(searchTerm);
      const matchFee = feeFilter === 'ALL' || s.feeStatus === feeFilter;
      const matchDeliverable =
        deliverableFilter === 'ALL'
          ? true
          : deliverableFilter === 'BOOKS_YES'
          ? s.bookSetReceived
          : deliverableFilter === 'BOOKS_NO'
          ? !s.bookSetReceived
          : deliverableFilter === 'KIT_YES'
          ? s.admissionKitReceived
          : !s.admissionKitReceived;

      return matchScope && matchSearch && matchFee && matchDeliverable;
    });
  }, [instituteCode, searchTerm, feeFilter, deliverableFilter]);

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Total Student Records"
          value={`${filteredStudents.length} Active`}
          subtitle="Master Database Archive"
          icon="🎓"
          badge="100% KYC Complete"
        />
        <KPICard
          theme="emerald"
          title="Attendance Fidelity"
          value="95.8% Avg"
          subtitle="Facial AI Gate Verifications"
          icon="📸"
          badge="High Punctuality"
        />
        <KPICard
          theme="amber"
          title="Fee Clearances"
          value="91.4% Collected"
          subtitle="Realized Inflow Run-rate"
          icon="💳"
          badge="Auto-Reminders"
        />
        <KPICard
          theme="rose"
          title="Deliverables Dispatch"
          value="96.2% Handed"
          subtitle="Books, Starter Kits & Uniforms"
          icon="📦"
          badge="Tracked"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search student by name, ID, roll no, parent, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={feeFilter}
            onChange={(e) => setFeeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Fee Status</option>
            <option value="Paid">Paid Only</option>
            <option value="Partial">Partial Dues</option>
            <option value="Defaulter">Defaulters</option>
          </select>

          <select
            value={deliverableFilter}
            onChange={(e) => setDeliverableFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Deliverables</option>
            <option value="BOOKS_YES">Book Set Issued (Yes)</option>
            <option value="BOOKS_NO">Book Set Pending (No)</option>
            <option value="KIT_YES">Starter Kit Issued</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            Showing <strong className="text-slate-800">{filteredStudents.length}</strong> Records
          </span>
          <button 
            onClick={() => alert("New Student Admission Form wizard opened.")}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5"
          >
            <span>+</span> Direct Admission Form
          </button>
        </div>
      </div>

      {/* Student Master Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Student & Roll No</th>
                <th className="py-3 px-4">Campus & Batch</th>
                <th className="py-3 px-4">Guardian & Contact</th>
                <th className="py-3 px-4">Assigned Teachers</th>
                <th className="py-3 px-4">Deliverables</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Fee Record</th>
                <th className="py-3 px-4 text-right">360° Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-2xs"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-[11px] text-blue-600 font-mono font-semibold">
                          {s.id} • {s.rollNo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{s.instituteName}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{s.batchName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{s.parentName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{s.parentPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-[11px]">
                    <div className="text-slate-700 font-semibold">
                      {s.subjectsTaught?.[0]?.teacher || 'Dr. Harrison'} (Lead)
                    </div>
                    <div className="text-slate-400">+{s.subjectsTaught?.length - 1} Faculty Members</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5 text-[10px]">
                      <div>
                        <span className={`px-1.5 py-0.2 rounded font-bold ${
                          s.admissionKitReceived ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                        }`}>
                          🎒 Kit: {s.admissionKitReceived ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div>
                        <span className={`px-1.5 py-0.2 rounded font-bold ${
                          s.bookSetReceived ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          📚 Books: {s.bookSetReceived ? 'Yes' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <div className="font-bold text-slate-800">{s.attendanceRate}%</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      {s.facialVerified ? 'Face Verified' : 'Photo Pending'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-slate-900">${s.feePaid?.toLocaleString()}</div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
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
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setActiveDossierModal(s)}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-bold transition"
                    >
                      Full Dossier 🔍
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Admission Form & 360° Profile Modal */}
      {activeDossierModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <img
                  src={activeDossierModal.avatar}
                  alt={activeDossierModal.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">{activeDossierModal.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      Roll: {activeDossierModal.rollNo}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      ID: {activeDossierModal.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {activeDossierModal.instituteName} • {activeDossierModal.batchName} ({activeDossierModal.grade})
                  </p>
                  <p className="text-xs text-blue-600 font-bold mt-0.5">
                    Target Competitive Goal: {activeDossierModal.targetExam}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveDossierModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Official Admission Form Layout */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                Section 1: Verified Candidate & Guardian KYC Dossier
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Date of Birth:</span>
                  <div className="font-bold text-slate-900">{activeDossierModal.dob}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Gender & Blood:</span>
                  <div className="font-bold text-slate-900">{activeDossierModal.gender} ({activeDossierModal.bloodGroup})</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Aadhaar / Govt ID:</span>
                  <div className="font-bold text-slate-900 font-mono">{activeDossierModal.aadhaarNumber}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Admission Date:</span>
                  <div className="font-bold text-slate-900">{activeDossierModal.admissionDate}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-200/70">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Father / Guardian:</span>
                  <div className="font-bold text-slate-900">{activeDossierModal.parentName}</div>
                  <div className="text-[11px] text-slate-500">{activeDossierModal.parentOccupation}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Mother:</span>
                  <div className="font-bold text-slate-900">{activeDossierModal.motherName}</div>
                  <div className="text-[11px] text-slate-500">{activeDossierModal.motherOccupation}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Contacts:</span>
                  <div className="font-mono font-bold text-slate-800">{activeDossierModal.parentPhone}</div>
                  <div className="font-mono text-slate-500 text-[11px]">{activeDossierModal.parentEmail}</div>
                </div>
              </div>
            </div>

            {/* Section 2: Financial Ledger & Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="font-bold text-emerald-900 uppercase text-[10px] border-b border-emerald-200 pb-1">
                  Section 2: Fee Ledger & Invoicing Record
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-800">Total Course Fee:</span>
                  <span className="font-mono font-bold text-emerald-950">${activeDossierModal.courseFeeTotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-800">Amount Cleared:</span>
                  <span className="font-mono font-bold text-emerald-700">${activeDossierModal.feePaid?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-800">Pending Receivables:</span>
                  <span className="font-mono font-bold text-rose-600">${activeDossierModal.feePending?.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-emerald-700 pt-1">
                  Payment: {activeDossierModal.paymentMethod} • Last: {activeDossierModal.lastPaymentDate}
                </div>
              </div>

              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                <div className="font-bold text-blue-900 uppercase text-[10px] border-b border-blue-200 pb-1">
                  Section 3: Physical Deliverables Checklist
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Admission Starter Kit:</span>
                  <span className="font-bold text-blue-950">{activeDossierModal.admissionKitReceived ? '✅ Handed Out' : '⏳ Pending'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Complete Book Set:</span>
                  <span className="font-bold text-blue-950">{activeDossierModal.bookSetReceived ? '✅ Modules Received' : '⏳ Pending'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Crest Blazer / Uniform:</span>
                  <span className="font-bold text-blue-950">{activeDossierModal.uniformKitReceived ? '✅ Issued' : '⏳ Pending'}</span>
                </div>
                <div className="text-[11px] text-blue-700 pt-1">
                  Notes: {activeDossierModal.bookSetVolume}
                </div>
              </div>
            </div>

            {/* Section 4: Assigned Subject Teachers */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase text-[10px] border-b border-slate-200 pb-1">
                Section 4: Subject-Wise Faculty Assigned & Workload
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 font-bold border-b border-slate-200 text-[10px] uppercase">
                      <th className="py-1.5">Subject</th>
                      <th className="py-1.5">Faculty Member</th>
                      <th className="py-1.5">Weekly Hours</th>
                      <th className="py-1.5 text-right">Student Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeDossierModal.subjectsTaught?.map((sub, i) => (
                      <tr key={i}>
                        <td className="py-2 font-bold text-slate-900">{sub.subject}</td>
                        <td className="py-2 text-slate-700 font-semibold">{sub.teacher}</td>
                        <td className="py-2 text-slate-600 font-mono">{sub.hoursPerWeek} hrs/wk</td>
                        <td className="py-2 text-right font-bold text-amber-600">⭐ {sub.feedbackScore} / 5.0</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 5: Homework & Exam Test Marks Record */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase text-[10px] border-b border-slate-200 pb-1">
                Section 5: Homework Compliance & Exam Test Marks
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 font-bold border-b border-slate-200 text-[10px] uppercase">
                      <th className="py-1.5">Test Assessment</th>
                      <th className="py-1.5">Date</th>
                      <th className="py-1.5">Marks Obtained</th>
                      <th className="py-1.5">Percentile</th>
                      <th className="py-1.5 text-right">Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeDossierModal.testMarksRecord?.map((test, i) => (
                      <tr key={i}>
                        <td className="py-2 font-bold text-slate-900">{test.testName}</td>
                        <td className="py-2 text-slate-500 font-mono">{test.date}</td>
                        <td className="py-2 font-mono font-bold text-blue-600">{test.score}</td>
                        <td className="py-2 font-mono font-semibold text-emerald-600">{test.percentile}</td>
                        <td className="py-2 text-right font-bold text-slate-800">{test.rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActiveDossierModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  alert(`Official Admission Form exported for ${activeDossierModal.name}`);
                  setActiveDossierModal(null);
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
