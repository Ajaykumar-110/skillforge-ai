/**
 * SkillForge AI - API Service
 * Centralized API service for all backend communications
 */

import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Real API endpoints
const REAL_APIS = {
  // Job APIs
  adzuna: {
    baseUrl: 'https://api.adzuna.com/v1/api/jobs/us',
    appId: import.meta.env.VITE_ADZUNA_APP_ID || 'your_app_id',
    apiKey: import.meta.env.VITE_ADZUNA_API_KEY || 'your_api_key'
  },
  // GitHub API
  github: {
    baseUrl: 'https://api.github.com',
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  },
  // Course APIs
  udemy: {
    baseUrl: 'https://www.udemy.com/api-2.0',
    headers: {
      'Authorization': `Basic ${btoa(`${import.meta.env.VITE_UDEMY_CLIENT_ID || 'client_id'}:${import.meta.env.VITE_UDEMY_CLIENT_SECRET || 'client_secret'}`)}`
    }
  },
  // LinkedIn Jobs (scraping approach)
  linkedin: {
    baseUrl: 'https://www.linkedin.com/jobs/search'
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service Object
const apiService = {
  // ========== AI CHATBOT API ==========
  
  askChatbot: async (message, context = '') => {
    try {
      const response = await api.post('/api/chatbot', {
        message,
        context
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get AI response');
    }
  },

  evaluateInterviewAnswer: async (question, answer) => {
    try {
      const response = await api.post('/api/chatbot/evaluate-answer', {
        question,
        answer
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to evaluate answer');
    }
  },

  // ========== RESUME ANALYZER API ==========
  
  analyzeResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await api.post('/api/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to analyze resume');
    }
  },

  extractSkillsFromText: async (text) => {
    try {
      const response = await api.post('/api/extract-skills', {
        text
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to extract skills');
    }
  },

  // ========== GITHUB PROJECTS API ==========
  
  getGithubProjects: async (skills, difficulty = 'intermediate') => {
    try {
      const params = new URLSearchParams();
      skills.forEach(skill => params.append('skills', skill));
      params.append('difficulty', difficulty);
      
      const response = await api.get(`/api/github-projects?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get GitHub projects');
    }
  },

  searchGithubProjects: async (query, language = '', sort = 'stars', perPage = 10) => {
    try {
      const params = new URLSearchParams({
        query,
        sort,
        per_page: perPage.toString()
      });
      
      if (language) params.append('language', language);
      
      const response = await api.get(`/api/github-projects/search?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to search GitHub projects');
    }
  },

  getTrendingProjects: async (language = '', since = 'daily') => {
    try {
      const params = new URLSearchParams({ since });
      if (language) params.append('language', language);
      
      const response = await api.get(`/api/github-projects/trending?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get trending projects');
    }
  },

  getRepositoryDetails: async (owner, repo) => {
    try {
      const response = await api.get(`/api/github-projects/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get repository details');
    }
  },

  getLearningPath: async (projects, skill) => {
    try {
      const response = await api.post('/api/github-projects/learning-path', {
        projects,
        skill
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create learning path');
    }
  },

  // ========== COURSE RECOMMENDATIONS API ==========
  
  getRecommendedCourses: async (skills, limit = 10) => {
    try {
      const params = new URLSearchParams();
      skills.forEach(skill => params.append('skills', skill));
      params.append('limit', limit.toString());
      
      const response = await api.get(`/api/recommended-courses?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get course recommendations');
    }
  },

  getCoursesBySkill: async (skill, level = 'all', limit = 10) => {
    try {
      const params = new URLSearchParams({
        level,
        limit: limit.toString()
      });
      
      const response = await api.get(`/api/courses/${skill}?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get courses');
    }
  },

  getLearningPathCourses: async (targetRole, currentSkills) => {
    try {
      const response = await api.post('/api/courses/learning-path', {
        target_role: targetRole,
        current_skills: currentSkills
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get learning path courses');
    }
  },

  getPersonalizedRecommendations: async (userSkills, targetRole = '', budget = 'all') => {
    try {
      const response = await api.post('/api/courses/personalized', {
        user_skills: userSkills,
        target_role: targetRole,
        budget
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get personalized recommendations');
    }
  },

  // ========== REAL JOB SEARCH APIS ==========
  
  // Search jobs using Adzuna API
  searchJobsAdzuna: async (keyword, location = 'us', resultsPerPage = 20) => {
    try {
      const { appId, apiKey, baseUrl } = REAL_APIS.adzuna;
      
      const response = await axios.get(`${baseUrl}/${location}/search/1`, {
        params: {
          app_id: appId,
          app_key: apiKey,
          results_per_page: resultsPerPage,
          what: keyword,
          content_type: 'application/json'
        }
      });
      
      return {
        success: true,
        jobs: response.data.results.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company?.display_name || 'Unknown',
          location: job.location?.display_name || 'Remote',
          salary: job.salary_min && job.salary_max ? 
            `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}` : 
            'Competitive',
          type: 'Full-time',
          experience: 'Not specified',
          skills: extractSkillsFromDescription(job.description),
          match: calculateJobMatch(keyword, job.description),
          description: job.description?.substring(0, 200) + '...' || 'No description available',
          posted: job.created || 'Recently',
          applicants: Math.floor(Math.random() * 100) + 10,
          category: categorizeJob(job.title),
          url: job.redirect_url || `https://www.adzuna.com/jobs?kw=${encodeURIComponent(keyword)}`
        }))
      };
    } catch (error) {
      console.error('Adzuna API error:', error);
      // Fallback to LinkedIn search
      return searchJobsLinkedIn(keyword, location);
    }
  },

  // Search jobs using LinkedIn (redirect approach)
  searchJobsLinkedIn: async (keyword, location = 'United States') => {
    try {
      const searchUrl = `${REAL_APIS.linkedin.baseUrl}?keywords=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`;
      
      return {
        success: true,
        redirectUrl: searchUrl,
        message: 'Opening LinkedIn job search in new tab'
      };
    } catch (error) {
      throw new Error('Failed to search LinkedIn jobs');
    }
  },

  // Get GitHub repositories
  searchGitHubRepos: async (keyword, sort = 'stars', order = 'desc', perPage = 20) => {
    try {
      const response = await axios.get(`${REAL_APIS.github.baseUrl}/search/repositories`, {
        headers: REAL_APIS.github.headers,
        params: {
          q: keyword,
          sort: sort,
          order: order,
          per_page: perPage
        }
      });
      
      return {
        success: true,
        repositories: response.data.items.map(repo => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description || 'No description available',
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          issues: repo.open_issues_count,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          size: repo.size,
          topics: repo.topics || [],
          license: repo.license?.name || 'No license',
          isPrivate: repo.private,
          defaultBranch: repo.default_branch,
          url: repo.html_url,
          cloneUrl: repo.clone_url,
          suggestedUse: `Learn ${repo.language || 'development'} with this ${repo.name}`,
          difficulty: assessDifficulty(repo.stargazers_count, repo.forks_count),
          matchedSkill: extractPrimarySkill(repo.name, repo.description, repo.language)
        }))
      };
    } catch (error) {
      console.error('GitHub API error:', error);
      throw new Error('Failed to fetch GitHub repositories');
    }
  },

  // Search Udemy courses
  searchUdemyCourses: async (keyword, category = '', price = 'price-low', perPage = 20) => {
    try {
      const response = await axios.get(`${REAL_APIS.udemy.baseUrl}/courses/`, {
        headers: REAL_APIS.udemy.headers,
        params: {
          search: keyword,
          category: category,
          ordering: price,
          page_size: perPage,
          fields: 'id,title,url,price,is_paid,image_240x135,headline,instructors,rating,num_reviews,num_subscribers,content_length,created,modified,primary_category,primary_subcategory'
        }
      });
      
      return {
        success: true,
        courses: response.data.results.map(course => ({
          id: course.id,
          title: course.title,
          instructor: course.instructors?.[0]?.display_name || 'Unknown',
          platform: 'Udemy',
          rating: course.rating || 0,
          reviews: course.num_reviews || 0,
          price: course.is_paid ? course.price : 'Free',
          originalPrice: course.is_paid ? `$${Math.floor(parseFloat(course.price) * 2)}` : 'Free',
          duration: course.content_length ? `${Math.floor(course.content_length / 3600)} hours` : 'Self-paced',
          level: 'All Levels',
          students: course.num_subscribers || 0,
          lastUpdated: new Date(course.modified).toLocaleDateString(),
          language: 'English',
          certificate: true,
          image: course.image_240x135,
          description: course.headline || 'No description available',
          topics: extractTopicsFromTitle(course.title),
          skills: extractSkillsFromTitle(course.title),
          difficulty: 'intermediate',
          matchScore: calculateCourseMatch(keyword, course.title, course.headline),
          category: course.primary_category?.title || 'General',
          url: course.url
        }))
      };
    } catch (error) {
      console.error('Udemy API error:', error);
      // Fallback to Udemy search redirect
      return {
        success: true,
        redirectUrl: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(keyword)}`,
        message: 'Opening Udemy course search in new tab'
      };
    }
  },

  // ========== JOB MARKET API ==========
  
  getJobMarketData: async (skills, location = 'united states') => {
    try {
      const params = new URLSearchParams();
      skills.forEach(skill => params.append('skills', skill));
      params.append('location', location);
      
      const response = await api.get(`/api/job-market?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get job market data');
    }
  },

  getSalaryTrends: async (skill, location = 'united states', months = 12) => {
    try {
      const params = new URLSearchParams({
        location,
        months: months.toString()
      });
      
      const response = await api.get(`/api/job-market/salary-trends/${skill}?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get salary trends');
    }
  },

  getTopCompanies: async (skill, location = 'united states', limit = 10) => {
    try {
      const params = new URLSearchParams({
        location,
        limit: limit.toString()
      });
      
      const response = await api.get(`/api/job-market/top-companies/${skill}?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get top companies');
    }
  },

  getJobPredictions: async (skills, location = 'united states') => {
    try {
      const params = new URLSearchParams();
      skills.forEach(skill => params.append('skills', skill));
      params.append('location', location);
      
      const response = await api.get(`/api/job-market/predictions?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get job predictions');
    }
  },

  // ========== UTILITY METHODS ==========
  
  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Health check failed');
    }
  },

  // Test API connectivity
  testApi: async () => {
    try {
      const response = await api.get('/api/test');
      return response.data;
    } catch (error) {
      throw new Error('API test failed');
    }
  }
};

// ========== HELPER FUNCTIONS FOR REAL APIS ==========

// Extract skills from job description
const extractSkillsFromDescription = (description) => {
  if (!description) return [];
  
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'Docker', 
    'SQL', 'MongoDB', 'TypeScript', 'Angular', 'Vue.js', 'Git', 'CI/CD',
    'Machine Learning', 'Data Science', 'DevOps', 'Kubernetes', 'Terraform',
    'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Scala', 'Swift', 'Kotlin'
  ];
  
  const foundSkills = [];
  const desc = description.toLowerCase();
  
  commonSkills.forEach(skill => {
    if (desc.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });
  
  return foundSkills.slice(0, 5); // Return max 5 skills
};

// Calculate job match score
const calculateJobMatch = (keyword, description) => {
  if (!keyword || !description) return 70;
  
  const keywords = keyword.toLowerCase().split(' ');
  const desc = description.toLowerCase();
  
  let matchScore = 50; // Base score
  
  keywords.forEach(kw => {
    if (desc.includes(kw)) {
      matchScore += 10;
    }
  });
  
  return Math.min(matchScore, 95);
};

// Categorize job based on title
const categorizeJob = (title) => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('data') || titleLower.includes('analyst') || titleLower.includes('scientist')) {
    return 'Data Science';
  } else if (titleLower.includes('frontend') || titleLower.includes('react') || titleLower.includes('vue')) {
    return 'Frontend';
  } else if (titleLower.includes('backend') || titleLower.includes('node') || titleLower.includes('api')) {
    return 'Backend';
  } else if (titleLower.includes('devops') || titleLower.includes('cloud') || titleLower.includes('aws')) {
    return 'DevOps';
  } else if (titleLower.includes('security') || titleLower.includes('cyber')) {
    return 'Security';
  } else if (titleLower.includes('mobile') || titleLower.includes('ios') || titleLower.includes('android')) {
    return 'Mobile';
  } else if (titleLower.includes('designer') || titleLower.includes('ui') || titleLower.includes('ux')) {
    return 'UI/UX';
  } else if (titleLower.includes('manager') || titleLower.includes('project')) {
    return 'Project';
  } else if (titleLower.includes('product')) {
    return 'Product';
  }
  
  return 'Software';
};

// Assess repository difficulty
const assessDifficulty = (stars, forks) => {
  if (stars > 10000 || forks > 2000) return 'advanced';
  if (stars > 1000 || forks > 200) return 'intermediate';
  return 'beginner';
};

// Extract primary skill from repo info
const extractPrimarySkill = (name, description, language) => {
  const text = `${name} ${description} ${language}`.toLowerCase();
  
  const skills = ['react', 'vue', 'angular', 'node', 'python', 'java', 'docker', 'kubernetes', 'aws'];
  
  for (const skill of skills) {
    if (text.includes(skill)) {
      return skill.charAt(0).toUpperCase() + skill.slice(1);
    }
  }
  
  return language || 'General';
};

// Extract topics from course title
const extractTopicsFromTitle = (title) => {
  const topics = [];
  const titleLower = title.toLowerCase();
  
  const commonTopics = ['javascript', 'python', 'react', 'node', 'aws', 'docker', 'machine learning', 'data science', 'web development'];
  
  commonTopics.forEach(topic => {
    if (titleLower.includes(topic)) {
      topics.push(topic.charAt(0).toUpperCase() + topic.slice(1));
    }
  });
  
  return topics.slice(0, 3);
};

// Extract skills from course title
const extractSkillsFromTitle = (title) => {
  const skills = [];
  const titleLower = title.toLowerCase();
  
  const commonSkills = ['javascript', 'python', 'react', 'node.js', 'aws', 'docker', 'sql', 'git', 'html', 'css'];
  
  commonSkills.forEach(skill => {
    if (titleLower.includes(skill)) {
      skills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  });
  
  return skills.slice(0, 3);
};

// Calculate course match score
const calculateCourseMatch = (keyword, title, description) => {
  if (!keyword) return 70;
  
  const keywords = keyword.toLowerCase().split(' ');
  const text = `${title} ${description}`.toLowerCase();
  
  let matchScore = 50;
  
  keywords.forEach(kw => {
    if (text.includes(kw)) {
      matchScore += 10;
    }
  });
  
  return Math.min(matchScore, 95);
};

export default apiService;
