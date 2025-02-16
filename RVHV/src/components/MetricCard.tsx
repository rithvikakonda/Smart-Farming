import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { CircularLevel } from './CircularLevel';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  prediction?: number;
}

export function MetricCard({ title, value, unit, min, max, prediction }: MetricCardProps) {
  const getStatus = (value: number, min: number, max: number) => {
    if (value < min) return { text: 'Below Range', color: 'text-red-500' };
    if (value > max) return { text: 'Above Range', color: 'text-red-500' };
    return { text: 'Normal', color: 'text-green-500' };
  };

  const status = getStatus(value, min, max);
  const trend = prediction && prediction > value ? TrendingUp : TrendingDown;
  const TrendIcon = trend;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
        <div className={`flex items-center ${status.color}`}>
          {status.text !== 'Normal' && <AlertTriangle className="w-4 h-4 mr-1" />}
          <span className="text-sm">{status.text}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <CircularLevel
          title=""
          value={value}
          min={min}
          max={max}
          unit={unit}
        />
        
        {prediction && (
          <div className="ml-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <TrendIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">Predicted:</span>
            </div>
            <div className="text-lg font-semibold dark:text-white">
              {prediction.toFixed(1)} {unit}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Min: {min} {unit}</span>
        <span>Max: {max} {unit}</span>
      </div>
    </div>
  );
}