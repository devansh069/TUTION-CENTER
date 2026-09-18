import React from 'react';
import { Box, Layers, ShieldCheck } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function UniformsKitsStock({ inventory = [], selectedInstituteCode }) {
  const filtered = inventory.filter(i => (selectedInstituteCode === 'all' || i.instituteCode === selectedInstituteCode) && i.category !== 'Study Material');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Box className="w-6 h-6 mr-2 text-indigo-600" /> Uniforms, Hardware & Lab Kits Inventory
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Campus blazers, laboratory aprons, robotics hardware kits, and student swag kits.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Kit SKUs" value={filtered.length.toString()} subtext="Hardware & Uniforms" icon={Box} color="blue" />
        <KPICard title="Robotics Hardware" value="60 Kits" subtext="Delta Tech Stock" icon={Box} color="green" />
        <KPICard title="Blazers in Stock" value="42 Units" subtext="Low Stock Warning" icon={Box} color="amber" />
        <KPICard title="Dissection Kits" value="15 Kits" subtext="Apex Pre-Med Hub" icon={ShieldCheck} color="purple" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">Item Code</th>
              <th className="p-3">Item Name</th>
              <th className="p-3">Unit Cost</th>
              <th className="p-3">In Stock</th>
              <th className="p-3 text-right">Vendor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(i => (
              <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-indigo-600">{i.itemCode}</td>
                <td className="p-3 font-bold text-slate-900">{i.name}</td>
                <td className="p-3 font-mono">${i.unitCost}</td>
                <td className="p-3 font-mono font-bold">{i.inStock} Units</td>
                <td className="p-3 text-right text-slate-600">{i.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
