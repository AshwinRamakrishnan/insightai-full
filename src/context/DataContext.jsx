// File: src/context/DataContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [summary, setSummary] = useState({});
  const [selectedColumn, setSelectedColumn] = useState('');

  const updateData = (data) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      setHeaders(keys);
      setCsvData(data);
      setSelectedColumn(keys[0]);

      const summaryData = {};

      keys.forEach((key) => {
        const column = data.map((row) => row[key]);
        const uniqueValues = [...new Set(column)];
        const nullCount = column.filter(
          (v) => v === '' || v === null || v === undefined
        ).length;

        const numericColumn = column
          .map((v) => parseFloat(v))
          .filter((v) => !isNaN(v));

        let stats;
        if (numericColumn.length > 0) {
          // Numeric column summary
          const sum = numericColumn.reduce((a, b) => a + b, 0);
          const avg = Math.round((sum / numericColumn.length) * 100) / 100;
          const sorted = [...numericColumn].sort((a, b) => a - b);
          const mid = Math.floor(sorted.length / 2);
          const median =
            sorted.length % 2 !== 0
              ? sorted[mid]
              : (sorted[mid - 1] + sorted[mid]) / 2;
          const mode = numericColumn
            .reduce((acc, num) => {
              acc[num] = (acc[num] || 0) + 1;
              return acc;
            }, {});
          const top = Object.keys(mode).reduce((a, b) =>
            mode[a] > mode[b] ? a : b
          );

          stats = {
            type: 'numeric',
            count: numericColumn.length,
            min: Math.min(...numericColumn),
            max: Math.max(...numericColumn),
            avg,
            median,
            mode: parseFloat(top),
          };
        } else {
          // String column summary with fast frequency map
          const freqMap = {};
          let topValue = '';
          let maxCount = 0;

          for (let val of column) {
            if (val in freqMap) {
              freqMap[val]++;
            } else {
              freqMap[val] = 1;
            }

            if (freqMap[val] > maxCount) {
              topValue = val;
              maxCount = freqMap[val];
            }
          }

          stats = {
            type: 'string',
            unique: uniqueValues.length,
            top: topValue,
          };
        }

        summaryData[key] = {
          ...stats,
          nulls: nullCount,
        };
      });

      setSummary(summaryData);
    }
  };

  return (
    <DataContext.Provider
      value={{
        csvData,
        headers,
        updateData,
        summary,
        selectedColumn,
        setSelectedColumn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);


