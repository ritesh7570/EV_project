import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const TopBrandsBarChart = ({ evData }) => {
  const [topBrandsData, setTopBrandsData] = useState([]);

  useEffect(() => {
    if (evData && evData.length > 0) {
      const brandCounts = evData.reduce((acc, item) => {
        const brand = item['Make'];
        if (brand) {
          acc[brand] = (acc[brand] || 0) + 1;
        }
        return acc;
      }, {});

      const sorted = Object.entries(brandCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);

      setTopBrandsData(sorted);
    }
  }, [evData]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Top 10 EV Brands</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topBrandsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" name="Vehicle Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopBrandsBarChart;
