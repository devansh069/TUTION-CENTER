import React, { useState } from 'react';
import KPICard from '../../components/common/KPICard';
import { TrendAnalyticsChart, ComplianceBarChart } from '../../components/common/Charts';
import ApprovalFlowStepper from '../../components/common/ApprovalFlowStepper';
import { MOCK_TUITION_CENTERS } from '../../data/erpData';

export default function AdmissionQueriesDashboard({ instituteCode, onNavigate }) {
  const [selectedFunnel, setSelectedFunnel] = useState('ALL');

  const inquiryLeads = [
    { id: 'INQ-9401', student: 'Rohan Deshmukh', phone: '+91 98201 44891', course: 'IIT-JEE 2027 Dropper', source: 'Google Ads', status: 'Counseling Scheduled', counselor: 'Pooja Nair', date: 'Today, 10:15 AM' },
    { id: 'INQ-9402', student: 'Ananya Singhal', phone: '+91 98112 55902', course: 'NEET Medical Crash Course', source: 'School Seminar', status: 'Walk-in Demo Taken', counselor: 'Vikram Joshi', date: 'Today, 11:30 AM' },
    { id: 'INQ-9403', student: 'Kabir Sengupta', phone: '+91 98303 66103', course: 'Foundation Class 10 NTSE', source: 'Parent Referral', status: 'Token Advance Paid', counselor: 'Pooja Nair', date: 'Today, 12:45 PM' },
    { id: 'INQ-9404', student: 'Diya Murthy', phone: '+91 98404 77204', course: 'CBSE + JEE 2-Yr Integrated', source: 'Instagram Lead', status: 'Follow-up Call 2', counselor: 'Meera Rao', date: 'Yesterday' },
    { id: 'INQ-9405', student: 'Aarav Choudhary', phone: '+91 98705 88305', course: 'Olympiad Mathematics', source: 'Website Inquiry', status: 'Scholarship Test Booked', counselor: 'Vikram Joshi', date: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Total Inquiries Received"
          value="1,482 Leads"
          subtitle="Current Academic Drive"
          icon="📥"
          trend="+28%"
          badge="High Velocity"
        />
        <KPICard
          theme="emerald"
          title="Walk-in & Demo Rate"
          value="42.6%"
          subtitle="632 Center Visits"
          icon="🚶‍♂️"
          trend="+6.4%"
          badge="Conversion Lead"
        />
        <KPICard
          theme="amber"
          title="Token Advance Converted"
          value="318 Enrolled"
          subtitle="₹2.45 Cr Forecasted"
          icon="🎯"
          badge="21.4% Final"
        />
        <KPICard
          theme="rose"
          title="Unassigned Inquiries"
          value="9 Leads"
          subtitle="SLA Breached >4 Hours"
          icon="⏳"
          badge="Action Req."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Active Inquiry & Lead Funnel Pipeline</h3>
                <p className="text-xs text-slate-500">Real-time incoming leads from Web, School Seminars, Walk-ins and Referrals</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onNavigate('queries_leads')} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition">
                  Full Funnel 📊
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Lead ID & Student</th>
                    <th className="py-3 px-4">Target Course</th>
                    <th className="py-3 px-4">Lead Source</th>
                    <th className="py-3 px-4">Pipeline Status</th>
                    <th className="py-3 px-4">Counselor</th>
                    <th className="py-3 px-4 text-right">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiryLeads.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{item.student}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{item.id} • {item.phone}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">{item.course}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200">
                          {item.source}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.status.includes('Paid') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          item.status.includes('Walk-in') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          item.status.includes('Scheduled') ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-semibold">{item.counselor}</td>
                      <td className="py-3 px-4 text-right text-slate-500">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1">Standard 5-Step Admission Conversion Journey</h3>
            <p className="text-xs text-slate-500 mb-4">From initial telecall inquiry to scholarship test, demo session and seat confirmation</p>
            <ApprovalFlowStepper currentStage={3} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Lead Conversion by Branch Center</h3>
            <p className="text-xs text-slate-500 mb-4">Admissions finalized per center this cycle</p>
            <ComplianceBarChart
              data={[
                { label: 'Alpha Kota', value: 114 },
                { label: 'Beta Mumbai', value: 86 },
                { label: 'Apex Delhi', value: 72 },
                { label: 'Delta BLR', value: 46 },
              ]}
              color="#3b82f6"
            />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">⚡ Instant Lead Auto-Dialer SLA</h4>
            <p className="text-xs text-blue-700 leading-relaxed mb-4">
              92% of online web inquiries are connected to an academic counselor within 15 minutes. Parent response satisfaction rating: 4.8 / 5.0.
            </p>
            <button onClick={() => onNavigate('queries_walkin')} className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm transition">
              View Walk-in Center Reception Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
