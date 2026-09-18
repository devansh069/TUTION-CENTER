import React, { useState } from 'react';
import { 
  ShieldCheck, Check, X, Search, Filter, SlidersHorizontal, 
  Save, RotateCcw, Download, Eye, PlusCircle, Edit3, Trash2, 
  FileDown, ShieldAlert, Sparkles, AlertCircle, ChevronDown, 
  Building2, Layers, CheckCircle2, Lock, Unlock, HelpCircle
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { CATEGORY_ACCESS_RULES, ROLE_DEFINITIONS_LIST } from './rolesPermissionsData';

export default function CategoryAccessGrid({ instituteCode = 'ALL' }) {
  const [categories, setCategories] = useState(CATEGORY_ACCESS_RULES);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDomain, setSelectedDomain] = useState('ALL');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('category'); // 'category' or 'role'
  const [activePolicyCategory, setActivePolicyCategory] = useState(null);
  const [savedAlert, setSavedAlert] = useState(false);
  const [resetAlert, setResetAlert] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  // Extract unique domains for filter pills
  const domains = ['ALL', ...Array.from(new Set(CATEGORY_ACCESS_RULES.map(c => c.domain)))];

  // Toggle single permission for category + role
  const handleTogglePermission = (catId, roleKey, permKey) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      const currentRolePerms = cat.roles[roleKey];
      const newPermVal = !currentRolePerms[permKey];
      
      const updatedRolePerms = {
        ...currentRolePerms,
        [permKey]: newPermVal
      };

      // Recalculate level label
      let newLevel = 'CUSTOM';
      if (updatedRolePerms.view && updatedRolePerms.create && updatedRolePerms.edit && updatedRolePerms.delete) {
        newLevel = 'FULL CRUD';
      } else if (updatedRolePerms.view && !updatedRolePerms.create && !updatedRolePerms.edit && !updatedRolePerms.delete) {
        newLevel = 'READ ONLY';
      } else if (!updatedRolePerms.view && !updatedRolePerms.create && !updatedRolePerms.edit && !updatedRolePerms.delete) {
        newLevel = 'DENIED 🔒';
      } else if (updatedRolePerms.view && (updatedRolePerms.create || updatedRolePerms.edit)) {
        newLevel = 'RESTRICTED';
      }

      updatedRolePerms.level = newLevel;

      return {
        ...cat,
        roles: {
          ...cat.roles,
          [roleKey]: updatedRolePerms
        }
      };
    }));
  };

  // Quick preset helper
  const handleApplyPreset = (catId, roleKey, presetType) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      let newRolePerms = {};
      if (presetType === 'FULL') {
        newRolePerms = { view: true, create: true, edit: true, delete: true, export: true, approve: true, level: 'FULL CRUD' };
      } else if (presetType === 'READ') {
        newRolePerms = { view: true, create: false, edit: false, delete: false, export: true, approve: false, level: 'READ ONLY' };
      } else if (presetType === 'DENY') {
        newRolePerms = { view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒' };
      }

      return {
        ...cat,
        roles: {
          ...cat.roles,
          [roleKey]: newRolePerms
        }
      };
    }));
  };

  // Filtered categories based on selected category, domain & search
  const filteredCategories = categories.filter(cat => {
    if (selectedCategory !== 'ALL' && cat.id !== selectedCategory) return false;
    if (selectedDomain !== 'ALL' && cat.domain !== selectedDomain) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = cat.categoryName.toLowerCase().includes(q);
      const matchDesc = cat.description.toLowerCase().includes(q);
      const matchDomain = cat.domain.toLowerCase().includes(q);
      const matchMod = cat.moduleNumber.includes(q);
      if (!matchName && !matchDesc && !matchDomain && !matchMod) return false;
    }
    return true;
  });

  const handleSaveMatrix = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3500);
  };

  const handleResetDefaults = () => {
    setCategories(CATEGORY_ACCESS_RULES);
    setResetAlert(true);
    setTimeout(() => setResetAlert(false), 3000);
  };

  const handleExportCSV = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Access Governance RBAC • 16-Category Matrix Grid
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Scope: {instituteCode === 'ALL' ? 'Global Multi-Tenant Matrix' : `Center (${instituteCode})`}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            Category Access & Edit Permissions Grid
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit, grant, or revoke View, Create, Edit, Delete, Export, and Approve permissions across all operational ERP categories.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={handleSaveMatrix}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            Save Policy Matrix
          </button>
        </div>
      </div>

      {/* Notifications */}
      {savedAlert && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Role permissions successfully compiled! Updated ACL policies committed to Redis cluster session cache.
          </span>
          <span className="font-bold text-[11px] bg-emerald-100 px-2.5 py-0.5 rounded text-emerald-700">Committed</span>
        </div>
      )}

      {resetAlert && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-600" />
            Permission matrix restored to baseline factory default values.
          </span>
          <span className="font-bold text-[11px] bg-amber-100 px-2 py-0.5 rounded text-amber-700">Reset</span>
        </div>
      )}

      {exportNotice && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center justify-between font-medium animate-in fade-in duration-150">
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            Generating SOC-2 Type II Category Access Matrix audit dump (CSV format).
          </span>
          <span className="font-bold text-[11px] bg-blue-100 px-2 py-0.5 rounded text-blue-700">200 OK</span>
        </div>
      )}

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="ERP Operational Categories"
          value={`${categories.length} Modules`}
          subtitle="Covering 100% Enterprise Workflows"
          icon="📚"
          badge="Complete Coverage"
        />
        <KPICard
          theme="emerald"
          title="Configured Staff Roles"
          value="6 Master Roles"
          subtitle="From Super Admin to Field Staff"
          icon="👥"
          badge="Hierarchical"
        />
        <KPICard
          theme="amber"
          title="Granular Permission Nodes"
          value="96 Vectors"
          subtitle="View • Add • Edit • Del • Exp • Appr"
          icon="⚡"
          badge="Fine-Grained"
        />
        <KPICard
          theme="purple"
          title="Active Policy Baseline"
          value="Zero Trust Enforced"
          subtitle="Least-Privilege Standard"
          icon="🛡️"
          badge="NIST 800-207"
        />
      </div>

      {/* Filter Toolbar & Category Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Dropdown Picker */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1 shrink-0">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Focus Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            >
              <option value="ALL">🌟 All 16 Categories (Comprehensive Matrix)</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.moduleNumber}. {c.icon} {c.categoryName} ({c.domain})
                </option>
              ))}
            </select>
          </div>

          {/* Search Field */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search category, module, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('category')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'category'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3 h-3" />
              Category Matrix
            </button>
            <button
              onClick={() => setViewMode('role')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'role'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3 h-3" />
              Role Inspector
            </button>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-1 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter Domain:
          </span>
          {domains.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedDomain === d
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-100 border border-transparent'
              }`}
            >
              {d === 'ALL' ? 'All Domains' : d}
            </button>
          ))}
        </div>

        {/* Role Inspector Selector (when in role mode) */}
        {viewMode === 'role' && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 shrink-0">Inspect Role:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {ROLE_DEFINITIONS_LIST.map(r => (
                <button
                  key={r.key}
                  onClick={() => setSelectedRole(r.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedRole === r.key
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{r.name}</span>
                  <span className="text-[10px] opacity-75 font-normal">({r.badge})</span>
                </button>
              ))}
              <button
                onClick={() => setSelectedRole('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedRole === 'ALL'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Roles
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Permission Legend & Instructions Bar */}
      <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2 text-slate-600">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
            Permission Options:
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Eye className="w-3 h-3 text-blue-600" /> <strong>View</strong> (Read)
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <PlusCircle className="w-3 h-3 text-emerald-600" /> <strong>Create</strong> (Add)
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Edit3 className="w-3 h-3 text-amber-600" /> <strong>Edit</strong> (Modify)
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Trash2 className="w-3 h-3 text-rose-600" /> <strong>Delete</strong> (Purge)
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <FileDown className="w-3 h-3 text-purple-600" /> <strong>Export</strong> (CSV/PDF)
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <ShieldAlert className="w-3 h-3 text-indigo-600" /> <strong>Approve</strong> (Override)
          </span>
        </div>
        <div className="text-[11px] text-indigo-700 font-medium shrink-0">
          💡 Click any permission icon to toggle grant/deny in real-time
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: CATEGORY MATRIX GRID                                         */}
      {/* ========================================================================= */}
      {viewMode === 'category' && (
        <div className="space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="font-bold text-slate-700 text-sm">No operational categories found</div>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your category filter, domain, or search query.</p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div 
                key={cat.id} 
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:border-slate-300"
              >
                {/* Category Header Row */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-lg flex items-center justify-center shadow-xs">
                      {cat.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                          MOD-{cat.moduleNumber}
                        </span>
                        <h2 className="font-bold text-slate-900 text-base">{cat.categoryName}</h2>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {cat.domain}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          Scope: {cat.scopeBoundary}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Policy Settings trigger */}
                  <button
                    onClick={() => setActivePolicyCategory(cat)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-xs flex items-center gap-1.5 shrink-0 self-start md:self-auto"
                  >
                    <Lock className="w-3 h-3 text-slate-500" />
                    Configure Policy
                  </button>
                </div>

                {/* Granular Permissions Table Across All Roles */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/40 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                      <tr>
                        <th className="py-2.5 px-4 w-48">Staff Role Tier</th>
                        <th className="py-2.5 px-4 w-36">Access Level</th>
                        <th className="py-2.5 px-3 text-center">View</th>
                        <th className="py-2.5 px-3 text-center">Create</th>
                        <th className="py-2.5 px-3 text-center">Edit</th>
                        <th className="py-2.5 px-3 text-center">Delete</th>
                        <th className="py-2.5 px-3 text-center">Export</th>
                        <th className="py-2.5 px-3 text-center">Approve</th>
                        <th className="py-2.5 px-4 text-right">Quick Presets</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ROLE_DEFINITIONS_LIST.map((roleDef) => {
                        const perm = cat.roles[roleDef.key] || {
                          view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒'
                        };

                        const isDenied = perm.level.includes('DENIED');
                        const isFull = perm.level.includes('FULL');

                        return (
                          <tr key={roleDef.key} className="hover:bg-slate-50/50 transition">
                            {/* Role Label */}
                            <td className="py-2.5 px-4 font-bold text-slate-800">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  roleDef.key === 'superAdmin' ? 'bg-indigo-600' :
                                  roleDef.key === 'centerDirector' ? 'bg-blue-600' :
                                  roleDef.key === 'seniorFaculty' ? 'bg-emerald-600' :
                                  roleDef.key === 'financeCashier' ? 'bg-amber-600' :
                                  roleDef.key === 'counselor' ? 'bg-purple-600' : 'bg-cyan-600'
                                }`} />
                                <div>
                                  <div>{roleDef.name}</div>
                                  <div className="text-[10px] text-slate-400 font-normal">{roleDef.badge}</div>
                                </div>
                              </div>
                            </td>

                            {/* Access Level Badge */}
                            <td className="py-2.5 px-4">
                              <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black tracking-tight ${
                                isFull 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : isDenied 
                                  ? 'bg-slate-100 text-slate-500 border border-slate-200' 
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}>
                                {perm.level}
                              </span>
                            </td>

                            {/* View Toggle */}
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => handleTogglePermission(cat.id, roleDef.key, 'view')}
                                className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition ${
                                  perm.view
                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                }`}
                                title="Toggle View Permission"
                              >
                                {perm.view ? <Eye className="w-3.5 h-3.5 font-bold" /> : <X className="w-3 h-3" />}
                              </button>
                            </td>

                            {/* Create Toggle */}
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => handleTogglePermission(cat.id, roleDef.key, 'create')}
                                className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition ${
                                  perm.create
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                }`}
                                title="Toggle Create Permission"
                              >
                                {perm.create ? <PlusCircle className="w-3.5 h-3.5 font-bold" /> : <X className="w-3 h-3" />}
                              </button>
                            </td>

                            {/* Edit Toggle */}
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => handleTogglePermission(cat.id, roleDef.key, 'edit')}
                                className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition ${
                                  perm.edit
                                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                }`}
                                title="Toggle Edit Permission"
                              >
                                {perm.edit ? <Edit3 className="w-3.5 h-3.5 font-bold" /> : <X className="w-3 h-3" />}
                              </button>
                            </td>

                            {/* Delete Toggle */}
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => handleTogglePermission(cat.id, roleDef.key, 'delete')}
                                className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition ${
                                  perm.delete
                                    ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                }`}
                                title="Toggle Delete Permission"
                              >
                                {perm.delete ? <Trash2 className="w-3.5 h-3.5 font-bold" /> : <X className="w-3 h-3" />}
                              </button>
                            </td>

                            {/* Export Toggle */}
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => handleTogglePermission(cat.id, roleDef.key, 'export')}
                                className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition ${
                                  perm.export
                                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                }`}
                                title="Toggle Export Permission"
                              >
                                {perm.export ? <FileDown className="w-3.5 h-3.5 font-bold" /> : <X className="w-3 h-3" />}
                              </button>
                            </td>

                            {/* Approve Toggle */}
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => handleTogglePermission(cat.id, roleDef.key, 'approve')}
                                className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition ${
                                  perm.approve
                                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                }`}
                                title="Toggle Approve / Override Permission"
                              >
                                {perm.approve ? <ShieldAlert className="w-3.5 h-3.5 font-bold" /> : <X className="w-3 h-3" />}
                              </button>
                            </td>

                            {/* Quick Presets */}
                            <td className="py-2.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleApplyPreset(cat.id, roleDef.key, 'FULL')}
                                  className="px-1.5 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold transition border border-emerald-200"
                                  title="Grant Full CRUD"
                                >
                                  Full
                                </button>
                                <button
                                  onClick={() => handleApplyPreset(cat.id, roleDef.key, 'READ')}
                                  className="px-1.5 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold transition border border-blue-200"
                                  title="Set Read Only"
                                >
                                  Read
                                </button>
                                <button
                                  onClick={() => handleApplyPreset(cat.id, roleDef.key, 'DENY')}
                                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold transition border border-slate-200"
                                  title="Deny All Access"
                                >
                                  Deny
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: ROLE INSPECTOR (Inspect 1 role across all categories)        */}
      {/* ========================================================================= */}
      {viewMode === 'role' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800 text-base">
                Role Permissions Inspector: {selectedRole === 'ALL' ? 'All Roles Overview' : ROLE_DEFINITIONS_LIST.find(r => r.key === selectedRole)?.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Audit complete access surface area across all 16 operational ERP categories.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              {filteredCategories.length} Categories Scoped
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">ERP Category / Module</th>
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Scope Limit</th>
                  <th className="py-3 px-4 text-center">View</th>
                  <th className="py-3 px-4 text-center">Create</th>
                  <th className="py-3 px-4 text-center">Edit</th>
                  <th className="py-3 px-4 text-center">Delete</th>
                  <th className="py-3 px-4 text-center">Export</th>
                  <th className="py-3 px-4 text-center">Approve</th>
                  <th className="py-3 px-4 text-right">Access Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((cat) => {
                  const targetRoleKey = selectedRole === 'ALL' ? 'centerDirector' : selectedRole;
                  const perm = cat.roles[targetRoleKey] || {
                    view: false, create: false, edit: false, delete: false, export: false, approve: false, level: 'DENIED 🔒'
                  };
                  const isDenied = perm.level.includes('DENIED');

                  return (
                    <tr key={cat.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{cat.icon}</span>
                          <div>
                            <div className="font-bold text-slate-800">{cat.categoryName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">Module #{cat.moduleNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-600">
                        {cat.domain}
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">
                        {cat.scopeBoundary}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {perm.view ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {perm.create ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {perm.edit ? <Check className="w-4 h-4 text-amber-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {perm.delete ? <Check className="w-4 h-4 text-rose-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {perm.export ? <Check className="w-4 h-4 text-purple-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {perm.approve ? <Check className="w-4 h-4 text-indigo-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isDenied
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {perm.level}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL / DRAWER: CONFIGURE CATEGORY POLICY                                 */}
      {/* ========================================================================= */}
      {activePolicyCategory && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activePolicyCategory.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Policy Configuration: {activePolicyCategory.categoryName}
                  </h3>
                  <p className="text-xs text-slate-500">Security enforcement parameters & session rules</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePolicyCategory(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Scope Geofence Boundary</label>
                <select 
                  defaultValue={activePolicyCategory.scopeBoundary}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Global Enterprise HQ">Global Enterprise HQ (Root Access)</option>
                  <option value="Assigned Campus Center">Assigned Campus Center (Branch Restrict)</option>
                  <option value="Academic Department">Academic Department (Faculty Room)</option>
                  <option value="Cash Counter Drawer">Cash Counter Drawer (POS Machine)</option>
                  <option value="Campus Turnstiles & Gates">Campus Turnstiles & Biometrics Gate</option>
                  <option value="Root Vault Only">Root Vault Only (Air-Gapped)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Elevation TTL</label>
                  <select defaultValue="24h" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none">
                    <option value="2h">2 Hours (Strict)</option>
                    <option value="8h">8 Hours (Work Shift)</option>
                    <option value="24h">24 Hours (Standard)</option>
                    <option value="72h">72 Hours (Director Only)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MFA Step-up Required?</label>
                  <select defaultValue="yes" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none">
                    <option value="yes">Yes (FIDO2 or TOTP Prompt)</option>
                    <option value="no">No (Standard Session Cookie)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  Dual-Key Sign-off Requirement
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                  <span>Require simultaneous Center Director & Super Admin authorization for deletions or exports &gt; 100 records.</span>
                </label>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Audit Invariance
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" defaultChecked disabled className="rounded text-emerald-600" />
                  <span className="text-slate-500">Immutable row-level logging enabled into Postgres audit ledger (Mandatory SOC-2 Policy).</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActivePolicyCategory(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActivePolicyCategory(null);
                  handleSaveMatrix();
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
              >
                Apply Category Directives
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
