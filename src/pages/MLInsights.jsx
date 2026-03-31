import React, { useState, useEffect } from 'react'
import { 
  Brain, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Target, 
  BookOpen, 
  BarChart3, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Filter,
  Search,
  Briefcase,
  GraduationCap,
  Code
} from 'lucide-react'
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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

const MLInsights = () => {
  const [activeTab, setActiveTab] = useState('job-matches')
  const [loading, setLoading] = useState(true)
  const [jobMatches, setJobMatches] = useState([])
  const [salaryPrediction, setSalaryPrediction] = useState(null)
  const [skillRecommendations, setSkillRecommendations] = useState([])
  const [careerPath, setCareerPath] = useState([])
  const [marketInsights, setMarketInsights] = useState(null)
  const [userProfile, setUserProfile] = useState({
    age: 28,
    education: 'Bachelor',
    experience_years: 5,
    skills: ['Python', 'JavaScript', 'React', 'SQL'],
    salary_expectation: 100000,
    location_preference: 'San Francisco',
    profile_completion: 85
  })
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    experience_level: '',
    salary_range: [0, 200000]
  })

  // Mock ML data for demonstration
  const mockJobMatches = [
    {
      job_id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco',
      category: 'Software Development',
      experience_level: 'Senior Level',
      skills_required: ['Python', 'JavaScript', 'React', 'Node.js', 'AWS'],
      salary_min: 120000,
      salary_max: 180000,
      description: 'Looking for an experienced full-stack developer...',
      match_score: 92,
      skill_match: 85,
      experience_match: 90,
      location_match: 100,
      salary_match: 88,
      posted_date: '2024-03-14'
    },
    {
      job_id: 2,
      title: 'Data Scientist',
      company: 'DataTech Inc',
      location: 'New York',
      category: 'Data Science',
      experience_level: 'Mid Level',
      skills_required: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      salary_min: 110000,
      salary_max: 150000,
      description: 'Join our data science team...',
      match_score: 88,
      skill_match: 75,
      experience_match: 80,
      location_match: 60,
      salary_match: 85,
      posted_date: '2024-03-13'
    },
    {
      job_id: 3,
      title: 'Frontend Developer',
      company: 'DesignHub',
      location: 'Remote',
      category: 'Software Development',
      experience_level: 'Mid Level',
      skills_required: ['JavaScript', 'React', 'CSS', 'TypeScript'],
      salary_min: 90000,
      salary_max: 130000,
      description: 'Creative frontend developer needed...',
      match_score: 85,
      skill_match: 90,
      experience_match: 80,
      location_match: 100,
      salary_match: 75,
      posted_date: '2024-03-12'
    }
  ]

  const mockSalaryPrediction = {
    predicted_salary: 115000,
    salary_range: {
      min: 95000,
      max: 135000,
      median: 115000
    },
    currency: 'USD',
    confidence: 'high'
  }

  const mockSkillRecommendations = [
    {
      skill: 'Machine Learning',
      importance: 95,
      frequency: 45,
      category: 'Data Science',
      learning_resources: [
        { platform: 'Coursera', course: 'Machine Learning by Andrew Ng', url: '#' },
        { platform: 'Udemy', course: 'Complete ML Bootcamp', url: '#' }
      ]
    },
    {
      skill: 'AWS',
      importance: 88,
      frequency: 38,
      category: 'Cloud',
      learning_resources: [
        { platform: 'AWS Training', course: 'AWS Solutions Architect', url: '#' },
        { platform: 'Udemy', course: 'AWS Certified Developer', url: '#' }
      ]
    },
    {
      skill: 'TypeScript',
      importance: 82,
      frequency: 32,
      category: 'Programming',
      learning_resources: [
        { platform: 'TypeScript Documentation', course: 'TypeScript Handbook', url: '#' },
        { platform: 'Udemy', course: 'Understanding TypeScript', url: '#' }
      ]
    },
    {
      skill: 'Docker',
      importance: 78,
      frequency: 28,
      category: 'DevOps',
      learning_resources: [
        { platform: 'Docker Hub', course: 'Docker Basics', url: '#' },
        { platform: 'Udemy', course: 'Docker Mastery', url: '#' }
      ]
    },
    {
      skill: 'GraphQL',
      importance: 72,
      frequency: 22,
      category: 'Backend',
      learning_resources: [
        { platform: 'GraphQL Documentation', course: 'GraphQL Tutorial', url: '#' },
        { platform: 'Udemy', course: 'GraphQL with React', url: '#' }
      ]
    }
  ]

  const mockCareerPath = [
    {
      career_path: 'Software Development',
      current_level: 'Mid-level Developer',
      next_level: 'Senior Developer',
      skill_gaps: ['System Design', 'Cloud Architecture', 'Mentoring'],
      progress_percentage: 60,
      estimated_timeline: '18 months'
    },
    {
      career_path: 'Data Science',
      current_level: 'Data Analyst',
      next_level: 'Data Scientist',
      skill_gaps: ['Machine Learning', 'Statistics', 'Data Visualization'],
      progress_percentage: 40,
      estimated_timeline: '24 months'
    }
  ]

  const mockMarketInsights = {
    top_skills: [
      { skill: 'Python', count: 245, demand: 78.5 },
      { skill: 'JavaScript', count: 238, demand: 76.3 },
      { skill: 'React', count: 198, demand: 63.4 },
      { skill: 'AWS', count: 187, demand: 59.9 },
      { skill: 'Docker', count: 165, demand: 52.8 }
    ],
    location_trends: [
      { location: 'San Francisco', avg_salary: 145000 },
      { location: 'New York', avg_salary: 135000 },
      { location: 'Seattle', avg_salary: 125000 },
      { location: 'Austin', avg_salary: 115000 },
      { location: 'Remote', avg_salary: 110000 }
    ],
    experience_trends: [
      { level: 'Senior Level', avg_salary: 135000 },
      { level: 'Mid Level', avg_salary: 105000 },
      { level: 'Lead', avg_salary: 155000 },
      { level: 'Entry Level', avg_salary: 75000 }
    ],
    category_trends: [
      { category: 'Software Development', job_count: 145, percentage: 46.5 },
      { category: 'Data Science', job_count: 89, percentage: 28.5 },
      { category: 'Design', job_count: 45, percentage: 14.4 },
      { category: 'Management', job_count: 33, percentage: 10.6 }
    ]
  }

  useEffect(() => {
    setTimeout(() => {
      setJobMatches(mockJobMatches)
      setSalaryPrediction(mockSalaryPrediction)
      setSkillRecommendations(mockSkillRecommendations)
      setCareerPath(mockCareerPath)
      setMarketInsights(mockMarketInsights)
      setLoading(false)
    }, 1500)
  }, [])

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getImportanceColor = (importance) => {
    if (importance >= 90) return 'text-red-600 bg-red-50'
    if (importance >= 80) return 'text-orange-600 bg-orange-50'
    if (importance >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-blue-600 bg-blue-50'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ML Insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Career Insights</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Powered by Machine Learning
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { id: 'job-matches', label: 'Job Matches', icon: Briefcase },
              { id: 'salary-prediction', label: 'Salary Prediction', icon: DollarSign },
              { id: 'skill-recommendations', label: 'Skill Recommendations', icon: BookOpen },
              { id: 'career-path', label: 'Career Path', icon: Target },
              { id: 'market-insights', label: 'Market Insights', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Matches Tab */}
        {activeTab === 'job-matches' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personalized Job Matches</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {jobMatches.map((job) => (
                  <div key={job.job_id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchColor(job.match_score)}`}>
                            {job.match_score}% Match
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.company}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4">{job.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {job.skills_required.slice(0, 5).map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{job.posted_date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{job.skill_match}%</div>
                          <div className="text-gray-600">Skill Match</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{job.experience_match}%</div>
                          <div className="text-gray-600">Experience</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{job.location_match}%</div>
                          <div className="text-gray-600">Location</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{job.salary_match}%</div>
                          <div className="text-gray-600">Salary</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Salary Prediction Tab */}
        {activeTab === 'salary-prediction' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Salary Prediction</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Predicted Salary</h3>
                      <DollarSign className="w-8 h-8" />
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      ${salaryPrediction.predicted_salary.toLocaleString()}
                    </div>
                    <div className="text-blue-100">
                      Confidence: {salaryPrediction.confidence}
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Range</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Minimum</span>
                        <span className="font-semibold">${salaryPrediction.salary_range.min.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Median</span>
                        <span className="font-semibold">${salaryPrediction.salary_range.median.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maximum</span>
                        <span className="font-semibold">${salaryPrediction.salary_range.max.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Factors</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Experience</span>
                          <span className="text-sm font-medium">{userProfile.experience_years} years</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(userProfile.experience_years / 20) * 100}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Skills</span>
                          <span className="text-sm font-medium">{userProfile.skills.length} skills</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(userProfile.skills.length / 10) * 100}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Education</span>
                          <span className="text-sm font-medium">{userProfile.education}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Profile Completion</span>
                          <span className="text-sm font-medium">{userProfile.profile_completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${userProfile.profile_completion}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skill Recommendations Tab */}
        {activeTab === 'skill-recommendations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">AI Skill Recommendations</h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Data Scientist</option>
                  <option>Full Stack Developer</option>
                  <option>Product Manager</option>
                  <option>UI/UX Designer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillRecommendations.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{skill.skill}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImportanceColor(skill.importance)}`}>
                        {skill.importance}% Important
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Demand</span>
                        <span>{skill.frequency} jobs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                          style={{ width: `${skill.importance}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {skill.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900">Learning Resources:</div>
                      {skill.learning_resources.map((resource, idx) => (
                        <a key={idx} href={resource.url} className="block text-sm text-blue-600 hover:text-blue-800">
                          {resource.platform}: {resource.course}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Career Path Tab */}
        {activeTab === 'career-path' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Career Path Recommendations</h2>
              
              <div className="space-y-6">
                {careerPath.map((path, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{path.career_path}</h3>
                      <div className="text-sm text-gray-600">
                        {path.estimated_timeline}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Current Level</span>
                        <span className="font-medium">{path.current_level}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Next Level</span>
                        <span className="font-medium">{path.next_level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" 
                          style={{ width: `${path.progress_percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {path.progress_percentage}% Complete
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Skill Gaps to Fill:</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.skill_gaps.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Market Insights Tab */}
        {activeTab === 'market-insights' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Skills */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills in Demand</h3>
                <div className="space-y-3">
                  {marketInsights.top_skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                        <span className="text-sm text-gray-600">{skill.count} jobs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${skill.demand}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{skill.demand}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Trends */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary by Location</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={marketInsights.location_trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="avg_salary" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Experience Trends */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary by Experience</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={marketInsights.experience_trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="avg_salary" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Trends */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs by Category</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={marketInsights.category_trends}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="job_count"
                      label={({ category, percentage }) => `${category} ${percentage}%`}
                    >
                      {marketInsights.category_trends.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MLInsights
