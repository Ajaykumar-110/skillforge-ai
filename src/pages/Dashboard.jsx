import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  BookOpen,
  Briefcase,
  Award,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  ArrowUp,
  ArrowDown,
  Star,
  Calendar,
  Download,
  RefreshCw,
  Sparkles,
  Zap,
  Brain,
  Code,
  GitBranch,
  Eye,
  BarChart
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';

const Dashboard = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      // Redirect to login if no user data
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  // Mock data
  const [stats, setStats] = useState({
    totalSkills: 12,
    completedCourses: 8,
    jobMatches: 24,
    profileCompletion: 85
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'course', title: 'Completed Advanced React Patterns', time: '2 hours ago', icon: BookOpen },
    { id: 2, type: 'job', title: 'New AI job match: Senior Developer', time: '5 hours ago', icon: Briefcase },
    { id: 3, type: 'skill', title: 'Added TypeScript to skills', time: '1 day ago', icon: Award },
    { id: 4, type: 'interview', title: 'Completed AI voice interview', time: '2 days ago', icon: Users },
  ]);

  const [recommendedJobs, setRecommendedJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp AI',
      location: 'San Francisco, CA',
      salary: '$120k - $180k',
      match: 92,
      logo: 'https://ui-avatars.com/api/?name=TechCorp+AI&background=3B82F6&color=fff'
    },
    {
      id: 2,
      title: 'AI Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$100k - $150k',
      match: 88,
      logo: 'https://ui-avatars.com/api/?name=StartupXYZ&background=10B981&color=fff'
    },
    {
      id: 3,
      title: 'React AI Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      salary: '$90k - $130k',
      match: 85,
      logo: 'https://ui-avatars.com/api/?name=Digital+Agency&background=F59E0B&color=fff'
    }
  ]);

  const [recommendedCourses, setRecommendedCourses] = useState([
    {
      id: 1,
      title: 'Advanced React & AI Integration',
      provider: 'Udemy',
      duration: '6 weeks',
      rating: 4.8,
      students: 15420,
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'AI System Design Interview',
      provider: 'Coursera',
      duration: '8 weeks',
      rating: 4.9,
      students: 28910,
      price: '$79.99',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'AWS Cloud & AI Architecture',
      provider: 'edX',
      duration: '10 weeks',
      rating: 4.7,
      students: 12350,
      price: '$99.99',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop'
    }
  ]);

  const [skillsProgress, setSkillsProgress] = useState([
    { name: 'JavaScript', level: 90, progress: 90 },
    { name: 'React', level: 85, progress: 85 },
    { name: 'TypeScript', level: 75, progress: 75 },
    { name: 'Node.js', level: 70, progress: 70 },
    { name: 'Python', level: 65, progress: 65 },
    { name: 'AI/ML', level: 60, progress: 60 }
  ]);

  const [trendingSkills, setTrendingSkills] = useState([
    { name: 'React', growth: 25, demand: 'High' },
    { name: 'TypeScript', growth: 30, demand: 'Very High' },
    { name: 'AI/ML', growth: 45, demand: 'Very High' },
    { name: 'Python', growth: 20, demand: 'High' },
    { name: 'AWS', growth: 35, demand: 'High' },
    { name: 'Node.js', growth: 15, demand: 'Medium' }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleViewAllJobs = () => {
    navigate('/job-recommendations');
  };

  const handleViewAllCourses = () => {
    navigate('/course-recommendations');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading AI Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.full_name || 'User'}! 🚀
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your AI-powered career development overview for today
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className={`flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                  refreshing ? 'animate-pulse' : ''
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Refresh AI Data
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export AI Report</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center"
              >
                <ArrowUp className="w-3 h-3 mr-1" />
                +12%
              </motion.span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalSkills}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Skills Analyzed</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center"
              >
                <ArrowUp className="w-3 h-3 mr-1" />
                +8%
              </motion.span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.completedCourses}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Courses Completed</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Briefcase className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center"
              >
                <ArrowUp className="w-3 h-3 mr-1" />
                +24%
              </motion.span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.jobMatches}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Job Matches</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Target className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-xs font-medium text-orange-600 dark:text-orange-400 flex items-center"
              >
                <ArrowUp className="w-3 h-3 mr-1" />
                +5%
              </motion.span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.profileCompletion}%
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Profile Complete</p>
          </motion.div>
        </motion.div>

        {/* Skill Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BarChart className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Skill Progress Chart
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAllCourses}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View All Skills →
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skills Distribution
              </h3>
              <div className="space-y-4">
                {skillsProgress.map((skill, index) => (
                  <div key={skill.name} className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}% proficiency
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Learning Progress
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAllCourses}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View All Courses →
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Courses Completed
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Advanced React Development', progress: 85, duration: '6 weeks' },
                  { name: 'AWS Cloud Architecture', progress: 70, duration: '8 weeks' },
                  { name: 'System Design Interview', progress: 60, duration: '4 weeks' }
                ].map((course, index) => (
                  <div key={index} className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {course.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {course.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {course.progress}%
                      </span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Learning Streak
              </h3>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    15 Days
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Keep up the great work!
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    {Array.from({ length: 15 }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index < 15 ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommended Jobs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    AI Job Recommendations
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleViewAllJobs}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    View All →
                  </motion.button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {recommendedJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl hover:from-blue-100/50 hover:to-purple-100/50 dark:hover:from-blue-800/30 dark:hover:to-purple-800/30 transition-all duration-300 cursor-pointer"
                    onClick={() => window.open(`https://linkedin.com/jobs/search?keywords=${encodeURIComponent(job.title)}`, '_blank')}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        src={job.logo}
                        alt={job.company}
                        className="w-12 h-12 rounded-xl object-cover shadow-lg"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {job.company} • {job.location}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {job.salary}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center space-x-1 text-green-600 dark:text-green-400 mb-1"
                      >
                        <span className="text-lg font-bold">{job.match}%</span>
                        <span className="text-xs">AI Match</span>
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        Apply Now →
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  AI Activity Feed
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <activity.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Progress & Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-600" />
                  AI Skills Progress
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {skillsProgress.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AIAssistant />
          </motion.div>

          {/* Trending Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Trending AI Skills
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {trendingSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {skill.demand} Demand
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <ArrowUp className="w-3 h-3" />
                      <span className="text-sm font-bold">{skill.growth}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
