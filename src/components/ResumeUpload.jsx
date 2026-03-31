import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Trash2,
  Eye,
  Brain,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Target,
  TrendingUp,
  Star,
  Clock,
  Users,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  DollarSign,
  ChevronRight,
  Code,
  Database,
  Shield,
  Smartphone,
  Cloud,
  BarChart,
  Search,
  Filter
} from 'lucide-react';
import { skillsData, jobRolesData, skillCategories, jobCategories } from '../data/skillsAndRoles';

const ResumeUpload = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeData, setResumeData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all');
  const [selectedJobCategory, setSelectedJobCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);

  // Enhanced resume analysis with real data
  const generateResumeAnalysis = () => {
    // Randomly select skills from different categories
    const selectedSkills = [];
    const categoriesToUse = skillCategories.slice(0, 6); // Use first 6 categories
    
    categoriesToUse.forEach(category => {
      const categorySkills = skillsData.filter(skill => skill.category === category);
      const randomSkills = categorySkills.sort(() => 0.5 - Math.random()).slice(0, 2);
      selectedSkills.push(...randomSkills);
    });

    // Select related job roles
    const relatedJobs = jobRolesData
      .filter(job => job.category === 'Software Development' || job.category === 'Data & Analytics')
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    return {
      skills: selectedSkills.map(skill => skill.name),
      experience: Math.floor(Math.random() * 10) + 1,
      education: 'Bachelor of Computer Science',
      location: 'San Francisco, CA',
      jobLevel: 'Mid-level',
      industries: ['Technology', 'Software Development', 'Web Development'],
      strengths: ['Problem Solving', 'Team Leadership', 'Project Management', 'Communication'],
      improvements: ['Cloud Architecture', 'Machine Learning', 'DevOps Practices'],
      score: Math.floor(Math.random() * 20) + 75, // 75-95 score
      recommendedRoles: relatedJobs.map(job => job.title),
      skillGaps: ['Kubernetes', 'AWS', 'Machine Learning', 'System Design'],
      careerPath: ['Junior Developer', 'Mid-level Developer', 'Senior Developer', 'Tech Lead']
    };
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setUploading(false);
            // Simulate resume analysis
            setTimeout(() => {
              setResumeData(generateResumeAnalysis());
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

  // Generate related courses based on resume skills
  const getRelatedCourses = () => {
    if (!resumeData) return [];
    
    const courseTemplates = [
      {
        title: 'Advanced React Development',
        provider: 'Udemy',
        duration: '8 weeks',
        level: 'Advanced',
        rating: 4.8,
        students: 15420,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300',
        skills: ['React', 'JavaScript', 'Redux', 'Hooks']
      },
      {
        title: 'AWS Cloud Architecture',
        provider: 'Coursera',
        duration: '6 weeks',
        level: 'Intermediate',
        rating: 4.7,
        students: 8930,
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300',
        skills: ['AWS', 'Cloud Computing', 'Architecture', 'DevOps']
      },
      {
        title: 'Python for Data Science',
        provider: 'edX',
        duration: '10 weeks',
        level: 'Intermediate',
        rating: 4.6,
        students: 12150,
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
        skills: ['Python', 'Data Science', 'Machine Learning', 'Analytics']
      },
      {
        title: 'Machine Learning A-Z',
        provider: 'Udemy',
        duration: '12 weeks',
        level: 'Intermediate',
        rating: 4.7,
        students: 18920,
        price: 94.99,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300',
        skills: ['Machine Learning', 'Python', 'Deep Learning', 'TensorFlow']
      },
      {
        title: 'Docker & Kubernetes Mastery',
        provider: 'Pluralsight',
        duration: '8 weeks',
        level: 'Advanced',
        rating: 4.9,
        students: 11230,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=300',
        skills: ['Docker', 'Kubernetes', 'DevOps', 'Containerization']
      },
      {
        title: 'Full Stack Web Development',
        provider: 'Coursera',
        duration: '16 weeks',
        level: 'Intermediate',
        rating: 4.6,
        students: 25670,
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300',
        skills: ['JavaScript', 'Node.js', 'React', 'MongoDB']
      }
    ];

    // Filter courses based on resume skills
    return courseTemplates.map(course => ({
      ...course,
      matchScore: Math.floor(Math.random() * 20) + 75, // 75-95 match score
      id: Math.random().toString(36).substr(2, 9)
    }));
  };

  // Generate related jobs based on resume skills and experience
  const getRelatedJobs = () => {
    if (!resumeData) return [];
    
    // Filter jobs based on experience level
    const experienceLevel = resumeData.experience <= 2 ? 'Entry' : 
                          resumeData.experience <= 5 ? 'Mid' : 'Senior';
    
    const suitableJobs = jobRolesData.filter(job => {
      return job.level === experienceLevel || job.level === 'Mid';
    }).slice(0, 6);

    return suitableJobs.map(job => ({
      ...job,
      logo: `https://logo.clearbit.com/${job.title.toLowerCase().replace(/\s+/g, '')}.com`,
      posted: `${Math.floor(Math.random() * 30) + 1} days ago`,
      matchScore: Math.floor(Math.random() * 25) + 70, // 70-95 match score
      skills: resumeData.skills.slice(0, 4)
    }));
  };

  // Generate interview questions based on resume skills
  const getInterviewQuestions = () => {
    if (!resumeData) return [];
    
    const technicalQuestions = [
      `Explain your experience with ${resumeData.skills[0] || 'JavaScript'}.`,
      `How would you optimize a ${resumeData.skills[1] || 'React'} application?`,
      `Describe a challenging project you worked with ${resumeData.skills[2] || 'Node.js'}.`,
      `What are the best practices for ${resumeData.skills[3] || 'Python'} development?`,
      `How do you handle testing in ${resumeData.skills[0] || 'JavaScript'} projects?`,
      `Explain the architecture of a system you built using ${resumeData.skills[1] || 'React'}.`
    ];

    const behavioralQuestions = [
      'Tell me about a challenging project you worked on.',
      'How do you handle conflicts in a team?',
      'Describe a time you had to learn a new technology quickly.',
      'What motivates you in your work?',
      'How do you prioritize tasks when deadlines are tight?',
      'Describe your approach to problem-solving.'
    ];

    const systemDesignQuestions = [
      'Design a URL shortening service.',
      'How would you design a social media feed?',
      'Explain how you would scale a web application.',
      'Design a real-time chat application.',
      'How would you design a video streaming platform?',
      'Design a payment processing system.'
    ];

    return [
      { category: 'Technical', questions: technicalQuestions },
      { category: 'Behavioral', questions: behavioralQuestions },
      { category: 'System Design', questions: systemDesignQuestions }
    ];
  };

  // Generate chatbot responses based on resume data
  const getChatbotResponses = () => {
    if (!resumeData) return [];
    
    return [
      {
        question: 'What are my career prospects?',
        response: `Based on your ${resumeData.experience} years of experience and skills in ${resumeData.skills.slice(0, 3).join(', ')}, you have strong career prospects in software development. Consider focusing on ${resumeData.recommendedRoles[0] || 'Full Stack Development'} roles.`
      },
      {
        question: 'Which skills should I improve?',
        response: `Your resume suggests focusing on ${resumeData.improvements.join(', ')}. These skills will significantly enhance your marketability and open up senior-level opportunities with 20-30% salary increases.`
      },
      {
        question: 'What salary can I expect?',
        response: `With ${resumeData.experience} years of experience and your skill set, you can expect salaries ranging from $${resumeData.experience * 25000} to $${resumeData.experience * 35000} depending on location and company size. Senior roles can go up to $${resumeData.experience * 45000}+.`
      },
      {
        question: 'What career path should I follow?',
        response: `Based on your profile, I recommend this career path: ${resumeData.careerPath.join(' → ')}. Focus on building expertise in ${resumeData.skills[0]} and ${resumeData.skills[1]} to accelerate your growth.`
      }
    ];
  };

  const downloadResumeAnalysis = () => {
    if (!resumeData) return;
    
    const analysisText = `
Resume Analysis Report
==================

Overall Score: ${resumeData.score}/100

Skills:
${resumeData.skills.join(', ')}

Experience: ${resumeData.experience} years
Education: ${resumeData.education}
Location: ${resumeData.location}
Job Level: ${resumeData.jobLevel}

Industries:
${resumeData.industries.join(', ')}

Recommended Roles:
${resumeData.recommendedRoles.map(r => `• ${r}`).join('\n')}

Strengths:
${resumeData.strengths.map(s => `• ${s}`).join('\n')}

Areas for Improvement:
${resumeData.improvements.map(i => `• ${i}`).join('\n')}

Career Path:
${resumeData.careerPath.join(' → ')}

Skill Gaps:
${resumeData.skillGaps.map(s => `• ${s}`).join('\n')}
    `;
    
    const blob = new Blob([analysisText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get dynamic data
  const relatedCourses = getRelatedCourses();
  const relatedJobs = getRelatedJobs();
  const interviewQuestions = getInterviewQuestions();
  const chatbotResponses = getChatbotResponses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Upload & Analysis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your resume to get personalized course recommendations, job matches, interview prep, and AI career guidance
          </p>
        </div>

        {/* Upload Section */}
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
              <label
                htmlFor="resume-upload"
                className="btn btn-primary cursor-pointer"
              >
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

            {resumeFile && !uploading && (
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
                  <button
                    onClick={removeResume}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resume Analysis Results */}
        {resumeData && (
          <div className="space-y-8">
            {/* Overview Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Resume Analysis Results
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadResumeAnalysis}
                    className="btn btn-secondary flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </button>
                  <button
                    onClick={removeResume}
                    className="btn btn-secondary flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New
                  </button>
                </div>
              </div>

              {/* Score Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Overall Score</p>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                        {resumeData.score}/100
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">Experience</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {resumeData.experience} years
                      </p>
                    </div>
                    <Briefcase className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Skills</p>
                      <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                        {resumeData.skills.length}
                      </p>
                    </div>
                    <Brain className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Level</p>
                      <p className="text-xl font-bold text-orange-800 dark:text-orange-200">
                        {resumeData.jobLevel}
                      </p>
                    </div>
                    <Award className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8">
                  {['overview', 'courses', 'jobs', 'interview', 'chatbot'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resumeData.skills.map((skill, index) => {
                      const skillData = skillsData.find(s => s.name === skill);
                      return (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                        >
                          {skill}
                          {skillData && (
                            <span className="ml-1 text-xs">({skillData.category})</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{resumeData.education}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{resumeData.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{resumeData.jobLevel}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{resumeData.experience} years experience</span>
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
                      {resumeData.recommendedRoles.map((role, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <ChevronRight className="w-4 h-4 text-green-500 mr-2" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                      Career Path
                    </h4>
                    <div className="flex items-center space-x-2 text-sm">
                      {resumeData.careerPath.map((path, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                          <span className="text-gray-700 dark:text-gray-300">{path}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">
                      Skill Gaps to Address
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.skillGaps.map((gap, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
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
                {relatedCourses.map((course) => (
                  <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {course.provider}
                        </span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {course.matchScore}% Match
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {course.rating}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${course.price}
                        </span>
                        <button className="btn btn-primary text-sm">
                          View Course
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedJobs.map((job) => (
                  <div key={job.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {job.title.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {job.matchScore}% Match
                          </span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {job.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">{job.category}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        ${job.avgSalary.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {job.growth}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {job.demand} demand
                      </span>
                      <button className="btn btn-primary text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'interview' && (
              <div className="space-y-6">
                {interviewQuestions.map((category, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {category.category} Questions
                    </h3>
                    <div className="space-y-3">
                      {category.questions.map((question, qIndex) => (
                        <div key={qIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                            {qIndex + 1}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'chatbot' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  AI Career Assistant
                </h3>
                <div className="space-y-4">
                  {chatbotResponses.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">
                        {item.question}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.response}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
