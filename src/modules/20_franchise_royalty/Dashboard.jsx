import React from 'react';
import { Crown, CheckCircle2, DollarSign, Award, ShieldCheck, TrendingUp } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { FRANCHISE_ROYALTY_DATA } from '../../data/erpData';

export default function FranchiseRoyaltyDashboard({ instituteCode = 'all' }) {
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';
  const filtered = FRANCHISE_ROYALTY_DATA.filter(f => isAll || f.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-3 border-b border-slate-200">
        <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-extrabold uppercase tracking-wide border border-amber-200">
          Module 20 • Multi-Tenant Franchise Governance
        </span>
        <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
          <Crown className="w-6.5 h-6.5 mr-2 text-amber-600" /> Franchise & Multi-Branch Royalty
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Global multi-branch P&L settlements, monthly royalty percentage realization, franchisee contracts, and brand compliance audits.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Gross Franchise Revenue" value="$159,000" subtext="Aggregated September Cycle" icon={DollarSign} color="green" />
        <KPICard title="Total Royalty Realized" value="$17,750" subtext="Average 11.2% Royalty Fee" icon={Crown} color="amber" />
        <KPICard title="Active Franchise Centers" value="5 Centers" subtext="Licensed Academy Partners" icon={Award} color="blue" />
        <KPICard title="Brand Compliance Score" value="96.3% Avg" subtext="Annual Quality Audits Met" icon={ShieldCheck} color="purple" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <h3 className="font-heading text-sm font-bold text-slate-900 mb-4">Franchise Royalty & P&L Settlement Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Franchise Center</th>
                <th className="p-3">Franchisee Entity</th>
                <th className="p-3">Gross Revenue</th>
                <th className="p-3">Royalty %</th>
                <th className="p-3">Royalty Due</th>
                <th className="p-3">Settlement Status</th>
                <th className="p-3 text-right">Brand Audit Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(f => (
                <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{f.centerName}</td>
                  <td className="p-3 text-slate-600">{f.franchisee}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">${f.grossRevenue.toLocaleString()}</td>
                  <td className="p-3 font-mono text-indigo-600 font-bold">{f.royaltyRate}</td>
                  <td className="p-3 font-mono font-black text-amber-600">${f.monthlyRoyaltyDue.toLocaleString()}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{f.settlementStatus}</span></td>
                  <td className="p-3 text-right font-mono font-bold text-purple-700">{f.complianceScore}% Verified</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
