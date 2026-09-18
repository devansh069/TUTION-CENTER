import React, { useState, useMemo } from 'react';
import { DollarSign, Search, Download, CreditCard, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { STUDENT_FEES_DISCOUNT_DATA, BATCH_FEES_DATA } from '../../data/erpData';

export default function FeeLedgerReceipts({ instituteCode = 'all' }) {
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Base Receipts dataset derived from Student Fee Data
  const receipts = useMemo(() => {
    return STUDENT_FEES_DISCOUNT_DATA.filter(s => {
      const scope = isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !search || 
        s.studentName.toLowerCase().includes(search.toLowerCase()) || 
        s.studentId.toLowerCase().includes(search.toLowerCase()) || 
        s.batchName.toLowerCase().includes(search.toLowerCase());
      return scope && matchSearch;
    }).map((s, idx) => ({
      id: `REC-2026-00${idx + 1}`,
      receiptNo: `REC-2026-88${idx + 1}`,
      studentId: s.studentId,
      studentName: s.studentName,
      photo: s.photo,
      batchName: s.batchName,
      netFee: s.netFeePayable,
      amountPaid: s.amountPaid,
      gstTax: Math.round(s.amountPaid * 0.18),
      totalWithTax: Math.round(s.amountPaid * 1.18),
      date: `2026-09-${18 - idx}`,
      paymentMode: idx % 2 === 0 ? 'UPI Direct App' : idx % 3 === 0 ? 'NetBanking ACH' : 'Corporate Card',
      instituteCode: s.instituteCode,
      status: s.amountPaid > 0 ? 'Paid & Verified' : 'Pending'
    }));
  }, [instituteCode, isAll, search]);

  const totalReceiptsCount = receipts.length;
  const totalVolumePaid = receipts.reduce((acc, r) => acc + r.amountPaid, 0);

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
          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-black uppercase tracking-wide border border-blue-200">
            Digital Fee Ledger & Receipts
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <CreditCard className="w-6.5 h-6.5 mr-2 text-blue-600" /> Master Fee Receipts & Inflow Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full audit trail of all student mobile app payments, instant UPI collections, and downloadable fee receipt PDFs.
          </p>
        </div>
        <button 
          onClick={() => showToast("Exported Master Fee Receipts Ledger (CSV).")}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-2xs flex items-center"
        >
          <Download className="w-4 h-4 mr-1.5" /> Export Receipts CSV
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Transactions" value={`${totalReceiptsCount} Receipts`} subtext="Processed Mobile Payments" icon={CreditCard} color="blue" badge="Verified" />
        <KPICard title="Total Amount Inflow" value={`$${totalVolumePaid.toLocaleString()}`} subtext="Tuition Collections Realized" icon={DollarSign} color="green" badge="Net Inflow" />
        <KPICard title="UPI Gateway Share" value="74.5%" subtext="Instant App Receipts" icon={DollarSign} color="purple" badge="Automated" />
        <KPICard title="Digital Tax Receipts" value="100% Taxed" subtext="18% GST Invoices Attached" icon={FileText} color="amber" badge="SOC-2 Audited" />
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search receipt #, student name, or batch..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">
          Showing {receipts.length} Receipt Records
        </span>
      </div>

      {/* RECEIPTS TABLE */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Receipt #</th>
                <th className="p-3">Student & Batch</th>
                <th className="p-3">Amount Paid</th>
                <th className="p-3">GST Tax (18%)</th>
                <th className="p-3">Payment Date & Method</th>
                <th className="p-3 text-right">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {receipts.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-600">{r.receiptNo}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2.5">
                      <img src={r.photo} alt={r.studentName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                      <div>
                        <span className="font-bold text-slate-900 block">{r.studentName}</span>
                        <span className="text-[10px] text-slate-500">{r.batchName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono font-black text-emerald-600">${r.amountPaid.toLocaleString()}</td>
                  <td className="p-3 font-mono text-slate-500">${r.gstTax.toLocaleString()}</td>
                  <td className="p-3 text-slate-600">
                    <span className="font-semibold block text-slate-800">{r.date}</span>
                    <span className="text-[10px] text-indigo-600 font-bold">{r.paymentMode}</span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => showToast(`Downloaded Official Fee Receipt PDF for ${r.receiptNo}`)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-600 hover:text-white transition-colors text-xs"
                    >
                      Download PDF
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
