import React, { useState } from 'react';
import BeforeAfterChart from '../charts/BeforeAfterChart';
import CriticalLoadIndicator from '../components/CriticalLoadIndicator';
import { Zap, CheckCircle2, ShieldCheck, Battery, ArrowRight, Clock, AlertTriangle, Sparkles } from 'lucide-react';

export default function FlexibilityPage() {
  const [applied, setApplied] = useState(true);

  const plan = {
    time: "18:30 Peak Window",
    predictedGap: 75.0,
    risk: "HIGH",
    availableFlexibility: 33.0,
    batterySOC: 68,
    before: { demand_kw: 120, renewable_kw: 45, energy_gap_kw: 75, feeder_stress_pct: 125 },
    after: { optimized_demand_kw: 87, renewable_kw: 45, battery_support_kw: 12, remaining_gap_kw: 42, feeder_stress_pct: 74 },
    actions: [
      {
        asset: "🚗 EV Fleet Charging (20 vehicles)",
        category: "FLEXIBLE",
        action: "Delay EV charging commencement by 60 minutes",
        relief: "+24.0 kW",
        reason: "EV charging is flexible and renewable generation is expected to fall during the next 60 minutes. Shifting allows charging during 21:00 off-peak without affecting commuter range.",
        status: "SCHEDULED"
      },
      {
        asset: "💧 Municipal Water Booster Pumps",
        category: "FLEXIBLE",
        action: "Shift community water reservoir pumping by 45 minutes",
        relief: "+9.0 kW",
        reason: "Overhead water storage has 8 hours of buffer volume; pumping can be postponed until local grid stress subsides.",
        status: "SCHEDULED"
      },
      {
        asset: "❄️ Commercial & Club Cooling (HVAC)",
        category: "FLEXIBLE",
        action: "Trim non-critical cooling via +1.5°C temperature drift",
        relief: "+6.0 kW",
        reason: "Building thermal mass preserves resident comfort while shedding non-essential compressor load during peak deficit.",
        status: "SCHEDULED"
      },
      {
        asset: "🔋 Community Battery (100 kWh)",
        category: "STORAGE",
        action: "Inject 12.0 kW strategic battery support",
        relief: "+12.0 kW",
        reason: "Flexible load shifting cannot fully cover the predicted 75 kW deficit while critical loads must remain protected. Battery buffer bridges the remaining peak.",
        status: "DISCHARGING"
      },
      {
        asset: "🏥 Health Clinic & Emergency Care",
        category: "CRITICAL",
        action: "Full protection guarantee — Zero curtailment",
        relief: "0.0 kW",
        reason: "Clinic medical refrigeration, life-support dialysis, and emergency streetlights are hard-constrained with priority 1.",
        status: "LOCKED / PROTECTED"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-grid-emerald" />
            AI Flexibility Plan
          </h2>
          <p className="text-xs text-slate-400">
            Intelligent coordination of flexible loads & community storage while safeguarding critical healthcare
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-grid-rose/15 text-grid-rose border border-grid-rose/30">
            HIGH ENERGY GAP EXPECTED (75 kW)
          </span>
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
            Simulation Result
          </span>
        </div>
      </div>

      {/* Hero Before vs After Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Without GridSense */}
        <div className="glass-card p-6 border-t-4 border-t-grid-rose space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold font-mono tracking-wider px-3 py-1 rounded-full bg-grid-rose/15 text-grid-rose border border-grid-rose/30">
              WITHOUT GRID SENSE
            </span>
            <span className="text-xs text-slate-400 font-mono">Uncoordinated Peak</span>
          </div>

          <div className="space-y-2 font-mono">
            <div className="flex justify-between text-sm py-1 border-b border-white/5">
              <span className="text-slate-400">Neighbourhood Demand:</span>
              <span className="font-bold text-white">{plan.before.demand_kw} kW</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-white/5">
              <span className="text-slate-400">Renewable Solar:</span>
              <span className="font-bold text-solar-400">{plan.before.renewable_kw} kW</span>
            </div>
            <div className="flex justify-between text-base py-2 border-b border-white/10 font-bold">
              <span className="text-slate-300">Energy Gap (Deficit):</span>
              <span className="text-grid-rose">{plan.before.energy_gap_kw} kW 🔴</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-grid-rose/10 border border-grid-rose/25 text-xs text-red-200">
            ⚠️ <strong>Feeder 001 Overloaded at 125%</strong>. Severe transformer thermal stress and high risk of rolling brownouts without proactive load coordination.
          </div>
        </div>

        {/* With GridSense AI */}
        <div className="glass-card p-6 border-t-4 border-t-grid-emerald space-y-4 shadow-glow-emerald">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold font-mono tracking-wider px-3 py-1 rounded-full bg-grid-emerald/15 text-grid-emerald border border-grid-emerald/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> WITH GRID SENSE AI
            </span>
            <span className="text-xs text-grid-emerald font-mono font-bold">44% Deficit Reduction</span>
          </div>

          <div className="space-y-2 font-mono">
            <div className="flex justify-between text-sm py-1 border-b border-white/5">
              <span className="text-slate-400">Optimized Demand:</span>
              <span className="font-bold text-grid-cyan">{plan.after.optimized_demand_kw} kW (-33 kW shifted)</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-white/5">
              <span className="text-slate-400">Solar + Battery Injection:</span>
              <span className="font-bold text-solar-400">57 kW (45 + 12 kW)</span>
            </div>
            <div className="flex justify-between text-base py-2 border-b border-white/10 font-bold">
              <span className="text-slate-300">Remaining Energy Gap:</span>
              <span className="text-grid-emerald">{plan.after.remaining_gap_kw} kW 🟢</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-grid-emerald/10 border border-grid-emerald/25 text-xs text-emerald-200">
            ✅ <strong>Energy deficit shaved by 44%</strong>. Feeder load drops safely to 74%. Critical clinic loads 100% continuous.
          </div>
        </div>
      </div>

      {/* Visual Chart Comparison */}
      <div className="glass-card p-6">
        <h3 className="font-heading font-bold text-base text-white mb-2">
          Before vs After Flexibility Dispatch
        </h3>
        <BeforeAfterChart before={plan.before} after={plan.after} />
      </div>

      {/* Critical Load Protection Banner */}
      <CriticalLoadIndicator />

      {/* Detailed Recommendations Table with "WHY" Reasons */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-white">
              AI Dispatch Recommendations & Rationale
            </h3>
            <p className="text-xs text-slate-400">
              Clear explainability: Every action provides a transparent reason for teammates, DISCOMs, and judges.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-900/60 text-slate-400 font-mono uppercase text-[11px] border-b border-white/5">
              <tr>
                <th className="p-4">Target Load Asset</th>
                <th className="p-4">Category</th>
                <th className="p-4">Recommended AI Action</th>
                <th className="p-4">Relief</th>
                <th className="p-4">Why (AI Explainability)</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {plan.actions.map((act, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-semibold text-white">{act.asset}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      act.category === 'CRITICAL' ? 'bg-grid-rose/20 text-grid-rose' : 'bg-grid-cyan/20 text-grid-cyan'
                    }`}>
                      {act.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-200 font-medium">{act.action}</td>
                  <td className="p-4 font-mono font-bold text-grid-emerald">{act.relief}</td>
                  <td className="p-4 text-slate-400 leading-relaxed max-w-md">{act.reason}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                      {act.status}
                    </span>
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
