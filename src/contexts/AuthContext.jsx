import React, { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token with backend
      verifyToken(token)
    } else {
      // No token found, user is not authenticated
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      // Mock verification - replace with real API call
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setIsAuthenticated(true)
      setUser({
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
        skills: ['JavaScript', 'React', 'Python']
      })
    } catch (error) {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      // Use real API service for login
      const response = await apiService.post('/api/auth/login', credentials);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to mock authentication for demo
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      setUser({
        id: 1,
        name: 'Demo User',
        email: credentials.email,
        skills: ['JavaScript', 'React', 'Python']
      });
      setIsAuthenticated(true);
      return { success: true };
    }
  }

  const register = async (userData) => {
    try {
      // Use real API service for registration
      const response = await apiService.post('/api/auth/register', userData);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Fallback to mock registration for demo
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      setUser({
        id: 1,
        name: userData.name,
        email: userData.email,
        skills: userData.skills || []
      });
      setIsAuthenticated(true);
      return { success: true };
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
