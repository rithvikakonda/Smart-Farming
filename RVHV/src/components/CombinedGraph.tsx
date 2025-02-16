import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  timestamp: string;
  [key: string]: number | string;
}

interface CombinedGraphProps {
  data: DataPoint[];
  metrics: {
    key: string;
    name: string;
    color: string;
  }[];
  title: string;
}

export function CombinedGraph({ data, metrics, title }: CombinedGraphProps) {
  // Calculate min and max values for the Y-axis dynamically based on all metrics
  const allValues = metrics.flatMap((metric) =>
    data.map((point) => point[metric.key] as number)
  );
  const yAxisMin = Math.min(...allValues);
  const yAxisMax = Math.max(...allValues);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke="#888"
            />
            <YAxis
              domain={[yAxisMin - 5, yAxisMax + 5]} // Add padding to the min/max values
              stroke="#888"
            />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleString()}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ccc',
              }}
            />
            <Legend />
            {metrics.map((metric) => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                name={metric.name}
                stroke={metric.color}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
