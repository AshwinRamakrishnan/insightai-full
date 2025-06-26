// File: src/components/ExportButtons.jsx
import React from 'react';
import { useDataContext } from '../context/DataContext';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportButtons = () => {
  const { summary } = useDataContext();

  const downloadCSV = () => {
    const rows = [['Column', 'Type', 'Nulls', 'Min', 'Max', 'Average/Top/Unique']];
    Object.entries(summary).forEach(([key, val]) => {
      rows.push([
        key,
        val.type,
        val.nulls,
        val.min ?? '-',
        val.max ?? '-',
        val.avg ?? val.top ?? val.unique
      ]);
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', 'insight_summary.csv');
    document.body.appendChild(link);
    link.click();
  };

  const downloadPDF = async () => {
    const element = document.getElementById('summary-section');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('insight_summary.pdf');
  };

  return (
    <div className="flex gap-3 mt-4">
      <button onClick={downloadCSV} className="bg-green-500 text-white px-4 py-2 rounded">
        Export CSV
      </button>
      <button onClick={downloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded">
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
