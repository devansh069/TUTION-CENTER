import React, { useState, useMemo } from 'react';
import { DollarSign, PlusCircle, Edit3, Trash2, CheckCircle2, Building, Users, CreditCard, ShieldCheck, Filter, Search, Zap, Save, X } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { FIXED_EXPENSES_DATA, SALARIES_PAYROLL_EXPENSES_DATA, MANUAL_EXPENSES_DATA } from '../../data/erpData';

export default function OperatingExpenses({ instituteCode = 'all' }) {
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Filter datasets
  const fixedExpenses = useMemo(() => {
    return FIXED_EXPENSES_DATA.filter(f => isAll || f.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  }, [instituteCode, isAll]);

  const salariesPayroll = useMemo(() => {
    return SALARIES_PAYROLL_EXPENSES_DATA.filter(s => isAll || s.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  }, [instituteCode, isAll]);

  // Editable Manual Expense State
  const [manualExpenses, setManualExpenses] = useState(() => {
    return MANUAL_EXPENSES_DATA.filter(m => isAll || m.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // New Expense Form State
  const [newExp, setNewExp] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Printing & Materials',
    description: '',
    amount: '',
    paymentMethod: 'Corporate Card',
    paidBy: 'Super Admin',
    status: 'Approved & Settled'
  });

  // Edit Temp Form State
  const [editExp, setEditExp] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Financial Aggregations
  const totalFixed = fixedExpenses.reduce((acc, f) => acc + f.monthlyAmount, 0);
  const totalSalaries = salariesPayroll.reduce((acc, s) => acc + s.netPayrollMonthly, 0);
  const totalManual = manualExpenses.reduce((acc, m) => acc + Number(m.amount || 0), 0);
  const grandTotalOverhead = totalFixed + totalSalaries + totalManual;

  // Add Handler
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExp.description || !newExp.amount) {
      alert("Please enter a description and valid amount.");
      return;
    }
    const createdItem = {
      id: `MAN-EXP-${Date.now()}`,
      date: newExp.date,
      category: newExp.category,
      description: newExp.description,
      amount: Number(newExp.amount),
      paymentMethod: newExp.paymentMethod,
      paidBy: newExp.paidBy,
      status: newExp.status,
      instituteCode: instituteCode || 'alpha'
    };
    setManualExpenses([createdItem, ...manualExpenses]);
    setIsAddingNew(false);
    setNewExp({
      date: new Date().toISOString().split('T')[0],
      category: 'Printing & Materials',
      description: '',
      amount: '',
      paymentMethod: 'Corporate Card',
      paidBy: 'Super Admin',
      status: 'Approved & Settled'
    });
    showToast("Added new manual expense entry!");
  };

  // Edit Handlers
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditExp({ ...item });
  };

  const handleSaveEdit = (id) => {
    setManualExpenses(manualExpenses.map(m => m.id === id ? editExp : m));
    setEditingId(null);
    setEditExp(null);
    showToast("Updated manual expense entry!");
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense entry?")) {
      setManualExpenses(manualExpenses.filter(m => m.id !== id));
      showToast("Deleted expense entry.");
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
          <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-black uppercase tracking-wide border border-rose-200">
            Operating Overhead Audit
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Building className="w-6.5 h-6.5 mr-2 text-rose-600" /> Operating Expenses & Faculty Salaries
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive financial audit tracking fixed campus infrastructure lease, monthly faculty salary payroll, and editable manual operational entries.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> + Add Manual Expense
        </button>
      </div>

      {/* Top 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Total Operating Overhead" 
          value={`$${grandTotalOverhead.toLocaleString()}`} 
          subtext="Monthly Total Expenditures" 
          icon={DollarSign} 
          color="rose" 
          badge="Monthly Budget" 
        />
        <KPICard 
          title="Fixed Campus Expenses" 
          value={`$${totalFixed.toLocaleString()}`} 
          subtext="Rent, Utilities, Software & Net" 
          icon={Building} 
          color="blue" 
          badge="Recurring Fixed" 
        />
        <KPICard 
          title="Faculty & Staff Payroll" 
          value={`$${totalSalaries.toLocaleString()}`} 
          subtext="Direct Deposit Disbursed" 
          icon={Users} 
          color="green" 
          badge="100% Settled" 
        />
        <KPICard 
          title="Manual & Petty Expenses" 
          value={`$${totalManual.toLocaleString()}`} 
          subtext={`${manualExpenses.length} Editable Entries`} 
          icon={CreditCard} 
          color="purple" 
          badge="Operational" 
        />
      </div>

      {/* ADD EXPENSE MODAL FORM */}
      {isAddingNew && (
        <div className="p-5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-4 shadow-sm animate-in zoom-in-95">
          <div className="flex justify-between items-center pb-2 border-b border-rose-200">
            <h3 className="font-heading font-black text-slate-900 text-sm flex items-center">
              <PlusCircle className="w-4 h-4 mr-1.5 text-rose-600" /> Create New Manual Expense Entry
            </h3>
            <button onClick={() => setIsAddingNew(false)} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Expense Date:</label>
              <input 
                type="date" 
                value={newExp.date} 
                onChange={(e) => setNewExp({...newExp, date: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category:</label>
              <select 
                value={newExp.category} 
                onChange={(e) => setNewExp({...newExp, category: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
              >
                <option value="Printing & Materials">Printing & Materials</option>
                <option value="Lab & Consumables">Lab & Consumables</option>
                <option value="Refreshments & Catering">Refreshments & Catering</option>
                <option value="Repairs & Maintenance">Repairs & Maintenance</option>
                <option value="Marketing & Branding">Marketing & Branding</option>
                <option value="Office Stationery">Office Stationery</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Amount ($):</label>
              <input 
                type="number" 
                placeholder="e.g. 450" 
                value={newExp.amount} 
                onChange={(e) => setNewExp({...newExp, amount: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Item Description / Particulars:</label>
              <input 
                type="text" 
                placeholder="e.g. Purchased physics lab lasers and optical lenses" 
                value={newExp.description} 
                onChange={(e) => setNewExp({...newExp, description: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Payment Method:</label>
              <select 
                value={newExp.paymentMethod} 
                onChange={(e) => setNewExp({...newExp, paymentMethod: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium"
              >
                <option value="Corporate Card">Corporate Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI Direct">UPI Direct</option>
                <option value="Cash Petty Expenses">Cash Petty Expenses</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end space-x-2 pt-2 border-t border-rose-200">
              <button 
                type="button" 
                onClick={() => setIsAddingNew(false)} 
                className="px-3.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-1.5 rounded-lg bg-rose-600 text-white font-bold shadow-2xs"
              >
                Save Expense Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE 1: FIXED OPERATING EXPENSES */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-600" /> 1. Fixed Operating Overheads Table
            </h3>
            <p className="text-xs text-slate-500">Recurring campus leases, commercial utilities, cloud server infrastructure, and security guard contracts.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            Total Fixed: ${totalFixed.toLocaleString()}/mo
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Overhead Item Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Monthly Cost</th>
                <th className="p-3">Vendor / Provider</th>
                <th className="p-3">Billing Frequency</th>
                <th className="p-3 text-right">Auto-Pay Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {fixedExpenses.map(f => (
                <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    {f.name}
                    <span className="block font-mono text-[10px] text-slate-400 font-normal">{f.id}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {f.category}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-black text-slate-900">${f.monthlyAmount.toLocaleString()}</td>
                  <td className="p-3 font-semibold text-slate-700">{f.vendor}</td>
                  <td className="p-3 text-slate-600">{f.frequency}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      f.autoPay.includes('Active') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {f.autoPay}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABLE 2: SALARIES & FACULTY PAYROLL */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-lg font-black text-slate-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-emerald-600" /> 2. Faculty & Staff Payroll Table
            </h3>
            <p className="text-xs text-slate-500">Monthly salary breakdown per role department, incentives, statutory deductions, and net disbursed payroll.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            Total Payroll: ${totalSalaries.toLocaleString()}/mo
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Role / Department</th>
                <th className="p-3">Staff Count</th>
                <th className="p-3">Base Salary</th>
                <th className="p-3">Incentives / Bonuses</th>
                <th className="p-3">Deductions (PF/Tax)</th>
                <th className="p-3">Net Monthly Payroll</th>
                <th className="p-3 text-right">Disbursement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {salariesPayroll.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    {s.roleDepartment}
                    <span className="block font-mono text-[10px] text-slate-400 font-normal">{s.id}</span>
                  </td>
                  <td className="p-3 font-bold text-indigo-600">{s.staffCount} Staff</td>
                  <td className="p-3 font-mono text-slate-600">${s.baseSalaryMonthly.toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-600">+${s.incentivesBonus.toLocaleString()}</td>
                  <td className="p-3 font-mono text-rose-600">-${s.pfTaxDeduction.toLocaleString()}</td>
                  <td className="p-3 font-mono font-black text-slate-900">${s.netPayrollMonthly.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABLE 3: EDITABLE MANUAL EXPENSES ENTRY TABLE */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-black uppercase">
              Interactive & Dynamic Ledger
            </span>
            <h3 className="font-heading text-lg font-black text-slate-900 mt-1 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-purple-600" /> 3. Editable Manual Expense Entry Table
            </h3>
            <p className="text-xs text-slate-500">Live dynamic ledger for petty cash, lab supplies, printing, and catering. Edit entries inline or add new rows.</p>
          </div>
          <button 
            onClick={() => setIsAddingNew(true)}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-2xs flex items-center"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Entry
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Category</th>
                <th className="p-3">Item Description / Particulars</th>
                <th className="p-3">Amount ($)</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Authorized By</th>
                <th className="p-3">Audit Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {manualExpenses.map(m => {
                const isEditing = editingId === m.id;

                if (isEditing) {
                  return (
                    <tr key={m.id} className="bg-amber-50/60">
                      <td className="p-2">
                        <input 
                          type="date" 
                          value={editExp.date} 
                          onChange={(e) => setEditExp({...editExp, date: e.target.value})} 
                          className="p-1 bg-white border border-amber-300 rounded font-mono text-[11px]"
                        />
                      </td>
                      <td className="p-2">
                        <input 
                          type="text" 
                          value={editExp.category} 
                          onChange={(e) => setEditExp({...editExp, category: e.target.value})} 
                          className="p-1 bg-white border border-amber-300 rounded font-bold text-[11px]"
                        />
                      </td>
                      <td className="p-2">
                        <input 
                          type="text" 
                          value={editExp.description} 
                          onChange={(e) => setEditExp({...editExp, description: e.target.value})} 
                          className="w-full p-1 bg-white border border-amber-300 rounded text-[11px]"
                        />
                      </td>
                      <td className="p-2">
                        <input 
                          type="number" 
                          value={editExp.amount} 
                          onChange={(e) => setEditExp({...editExp, amount: Number(e.target.value)})} 
                          className="w-20 p-1 bg-white border border-amber-300 rounded font-bold text-[11px]"
                        />
                      </td>
                      <td className="p-2">
                        <input 
                          type="text" 
                          value={editExp.paymentMethod} 
                          onChange={(e) => setEditExp({...editExp, paymentMethod: e.target.value})} 
                          className="p-1 bg-white border border-amber-300 rounded text-[11px]"
                        />
                      </td>
                      <td className="p-2">
                        <input 
                          type="text" 
                          value={editExp.paidBy} 
                          onChange={(e) => setEditExp({...editExp, paidBy: e.target.value})} 
                          className="p-1 bg-white border border-amber-300 rounded text-[11px]"
                        />
                      </td>
                      <td className="p-2">
                        <select 
                          value={editExp.status} 
                          onChange={(e) => setEditExp({...editExp, status: e.target.value})} 
                          className="p-1 bg-white border border-amber-300 rounded font-bold text-[10px]"
                        >
                          <option value="Approved & Settled">Approved & Settled</option>
                          <option value="Pending Audit">Pending Audit</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-2 text-right">
                        <div className="flex justify-end space-x-1">
                          <button onClick={() => handleSaveEdit(m.id)} className="p-1.5 rounded bg-emerald-600 text-white">
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="p-1.5 rounded bg-slate-300 text-slate-700">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono text-slate-500 text-[11px]">{m.date}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">
                        {m.category}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-900">{m.description}</td>
                    <td className="p-3 font-mono font-black text-rose-600">${Number(m.amount).toLocaleString()}</td>
                    <td className="p-3 text-slate-600">{m.paymentMethod}</td>
                    <td className="p-3 text-slate-500 italic">{m.paidBy}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status.includes('Approved') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button 
                          onClick={() => handleStartEdit(m)} 
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="Edit Entry"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteExpense(m.id)} 
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                          title="Delete Entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
    </div>
  );
}
