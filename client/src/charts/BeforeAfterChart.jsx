import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export default function BeforeAfterChart({ before = {}, after = {} }) {
  const data = [
    {
      metric: "Demand",
      "Without GridSense": before.demand_kw || 120,
      "With GridSense AI": after.optimized_demand_kw || 87,
    },
    {
      metric: "Renewables",
      "Without GridSense": before.renewable_kw || 45,
      "With GridSense AI": after.renewable_kw || 45,
    },
    {
      metric: "Battery Support",
      "Without GridSense": 0,
      "With GridSense AI": after.battery_support_kw || 12,
    },
    {
      metric: "Net Energy Gap",
      "Without GridSense": before.energy_gap_kw || 75,
      "With GridSense AI": after.remaining_gap_kw || 30,
    },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 15, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} unit=" kW" />
          <Tooltip
            contentStyle={{ backgroundColor: '#0c121e', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
          />
          <Legend wrapperStyle={{ paddingTop: 8 }} />
          <Bar dataKey="Without GridSense" fill="#ef4444" radius={[6, 6, 0, 0]} name="Without GridSense (kW)" />
          <Bar dataKey="With GridSense AI" fill="#10b981" radius={[6, 6, 0, 0]} name="With GridSense AI (kW)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
