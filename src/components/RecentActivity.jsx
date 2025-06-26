import React from 'react';
import { useDataContext } from '../context/DataContext';

const RecentActivity = () => {
  const { csvData, headers } = useDataContext();

  const recentRows = csvData.slice(0, 5); // Show only top 5 rows

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Data Preview</h2>

      {recentRows.length === 0 ? (
        <p className="text-gray-500">No data available. Please upload a CSV file.</p>
      ) : (
        <div className="overflow-auto max-h-[300px]">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-4 py-2 text-sm text-gray-800 border border-gray-200"
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
