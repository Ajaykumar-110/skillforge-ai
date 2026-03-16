import React, { useState, useEffect } from 'react'
import { Briefcase, MapPin, DollarSign, Clock, Building, ExternalLink, Filter, Search, Users, TrendingUp, Calendar, Star, Heart, Share2, Bookmark, ChevronDown, X, CheckCircle, AlertCircle, Globe, Home, Laptop, Shield, Award, Zap, Target, Eye, Download, RefreshCw, Bell, MessageSquare, ThumbsUp, Send } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const JobRecommendations = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedSalary, setSelectedSalary] = useState('all')
  const [savedJobs, setSavedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('match')
  const [viewMode, setViewMode] = useState('cards')
  const [selectedJob, setSelectedJob] = useState(null)
  const [showJobDetail, setShowJobDetail] = useState(false)
  const [notifications, setNotifications] = useState([])

  // Enhanced job categories
  const jobCategories = [
    'all', 'Software Development', 'Data Science', 'UI/UX Design', 'Product Management',
    'Marketing', 'Sales', 'Customer Support', 'DevOps', 'Cybersecurity',
    'AI/ML', 'Cloud Computing', 'Mobile Development', 'QA/Testing', 'Blockchain'
  ]

  // Experience levels
  const experienceLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'expert', label: 'Expert Level (10+ years)' }
  ]

  // Comprehensive enhanced mock job data
  const enhancedMockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      type: 'Remote',
      salary: '$120,000 - $150,000',
      experience: 'Senior Level (5+ years)',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      match: 92,
      description: 'Join our frontend team to build amazing user experiences with modern React and TypeScript.',
      posted: '2 days ago',
      applicants: 45,
      category: 'Software Development',
      url: 'https://www.linkedin.com/jobs/view/senior-frontend-developer',
      companySize: '1000-5000',
      industry: 'Technology',
      growth: 'High',
      benefits: ['Health Insurance', '401k', 'Remote Work', 'Stock Options'],
      requirements: ['5+ years experience', 'React expertise', 'TypeScript knowledge']
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'DataMinds Inc',
      location: 'New York, NY',
      type: 'Hybrid',
      salary: '$110,000 - $140,000',
      experience: 'Mid Level (3-5 years)',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Data Visualization', 'R'],
      match: 88,
      description: 'Join our data science team to work on cutting-edge ML projects and drive data-driven decisions.',
      posted: '3 days ago',
      applicants: 89,
      category: 'Data Science',
      url: 'https://www.linkedin.com/jobs/view/data-scientist',
      companySize: '500-1000',
      industry: 'Analytics',
      growth: 'Very High',
      benefits: ['Health Insurance', '401k', 'Flexible Hours', 'Learning Budget'],
      requirements: ['3+ years experience', 'Python expertise', 'ML knowledge']
    }
  ]

  // Load jobs on component mount
  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setJobs(enhancedMockJobs)
        setFilteredJobs(enhancedMockJobs)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error loading jobs:', error)
      setLoading(false)
    }
  }

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory)
    }

    // Filter by experience
    if (selectedExperience !== 'all') {
      if (selectedExperience === 'entry') return job.experience.includes('0+') || job.experience.includes('1+')
      if (selectedExperience === 'mid') return job.experience.includes('2+') || job.experience.includes('3+')
      if (selectedExperience === 'senior') return job.experience.includes('5+')
      return true
    }

    setFilteredJobs(filtered)
  }, [searchTerm, selectedCategory, selectedExperience, jobs])

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (match >= 75) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (match >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getMatchBadge = (match) => {
    if (match >= 90) return 'Excellent Match'
    if (match >= 80) return 'Strong Match'
    if (match >= 70) return 'Good Match'
    return 'Potential Match'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job recommendations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Recommendations</h1>
          <p className="text-gray-600 mt-1">Personalized job matches based on your profile</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search jobs, companies, or skills..."
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {jobCategories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {experienceLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getMatchColor(job.match)}`}>
                {job.match}% Match
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                {job.salary}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                {job.type}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{job.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{job.posted}</span>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Assistant Chatbot */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Assistant
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Career guidance • Skill suggestions • Learning roadmap • Interview tips
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200/50 dark:border-purple-800/50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Career Guidance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get personalized career advice and job matching
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200/50 dark:border-green-800/50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Skill Suggestions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover skills you need for your target roles
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200/50 dark:border-orange-800/50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Learning Roadmap
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step-by-step learning paths for career growth
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Career Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'What skills do I need for a Senior Developer role?',
                'How can I improve my resume for ATS systems?',
                'What are the best practices for technical interviews?',
                'How do I negotiate a better salary?',
                'Which programming languages are most in demand?',
                'How can I transition to a management role?'
              ].map((question, index) => (
                <button
                  key={index}
                  className="text-left p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 border border border-gray-200 dark:border-gray-600"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {question}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Click to get AI-powered answer
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobRecommendations
