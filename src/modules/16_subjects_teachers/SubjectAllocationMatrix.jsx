import React, { useState } from 'react';
import { MOCK_FACULTY } from '../../data/erpData';

export default function SubjectAllocationMatrix({ instituteCode }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-800">Faculty-Subject Mapping Matrix</h2>
            <p className="text-xs text-slate-500">Cross-center faculty deployment, specialization topics and lecture delivery allocations</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm">
            <span>+</span> Assign New Subject Slot
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Primary Specialization</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Base Branch</th>
                <th className="py-3 px-4">Current Batches Assigned</th>
                <th className="py-3 px-4 text-right">Student Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_FACULTY.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{f.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{f.id} • {f.qualification}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded font-bold text-[11px]">
                      {f.subject}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">{f.designation}</td>
                  <td className="py-3 px-4 font-semibold text-slate-600">{f.center}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">3 Batches (JEE-Adv 2026, 2027)</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-bold text-[10px]">
                      ⭐ {f.rating} / 5.0
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
