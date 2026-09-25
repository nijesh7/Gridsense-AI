import React from 'react';
import { Sun, Battery, Building2, HeartPulse, Zap, ShieldCheck, Cpu } from 'lucide-react';

export default function EnergyFlowDiagram({ solarKW = 70, demandKW = 90, batteryKW = 12, gapKW = 20, isOptimized = true }) {
  return (
    <div className="glass-card p-6 relative overflow-hidden bg-gradient-to-b from-dark-800 to-dark-900 border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-extrabold text-base text-white">
              Live Microgrid Energy Flow
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-grid-emerald/20 text-grid-emerald border border-grid-emerald/40 font-bold animate-pulse">
              ● REAL-TIME DISPATCH
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Interactive visualization: See how clean solar and battery buffer are intelligently routed
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-solar-400">
            <span className="w-2 h-2 rounded-full bg-solar-500 animate-ping" /> Solar Flow
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5 text-grid-cyan">
            <span className="w-2 h-2 rounded-full bg-grid-cyan animate-ping" /> Battery Discharge
          </span>
        </div>
      </div>

      {/* Responsive Visual Diagram Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-2 relative">
        {/* Node 1: Solar Generation */}
        <div className="glass-card p-4 border-solar-500/30 bg-solar-500/5 hover:border-solar-500/60 transition-all text-center space-y-2 group">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-solar-500/20 text-solar-400 flex items-center justify-center border border-solar-500/40 shadow-glow-amber group-hover:scale-105 transition-transform">
            <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <span className="font-heading font-bold text-sm text-white block">Rooftop Solar PV</span>
            <span className="font-mono font-extrabold text-base text-solar-400">{solarKW} kW</span>
            <span className="text-[10px] text-slate-400 block">Clean Local Supply</span>
          </div>
        </div>

        {/* Animated Connector 1 */}
        <div className="hidden md:flex flex-col items-center justify-center text-solar-400">
          <span className="text-[10px] font-mono font-bold mb-1">{solarKW} kW</span>
          <div className="w-full h-1 bg-gradient-to-r from-solar-500 to-grid-emerald rounded-full relative overflow-hidden">
            <div className="w-1/3 h-full bg-white rounded-full animate-pulse" />
          </div>
          <span className="text-xs mt-1 font-bold">➔</span>
        </div>

        {/* Node 2: GridSense AI Intelligence Core */}
        <div className="glass-card p-5 border-grid-emerald/40 bg-gradient-to-tr from-dark-800 via-grid-emerald/10 to-grid-cyan/10 text-center space-y-2 relative shadow-glow-emerald">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-grid-emerald text-dark-900 font-mono font-extrabold text-[9px] uppercase tracking-wider">
            AI Brain
          </div>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-grid-emerald to-grid-cyan p-0.5 shadow-2xl">
            <div className="w-full h-full bg-dark-900 rounded-[14px] flex items-center justify-center text-grid-emerald">
              <Cpu className="w-7 h-7" />
            </div>
          </div>
          <div>
            <span className="font-heading font-extrabold text-sm text-white block">GridSense Core</span>
            <span className="text-[11px] font-mono text-grid-emerald font-bold">
              {isOptimized ? "Coordinating" : "Deficit Alert"}
            </span>
            <span className="text-[10px] text-slate-400 block">FDR-001 Sub-Grid</span>
          </div>
        </div>

        {/* Animated Connector 2 */}
        <div className="hidden md:flex flex-col items-center justify-center text-grid-emerald">
          <span className="text-[10px] font-mono font-bold mb-1">
            {isOptimized ? "Optimized" : "Stressed"}
          </span>
          <div className="w-full h-1 bg-gradient-to-r from-grid-emerald to-grid-cyan rounded-full relative overflow-hidden">
            <div className="w-1/3 h-full bg-white rounded-full animate-pulse" />
          </div>
          <span className="text-xs mt-1 font-bold">➔</span>
        </div>

        {/* Node 3: 100 Homes & Amenities */}
        <div className="glass-card p-4 border-grid-cyan/30 bg-grid-cyan/5 hover:border-grid-cyan/60 transition-all text-center space-y-2 group">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-grid-cyan/20 text-grid-cyan flex items-center justify-center border border-grid-cyan/40 shadow-glow-cyan group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-bold text-sm text-white block">100 Households</span>
            <span className="font-mono font-extrabold text-base text-grid-cyan">{demandKW} kW</span>
            <span className="text-[10px] text-slate-400 block">EVs + Pumps + Shops</span>
          </div>
        </div>
      </div>

      {/* Sub-Branch: Battery Buffer & Critical Clinic Safeguard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-900/60 border border-white/5">
          <div className="p-2 rounded-lg bg-grid-cyan/15 text-grid-cyan border border-grid-cyan/30">
            <Battery className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-bold">Community Battery Storage</span>
              <span className="font-mono text-grid-cyan font-bold">+{batteryKW} kW Injection</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              100 kWh storage asset safely provides peak backup without dropping below the 20% floor reserve.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-grid-emerald/10 border border-grid-emerald/30">
          <div className="p-2 rounded-lg bg-grid-emerald/20 text-grid-emerald border border-grid-emerald/40 animate-pulse">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-bold">Health Clinic & Emergency Circuit</span>
              <span className="font-mono text-grid-emerald font-bold">8.0 kW 100% PROTECTED</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Zero curtailment guarantee: Dialysis and vaccine cold-storage are hard-locked with uninterrupted power.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
