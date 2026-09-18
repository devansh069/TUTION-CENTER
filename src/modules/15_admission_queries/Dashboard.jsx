import React, { useState, useMemo } from 'react';
import { 
  Phone, Users, Award, TrendingUp, CheckCircle2, Clock, 
  ArrowRight, Search, Sparkles, Filter, Calendar, MapPin, UserPlus, FileText
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { MOCK_INQUIRIES } from './admissionQueriesData';

export default function AdmissionQueriesDashboard({ instituteCode = 'ALL', onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter inquiries based on campus and filters
  const filteredInquiries = useMemo(() => {
    return MOCK_INQUIRIES.filter(inq => {
      const matchCampus = isAllInstitutes || inq.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchCourse = courseFilter === 'ALL' || inq.course.includes(courseFilter);
      const matchSearch = !searchTerm ||
        inq.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.course.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCampus && matchCourse && matchSearch;
    });
  }, [instituteCode, isAllInstitutes, courseFilter, searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cockpit Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-bold text-xs rounded-full border border-indigo-400/30 flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                Admissions CRM & Enrollment Command
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                2026-27 Enrollment Drive Active
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Admission Queries & Student Intake Desk</span>
            </h1>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              Consolidated lead funnel tracking digital inquiries, diagnostic scholarship tests, parent campus walk-ins, and advance token seat reservations.
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate?.('queries_leads')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Lead Sales Funnel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('queries_walkin')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Walk-in Reception Queue</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pastel Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Total Inquiries Received"
          value="1,482 Leads"
          subtitle="Current Academic Drive"
          icon="📥"
          trend="+28%"
          badge="High Velocity"
        />
        <KPICard
          theme="emerald"
          title="Walk-in & Demo Rate"
          value="42.6% Show Rate"
          subtitle="632 Physical Center Visits"
          icon="🚶‍♂️"
          trend="+6.4%"
          badge="Conversion Driver"
        />
        <KPICard
          theme="amber"
          title="Token Advance Converted"
          value="318 Enrolled"
          subtitle="₹2.45 Cr Revenue Booked"
          icon="🎯"
          badge="21.4% Final"
        />
        <KPICard
          theme="rose"
          title="Unassigned / SLA Alert"
          value="9 Leads"
          subtitle="SLA First-Call >2h Warning"
          icon="⏳"
          badge="Action Req."
        />
      </div>

      {/* Mid-Grid: 5-Stage Sales Funnel Progress + Counselor Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Funnel Velocity Progress */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Admission Funnel Pipeline Velocity
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Drop-off progression from inbound lead to enrolled seat deposit</p>
            </div>
            <button
              onClick={() => onNavigate?.('reports')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Inflow Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-4 space-y-3.5">
            {[
              { stage: '1. Inbound Inquiries (Web, Ads, Seminars)', count: 1482, pct: 100, color: 'bg-indigo-600', val: '100% Top of Funnel' },
              { stage: '2. Telephonic Academic Profiling', count: 964, pct: 65, color: 'bg-blue-600', val: '65.0% Qualified' },
              { stage: '3. Diagnostic Scholarship Test & Demo', count: 632, pct: 42.6, color: 'bg-amber-500', val: '42.6% Center Show Rate' },
              { stage: '4. Fee Offer Letter Issued', count: 420, pct: 28.3, color: 'bg-purple-600', val: '28.3% Closing Stage' },
              { stage: '5. Seat Token Paid & Enrolled', count: 318, pct: 21.4, color: 'bg-emerald-600', val: '21.4% Booked (₹2.45 Cr)' }
            ].map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    {f.stage}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-normal text-[11px]">{f.val}</span>
                    <span className="font-bold text-slate-900 font-mono">{f.count} Students</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${f.pct}%` }} 
                    className={`h-full ${f.color} rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall Inflow-to-Enrollment Yield: <strong className="text-emerald-700 font-bold">21.4%</strong></span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
              Target Exceeded (+3.4% YoY)
            </span>
          </div>
        </div>

        {/* Counselor Performance Leaderboard */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Counselor Closing Leaderboard
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Top enrollment conversion drivers this month</p>
            </div>
            <span className="text-xs font-bold text-slate-400">Current Term</span>
          </div>

          <div className="divide-y divide-slate-100 py-1 space-y-1">
            {[
              { name: 'Pooja Nair', center: 'Alpha Kota & Tech', enrollments: 84, revenue: '₹65.2 Lakhs', rate: '28.4%', badge: 'Top Performer' },
              { name: 'Vikram Joshi', center: 'Apex Medical Prep', enrollments: 68, revenue: '₹54.8 Lakhs', rate: '25.1%', badge: 'Gold Tier' },
              { name: 'Meera Rao', center: 'Delta Coding & AI', enrollments: 54, revenue: '₹42.0 Lakhs', rate: '22.8%', badge: 'Consistent' },
              { name: 'Catherine Miller, FCA', center: 'Beta Commerce Academy', enrollments: 48, revenue: '₹37.2 Lakhs', rate: '26.2%', badge: 'CA Specialist' },
              { name: 'Adv. Meenakshi Sundaram', center: 'Zenith Humanities & Law', enrollments: 24, revenue: '₹18.6 Lakhs', rate: '21.0%', badge: 'Law Specialist' },
            ].map((counselor, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center font-mono">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{counselor.name}</div>
                    <div className="text-[11px] text-slate-400">{counselor.center}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-600 font-mono">{counselor.revenue}</div>
                  <div className="text-[10px] text-slate-500">{counselor.enrollments} Seats ({counselor.rate})</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate?.('queries_leads')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>View Full Pipeline Assignments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filterable Active Inquiries Queue */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Active Student Admission Inquiries Master List</h3>
            <p className="text-xs text-slate-500">Live prospective student pipeline requiring counseling contact or diagnostic scheduling</p>
          </div>

          {/* Search & Course Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <input
                type="text"
                placeholder="Search by student, parent, ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>

            <select
              value={courseFilter}
              onChange={e => setCourseFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Courses</option>
              <option value="IIT-JEE">IIT-JEE Engineering</option>
              <option value="NEET">NEET Medical Prep</option>
              <option value="Foundation">K-10 Foundation</option>
              <option value="CA">CA Commerce Foundation</option>
              <option value="CLAT">CLAT Law Entrance</option>
            </select>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Lead ID & Date</th>
                <th className="py-3 px-4">Student & Target Goal</th>
                <th className="py-3 px-4">Parent & Contact</th>
                <th className="py-3 px-4">Campus & Source</th>
                <th className="py-3 px-4">Current Pipeline Stage</th>
                <th className="py-3 px-4">Assigned Counselor</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInquiries.map(inq => (
                <tr key={inq.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-indigo-600">{inq.id}</div>
                    <div className="text-[11px] text-slate-400">{inq.createdDate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{inq.studentName}</div>
                    <div className="text-[11px] text-indigo-700 font-semibold">{inq.course}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{inq.parentName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{inq.parentPhone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-700">{inq.instituteName}</div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                      {inq.source}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      inq.stage.includes('5.') 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : inq.stage.includes('4.')
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : inq.stage.includes('3.')
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {inq.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    {inq.counselor}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate?.('queries_leads')}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      Lead Dossier →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
