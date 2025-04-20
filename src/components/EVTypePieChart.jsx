import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];

const EVTypePieChart = ({ evData }) => {
  const [evTypeData, setEvTypeData] = useState([]);

  useEffect(() => {
    if (evData && evData.length > 0) {
      const typeCounts = evData.reduce((acc, item) => {
        const type = item['Electric Vehicle Type'];
        if (type) {
          acc[type] = (acc[type] || 0) + 1;
        }
        return acc;
      }, {});

      const formattedData = Object.entries(typeCounts).map(([key, value]) => ({
        name: key,
        value: value,
      }));

      console.log("Formatted Pie Data:", formattedData); // ✅ add this
      setEvTypeData(formattedData);
    }
  }, [evData]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">EV Type Distribution (BEV vs Plug-in Hybrid)</h2>
      {evTypeData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={evTypeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {evTypeData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading pie chart...</p>
      )}
    </div>
  );
};

export default EVTypePieChart;
