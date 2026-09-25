import React, { useState } from 'react';
import { MapPin, Zap, Building2, Radio, Info } from 'lucide-react';

export default function MapPage() {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: "area_a", name: "Green Valley (Area A)", feeder: "FDR-001", x: 30, y: 35, demand: 90, solar: 70, gap: 20, risk: "HIGH", color: "#ef4444" },
    { id: "area_b", name: "Tech Park Hub (Area B)", feeder: "FDR-002", x: 72, y: 28, demand: 240, solar: 190, gap: 50, risk: "MEDIUM", color: "#f59e0b" },
    { id: "area_c", name: "Lakeside Enclave (Area C)", feeder: "FDR-003", x: 42, y: 72, demand: 115, solar: 35, gap: 80, risk: "HIGH", color: "#ef4444" },
    { id: "area_d", name: "Sunrise Greens (Area D)", feeder: "FDR-004", x: 80, y: 75, demand: 65, solar: 95, gap: 0, risk: "LOW", color: "#10b981" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-grid-cyan" />
            Simulated Regional Grid Topology Map
          </h2>
          <p className="text-xs text-slate-400">
            Geographical sub-station routing and local feeder clusters (Pure software simulation — No external Maps API required)
          </p>
        </div>
      </div>

      {/* Map Canvas Card */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="relative w-full h-[460px] bg-dark-900/90 rounded-2xl border border-white/10 overflow-hidden">
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />

          {/* SVG Power Transmission Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Central Substation at X=55%, Y=50% */}
            <circle cx="55%" cy="50%" r="8" fill="#06b6d4" className="animate-ping opacity-75" />
            <circle cx="55%" cy="50%" r="5" fill="#38bdf8" />
            <text x="56%" y="54%" fill="#94a3b8" fontSize="11" fontFamily="'JetBrains Mono', monospace">CENTRAL SUBSTATION 33/11kV</text>

            {/* Power lines to nodes */}
            <line x1="55%" y1="50%" x2="30%" y2="35%" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="55%" y1="50%" x2="72%" y2="28%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="55%" y1="50%" x2="42%" y2="72%" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="55%" y1="50%" x2="80%" y2="75%" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Interactive Neighbourhood Map Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setActiveNode(node)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 transform group-hover:scale-110 shadow-2xl"
                style={{
                  backgroundColor: `${node.color}20`,
                  borderColor: node.color,
                  boxShadow: `0 0 20px ${node.color}40`
                }}
              >
                <Building2 className="w-6 h-6" style={{ color: node.color }} />
              </div>

              <div className="mt-2 text-center">
                <span className="font-heading font-extrabold text-xs text-white block bg-dark-900/90 px-2 py-0.5 rounded border border-white/10 shadow">
                  {node.name.split(" ")[0]}
                </span>
                <span
                  className="text-[10px] font-mono font-bold block"
                  style={{ color: node.color }}
                >
                  {node.risk} RISK
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Node Details Box */}
        {activeNode && (
          <div className="mt-4 p-4 rounded-xl bg-dark-800 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div>
              <span className="text-white font-bold text-sm block font-heading">{activeNode.name}</span>
              <span className="text-slate-400">Feeder: {activeNode.feeder} • Deficit: {activeNode.gap} kW</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Demand: <strong className="text-white">{activeNode.demand} kW</strong></span>
              <span>Solar: <strong className="text-solar-400">{activeNode.solar} kW</strong></span>
              <span className="px-2.5 py-1 rounded-full font-bold" style={{ backgroundColor: `${activeNode.color}25`, color: activeNode.color }}>
                {activeNode.risk} RISK
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
