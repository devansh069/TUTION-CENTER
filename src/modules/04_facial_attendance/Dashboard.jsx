import React, { useState, useMemo } from 'react';
import { 
  Camera, CheckCircle2, Clock, AlertTriangle, UserCheck, ShieldCheck, 
  Calendar, Users, User, GraduationCap, Briefcase, ChevronRight, X, 
  Search, Filter, Send, Download, Sparkles, DollarSign, Bell, ExternalLink
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import CalendarMatrix from '../../components/common/CalendarMatrix';
import { ComplianceBarChart } from '../../components/common/Charts';
import { 
  ATTENDANCE_USERS_DATA, 
  FACIAL_LOGS_DATA, 
  LATE_COMERS_ANOMALIES_DATA,
  INSTITUTES_DATA 
} from '../../data/erpData';

export default function Dashboard({ instituteCode = 'all', onNavigate }) {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'student' | 'teacher' | 'general'
  const [selectedUserId, setSelectedUserId] = useState('STU-1001'); // Default to Aarav Sharma
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Day Inspection Modal State
  const [inspectingDay, setInspectingDay] = useState(null);

  // Case-insensitive institute normalization
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Base Users list scoped to institute
  const campusUsers = useMemo(() => {
    return ATTENDANCE_USERS_DATA.filter(u => 
      isAllInstitutes || u.instituteCode?.toLowerCase() === instituteCode?.toLowerCase()
    );
  }, [instituteCode, isAllInstitutes]);

  // Filter users by Institute & Category
  const filteredUsers = useMemo(() => {
    return campusUsers.filter(u => {
      const matchCat = selectedCategory === 'all' || u.type === selectedCategory;
      const matchSearch = !searchQuery || 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.roleOrBatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [campusUsers, selectedCategory, searchQuery]);

  // Selected active user object
  const activeUser = useMemo(() => {
    return filteredUsers.find(u => u.id === selectedUserId) || filteredUsers[0] || campusUsers[0] || ATTENDANCE_USERS_DATA[0];
  }, [selectedUserId, filteredUsers, campusUsers]);

  // Filter logs by Institute & Category
  const filteredLogs = useMemo(() => {
    return FACIAL_LOGS_DATA.filter(l => {
      const matchInst = isAllInstitutes || l.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchCat = selectedCategory === 'all' || l.category === selectedCategory;
      return matchInst && matchCat;
    });
  }, [instituteCode, isAllInstitutes, selectedCategory]);

  // Aggregate KPI stats
  const totalCheckInsToday = filteredLogs.length;
  const onTimeCheckIns = filteredLogs.filter(l => l.status.toLowerCase().includes('on time')).length;
  const lateCheckIns = filteredLogs.filter(l => l.status.toLowerCase().includes('late')).length;
  const punctualityRate = totalCheckInsToday > 0 ? ((onTimeCheckIns / totalCheckInsToday) * 100).toFixed(1) : '94.8';

  // Faculty with salary cuts
  const facultyWithDeductions = useMemo(() => {
    return campusUsers.filter(u => 
      u.type === 'teacher' && 
      u.salaryDeduction > 0
    );
  }, [campusUsers]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
              Module 04 • Hardware AI
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
              10 Turnstile Tablets Live
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Camera className="w-6 h-6 mr-2 text-indigo-600" /> Facial Check-in AI & Attendance Command Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Biometric check-in matrices for Students, Teachers & Staff, live turnstile stream, late arrivals, and faculty leave salary cuts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onNavigate && onNavigate('reports', 'rep_faculty_leave')}
            className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center border border-amber-200 transition-colors shadow-2xs"
          >
            <DollarSign className="w-4 h-4 mr-1.5 text-amber-600" />
            Faculty Pay Cuts ({facultyWithDeductions.length})
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('late_anomalies')}
            className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold flex items-center border border-rose-200 transition-colors shadow-2xs"
          >
            <AlertTriangle className="w-4 h-4 mr-1.5 text-rose-600" />
            Late Comers ({lateCheckIns})
          </button>
        </div>
      </div>

      {/* 4 Pastel KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Today Facial Check-ins" 
          value={`${totalCheckInsToday} Authenticated`} 
          subtext="Students, Teachers & Staff" 
          icon={UserCheck} 
          color="blue" 
          badge="Live 120ms Latency" 
        />
        <KPICard 
          title="Campus Punctuality" 
          value={`${punctualityRate}%`} 
          subtext={`${onTimeCheckIns} of ${totalCheckInsToday} Prompt Arrival`} 
          icon={CheckCircle2} 
          color="green" 
          badge="Optimal" 
        />
        <KPICard 
          title="Late Check-ins Flagged" 
          value={`${lateCheckIns} Detected`} 
          subtext="Parent SMS Dispatched Automatically" 
          icon={Clock} 
          color="amber" 
          badge="SMS Triggered" 
        />
        <KPICard 
          title="AI Confidence & Precision" 
          value="99.2% Avg" 
          subtext="Anti-Spoofing & Liveness Active" 
          icon={ShieldCheck} 
          color="purple" 
          badge="SOC-2 Certified" 
        />
      </div>

      {/* 8-Metric Real-Time Telemetry Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Students On-Site</p>
          <p className="text-sm font-black text-indigo-700 mt-0.5">1,420</p>
          <span className="text-[9px] text-emerald-600 font-bold">96.8% Present</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Faculty On-Site</p>
          <p className="text-sm font-black text-emerald-700 mt-0.5">38 / 42</p>
          <span className="text-[9px] text-slate-500 font-medium">4 On Approved Leave</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Staff Logged</p>
          <p className="text-sm font-black text-slate-800 mt-0.5">19 / 20</p>
          <span className="text-[9px] text-emerald-600 font-bold">1 Late Handled</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hardware Turnstiles</p>
          <p className="text-sm font-black text-purple-700 mt-0.5">10 Online</p>
          <span className="text-[9px] text-purple-600 font-bold">100% Uptime</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scan Latency</p>
          <p className="text-sm font-black text-amber-700 mt-0.5">118 ms</p>
          <span className="text-[9px] text-slate-500 font-medium">Instant Open</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parent SMS Delivery</p>
          <p className="text-sm font-black text-emerald-700 mt-0.5">100%</p>
          <span className="text-[9px] text-emerald-600 font-bold">Zero Drops</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teacher LWP Cuts</p>
          <p className="text-sm font-black text-rose-700 mt-0.5">{facultyWithDeductions.length} Staff</p>
          <span className="text-[9px] text-rose-600 font-bold">Excess Leaves</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Spoofing Blocks</p>
          <p className="text-sm font-black text-emerald-700 mt-0.5">0 Incidents</p>
          <span className="text-[9px] text-emerald-600 font-bold">Liveness 100%</span>
        </div>
      </div>

      {/* FILTER CONTROLS BAR (Students, Teachers, General Staff, User Selector & Month) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => {
                setSelectedCategory('all');
                if (campusUsers.length > 0) setSelectedUserId(campusUsers[0].id);
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-white text-indigo-700 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Entities ({campusUsers.length})
            </button>
            <button
              onClick={() => {
                setSelectedCategory('student');
                const students = campusUsers.filter(u => u.type === 'student');
                if (students.length > 0) setSelectedUserId(students[0].id);
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center ${
                selectedCategory === 'student' 
                  ? 'bg-white text-indigo-700 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 mr-1 text-blue-500" />
              Students ({campusUsers.filter(u => u.type === 'student').length})
            </button>
            <button
              onClick={() => {
                setSelectedCategory('teacher');
                const teachers = campusUsers.filter(u => u.type === 'teacher');
                if (teachers.length > 0) setSelectedUserId(teachers[0].id);
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center ${
                selectedCategory === 'teacher' 
                  ? 'bg-white text-indigo-700 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Teachers / Faculty ({campusUsers.filter(u => u.type === 'teacher').length})
            </button>
            <button
              onClick={() => {
                setSelectedCategory('general');
                const staff = campusUsers.filter(u => u.type === 'general');
                if (staff.length > 0) setSelectedUserId(staff[0].id);
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center ${
                selectedCategory === 'general' 
                  ? 'bg-white text-indigo-700 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 mr-1 text-purple-500" />
              Staff & Visitors ({campusUsers.filter(u => u.type === 'general').length})
            </button>
          </div>

          {/* User Selector Dropdown & Month Select */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500">Select Individual:</span>
              <select
                value={activeUser.id}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                {filteredUsers.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} — [{u.type.toUpperCase()}: {u.roleOrBatch}]
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="September 2026">September, 2026 (Current Cycle)</option>
                <option value="August 2026">August, 2026</option>
                <option value="July 2026">July, 2026</option>
              </select>
            </div>
          </div>
        </div>

        {/* Selected User Header Card Banner */}
        {activeUser && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <img 
                src={activeUser.photo} 
                alt={activeUser.name} 
                className="w-13 h-13 rounded-2xl object-cover border-2 border-indigo-200 shadow-xs shrink-0" 
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-black text-slate-900 text-base">{activeUser.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                    activeUser.type === 'student' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : activeUser.type === 'teacher' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}>
                    {activeUser.type}
                  </span>
                  <span className="font-mono text-xs text-slate-400">({activeUser.id})</span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  <span className="font-bold text-indigo-700">{activeUser.roleOrBatch}</span> • {activeUser.instituteName}
                </p>
                {activeUser.type === 'student' && (
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Parent: <span className="font-semibold text-slate-700">{activeUser.parentName}</span> ({activeUser.parentPhone})
                  </p>
                )}
              </div>
            </div>

            {/* Quick Metrics for Active User */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Attendance Rate</span>
                <span className="font-bold text-emerald-600 text-sm">{activeUser.attendanceRate}%</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Logged Hours</span>
                <span className="font-bold text-slate-900 text-sm">{activeUser.totalHoursLogged} / {activeUser.expectedHours}h</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">On-Time Streak</span>
                <span className="font-bold text-indigo-600 text-sm">{activeUser.punctualityStreak}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Late Incidents</span>
                <span className={`font-bold text-sm ${activeUser.lateCount > 2 ? 'text-rose-600' : 'text-amber-600'}`}>
                  {activeUser.lateCount} Days
                </span>
              </div>

              {/* If Teacher: Show Leave Balance & Pay Impact */}
              {activeUser.type === 'teacher' && (
                <div className={`px-3 py-1.5 rounded-xl border ${
                  activeUser.excessLeaves > 0 
                    ? 'bg-rose-50 border-rose-200 text-rose-800' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  <span className="text-[10px] font-bold uppercase block">Leaves / Pay Impact</span>
                  <span className="font-extrabold text-sm">
                    {activeUser.leavesTakenThisMonth} Taken ({activeUser.excessLeaves} Excess LWP) • 
                    {activeUser.excessLeaves > 0 ? ` -$${activeUser.salaryDeduction.toLocaleString()} Cut` : ' Full Salary'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CORE DISPLAY: CAMPUS BIOMETRIC ATTENDANCE MATRIX & TEACHER LEAVE SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* The Exact Calendar Matrix Widget requested by user */}
        <div className="lg:col-span-7">
          <CalendarMatrix 
            title="Campus Biometric Attendance Matrix" 
            subtitle={`${selectedMonth.toUpperCase()} ${activeUser.type.toUpperCase()} CHECK-IN LOG (${activeUser.name.toUpperCase()})`} 
            hoursLoggedText={`${activeUser.totalHoursLogged} / ${activeUser.expectedHours} hrs logged`}
            calendarDays={activeUser.monthMatrix}
            onSelectDay={(day) => setInspectingDay(day)}
            selectedDayNum={inspectingDay?.num}
          />
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 mt-2 text-[11px] text-indigo-800 flex items-center justify-between">
            <span className="flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-600 shrink-0" />
              💡 <strong>Interactive Matrix:</strong> Click any day cell in the calendar to inspect full facial scan metadata, gate photos, and parent SMS delivery logs.
            </span>
            {inspectingDay && (
              <span className="font-bold text-indigo-600 underline cursor-pointer" onClick={() => setInspectingDay(null)}>
                Clear Selection
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Teacher Leaves & Pay Reduction Watch or Compliance Gauge */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Dedicated Teacher Leaves & Pay Reduction Widget */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-emerald-600" /> Teacher Leaves & Salary Deductions
                </h3>
                <p className="text-[11px] text-slate-500">
                  Faculty leave quota audits and loss-of-pay deductions for excess unapproved absences.
                </p>
              </div>
              <button 
                onClick={() => onNavigate && onNavigate('reports', 'rep_faculty_leave')}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                Full Ledger <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {campusUsers.filter(u => u.type === 'teacher').slice(0, 4).map(teacher => {
                const hasExcess = teacher.excessLeaves > 0;
                return (
                  <div 
                    key={teacher.id} 
                    onClick={() => {
                      setSelectedUserId(teacher.id);
                      setSelectedCategory('teacher');
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer hover:shadow-2xs ${
                      activeUser.id === teacher.id 
                        ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-400' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img src={teacher.photo} alt={teacher.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                        <div>
                          <p className="font-bold text-xs text-slate-900">{teacher.name}</p>
                          <p className="text-[10px] text-slate-500">{teacher.roleOrBatch}</p>
                        </div>
                      </div>

                      {hasExcess ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-200">
                          -${teacher.salaryDeduction.toLocaleString()} Cut ({teacher.excessLeaves}d Excess)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {teacher.leavesLeft} Leaves Left (0 Cut)
                        </span>
                      )}
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-200/60 grid grid-cols-4 gap-1 text-center text-[10px]">
                      <div>
                        <span className="text-slate-400 block">Granted</span>
                        <span className="font-bold text-slate-700">{teacher.monthlyLeavesGranted}d / mo</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Taken</span>
                        <span className="font-bold text-slate-900">{teacher.leavesTakenThisMonth} days</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Base Pay</span>
                        <span className="font-bold text-slate-700">${teacher.monthlySalary.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Net Payout</span>
                        <span className={`font-bold ${hasExcess ? 'text-rose-700' : 'text-emerald-700'}`}>
                          ${Math.round(teacher.netSalary).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Entrance Stream Compliance Bar */}
          <ComplianceBarChart 
            title="Daily Entrance Stream Compliance" 
            target={100} 
            current={94} 
            statusMessage="94% students checked in within 10 minutes of gate open" 
          />
        </div>
      </div>

      {/* LIVE ENTRANCE CAMERA EVENT STREAM (RECENT FACIAL MATCHES) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-indigo-600" /> Real-time Entrance Camera Event Stream
            </h3>
            <p className="text-xs text-slate-500">Live facial recognition matches, body temperature scans, and parent SMS triggers.</p>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('live_stream')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            View All Turnstile Cameras <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLogs.slice(0, 6).map(l => (
            <div 
              key={l.id} 
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3.5 hover:bg-slate-100/70 transition-all hover:shadow-2xs"
            >
              <img src={l.photo} alt={l.personName} className="w-13 h-13 rounded-xl object-cover border border-slate-300 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xs text-slate-900 truncate">{l.personName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{l.roleOrBatch}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                    l.status.toLowerCase().includes('late') 
                      ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {l.status}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>📷 {l.cameraDoor}</span>
                  <span className="font-bold text-emerald-600">{l.confidence}% AI</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>⏱️ {l.timestamp}</span>
                  <span>🌡️ {l.temperature}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: DAY BIOMETRIC SCAN DOSSIER (Opened when user clicks any day cell in the matrix) */}
      {inspectingDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
                  Biometric Day Inspector • Day {inspectingDay.num}
                </span>
                <h3 className="font-heading font-black text-lg">
                  {selectedMonth.split(',')[0]} {inspectingDay.num}, 2026 — {activeUser.name}
                </h3>
              </div>
              <button 
                onClick={() => setInspectingDay(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Status Header Pill */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                    inspectingDay.status === 'approved' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : inspectingDay.status === 'submitted' 
                      ? 'bg-amber-100 text-amber-700' 
                      : inspectingDay.status === 'draft' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {inspectingDay.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{inspectingDay.statusLabel || inspectingDay.status}</h4>
                    <p className="text-xs text-slate-500">Logged Hours: <span className="font-bold text-indigo-600">{inspectingDay.hours || 'None'}</span></p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                  inspectingDay.status === 'approved' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : inspectingDay.status === 'submitted' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-slate-200 text-slate-800'
                }`}>
                  {inspectingDay.status}
                </span>
              </div>

              {/* Scan Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Check-in Timestamp</span>
                  <span className="font-black text-slate-900 text-sm">{inspectingDay.checkIn || 'No Record'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Check-out Timestamp</span>
                  <span className="font-black text-slate-900 text-sm">{inspectingDay.checkOut || 'No Record'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Hardware Turnstile Node</span>
                  <span className="font-bold text-indigo-700">{inspectingDay.cameraDoor || 'Main Entrance'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">AI Match Confidence</span>
                  <span className="font-bold text-emerald-600">{inspectingDay.confidence ? `${inspectingDay.confidence}% Verified` : 'N/A'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Thermal Temperature</span>
                  <span className="font-bold text-slate-800">{inspectingDay.temp || '36.5°C Normal'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Liveness Anti-Spoof</span>
                  <span className="font-bold text-slate-800">{inspectingDay.liveness || 'Passed Genuine'}</span>
                </div>
              </div>

              {/* Remarks / Notifications */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Audit Notes & Dispatch:</span>
                <p className="text-slate-700 font-medium">
                  {inspectingDay.remarks || 'Standard verified biometric attendance log record. No anomaly flagged.'}
                </p>
                {activeUser.type === 'student' && (
                  <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-emerald-700 font-bold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Parent SMS auto-dispatched to {activeUser.parentPhone}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setInspectingDay(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                >
                  Close Dossier
                </button>
                <button
                  onClick={() => {
                    alert(`Dispatched manual verification receipt for Day ${inspectingDay.num} to ${activeUser.name}`);
                    setInspectingDay(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
                >
                  Resend Attendance Slip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
