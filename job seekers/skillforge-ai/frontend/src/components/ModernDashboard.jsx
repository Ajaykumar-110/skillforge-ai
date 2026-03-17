import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Award, 
  Target,
  Brain,
  BookOpen,
  Clock,
  DollarSign,
  Star,
  ChevronUp,
  ChevronDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Shield,
  ArrowRight,
  Calendar,
  MapPin,
  Building,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import apiService from '../services/api';

const ModernDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load dashboard data in parallel
        const [analyticsData, coursesData, jobsData, resumeData] = await Promise.all([
          apiService.get('/api/analytics'),
          apiService.getRecommendedCourses(user?.skills || [], 5),
          apiService.get('/api/job-recommendations'),
          apiService.get('/api/resume/latest-analysis')
        ]);

        setAnalytics(analyticsData);
        setRecommendedCourses(coursesData.courses || []);
        setRecommendedJobs(jobsData.jobs || []);
        setResumeAnalysis(resumeData.analysis);
        
      } catch (error) {
        console.error('Dashboard loading error:', error);
        // Set fallback data
        setAnalytics({
          skillsProgress: 75,
          jobMatches: 12,
          coursesCompleted: 8,
          profileViews: 156
        });
        setRecommendedCourses([
          {
            id: 1,
            title: 'Advanced React Development',
            platform: 'Udemy',
            description: 'Master React with hooks, context, and performance optimization',
            rating: 4.8,
            students: 15420,
            price: '$89.99',
            url: 'https://www.udemy.com/course/react-advanced'
          },
          {
            id: 2,
            title: 'Python for Data Science',
            platform: 'Coursera',
            description: 'Learn Python programming for data analysis and machine learning',
            rating: 4.9,
            students: 28900,
            price: 'Free',
            url: 'https://www.coursera.org/learn/python-data-science'
          }
        ]);
        setRecommendedJobs([
          {
            id: 1,
            title: 'Senior React Developer',
            company: 'TechCorp',
            location: 'San Francisco, CA',
            salary: '$120k - $150k',
            type: 'Full-time',
            match: 92,
            description: 'Looking for experienced React developer with TypeScript and Node.js',
            url: 'https://linkedin.com/jobs/view/senior-react-dev'
          },
          {
            id: 2,
            title: 'Full Stack Engineer',
            company: 'StartupXYZ',
            location: 'Remote',
            salary: '$100k - $130k',
            type: 'Full-time',
            match: 88,
            description: 'Join our team to build amazing web applications',
            url: 'https://linkedin.com/jobs/view/full-stack-engineer'
          }
        ]);
        setResumeAnalysis({
          score: 85,
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          missingSkills: ['TypeScript', 'AWS', 'Docker'],
          suggestions: ['Learn TypeScript for better type safety', 'Get AWS certification', 'Master Docker for deployment']
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user, isAuthenticated, navigate]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Reload dashboard data
      const [analyticsData, coursesData, jobsData, resumeData] = await Promise.all([
        apiService.get('/api/analytics'),
        apiService.getRecommendedCourses(user?.skills || [], 5),
        apiService.get('/api/job-recommendations'),
        apiService.get('/api/resume/latest-analysis')
      ]);

      setAnalytics(analyticsData);
      setRecommendedCourses(coursesData.courses || []);
      setRecommendedJobs(jobsData.jobs || []);
      setResumeAnalysis(resumeData.analysis);
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.name || 'User'}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Your career development journey continues. Here's your personalized dashboard.
                </p>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                title="Refresh dashboard"
              >
                <Activity className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills Progress Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills Progress</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Profile Completion</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics?.skillsProgress || 75}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analytics?.skillsProgress || 75}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Recommended Courses Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Courses</h3>
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-3">
              {recommendedCourses.slice(0, 3).map((course, index) => (
                <motion.a
                  key={course.id}
                  href={course.url}
                  target="_blank"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {course.platform}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                            {course.rating}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {course.price}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                </motion.a>
              ))}
            </div>
            <button
              onClick={() => navigate('/course-recommendations')}
              className="w-full mt-4 p-2 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              View All Courses →
            </button>
          </motion.div>

          {/* Recommended Jobs Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Job Matches</h3>
              <Briefcase className="w-6 h-6 text-purple-500" />
            </div>
            <div className="space-y-3">
              {recommendedJobs.slice(0, 3).map((job, index) => (
                <motion.a
                  key={job.id}
                  href={job.url}
                  target="_blank"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {job.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {job.company} • {job.location}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {job.salary}
                        </span>
                        <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                          {job.match}% Match
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                  </div>
                </motion.a>
              ))}
            </div>
            <button
              onClick={() => navigate('/job-recommendations')}
              className="w-full mt-4 p-2 text-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              View All Jobs →
            </button>
          </motion.div>
        </div>

        {/* Resume Analysis Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Analysis</h3>
            <FileText className="w-6 h-6 text-orange-500" />
          </div>
          {resumeAnalysis ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Resume Score: {resumeAnalysis.score}/100
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Detected Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {resumeAnalysis.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Missing Skills:
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Add these skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {resumeAnalysis.missingSkills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Recommendations:</span>
                    <ul className="mt-2 space-y-1">
                      {resumeAnalysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No resume analysis yet. Upload your resume to get insights.
              </p>
              <button
                onClick={() => navigate('/resume-upload')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Resume
              </button>
            </div>
          )}
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <button
            onClick={() => navigate('/skill-analyzer')}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
          >
            <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Skill Analyzer</h4>
          </button>
          
          <button
            onClick={() => navigate('/career-roadmap')}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
          >
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Career Roadmap</h4>
          </button>
          
          <button
            onClick={() => navigate('/github-projects')}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
          >
            <Building className="w-8 h-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">GitHub Projects</h4>
          </button>
          
          <button
            onClick={() => navigate('/ai-assistant')}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
          >
            <Zap className="w-8 h-8 text-pink-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">AI Assistant</h4>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernDashboard;
