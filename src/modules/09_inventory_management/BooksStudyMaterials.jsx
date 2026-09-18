import React, { useState } from 'react';
import { BookOpen, Search, Download, AlertTriangle, CheckCircle2, Send, Filter, Users, X } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { INVENTORY_DATA, BATCHES_DATA, STUDENTS_DATA } from '../../data/erpData';

export default function BooksStudyMaterials({ inventory = [], selectedInstituteCode, instituteCode }) {
  const targetCode = (instituteCode || selectedInstituteCode || 'all').toLowerCase();
  const data = (inventory && inventory.length > 0) ? inventory : INVENTORY_DATA;
  const bookSets = data.filter(i => (targetCode === 'all' || !i.instituteCode || i.instituteCode.toLowerCase() === targetCode) && (i.category === 'Batch Book Set' || i.category === 'Study Material'));

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedSet, setSelectedSet] = useState(bookSets[0] || null);

  const [studentId, setStudentId] = useState('');
  const [issuedSuccess, setIssuedSuccess] = useState(false);

  const filteredSets = bookSets.filter(b => {
    const matchesQuery = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.itemCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || b.batch === selectedBatch;
    return matchesQuery && matchesBatch;
  });

  // Mock Student Book Set Issuance Ledger
  const issuanceLedger = [
    { id: 'ISS-101', student: 'Aarav Sharma', batch: 'Batch A - JEE 2026', bookSet: 'JEE Advanced 2026 Master Book Set', date: '15 Sep 2026', status: 'Handover Completed', verifiedBy: 'Priya (Front Desk)' },
    { id: 'ISS-102', student: 'Rohan Mehta', batch: 'Batch B - NEET 2026', bookSet: 'NEET UG 2026 Complete Bio & Chem Pack', date: '14 Sep 2026', status: 'Handover Completed', verifiedBy: 'Rajesh (Inventory Admin)' },
    { id: 'ISS-103', student: 'Priya Patel', batch: 'Batch C - CA Foundation', bookSet: 'CA Foundation Statutory Modules', date: '16 Sep 2026', status: 'Handover Completed', verifiedBy: 'Priya (Front Desk)' },
    { id: 'ISS-104', student: 'Vikram Singh', batch: 'Batch D - Foundation 10th', bookSet: 'Class 10th Board Sprint Bundle', date: '18 Sep 2026', status: 'Handover Completed', verifiedBy: 'Ankit (Staff)' },
    { id: 'ISS-105', student: 'Neha Gupta', batch: 'Batch A - JEE 2026', bookSet: 'JEE Advanced 2026 Master Book Set', date: '19 Sep 2026', status: 'Pending Collection', verifiedBy: 'Awaiting Student' },
  ];

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    setIssuedSuccess(true);
    setTimeout(() => {
      setIssuedSuccess(false);
      setShowIssueModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BookOpen className="w-7 h-7 mr-2.5 text-indigo-600" /> Batch-Wise Book Sets & Module Bundles
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Curriculum book packages, subject theory modules, practice question banks, and student handover tracker.
          </p>
        </div>

        <button 
          onClick={() => setShowIssueModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center shadow-sm"
        >
          <Send className="w-4 h-4 mr-1.5" /> Issue Book Set to Student
        </button>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Book Sets" value={`${bookSets.reduce((acc, b) => acc + b.inStock, 0)} Packs`} subtext="In Warehouse Stock" icon={BookOpen} color="blue" />
        <KPICard title="Issued to Enrolled" value="297 Bundles" subtext="Distributed this Term" icon={CheckCircle2} color="green" />
        <KPICard title="Reorder Threshold" value="50 Minimum" subtext="Auto Vendor Alert" icon={AlertTriangle} color="amber" />
        <KPICard title="Publishing Partners" value="Pearson & McGraw" subtext="Direct Academy Tie-Up" icon={BookOpen} color="purple" />
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input 
            type="text"
            placeholder="Search book set title or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
          <select 
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full sm:w-56 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="all">All Batches</option>
            {BATCHES_DATA.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Book Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSets.map((set) => (
          <div key={set.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 font-mono text-xs font-bold">
                  SKU: {set.itemCode}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  set.inStock <= set.minRequired ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {set.inStock} In Stock
                </span>
              </div>

              <h3 className="font-heading text-base font-bold text-slate-900 mb-1">{set.name}</h3>
              <p className="text-xs font-bold text-indigo-600 mb-3">{set.batch}</p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">
                <p className="text-[11px] font-bold text-slate-600 uppercase mb-2">Package Volumes Included:</p>
                <div className="flex flex-wrap gap-1.5">
                  {set.includes?.map((inc, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-white border border-slate-300 text-xs font-semibold text-slate-700">
                      📚 {inc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 mb-2">
                <div>
                  <span className="text-slate-400 block text-[10px]">Supplier Publisher</span>
                  <span className="font-semibold text-slate-800">{set.supplier}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Unit Valuation</span>
                  <span className="font-mono font-bold text-slate-900">${set.unitCost} / Set</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Assigned: <strong className="text-slate-900">{set.assignedStudents} Students</strong></span>
              <button 
                onClick={() => {
                  setSelectedSet(set);
                  setShowIssueModal(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                Handover Set
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Student Book Set Issuance Ledger Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">Student Book Set Handover Ledger</h3>
            <p className="text-xs text-slate-500">Record of book sets handed over to students upon admission or batch commencement</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center border border-slate-300">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Ledger (CSV)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Issue ID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Target Batch</th>
                <th className="p-3">Book Set Handed Over</th>
                <th className="p-3">Issue Date</th>
                <th className="p-3">Front Desk Staff</th>
                <th className="p-3 text-right">Handover Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {issuanceLedger.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-600">{row.id}</td>
                  <td className="p-3 font-bold text-slate-900">{row.student}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[11px]">{row.batch}</span></td>
                  <td className="p-3 text-slate-800">{row.bookSet}</td>
                  <td className="p-3 font-mono text-slate-500">{row.date}</td>
                  <td className="p-3 text-slate-600">{row.verifiedBy}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      row.status.includes('Completed') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Issue Book Set */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setShowIssueModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-lg font-bold text-slate-900 mb-1 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-600" /> Handover Book Set to Student
            </h3>
            <p className="text-xs text-slate-500 mb-4">Assign book set bundle to an enrolled student.</p>

            {issuedSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-sm space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <p>Book Set Successfully Issued!</p>
              </div>
            ) : (
              <form onSubmit={handleIssueSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                  <select 
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  >
                    <option value="">-- Select Student from Roster --</option>
                    {STUDENTS_DATA.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.batch})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Selected Book Set Bundle</label>
                  <input 
                    type="text" 
                    readOnly
                    value={selectedSet ? selectedSet.name : bookSets[0]?.name}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowIssueModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
                  >
                    Confirm Handover
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
