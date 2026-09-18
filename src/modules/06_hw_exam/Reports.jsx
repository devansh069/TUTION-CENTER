import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Award, 
  FileText, 
  Users, 
  Send,
  Sparkles,
  PieChart,
  Calendar
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { EXAM_SERIES_DATA, HW_ASSIGNMENTS_DATA, BATCHES_DATA } from '../../data/erpData';

export default function Reports({ exams = [], selectedInstituteCode, activeTab: propActiveTab }) {
  const [currentTab, setCurrentTab] = useState(propActiveTab || 'rep_scores');
  const [selectedBatch, setSelectedBatch] = useState('all');

  // Keep internal tab in sync if prop changes
  const tab = propActiveTab || currentTab;

  const combinedExams = (exams && exams.length > 0) ? exams : EXAM_SERIES_DATA;
  const filteredExams = combinedExams.filter(e => 
    (selectedInstituteCode === 'all' || e.instituteCode === selectedInstituteCode || !e.instituteCode) &&
    (selectedBatch === 'all' || e.batch === selectedBatch)
  );

  const filteredHW = HW_ASSIGNMENTS_DATA.filter(h =>
    (selectedBatch === 'all' || h.batch === selectedBatch)
  );

  // Score distribution brackets dataset
  const scoreBrackets = [
    { range: '90% - 100% (Top Tier)', count: 42, percentage: 35, color: 'bg-emerald-500' },
    { range: '80% - 89% (Distinction)', count: 48, percentage: 40, color: 'bg-indigo-500' },
    { range: '70% - 79% (First Class)', count: 21, percentage: 17.5, color: 'bg-blue-500' },
    { range: '60% - 69% (Second Class)', count: 6, percentage: 5, color: 'bg-amber-500' },
    { range: 'Below 60% (Needs Support)', count: 3, percentage: 2.5, color: 'bg-rose-500' }
  ];

  // Batch-wise Rankers
  const topRankers = [
    { rank: 1, name: 'Aarav Sharma', batch: 'Batch A - JEE 2026', score: '288/300', percentile: '99.94%', subject: 'Physics & Maths' },
    { rank: 2, name: 'Rohan Mehta', batch: 'Batch B - NEET 2026', score: '695/720', percentile: '99.88%', subject: 'Biology & Chem' },
    { rank: 3, name: 'Priya Patel', batch: 'Batch C - CA Foundation', score: '382/400', percentile: '99.75%', subject: 'Accounting' },
    { rank: 4, name: 'Vikram Singh', batch: 'Batch D - Foundation 10th', score: '490/500', percentile: '99.60%', subject: 'Science & SST' },
    { rank: 5, name: 'Neha Gupta', batch: 'Batch A - JEE 2026', score: '276/300', percentile: '99.42%', subject: 'Maths & Physics' },
  ];

  // Defaulters Log for Submission Compliance
  const defaultersList = [
    { id: 'DEF-101', student: 'Karan Malhotra', batch: 'Batch A - JEE 2026', missing: 'Physics HW #4 - Electromagnetism', dueDate: '18 Sep 2026', phone: '+91 98201 11223', status: 'Pending 2 Days' },
    { id: 'DEF-102', student: 'Ananya Verma', batch: 'Batch B - NEET 2026', missing: 'Biology Organic Mock Exam', dueDate: '17 Sep 2026', phone: '+91 98332 44556', status: 'Pending 3 Days' },
    { id: 'DEF-103', student: 'Siddharth Nair', batch: 'Batch C - CA Foundation', missing: 'Accounting Practice Set 3', dueDate: '16 Sep 2026', phone: '+91 98119 77889', status: 'Pending 4 Days' },
    { id: 'DEF-104', student: 'Isha Deshmukh', batch: 'Batch D - Foundation 10th', missing: 'Geometry Theorem Assignment', dueDate: '19 Sep 2026', phone: '+91 98770 33441', status: 'Pending Today' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-7 h-7 mr-2.5 text-indigo-600" /> Academic & Test Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive analytics on score distribution curves, batch percentile benchmarks, and homework submission compliance.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 shadow-xs focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all">All Batches</option>
            {BATCHES_DATA.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>

          <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center shadow-sm transition-all">
            <Download className="w-4 h-4 mr-1.5" /> Export PDF Summary
          </button>
        </div>
      </div>

      {/* Report Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setCurrentTab('rep_scores')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            tab === 'rep_scores'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <PieChart className="w-4 h-4" /> Score Distribution & Ranks
        </button>

        <button
          onClick={() => setCurrentTab('rep_submissions')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            tab === 'rep_submissions'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" /> Homework & Exam Compliance
        </button>
      </div>

      {/* TAB 1: SCORE DISTRIBUTION */}
      {(tab === 'rep_scores' || tab === 'rep_scores_distribution') && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Batch Mean Score" value="84.2%" subtext="+3.5% vs Last Month" icon={TrendingUp} color="blue" />
            <KPICard title="Top Percentile" value="99.94%" subtext="Aarav Sharma (JEE)" icon={Award} color="purple" />
            <KPICard title="Pass Rate (>60%)" value="97.5%" subtext="117 of 120 Passed" icon={CheckCircle2} color="green" />
            <KPICard title="Standard Deviation" value="7.8 Pts" subtext="High Consistency" icon={BarChart3} color="amber" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score Distribution Bell-Curve Breakdown */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" /> Score Distribution Curve (120 Students)
                  </h3>
                  <p className="text-xs text-slate-500">Breakdown of student test performance across marks percentage bands</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
                  Active Batches
                </span>
              </div>

              <div className="space-y-4">
                {scoreBrackets.map((bracket, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                      <span>{bracket.range}</span>
                      <span className="font-mono text-slate-900 font-bold">{bracket.count} Students ({bracket.percentage}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${bracket.color} rounded-full transition-all duration-500`}
                        style={{ width: `${bracket.percentage * 2}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-500" /> AI Insights: 75% of batch scored above 80%. High engagement observed in Physics & Math modules.</span>
              </div>
            </div>

            {/* Top Batch Rankers */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-1 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-amber-500" /> Batch Rank Leaders
                </h3>
                <p className="text-xs text-slate-500 mb-4">Top performers in recent exam series</p>

                <div className="space-y-3">
                  {topRankers.map((ranker) => (
                    <div key={ranker.rank} className="p-3 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          ranker.rank === 1 ? 'bg-amber-100 text-amber-700 border border-amber-300' :
                          ranker.rank === 2 ? 'bg-slate-200 text-slate-700' :
                          ranker.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-indigo-50 text-indigo-700'
                        }`}>
                          #{ranker.rank}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{ranker.name}</p>
                          <p className="text-[10px] text-slate-500">{ranker.batch}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono font-extrabold text-emerald-600">{ranker.score}</p>
                        <p className="text-[10px] font-mono text-indigo-600 font-bold">{ranker.percentile}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-4 w-full py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors">
                View All Batch Rank Cards →
              </button>
            </div>
          </div>

          {/* Exam wise performance report table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-heading font-bold text-slate-900 text-base mb-4">Exams & Test Analytics Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Exam Title</th>
                    <th className="p-3">Target Batch</th>
                    <th className="p-3">Total Marks</th>
                    <th className="p-3">Class Average</th>
                    <th className="p-3">Highest Score</th>
                    <th className="p-3">Pass Rate</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExams.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{e.title}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[11px]">{e.batch}</span></td>
                      <td className="p-3 font-mono text-slate-600">{e.totalMarks} Marks</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">{e.averageMarks} Marks</td>
                      <td className="p-3 font-mono font-bold text-indigo-600">{e.highestMarks} Marks</td>
                      <td className="p-3 font-bold text-slate-700">{e.passPercentage}% Passed</td>
                      <td className="p-3 text-right">
                        <button className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px]">
                          Full Matrix
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUBMISSION COMPLIANCE */}
      {(tab === 'rep_submissions' || tab === 'rep_submission_compliance') && (
        <div className="space-y-6">
          {/* Compliance Top KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Total Homework & Tests" value="45 Sets" subtext="Current Academic Cycle" icon={FileText} color="blue" />
            <KPICard title="On-Time Compliance" value="94.2%" subtext="42 Submissions Avg" icon={CheckCircle2} color="green" />
            <KPICard title="Pending/Late" value="4.1%" subtext="Resolved in 24 Hrs" icon={AlertTriangle} color="amber" />
            <KPICard title="Defaulters List" value="4 Students" subtext="Action Required" icon={Users} color="rose" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subject-Wise Compliance Meters */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h3 className="font-heading font-bold text-slate-900 text-base mb-1">Subject-Wise Compliance</h3>
              <p className="text-xs text-slate-500 mb-4">Submission track record by subject department</p>

              <div className="space-y-4">
                {[
                  { subject: 'Physics Department', rate: 96, color: 'bg-emerald-500' },
                  { subject: 'Chemistry Department', rate: 91, color: 'bg-indigo-500' },
                  { subject: 'Mathematics Department', rate: 89, color: 'bg-blue-500' },
                  { subject: 'Biology Department', rate: 98, color: 'bg-teal-500' },
                  { subject: 'Commerce & Accounting', rate: 93, color: 'bg-purple-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{item.subject}</span>
                      <span className="font-mono font-bold text-slate-900">{item.rate}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.rate}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Defaulter Action Log */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-rose-500" /> Pending Homework & Exam Defaulters
                  </h3>
                  <p className="text-xs text-slate-500">Students with overdue homework assignments or unsubmitted test papers</p>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center border border-rose-200">
                  <Send className="w-3.5 h-3.5 mr-1" /> Notify All Parents (WhatsApp)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Batch</th>
                      <th className="p-3">Pending Task</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Overdue Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {defaultersList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{item.student}</td>
                        <td className="p-3 text-slate-600">{item.batch}</td>
                        <td className="p-3 font-semibold text-slate-800">{item.missing}</td>
                        <td className="p-3 font-mono text-slate-500">{item.dueDate}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold text-[10px]">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px]">
                            Send Nudge
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Homework Compliance Grid */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-heading font-bold text-slate-900 text-base mb-4">Batch Assignment Submission Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Assignment Title</th>
                    <th className="p-3">Batch</th>
                    <th className="p-3">Assigned Date</th>
                    <th className="p-3">Deadline</th>
                    <th className="p-3">Submitted</th>
                    <th className="p-3">Compliance Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredHW.map((h) => {
                    const totalStudents = h.totalStudents || 32;
                    const submitted = h.submittedCount || Math.round(totalStudents * 0.9);
                    const rate = Math.round((submitted / totalStudents) * 100);
                    return (
                      <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{h.title}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">{h.batch}</span></td>
                        <td className="p-3 font-mono text-slate-500">{h.assignedDate}</td>
                        <td className="p-3 font-mono text-slate-500">{h.dueDate}</td>
                        <td className="p-3 font-mono font-bold text-slate-800">{submitted} / {totalStudents}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${rate >= 90 ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full`} style={{ width: `${rate}%` }}></div>
                            </div>
                            <span className="font-mono font-bold text-slate-900">{rate}%</span>
                          </div>
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
