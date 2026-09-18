import React, { useState, useMemo } from 'react';
import { 
  BarChart3, Download, Camera, Clock, AlertTriangle, CheckCircle2, 
  DollarSign, User, GraduationCap, Briefcase, Calendar, Search, 
  Filter, FileText, ArrowUpDown, ChevronRight, Award, ShieldCheck
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { 
  ATTENDANCE_USERS_DATA, 
  FACIAL_LOGS_DATA, 
  LATE_COMERS_ANOMALIES_DATA, 
  INSTITUTES_DATA 
} from '../../data/erpData';

export default function Reports({ instituteCode = 'all', activeTab = 'rep_late_comers' }) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUserId, setSelectedUserId] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync prop changes
  React.useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  // Case-insensitive institute normalization
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Base Users list scoped to institute
  const campusUsers = useMemo(() => {
    return ATTENDANCE_USERS_DATA.filter(u => 
      isAllInstitutes || u.instituteCode?.toLowerCase() === instituteCode?.toLowerCase()
    );
  }, [instituteCode, isAllInstitutes]);

  // Filtered Users for Punctuality report
  const filteredUsers = useMemo(() => {
    return campusUsers.filter(u => {
      const matchCat = selectedCategory === 'all' || u.type === selectedCategory;
      const matchUser = selectedUserId === 'all' || u.id === selectedUserId;
      const matchSearch = !searchQuery || 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.roleOrBatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchUser && matchSearch;
    });
  }, [campusUsers, selectedCategory, selectedUserId, searchQuery]);

  // Base Anomalies scoped to institute
  const campusAnomalies = useMemo(() => {
    return LATE_COMERS_ANOMALIES_DATA.filter(a => 
      isAllInstitutes || a.instituteCode?.toLowerCase() === instituteCode?.toLowerCase()
    );
  }, [instituteCode, isAllInstitutes]);

  // Filtered Anomalies for Late Comers report
  const filteredAnomalies = useMemo(() => {
    return campusAnomalies.filter(a => {
      const matchCat = selectedCategory === 'all' || a.category === selectedCategory;
      const matchUser = selectedUserId === 'all' || a.personId === selectedUserId;
      const matchSearch = !searchQuery || 
        a.personName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        a.roleOrBatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.personId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchUser && matchSearch;
    });
  }, [campusAnomalies, selectedCategory, selectedUserId, searchQuery]);

  // Filtered Faculty for Leave Report
  const filteredFaculty = useMemo(() => {
    return campusUsers.filter(u => {
      const isTeacher = u.type === 'teacher';
      const matchUser = selectedUserId === 'all' || u.id === selectedUserId;
      const matchSearch = !searchQuery || 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.roleOrBatch.toLowerCase().includes(searchQuery.toLowerCase());
      return isTeacher && matchUser && matchSearch;
    });
  }, [campusUsers, selectedUserId, searchQuery]);

  // Filtered Facial Logs for Biometric report
  const filteredLogs = useMemo(() => {
    return FACIAL_LOGS_DATA.filter(l => {
      const matchInst = isAllInstitutes || l.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchCat = selectedCategory === 'all' || l.category === selectedCategory;
      const matchUser = selectedUserId === 'all' || l.personId === selectedUserId;
      const matchSearch = !searchQuery || 
        l.personName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        l.roleOrBatch.toLowerCase().includes(searchQuery.toLowerCase());
      return matchInst && matchCat && matchUser && matchSearch;
    });
  }, [instituteCode, isAllInstitutes, selectedCategory, selectedUserId, searchQuery]);

  // Aggregate Faculty Salary Deductions
  const totalBaseSalary = filteredFaculty.reduce((acc, f) => acc + (f.monthlySalary || 0), 0);
  const totalDeductions = filteredFaculty.reduce((acc, f) => acc + (f.salaryDeduction || 0), 0);
  const totalNetPayable = filteredFaculty.reduce((acc, f) => acc + (f.netSalary || 0), 0);
  const facultyWithDeductionsCount = filteredFaculty.filter(f => f.salaryDeduction > 0).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Report Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
              Module 04 • Enterprise Audit Reports
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">{selectedMonth}</span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Biometric AI Attendance Audit Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Late comers frequency logs, punctuality honor rolls, and faculty leave quotas with automated salary deductions.
          </p>
        </div>

        <button 
          onClick={() => alert(`Exported ${currentTab.toUpperCase()} report as CSV/PDF!`)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center shadow-xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4 mr-1.5" /> Export Official Audit (CSV)
        </button>
      </div>

      {/* 4 Report Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
        <button
          onClick={() => setCurrentTab('rep_late_comers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentTab === 'rep_late_comers'
              ? 'bg-white text-indigo-700 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4 mr-1.5 text-amber-500" />
          Late Comers & Violations
          <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
            {campusAnomalies.length}
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('rep_punctuality')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentTab === 'rep_punctuality'
              ? 'bg-white text-indigo-700 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 mr-1.5 text-emerald-500" />
          Punctuality & Honor Roll
          <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
            {campusUsers.length}
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('rep_faculty_leave')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentTab === 'rep_faculty_leave'
              ? 'bg-white text-indigo-700 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4 mr-1.5 text-rose-500" />
          Faculty Leaves & Salary Pay Cuts
          {facultyWithDeductionsCount > 0 && (
            <span className="ml-2 px-1.5 py-0.2 rounded-full text-[10px] font-black bg-rose-100 text-rose-800">
              {facultyWithDeductionsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setCurrentTab('rep_biometric')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentTab === 'rep_biometric'
              ? 'bg-white text-indigo-700 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 mr-1.5 text-purple-500" />
          Biometric Hardware AI Logs
          <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">
            {filteredLogs.length}
          </span>
        </button>
      </div>

      {/* GLOBAL FILTER CONTROLS (Student, Teacher, Staff, User Selector & Month) */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* User Type Filter */}
          {currentTab !== 'rep_faculty_leave' && (
            <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedCategory === 'all' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Roles ({campusUsers.length})
              </button>
              <button
                onClick={() => setSelectedCategory('student')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center ${
                  selectedCategory === 'student' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 mr-1 text-blue-500" /> 
                Students ({campusUsers.filter(u => u.type === 'student').length})
              </button>
              <button
                onClick={() => setSelectedCategory('teacher')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center ${
                  selectedCategory === 'teacher' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5 mr-1 text-emerald-600" /> 
                Teachers ({campusUsers.filter(u => u.type === 'teacher').length})
              </button>
              <button
                onClick={() => setSelectedCategory('general')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center ${
                  selectedCategory === 'general' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 mr-1 text-purple-500" /> 
                Staff ({campusUsers.filter(u => u.type === 'general').length})
              </button>
            </div>
          )}

          {/* Specific User Dropdown Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500">Filter User:</span>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Personnel</option>
              {campusUsers.filter(u => currentTab !== 'rep_faculty_leave' || u.type === 'teacher').map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.roleOrBatch})</option>
              ))}
            </select>
          </div>

          {/* Month Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="September 2026">September 2026</option>
              <option value="August 2026">August 2026</option>
              <option value="July 2026">July 2026</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records..." 
            className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-48 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* REPORT 1: LATE COMERS & VIOLATIONS REPORT */}
      {/* ============================================================ */}
      {currentTab === 'rep_late_comers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Total Late Occurrences" value={`${campusAnomalies.length} Flags`} subtext="Recorded in September" icon={Clock} color="amber" />
            <KPICard title="Mean Delay Duration" value="23.4 mins" subtext="Gate Queue / Transit" icon={AlertTriangle} color="rose" />
            <KPICard title="Parent SMS Compliance" value="100% Sent" subtext="Automated Real-Time Push" icon={CheckCircle2} color="green" />
            <KPICard title="Chronic Repeat Rate" value="18.5%" subtext="3+ Lates this month" icon={AlertTriangle} color="purple" />
          </div>

          {/* Delay Time Distribution Benchmarks */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-heading text-sm font-bold text-slate-900 mb-3">Delay Severity Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <span className="text-[11px] font-bold text-amber-800">1 - 15 Mins (Minor Delay)</span>
                <p className="text-xl font-black text-amber-900 mt-1">4 Incidents</p>
                <span className="text-[10px] text-amber-700">Admitted with gate pass slip</span>
              </div>
              <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200">
                <span className="text-[11px] font-bold text-orange-800">16 - 30 Mins (Moderate)</span>
                <p className="text-xl font-black text-orange-900 mt-1">8 Incidents</p>
                <span className="text-[10px] text-orange-700">Parent SMS alert dispatched</span>
              </div>
              <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200">
                <span className="text-[11px] font-bold text-rose-800">30+ Mins (Severe Delay)</span>
                <p className="text-xl font-black text-rose-900 mt-1">4 Incidents</p>
                <span className="text-[10px] text-rose-700">Counselor PTM meeting booked</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-800">Repeat Chronic (3+ Times)</span>
                <p className="text-xl font-black text-slate-900 mt-1">3 Individuals</p>
                <span className="text-[10px] text-rose-600 font-bold">Rohan, Liam, Chloe</span>
              </div>
            </div>
          </div>

          {/* Detailed Late Incidents Ledger */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-sm font-bold text-slate-900">
                Official Late Comers Ledger ({filteredAnomalies.length} Listed)
              </h3>
              <span className="text-xs text-slate-500 font-semibold">Active Filter: {selectedCategory.toUpperCase()}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Person & Role</th>
                    <th className="p-3">Campus</th>
                    <th className="p-3">Date & Arrival</th>
                    <th className="p-3">Minutes Late</th>
                    <th className="p-3">Reported Reason</th>
                    <th className="p-3">Frequency</th>
                    <th className="p-3 text-right">Parent SMS & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAnomalies.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-slate-400">
                        No late incident records found matching the active filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAnomalies.map(a => (
                      <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          {a.personName} <span className="text-slate-400 font-normal">({a.personId})</span>
                          <p className="text-[10px] text-indigo-600 font-normal">{a.roleOrBatch}</p>
                        </td>
                        <td className="p-3 text-slate-600">{a.instituteName}</td>
                        <td className="p-3 font-mono text-[11px]">
                          {a.date} • <span className="font-bold text-rose-600">{a.actualCheckIn}</span>
                        </td>
                        <td className="p-3 font-black text-rose-700">+{a.delayMinutes} min</td>
                        <td className="p-3 text-slate-600 italic">"{a.reason}"</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            a.repeatCount >= 3 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {a.repeatCount}th offense
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <span className="font-bold text-emerald-600 block text-[11px]">✓ SMS Dispatched</span>
                          <span className="text-[10px] text-slate-400">{a.counselorAction}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* REPORT 2: PUNCTUALITY & HONOR ROLL REPORT */}
      {/* ============================================================ */}
      {currentTab === 'rep_punctuality' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Campus Mean Punctuality" value="95.4%" subtext="Target Benchmark: 92.0%" icon={Award} color="green" />
            <KPICard title="100% Punctual Stars" value="8 Personnel" subtext="Zero Lates or Absences" icon={CheckCircle2} color="blue" />
            <KPICard title="Longest On-Time Streak" value="30 Days" subtext="Dr. Emily Vance (HOD Bio)" icon={Award} color="purple" />
            <KPICard title="Fastest Gate Clearance" value="82 ms" subtext="Alpha Main Gate Tablet" icon={Camera} color="amber" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-base font-bold text-slate-900">Punctuality Leaderboard & Honor Roll</h3>
              <span className="text-xs text-slate-500 font-semibold">{filteredUsers.length} Personnel Audited</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Rank</th>
                    <th className="p-3">Individual</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Punctuality Streak</th>
                    <th className="p-3">Attendance Rate</th>
                    <th className="p-3">Logged Hours</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-slate-400">
                        No personnel found matching the active filter.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.sort((a, b) => b.attendanceRate - a.attendanceRate).map((u, i) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-black text-slate-400">#{i + 1}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2.5">
                            <img src={u.photo} alt={u.name} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                            <div>
                              <span className="font-bold text-slate-900">{u.name}</span>
                              <span className="text-[10px] text-slate-400 block">{u.roleOrBatch}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                            {u.type}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-indigo-600">{u.punctualityStreak}</td>
                        <td className="p-3 font-black text-emerald-600">{u.attendanceRate}%</td>
                        <td className="p-3 font-mono text-slate-700">{u.totalHoursLogged}h</td>
                        <td className="p-3 text-right">
                          {u.attendanceRate >= 96 ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              ⭐ Honor Roll
                            </span>
                          ) : u.attendanceRate >= 90 ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                              Satisfactory
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                              Attention Needed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* REPORT 3: FACULTY LEAVES & SALARY DEDUCTIONS REPORT */}
      {/* ============================================================ */}
      {currentTab === 'rep_faculty_leave' && (
        <div className="space-y-6">
          {/* Top 4 Summary Pastel Cards for Faculty Payroll Deductions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard 
              title="Gross Faculty Payroll" 
              value={`$${totalBaseSalary.toLocaleString()}`} 
              subtext={`${filteredFaculty.length} Full-time & HOD Faculty`} 
              icon={DollarSign} 
              color="blue" 
              badge="Base Contract" 
            />
            <KPICard 
              title="Total Leave Pay Cuts" 
              value={`-$${totalDeductions.toLocaleString()}`} 
              subtext={`${facultyWithDeductionsCount} Faculty Exceeded Quota`} 
              icon={AlertTriangle} 
              color="rose" 
              badge="LWP Deductions" 
            />
            <KPICard 
              title="Net Disbursed Payroll" 
              value={`$${Math.round(totalNetPayable).toLocaleString()}`} 
              subtext="Direct Bank ACH Ready" 
              icon={CheckCircle2} 
              color="green" 
              badge="Approved" 
            />
            <KPICard 
              title="Avg Daily Deduction Rate" 
              value="$342 / Day" 
              subtext="Calculated via 26 Working Days" 
              icon={BarChart3} 
              color="amber" 
              badge="Statutory" 
            />
          </div>

          {/* Statutory Notice Banner */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Automated Faculty Attendance & Leave Payroll Policy:</p>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                Each faculty is granted <strong>2 Paid Leaves per month</strong> (18 annual quota). Absences beyond granted leaves are classified as 
                <strong> Loss of Pay (LWP)</strong>. The pro-rated daily deduction is calculated automatically as <code>Monthly Salary ÷ 26 days × Excess Days</code>.
              </p>
            </div>
          </div>

          {/* Comprehensive Faculty Leave & Salary Cuts Ledger */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Faculty Leaves & Salary Deduction Ledger (September 2026)
                </h3>
                <p className="text-xs text-slate-500">
                  Detailed breakdown of granted leaves, leaves taken, leaves balance, excess unapproved days, and loss of pay.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                {filteredFaculty.length} Teachers Audited
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Faculty & Subject</th>
                    <th className="p-3">Campus</th>
                    <th className="p-3">Monthly Base Salary</th>
                    <th className="p-3 text-center">Granted (Mo)</th>
                    <th className="p-3 text-center">Taken</th>
                    <th className="p-3 text-center">Left</th>
                    <th className="p-3 text-center">Excess (LWP)</th>
                    <th className="p-3">Daily Rate</th>
                    <th className="p-3 text-rose-600 font-extrabold">Salary Cut</th>
                    <th className="p-3 text-right text-emerald-600 font-extrabold">Net Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFaculty.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="p-8 text-center text-slate-400">
                        No faculty records found for the selected campus.
                      </td>
                    </tr>
                  ) : (
                    filteredFaculty.map(f => {
                      const hasDeduction = f.salaryDeduction > 0;
                      return (
                        <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center space-x-2.5">
                              <img src={f.photo} alt={f.name} className="w-8 h-8 rounded-xl object-cover border border-slate-200" />
                              <div>
                                <p className="font-bold text-slate-900">{f.name}</p>
                                <p className="text-[10px] text-slate-500">{f.roleOrBatch}</p>
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
                            {f.monthlyLeavesGranted}d
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
                            {f.excessLeaves > 0 ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                                +{f.excessLeaves} Excess LWP
                              </span>
                            ) : (
                              <span className="text-slate-400 font-mono text-[11px]">0</span>
                            )}
                          </td>

                          <td className="p-3 font-mono text-slate-500">
                            ${f.perDayRate?.toFixed(2) || '0.00'}/d
                          </td>

                          <td className="p-3 font-mono font-black text-rose-700">
                            {hasDeduction ? `-$${f.salaryDeduction.toLocaleString()}` : '$0.00'}
                          </td>

                          <td className="p-3 text-right font-mono font-black text-emerald-700 text-sm">
                            ${Math.round(f.netSalary).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Granular Leave Event Sub-Ledger with Reasons & Approval Trails */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-heading text-sm font-bold text-slate-900 mb-3">
              Faculty Leave Application Trail & Approval Notes
            </h3>
            <div className="space-y-3">
              {filteredFaculty.map(f => {
                if (!f.leaveHistory || f.leaveHistory.length === 0) return null;
                return (
                  <div key={f.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{f.name}</span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-xs text-slate-600">{f.roleOrBatch}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        {f.leaveHistory.length} Leaves Logged This Cycle
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {f.leaveHistory.map((lh, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-800">{lh.date}</span>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${
                              lh.type.includes('LWP') 
                                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {lh.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 italic mt-1">"{lh.reason}"</p>
                          <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex justify-between text-[10px]">
                            <span className="text-slate-400">Status:</span>
                            <span className={`font-bold ${lh.status.includes('Loss of Pay') ? 'text-rose-600' : 'text-emerald-600'}`}>
                              {lh.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* REPORT 4: BIOMETRIC HARDWARE AI AUDIT LOG */}
      {/* ============================================================ */}
      {currentTab === 'rep_biometric' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Total Facial Scans" value={`${filteredLogs.length} Scans`} subtext="Cycle Verified" icon={Camera} color="blue" />
            <KPICard title="Mean AI Confidence" value="99.2%" subtext="Anti-Spoof Precision" icon={ShieldCheck} color="green" />
            <KPICard title="Hardware Tablet Uptime" value="100.0%" subtext="Zero Network Dropouts" icon={BarChart3} color="purple" />
            <KPICard title="False Rejection Rate" value="< 0.008%" subtext="Within SOC-2 Mandate" icon={CheckCircle2} color="amber" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-sm font-bold text-slate-900">
                Live Biometric Hardware Verification Log ({filteredLogs.length} Events)
              </h3>
              <span className="text-xs text-slate-500 font-semibold">Active Role Filter: {selectedCategory.toUpperCase()}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Event ID</th>
                    <th className="p-3">Individual & Entity</th>
                    <th className="p-3">Campus</th>
                    <th className="p-3">Door / Gate</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Confidence</th>
                    <th className="p-3">Temperature</th>
                    <th className="p-3 text-right">Audit Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-slate-400">
                        No biometric event logs found matching the active filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map(l => (
                      <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-indigo-600">{l.id}</td>
                        <td className="p-3 font-bold text-slate-900">
                          {l.personName} <span className="text-slate-400 font-normal">({l.category})</span>
                        </td>
                        <td className="p-3 text-slate-600">{l.instituteName}</td>
                        <td className="p-3 text-slate-600">{l.cameraDoor}</td>
                        <td className="p-3 font-mono text-slate-500">{l.timestamp}</td>
                        <td className="p-3 font-mono font-black text-emerald-600">{l.confidence}% AI</td>
                        <td className="p-3 text-slate-600">{l.temperature}</td>
                        <td className="p-3 text-right font-bold text-emerald-600">✓ Biometric Passed</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
