import React, { useState, useMemo } from 'react';
import { AlertTriangle, Send, Phone, DollarSign, CheckCircle2, Search, Filter } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { STUDENT_FEES_DISCOUNT_DATA } from '../../data/erpData';

export default function DefaulterRecovery({ instituteCode = 'all' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Base Defaulters dataset derived from Student Fee Data
  const defaulters = useMemo(() => {
    return STUDENT_FEES_DISCOUNT_DATA.filter(s => {
      const scope = isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const hasDues = s.balanceDue > 0 || s.paymentStatus.includes('Overdue') || s.paymentStatus.includes('Partial');
      const matchSearch = !searchTerm || 
        s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.batchName.toLowerCase().includes(searchTerm.toLowerCase());
      return scope && hasDues && matchSearch;
    }).map((s, idx) => ({
      ...s,
      receiptNo: `REC-2026-88${idx + 1}`,
      daysOverdue: idx % 2 === 0 ? 45 : 18,
      recoveryStage: idx % 2 === 0 ? '60 Days Critical Warning' : '30 Days 1st Reminder',
      parentPhone: `+91 98${idx + 1}20 44100`
    }));
  }, [instituteCode, isAll, searchTerm]);

  const totalDefaulterBalance = defaulters.reduce((acc, d) => acc + d.balanceDue, 0);

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
          <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-black uppercase tracking-wide border border-rose-200">
            Financial Dunning & Overdue Desk
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <AlertTriangle className="w-6.5 h-6.5 mr-2 text-rose-600" /> Defaulters Recovery & Dunning Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Overdue fee recovery pipeline categorized by aging buckets (15 days, 30 days, 60+ days) with automated WhatsApp link pushes.
          </p>
        </div>

        <button 
          onClick={() => showToast("Dispatched bulk overdue WhatsApp reminders to all defaulter accounts.")}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-2xs flex items-center"
        >
          <Send className="w-4 h-4 mr-1.5" /> Dispatch Bulk Nudges
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Defaulter Balance" value={`$${totalDefaulterBalance.toLocaleString()}`} subtext={`Across ${defaulters.length} Student Accounts`} icon={DollarSign} color="rose" badge="Overdue Total" />
        <KPICard title="30-60 Days Overdue" value="$28,500" subtext="1st Warning Sent" icon={AlertTriangle} color="amber" badge="Follow-up" />
        <KPICard title="60+ Days Critical" value="$14,300" subtext="Final Escalation Stage" icon={AlertTriangle} color="purple" badge="Critical" />
        <KPICard title="Recovery Rate" value="88.5%" subtext="Realized via WhatsApp Link" icon={DollarSign} color="green" badge="High Propensity" />
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder="Search defaulter student name, ID, or batch..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">
          Showing {defaulters.length} Defaulter Accounts
        </span>
      </div>

      {/* DEFAULTERS TABLE */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Student Name & ID</th>
                <th className="p-3">Batch Name</th>
                <th className="p-3">Overdue Balance</th>
                <th className="p-3">Aging Status</th>
                <th className="p-3">Recovery Stage</th>
                <th className="p-3 text-right">App Payment Link Push</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {defaulters.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center space-x-2.5">
                      <img src={t.photo} alt={t.studentName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                      <div>
                        <span className="font-bold text-slate-900 block">{t.studentName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{t.studentId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{t.batchName}</td>
                  <td className="p-3 font-mono font-black text-rose-600">${t.balanceDue.toLocaleString()}</td>
                  <td className="p-3 font-bold text-amber-700">{t.daysOverdue} Days Overdue</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      {t.recoveryStage}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        onClick={() => showToast(`Sent App Payment Push Link to ${t.studentName} (${t.parentPhone})`)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors text-xs shadow-2xs"
                      >
                        Send Payment Link Push
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
