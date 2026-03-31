import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import ModernSidebar from './ModernSidebar';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const { darkMode } = useTheme();
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Listen for sidebar collapse state changes
    const handleSidebarChange = () => {
      const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
      setIsCollapsed(collapsed);
      setSidebarWidth(collapsed ? 80 : 280);
    };

    // Initial check
    handleSidebarChange();

    // Listen for custom event
    window.addEventListener('sidebarChange', handleSidebarChange);
    
    return () => {
      window.removeEventListener('sidebarChange', handleSidebarChange);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      {/* Navbar - Fixed at top */}
      <Navbar />
      
      {/* Sidebar - Fixed on left */}
      <ModernSidebar />
      
      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="lg:ml-80 min-h-screen pt-16"
        style={{
          marginLeft: isCollapsed ? '80px' : '280px',
          transition: 'margin-left 0.3s ease-in-out'
        }}
      >
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Page Content */}
          {children}
        </div>
      </motion.main>

      {/* Mobile Content Adjustment */}
      <div className="lg:hidden">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="min-h-screen pt-16"
        >
          <div className="p-4 pb-20">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
