// File: src/components/UploadCSV.jsx
import React, { useState } from 'react';
import Papa from 'papaparse';
import { useDataContext } from '../context/DataContext';
import { UploadCloud, FileCheck2 } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadCSV = () => {
  const { updateData } = useDataContext();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [dragging, setDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleFile = (file) => {
    if (!file || !file.name.endsWith('.csv')) {
      alert('❌ Please upload a valid CSV file.');
      return;
    }

    setUploading(true);
    setUploadedFileName(file.name);
    setProgress('🧠 Reading your data...');

    const allRows = [];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      chunk: (results) => {
        allRows.push(...results.data);
        setProgress(`📊 Parsed ${allRows.length} rows...`);
      },
      complete: () => {
        try {
          updateData(allRows);
          setProgress('📦 Uploading to server...');
          sendToBackend(file);
        } catch (err) {
          console.error('🚨 Local parsing error:', err);
          setProgress('❌ Upload failed.');
          setUploading(false);
        }
      },
      error: (err) => {
        console.error('❌ CSV Parsing error:', err);
        alert('❌ Failed to parse CSV.');
        setUploading(false);
      }
    });
  };

  const sendToBackend = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/api/train', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setProgress('✅ Model trained successfully!');
      })
      .catch((err) => {
        console.error('🚨 Backend training error:', err);
        setProgress(`❌ Failed: ${err.message}`);
      })
      .finally(() => {
        setTimeout(() => {
          setUploading(false);
          setProgress('');
        }, 2500);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full border-4 border-dashed p-8 mt-6 rounded-2xl shadow-md transition-all duration-300 ${
        dragging ? 'border-pink-400 bg-pink-50' : 'border-pink-300 bg-white dark:bg-gray-800'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <UploadCloud className="w-12 h-12 text-pink-500 animate-bounce" />
        <p className="text-xl font-semibold text-gray-800 dark:text-white mt-2">
          Drag & Drop CSV
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
          or click below to choose
        </p>
        <label className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer">
          Select CSV File
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {uploadedFileName && !uploading && (
          <div className="mt-5 flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-md shadow-sm border border-green-200">
            <FileCheck2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium truncate max-w-sm">
              {uploadedFileName}
            </span>
          </div>
        )}

        {uploading && (
          <p className="mt-4 text-pink-600 font-medium animate-pulse">
            {progress}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default UploadCSV;
