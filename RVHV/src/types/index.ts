export interface SensorData {
  temperature: number;
  humidity: number;
  co2: number;
  voc: number;
  soilMoisture: number;
  lightIntensity: number;
  timestamp: string;
}

export interface ThresholdRange {
  min: number;
  max: number;
}

export interface Thresholds {
  temperature: ThresholdRange;
  humidity: ThresholdRange;
  co2: ThresholdRange;
  voc: ThresholdRange;
  soilMoisture: ThresholdRange;
  lightIntensity: ThresholdRange;
}

export type MetricKey = keyof SensorData;