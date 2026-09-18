import React, { useState, useMemo } from 'react';
import { 
  BarChart3, Download, DollarSign, AlertTriangle, CheckCircle2, 
  Clock, Filter, Search, Building2, FileText, ArrowUpDown, 
  ShieldCheck, Award, Users, ChevronRight
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { getFacultyByInstitute, calculatePayrollSummary } from './facultyPayrollData';

export default function Reports({ instituteCode = 'all', activeTab = 'rep_payroll' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_payroll');
  const [search, setSearch] = useState('');
  const [filterCampus, setFilterCampus] = useState('all');

  // Sync tab if prop changes
  React.useEffect(() => {
    if (activeTab && activeTab.trim()) setCurrentTab(activeTab);
  }, [activeTab]);

  const allFaculty = useMemo(() => {
    return getFacultyByInstitute(instituteCode);
  }, [instituteCode]);

  const summary = useMemo(() => {
    return calculatePayrollSummary(allFaculty);
  }, [allFaculty]);

  const filteredFaculty = useMemo(() => {
    return allFaculty.filter(f => {
      const matchCampus = filterCampus === 'all' || f.instituteCode.toLowerCase() === filterCampus.toLowerCase();
      const matchSearch = !search || 
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.department.toLowerCase().includes(search.toLowerCase()) ||
        f.instituteName.toLowerCase().includes(search.toLowerCase());
      return matchCampus && matchSearch;
    });
  }, [allFaculty, filterCampus, search]);

  const handleExportCSV = () => {
    alert(`Generating ${currentTab === 'rep_payroll' ? 'Salary_Disbursement_Deductions' : 'Faculty_Workload_Utilization'}_Report.csv`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
              Module 08 • Statutory Reports & Analytics
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Audit Period: September 2026
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Faculty Payroll & Utilization Audit Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-campus salary disbursement reconciliation, biometric attendance deduction audits, and teaching workload distribution.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export Report (CSV)
          </button>
        </div>
      </div>

      {/* Sub-Page Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          onClick={() => setCurrentTab('rep_payroll')}
          className={`pb-3 text-xs font-bold transition flex items-center space-x-2 border-b-2 ${
            currentTab === 'rep_payroll'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>1. Salary Disbursement & Attendance Deduction Report</span>
        </button>

        <button
          onClick={() => setCurrentTab('rep_utilization')}
          className={`pb-3 text-xs font-bold transition flex items-center space-x-2 border-b-2 ${
            currentTab === 'rep_utilization'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. Workload & Capacity Utilization Analytics</span>
        </button>
      </div>

      {/* SUB-PAGE 1: SALARY DISBURSEMENT & ATTENDANCE DEDUCTION AUDIT */}
      {currentTab === 'rep_payroll' && (
        <div className="space-y-6">
          {/* 4 Financial KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard 
              title="Gross Contractual Base" 
              value={`$${summary.grossPayroll.toLocaleString()}`} 
              subtext={`${summary.totalFaculty} Master Faculty Members`} 
              icon={DollarSign} 
              color="blue" 
              badge="Committed" 
            />
            <KPICard 
              title="Attendance LWP Deductions" 
              value={`-$${Math.round(summary.totalAttendanceDeductions).toLocaleString()}`} 
              subtext={`${summary.facultyWithDeductions} Teachers Penalized`} 
              icon={AlertTriangle} 
              color="rose" 
              badge="LWP Cuts" 
            />
            <KPICard 
              title="Net Disbursed Payroll" 
              value={`$${Math.round(summary.netDisbursed).toLocaleString()}`} 
              subtext="Direct Bank ACH Executed" 
              icon={CheckCircle2} 
              color="green" 
              badge="Disbursed" 
            />
            <KPICard 
              title="Daily Rate Standard" 
              value="$342 / Day" 
              subtext="26 Working Days Formula" 
              icon={ShieldCheck} 
              color="amber" 
              badge="Statutory" 
            />
          </div>

          {/* Statutory Policy Callout */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Automated Faculty Attendance & Leave Payroll Policy:</p>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                Standard monthly teaching schedule is benchmarked at <strong>26 working days</strong>. Each educator is granted <strong>2 Paid Leaves per month</strong>. Absences exceeding the granted quota are classified as <strong>Loss of Pay (LWP)</strong>, deducted automatically as: <code>Monthly Base Salary ÷ 26 days × Excess Days Absent</code>.
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search faculty or subject..." 
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" 
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500">Campus:</span>
              <select 
                value={filterCampus} 
                onChange={e => setFilterCampus(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-indigo-600 font-bold text-slate-700"
              >
                <option value="all">All Campuses</option>
                <option value="alpha">Alpha Kota</option>
                <option value="beta">Beta Mumbai</option>
                <option value="apex">Apex Delhi</option>
                <option value="delta">Delta Bangalore</option>
              </select>
            </div>
          </div>

          {/* Detailed Deductions Ledger Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Comprehensive Salary Disbursement & Deduction Audit (September 2026)
                </h3>
                <p className="text-xs text-slate-500">
                  Exact audit of granted leaves, absences taken, excess LWP days, daily deduction rate, and net payout.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                {filteredFaculty.length} Educators Audited
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Faculty & ID</th>
                    <th className="p-3">Campus</th>
                    <th className="p-3">Base Salary</th>
                    <th className="p-3 text-center">Granted (Mo)</th>
                    <th className="p-3 text-center">Taken</th>
                    <th className="p-3 text-center">Left</th>
                    <th className="p-3 text-center">Excess (LWP)</th>
                    <th className="p-3">Daily Rate</th>
                    <th className="p-3 text-rose-600 font-extrabold">Pay Cut</th>
                    <th className="p-3 text-right text-emerald-600 font-extrabold">Net Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFaculty.map(f => {
                    const hasDeduction = f.excessLeaves > 0;
                    return (
                      <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center space-x-2.5">
                            <img src={f.photo} alt={f.name} className="w-8 h-8 rounded-xl object-cover border border-slate-200" />
                            <div>
                              <p className="font-bold text-slate-900">{f.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{f.id} • {f.department}</p>
                            </div>
                          </div>
                        </td>

                        <td className="p-3 text-slate-600 font-medium">
                          {f.instituteName}
                        </td>

                        <td className="p-3 font-mono font-bold text-slate-800">
                          ${f.monthlySalary.toLocaleString()}
                        </td>

                        <td className="p-3 text-center font-bold text-slate-600">
                          2d
                        </td>

                        <td className="p-3 text-center font-black text-slate-900">
                          {f.leavesTakenThisMonth}d
                        </td>

                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            f.leavesLeft > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {f.leavesLeft} Left
                          </span>
                        </td>

                        <td className="p-3 text-center">
                          {hasDeduction ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 border border-rose-300">
                              +{f.excessLeaves} Excess LWP
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono text-[11px]">0</span>
                          )}
                        </td>

                        <td className="p-3 font-mono text-slate-500">
                          ${f.perDayRate.toFixed(2)}/d
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

                        <td className="p-3 text-right font-mono font-black text-emerald-600 text-xs">
                          ${Math.round(f.netSalary).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PAGE 2: WORKLOAD & UTILIZATION ANALYTICS */}
      {currentTab === 'rep_utilization' && (
        <div className="space-y-6">
          {/* Workload KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard 
              title="Total Teaching Capacity" 
              value="210 Hrs / Wk" 
              subtext="Across All Active Centers" 
              icon={Clock} 
              color="blue" 
              badge="Capacity" 
            />
            <KPICard 
              title="Avg Workload" 
              value="23.4 Hrs / Wk" 
              subtext="Standard Target: 24h" 
              icon={BarChart3} 
              color="green" 
              badge="Balanced" 
            />
            <KPICard 
              title="Avg Cost Per Student" 
              value="$14.20 / Mo" 
              subtext="Direct Faculty Pedagogy Cost" 
              icon={DollarSign} 
              color="purple" 
              badge="Cost Efficient" 
            />
            <KPICard 
              title="Mean Capacity Utilization" 
              value="91.4%" 
              subtext="Optimal Staffing Index" 
              icon={Award} 
              color="amber" 
              badge="Optimal Range" 
            />
          </div>

          {/* Utilization Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Educator Workload & Capacity Utilization Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Weekly hours taught, maximum weekly capacity, utilization rate, and direct cost per enrolled student.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                Weekly Benchmark: 24-28h
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Faculty Member</th>
                    <th className="p-3">Campus</th>
                    <th className="p-3">Subject Specialty</th>
                    <th className="p-3 text-center">Active Batches</th>
                    <th className="p-3">Weekly Hours</th>
                    <th className="p-3">Utilization Rate</th>
                    <th className="p-3">Cost / Student</th>
                    <th className="p-3 text-right">Deployment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allFaculty.map(f => {
                    const isOptimal = f.utilizationRate >= 88 && f.utilizationRate <= 95;
                    const isHigh = f.utilizationRate > 95;

                    return (
                      <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          <div className="flex items-center space-x-2">
                            <img src={f.photo} alt={f.name} className="w-7 h-7 rounded-lg object-cover" />
                            <span>{f.name}</span>
                          </div>
                        </td>

                        <td className="p-3 text-slate-600 font-medium">
                          {f.instituteName}
                        </td>

                        <td className="p-3 font-semibold text-slate-800">
                          {f.department}
                        </td>

                        <td className="p-3 text-center font-bold text-slate-700">
                          {f.batchCount} Batches
                        </td>

                        <td className="p-3 font-mono font-bold text-slate-800">
                          {f.weeklyTeachingHours}h / {f.maxCapacityHours}h wk
                        </td>

                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  isHigh ? 'bg-amber-500' : 'bg-indigo-600'
                                }`} 
                                style={{ width: `${f.utilizationRate}%` }} 
                              />
                            </div>
                            <span className="font-mono font-bold text-slate-700">{f.utilizationRate}%</span>
                          </div>
                        </td>

                        <td className="p-3 font-mono font-bold text-slate-800">
                          ${f.costPerStudentMonthly.toFixed(2)}/mo
                        </td>

                        <td className="p-3 text-right">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            isHigh 
                              ? 'bg-amber-100 text-amber-800' 
                              : isOptimal 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isHigh ? 'Full Capacity' : isOptimal ? 'Optimal' : 'Available Hours'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
