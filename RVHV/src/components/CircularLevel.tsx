import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CircularLevelProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit: string;
}

export function CircularLevel({ value, min, max, title, unit }: CircularLevelProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  const getColor = (value: number, min: number, max: number) => {
    if (value < min || value > max) return '#ef4444';
    if (value < min + (max - min) * 0.25 || value > max - (max - min) * 0.25) return '#eab308';
    return '#22c55e';
  };

  const color = getColor(value, min, max);
  const isOutOfRange = value < min || value > max;

  return (
    <div className="relative flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2 dark:text-white flex items-center gap-2">
        {title}
        {isOutOfRange && (
          <AlertTriangle className="h-4 w-4 text-red-500" />
        )}
      </h3>
      
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Level indicator */}
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${(clampedPercentage * 351.8584) / 100} 351.8584`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold dark:text-white">
            {value.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {unit}
          </span>
        </div>
      </div>

      <div className="flex justify-between w-full mt-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}