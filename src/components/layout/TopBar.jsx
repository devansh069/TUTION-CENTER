import React, { useState } from 'react';
import { MOCK_TUITION_CENTERS } from '../../data/erpData';
import { 
  Bell, 
  Settings, 
  User, 
  Sun, 
  Moon, 
  Globe, 
  LogOut, 
  ShieldCheck, 
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Check
} from 'lucide-react';

export default function TopBar({
  selectedInstitute,
  setSelectedInstitute,
  activeModuleTitle,
  activePageTitle,
  sidebarCollapsed,
  userRole = 'Super Admin',
  isDarkMode = false,
  setIsDarkMode,
  language = 'en',
  setLanguage
}) {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [logoutToast, setLogoutToast] = useState(false);

  const notificationsList = [
    {
      id: 1,
      title: 'Fee Recovery Alert',
      desc: '14 students in Batch A-1 have overdue fees exceeding 30 days.',
      time: '10m ago',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Biometric Stream Active',
      desc: 'Branch #04 Facial Turnstile synchronized (128 scans logged).',
      time: '25m ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'AI HW Grader Completed',
      desc: '42 Math assignments evaluated with 98.4% OCR precision.',
      time: '1h ago',
      type: 'success'
    }
  ];

  const handleLogoutClick = () => {
    setLogoutToast(true);
    setTimeout(() => {
      setLogoutToast(false);
      setShowSettingsMenu(false);
    }, 2500);
  };

  return (
    <header className={`h-16 border-b sticky top-0 z-20 px-4 md:px-6 flex items-center justify-between transition-colors duration-200 shadow-xs ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-white' 
        : 'bg-white border-slate-200/80 text-slate-900'
    }`}>
      {/* Toast Alert for Non-Working Logout */}
      {logoutToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <LogOut className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <p className="font-bold text-sm text-amber-300">Logout Action Simulated</p>
            <p className="text-xs text-slate-300">Non-working logout for demo mode. Session remains active.</p>
          </div>
        </div>
      )}

      {/* Left section: Welcome message */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            EduMission Tuition Center
          </div>
          <div className="text-sm font-black tracking-tight flex items-center gap-1.5">
            <span>{language === 'hi' ? 'स्वागत है,' : 'Welcome back,'}</span>
            <span className={`px-2 py-0.5 rounded-md font-black ${
              isDarkMode 
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' 
                : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
            }`}>
              {userRole}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Tuition Center Dropdown Selector */}
      <div className="flex items-center justify-center">
        <div className={`flex items-center gap-2 border rounded-xl px-3.5 py-1.5 shadow-2xs ${
          isDarkMode 
            ? 'bg-slate-950 border-slate-800 text-slate-200' 
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <span className={`text-xs font-bold hidden sm:inline ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {language === 'hi' ? 'ट्यूशन सेंटर:' : 'Tuition Center:'}
          </span>
          <select
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer pr-2"
          >
            <option value="ALL" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
              🌐 {language === 'hi' ? 'सभी संस्थान (EduMission Super Admin)' : 'All Institutes (EduMission Super Admin)'}
            </option>
            {MOCK_TUITION_CENTERS.map((c) => (
              <option key={c.id} value={c.id} className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                📍 {c.name} ({c.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right section: Language Dropdown, Dark Theme Toggle, Bell Notifications, Settings & Logout Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* 1. LANGUAGE DROPDOWN (English & Hindi) */}
        <div className={`flex items-center gap-1.5 border rounded-xl px-2.5 py-1 text-xs font-bold ${
          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <Globe className="w-3.5 h-3.5 text-indigo-500" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="en" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
              English 🇬🇧
            </option>
            <option value="hi" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
              Hindi 🇮🇳 (हिन्दी)
            </option>
          </select>
        </div>

        {/* 2. WORKING LIGHT / DARK THEME TOGGLE */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-750'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* 3. NOTIFICATION BELL BUTTON WITH POPUP */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSettingsMenu(false);
            }}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition relative ${
              showNotifications
                ? 'bg-indigo-600 text-white border-indigo-700'
                : isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Popup */}
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150 z-50 ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-500" />
                  <h4 className="font-bold text-xs tracking-tight">System Alerts & Notifications</h4>
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {notificationsList.map((n) => (
                  <div key={n.id} className={`p-2.5 rounded-xl border text-xs flex gap-2.5 transition ${
                    isDarkMode ? 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-950' : 'bg-slate-50 border-slate-200/70 hover:bg-slate-100/80'
                  }`}>
                    <div className="mt-0.5">
                      {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                      {n.type === 'info' && <Clock className="w-4 h-4 text-blue-500 shrink-0" />}
                      {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200/40 flex justify-between items-center">
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] font-semibold text-indigo-500 hover:underline flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Mark all as read
                </button>
                <span className="text-[10px] text-slate-400 font-medium">Updated live</span>
              </div>
            </div>
          )}
        </div>

        {/* 4. SETTINGS & LOGOUT DROPDOWN TRIGGER */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSettingsMenu(!showSettingsMenu);
              setShowNotifications(false);
            }}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${
              showSettingsMenu
                ? 'bg-indigo-600 text-white border-indigo-700'
                : isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="System Settings & Profile"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Settings Popup Menu */}
          {showSettingsMenu && (
            <div className={`absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl border p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150 z-50 ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    👑
                  </div>
                  <div>
                    <h4 className="font-bold text-xs truncate">EduMission Super Admin</h4>
                    <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Multi-Tenant Root
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSettingsMenu(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Preferences list */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Theme Mode:</span>
                  <span className="font-bold text-indigo-500">{isDarkMode ? 'Dark Theme 🌙' : 'Light Theme ☀️'}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Language:</span>
                  <span className="font-bold">{language === 'hi' ? 'Hindi (हिन्दी)' : 'English (US)'}</span>
                </div>
              </div>

              {/* NON-FUNCTIONAL LOG OUT BUTTON */}
              <div className="pt-2 border-t border-slate-200/40">
                <button
                  onClick={handleLogoutClick}
                  className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 border border-rose-200 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out (Demo)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
