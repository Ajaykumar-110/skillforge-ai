import React, { useState, useEffect } from 'react'
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  ExternalLink, 
  Filter, 
  Search,
  Users,
  TrendingUp,
  Calendar,
  Star,
  Heart,
  Share2,
  Bookmark,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
  Globe,
  Home,
  Laptop,
  Shield,
  Award
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'

const JobSearch = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedSalary, setSelectedSalary] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [savedJobs, setSavedJobs] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState('list')

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

  // Job types
  const jobTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ]

  // Comprehensive mock job data
  const enhancedMockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      salary: '$120,000 - $180,000',
      type: 'Full-time',
      experience: 'Senior Level (6-10 years)',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
      match: 95,
      description: 'We are looking for an experienced Frontend Developer to join our growing team and help build amazing user experiences.',
      posted: '1 day ago',
      applicants: 127,
      category: 'Software Development',
      url: 'https://www.linkedin.com/jobs/view/senior-frontend-developer',
      companySize: '1000-5000',
      industry: 'Technology',
      benefits: ['Health Insurance', '401k', 'Remote Work', 'Stock Options'],
      rating: 4.5,
      reviews: 234,
      remote: true,
      hybrid: false,
      urgent: true,
      featured: true
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'DataMinds Inc',
      location: 'New York, NY',
      salary: '$100,000 - $150,000',
      type: 'Remote',
      experience: 'Mid Level (3-5 years)',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Data Visualization'],
      match: 88,
      description: 'Join our data science team to work on cutting-edge ML projects and drive data-driven decisions.',
      posted: '3 days ago',
      applicants: 89,
      category: 'Data Science',
      url: 'https://www.linkedin.com/jobs/view/data-scientist',
      companySize: '500-1000',
      industry: 'Analytics',
      benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Gym Membership'],
      rating: 4.3,
      reviews: 156,
      remote: true,
      hybrid: false,
      urgent: false,
      featured: false
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Creative Studios',
      location: 'Austin, TX',
      salary: '$80,000 - $120,000',
      type: 'Hybrid',
      experience: 'Mid Level (3-5 years)',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      match: 82,
      description: 'We need a talented UX Designer to create beautiful and intuitive user interfaces for our products.',
      posted: '1 week ago',
      applicants: 67,
      category: 'UI/UX Design',
      url: 'https://www.linkedin.com/jobs/view/ux-designer',
      companySize: '100-500',
      industry: 'Design',
      benefits: ['Health Insurance', 'Remote Work', 'Creative Budget', 'Team Events'],
      rating: 4.7,
      reviews: 89,
      remote: false,
      hybrid: true,
      urgent: false,
      featured: true
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      location: 'Seattle, WA',
      salary: '$110,000 - $160,000',
      type: 'Full-time',
      experience: 'Senior Level (6-10 years)',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
      match: 91,
      description: 'Looking for a DevOps expert to help us scale our infrastructure and improve deployment processes.',
      posted: '2 days ago',
      applicants: 103,
      category: 'DevOps',
      url: 'https://www.linkedin.com/jobs/view/devops-engineer',
      companySize: '500-1000',
      industry: 'Cloud Services',
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', 'Training Budget'],
      rating: 4.4,
      reviews: 178,
      remote: false,
      hybrid: false,
      urgent: true,
      featured: false
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Boston, MA',
      salary: '$90,000 - $140,000',
      type: 'Hybrid',
      experience: 'Mid Level (3-5 years)',
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research', 'Roadmapping'],
      match: 79,
      description: 'Join our product team to drive product strategy and work with cross-functional teams.',
      posted: '4 days ago',
      applicants: 92,
      category: 'Product Management',
      url: 'https://www.linkedin.com/jobs/view/product-manager',
      companySize: '100-500',
      industry: 'SaaS',
      benefits: ['Health Insurance', 'Equity', 'Flexible Schedule', 'Wellness Program'],
      rating: 4.6,
      reviews: 145,
      remote: false,
      hybrid: true,
      urgent: false,
      featured: false
    },
    {
      id: 6,
      title: 'Backend Developer',
      company: 'StartupHub',
      location: 'Remote',
      salary: '$70,000 - $110,000',
      type: 'Remote',
      experience: 'Entry Level (0-2 years)',
      skills: ['Python', 'Django', 'PostgreSQL', 'REST API', 'Git'],
      match: 75,
      description: 'Great opportunity for junior developers to grow their skills in a fast-paced startup environment.',
      posted: '1 week ago',
      applicants: 234,
      category: 'Software Development',
      url: 'https://www.linkedin.com/jobs/view/backend-developer',
      companySize: '10-50',
      industry: 'Startup',
      benefits: ['Health Insurance', 'Unlimited PTO', 'Learning Budget', 'Remote Work'],
      rating: 4.2,
      reviews: 67,
      remote: true,
      hybrid: false,
      urgent: false,
      featured: false
    }
  ]

  // Load jobs on component mount
  useEffect(() => {
    loadJobs()
  }, [])

  // Filter jobs whenever filters change
  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, selectedCategory, selectedExperience, selectedLocation, selectedSalary, selectedType, sortBy])

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
      console.error('Failed to load jobs:', error)
      setJobs(enhancedMockJobs)
      setFilteredJobs(enhancedMockJobs)
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = [...jobs]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory)
    }

    // Experience filter
    if (selectedExperience !== 'all') {
      filtered = filtered.filter(job => job.experience.includes(selectedExperience))
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => 
        job.type.toLowerCase().includes(selectedType.toLowerCase())
      )
    }

    // Sort jobs
    switch (sortBy) {
      case 'relevance':
        filtered.sort((a, b) => b.match - a.match)
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.posted) - new Date(a.posted))
        break
      case 'salary':
        filtered.sort((a, b) => {
          const aSalary = parseInt(a.salary.split('-')[1].replace(/[^0-9]/g, ''))
          const bSalary = parseInt(b.salary.split('-')[1].replace(/[^0-9]/g, ''))
          return bSalary - aSalary
        })
        break
      case 'applicants':
        filtered.sort((a, b) => a.applicants - b.applicants)
        break
      default:
        break
    }

    setFilteredJobs(filtered)
  }

  const saveJob = (jobId) => {
    if (!savedJobs.includes(jobId)) {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const removeSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(id => id !== jobId))
  }

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 bg-green-50'
    if (match >= 75) return 'text-blue-600 bg-blue-50'
    if (match >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'remote': return <Home className="w-4 h-4" />
      case 'hybrid': return <Laptop className="w-4 h-4" />
      default: return <Briefcase className="w-4 h-4" />
    }
  }

  // Chart data
  const categoryData = jobCategories.slice(1).map(category => ({
    category: category.split(' ')[0],
    jobs: jobs.filter(job => job.category === category).length
  }))

  const experienceData = experienceLevels.slice(1).map(level => ({
    level: level.label.split(' ')[0],
    jobs: jobs.filter(job => job.experience.includes(level.value)).length
  }))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your perfect job...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Search</h1>
          <p className="text-gray-600 mt-1">Find your dream job from {jobs.length}+ opportunities</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Filters</span>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {[selectedCategory, selectedExperience, selectedType].filter(f => f !== 'all').length}
            </span>
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="relevance">Most Relevant</option>
            <option value="recent">Most Recent</option>
            <option value="salary">Highest Salary</option>
            <option value="applicants">Fewest Applicants</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
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

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
              <select
                value={selectedSalary}
                onChange={(e) => setSelectedSalary(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Salaries</option>
                <option value="0-50">$0 - $50,000</option>
                <option value="50-100">$50,000 - $100,000</option>
                <option value="100-150">$100,000 - $150,000</option>
                <option value="150+">$150,000+</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{filteredJobs.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Available Jobs</h3>
          <p className="text-xs text-gray-500 mt-1">Matching your criteria</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {filteredJobs.length > 0 ? Math.round(filteredJobs.reduce((acc, job) => acc + job.match, 0) / filteredJobs.length) : 0}%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Avg Match Score</h3>
          <p className="text-xs text-gray-500 mt-1">Based on your profile</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{savedJobs.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Saved Jobs</h3>
          <p className="text-xs text-gray-500 mt-1">Bookmarked positions</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {new Set(jobs.map(job => job.company)).size}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Companies</h3>
          <p className="text-xs text-gray-500 mt-1">Hiring now</p>
        </div>
      </div>

      {/* Job Listings */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Job Opportunities</h3>
          <div className="text-sm text-gray-500">
            {filteredJobs.length} of {jobs.length} jobs
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className={`border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300 ${job.featured ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' : ''}`}>
              {job.urgent && (
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Urgently Hiring</span>
                  </span>
                  {job.featured && (
                    <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getMatchColor(job.match)}`}>
                      {job.match}% Match
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      {getTypeIcon(job.type)}
                      <span className="text-xs">{job.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{job.skills.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{job.applicants} applicants</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{job.rating} ({job.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>{job.companySize}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => savedJobs.includes(job.id) ? removeSavedJob(job.id) : saveJob(job.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          savedJobs.includes(job.id) 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => window.open(job.url, '_blank')}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                      >
                        <span>Apply Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jobs by Category */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Jobs by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="jobs" fill="#6366f1" name="Number of Jobs" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Jobs by Experience */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Jobs by Experience Level</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={experienceData.filter(exp => exp.jobs > 0)}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="jobs"
                label={({level, jobs}) => `${level}: ${jobs}`}
              >
                {experienceData.filter(exp => exp.jobs > 0).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default JobSearch
