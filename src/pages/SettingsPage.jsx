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
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:block md:w-64">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
          <div className="relative z-50 w-64">
            <Sidebar onClose={() => setSidebarOpen(false)} isMobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-col flex-1 overflow-y-auto">
        <Topbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <section className="p-4 sm:p-6 max-w-5xl w-full mx-auto">
          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-6 sm:p-10 transition-all duration-300">

            {/* 👤 User Info */}
            <div className="flex flex-col items-center text-center">
              <img
                src={user?.photoURL || 'https://i.pravatar.cc/120'}
                alt="User Avatar"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mb-4 border-4 border-indigo-500 shadow-lg"
              />
              <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">
                {user?.displayName || 'Your Name'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email || 'your-email@example.com'}
              </p>
            </div>

            {/* 🌙 Dark Mode Toggle */}
            <div className="mt-6 max-w-xs mx-auto flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-3 rounded-xl shadow-md">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">🌙 Enable Dark Mode</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  aria-label="Toggle Dark Mode"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                      isDarkMode ? 'translate-x-5' : ''
                    }`}
                  />
                </div>
              </label>
            </div>

            {/* 🚀 About Section */}
            <div className="mt-8 p-5 bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 rounded-xl shadow-inner">
              <h3 className="text-lg font-semibold mb-2">About TN_FUTECX</h3>
              <p className="text-sm leading-relaxed">
                <strong>TN_FUTECX</strong> is a mini tech startup founded by <strong>Ashwin Ramakrishnan</strong>, focusing on building AI/ML-powered tools and platforms to empower youth and create social impact through innovation.
              </p>
              <p className="mt-2 text-xs italic text-gray-600 dark:text-gray-400">
                Want to collaborate or learn more? Reach out using the links below.
              </p>
            </div>

            {/* 🎞️ Slider Showcase */}
            <div className="mt-10 overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 px-2 w-[max-content]">
                {sliderItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="min-w-[250px] sm:min-w-[300px] p-4 rounded-xl shadow-md"
                    style={{ backgroundColor: item.bg }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4 className="font-semibold text-indigo-700">{item.title}</h4>
                    <p className="text-sm text-gray-800 mt-1 dark:text-gray-100">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 📞 Contact Grid */}
            <div className="mt-10 text-left">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Contact & Help</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:tnfutecx@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:shadow-lg transition"
                  aria-label="Send Email"
                >
                  <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" alt="Email" className="w-6 h-6" />
                  <span className="text-sm dark:text-white">tnfutecx@gmail.com</span>
                </a>
                <a
                  href="https://www.instagram.com/tn_futecx"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-pink-100 dark:bg-pink-900 hover:shadow-lg transition"
                >
                  <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" className="w-6 h-6" />
                  <span className="text-sm dark:text-white">@tn_futecx</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ashwin-ramakrishnan-b328a6298"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 hover:shadow-lg transition"
                >
                  <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
                  <span className="text-sm dark:text-white">Ashwin Ramakrishnan</span>
                </a>
                <a
                  href="https://tn-futecx.web.app"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-green-100 dark:bg-green-900 hover:shadow-lg transition"
                >
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
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
