import React from 'react';
import { MOCK_TUITION_CENTERS } from '../../data/erpData';

export default function TopBar({
  selectedInstitute,
  setSelectedInstitute,
  activeModuleTitle,
  activePageTitle,
  sidebarCollapsed,
}) {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-20 px-4 md:px-6 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Left section */}
      <div className="flex items-center gap-3"></div>

      {/* Center/Right: Multi-Tenant Institute Selector & Controls */}
      <div className="flex items-center gap-3">
        {/* Multi-Tenant Scope Selector */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Tuition Center:</span>
          <select
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-2"
          >
            <option value="ALL">🌐 All Institutes (Enterprise Super Admin)</option>
            {MOCK_TUITION_CENTERS.map((c) => (
              <option key={c.id} value={c.id}>
                📍 {c.name} ({c.city})
              </option>
            ))}
          </select>
        </div>

        {/* Global Notifications */}
        <button
          className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
          title="Notifications & Alerts"
        >
          <span>🔔</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>

        {/* Super Admin Avatar Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            SA
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-black text-slate-800 leading-tight">Super Admin</div>
            <div className="text-[10px] text-emerald-600 font-semibold leading-tight">Master Privileges</div>
          </div>
        </div>
      </div>
    </header>
  );
}
