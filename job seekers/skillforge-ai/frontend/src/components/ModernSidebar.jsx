import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  UserPlus,
  LogIn,
  LogOut,
  Award,
  Target,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Bell,
  MessageSquare
} from 'lucide-react';

// Mock user data for display
const mockUser = {
  full_name: 'Software Architect',
  target_job_role: 'Software Architect'
};

// Career progress (mock data)
const careerProgress = 65;
const jobMatchesCount = 12;
const skillsCompleted = 8;

const ModernSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [userProfile, setUserProfile] = useState(mockUser);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '/login';
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const menuSections = [
    {
      id: 'account',
      title: 'Account',
      icon: User,
      items: [
        {
          path: '/register',
          label: 'Register',
          icon: UserPlus,
          description: 'Create Account',
          badge: null
        },
        {
          path: '/login',
          label: 'Login',
          icon: LogIn,
          description: 'Sign In',
          badge: null
        },
        {
          path: '/dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          description: 'AI Analytics & Insights',
          badge: null
        },
        {
          path: '/profile',
          label: 'Profile',
          icon: User,
          description: 'Personal Information',
          badge: null
        },
        {
          path: '/resume-upload',
          label: 'Resume Upload & Analyzer',
          icon: Upload,
          description: 'AI Resume Analysis',
          badge: 'AI'
        },
        {
          path: '/skill-analyzer',
          label: 'Skill Analyzer',
          icon: Brain,
          description: 'AI Skill Assessment',
          badge: 'AI'
        },
        {
          path: '/career-roadmap',
          label: 'AI Career Roadmap',
          icon: Target,
          description: 'Personalized Career Plan',
          badge: 'AI'
        },
        {
          path: '/course-recommendations',
          label: 'Course Recommendation',
          icon: BookOpen,
          description: 'AI Learning Paths',
          badge: 'AI'
        },
        {
          path: '/github-projects',
          label: 'GitHub Project Recommendations',
          icon: Github,
          description: 'Project Showcase',
          badge: null
        },
        {
          path: '/job-search',
          label: 'Job Search',
          icon: Search,
          description: 'Find Your Dream Job',
          badge: null
        },
        {
          path: '/job-recommendations',
          label: 'Job Recommendation',
          icon: Briefcase,
          description: 'AI Job Matches',
          badge: null
        }
      ]
    }
  ];

  const ModernSidebarItem = ({ 
    icon: Icon, 
    label, 
    path, 
    description,
    badge,
    isActive = false,
    isSubItem = false 
  }) => {
    return (
      <NavLink to={path}>
        <motion.div
          whileHover={{ x: isSubItem ? 4 : 8 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative flex items-center ${isSubItem ? 'pl-12' : 'pl-4'} pr-4 py-3 rounded-xl transition-all duration-300
          ${isActive 
            ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white shadow-xl shadow-purple-500/25 border border-purple-400/30' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:border hover:border-purple-200/50'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
        >
          <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
            isCollapsed ? 'text-xl' : 'mr-3'
          } ${
            ({ isActive }) => isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'
          }`} />
          
          {/* Content */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium truncate">{label}</p>
                  {description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      {description}
                    </p>
                  )}
                </div>
                
                {/* Badge */}
                {badge && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      badge === 'AI' || badge === 'New' || badge === 'Beta' || badge === 'Live'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}
                  >
                    {badge}
                  </motion.span>
                )}
              </div>
            </div>
          )}
          
          {/* Hover Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity ${
            isSubItem ? 'left-0' : 'left-0'
          }`} />
        </motion.div>
      </NavLink>
    );
  };

  const MenuSection = ({ section }) => {
    const isExpanded = expandedSections[section.id];
    
    return (
      <div className="space-y-2">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <section.icon className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {section.title}
            </span>
          </div>
          {section.expandable && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSection(section.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Section Items */}
        <AnimatePresence>
          {(!section.expandable || isExpanded) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="space-y-1">
                {section.items.map((item) => (
                  <ModernSidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    description={item.description}
                    badge={item.badge}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeMobileSidebar}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 z-50 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    SkillForge AI
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeMobileSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mobile User Profile */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border-b border-gray-200/50 dark:border-gray-800/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {userProfile.full_name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {userProfile.target_job_role || 'Professional'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                  {menuSections.map((section) => (
                    <MenuSection key={section.id} section={section} />
                  ))}
                  
                  {/* Mobile Logout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-all duration-200 border border-red-200 dark:border-red-800"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`hidden lg:block fixed left-0 top-0 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 z-30 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-80'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      SkillForge AI
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Career Platform</p>
                  </div>
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                )}
              </motion.button>
            </div>
          </div>

          {/* User Profile Card */}
          {userProfile && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border-b border-gray-200/50 dark:border-gray-800/50"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/dashboard'}
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-800/50 cursor-pointer hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {userProfile.full_name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {userProfile.target_job_role || 'Professional'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                
                {/* Career Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Career Progress</span>
                    <span className="font-medium text-purple-600 dark:text-purple-400">{careerProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${careerProgress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/dashboard'}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    Dashboard
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/profile'}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-6">
            {menuSections.map((section) => (
              <MenuSection key={section.id} section={section} />
            ))}
            
            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-all duration-200 border border-red-200 dark:border-red-800"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && (
                <span className="font-medium">Logout</span>
              )}
            </motion.button>
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-6 border-t border-gray-200/50 dark:border-gray-800/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Version 2.0</span>
                  <span className="flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    Premium
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  © 2024 SkillForge AI. All rights reserved.
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </motion.button>
    </>
  );
};

export default ModernSidebar;
