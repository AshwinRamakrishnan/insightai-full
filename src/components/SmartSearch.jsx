// File: src/components/SmartSearch.jsx
import React, { useState, useEffect } from 'react';
import { useDataContext } from '../context/DataContext';
import { Search } from 'lucide-react';

const SmartSearch = () => {
  const { csvData, headers } = useDataContext();
  const [query, setQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredRows([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = csvData.filter((row) =>
      headers.some((header) =>
        String(row[header] ?? '').toLowerCase().includes(lowerQuery)
      )
    );

    setFilteredRows(results.slice(0, 10));
  }, [query, csvData, headers]);

  return (
    <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Search className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="🔍 Smart Search your data..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {query && (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Showing <strong>{filteredRows.length}</strong> result(s):
          </p>
          <div className="overflow-auto max-h-64 border dark:border-gray-700 rounded-md">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="p-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                      >
                        {row[header] ?? '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
