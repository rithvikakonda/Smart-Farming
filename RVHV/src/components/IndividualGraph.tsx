import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  timestamp: string;
  value: number;
}

interface IndividualGraphProps {
  data: DataPoint[];
  title: string;
  color: string;
  yAxisLabel: string;
}

export function IndividualGraph({ data, title, color, yAxisLabel }: IndividualGraphProps) {
  // Calculate min and max values for the Y-axis dynamically
  const values = data.map((point) => point.value);
  const yAxisMin = Math.min(...values);
  const yAxisMax = Math.max(...values);

  // Format data for Chart.js
  const chartData = {
    labels: data.map((point) => new Date(point.timestamp).toLocaleTimeString()), // x-axis labels as time strings
    datasets: [
      {
        label: title,
        data: values, // y-axis values
        borderColor: color,
        backgroundColor: color,
        fill: false,
        tension: 0, // Straight line (no smoothing)
        pointRadius: 3, // Small dots for data points
        pointBackgroundColor: color, // Color of the dots
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            // Display the value of the hovered point with timestamp
            return `${context.dataset.label}: ${context.raw} at ${context.label}`;
          },
        },
      },
      legend: {
        display: false, // Hides the default legend
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
        min: yAxisMin - 5, // Dynamic min value with padding
        max: yAxisMax + 5, // Dynamic max value with padding
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">{title}</h3>
      <div className="h-[300px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
