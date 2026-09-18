import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function Reports({ inventory = [], selectedInstituteCode }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> Inventory Valuation & Stock Reorder Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Asset valuation, stock turnover velocity, and vendor fulfillment audits.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center border border-slate-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Inventory Value" value="$84,500" subtext="Warehouse Assets" icon={BarChart3} color="blue" />
        <KPICard title="Stock Turnover" value="4.2x / Year" subtext="Healthy Velocity" icon={BarChart3} color="green" />
        <KPICard title="Wastage & Damage" value="0.4%" subtext="Under 1% Benchmark" icon={BarChart3} color="purple" />
        <KPICard title="Vendor Fulfillment" value="98.5%" subtext="On-Time Delivery" icon={BarChart3} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">SKU</th>
              <th className="p-3">Item Category</th>
              <th className="p-3">Units in Stock</th>
              <th className="p-3">Unit Valuation</th>
              <th className="p-3 text-right">Total Asset Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventory.map(i => (
              <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-indigo-600">{i.itemCode}</td>
                <td className="p-3 text-slate-900 font-bold">{i.name}</td>
                <td className="p-3 font-mono">{i.inStock} Units</td>
                <td className="p-3 font-mono">${i.unitCost}</td>
                <td className="p-3 text-right font-mono font-bold text-emerald-600">${(i.inStock * i.unitCost).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
