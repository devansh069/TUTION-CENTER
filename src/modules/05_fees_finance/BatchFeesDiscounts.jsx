import React, { useState, useMemo } from 'react';
import { DollarSign, Search, Award, Users, Percent, CheckCircle2, AlertTriangle, ArrowUpRight, BookOpen, Layers } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { BATCH_FEES_DATA, STUDENT_FEES_DISCOUNT_DATA } from '../../data/erpData';

export default function BatchFeesDiscounts({ instituteCode = 'all' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter Batches by Institute
  const filteredBatches = useMemo(() => {
    return BATCH_FEES_DATA.filter(b => isAll || b.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  }, [instituteCode, isAll]);

  // Filter Students by Institute & Search & Batch
  const filteredStudents = useMemo(() => {
    return STUDENT_FEES_DISCOUNT_DATA.filter(s => {
      const matchInst = isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || s.batchName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBatch = selectedBatchFilter === 'ALL' || s.batchName === selectedBatchFilter;
      return matchInst && matchSearch && matchBatch;
    });
  }, [instituteCode, isAll, searchTerm, selectedBatchFilter]);

  // Aggregate Metrics
  const totalStudents = filteredStudents.length;
  const totalGrossTuition = filteredBatches.reduce((acc, b) => acc + b.grossTuitionPool, 0);
  const totalDiscounts = filteredBatches.reduce((acc, b) => acc + b.totalDiscountsAwarded, 0);
  const totalNetCollectible = filteredBatches.reduce((acc, b) => acc + b.netCollectibleFee, 0);
  const totalCollected = filteredBatches.reduce((acc, b) => acc + b.totalCollected, 0);

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
            Tuition Fees & Scholarship Concessions
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <BookOpen className="w-6.5 h-6.5 mr-2 text-indigo-600" /> Batch Fee Costs & Student Discounts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent breakdown of batch tuition pricing, student-wise merit scholarships, early-bird concessions, and net fee collections.
          </p>
        </div>
        <button 
          onClick={() => showToast("Exported Batch Fee Structure & Student Discount Ledger.")}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-2xs"
        >
          Export Discount Ledger
        </button>
      </div>

      {/* Top 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Active Batches" 
          value={`${filteredBatches.length} Batches`} 
          subtext={`Total ${totalStudents} Enrolled Students`} 
          icon={Layers} 
          color="indigo" 
          badge="Course Catalog" 
        />
        <KPICard 
          title="Gross Tuition Target" 
          value={`$${totalGrossTuition.toLocaleString()}`} 
          subtext="Base Tuition Pricing Pool" 
          icon={DollarSign} 
          color="blue" 
          badge="Pre-Discount" 
        />
        <KPICard 
          title="Discounts & Scholarships" 
          value={`$${totalDiscounts.toLocaleString()}`} 
          subtext="Merit & Early-Bird Concessions" 
          icon={Award} 
          color="amber" 
          badge={`${Math.round((totalDiscounts / (totalGrossTuition || 1)) * 100)}% Overall Concession`} 
        />
        <KPICard 
          title="Net Tuition Collected" 
          value={`$${totalCollected.toLocaleString()}`} 
          subtext={`$${(totalNetCollectible - totalCollected).toLocaleString()} Pending Balance`} 
          icon={CheckCircle2} 
          color="green" 
          badge={`${Math.round((totalCollected / (totalNetCollectible || 1)) * 100)}% Realized`} 
        />
      </div>

      {/* SECTION 1: BATCH FEE COST MATRIX */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-indigo-600" /> Batch Tuition Fee Cost Matrix
            </h3>
            <p className="text-xs text-slate-500">Base fee per student, total enrolled capacity, gross revenue pool, and net realized collections.</p>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Batch Name & Code</th>
                <th className="p-3">Program Duration</th>
                <th className="p-3">Base Fee / Student</th>
                <th className="p-3">Students</th>
                <th className="p-3">Gross Tuition Pool</th>
                <th className="p-3">Discounts Granted</th>
                <th className="p-3">Net Collectible</th>
                <th className="p-3">Total Realized</th>
                <th className="p-3 text-right">Progress Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {filteredBatches.map(b => {
                const percent = Math.round((b.totalCollected / (b.netCollectibleFee || 1)) * 100);
                return (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">
                      {b.batchName}
                      <span className="block font-mono text-[10px] text-slate-400 font-normal">{b.id}</span>
                    </td>
                    <td className="p-3 text-slate-600">{b.courseDuration}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">${b.baseFeePerStudent.toLocaleString()}</td>
                    <td className="p-3 font-bold text-indigo-600">{b.enrolledStudents} Students</td>
                    <td className="p-3 font-mono text-slate-600">${b.grossTuitionPool.toLocaleString()}</td>
                    <td className="p-3 font-mono text-amber-600 font-bold">-${b.totalDiscountsAwarded.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">${b.netCollectibleFee.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-emerald-600">${b.totalCollected.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-700">{percent}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: STUDENT FEE & DISCOUNT CONCESSION LEDGER */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
              <Award className="w-5 h-5 mr-2 text-amber-500" /> Student Fee & Applied Discount Matrix
            </h3>
            <p className="text-xs text-slate-500">Individual student fee breakdown showing applied merit scholarship %, discount concessions, net fee, and payment status.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search student or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <select
              value={selectedBatchFilter}
              onChange={(e) => setSelectedBatchFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-bold focus:outline-none"
            >
              <option value="ALL">All Batches</option>
              {filteredBatches.map(b => (
                <option key={b.id} value={b.batchName}>{b.batchName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Base Fee</th>
                <th className="p-3">Applied Concession / Scholarship</th>
                <th className="p-3">Discount Concession</th>
                <th className="p-3">Net Fee Payable</th>
                <th className="p-3">Paid Amount</th>
                <th className="p-3">Balance Due</th>
                <th className="p-3 text-right">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {filteredStudents.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center space-x-2.5">
                      <img src={s.photo} alt={s.studentName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                      <div>
                        <span className="font-bold text-slate-900 block">{s.studentName}</span>
                        <span className="font-mono text-[10px] text-slate-400">{s.studentId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{s.batchName}</td>
                  <td className="p-3 font-mono text-slate-500">${s.baseFee.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold inline-flex items-center ${
                      s.discountPercent > 0 ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Percent className="w-3 h-3 mr-1 text-amber-500" />
                      {s.discountCategory}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-amber-600">-${s.discountAmount.toLocaleString()}</td>
                  <td className="p-3 font-mono font-black text-slate-900">${s.netFeePayable.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">${s.amountPaid.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-rose-600">${s.balanceDue.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        s.paymentStatus === 'Fully Paid' ? 'bg-emerald-100 text-emerald-800' :
                        s.paymentStatus === 'Partial Payment' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {s.paymentStatus}
                      </span>
                      <button 
                        onClick={() => showToast(`Issued digital fee receipt for ${s.studentName}`)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold shadow-2xs"
                      >
                        Receipt
                      </button>
                    </div>
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
