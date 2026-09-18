import React from 'react';
import { BookOpen, Search, Download, AlertTriangle } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function BooksStudyMaterials({ inventory = [], selectedInstituteCode }) {
  const filtered = inventory.filter(i => (selectedInstituteCode === 'all' || i.instituteCode === selectedInstituteCode) && i.category === 'Study Material');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-indigo-600" /> Books & Printed Study Material Repository
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">IIT-JEE, NEET, and Foundation comprehensive course module stock tracking.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Book Modules" value="1,850 Copies" subtext="In Central Warehouse" icon={BookOpen} color="blue" />
        <KPICard title="Distributed to Students" value="1,420 Packs" subtext="At Admission" icon={BookOpen} color="green" />
        <KPICard title="Reorder Threshold" value="80 Minimum" subtext="Auto-Purchase Order" icon={AlertTriangle} color="amber" />
        <KPICard title="Vendor Publisher" value="Pearson & McGraw" subtext="Direct Tie-up" icon={BookOpen} color="purple" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
              <th className="p-3">SKU</th>
              <th className="p-3">Module Name</th>
              <th className="p-3">Publisher Supplier</th>
              <th className="p-3">In Stock</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(i => (
              <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-indigo-600">{i.itemCode}</td>
                <td className="p-3 font-bold text-slate-900">{i.name}</td>
                <td className="p-3 text-slate-600">{i.supplier}</td>
                <td className="p-3 font-mono font-bold">{i.inStock} Packs</td>
                <td className="p-3 text-right font-bold text-emerald-600">{i.reorderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
