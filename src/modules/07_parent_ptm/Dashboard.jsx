import React, { useState, useMemo } from 'react';
import { 
  CalendarCheck, FileCheck, Star, Users, Clock, 
  ArrowRight, Sparkles, Video, MapPin, ShieldCheck, 
  Calendar, ChevronRight, Eye
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { PTM_MEETINGS_DATA } from './parentPtmData';

export default function ParentPTMDashboard({ instituteCode = 'ALL', onNavigate }) {
  const [meetings, setMeetings] = useState(PTM_MEETINGS_DATA);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filteredMeetings = useMemo(() => {
    return meetings.filter(m => {
      const matchCampus = isAllInstitutes || m.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchStatus = activeFilter === 'ALL' || m.status === activeFilter;
      return matchCampus && matchStatus;
    });
  }, [meetings, instituteCode, isAllInstitutes, activeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cockpit Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-bold text-xs rounded-full border border-indigo-400/30 flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                Parent App Engagement & PTM Command Hub
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SOC-2 Digital Signatures Verified
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Guardian Engagement & Monthly Report Governance</span>
            </h1>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              Orchestrate parent-teacher meeting (PTM) schedules, track monthly academic report digital signatures, and monitor parent sentiment analytics across all campus branches.
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate?.('ptm_scheduler')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>PTM Slot Scheduler</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('monthly_signoffs')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Monthly Sign-offs</span>
            </button>
            <button
              onClick={() => onNavigate?.('reports')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-amber-300" />
              <span>Audit Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="blue"
          title="Parent App DAU"
          value="3,890 Active"
          subtitle="86.4% Guardian App Adoption"
          icon="📱"
          badge="v4.2 Mobile"
        />
        <KPICard
          theme="indigo"
          title="Upcoming PTM Slots"
          value="18 Confirmed"
          subtitle="Next 7 Days Across Campuses"
          icon="📅"
          badge="Fully Booked"
        />
        <KPICard
          theme="emerald"
          title="Report Sign-off Yield"
          value="98.2% Approved"
          subtitle="August 2026 Academic Dossiers"
          icon="✍️"
          badge="Cryptographic"
        />
        <KPICard
          theme="amber"
          title="Parent Trust Score"
          value="4.9 / 5.0"
          subtitle="+78 Net Promoter Score (NPS)"
          icon="⭐"
          badge="Exemplary Trust"
        />
      </div>

      {/* Visual Intelligence: PTM Daily Matrix + Approval Stepper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Consultation Schedule Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Today's Faculty Consultation Slots
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time room allocation & virtual Google Meet link dispatch
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Sep 21, 2026
              </span>
            </div>

            {/* Time Slot Rows */}
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    10A
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-800">10:30 AM - 10:55 AM (In-Person)</div>
                    <div className="text-[11px] text-slate-500">Aarav Sharma • Room 304 (Dr. V. K. Bansal)</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Confirmed
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                    11A
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-800">11:15 AM - 11:40 AM (Virtual Video)</div>
                    <div className="text-[11px] text-slate-500">Riya Mehta • Google Meet (CA Anand Singhania)</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Video Link Live
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                    02P
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-800">02:00 PM - 02:25 PM (In-Person)</div>
                    <div className="text-[11px] text-slate-500">Kabir Deshmukh • Counseling Cell (Dr. Shalini Varma)</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Confirmed
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Average session time: <strong>22.5 mins</strong></span>
            <button 
              onClick={() => onNavigate?.('ptm_scheduler')}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              Open Full Timetable <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Monthly Report Approval Flow Stepper */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Monthly Report Digital Sign-off Pipeline
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automated 4-stage guardian verification & biometric approval cycle
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                4,890 Total Dossiers
              </span>
            </div>

            {/* Stepper Flow */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Stage 1: Batch PDF Dossier Generation</span>
                    <span className="font-mono text-emerald-600 font-semibold">100% (4,890/4,890)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Attendance radar charts, test percentiles & teacher notes compiled.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Stage 2: WhatsApp & Mobile App Push</span>
                    <span className="font-mono text-emerald-600 font-semibold">99.4% Delivered</span>
                  </div>
                  <p className="text-[11px] text-slate-500">One-time secure deep link dispatched to registered guardians.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Stage 3: Parent OTP / Biometric Review</span>
                    <span className="font-mono text-emerald-600 font-semibold">98.2% Reviewed</span>
                  </div>
                  <p className="text-[11px] text-slate-500">FaceID / TouchID biometric confirmation on iOS & Android apps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Stage 4: SHA-256 Signature Storage</span>
                    <span className="font-mono text-indigo-600 font-semibold">4,802 Validated</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Immutable ledger log with client device hash & timestamp.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Pending parent signatures: <strong className="text-amber-600">88 reports</strong></span>
            <button 
              onClick={() => onNavigate?.('monthly_signoffs')}
              className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
            >
              Review Dossier Ledger <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Consultations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Scheduled Parent-Faculty Consultations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live roster of confirmed and requested appointment slots across batches.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs self-start sm:self-auto">
            {['ALL', 'Confirmed', 'Requested', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  activeFilter === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All Meetings' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Parent & Student</th>
                <th className="py-3 px-4">Campus / Batch</th>
                <th className="py-3 px-4">Assigned Faculty</th>
                <th className="py-3 px-4">Slot & Format</th>
                <th className="py-3 px-4">Meeting Agenda</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMeetings.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{p.parentName}</div>
                    <div className="text-[11px] text-indigo-600 font-semibold">
                      Student: {p.studentName} ({p.studentRoll})
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-700 font-medium">{p.instituteName}</div>
                    <div className="text-[10px] text-slate-400">{p.gradeBatch}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{p.facultyName}</div>
                    <div className="text-[10px] text-slate-500">{p.facultySubject}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-700">{p.date}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {p.timeSlot}
                    </div>
                    <div className="text-[10px] text-indigo-600 font-medium flex items-center gap-1 mt-0.5">
                      {p.meetingType.includes('Video') ? <Video className="w-3 h-3 text-blue-600" /> : <MapPin className="w-3 h-3 text-amber-600" />}
                      {p.meetingType}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="line-clamp-2 text-slate-600 text-[11px]">
                      {p.agenda}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      p.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : p.status === 'Requested'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedMeeting(p)}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] transition inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consultation Details Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {selectedMeeting.id}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">
                  Parent-Faculty Consultation Dossier
                </h3>
              </div>
              <button 
                onClick={() => setSelectedMeeting(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[10px] block">Student & Roll</span>
                  <span className="font-bold text-slate-800">{selectedMeeting.studentName} ({selectedMeeting.studentRoll})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Parent Contact</span>
                  <span className="font-bold text-slate-800">{selectedMeeting.parentName}</span>
                  <div className="text-[11px] text-slate-500">{selectedMeeting.parentPhone}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Assigned Faculty</span>
                  <span className="font-bold text-slate-800">{selectedMeeting.facultyName}</span>
                  <div className="text-[11px] text-indigo-600 font-medium">{selectedMeeting.facultySubject}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Scheduled Window</span>
                  <span className="font-bold text-slate-800">{selectedMeeting.date}</span>
                  <div className="text-[11px] text-slate-600 font-mono">{selectedMeeting.timeSlot}</div>
                </div>
              </div>

              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                <span className="text-indigo-800 font-bold block mb-1">Consultation Agenda:</span>
                <p className="text-slate-700 leading-relaxed">{selectedMeeting.agenda}</p>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                <span className="text-amber-900 font-bold block mb-1">Parent Preliminary Notes:</span>
                <p className="text-slate-700 leading-relaxed">{selectedMeeting.parentNotes}</p>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <span className="text-emerald-900 font-bold block mb-1">Faculty Post-Meeting Plan:</span>
                <p className="text-slate-700 leading-relaxed">{selectedMeeting.facultySummary}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedMeeting(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Close
              </button>
              {selectedMeeting.meetingType.includes('Video') && (
                <a
                  href={`https://${selectedMeeting.roomLocation}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  Join Google Meet
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
