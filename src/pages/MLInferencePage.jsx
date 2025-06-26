import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit } from 'lucide-react';
import Sidebar from '../components/Sidebar';

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
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar with glitter bg */}
      <div className="w-64 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-700 text-white shadow-2xl relative z-10">
        <Sidebar />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,#ffffff22_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse z-0" />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex flex-col items-center overflow-y-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <BrainCircuit className="w-10 h-10 text-indigo-600 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-indigo-800 tracking-wide">
            ML Inference Playground
          </h2>
        </motion.div>

        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder='Enter input data as JSON...'
          className="w-full max-w-2xl border border-gray-300 shadow-md rounded-xl p-4 focus:outline-indigo-500 focus:ring-2 bg-white resize-none"
          rows={6}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleInfer}
          className="mt-5 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 animate-ping" />
          {loading ? 'Predicting...' : 'Run Prediction'}
        </motion.button>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-t-4 border-b-4 border-indigo-300 animate-pulse" />
            </div>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-8 w-full max-w-2xl bg-white border border-indigo-200 rounded-2xl shadow-xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-2">
              🎯 Prediction Result
            </h3>
            <pre className="text-gray-800 text-base whitespace-pre-wrap break-words">
              {JSON.stringify(result, null, 2)}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MLInferencePage;
