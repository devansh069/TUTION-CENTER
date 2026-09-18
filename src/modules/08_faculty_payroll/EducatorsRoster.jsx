import React, { useState, useMemo } from 'react';
import { 
  Users, Search, Star, Award, Mail, Phone, Building2, 
  BookOpen, Clock, Calendar, CheckCircle2, AlertTriangle, 
  ExternalLink, ChevronRight, X, Shield, Sparkles, Filter
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { getFacultyByInstitute } from './facultyPayrollData';

export default function EducatorsRoster({ instituteCode = 'all' }) {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null); // For 360 Dossier Modal

  const allFaculty = useMemo(() => {
    return getFacultyByInstitute(instituteCode);
  }, [instituteCode]);

  const departments = useMemo(() => {
    const set = new Set(allFaculty.map(f => f.department));
    return ['all', ...Array.from(set)];
  }, [allFaculty]);

  const filteredFaculty = useMemo(() => {
    return allFaculty.filter(f => {
      const matchDept = selectedDept === 'all' || f.department === selectedDept;
      const matchSearch = !search || 
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.department.toLowerCase().includes(search.toLowerCase()) ||
        f.qualifications.toLowerCase().includes(search.toLowerCase()) ||
        f.id.toLowerCase().includes(search.toLowerCase()) ||
        f.instituteName.toLowerCase().includes(search.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [allFaculty, selectedDept, search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-w-0">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
              Module 08 • Faculty Directory
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Academic Year 2026-27
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 mt-1">
            Faculty Educators Master Roster
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Subject matter experts, academic qualifications, assigned coaching batches, workload capacity, and student evaluations.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            {filteredFaculty.length} Master Educators Active
          </span>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Total Faculty Roster" 
          value={`${filteredFaculty.length} Educators`} 
          subtext="Under Active Center Scope" 
          icon={Users} 
          color="blue" 
          badge="Verified" 
        />
        <KPICard 
          title="Ph.D. & Masters Ratio" 
          value="93.8%" 
          subtext="Advanced Academic Degrees" 
          icon={Award} 
          color="green" 
          badge="Tier-1 Pedagogy" 
        />
        <KPICard 
          title="Mean Student Rating" 
          value="4.86 / 5.0" 
          subtext="From 11,480 App Evaluations" 
          icon={Star} 
          color="amber" 
          badge="Exemplary" 
        />
        <KPICard 
          title="Active Coaching Batches" 
          value="24 Batches" 
          subtext="IIT-JEE, NEET, CA & Olympiad" 
          icon={BookOpen} 
          color="purple" 
          badge="In Session" 
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search educator name, qualification, subject, campus..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2.5 outline-none focus:border-indigo-600 font-medium transition" 
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-xs font-bold text-slate-500">Department:</span>
          <select 
            value={selectedDept} 
            onChange={e => setSelectedDept(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-indigo-600 font-bold text-slate-700 cursor-pointer"
          >
            {departments.map(d => (
              <option key={d} value={d}>
                {d === 'all' ? 'All Specializations' : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map(f => (
          <div 
            key={f.id} 
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header Profile Row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={f.photo} 
                    alt={f.name} 
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-100 shadow-xs" 
                  />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-slate-900 leading-tight">
                      {f.name}
                    </h4>
                    <p className="text-[11px] text-indigo-600 font-bold mt-0.5">{f.designation}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{f.id} • {f.department}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black flex items-center shrink-0">
                  ★ {f.ratings.overall}
                </span>
              </div>

              {/* Campus & Credentials Pill */}
              <div className="mt-3.5 space-y-1.5 text-xs">
                <div className="flex items-center text-slate-600 text-[11px]">
                  <Building2 className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                  <span className="font-medium truncate">{f.instituteName}</span>
                </div>
                <div className="flex items-center text-slate-600 text-[11px]">
                  <Award className="w-3.5 h-3.5 mr-1.5 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">{f.qualifications}</span>
                </div>
              </div>

              {/* Active Batches */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Allocated Batches ({f.batchCount})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {f.activeBatches.map((b, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200/60"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workload Capacity Bar */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Workload Capacity:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {f.weeklyTeachingHours}h / {f.maxCapacityHours}h wk ({f.utilizationRate}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      f.utilizationRate >= 95 ? 'bg-amber-500' : 'bg-indigo-600'
                    }`} 
                    style={{ width: `${Math.min(f.utilizationRate, 100)}%` }}
                  />
                </div>
              </div>

              {/* Attendance Indicator */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  Biometric: <strong className="ml-1 text-slate-900">{f.attendanceRate}%</strong>
                </span>
                {f.excessLeaves > 0 ? (
                  <span className="text-rose-600 font-bold">+{f.excessLeaves}d LWP Deducted</span>
                ) : (
                  <span className="text-emerald-600 font-bold">100% In Quota</span>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 border-t border-slate-100">
              <button 
                onClick={() => setSelectedFaculty(f)}
                className="w-full py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-xs font-bold text-slate-700 transition flex items-center justify-center space-x-1.5"
              >
                <span>View Faculty 360° Dossier</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: Faculty 360° Dossier */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between shrink-0">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedFaculty.photo} 
                  alt={selectedFaculty.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400 shadow-md" 
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-heading text-lg font-bold text-white">
                      {selectedFaculty.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/40">
                      ★ {selectedFaculty.ratings.overall}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300 font-semibold">{selectedFaculty.designation}</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">{selectedFaculty.instituteName} • {selectedFaculty.campusCity}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFaculty(null)} 
                className="p-1 rounded-lg hover:bg-white/10 text-white/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
              {/* Top Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Faculty ID</span>
                  <span className="font-bold text-slate-800 font-mono text-xs">{selectedFaculty.id}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Experience</span>
                  <span className="font-bold text-slate-800 text-xs">{selectedFaculty.experienceYears} Years</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Attendance Rate</span>
                  <span className="font-bold text-emerald-600 text-xs">{selectedFaculty.attendanceRate}%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Monthly Honorarium</span>
                  <span className="font-bold text-slate-900 font-mono text-xs">${selectedFaculty.monthlySalary.toLocaleString()}</span>
                </div>
              </div>

              {/* Academic Credentials */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-xs flex items-center">
                  <Award className="w-4 h-4 mr-1.5 text-indigo-600" /> Academic Degrees & Credentials
                </h4>
                <p className="text-slate-700 font-medium">{selectedFaculty.qualifications}</p>
                <p className="text-[11px] text-slate-500">Joined Institute: {selectedFaculty.joiningDate}</p>
              </div>

              {/* Student Rating Dimensions */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center">
                  <Star className="w-4 h-4 mr-1.5 text-amber-500" /> Student App Evaluation Scorecard ({selectedFaculty.ratings.totalReviews} Reviews)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Concept Clarity</span>
                    <span className="font-black text-slate-900 text-sm">{selectedFaculty.ratings.conceptClarity}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Punctuality</span>
                    <span className="font-black text-slate-900 text-sm">{selectedFaculty.ratings.punctualityScore}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Doubt Solving</span>
                    <span className="font-black text-slate-900 text-sm">{selectedFaculty.ratings.doubtSolving}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Exam Readiness</span>
                    <span className="font-black text-slate-900 text-sm">{selectedFaculty.ratings.examReadiness}%</span>
                  </div>
                </div>
              </div>

              {/* Attendance & Leave Records This Month */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-indigo-600" /> September Biometric Absences & Salary Cuts
                  </h4>
                  <span className="text-[11px] font-bold text-slate-500">
                    Per-day rate: ${selectedFaculty.perDayRate.toFixed(2)}
                  </span>
                </div>

                {selectedFaculty.leaveHistory.length === 0 ? (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center font-semibold">
                    100% Attendance streak. Zero leaves taken this month.
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {selectedFaculty.leaveHistory.map((l, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-900">{l.date}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              l.isLWP ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {l.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{l.reason}</p>
                        </div>
                        <div className="text-right">
                          <span className={`font-mono font-bold text-xs ${
                            l.isLWP ? 'text-rose-600 font-black' : 'text-slate-400'
                          }`}>
                            {l.isLWP ? `-$${l.deduction.toFixed(2)}` : '$0.00'}
                          </span>
                          <span className="block text-[10px] text-slate-400">{l.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Verified Student Feedback Snippet */}
              {selectedFaculty.ratings.recentReviews.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs">Recent Verified Student Review:</h4>
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-950">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{selectedFaculty.ratings.recentReviews[0].student} ({selectedFaculty.ratings.recentReviews[0].batch})</span>
                      <span className="text-amber-600 font-bold">★ {selectedFaculty.ratings.recentReviews[0].rating}.0</span>
                    </div>
                    <p className="text-[11px] italic text-amber-900">
                      "{selectedFaculty.ratings.recentReviews[0].comment}"
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500">Contact: {selectedFaculty.email}</span>
              <button 
                onClick={() => setSelectedFaculty(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
