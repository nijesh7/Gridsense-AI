import React, { useState } from 'react';
import { api } from '../services/api';
import BeforeAfterChart from '../charts/BeforeAfterChart';
import CriticalLoadIndicator from '../components/CriticalLoadIndicator';
import { Sliders, Play, RotateCcw, Zap, Sun, Battery, CloudSun, ShieldCheck, Sparkles } from 'lucide-react';

export default function SimulatorPage() {
  const [params, setParams] = useState({
    renewablePercentage: 60,
    demandLevel: "+20%",
    batterySOC: 60,
    evLoadLevel: "High",
    weather: "Cloudy"
  });

  const [loading, setLoading] = useState(false);
  const [simResult, setSimResult] = useState({
    before: { demand_kw: 115.0, renewable_kw: 38.0, energy_gap_kw: 77.0, feeder_stress_pct: 128, risk_level: "HIGH" },
    after: { optimized_demand_kw: 82.0, renewable_kw: 38.0, battery_support_kw: 15.0, remaining_gap_kw: 29.0, feeder_stress_pct: 71, risk_level: "LOW" },
    impact_metrics: { gap_reduction_pct: 62.3, flexible_energy_shifted_kw: 33.0, battery_contribution_kw: 15.0, critical_load_protected_pct: 100.0, data_label: "Simulation Result" },
    recommendations: [
      { action: "Delay EV charging by 90 minutes", target_asset: "EV Fleet", shifted_kw: 22.0, reason: "Heavy EV cluster charging during cloudy afternoon creates local feeder overload." },
      { action: "Postpone water reservoir pumping", target_asset: "Water Pumps", shifted_kw: 8.0, reason: "Water pumping deferred until grid demand drops below 80 kW." },
      { action: "Deploy 15 kW community battery support", target_asset: "Community Battery", shifted_kw: 15.0, reason: "Preserves 20% emergency reserve while bridging cloudy period gap." }
    ]
  });

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await api.runSimulation(params);
      if (res?.simulationData?.result) {
        setSimResult(res.simulationData.result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 350);
    }
  };

  const handleReset = () => {
    setParams({
      renewablePercentage: 100,
      demandLevel: "Normal",
      batterySOC: 68,
      evLoadLevel: "Medium",
      weather: "Sunny"
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-solar-400" />
            WHAT-IF ENERGY SIMULATOR ⭐
          </h2>
          <p className="text-xs text-slate-400">
            Interactive Judge Sandbox: Stress-test the neighbourhood microgrid under extreme environmental shocks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 glass-card p-6 space-y-6">
          <h3 className="font-heading font-bold text-base text-white border-b border-white/10 pb-3">
            Simulation Parameters
          </h3>

          {/* 1. Renewable Generation Options */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-solar-400" /> Renewable Solar Capacity
              </span>
              <span className="font-mono text-solar-400 font-bold">{params.renewablePercentage}%</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[100, 80, 60, 40].map((val) => (
                <button
                  key={val}
                  onClick={() => setParams(p => ({ ...p, renewablePercentage: val }))}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    params.renewablePercentage === val
                      ? 'bg-solar-500 text-dark-900 shadow-glow-amber'
                      : 'bg-dark-900/60 text-slate-300 border border-white/5 hover:bg-white/5'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* 2. Electricity Demand Options */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-grid-cyan" /> Electricity Demand Surge
              </span>
              <span className="font-mono text-grid-cyan font-bold">{params.demandLevel}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["Normal", "+10%", "+20%", "+30%"].map((val) => (
                <button
                  key={val}
                  onClick={() => setParams(p => ({ ...p, demandLevel: val }))}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    params.demandLevel === val
                      ? 'bg-grid-cyan text-dark-900 shadow-glow-cyan'
                      : 'bg-dark-900/60 text-slate-300 border border-white/5 hover:bg-white/5'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Battery SOC */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Battery className="w-4 h-4 text-grid-emerald" /> Community Battery SOC
              </span>
              <span className="font-mono text-grid-emerald font-bold">{params.batterySOC}%</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[20, 40, 60, 80].map((val) => (
                <button
                  key={val}
                  onClick={() => setParams(p => ({ ...p, batterySOC: val }))}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    params.batterySOC === val
                      ? 'bg-grid-emerald text-dark-900 shadow-glow-emerald'
                      : 'bg-dark-900/60 text-slate-300 border border-white/5 hover:bg-white/5'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* 4. EV Fleet Load */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>🚗 Connected EV Fleet Load</span>
              <span className="font-mono text-slate-300 font-bold">{params.evLoadLevel}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((val) => (
                <button
                  key={val}
                  onClick={() => setParams(p => ({ ...p, evLoadLevel: val }))}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    params.evLoadLevel === val
                      ? 'bg-indigo-500 text-white shadow-lg'
                      : 'bg-dark-900/60 text-slate-300 border border-white/5 hover:bg-white/5'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Weather Shock */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-solar-400" /> Weather Condition Shock
              </span>
              <span className="font-mono text-solar-400 font-bold">{params.weather}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Sunny", "Cloudy", "Rainy"].map((val) => (
                <button
                  key={val}
                  onClick={() => setParams(p => ({ ...p, weather: val }))}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    params.weather === val
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-dark-900/60 text-slate-400 border border-white/5 hover:bg-white/5'
                  }`}
                >
                  {val === 'Sunny' ? '☀️ Sunny' : val === 'Cloudy' ? '⛅ Cloudy' : '🌧️ Rainy'}
                </button>
              ))}
            </div>
          </div>

          {/* BIG SIMULATE BUTTON */}
          <button
            onClick={handleSimulate}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-solar-500 via-amber-500 to-grid-emerald hover:opacity-95 text-dark-900 font-heading font-extrabold text-sm shadow-glow-amber transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin text-lg">⚙️</span>
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            {loading ? "CALCULATING SMART BALANCE..." : "SIMULATE & OPTIMIZE SCENARIO"}
          </button>
        </div>

        {/* Dynamic Simulation Outcome Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-base text-white">
                  Dynamic Simulation Outcome
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time recalculation by GridSense Optimization Engine
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-grid-emerald/15 text-grid-emerald border border-grid-emerald/30">
                {simResult.impact_metrics?.gap_reduction_pct || 62}% Deficit Shaved
              </span>
            </div>

            {/* Scenario Transition Visual Box */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
                <span className="text-[11px] text-slate-400 block mb-1">Scenario Solar</span>
                <span className="font-heading font-extrabold text-lg text-solar-400">
                  {simResult.before?.renewable_kw} kW
                </span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
                <span className="text-[11px] text-slate-400 block mb-1">Scenario Demand</span>
                <span className="font-heading font-extrabold text-lg text-grid-cyan">
                  {simResult.before?.demand_kw} kW
                </span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
                <span className="text-[11px] text-slate-400 block mb-1">Initial Gap</span>
                <span className="font-heading font-extrabold text-lg text-grid-rose">
                  {simResult.before?.energy_gap_kw} kW
                </span>
              </div>
              <div className="p-3 rounded-xl bg-grid-emerald/10 border border-grid-emerald/30">
                <span className="text-[11px] text-grid-emerald font-bold block mb-1">Remaining Gap</span>
                <span className="font-heading font-extrabold text-lg text-grid-emerald">
                  {simResult.after?.remaining_gap_kw} kW 🟢
                </span>
              </div>
            </div>

            {/* Before vs After Recharts */}
            <div className="pt-2">
              <BeforeAfterChart before={simResult.before} after={simResult.after} />
            </div>
          </div>

          {/* AI Recommendations For This Scenario */}
          <div className="glass-card p-6 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-solar-400" />
              GridSense AI Customized Recommendations
            </h4>
            <div className="space-y-2.5">
              {simResult.recommendations?.map((r, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-dark-900/60 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-white block">{r.action}</span>
                    <span className="text-slate-400 text-[11px]">{r.reason}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-1 rounded bg-grid-emerald/15 text-grid-emerald border border-grid-emerald/30 flex-shrink-0 self-start md:self-auto">
                    +{r.shifted_kw} kW Relief
                  </span>
                </div>
              ))}
            </div>
          </div>

          <CriticalLoadIndicator />
        </div>
      </div>
    </div>
  );
}
