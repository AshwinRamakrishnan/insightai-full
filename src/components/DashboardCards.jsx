
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
        const nullCount = column.filter((v) => v === '' || v === null || v === undefined).length;

        let numericColumn = column.map((v) => parseFloat(v)).filter((v) => !isNaN(v));
        const stats = numericColumn.length > 0
          ? {
              type: 'numeric',
              count: numericColumn.length,
              min: Math.min(...numericColumn),
              max: Math.max(...numericColumn),
              avg:
                Math.round(
                  numericColumn.reduce((a, b) => a + b, 0) / numericColumn.length * 100
                ) / 100,
            }
          : {
              type: 'string',
              unique: uniqueValues.length,
              top: column.sort((a, b) =>
                column.filter((v) => v === b).length - column.filter((v) => v === a).length
              )[0],
            };

        summaryData[key] = {
          ...stats,
          nulls: nullCount,
        };
      });

      setSummary(summaryData);
    }
  };

  return (
    <DataContext.Provider value={{ csvData, headers, updateData, summary, selectedColumn, setSelectedColumn }}>
      {children}
    </DataContext.Provider>
  );
};



export const useDataContext = () => useContext(DataContext);