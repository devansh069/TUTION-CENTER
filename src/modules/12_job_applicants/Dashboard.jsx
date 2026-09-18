import React, { useState, useMemo } from 'react';
import { 
  Briefcase, Users, Star, CheckCircle2, Calendar, 
  ArrowRight, Video, FileText, TrendingUp, Sparkles, Filter, Search, Award
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { MOCK_APPLICANTS, REQUISITIONS_DATA } from './jobApplicantsData';

export default function Dashboard({ instituteCode = 'ALL', onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('ALL');

  // Normalize institute scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter candidates according to selected multi-tenant campus
  const filteredApplicants = useMemo(() => {
    return MOCK_APPLICANTS.filter(a => {
      const matchCampus = isAllInstitutes || a.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchSubject = subjectFilter === 'ALL' || a.subject === subjectFilter;
      const matchSearch = !searchTerm || 
        a.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCampus && matchSubject && matchSearch;
    });
  }, [instituteCode, isAllInstitutes, subjectFilter, searchTerm]);

  // Telemetry computations
  const totalActive = filteredApplicants.length;
  const demosScheduled = filteredApplicants.filter(a => a.stage === 'Demo Lecture Round' || a.demoStatus === 'Scheduled').length;
  const offersExtended = filteredApplicants.filter(a => a.stage === 'Offer Extended' || a.status.includes('Offer')).length;
  const joinedCount = filteredApplicants.filter(a => a.stage === 'Joined & Onboarded' || a.status === 'Onboarded').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Module Banner / Cockpit Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-bold text-xs rounded-full border border-indigo-400/30 flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                Faculty Talent Acquisition HQ
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Academic Year 2026-27 Hiring Drive
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Educator Recruitment & Hiring Command</span>
            </h1>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              Consolidated applicant vetting for IIT-JEE, NEET, CA Foundation & Olympiad faculty.
              Monitor live teaching demo evaluations, pedigree verification, and offer releases across campuses.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate?.('recruitment_pipeline')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Pipeline Kanban</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('demo_lectures')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Demo Scorecards ({demosScheduled})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pastel Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Active Candidate Pool"
          value={`${totalActive} Applicants`}
          subtitle="Screened across departments"
          icon="👥"
          badge="+24% This Month"
        />
        <KPICard
          theme="amber"
          title="Demo Lectures in Play"
          value={`${demosScheduled} Teaching Demos`}
          subtitle="Smartboard & classroom audits"
          icon="📹"
          badge="High Priority"
        />
        <KPICard
          theme="emerald"
          title="Offer Acceptance Rate"
          value="89.5% Converted"
          subtitle={`${offersExtended} Offers Out • ${joinedCount} Joined`}
          icon="📜"
          badge="Above 85% Benchmark"
        />
        <KPICard
          theme="rose"
          title="Avg Velocity (Time-to-Hire)"
          value="14.2 Days"
          subtitle="Target: 20 Days max turnaround"
          icon="⚡"
          badge="Fast-Tracked"
        />
      </div>

      {/* Mid-Grid: Hiring Funnel Velocity + Requisition Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Hiring Funnel Progress */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Faculty Hiring Funnel Velocity
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">End-to-end candidate conversion stages & drop-off rates</p>
            </div>
            <button
              onClick={() => onNavigate?.('reports')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Detailed Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Funnel Stages Bars */}
          <div className="py-4 space-y-3.5">
            {[
              { stage: '1. Sourced & Inbound Applications', count: 203, pct: 100, color: 'bg-blue-600', drop: '0% initial' },
              { stage: '2. Resume & Qualification Screened', count: 109, pct: 54, color: 'bg-indigo-600', drop: '-46% drop' },
              { stage: '3. Technical Subject Assessment', count: 58, pct: 29, color: 'bg-cyan-600', drop: '-47% drop' },
              { stage: '4. Live Smartboard Teaching Demo', count: 32, pct: 16, color: 'bg-emerald-600', drop: '-45% drop' },
              { stage: '5. Campus Director Interview', count: 19, pct: 9.5, color: 'bg-amber-500', drop: '-41% drop' },
              { stage: '6. Offer Release & Onboarded', count: 18, pct: 8.9, color: 'bg-purple-600', drop: '94.7% joined' }
            ].map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    {f.stage}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-normal text-[11px]">{f.drop}</span>
                    <span className="font-bold text-slate-900 font-mono">{f.count} Candidates</span>
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
            <span>Overall Sourced-to-Hire Conversion: <strong className="text-indigo-600 font-bold">8.9%</strong></span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
              High Quality Bar (Top 9th Percentile)
            </span>
          </div>
        </div>

        {/* Department-wise Open Requisitions */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                Department Faculty Demands
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Allocations needed for current academic cohorts</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 py-1">
            {REQUISITIONS_DATA.map((req, idx) => {
              const isFilled = req.filledPositions >= req.openPositions;
              return (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">{req.department}</div>
                    <div className="text-[11px] text-slate-500">Avg Band: {req.avgSalary}</div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className="text-xs font-bold font-mono text-slate-900">
                        {req.filledPositions} / {req.openPositions} Seats
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isFilled 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : req.urgency === 'Critical' 
                          ? 'bg-rose-50 text-rose-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {isFilled ? '100% Filled' : `${req.urgency} Need`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate?.('recruitment_pipeline')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Manage Department Requisitions in Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Candidate Roster Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Active Educator Applicant Master Pool</h3>
            <p className="text-xs text-slate-500">Currently in-flight candidates across screening, demo lectures, and director offers</p>
          </div>

          {/* Search & Subject Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <input
                type="text"
                placeholder="Search by name, role, degree..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>

            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
              <option value="Commerce & CA">Commerce & CA</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Humanities & Law">Humanities & Law</option>
            </select>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Candidate & Pedigree</th>
                <th className="py-3 px-4">Target Role & Subject</th>
                <th className="py-3 px-4">Center / Campus</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Recruitment Stage</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplicants.map(a => (
                <tr key={a.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={a.avatar}
                        alt={a.candidateName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{a.candidateName}</div>
                        <div className="text-[11px] text-indigo-600 font-semibold">{a.qualification}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{a.role}</div>
                    <div className="text-[11px] text-slate-500">{a.specialization}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">
                      {a.instituteName}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">
                    {a.experience}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      a.stage === 'Joined & Onboarded' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : a.stage === 'Offer Extended'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : a.stage === 'Demo Lecture Round'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {a.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-amber-500 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {a.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate?.('recruitment_pipeline')}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      View in Pipeline →
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
