import React from 'react';
import { ROYALTY_LEDGER } from './franchiseData';
import { Receipt, CheckCircle2, AlertCircle, Clock, Download, Plus } from 'lucide-react';

export default function RoyaltyLedger() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Pending': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Overdue': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Pending': return <Clock className="w-3.5 h-3.5" />;
      case 'Overdue': return <AlertCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-indigo-600" /> Royalty Ledgers & Invoicing
          </h2>
          <p className="text-xs text-slate-500 mt-1">Track monthly revenue sharing and fixed franchise fees.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-2">
            <Download className="w-4 h-4 text-slate-500" /> Export Ledgers
          </button>
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs flex items-center gap-2">
            <Plus className="w-4 h-4" /> Generate Invoice
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Invoice / Billing</th>
                <th className="px-4 py-3">Branch Identity</th>
                <th className="px-4 py-3">Amount Due</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Settlement</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ROYALTY_LEDGER.map(ledger => (
                <tr key={ledger.invoiceId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900">{ledger.invoiceId}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{ledger.billingMonth}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{ledger.branchName}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{ledger.branchId}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-black text-slate-900 text-sm">₹{ledger.amountDue.toLocaleString()}</div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">Due: {ledger.dueDate}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${getStatusColor(ledger.status)}`}>
                      {getStatusIcon(ledger.status)} {ledger.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-700">{ledger.paymentMode}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{ledger.paidDate}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">
                      View Details
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
