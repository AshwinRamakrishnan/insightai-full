import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginEnforcer = () => {
  const { user, login, isLoggingIn } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        setShowLoginPrompt(true);
      }
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearTimeout(timer);
  }, [user]);

  if (!showLoginPrompt || user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-md text-center shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Login Required
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Please login to continue using the application.
        </p>
        <button
          onClick={login}
          disabled={isLoggingIn}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoggingIn ? 'Logging in...' : 'Login with Google'}
        </button>
      </div>
    </div>
  );
};

export default LoginEnforcer;
