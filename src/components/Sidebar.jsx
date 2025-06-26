// File: src/components/Sidebar.jsx
import React from 'react';
import {
  BarChart3,
  FileText,
  Brain,
  Search,
  UploadCloud,
  Settings,
  BrainCircuit,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = ({ onClose, isMobile }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Upload CSV', icon: <UploadCloud size={20} />, href: '#upload' },
    { label: 'Insight Summary', icon: <FileText size={20} />, href: '#summary' },
    { label: 'Auto Insights', icon: <Brain size={20} />, href: '#auto-insights' },
    { label: 'Charts', icon: <BarChart3 size={20} />, href: '#charts' },
    { label: 'Search Data', icon: <Search size={20} />, href: '#search' },
    { label: 'ML Inference', icon: <BrainCircuit size={20} />, href: '/ml-inference' },
  ];

  const handleNav = (href) => {
    if (href.startsWith('#')) {
      window.location.hash = href;
    } else {
      navigate(href);
    }
    if (isMobile && onClose) onClose();
  };

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-r dark:border-gray-700 w-64 shadow-xl"
    >
      <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
        <h1 className="text-2xl font-extrabold text-pink-600 dark:text-pink-400">
          InsightAI
        </h1>
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav(item.href)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left bg-gradient-to-r from-pink-50 to-white dark:from-gray-800 dark:to-gray-900 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-800 dark:hover:to-purple-900"
          >
            <span className="text-pink-600 dark:text-pink-300">{item.icon}</span>
            <span className="font-medium text-gray-800 dark:text-white">{item.label}</span>
          </motion.button>
        ))}

        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleNav('/settings')}
          className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left bg-gradient-to-r from-pink-50 to-white dark:from-gray-800 dark:to-gray-900 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-800 dark:hover:to-purple-900"
        >
          <Settings size={20} className="text-pink-600 dark:text-pink-300" />
          <span className="font-medium text-gray-800 dark:text-white">Settings</span>
        </motion.button>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
