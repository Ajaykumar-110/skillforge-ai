import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Code, 
  Award, 
  Target,
  Activity,
  Briefcase,
  Brain,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  Star,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const AICareerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    overview: {},
    skillGrowth: {},
    skillDistribution: {},
    jobMatchChart: {},
    recommendations: [],
    recentActivity: [],
    marketInsights: {}
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate API call with real dynamic data
        const response = await fetch('/api/dashboard/overview');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          // Fallback to mock data if API fails
          setDashboardData(generateMockData());
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData(generateMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const generateMockData = () => ({
    overview: {
      skillMatchScore: 78,
      resumeScore: 85,
      recommendedJobRoles: 12,
      coursesCompleted: 8,
      githubProjectsAnalyzed: 15,
      interviewReadiness: 72,
      profileCompletion: 85,
      skillGrowthRate: 15.3
    },
    skillGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Technical Skills',
          data: [65, 68, 72, 75, 78, 82],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        },
        {
          label: 'Soft Skills',
          data: [70, 72, 74, 76, 78, 80],
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4
        }
      ]
    },
    skillDistribution: {
      labels: ['Programming', 'Data Science', 'Cloud Computing', 'Web Development', 'DevOps', 'Soft Skills'],
      datasets: [{
        data: [30, 25, 20, 15, 5, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ]
      }]
    },
    jobMatchChart: {
      labels: ['Data Scientist', 'ML Engineer', 'Full Stack Developer', 'Data Analyst', 'DevOps Engineer'],
      datasets: [{
        label: 'Match Score',
        data: [85, 78, 72, 68, 65],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2
      }]
    },
    recommendations: [
      {
        type: 'job',
        title: 'Senior Data Scientist',
        company: 'Tech Corp',
        matchScore: 92,
        salary: '$120k - $160k',
        location: 'San Francisco, CA',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
        link: 'https://linkedin.com/jobs/view/12345'
      },
      {
        type: 'course',
        title: 'Advanced Machine Learning',
        platform: 'Coursera',
        instructor: 'Andrew Ng',
        rating: 4.9,
        duration: '3 months',
        skills: ['Deep Learning', 'Neural Networks', 'Python'],
        link: 'https://coursera.org/learn/advanced-ml'
      },
      {
        type: 'project',
        title: 'Real-time Fraud Detection',
        difficulty: 'Advanced',
        technologies: ['Python', 'TensorFlow', 'AWS', 'Docker'],
        stars: 2340,
        link: 'https://github.com/username/fraud-detection'
      }
    ],
    recentActivity: [
      {
        type: 'skill_added',
        title: 'Added TensorFlow to skills',
        time: '2 hours ago',
        icon: Brain,
        color: 'text-blue-500'
      },
      {
        type: 'course_completed',
        title: 'Completed Python for Data Science',
        time: '1 day ago',
        icon: BookOpen,
        color: 'text-green-500'
      },
      {
        type: 'project_analyzed',
        title: 'Analyzed House Price Prediction project',
        time: '3 days ago',
        icon: Code,
        color: 'text-purple-500'
      },
      {
        type: 'profile_updated',
        title: 'Updated work experience',
        time: '5 days ago',
        icon: Users,
        color: 'text-orange-500'
      }
    ],
    marketInsights: {
      trendingSkills: [
        { name: 'Python', demand: 95, growth: 12.3 },
        { name: 'AWS', demand: 92, growth: 18.7 },
        { name: 'Machine Learning', demand: 88, growth: 25.4 },
        { name: 'React', demand: 85, growth: 15.2 },
        { name: 'Docker', demand: 82, growth: 22.1 }
      ],
      salaryTrends: [
        { role: 'Data Scientist', avgSalary: 125000, growth: 8.5 },
        { role: 'ML Engineer', avgSalary: 145000, growth: 12.3 },
        { role: 'Full Stack Developer', avgSalary: 105000, growth: 6.7 },
        { role: 'DevOps Engineer', avgSalary: 120000, growth: 10.2 },
        { role: 'Data Analyst', avgSalary: 85000, growth: 5.8 }
      ]
    }
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false
      }
    }
  };

  const MetricCard = ({ title, value, icon: Icon, trend, color, subtitle }) => (
    <div className={`card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-2">
          {trend > 0 ? (
            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
          ) : trend < 0 ? (
            <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
          ) : (
            <Minus className="w-4 h-4 text-gray-500 mr-1" />
          )}
          <span className={`text-sm ${trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-gray-500'}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      )}
    </div>
  );

  const RecommendationCard = ({ item }) => (
    <div className="card hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {item.type === 'job' && <Briefcase className="w-4 h-4 text-blue-500 mr-2" />}
            {item.type === 'course' && <BookOpen className="w-4 h-4 text-green-500 mr-2" />}
            {item.type === 'project' && <Code className="w-4 h-4 text-purple-500 mr-2" />}
            <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
          </div>
          
          {item.type === 'job' && (
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.company}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.location}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.salary}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {item.type === 'course' && (
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.platform}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.instructor}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.duration}</p>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {item.type === 'project' && (
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.difficulty}</p>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{item.stars}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="ml-4">
          {item.matchScore && (
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{item.matchScore}%</div>
              <div className="text-xs text-gray-500">Match</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          {item.type === 'job' && 'Apply Now'}
          {item.type === 'course' && 'View Course'}
          {item.type === 'project' && 'Open Project'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const Icon = activity.icon;
    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
        <div className={`p-2 rounded-full ${activity.color} bg-opacity-10`}>
          <Icon className={`w-4 h-4 ${activity.color}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SkillForge AI Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Skill Match Score"
            value={`${dashboardData.overview.skillMatchScore}%`}
            icon={Target}
            trend={dashboardData.overview.skillGrowthRate}
            color="bg-blue-500"
            subtitle="vs last month"
          />
          <MetricCard
            title="Resume Score"
            value={`${dashboardData.overview.resumeScore}%`}
            icon={Award}
            trend={5.2}
            color="bg-green-500"
            subtitle="Improved"
          />
          <MetricCard
            title="Job Recommendations"
            value={dashboardData.overview.recommendedJobRoles}
            icon={Briefcase}
            trend={8.7}
            color="bg-purple-500"
            subtitle="New roles"
          />
          <MetricCard
            title="Interview Readiness"
            value={`${dashboardData.overview.interviewReadiness}%`}
            icon={Users}
            trend={-2.1}
            color="bg-orange-500"
            subtitle="Needs improvement"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Skill Growth Chart */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skill Growth</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="h-64">
              <Line data={dashboardData.skillGrowth} options={chartOptions} />
            </div>
          </div>

          {/* Skill Distribution */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skill Distribution</h3>
              <PieChart className="w-5 h-5 text-blue-500" />
            </div>
            <div className="h-64">
              <Doughnut data={dashboardData.skillDistribution} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Job Match Chart */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Job Role Match Scores</h3>
            <BarChart3 className="w-5 h-5 text-purple-500" />
          </div>
          <div className="h-64">
            <Bar data={dashboardData.jobMatchChart} options={chartOptions} />
          </div>
        </div>

        {/* Recommendations and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recommendations */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
                <Brain className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-4">
                {dashboardData.recommendations.map((item, idx) => (
                  <RecommendationCard key={idx} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-2">
              {dashboardData.recentActivity.map((activity, idx) => (
                <ActivityItem key={idx} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trending Skills */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trending Skills</h3>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div className="space-y-3">
              {dashboardData.marketInsights.trendingSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${skill.demand}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-green-600 font-medium">+{skill.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Trends */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Salary Trends</h3>
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-3">
              {dashboardData.marketInsights.salaryTrends.map((salary, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{salary.role}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ${(salary.avgSalary / 1000).toFixed(0)}k
                    </span>
                    <span className="text-sm text-green-600 font-medium">+{salary.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICareerDashboard;
