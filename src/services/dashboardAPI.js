// API Service for AI Career Dashboard
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

class DashboardAPIService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('auth_token') || null
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Authentication
  async getToken() {
    try {
      const response = await this.request('/api/user/token', {
        method: 'POST'
      })
      
      if (response.token) {
        this.token = response.token
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('user_data', JSON.stringify(response.user))
      }
      
      return response
    } catch (error) {
      console.error('Get token error:', error)
      throw error
    }
  }

  // Dashboard Stats
  async getDashboardStats() {
    return await this.request('/api/dashboard/stats')
  }

  // Job Recommendations
  async getJobRecommendations() {
    return await this.request('/api/recommendations/jobs')
  }

  // Course Recommendations
  async getCourseRecommendations() {
    return await this.request('/api/recommendations/courses')
  }

  // User Skills
  async getUserSkills() {
    return await this.request('/api/user/skills')
  }

  // Skill Gap Analysis
  async getSkillGapAnalysis() {
    return await this.request('/api/analytics/skill-gap')
  }

  // Market Insights
  async getMarketInsights() {
    return await this.request('/api/market-insights')
  }

  // Activity Timeline
  async getActivityTimeline() {
    return await this.request('/api/activity-timeline')
  }

  // Health Check
  async healthCheck() {
    return await this.request('/api/health')
  }

  // Clear authentication
  logout() {
    this.token = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  // Get stored user data
  getUserData() {
    const userData = localStorage.getItem('user_data')
    return userData ? JSON.parse(userData) : null
  }
}

export default new DashboardAPIService()
