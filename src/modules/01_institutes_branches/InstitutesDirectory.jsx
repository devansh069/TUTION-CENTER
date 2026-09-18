import React, { useState, useMemo } from 'react';
import KPICard from '../../components/common/KPICard';
import { INSTITUTES_DATA } from '../../data/erpData';

export default function InstitutesDirectory({ instituteCode = 'ALL' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [selectedCampusModal, setSelectedCampusModal] = useState(null);

  // Filter institutes based on scope, search term, and package tier
  const filteredInstitutes = useMemo(() => {
    return INSTITUTES_DATA.filter((inst) => {
      const matchScope = instituteCode === 'ALL' || inst.code === instituteCode || inst.id === instituteCode;
      const matchSearch =
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.gstin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.shortCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTier = selectedTier === 'ALL' || inst.packageTier.toLowerCase().includes(selectedTier.toLowerCase());

      return matchScope && matchSearch && matchTier;
    });
  }, [instituteCode, searchTerm, selectedTier]);

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Total Institutes"
          value={`${INSTITUTES_DATA.length} Verified Centers`}
          subtitle="Multi-Tenant Cloud Tenants"
          icon="🏛️"
          badge="Global Footprint"
        />
        <KPICard
          theme="emerald"
          title="Directorship Base"
          value="100% Assigned"
          subtitle="All Campus Heads In Place"
          icon="🛡️"
          badge="Zero Vacancies"
        />
        <KPICard
          theme="amber"
          title="License Subscriptions"
          value="All Active"
          subtitle="Enterprise & Pro Max"
          icon="📜"
          badge="100% Compliant"
        />
        <KPICard
          theme="rose"
          title="Network Seat Load"
          value="88.9% Fill"
          subtitle="4,710 / 5,250 Total Desks"
          icon="🪑"
          badge="High Demand"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search campus by name, city, director, GSTIN or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All License Tiers</option>
            <option value="Enterprise">Enterprise Max</option>
            <option value="Professional">Professional Plus</option>
            <option value="Growth">Growth Plan</option>
            <option value="Standard">Standard Tier</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            Showing <strong className="text-slate-800">{filteredInstitutes.length}</strong> of {INSTITUTES_DATA.length} Campuses
          </span>
          <button 
            onClick={() => alert("Registration wizard for onboarding a new tuition franchise.")}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5"
          >
            <span>+</span> Onboard New Campus
          </button>
        </div>
      </div>

      {/* Grid of Dense Campus Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstitutes.map((inst) => {
          const pct = Math.round((inst.metrics.students / inst.metrics.studentCapacity) * 100);
          return (
            <div
              key={inst.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-black text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md border border-blue-200">
                      {inst.shortCode}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 mt-1.5 leading-snug">{inst.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <span>📍</span> {inst.city} • <span className="font-semibold text-slate-700">{inst.region}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px] flex-shrink-0">
                    ● {inst.status}
                  </span>
                </div>

                {/* Tagline */}
                <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 italic">
                  "{inst.tagline}"
                </div>

                {/* Key Metric Gauges */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="text-[10px] text-blue-800 font-semibold uppercase">Students</div>
                    <div className="text-sm font-black text-blue-900">{inst.metrics.students}</div>
                    <div className="text-[9px] text-slate-500">Cap: {inst.metrics.studentCapacity}</div>
                  </div>
                  <div className="p-2 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <div className="text-[10px] text-emerald-800 font-semibold uppercase">Revenue</div>
                    <div className="text-sm font-black text-emerald-900">${(inst.metrics.monthlyRevenue / 1000).toFixed(1)}k</div>
                    <div className="text-[9px] text-slate-500">Monthly Inflow</div>
                  </div>
                  <div className="p-2 bg-amber-50/50 rounded-xl border border-amber-100">
                    <div className="text-[10px] text-amber-800 font-semibold uppercase">Staff</div>
                    <div className="text-sm font-black text-amber-900">{inst.metrics.teachers + inst.metrics.supportStaff}</div>
                    <div className="text-[9px] text-slate-500">{inst.metrics.teachers} Faculty</div>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Seat Occupancy</span>
                    <span className="text-blue-600 font-bold">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct > 90 ? 'bg-amber-500' : 'bg-blue-600'}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Director Dossier */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span>👤</span> Director: {inst.director}
                  </div>
                  <div className="text-slate-500 text-[11px] font-mono">{inst.directorEmail}</div>
                  <div className="text-slate-500 text-[11px] font-mono">{inst.directorPhone}</div>
                </div>

                {/* Statutory & Licensing Info */}
                <div className="mt-3 p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>GSTIN:</span>
                    <span className="font-mono font-bold text-slate-800">{inst.gstin}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Plan Tier:</span>
                    <span className="font-bold text-indigo-700">{inst.packageTier}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>License Expiry:</span>
                    <span className="font-medium text-slate-800">{inst.packageExpiry} ({inst.daysRemaining}d left)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCampusModal(inst)}
                  className="flex-1 py-2 px-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition text-center"
                >
                  Full Dossier 🔍
                </button>
                <button
                  onClick={() => alert(`Opening live camera & facial biometric gateway for ${inst.name}`)}
                  className="py-2 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <span>📹</span> Cams
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Campus Master Data Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-2">Campus Statutory & Technical Infrastructure Registry</h3>
        <p className="text-xs text-slate-500 mb-4">Complete legal identifiers, cloud storage quotas, SMS telemetry and server node latency</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Campus & City</th>
                <th className="py-3 px-4">CIN / Reg ID</th>
                <th className="py-3 px-4">Physical Address</th>
                <th className="py-3 px-4">Storage Used</th>
                <th className="py-3 px-4">SMS Gateway</th>
                <th className="py-3 px-4">Attendance Rate</th>
                <th className="py-3 px-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInstitutes.map((inst) => (
                <tr key={inst.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{inst.name}</div>
                    <div className="text-[11px] text-slate-400">{inst.city} • Est. {inst.established}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-700">
                    {inst.cinNumber}
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-[11px] max-w-xs truncate">
                    {inst.address}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">
                    {inst.metrics.storageUsedGB} / {inst.metrics.storageTotalGB} GB
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                    {inst.metrics.smsQuotaUsed.toLocaleString()} / {inst.metrics.smsQuotaTotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[10px] border border-emerald-200">
                      {inst.metrics.attendanceRate}% Live
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-[10px] border border-blue-200">
                      SOC-2 Pass
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Drawer for Campus Full Dossier */}
      {selectedCampusModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedCampusModal.shortCode}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{selectedCampusModal.name}</h3>
                <p className="text-xs text-slate-500">{selectedCampusModal.city} • {selectedCampusModal.address}</p>
              </div>
              <button
                onClick={() => setSelectedCampusModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Director & Management</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedCampusModal.director}</div>
                <div className="text-slate-600 font-mono mt-1">{selectedCampusModal.directorEmail}</div>
                <div className="text-slate-600 font-mono">{selectedCampusModal.directorPhone}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Statutory & Tax Identity</div>
                <div className="font-bold text-slate-900 mt-0.5">GSTIN: <span className="font-mono">{selectedCampusModal.gstin}</span></div>
                <div className="text-slate-600 font-mono mt-1 text-[11px]">CIN: {selectedCampusModal.cinNumber}</div>
                <div className="text-slate-600 font-semibold mt-1">Incorporated: {selectedCampusModal.established}</div>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
              <h4 className="font-bold text-xs text-blue-900 mb-2">Campus Physical & Digital Infrastructure</h4>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-white rounded-lg border border-blue-200/60">
                  <div className="text-[10px] text-slate-500">Lecture Halls</div>
                  <div className="font-bold text-blue-900">{selectedCampusModal.metrics.batches * 2} Halls</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-blue-200/60">
                  <div className="text-[10px] text-slate-500">Biometric Cams</div>
                  <div className="font-bold text-blue-900">4 Gate Edge Cams</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-blue-200/60">
                  <div className="text-[10px] text-slate-500">Cloud Storage</div>
                  <div className="font-bold text-blue-900">{selectedCampusModal.metrics.storageUsedGB} GB</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-blue-200/60">
                  <div className="text-[10px] text-slate-500">SMS Messages</div>
                  <div className="font-bold text-blue-900">{selectedCampusModal.metrics.smsQuotaUsed}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedCampusModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  alert(`Audit Certificate generated for ${selectedCampusModal.name}`);
                  setSelectedCampusModal(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition"
              >
                Download Audit Certificate 📄
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
