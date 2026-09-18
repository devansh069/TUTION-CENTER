import React from 'react';
import { BookOpen, Users, Video, Star, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { BATCH_SUBJECTS_TEACHERS_DATA } from '../../data/erpData';

export default function SubjectAllocationMatrix() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-3 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-indigo-600" /> Subject Allocation Matrix & Faculty Mapping
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dual educator mapping matrix (1 Online Masterclass Educator + 1 Offline Classroom Educator) for every subject.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Target Batch</th>
                <th className="p-3">Subject Title</th>
                <th className="p-3">Online Educator</th>
                <th className="p-3">AI Speech Score</th>
                <th className="p-3">Offline Educator</th>
                <th className="p-3">AI Speech Score</th>
                <th className="p-3 text-right">Allocation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BATCH_SUBJECTS_TEACHERS_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{item.batch}</td>
                  <td className="p-3 font-bold text-indigo-600">{item.subject}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img src={item.onlineTeacher.photo} alt={item.onlineTeacher.name} className="w-7 h-7 rounded-full object-cover border" />
                      <span className="font-bold text-slate-800">{item.onlineTeacher.name}</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{item.onlineTeacher.aiScore}%</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img src={item.offlineTeacher.photo} alt={item.offlineTeacher.name} className="w-7 h-7 rounded-full object-cover border" />
                      <span className="font-bold text-slate-800">{item.offlineTeacher.name}</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-800">
                    <span className={item.offlineTeacher.aiScore < 70 ? 'text-rose-600 font-extrabold' : 'text-emerald-600'}>
                      {item.offlineTeacher.aiScore}%
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {item.offlineTeacher.aiScore < 70 ? (
                      <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
                        Replacement Needed
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Optimal Mapping
                      </span>
                    )}
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
