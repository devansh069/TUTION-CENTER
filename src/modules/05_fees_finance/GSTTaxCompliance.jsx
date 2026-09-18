import React, { useState, useMemo } from 'react';
import { FileText, ShieldCheck, Download, DollarSign, CheckCircle2, Search } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { STUDENT_FEES_DISCOUNT_DATA, BATCH_FEES_DATA } from '../../data/erpData';

export default function GSTTaxCompliance({ instituteCode = 'all' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Base GST Transactions dataset derived from Student Fee Data
  const gstTransactions = useMemo(() => {
    return STUDENT_FEES_DISCOUNT_DATA.filter(s => {
      const scope = isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || 
        s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.batchName.toLowerCase().includes(searchTerm.toLowerCase());
      return scope && matchSearch;
    }).map((s, idx) => {
      const amountPaid = s.amountPaid || s.netFeePayable;
      const taxableVal = Math.round(amountPaid / 1.18);
      const totalTax = amountPaid - taxableVal;
      const cgst = Math.round(totalTax / 2);
      const sgst = Math.round(totalTax / 2);

      return {
        id: `GST-INV-2026-00${idx + 1}`,
        invoiceNo: `INV-2026-90${idx + 1}`,
        studentId: s.studentId,
        studentName: s.studentName,
        photo: s.photo,
        batchName: s.batchName,
        grossAmount: amountPaid,
        taxableValue: taxableVal,
        cgst: cgst,
        sgst: sgst,
        totalGst: totalTax,
        hsnSacCode: "999293 (Tuition)",
        instituteCode: s.instituteCode
      };
    });
  }, [instituteCode, isAll, searchTerm]);

  const totalGstRemitted = gstTransactions.reduce((acc, g) => acc + g.totalGst, 0);
  const totalCgst = gstTransactions.reduce((acc, g) => acc + g.cgst, 0);
  const totalSgst = gstTransactions.reduce((acc, g) => acc + g.sgst, 0);

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
            Statutory Tax & GST Invoicing
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <FileText className="w-6.5 h-6.5 mr-2 text-blue-600" /> GST Tax Compliance & Invoicing Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            GSTR-1 tax compliance ledgers, CGST 9% + SGST 9% reconciliations, and HSN/SAC 999293 tuition breakdowns.
          </p>
        </div>

        <button 
          onClick={() => showToast("Exported Statutory GSTR-1 & GSTR-3B Tax Filing Excel Ledger.")}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-2xs flex items-center"
        >
          <Download className="w-4 h-4 mr-1.5" /> Export GSTR Return
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total GST Remitted" value={`$${totalGstRemitted.toLocaleString()}`} subtext="18% Standard Tax Rate" icon={DollarSign} color="blue" badge="Audited" />
        <KPICard title="CGST Component" value={`$${totalCgst.toLocaleString()}`} subtext="9% Central Tax Ledger" icon={FileText} color="green" badge="CGST Share" />
        <KPICard title="SGST Component" value={`$${totalSgst.toLocaleString()}`} subtext="9% State Tax Ledger" icon={FileText} color="purple" badge="SGST Share" />
        <KPICard title="Filing Status" value="GSTR-1 Ready" subtext="ARN-2026-9041284 Verified" icon={ShieldCheck} color="amber" badge="100% Tax Compliant" />
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder="Search invoice #, student name, or batch..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">
          Showing {gstTransactions.length} GST Invoices
        </span>
      </div>

      {/* INVOICES TABLE */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Invoice #</th>
                <th className="p-3">Student & Batch</th>
                <th className="p-3">Gross Invoice Amount</th>
                <th className="p-3">Taxable Value</th>
                <th className="p-3">CGST (9%)</th>
                <th className="p-3">SGST (9%)</th>
                <th className="p-3 text-right">HSN / SAC Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {gstTransactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-600">{t.invoiceNo}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2.5">
                      <img src={t.photo} alt={t.studentName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                      <div>
                        <span className="font-bold text-slate-900 block">{t.studentName}</span>
                        <span className="text-[10px] text-slate-500">{t.batchName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono font-black text-slate-900">${t.grossAmount.toLocaleString()}</td>
                  <td className="p-3 font-mono text-slate-600">${t.taxableValue.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">${t.cgst.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-purple-600">${t.sgst.toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-slate-500">{t.hsnSacCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
