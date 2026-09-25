import React, { useState } from 'react';
import { 
  Sun, 
  Zap, 
  Battery, 
  Car, 
  Thermometer, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowUpRight, 
  Coins, 
  CheckCircle2, 
  Sliders, 
  Leaf, 
  Sparkles,
  HeartPulse,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserHomePortal() {
  const { user } = useAuth();

  // Interactive controls for resident
  const [evMode, setEvMode] = useState('SMART_DELAY'); // 'SMART_DELAY' | 'IMMEDIATE'
  const [acComfort, setAcComfort] = useState('ECO'); // 'ECO' | 'STANDARD'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEvToggle = () => {
    if (evMode === 'SMART_DELAY') {
      setEvMode('IMMEDIATE');
      showToast('⚡ Override activated: EV will charge immediately at standard tariff.');
    } else {
      setEvMode('SMART_DELAY');
      showToast('🌱 Smart Schedule active: EV charging shifted to 22:00 off-peak! You earn ₹180 rebate.');
    }
  };

  const handleAcToggle = (mode) => {
    setAcComfort(mode);
    if (mode === 'ECO') {
      showToast('🌿 Eco-Drift active: +1.5°C adjustment during peak grid transition. Saving ₹45/day.');
    } else {
      showToast('❄️ Standard comfort mode restored: Strict temperature hold.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900/90 text-white dark:bg-white/90 dark:text-dark-900 shadow-2xl backdrop-blur-md flex items-center gap-3 border border-white/20 animate-fade-in text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-grid-emerald fill-current" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-card p-6 border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-grid-emerald/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-grid-emerald to-grid-cyan p-0.5 shadow-glow-emerald">
              <div className="w-full h-full bg-white dark:bg-dark-900 rounded-[14px] flex items-center justify-center text-grid-emerald">
                <Sun className="w-7 h-7 text-solar-500 fill-solar-500/20" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                  Welcome, {user?.name || "Vikram Mehta"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-grid-emerald/15 text-emerald-700 dark:text-grid-emerald border border-grid-emerald/30">
                  {user?.houseNumber || "Home #42"} Prosumer
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {user?.subdivision || "Green Valley Eco-Subdivision"} • {user?.feederId || "Feeder FDR-001"} • Solar Rooftop {user?.solarCapacity || "5.0 kWp"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Current Grid Status</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-grid-emerald flex items-center gap-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                100% Balanced & Stable
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Friendly Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rooftop Solar Card */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rooftop Solar</span>
            <div className="p-2 rounded-xl bg-solar-500/10 text-solar-500">
              <Sun className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white">4.2</span>
            <span className="text-xs font-semibold text-slate-400">kW Generated</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-grid-emerald mt-2 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            1.8 kW surplus exported to community
          </p>
        </div>

        {/* Home Energy Consumption */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Home Current Draw</span>
            <div className="p-2 rounded-xl bg-grid-cyan/10 text-grid-cyan">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white">2.4</span>
            <span className="text-xs font-semibold text-slate-400">kW Active</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
            35% lower than normal peak hours
          </p>
        </div>

        {/* Monthly Rebates & Savings */}
        <div className="glass-card p-5 relative overflow-hidden border-grid-emerald/30 shadow-glow-emerald">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Bill Rebate Earned</span>
            <div className="p-2 rounded-xl bg-grid-emerald/10 text-grid-emerald">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-emerald-600 dark:text-grid-emerald">₹1,850</span>
            <span className="text-xs font-semibold text-slate-400">This Month</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-grid-emerald mt-2 font-medium flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            Demand Response participation bonus
          </p>
        </div>

        {/* Essential Power Safety */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Essential Circuit</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-purple-600 dark:text-purple-400">100%</span>
            <span className="text-xs font-semibold text-slate-400">Protected</span>
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-2 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Medical, Fridge, & WiFi guaranteed
          </p>
        </div>
      </div>

      {/* Interactive Smart Appliance Flexibility Control Center */}
      <div className="glass-card p-6 border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-grid-cyan" />
              Automated Smart Appliance Coordination
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              GridSense AI coordinates flexible equipment during evening solar decay so your bills drop while preserving total comfort.
            </p>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-grid-emerald/10 text-grid-emerald border border-grid-emerald/30 font-bold">
            Autonomous AI Optimization: ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Smart EV Charger */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-900/60 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">Tata Nexon EV</h3>
                    <span className="text-[10px] text-slate-400">Home EV Level-2 Charger</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  evMode === 'SMART_DELAY'
                    ? 'bg-solar-500/15 text-amber-600 dark:text-solar-400 border border-solar-500/30'
                    : 'bg-grid-emerald/15 text-emerald-600 dark:text-grid-emerald border border-grid-emerald/30'
                }`}>
                  {evMode === 'SMART_DELAY' ? 'Delayed (22:00)' : 'Charging Now'}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Battery Status:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">68% (Target: 90% by 07:00)</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Smart Delay Reward:</span>
                  <span className="font-bold text-emerald-600 dark:text-grid-emerald">+₹180 / session</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-white/50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5">
                  {evMode === 'SMART_DELAY'
                    ? 'AI shifted charging past the 18:00–21:00 peak bottleneck to safeguard neighbourhood transformer.'
                    : 'Priority override enabled. Vehicle is pulling 7.2 kW directly.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleEvToggle}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                evMode === 'SMART_DELAY'
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white'
                  : 'bg-solar-500 hover:bg-solar-400 text-dark-900 shadow-glow-amber'
              }`}
            >
              {evMode === 'SMART_DELAY' ? '⚡ Override (Charge Immediately)' : '🌱 Restore Smart Eco Delay'}
            </button>
          </div>

          {/* HVAC Air Conditioner */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-900/60 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-grid-cyan">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">Smart Inverter AC</h3>
                    <span className="text-[10px] text-slate-400">Master Bedroom & Living Room</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  acComfort === 'ECO'
                    ? 'bg-grid-emerald/15 text-emerald-600 dark:text-grid-emerald border border-grid-emerald/30'
                    : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                }`}>
                  {acComfort === 'ECO' ? 'Eco-Drift (+1.5°C)' : 'Standard 23°C'}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Current Room Temp:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">24.5°C (Set: 23.0°C)</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Pre-cooling Phase:</span>
                  <span className="font-semibold text-emerald-600 dark:text-grid-emerald">Completed at 16:30</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-white/50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5">
                  Pre-cooled your rooms using surplus rooftop solar. Building thermal inertia keeps rooms cool during peak 18:00 without power surge.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAcToggle('ECO')}
                className={`py-2 px-3 rounded-xl text-xs font-heading font-bold transition-all text-center cursor-pointer ${
                  acComfort === 'ECO'
                    ? 'bg-grid-emerald text-dark-900 shadow-glow-emerald'
                    : 'bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white'
                }`}
              >
                🌿 Eco Mode
              </button>
              <button
                onClick={() => handleAcToggle('STANDARD')}
                className={`py-2 px-3 rounded-xl text-xs font-heading font-bold transition-all text-center cursor-pointer ${
                  acComfort === 'STANDARD'
                    ? 'bg-grid-cyan text-dark-900 shadow-glow-cyan'
                    : 'bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white'
                }`}
              >
                ❄️ Strict Temp
              </button>
            </div>
          </div>

          {/* Water Heater / Heat Pump */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-900/60 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-solar-500/10 text-solar-500">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">Solar Heat Pump</h3>
                    <span className="text-[10px] text-slate-400">Domestic 200L Hot Water</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-grid-emerald/15 text-emerald-600 dark:text-grid-emerald border border-grid-emerald/30">
                  Heat Bank Full (60°C)
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Tank Temperature:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">60.2°C (Fully Charged)</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Current Power Draw:</span>
                  <span className="font-bold text-emerald-600 dark:text-grid-emerald">0.00 kW (Standby)</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-white/50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5">
                  100% pre-heated at 13:00 during peak sunlight using free solar. Zero electrical energy will be drawn this evening!
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-grid-emerald text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-[11px] font-medium">Optimal thermal storage achieved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Battery Share & Neighbourhood Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Your Community Battery Stake */}
        <div className="glass-card p-6 border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-grid-emerald/10 text-grid-emerald">
                <Battery className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  Shared Community LiFePO4 Battery
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">100 kWh Neighbourhood Storage Unit</p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-grid-emerald">
              Your Share: 3.5 kWh
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Community Battery Charge</span>
              <span className="font-bold text-slate-900 dark:text-white">78.5% (Safe above 20% floor reserve)</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-dark-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-white/10">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-grid-emerald to-grid-cyan transition-all duration-500"
                style={{ width: '78.5%' }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-dark-900/60 p-3 rounded-xl border border-slate-200 dark:border-white/10">
            💡 <strong>Peace of Mind Guarantee:</strong> The community battery preserves a strictly enforced <strong>20% floor reserve</strong> at all times, dedicated exclusively for the neighbourhood medical clinic, emergency lighting, and essential water pumps.
          </p>
        </div>

        {/* Green Valley Eco Badge & Community Standing */}
        <div className="glass-card p-6 border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-solar-500/10 text-solar-500">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  Your Neighbourhood Eco Impact
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Green Valley Prosumer League</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-solar-500/15 text-amber-700 dark:text-solar-400 border border-solar-500/30">
              Rank #4 in Sub-grid
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-900/60 border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">CO2 Avoided</span>
              <span className="text-xl font-heading font-extrabold text-emerald-600 dark:text-grid-emerald">148 kg</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Equivalent to 6 trees</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-900/60 border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Clean Solar Autonomy</span>
              <span className="text-xl font-heading font-extrabold text-grid-cyan">84.2%</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Grid dependency minimized</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <Info className="w-4 h-4 text-grid-cyan shrink-0" />
            <span>Next community energy coordination session scheduled for <strong>18:00 - 19:30 IST</strong>.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
