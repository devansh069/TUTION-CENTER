import React, { useState } from 'react';
import KPICard from '../../components/common/KPICard';
import { INSTITUTES_DATA } from '../../data/erpData';

export default function BranchHierarchy({ instituteCode = 'ALL' }) {
  const [expandedCluster, setExpandedCluster] = useState('ALL');
  const [selectedFacility, setSelectedFacility] = useState(null);

  const clusters = [
    {
      id: 'cluster-na-east',
      name: 'North America East Cluster',
      leadDirector: 'Dr. Robert Chen, Ph.D.',
      headquarters: 'Manhattan, New York',
      campuses: INSTITUTES_DATA.filter(i => ['alpha', 'apex'].includes(i.code)),
      totalStudents: 2570,
      monthlyRevenue: '$177,000',
      activeFaculty: 86
    },
    {
      id: 'cluster-uk-europe',
      name: 'UK & Europe Regional Hub',
      leadDirector: 'Ms. Catherine Miller, FCA',
      headquarters: 'London, Central City',
      campuses: INSTITUTES_DATA.filter(i => ['beta'].includes(i.code)),
      totalStudents: 920,
      monthlyRevenue: '$68,000',
      activeFaculty: 32
    },
    {
      id: 'cluster-na-west',
      name: 'North America West Cluster',
      leadDirector: 'Eng. Marcus Vance, MS CS',
      headquarters: 'San Francisco, California',
      campuses: INSTITUTES_DATA.filter(i => ['delta'].includes(i.code)),
      totalStudents: 640,
      monthlyRevenue: '$52,000',
      activeFaculty: 24
    },
    {
      id: 'cluster-canada',
      name: 'Canada Regional Cluster',
      leadDirector: 'Barrister Elena Rostova, LL.M.',
      headquarters: 'Toronto, Ontario',
      campuses: INSTITUTES_DATA.filter(i => ['zenith'].includes(i.code)),
      totalStudents: 580,
      monthlyRevenue: '$48,000',
      activeFaculty: 21
    }
  ];

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Parent Apex Node"
          value="1 Master HQ"
          subtitle="EduZenith Global Cloud"
          icon="👑"
          badge="SOC-2 Certified"
        />
        <KPICard
          theme="emerald"
          title="Regional Clusters"
          value="4 Regional Zones"
          subtitle="Autonomous Center Heads"
          icon="🌐"
          badge="100% On-line"
        />
        <KPICard
          theme="amber"
          title="Affiliated Branches"
          value="5 Campus Nodes"
          subtitle="5,250 Total Desk Capacity"
          icon="🏢"
          badge="Zero Drift"
        />
        <KPICard
          theme="rose"
          title="Total Staff Hierarchy"
          value="231 Personnel"
          subtitle="163 Teachers • 68 Support"
          icon="👥"
          badge="Hierarchical"
        />
      </div>

      {/* Top Apex Node Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Master Root Governance Authority
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight">EduZenith Global Cloud Enterprise (Root HQ)</h2>
            <p className="text-xs text-slate-300">
              Super Admin Core Control • Global Database Ledger • Central Financial Settlement • Biometric AI Neural Gateway
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-white/10 rounded-xl text-xs font-bold border border-white/20">
              Multi-Tenant Architecture v4.2
            </span>
          </div>
        </div>
      </div>

      {/* Organizational Tree Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Regional Cluster & Branch Organogram</h3>
            <p className="text-xs text-slate-500">Autonomous regional governing directorates and campus physical topology</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpandedCluster('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                expandedCluster === 'ALL' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Expand All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {clusters.map((cluster) => (
            <div key={cluster.id} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              {/* Cluster Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌐</span>
                    <h4 className="font-extrabold text-slate-900 text-base">{cluster.name}</h4>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px] font-bold border border-blue-200">
                      {cluster.campuses.length} Campuses
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Lead Director: <strong className="text-slate-800">{cluster.leadDirector}</strong> • HQ: {cluster.headquarters}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <div className="text-slate-500 text-[10px]">Cluster Students</div>
                    <div className="font-bold text-slate-900">{cluster.totalStudents} Enrolled</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500 text-[10px]">Monthly Inflow</div>
                    <div className="font-mono font-bold text-emerald-600">{cluster.monthlyRevenue}</div>
                  </div>
                </div>
              </div>

              {/* Sub-Branch Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {cluster.campuses.map((campus) => (
                  <div key={campus.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs font-black text-blue-600">{campus.shortCode}</span>
                        <h5 className="font-bold text-slate-900 text-sm">{campus.name}</h5>
                        <p className="text-xs text-slate-500">{campus.city}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active Node
                      </span>
                    </div>

                    {/* Department Head Hierarchy */}
                    <div className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs space-y-1.5">
                      <div className="text-[10px] font-bold uppercase text-slate-400">Branch Leadership Matrix</div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">Campus Director:</span>
                        <span className="font-bold text-slate-900">{campus.director}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">Academic Dean:</span>
                        <span className="font-semibold text-slate-800">Assigned HOD Lead</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">Admissions & Accounts:</span>
                        <span className="font-semibold text-slate-800">Direct Branch Desks</span>
                      </div>
                    </div>

                    {/* Facility Floor Topology */}
                    <div className="space-y-1 text-xs text-slate-600">
                      <div className="text-[10px] font-bold uppercase text-slate-400">Physical Topology & Labs</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] mt-1">
                        <div className="p-1.5 bg-white rounded border border-slate-200">
                          🏢 <strong>{campus.metrics.batches * 2}</strong> Smart Classrooms
                        </div>
                        <div className="p-1.5 bg-white rounded border border-slate-200">
                          🧪 <strong>4</strong> High-Tech Laboratories
                        </div>
                        <div className="p-1.5 bg-white rounded border border-slate-200">
                          📸 <strong>4</strong> Facial AI Terminals
                        </div>
                        <div className="p-1.5 bg-white rounded border border-slate-200">
                          ⚡ <strong>99.8%</strong> Edge Gateway Uptime
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
