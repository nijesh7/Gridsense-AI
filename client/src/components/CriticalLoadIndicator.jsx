import React from 'react';
import { ShieldCheck, HeartPulse, Siren, Lock } from 'lucide-react';

export default function CriticalLoadIndicator() {
  return (
    <div className="glass-card p-4 border border-emerald-300 dark:border-grid-emerald/30 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 dark:from-grid-emerald/10 dark:via-dark-800 dark:to-grid-cyan/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-grid-emerald/20 text-emerald-700 dark:text-grid-emerald border border-emerald-300 dark:border-grid-emerald/40 animate-pulse">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-sm uppercase tracking-wider text-emerald-700 dark:text-grid-emerald">
              CRITICAL LOADS 100% PROTECTED
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-grid-emerald/20 text-emerald-800 dark:text-grid-emerald border border-emerald-300 dark:border-grid-emerald/40 font-mono font-bold flex items-center gap-1">
              <Lock className="w-3 h-3" /> ZERO CURTAILMENT
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            GridSense AI optimization strictly isolates and guarantees continuous power to healthcare and public safety loads.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-dark-900/60 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
          <HeartPulse className="w-4 h-4 text-rose-500" />
          <span className="font-medium">Health Clinic & Dialysis (8 kW)</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-dark-900/60 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
          <Siren className="w-4 h-4 text-amber-500" />
          <span className="font-medium">Emergency & Streetlights (47 kW)</span>
        </div>
      </div>
    </div>
  );
}
