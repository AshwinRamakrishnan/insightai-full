import React, { useState } from 'react';

const MLInferencePage = () => {
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInfer = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Inference failed:', error);
      setResult('Error during prediction');
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧠 ML Inference</h2>

      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder='Enter input data'
        className="w-full border border-gray-300 rounded p-2"
        rows={6}
      />

      <button
        onClick={handleInfer}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Result:</h3>
          <pre className="text-sm mt-2">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MLInferencePage;

