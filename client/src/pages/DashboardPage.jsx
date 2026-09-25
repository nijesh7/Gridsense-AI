import React, { useState } from 'react';
import { useEnergy } from '../context/EnergyContext';
import { useAuth } from '../context/AuthContext';
import MetricCard from '../components/MetricCard';
import CriticalLoadIndicator from '../components/CriticalLoadIndicator';
import EnergyFlowDiagram from '../components/EnergyFlowDiagram';
import ForecastChart from '../charts/ForecastChart';
import BatterySocChart from '../charts/BatterySocChart';
import LoadDistributionChart from '../charts/LoadDistributionChart';
import { Link } from 'react-router-dom';
import {
  Sun,
  Zap,
  AlertTriangle,
  Battery,
  Sliders,
  ArrowRight,
  ShieldCheck,
  Activity,
  Sparkles,
  Users,
  CheckCircle2,
  DollarSign,
  Clock,
  HeartHandshake
} from 'lucide-react';

export default function DashboardPage() {
  const { dashboardData, loading } = useEnergy();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState("simple"); // 'simple' (Customer) vs 'detailed' (Engineer)
  const [quickScenario, setQuickScenario] = useState("default");

  // Dynamic values depending on scenario
  let metrics = dashboardData?.metrics || {
    renewableGeneration: 70.0,
    electricityDemand: 90.0,
    energyGap: 20.0,
    batterySOC: 68,
    flexibleLoadAvailable: 30.0,
    gridRisk: "HIGH",
    feederStress: 118,
  };

  if (quickScenario === "heatwave") {
    metrics = { ...metrics, renewableGeneration: 75.0, electricityDemand: 145.0, energyGap: 70.0, gridRisk: "HIGH", feederStress: 130 };
  } else if (quickScenario === "cloudy") {
    metrics = { ...metrics, renewableGeneration: 25.0, electricityDemand: 95.0, energyGap: 70.0, gridRisk: "HIGH", feederStress: 125 };
  } else if (quickScenario === "surplus") {
    metrics = { ...metrics, renewableGeneration: 95.0, electricityDemand: 65.0, energyGap: 0.0, gridRisk: "LOW", feederStress: 42 };
  }

  const horizons = dashboardData?.forecastHorizon || [];

  return (
    <div className="space-y-6">
      {/* Top Header & Friendly Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
              Green Valley Microgrid Portal
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-grid-emerald/15 text-emerald-700 dark:text-grid-emerald border border-grid-emerald/30">
              100 Homes Connected
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Welcome, <strong className="text-emerald-700 dark:text-grid-emerald">{user?.name}</strong> • Predictive AI balancing for Feeder FDR-001
          </p>
        </div>

        {/* View Mode Toggle (Customer Simple vs Engineer Detailed) */}
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-slate-200/80 dark:bg-dark-800 p-1 border border-slate-300/80 dark:border-white/10 text-xs shadow-inner">
            <button
              onClick={() => setViewMode("simple")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === "simple"
                  ? "bg-gradient-to-r from-grid-emerald to-grid-cyan text-dark-900 font-extrabold shadow-glow-emerald"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              Resident View (Simple)
            </button>
            <button
              onClick={() => setViewMode("detailed")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === "detailed"
                  ? "bg-gradient-to-r from-grid-emerald to-grid-cyan text-dark-900 font-extrabold shadow-glow-emerald"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Engineer View (Detailed)
            </button>
          </div>

          <Link
            to="/simulator"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-solar-500/15 text-amber-700 dark:text-solar-400 border border-solar-500/30 hover:bg-solar-500/25 text-xs font-semibold transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            What-If Simulator ⭐
          </Link>
        </div>
      </div>

      {/* Quick Scenario Preset Selector */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-dark-800/80 border border-slate-200 dark:border-white/10 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-solar-500" />
          Test Real-World Scenarios:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "default", label: "🌆 6:00 PM Peak Transition (Default)" },
            { id: "heatwave", label: "☀️ Heatwave Demand Spike" },
            { id: "cloudy", label: "⛈️ Sudden Cloud Cover Shock" },
            { id: "surplus", label: "🌱 Midday Clean Solar Surplus" },
          ].map(sc => (
            <button
              key={sc.id}
              onClick={() => setQuickScenario(sc.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                quickScenario === sc.id
                  ? 'bg-slate-900 text-white dark:bg-white/20 dark:text-white border border-slate-700 dark:border-white/30 shadow'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-dark-900/60 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-white/5 dark:hover:bg-white/5 dark:hover:text-slate-200'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* CUSTOMER SIMPLE VIEW */}
      {viewMode === "simple" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Big Friendly Community Status Banner - Pure White Card in Light Mode */}
          <div className="glass-card p-6 border border-emerald-300 dark:border-grid-emerald/40 bg-gradient-to-r from-emerald-50/90 via-white to-cyan-50/90 dark:from-grid-emerald/10 dark:via-dark-800 dark:to-grid-cyan/10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-mono text-xs uppercase font-extrabold text-emerald-700 dark:text-grid-emerald tracking-wider">
                    Grid Reliability: 100% STABLE
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                  All 100 Homes & Healthcare Clinic Fully Protected
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  GridSense AI predicted an evening peak deficit and automatically balanced your sub-grid by delaying 20 EV chargers by 60 minutes and activating 12 kW community battery buffer.
                </p>
              </div>

              {/* Citizen Benefits Quick Metric 1 */}
              <div className="p-4 rounded-xl bg-white dark:bg-dark-900/80 border border-slate-200 dark:border-white/10 text-center space-y-1 shadow-sm">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Clean Energy Share</span>
                <span className="font-heading font-extrabold text-2xl text-amber-600 dark:text-solar-400">78% Clean</span>
                <span className="text-[10px] text-emerald-600 dark:text-grid-emerald font-semibold block">Solar + Battery Buffer</span>
              </div>

              {/* Citizen Benefits Quick Metric 2 */}
              <div className="p-4 rounded-xl bg-white dark:bg-dark-900/80 border border-slate-200 dark:border-white/10 text-center space-y-1 shadow-sm">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Monthly DR Bill Credits</span>
                <span className="font-heading font-extrabold text-2xl text-emerald-600 dark:text-grid-emerald">₹1,450</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Per participating home</span>
              </div>
            </div>
          </div>

          {/* Live Microgrid Flow Diagram */}
          <EnergyFlowDiagram
            solarKW={metrics.renewableGeneration}
            demandKW={metrics.electricityDemand}
            batteryKW={12}
            gapKW={metrics.energyGap}
            isOptimized={true}
          />

          {/* Plain English Customer Action Schedule */}
          <div className="glass-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                  Today's Community Energy Action Plan
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  What our AI is doing right now to protect your neighbourhood
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-grid-emerald flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 0% Outage Risk
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-900/60 border border-slate-200 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between text-slate-800 dark:text-slate-300 font-semibold">
                  <span>🚗 Electric Vehicles (EVs)</span>
                  <span className="text-cyan-700 dark:text-grid-cyan font-mono font-bold">Shifted 60m</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Charging paused during peak deficit (18:00 - 19:30). Resumes automatically at 21:00 off-peak with full 100% battery by morning.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-900/60 border border-slate-200 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between text-slate-800 dark:text-slate-300 font-semibold">
                  <span>💧 Water Reservoir Pumps</span>
                  <span className="text-amber-700 dark:text-solar-400 font-mono font-bold">Delayed 45m</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Overhead drinking water tanks have ample reserve volume. Pumping resumes after peak grid strain subsides.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-grid-emerald/10 border border-emerald-200 dark:border-grid-emerald/30 space-y-2">
                <div className="flex items-center justify-between text-emerald-800 dark:text-grid-emerald font-semibold">
                  <span>🏥 Health Clinic & Dialysis</span>
                  <span className="font-mono font-bold">100% UNTOUCHED</span>
                </div>
                <p className="text-emerald-900/80 dark:text-slate-300 text-[11px] leading-relaxed">
                  Hospital cold-chain vaccines and life-support units are hard-isolated with absolute Priority 1 continuous electricity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRID ENGINEER DETAILED VIEW */}
      {viewMode === "detailed" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Top 6 KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <MetricCard
              title="Renewable Gen"
              value={metrics.renewableGeneration}
              unit="kW"
              subtitle="Solar PV Rooftop Array"
              badge="Clean Supply"
              badgeType="warning"
              progress={(metrics.renewableGeneration / 100) * 100}
              accentColor="amber"
              icon={Sun}
            />
            <MetricCard
              title="Electricity Demand"
              value={metrics.electricityDemand}
              unit="kW"
              subtitle="100 Homes + EVs + Pumps"
              badge="Evening Peak"
              badgeType="cyan"
              progress={(metrics.electricityDemand / 150) * 100}
              accentColor="cyan"
              icon={Zap}
            />
            <MetricCard
              title="Energy Gap"
              value={metrics.energyGap}
              unit="kW"
              subtitle="Demand minus Renewables"
              badge={metrics.energyGap > 0 ? "Deficit" : "Surplus"}
              badgeType={metrics.energyGap > 0 ? "danger" : "success"}
              progress={(metrics.energyGap / metrics.electricityDemand) * 100}
              accentColor="rose"
              icon={AlertTriangle}
            />
            <MetricCard
              title="Battery SOC"
              value={metrics.batterySOC}
              unit="%"
              subtitle="100 kWh LiFePO4 BESS"
              badge="Reserve Safe"
              badgeType="success"
              progress={metrics.batterySOC}
              accentColor="emerald"
              icon={Battery}
            />
            <MetricCard
              title="Flexible Load"
              value={metrics.flexibleLoadAvailable}
              unit="kW"
              subtitle="EVs + Pumps + HVAC"
              badge="Shiftable"
              badgeType="cyan"
              progress={(metrics.flexibleLoadAvailable / 50) * 100}
              accentColor="cyan"
              icon={Activity}
            />
            <MetricCard
              title="Grid Risk Level"
              value={metrics.gridRisk}
              unit=""
              subtitle={`Feeder stress: ${metrics.feederStress}%`}
              badge={metrics.gridRisk}
              badgeType={metrics.gridRisk === "HIGH" || metrics.gridRisk === "CRITICAL" ? "danger" : "warning"}
              progress={Math.min(100, metrics.feederStress)}
              accentColor={metrics.gridRisk === "HIGH" ? "rose" : "amber"}
              icon={ShieldCheck}
            />
          </div>

          {/* Live Microgrid Flow Diagram */}
          <EnergyFlowDiagram
            solarKW={metrics.renewableGeneration}
            demandKW={metrics.electricityDemand}
            batteryKW={12}
            gapKW={metrics.energyGap}
            isOptimized={true}
          />

          {/* Forecast Chart & Battery SOC */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-6 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    Predictive Energy Horizon (Next 90 Minutes)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Dual XGBoost Forecaster ($R^2=0.962$) tracking solar decay against commuter plug-in surge
                  </p>
                </div>
              </div>
              <ForecastChart horizons={horizons} />
            </div>

            <div className="space-y-6">
              <BatterySocChart soc={metrics.batterySOC} powerKW={12.0} status="DISCHARGING BUFFER" />
              <div className="glass-card p-5 shadow-sm">
                <h4 className="font-heading font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  Load Profile Segmentation
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Flexible loads vs Protected critical essentials
                </p>
                <LoadDistributionChart />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Critical Load Protection Guarantee Banner */}
      <CriticalLoadIndicator />
    </div>
  );
}
