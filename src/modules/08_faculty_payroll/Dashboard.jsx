import React, { useState, useMemo } from 'react';
import { 
  Users, DollarSign, Star, AlertTriangle, CheckCircle2, 
  Clock, ArrowRight, ShieldCheck, FileText, Download,
  ExternalLink, Calendar, Filter, Sparkles, Building2,
  ChevronRight, RefreshCw, X
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { 
  getFacultyByInstitute, 
  calculatePayrollSummary, 
  PAYROLL_APPROVAL_PIPELINE 
} from './facultyPayrollData';

export default function Dashboard({ instituteCode = 'all', onNavigate }) {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [activeModal, setActiveModal] = useState(null); // 'sync_info' | 'slip_preview' | 'exempt_modal'
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState(null);

  // Filter faculty by institute
  const faculty = useMemo(() => {
    return getFacultyByInstitute(instituteCode);
  }, [instituteCode]);

  const summary = useMemo(() => {
    return calculatePayrollSummary(faculty);
  }, [faculty]);

  // Faculty with attendance deductions (exceeded leave quota)
  const penalizedFaculty = useMemo(() => {
    return faculty.filter(f => f.excessLeaves > 0);
  }, [faculty]);

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccessMsg(`Attendance & Leave Sync Completed! Audited ${faculty.length} faculty punch logs.`);
      setTimeout(() => setSyncSuccessMsg(null), 4000);
    }, 750);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-w-0">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
              Module 08 • Faculty & Payroll Hub
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> {selectedMonth}
            </span>
            {instituteCode && instituteCode !== 'all' && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded border border-indigo-100">
                  {instituteCode.toUpperCase()} Center Scope
                </span>
              </>
            )}
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 mt-1">
            Faculty Roster & Attendance-Payroll Command Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time biometric attendance sync, automated leave-to-loss-of-pay (LWP) calculations, and monthly salary disbursement ledger.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <button 
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center transition shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 text-indigo-600 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing Punches...' : 'Sync Attendance'}
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('08_faculty_payroll', 'payroll_ledger')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center transition shadow-sm"
          >
            <DollarSign className="w-3.5 h-3.5 mr-1.5" /> View Payroll Ledger
          </button>
        </div>
      </div>

      {/* Sync Success Alert */}
      {syncSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between animate-in fade-in">
          <span className="flex items-center font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" /> {syncSuccessMsg}
          </span>
          <button onClick={() => setSyncSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Teaching Faculty" 
          value={`${summary.totalFaculty} Educators`} 
          subtext={`${summary.avgAttendance}% Avg Attendance Rate`} 
          icon={Users} 
          color="blue" 
          badge="Active Roster" 
        />
        <KPICard 
          title="Net Disbursable Salary" 
          value={`$${Math.round(summary.netDisbursed).toLocaleString()}`} 
          subtext={`Gross: $${summary.grossPayroll.toLocaleString()}`} 
          icon={DollarSign} 
          color="green" 
          badge="Disbursal Ready" 
        />
        <KPICard 
          title="Attendance Pay Cuts (LWP)" 
          value={`-$${Math.round(summary.totalAttendanceDeductions).toLocaleString()}`} 
          subtext={`${summary.facultyWithDeductions} Teachers Exceeded Quota`} 
          icon={AlertTriangle} 
          color="rose" 
          badge="Absenteeism Cuts" 
        />
        <KPICard 
          title="Student App Rating" 
          value={`${summary.avgRating} / 5.0`} 
          subtext="From 11,480 Verified Reviews" 
          icon={Star} 
          color="amber" 
          badge="Exemplary" 
        />
      </div>

      {/* Live Attendance-to-Payroll Sync Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-indigo-50 border border-amber-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading text-sm font-bold text-slate-900">
                  Automated Faculty Attendance & Absenteeism Deduction Policy
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black border border-amber-200">
                  Policy: 26 Working Days Standard
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Teachers receive <strong className="text-slate-800">2 Paid Leaves per month</strong>. Any absences beyond 2 days trigger automated 
                <strong className="text-rose-700"> Loss of Pay (LWP)</strong> deductions calculated as: <code className="px-1.5 py-0.5 bg-white/80 rounded border border-slate-200 font-mono text-[11px] text-slate-800">Monthly Salary ÷ 26 days × Excess Days</code>.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-end lg:self-center">
            <button
              onClick={() => setActiveModal('sync_info')}
              className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100/50 transition flex items-center"
            >
              <FileText className="w-3.5 h-3.5 mr-1 text-amber-700" /> Audit Rule Breakdown
            </button>
          </div>
        </div>

        {/* Flagged Absence Chips */}
        {penalizedFaculty.length > 0 && (
          <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Flagged Absences This Month:
            </span>
            {penalizedFaculty.map(f => (
              <div 
                key={f.id} 
                className="px-2.5 py-1 rounded-lg bg-white/90 border border-rose-200 text-xs flex items-center space-x-2 shadow-2xs"
              >
                <img src={f.photo} alt={f.name} className="w-5 h-5 rounded-full object-cover" />
                <span className="font-bold text-slate-800">{f.name}</span>
                <span className="text-[11px] font-extrabold text-rose-600">
                  +{f.excessLeaves}d LWP (-${f.attendanceSalaryDeduction.toFixed(0)})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two Column: Workflow Stepper & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Payroll Approval Pipeline */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-indigo-600" />
                Monthly Faculty Payroll Approval Pipeline (Cycle: Sep 2026)
              </h3>
              <p className="text-xs text-slate-500">Biometric verification to institutional direct bank ACH disbursal</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Stage 3: HOD Sign-off
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
            {PAYROLL_APPROVAL_PIPELINE.map((pipe) => {
              const isDone = pipe.status === 'completed';
              const isInProgress = pipe.status === 'in-progress';
              return (
                <div 
                  key={pipe.step}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isDone 
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950' 
                      : isInProgress 
                        ? 'bg-indigo-50/60 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs' 
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                      isDone 
                        ? 'bg-emerald-600 text-white' 
                        : isInProgress 
                          ? 'bg-indigo-600 text-white animate-pulse' 
                          : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isDone ? '✓' : pipe.step}
                    </span>
                    <span className="text-[10px] font-bold opacity-75">{pipe.date}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">{pipe.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{pipe.subtext}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Quick Links / Roster Shortcuts */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Department Actions
            </div>
            <h3 className="font-heading text-base font-bold">Fast Roster Management</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Review educator credentials, inspect student satisfaction ratings, or download tax deduction records.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button 
              onClick={() => onNavigate && onNavigate('08_faculty_payroll', 'educators_roster')}
              className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center justify-between transition border border-white/10"
            >
              <span className="flex items-center">
                <Users className="w-3.5 h-3.5 mr-2 text-indigo-400" /> Educators Master Roster
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('08_faculty_payroll', 'teacher_ratings')}
              className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center justify-between transition border border-white/10"
            >
              <span className="flex items-center">
                <Star className="w-3.5 h-3.5 mr-2 text-amber-400" /> Faculty App Ratings & Reviews
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('08_faculty_payroll', 'reports')}
              className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center justify-between transition border border-white/10"
            >
              <span className="flex items-center">
                <FileText className="w-3.5 h-3.5 mr-2 text-emerald-400" /> Statutory Audit Reports
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Core Table: Faculty Staff Directory & Attendance-Payroll Status */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">
              Faculty Roster & Attendance-Synced Salary Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Showing monthly base honorarium, biometric attendance rate, leave quota balance, and calculated net payout.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              {faculty.length} Faculty Members
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Educator & ID</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Subject Specialty</th>
                <th className="p-3 text-center">Attendance Rate</th>
                <th className="p-3 text-center">Leaves (Quota 2)</th>
                <th className="p-3 text-center">Excess (LWP)</th>
                <th className="p-3">Base Salary</th>
                <th className="p-3 text-rose-600 font-extrabold">Pay Cut</th>
                <th className="p-3 font-extrabold text-emerald-600">Net Payable</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {faculty.map(f => {
                const hasDeduction = f.excessLeaves > 0;
                return (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center space-x-2.5">
                        <img 
                          src={f.photo} 
                          alt={f.name} 
                          className="w-8 h-8 rounded-xl object-cover border border-slate-200" 
                        />
                        <div>
                          <p className="font-bold text-slate-900">{f.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{f.id} • {f.designation}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 text-slate-600 font-medium">
                      <div className="flex items-center">
                        <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {f.instituteName}
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="font-semibold text-slate-800 block">{f.department}</span>
                      <span className="text-[10px] text-indigo-600 font-medium">★ {f.ratings.overall} ({f.ratings.totalReviews} reviews)</span>
                    </td>

                    <td className="p-3 text-center">
                      <span className={`inline-block font-extrabold text-xs px-2 py-0.5 rounded-full ${
                        f.attendanceRate >= 95 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : f.attendanceRate >= 90 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {f.attendanceRate}%
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      <span className="font-bold text-slate-700">{f.leavesTakenThisMonth} / 2</span>
                      <span className="text-[10px] text-slate-400 block">{f.leavesLeft} Left</span>
                    </td>

                    <td className="p-3 text-center">
                      {f.excessLeaves > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 border border-rose-300">
                          +{f.excessLeaves} Excess LWP
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">—</span>
                      )}
                    </td>

                    <td className="p-3 font-mono font-bold text-slate-800">
                      ${f.monthlySalary.toLocaleString()}
                    </td>

                    <td className="p-3 font-mono font-bold">
                      {hasDeduction ? (
                        <span className="text-rose-600 font-black">
                          -${f.attendanceSalaryDeduction.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-slate-400">$0.00</span>
                      )}
                    </td>

                    <td className="p-3 font-mono font-black text-emerald-600 text-xs">
                      ${Math.round(f.netSalary).toLocaleString()}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedFaculty(f);
                          setActiveModal('slip_preview');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition border border-indigo-200"
                      >
                        Pay Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Policy & Sync Rule Breakdown */}
      {activeModal === 'sync_info' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  §
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Faculty Attendance & Salary Deduction Policy
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-lg hover:bg-slate-200 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-2">
                <h4 className="font-bold text-indigo-950 text-sm">Automated Calculation Formula:</h4>
                <div className="font-mono text-xs bg-white p-2.5 rounded-lg border border-indigo-200 text-indigo-900">
                  Per-Day Rate = Monthly Salary ÷ 26 Days<br/>
                  Excess LWP Days = Leaves Taken - 2 Granted Leaves<br/>
                  Salary Pay Cut = Excess LWP Days × Per-Day Rate
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Key Institutional Provisions:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li><strong>Standard Academic Month:</strong> Fixed at 26 teaching days (excluding official weekly campus closures).</li>
                  <li><strong>Monthly Leave Entitlement:</strong> 2 paid leaves per educator per calendar month (18 annual cumulative quota).</li>
                  <li><strong>Absences beyond 2 days:</strong> Treated automatically as Loss of Pay (LWP) unless specifically sanctioned by the Academic Dean.</li>
                  <li><strong>Statutory Withholding:</strong> Flat 10% TDS withheld on net post-deduction honorarium.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900"
              >
                Close Rulebook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Salary Pay Slip Preview */}
      {activeModal === 'slip_preview' && selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">
                  Official Institutional Pay Slip
                </span>
                <h3 className="font-heading text-lg font-bold text-white mt-0.5">
                  {selectedFaculty.name}
                </h3>
                <p className="text-xs text-slate-300">{selectedFaculty.id} • {selectedFaculty.instituteName}</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-lg hover:bg-white/10 text-white/70">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slip Content */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Pay Period</span>
                  <span className="font-bold text-slate-800">{selectedMonth}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Working Days</span>
                  <span className="font-bold text-slate-800">26 Days (Logged: {selectedFaculty.totalHoursLogged} hrs)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Bank Account</span>
                  <span className="font-bold text-slate-800">{selectedFaculty.bankAccount} ({selectedFaculty.ifscCode})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Disbursal Status</span>
                  <span className="font-bold text-emerald-600">{selectedFaculty.disbursalStatus}</span>
                </div>
              </div>

              {/* Earnings & Deductions Breakdown */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 bg-slate-100/80 p-2.5 font-bold text-slate-600 text-[11px] uppercase border-b border-slate-200">
                  <span>Component</span>
                  <span className="text-right">Amount (USD)</span>
                </div>
                <div className="p-3 space-y-2 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-700">Contractual Base Honorarium</span>
                    <span className="font-mono font-bold text-slate-900">${selectedFaculty.monthlySalary.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-emerald-700">
                    <span>Performance / HOD Stipend Bonus</span>
                    <span className="font-mono font-bold">+${selectedFaculty.performanceBonus.toFixed(2)}</span>
                  </div>
                  {selectedFaculty.excessLeaves > 0 && (
                    <div className="flex justify-between pt-1 text-rose-600 font-bold">
                      <span>
                        Attendance Pay Cut ({selectedFaculty.excessLeaves} excess LWP @ ${selectedFaculty.perDayRate.toFixed(2)}/day)
                      </span>
                      <span className="font-mono">-${selectedFaculty.attendanceSalaryDeduction.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 text-slate-600">
                    <span>Statutory TDS Withholding (10%)</span>
                    <span className="font-mono font-bold text-slate-800">-${selectedFaculty.tdsDeduction.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-slate-900">
                    <span>Net Bank Disbursable Amount</span>
                    <span className="font-mono text-emerald-600 font-black">${selectedFaculty.netSalary.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Leave Audit Log */}
              {selectedFaculty.leaveHistory.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Recorded Absences This Month:
                  </span>
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {selectedFaculty.leaveHistory.map((l, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="font-bold text-slate-800">{l.date}</span>: <span className="text-slate-600">{l.reason}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          l.isLWP ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {l.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Digitally Verified by Super Admin ERP</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => alert(`Pay slip for ${selectedFaculty.name} downloaded.`)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 font-bold text-xs text-slate-700 flex items-center"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Export PDF
                </button>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
