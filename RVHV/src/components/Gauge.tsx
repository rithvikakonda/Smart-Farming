import React from 'react';
import { Circle } from 'lucide-react';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit: string;
}

export function Gauge({ value, min, max, title, unit }: GaugeProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  const getColor = (value: number, min: number, max: number) => {
    if (value < min || value > max) return 'text-red-500';
    if (value < min + (max - min) * 0.25 || value > max - (max - min) * 0.25) return 'text-yellow-500';
    return 'text-green-500';
  };

  const rotation = (clampedPercentage / 100) * 180 - 90;
  const color = getColor(value, min, max);

  return (
    <div className="relative flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-8 border-gray-200 dark:border-gray-700" />
          <div 
            className="absolute top-1/2 left-1/2 w-12 h-1 bg-blue-500 origin-left"
            style={{ transform: `rotate(${rotation}deg) translateX(4px)` }}
          />
          <Circle className={`absolute w-4 h-4 ${color}`} />
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="text-2xl font-bold dark:text-white">
          {value.toFixed(1)}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
          {unit}
        </span>
      </div>
      <div className="flex justify-between w-full mt-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}