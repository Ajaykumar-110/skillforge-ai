import React, { createContext, useContext, useState, useEffect } from 'react';
import { themeConfigs } from '../theme/theme';

const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(localStorage.getItem('EduNova_theme_name') || 'royalBlue');

  useEffect(() => {
    localStorage.setItem('EduNova_theme_name', themeName);
    const config = themeConfigs[themeName] || themeConfigs.royalBlue;

    // Dynamically update index.css root variables to sync CSS gradients & background glows
    document.documentElement.style.setProperty('--accent-teal', config.primary);
    document.documentElement.style.setProperty('--accent-blue', config.info);
    document.documentElement.style.setProperty('--primary-dark', config.sidebar);
    
    // Update body radial glow variables (we can set temporary document body styles or root variables)
    document.documentElement.style.setProperty('--body-glow-1', config.bodyGlow1);
    document.documentElement.style.setProperty('--body-glow-2', config.bodyGlow2);
  }, [themeName]);

  const toggleTheme = () => {
    const themes = Object.keys(themeConfigs);
    const nextIndex = (themes.indexOf(themeName) + 1) % themes.length;
    setThemeName(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, toggleTheme, config: themeConfigs[themeName] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};
