import React, { useState } from 'react';
import UploadCSV from '../components/UploadCSV';
import Topbar from '../components/Topbar';
import InsightSummary from '../components/InsightSummary';
import AutoInsights from '../components/AutoInsights';
import SmartChart from '../components/SmartChart';
import SmartSearch from '../components/SmartSearch';
import SettingsPanel from '../pages/SettingsPage';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';
import InsightBot from '../components/InsightBot'; // ✅ Properly imported

const MobileLayout = ({ isDarkMode, toggleDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen relative">

      {/* ✅ Topbar */}
      <Topbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ✅ Sidebar for Mobile */}
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

      {/* ✅ Main Content Area */}
      <main className="p-4 pt-20 space-y-6">
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
                <section id="assistant">
                  <InsightBot />
                </section>
      </main>
    </div>
  );
};

export default MobileLayout;
