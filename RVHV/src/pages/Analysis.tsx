import Predict from '../hooks/Predict';
import { useThingSpeak } from '../hooks/useThingSpeak';
import { MetricCard } from '../components/MetricCard';

const thresholds = {
  temperature: { min: 18, max: 30 },
  humidity: { min: 40, max: 80 },
  co2: { min: 400, max: 1200 },
  voc: { min: 0, max: 500 },
  soilMoisture: { min: 20, max: 80 },
  lightIntensity: { min: 1000, max: 10000 }
};

// Mock predictions (in a real app, these would come from the backend)
 //(current: number) => current + (Math.random() - 0.5) * 5;
 
 //console.log(Prediction)
export function Analysis() {
  const {Prediction,Preloading} = Predict();
  const { data, loading, error } = useThingSpeak();
  if (loading || Preloading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!data || data.length === 0) return null;
  
  const latestData = data[9]; // Get the latest data point
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Temperature"
          value={latestData.temperature}
          unit="°C"
          min={thresholds.temperature.min}
          max={thresholds.temperature.max}
          prediction={Prediction.temperature}
        />
        <MetricCard
          title="Humidity"
          value={latestData.humidity}
          unit="%"
          min={thresholds.humidity.min}
          max={thresholds.humidity.max}
          prediction={Prediction.humidity}
        />
        <MetricCard
          title="CO₂"
          value={latestData.co2}
          unit="ppm"
          min={thresholds.co2.min}
          max={thresholds.co2.max}
          prediction={Prediction.co2}
        />
        <MetricCard
          title="VOC"
          value={latestData.voc}
          unit="ppb"
          min={thresholds.voc.min}
          max={thresholds.voc.max}
          prediction={Prediction.voc}
        />
        <MetricCard
          title="Soil Moisture"
          value={latestData.soilMoisture}
          unit="%"
          min={thresholds.soilMoisture.min}
          max={thresholds.soilMoisture.max}
          prediction={Prediction.soilMoisture}
        />
        <MetricCard
          title="Light Intensity"
          value={latestData.lightIntensity}
          unit="lux"
          min={thresholds.lightIntensity.min}
          max={thresholds.lightIntensity.max}
          prediction={Prediction.lightIntensity}
        />
      </div>
    </div>
  );
}
