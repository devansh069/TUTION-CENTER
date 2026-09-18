import React from 'react';
import { MOCK_TUITION_CENTERS } from '../../data/erpData';
import { Bell, Settings, User } from 'lucide-react';

export default function TopBar({
  selectedInstitute,
  setSelectedInstitute,
  activeModuleTitle,
  activePageTitle,
  sidebarCollapsed,
  userRole = 'Super Admin'
}) {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-20 px-4 md:px-6 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Left section: Welcome message */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="text-xs text-slate-500 font-medium">EduMission Tuition Center</div>
          <div className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>Welcome back,</span>
            <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 font-black">
              {userRole}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Tuition Center / College Selector Dropdown */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Tuition Center:</span>
          <select
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-2"
          >
            <option value="ALL">🌐 All Institutes (EduMission Super Admin)</option>
            {MOCK_TUITION_CENTERS.map((c) => (
              <option key={c.id} value={c.id}>
                📍 {c.name} ({c.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right section: Notifications, Settings & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Notifications */}
        <button
          className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
          title="Notifications & Alerts"
        >
          <Bell className="w-4 h-4 text-slate-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>

        {/* Global Settings */}
        <button
          className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
          title="System Settings"
        >
          <Settings className="w-4 h-4 text-slate-700" />
        </button>
      </div>
    </header>
  );
}
