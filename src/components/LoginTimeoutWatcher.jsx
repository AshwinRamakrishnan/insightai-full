// File: src/components/LoginTimeoutWatcher.jsx
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginTimeoutWatcher = () => {
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) return; // Already logged in – skip

    // Already enforced login before?
    const alreadyForced = localStorage.getItem('loginEnforced');
    if (alreadyForced) return;

    // Timer to trigger login after 2 mins
    const timer = setTimeout(() => {
      if (!user) {
        alert("Please login to continue using this app.");
        login(); // Trigger login
        localStorage.setItem('loginEnforced', 'true');
      }
    }, 2 * 60 * 1000); // 2 minutes in ms

    return () => clearTimeout(timer); // cleanup
  }, [user, login]);

  return null;
};

export default LoginTimeoutWatcher;
