import React, { useState, useEffect } from 'react'
import { 
  Code2, 
  Database, 
  Palette, 
  TrendingUp, 
  Briefcase, 
  Star, 
  ExternalLink, 
  Filter, 
  Search,
  Users,
  Clock,
  GitBranch,
  BookOpen,
  Award,
  Zap,
  Target,
  Rocket,
  Globe,
  Smartphone,
  Shield,
  Brain,
  BarChart3,
  MessageSquare,
  ShoppingCart,
  Heart,
  Bookmark,
  Download,
  RefreshCw,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Cpu,
  Cloud,
  Lock
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
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

const ProjectsRecommendation = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedSkill, setSelectedSkill] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [savedProjects, setSavedProjects] = useState([])
  const [completedProjects, setCompletedProjects] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showProjectDetail, setShowProjectDetail] = useState(false)

  // Job roles
  const jobRoles = [
    'all', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist',
    'Machine Learning Engineer', 'DevOps Engineer', 'Mobile Developer', 'UI/UX Designer',
    'Product Manager', 'Cybersecurity Analyst', 'Cloud Architect', 'Game Developer',
    'Blockchain Developer', 'QA Engineer', 'Technical Writer'
  ]

  // Skills
  const skills = [
    'all', 'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++',
    'Node.js', 'Django', 'Flask', 'TensorFlow', 'PyTorch', 'Keras', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST API',
    'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap', 'Figma', 'Sketch', 'Adobe XD',
    'Swift', 'Kotlin', 'React Native', 'Flutter', 'Unity', 'Unreal Engine', 'Solidity', 'Web3'
  ]

  // Difficulty levels
  const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ]

  // Comprehensive project data based on job roles and skills
  const comprehensiveProjects = [
    // Frontend Projects
    {
      id: 1,
      title: 'E-commerce Platform with React',
      description: 'Build a full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.',
      role: 'Frontend Developer',
      skills: ['React', 'TypeScript', 'Redux', 'Stripe API', 'Tailwind CSS'],
      difficulty: 'intermediate',
      duration: '4-6 weeks',
      stars: 2450,
      forks: 567,
      language: 'JavaScript',
      url: 'https://github.com/ecommerce-react-platform',
      author: 'TechCorp',
      license: 'MIT',
      topics: ['react', 'ecommerce', 'typescript', 'stripe'],
      features: ['Shopping Cart', 'Payment Integration', 'User Authentication', 'Admin Dashboard', 'Product Management'],
      learningOutcomes: ['React Hooks', 'State Management', 'API Integration', 'Payment Processing'],
      prerequisites: ['React basics', 'JavaScript ES6+', 'CSS fundamentals'],
      estimatedHours: 120,
      communitySupport: 'High',
      lastUpdated: '2 weeks ago',
      trending: true,
      featured: true
    },
    {
      id: 2,
      title: 'Social Media Dashboard',
      description: 'Create a responsive social media analytics dashboard with real-time data visualization and user management.',
      role: 'Frontend Developer',
      skills: ['Vue.js', 'Chart.js', 'Firebase', 'Vuex', 'Vuetify'],
      difficulty: 'intermediate',
      duration: '3-4 weeks',
      stars: 1890,
      forks: 423,
      language: 'JavaScript',
      url: 'https://github.com/social-media-dashboard',
      author: 'DevStudio',
      license: 'Apache-2.0',
      topics: ['vue', 'dashboard', 'analytics', 'firebase'],
      features: ['Real-time Analytics', 'User Management', 'Data Visualization', 'Responsive Design'],
      learningOutcomes: ['Vue.js Components', 'Firebase Integration', 'Chart.js', 'State Management'],
      prerequisites: ['Vue.js basics', 'JavaScript fundamentals'],
      estimatedHours: 80,
      communitySupport: 'Medium',
      lastUpdated: '1 month ago',
      trending: false,
      featured: false
    },
    // Backend Projects
    {
      id: 3,
      title: 'Microservices Blog Platform',
      description: 'Design and implement a scalable microservices architecture for a blogging platform with user management and content delivery.',
      role: 'Backend Developer',
      skills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'JWT'],
      difficulty: 'advanced',
      duration: '6-8 weeks',
      stars: 3200,
      forks: 789,
      language: 'JavaScript',
      url: 'https://github.com/microservices-blog',
      author: 'BackendMasters',
      license: 'MIT',
      topics: ['nodejs', 'microservices', 'mongodb', 'docker', 'redis'],
      features: ['Microservices Architecture', 'API Gateway', 'Authentication', 'Content Management', 'Caching'],
      learningOutcomes: ['Microservices Design', 'Docker Containerization', 'API Design', 'Database Design'],
      prerequisites: ['Node.js', 'MongoDB', 'Docker basics', 'REST APIs'],
      estimatedHours: 160,
      communitySupport: 'High',
      lastUpdated: '1 week ago',
      trending: true,
      featured: true
    },
    {
      id: 4,
      title: 'Real-time Chat Application',
      description: 'Build a scalable real-time chat application with WebSocket support, room management, and message persistence.',
      role: 'Backend Developer',
      skills: ['Python', 'Django', 'WebSockets', 'PostgreSQL', 'Redis'],
      difficulty: 'intermediate',
      duration: '4-5 weeks',
      stars: 2100,
      forks: 512,
      language: 'Python',
      url: 'https://github.com/realtime-chat-django',
      author: 'PyDevTeam',
      license: 'BSD-3-Clause',
      topics: ['python', 'django', 'websockets', 'postgresql', 'chat'],
      features: ['Real-time Messaging', 'Room Management', 'Message History', 'User Presence', 'File Sharing'],
      learningOutcomes: ['WebSocket Implementation', 'Django Channels', 'Database Design', 'Real-time Communication'],
      prerequisites: ['Python', 'Django basics', 'JavaScript'],
      estimatedHours: 100,
      communitySupport: 'Medium',
      lastUpdated: '3 weeks ago',
      trending: false,
      featured: false
    },
    // Full Stack Projects
    {
      id: 5,
      title: 'Project Management System',
      description: 'Complete project management tool with task tracking, team collaboration, file sharing, and reporting dashboard.',
      role: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
      difficulty: 'advanced',
      duration: '8-10 weeks',
      stars: 4500,
      forks: 1200,
      language: 'JavaScript',
      url: 'https://github.com/project-management-system',
      author: 'FullStackPro',
      license: 'MIT',
      topics: ['react', 'nodejs', 'mongodb', 'socketio', 'project-management'],
      features: ['Task Management', 'Team Collaboration', 'File Sharing', 'Real-time Updates', 'Reporting Dashboard'],
      learningOutcomes: ['Full Stack Development', 'Real-time Communication', 'Database Design', 'Authentication'],
      prerequisites: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      estimatedHours: 200,
      communitySupport: 'High',
      lastUpdated: '4 days ago',
      trending: true,
      featured: true
    },
    // Data Science Projects
    {
      id: 6,
      title: 'Customer Churn Prediction',
      description: 'Machine learning project to predict customer churn using ensemble methods and feature engineering.',
      role: 'Data Scientist',
      skills: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
      difficulty: 'intermediate',
      duration: '3-4 weeks',
      stars: 3800,
      forks: 980,
      language: 'Python',
      url: 'https://github.com/customer-churn-prediction',
      author: 'DataScienceHub',
      license: 'MIT',
      topics: ['machine-learning', 'scikit-learn', 'pandas', 'data-science', 'churn'],
      features: ['Data Preprocessing', 'Feature Engineering', 'Model Training', 'Evaluation Metrics', 'Visualization'],
      learningOutcomes: ['Machine Learning Pipelines', 'Feature Engineering', 'Model Evaluation', 'Data Visualization'],
      prerequisites: ['Python', 'Statistics basics', 'Machine Learning concepts'],
      estimatedHours: 90,
      communitySupport: 'High',
      lastUpdated: '2 weeks ago',
      trending: false,
      featured: false
    },
    {
      id: 7,
      title: 'Stock Market Prediction System',
      description: 'Deep learning system for stock price prediction using LSTM networks and technical analysis.',
      role: 'Machine Learning Engineer',
      skills: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Plotly'],
      difficulty: 'advanced',
      duration: '6-8 weeks',
      stars: 5200,
      forks: 1450,
      language: 'Python',
      url: 'https://github.com/stock-prediction-lstm',
      author: 'MLFinance',
      license: 'Apache-2.0',
      topics: ['tensorflow', 'lstm', 'stock-market', 'deep-learning', 'finance'],
      features: ['LSTM Networks', 'Technical Indicators', 'Price Prediction', 'Backtesting', 'Visualization'],
      learningOutcomes: ['Deep Learning', 'Time Series Analysis', 'Financial Modeling', 'Neural Networks'],
      prerequisites: ['Python', 'Deep Learning basics', 'Statistics', 'Financial concepts'],
      estimatedHours: 150,
      communitySupport: 'High',
      lastUpdated: '1 week ago',
      trending: true,
      featured: true
    },
    // Mobile Projects
    {
      id: 8,
      title: 'Fitness Tracking App',
      description: 'Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
      role: 'Mobile Developer',
      skills: ['React Native', 'Firebase', 'Redux', 'Expo', 'JavaScript'],
      difficulty: 'intermediate',
      duration: '5-6 weeks',
      stars: 2800,
      forks: 620,
      language: 'JavaScript',
      url: 'https://github.com/fitness-tracker-app',
      author: 'MobileDevTeam',
      license: 'MIT',
      topics: ['react-native', 'firebase', 'fitness', 'mobile-app', 'expo'],
      features: ['Workout Tracking', 'Progress Monitoring', 'Social Features', 'Nutrition Logging', 'Achievement System'],
      learningOutcomes: ['React Native Development', 'Firebase Integration', 'Mobile UI/UX', 'State Management'],
      prerequisites: ['React', 'JavaScript', 'Mobile development basics'],
      estimatedHours: 120,
      communitySupport: 'Medium',
      lastUpdated: '2 weeks ago',
      trending: false,
      featured: false
    },
    // DevOps Projects
    {
      id: 9,
      title: 'Kubernetes Deployment Pipeline',
      description: 'Complete CI/CD pipeline with Kubernetes, Docker, GitHub Actions, and automated testing for microservices.',
      role: 'DevOps Engineer',
      skills: ['Kubernetes', 'Docker', 'GitHub Actions', 'Helm', 'Prometheus', 'Grafana'],
      difficulty: 'advanced',
      duration: '4-5 weeks',
      stars: 4100,
      forks: 980,
      language: 'YAML',
      url: 'https://github.com/k8s-deployment-pipeline',
      author: 'DevOpsMasters',
      license: 'Apache-2.0',
      topics: ['kubernetes', 'docker', 'ci-cd', 'github-actions', 'devops'],
      features: ['CI/CD Pipeline', 'Container Orchestration', 'Monitoring', 'Auto-scaling', 'Rolling Updates'],
      learningOutcomes: ['Kubernetes Orchestration', 'CI/CD Pipelines', 'Container Security', 'Infrastructure as Code'],
      prerequisites: ['Docker', 'Kubernetes basics', 'Linux', 'Networking'],
      estimatedHours: 100,
      communitySupport: 'High',
      lastUpdated: '5 days ago',
      trending: true,
      featured: true
    },
    // UI/UX Projects
    {
      id: 10,
      title: 'Design System Components',
      description: 'Comprehensive design system with reusable UI components, design tokens, and documentation for consistent design.',
      role: 'UI/UX Designer',
      skills: ['Figma', 'Storybook', 'React', 'TypeScript', 'CSS-in-JS'],
      difficulty: 'intermediate',
      duration: '3-4 weeks',
      stars: 3200,
      forks: 750,
      language: 'TypeScript',
      url: 'https://github.com/design-system-components',
      author: 'DesignSystemPro',
      license: 'MIT',
      topics: ['design-system', 'figma', 'storybook', 'ui-components', 'typescript'],
      features: ['Component Library', 'Design Tokens', 'Documentation', 'Theme System', 'Accessibility'],
      learningOutcomes: ['Design Systems', 'Component Architecture', 'Design Documentation', 'Accessibility'],
      prerequisites: ['Figma', 'React', 'CSS', 'Design principles'],
      estimatedHours: 80,
      communitySupport: 'Medium',
      lastUpdated: '1 week ago',
      trending: false,
      featured: false
    },
    // Cybersecurity Projects
    {
      id: 11,
      title: 'Network Security Scanner',
      description: 'Comprehensive network security vulnerability scanner with port scanning, service detection, and reporting.',
      role: 'Cybersecurity Analyst',
      skills: ['Python', 'Scapy', 'Nmap', 'Security', 'Networking', 'Cryptography'],
      difficulty: 'advanced',
      duration: '5-6 weeks',
      stars: 3500,
      forks: 820,
      language: 'Python',
      url: 'https://github.com/network-security-scanner',
      author: 'CyberSecTeam',
      license: 'GPL-3.0',
      topics: ['cybersecurity', 'networking', 'python', 'security', 'scanner'],
      features: ['Port Scanning', 'Service Detection', 'Vulnerability Assessment', 'Reporting', 'Alert System'],
      learningOutcomes: ['Network Security', 'Penetration Testing', 'Security Tools', 'Risk Assessment'],
      prerequisites: ['Python', 'Networking basics', 'Security concepts', 'Linux'],
      estimatedHours: 130,
      communitySupport: 'High',
      lastUpdated: '3 days ago',
      trending: true,
      featured: false
    },
    // Cloud Projects
    {
      id: 12,
      title: 'Serverless Web Application',
      description: 'Build a serverless web application using AWS Lambda, API Gateway, DynamoDB, and S3 with auto-scaling.',
      role: 'Cloud Architect',
      skills: ['AWS', 'Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFormation'],
      difficulty: 'advanced',
      duration: '4-5 weeks',
      stars: 2900,
      forks: 680,
      language: 'JavaScript',
      url: 'https://github.com/serverless-web-app',
      author: 'CloudArchitects',
      license: 'MIT',
      topics: ['aws', 'serverless', 'lambda', 'dynamodb', 'cloudformation'],
      features: ['Serverless Architecture', 'Auto-scaling', 'Pay-per-use', 'API Management', 'Data Storage'],
      learningOutcomes: ['Serverless Computing', 'AWS Services', 'Cloud Architecture', 'Cost Optimization'],
      prerequisites: ['AWS basics', 'JavaScript', 'REST APIs', 'Cloud concepts'],
      estimatedHours: 100,
      communitySupport: 'Medium',
      lastUpdated: '1 week ago',
      trending: false,
      featured: false
    },
    // Game Development Projects
    {
      id: 13,
      title: '3D Racing Game',
      description: 'Complete 3D racing game with physics, AI opponents, multiplayer support, and custom vehicle customization.',
      role: 'Game Developer',
      skills: ['Unity', 'C#', '3D Modeling', 'Physics Engine', 'Multiplayer', 'Shader Programming'],
      difficulty: 'expert',
      duration: '10-12 weeks',
      stars: 5500,
      forks: 1300,
      language: 'C#',
      url: 'https://github.com/3d-racing-game',
      author: 'GameDevStudio',
      license: 'MIT',
      topics: ['unity', 'csharp', 'gamedev', '3d', 'racing'],
      features: ['3D Graphics', 'Physics Engine', 'AI Opponents', 'Multiplayer', 'Vehicle Customization'],
      learningOutcomes: ['Unity Development', '3D Game Design', 'Physics Programming', 'Multiplayer Networking'],
      prerequisites: ['Unity', 'C#', '3D Math', 'Game Design principles'],
      estimatedHours: 250,
      communitySupport: 'High',
      lastUpdated: '2 weeks ago',
      trending: true,
      featured: true
    },
    // Blockchain Projects
    {
      id: 14,
      title: 'DeFi Lending Platform',
      description: 'Decentralized finance lending platform with smart contracts, liquidity pools, and yield farming.',
      role: 'Blockchain Developer',
      skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'DeFi', 'React'],
      difficulty: 'expert',
      duration: '8-10 weeks',
      stars: 4800,
      forks: 1100,
      language: 'Solidity',
      url: 'https://github.com/defi-lending-platform',
      author: 'BlockchainDevs',
      license: 'MIT',
      topics: ['solidity', 'ethereum', 'defi', 'smart-contracts', 'web3'],
      features: ['Smart Contracts', 'Liquidity Pools', 'Yield Farming', 'Governance', 'Token Economics'],
      learningOutcomes: ['Smart Contract Development', 'DeFi Protocols', 'Blockchain Integration', 'Token Economics'],
      prerequisites: ['Solidity', 'Ethereum', 'JavaScript', 'Finance concepts'],
      estimatedHours: 200,
      communitySupport: 'High',
      lastUpdated: '4 days ago',
      trending: true,
      featured: false
    },
    // QA Projects
    {
      id: 15,
      title: 'Automated Testing Framework',
      description: 'Comprehensive automated testing framework with Selenium, Cypress, Jest, and integration with CI/CD pipelines.',
      role: 'QA Engineer',
      skills: ['Selenium', 'Cypress', 'Jest', 'Python', 'TestNG', 'CI/CD'],
      difficulty: 'intermediate',
      duration: '4-5 weeks',
      stars: 2600,
      forks: 590,
      language: 'Python',
      url: 'https://github.com/automated-testing-framework',
      author: 'QATeam',
      license: 'MIT',
      topics: ['testing', 'selenium', 'cypress', 'automation', 'qa'],
      features: ['Web Automation', 'API Testing', 'Mobile Testing', 'Performance Testing', 'Reporting'],
      learningOutcomes: ['Test Automation', 'QA Methodologies', 'Testing Frameworks', 'CI/CD Integration'],
      prerequisites: ['Python', 'Testing concepts', 'Web technologies'],
      estimatedHours: 100,
      communitySupport: 'Medium',
      lastUpdated: '1 week ago',
      trending: false,
      featured: false
    }
  ]

  // Load projects on component mount
  useEffect(() => {
    loadProjects()
  }, [])

  // Filter projects whenever filters change
  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, selectedRole, selectedSkill, selectedDifficulty, sortBy])

  const loadProjects = async () => {
    try {
      setLoading(true)
      // Simulate API call with comprehensive data
      setTimeout(() => {
        setProjects(comprehensiveProjects)
        setFilteredProjects(comprehensiveProjects)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load projects:', error)
      setProjects(comprehensiveProjects)
      setFilteredProjects(comprehensiveProjects)
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = [...projects]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Role filter
    if (selectedRole !== 'all') {
      filtered = filtered.filter(project => project.role === selectedRole)
    }

    // Skill filter
    if (selectedSkill !== 'all') {
      filtered = filtered.filter(project => project.skills.includes(selectedSkill))
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(project => project.difficulty === selectedDifficulty)
    }

    // Sort projects
    switch (sortBy) {
      case 'recommended':
        filtered.sort((a, b) => b.stars - a.stars)
        break
      case 'trending':
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        break
      case 'difficulty':
        const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 }
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
        break
      case 'duration':
        filtered.sort((a, b) => {
          const aWeeks = parseInt(a.duration.split('-')[0])
          const bWeeks = parseInt(b.duration.split('-')[0])
          return aWeeks - bWeeks
        })
        break
      case 'updated':
        const timeOrder = { '1 day ago': 1, '2 days ago': 2, '3 days ago': 3, '1 week ago': 4, '2 weeks ago': 5, '3 weeks ago': 6, '1 month ago': 7 }
        filtered.sort((a, b) => (timeOrder[a.lastUpdated] || 99) - (timeOrder[b.lastUpdated] || 99))
        break
      default:
        break
    }

    setFilteredProjects(filtered)
  }

  // Enhanced button functions
  const saveProject = (projectId) => {
    if (!savedProjects.includes(projectId)) {
      setSavedProjects([...savedProjects, projectId])
      const project = projects.find(p => p.id === projectId)
      alert(`${project.title} saved to your projects!`)
    }
  }

  const removeSavedProject = (projectId) => {
    setSavedProjects(savedProjects.filter(id => id !== projectId))
    const project = projects.find(p => p.id === projectId)
    alert(`${project.title} removed from saved projects`)
  }

  const completeProject = (projectId) => {
    if (!completedProjects.includes(projectId)) {
      setCompletedProjects([...completedProjects, projectId])
      const project = projects.find(p => p.id === projectId)
      alert(`Congratulations! You completed ${project.title}! 🎉`)
    }
  }

  const viewProjectDetails = (project) => {
    setSelectedProject(project)
    setShowProjectDetail(true)
  }

  const openProject = (url) => {
    window.open(url, '_blank')
  }

  const exportProjects = () => {
    const exportData = {
      exportDate: new Date().toLocaleString(),
      totalProjects: filteredProjects.length,
      savedProjects: savedProjects.length,
      completedProjects: completedProjects.length,
      projects: filteredProjects.map(project => ({
        title: project.title,
        role: project.role,
        skills: project.skills,
        difficulty: project.difficulty,
        duration: project.duration,
        stars: project.stars,
        language: project.language,
        url: project.url
      }))
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `project-recommendations-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    alert('Project recommendations exported successfully!')
  }

  const refreshProjects = () => {
    setLoading(true)
    setTimeout(() => {
      loadProjects()
      alert('Project recommendations refreshed!')
    }, 1000)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200'
      case 'intermediate': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'advanced': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'expert': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Frontend Developer': return <Code2 className="w-4 h-4" />
      case 'Backend Developer': return <Database className="w-4 h-4" />
      case 'Full Stack Developer': return <Globe className="w-4 h-4" />
      case 'Data Scientist': return <BarChart3 className="w-4 h-4" />
      case 'Machine Learning Engineer': return <Brain className="w-4 h-4" />
      case 'DevOps Engineer': return <Cloud className="w-4 h-4" />
      case 'Mobile Developer': return <Smartphone className="w-4 h-4" />
      case 'UI/UX Designer': return <Palette className="w-4 h-4" />
      case 'Product Manager': return <TrendingUp className="w-4 h-4" />
      case 'Cybersecurity Analyst': return <Shield className="w-4 h-4" />
      case 'Cloud Architect': return <Cloud className="w-4 h-4" />
      case 'Game Developer': return <Rocket className="w-4 h-4" />
      case 'Blockchain Developer': return <Lock className="w-4 h-4" />
      case 'QA Engineer': return <CheckCircle className="w-4 h-4" />
      case 'Technical Writer': return <BookOpen className="w-4 h-4" />
      default: return <Code2 className="w-4 h-4" />
    }
  }

  // Chart data
  const roleData = jobRoles.slice(1).map(role => ({
    role: role.split(' ')[0],
    projects: projects.filter(project => project.role === role).length
  }))

  const difficultyData = [
    { level: 'Beginner', projects: projects.filter(p => p.difficulty === 'beginner').length },
    { level: 'Intermediate', projects: projects.filter(p => p.difficulty === 'intermediate').length },
    { level: 'Advanced', projects: projects.filter(p => p.difficulty === 'advanced').length },
    { level: 'Expert', projects: projects.filter(p => p.difficulty === 'expert').length }
  ]

  const skillData = skills.slice(1).map(skill => ({
    skill: skill,
    projects: projects.filter(project => project.skills.includes(skill)).length
  })).filter(item => item.projects > 0).slice(0, 10)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding perfect projects for you...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Recommendations</h1>
          <p className="text-gray-600 mt-1">Hands-on projects tailored to your job role and skills</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={refreshProjects}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Refresh</span>
          </button>
          <button
            onClick={exportProjects}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Export</span>
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Filters</span>
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
              {[selectedRole, selectedSkill, selectedDifficulty].filter(f => f !== 'all').length}
            </span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title, skills, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Roles</option>
            {jobRoles.slice(1).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Skills</option>
            {skills.slice(1).map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {difficultyLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="recommended">Most Recommended</option>
            <option value="trending">Trending</option>
            <option value="difficulty">Difficulty</option>
            <option value="duration">Duration</option>
            <option value="updated">Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{filteredProjects.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Projects</h3>
          <p className="text-xs text-gray-500 mt-1">Across all roles</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {filteredProjects.length > 0 ? Math.round(filteredProjects.reduce((acc, project) => acc + project.stars, 0) / filteredProjects.length) : 0}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Avg Stars</h3>
          <p className="text-xs text-gray-500 mt-1">Community rating</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{savedProjects.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Saved Projects</h3>
          <p className="text-xs text-gray-500 mt-1">Bookmarked for later</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{completedProjects.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Completed</h3>
          <p className="text-xs text-gray-500 mt-1">Projects finished</p>
        </div>
      </div>

      {/* Project Cards */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recommended Projects</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
              >
                <div className="w-4 h-4 space-y-1">
                  <div className="bg-current h-0.5"></div>
                  <div className="bg-current h-0.5"></div>
                  <div className="bg-current h-0.5"></div>
                </div>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {filteredProjects.length} projects
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className={`border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-purple-300 ${project.featured ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200' : ''}`}>
                {project.trending && (
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>Trending</span>
                    </span>
                    {project.featured && (
                      <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      project.role === 'Frontend Developer' ? 'bg-blue-100' :
                      project.role === 'Backend Developer' ? 'bg-green-100' :
                      project.role === 'Data Scientist' ? 'bg-purple-100' :
                      project.role === 'Mobile Developer' ? 'bg-orange-100' :
                      'bg-gray-100'
                    }`}>
                      {getRoleIcon(project.role)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 line-clamp-1">{project.title}</h4>
                      <p className="text-xs text-gray-500">{project.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => savedProjects.includes(project.id) ? removeSavedProject(project.id) : saveProject(project.id)}
                      className={`p-1 rounded transition-colors ${
                        savedProjects.includes(project.id) 
                          ? 'text-purple-600' 
                          : 'text-gray-400 hover:text-purple-600'
                      }`}
                      title="Save Project"
                    >
                      <Bookmark className="w-4 h-4" fill={savedProjects.includes(project.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      +{project.skills.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{project.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch className="w-3 h-3" />
                      <span>{project.forks}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.duration}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{project.language}</span>
                    <span>{project.lastUpdated}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => viewProjectDetails(project)}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => completedProjects.includes(project.id) ? null : completeProject(project.id)}
                      className={`px-3 py-1 rounded-lg transition-all duration-200 text-xs ${
                        completedProjects.includes(project.id)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      }`}
                    >
                      {completedProjects.includes(project.id) ? 'Completed ✓' : 'Mark Complete'}
                    </button>
                    <button
                      onClick={() => openProject(project.url)}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 text-xs flex items-center space-x-1"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className={`border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-purple-300 ${project.featured ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      project.role === 'Frontend Developer' ? 'bg-blue-100' :
                      project.role === 'Backend Developer' ? 'bg-green-100' :
                      project.role === 'Data Scientist' ? 'bg-purple-100' :
                      project.role === 'Mobile Developer' ? 'bg-orange-100' :
                      'bg-gray-100'
                    }`}>
                      {getRoleIcon(project.role)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{project.title}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{project.role}</span>
                        {project.trending && (
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>Trending</span>
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.skills.slice(0, 6).map((skill, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 6 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{project.skills.length - 6}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{project.stars.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitBranch className="w-3 h-3" />
                          <span>{project.forks}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{project.duration}</span>
                        </div>
                        <span className="bg-gray-100 px-2 py-1 rounded">{project.language}</span>
                        <span>{project.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => savedProjects.includes(project.id) ? removeSavedProject(project.id) : saveProject(project.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        savedProjects.includes(project.id) 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                      title="Save Project"
                    >
                      <Bookmark className="w-4 h-4" fill={savedProjects.includes(project.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => viewProjectDetails(project)}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => completedProjects.includes(project.id) ? null : completeProject(project.id)}
                      className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        completedProjects.includes(project.id)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      }`}
                    >
                      {completedProjects.includes(project.id) ? 'Completed ✓' : 'Mark Complete'}
                    </button>
                    <button
                      onClick={() => openProject(project.url)}
                      className="px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 text-sm flex items-center space-x-1"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects by Role */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Projects by Role</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="role" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="projects" fill="#8b5cf6" name="Number of Projects" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Projects by Difficulty */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Projects by Difficulty</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="projects"
                label={({level, projects}) => `${level}: ${projects}`}
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#f59e0b', '#ef4444'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Skills */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Skills</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="skill" type="category" stroke="#9ca3af" width={80} />
              <Tooltip />
              <Bar dataKey="projects" fill="#6366f1" name="Projects" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Detail Modal */}
      {showProjectDetail && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedProject.title}</h3>
              <button
                onClick={() => setShowProjectDetail(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Project Overview</h4>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Learning Outcomes</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedProject.learningOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Prerequisites</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedProject.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.topics.map((topic, index) => (
                      <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Role:</span>
                      <span className="font-medium">{selectedProject.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className={`font-medium px-2 py-1 rounded-full border ${getDifficultyColor(selectedProject.difficulty)}`}>
                        {selectedProject.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{selectedProject.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Estimated Hours:</span>
                      <span className="font-medium">{selectedProject.estimatedHours} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Language:</span>
                      <span className="font-medium">{selectedProject.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">License:</span>
                      <span className="font-medium">{selectedProject.license}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">GitHub Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Stars:</span>
                      <span className="font-medium">{selectedProject.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Forks:</span>
                      <span className="font-medium">{selectedProject.forks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Author:</span>
                      <span className="font-medium">{selectedProject.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="font-medium">{selectedProject.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Community Support:</span>
                      <span className="font-medium">{selectedProject.communitySupport}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => openProject(selectedProject.url)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  
                  <div className="flex space-y-2">
                    <button
                      onClick={() => savedProjects.includes(selectedProject.id) ? removeSavedProject(selectedProject.id) : saveProject(selectedProject.id)}
                      className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                        savedProjects.includes(selectedProject.id) 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" fill={savedProjects.includes(selectedProject.id) ? 'currentColor' : 'none'} />
                      <span>{savedProjects.includes(selectedProject.id) ? 'Saved' : 'Save Project'}</span>
                    </button>
                    
                    <button
                      onClick={() => completedProjects.includes(selectedProject.id) ? null : completeProject(selectedProject.id)}
                      className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                        completedProjects.includes(selectedProject.id)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      <span>{completedProjects.includes(selectedProject.id) ? 'Completed ✓' : 'Mark as Complete'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsRecommendation
