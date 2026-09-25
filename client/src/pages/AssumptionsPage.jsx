import React from 'react';
import { FileText, DollarSign, Users, ShieldCheck, Activity, Cpu } from 'lucide-react';

export default function AssumptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-grid-cyan" />
            Reliability Metrics & Unit Economics
          </h2>
          <p className="text-xs text-slate-400">
            Operations workflow model & transparent prototype assumptions (Labeled: Prototype Assumption)
          </p>
        </div>
      </div>

      {/* Operations Model Visual Workflow */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-heading font-extrabold text-base text-white border-b border-white/10 pb-3">
          Stakeholder Operations & Governance Model
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-dark-900/80 border border-white/10 space-y-2">
            <span className="font-mono font-bold text-grid-cyan block text-sm">01. DISCOM</span>
            <p className="text-slate-300 font-semibold">Distribution Utility</p>
            <p className="text-slate-400 leading-relaxed">
              Monitors feeder-level thermal capacity and receives proactive Demand-Response dispatch notifications ahead of peak hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-900/80 border border-white/10 space-y-2">
            <span className="font-mono font-bold text-solar-400 block text-sm">02. Community Manager</span>
            <p className="text-slate-300 font-semibold">Microgrid Operator</p>
            <p className="text-slate-400 leading-relaxed">
              Oversees the 100 kWh community BESS, manages municipal pumping rosters, and coordinates local reliability incentives.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-900/80 border border-white/10 space-y-2">
            <span className="font-mono font-bold text-grid-emerald block text-sm">03. Smart Households</span>
            <p className="text-slate-300 font-semibold">100 Prosumers & Citizens</p>
            <p className="text-slate-400 leading-relaxed">
              Set automated EV charging preferences and opt-in smart thermostat drift, earning dynamic electricity billing credits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-900/80 border border-grid-emerald/40 space-y-2 shadow-glow-emerald">
            <span className="font-mono font-bold text-grid-emerald block text-sm">04. GridSense AI</span>
            <p className="text-slate-300 font-semibold">Autonomous Director</p>
            <p className="text-slate-400 leading-relaxed">
              Forecasts dual horizons via XGBoost, detects energy gaps, optimizes flexibility, and guarantees critical loads protection.
            </p>
          </div>
        </div>
      </div>

      {/* Unit Economics Table */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-heading font-extrabold text-base text-white">
            Prototype Deployment Cost Assumptions
          </h3>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
            Prototype Assumption
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-dark-900/60 text-slate-400 uppercase text-[11px] border-b border-white/5">
              <tr>
                <th className="p-3">Cost Parameter</th>
                <th className="p-3">Assumption Value</th>
                <th className="p-3">Basis / Architecture Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-white">Software Deployment Cost</td>
                <td className="p-3 text-grid-emerald">₹1,20,000 / Feeder (Year 1)</td>
                <td className="p-3 text-slate-400 font-sans">Pure SaaS cloud infrastructure & API connectors (OpenADR / OCPP).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Neighbourhood Scale</td>
                <td className="p-3">100 Households + Amenities</td>
                <td className="p-3 text-slate-400 font-sans">Standard 11kV/415V distribution transformer zone.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Physical Hardware Capex</td>
                <td className="p-3 text-solar-400">₹0 (Zero New Hardware)</td>
                <td className="p-3 text-slate-400 font-sans">Interfaces with existing smart meters and Wi-Fi EV chargers; no custom IoT boards required.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Feeder Transformer Upgrade Deferred</td>
                <td className="p-3 text-grid-cyan">₹18,00,000 (Saved Capex)</td>
                <td className="p-3 text-slate-400 font-sans">Postpones expensive transformer replacement by shaving peak deficit loads.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
