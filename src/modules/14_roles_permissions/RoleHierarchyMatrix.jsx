import React, { useState, useMemo } from 'react';
import { 
  Shield, Lock, Key, Search, Filter, Check, X, 
  Sparkles, Download, Plus, AlertCircle, Info, Building2
} from 'lucide-react';
import { PERMISSIONS_MATRIX_DATA } from './rolesPermissionsData';

export default function RoleHierarchyMatrix({ instituteCode = 'ALL' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [matrixData, setMatrixData] = useState(PERMISSIONS_MATRIX_DATA);

  // New Policy Rule State
  const [newRule, setNewRule] = useState({
    module: '',
    role: 'Center Director',
    permission: 'BRANCH CRUD',
    scopeLimit: 'Assigned Campus Center'
  });

  const filteredMatrix = useMemo(() => {
    return matrixData.filter(m => {
      return !searchTerm || m.module.toLowerCase().includes(searchTerm.toLowerCase()) || m.scopeLimit.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [matrixData, searchTerm]);

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.module.trim()) return;

    const newEntry = {
      module: newRule.module,
      superAdmin: 'FULL CRUD',
      centerDirector: newRule.role === 'Center Director' ? newRule.permission : 'READ ONLY',
      seniorFaculty: newRule.role === 'Senior Faculty' ? newRule.permission : 'DENIED 🔒',
      financeCashier: newRule.role === 'Finance Cashier' ? newRule.permission : 'DENIED 🔒',
      telecallerCounselor: newRule.role === 'Telecaller Counselor' ? newRule.permission : 'DENIED 🔒',
      inventoryKeeper: 'DENIED 🔒',
      superOnly: false,
      scopeLimit: newRule.scopeLimit
    };

    setMatrixData([...matrixData, newEntry]);
    setShowPolicyModal(false);
    setNewRule({
      module: '',
      role: 'Center Director',
      permission: 'BRANCH CRUD',
      scopeLimit: 'Assigned Campus Center'
    });
    alert(`Custom policy rule enforced for module: "${newEntry.module}"`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-bold border border-purple-200">
              Zero Trust Access Control
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Enforced Policy Blueprint v2.8
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <Lock className="w-6 h-6 text-purple-600" />
            RBAC Matrix: Role Permission Blueprint
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Granular matrix mapping ERP functional modules to CRUD privileges and multi-tenant center scope boundaries.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("RBAC Matrix exported as audit JSON.")}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Matrix</span>
          </button>
          <button
            onClick={() => setShowPolicyModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Policy Rule</span>
          </button>
        </div>
      </div>

      {/* Search and Security Notice */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search module area or scope limitation..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
            FULL CRUD: Super Admin
          </span>
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200">
            BRANCH ONLY: Center Scoped
          </span>
          <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-200">
            DENIED 🔒: Restricted
          </span>
        </div>
      </div>

      {/* Permission Grid Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-bold border-y border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">ERP Functional Module</th>
                <th className="py-3.5 px-4 text-center">Super Admin</th>
                <th className="py-3.5 px-4 text-center">Center Director</th>
                <th className="py-3.5 px-4 text-center">Senior Faculty</th>
                <th className="py-3.5 px-4 text-center">Finance Cashier</th>
                <th className="py-3.5 px-4 text-center">Telecaller Counselor</th>
                <th className="py-3.5 px-4 text-center">Inventory Keeper</th>
                <th className="py-3.5 px-4 text-right">Scope Boundary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMatrix.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      {p.superOnly && (
                        <span className="text-rose-500 font-bold text-[10px]" title="Confidential: Restricted to Super Admin">
                          🔒
                        </span>
                      )}
                      <span>{p.module}</span>
                    </div>
                  </td>

                  {/* Super Admin */}
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                      {p.superAdmin}
                    </span>
                  </td>

                  {/* Center Director */}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.centerDirector.includes('DENIED') 
                        ? 'bg-slate-100 text-slate-400' 
                        : p.centerDirector.includes('CRUD')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {p.centerDirector}
                    </span>
                  </td>

                  {/* Senior Faculty */}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.seniorFaculty.includes('DENIED') 
                        ? 'bg-slate-100 text-slate-400' 
                        : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                    }`}>
                      {p.seniorFaculty}
                    </span>
                  </td>

                  {/* Finance Cashier */}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.financeCashier.includes('DENIED') 
                        ? 'bg-slate-100 text-slate-400' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {p.financeCashier}
                    </span>
                  </td>

                  {/* Telecaller Counselor */}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.telecallerCounselor.includes('DENIED') 
                        ? 'bg-slate-100 text-slate-400' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {p.telecallerCounselor}
                    </span>
                  </td>

                  {/* Inventory Keeper */}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.inventoryKeeper.includes('DENIED') 
                        ? 'bg-slate-100 text-slate-400' 
                        : 'bg-slate-200 text-slate-800'
                    }`}>
                      {p.inventoryKeeper}
                    </span>
                  </td>

                  {/* Scope Limit */}
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-[11px] font-semibold text-slate-600">
                      {p.scopeLimit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Custom Policy Rule Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-black text-slate-900">Add Custom RBAC Policy Rule</h3>
              </div>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Functional Module Area *</label>
                <input
                  type="text"
                  required
                  value={newRule.module}
                  onChange={e => setNewRule({ ...newRule, module: e.target.value })}
                  placeholder="e.g. CCTV Live Feeds & Turnstile Override"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Master Role</label>
                  <select
                    value={newRule.role}
                    onChange={e => setNewRule({ ...newRule, role: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="Center Director">Center Director</option>
                    <option value="Senior Faculty">Senior Faculty</option>
                    <option value="Finance Cashier">Finance Cashier</option>
                    <option value="Telecaller Counselor">Telecaller Counselor</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Privilege Granted</label>
                  <select
                    value={newRule.permission}
                    onChange={e => setNewRule({ ...newRule, permission: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="BRANCH CRUD">BRANCH CRUD</option>
                    <option value="READ ONLY">READ ONLY</option>
                    <option value="CUSTOM OPERATOR">CUSTOM OPERATOR</option>
                    <option value="DENIED 🔒">DENIED 🔒</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Scope Limitation Boundary</label>
                <input
                  type="text"
                  value={newRule.scopeLimit}
                  onChange={e => setNewRule({ ...newRule, scopeLimit: e.target.value })}
                  placeholder="e.g. Assigned Campus Center Only"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPolicyModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Enforce Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
