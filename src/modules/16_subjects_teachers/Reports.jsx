import React from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';

export default function SubjectsTeachersReports({ instituteCode }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard theme="indigo" title="Syllabus Completion Index" value="94.2%" subtitle="On-Track for JEE / NEET" icon="🎯" badge="Optimal" />
        <KPICard theme="emerald" title="Faculty Retention Rate" value="96.5%" subtitle="Annualized Metric" icon="🤝" badge="Industry Best" />
        <KPICard theme="amber" title="Student Satisfaction" value="4.82 / 5.0" subtitle="From Parent & Student App" icon="⭐" badge="Excellent" />
        <KPICard theme="rose" title="Substitute Lectures" value="6 Required" subtitle="Medical / Leave Covers" icon="🔄" badge="Handled" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">Faculty Utilization Trend (Hrs/Week)</h3>
          <p className="text-xs text-slate-500 mb-4">Optimal ceiling is 26 hours / week</p>
          <TrendAnalyticsChart
            data={[
              { label: 'Apr', value: 21 },
              { label: 'May', value: 23 },
              { label: 'Jun', value: 25 },
              { label: 'Jul', value: 24 },
              { label: 'Aug', value: 24.5 },
              { label: 'Sep', value: 24.2 },
            ]}
            color="#0ea5e9"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">Student Feedback Distribution by Dept</h3>
          <p className="text-xs text-slate-500 mb-4">Average ratings out of 5</p>
          <ComplianceBarChart
            data={[
              { label: 'Physics', value: 4.88 },
              { label: 'Maths', value: 4.85 },
              { label: 'Org Chem', value: 4.79 },
              { label: 'Botany', value: 4.90 },
              { label: 'Zoology', value: 4.82 },
            ]}
            color="#10b981"
          />
        </div>
      </div>
    </div>
  );
}
