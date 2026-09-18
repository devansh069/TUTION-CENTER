import React from 'react';
import { RESOURCE_REQUISITIONS } from './franchiseData';
import { Package, Truck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ResourceRequisitions() {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'Dispatched': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'Pending Approval': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'Delivered': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default: return <Package className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-600" /> Resource & Stock Requisitions
          </h2>
          <p className="text-xs text-slate-500 mt-1">Manage bulk supply orders from franchise branches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCE_REQUISITIONS.map(req => (
          <div key={req.orderId} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-[10px] font-mono font-bold text-slate-600">
                {req.orderId}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                {getStatusIcon(req.status)}
                {req.status}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-900 mb-1">{req.branchName}</h3>
            <p className="text-xs text-slate-500 font-mono mb-4">{req.orderDate}</p>
            
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-medium text-slate-700 leading-relaxed mb-4 min-h-[60px]">
              {req.items}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Order Value</div>
                <div className="font-black text-slate-900">₹{req.totalValue.toLocaleString()}</div>
              </div>
              <button className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors">
                Manage Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Ensure AlertCircle is imported in the final file by adding it above
// Wait, I forgot to import AlertCircle from lucide-react in the previous line. Let me fix the import block.
