import React, { useEffect, useState } from 'react';

const EVSummaryCards = ({ evData }) => {
  const [summary, setSummary] = useState({
    totalEVs: 0,
    bevCount: 0,
    phevCount: 0,
    uniqueBrands: 0,
    uniqueCities: 0,
  });

  useEffect(() => {
    if (evData && evData.length > 0) {
      const totalEVs = evData.length;
      const bevCount = evData.filter(ev => ev['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)').length;
      const phevCount = evData.filter(ev => ev['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)').length;
      const uniqueBrands = new Set(evData.map(ev => ev['Make'])).size;
      const uniqueCities = new Set(evData.map(ev => ev['City'])).size;

      setSummary({
        totalEVs,
        bevCount,
        phevCount,
        uniqueBrands,
        uniqueCities,
      });
    }
  }, [evData]);

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
      {Object.entries(summary).map(([key, value]) => (
        <div key={key} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', width: '180px' }}>
          <p style={{ fontWeight: 'bold' }}>{key.replace(/([A-Z])/g, ' $1')}</p>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default EVSummaryCards;
