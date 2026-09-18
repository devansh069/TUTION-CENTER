import React from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';

export default function AdmissionQueriesReports({ instituteCode }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard theme="indigo" title="Lead Acquisition Cost" value="₹1,240 / Lead" subtitle="Blended Digital + Ground" icon="💰" badge="Optimal" />
        <KPICard theme="emerald" title="Gross Converted Revenue" value="₹2.45 Cr" subtitle="Advance Tokens Collected" icon="📈" trend="+18%" badge="Beat Target" />
        <KPICard theme="amber" title="Average Days to Close" value="4.2 Days" subtitle="First Call to Deposit" icon="⚡" badge="High Velocity" />
        <KPICard theme="rose" title="Lead Drop-off Rate" value="14.8%" subtitle="Stage 2 to 3" icon="📉" badge="Audited" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">Monthly Admission Inquiries Inflow</h3>
          <p className="text-xs text-slate-500 mb-4">Total lead volume across all 5 centers</p>
          <TrendAnalyticsChart
            data={[
              { label: 'Apr', value: 680 },
              { label: 'May', value: 920 },
              { label: 'Jun', value: 1482 },
              { label: 'Jul', value: 1210 },
              { label: 'Aug', value: 890 },
              { label: 'Sep', value: 1040 },
            ]}
            color="#3b82f6"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">Inquiry Source Share</h3>
          <p className="text-xs text-slate-500 mb-4">Breakdown by channel</p>
          <ComplianceBarChart
            data={[
              { label: 'School Seminar', value: 480 },
              { label: 'Google Ads', value: 390 },
              { label: 'Parent Referral', value: 310 },
              { label: 'Walk-ins', value: 180 },
              { label: 'Social Media', value: 122 },
            ]}
            color="#6366f1"
          />
        </div>
      </div>
    </div>
  );
}
