import React, { useState, useMemo } from 'react';
import { 
  Star, MessageSquare, Award, CheckCircle2, ThumbsUp, 
  TrendingUp, Sparkles, Building2, Search, Filter, 
  Download, Heart, ShieldCheck, X
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { getFacultyByInstitute } from './facultyPayrollData';

export default function TeacherRatings({ instituteCode = 'all' }) {
  const [facultyList, setFacultyList] = useState(() => getFacultyByInstitute(instituteCode));
  const [search, setSearch] = useState('');
  const [minRatingFilter, setMinRatingFilter] = useState('all');
  const [bonusToast, setBonusToast] = useState(null);

  React.useEffect(() => {
    setFacultyList(getFacultyByInstitute(instituteCode));
  }, [instituteCode]);

  const filtered = useMemo(() => {
    return facultyList.filter(f => {
      const matchRating = minRatingFilter === 'all' || f.ratings.overall >= parseFloat(minRatingFilter);
      const matchSearch = !search || 
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.department.toLowerCase().includes(search.toLowerCase()) ||
        f.instituteName.toLowerCase().includes(search.toLowerCase());
      return matchRating && matchSearch;
    });
  }, [facultyList, minRatingFilter, search]);

  const handleAwardBonus = (facultyName) => {
    setBonusToast(`Excellence Teaching Bonus awarded to ${facultyName}! $250 added to next disbursal cycle.`);
    setTimeout(() => setBonusToast(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-extrabold uppercase tracking-wide border border-amber-200">
              Module 08 • Student App Ratings
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Live Mobile Feedback Stream
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Star className="w-6 h-6 mr-2 text-amber-500 fill-amber-500" /> Faculty App Ratings & Student Reviews
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time student mobile app evaluations, lecture clarity indices, punctuality scores, and feedback sentiment.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <button 
            onClick={() => alert('Faculty App Rating Scorecard exported as PDF.')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Export Scorecard
          </button>
        </div>
      </div>

      {/* Bonus Toast Notification */}
      {bonusToast && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span className="flex items-center">
            <Sparkles className="w-4 h-4 text-amber-600 mr-2 shrink-0" /> {bonusToast}
          </span>
          <button onClick={() => setBonusToast(null)} className="text-amber-700 hover:text-amber-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Global Faculty Avg" 
          value="4.86 / 5.0" 
          subtext="From 11,480 Verified Reviews" 
          icon={Star} 
          color="amber" 
          badge="Exemplary Tier" 
        />
        <KPICard 
          title="5-Star Rated Teachers" 
          value="87.5%" 
          subtext="Score ≥ 4.80 Out of 5" 
          icon={Award} 
          color="green" 
          badge="Top 10% Industry" 
        />
        <KPICard 
          title="App Survey Response" 
          value="96.4%" 
          subtext="Post-lecture Student Check-in" 
          icon={MessageSquare} 
          color="blue" 
          badge="High Engagement" 
        />
        <KPICard 
          title="Faculty Retention" 
          value="98.5%" 
          subtext="Annualized Faculty Loyalty" 
          icon={CheckCircle2} 
          color="purple" 
          badge="Zero Core Attrition" 
        />
      </div>

      {/* Evaluation Dimensions Banner */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h4 className="font-heading text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center">
          <ShieldCheck className="w-4 h-4 mr-1.5 text-indigo-600" /> 4 Core Pedagogy Quality Dimensions Measured Daily
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
            <span className="font-bold text-indigo-950 block">1. Concept Clarity</span>
            <p className="text-[11px] text-slate-600 mt-0.5">Irodov / HC Verma problem solving depth and step-by-step intuition.</p>
            <span className="text-xs font-black text-indigo-600 mt-1 block">Network Avg: 97.2%</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <span className="font-bold text-emerald-950 block">2. Lecture Punctuality</span>
            <p className="text-[11px] text-slate-600 mt-0.5">On-time bell entry, syllabus adherence, and zero unnotified delays.</p>
            <span className="text-xs font-black text-emerald-600 mt-1 block">Network Avg: 92.4%</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100">
            <span className="font-bold text-amber-950 block">3. Doubt Solving</span>
            <p className="text-[11px] text-slate-600 mt-0.5">Post-class doubt room accessibility and mobile app Q&A speed.</p>
            <span className="text-xs font-black text-amber-600 mt-1 block">Network Avg: 95.1%</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100">
            <span className="font-bold text-purple-950 block">4. Exam Readiness</span>
            <p className="text-[11px] text-slate-600 mt-0.5">Mock test correlation, shortcut tricks, and past 10-year analysis.</p>
            <span className="text-xs font-black text-purple-600 mt-1 block">Network Avg: 96.0%</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search educator or subject..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" 
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-500">Rating Tier:</span>
          <select 
            value={minRatingFilter} 
            onChange={e => setMinRatingFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-indigo-600 font-bold text-slate-700"
          >
            <option value="all">All Ratings (4.0+)</option>
            <option value="4.9">★ 4.90+ Exemplary Tier</option>
            <option value="4.8">★ 4.80+ Star Tier</option>
          </select>
        </div>
      </div>

      {/* Detailed Educator Rating Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map(f => (
          <div 
            key={f.id} 
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition duration-200 space-y-4"
          >
            {/* Top Profile & Rating */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={f.photo} 
                  alt={f.name} 
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-100 shadow-xs" 
                />
                <div>
                  <h4 className="font-heading text-sm font-bold text-slate-900">{f.name}</h4>
                  <p className="text-[11px] text-indigo-600 font-bold">{f.designation} • {f.department}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{f.instituteName}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-black flex items-center justify-end">
                  ★ {f.ratings.overall}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                  {f.ratings.totalReviews} Reviews
                </span>
              </div>
            </div>

            {/* 4 Dimension Progress Bars */}
            <div className="space-y-2 pt-1">
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-500 font-medium">Concept Clarity:</span>
                  <span className="font-bold text-slate-900">{f.ratings.conceptClarity}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${f.ratings.conceptClarity}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-500 font-medium">Lecture Punctuality & Discipline:</span>
                  <span className="font-bold text-slate-900">{f.ratings.punctualityScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${f.ratings.punctualityScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-500 font-medium">Doubt Solving & Accessibility:</span>
                  <span className="font-bold text-slate-900">{f.ratings.doubtSolving}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${f.ratings.doubtSolving}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-500 font-medium">Exam & Mock Test Relevance:</span>
                  <span className="font-bold text-slate-900">{f.ratings.examReadiness}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${f.ratings.examReadiness}%` }} />
                </div>
              </div>
            </div>

            {/* Student Quote */}
            {f.ratings.recentReviews.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className="font-bold text-slate-800">
                    {f.ratings.recentReviews[0].student} <span className="text-slate-400 font-normal">({f.ratings.recentReviews[0].batch})</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{f.ratings.recentReviews[0].date}</span>
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  "{f.ratings.recentReviews[0].comment}"
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                <ThumbsUp className="w-3.5 h-3.5 mr-1" /> {f.ratings.fiveStarPercent}% 5-Star Reviews
              </span>
              <button 
                onClick={() => handleAwardBonus(f.name)}
                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition border border-amber-200 flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Award Excellence Bonus</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
