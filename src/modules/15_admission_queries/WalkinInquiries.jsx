import React, { useState, useMemo } from 'react';
import { 
  Users, UserPlus, Clock, CheckCircle2, Search, Filter, 
  MapPin, Phone, Building2, Ticket, ArrowRight, UserCheck, Sparkles, X
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { WALKIN_VISITORS } from './admissionQueriesData';

export default function WalkinInquiries({ instituteCode = 'ALL' }) {
  const [visitors, setVisitors] = useState(WALKIN_VISITORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showPassModal, setShowPassModal] = useState(false);

  // New Visitor Form State
  const [newVisitor, setNewVisitor] = useState({
    student: '',
    parent: '',
    phone: '',
    course: 'IIT-JEE 2027 Dropper Batch',
    counselor: 'Pooja Nair',
    testRoom: 'Counseling Cabin 1'
  });

  // Normalize multi-tenant scope
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter visitors
  const filteredVisitors = useMemo(() => {
    return visitors.filter(v => {
      const matchCampus = isAllInstitutes || v.instituteCode.toLowerCase() === instituteCode.toLowerCase();
      const matchStatus = statusFilter === 'ALL' || v.status.includes(statusFilter);
      const matchSearch = !searchTerm ||
        v.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.parent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.course.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCampus && matchStatus && matchSearch;
    });
  }, [visitors, instituteCode, isAllInstitutes, statusFilter, searchTerm]);

  // Handle generating new visitor pass
  const handleGeneratePass = (e) => {
    e.preventDefault();
    if (!newVisitor.student.trim()) return;

    const nextTokenNum = 113 + visitors.length;
    const createdVisitor = {
      token: `WLK-${nextTokenNum}`,
      student: newVisitor.student,
      parent: newVisitor.parent || 'Parent Accompanying',
      phone: newVisitor.phone || '+91 98000 00000',
      course: newVisitor.course,
      center: instituteCode === 'ALL' ? 'Alpha Institute of Science & Tech' : `Campus (${instituteCode})`,
      instituteCode: instituteCode === 'ALL' ? 'alpha' : instituteCode,
      time: 'Just now',
      waitTime: '0 Mins',
      status: 'Waiting in Reception Lounge',
      counselor: newVisitor.counselor,
      testRoom: newVisitor.testRoom,
      visitorBadge: `VIS-${900 + nextTokenNum}`
    };

    setVisitors([createdVisitor, ...visitors]);
    setShowPassModal(false);
    setNewVisitor({
      student: '',
      parent: '',
      phone: '',
      course: 'IIT-JEE 2027 Dropper Batch',
      counselor: 'Pooja Nair',
      testRoom: 'Counseling Cabin 1'
    });
    alert(`Visitor Pass issued successfully: Token #${createdVisitor.token} for ${createdVisitor.student}`);
  };

  const handleUpdateStatus = (token, nextStatus) => {
    setVisitors(prev => prev.map(v => {
      if (v.token === token) {
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & New Pass CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Reception Console
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Tracking Physical Footfalls Across Centers
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <Users className="w-6 h-6 text-indigo-600" />
            Branch Walk-in Reception Desk & Token Queue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage parent visitor passes, scholarship test allocations, and on-the-spot admission deposits.
          </p>
        </div>

        {/* Generate Pass Button */}
        <button
          onClick={() => setShowPassModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Generate Visitor Pass</span>
        </button>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Physical Footfalls Today"
          value={`${visitors.length} Visitors`}
          subtitle="Parent-Student Visits"
          icon="🚶‍♂️"
          badge="High Footfall"
        />
        <KPICard
          theme="emerald"
          title="Average Wait Duration"
          value="7.2 Mins"
          subtitle="Target: Under 10 Mins"
          icon="⏱️"
          badge="Prompt Triage"
        />
        <KPICard
          theme="amber"
          title="In Counseling Cabins"
          value="3 Active"
          subtitle="Face-to-face Consultations"
          icon="🗣️"
          badge="In Progress"
        />
        <KPICard
          theme="purple"
          title="Token Advance Realized"
          value="2 Enrolled"
          subtitle="On-the-spot Deposits"
          icon="💰"
          badge="Spot Conversion"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search visitor token, student, parent..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'Cabin', 'Test', 'Lounge', 'Counter'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {st === 'ALL' ? 'All Queue' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Walk-in Queue Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Active Walk-in Queue</h3>
          <span className="text-xs text-slate-500">Live Campus Dispatch Desk</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Token & Badge</th>
                <th className="py-3 px-4">Student & Parent</th>
                <th className="py-3 px-4">Interested Course</th>
                <th className="py-3 px-4">Campus & Time</th>
                <th className="py-3 px-4">Assigned Counselor & Room</th>
                <th className="py-3 px-4">Current Queue State</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVisitors.map(w => (
                <tr key={w.token} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-mono font-black text-indigo-600">{w.token}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{w.visitorBadge}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{w.student}</div>
                    <div className="text-[11px] text-slate-500">{w.parent} • {w.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{w.course}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-700 font-medium">{w.center}</div>
                    <div className="text-[11px] text-slate-400 font-mono">In at {w.time} (Wait: {w.waitTime})</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{w.counselor}</div>
                    <div className="text-[11px] text-indigo-600 font-semibold">{w.testRoom}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      w.status.includes('Counter') 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : w.status.includes('Cabin')
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : w.status.includes('Test')
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      ● {w.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(w.token, 'With Director in Cabin 2')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition"
                      >
                        Call Cabin
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(w.token, 'Token Advance Payment Counter')}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg text-[10px] font-bold transition"
                      >
                        Enroll
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Visitor Pass Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-black text-slate-900">Issue New Reception Visitor Pass</h3>
              </div>
              <button
                onClick={() => setShowPassModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGeneratePass} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newVisitor.student}
                  onChange={e => setNewVisitor({ ...newVisitor, student: e.target.value })}
                  placeholder="e.g. Priyanshu Varma"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Accompanying Parent / Guardian *</label>
                <input
                  type="text"
                  required
                  value={newVisitor.parent}
                  onChange={e => setNewVisitor({ ...newVisitor, parent: e.target.value })}
                  placeholder="e.g. Ramesh Varma (Father)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Contact Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newVisitor.phone}
                  onChange={e => setNewVisitor({ ...newVisitor, phone: e.target.value })}
                  placeholder="+91 98200 12345"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Interested Target Course</label>
                <select
                  value={newVisitor.course}
                  onChange={e => setNewVisitor({ ...newVisitor, course: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                >
                  <option value="IIT-JEE 2027 Dropper Batch">IIT-JEE 2027 Dropper Batch</option>
                  <option value="NEET Super-60 Medical">NEET Super-60 Medical</option>
                  <option value="Foundation Class 10 NTSE">Foundation Class 10 NTSE</option>
                  <option value="CA Foundation & Mercantile Law">CA Foundation & Mercantile Law</option>
                  <option value="CLAT UG Legal Aptitude">CLAT UG Legal Aptitude</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assign Counselor</label>
                  <select
                    value={newVisitor.counselor}
                    onChange={e => setNewVisitor({ ...newVisitor, counselor: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="Pooja Nair">Pooja Nair</option>
                    <option value="Vikram Joshi">Vikram Joshi</option>
                    <option value="Meera Rao">Meera Rao</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Designated Room</label>
                  <select
                    value={newVisitor.testRoom}
                    onChange={e => setNewVisitor({ ...newVisitor, testRoom: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="Counseling Cabin 1">Counseling Cabin 1</option>
                    <option value="Cabin 2 (Director)">Cabin 2 (Director)</option>
                    <option value="Room 102 (Test Lab)">Room 102 (Test Lab)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Issue Pass & Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
