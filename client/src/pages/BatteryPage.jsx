import React from 'react';
import BatterySocChart from '../charts/BatterySocChart';
import { Battery, Zap, ShieldAlert, CheckCircle2, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export default function BatteryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
            <Battery className="w-6 h-6 text-grid-cyan" />
            Community Battery Energy Storage (BESS)
          </h2>
          <p className="text-xs text-slate-400">
            Shared 100 kWh storage asset • Coordinated with flexible load shifting
          </p>
        </div>
      </div>

      {/* Critical Principle Callout */}
      <div className="p-4 rounded-xl bg-solar-500/10 border border-solar-500/30 text-xs text-slate-200 space-y-1">
        <p className="font-bold text-solar-400">⚡ GridSense Architectural Principle:</p>
        <p>
          The community battery is <strong>ONLY ONE RESOURCE</strong>. The optimization engine first evaluates flexible load shifting and protects critical loads before calling upon the battery. This prolongs battery life and prevents premature exhaustion before peak hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BatterySocChart soc={68} powerKW={12.0} status="DISCHARGING BUFFER" />

        {/* Technical Specifications Card */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-heading font-bold text-base text-white border-b border-white/10 pb-3">
            Hardware Simulation Specifications
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-slate-400 block text-[11px]">Nominal Capacity</span>
              <span className="font-bold text-white text-base">100.0 kWh</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-slate-400 block text-[11px]">Chemistry</span>
              <span className="font-bold text-white text-base">LiFePO4 (LFP)</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-slate-400 block text-[11px]">Max Discharge C-Rate</span>
              <span className="font-bold text-grid-cyan text-base">25.0 kW</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-slate-400 block text-[11px]">Emergency Floor</span>
              <span className="font-bold text-grid-rose text-base">20% (20 kWh)</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-grid-emerald" />
              <span>Charge automatically during midday solar surpluses (&gt; 90 kW).</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-grid-emerald" />
              <span>Discharge strategically during evening deficit peaks (18:00 - 20:30).</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-grid-emerald" />
              <span>Hardcoded 20% floor reserve preserves essential buffer against grid faults.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
