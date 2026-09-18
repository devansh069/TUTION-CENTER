import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, Clock, Send, CheckCircle2, Search, Filter, 
  User, GraduationCap, Briefcase, Calendar, PhoneCall, ShieldAlert, ChevronRight
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { LATE_COMERS_ANOMALIES_DATA, ATTENDANCE_USERS_DATA, INSTITUTES_DATA } from '../../data/erpData';

export default function LateAbsentAnomalies({ instituteCode = 'all' }) {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'student' | 'teacher' | 'general'
  const [searchQuery, setSearchQuery] = useState('');
  const [repeatFilter, setRepeatFilter] = useState('all'); // 'all' | 'chronic' (>=3) | 'first_time'

  // Case-insensitive institute normalization
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Base list scoped to institute
  const campusAnomalies = useMemo(() => {
    return LATE_COMERS_ANOMALIES_DATA.filter(a => 
      isAllInstitutes || a.instituteCode?.toLowerCase() === instituteCode?.toLowerCase()
    );
  }, [instituteCode, isAllInstitutes]);

  // Dynamic counts for category tabs
  const allCount = campusAnomalies.length;
  const studentCount = campusAnomalies.filter(a => a.category === 'student').length;
  const teacherCount = campusAnomalies.filter(a => a.category === 'teacher').length;
  const staffCount = campusAnomalies.filter(a => a.category === 'general').length;
  const chronicCount = campusAnomalies.filter(a => a.repeatCount >= 3).length;

  // Filtered by active category, search, and frequency
  const filteredAnomalies = useMemo(() => {
    return campusAnomalies.filter(a => {
      const matchCat = selectedCategory === 'all' || a.category === selectedCategory;
      const matchSearch = !searchQuery || 
        a.personName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        a.roleOrBatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.reason.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRepeat = repeatFilter === 'all' || 
        (repeatFilter === 'chronic' && a.repeatCount >= 3) ||
        (repeatFilter === 'first_time' && a.repeatCount < 3);
      return matchCat && matchSearch && matchRepeat;
    });
  }, [campusAnomalies, selectedCategory, searchQuery, repeatFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-extrabold uppercase tracking-wide border border-rose-200">
              Disciplinary & Attendance Exceptions
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">September 2026 Audit</span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <AlertTriangle className="w-6 h-6 mr-2 text-rose-600" /> Late Arrivals & Absenteeism Exceptions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated parent SMS tracking, delayed teacher coverage, chronic repeat offender flags, and counselor intervention triggers.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Total Late Incidents" 
          value={`${campusAnomalies.length} Flagged`} 
          subtext="Students, Teachers & Staff" 
          icon={AlertTriangle} 
          color="rose" 
          badge="Active Today" 
        />
        <KPICard 
          title="Parent SMS Dispatch" 
          value="100% Delivered" 
          subtext="Zero Gateway Failures" 
          icon={Send} 
          color="green" 
          badge="Automated" 
        />
        <KPICard 
          title="Chronic Repeaters (3+ Lates)" 
          value={`${chronicCount} Individuals`} 
          subtext="Requires Counselor Action" 
          icon={Clock} 
          color="amber" 
          badge="High Priority" 
        />
        <KPICard 
          title="Teacher Delays Managed" 
          value={`${teacherCount} Handled`} 
          subtext="Substitute Faculty Deployed" 
          icon={ShieldAlert} 
          color="purple" 
          badge="Zero Class Drop" 
        />
      </div>

      {/* Category Toggle Tabs & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              selectedCategory === 'all' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Categories ({allCount})
          </button>
          <button
            onClick={() => setSelectedCategory('student')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center ${
              selectedCategory === 'student' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1 text-blue-500" /> Students ({studentCount})
          </button>
          <button
            onClick={() => setSelectedCategory('teacher')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center ${
              selectedCategory === 'teacher' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Faculty ({teacherCount})
          </button>
          <button
            onClick={() => setSelectedCategory('general')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center ${
              selectedCategory === 'general' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 mr-1 text-purple-500" /> Staff ({staffCount})
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={repeatFilter}
            onChange={(e) => setRepeatFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
          >
            <option value="all">All Frequency Levels</option>
            <option value="chronic">Chronic Repeaters (3+ Times)</option>
            <option value="first_time">Occasional (&lt;3 Times)</option>
          </select>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or reason..." 
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-48 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Main Incident Exceptions Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading text-sm font-bold text-slate-900">
            Showing {filteredAnomalies.length} Records ({selectedCategory.toUpperCase()})
          </h3>
          <span className="text-xs text-slate-500">Auto-synced with biometric turnstiles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Person & Entity</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Shift vs Check-in</th>
                <th className="p-3">Delay & Reason</th>
                <th className="p-3">Frequency / Offense</th>
                <th className="p-3">Parent / Dean Notification</th>
                <th className="p-3 text-right">Intervention Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAnomalies.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    No anomaly records found matching the active filters.
                  </td>
                </tr>
              ) : (
                filteredAnomalies.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          a.category === 'student' ? 'bg-blue-100 text-blue-800' :
                          a.category === 'teacher' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {a.personName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{a.personName}</p>
                          <p className="text-[10px] text-slate-500">{a.roleOrBatch} • <span className="font-mono">{a.personId}</span></p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 text-slate-600 font-medium">
                      {a.instituteName}
                    </td>

                    <td className="p-3">
                      <div className="font-mono text-[11px]">
                        <span className="text-slate-400">Scheduled: {a.scheduledTime}</span>
                        <p className="font-bold text-rose-600">Arrived: {a.actualCheckIn}</p>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200 inline-block mb-1">
                        +{a.delayMinutes} Minutes Delay
                      </span>
                      <p className="text-[11px] text-slate-600 italic">"{a.reason}"</p>
                    </td>

                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        a.repeatCount >= 3 
                          ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse' 
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {a.repeatCount}th Time this Month
                      </span>
                      {a.repeatCount >= 3 && (
                        <p className="text-[9px] text-rose-600 font-bold mt-1">⚠️ Chronic Offender</p>
                      )}
                    </td>

                    <td className="p-3">
                      <div className="flex items-center text-emerald-600 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 shrink-0" />
                        <span>{a.smsStatus}</span>
                      </div>
                    </td>

                    <td className="p-3 text-right">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                        a.actionStatus.includes('Required') 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {a.actionStatus}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">{a.counselorAction}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
