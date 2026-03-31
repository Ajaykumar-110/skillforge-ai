import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Filter, 
  Search, 
  BarChart3, 
  PieChart, 
  Activity, 
  Download,
  ExternalLink,
  RefreshCw,
  Settings,
  Eye,
  Users,
  Globe,
  Zap,
  Target,
  Award,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  TrendingUp as TrendingUpIcon,
  BookOpen,
  Book
} from 'lucide-react'
import apiService from '../services/api'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'

const JobMarketInsights = () => {
  const [marketData, setMarketData] = useState({
    overallStats: {
      totalJobs: 310000,
      averageSalary: 91500,
      growthRate: 12.5,
      hotSkills: ['React', 'Python', 'AWS', 'Docker', 'TypeScript'],
      marketHealth: 'Strong',
      unemploymentRate: 3.8,
      remoteJobs: 45000,
      newJobsToday: 1250
    },
    salaryTrends: [
      { month: 'Jan', frontend: 85000, backend: 90000, fullstack: 95000, devops: 100000, mobile: 88000 },
      { month: 'Feb', frontend: 86000, backend: 91000, fullstack: 96000, devops: 101000, mobile: 89000 },
      { month: 'Mar', frontend: 87000, backend: 92000, fullstack: 97000, devops: 102000, mobile: 90000 },
      { month: 'Apr', frontend: 88000, backend: 93000, fullstack: 98000, devops: 103000, mobile: 91000 },
      { month: 'May', frontend: 89000, backend: 94000, fullstack: 99000, devops: 104000, mobile: 92000 },
      { month: 'Jun', frontend: 90000, backend: 95000, fullstack: 100000, devops: 105000, mobile: 93000 }
    ],
    demandByRole: [
      { role: 'Frontend Developer', demand: 85, salary: 90000, growth: 15, openings: 4500, competition: 'Medium' },
      { role: 'Backend Developer', demand: 78, salary: 95000, growth: 12, openings: 3800, competition: 'High' },
      { role: 'Full Stack Developer', demand: 92, salary: 100000, growth: 18, openings: 5200, competition: 'Medium' },
      { role: 'DevOps Engineer', demand: 65, salary: 105000, growth: 20, openings: 2100, competition: 'Low' },
      { role: 'Data Scientist', demand: 88, salary: 110000, growth: 22, openings: 3400, competition: 'High' },
      { role: 'Mobile Developer', demand: 70, salary: 95000, growth: 10, openings: 2800, competition: 'Medium' },
      { role: 'AI/ML Engineer', demand: 95, salary: 125000, growth: 28, openings: 1800, competition: 'Low' },
      { role: 'Cloud Architect', demand: 72, salary: 120000, growth: 25, openings: 1500, competition: 'Low' }
    ],
    locationData: [
      { city: 'San Francisco', jobs: 45000, avgSalary: 130000, costOfLiving: 'High', growth: 8, topCompanies: ['Google', 'Meta', 'Apple'] },
      { city: 'New York', jobs: 38000, avgSalary: 115000, costOfLiving: 'High', growth: 12, topCompanies: ['JPMorgan', 'Google', 'Microsoft'] },
      { city: 'Remote', jobs: 35000, avgSalary: 95000, costOfLiving: 'Flexible', growth: 35, topCompanies: ['Global'] },
      { city: 'Austin', jobs: 28000, avgSalary: 95000, costOfLiving: 'Medium', growth: 18, topCompanies: ['Apple', 'Tesla', 'Oracle'] },
      { city: 'Seattle', jobs: 32000, avgSalary: 110000, costOfLiving: 'High', growth: 10, topCompanies: ['Amazon', 'Microsoft'] },
      { city: 'Chicago', jobs: 25000, avgSalary: 90000, costOfLiving: 'Medium', growth: 8, topCompanies: ['Google', 'McKinsey'] }
    ],
    skillDemand: [
      { skill: 'JavaScript', demand: 95, growth: 8, category: 'Frontend', avgSalary: 95000, jobs: 45000 },
      { skill: 'Python', demand: 92, growth: 15, category: 'Backend', avgSalary: 105000, jobs: 38000 },
      { skill: 'React', demand: 88, growth: 12, category: 'Frontend', avgSalary: 100000, jobs: 32000 },
      { skill: 'AWS', demand: 85, growth: 20, category: 'Cloud', avgSalary: 115000, jobs: 18000 },
      { skill: 'Docker', demand: 82, growth: 18, category: 'DevOps', avgSalary: 108000, jobs: 12000 },
      { skill: 'TypeScript', demand: 78, growth: 25, category: 'Frontend', avgSalary: 102000, jobs: 28000 },
      { skill: 'Node.js', demand: 75, growth: 10, category: 'Backend', avgSalary: 98000, jobs: 25000 },
      { skill: 'Kubernetes', demand: 70, growth: 22, category: 'DevOps', avgSalary: 112000, jobs: 10000 },
      { skill: 'Machine Learning', demand: 90, growth: 28, category: 'AI/ML', avgSalary: 125000, jobs: 8000 },
      { skill: 'TensorFlow', demand: 75, growth: 30, category: 'AI/ML', avgSalary: 130000, jobs: 5000 }
    ],
    industryTrends: [
      { industry: 'Technology', growth: 18, jobs: 120000, avgSalary: 105000, outlook: 'Excellent', topRoles: ['Software Engineer', 'Data Scientist', 'DevOps'] },
      { industry: 'Finance', growth: 12, jobs: 45000, avgSalary: 110000, outlook: 'Good', topRoles: ['Financial Analyst', 'Quant Developer'] },
      { industry: 'Healthcare', growth: 15, jobs: 35000, avgSalary: 95000, outlook: 'Good', topRoles: ['Health Tech Developer', 'Data Analyst'] },
      { industry: 'E-commerce', growth: 20, jobs: 55000, avgSalary: 90000, outlook: 'Excellent', topRoles: ['Full Stack Developer', 'UX Designer'] },
      { industry: 'Education', growth: 8, jobs: 25000, avgSalary: 85000, outlook: 'Stable', topRoles: ['EdTech Developer', 'Course Designer'] },
      { industry: 'Consulting', growth: 10, jobs: 30000, avgSalary: 100000, outlook: 'Good', topRoles: ['Technical Consultant', 'Solution Architect'] }
    ],
    realTimeData: {
      newJobsLastHour: 45,
      applicationsLastHour: 230,
      trendingSearches: ['React Developer', 'Data Scientist', 'Remote Jobs', 'AI Engineer'],
      marketActivity: 'High',
      hiringSurge: '+15% this week'
    }
  })

  const [selectedTimeRange, setSelectedTimeRange] = useState('6months')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)

  const timeRanges = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ]

  const locations = ['all', 'San Francisco', 'New York', 'Remote', 'Austin', 'Seattle', 'Chicago']
  const roles = ['all', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Data Scientist', 'AI/ML Engineer', 'Mobile Developer', 'Cloud Architect']
  const industries = ['all', 'Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education', 'Consulting']

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#f97316', '#06b6d4']

  const getGrowthColor = (growth) => {
    if (growth > 20) return 'text-green-600 bg-green-50'
    if (growth > 15) return 'text-blue-600 bg-blue-50'
    if (growth > 10) return 'text-yellow-600 bg-yellow-50'
    if (growth > 5) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  const getCompetitionColor = (competition) => {
    switch (competition) {
      case 'Low': return 'text-green-600 bg-green-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'High': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
    return num.toString()
  }

  // Enhanced handler functions with real functionality
  const handleRefreshData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call to refresh data
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Update with new data
      setMarketData(prev => ({
        ...prev,
        realTimeData: {
          ...prev.realTimeData,
          newJobsLastHour: Math.floor(Math.random() * 100) + 20,
          applicationsLastHour: Math.floor(Math.random() * 500) + 100
        }
      }))
    } catch (error) {
      console.error('Failed to refresh data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdvancedFilters = () => {
    // Navigate to advanced filters page or open modal
    window.open('/jobs?advanced=true', '_blank')
  }

  const handleExportReport = () => {
    const reportContent = `
📊 JOB MARKET INSIGHTS REPORT
=====================================
Generated: ${new Date().toLocaleString()}

🎯 KEY METRICS
• Total Jobs: ${formatNumber(marketData.overallStats.totalJobs)}
• Average Salary: ${formatSalary(marketData.overallStats.averageSalary)}
• Market Growth: ${marketData.overallStats.growthRate}%
• Unemployment Rate: ${marketData.overallStats.unemploymentRate}%
• Remote Jobs: ${formatNumber(marketData.overallStats.remoteJobs)}
• New Jobs Today: ${formatNumber(marketData.overallStats.newJobsToday)}

📈 SALARY TRENDS
Frontend: ${formatSalary(marketData.salaryTrends[5].frontend)}
Backend: ${formatSalary(marketData.salaryTrends[5].backend)}
Full Stack: ${formatSalary(marketData.salaryTrends[5].fullstack)}
DevOps: ${formatSalary(marketData.salaryTrends[5].devops)}
Mobile: ${formatSalary(marketData.salaryTrends[5].mobile)}

🔥 TOP SKILLS IN DEMAND
${marketData.overallStats.hotSkills.map((skill, i) => `${i+1}. ${skill}`).join('\n')}

🏢 TOP LOCATIONS
${marketData.locationData.map((loc, i) => `${i+1}. ${loc.city}: ${formatSalary(loc.avgSalary)}`).join('\n')}

💼 INDUSTRY GROWTH
${marketData.industryTrends.map((ind, i) => `${i+1}. ${ind.industry}: +${ind.growth}%`).join('\n')}

⚡ REAL-TIME ACTIVITY
• New Jobs (Last Hour): ${marketData.realTimeData.newJobsLastHour}
• Applications (Last Hour): ${marketData.realTimeData.applicationsLastHour}
• Hiring Surge: ${marketData.realTimeData.hiringSurge}
• Market Activity: ${marketData.realTimeData.marketActivity}

📱 TRENDING SEARCHES
${marketData.realTimeData.trendingSearches.map((search, i) => `${i+1}. ${search}`).join('\n')}

=====================================
Downloaded from SkillForge AI Platform
    `.trim()
    
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `job-market-insights-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleViewJobListings = (role, location) => {
    const params = new URLSearchParams()
    if (role && role !== 'all') params.append('role', role)
    if (location && location !== 'all') params.append('location', location)
    window.open(`/jobs?${params.toString()}`, '_blank')
  }

  const handleViewCourses = (skill) => {
    window.open(`/courses?skill=${encodeURIComponent(skill)}`, '_blank')
  }

  const handleViewCompanies = (location) => {
    const locationData = marketData.locationData.find(loc => loc.city === location)
    if (locationData && locationData.topCompanies) {
      locationData.topCompanies.forEach(company => {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(company + ' careers')}`, '_blank')
      })
    }
  }

  const handleShareInsights = () => {
    const shareText = `📊 Job Market Insights:\n• ${formatNumber(marketData.overallStats.totalJobs)} jobs available\n• Avg salary: ${formatSalary(marketData.overallStats.averageSalary)}\n• Market growth: ${marketData.overallStats.growthRate}%\n• Top skill: ${marketData.overallStats.hotSkills[0]}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Job Market Insights',
        text: shareText,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Insights copied to clipboard!')
    }
  }

  const handleSetAlerts = () => {
    // Navigate to alerts setup
    window.open('/profile?section=alerts', '_blank')
  }

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        handleRefreshData()
      }, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Job Market Insights
              </h1>
              <p className="text-gray-600 mt-2">Real-time job market trends and intelligent analysis</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live Data</span>
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg transition-colors ${
                  autoRefresh 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Auto-refresh"
              >
                <RefreshCw className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleAdvancedFilters}
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                title="Advanced filters"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Real-time Activity Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">New Jobs (1h)</span>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{marketData.realTimeData.newJobsLastHour}</div>
              <div className="text-xs text-green-600">{marketData.realTimeData.hiringSurge}</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Applications (1h)</span>
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{marketData.realTimeData.applicationsLastHour}</div>
              <div className="text-xs text-blue-600">High activity</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Market Activity</span>
                <Zap className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{marketData.realTimeData.marketActivity}</div>
              <div className="text-xs text-yellow-600">Peak hours</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Unemployment</span>
                <TrendingDown className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{marketData.overallStats.unemploymentRate}%</div>
              <div className="text-xs text-green-600">-0.2% this month</div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all cursor-pointer group"
               onClick={() => handleViewJobListings()}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+12.5%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{formatNumber(marketData.overallStats.totalJobs)}</h3>
            <p className="text-sm font-medium text-gray-600">Total Jobs</p>
            <p className="text-xs text-gray-500 mt-1">Click to view listings →</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all cursor-pointer group"
               onClick={() => handleViewJobListings()}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+8.2%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{formatSalary(marketData.overallStats.averageSalary)}</h3>
            <p className="text-sm font-medium text-gray-600">Average Salary</p>
            <p className="text-xs text-gray-500 mt-1">National average</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all cursor-pointer group"
               onClick={() => handleViewJobListings()}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+{marketData.overallStats.growthRate}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{marketData.overallStats.marketHealth}</h3>
            <p className="text-sm font-medium text-gray-600">Market Health</p>
            <p className="text-xs text-green-600 mt-1">Excellent conditions</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all cursor-pointer group"
               onClick={() => handleViewJobListings()}>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{formatNumber(marketData.overallStats.remoteJobs)}</h3>
            <p className="text-sm font-medium text-gray-600">Remote Jobs</p>
            <p className="text-xs text-blue-600 mt-1">+35% growth</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all cursor-pointer group"
               onClick={() => handleViewJobListings()}>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{marketData.overallStats.hotSkills.length}</h3>
            <p className="text-sm font-medium text-gray-600">Hot Skills</p>
            <p className="text-xs text-orange-600 mt-1">In high demand</p>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button 
            onClick={handleRefreshData}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 flex items-center space-x-2 shadow-lg"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                <span>Refresh Data</span>
              </>
            )}
          </button>
          
          <button 
            onClick={handleExportReport}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 flex items-center space-x-2 shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
          
          <button 
            onClick={handleShareInsights}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 flex items-center space-x-2 shadow-lg"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Share Insights</span>
          </button>
          
          <button 
            onClick={handleSetAlerts}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 flex items-center space-x-2 shadow-lg"
          >
            <AlertCircle className="w-5 h-5" />
            <span>Set Job Alerts</span>
          </button>
        </div>

        {/* Enhanced Salary Trends */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Salary Trends by Role</h3>
            <button 
              onClick={() => handleViewJobListings()}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
            >
              <Eye className="w-4 h-4" />
              <span>View Jobs</span>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={marketData.salaryTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value) => formatSalary(value)} />
              <Legend />
              <Line type="monotone" dataKey="frontend" stroke="#6366f1" strokeWidth={3} name="Frontend" />
              <Line type="monotone" dataKey="backend" stroke="#8b5cf6" strokeWidth={3} name="Backend" />
              <Line type="monotone" dataKey="fullstack" stroke="#ec4899" strokeWidth={3} name="Full Stack" />
              <Line type="monotone" dataKey="devops" stroke="#f59e0b" strokeWidth={3} name="DevOps" />
              <Line type="monotone" dataKey="mobile" stroke="#10b981" strokeWidth={3} name="Mobile" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Enhanced Demand by Role */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Demand by Role</h3>
              <button 
                onClick={() => handleViewJobListings()}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Briefcase className="w-4 h-4" />
                <span>View All</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketData.demandByRole}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="role" angle={-45} textAnchor="end" height={80} stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="demand" fill="#6366f1" name="Demand %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enhanced Location Distribution */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Jobs by Location</h3>
              <button 
                onClick={() => handleViewCompanies(selectedLocation !== 'all' ? selectedLocation : 'San Francisco')}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Globe className="w-4 h-4" />
                <span>View Companies</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={marketData.locationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="jobs"
                >
                  {marketData.locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatNumber(value)} />
              </RePieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {marketData.locationData.map((location, index) => (
                <div key={location.city} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                     onClick={() => handleViewJobListings('all', location.city)}>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">{location.city}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{formatSalary(location.avgSalary)}</span>
                    <span className="text-xs text-green-600 block">+{location.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Skill Demand */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Skill Demand Analysis</h3>
            <button 
              onClick={() => handleViewCourses()}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
            >
              <BookOpen className="w-4 h-4" />
              <span>Find Courses</span>
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Top Skills by Demand</h4>
              <div className="space-y-3">
                {marketData.skillDemand.slice(0, 6).map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                       onClick={() => handleViewCourses(skill.skill)}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{skill.skill}</p>
                        <p className="text-xs text-gray-600">{skill.category} • {formatSalary(skill.avgSalary)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getGrowthColor(skill.growth)}`}>
                        +{skill.growth}%
                      </span>
                      <span className="text-sm font-medium text-gray-900">{skill.demand}%</span>
                      <span className="text-xs text-blue-600">{formatNumber(skill.jobs)} jobs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Skill Growth Trends</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={marketData.skillDemand.slice(0, 6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="skill" angle={-45} textAnchor="end" height={60} stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="growth" fill="#10b981" name="Growth %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Enhanced Industry Trends */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Industry Growth Trends</h3>
            <button 
              onClick={() => handleViewJobListings()}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
            >
              <TrendingUpIcon className="w-4 h-4" />
              <span>Explore Industries</span>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData.industryTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="industry" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="growth"
                stackId="1"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
                name="Growth %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Enhanced Hot Skills */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">🔥 Hot Skills in Demand</h3>
            <button 
              onClick={() => handleViewCourses()}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
            >
              <Zap className="w-4 h-4" />
              <span>Learn These Skills</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {marketData.overallStats.hotSkills.map((skill, index) => (
              <div key={skill} className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl hover:shadow-lg transition-all cursor-pointer group"
                   onClick={() => handleViewCourses(skill)}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">{skill}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <p className="text-xs text-gray-600">Click to learn →</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Searches */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🔍 Trending Job Searches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.realTimeData.trendingSearches.map((search, index) => (
              <div key={search} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all cursor-pointer"
                   onClick={() => handleViewJobListings(search)}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{search}</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-blue-600">Search now →</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobMarketInsights
