import React, { useState } from 'react';
import { Building2, Sun, Zap, Battery, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { useEnergy } from '../context/EnergyContext';

export default function NeighbourhoodsPage() {
  const { setSelectedNeighbourhood } = useEnergy();
  const [selectedArea, setSelectedArea] = useState(null);

  const neighbourhoods = [
    {
      id: "area_a",
      name: "Green Valley (Area A)",
      feederId: "FDR-001",
      households: 100,
      currentDemand: 90.0,
      currentRenewable: 70.0,
      gap: 20.0,
      batterySOC: 68,
      flexibleLoadKW: 30.0,
      riskLevel: "HIGH",
      feederStress: 118,
      evCount: 20,
      pumpsCount: 5,
      description: "Our primary prototype demonstration sub-grid. High solar penetration with significant evening EV plug-in cluster."
    },
    {
      id: "area_b",
      name: "Tech Park Hub (Area B)",
      feederId: "FDR-002",
      households: 220,
      currentDemand: 240.0,
      currentRenewable: 190.0,
      gap: 50.0,
      batterySOC: 75,
      flexibleLoadKW: 65.0,
      riskLevel: "MEDIUM",
      feederStress: 72,
      evCount: 45,
      pumpsCount: 8,
      description: "Commercial IT buildings and residential towers with automated smart thermostats and captive solar rooftop carports."
    },
    {
      id: "area_c",
      name: "Lakeside Enclave (Area C)",
      feederId: "FDR-003",
      households: 150,
      currentDemand: 115.0,
      currentRenewable: 35.0,
      gap: 80.0,
      batterySOC: 42,
      flexibleLoadKW: 28.0,
      riskLevel: "HIGH",
      feederStress: 124,
      evCount: 32,
      pumpsCount: 6,
      description: "Low solar generation area with heavy evening municipal pumping load. Prime candidate for aggressive load shifting."
    },
    {
      id: "area_d",
      name: "Sunrise Greens (Area D)",
      feederId: "FDR-004",
      households: 80,
      currentDemand: 65.0,
      currentRenewable: 95.0,
      gap: 0.0,
      batterySOC: 90,
      flexibleLoadKW: 18.0,
      riskLevel: "LOW",
      feederStress: 45,
      evCount: 12,
      pumpsCount: 3,
      description: "Energy surplus community: Solar PV exceeds instantaneous demand; actively exporting energy and recharging battery."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-grid-emerald" />
            Multi-Neighbourhood Sub-Grid Coordination
          </h2>
          <p className="text-xs text-slate-400">
            Neighbourhood-by-neighbourhood scaling: Start with 100 homes, expand to feeder clusters
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {neighbourhoods.map((n) => (
          <div
            key={n.id}
            onClick={() => setSelectedArea(n)}
            className={`glass-card-hover p-5 space-y-4 cursor-pointer relative ${
              selectedArea?.id === n.id ? 'ring-2 ring-grid-emerald' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-white text-base">{n.name}</h3>
                <span className="text-[11px] font-mono text-slate-400">{n.feederId}</span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                n.riskLevel === 'HIGH' ? 'bg-grid-rose/15 text-grid-rose border-grid-rose/30'
                : n.riskLevel === 'MEDIUM' ? 'bg-solar-500/15 text-solar-400 border-solar-500/30'
                : 'bg-grid-emerald/15 text-grid-emerald border-grid-emerald/30'
              }`}>
                {n.riskLevel}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Demand:</span>
                <span className="text-white font-bold">{n.currentDemand} kW</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Renewables:</span>
                <span className="text-solar-400 font-bold">{n.currentRenewable} kW</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Energy Gap:</span>
                <span className={`font-bold ${n.gap > 0 ? 'text-grid-rose' : 'text-grid-emerald'}`}>
                  {n.gap} kW
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Battery SOC:</span>
                <span className="text-grid-emerald font-bold">{n.batterySOC}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Flexible Load:</span>
                <span className="text-grid-cyan font-bold">{n.flexibleLoadKW} kW</span>
              </div>
            </div>

            <button className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-1.5">
              <span>Inspect Telemetry</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Selected Neighbourhood Details Modal / Drawer */}
      {selectedArea && (
        <div className="glass-card p-6 border-grid-emerald/40 animate-in fade-in space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">
                {selectedArea.name} — Detailed Microgrid Telemetry
              </h3>
              <p className="text-xs text-slate-400">{selectedArea.description}</p>
            </div>
            <button
              onClick={() => setSelectedArea(null)}
              className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-white/5"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-slate-400 block text-[11px]">Households</span>
              <span className="text-base font-bold text-white">{selectedArea.households} Homes</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-slate-400 block text-[11px]">Active EV Fleet</span>
              <span className="text-base font-bold text-grid-cyan">{selectedArea.evCount} Vehicles</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-slate-400 block text-[11px]">Municipal Pumps</span>
              <span className="text-base font-bold text-solar-400">{selectedArea.pumpsCount} Pumps</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-slate-400 block text-[11px]">Substation Feeder Stress</span>
              <span className="text-base font-bold text-grid-rose">{selectedArea.feederStress}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
