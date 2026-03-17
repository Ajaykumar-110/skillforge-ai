import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Upload,
  Brain,
  Briefcase,
  Search,
  Github,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  MessageSquare,
  Target,
  LogOut
} from 'lucide-react';

const ModernSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const menuSections = [
    {
      id: 'main',
      title: 'MAIN',
      items: [
        {
          path: '/dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
        }
      ]
    },
    {
      id: 'user',
      title: 'USER',
      items: [
        {
          path: '/profile',
          label: 'Profile',
          icon: User,
        },
        {
          path: '/resume-upload',
          label: 'Resume Upload & Analyzer',
          icon: Upload,
        }
      ]
    },
    {
      id: 'ai-analysis',
      title: 'AI ANALYSIS',
      items: [
        {
          path: '/skill-analyzer',
          label: 'Skill Analyzer',
          icon: Brain,
        },
        {
          path: '/career-roadmap',
          label: 'AI Career Roadmap',
          icon: Target,
        }
      ]
    },
    {
      id: 'learning',
      title: 'LEARNING',
      items: [
        {
          path: '/course-recommendations',
          label: 'Course Recommendation',
          icon: BookOpen,
        },
        {
          path: '/github-projects',
          label: 'GitHub Project Recommendations',
          icon: Github,
        }
      ]
    },
    {
      id: 'jobs',
      title: 'JOBS',
      items: [
        {
          path: '/job-search',
          label: 'Job Search',
          icon: Search,
        },
        {
          path: '/job-recommendations',
          label: 'Job Recommendation',
          icon: Briefcase,
        }
      ]
    },
    {
      id: 'ai-assistant',
      title: 'AI ASSISTANT',
      items: [
        {
          path: '/ai-assistant',
          label: 'AI Career Chatbot',
          icon: MessageSquare,
        }
      ]
    }
  ];

  const MenuItem = ({ icon: Icon, label, path, isSubItem = false }) => {
    const isActive = location.pathname === path;
    
    return (
      <NavLink
        to={path}
        onClick={closeMobileSidebar}
        className={`group flex items-center ${isSubItem ? 'pl-4' : 'pl-3'} pr-3 py-2.5 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        } ${isCollapsed ? 'justify-center' : ''}`}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${
          isCollapsed ? '' : 'mr-3'
        } ${
          isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
        }`} />
        
        {!isCollapsed && (
          <span className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
            {label}
          </span>
        )}
      </NavLink>
    );
  };

  const MenuSection = ({ section }) => {
    const isExpanded = expandedSections[section.id];

    return (
      <div className="space-y-1">
        <button
          onClick={() => toggleSection(section.id)}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {!isCollapsed && <span>{section.title}</span>}
          {!isCollapsed && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          )}
        </button>
        
        <AnimatePresence>
          {(!isCollapsed || isExpanded) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              {section.items.map((item) => (
                <MenuItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isSubItem={true}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  SkillForge AI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Career Platform
                </p>
              </div>
            </motion.div>
          )}
          
          <div className="flex items-center space-x-2">
            {/* Desktop Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="w-4 h-4 text-gray-500" />
            </button>
            
            {/* Mobile Close */}
            <button
              onClick={closeMobileSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuSections.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium">Logout</span>
            )}
          </motion.button>
          
          {/* Version Info */}
          {!isCollapsed && (
            <div className="text-center">
              <p className="text-xs font-medium text-gray-900 dark:text-white">
                SkillForge AI
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Version 2.0
              </p>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-30"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};

export default ModernSidebar;
