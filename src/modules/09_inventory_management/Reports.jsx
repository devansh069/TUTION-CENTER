import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Box, 
  BookOpen, 
  Gift, 
  TrendingUp,
  PieChart,
  ShoppingCart
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { INVENTORY_DATA } from '../../data/erpData';

export default function Reports({ inventory = [], selectedInstituteCode, instituteCode, activeTab: propActiveTab }) {
  const [currentTab, setCurrentTab] = useState(propActiveTab || 'rep_turnover');
  const tab = propActiveTab || currentTab;

  const targetCode = (instituteCode || selectedInstituteCode || 'all').toLowerCase();
  const data = (inventory && inventory.length > 0) ? inventory : INVENTORY_DATA;
  const filtered = data.filter(i => targetCode === 'all' || !i.instituteCode || i.instituteCode.toLowerCase() === targetCode);

  const lowStockItems = filtered.filter(i => i.inStock <= i.minRequired || i.reorderStatus.includes('Low'));
  const totalValuation = filtered.reduce((acc, i) => acc + (i.inStock * i.unitCost), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-7 h-7 mr-2.5 text-indigo-600" /> Inventory Valuation & Stock Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Financial asset valuation of book sets & welcome kits, stock turnover rate, and auto-reorder alerts.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center shadow-sm">
          <Download className="w-4 h-4 mr-1.5" /> Export Valuation Report (CSV)
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setCurrentTab('rep_turnover')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            tab === 'rep_turnover' || tab === 'rep_valuation'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <PieChart className="w-4 h-4" /> Stock Valuation & Turnover
        </button>

        <button
          onClick={() => setCurrentTab('rep_alerts')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            tab === 'rep_alerts' || tab === 'rep_low_stock'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> Low Stock & Reorder Warnings ({lowStockItems.length})
        </button>
      </div>

      {/* TAB 1: VALUATION & TURNOVER */}
      {(tab === 'rep_turnover' || tab === 'rep_valuation' || tab === 'reports') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Total Inventory Valuation" value={`$${totalValuation.toLocaleString()}`} subtext="Current Asset Stock" icon={Box} color="blue" />
            <KPICard title="Annual Stock Turnover" value="4.5x / Year" subtext="Optimal Velocity" icon={TrendingUp} color="green" />
            <KPICard title="Book Sets Asset Value" value="$68,200" subtext="Batch Curriculum Packs" icon={BookOpen} color="purple" />
            <KPICard title="Welcome Kits Asset Value" value="$16,300" subtext="Student Admission Kits" icon={Gift} color="amber" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-heading font-bold text-slate-900 text-base mb-4">Master Inventory Valuation Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Item Code</th>
                    <th className="p-3">Inventory Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">In Stock</th>
                    <th className="p-3">Unit Valuation</th>
                    <th className="p-3 text-right">Total Financial Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(i => (
                    <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-indigo-600">{i.itemCode}</td>
                      <td className="p-3 font-bold text-slate-900">{i.name}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700 text-[11px]">{i.category}</span></td>
                      <td className="p-3 font-mono font-bold text-slate-800">{i.inStock} Units</td>
                      <td className="p-3 font-mono text-slate-600">${i.unitCost}</td>
                      <td className="p-3 text-right font-mono font-extrabold text-emerald-600">${(i.inStock * i.unitCost).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOW STOCK WARNINGS */}
      {(tab === 'rep_alerts' || tab === 'rep_low_stock') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Low Stock Triggered" value={`${lowStockItems.length} Items`} subtext="Below Safety Level" icon={AlertTriangle} color="rose" />
            <KPICard title="Pending Purchase Orders" value="2 Orders" subtext="Vendor Processing" icon={ShoppingCart} color="amber" />
            <KPICard title="Average Vendor Lead Time" value="3.2 Days" subtext="Delivery Threshold" icon={CheckCircle2} color="blue" />
            <KPICard title="Fulfillment Rate" value="98.8%" subtext="On-Time Admission Kits" icon={TrendingUp} color="green" />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-rose-500" /> Low Stock & Reorder Action Table
                </h3>
                <p className="text-xs text-slate-500">Items that require immediate purchase orders to prevent student handover delays</p>
              </div>
              <button className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center shadow-xs">
                <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Raise Bulk PO
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">SKU Code</th>
                    <th className="p-3">Inventory Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Current Stock</th>
                    <th className="p-3">Min Safety Threshold</th>
                    <th className="p-3">Vendor Supplier</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lowStockItems.length > 0 ? (
                    lowStockItems.map(i => (
                      <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-rose-600">{i.itemCode}</td>
                        <td className="p-3 font-bold text-slate-900">{i.name}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold text-[11px]">{i.category}</span></td>
                        <td className="p-3 font-mono font-bold text-rose-600">{i.inStock} Units</td>
                        <td className="p-3 font-mono text-slate-500">{i.minRequired} Units</td>
                        <td className="p-3 text-slate-700">{i.supplier}</td>
                        <td className="p-3 text-right">
                          <button className="px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px]">
                            Reorder Now
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-6 text-center text-slate-400 font-medium">
                        All items are currently above safety stock thresholds!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
