// Utility functions
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const median = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

const mode = (arr) => {
  const frequency = {};
  let maxFreq = 0;
  let modes = [];

  for (const num of arr) {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
    }
  }

  for (const num in frequency) {
    if (frequency[num] === maxFreq) {
      modes.push(Number(num));
    }
  }

  return modes;
};

// 📊 Main analyzer function
export const analyzeCSVData = (data) => {
  const numericKeys = Object.keys(data[0]).filter((key) =>
    !isNaN(parseFloat(data[0][key]))
  );

  const summary = numericKeys.map((key) => {
    const values = data.map((row) => parseFloat(row[key])).filter(Boolean);
    return {
      column: key,
      count: values.length,
      mean: +mean(values).toFixed(2),
      median: +median(values).toFixed(2),
      mode: mode(values),
      min: Math.min(...values),
      max: Math.max(...values),
    };
  });

  return {
    totalRows: data.length,
    summary,
  };
};
