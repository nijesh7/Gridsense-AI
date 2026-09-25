import React from 'react';
import { Battery, Zap, ShieldCheck } from 'lucide-react';

export default function BatterySocChart({ soc = 68, powerKW = 12.0, status = "DISCHARGING BUFFER" }) {
  const isCharging = powerKW < 0;
  const isDischarging = powerKW > 0;

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-dark-800/90 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-grid-cyan/15 text-grid-cyan border border-grid-cyan/30">
            <Battery className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white text-sm">Community Battery Storage</h4>
            <p className="text-xs text-slate-400">100 kWh LiFePO4 BESS</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
          isDischarging ? 'bg-solar-500/15 text-solar-400 border border-solar-500/30' : 'bg-grid-emerald/15 text-grid-emerald border border-grid-emerald/30'
        }`}>
          {status}
        </span>
      </div>

      {/* Battery SOC Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-slate-400">State of Charge (SOC)</span>
          <span className="font-mono font-bold text-lg text-white">{soc}%</span>
        </div>
        <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden relative border border-slate-700">
          <div
            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-grid-cyan to-grid-emerald"
            style={{ width: `${Math.min(100, soc)}%` }}
          />
          {/* 20% minimum floor line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-grid-rose z-10"
            style={{ left: '20%' }}
            title="20% Emergency Floor"
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>0%</span>
          <span className="text-grid-rose font-bold">20% Reserve Floor</span>
          <span>100% (100 kWh)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
        <div className="bg-dark-900/60 p-2.5 rounded-xl border border-white/5">
          <span className="text-[11px] text-slate-400 block">Deliverable Power</span>
          <span className="font-mono font-bold text-white text-sm flex items-center gap-1 mt-0.5">
            <Zap className="w-3.5 h-3.5 text-solar-400" />
            {powerKW} kW
          </span>
        </div>
        <div className="bg-dark-900/60 p-2.5 rounded-xl border border-white/5">
          <span className="text-[11px] text-slate-400 block">Reserve Protection</span>
          <span className="font-mono font-bold text-grid-emerald text-sm flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-grid-emerald" />
            20 kWh Floor
          </span>
        </div>
      </div>
    </div>
  );
}
