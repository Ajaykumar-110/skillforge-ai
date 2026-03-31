import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
        ${isActive 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      {/* Active indicator */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Icon */}
      <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
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
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </NavLink>
  );
};

export default SidebarItem;
