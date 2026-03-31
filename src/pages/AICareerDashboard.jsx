import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Bell, 
  User, 
  Sun, 
  Moon, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  BookOpen, 
  Briefcase, 
  Target,
  Activity,
  BarChart3,
  PieChart,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  GitBranch,
  Play,
  ExternalLink,
  MessageSquare,
  Brain,
  Zap
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
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

const AICareerDashboard = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard')

  // Mock data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-565eab4b4c1?w=150&h=150&fit=crop&crop=faces'
  })

  const [dashboardStats, setDashboardStats] = useState({
    skillMatchPercentage: 82,
    resumeScore: 91,
    recommendedJobsCount: 14,
    coursesCompleted: 6,
    githubProjectsAnalyzed: 23,
    interviewReadinessScore: 78
  })

  const [skillGapData, setSkillGapData] = useState([
    { skill: 'Python', userLevel: 8, requiredLevel: 9, gap: 1 },
    { skill: 'React', userLevel: 7, requiredLevel: 9, gap: 2 },
    { skill: 'AWS', userLevel: 5, requiredLevel: 7, gap: 2 },
    { skill: 'Machine Learning', userLevel: 4, requiredLevel: 8, gap: 4 },
    { skill: 'TypeScript', userLevel: 6, requiredLevel: 7, gap: 1 }
  ])

  const [recommendedJobs, setRecommendedJobs] = useState([
    {
      id: 1,
      title: 'Data Scientist',
      company: 'TechCorp',
      matchScore: 88,
      salaryRange: '$120k - $160k',
      requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop&crop=faces'
    },
    {
      id: 2,
      title: 'ML Engineer',
      company: 'DataTech Inc',
      matchScore: 81,
      salaryRange: '$130k - $180k',
      requiredSkills: ['Python', 'TensorFlow', 'Deep Learning', 'AWS'],
      logo: 'https://images.unsplash.com/photo-1573496359142-b93d3a23b43?w=50&h=50&fit=crop&crop=faces'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'StartupHub',
      matchScore: 76,
      salaryRange: '$100k - $140k',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f3d?w=50&h=50&fit=crop&crop=faces'
    }
  ])

  const [learningRoadmap, setLearningRoadmap] = useState([
    {
      level: 'Beginner',
      skills: ['HTML/CSS', 'JavaScript Basics', 'React Fundamentals'],
      courses: ['Web Development Bootcamp', 'React for Beginners'],
      estimatedTime: '2-3 months',
      completed: true
    },
    {
      level: 'Intermediate',
      skills: ['Advanced React', 'Node.js', 'Database Design'],
      courses: ['Full Stack Development', 'API Design'],
      estimatedTime: '3-4 months',
      completed: true
    },
    {
      level: 'Advanced',
      skills: ['Machine Learning', 'Cloud Architecture', 'System Design'],
      courses: ['ML Engineering', 'AWS Solutions Architect'],
      estimatedTime: '4-6 months',
      completed: false
    }
  ])

  const [recommendedProjects, setRecommendedProjects] = useState([
    {
      id: 1,
      name: 'AI Resume Analyzer',
      difficulty: 'Intermediate',
      technologies: ['Python', 'NLP', 'React', 'TensorFlow'],
      githubLink: 'https://github.com/johndoe/ai-resume-analyzer',
      description: 'Analyze resumes using AI and provide improvement suggestions'
    },
    {
      id: 2,
      name: 'Skill Gap Predictor',
      difficulty: 'Advanced',
      technologies: ['Machine Learning', 'Python', 'Data Visualization'],
      githubLink: 'https://github.com/johndoe/skill-gap-predictor',
      description: 'Predict skill gaps based on job market requirements'
    },
    {
      id: 3,
      name: 'Job Match Optimizer',
      difficulty: 'Intermediate',
      technologies: ['React', 'Node.js', 'Algorithms'],
      githubLink: 'https://github.com/johndoe/job-match-optimizer',
      description: 'Optimize job matching using ML algorithms'
    }
  ])

  const [marketInsights, setMarketInsights] = useState({
    topSkills: [
      { name: 'Python', demand: 95, trend: 'up' },
      { name: 'React', demand: 92, trend: 'up' },
      { name: 'AWS', demand: 88, trend: 'up' },
      { name: 'Machine Learning', demand: 85, trend: 'up' },
      { name: 'TypeScript', demand: 82, trend: 'stable' }
    ],
    trendingRoles: [
      { role: 'Data Scientist', growth: 23, salary: '$125k' },
      { role: 'ML Engineer', growth: 28, salary: '$140k' },
      { role: 'Full Stack Developer', growth: 18, salary: '$115k' },
      { role: 'DevOps Engineer', growth: 20, salary: '$120k' }
    ],
    salaryRanges: [
      { level: 'Entry', min: 60000, max: 80000 },
      { level: 'Mid', min: 80000, max: 120000 },
      { level: 'Senior', min: 120000, max: 180000 },
      { level: 'Lead', min: 160000, max: 250000 }
    ]
  })

  const [activityTimeline, setActivityTimeline] = useState([
    {
      id: 1,
      type: 'resume_analyzed',
      title: 'Resume analyzed',
      description: 'AI analyzed your resume and identified key skills',
      time: '2 hours ago',
      icon: Brain
    },
    {
      id: 2,
      type: 'skill_calculated',
      title: 'Skill gap calculated',
      description: 'Identified 4 skill gaps for target roles',
      time: '5 hours ago',
      icon: Target
    },
    {
      id: 3,
      type: 'course_started',
      title: 'Course started',
      description: 'Began "Machine Learning Fundamentals"',
      time: '1 day ago',
      icon: BookOpen
    },
    {
      id: 4,
      type: 'interview_completed',
      title: 'Interview completed',
      description: 'AI mock interview for Data Scientist role',
      time: '2 days ago',
      icon: MessageSquare
    }
  ])

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  const StatCard = ({ title, value, trend, icon: Icon, description, color = 'blue' }) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${colors[color]} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${colors[color].replace('bg-', 'text-')}`} />
          </div>
          {trend && (
            <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm ml-1">{trend === 'up' ? '+12%' : '-5%'}</span>
            </div>
          )}
        </div>
        <div className="mb-2">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
        </div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    )
  }

  const JobCard = ({ job }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            job.matchScore >= 85 ? 'bg-green-100 text-green-700' :
            job.matchScore >= 70 ? 'bg-blue-100 text-blue-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {job.matchScore}% Match
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-lg font-semibold text-gray-900 mb-2">{job.salaryRange}</div>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {job.requiredSkills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{job.requiredSkills.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
          <Briefcase className="w-4 h-4 mr-2" />
          Apply Now
        </button>
      </div>
    )
  }

  const ProjectCard = ({ project }) => {
    const difficultyColors = {
      Beginner: 'bg-green-100 text-green-700',
      Intermediate: 'bg-blue-100 text-blue-700',
      Advanced: 'bg-purple-100 text-purple-700'
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[project.difficulty]}`}>
                {project.difficulty}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <a 
          href={project.githubLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
        >
          <GitBranch className="w-4 h-4 mr-2" />
          View on GitHub
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    )
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'skill-analyzer', label: 'Skill Analyzer', icon: Brain },
    { id: 'jobs', label: 'Job Recommendations', icon: Briefcase },
    { id: 'resume', label: 'Resume Analyzer', icon: Target },
    { id: 'projects', label: 'GitHub Projects', icon: GitBranch },
    { id: 'courses', label: 'Course Recommendations', icon: BookOpen },
    { id: 'market', label: 'Job Market Insights', icon: PieChart },
    { id: 'interview', label: 'Voice Interview', icon: MessageSquare },
    { id: 'chatbot', label: 'AI Chatbot', icon: Zap },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Career Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Search */}
            <div className="flex items-center flex-1">
              <div className="flex items-center mr-8">
                <Brain className="w-8 h-8 text-blue-600 mr-2" />
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  SkillForge AI
                </span>
              </div>
              
              <div className="relative max-w-md flex-1">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search skills, jobs, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            {/* Right side - Notifications, Profile, Dark Mode */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <img src={userData.avatar} alt="Profile" className="w-6 h-6 rounded-full" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {userData.name}
                  </span>
                </button>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <nav className="p-4">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Message */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Welcome back, {userData.name}! 👋
                </h1>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Your AI-powered career dashboard is ready. Here's your latest progress and recommendations.
                </p>
              </div>

              {/* Career Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  title="Skill Match"
                  value={`${dashboardStats.skillMatchPercentage}%`}
                  trend="up"
                  icon={Target}
                  description="Based on your profile vs job requirements"
                  color="blue"
                />
                <StatCard
                  title="Resume Score"
                  value={`${dashboardStats.resumeScore}%`}
                  trend="up"
                  icon={Award}
                  description="AI-powered resume analysis"
                  color="green"
                />
                <StatCard
                  title="Recommended Jobs"
                  value={dashboardStats.recommendedJobsCount}
                  trend="up"
                  icon={Briefcase}
                  description="Personalized job matches"
                  color="purple"
                />
                <StatCard
                  title="Courses Completed"
                  value={dashboardStats.coursesCompleted}
                  trend="up"
                  icon={BookOpen}
                  description="Skill development progress"
                  color="orange"
                />
                <StatCard
                  title="GitHub Projects"
                  value={dashboardStats.githubProjectsAnalyzed}
                  trend="up"
                  icon={GitBranch}
                  description="Portfolio projects analyzed"
                  color="blue"
                />
                <StatCard
                  title="Interview Readiness"
                  value={`${dashboardStats.interviewReadinessScore}%`}
                  trend="up"
                  icon={MessageSquare}
                  description="AI interview preparation score"
                  color="green"
                />
              </div>

              {/* Skill Gap Analysis */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Skill Gap Analysis
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      User Skills vs Required Skills
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={skillGapData}>
                        <PolarGrid strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 10]} />
                        <Radar name="User Level" dataKey="userLevel" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        <Radar name="Required Level" dataKey="requiredLevel" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Missing Skills & Recommendations
                    </h3>
                    <div className="space-y-3">
                      {skillGapData.filter(skill => skill.gap > 0).map((skill, index) => (
                        <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {skill.skill}
                            </span>
                            <span className="text-sm text-red-600">
                              Gap: {skill.gap} levels
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(skill.userLevel / skill.requiredLevel) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Job Roles */}
              <div>
                <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recommended Job Roles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other sections would be implemented similarly */}
          {activeSection !== 'dashboard' && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {sidebarItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This section is coming soon! The AI is working on amazing features for you.
                </p>
                <div className="mt-8">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                    <Activity className="w-4 h-4 mr-2" />
                    Under Development
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AICareerDashboard
