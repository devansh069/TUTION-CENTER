import React, { useState, useMemo } from 'react';
import KPICard from '../../components/common/KPICard';
import { BATCHES_DATA } from '../../data/erpData';

export default function BatchSchedule({ instituteCode = 'ALL' }) {
  const [selectedDay, setSelectedDay] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all individual timetable slots across batches
  const allSlots = useMemo(() => {
    const slots = [];
    const targetBatches = instituteCode === 'ALL'
      ? BATCHES_DATA
      : BATCHES_DATA.filter(b => b.instituteCode === instituteCode);

    targetBatches.forEach(batch => {
      batch.schedule?.forEach(slot => {
        slots.push({
          ...slot,
          batchId: batch.id,
          batchName: batch.name,
          batchCode: batch.code,
          batchGoal: batch.goal,
          instituteName: batch.instituteName,
          students: batch.students,
          capacity: batch.capacity
        });
      });
    });

    return slots;
  }, [instituteCode]);

  // Filter slots
  const filteredSlots = useMemo(() => {
    return allSlots.filter(slot => {
      const matchDay = selectedDay === 'ALL' || slot.day.toLowerCase() === selectedDay.toLowerCase();
      const matchSearch =
        slot.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.room.toLowerCase().includes(searchTerm.toLowerCase());
      return matchDay && matchSearch;
    });
  }, [allSlots, selectedDay, searchTerm]);

  return (
    <div className="space-y-6">
      {/* 4 Pastel KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          theme="indigo"
          title="Scheduled Lecture Slots"
          value={`${allSlots.length} Weekly Sessions`}
          subtitle="Mon - Sat Academic Timetable"
          icon="🗓️"
          badge="100% Conflict-Free"
        />
        <KPICard
          theme="emerald"
          title="Smart Lecture Halls"
          value="18 Halls in Use"
          subtitle="Avg Occupancy: 91.2%"
          icon="🏢"
          badge="Equipped with 4K PTZ"
        />
        <KPICard
          theme="amber"
          title="Peak Time Saturation"
          value="08:00 - 12:30"
          subtitle="Morning Entrance Slots"
          icon="⏱️"
          badge="98% Peak Load"
        />
        <KPICard
          theme="rose"
          title="Hybrid WebRTC Live"
          value={`${allSlots.filter(s => s.isLive).length} Streaming Slots`}
          subtitle="Cloud CDN Broadcast to App"
          icon="🎥"
          badge="60fps Zero-Jitter"
        />
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search by subject, educator, batch or lecture hall..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Day of Week Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['ALL', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedDay === day
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {day === 'ALL' ? 'All Days' : day.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            Showing <strong className="text-slate-800">{filteredSlots.length}</strong> Lecture Slots
          </span>
          <button 
            onClick={() => alert("Timetable Slot Creator wizard opened.")}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5"
          >
            <span>+</span> Allocate New Slot
          </button>
        </div>
      </div>

      {/* Timetable Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSlots.map((slot, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              {/* Day & Live Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-200">
                  {slot.day} • {slot.time}
                </span>
                {slot.isLive ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                    Live Streaming
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold">
                    In-Person Lecture
                  </span>
                )}
              </div>

              {/* Subject & Teacher */}
              <div>
                <h4 className="font-black text-slate-900 text-base">{slot.subject}</h4>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  Educator: <strong className="text-blue-600">{slot.teacher}</strong>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Batch: <strong>{slot.batchName}</strong> ({slot.batchId})
                </p>
              </div>

              {/* Goal */}
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-200/70 text-[11px] font-semibold text-amber-900">
                🎯 {slot.batchGoal}
              </div>

              {/* Room & Capacity */}
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex justify-between items-center">
                <span>Classroom: <strong className="text-slate-800">{slot.room}</strong></span>
                <span className="font-mono font-bold text-slate-800">{slot.students} / {slot.capacity} Desks</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500">{slot.instituteName}</span>
              <button
                onClick={() => alert(`Launching Classroom Camera link for ${slot.room}`)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                Camera Feed 📹
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
