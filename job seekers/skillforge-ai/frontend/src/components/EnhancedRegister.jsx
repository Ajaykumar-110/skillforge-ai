import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Briefcase, 
  Award, 
  Upload, 
  X, 
  Plus, 
  ChevronDown,
  Search,
  Check,
  Sparkles,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnhancedRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: [],
    targetRole: '',
    experienceLevel: 'entry',
    resume: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [roleInput, setRoleInput] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);

  // 50+ Job Roles
  const jobRoles = [
    'Data Analyst', 'Data Scientist', 'Machine Learning Engineer', 'Business Analyst',
    'DevOps Engineer', 'BI Developer', 'Frontend Developer', 'Backend Developer',
    'Full Stack Developer', 'Software Engineer', 'Cloud Engineer', 'Cloud Architect',
    'Data Engineer', 'AI Engineer', 'NLP Engineer', 'Computer Vision Engineer',
    'Database Administrator', 'Cybersecurity Analyst', 'Security Engineer', 'QA Engineer',
    'Mobile App Developer', 'Game Developer', 'Embedded Systems Engineer', 'Blockchain Developer',
    'UI/UX Designer', 'Product Manager', 'Project Manager', 'Technical Program Manager',
    'Data Architect', 'Big Data Engineer', 'Data Visualization Specialist', 'MLOps Engineer',
    'Site Reliability Engineer', 'System Administrator', 'Network Engineer', 'IT Support Specialist',
    'Solutions Architect', 'AR/VR Developer', 'Robotics Engineer', 'IoT Engineer',
    'Automation Test Engineer', 'Penetration Tester', 'Digital Marketing Analyst', 'SEO Specialist',
    'Technical Writer', 'Software Tester', 'ERP Consultant', 'CRM Developer',
    'Salesforce Developer', 'SAP Consultant', 'AI Research Scientist', 'Data Product Manager',
    'Platform Engineer', 'Performance Engineer', 'Security Architect', 'Cloud Security Engineer',
    'AI Product Manager', 'ML Infrastructure Engineer', 'Data Governance Analyst', 'Analytics Engineer'
  ];

  // 100+ Tech Skills
  const techSkills = [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP',
    'React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI',
    'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter', 'Apache Spark', 'Hadoop', 'Kafka',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI', 'GitHub Actions',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'Neo4j', 'GraphQL', 'REST API',
    'HTML', 'CSS', 'Sass', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Figma', 'Adobe XD', 'Sketch', 'Photoshop',
    'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'MLOps', 'Data Science', 'AI Ethics',
    'Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence', 'Slack', 'Microsoft Teams', 'Trello', 'Asana', 'Monday.com',
    'Linux', 'Windows Server', 'Ubuntu', 'CentOS', 'Shell Scripting', 'PowerShell', 'Bash', 'Network Security', 'Firewall', 'VPN',
    'Blockchain', 'Ethereum', 'Smart Contracts', 'Web3.js', 'Solidity', 'Rust', 'Hyperledger', 'DeFi', 'NFT', 'DAO',
    'Mobile Development', 'React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android', 'Xamarin', 'Ionic', 'Cordova',
    'Testing', 'Jest', 'Mocha', 'Cypress', 'Selenium', 'JUnit', 'TestNG', 'Postman', 'Swagger', 'API Testing',
    'Data Visualization', 'Tableau', 'Power BI', 'D3.js', 'Chart.js', 'Plotly', 'Matplotlib', 'Seaborn', 'Grafana', 'Kibana'
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'junior', label: 'Junior (2-4 years)' },
    { value: 'mid', label: 'Mid-Level (4-7 years)' },
    { value: 'senior', label: 'Senior (7-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  useEffect(() => {
    // Filter suggestions based on input
    if (skillInput.length > 0) {
      setShowSkillSuggestions(true);
    } else {
      setShowSkillSuggestions(false);
    }

    if (roleInput.length > 0) {
      setShowRoleSuggestions(true);
    } else {
      setShowRoleSuggestions(false);
    }
  }, [skillInput, roleInput]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (formData.skills.length === 0) newErrors.skills = 'Please select at least one skill';
    if (!formData.targetRole.trim()) newErrors.targetRole = 'Target role is required';
    if (!formData.resume) newErrors.resume = 'Please upload your resume';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSkillAdd = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
      setShowSkillSuggestions(false);
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      targetRole: role
    }));
    setRoleInput('');
    setShowRoleSuggestions(false);
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      
      if (!file.type.includes('pdf') && !file.type.includes('word')) {
        setErrors(prev => ({ ...prev, resume: 'Please upload PDF or Word document' }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setErrors(prev => ({ ...prev, resume: '' }));
      
      // Trigger AI Resume Analysis
      analyzeResume(file);
    }
  };

  const analyzeResume = async (file) => {
    setIsAnalyzingResume(true);
    
    // Mock AI Analysis (replace with real API call)
    setTimeout(() => {
      const mockAnalysis = {
        extractedSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
        experienceLevel: 'mid',
        jobFitScore: 85,
        recommendations: [
          'Add more AI/ML project details',
          'Include quantifiable achievements',
          'Highlight leadership experience'
        ],
        missingSkills: ['Docker', 'Kubernetes', 'AWS'],
        suggestedRoles: ['Full Stack Developer', 'AI Engineer', 'Machine Learning Engineer']
      };
      
      setResumeAnalysis(mockAnalysis);
      setIsAnalyzingResume(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      submitData.append('skills', JSON.stringify(formData.skills));
      submitData.append('targetRole', formData.targetRole);
      submitData.append('experienceLevel', formData.experienceLevel);
      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }

      // Mock API call (replace with real backend)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage for demo
      const userData = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        skills: formData.skills,
        targetJobRole: formData.targetRole,
        experienceLevel: formData.experienceLevel,
        resumeAnalysis: resumeAnalysis
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: 'Registration failed. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSkills = techSkills.filter(skill => 
    skill.toLowerCase().includes(skillInput.toLowerCase()) && 
    !formData.skills.includes(skill)
  );

  const filteredRoles = jobRoles.filter(role => 
    role.toLowerCase().includes(roleInput.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-6"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Join SkillForge AI
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Start your AI-powered career journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Career Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-purple-600" />
                Career Information
              </h2>

              <div className="space-y-6">
                {/* Skills Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills (Select multiple or add custom)
                  </label>
                  <div className="relative">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-2 hover:text-red-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSkillAdd(skillInput);
                          }
                        }}
                        onFocus={() => setShowSkillSuggestions(true)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="Type to add skills..."
                      />
                      {skillInput && (
                        <button
                          type="button"
                          onClick={() => handleSkillAdd(skillInput)}
                          className="absolute right-3 top-3 text-purple-600 hover:text-purple-700"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* Skill Suggestions */}
                    {showSkillSuggestions && filteredSkills.length > 0 && (
                      <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                        {filteredSkills.slice(0, 10).map((skill, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSkillAdd(skill)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                          >
                            <span>{skill}</span>
                            <Plus className="w-4 h-4 text-purple-600" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                  )}
                </div>

                {/* Target Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Role
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={roleInput || formData.targetRole}
                      onChange={(e) => {
                        setRoleInput(e.target.value);
                        setFormData(prev => ({ ...prev, targetRole: e.target.value }));
                      }}
                      onFocus={() => setShowRoleSuggestions(true)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                      placeholder="Search or type your target role..."
                    />
                    <ChevronDown className="absolute right-3 top-3 text-gray-400" />
                  </div>

                  {/* Role Suggestions */}
                  {showRoleSuggestions && filteredRoles.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                      {filteredRoles.slice(0, 10).map((role, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleRoleSelect(role)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                        >
                          <Target className="w-4 h-4 mr-3 text-purple-600" />
                          <span>{role}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.targetRole && (
                    <p className="text-red-500 text-sm mt-1">{errors.targetRole}</p>
                  )}
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Resume Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-green-600" />
                Resume Upload & AI Analysis
              </h2>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                <label htmlFor="resume" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF or Word document (MAX. 5MB)
                  </p>
                </label>
                
                {formData.resume && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-green-600 dark:text-green-400 flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      {formData.resume.name}
                    </p>
                  </div>
                )}
                
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-2">{errors.resume}</p>
                )}
              </div>

              {/* Resume Analysis Results */}
              {isAnalyzingResume && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3" />
                    <span className="text-blue-600 dark:text-blue-400">Analyzing resume with AI...</span>
                  </div>
                </div>
              )}

              {resumeAnalysis && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    AI Resume Analysis Results
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Job Fit Score</p>
                      <p className="text-2xl font-bold text-green-600">{resumeAnalysis.jobFitScore}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Experience Level</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{resumeAnalysis.experienceLevel}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Extracted Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {resumeAnalysis.extractedSkills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-3" />
                    Create Account
                  </div>
                )}
              </motion.button>

              {errors.submit && (
                <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
              )}

              {success && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-green-600 dark:text-green-400 flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Account created successfully! Redirecting to dashboard...
                  </p>
                </div>
              )}
            </motion.div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedRegister;
