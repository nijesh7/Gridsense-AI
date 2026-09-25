import React from 'react';

export default function MetricCard({
  title,
  value,
  unit,
  subtitle,
  badge,
  badgeType = "info",
  progress = 0,
  accentColor = "emerald",
  icon: Icon
}) {
  const getBadgeStyle = () => {
    switch (badgeType) {
      case "danger":
        return "bg-grid-rose/15 text-grid-rose border-grid-rose/30";
      case "warning":
        return "bg-solar-500/15 text-solar-400 border-solar-500/30";
      case "success":
        return "bg-grid-emerald/15 text-grid-emerald border-grid-emerald/30";
      case "cyan":
        return "bg-grid-cyan/15 text-grid-cyan border-grid-cyan/30";
      default:
        return "bg-slate-700/40 text-slate-300 border-slate-600/40";
    }
  };

  const getBarColor = () => {
    switch (accentColor) {
      case "rose": return "bg-grid-rose";
      case "amber": return "bg-solar-500";
      case "cyan": return "bg-grid-cyan";
      default: return "bg-grid-emerald";
    }
  };

  return (
    <div className="glass-card-hover p-5 relative overflow-hidden group">
      {/* Top ambient glow bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${getBarColor()}`} />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        {badge && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle()}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{unit}</span>}
      </div>

      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{subtitle}</p>}

      {/* Mini Progress */}
      {progress !== undefined && (
        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getBarColor()}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
