import React, { useState } from 'react';
import UploadCSV from '../components/UploadCSV';
import Topbar from '../components/Topbar'; // already imported
import InsightSummary from '../components/InsightSummary';
import AutoInsights from '../components/AutoInsights';
import SmartChart from '../components/SmartChart';
import SmartSearch from '../components/SmartSearch';
import SettingsPanel from '../pages/SettingsPage';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';
import InsightBot from '../components/InsightBot';


const MobileLayout = ({ isDarkMode, toggleDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen relative">

      {/* ✅ Render Topbar component */}
      <Topbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Hamburger Toggle Button (Optional - Already Topbar has it) */}
      {/* You can remove this if Topbar already includes Menu */}
      {/* <button
        className="p-3 fixed top-4 left-4 z-50 rounded-md text-gray-800 dark:text-white bg-white dark:bg-gray-800 shadow md:hidden"
        onClick={toggleSidebar}
      >
        <Menu size={22} />
      </button> */}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={toggleSidebar}
        >
          <div
            className="absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} isMobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 pt-20 space-y-6">
        <section id="upload"><UploadCSV /></section>
        <section id="insight-summary"><InsightSummary /></section>
        <section id="auto-insights"><AutoInsights /></section>
        <section id="smart-chart"><SmartChart /></section>
        <section id="smart-search"><SmartSearch /></section>
        
         
      </main>
    </div>
  );
};

export default MobileLayout;
