import React from 'react';
import { Building2, Users, Receipt, MapPin, TrendingUp, AlertTriangle, Building, Briefcase } from 'lucide-react';
import { FRANCHISE_METRICS, BRANCHES } from './franchiseData';

export default function Dashboard({ onNavigate }) {
  const KPICard = ({ title, value, subtext, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-colors">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 ${color} blur-2xl group-hover:opacity-10 transition-opacity`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-black text-slate-900">{value}</h3>
          <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
            {trend && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
            {subtext}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-slate-700`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Franchisees"
          value={FRANCHISE_METRICS.totalActiveBranches}
          subtext={`${FRANCHISE_METRICS.onboardingBranches} currently onboarding`}
          icon={Building2}
          color="bg-indigo-500"
        />
        <KPICard
          title="Monthly Royalty"
          value={`₹${(FRANCHISE_METRICS.totalRoyaltyCurrentMonth / 100000).toFixed(2)}L`}
          subtext={`+${FRANCHISE_METRICS.royaltyGrowthYoY}% YoY Growth`}
          icon={Receipt}
          color="bg-emerald-500"
          trend
        />
        <KPICard
          title="Avg. Compliance"
          value={`${FRANCHISE_METRICS.avgComplianceScore}%`}
          subtext="Legal & brand guidelines"
          icon={AlertTriangle}
          color="bg-amber-500"
        />
        <KPICard
          title="Total Reach"
          value="18,400+"
          subtext="Students across all networks"
          icon={Users}
          color="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Active Branches Network</h3>
            <button 
              onClick={() => onNavigate('01_institutes_branches', 'institutes_directory')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              View Full Directory &rarr;
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="px-4 py-3">Branch & Location</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Royalty Model</th>
                  <th className="px-4 py-3">Compliance</th>
                  <th className="px-4 py-3 text-right">M. Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BRANCHES.filter(b => b.status === 'Active').map(branch => (
                  <tr key={branch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{branch.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {branch.region}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{branch.owner}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-indigo-700">{branch.royaltyModel}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        branch.complianceScore >= 95 ? 'bg-emerald-50 text-emerald-700' :
                        branch.complianceScore >= 80 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {branch.complianceScore}% Score
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-black text-slate-900">
                      ₹{(branch.monthlyRevenue / 100000).toFixed(2)}L
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Branch Onboarding Pipeline', icon: Building, color: 'text-indigo-600', bg: 'bg-indigo-50', page: 'branch_onboarding' },
              { label: 'Royalty Ledgers & Invoicing', icon: Receipt, color: 'text-emerald-600', bg: 'bg-emerald-50', page: 'royalty_ledgers' },
              { label: 'Resource & Stock Requisitions', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50', page: 'resource_requisitions' }
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate('20_franchise_royalty', action.page)}
                className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${action.bg} ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {action.label}
                  </span>
                </div>
                <span className="text-slate-400 group-hover:text-slate-600 transition-colors">&rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
