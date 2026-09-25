import React, { useState } from 'react';
import { SlidersHorizontal, CheckCircle2, Save, Car, Droplets, ThermometerSnowflake } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState({
    evFlexible: true,
    evMaxDelay: "60 mins",
    evPreferredTime: "After 9:00 PM",
    pumpFlexible: true,
    pumpMaxDelay: "45 mins",
    coolingDrift: true,
    coolingMaxDrift: "+1.5°C"
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
          <SlidersHorizontal className="w-6 h-6 text-grid-emerald" />
          Prosumer Flexibility Preferences
        </h2>
        <p className="text-xs text-slate-400">
          Personalize how GridSense coordinates your household loads (Optional citizen participation settings)
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-grid-emerald/15 border border-grid-emerald/30 text-grid-emerald text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Preferences successfully saved to local smart endpoint!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-card p-6 space-y-6">
        {/* EV Charging */}
        <div className="space-y-3 pb-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-grid-cyan" />
            <h3 className="font-heading font-bold text-base text-white">Electric Vehicle (EV) Charging Flexibility</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Allow Autonomous Shifting?</label>
              <select
                value={prefs.evFlexible ? "yes" : "no"}
                onChange={(e) => setPrefs({ ...prefs, evFlexible: e.target.value === "yes" })}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none"
              >
                <option value="yes">YES (Recommended — Earn DR Credits)</option>
                <option value="no">NO (Immediate Fast Charge Always)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Maximum Delay Window</label>
              <select
                value={prefs.evMaxDelay}
                onChange={(e) => setPrefs({ ...prefs, evMaxDelay: e.target.value })}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none"
              >
                <option>45 mins</option>
                <option>60 mins</option>
                <option>90 mins</option>
                <option>120 mins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Water Pump */}
        <div className="space-y-3 pb-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-solar-400" />
            <h3 className="font-heading font-bold text-base text-white">Municipal Water Pumping Shift</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Pumping Buffer Delay</label>
              <select
                value={prefs.pumpMaxDelay}
                onChange={(e) => setPrefs({ ...prefs, pumpMaxDelay: e.target.value })}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none"
              >
                <option>30 mins</option>
                <option>45 mins</option>
                <option>60 mins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cooling Drift */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ThermometerSnowflake className="w-5 h-5 text-grid-emerald" />
            <h3 className="font-heading font-bold text-base text-white">Smart Thermostat / AC Drift</h3>
          </div>
          <div className="text-xs space-y-2">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.coolingDrift}
                onChange={(e) => setPrefs({ ...prefs, coolingDrift: e.target.checked })}
                className="rounded border-white/20 bg-dark-900 text-grid-emerald focus:ring-0"
              />
              <span>Allow temporary +1.5°C temperature drift during peak deficit events (&lt; 60 mins)</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-grid-emerald text-dark-900 font-heading font-extrabold text-xs shadow-glow-emerald cursor-pointer hover:bg-emerald-400 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Flexibility Preferences
        </button>
      </form>
    </div>
  );
}
