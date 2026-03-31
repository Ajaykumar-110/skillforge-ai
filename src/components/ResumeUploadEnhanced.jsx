import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, Brain, Briefcase, BookOpen, Github, TrendingUp, Video, MessageSquare, Eye, Trash2, Download, Target, Trophy, ChevronRight, AlertTriangle, Clock, Users, Star, DollarSign, ExternalLink
} from 'lucide-react';
import { skillsData, jobRolesData } from '../data/skillsAndRoles';

const ResumeUploadEnhanced = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeData, setResumeData] = useState(null);
  const [activeTab, setActiveTab] = useState('analyzer');
  const [showAllFeatures, setShowAllFeatures] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const generateResumeAnalysis = () => {
    const selectedSkills = skillsData.sort(() => 0.5 - Math.random()).slice(0, 8);
    const relatedJobs = jobRolesData.slice(0, 6);
    const experience = Math.floor(Math.random() * 8) + 2;
    
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: `Experienced developer with ${experience} years of expertise in modern web technologies.`,
      skills: selectedSkills.map(s => s.name),
      experience: experience,
      education: 'Bachelor of Computer Science',
      jobLevel: experience <= 3 ? 'Mid' : experience <= 6 ? 'Senior' : 'Lead',
      score: Math.floor(Math.random() * 15) + 80,
      atsScore: Math.floor(Math.random() * 20) + 75,
      skillMatchPercentage: Math.floor(Math.random() * 25) + 70,
      marketDemand: 'High',
      salaryRange: `$${(experience * 25000).toLocaleString()} - $${(experience * 35000).toLocaleString()}`,
      growthPotential: 'High',
      jobMarketOutlook: 'Very Positive',
      industries: ['Technology', 'Software Development', 'Web Development'],
      careerPath: ['Senior Developer', 'Tech Lead', 'Engineering Manager'],
      recommendedRoles: relatedJobs.map(j => j.title),
      skillGaps: ['Kubernetes', 'AWS', 'Machine Learning', 'GraphQL'],
      coursesToTake: [
        { title: 'Advanced React Development', provider: 'Udemy', duration: '8 weeks', matchScore: 85 },
        { title: 'AWS Cloud Architecture', provider: 'Coursera', duration: '6 weeks', matchScore: 78 },
        { title: 'System Design Interview', provider: 'Educative', duration: '4 weeks', matchScore: 92 }
      ],
      projectsToBuild: [
        { title: 'E-commerce Platform', tech: ['React', 'Node.js', 'MongoDB'], difficulty: 'Intermediate' },
        { title: 'AI Chat Application', tech: ['Python', 'TensorFlow', 'React'], difficulty: 'Advanced' },
        { title: 'Cloud Infrastructure Automation', tech: ['AWS', 'Terraform', 'Python'], difficulty: 'Advanced' }
      ]
    };
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setUploading(true);
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setUploading(false);
            setTimeout(() => {
              setAnalyzing(true);
              setTimeout(() => {
                setResumeData(generateResumeAnalysis());
                setAnalyzing(false);
                setShowAllFeatures(true);
              }, 2000);
            }, 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload({ target: { files: [file] } });
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setResumeData(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Enhanced Resume Upload & Analysis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your resume for comprehensive analysis with all career features
          </p>
        </div>

        {!resumeData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Upload Your Resume
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop your resume file here, or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="btn btn-primary cursor-pointer">
                Choose File
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                Supported formats: PDF, DOC, DOCX (Max size: 5MB)
              </p>
            </div>

            {uploading && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Uploading...
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {analyzing && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Analyzing your resume...
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  This may take a few moments
                </p>
              </div>
            )}

            {resumeFile && !uploading && !analyzing && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        {resumeFile.name}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button onClick={removeResume} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {resumeData && showAllFeatures && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Career Development Hub
                </h2>
                <button
                  onClick={() => setShowAllFeatures(false)}
                  className="btn btn-secondary flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Compact View
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    activeTab === 'courses' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Course Recommendations
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {resumeData.coursesToTake.length} courses
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    activeTab === 'jobs' 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                  }`}
                >
                  <Briefcase className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Job Recommendations
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {resumeData.recommendedRoles.length} jobs
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    activeTab === 'projects' 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <Github className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Project Suggestions
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {resumeData.projectsToBuild.length} projects
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('market')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    activeTab === 'market' 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                  }`}
                >
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Job Market Insights
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Market analysis
                  </p>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recommended Courses
                    </h3>
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {resumeData.coursesToTake.map((course, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {course.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {course.provider} • {course.duration} • {course.matchScore}% match
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Top Job Matches
                    </h3>
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {resumeData.recommendedRoles.slice(0, 3).map((job, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {job}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {resumeData.salaryRange} • High match
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Project Ideas
                    </h3>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {resumeData.projectsToBuild.map((project, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <Github className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {project.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {project.tech.join(', ')} • {project.difficulty}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Market Insights
                    </h3>
                    <button
                      onClick={() => setActiveTab('market')}
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Market Demand
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Based on your skills
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                        {resumeData.marketDemand}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Salary Range
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Expected earnings
                        </p>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {resumeData.salaryRange}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Growth Potential
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Career prospects
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                        {resumeData.growthPotential}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8">
                  {['analyzer', 'courses', 'jobs', 'projects', 'interview', 'chatbot', 'market'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab === 'market' ? 'Market Insights' : tab}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {resumeData && !showAllFeatures && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Resume Analysis Results
              </h2>
              <button
                onClick={() => setShowAllFeatures(true)}
                className="btn btn-secondary flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Show All Features
              </button>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                {['analyzer', 'courses', 'jobs', 'projects', 'interview', 'chatbot', 'market'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab === 'market' ? 'Market Insights' : tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Tab Content - All tabs should work */}
        {resumeData && (
          <>
            {activeTab === 'analyzer' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Skills Analysis
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Experience: {resumeData.experience} years</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Level: {resumeData.jobLevel}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Score: {resumeData.score}/100</span>
                    </div>
                    <div className="flex items-center">
                      <Brain className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">ATS Score: {resumeData.atsScore}/100</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Skill Match: {resumeData.skillMatchPercentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Career Insights
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                      Recommended Roles
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.recommendedRoles.slice(0, 4).map((role, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <ChevronRight className="w-4 h-4 text-green-500 mr-2" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">
                      Missing Skills
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.skillGaps.map((gap, index) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">
                      Skill Gaps
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.skillGaps.map((gap, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumeData.coursesToTake.map((course, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                        <div>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {course.provider}
                          </span>
                          <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                            {course.matchScore}% Match
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {(Math.floor(Math.random() * 50000) + 5000).toLocaleString()} students
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {(Math.random() * 1.5 + 3.5).toFixed(1)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${Math.floor(Math.random() * 100) + 50}
                      </span>
                      <button className="btn btn-primary text-sm">
                        View Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumeData.recommendedRoles.map((job, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {job.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {Math.floor(Math.random() * 25) + 75}% Match
                          </span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {resumeData.jobLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {job}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Technology</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        ${resumeData.salaryRange.split(' - ')[0]}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        High Growth
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resumeData.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {resumeData.marketDemand} demand
                      </span>
                      <button className="btn btn-primary text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumeData.projectsToBuild.map((project, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Github className="w-8 h-8 text-gray-800 dark:text-white mr-3" />
                        <div>
                          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            {project.difficulty}
                          </span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {Math.floor(Math.random() * 4) + 2} weeks
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Build a comprehensive {project.title.toLowerCase()} using modern technologies and best practices.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {Math.floor(Math.random() * 500) + 50}
                        </div>
                        <div className="flex items-center">
                          <Github className="w-4 h-4 mr-1" />
                          {Math.floor(Math.random() * 100) + 10}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 btn btn-primary text-sm flex items-center justify-center">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </button>
                      <button className="flex-1 btn btn-secondary text-sm flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'interview' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Technical Questions
                  </h3>
                  <div className="space-y-3">
                    {[
                      `Explain your experience with ${resumeData.skills[0] || 'JavaScript'}.`,
                      `How would you optimize a ${resumeData.skills[1] || 'React'} application?`,
                      `Describe a challenging project you worked with ${resumeData.skills[2] || 'Node.js'}.`,
                      `What are best practices for ${resumeData.skills[3] || 'Python'} development?`,
                      `How do you handle testing in ${resumeData.skills[0] || 'JavaScript'} projects?`
                    ].map((question, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Behavioral Questions
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Tell me about a challenging project you worked on.',
                      'How do you handle conflicts in a team?',
                      'Describe a time you had to learn a new technology quickly.',
                      'What motivates you in your work?',
                      'How do you prioritize tasks when deadlines are tight?'
                    ].map((question, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    System Design Questions
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Design a URL shortening service.',
                      'How would you design a social media feed?',
                      'Explain how you would scale a web application.',
                      'Design a real-time chat application.',
                      'How would you design a video streaming platform?'
                    ].map((question, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chatbot' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  AI Career Assistant
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">
                      What are my career prospects?
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Based on your {resumeData.experience} years of experience and skills in {resumeData.skills.slice(0, 3).join(', ')}, you have strong career prospects in software development. The market demand is {resumeData.marketDemand} and you can expect a salary range of {resumeData.salaryRange}. Consider focusing on {resumeData.recommendedRoles[0] || 'Full Stack Development'} roles.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">
                      Which skills should I improve?
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Your resume suggests focusing on {resumeData.skillGaps.slice(0, 3).join(', ')}. These skills will significantly enhance your marketability and open up senior-level opportunities with 20-30% salary increases.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">
                      What career path should I follow?
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Based on your profile, I recommend this career path: {resumeData.careerPath.join(' → ')}. Focus on building expertise in {resumeData.skills[0]} and {resumeData.skills[1]} to accelerate your growth.
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Ask about your career..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button className="btn btn-primary">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Market Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Market Demand</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Current market status</p>
                      </div>
                      <span className="px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                        {resumeData.marketDemand}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Expected Salary</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Based on experience and skills</p>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {resumeData.salaryRange}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Growth Potential</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Career advancement opportunities</p>
                      </div>
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                        {resumeData.growthPotential}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Job Market Outlook</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Future job prospects</p>
                      </div>
                      <span className="px-4 py-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded-full text-sm font-medium">
                        {resumeData.jobMarketOutlook}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Industry Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Top Industries for Your Skills
                      </h4>
                      <div className="space-y-2">
                        {resumeData.industries.map((industry, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{industry}</span>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${85 - index * 10}%` }} />
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{85 - index * 10}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Career Growth Opportunities
                      </h4>
                      <div className="space-y-2">
                        {resumeData.careerPath.map((path, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                              index === 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              index === 1 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            }`}>
                              {index + 1}
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{path}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeUploadEnhanced;
