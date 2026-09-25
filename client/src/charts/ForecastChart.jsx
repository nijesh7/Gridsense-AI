import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export default function ForecastChart({ horizons = [] }) {
  const chartData = horizons.length > 0 ? horizons.map(h => ({
    time: h.horizon || h.effective_hour || "T",
    Solar: h.predicted_renewable_kw || 0,
    Demand: h.predicted_demand_kw || 0,
    Gap: h.energy_gap_kw || 0,
    Optimized: Math.max(h.predicted_renewable_kw || 0, (h.predicted_demand_kw || 0) - 33.0),
  })) : [
    { time: "Now (18:00)", Solar: 70, Demand: 90, Gap: 20, Optimized: 70 },
    { time: "+15m (18:15)", Solar: 62, Demand: 102, Gap: 40, Optimized: 75 },
    { time: "+30m (18:30)", Solar: 45, Demand: 120, Gap: 75, Optimized: 87 },
    { time: "+60m (19:00)", Solar: 18, Demand: 132, Gap: 114, Optimized: 99 },
    { time: "+90m (19:30)", Solar: 5, Demand: 128, Gap: 123, Optimized: 95 },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
          <defs>
            <linearGradient id="solarArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
            </linearGradient>
            <linearGradient id="gapArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} unit=" kW" />
          <Tooltip
            contentStyle={{ backgroundColor: '#0c121e', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
            itemStyle={{ fontSize: 13 }}
          />
          <Legend wrapperStyle={{ paddingTop: 10 }} />
          <Area type="monotone" dataKey="Solar" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#solarArea)" name="Solar Generation (kW)" />
          <Line type="monotone" dataKey="Demand" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4, fill: "#38bdf8" }} name="Neighbourhood Demand (kW)" />
          <Line type="monotone" dataKey="Optimized" stroke="#10b981" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: "#10b981" }} name="After GridSense Demand (kW)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
