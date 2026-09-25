import React from 'react';
import { ShieldCheck, HeartPulse, Siren, Lock } from 'lucide-react';

export default function CriticalLoadIndicator() {
  return (
    <div className="glass-card p-4 border-grid-emerald/30 bg-gradient-to-r from-grid-emerald/10 via-dark-800 to-grid-cyan/10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-grid-emerald/20 text-grid-emerald border border-grid-emerald/40 animate-pulse">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-sm uppercase tracking-wider text-grid-emerald">
              CRITICAL LOADS 100% PROTECTED
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-grid-emerald/20 text-grid-emerald border border-grid-emerald/40 font-mono font-bold flex items-center gap-1">
              <Lock className="w-3 h-3" /> ZERO CURTAILMENT
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            GridSense AI optimization strictly isolates and guarantees continuous power to healthcare and public safety loads.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900/60 border border-white/5 text-xs text-slate-300">
          <HeartPulse className="w-4 h-4 text-grid-rose" />
          <span>Health Clinic & Dialysis (8 kW)</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900/60 border border-white/5 text-xs text-slate-300">
          <Siren className="w-4 h-4 text-solar-400" />
          <span>Emergency & Streetlights (47 kW)</span>
        </div>
      </div>
    </div>
  );
}
