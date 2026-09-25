import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, ChevronRight, CheckCircle2, ShieldCheck, Zap, DollarSign, Leaf } from 'lucide-react';

export default function AICopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("explain");

  const faqs = [
    {
      q: "Why did my EV charging get delayed?",
      a: "GridSense forecasted a 75 kW evening deficit between 18:00 and 19:30. Shifting 20 vehicles by 60 minutes prevented a local feeder brownout while guaranteeing your car reaches 100% by 6:00 AM."
    },
    {
      q: "Are hospitals or medical loads ever switched off?",
      a: "Never! Critical loads (Local Health Clinic 8 kW, vaccine cold storage, dialysis, and streetlights) have absolute Priority 1. They are protected with zero curtailment under all conditions."
    },
    {
      q: "How does the community battery decide when to discharge?",
      a: "The battery evaluates load flexibility first. If flexible shifting is insufficient, it injects up to 25 kW while strictly maintaining an inviolable 20% emergency floor reserve."
    },
    {
      q: "How does this benefit me as a resident?",
      a: "You avoid rolling power cuts, protect your appliances from voltage dips, and earn demand-response electricity bill credits (avg ₹1,450/month per participating household)."
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-grid-emerald via-teal-500 to-grid-cyan text-dark-900 font-heading font-extrabold text-xs shadow-glow-emerald hover:scale-105 transition-all cursor-pointer animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          <Sparkles className="w-4 h-4 fill-current text-dark-900" />
          <span>Ask GridSense AI Copilot</span>
        </button>
      )}

      {/* Expanded Interactive Copilot Card */}
      {isOpen && (
        <div className="glass-card w-96 max-w-[90vw] border-grid-emerald/40 shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-grid-emerald/20 text-grid-emerald flex items-center justify-center border border-grid-emerald/40 shadow-glow-emerald">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-sm text-white">
                  GridSense AI Assistant
                </h4>
                <span className="text-[10px] text-grid-emerald font-mono font-bold">
                  ● Autonomous Copilot Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Copilot Status Banner */}
          <div className="p-3 rounded-xl bg-dark-900/80 border border-white/10 text-xs text-slate-200 space-y-1">
            <p className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-grid-emerald" />
              Microgrid Status: Stabilized
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              "I have scheduled 33 kW of flexible load deferrals and reserved 12 kW battery backup. Feeder 001 is operating smoothly at 74% capacity."
            </p>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex rounded-lg bg-dark-900/60 p-1 border border-white/5 text-[11px] font-semibold">
            <button
              onClick={() => setActiveTab("explain")}
              className={`flex-1 py-1 rounded text-center transition-colors ${
                activeTab === 'explain' ? 'bg-grid-emerald text-dark-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Explain Why 💡
            </button>
            <button
              onClick={() => setActiveTab("savings")}
              className={`flex-1 py-1 rounded text-center transition-colors ${
                activeTab === 'savings' ? 'bg-grid-emerald text-dark-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer Benefits 💰
            </button>
          </div>

          {/* Tab 1: Plain English Explanations */}
          {activeTab === "explain" && (
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {faqs.map((f, i) => (
                <details key={i} className="group p-2.5 rounded-xl bg-dark-900/60 border border-white/5 text-xs">
                  <summary className="font-semibold text-slate-200 cursor-pointer list-none flex items-center justify-between">
                    <span>{f.q}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-slate-400 text-[11px] mt-2 leading-relaxed border-t border-white/5 pt-2">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          )}

          {/* Tab 2: Customer Savings & Green Metrics */}
          {activeTab === "savings" && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-grid-emerald/10 border border-grid-emerald/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-300 block">Peak Tariff Savings</span>
                  <span className="font-heading font-extrabold text-base text-grid-emerald">₹1,450 / hr</span>
                </div>
                <div className="p-2 rounded-lg bg-grid-emerald/20 text-grid-emerald">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-grid-cyan/10 border border-grid-cyan/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-300 block">CO₂ Emissions Abated</span>
                  <span className="font-heading font-extrabold text-base text-grid-cyan">38.2 kg / hr</span>
                </div>
                <div className="p-2 rounded-lg bg-grid-cyan/20 text-grid-cyan">
                  <Leaf className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5 text-[11px] text-slate-300">
                ⭐ <strong>Customer Guarantee:</strong> Critical appliances operate 24/7 without interruption. Shifting flexible loads earns monthly rebates on your DISCOM electricity bill.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
