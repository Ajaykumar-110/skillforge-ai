import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Plus, 
  X, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Target,
  BookOpen,
  Code,
  Database,
  Cloud,
  Shield,
  BarChart3,
  PieChart,
  Lightbulb,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Star,
  Clock,
  Award,
  Zap,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { Radar, Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const SkillAnalyzerUpgraded = () => {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userSkills, setUserSkills] = useState([]);
  const [skillGap, setSkillGap] = useState([]);
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [skillAnalysis, setSkillAnalysis] = useState({});
  const [jobTarget, setJobTarget] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 3, category: 'technical' });

  // Predefined skills database
  const skillsDatabase = [
    { name: 'Python', category: 'programming', demand: 95, growth: 12.3, avgSalary: 125000 },
    { name: 'JavaScript', category: 'programming', demand: 92, growth: 8.7, avgSalary: 115000 },
    { name: 'Java', category: 'programming', demand: 85, growth: 5.2, avgSalary: 110000 },
    { name: 'React', category: 'web', demand: 88, growth: 15.2, avgSalary: 120000 },
    { name: 'Node.js', category: 'web', demand: 82, growth: 11.8, avgSalary: 118000 },
    { name: 'TensorFlow', category: 'ai', demand: 78, growth: 25.4, avgSalary: 135000 },
    { name: 'PyTorch', category: 'ai', demand: 72, growth: 28.1, avgSalary: 140000 },
    { name: 'AWS', category: 'cloud', demand: 92, growth: 18.7, avgSalary: 130000 },
    { name: 'Azure', category: 'cloud', demand: 85, growth: 22.3, avgSalary: 125000 },
    { name: 'Docker', category: 'devops', demand: 82, growth: 22.1, avgSalary: 120000 },
    { name: 'Kubernetes', category: 'devops', demand: 78, growth: 28.9, avgSalary: 135000 },
    { name: 'SQL', category: 'database', demand: 90, growth: 6.5, avgSalary: 105000 },
    { name: 'MongoDB', category: 'database', demand: 75, growth: 14.2, avgSalary: 115000 },
    { name: 'PostgreSQL', category: 'database', demand: 80, growth: 9.8, avgSalary: 110000 },
    { name: 'Machine Learning', category: 'ai', demand: 88, growth: 25.4, avgSalary: 145000 },
    { name: 'Deep Learning', category: 'ai', demand: 75, growth: 32.1, avgSalary: 150000 },
    { name: 'Data Analysis', category: 'data', demand: 85, growth: 12.7, avgSalary: 95000 },
    { name: 'Data Visualization', category: 'data', demand: 78, growth: 15.3, avgSalary: 90000 },
    { name: 'Communication', category: 'soft', demand: 95, growth: 3.2, avgSalary: 85000 },
    { name: 'Leadership', category: 'soft', demand: 88, growth: 5.8, avgSalary: 110000 },
    { name: 'Problem Solving', category: 'soft', demand: 92, growth: 4.1, avgSalary: 95000 },
    { name: 'Teamwork', category: 'soft', demand: 90, growth: 2.8, avgSalary: 80000 },
    { name: 'Time Management', category: 'soft', demand: 85, growth: 3.5, avgSalary: 82000 },
    { name: 'Agile', category: 'methodology', demand: 88, growth: 8.9, avgSalary: 105000 },
    { name: 'Scrum', category: 'methodology', demand: 85, growth: 9.2, avgSalary: 108000 },
    { name: 'Git', category: 'tools', demand: 92, growth: 6.7, avgSalary: 100000 },
    { name: 'CI/CD', category: 'devops', demand: 78, growth: 18.5, avgSalary: 125000 },
    { name: 'Testing', category: 'quality', demand: 80, growth: 7.3, avgSalary: 105000 },
    { name: 'Security', category: 'security', demand: 88, growth: 15.8, avgSalary: 135000 },
    { name: 'Blockchain', category: 'emerging', demand: 65, growth: 45.2, avgSalary: 140000 },
    { name: 'IoT', category: 'emerging', demand: 70, growth: 28.7, avgSalary: 120000 },
    { name: 'Quantum Computing', category: 'emerging', demand: 45, growth: 67.3, avgSalary: 160000 }
  ];

  const categories = [
    { id: 'all', name: 'All Skills', icon: Brain },
    { id: 'programming', name: 'Programming', icon: Code },
    { id: 'web', name: 'Web Development', icon: Code },
    { id: 'ai', name: 'AI/ML', icon: Brain },
    { id: 'data', name: 'Data Science', icon: BarChart3 },
    { id: 'cloud', name: 'Cloud Computing', icon: Cloud },
    { id: 'devops', name: 'DevOps', icon: Zap },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'soft', name: 'Soft Skills', icon: Users },
    { id: 'methodology', name: 'Methodology', icon: Target },
    { id: 'tools', name: 'Tools', icon: Code },
    { id: 'quality', name: 'Quality', icon: CheckCircle },
    { id: 'emerging', name: 'Emerging Tech', icon: Lightbulb }
  ];

  useEffect(() => {
    // Load user skills from API or localStorage
    const savedSkills = localStorage.getItem('userSkills');
    if (savedSkills) {
      setUserSkills(JSON.parse(savedSkills));
    } else {
      // Initialize with some default skills
      setUserSkills([
        { name: 'Python', level: 4, category: 'programming', experience: '2 years' },
        { name: 'JavaScript', level: 3, category: 'programming', experience: '1 year' },
        { name: 'React', level: 3, category: 'web', experience: '1 year' },
        { name: 'SQL', level: 4, category: 'database', experience: '2 years' },
        { name: 'Communication', level: 4, category: 'soft', experience: '3 years' }
      ]);
    }
  }, []);

  useEffect(() => {
    // Save user skills to localStorage
    if (userSkills.length > 0) {
      localStorage.setItem('userSkills', JSON.stringify(userSkills));
    }
  }, [userSkills]);

  useEffect(() => {
    analyzeSkillGap();
  }, [userSkills, jobTarget, experienceLevel]);

  const analyzeSkillGap = () => {
    if (!jobTarget) return;

    setLoading(true);
    
    // Simulate API call for skill gap analysis
    setTimeout(() => {
      const targetSkills = getTargetSkills(jobTarget);
      const userSkillNames = userSkills.map(s => s.name.toLowerCase());
      
      // Find missing skills
      const missing = targetSkills.filter(skill => 
        !userSkillNames.includes(skill.name.toLowerCase())
      );
      
      // Calculate skill gap
      const gapAnalysis = missing.map(skill => ({
        ...skill,
        priority: skill.demand > 85 ? 'high' : skill.demand > 70 ? 'medium' : 'low',
        estimatedTime: getEstimatedTime(skill, experienceLevel),
        resources: getResources(skill.name)
      }));
      
      setSkillGap(gapAnalysis);
      
      // Generate recommendations
      const recommendations = generateRecommendations(gapAnalysis);
      setRecommendedSkills(recommendations);
      
      // Calculate overall analysis
      const analysis = calculateSkillAnalysis(userSkills, targetSkills);
      setSkillAnalysis(analysis);
      
      setLoading(false);
    }, 1500);
  };

  const getTargetSkills = (jobRole) => {
    const jobSkillMap = {
      'Data Scientist': [
        { name: 'Python', demand: 95, category: 'programming' },
        { name: 'Machine Learning', demand: 92, category: 'ai' },
        { name: 'TensorFlow', demand: 85, category: 'ai' },
        { name: 'SQL', demand: 90, category: 'database' },
        { name: 'Data Analysis', demand: 88, category: 'data' },
        { name: 'Statistics', demand: 85, category: 'data' },
        { name: 'Communication', demand: 85, category: 'soft' },
        { name: 'Problem Solving', demand: 90, category: 'soft' }
      ],
      'Full Stack Developer': [
        { name: 'JavaScript', demand: 95, category: 'programming' },
        { name: 'React', demand: 90, category: 'web' },
        { name: 'Node.js', demand: 85, category: 'web' },
        { name: 'Python', demand: 75, category: 'programming' },
        { name: 'SQL', demand: 85, category: 'database' },
        { name: 'Git', demand: 92, category: 'tools' },
        { name: 'Agile', demand: 85, category: 'methodology' },
        { name: 'Communication', demand: 85, category: 'soft' }
      ],
      'DevOps Engineer': [
        { name: 'Docker', demand: 92, category: 'devops' },
        { name: 'Kubernetes', demand: 88, category: 'devops' },
        { name: 'AWS', demand: 90, category: 'cloud' },
        { name: 'CI/CD', demand: 85, category: 'devops' },
        { name: 'Linux', demand: 85, category: 'tools' },
        { name: 'Python', demand: 75, category: 'programming' },
        { name: 'Security', demand: 85, category: 'security' },
        { name: 'Problem Solving', demand: 88, category: 'soft' }
      ],
      'ML Engineer': [
        { name: 'Python', demand: 95, category: 'programming' },
        { name: 'Machine Learning', demand: 95, category: 'ai' },
        { name: 'Deep Learning', demand: 85, category: 'ai' },
        { name: 'TensorFlow', demand: 88, category: 'ai' },
        { name: 'PyTorch', demand: 82, category: 'ai' },
        { name: 'AWS', demand: 80, category: 'cloud' },
        { name: 'Docker', demand: 75, category: 'devops' },
        { name: 'Communication', demand: 80, category: 'soft' }
      ]
    };
    
    return jobSkillMap[jobRole] || jobSkillMap['Data Scientist'];
  };

  const getEstimatedTime = (skill, experience) => {
    const baseTime = {
      'beginner': { 'high': 6, 'medium': 4, 'low': 2 },
      'intermediate': { 'high': 4, 'medium': 3, 'low': 1 },
      'advanced': { 'high': 3, 'medium': 2, 'low': 1 }
    };
    
    return baseTime[experience][skill.priority] || 3;
  };

  const getResources = (skillName) => {
    const resources = {
      'Python': [
        { type: 'course', title: 'Python for Data Science', provider: 'Coursera', duration: '3 months' },
        { type: 'project', title: 'Data Analysis Project', difficulty: 'Beginner' },
        { type: 'certification', title: 'Python Certification', provider: 'Python Institute' }
      ],
      'Machine Learning': [
        { type: 'course', title: 'Machine Learning A-Z', provider: 'Udemy', duration: '4 months' },
        { type: 'project', title: 'Predictive Modeling', difficulty: 'Intermediate' },
        { type: 'certification', title: 'ML Engineer Certification', provider: 'AWS' }
      ],
      'React': [
        { type: 'course', title: 'React - The Complete Guide', provider: 'Udemy', duration: '2 months' },
        { type: 'project', title: 'E-commerce Website', difficulty: 'Intermediate' },
        { type: 'certification', title: 'React Developer Certificate', provider: 'Meta' }
      ]
    };
    
    return resources[skillName] || [
      { type: 'course', title: `${skillName} Fundamentals`, provider: 'Coursera', duration: '2 months' },
      { type: 'project', title: `${skillName} Practice Project`, difficulty: 'Beginner' }
    ];
  };

  const generateRecommendations = (gap) => {
    return gap
      .filter(skill => skill.priority === 'high')
      .slice(0, 5)
      .map(skill => ({
        ...skill,
        reason: `High demand skill with ${skill.demand}% market demand and ${skill.growth}% growth rate`,
        urgency: skill.priority === 'high' ? 'Immediate' : 'Within 3 months'
      }));
  };

  const calculateSkillAnalysis = (userSkills, targetSkills) => {
    const userSkillNames = userSkills.map(s => s.name.toLowerCase());
    const matchedSkills = targetSkills.filter(skill => 
      userSkillNames.includes(skill.name.toLowerCase())
    );
    
    const matchPercentage = Math.round((matchedSkills.length / targetSkills.length) * 100);
    const avgSkillLevel = userSkills.reduce((acc, skill) => acc + skill.level, 0) / userSkills.length;
    
    return {
      matchPercentage,
      totalSkills: userSkills.length,
      matchedSkills: matchedSkills.length,
      missingSkills: targetSkills.length - matchedSkills.length,
      avgSkillLevel: avgSkillLevel.toFixed(1),
      readiness: matchPercentage > 80 ? 'Ready' : matchPercentage > 60 ? 'Almost Ready' : 'Needs Improvement'
    };
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skillData = skillsDatabase.find(s => 
        s.name.toLowerCase() === newSkill.name.toLowerCase()
      );
      
      setUserSkills([...userSkills, {
        name: newSkill.name,
        level: newSkill.level,
        category: skillData?.category || newSkill.category,
        experience: 'Just added'
      }]);
      
      setNewSkill({ name: '', level: 3, category: 'technical' });
      setShowAddSkill(false);
    }
  };

  const removeSkill = (skillName) => {
    setUserSkills(userSkills.filter(skill => skill.name !== skillName));
  };

  const updateSkillLevel = (skillName, newLevel) => {
    setUserSkills(userSkills.map(skill => 
      skill.name === skillName ? { ...skill, level: newLevel } : skill
    ));
  };

  const filteredSkills = skillsDatabase.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const notInUserSkills = !userSkills.some(userSkill => 
      userSkill.name.toLowerCase() === skill.name.toLowerCase()
    );
    return matchesSearch && matchesCategory && notInUserSkills;
  });

  const radarData = {
    labels: ['Technical Skills', 'Soft Skills', 'Experience', 'Industry Knowledge', 'Tools', 'Methodology'],
    datasets: [{
      label: 'Current Skills',
      data: [
        userSkills.filter(s => ['programming', 'web', 'ai', 'data', 'cloud', 'devops', 'database'].includes(s.category)).length * 20,
        userSkills.filter(s => s.category === 'soft').length * 25,
        parseInt(experienceLevel) * 20,
        60,
        userSkills.filter(s => s.category === 'tools').length * 30,
        userSkills.filter(s => s.category === 'methodology').length * 35
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgb(59, 130, 246)',
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(59, 130, 246)'
    }, {
      label: 'Target Skills',
      data: [80, 85, 90, 75, 80, 85],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: 'rgb(16, 185, 129)',
      pointBackgroundColor: 'rgb(16, 185, 129)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(16, 185, 129)'
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Skill Analyzer Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button className="btn btn-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Target Job Selection */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Target Role Analysis
            </h2>
            <Target className="w-6 h-6 text-blue-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Job Role
              </label>
              <select
                value={jobTarget}
                onChange={(e) => setJobTarget(e.target.value)}
                className="input w-full"
              >
                <option value="">Select a job role...</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="ML Engineer">ML Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Cloud Engineer">Cloud Engineer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="input w-full"
              >
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="advanced">Advanced (5+ years)</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={analyzeSkillGap}
                disabled={!jobTarget || loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Analyze Skill Gap
              </button>
            </div>
          </div>
        </div>

        {/* Skill Analysis Results */}
        {skillAnalysis.matchPercentage && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Match Score */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Skill Match Score
                </h3>
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {skillAnalysis.matchPercentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {skillAnalysis.readiness}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Matched Skills</span>
                    <span className="font-medium">{skillAnalysis.matchedSkills}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Missing Skills</span>
                    <span className="font-medium text-orange-600">{skillAnalysis.missingSkills}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Skill Level</span>
                    <span className="font-medium">{skillAnalysis.avgSkillLevel}/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Skills Comparison
                </h3>
                <PieChart className="w-5 h-5 text-purple-500" />
              </div>
              <div className="h-64">
                <Radar data={radarData} options={chartOptions} />
              </div>
            </div>
          </div>
        )}

        {/* Current Skills */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Current Skills
            </h2>
            <button
              onClick={() => setShowAddSkill(!showAddSkill)}
              className="btn btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </button>
          </div>

          {/* Add Skill Form */}
          {showAddSkill && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Skill name..."
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="input"
                />
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="input"
                >
                  <option value={1}>Beginner</option>
                  <option value={2}>Novice</option>
                  <option value={3}>Intermediate</option>
                  <option value={4}>Advanced</option>
                  <option value={5}>Expert</option>
                </select>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="input"
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="tools">Tools</option>
                  <option value="methodology">Methodology</option>
                </select>
                <div className="flex space-x-2">
                  <button onClick={addSkill} className="btn btn-primary flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Add
                  </button>
                  <button onClick={() => setShowAddSkill(false)} className="btn btn-secondary">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userSkills.map((skill, idx) => (
              <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                  <button
                    onClick={() => removeSkill(skill.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{skill.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gap Analysis */}
        {skillGap.length > 0 && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Skill Gap Analysis
              </h2>
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>

            <div className="space-y-4">
              {skillGap.map((skill, idx) => (
                <div key={idx} className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900 dark:text-white mr-3">{skill.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded ${
                        skill.priority === 'high' ? 'bg-red-100 text-red-800' :
                        skill.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {skill.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {skill.estimatedTime} months
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        {skill.demand}% demand
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {skill.resources.map((resource, ridx) => (
                      <div key={ridx} className="flex items-center space-x-2">
                        {resource.type === 'course' && <BookOpen className="w-4 h-4 text-blue-500" />}
                        {resource.type === 'project' && <Code className="w-4 h-4 text-purple-500" />}
                        {resource.type === 'certification' && <Award className="w-4 h-4 text-green-500" />}
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">{resource.title}</div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {resource.provider && `${resource.provider} • `}
                            {resource.duration || resource.difficulty}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Skills */}
        {recommendedSkills.length > 0 && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Priority Recommendations
              </h2>
              <Lightbulb className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedSkills.map((skill, idx) => (
                <div key={idx} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                    <span className="text-sm text-yellow-600 font-medium">{skill.urgency}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{skill.reason}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {skill.estimatedTime} months
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        {skill.demand}% demand
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Start Learning →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Discovery */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Discover Skills
            </h2>
            <Search className="w-6 h-6 text-green-500" />
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.slice(0, 12).map((skill, idx) => (
              <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Market Demand</span>
                    <span className="font-medium">{skill.demand}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Growth Rate</span>
                    <span className="font-medium text-green-600">+{skill.growth}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Avg Salary</span>
                    <span className="font-medium">${(skill.avgSalary / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setNewSkill({ ...newSkill, name: skill.name, category: skill.category });
                    setShowAddSkill(true);
                  }}
                  className="mt-3 w-full btn btn-secondary text-sm"
                >
                  Add to Skills
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalyzerUpgraded;
