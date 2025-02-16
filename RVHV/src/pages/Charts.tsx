import React from 'react';
import { IndividualGraph } from '../components/IndividualGraph'; // Import IndividualGraph component
import { useThingSpeak } from '../hooks/useThingSpeak';

export function Charts() {
  const { data, loading, error } = useThingSpeak();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!data) return null;

  // Prepare the individual graphs data
  const graphsData = [
    { key: 'temperature', title: 'Temperature (°C)', color: '#ff7300', yAxisLabel: 'Temperature (°C)' },
    { key: 'humidity', title: 'Humidity (%)', color: '#387908', yAxisLabel: 'Humidity (%)' },
    { key: 'co2', title: 'CO₂ (ppm)', color: '#00c1d8', yAxisLabel: 'CO₂ (ppm)' },
    { key: 'voc', title: 'VOC (ppb)', color: '#ff0000', yAxisLabel: 'VOC (ppb)' },
    { key: 'soilMoisture', title: 'Soil Moisture (%)', color: '#006400', yAxisLabel: 'Soil Moisture (%)' },
    { key: 'lightIntensity', title: 'Light Intensity (lux)', color: '#f1c40f', yAxisLabel: 'Light Intensity (lux)' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Charts</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {graphsData.map((metric) => (
          <IndividualGraph
            key={metric.key}
            data={data.map((entry) => ({ timestamp: entry.timestamp, value: entry[metric.key] }))} // Pass all data points for each metric
            title={metric.title}
            color={metric.color}
            yAxisLabel={metric.yAxisLabel}
          />
        ))}
      </div>
    </div>
  );
}
