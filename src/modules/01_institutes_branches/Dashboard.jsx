import React, { useState, useMemo } from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { 
  INSTITUTES_DATA, 
  STUDENTS_DATA, 
  BATCHES_DATA, 
  INVENTORY_DATA, 
  HELP_SUPPORT_DATA, 
  LIVE_CLASSES_DATA, 
  MOCK_FACULTY 
} from '../../data/erpData';

export default function InstitutesDashboard({ instituteCode = 'ALL', onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Filtered institutes based on current multi-tenant scope
  const targetInstitutes = useMemo(() => {
    if (!instituteCode || instituteCode === 'ALL') return INSTITUTES_DATA;
    return INSTITUTES_DATA.filter(i => i.code === instituteCode || i.id === instituteCode);
  }, [instituteCode]);

  // Aggregate or Center-specific metrics
  const stats = useMemo(() => {
    const totalStudents = targetInstitutes.reduce((acc, i) => acc + (i.metrics?.students || 0), 0);
    const totalCapacity = targetInstitutes.reduce((acc, i) => acc + (i.metrics?.studentCapacity || 0), 0);
    const totalTeachers = targetInstitutes.reduce((acc, i) => acc + (i.metrics?.teachers || 0), 0);
    const totalSupportStaff = targetInstitutes.reduce((acc, i) => acc + (i.metrics?.supportStaff || 0), 0);
    const totalBatches = targetInstitutes.reduce((acc, i) => acc + (i.metrics?.batches || 0), 0);
    const totalRevenue = targetInstitutes.reduce((acc, i) => acc + (i.metrics?.monthlyRevenue || 0), 0);
    const totalPendingFees = targetInstitutes.reduce((acc, i) => acc + (i.metrics?.pendingFees || 0), 0);
    const avgAttendance = targetInstitutes.length > 0 
      ? (targetInstitutes.reduce((acc, i) => acc + (i.metrics?.attendanceRate || 0), 0) / targetInstitutes.length).toFixed(1)
      : '94.2';
    const fillRate = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 89;

    return {
      campuses: targetInstitutes.length,
      totalStudents,
      totalCapacity,
      totalTeachers,
      totalSupportStaff,
      totalBatches,
      totalRevenue,
      totalPendingFees,
      avgAttendance,
      fillRate
    };
  }, [targetInstitutes]);

  // Filtered live classes & ongoing batches
  const liveBatches = useMemo(() => {
    if (!instituteCode || instituteCode === 'ALL') return BATCHES_DATA;
    return BATCHES_DATA.filter(b => b.instituteCode === instituteCode);
  }, [instituteCode]);

  // Filtered inventory snapshot
  const inventorySnapshot = useMemo(() => {
    if (!instituteCode || instituteCode === 'ALL') return INVENTORY_DATA;
    return INVENTORY_DATA.filter(inv => inv.instituteCode === instituteCode);
  }, [instituteCode]);

  // Filtered support tickets
  const activeTickets = useMemo(() => {
    if (!instituteCode || instituteCode === 'ALL') return HELP_SUPPORT_DATA;
    return HELP_SUPPORT_DATA.filter(t => t.instituteCode === instituteCode);
  }, [instituteCode]);

  // Performance chart data
  const chartData = useMemo(() => {
    if (targetInstitutes.length === 1 && targetInstitutes[0].performanceChart) {
      return targetInstitutes[0].performanceChart.map(p => ({
        label: p.month,
        value: p.revenue
      }));
    }
    // Consolidated
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    return months.map(m => {
      const sum = INSTITUTES_DATA.reduce((acc, inst) => {
        const found = inst.performanceChart?.find(item => item.month === m);
        return acc + (found ? found.revenue : 0);
      }, 0);
      return { label: m, value: sum };
    });
  }, [targetInstitutes]);

  // Branch capacity comparison chart
  const capacityChart = useMemo(() => {
    return INSTITUTES_DATA.map(inst => ({
      label: inst.shortCode || inst.code,
      value: inst.metrics?.students || 0
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards (Reference Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Total Enrolled Students"
          value={stats.totalStudents.toLocaleString()}
          subtitle={`${stats.fillRate}% Network Seat Capacity`}
          icon="🎓"
          trend="+14.8%"
          badge={`${stats.campuses} Campuses`}
        />
        <KPICard
          theme="emerald"
          title="Teaching Faculty Strength"
          value={`${stats.totalTeachers} Educators`}
          subtitle={`Ratio: 1:${Math.round(stats.totalStudents / (stats.totalTeachers || 1))} Students`}
          icon="👨‍🏫"
          trend="+8.2%"
          badge={`${stats.totalSupportStaff} Support Staff`}
        />
        <KPICard
          theme="amber"
          title="Monthly Fee Collection"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          subtitle={`Pending Dues: $${stats.totalPendingFees.toLocaleString()}`}
          icon="💰"
          trend="+18.4%"
          badge="94.2% Realized"
        />
        <KPICard
          theme="rose"
          title="Attendance & Batches"
          value={`${stats.totalBatches} Active Batches`}
          subtitle={`${stats.avgAttendance}% Facial AI Verified`}
          icon="📸"
          badge="100% On-Track"
        />
      </div>

      {/* Real-time Enterprise Telemetry Ribbon (8 Critical Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Live Streams</div>
          <div className="text-base font-black text-blue-600 flex items-center justify-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            {LIVE_CLASSES_DATA.length} WebRTC
          </div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Biometric Logs</div>
          <div className="text-base font-black text-emerald-600 mt-0.5">2,840 Today</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Classrooms</div>
          <div className="text-base font-black text-slate-800 mt-0.5">74 Smart Halls</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Inventory Items</div>
          <div className="text-base font-black text-indigo-600 mt-0.5">1,127 Units</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Open Tickets</div>
          <div className="text-base font-black text-amber-600 mt-0.5">{activeTickets.length} Pending</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Pending Sign-off</div>
          <div className="text-base font-black text-purple-600 mt-0.5">3 Approvals</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Storage CDN</div>
          <div className="text-base font-black text-slate-700 mt-0.5">614 / 900 GB</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">SMS Gateway</div>
          <div className="text-base font-black text-emerald-600 mt-0.5">61.2K Quota</div>
        </div>
      </div>

      {/* Main Operational Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Live Batches, Classes & Approval Stepper */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Classes & Ongoing Batches Roster */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>🏛️</span> Active Classes & Live Batch Telemetry
                </h3>
                <p className="text-xs text-slate-500">Real-time surveillance across lecture halls, smart labs and WebRTC streams</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate && onNavigate('branch_hierarchy')}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100 transition"
                >
                  Branch Hierarchy 🏢
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('institutes_directory')}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition"
                >
                  Directory 📋
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-3">Batch & Subject</th>
                    <th className="py-3 px-3">Campus & Room</th>
                    <th className="py-3 px-3">Educator</th>
                    <th className="py-3 px-3">Students</th>
                    <th className="py-3 px-3">Time Slot</th>
                    <th className="py-3 px-3 text-right">Live Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {liveBatches.slice(0, 5).map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{batch.name}</div>
                        <div className="text-[11px] text-blue-600 font-semibold">{batch.subject}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{batch.instituteName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{batch.room}</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-700">{batch.teacher}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-800">{batch.students}</span>
                        <span className="text-slate-400 text-[11px]"> / {batch.capacity}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">{batch.time}</td>
                      <td className="py-3 px-3 text-right">
                        {batch.streamLive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full font-bold text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                            LIVE STREAM
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                            In Session
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Multi-Tier Branch Governance & Approval Workflow Stepper */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Multi-Tier Branch Approval Hierarchy</h3>
                <p className="text-xs text-slate-500">Cross-department sign-off for new batch launch, faculty payroll & budget release</p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold">
                Stage 3: CFO Financial Review
              </span>
            </div>
            <div className="py-2">
              <ApprovalFlowStepper currentStage={3} />
            </div>
          </div>

          {/* Revenue & Enrollment Trajectory Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Network Revenue & Enrollment Progression</h3>
                <p className="text-xs text-slate-500">6-Month historical billing and fee inflow telemetry</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                +18.4% Revenue Growth
              </span>
            </div>
            <TrendAnalyticsChart data={chartData} color="#3b82f6" />
          </div>
        </div>

        {/* Right Column: Financials, Roles, Inventory & Branch Comparison */}
        <div className="space-y-6">
          {/* Financial & Fee Realization Summary */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <span>💳</span> Financial Realization
              </h4>
              <span className="text-[11px] font-bold text-emerald-600">Q3 Active</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-emerald-900 font-semibold">Gross Fees Realized</span>
                <span className="font-bold text-emerald-700 font-mono text-sm">${stats.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-rose-50/60 rounded-xl border border-rose-100">
                <span className="text-rose-900 font-semibold">Pending Defaulters Dues</span>
                <span className="font-bold text-rose-700 font-mono text-sm">${stats.totalPendingFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
                <span className="text-blue-900 font-semibold">GST Invoices Dispatched</span>
                <span className="font-bold text-blue-700 font-mono">1,842 Cleared</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-600 font-medium">Refund Escrow Balance</span>
                <span className="font-bold text-slate-800 font-mono">$12,400</span>
              </div>
            </div>
          </div>

          {/* Role & Staff Hierarchy Distribution */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <span>👥</span> Branch Role & Staff Headcount
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Campus Directors / Admins</span>
                <span className="font-bold text-slate-900">{stats.campuses} Principals</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Heads of Department (HODs)</span>
                <span className="font-bold text-slate-900">18 Senior Leads</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Teaching Faculty</span>
                <span className="font-bold text-blue-600">{stats.totalTeachers} Educators</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Fee Cashiers & Accountants</span>
                <span className="font-bold text-slate-900">14 Cashiers</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Academic Counselors & Reception</span>
                <span className="font-bold text-slate-900">28 Telecallers</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Lab & Hardware Techs</span>
                <span className="font-bold text-slate-900">12 Technicians</span>
              </div>
            </div>
          </div>

          {/* Inventory Depot Snapshot */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <span>📦</span> Inventory Depot Snapshot
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200">
                1 Alert
              </span>
            </div>
            <div className="space-y-2">
              {inventorySnapshot.slice(0, 3).map((item) => (
                <div key={item.id} className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
                  <div className="font-bold text-slate-800 truncate">{item.name}</div>
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>Stock: <strong className="text-slate-800">{item.inStock} units</strong></span>
                    <span className={`font-semibold ${item.reorderStatus.includes('Low') ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {item.reorderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branch Student Distribution Benchmark */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-slate-800 mb-1">Campus Seat Load Benchmark</h4>
            <p className="text-xs text-slate-500">Student enrollment distribution across centers</p>
            <ComplianceBarChart data={capacityChart} color="#6366f1" />
          </div>
        </div>
      </div>

      {/* Detailed Campus Roster Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Multi-Tenant Campus Dossier & Capacity Status</h3>
            <p className="text-xs text-slate-500">Verified locations, directorship details, licensing tiers and live capacity percentages</p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('institutes_directory')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-sm"
          >
            Open Full Directory ➔
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Campus Title</th>
                <th className="py-3 px-4">Director & Dossier</th>
                <th className="py-3 px-4">Students / Capacity</th>
                <th className="py-3 px-4">Seat Load</th>
                <th className="py-3 px-4">Monthly Revenue</th>
                <th className="py-3 px-4">Licensing Tier</th>
                <th className="py-3 px-4 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {targetInstitutes.map((inst) => {
                const pct = Math.round((inst.metrics.students / inst.metrics.studentCapacity) * 100);
                return (
                  <tr key={inst.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{inst.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{inst.shortCode} • {inst.city}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{inst.director}</div>
                      <div className="text-[11px] text-slate-400">{inst.directorEmail}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {inst.metrics.students} / {inst.metrics.studentCapacity}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${pct > 90 ? 'bg-amber-500' : 'bg-blue-600'}`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-slate-800 text-[11px]">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600 text-sm">
                      ${inst.metrics.monthlyRevenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-[10px] font-bold">
                        {inst.packageTier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                        ● {inst.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
