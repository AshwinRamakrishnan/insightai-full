// File: src/pages/SettingsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseInit'; // ✅ Firebase import

const SettingsPage = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md sm:max-w-lg md:max-w-xl text-center">
        {/* Profile Section */}
        <img
          src={user?.photoURL || 'https://i.pravatar.cc/120'}
          alt="User"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500"
        />
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          {user?.displayName || 'Your Name'}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">
          {user?.email || 'your-email@example.com'}
        </p>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-3 rounded-md mb-4">
          <span className="font-medium text-sm sm:text-base">🌙 Dark Mode</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer dark:peer-checked:bg-indigo-500 transition duration-200 relative">
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isDarkMode ? 'translate-x-5' : ''}`}></div>
            </div>
          </label>
        </div>

        {/* Contact Info */}
        <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 p-3 rounded-md mb-4 text-sm sm:text-base">
          🔒 Secure Data Sync Enabled
        </div>

        {/* Links */}
        <div className="text-left mt-6 space-y-2">
          <h3 className="font-semibold mb-1">📞 Contact & Help</h3>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <li><a href="mailto:support@example.com" className="hover:underline">support@example.com</a></li>
            <li><a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" className="hover:underline">LinkedIn</a></li>
            <li><a href="https://yourwebsite.com" target="_blank" className="hover:underline">Website</a></li>
          </ul>
        </div>


        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;