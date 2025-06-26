import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseInit';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const SettingsPage = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sliderItems = [
    { id: 1, title: '🚀 Innovating with AI', desc: 'Smarter, faster, scalable apps.', bg: '#e0f2fe' },
    { id: 2, title: '🌱 Empowering Youth', desc: 'Helping developers shape the future.', bg: '#fef3c7' },
    { id: 3, title: '🌍 Tech for Change', desc: 'Innovation that impacts society.', bg: '#f3e8ff' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {/* Mobile Sidebar (toggleable) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <Sidebar onClose={() => setSidebarOpen(false)} isMobile />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Topbar */}
        <Topbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-6 sm:p-10 transition-all duration-300">

            {/* 👤 Profile */}
            <div className="flex flex-col items-center">
              <img
                src={user?.photoURL || 'https://i.pravatar.cc/120'}
                alt="User"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mb-4 border-4 border-indigo-500 shadow-md"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 dark:text-indigo-300">
                {user?.displayName || 'Your Name'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email || 'your-email@example.com'}
              </p>
            </div>

            {/* 🌙 Dark Mode */}
            <div className="mt-6 bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-xl flex justify-between items-center max-w-sm mx-auto shadow">
              <span className="font-medium text-sm text-gray-800 dark:text-gray-200">🌙 Dark Mode</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition">
                  <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform ${isDarkMode ? 'translate-x-5' : ''}`} />
                </div>
              </label>
            </div>

            {/* 🚀 About Section */}
            <div className="mt-8 bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 p-5 rounded-xl text-left shadow-inner">
              <h3 className="text-lg font-semibold mb-2">🚀 About TN_FUTECX</h3>
              <p className="text-sm leading-relaxed">
                <strong>TN_FUTECX</strong> is a mini tech startup founded by <strong>Ashwin Ramakrishnan</strong>, focused on crafting innovative AI/ML solutions. We believe in empowering young minds to build technologies that change lives.
              </p>
              <p className="mt-2 text-xs italic text-gray-600 dark:text-gray-400">
                Want to collaborate or learn more? Connect below.
              </p>
            </div>

            {/* 🎞️ Slider */}
            <div className="mt-10 w-full overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 animate-slide px-2 w-[max-content]">
                {sliderItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="min-w-[250px] sm:min-w-[300px] p-4 rounded-xl shadow-md"
                    style={{ backgroundColor: item.bg }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4 className="font-bold text-indigo-700">{item.title}</h4>
                    <p className="text-sm mt-2 text-gray-700">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 📞 Contact */}
            <div className="text-left mt-10">
              <h3 className="font-semibold text-lg mb-4 text-indigo-700 dark:text-indigo-300">📞 Contact & Help</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="mailto:tnfutecx@gmail.com" className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:shadow-lg transition">
                  <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" alt="Mail" className="w-6 h-6" />
                  <span className="text-sm dark:text-white">tnfutecx@gmail.com</span>
                </a>
                <a href="https://www.instagram.com/tn_futecx" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-pink-100 dark:bg-pink-900 p-3 rounded-lg hover:shadow-lg transition">
                  <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" className="w-6 h-6" />
                  <span className="text-sm dark:text-white">@tn_futecx</span>
                </a>
                <a href="https://www.linkedin.com/in/ashwin-ramakrishnan-b328a6298" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-blue-100 dark:bg-blue-900 p-3 rounded-lg hover:shadow-lg transition">
                  <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
                  <span className="text-sm dark:text-white">Ashwin Ramakrishnan</span>
                </a>
                <a href="https://tn-futecx.web.app" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-green-100 dark:bg-green-900 p-3 rounded-lg hover:shadow-lg transition">
                  <img src="https://img.icons8.com/ios-filled/50/000000/domain.png" alt="Website" className="w-6 h-6" />
                  <span className="text-sm dark:text-white">tn-futecx.web.app</span>
                </a>
              </div>
            </div>

            {/* 🔙 Back Button */}
            <button
              onClick={() => navigate('/')}
              className="mt-10 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
            >
              ⬅ Back to Dashboard
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
