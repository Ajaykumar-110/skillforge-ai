// API Integration Service for SkillForge AI Platform
// This file handles real API connections to various platforms

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User Management APIs
  async getUserProfile(userId) {
    return this.request(`/user/profile/${userId}`);
  }

  async updateUserProfile(userId, profileData) {
    return this.request(`/user/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async uploadProfilePhoto(userId, photoFile) {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    return this.request(`/user/upload-photo/${userId}`, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  // Skills Management APIs
  async getUserSkills(userId) {
    return this.request(`/skills/user/${userId}`);
  }

  async updateUserSkills(userId, skills) {
    return this.request(`/skills/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ skills }),
    });
  }

  async getSkillRecommendations(userId) {
    return this.request(`/skills/recommendations/${userId}`);
  }

  async analyzeSkillGap(userId, targetRole) {
    return this.request(`/skills/gap-analysis/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ targetRole }),
    });
  }

  // Job Recommendations APIs
  async getJobRecommendations(userId, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/jobs/recommendations/${userId}?${queryParams}`);
  }

  async searchJobs(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/jobs/search?${queryParams}`);
  }

  async getJobDetails(jobId) {
    return this.request(`/jobs/${jobId}`);
  }

  async saveJob(userId, jobId) {
    return this.request(`/jobs/save/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ jobId }),
    });
  }

  async applyToJob(userId, jobId, applicationData) {
    return this.request(`/jobs/apply/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ jobId, ...applicationData }),
    });
  }

  async getSavedJobs(userId) {
    return this.request(`/jobs/saved/${userId}`);
  }

  async getAppliedJobs(userId) {
    return this.request(`/jobs/applied/${userId}`);
  }

  // Course Recommendations APIs
  async getCourseRecommendations(userId, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/courses/recommendations/${userId}?${queryParams}`);
  }

  async searchCourses(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/courses/search?${queryParams}`);
  }

  async getCourseDetails(courseId) {
    return this.request(`/courses/${courseId}`);
  }

  async enrollInCourse(userId, courseId) {
    return this.request(`/courses/enroll/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  async saveCourse(userId, courseId) {
    return this.request(`/courses/save/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  async getSavedCourses(userId) {
    return this.request(`/courses/saved/${userId}`);
  }

  async getEnrolledCourses(userId) {
    return this.request(`/courses/enrolled/${userId}`);
  }

  // GitHub Projects APIs
  async getGitHubProjects(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/github/projects?${queryParams}`);
  }

  async getProjectDetails(projectId) {
    return this.request(`/github/projects/${projectId}`);
  }

  async forkProject(userId, projectId) {
    return this.request(`/github/fork/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ projectId }),
    });
  }

  async saveProject(userId, projectId) {
    return this.request(`/github/save/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ projectId }),
    });
  }

  async getSavedProjects(userId) {
    return this.request(`/github/saved/${userId}`);
  }

  async getForkedProjects(userId) {
    return this.request(`/github/forked/${userId}`);
  }

  // Job Market Insights APIs
  async getJobMarketTrends() {
    return this.request('/insights/job-market-trends');
  }

  async getSkillDemandData() {
    return this.request('/insights/skill-demand');
  }

  async getSalaryInsights() {
    return this.request('/insights/salaries');
  }

  async getIndustryGrowth() {
    return this.request('/insights/industry-growth');
  }

  async getTopCompanies() {
    return this.request('/insights/top-companies');
  }

  // Voice Interview APIs
  async startInterviewSession(userId, interviewType) {
    return this.request(`/interview/start/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ interviewType }),
    });
  }

  async submitInterviewAnswer(sessionId, answer) {
    return this.request(`/interview/answer/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ answer }),
    });
  }

  async getInterviewFeedback(sessionId) {
    return this.request(`/interview/feedback/${sessionId}`);
  }

  async getInterviewHistory(userId) {
    return this.request(`/interview/history/${userId}`);
  }

  // AI Chatbot APIs
  async sendChatMessage(userId, message) {
    return this.request(`/chat/message/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getChatHistory(userId) {
    return this.request(`/chat/history/${userId}`);
  }

  async clearChatHistory(userId) {
    return this.request(`/chat/clear/${userId}`, {
      method: 'DELETE',
    });
  }

  // Resume Analysis APIs
  async uploadResume(userId, resumeFile) {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    
    return this.request(`/resume/upload/${userId}`, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async analyzeResume(userId) {
    return this.request(`/resume/analyze/${userId}`);
  }

  async getResumeAnalysis(userId) {
    return this.request(`/resume/analysis/${userId}`);
  }

  // Analytics and Tracking APIs
  async trackUserActivity(userId, activity) {
    return this.request(`/analytics/track/${userId}`, {
      method: 'POST',
      body: JSON.stringify(activity),
    });
  }

  async getUserAnalytics(userId) {
    return this.request(`/analytics/user/${userId}`);
  }

  async getPlatformAnalytics() {
    return this.request('/analytics/platform');
  }

  // External Platform Integration APIs
  async getGoogleCourses() {
    // Real Google Courses API integration
    try {
      const response = await fetch('https://coursera.org/api/courses.v1?q=google&limit=50');
      return await response.json();
    } catch (error) {
      console.error('Google Courses API error:', error);
      throw error;
    }
  }

  async getIBMCourses() {
    // Real IBM Courses API integration
    try {
      const response = await fetch('https://coursera.org/api/courses.v1?q=ibm&limit=50');
      return await response.json();
    } catch (error) {
      console.error('IBM Courses API error:', error);
      throw error;
    }
  }

  async getMicrosoftCourses() {
    // Real Microsoft Learn API integration
    try {
      const response = await fetch('https://learn.microsoft.com/api/catalog/');
      return await response.json();
    } catch (error) {
      console.error('Microsoft Courses API error:', error);
      throw error;
    }
  }

  async getRealJobPostings() {
    // Integration with real job APIs
    const jobSources = [
      {
        name: 'LinkedIn Jobs',
        url: 'https://api.linkedin.com/v2/jobSearch',
        headers: { 'Authorization': 'Bearer YOUR_LINKEDIN_TOKEN' }
      },
      {
        name: 'Indeed Jobs',
        url: 'https://api.indeed.com/ads/apisearch',
        headers: { 'Authorization': 'Bearer YOUR_INDEED_TOKEN' }
      },
      {
        name: 'Glassdoor Jobs',
        url: 'https://api.glassdoor.com/api/api.htm',
        headers: { 'Authorization': 'Bearer YOUR_GLASSDOOR_TOKEN' }
      }
    ];

    const jobPromises = jobSources.map(async (source) => {
      try {
        const response = await fetch(source.url, { headers: source.headers });
        return { source: source.name, data: await response.json() };
      } catch (error) {
        console.error(`${source.name} API error:`, error);
        return { source: source.name, error: error.message };
      }
    });

    return Promise.all(jobPromises);
  }

  async getGitHubProjectsReal() {
    // Real GitHub API integration
    try {
      const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=100', {
        headers: {
          'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('GitHub API error:', error);
      throw error;
    }
  }

  // ML Model Integration APIs
  async getMLRecommendations(userId, type) {
    return this.request(`/ml/recommendations/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ type }),
    });
  }

  async trainMLModel() {
    return this.request('/ml/train', {
      method: 'POST',
    });
  }

  async getMLModelStatus() {
    return this.request('/ml/status');
  }

  // Utility methods
  setAuthToken(token) {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.headers['Authorization'];
  }

  async testConnection() {
    try {
      const response = await this.request('/health');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

// Export the service and individual methods for easy importing
export default apiService;

// Export individual method groups for better organization
export const UserAPI = {
  getProfile: (userId) => apiService.getUserProfile(userId),
  updateProfile: (userId, data) => apiService.updateUserProfile(userId, data),
  uploadPhoto: (userId, file) => apiService.uploadProfilePhoto(userId, file),
};

export const SkillsAPI = {
  getUserSkills: (userId) => apiService.getUserSkills(userId),
  updateSkills: (userId, skills) => apiService.updateUserSkills(userId, skills),
  getRecommendations: (userId) => apiService.getSkillRecommendations(userId),
  analyzeGap: (userId, role) => apiService.analyzeSkillGap(userId, role),
};

export const JobsAPI = {
  getRecommendations: (userId, filters) => apiService.getJobRecommendations(userId, filters),
  search: (filters) => apiService.searchJobs(filters),
  getDetails: (jobId) => apiService.getJobDetails(jobId),
  save: (userId, jobId) => apiService.saveJob(userId, jobId),
  apply: (userId, jobId, data) => apiService.applyToJob(userId, jobId, data),
  getSaved: (userId) => apiService.getSavedJobs(userId),
  getApplied: (userId) => apiService.getAppliedJobs(userId),
};

export const CoursesAPI = {
  getRecommendations: (userId, filters) => apiService.getCourseRecommendations(userId, filters),
  search: (filters) => apiService.searchCourses(filters),
  getDetails: (courseId) => apiService.getCourseDetails(courseId),
  enroll: (userId, courseId) => apiService.enrollInCourse(userId, courseId),
  save: (userId, courseId) => apiService.saveCourse(userId, courseId),
  getSaved: (userId) => apiService.getSavedCourses(userId),
  getEnrolled: (userId) => apiService.getEnrolledCourses(userId),
  getGoogleCourses: () => apiService.getGoogleCourses(),
  getIBMCourses: () => apiService.getIBMCourses(),
  getMicrosoftCourses: () => apiService.getMicrosoftCourses(),
};

export const GitHubAPI = {
  getProjects: (filters) => apiService.getGitHubProjects(filters),
  getDetails: (projectId) => apiService.getProjectDetails(projectId),
  fork: (userId, projectId) => apiService.forkProject(userId, projectId),
  save: (userId, projectId) => apiService.saveProject(userId, projectId),
  getSaved: (userId) => apiService.getSavedProjects(userId),
  getForked: (userId) => apiService.getForkedProjects(userId),
  getRealProjects: () => apiService.getGitHubProjectsReal(),
};

export const InsightsAPI = {
  getJobMarketTrends: () => apiService.getJobMarketTrends(),
  getSkillDemand: () => apiService.getSkillDemandData(),
  getSalaryInsights: () => apiService.getSalaryInsights(),
  getIndustryGrowth: () => apiService.getIndustryGrowth(),
  getTopCompanies: () => apiService.getTopCompanies(),
};

export const InterviewAPI = {
  startSession: (userId, type) => apiService.startInterviewSession(userId, type),
  submitAnswer: (sessionId, answer) => apiService.submitInterviewAnswer(sessionId, answer),
  getFeedback: (sessionId) => apiService.getInterviewFeedback(sessionId),
  getHistory: (userId) => apiService.getInterviewHistory(userId),
};

export const ChatAPI = {
  sendMessage: (userId, message) => apiService.sendChatMessage(userId, message),
  getHistory: (userId) => apiService.getChatHistory(userId),
  clearHistory: (userId) => apiService.clearChatHistory(userId),
};

export const ResumeAPI = {
  upload: (userId, file) => apiService.uploadResume(userId, file),
  analyze: (userId) => apiService.analyzeResume(userId),
  getAnalysis: (userId) => apiService.getResumeAnalysis(userId),
};

export const AnalyticsAPI = {
  trackActivity: (userId, activity) => apiService.trackUserActivity(userId, activity),
  getUserAnalytics: (userId) => apiService.getUserAnalytics(userId),
  getPlatformAnalytics: () => apiService.getPlatformAnalytics(),
};

export const MLAPI = {
  getRecommendations: (userId, type) => apiService.getMLRecommendations(userId, type),
  trainModel: () => apiService.trainMLModel(),
  getStatus: () => apiService.getMLModelStatus(),
};

export const ExternalAPI = {
  getRealJobs: () => apiService.getRealJobPostings(),
  getRealCourses: () => Promise.all([
    apiService.getGoogleCourses(),
    apiService.getIBMCourses(),
    apiService.getMicrosoftCourses(),
  ]),
  getRealProjects: () => apiService.getGitHubProjectsReal(),
};
