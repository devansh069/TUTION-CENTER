import React, { useState } from 'react';

export default function WalkinInquiries({ instituteCode }) {
  const walkins = [
    { token: 'WLK-108', student: 'Rohan Deshmukh', parent: 'Pradeep Deshmukh (Father)', center: 'Alpha Center Kota', time: '10:15 AM', status: 'With Director in Cabin 2', counselor: 'Pooja Nair' },
    { token: 'WLK-109', student: 'Ishita Jain', parent: 'Sadhna Jain (Mother)', center: 'Beta South Mumbai', time: '11:00 AM', status: 'Writing Scholarship Test', counselor: 'Vikram Joshi' },
    { token: 'WLK-110', student: 'Tanmay Bhatia', parent: 'Sanjay Bhatia (Father)', center: 'Apex Janakpuri', time: '11:45 AM', status: 'Waiting in Reception Lounge', counselor: 'Meera Rao' },
    { token: 'WLK-111', student: 'Zoya Khan', parent: 'Farhan Khan (Father)', center: 'Delta Koramangala', time: '12:20 PM', status: 'Fee Negotiation Stage', counselor: 'Pooja Nair' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-800">Branch Center Walk-in Reception Queue</h2>
            <p className="text-xs text-slate-500">Live reception queue tracking physical parent walk-ins, diagnostic tests and counselor allocation</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm">
            <span>+</span> Generate Visitor Pass
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Token & Visitor</th>
                <th className="py-3 px-4">Accompanying Parent</th>
                <th className="py-3 px-4">Branch Center</th>
                <th className="py-3 px-4">Check-in Time</th>
                <th className="py-3 px-4">Assigned Counselor</th>
                <th className="py-3 px-4 text-right">Queue State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {walkins.map((w) => (
                <tr key={w.token} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{w.student}</div>
                    <div className="text-[11px] text-blue-600 font-mono font-bold">{w.token}</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">{w.parent}</td>
                  <td className="py-3 px-4 font-medium text-slate-600">{w.center}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{w.time}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{w.counselor}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-bold text-[10px]">
                      {w.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
