import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useDataContext } from '../context/DataContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SmartChartML = () => {
  const { summary, selectedColumn } = useDataContext();

  if (!summary || !selectedColumn || !summary[selectedColumn]) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-6 text-gray-500">
        📉 No data available for chart.
      </div>
    );
  }

  const col = summary[selectedColumn];

  const barData = {
    labels: ['Min', 'Max', 'Avg', 'Median', 'Mode'],
    datasets: [
      {
        label: selectedColumn,
        data: [col.min, col.max, col.avg, col.median, col.mode],
        backgroundColor: '#f472b6',
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ['Top', 'Unique', 'Missing'],
    datasets: [
      {
        label: selectedColumn,
        data: [1, col.unique, col.nulls],
        backgroundColor: ['#f472b6', '#c084fc', '#60a5fa'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        📊 Smart ML Chart for "{selectedColumn}"
      </h2>
      {col.type === 'numeric' ? (
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      ) : (
        <Pie data={pieData} options={{ responsive: true }} />
      )}
    </div>
  );
};

export default SmartChartML;
