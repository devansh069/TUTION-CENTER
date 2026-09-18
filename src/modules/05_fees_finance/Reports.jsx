import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, Download, DollarSign, AlertTriangle, FileText, CheckCircle2, Search, Filter, Calendar, Send, PhoneCall, ShieldAlert, ArrowUpRight } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { STUDENT_FEES_DISCOUNT_DATA, BATCH_FEES_DATA, FIXED_EXPENSES_DATA, SALARIES_PAYROLL_EXPENSES_DATA, MANUAL_EXPENSES_DATA } from '../../data/erpData';

export default function Reports({ instituteCode = 'all', activeTab = 'rep_collection' }) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'rep_collection');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter datasets
  const students = useMemo(() => {
    return STUDENT_FEES_DISCOUNT_DATA.filter(s => {
      const matchInst = isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || s.batchName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchInst && matchSearch;
    });
  }, [instituteCode, isAll, searchTerm]);

  const batches = useMemo(() => {
    return BATCH_FEES_DATA.filter(b => isAll || b.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  }, [instituteCode, isAll]);

  // Financial Metrics
  const totalCollected = batches.reduce((acc, b) => acc + b.totalCollected, 0);
  const totalOutstanding = students.reduce((acc, s) => acc + s.balanceDue, 0);
  const totalDiscounts = batches.reduce((acc, b) => acc + b.totalDiscountsAwarded, 0);

  // Defaulters List
  const defaultersList = useMemo(() => {
    return students.filter(s => s.balanceDue > 0 || s.paymentStatus.includes('Overdue') || s.paymentStatus.includes('Partial'));
  }, [students]);

  // GST Calculation (18% on total collected)
  const gstTaxableValue = Math.round(totalCollected / 1.18);
  const totalGstAmount = totalCollected - gstTaxableValue;
  const cgstAmount = Math.round(totalGstAmount / 2);
  const sgstAmount = Math.round(totalGstAmount / 2);

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
            Financial Analytics & Compliance Telemetry
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <BarChart3 className="w-6.5 h-6.5 mr-2 text-indigo-600" /> Financial Intelligence & Collection Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time collection velocity, defaulter aging buckets, multi-lingual recovery alerts, and GST tax filing audits.
          </p>
        </div>

        <button 
          onClick={() => showToast("Exported Financial Intelligence CSV Audit Report.")}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-2xs flex items-center"
        >
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Gross Inflow Realized" 
          value={`$${totalCollected.toLocaleString()}`} 
          subtext="Mobile & Gateway Inflow" 
          icon={DollarSign} 
          color="green" 
          badge="MTD Collections" 
        />
        <KPICard 
          title="Defaulter Dues Balance" 
          value={`$${totalOutstanding.toLocaleString()}`} 
          subtext={`${defaultersList.length} Accounts Pending`} 
          icon={AlertTriangle} 
          color="rose" 
          badge="Overdue Desk" 
        />
        <KPICard 
          title="Total Discounts Granted" 
          value={`$${totalDiscounts.toLocaleString()}`} 
          subtext="Merit Scholarships & Concessions" 
          icon={BarChart3} 
          color="amber" 
          badge="Tuition Waivers" 
        />
        <KPICard 
          title="GST Tax Remitted (18%)" 
          value={`$${totalGstAmount.toLocaleString()}`} 
          subtext={`CGST $${cgstAmount.toLocaleString()} + SGST $${sgstAmount.toLocaleString()}`} 
          icon={FileText} 
          color="blue" 
          badge="100% Tax Compliant" 
        />
      </div>

      {/* REPORT SUB-TABS */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setCurrentTab('rep_collection')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            currentTab === 'rep_collection' ? 'bg-white text-emerald-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Collection Summary & Inflow Breakdown
        </button>
        <button
          onClick={() => setCurrentTab('rep_ageing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentTab === 'rep_ageing' ? 'bg-white text-rose-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-rose-500" />
          2. Defaulters Ageing & Overdue Recovery Audit
        </button>
        <button
          onClick={() => setCurrentTab('rep_gst')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            currentTab === 'rep_gst' ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
          3. Tax & GST Filings Audit (CGST / SGST 18%)
        </button>
      </div>

      {/* SEARCH BAR (if relevant) */}
      {currentTab === 'rep_ageing' && (
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search defaulter student name, ID, or batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>
        </div>
      )}

      {/* SUB-REPORT 1: COLLECTION SUMMARY */}
      {currentTab === 'rep_collection' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-emerald-600" /> 1. Fee Collection Summary & Payment Gateway Channels
              </h3>
              <p className="text-xs text-slate-500">Breakdown of gross collection realized across batches, digital mobile apps, and direct bank transfers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wide text-[10px]">UPI & Mobile App Collection</span>
              <h4 className="text-xl font-black text-emerald-900">$218,400 (64.2%)</h4>
              <p className="text-[11px] text-emerald-700">Instant Automated Receipts Issued</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="font-bold text-blue-800 uppercase tracking-wide text-[10px]">Direct ACH & NetBanking</span>
              <h4 className="text-xl font-black text-blue-900">$94,200 (27.7%)</h4>
              <p className="text-[11px] text-blue-700">Bank Transfer Verified</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
              <span className="font-bold text-purple-800 uppercase tracking-wide text-[10px]">Over-the-Counter Cash / Cheque</span>
              <h4 className="text-xl font-black text-purple-900">$27,500 (8.1%)</h4>
              <p className="text-[11px] text-purple-700">Campus Counter Collection</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Batch Name</th>
                  <th className="p-3">Course Cost / Student</th>
                  <th className="p-3">Enrolled</th>
                  <th className="p-3">Gross Pool</th>
                  <th className="p-3">Discounts</th>
                  <th className="p-3">Net Collectible</th>
                  <th className="p-3">Collected Inflow</th>
                  <th className="p-3 text-right">Collection Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                {batches.map(b => {
                  const rate = Math.round((b.totalCollected / (b.netCollectibleFee || 1)) * 100);
                  return (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{b.batchName}</td>
                      <td className="p-3 font-mono text-slate-600">${b.baseFeePerStudent.toLocaleString()}</td>
                      <td className="p-3 font-bold text-indigo-600">{b.enrolledStudents}</td>
                      <td className="p-3 font-mono text-slate-600">${b.grossTuitionPool.toLocaleString()}</td>
                      <td className="p-3 font-mono text-amber-600 font-bold">-${b.totalDiscountsAwarded.toLocaleString()}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">${b.netCollectibleFee.toLocaleString()}</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">${b.totalCollected.toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {rate}% Realized
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-REPORT 2: DEFAULTERS AGEING */}
      {currentTab === 'rep_ageing' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-rose-600" /> 2. Defaulters Ageing & Overdue Recovery Telemetry
              </h3>
              <p className="text-xs text-slate-500">Aging classification (15d, 30d, 60d+ overdue), student balance breakdown, and automated recovery actions.</p>
            </div>
            <button 
              onClick={() => showToast("Dispatched automated WhatsApp overdue reminders to all defaulter accounts.")}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 flex items-center"
            >
              <Send className="w-3.5 h-3.5 mr-1" /> Nudge All Defaulters
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Student Name & ID</th>
                  <th className="p-3">Batch Name</th>
                  <th className="p-3">Net Fee Payable</th>
                  <th className="p-3">Paid Amount</th>
                  <th className="p-3">Balance Overdue</th>
                  <th className="p-3">Ageing Bucket</th>
                  <th className="p-3">Recovery Status</th>
                  <th className="p-3 text-right">Intervention Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                {defaultersList.map(s => {
                  const isSevere = s.balanceDue > 1000;
                  return (
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
                      <td className="p-3 font-mono text-slate-600">${s.netFeePayable.toLocaleString()}</td>
                      <td className="p-3 font-mono text-emerald-600 font-bold">${s.amountPaid.toLocaleString()}</td>
                      <td className="p-3 font-mono font-black text-rose-600">${s.balanceDue.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isSevere ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isSevere ? '31-60 Days Overdue' : '1-15 Days Overdue'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">
                        <span className="flex items-center text-[11px] font-semibold text-indigo-700">
                          <Send className="w-3 h-3 mr-1 text-indigo-500" /> WhatsApp Nudge Queued
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button 
                            onClick={() => showToast(`Sent direct WhatsApp payment link to ${s.studentName}'s parent.`)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-2xs"
                          >
                            WhatsApp Link
                          </button>
                          <button 
                            onClick={() => showToast(`Scheduled Counselor Call for overdue fee account ${s.studentName}`)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold shadow-2xs"
                          >
                            Schedule Call
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-REPORT 3: GST TAX COMPLIANCE */}
      {currentTab === 'rep_gst' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" /> 3. Statutory Tax Liabilities & GST Filings Audit (CGST 9% + SGST 9%)
              </h3>
              <p className="text-xs text-slate-500">Government GST returns telemetry, taxable tuition base, CGST/SGST split, and filing clearance certificates.</p>
            </div>
            <button 
              onClick={() => showToast("Exported Monthly GST GSTR-1 & GSTR-3B Tax Returns JSON/Excel File.")}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 flex items-center"
            >
              Download GSTR Returns
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-500 text-[10px] uppercase">Gross Realized Inflow</span>
              <h4 className="text-xl font-black text-slate-900">${totalCollected.toLocaleString()}</h4>
              <p className="text-[10px] text-slate-400">Total B2C Tuition Invoices</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="font-bold text-blue-700 text-[10px] uppercase">Net Taxable Base Value</span>
              <h4 className="text-xl font-black text-blue-900">${gstTaxableValue.toLocaleString()}</h4>
              <p className="text-[10px] text-blue-600">Excluding 18% GST</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-700 text-[10px] uppercase">CGST (9%) Remitted</span>
              <h4 className="text-xl font-black text-emerald-900">${cgstAmount.toLocaleString()}</h4>
              <p className="text-[10px] text-emerald-600">Central Government Tax Share</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
              <span className="font-bold text-purple-700 text-[10px] uppercase">SGST (9%) Remitted</span>
              <h4 className="text-xl font-black text-purple-900">${sgstAmount.toLocaleString()}</h4>
              <p className="text-[10px] text-purple-600">State Government Tax Share</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Tax Return Period</th>
                  <th className="p-3">Return Type</th>
                  <th className="p-3">Taxable Revenue</th>
                  <th className="p-3">CGST 9%</th>
                  <th className="p-3">SGST 9%</th>
                  <th className="p-3">Total GST Due</th>
                  <th className="p-3">ARN Reference Number</th>
                  <th className="p-3 text-right">Filing Clearance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">September 2026</td>
                  <td className="p-3 font-semibold text-blue-600">GSTR-1 Outward Supplies</td>
                  <td className="p-3 font-mono">${gstTaxableValue.toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-600">${cgstAmount.toLocaleString()}</td>
                  <td className="p-3 font-mono text-purple-600">${sgstAmount.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">${totalGstAmount.toLocaleString()}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-500">ARN-2026-9041284</td>
                  <td className="p-3 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Filed & Verified
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">September 2026</td>
                  <td className="p-3 font-semibold text-blue-600">GSTR-3B Monthly Return</td>
                  <td className="p-3 font-mono">${gstTaxableValue.toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-600">${cgstAmount.toLocaleString()}</td>
                  <td className="p-3 font-mono text-purple-600">${sgstAmount.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">${totalGstAmount.toLocaleString()}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-500">ARN-2026-9041295</td>
                  <td className="p-3 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Filed & Verified
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
