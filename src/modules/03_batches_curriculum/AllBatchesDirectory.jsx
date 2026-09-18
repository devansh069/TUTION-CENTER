import React, { useState, useMemo } from 'react';
import { Layers, PlusCircle, Search, Filter, Users, BookOpen, Clock, Calendar, CheckCircle2, Video, X, Edit3, Trash2, MapPin, Award } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { BATCHES_DATA } from '../../data/erpData';

export default function AllBatchesDirectory({ instituteCode = 'ALL' }) {
  const isAll = !instituteCode || instituteCode.toUpperCase() === 'ALL';

  // Dynamic Batch State initialized from BATCHES_DATA
  const [batches, setBatches] = useState(() => {
    return BATCHES_DATA.filter(b => isAll || b.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New Batch Form State
  const [newBatch, setNewBatch] = useState({
    name: '',
    code: '',
    goal: '',
    instituteCode: 'alpha',
    capacity: 40,
    students: 25,
    room: 'Lecture Hall B (Room 201)',
    time: '08:00 AM - 12:00 PM',
    status: 'In Session',
    streamLive: false,
    totalWeeklyHours: 24,
    overallSyllabusPct: 0,
    attendanceRate: 98.0,
    teacher: 'Dr. Harrison Wells',
    subject1Name: 'Physics & Mechanics',
    subject1Teacher: 'Dr. K.V. Rao',
    subject1Hours: 8,
    subject2Name: 'Organic Chemistry',
    subject2Teacher: 'Prof. Sunita Roy',
    subject2Hours: 8,
    subject3Name: 'Calculus & Vectors',
    subject3Teacher: 'Er. Vivek Sharma',
    subject3Hours: 8
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Batches
  const filteredBatches = useMemo(() => {
    return batches.filter(b => {
      const scope = isAll || b.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.goal.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
      return scope && matchSearch && matchStatus;
    });
  }, [batches, instituteCode, isAll, searchTerm, statusFilter]);

  // Aggregation Metrics
  const totalBatchesCount = batches.length;
  const totalStudentsEnrolled = batches.reduce((acc, b) => acc + (b.students || 0), 0);
  const totalSeatsCapacity = batches.reduce((acc, b) => acc + (b.capacity || 0), 0);
  const avgSyllabusPct = totalBatchesCount > 0 ? Math.round(batches.reduce((acc, b) => acc + (b.overallSyllabusPct || 0), 0) / totalBatchesCount) : 0;
  const liveStreamsCount = batches.filter(b => b.streamLive).length;

  // Add Batch Submission Handler
  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!newBatch.name || !newBatch.goal) {
      alert("Please enter a Batch Name and Target Goal.");
      return;
    }

    const createdBatch = {
      id: `B-${Date.now()}`,
      name: newBatch.name,
      code: newBatch.code || `B${Date.now().toString().slice(-3)}-COHORT`,
      instituteCode: newBatch.instituteCode,
      instituteName: newBatch.instituteCode === 'alpha' ? 'Alpha Institute of Science' : 'Beta South Mumbai Center',
      goal: newBatch.goal,
      students: Number(newBatch.students),
      capacity: Number(newBatch.capacity),
      room: newBatch.room,
      time: newBatch.time,
      status: newBatch.status,
      streamLive: newBatch.streamLive,
      totalWeeklyHours: Number(newBatch.totalWeeklyHours),
      overallSyllabusPct: Number(newBatch.overallSyllabusPct),
      hwCompletionRate: 95.0,
      testAverageScore: 82.0,
      attendanceRate: Number(newBatch.attendanceRate),
      teacher: newBatch.teacher,
      dailyAttendance: [
        { day: 'Mon', date: 'Sep 15', rate: 98 },
        { day: 'Tue', date: 'Sep 16', rate: 97 },
        { day: 'Wed', date: 'Sep 17', rate: 99 },
        { day: 'Thu', date: 'Sep 18', rate: 98 },
        { day: 'Fri', date: 'Sep 19', rate: 96 }
      ],
      subjects: [
        { name: newBatch.subject1Name, teacher: newBatch.subject1Teacher, hoursPerWeek: Number(newBatch.subject1Hours), syllabusPct: 0, completedHours: 0, totalHours: 120 },
        { name: newBatch.subject2Name, teacher: newBatch.subject2Teacher, hoursPerWeek: Number(newBatch.subject2Hours), syllabusPct: 0, completedHours: 0, totalHours: 120 },
        { name: newBatch.subject3Name, teacher: newBatch.subject3Teacher, hoursPerWeek: Number(newBatch.subject3Hours), syllabusPct: 0, completedHours: 0, totalHours: 120 }
      ],
      curriculumUnits: [
        { unit: 'Unit 1: Fundamentals & Orientation', hours: 24, status: 'In Progress', progress: 25 },
        { unit: 'Unit 2: Core Course Syllabus', hours: 48, status: 'Upcoming', progress: 0 }
      ],
      homeworkRecords: [],
      testRecords: [],
      schedule: [
        { day: 'Monday', time: newBatch.time, subject: newBatch.subject1Name, teacher: newBatch.subject1Teacher, room: newBatch.room, isLive: true },
        { day: 'Wednesday', time: newBatch.time, subject: newBatch.subject2Name, teacher: newBatch.subject2Teacher, room: newBatch.room, isLive: false },
        { day: 'Friday', time: newBatch.time, subject: newBatch.subject3Name, teacher: newBatch.subject3Teacher, room: newBatch.room, isLive: true }
      ]
    };

    setBatches([createdBatch, ...batches]);
    setIsModalOpen(false);
    setNewBatch({
      name: '',
      code: '',
      goal: '',
      instituteCode: 'alpha',
      capacity: 40,
      students: 25,
      room: 'Lecture Hall B (Room 201)',
      time: '08:00 AM - 12:00 PM',
      status: 'In Session',
      streamLive: false,
      totalWeeklyHours: 24,
      overallSyllabusPct: 0,
      attendanceRate: 98.0,
      teacher: 'Dr. Harrison Wells',
      subject1Name: 'Physics & Mechanics',
      subject1Teacher: 'Dr. K.V. Rao',
      subject1Hours: 8,
      subject2Name: 'Organic Chemistry',
      subject2Teacher: 'Prof. Sunita Roy',
      subject2Hours: 8,
      subject3Name: 'Calculus & Vectors',
      subject3Teacher: 'Er. Vivek Sharma',
      subject3Hours: 8
    });
    showToast(`Created new batch "${createdBatch.name}" successfully!`);
  };

  // Delete Batch Handler
  const handleDeleteBatch = (id, name) => {
    if (window.confirm(`Are you sure you want to delete batch "${name}"?`)) {
      setBatches(batches.filter(b => b.id !== id));
      showToast(`Deleted batch "${name}".`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-black uppercase tracking-wide border border-indigo-200">
            Academy Cohorts & Batch Master
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Layers className="w-6.5 h-6.5 mr-2 text-indigo-600" /> All Batches Directory & Cohort Creator
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Central repository of all active academic batches, student seat capacities, assigned faculty roster, weekly hours, and syllabus velocity.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> + Add New Batch
        </button>
      </div>

      {/* Top 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Total Active Batches" 
          value={`${totalBatchesCount} Batches`} 
          subtext="Academic Program Cohorts" 
          icon={Layers} 
          color="indigo" 
          badge="Active Directory" 
        />
        <KPICard 
          title="Total Seat Capacity" 
          value={`${totalStudentsEnrolled} / ${totalSeatsCapacity}`} 
          subtext={`${Math.round((totalStudentsEnrolled / (totalSeatsCapacity || 1)) * 100)}% Fill Rate`} 
          icon={Users} 
          color="blue" 
          badge="Enrolled Load" 
        />
        <KPICard 
          title="Avg Syllabus Velocity" 
          value={`${avgSyllabusPct}% Completed`} 
          subtext="Target Completion: Nov 2026" 
          icon={BookOpen} 
          color="green" 
          badge="100% On Schedule" 
        />
        <KPICard 
          title="Live WebRTC Streams" 
          value={`${liveStreamsCount} Active Streams`} 
          subtext="Direct Broadcast to Student App" 
          icon={Video} 
          color="purple" 
          badge="HD Live" 
        />
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search batch name, code, target goal, or lead teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-600 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" /> Status:
          </span>
          <button 
            onClick={() => setStatusFilter('ALL')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            All Batches
          </button>
          <button 
            onClick={() => setStatusFilter('In Session')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusFilter === 'In Session' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}
          >
            In Session
          </button>
          <button 
            onClick={() => setStatusFilter('Upcoming')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusFilter === 'Upcoming' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* BATCHES DIRECTORY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBatches.map(b => {
          const fillRate = Math.round(((b.students || 0) / (b.capacity || 1)) * 100);
          return (
            <div key={b.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold border border-indigo-200">
                      {b.code || b.id}
                    </span>
                    <h3 className="font-heading text-base font-black text-slate-900 mt-1">{b.name}</h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    b.status === 'In Session' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {b.status}
                  </span>
                </div>

                {/* Goal / Target Exam */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <span className="font-extrabold text-indigo-700 block text-[10px] uppercase tracking-wide">Target Goal:</span>
                  <p className="font-medium text-[11px]">{b.goal}</p>
                </div>

                {/* Capacity Fill Meter */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-slate-700 text-[11px]">
                    <span>Enrolled Seats:</span>
                    <span className="text-indigo-600">{b.students} / {b.capacity} Seats ({fillRate}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${fillRate >= 90 ? 'bg-rose-500' : fillRate >= 75 ? 'bg-indigo-600' : 'bg-emerald-500'}`} 
                      style={{ width: `${fillRate}%` }} 
                    />
                  </div>
                </div>

                {/* Key Meta Details */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100 text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px]">Lead Teacher:</span>
                    <strong className="text-slate-900">{b.teacher}</strong>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px]">Weekly Hours:</span>
                    <strong className="text-slate-900">{b.totalWeeklyHours} Hrs/Wk</strong>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px]">Room / Hall:</span>
                    <strong className="text-slate-900">{b.room}</strong>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px]">Batch Timings:</span>
                    <strong className="text-slate-900">{b.time}</strong>
                  </div>
                </div>

                {/* Assigned Subjects List */}
                {b.subjects && b.subjects.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-slate-100 text-xs">
                    <span className="font-bold text-slate-700 text-[11px] block">Assigned Subjects & Faculty:</span>
                    <div className="space-y-1">
                      {b.subjects.map((s, idx) => (
                        <div key={idx} className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] flex justify-between">
                          <span className="font-semibold text-slate-900">{s.name} <span className="text-slate-400">({s.teacher})</span></span>
                          <span className="font-bold text-indigo-600">{s.hoursPerWeek}h/wk</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs">
                  <span className="font-bold text-emerald-600">{b.overallSyllabusPct || 0}% Syllabus</span>
                </div>
                <button 
                  onClick={() => handleDeleteBatch(b.id, b.name)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition text-xs font-bold flex items-center"
                  title="Delete Batch"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPREHENSIVE NEW BATCH CREATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-heading font-black text-slate-900 text-lg flex items-center">
                  <PlusCircle className="w-5 h-5 mr-2 text-indigo-600" /> Create & Launch New Batch Cohort
                </h3>
                <p className="text-xs text-slate-500">Fill in all batch parameters, seat capacity, assigned lead teacher, subjects, and weekly schedule.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4 text-xs">
              {/* Section 1: Basic Information */}
              <div className="space-y-2">
                <span className="font-extrabold text-indigo-700 text-[11px] uppercase tracking-wider block">1. Batch Identity & Goal</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Batch Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. JEE Advanced Apex 2027" 
                      value={newBatch.name} 
                      onChange={(e) => setNewBatch({...newBatch, name: e.target.value})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Batch Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. B107-JEE-APEX" 
                      value={newBatch.code} 
                      onChange={(e) => setNewBatch({...newBatch, code: e.target.value})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Target Goal / Objective *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Top 500 AIR Rank in IIT-JEE Advanced 2027" 
                      value={newBatch.goal} 
                      onChange={(e) => setNewBatch({...newBatch, goal: e.target.value})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Campus & Seats */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="font-extrabold text-indigo-700 text-[11px] uppercase tracking-wider block">2. Branch, Capacity & Schedule</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Institute Branch</label>
                    <select 
                      value={newBatch.instituteCode} 
                      onChange={(e) => setNewBatch({...newBatch, instituteCode: e.target.value})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                    >
                      <option value="alpha">Alpha Institute of Science</option>
                      <option value="beta">Beta South Mumbai Center</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Max Seat Capacity</label>
                    <input 
                      type="number" 
                      value={newBatch.capacity} 
                      onChange={(e) => setNewBatch({...newBatch, capacity: Number(e.target.value)})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Enrolled Students</label>
                    <input 
                      type="number" 
                      value={newBatch.students} 
                      onChange={(e) => setNewBatch({...newBatch, students: Number(e.target.value)})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Room / Hall</label>
                    <input 
                      type="text" 
                      value={newBatch.room} 
                      onChange={(e) => setNewBatch({...newBatch, room: e.target.value})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Class Timings</label>
                    <input 
                      type="text" 
                      value={newBatch.time} 
                      onChange={(e) => setNewBatch({...newBatch, time: e.target.value})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Total Weekly Hours</label>
                    <input 
                      type="number" 
                      value={newBatch.totalWeeklyHours} 
                      onChange={(e) => setNewBatch({...newBatch, totalWeeklyHours: Number(e.target.value)})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Faculty & Subjects */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="font-extrabold text-indigo-700 text-[11px] uppercase tracking-wider block">3. Faculty Roster & Subjects</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Course Director / Lead Teacher</label>
                    <input 
                      type="text" 
                      value={newBatch.teacher} 
                      onChange={(e) => setNewBatch({...newBatch, teacher: e.target.value})} 
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>

                  {/* Subject 1 */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-700 text-[11px] block">Subject 1</span>
                    <input 
                      type="text" 
                      placeholder="Subject Name" 
                      value={newBatch.subject1Name} 
                      onChange={(e) => setNewBatch({...newBatch, subject1Name: e.target.value})} 
                      className="w-full p-1.5 bg-white border border-slate-300 rounded font-semibold"
                    />
                    <input 
                      type="text" 
                      placeholder="Assigned Teacher" 
                      value={newBatch.subject1Teacher} 
                      onChange={(e) => setNewBatch({...newBatch, subject1Teacher: e.target.value})} 
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>

                  {/* Subject 2 */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-700 text-[11px] block">Subject 2</span>
                    <input 
                      type="text" 
                      placeholder="Subject Name" 
                      value={newBatch.subject2Name} 
                      onChange={(e) => setNewBatch({...newBatch, subject2Name: e.target.value})} 
                      className="w-full p-1.5 bg-white border border-slate-300 rounded font-semibold"
                    />
                    <input 
                      type="text" 
                      placeholder="Assigned Teacher" 
                      value={newBatch.subject2Teacher} 
                      onChange={(e) => setNewBatch({...newBatch, subject2Teacher: e.target.value})} 
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
                >
                  Launch New Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
