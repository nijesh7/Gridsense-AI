import React, { useState } from 'react';
import { Radio, AlertTriangle, ShieldCheck, Zap, Battery, CheckCircle2, Siren, ArrowUpRight } from 'lucide-react';

export default function DiscomPage() {
  const [drActive, setDrActive] = useState(false);

  const feeders = [
    {
      id: "FDR-001",
      name: "Green Valley Sub-Feeder (Our Demo Area)",
      type: "100 Households • Solar PV + EVs + Water Pumps",
      currentDemand: 110,
      predictedDemand: 125,
      currentRenewable: 50,
      predictedRenewable: 45,
      energyGap: 80,
      risk: drActive ? "STABILIZED" : "HIGH",
      flexibleCapacity: 30,
      batteryAvailable: 15,
      transformerLoad: drActive ? 76 : 124,
      recommendation: drActive
        ? "Demand-response active. 30 kW flexible load shifted, battery providing 15 kW buffer."
        : "Activate demand-response plan and preserve battery reserve."
    },
    {
      id: "FDR-002",
      name: "Commercial Tech Hub Feeder",
      type: "IT Offices & Commercial Labs",
      currentDemand: 240,
      predictedDemand: 255,
      currentRenewable: 190,
      predictedRenewable: 185,
      energyGap: 70,
      risk: "MEDIUM",
      flexibleCapacity: 65,
      batteryAvailable: 40,
      transformerLoad: 68,
      recommendation: "Feeder operating within normal thermal headroom."
    },
    {
      id: "FDR-003",
      name: "Industrial Sector Feeder",
      type: "Medium Fabricators & Cold Storage",
      currentDemand: 310,
      predictedDemand: 320,
      currentRenewable: 280,
      predictedRenewable: 275,
      energyGap: 45,
      risk: "LOW",
      flexibleCapacity: 50,
      batteryAvailable: 30,
      transformerLoad: 62,
      recommendation: "Adequate local clean supply and captive storage buffer."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-grid-cyan" />
            DISCOM Operator Command Center
          </h2>
          <p className="text-xs text-slate-400">
            Regional distribution network monitoring • Feeder FDR-001 microgrid coordinator
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-grid-cyan/15 text-grid-cyan border border-grid-cyan/30">
            DISCOM OPERATOR PERSPECTIVE
          </span>
        </div>
      </div>

      {/* Key Principle Alert */}
      <div className="p-4 rounded-xl bg-dark-800/80 border border-white/10 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-grid-cyan/10 text-grid-cyan">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <p className="text-xs text-slate-300">
          <strong>GridSense AI supports the DISCOM — it does NOT replace the DISCOM.</strong> Instead of the distribution company discovering a feeder overload after a blackout, GridSense provides 60-minute advance visibility and automated demand-response.
        </p>
      </div>

      {/* Feeders Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feeders.map((f, idx) => (
          <div
            key={f.id}
            className={`glass-card p-6 space-y-4 relative ${
              f.risk === 'HIGH' ? 'border-grid-rose/40 shadow-glow-rose' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono font-extrabold text-base text-white">{f.id}</span>
                <p className="text-[11px] text-slate-400">{f.name}</p>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                f.risk === 'HIGH' ? 'bg-grid-rose/20 text-grid-rose border-grid-rose/40 animate-pulse'
                : f.risk === 'MEDIUM' ? 'bg-solar-500/15 text-solar-400 border-solar-500/30'
                : 'bg-grid-emerald/15 text-grid-emerald border-grid-emerald/30'
              }`}>
                {f.risk} RISK
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Current Demand:</span>
                <span className="text-white font-bold">{f.currentDemand} kW</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Predicted Demand:</span>
                <span className="text-grid-cyan font-bold">{f.predictedDemand} kW</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Predicted Renewables:</span>
                <span className="text-solar-400 font-bold">{f.predictedRenewable} kW</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Predicted Energy Gap:</span>
                <span className={`font-bold ${f.energyGap > 50 ? 'text-grid-rose' : 'text-slate-200'}`}>
                  {f.energyGap} kW
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Shiftable Load Available:</span>
                <span className="text-grid-emerald font-bold">{f.flexibleCapacity} kW</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Transformer Thermal Stress:</span>
                <span className={`font-bold ${f.transformerLoad > 100 ? 'text-grid-rose' : 'text-slate-200'}`}>
                  {f.transformerLoad}%
                </span>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5 text-xs text-slate-300">
              <span className="text-[10px] text-solar-400 uppercase tracking-wider block font-bold mb-1">
                DISCOM Action Recommendation:
              </span>
              <p className="text-[11px] leading-relaxed">{f.recommendation}</p>
            </div>

            {/* Action Button for Feeder 001 */}
            {idx === 0 && (
              <button
                onClick={() => setDrActive(!drActive)}
                className={`w-full py-2.5 rounded-xl font-heading font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  drActive
                    ? 'bg-grid-emerald/20 text-grid-emerald border border-grid-emerald/40'
                    : 'bg-solar-500 hover:bg-solar-400 text-dark-900 shadow-glow-amber'
                }`}
              >
                {drActive ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    DEMAND RESPONSE DISPATCHED
                  </>
                ) : (
                  <>
                    <Siren className="w-4 h-4" />
                    ACTIVATE DEMAND RESPONSE
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
