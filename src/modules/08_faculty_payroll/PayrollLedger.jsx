import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Download, CreditCard, ShieldCheck, AlertTriangle, 
  CheckCircle2, Building2, Filter, Search, FileText, X, 
  Send, Printer, Sparkles, RefreshCw
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { getFacultyByInstitute, calculatePayrollSummary } from './facultyPayrollData';

export default function PayrollLedger({ instituteCode = 'all' }) {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [facultyList, setFacultyList] = useState(() => getFacultyByInstitute(instituteCode));
  const [selectedFaculty, setSelectedFaculty] = useState(null); // For Pay Slip modal
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [disburseToast, setDisburseToast] = useState(null);

  // Re-sync if instituteCode changes
  React.useEffect(() => {
    setFacultyList(getFacultyByInstitute(instituteCode));
  }, [instituteCode]);

  const summary = useMemo(() => {
    return calculatePayrollSummary(facultyList);
  }, [facultyList]);

  const filtered = useMemo(() => {
    return facultyList.filter(f => {
      const matchStatus = filterStatus === 'all' || f.disbursalStatus.toLowerCase() === filterStatus.toLowerCase();
      const matchSearch = !search || 
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.department.toLowerCase().includes(search.toLowerCase()) ||
        f.id.toLowerCase().includes(search.toLowerCase()) ||
        f.instituteName.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [facultyList, filterStatus, search]);

  const handleDisburseAll = () => {
    const updated = facultyList.map(f => ({
      ...f,
      disbursalStatus: 'Disbursed'
    }));
    setFacultyList(updated);
    setDisburseToast(`Direct ACH Bank Transfer Executed! Disbursed $${Math.round(summary.netDisbursed).toLocaleString()} across ${facultyList.length} faculty accounts.`);
    setTimeout(() => setDisburseToast(null), 5000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wide border border-emerald-200">
              Module 08 • Financial Ledger
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Disbursal Cycle: {selectedMonth}
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <DollarSign className="w-6 h-6 mr-2 text-indigo-600" /> Faculty Payroll & Honorarium Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Attendance-synchronized compensation ledger with automated Loss of Pay (LWP) deductions and direct bank ACH processing.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <button 
            onClick={() => alert('Faculty Payroll CSV generated and downloaded.')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Export Bank CSV
          </button>
          <button 
            onClick={handleDisburseAll}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center shadow-sm transition"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" /> Disburse All Approved (ACH)
          </button>
        </div>
      </div>

      {/* Disbursal Toast Alert */}
      {disburseToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" /> {disburseToast}
          </span>
          <button onClick={() => setDisburseToast(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4 Financial Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Gross Honorarium" 
          value={`$${summary.grossPayroll.toLocaleString()}`} 
          subtext="Base Contractual Commitment" 
          icon={DollarSign} 
          color="blue" 
          badge="Contract Base" 
        />
        <KPICard 
          title="Attendance Deductions" 
          value={`-$${Math.round(summary.totalAttendanceDeductions).toLocaleString()}`} 
          subtext={`${summary.facultyWithDeductions} Educators with LWP Cuts`} 
          icon={AlertTriangle} 
          color="rose" 
          badge="LWP Withholding" 
        />
        <KPICard 
          title="TDS Withheld (10%)" 
          value={`$${Math.round(summary.totalTDS).toLocaleString()}`} 
          subtext="Government Statutory Deposit" 
          icon={CreditCard} 
          color="purple" 
          badge="Form 16 Tax" 
        />
        <KPICard 
          title="Net Bank Disbursable" 
          value={`$${Math.round(summary.netDisbursed).toLocaleString()}`} 
          subtext="Direct Bank ACH Ready" 
          icon={ShieldCheck} 
          color="green" 
          badge="100% Reconciled" 
        />
      </div>

      {/* Attendance-to-Deduction Computation Summary */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-white">
              Biometric Attendance & Pro-Rated Absenteeism Engine
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Faculty contracts mandate <strong>26 teaching days/month</strong> with <strong>2 paid casual/medical leaves</strong>. Absences beyond 2 days trigger automated pro-rated salary cuts at <code className="text-indigo-300 bg-white/10 px-1 py-0.5 rounded font-mono">Monthly Salary ÷ 26 × Excess Days</code>.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Deductions Saved</span>
            <span className="text-sm font-mono font-black text-rose-400">
              -${summary.totalAttendanceDeductions.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Row */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search faculty name, center, ID..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" 
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-500">Status:</span>
          <select 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-indigo-600 font-bold text-slate-700"
          >
            <option value="all">All Disbursal Status</option>
            <option value="disbursed">Disbursed</option>
            <option value="pending approval">Pending Approval</option>
          </select>
        </div>
      </div>

      {/* Main Attendance-Synced Payroll Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Faculty Member</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Base Salary</th>
                <th className="p-3 text-center">Leaves (Allowed 2)</th>
                <th className="p-3 text-center">Excess (LWP)</th>
                <th className="p-3">Daily Rate</th>
                <th className="p-3 text-rose-600 font-extrabold">Attendance Cut</th>
                <th className="p-3">TDS (10%)</th>
                <th className="p-3">Bonus</th>
                <th className="p-3 text-emerald-600 font-extrabold">Net Payout</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(f => {
                const hasCut = f.excessLeaves > 0;
                const isDisbursed = f.disbursalStatus.toLowerCase() === 'disbursed';

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
                          <p className="text-[10px] text-slate-400 font-mono">{f.id} • {f.department}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 text-slate-600 font-medium">
                      {f.instituteName}
                    </td>

                    <td className="p-3 font-mono font-bold text-slate-800">
                      ${f.monthlySalary.toLocaleString()}
                    </td>

                    <td className="p-3 text-center font-bold text-slate-700">
                      {f.leavesTakenThisMonth} / 2
                    </td>

                    <td className="p-3 text-center">
                      {hasCut ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 border border-rose-300">
                          +{f.excessLeaves}d LWP
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">0</span>
                      )}
                    </td>

                    <td className="p-3 font-mono text-slate-500">
                      ${f.perDayRate.toFixed(2)}/d
                    </td>

                    <td className="p-3 font-mono font-bold">
                      {hasCut ? (
                        <span className="text-rose-600 font-black">
                          -${f.attendanceSalaryDeduction.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-slate-400">$0.00</span>
                      )}
                    </td>

                    <td className="p-3 font-mono text-slate-500">
                      -${f.tdsDeduction.toFixed(2)}
                    </td>

                    <td className="p-3 font-mono font-semibold text-emerald-600">
                      {f.performanceBonus > 0 ? `+$${f.performanceBonus.toFixed(2)}` : '$0.00'}
                    </td>

                    <td className="p-3 font-mono font-black text-emerald-600 text-xs">
                      ${Math.round(f.netSalary).toLocaleString()}
                    </td>

                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        isDisbursed 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {f.disbursalStatus}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      <button 
                        onClick={() => setSelectedFaculty(f)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition border border-indigo-200 flex items-center ml-auto"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1" /> Pay Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Salary Slip Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">
                  Official Salary Disbursement Voucher
                </span>
                <h3 className="font-heading text-lg font-bold text-white mt-0.5">
                  {selectedFaculty.name}
                </h3>
                <p className="text-xs text-slate-300">{selectedFaculty.id} • {selectedFaculty.instituteName}</p>
              </div>
              <button onClick={() => setSelectedFaculty(null)} className="p-1 rounded-lg hover:bg-white/10 text-white/70">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slip Content */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Disbursal Month</span>
                  <span className="font-bold text-slate-800">{selectedMonth}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Biometric Attendance</span>
                  <span className="font-bold text-slate-800">{selectedFaculty.attendanceRate}% (26 Days Standard)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Direct ACH Bank Account</span>
                  <span className="font-bold text-slate-800">{selectedFaculty.bankAccount}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Voucher Status</span>
                  <span className="font-bold text-emerald-600">{selectedFaculty.disbursalStatus}</span>
                </div>
              </div>

              {/* Earnings & Deductions Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 bg-slate-100 p-2.5 font-bold text-slate-600 text-[11px] uppercase border-b border-slate-200">
                  <span>Pay Component</span>
                  <span className="text-right">Amount (USD)</span>
                </div>
                <div className="p-3 space-y-2 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-700">Contractual Monthly Base Honorarium</span>
                    <span className="font-mono font-bold text-slate-900">${selectedFaculty.monthlySalary.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-emerald-700">
                    <span>Performance / HOD Stipend Incentive</span>
                    <span className="font-mono font-bold">+${selectedFaculty.performanceBonus.toFixed(2)}</span>
                  </div>
                  {selectedFaculty.excessLeaves > 0 && (
                    <div className="flex justify-between pt-1 text-rose-600 font-bold">
                      <span>
                        Attendance LWP Pay Cut ({selectedFaculty.excessLeaves} excess day(s) @ ${selectedFaculty.perDayRate.toFixed(2)}/day)
                      </span>
                      <span className="font-mono">-${selectedFaculty.attendanceSalaryDeduction.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 text-slate-600">
                    <span>Statutory TDS Withholding (10% Tax)</span>
                    <span className="font-mono font-bold text-slate-800">-${selectedFaculty.tdsDeduction.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-slate-900">
                    <span>Net Disbursed Direct to Bank Account</span>
                    <span className="font-mono text-emerald-600 font-black">${selectedFaculty.netSalary.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Leave Audit Breakdown */}
              {selectedFaculty.leaveHistory.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Absences Recorded in Attendance Audit:
                  </span>
                  <div className="space-y-1 max-h-28 overflow-y-auto">
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

            {/* Modal Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Authorized by Finance Director</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => alert(`Print command sent for ${selectedFaculty.name}'s pay slip.`)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100 flex items-center"
                >
                  <Printer className="w-3.5 h-3.5 mr-1" /> Print Slip
                </button>
                <button 
                  onClick={() => setSelectedFaculty(null)}
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
