import React from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';

export default function RolesReports({ instituteCode }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard theme="indigo" title="Access Governance Score" value="99.4%" subtitle="Zero Trust Index" icon="🛡️" badge="SOC-2 Ready" />
        <KPICard theme="emerald" title="Credential Rotations" value="100% On-Time" subtitle="90-Day Policy" icon="🔄" badge="Optimal" />
        <KPICard theme="amber" title="Inactive Accounts Purged" value="14 Accounts" subtitle="Last 30 Days" icon="🧹" badge="Compliant" />
        <KPICard theme="rose" title="Elevation Requests" value="3 Pending" subtitle="Director Sign-off" icon="⏳" badge="Action Req." />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">Privilege Elevation Velocity (Last 6 Months)</h3>
          <p className="text-xs text-slate-500 mb-4">Requests raised vs approved vs rejected</p>
          <TrendAnalyticsChart
            data={[
              { label: 'Apr', value: 8 },
              { label: 'May', value: 12 },
              { label: 'Jun', value: 15 },
              { label: 'Jul', value: 9 },
              { label: 'Aug', value: 11 },
              { label: 'Sep', value: 6 },
            ]}
            color="#6366f1"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">MFA Adoption Breakdown by Branch</h3>
          <p className="text-xs text-slate-500 mb-4">Percentage of users with hardware token or TOTP configured</p>
          <ComplianceBarChart
            data={[
              { label: 'Alpha Kota', value: 100 },
              { label: 'Beta Mumbai', value: 98 },
              { label: 'Apex Delhi', value: 97 },
              { label: 'Delta BLR', value: 100 },
              { label: 'Zenith HYD', value: 95 },
            ]}
            color="#10b981"
          />
        </div>
      </div>
    </div>
  );
}
