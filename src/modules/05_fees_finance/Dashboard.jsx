import React, { useState } from 'react';
import { DollarSign, AlertTriangle, FileText, CreditCard, TrendingUp, Layers, Award, Building, Users, CheckCircle2, ArrowUpRight, BarChart3 } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import BatchFeesDiscounts from './BatchFeesDiscounts';
import OperatingExpenses from './OperatingExpenses';
import { BATCH_FEES_DATA, FIXED_EXPENSES_DATA, SALARIES_PAYROLL_EXPENSES_DATA, MANUAL_EXPENSES_DATA, STUDENT_FEES_DISCOUNT_DATA } from '../../data/erpData';

export default function FeesDashboard({ instituteCode = 'all', onNavigate }) {
  const [activeTab, setActiveTab] = useState('hub');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Aggregate Financial Calculations
  const batches = BATCH_FEES_DATA.filter(b => isAll || b.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  const fixedExp = FIXED_EXPENSES_DATA.filter(f => isAll || f.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  const salaries = SALARIES_PAYROLL_EXPENSES_DATA.filter(s => isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  const manualExp = MANUAL_EXPENSES_DATA.filter(m => isAll || m.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  const studentFees = STUDENT_FEES_DISCOUNT_DATA.filter(s => isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());

  const totalCollectedRevenue = batches.reduce((acc, b) => acc + b.totalCollected, 0);
  const totalDiscountsAwarded = batches.reduce((acc, b) => acc + b.totalDiscountsAwarded, 0);
  const totalOutstandingDues = studentFees.reduce((acc, s) => acc + s.balanceDue, 0);

  const totalFixedCosts = fixedExp.reduce((acc, f) => acc + f.monthlyAmount, 0);
  const totalSalaryCosts = salaries.reduce((acc, s) => acc + s.netPayrollMonthly, 0);
  const totalManualCosts = manualExp.reduce((acc, m) => acc + Number(m.amount || 0), 0);

  const grandTotalExpenses = totalFixedCosts + totalSalaryCosts + totalManualCosts;
  const netOperatingProfit = totalCollectedRevenue - grandTotalExpenses;
  const profitMarginPercent = totalCollectedRevenue > 0 ? Math.round((netOperatingProfit / totalCollectedRevenue) * 100) : 0;

  // Render Sub-Components directly if tabs selected
  if (activeTab === 'batch_discounts') {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <button onClick={() => setActiveTab('hub')} className="text-xs font-bold text-indigo-600 hover:underline">
            ← Back to Financial Hub
          </button>
        </div>
        <BatchFeesDiscounts instituteCode={instituteCode} />
      </div>
    );
  }

  if (activeTab === 'operating_expenses') {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <button onClick={() => setActiveTab('hub')} className="text-xs font-bold text-rose-600 hover:underline">
            ← Back to Financial Hub
          </button>
        </div>
        <OperatingExpenses instituteCode={instituteCode} />
      </div>
    );
  }

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
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-wide border border-emerald-200">
            Academy Financial Control Desk
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <DollarSign className="w-6.5 h-6.5 mr-2 text-emerald-600" /> Fees, Expenses & Financial Control Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Consolidated financial audit tracking tuition revenue inflows, batch cost breakdowns, student scholarships, fixed leases, staff salaries, and net profit.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => showToast("Generated Executive Financial Audit PDF Statement.")}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-2xs"
          >
            Download P&L Report
          </button>
        </div>
      </div>

      {/* Top 4 Major KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Total Fee Revenue" 
          value={`$${totalCollectedRevenue.toLocaleString()}`} 
          subtext={`$${totalDiscountsAwarded.toLocaleString()} Scholarships Granted`} 
          icon={DollarSign} 
          color="green" 
          badge="Inflow Realized" 
        />
        <KPICard 
          title="Total Operating Expenses" 
          value={`$${grandTotalExpenses.toLocaleString()}`} 
          subtext="Fixed Leases + Payroll + Petty" 
          icon={Building} 
          color="rose" 
          badge="Overhead" 
        />
        <KPICard 
          title="Net Operating Income" 
          value={`$${netOperatingProfit.toLocaleString()}`} 
          subtext={`${profitMarginPercent}% Net Profit Margin`} 
          icon={TrendingUp} 
          color="indigo" 
          badge="Strong Profitability" 
        />
        <KPICard 
          title="Outstanding Defaulters" 
          value={`$${totalOutstandingDues.toLocaleString()}`} 
          subtext="Uncollected Balance Due" 
          icon={AlertTriangle} 
          color="amber" 
          badge="Follow-up Active" 
        />
      </div>

      {/* 3 QUICK NAVIGATION BUTTON TABS */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('hub')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hub' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Financial Overview & P&L Hub
        </button>
        <button
          onClick={() => setActiveTab('batch_discounts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            activeTab === 'batch_discounts' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
          2. Batch Fees & Student Discounts
        </button>
        <button
          onClick={() => setActiveTab('operating_expenses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
            activeTab === 'operating_expenses' ? 'bg-white text-rose-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building className="w-3.5 h-3.5 mr-1.5 text-rose-600" />
          3. Operating Expenses & Salaries
        </button>
      </div>

      {/* P&L BREAKDOWN & CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* P&L Executive Summary Box */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-heading text-base font-black text-slate-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" /> P&L Financial Health Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-900 block">Total Tuition Fee Collection</span>
                <span className="text-[11px] text-emerald-700">Realized student fee inflow</span>
              </div>
              <span className="font-mono text-base font-black text-emerald-700">+${totalCollectedRevenue.toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-rose-900 block">Total Operating Expenditures</span>
                <span className="text-[11px] text-rose-700">Leases + Staff Payroll + Petty</span>
              </div>
              <span className="font-mono text-base font-black text-rose-700">-${grandTotalExpenses.toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-indigo-900 block">Net Operating Profit</span>
                <span className="text-[11px] text-indigo-700">{profitMarginPercent}% Operating Margin</span>
              </div>
              <span className="font-mono text-base font-black text-indigo-700">${netOperatingProfit.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Fixed Leases & Utilities:</span>
              <span className="font-mono font-bold text-slate-800">${totalFixedCosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Faculty & Staff Salaries:</span>
              <span className="font-mono font-bold text-slate-800">${totalSalaryCosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Variable & Manual Expenses:</span>
              <span className="font-mono font-bold text-slate-800">${totalManualCosts.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          <TrendAnalyticsChart title="Monthly Fee Inflow vs Operating Overhead Target" subtitle="Real-time collection vs expenditure telemetry" />
        </div>
      </div>

      {/* QUICK PREVIEW TILES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Batch Fee Cost Preview Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <h4 className="font-heading font-black text-slate-900 text-sm flex items-center">
              <Layers className="w-4 h-4 mr-2 text-indigo-600" /> Batch Costs & Concessions Preview
            </h4>
            <button 
              onClick={() => setActiveTab('batch_discounts')}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center"
            >
              View All Batches <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {batches.slice(0, 3).map(b => (
              <div key={b.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">{b.batchName}</span>
                  <span className="text-[11px] text-slate-500">{b.enrolledStudents} Students • ${b.baseFeePerStudent}/student</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-600 block">${b.totalCollected.toLocaleString()}</span>
                  <span className="text-[10px] text-amber-600 font-bold">-${b.totalDiscountsAwarded.toLocaleString()} Discount</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Expenses Preview Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <h4 className="font-heading font-black text-slate-900 text-sm flex items-center">
              <Building className="w-4 h-4 mr-2 text-rose-600" /> Operating Expenses & Salaries Preview
            </h4>
            <button 
              onClick={() => setActiveTab('operating_expenses')}
              className="text-xs font-bold text-rose-600 hover:underline flex items-center"
            >
              Manage Expenses <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Campus Lease & Facility Rent</span>
                <span className="text-[11px] text-slate-500">Fixed Monthly Infrastructure</span>
              </div>
              <span className="font-mono font-bold text-slate-900">${totalFixedCosts.toLocaleString()}/mo</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Faculty & Staff Payroll</span>
                <span className="text-[11px] text-slate-500">Monthly Direct Deposit</span>
              </div>
              <span className="font-mono font-bold text-slate-900">${totalSalaryCosts.toLocaleString()}/mo</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Petty & Manual Entry Overhead</span>
                <span className="text-[11px] text-slate-500 font-bold text-purple-600">{manualExp.length} Editable Entries</span>
              </div>
              <span className="font-mono font-bold text-slate-900">${totalManualCosts.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
