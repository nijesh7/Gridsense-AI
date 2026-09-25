import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

export default function LoadDistributionChart() {
  const data = [
    { name: "EV Fleet Charging (Flexible)", value: 24, color: "#38bdf8" },
    { name: "Water Pumps (Flexible)", value: 15, color: "#06b6d4" },
    { name: "Non-critical HVAC (Flexible)", value: 12, color: "#818cf8" },
    { name: "Health Clinic (Protected Critical)", value: 8, color: "#ef4444" },
    { name: "Streetlights & Essentials (Protected)", value: 47, color: "#64748b" },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#0c121e" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#0c121e', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
            formatter={(value) => [`${value} kW`, 'Power']}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
