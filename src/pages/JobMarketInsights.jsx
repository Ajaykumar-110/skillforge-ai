import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, MapPin, Briefcase, Calendar, Filter, Search, BarChart3, PieChart, Activity, Download } from 'lucide-react'
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
      hotSkills: ['React', 'Python', 'AWS', 'Docker', 'TypeScript']
    },
    salaryTrends: [
      { month: 'Jan', frontend: 85000, backend: 90000, fullstack: 95000, devops: 100000 },
      { month: 'Feb', frontend: 86000, backend: 91000, fullstack: 96000, devops: 101000 },
      { month: 'Mar', frontend: 87000, backend: 92000, fullstack: 97000, devops: 102000 },
      { month: 'Apr', frontend: 88000, backend: 93000, fullstack: 98000, devops: 103000 },
      { month: 'May', frontend: 89000, backend: 94000, fullstack: 99000, devops: 104000 },
      { month: 'Jun', frontend: 90000, backend: 95000, fullstack: 100000, devops: 105000 }
    ],
    demandByRole: [
      { role: 'Frontend Developer', demand: 85, salary: 90000, growth: 15 },
      { role: 'Backend Developer', demand: 78, salary: 95000, growth: 12 },
      { role: 'Full Stack Developer', demand: 92, salary: 100000, growth: 18 },
      { role: 'DevOps Engineer', demand: 65, salary: 105000, growth: 20 },
      { role: 'Data Scientist', demand: 88, salary: 110000, growth: 22 },
      { role: 'Mobile Developer', demand: 70, salary: 95000, growth: 10 }
    ],
    locationData: [
      { city: 'San Francisco', jobs: 45000, avgSalary: 130000, costOfLiving: 'High' },
      { city: 'New York', jobs: 38000, avgSalary: 115000, costOfLiving: 'High' },
      { city: 'Remote', jobs: 35000, avgSalary: 95000, costOfLiving: 'Flexible' },
      { city: 'Austin', jobs: 28000, avgSalary: 95000, costOfLiving: 'Medium' },
      { city: 'Seattle', jobs: 32000, avgSalary: 110000, costOfLiving: 'High' },
      { city: 'Chicago', jobs: 25000, avgSalary: 90000, costOfLiving: 'Medium' }
    ],
    skillDemand: [
      { skill: 'JavaScript', demand: 95, growth: 8, category: 'Frontend' },
      { skill: 'Python', demand: 92, growth: 15, category: 'Backend' },
      { skill: 'React', demand: 88, growth: 12, category: 'Frontend' },
      { skill: 'AWS', demand: 85, growth: 20, category: 'Cloud' },
      { skill: 'Docker', demand: 82, growth: 18, category: 'DevOps' },
      { skill: 'TypeScript', demand: 78, growth: 25, category: 'Frontend' },
      { skill: 'Node.js', demand: 75, growth: 10, category: 'Backend' },
      { skill: 'Kubernetes', demand: 70, growth: 22, category: 'DevOps' }
    ],
    industryTrends: [
      { industry: 'Technology', growth: 18, jobs: 120000, avgSalary: 105000 },
      { industry: 'Finance', growth: 12, jobs: 45000, avgSalary: 110000 },
      { industry: 'Healthcare', growth: 15, jobs: 35000, avgSalary: 95000 },
      { industry: 'E-commerce', growth: 20, jobs: 55000, avgSalary: 90000 },
      { industry: 'Education', growth: 8, jobs: 25000, avgSalary: 85000 },
      { industry: 'Consulting', growth: 10, jobs: 30000, avgSalary: 100000 }
    ]
  })

  const [selectedTimeRange, setSelectedTimeRange] = useState('6months')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')

  const timeRanges = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ]

  const locations = ['all', 'San Francisco', 'New York', 'Remote', 'Austin', 'Seattle', 'Chicago']
  const roles = ['all', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Data Scientist']

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444']

  const getGrowthColor = (growth) => {
    if (growth > 15) return 'text-green-600 bg-green-50'
    if (growth > 10) return 'text-blue-600 bg-blue-50'
    if (growth > 5) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
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

  // Handler functions
  const handleAdvancedFilters = () => {
    alert('Advanced filters feature coming soon! You\'ll be able to filter by company size, industry, and more.')
  }

  const handleExportReport = () => {
    const reportContent = `
Job Market Insights Report
==========================
Time Period: ${timeRanges.find(t => t.value === selectedTimeRange)?.label || 'Custom'}
Location: ${selectedLocation === 'all' ? 'All Locations' : selectedLocation}
Role: ${selectedRole === 'all' ? 'All Roles' : selectedRole}

Key Insights:
- Average Salary: ${formatSalary(85000)}
- Job Openings: ${formatNumber(125000)}
- Market Growth: +12.5%

Top Skills:
1. JavaScript
2. Python  
3. React
4. AWS
5. Docker

Downloaded: ${new Date().toLocaleString()}
    `.trim()
    
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'job-market-insights.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Market Insights</h1>
          <p className="text-gray-600 mt-1">Real-time job market trends and analysis</p>
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
            onClick={handleExportReport}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">+12.5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatNumber(marketData.overallStats.totalJobs)}</h3>
          <p className="text-sm font-medium text-gray-600">Total Jobs</p>
          <p className="text-xs text-gray-500 mt-1">Across all industries</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">+8.2%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatSalary(marketData.overallStats.averageSalary)}</h3>
          <p className="text-sm font-medium text-gray-600">Average Salary</p>
          <p className="text-xs text-gray-500 mt-1">National average</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">+{marketData.overallStats.growthRate}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">High</h3>
          <p className="text-sm font-medium text-gray-600">Market Demand</p>
          <p className="text-xs text-gray-500 mt-1">Growing rapidly</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{marketData.overallStats.hotSkills.length}</h3>
          <p className="text-sm font-medium text-gray-600">Hot Skills</p>
          <p className="text-xs text-gray-500 mt-1">In high demand</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>

      {/* Salary Trends */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Salary Trends by Role</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketData.salaryTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip formatter={(value) => formatSalary(value)} />
            <Legend />
            <Line type="monotone" dataKey="frontend" stroke="#6366f1" strokeWidth={2} name="Frontend" />
            <Line type="monotone" dataKey="backend" stroke="#8b5cf6" strokeWidth={2} name="Backend" />
            <Line type="monotone" dataKey="fullstack" stroke="#ec4899" strokeWidth={2} name="Full Stack" />
            <Line type="monotone" dataKey="devops" stroke="#f59e0b" strokeWidth={2} name="DevOps" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand by Role */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Demand by Role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={marketData.demandByRole}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="role" angle={-45} textAnchor="end" height={80} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="demand" fill="#6366f1" name="Demand %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Location Distribution */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Jobs by Location</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RePieChart>
              <Pie
                data={marketData.locationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
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
              <div key={location.city} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-600">{location.city}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{formatSalary(location.avgSalary)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Demand */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Skill Demand Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Top Skills by Demand</h4>
            <div className="space-y-3">
              {marketData.skillDemand.slice(0, 6).map((skill, index) => (
                <div key={skill.skill} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{skill.skill}</p>
                      <p className="text-xs text-gray-600">{skill.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getGrowthColor(skill.growth)}`}>
                      +{skill.growth}%
                    </span>
                    <span className="text-sm font-medium text-gray-900">{skill.demand}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Skill Growth Trends</h4>
            <ResponsiveContainer width="100%" height={200}>
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

      {/* Industry Trends */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Industry Growth Trends</h3>
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

      {/* Hot Skills */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">🔥 Hot Skills in Demand</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {marketData.overallStats.hotSkills.map((skill, index) => (
            <div key={skill} className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">{skill}</span>
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-xs text-gray-600">High demand</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobMarketInsights
