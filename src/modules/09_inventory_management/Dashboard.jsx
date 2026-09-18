import React from 'react';
import { Layers, AlertTriangle, BookOpen, CheckCircle2, Box } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { ComplianceBarChart } from '../../components/common/Charts';

export default function Dashboard({ inventory = [], selectedInstituteCode }) {
  const filtered = inventory.filter(i => selectedInstituteCode === 'all' || i.instituteCode === selectedInstituteCode);
  const lowStock = filtered.filter(i => i.reorderStatus.includes('Alert') || i.inStock < i.minRequired).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Box className="w-6 h-6 mr-2 text-indigo-600" /> Inventory & Study Material Management Hub
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Study module stock levels, uniform kits, science lab equipment, and reorder alerts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Inventory Items" value={`${filtered.length} SKUs`} subtext="Study Books & Kits" icon={Box} color="blue" badge="Catalog" />
        <KPICard title="Stock Health" value="94.2%" subtext="Sufficient Threshold" icon={CheckCircle2} color="green" badge="Optimal" />
        <KPICard title="Low Stock Alerts" value={`${lowStock} Items`} subtext="Reorder Triggered" icon={AlertTriangle} color="amber" badge="Action Req" />
        <KPICard title="Material Dispatches" value="1,240 Units" subtext="Dispatched this Month" icon={Layers} color="purple" badge="Active Dispatches" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceBarChart title="Inventory Warehouse Reorder Compliance" target={100} current={92} statusMessage="92% of inventory stock maintained above safety thresholds" />
        <ApprovalFlowStepper title="Requisition & Vendor Purchase Approval" subtitle="Branch Request -> Center Admin -> Accounts -> Purchase Order" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Master Inventory Stock Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">SKU Code</th>
                <th className="p-3">Item Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">In Stock / Min</th>
                <th className="p-3">Unit Cost</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(i => (
                <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-600">{i.itemCode}</td>
                  <td className="p-3 font-bold text-slate-900">{i.name}</td>
                  <td className="p-3 text-slate-600">{i.category}</td>
                  <td className="p-3 font-mono font-bold">{i.inStock} / <span className="text-slate-400 font-normal">{i.minRequired}</span></td>
                  <td className="p-3 font-mono text-slate-800">${i.unitCost}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${i.inStock < i.minRequired ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{i.reorderStatus}</span>
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
