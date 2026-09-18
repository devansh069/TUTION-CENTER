import React from 'react';

export default function CalendarMatrix({ 
  title = "Monthly Schedule / Attendance Matrix", 
  subtitle = "September, 2026",
  hoursLoggedText = "142 / 184 hrs logged",
  calendarDays: customDays = null,
  onSelectDay = null,
  selectedDayNum = null
}) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Default sample 5 weeks of September 2026 if none provided
  const defaultCalendarDays = [
    { num: 31, status: 'prev' },
    { num: 1, status: 'submitted', hours: '6.5h' },
    { num: 2, status: 'approved', hours: '7.0h' },
    { num: 3, status: 'approved', hours: '6.0h' },
    { num: 4, status: 'approved', hours: '8.0h' },
    { num: 5, status: 'weekend' },
    { num: 6, status: 'weekend' },
    { num: 7, status: 'approved', hours: '6.5h' },
    { num: 8, status: 'approved', hours: '7.5h' },
    { num: 9, status: 'approved', hours: '6.0h' },
    { num: 10, status: 'submitted', hours: '7.0h' },
    { num: 11, status: 'approved', hours: '8.0h' },
    { num: 12, status: 'weekend' },
    { num: 13, status: 'weekend' },
    { num: 14, status: 'approved', hours: '7.0h' },
    { num: 15, status: 'approved', hours: '6.5h' },
    { num: 16, status: 'submitted', hours: '8.0h' },
    { num: 17, status: 'approved', hours: '7.5h' },
    { num: 18, status: 'approved', hours: '6.0h' },
    { num: 19, status: 'weekend' },
    { num: 20, status: 'weekend' },
    { num: 21, status: 'draft', hours: '7.0h' },
    { num: 22, status: 'draft', hours: '6.5h' },
    { num: 23, status: 'not_filled' },
    { num: 24, status: 'not_filled' },
    { num: 25, status: 'not_filled' },
    { num: 26, status: 'weekend' },
    { num: 27, status: 'weekend' },
    { num: 28, status: 'not_filled' },
    { num: 29, status: 'not_filled' },
    { num: 30, status: 'not_filled' },
  ];

  const calendarDays = customDays || defaultCalendarDays;

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-heading text-base font-bold text-slate-900">{title}</h3>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{subtitle}</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
          {hoursLoggedText}
        </span>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {days.map(d => (
          <div key={d} className="text-[11px] font-bold text-slate-500 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar Day Cells */}
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {calendarDays.map((d, i) => {
          let cellStyle = "bg-slate-50 border-slate-200 text-slate-700";
          if (d.status === 'weekend') cellStyle = "bg-slate-100/60 border-slate-200 text-slate-400";
          if (d.status === 'approved') cellStyle = "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold";
          if (d.status === 'submitted') cellStyle = "bg-amber-50 border-amber-200 text-amber-800 font-bold";
          if (d.status === 'draft') cellStyle = "bg-blue-50 border-blue-200 text-blue-800 font-semibold";
          if (d.status === 'prev') cellStyle = "bg-slate-50 border-transparent text-slate-300";

          const isSelected = selectedDayNum && d.num === selectedDayNum && d.status !== 'prev';

          return (
            <div 
              key={i} 
              onClick={() => onSelectDay && d.status !== 'prev' && onSelectDay(d)}
              className={`p-2 rounded-xl border text-xs flex flex-col items-center justify-center transition-all ${
                onSelectDay ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'
              } ${isSelected ? 'ring-2 ring-indigo-600 shadow-sm' : ''} ${cellStyle}`}
              title={d.status !== 'prev' ? `Day ${d.num}: ${d.hours || 'No hours'} (${d.status})` : ''}
            >
              <span className="font-extrabold text-[11px]">{d.num}</span>
              {d.hours ? (
                <span className="text-[9px] mt-0.5 opacity-90">{d.hours}</span>
              ) : (
                <span className="text-[9px] mt-0.5 opacity-40">-</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-600">
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-1.5" /> Submitted / Late</span>
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" /> Approved / On-Time</span>
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 mr-1.5" /> Draft / Half-Day</span>
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 mr-1.5" /> Not Filled / Absent</span>
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-slate-200 mr-1.5" /> Weekend / Holiday</span>
      </div>
    </div>
  );
}
