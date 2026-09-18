import React from 'react';

export default function KPICard({ title, value, subtext, icon: Icon, color = 'blue', badge }) {
  const colorSchemes = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50/90 to-indigo-100/70 border-blue-200/80',
      iconBg: 'bg-blue-600 text-white',
      textColor: 'text-blue-950',
      titleColor: 'text-blue-900',
      subColor: 'text-blue-700',
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50/90 to-orange-100/70 border-amber-200/80',
      iconBg: 'bg-amber-500 text-white',
      textColor: 'text-amber-950',
      titleColor: 'text-amber-900',
      subColor: 'text-amber-700',
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-50/90 to-teal-100/70 border-emerald-200/80',
      iconBg: 'bg-emerald-600 text-white',
      textColor: 'text-emerald-950',
      titleColor: 'text-emerald-900',
      subColor: 'text-emerald-700',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50/90 to-fuchsia-100/70 border-purple-200/80',
      iconBg: 'bg-purple-600 text-white',
      textColor: 'text-purple-950',
      titleColor: 'text-purple-900',
      subColor: 'text-purple-700',
    },
    cyan: {
      bg: 'bg-gradient-to-br from-cyan-50/90 to-sky-100/70 border-cyan-200/80',
      iconBg: 'bg-cyan-600 text-white',
      textColor: 'text-cyan-950',
      titleColor: 'text-cyan-900',
      subColor: 'text-cyan-700',
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50/90 to-pink-100/70 border-rose-200/80',
      iconBg: 'bg-rose-600 text-white',
      textColor: 'text-rose-950',
      titleColor: 'text-rose-900',
      subColor: 'text-rose-700',
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <div className={`p-5 rounded-2xl border ${scheme.bg} shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs font-bold uppercase tracking-wider ${scheme.titleColor}`}>
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl ${scheme.iconBg} shadow-xs group-hover:scale-105 transition-transform`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <h3 className={`font-heading text-3xl font-extrabold ${scheme.textColor}`}>
          {value}
        </h3>
        {badge && (
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/80 text-slate-800">
            {badge}
          </span>
        )}
      </div>

      {subtext && (
        <p className={`text-xs mt-1.5 font-semibold ${scheme.subColor} flex items-center`}>
          {subtext}
        </p>
      )}
    </div>
  );
}
