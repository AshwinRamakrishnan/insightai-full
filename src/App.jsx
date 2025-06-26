// File: src/App.jsx
import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import LoginEnforcer from './components/LoginEnforcer';
import MobileLayout from './layouts/MobileLayout';
import DesktopLayout from './layouts/DesktopLayout';
import SettingsPage from './pages/SettingsPage';
import MLInferencePage from './pages/MLInferencePage'; // ✅ already imported

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isMobile ? (
                  <MobileLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                ) : (
                  <DesktopLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                )
              }
            />
            <Route
              path="/settings"
              element={<SettingsPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
            />
            
            {/* ✅ Added ML Inference Route */}
            <Route
              path="/ml-inference"
              element={<MLInferencePage />}
            />
          </Routes>
          <LoginEnforcer />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
