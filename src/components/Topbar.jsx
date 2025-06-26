// File: src/components/Topbar.jsx
import React from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Topbar = ({ sidebarOpen, toggleSidebar }) => {
  const { user, login, logout } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 shadow px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-20">
      {/* Toggle Button (Mobile) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white flex-1 text-center md:text-left">
        Insight-AI
      </h1>

      {/* Auth Info */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
              {user.displayName || 'User'}
            </span>
            <img
              src={user.photoURL || '/default-avatar.png'}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={logout}
              className="text-xs text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={login}
            className="text-xs text-blue-600 hover:underline"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
