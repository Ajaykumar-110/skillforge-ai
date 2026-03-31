import React, { useState, useEffect } from 'react'
import { Github, Star, GitBranch, ExternalLink, Code, Users, Calendar, Filter, Search, TrendingUp } from 'lucide-react'
import apiService from '../services/api'
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
  Area,
  AreaChart
} from 'recharts'

const GitHubProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 2,
      name: 'scikit-learn',
      fullName: 'scikit-learn/scikit-learn',
      description: 'Machine learning in Python',
      language: 'Python',
      stars: 58000,
      forks: 26000,
      issues: 9000,
      createdAt: '2023-01-15',
      updatedAt: '2024-03-10',
      size: 2048,
      topics: ['machine-learning', 'python', 'data-science', 'scikit-learn'],
      license: 'BSD-3-Clause',
      isPrivate: false,
      defaultBranch: 'main',
      url: 'https://github.com/scikit-learn/scikit-learn',
      cloneUrl: 'https://github.com/scikit-learn/scikit-learn.git',
      suggestedUse: 'Learn machine learning with scikit-learn',
      difficulty: 'intermediate',
      matchedSkill: 'Python'
    },
    {
      id: 3,
      name: 'vue',
      fullName: 'vuejs/vue',
      description: 'The Progressive JavaScript Framework',
      language: 'JavaScript',
      stars: 207000,
      forks: 33000,
      issues: 600,
      createdAt: '2023-01-15',
      updatedAt: '2024-03-10',
      size: 2048,
      topics: ['vue', 'javascript', 'framework', 'frontend'],
      license: 'MIT',
      isPrivate: false,
      defaultBranch: 'main',
      url: 'https://github.com/vuejs/vue',
      cloneUrl: 'https://github.com/vuejs/vue.git',
      suggestedUse: 'Learn Vue.js framework',
      difficulty: 'intermediate',
      matchedSkill: 'Vue'
    },
    {
      id: 4,
      name: 'node',
      fullName: 'nodejs/node',
      description: 'Node.js JavaScript runtime',
      language: 'JavaScript',
      stars: 105000,
      forks: 29000,
      issues: 8000,
      createdAt: '2023-01-15',
      updatedAt: '2024-03-10',
      size: 2048,
      topics: ['nodejs', 'javascript', 'backend', 'runtime'],
      license: 'MIT',
      isPrivate: false,
      defaultBranch: 'main',
      url: 'https://github.com/nodejs/node',
      cloneUrl: 'https://github.com/nodejs/node.git',
      suggestedUse: 'Backend development with Node.js',
      difficulty: 'advanced',
      matchedSkill: 'Node.js'
    },
    {
      id: 5,
      name: 'docker',
      fullName: 'docker/docker',
      description: 'Docker - the open-source application container engine',
      language: 'Go',
      stars: 68000,
      forks: 19000,
      issues: 3000,
      createdAt: '2023-01-15',
      updatedAt: '2024-03-10',
      size: 2048,
      topics: ['docker', 'containers', 'go', 'devops'],
      license: 'Apache-2.0',
      isPrivate: false,
      defaultBranch: 'main',
      url: 'https://github.com/docker/docker',
      cloneUrl: 'https://github.com/docker/docker.git',
      suggestedUse: 'Learn containerization with Docker',
      difficulty: 'advanced',
      matchedSkill: 'Docker'
    },
    {
      id: 6,
      name: 'tensorflow',
      fullName: 'tensorflow/tensorflow',
      description: 'An Open Source Machine Learning Framework',
      language: 'C++',
      stars: 185000,
      forks: 75000,
      issues: 5000,
      createdAt: '2023-01-15',
      updatedAt: '2024-03-10',
      size: 2048,
      topics: ['tensorflow', 'machine-learning', 'deep-learning', 'ai'],
      license: 'Apache-2.0',
      isPrivate: false,
      defaultBranch: 'main',
      url: 'https://github.com/tensorflow/tensorflow',
      cloneUrl: 'https://github.com/tensorflow/tensorflow.git',
      suggestedUse: 'Deep learning with TensorFlow',
      difficulty: 'advanced',
      matchedSkill: 'TensorFlow'
    }
  ])

  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const languages = ['all', 'JavaScript', 'Python', 'Vue', 'TypeScript', 'Java', 'Go']
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

  const languageData = [
    { name: 'JavaScript', count: 2, color: '#f7df1e' },
    { name: 'Python', count: 1, color: '#3776ab' },
    { name: 'Vue', count: 1, color: '#4fc08d' }
  ]

  const activityData = [
    { month: 'Jan', commits: 45, issues: 12 },
    { month: 'Feb', commits: 52, issues: 8 },
    { month: 'Mar', commits: 48, issues: 15 },
    { month: 'Apr', commits: 61, issues: 10 },
    { month: 'May', commits: 55, issues: 18 },
    { month: 'Jun', commits: 67, issues: 14 }
  ]

  const difficultyData = [
    { level: 'Beginner', count: 1, color: '#10b981' },
    { level: 'Intermediate', count: 3, color: '#3b82f6' },
    { level: 'Advanced', count: 0, color: '#ef4444' }
  ]

  // Handler functions
  const handleAdvancedFilters = () => {
    alert('Advanced filters feature coming soon! You\'ll be able to filter by stars, forks, and more.')
  }

  const handleSyncGitHub = async () => {
    try {
      alert('Syncing with GitHub... This will connect to your GitHub account to fetch your repositories.')
      // Future: Call API to sync with GitHub
      // const response = await apiService.syncGitHub()
      // setProjects(response.projects)
    } catch (error) {
      console.error('Failed to sync GitHub:', error)
      alert('Failed to sync with GitHub. Please try again.')
    }
  }

  const handleCloneProject = (cloneUrl) => {
    // Copy clone URL to clipboard
    navigator.clipboard.writeText(cloneUrl).then(() => {
      alert('Clone URL copied to clipboard! Use: git clone ' + cloneUrl)
    }).catch(() => {
      alert('Failed to copy URL. Please copy manually: ' + cloneUrl)
    })
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      
      // Try real GitHub API first
      const response = await apiService.searchGitHubRepos('react', 'stars', 'desc', 20)
      
      if (response.success && response.repositories) {
        setProjects(response.repositories)
        setFilteredProjects(response.repositories)
      } else {
        // Fallback to mock data
        setProjects(mockProjects)
        setFilteredProjects(mockProjects)
      }
    } catch (error) {
      console.error('Error loading projects:', error)
      // Fallback to mock data
      setProjects(mockProjects)
      setFilteredProjects(mockProjects)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(project => project.language === selectedLanguage)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(project => project.difficulty === selectedDifficulty)
    }

    setFilteredProjects(filtered)
  }, [searchTerm, selectedLanguage, selectedDifficulty, projects])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50'
      case 'intermediate': return 'text-blue-600 bg-blue-50'
      case 'advanced': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': '#f7df1e',
      'Python': '#3776ab',
      'Vue': '#4fc08d',
      'TypeScript': '#3178c6',
      'Java': '#007396',
      'Go': '#00add8'
    }
    return colors[language] || '#6b7280'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">GitHub Projects</h1>
          <p className="text-gray-600 mt-1">Discover projects matching your skills</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleAdvancedFilters}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </button>
          <button 
            onClick={handleSyncGitHub}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Sync GitHub
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{filteredProjects.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Projects</h3>
          <p className="text-xs text-gray-500 mt-1">Matching your skills</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatNumber(filteredProjects.reduce((acc, project) => acc + project.stars, 0))}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Stars</h3>
          <p className="text-xs text-gray-500 mt-1">Community appreciation</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatNumber(filteredProjects.reduce((acc, project) => acc + project.forks, 0))}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Forks</h3>
          <p className="text-xs text-gray-500 mt-1">Project contributions</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{new Set(filteredProjects.map(p => p.language)).size}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Languages</h3>
          <p className="text-xs text-gray-500 mt-1">Technologies covered</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search by name, language, or topics..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {languages.map(language => (
                <option key={language} value={language}>
                  {language === 'all' ? 'All Languages' : language}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.fullName}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty}
              </span>
            </div>

            <p className="text-gray-700 mb-4 text-sm">{project.description}</p>

            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(project.language) }}
                />
                <span>{project.language}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>{formatNumber(project.stars)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitBranch className="w-4 h-4" />
                <span>{formatNumber(project.forks)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(project.updatedAt)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.topics.slice(0, 3).map((topic, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {topic}
                </span>
              ))}
              {project.topics.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{project.topics.length - 3} more
                </span>
              )}
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <strong>Suggested Use:</strong> {project.suggestedUse}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Matches your <strong>{project.matchedSkill}</strong> skills
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-1"
                >
                  <Github className="w-3 h-3" />
                  <span>View</span>
                </a>
                <button 
                    onClick={() => handleCloneProject(project.cloneUrl)}
                    className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-1"
                  >
                    <Code className="w-3 h-3" />
                    <span>Clone</span>
                  </button>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Language Distribution */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Language Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={languageData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {languageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 gap-2 mt-4">
            {languageData.map((language) => (
              <div key={language.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: language.color }}
                  />
                  <span className="text-sm text-gray-600">{language.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{language.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Difficulty Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={difficultyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="level" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" name="Projects" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Trends */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="commits"
                stackId="1"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
                name="Commits"
              />
              <Area
                type="monotone"
                dataKey="issues"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
                name="Issues"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default GitHubProjects
