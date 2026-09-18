import React, { useState, useMemo } from 'react';
import { 
  CalendarCheck, Search, Clock, Users, Plus, Video, 
  MapPin, CheckCircle2, MessageSquare, AlertCircle, 
  Check, X
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { PTM_MEETINGS_DATA } from './parentPtmData';

export default function PTMScheduler({ instituteCode = 'ALL' }) {
  const [appointments, setAppointments] = useState(PTM_MEETINGS_DATA);
  const [search, setSearch] = useState('');
  const [formatFilter, setFormatFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'timetable'
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [actionSuccessNotice, setActionSuccessNotice] = useState('');

  // Form State for Booking Modal
  const [newBooking, setNewBooking] = useState({
    parentName: '',
    parentPhone: '',
    studentName: '',
    studentRoll: '',
    instituteCode: 'alpha',
    instituteName: 'Alpha Institute of Science & Tech',
    facultyName: 'Dr. V. K. Bansal',
    facultySubject: 'Advanced Physics',
    date: '2026-09-24',
    timeSlot: '11:00 AM - 11:25 AM',
    meetingType: 'In-Person Classroom',
    agenda: '',
    sendWhatsApp: true
  });

  // Multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filtered = useMemo(() => {
    return appointments.filter(p => {
      const scope = isAllInstitutes || p.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchSearch = 
        p.parentName.toLowerCase().includes(search.toLowerCase()) || 
        p.studentName.toLowerCase().includes(search.toLowerCase()) ||
        p.facultyName.toLowerCase().includes(search.toLowerCase()) ||
        p.agenda.toLowerCase().includes(search.toLowerCase());
      const matchFormat = formatFilter === 'ALL' || (
        formatFilter === 'virtual' ? p.meetingType.includes('Video') : !p.meetingType.includes('Video')
      );
      const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
      return scope && matchSearch && matchFormat && matchStatus;
    });
  }, [appointments, instituteCode, isAllInstitutes, search, formatFilter, statusFilter]);

  const handleUpdateStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setActionSuccessNotice(`Appointment #${id} updated to status "${newStatus}". Notification dispatched.`);
    setTimeout(() => setActionSuccessNotice(''), 3500);
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!newBooking.parentName || !newBooking.studentName) return;

    const newId = `PTM-${800 + appointments.length + 1}`;
    const entry = {
      id: newId,
      parentName: newBooking.parentName,
      parentPhone: newBooking.parentPhone || '+91 98000-12345',
      parentEmail: `${newBooking.parentName.toLowerCase().replace(/\s+/g, '.')}@guardian.net`,
      studentName: newBooking.studentName,
      studentRoll: newBooking.studentRoll || 'ROLL-2026-X',
      gradeBatch: 'Grade 12 • JEE Super-30 Batch',
      instituteCode: newBooking.instituteCode,
      instituteName: newBooking.instituteName,
      facultyName: newBooking.facultyName,
      facultySubject: newBooking.facultySubject,
      date: newBooking.date,
      timeSlot: newBooking.timeSlot,
      meetingType: newBooking.meetingType,
      roomLocation: newBooking.meetingType.includes('Video') ? 'meet.google.com/zen-ptm-call' : 'Consultation Cabin 4',
      agenda: newBooking.agenda || 'General progress review and test feedback.',
      status: 'Confirmed',
      priority: 'High',
      parentNotes: 'Booked via Admin Desk.',
      facultySummary: 'Scheduled for academic counseling.'
    };

    setAppointments([entry, ...appointments]);
    setShowBookingModal(false);
    setActionSuccessNotice(`Slot #${newId} booked successfully for ${newBooking.parentName}! WhatsApp confirmation dispatched.`);
    setTimeout(() => setActionSuccessNotice(''), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200 flex items-center gap-1">
              <CalendarCheck className="w-3.5 h-3.5 text-indigo-600" />
              Appointment Management Hub
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'All Multi-Tenant Centers' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Parent-Teacher Meeting (PTM) Slot Scheduler
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Orchestrate one-on-one parent appointments, balance faculty consultation timetables, and auto-dispatch video invites.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBookingModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Schedule New PTM Slot
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionSuccessNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {actionSuccessNotice}
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">Confirmed</span>
        </div>
      )}

      {/* 4 Mini Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="blue"
          title="Confirmed Appointments"
          value={appointments.filter(a => a.status === 'Confirmed').length.toString()}
          subtitle="Ready for Consultation"
          icon="📅"
          badge="Active Slots"
        />
        <KPICard
          theme="amber"
          title="Pending Parent Requests"
          value={appointments.filter(a => a.status === 'Requested').length.toString()}
          subtitle="Awaiting Faculty Allocation"
          icon="⏳"
          badge="Action Req."
        />
        <KPICard
          theme="emerald"
          title="Completed This Month"
          value="142 Sessions"
          subtitle="Feedback Logs Recorded"
          icon="✅"
          badge="Optimal Flow"
        />
        <KPICard
          theme="purple"
          title="Mean Consultation Length"
          value="22.5 Minutes"
          subtitle="Target: 25 Mins Max"
          icon="⏱️"
          badge="Time-Boxed"
        />
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search parent name, student roll, faculty, or agenda..."
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
            />
          </div>

          {/* Controls: Format Filter + Status Filter + View Mode */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Format filter */}
            <select
              value={formatFilter}
              onChange={e => setFormatFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
            >
              <option value="ALL">All Meeting Formats</option>
              <option value="in_person">In-Person Classroom</option>
              <option value="virtual">Virtual Video (Google Meet)</option>
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Requested">Requested</option>
              <option value="Completed">Completed</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cards Grid
              </button>
              <button
                onClick={() => setViewMode('timetable')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'timetable' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Timetable Slot View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: APPOINTMENT CARDS GRID                                            */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="font-bold text-slate-700 text-sm">No appointments matching filters</div>
              <p className="text-xs text-slate-500 mt-1">Try resetting the search or status filter.</p>
            </div>
          ) : (
            filtered.map(p => (
              <div 
                key={p.id} 
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-3.5 flex flex-col justify-between hover:border-slate-300 transition"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                        {p.id}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1">{p.parentName}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">Student: {p.studentName}</p>
                      <p className="text-[10px] text-slate-400">{p.gradeBatch}</p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      p.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : p.status === 'Requested'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  {/* Meeting Details Box */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Faculty:</span>
                      <span className="font-bold text-slate-800">{p.facultyName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Time:</span>
                      <span className="font-mono text-slate-700 font-semibold">{p.date} • {p.timeSlot}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Format:</span>
                      <span className="font-medium text-indigo-700 flex items-center gap-1">
                        {p.meetingType.includes('Video') ? <Video className="w-3 h-3 text-blue-600" /> : <MapPin className="w-3 h-3 text-amber-600" />}
                        {p.meetingType}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Agenda:</span>
                      <p className="text-slate-700 text-[11px] mt-0.5 line-clamp-2">{p.agenda}</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  {p.status === 'Requested' ? (
                    <button
                      onClick={() => handleUpdateStatus(p.id, 'Confirmed')}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Confirm Slot
                    </button>
                  ) : p.status === 'Confirmed' ? (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(p.id, 'Completed')}
                        className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                      >
                        Mark Done
                      </button>
                      {p.meetingType.includes('Video') ? (
                        <a
                          href={`https://${p.roomLocation}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1"
                        >
                          <Video className="w-3.5 h-3.5" /> Join Call
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium self-center">
                          {p.roomLocation}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="w-full text-center text-xs font-bold text-slate-400 py-1">
                      Session Completed
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: HOURLY TIMETABLE SLOT MATRIX                                      */}
      {/* ========================================================================= */}
      {viewMode === 'timetable' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Hourly Faculty Consultation Timetable (Sep 21–23, 2026)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Matrix view of booked 25-minute consultation slots versus vacant walk-in windows.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              Active Term Schedule
            </span>
          </div>

          <div className="space-y-3">
            {[
              { time: '10:00 AM - 11:00 AM', slotA: 'Aarav Sharma (Dr. V. K. Bansal) - Confirmed', slotB: 'Vacant Walk-in Slot (Alpha Block A)' },
              { time: '11:00 AM - 12:00 PM', slotA: 'Riya Mehta (CA Singhania) - Google Meet Live', slotB: 'Varun Reddy (Adv. Sundaram) - Confirmed' },
              { time: '02:00 PM - 03:00 PM', slotA: 'Kabir Deshmukh (Dr. Shalini Varma) - Confirmed', slotB: 'Vacant Faculty Prep Window' },
              { time: '03:00 PM - 04:00 PM', slotA: 'Rohan Chawla (Er. Mukherjee) - Confirmed', slotB: 'Vacant Walk-in Slot (Apex Cell)' },
              { time: '04:00 PM - 05:00 PM', slotA: 'Diya Pillai (Dr. B. R. Sen) - Requested', slotB: 'Vacant Virtual Link' },
            ].map((row, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="w-44 font-mono font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  {row.time}
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className={`p-2.5 rounded-lg border font-medium ${
                    row.slotA.includes('Vacant') 
                      ? 'bg-slate-100 border-dashed border-slate-300 text-slate-400' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    {row.slotA}
                  </div>
                  <div className={`p-2.5 rounded-lg border font-medium ${
                    row.slotB.includes('Vacant') 
                      ? 'bg-slate-100 border-dashed border-slate-300 text-slate-400' 
                      : 'bg-indigo-50 border-indigo-200 text-indigo-800'
                  }`}>
                    {row.slotB}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SCHEDULE NEW PTM SLOT                                              */}
      {/* ========================================================================= */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  📅
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Schedule Parent-Teacher Consultation
                  </h3>
                  <p className="text-xs text-slate-500">Book slot and dispatch automated WhatsApp calendar invite</p>
                </div>
              </div>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={newBooking.parentName}
                    onChange={e => setNewBooking({ ...newBooking, parentName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent Mobile (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98XXX-XXXXX"
                    value={newBooking.parentPhone}
                    onChange={e => setNewBooking({ ...newBooking, parentPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Chandra"
                    value={newBooking.studentName}
                    onChange={e => setNewBooking({ ...newBooking, studentName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Roll Number</label>
                  <input
                    type="text"
                    placeholder="e.g. KOTA-JEE-109"
                    value={newBooking.studentRoll}
                    onChange={e => setNewBooking({ ...newBooking, studentRoll: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campus Center</label>
                  <select
                    value={newBooking.instituteCode}
                    onChange={e => {
                      const names = {
                        alpha: 'Alpha Institute of Science & Tech',
                        beta: 'Beta Commerce Academy (CA)',
                        apex: 'Apex Medical Prep',
                        delta: 'Delta Coding Academy',
                        zenith: 'Zenith Humanities & Law'
                      };
                      setNewBooking({ 
                        ...newBooking, 
                        instituteCode: e.target.value,
                        instituteName: names[e.target.value] || 'Alpha Institute'
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none"
                  >
                    <option value="alpha">Alpha Institute (Kota)</option>
                    <option value="beta">Beta Commerce (Mumbai)</option>
                    <option value="apex">Apex Medical (Delhi)</option>
                    <option value="delta">Delta Coding (Bengaluru)</option>
                    <option value="zenith">Zenith Humanities (Hyderabad)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consulting Faculty</label>
                  <select
                    value={newBooking.facultyName}
                    onChange={e => {
                      const subjects = {
                        'Dr. V. K. Bansal': 'Advanced Physics',
                        'CA Anand Singhania': 'Mercantile Law',
                        'Dr. Shalini Varma': 'Human Anatomy',
                        'Prof. Arvind Nambiar': 'Algorithms & Python'
                      };
                      setNewBooking({
                        ...newBooking,
                        facultyName: e.target.value,
                        facultySubject: subjects[e.target.value] || 'Academics'
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none"
                  >
                    <option value="Dr. V. K. Bansal">Dr. V. K. Bansal (Physics)</option>
                    <option value="CA Anand Singhania">CA Anand Singhania (Law/Accts)</option>
                    <option value="Dr. Shalini Varma">Dr. Shalini Varma (Zoology)</option>
                    <option value="Prof. Arvind Nambiar">Prof. Arvind Nambiar (Coding)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consultation Date</label>
                  <input
                    type="date"
                    value={newBooking.date}
                    onChange={e => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time Slot (25m)</label>
                  <select
                    value={newBooking.timeSlot}
                    onChange={e => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none"
                  >
                    <option value="10:00 AM - 10:25 AM">10:00 AM - 10:25 AM</option>
                    <option value="11:00 AM - 11:25 AM">11:00 AM - 11:25 AM</option>
                    <option value="02:30 PM - 02:55 PM">02:30 PM - 02:55 PM</option>
                    <option value="04:00 PM - 04:25 PM">04:00 PM - 04:25 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Format</label>
                  <select
                    value={newBooking.meetingType}
                    onChange={e => setNewBooking({ ...newBooking, meetingType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none"
                  >
                    <option value="In-Person Classroom">In-Person Classroom</option>
                    <option value="Google Meet Video">Google Meet Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Consultation Agenda</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Discuss recent mock test rank drop, speed pacing, and attendance leaves."
                  value={newBooking.agenda}
                  onChange={e => setNewBooking({ ...newBooking, agenda: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-900">Auto-Dispatch WhatsApp & App Notification</span>
                </div>
                <input
                  type="checkbox"
                  checked={newBooking.sendWhatsApp}
                  onChange={e => setNewBooking({ ...newBooking, sendWhatsApp: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  Confirm & Lock Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
