import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Upload,
  Brain,
  Code,
  Briefcase,
  Search,
  Github,
  BookOpen,
  TrendingUp,
  Mic,
  MessageSquare,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogIn,
  UserPlus
} from 'lucide-react';

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  path, 
  description,
  isCollapsed = false,
  onClick 
}) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => `
        group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-blue-500/25' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700'
        }
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      {/* Active indicator */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      {/* Icon */}
      <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
        isCollapsed ? 'text-lg' : ''
      }`} />
      
      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{label}</div>
          <div className="text-xs opacity-75 truncate">{description}</div>
        </div>
      )}
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </NavLink>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      path: '/register',
      label: 'Register',
      icon: UserPlus,
      description: 'Create New Account'
    },
    {
      path: '/login',
      label: 'Login',
      icon: LogIn,
      description: 'Sign In to Account'
    },
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'AI Analytics & Insights'
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: User,
      description: 'Personal Information'
    },
    {
      path: '/resume-upload',
      label: 'Resume Upload & Analyzer',
      icon: Upload,
      description: 'AI Resume Analysis & Insights'
    },
    {
      path: '/skills-roles',
      label: 'Skills & Roles',
      icon: Code,
      description: 'Career Pathways'
    },
    {
      path: '/job-recommendations',
      label: 'Job Recommendations',
      icon: Briefcase,
      description: 'AI-Powered Jobs'
    },
    {
      path: '/job-search',
      label: 'Job Search',
      icon: Search,
      description: 'Smart Job Search'
    },
    {
      path: '/github-projects',
      label: 'GitHub Projects',
      icon: Github,
      description: 'Learning Projects'
    },
    {
      path: '/course-recommendations',
      label: 'Course Recommendations',
      icon: BookOpen,
      description: 'Personalized Learning'
    },
    {
      path: '/job-market',
      label: 'Job Market Insights',
      icon: TrendingUp,
      description: 'Market Analytics'
    },
    {
      path: '/voice-interview',
      label: 'Voice Interview',
      icon: Mic,
      description: 'AI Interview Coach'
    },
    {
      path: '/chatbot',
      label: 'AI Chatbot',
      icon: MessageSquare,
      description: 'AI Career Assistant'
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem('sidebarCollapsed', !isCollapsed);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <motion.aside
          initial={false}
          animate={{ 
            width: isCollapsed ? 80 : 280,
            transition: { duration: 0.3, ease: 'easeInOut' }
          }}
          className="fixed left-0 top-0 h-screen bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 z-40 shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50">
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                {!isCollapsed && (
                  <div className="flex-1">
                    <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      SkillForge
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AI Career Platform</p>
                  </div>
                )}
              </div>
              
              {/* Collapse Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCollapse}
                className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </motion.button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <SidebarItem
                      {...item}
                      isCollapsed={isCollapsed}
                      onClick={closeMobileSidebar}
                    />
                  </motion.div>
                ))}
              </div>
            </nav>

            </div>
        </motion.aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileSidebar}
            />
            
            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-50 lg:hidden shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        SkillForge
                      </h1>
                      <p className="text-xs text-gray-500 dark:text-gray-400">AI Career Platform</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeMobileSidebar}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-2">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <SidebarItem
                          {...item}
                          onClick={closeMobileSidebar}
                        />
                      </motion.div>
                    ))}
                  </div>
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl z-30"
      >
        <Menu className="w-6 h-6" />
      </motion.button>
    </>
  );
};

export default Sidebar;
