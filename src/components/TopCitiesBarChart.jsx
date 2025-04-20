import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const TopCitiesBarChart = ({ evData }) => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    if (evData && evData.length > 0) {
      const cityCounts = evData.reduce((acc, item) => {
        const city = item['City'];
        if (city) {
          acc[city] = (acc[city] || 0) + 1;
        }
        return acc;
      }, {});

      const sorted = Object.entries(cityCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);

      setCityData(sorted);
    }
  }, [evData]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Top 10 Cities by EV Count</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cityData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#ffc658" name="Vehicle Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCitiesBarChart;
