import React from 'react';
import { CircularLevel } from '../components/CircularLevel';
import { CombinedGraph } from '../components/CombinedGraph';
import { useThingSpeak } from '../hooks/useThingSpeak';

const thresholds = {
  temperature: { min: 18, max: 30 },
  humidity: { min: 40, max: 80 },
  co2: { min: 400, max: 1200 },
  voc: { min: 0, max: 500 },
  soilMoisture: { min: 20, max: 80 },
  lightIntensity: { min: 1000, max: 10000 }
};

const latest_index = 9;
export function Dashboard() {
  const { data, loading, error } = useThingSpeak();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Circular indicators */}
        <CircularLevel
          title="Temperature"
          value={data[latest_index].temperature}
          min={thresholds.temperature.min}
          max={thresholds.temperature.max}
          unit="°C"
        />
        <CircularLevel
          title="Humidity"
          value={data[latest_index].humidity}
          min={thresholds.humidity.min}
          max={thresholds.humidity.max}
          unit="%"
        />
        <CircularLevel
          title="CO₂"
          value={data[latest_index].co2}
          min={thresholds.co2.min}
          max={thresholds.co2.max}
          unit="ppm"
        />
        <CircularLevel
          title="VOC"
          value={data[latest_index].voc}
          min={thresholds.voc.min}
          max={thresholds.voc.max}
          unit="ppb"
        />
        <CircularLevel
          title="Soil Moisture"
          value={data[latest_index].soilMoisture}
          min={thresholds.soilMoisture.min}
          max={thresholds.soilMoisture.max}
          unit="%"
        />
        <CircularLevel
          title="Light Intensity"
          value={data[latest_index].lightIntensity}
          min={thresholds.lightIntensity.min}
          max={thresholds.lightIntensity.max}
          unit="lux"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Combined Graphs */}
        <CombinedGraph
          title="Temperature and Humidity"
          data={data} // Pass full data for the graph
          metrics={[
            { key: 'temperature', name: 'Temperature (°C)', color: '#ff7300' },
            { key: 'humidity', name: 'Humidity (%)', color: '#0088fe' }
          ]}
        />
        <CombinedGraph
          title="CO₂ and VOC"
          data={data} // Pass full data for the graph
          metrics={[
            { key: 'co2', name: 'CO₂ (ppm)', color: '#00c49f' },
            { key: 'voc', name: 'VOC (ppb)', color: '#ff8042' }
          ]}
        />
        <CombinedGraph
          title="Soil Moisture and Light Intensity"
          data={data} // Pass full data for the graph
          metrics={[
            { key: 'soilMoisture', name: 'Soil Moisture (%)', color: '#8884d8' },
            { key: 'lightIntensity', name: 'Light (lux)', color: '#ffc658' }
          ]}
        />
      </div>
    </div>
  );
}
