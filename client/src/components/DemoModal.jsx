import React from 'react';
import { useEnergy } from '../context/EnergyContext';
import { Play, CheckCircle2, ChevronRight, X, ShieldAlert, Zap, Battery, ShieldCheck } from 'lucide-react';

export default function DemoModal() {
  const { demoState, nextDemoStep, closeDemo } = useEnergy();

  if (!demoState.isActive) return null;

  const currentStep = demoState.steps[demoState.currentStepIndex] || {};
  const progressPct = ((demoState.currentStepIndex + 1) / demoState.steps.length) * 100;
  const isFinalStep = demoState.currentStepIndex === demoState.steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-2xl w-full border-solar-500/30 overflow-hidden shadow-2xl animate-in zoom-in-95">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-solar-500/20 via-dark-800 to-grid-emerald/20 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-solar-500 text-dark-900 font-bold">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-base">
                GridSense AI Interactive Demo Walkthrough
              </h3>
              <p className="text-xs text-slate-300">
                Canonical 6:00 PM to 6:30 PM Peak Transition Scenario
              </p>
            </div>
          </div>
          <button
            onClick={closeDemo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-solar-500 to-grid-emerald transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>STEP {demoState.currentStepIndex + 1} OF {demoState.steps.length}</span>
            <span className="text-solar-400 font-bold">{currentStep.time}</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-900/80 border border-white/10">
            <h4 className="font-heading font-bold text-lg text-white mb-2">
              {currentStep.description}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full font-mono font-bold bg-solar-500/15 text-solar-400 border border-solar-500/30">
                STATE: {currentStep.status}
              </span>
            </div>
          </div>

          {/* Key Simulation Data Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-1">Solar PV</span>
              <span className="font-heading font-extrabold text-xl text-solar-400">45.0 kW</span>
              <span className="text-[10px] text-slate-400 block">Down from 70 kW</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-1">Demand Surge</span>
              <span className="font-heading font-extrabold text-xl text-grid-cyan">120.0 kW</span>
              <span className="text-[10px] text-slate-400 block">Up from 90 kW</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-1">Energy Gap</span>
              <span className="font-heading font-extrabold text-xl text-grid-rose">75.0 kW 🔴</span>
              <span className="text-[10px] text-slate-400 block">Immediate Risk</span>
            </div>
          </div>

          {/* Actions Coordinated */}
          {demoState.currentStepIndex >= 4 && (
            <div className="p-4 rounded-xl bg-grid-emerald/10 border border-grid-emerald/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-grid-emerald">
                <CheckCircle2 className="w-4 h-4" />
                AI Flexibility Plan Successfully Executed:
              </div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>🚗 EV Fleet charging shifted by 60 mins (+24 kW relief)</li>
                <li>💧 Water pump delayed by 45 mins (+9 kW relief)</li>
                <li>🔋 Community battery delivers 12 kW support (reserve floor &gt; 20% preserved)</li>
                <li>🏥 <strong>Critical Health Clinic & Dialysis 100% Protected</strong></li>
              </ul>
              <div className="text-xs font-mono font-bold text-grid-emerald pt-1">
                Net remaining gap reduced from 75 kW → 42 kW (44% deficit reduction!)
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 bg-dark-900/80 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={closeDemo}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5"
          >
            Exit Demo
          </button>

          <button
            onClick={nextDemoStep}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-grid-emerald to-grid-cyan hover:from-grid-emerald hover:to-emerald-400 text-dark-900 font-heading font-extrabold text-xs shadow-glow-emerald cursor-pointer"
          >
            {isFinalStep ? "Finish Walkthrough" : "Next Step"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
