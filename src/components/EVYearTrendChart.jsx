import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const EVYearTrendChart = ({ evData }) => {
  const [yearData, setYearData] = useState([]);

  useEffect(() => {
    if (evData && evData.length > 0) {
      const yearCounts = evData.reduce((acc, item) => {
        const year = item['Model Year'];
        if (year) {
          acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
      }, {});

      const sorted = Object.entries(yearCounts)
        .map(([year, value]) => ({ year, value }))
        .sort((a, b) => a.year - b.year); // sort by year ascending

      setYearData(sorted);
    }
  }, [evData]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">EV Registrations by Model Year</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Vehicle Count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EVYearTrendChart;
