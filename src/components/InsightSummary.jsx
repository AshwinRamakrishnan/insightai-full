import React from 'react';
import { useDataContext } from '../context/DataContext';
import ExportButtons from './ExportButtons';
import { Sparkles } from 'lucide-react';

const InsightSummary = () => {
  const { summary } = useDataContext();

  if (!summary || Object.keys(summary).length === 0) return null;

  return (
    <div
      id="summary-section"
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-bold flex items-center gap-2 text-pink-600 dark:text-pink-400 mb-4">
        <Sparkles className="text-yellow-400 animate-pulse" /> AI & ML Insight Summary
      </h2>
      <div className="overflow-auto mb-4">
        <table className="w-full table-auto text-sm border dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Column</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Nulls</th>
              <th className="px-4 py-2 text-left">Min</th>
              <th className="px-4 py-2 text-left">Max</th>
              <th className="px-4 py-2 text-left">Avg</th>
              <th className="px-4 py-2 text-left">Median</th>
              <th className="px-4 py-2 text-left">Mode</th>
              <th className="px-4 py-2 text-left">Unique</th>
              <th className="px-4 py-2 text-left">Top</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(summary).map(([col, stats]) => (
              <tr key={col} className="text-gray-600 dark:text-gray-200">
                <td className="px-4 py-2 font-medium">{col}</td>
                <td className="px-4 py-2">{stats.type}</td>
                <td className="px-4 py-2">{stats.nulls}</td>
                <td className="px-4 py-2">{stats.min ?? '-'}</td>
                <td className="px-4 py-2">{stats.max ?? '-'}</td>
                <td className="px-4 py-2">{stats.avg ?? '-'}</td>
                <td className="px-4 py-2">{stats.median ?? '-'}</td>
                <td className="px-4 py-2">{stats.mode ?? '-'}</td>
                <td className="px-4 py-2">{stats.unique ?? '-'}</td>
                <td className="px-4 py-2">{stats.top ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Export Buttons at Bottom */}
      <ExportButtons targetId="summary-section" />
    </div>
  );
};

export default InsightSummary;
