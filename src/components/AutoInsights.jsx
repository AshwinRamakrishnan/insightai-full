import React, { useState } from 'react';
import { useDataContext } from '../context/DataContext';
import { Lightbulb, Table2, Sparkles, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const AutoInsightsML = () => {
  const { summary, headers, selectedColumn, setSelectedColumn } = useDataContext();
  const [viewMode, setViewMode] = useState('smart');

  const getSmartInsights = () => {
    if (!selectedColumn || !summary[selectedColumn]) return [];

    const columnStats = summary[selectedColumn];
    const insights = [];

    if (columnStats.type === 'numeric') {
      if (columnStats.avg > 10000) insights.push('🔍 Average is very high. Cost control needed.');
      else if (columnStats.avg < 100) insights.push('✅ Average looks optimal and balanced.');

      insights.push(`📈 Min: ${columnStats.min}, Max: ${columnStats.max}`);
      insights.push(`📊 Median: ${columnStats.median}, Mode: ${columnStats.mode}`);
      insights.push(`📉 Count: ${columnStats.count}, Missing: ${columnStats.nulls}`);
    } else {
      insights.push(`🧠 Unique Values: ${columnStats.unique}`);
      insights.push(`⭐ Most Frequent: "${columnStats.top}"`);
    }

    return insights;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Brain className="text-pink-500 animate-pulse" /> Smart ML Insights
        </h2>
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'smart'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setViewMode('smart')}
          >
            🔍 Smart ML View
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setViewMode('grid')}
          >
            📊 Summary Grid
          </button>
        </div>
      </div>

      {viewMode === 'smart' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Select a column:</label>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            className="w-full p-2 mb-4 rounded border dark:bg-gray-700 dark:text-white"
          >
            {headers.map((header) => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>

          <div className="space-y-2">
            {getSmartInsights().map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 p-3 rounded-lg text-gray-800 dark:text-gray-100 shadow"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {viewMode === 'grid' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {headers.map((header) => {
            const col = summary[header];
            if (!col) return null;

            return (
              <div
                key={header}
                className="border-l-4 border-pink-500 dark:border-pink-300 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-indigo-900 rounded-xl shadow p-4"
              >
                <h4 className="text-md font-semibold text-pink-600 dark:text-pink-300 mb-1 flex items-center gap-1">
                  <Table2 size={16} /> {header}
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {col.type === 'numeric' ? (
                    <>
                      <li>Min: {col.min}</li>
                      <li>Max: {col.max}</li>
                      <li>Avg: {col.avg}</li>
                      <li>Median: {col.median}</li>
                      <li>Mode: {col.mode}</li>
                      <li>Count: {col.count}</li>
                    </>
                  ) : (
                    <>
                      <li>Unique: {col.unique}</li>
                      <li>Most Common: "{col.top}"</li>
                    </>
                  )}
                  <li>Missing: {col.nulls}</li>
                </ul>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default AutoInsightsML;
