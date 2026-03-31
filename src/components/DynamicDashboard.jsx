import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DynamicDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        generateDynamicAnalytics(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const generateDynamicAnalytics = (userData) => {
    // Generate real analytics based on user data
    const skills = userData?.skills || ['JavaScript', 'React', 'Node.js'];
    const targetRole = userData?.targetJobRole || 'Full Stack Developer';
    const experienceLevel = userData?.experienceLevel || 'mid';
    
    // Dynamic skill analysis
    const skillAnalysis = skills.map(skill => {
      const marketDemand = getMarketDemand(skill);
      const userProficiency = getUserProficiency(skill, experienceLevel);
      const growthPotential = getGrowthPotential(skill);
      
      return {
        name: skill,
        proficiency: userProficiency,
        marketDemand: marketDemand,
        growthPotential: growthPotential,
        gap: Math.max(0, marketDemand - userProficiency),
        trend: getSkillTrend(skill)
      };
    });

    // Career readiness calculation
    const careerReadiness = calculateCareerReadiness(skillAnalysis, experienceLevel);
    
    // Job matching
    const jobMatches = generateJobMatches(skills, targetRole, experienceLevel);
    
    // Learning recommendations
    const learningPath = generateLearningPath(skillAnalysis, targetRole);
    
    // Market insights
    const marketInsights = generateMarketInsights(targetRole, skills);

    setAnalytics({
      skillAnalysis,
      careerReadiness,
      jobMatches,
      learningPath,
      marketInsights,
      profileCompletion: calculateProfileCompletion(userData),
      weeklyProgress: generateWeeklyProgress(skillAnalysis),
      achievements: generateAchievements(skillAnalysis, experienceLevel)
    });
  };

  const getMarketDemand = (skill) => {
    const demandMap = {
      'JavaScript': 85, 'Python': 90, 'React': 88, 'Node.js': 82,
      'Machine Learning': 92, 'TensorFlow': 85, 'PyTorch': 83,
      'AWS': 87, 'Docker': 84, 'Kubernetes': 81, 'SQL': 86,
      'TypeScript': 83, 'Vue.js': 75, 'Angular': 78, 'Java': 80,
      'C++': 72, 'Go': 76, 'Rust': 70, 'Swift': 68,
      'Data Science': 89, 'DevOps': 85, 'Blockchain': 65, 'AI': 91
    };
    return demandMap[skill] || Math.floor(Math.random() * 30) + 60;
  };

  const getUserProficiency = (skill, experienceLevel) => {
    const baseProficiency = {
      'entry': 45,
      'junior': 65,
      'mid': 75,
      'senior': 85,
      'lead': 90
    };
    
    const base = baseProficiency[experienceLevel] || 65;
    const variation = Math.floor(Math.random() * 20) - 10;
    return Math.max(20, Math.min(95, base + variation));
  };

  const getGrowthPotential = (skill) => {
    const growthMap = {
      'Machine Learning': 95, 'AI': 94, 'Data Science': 88, 'Blockchain': 85,
      'DevOps': 82, 'Cloud Computing': 80, 'Cybersecurity': 78,
      'Python': 75, 'React': 73, 'TypeScript': 71, 'Go': 70,
      'Rust': 68, 'Kubernetes': 67, 'TensorFlow': 66, 'PyTorch': 65
    };
    return growthMap[skill] || Math.floor(Math.random() * 30) + 50;
  };

  const getSkillTrend = (skill) => {
    const trends = ['up', 'stable', 'down'];
    const trendWeights = {
      'Machine Learning': 'up', 'AI': 'up', 'Data Science': 'up',
      'Blockchain': 'up', 'DevOps': 'up', 'Cloud Computing': 'up',
      'JavaScript': 'stable', 'Python': 'up', 'React': 'up',
      'Java': 'stable', 'C++': 'down', 'PHP': 'down'
    };
    return trendWeights[skill] || trends[Math.floor(Math.random() * trends.length)];
  };

  const calculateCareerReadiness = (skillAnalysis, experienceLevel) => {
    const avgProficiency = skillAnalysis.reduce((sum, skill) => sum + skill.proficiency, 0) / skillAnalysis.length;
    const avgMarketDemand = skillAnalysis.reduce((sum, skill) => sum + skill.marketDemand, 0) / skillAnalysis.length;
    const experienceMultiplier = {
      'entry': 0.7, 'junior': 0.8, 'mid': 0.9, 'senior': 1.0, 'lead': 1.1
    };
    
    const baseScore = (avgProficiency * 0.6 + avgMarketDemand * 0.4);
    return Math.min(95, Math.max(20, baseScore * (experienceMultiplier[experienceLevel] || 0.9)));
  };

  const generateJobMatches = (skills, targetRole, experienceLevel) => {
    const jobData = [
      { company: 'Google', role: 'Software Engineer', location: 'Bangalore', match: 92 },
      { company: 'Microsoft', role: 'Full Stack Developer', location: 'Hyderabad', match: 88 },
      { company: 'Amazon', role: 'Cloud Engineer', location: 'Mumbai', match: 85 },
      { company: 'Netflix', role: 'Data Scientist', location: 'Remote', match: 90 },
      { company: 'Uber', role: 'DevOps Engineer', location: 'San Francisco', match: 83 },
      { company: 'Spotify', role: 'Backend Developer', location: 'Stockholm', match: 79 },
      { company: 'Airbnb', role: 'Frontend Developer', location: 'San Francisco', match: 86 },
      { company: 'LinkedIn', role: 'Data Engineer', location: 'Mountain View', match: 81 }
    ];

    return jobData
      .map(job => ({
        ...job,
        match: Math.max(60, job.match + Math.floor(Math.random() * 20) - 10),
        skills: skills.slice(0, 3)
      }))
      .sort((a, b) => b.match - a.match)
      .slice(0, 5);
  };

  const generateLearningPath = (skillAnalysis, targetRole) => {
    const gaps = skillAnalysis
      .filter(skill => skill.gap > 10)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 5);

    return gaps.map(skill => ({
      skill: skill.name,
      currentLevel: skill.proficiency,
      targetLevel: skill.marketDemand,
      priority: skill.gap > 20 ? 'high' : skill.gap > 10 ? 'medium' : 'low',
      estimatedTime: `${Math.ceil(skill.gap / 10)} weeks`,
      resources: getLearningResources(skill.name)
    }));
  };

  const getLearningResources = (skill) => {
    const resources = {
      'Python': ['Coursera: Python for Everybody', 'Udemy: Complete Python Bootcamp'],
      'React': ['React Documentation', 'Udemy: Modern React with Redux'],
      'Machine Learning': ['Coursera: ML by Andrew Ng', 'Fast.ai: Practical Deep Learning'],
      'AWS': ['AWS Training Center', 'Udemy: AWS Solutions Architect'],
      'Docker': ['Docker Documentation', 'Udemy: Docker Mastery']
    };
    return resources[skill] || ['Online Documentation', 'YouTube Tutorials', 'Practice Projects'];
  };

  const generateMarketInsights = (targetRole, skills) => {
    return {
      demand: Math.floor(Math.random() * 30) + 70,
      averageSalary: `$${Math.floor(Math.random() * 100) + 80}k`,
      growthRate: `${Math.floor(Math.random() * 15) + 10}%`,
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'],
      trendingSkills: skills.slice(0, 3),
      marketTrend: Math.random() > 0.3 ? 'growing' : 'stable'
    };
  };

  const calculateProfileCompletion = (userData) => {
    const fields = ['fullName', 'email', 'skills', 'targetJobRole', 'experienceLevel'];
    const completed = fields.filter(field => userData[field]).length;
    return Math.floor((completed / fields.length) * 100);
  };

  const generateWeeklyProgress = (skillAnalysis) => {
    return skillAnalysis.map(skill => ({
      skill: skill.name,
      progress: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 60)
    }));
  };

  const generateAchievements = (skillAnalysis, experienceLevel) => {
    const achievements = [];
    
    if (skillAnalysis.some(s => s.proficiency >= 80)) {
      achievements.push({ name: 'Skill Master', icon: Award, color: 'gold' });
    }
    
    if (skillAnalysis.length >= 5) {
      achievements.push({ name: 'Polyglot', icon: Brain, color: 'purple' });
    }
    
    if (experienceLevel === 'senior' || experienceLevel === 'lead') {
      achievements.push({ name: 'Veteran', icon: Shield, color: 'blue' });
    }
    
    return achievements;
  };

  const refreshAnalytics = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (user) {
        generateDynamicAnalytics(user);
      }
      setRefreshing(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your career analytics...</p>
        </div>
      </div>
    );
  }

  if (!user || !analytics) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                >
                  Welcome back, {user?.full_name || 'User'}! 🚀
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600 dark:text-gray-400"
                >
                  Your AI-powered career development overview for {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </motion.p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshAnalytics}
                disabled={refreshing}
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                <div className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`}>
                  {refreshing ? '🔄' : '🔄'}
                </div>
              </motion.button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: 'Career Readiness',
                value: `${Math.round(analytics.careerReadiness)}%`,
                icon: Target,
                color: 'blue',
                trend: 'up',
                change: '+5%'
              },
              {
                title: 'Skill Score',
                value: Math.round(analytics.skillAnalysis.reduce((sum, s) => sum + s.proficiency, 0) / analytics.skillAnalysis.length),
                icon: Brain,
                color: 'purple',
                trend: 'up',
                change: '+8%'
              },
              {
                title: 'Job Matches',
                value: analytics.jobMatches.length,
                icon: Briefcase,
                color: 'green',
                trend: 'up',
                change: '+12'
              },
              {
                title: 'Profile Complete',
                value: `${analytics.profileCompletion}%`,
                icon: Award,
                color: 'orange',
                trend: 'stable',
                change: '100%'
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${metric.color}-100 dark:bg-${metric.color}-900 rounded-xl flex items-center justify-center`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                  </div>
                  <div className={`flex items-center text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.trend === 'up' ? <ChevronUp className="w-4 h-4" /> : 
                     metric.trend === 'down' ? <ChevronDown className="w-4 h-4" /> : null}
                    {metric.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Skills Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-3 text-purple-600" />
              Skills Analysis
            </h2>
            
            <div className="space-y-4">
              {analytics.skillAnalysis.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">You: {skill.proficiency}%</span>
                      <span className="text-blue-600 dark:text-blue-400">Market: {skill.marketDemand}%</span>
                      <span className={`${
                        skill.trend === 'up' ? 'text-green-600' : 
                        skill.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {skill.trend === 'up' ? '📈' : skill.trend === 'down' ? '📉' : '➡️'}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-50 transition-all duration-500"
                      style={{ width: `${skill.marketDemand}%` }}
                    />
                  </div>
                  {skill.gap > 10 && (
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      💡 Gap: {skill.gap}% - Focus on improving this skill
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Job Matches & Learning Path */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Job Matches */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-green-600" />
                Top Job Matches
              </h2>
              
              <div className="space-y-4">
                {analytics.jobMatches.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{job.role}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{job.match}%</div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/job-search')}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
              >
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </motion.button>
            </motion.div>

            {/* Learning Path */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-orange-600" />
                Learning Path
              </h2>
              
              <div className="space-y-4">
                {analytics.learningPath.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.skill}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.priority === 'high' ? 'bg-red-100 text-red-800' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.priority} priority
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Current: {item.currentLevel}%</span>
                        <span>Target: {item.targetLevel}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.currentLevel}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {item.estimatedTime}
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Resources:</p>
                      <div className="space-y-1">
                        {item.resources.slice(0, 2).map((resource, resourceIndex) => (
                          <p key={resourceIndex} className="text-xs text-blue-600 dark:text-blue-400">
                            📚 {resource}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/course-recommendations')}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-200"
              >
                View Courses
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </motion.button>
            </motion.div>
          </div>

          {/* Market Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
              Market Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{analytics.marketInsights.demand}%</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Market Demand</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{analytics.marketInsights.averageSalary}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Average Salary</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{analytics.marketInsights.growthRate}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Growth Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {analytics.marketInsights.marketTrend === 'growing' ? '📈' : '➡️'}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Market Trend</p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Top Companies</h3>
                <div className="space-y-2">
                  {analytics.marketInsights.topCompanies.map((company, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Trending Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {analytics.marketInsights.trendingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicDashboard;
