import React, { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Star, 
  Clock, 
  Users, 
  DollarSign, 
  Play, 
  Filter, 
  Search, 
  ExternalLink, 
  Award, 
  TrendingUp, 
  Calendar,
  Bookmark,
  Heart,
  Share2,
  Download,
  RefreshCw,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Globe,
  Shield,
  Brain,
  BarChart3,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  Eye
} from 'lucide-react'
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

const CourseRecommendations = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Complete React Developer Course 2024",
      instructor: "Dr. Sarah Johnson",
      platform: "Udemy",
      rating: 4.8,
      reviews: 15420,
      price: 89.99,
      originalPrice: 199.99,
      duration: "40 hours",
      level: "Intermediate",
      students: 45230,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      description: "Master React with hooks, Redux, and real-world projects",
      topics: ["React", "JavaScript", "Redux", "Hooks", "Redux Toolkit"],
      skills: ["Frontend Development", "React", "State Management"],
      difficulty: "intermediate",
      matchScore: 95,
      category: "Frontend",
      url: "https://www.udemy.com/course/react-the-complete-guide-including-redux/",
      featured: true,
      trending: true,
      bestseller: true
    },
    {
      id: 2,
      title: "Python for Data Science & Machine Learning",
      instructor: "Jose Portilla",
      platform: "Udemy",
      rating: 4.6,
      reviews: 28950,
      price: 94.99,
      originalPrice: 199.99,
      duration: "25 hours",
      level: "Beginner",
      students: 89230,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
      description: "Learn Python for data science, machine learning, and data analysis",
      topics: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
      skills: ["Data Science", "Python", "Machine Learning"],
      difficulty: "beginner",
      matchScore: 92,
      category: "Data Science",
      url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
      featured: false,
      trending: true,
      bestseller: true
    },
    {
      id: 3,
      title: "AWS Certified Solutions Architect",
      instructor: "Stephane Maarek",
      platform: "Udemy",
      rating: 4.7,
      reviews: 19870,
      price: 84.99,
      originalPrice: 199.99,
      duration: "27 hours",
      level: "Intermediate",
      students: 67890,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
      description: "Complete AWS Certified Solutions Architect Associate training",
      topics: ["AWS", "Cloud Computing", "IAM", "EC2", "S3", "Lambda"],
      skills: ["Cloud Computing", "AWS", "Architecture"],
      difficulty: "intermediate",
      matchScore: 88,
      category: "Cloud",
      url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate/",
      featured: true,
      trending: false,
      bestseller: false
    },
    {
      id: 4,
      title: "Node.js - The Complete Guide",
      instructor: "Maximilian Schwarzmüller",
      platform: "Udemy",
      rating: 4.6,
      reviews: 23450,
      price: 89.99,
      originalPrice: 199.99,
      duration: "42 hours",
      level: "Intermediate",
      students: 78920,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1627398242455-45a1465c2479?w=400&h=200&fit=crop",
      description: "Build network applications with Node.js, Express, MongoDB and more",
      topics: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
      skills: ["Backend Development", "Node.js", "APIs"],
      difficulty: "intermediate",
      matchScore: 90,
      category: "Backend",
      url: "https://www.udemy.com/course/nodejs-the-complete-guide/",
      featured: false,
      trending: false,
      bestseller: true
    },
    {
      id: 5,
      title: "Machine Learning A-Z",
      instructor: "Kirill Eremenko",
      platform: "Udemy",
      rating: 4.5,
      reviews: 45670,
      price: 94.99,
      originalPrice: 199.99,
      duration: "44 hours",
      level: "Beginner",
      students: 123450,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1555255703-cb9fa53c242e?w=400&h=200&fit=crop",
      description: "Hands-on Python & R in Data Science, Machine Learning, AI",
      topics: ["Machine Learning", "Python", "R", "Deep Learning", "Data Science"],
      skills: ["Machine Learning", "Python", "Data Science"],
      difficulty: "beginner",
      matchScore: 85,
      category: "Data Science",
      url: "https://www.udemy.com/course/machinelearning/",
      featured: false,
      trending: true,
      bestseller: true
    },
    {
      id: 6,
      title: "Docker & Kubernetes: The Practical Guide",
      instructor: "Maximilian Schwarzmüller",
      platform: "Udemy",
      rating: 4.7,
      reviews: 8912,
      price: 89.99,
      originalPrice: 179.99,
      duration: "42 hours",
      level: "Advanced",
      students: 32100,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1668070272080-6a7da88c716c?w=400&h=200&fit=crop",
      description: "Container orchestration with Docker and Kubernetes",
      topics: ["Docker", "Kubernetes", "DevOps", "Containers", "CI/CD"],
      skills: ["DevOps", "Docker", "Kubernetes"],
      difficulty: "advanced",
      matchScore: 75,
      category: "DevOps",
      url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
      featured: true,
      trending: false,
      bestseller: false
    },
    {
      id: 7,
      title: "Advanced CSS and Sass: Flexbox, Grid, Animations",
      instructor: "Jonas Schmedtmann",
      platform: "Udemy",
      rating: 4.8,
      reviews: 12580,
      price: 79.99,
      originalPrice: 189.99,
      duration: "28 hours",
      level: "Intermediate",
      students: 56780,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      description: "Master modern CSS with Flexbox, Grid, animations, and Sass",
      topics: ["CSS", "Sass", "Flexbox", "Grid", "Animations"],
      skills: ["Frontend Development", "CSS", "Web Design"],
      difficulty: "intermediate",
      matchScore: 87,
      category: "Frontend",
      url: "https://www.udemy.com/course/advanced-css-and-sass/",
      featured: false,
      trending: false,
      bestseller: true
    },
    {
      id: 8,
      title: "iOS & Swift - The Complete iOS App Development Bootcamp",
      instructor: "Angela Yu",
      platform: "Udemy",
      rating: 4.7,
      reviews: 18920,
      price: 94.99,
      originalPrice: 199.99,
      duration: "60 hours",
      level: "Beginner",
      students: 234560,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
      description: "Build iOS apps with Swift 5 and Xcode 11",
      topics: ["Swift", "iOS", "Xcode", "Mobile Development", "Apps"],
      skills: ["Mobile Development", "iOS", "Swift"],
      difficulty: "beginner",
      matchScore: 93,
      category: "Mobile",
      url: "https://www.udemy.com/course/ios-13-swift/",
      featured: true,
      trending: true,
      bestseller: true
    },
    {
      id: 9,
      title: "Angular - The Complete Guide",
      instructor: "Maximilian Schwarzmüller",
      platform: "Udemy",
      rating: 4.6,
      reviews: 15670,
      price: 89.99,
      originalPrice: 199.99,
      duration: "36 hours",
      level: "Intermediate",
      students: 67890,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
      description: "Master Angular 13 and build awesome, reactive web apps",
      topics: ["Angular", "TypeScript", "RxJS", "Frontend", "SPA"],
      skills: ["Frontend Development", "Angular", "TypeScript"],
      difficulty: "intermediate",
      matchScore: 86,
      category: "Frontend",
      url: "https://www.udemy.com/course/the-complete-guide-to-angular-2/",
      featured: false,
      trending: false,
      bestseller: true
    },
    {
      id: 10,
      title: "Java Programming Masterclass",
      instructor: "Tim Buchalka",
      platform: "Udemy",
      rating: 4.6,
      reviews: 24560,
      price: 84.99,
      originalPrice: 189.99,
      duration: "80 hours",
      level: "Beginner",
      students: 345670,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
      description: "Learn Java programming from scratch",
      topics: ["Java", "Programming", "OOP", "Development", "Algorithms"],
      skills: ["Programming", "Java", "Software Development"],
      difficulty: "beginner",
      matchScore: 91,
      category: "Backend",
      url: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
      featured: true,
      trending: true,
      bestseller: true
    },
    {
      id: 11,
      title: "Flutter & Dart - Complete Guide",
      instructor: "Maximilian Schwarzmüller",
      platform: "Udemy",
      rating: 4.7,
      reviews: 12340,
      price: 89.99,
      originalPrice: 199.99,
      duration: "42 hours",
      level: "Intermediate",
      students: 56780,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
      description: "Build iOS and Android apps with Flutter and Dart",
      topics: ["Flutter", "Dart", "Mobile Development", "Cross-platform", "Apps"],
      skills: ["Mobile Development", "Flutter", "Cross-platform"],
      difficulty: "intermediate",
      matchScore: 89,
      category: "Mobile",
      url: "https://www.udemy.com/course/flutter-dart-complete-guide/",
      featured: false,
      trending: true,
      bestseller: true
    },
    {
      id: 12,
      title: "Cybersecurity: Complete Bootcamp",
      instructor: "Alex Hepburn",
      platform: "Udemy",
      rating: 4.5,
      reviews: 8760,
      price: 94.99,
      originalPrice: 199.99,
      duration: "52 hours",
      level: "Beginner",
      students: 45670,
      lastUpdated: "March 2024",
      language: "English",
      certificate: true,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
      description: "Learn cybersecurity from scratch",
      topics: ["Cybersecurity", "Ethical Hacking", "Network Security", "Penetration Testing"],
      skills: ["Cybersecurity", "Security", "Ethical Hacking"],
      difficulty: "beginner",
      matchScore: 82,
      category: "Security",
      url: "https://www.udemy.com/course/complete-cyber-security-bootcamp/",
      featured: true,
      trending: false,
      bestseller: false
    }
  ])

  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [sortBy, setSortBy] = useState('match')
  const [savedCourses, setSavedCourses] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showCourseDetail, setShowCourseDetail] = useState(false)
  const [loading, setLoading] = useState(false)

  // Enhanced handler functions
  const handleAdvancedFilters = () => {
    setShowFilters(!showFilters)
    alert('Advanced filters toggled! You can now filter by price range, duration, and more.')
  }

  const handleCreateLearningPath = async () => {
    try {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        alert('✅ Personalized learning path created! Check your dashboard for the custom roadmap.')
        setLoading(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to create learning path:', error)
      alert('❌ Failed to create learning path. Please try again.')
      setLoading(false)
    }
  }

  const handleEnrollCourse = (course) => {
    // Open the actual course URL in a new tab
    window.open(course.url, '_blank')
    
    // Add to enrolled courses if not already enrolled
    if (!enrolledCourses.includes(course.id)) {
      setEnrolledCourses([...enrolledCourses, course.id])
      alert(`🎓 Successfully enrolled in "${course.title}"! Opening course page...`)
    } else {
      alert(`📚 You're already enrolled in "${course.title}"! Opening course page...`)
    }
  }

  const saveCourse = (courseId) => {
    if (!savedCourses.includes(courseId)) {
      setSavedCourses([...savedCourses, courseId])
      const course = courses.find(c => c.id === courseId)
      alert(`💾 "${course.title}" saved to your wishlist!`)
    }
  }

  const removeSavedCourse = (courseId) => {
    setSavedCourses(savedCourses.filter(id => id !== courseId))
    const course = courses.find(c => c.id === courseId)
    alert(`🗑️ "${course.title}" removed from your wishlist!`)
  }

  const shareCourse = (course) => {
    const shareText = `Check out this course: ${course.title} by ${course.instructor} - ${course.platform}`
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: shareText,
        url: course.url
      })
    } else {
      navigator.clipboard.writeText(`${shareText} - ${course.url}`)
      alert('📋 Course link copied to clipboard!')
    }
  }

  const viewCourseDetails = (course) => {
    setSelectedCourse(course)
    setShowCourseDetail(true)
  }

  const exportCourses = () => {
    const exportData = {
      exportDate: new Date().toLocaleString(),
      totalCourses: filteredCourses.length,
      savedCourses: savedCourses.length,
      enrolledCourses: enrolledCourses.length,
      courses: filteredCourses.map(course => ({
        title: course.title,
        instructor: course.instructor,
        platform: course.platform,
        rating: course.rating,
        price: course.price,
        duration: course.duration,
        level: course.level,
        category: course.category,
        url: course.url
      }))
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `course-recommendations-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    alert('📥 Course recommendations exported successfully!')
  }

  const refreshCourses = () => {
    setLoading(true)
    setTimeout(() => {
      setFilteredCourses(courses)
      setLoading(false)
      alert('🔄 Course recommendations refreshed!')
    }, 1000)
  }

  const addToLearningPath = (course) => {
    alert(`📚 "${course.title}" added to your learning path!`)
  }

  const rateCourse = (courseId, rating) => {
    alert(`⭐ You rated this course ${rating} stars! Thank you for your feedback.`)
  }

  const categories = ['all', 'Frontend', 'Backend', 'Data Science', 'Cloud', 'DevOps', 'Mobile']
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced']
  const platforms = ['all', 'Udemy', 'Coursera', 'A Cloud Guru', 'edX', 'Pluralsight']
  const sortOptions = [
    { value: 'match', label: 'Best Match' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'students', label: 'Most Popular' }
  ]

  const platformData = [
    { name: 'Udemy', courses: 3, avgPrice: 85 },
    { name: 'Coursera', courses: 1, avgPrice: 80 },
    { name: 'A Cloud Guru', courses: 1, avgPrice: 100 },
    { name: 'Others', courses: 1, avgPrice: 90 }
  ]

  const categoryData = [
    { name: 'Frontend', courses: 2, avgRating: 4.8 },
    { name: 'Backend', courses: 1, avgRating: 4.7 },
    { name: 'Data Science', courses: 1, avgRating: 4.9 },
    { name: 'Cloud', courses: 1, avgRating: 4.6 },
    { name: 'DevOps', courses: 1, avgRating: 4.7 }
  ]

  const priceRangeData = [
    { range: '$0-$50', count: 0 },
    { range: '$50-$100', count: 5 },
    { range: '$100-$150', count: 1 },
    { range: '$150+', count: 0 }
  ]

  const learningPathData = [
    { month: 'Jan', courses: 2, hours: 80 },
    { month: 'Feb', courses: 3, hours: 120 },
    { month: 'Mar', courses: 2, hours: 85 },
    { month: 'Apr', courses: 4, hours: 160 },
    { month: 'May', courses: 3, hours: 130 },
    { month: 'Jun', courses: 2, hours: 90 }
  ]

  // Load courses from API on component mount
  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      setLoading(true)
      
      // Try real Udemy API first
      const response = await apiService.searchUdemyCourses('react', '', 'rating', 20)
      
      if (response.success && response.courses) {
        setCourses(response.courses)
        setFilteredCourses(response.courses)
      } else {
        // Fallback to Udemy search redirect
        if (response.redirectUrl) {
          window.open(response.redirectUrl, '_blank')
          alert('Opening Udemy course search in new tab...')
        }
        // Use mock data as fallback
        setFilteredCourses(courses)
      }
    } catch (error) {
      console.error('Error loading courses:', error)
      // Fallback to mock data
      setFilteredCourses(courses)
    } finally {
      setLoading(false)
    }
  }

  // Update filtered courses whenever filters change
  useEffect(() => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(course => course.platform === selectedPlatform)
    }

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore
        case 'rating':
          return b.rating - a.rating
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'students':
          return b.students - a.students
        default:
          return 0
      }
    })

    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, selectedLevel, selectedPlatform, sortBy, courses])

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 80) return 'text-blue-600 bg-blue-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getMatchBadge = (score) => {
    if (score >= 90) return 'Excellent Match'
    if (score >= 80) return 'Strong Match'
    if (score >= 70) return 'Good Match'
    return 'Potential Match'
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-50'
      case 'Intermediate': return 'text-blue-600 bg-blue-50'
      case 'Advanced': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Recommendations</h1>
          <p className="text-gray-600 mt-1">Personalized courses based on your skills and goals</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={refreshCourses}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Refresh</span>
          </button>
          <button
            onClick={exportCourses}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Export</span>
          </button>
          <button 
            onClick={handleAdvancedFilters}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Advanced Filters</span>
          </button>
          <button 
            onClick={handleCreateLearningPath}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Target className="w-4 h-4" />
            )}
            <span>{loading ? 'Creating...' : 'Create Learning Path'}</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{filteredCourses.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Available Courses</h3>
          <p className="text-xs text-gray-500 mt-1">Matching your profile</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {(filteredCourses.reduce((acc, course) => acc + course.rating, 0) / filteredCourses.length).toFixed(1)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Average Rating</h3>
          <p className="text-xs text-gray-500 mt-1">High quality courses</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(Math.round(filteredCourses.reduce((acc, course) => acc + course.price, 0) / filteredCourses.length))}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Average Price</h3>
          <p className="text-xs text-gray-500 mt-1">Per course</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatNumber(filteredCourses.reduce((acc, course) => acc + course.students, 0))}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Students</h3>
          <p className="text-xs text-gray-500 mt-1">Enrolled learners</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Courses</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search by title, instructor..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>
                  {platform === 'all' ? 'All Platforms' : platform}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-200 overflow-hidden">
            {/* Course Image */}
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format`
                }}
              />
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getMatchColor(course.matchScore)}`}>
                  {getMatchBadge(course.matchScore)}
                </span>
                {course.trending && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>Trending</span>
                  </span>
                )}
                {course.bestseller && (
                  <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Bestseller</span>
                  </span>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
              {course.originalPrice > course.price && (
                <div className="absolute bottom-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  -{Math.round((1 - course.price / course.originalPrice) * 100)}%
                </div>
              )}
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {course.platform}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{course.rating}</span>
                  <span className="text-xs text-gray-500">({formatNumber(course.reviews)})</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">By {course.instructor}</p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{course.description}</p>

              {/* Course Details */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{formatNumber(course.students)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{course.lastUpdated}</span>
                </div>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-1 mb-4">
                {course.topics.slice(0, 3).map((topic, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {topic}
                  </span>
                ))}
                {course.topics.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{course.topics.length - 3}
                  </span>
                )}
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Skills you'll gain:</p>
                <div className="flex flex-wrap gap-1">
                  {course.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{formatPrice(course.price)}</span>
                    {course.originalPrice > course.price && (
                      <span className="text-sm text-gray-500 line-through">{formatPrice(course.originalPrice)}</span>
                    )}
                  </div>
                  {course.certificate && (
                    <p className="text-xs text-green-600 flex items-center space-x-1 mt-1">
                      <Award className="w-3 h-3" />
                      <span>Certificate included</span>
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => savedCourses.includes(course.id) ? removeSavedCourse(course.id) : saveCourse(course.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      savedCourses.includes(course.id) 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    title="Save Course"
                  >
                    <Bookmark className="w-4 h-4" fill={savedCourses.includes(course.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => shareCourse(course)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Share Course"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => viewCourseDetails(course)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEnrollCourse(course)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                      enrolledCourses.includes(course.id)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
                    }`}
                  >
                    <span>{enrolledCourses.includes(course.id) ? 'Enrolled ✓' : 'Enroll'}</span>
                    {enrolledCourses.includes(course.id) ? <CheckCircle className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Distribution */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="courses"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 gap-2 mt-4">
            {platformData.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{platform.name}</span>
                <span className="text-sm font-medium text-gray-900">{platform.courses} courses</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="avgRating" fill="#6366f1" name="Avg Rating" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Learning Progress */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Learning Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={learningPathData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
                name="Hours"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Detail Modal */}
      {showCourseDetail && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedCourse.title}</h3>
              <button
                onClick={() => setShowCourseDetail(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format`
                    }}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Course Overview</h4>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.topics.map((topic, index) => (
                      <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Skills You'll Gain</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.skills.map((skill, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Course Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{formatNumber(selectedCourse.students)} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Updated {selectedCourse.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span>{selectedCourse.language}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Course Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Instructor:</span>
                      <span className="font-medium">{selectedCourse.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Platform:</span>
                      <span className="font-medium">{selectedCourse.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Level:</span>
                      <span className={`font-medium px-2 py-1 rounded-full ${getLevelColor(selectedCourse.level)}`}>
                        {selectedCourse.level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{selectedCourse.rating}</span>
                        <span className="text-gray-500">({formatNumber(selectedCourse.reviews)})</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Match Score:</span>
                      <span className={`font-medium px-2 py-1 rounded-full ${getMatchColor(selectedCourse.matchScore)}`}>
                        {selectedCourse.matchScore}% - {getMatchBadge(selectedCourse.matchScore)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Price</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(selectedCourse.price)}</span>
                    {selectedCourse.originalPrice > selectedCourse.price && (
                      <span className="text-lg text-gray-500 line-through">{formatPrice(selectedCourse.originalPrice)}</span>
                    )}
                  </div>
                  {selectedCourse.certificate && (
                    <p className="text-sm text-green-600 flex items-center space-x-1 mt-2">
                      <Award className="w-4 h-4" />
                      <span>Certificate included</span>
                    </p>
                  )}
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => handleEnrollCourse(selectedCourse)}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                      enrolledCourses.includes(selectedCourse.id)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
                    }`}
                  >
                    <span>{enrolledCourses.includes(selectedCourse.id) ? 'Enrolled ✓' : 'Enroll Now'}</span>
                    {enrolledCourses.includes(selectedCourse.id) ? <CheckCircle className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => savedCourses.includes(selectedCourse.id) ? removeSavedCourse(selectedCourse.id) : saveCourse(selectedCourse.id)}
                      className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                        savedCourses.includes(selectedCourse.id) 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" fill={savedCourses.includes(selectedCourse.id) ? 'currentColor' : 'none'} />
                      <span>{savedCourses.includes(selectedCourse.id) ? 'Saved' : 'Save Course'}</span>
                    </button>
                    
                    <button
                      onClick={() => shareCourse(selectedCourse)}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  <button
                    onClick={() => addToLearningPath(selectedCourse)}
                    className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Target className="w-4 h-4" />
                    <span>Add to Learning Path</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseRecommendations
