// File: src/layouts/DesktopLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import InsightBot from '../components/InsightBot';
import MyUploads from '../components/MyUploads';




<MyUploads />


import UploadCSV from '../components/UploadCSV';
import InsightSummary from '../components/InsightSummary';
import AutoInsights from '../components/AutoInsights';
import SmartChart from '../components/SmartChart';
import SmartSearch from '../components/SmartSearch';
import SettingsPanel from '../pages/SettingsPage';

const DesktopLayout = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 overflow-auto max-w-screen-xl mx-auto w-full space-y-8">
          <section id="upload">
            <UploadCSV />
          </section>
          <section id="summary">
            <InsightSummary />
          </section>
          <section id="auto-insights">
            <AutoInsights />
          </section>
          <section id="charts">
            <SmartChart />
          </section>
          <section id="search">
            <SmartSearch />
          </section>
<main className="p-6 overflow-auto space-y-6">
  
  <section id="assistant">
    <InsightBot />
  </section>
</main>
       
        </main>
      </div>
    </div>
  );
};

export default DesktopLayout;

