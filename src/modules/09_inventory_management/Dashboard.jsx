import React, { useState } from 'react';
import { 
  Box, 
  BookOpen, 
  Gift, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Send, 
  Search, 
  Layers, 
  Truck, 
  Users, 
  X,
  Sparkles
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { INVENTORY_DATA, BATCHES_DATA, STUDENTS_DATA } from '../../data/erpData';

export default function Dashboard({ inventory = [], selectedInstituteCode, instituteCode }) {
  const targetCode = (instituteCode || selectedInstituteCode || 'all').toLowerCase();
  const data = (inventory && inventory.length > 0) ? inventory : INVENTORY_DATA;
  const filtered = data.filter(i => targetCode === 'all' || !i.instituteCode || i.instituteCode.toLowerCase() === targetCode);

  const bookSets = filtered.filter(i => i.category === 'Batch Book Set');
  const welcomeKits = filtered.filter(i => i.category === 'Welcome Kit');

  const lowStockCount = filtered.filter(i => i.inStock <= i.minRequired || i.reorderStatus.includes('Low')).length;
  const totalValue = filtered.reduce((acc, i) => acc + (i.inStock * i.unitCost), 0);

  // Modal states
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);

  // Form states for Issue modal
  const [issueStudent, setIssueStudent] = useState('');
  const [issueItem, setIssueItem] = useState(data[0]?.id || '');
  const [issueNotes, setIssueNotes] = useState('');
  const [issueSuccess, setIssueSuccess] = useState(false);

  // Form states for Add Stock modal
  const [newItemName, setNewItemName] = useState('');
  const [newCategory, setNewCategory] = useState('Batch Book Set');
  const [newBatch, setNewBatch] = useState('Batch A - JEE 2026');
  const [newStock, setNewStock] = useState(100);
  const [newUnitCost, setNewUnitCost] = useState(50);
  const [addStockSuccess, setAddStockSuccess] = useState(false);

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    setIssueSuccess(true);
    setTimeout(() => {
      setIssueSuccess(false);
      setShowIssueModal(false);
    }, 1500);
  };

  const handleAddStockSubmit = (e) => {
    e.preventDefault();
    setAddStockSuccess(true);
    setTimeout(() => {
      setAddStockSuccess(false);
      setShowAddStockModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <Box className="w-7 h-7 mr-2.5 text-indigo-600" /> Tuition Center Inventory Desk
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dedicated management for Batch-Wise Book Sets and Student Admission Welcome Kits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowIssueModal(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center shadow-sm transition-all"
          >
            <Send className="w-4 h-4 mr-1.5" /> Issue to Student
          </button>
          <button 
            onClick={() => setShowAddStockModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add Stock / Reorder
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Batch Book Sets" 
          value={`${bookSets.reduce((acc, b) => acc + b.inStock, 0)} Sets`} 
          subtext="Available Across Batches" 
          icon={BookOpen} 
          color="blue" 
        />
        <KPICard 
          title="Welcome Kits Stock" 
          value={`${welcomeKits.reduce((acc, k) => acc + k.inStock, 0)} Kits`} 
          subtext="Admission Ready" 
          icon={Gift} 
          color="green" 
        />
        <KPICard 
          title="Stock Asset Valuation" 
          value={`$${totalValue.toLocaleString()}`} 
          subtext="Total Warehouse Value" 
          icon={Box} 
          color="purple" 
        />
        <KPICard 
          title="Reorder Alerts" 
          value={`${lowStockCount} Items`} 
          subtext={lowStockCount > 0 ? "Action Required" : "Stock Optimal"} 
          icon={AlertTriangle} 
          color={lowStockCount > 0 ? "rose" : "amber"} 
        />
      </div>

      {/* 2 MAIN SECTIONS */}
      {/* SECTION 1: BATCH-WISE BOOK SETS */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-600" /> 1. Batch-Wise Book Sets & Module Bundles
            </h2>
            <p className="text-xs text-slate-500">Comprehensive subject books, formula handbooks, and question banks assigned per batch</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
            {bookSets.length} Active Batches Covered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bookSets.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold">
                    {item.itemCode}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.inStock <= item.minRequired ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.inStock} In Hand
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">{item.name}</h3>
                <p className="text-xs font-semibold text-indigo-600 mb-2">{item.batch}</p>

                <div className="text-[11px] text-slate-500 space-y-1 mb-3">
                  <p className="font-medium text-slate-700">Bundle Includes:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.includes?.map((inc, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600">
                        • {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Issued: <strong className="text-slate-900">{item.assignedStudents} Students</strong></span>
                <button 
                  onClick={() => {
                    setIssueItem(item.id);
                    setShowIssueModal(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px]"
                >
                  Issue Set
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: STUDENT WELCOME KITS */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-emerald-600" /> 2. Student Welcome & Admission Starter Kits
            </h2>
            <p className="text-xs text-slate-500">Branded backpacks, RFID student ID cards, water bottles, academic planners, and pen sets</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
            {welcomeKits.length} Kit Configurations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {welcomeKits.map((kit) => (
            <div key={kit.id} className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                    {kit.itemCode}
                  </span>
                  <span className="font-mono text-xs font-extrabold text-slate-900">${kit.unitCost} / Kit</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1">{kit.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{kit.batch}</p>

                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 mb-4">
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Kit Contents Breakdown:</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {kit.includes?.map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                <div>
                  <p className="text-slate-500">Stock: <strong className="text-emerald-700 font-bold">{kit.inStock} Kits</strong></p>
                  <p className="text-[10px] text-slate-400">Pending Dispatch: {kit.pendingDispatch}</p>
                </div>
                <button 
                  onClick={() => {
                    setIssueItem(kit.id);
                    setShowIssueModal(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                >
                  Handover Kit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REQUISITION & DISPATCH STEPPER */}
      <ApprovalFlowStepper 
        title="Tuition Center Kit Dispatch & Reorder Process" 
        subtitle="New Student Admission -> Kit Allocation -> Student Signature Verification -> Stock Reorder Alert" 
      />

      {/* MODAL 1: ISSUE MATERIAL TO STUDENT */}
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
              <Send className="w-5 h-5 mr-2 text-indigo-600" /> Issue Book Set / Welcome Kit to Student
            </h3>
            <p className="text-xs text-slate-500 mb-4">Record handover of material to student with inventory log update.</p>

            {issueSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-sm space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <p>Material Issued & Inventory Updated!</p>
                <p className="text-xs font-normal text-emerald-600">Student notification dispatched via SMS.</p>
              </div>
            ) : (
              <form onSubmit={handleIssueSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                  <select 
                    value={issueStudent}
                    onChange={(e) => setIssueStudent(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  >
                    <option value="">-- Choose Student --</option>
                    {STUDENTS_DATA.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.batch})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Material / Kit</label>
                  <select 
                    value={issueItem}
                    onChange={(e) => setIssueItem(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  >
                    {data.map(i => (
                      <option key={i.id} value={i.id}>[{i.category}] {i.name} ({i.inStock} in stock)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Remarks / Serial No.</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Kit RFID Tag #9921 issued at front desk"
                    value={issueNotes}
                    onChange={(e) => setIssueNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
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

      {/* MODAL 2: ADD STOCK / REORDER */}
      {showAddStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setShowAddStockModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-lg font-bold text-slate-900 mb-1 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-indigo-600" /> Add New Inventory Stock / Reorder
            </h3>
            <p className="text-xs text-slate-500 mb-4">Create or replenish batch book sets and student welcome kit bundles.</p>

            {addStockSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-sm space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <p>New Stock Entry Created!</p>
              </div>
            ) : (
              <form onSubmit={handleAddStockSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Item Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. JEE Main 2026 Revision Booklet Set"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="Batch Book Set">Batch Book Set</option>
                      <option value="Welcome Kit">Welcome Kit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Batch</label>
                    <select 
                      value={newBatch}
                      onChange={(e) => setNewBatch(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      {BATCHES_DATA.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Quantity Received</label>
                    <input 
                      type="number" 
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Unit Cost ($)</label>
                    <input 
                      type="number" 
                      value={newUnitCost}
                      onChange={(e) => setNewUnitCost(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddStockModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
                  >
                    Save to Stock
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
