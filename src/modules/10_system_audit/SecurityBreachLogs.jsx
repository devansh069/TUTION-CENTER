import React from 'react';
import { AlertTriangle, ShieldCheck, Server } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function SecurityBreachLogs() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <ShieldCheck className="w-6 h-6 mr-2 text-emerald-600" /> Security Breach Logs & Anomaly Detection
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time intrusion detection telemetry, failed login attempts, and geo-ip blocking.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Breach Incidents" value="0 Incidents" subtext="Zero Security Breaches" icon={ShieldCheck} color="green" />
        <KPICard title="Blocked Brute-force" value="14 IPs Blocked" subtext="Automated WAF Guard" icon={AlertTriangle} color="amber" />
        <KPICard title="Encrypted DB Nodes" value="100% AES-256" subtext="Multi-Tenant Isolation" icon={Server} color="purple" />
        <KPICard title="Security Health" value="Grade A+" subtext="Penetration Tested" icon={ShieldCheck} color="blue" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-heading text-base font-bold text-slate-900">Security Guard Wall Summary</h3>
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
          ✓ All 5 Tuition Center Database Clusters are operating with row-level tenant security isolation.
        </div>
      </div>
    </div>
  );
}
