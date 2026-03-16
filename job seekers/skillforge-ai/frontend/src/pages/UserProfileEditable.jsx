import React, { useState, useEffect } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Shield, 
  Lock, 
  Key, 
  Bell, 
  Palette, 
  Languages, 
  Upload, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  TrendingUp,
  Award,
  BookOpen,
  BarChart3,
  Activity,
  Trash2,
  Plus,
  Settings
} from 'lucide-react'

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeSessions, setActiveSessions] = useState([])
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    jobAlerts: true,
    courseUpdates: true,
    profileViews: true
  })

  // Form state - all fields start empty
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    target_job_role: '',
    experience_level: '',
    education: '',
    github_profile: '',
    linkedin_profile: '',
    portfolio_website: '',
    skills: [],
    theme_preference: 'light',
    language_preference: 'en'
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: '30 minutes'
  })

  // Available options
  const jobRoles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist',
    'Machine Learning Engineer', 'DevOps Engineer', 'UI/UX Designer', 'Product Manager',
    'Project Manager', 'Business Analyst', 'Marketing Manager', 'Sales Manager',
    'Software Architect', 'Cloud Engineer', 'Security Engineer', 'QA Engineer',
    'Mobile Developer', 'Game Developer', 'Blockchain Developer', 'Technical Writer'
  ]

  const experienceLevels = [
    'Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' }
  ]

  const availableSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'HTML/CSS', 'SQL',
    'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Machine Learning',
    'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib',
    'Scikit-learn', 'Data Analysis', 'Statistics', 'Figma', 'Adobe XD', 'Sketch',
    'Photoshop', 'Illustrator', 'Java', 'C++', 'Ruby', 'PHP', 'Laravel',
    'Django', 'Flask', 'PostgreSQL', 'Redis', 'Elasticsearch', 'REST APIs',
    'GraphQL', 'Agile', 'Scrum', 'Project Management', 'Communication',
    'Leadership', 'Problem Solving', 'Team Work', 'Time Management',
    'Critical Thinking', 'Creativity', 'Adaptability', 'Public Speaking',
    'Writing', 'Research', 'Analytics', 'Business Intelligence', 'Data Visualization',
    'Big Data', 'Neural Networks', 'Natural Language Processing', 'Computer Vision',
    'Reinforcement Learning', 'MLOps', 'Testing', 'CI/CD', 'System Design'
  ]

  // Mock analytics data
  const [analytics, setAnalytics] = useState({
    skills_growth: [
      { date: 'Jan', value: 0 },
      { date: 'Feb', value: 0 },
      { date: 'Mar', value: 0 },
      { date: 'Apr', value: 0 },
      { date: 'May', value: 0 },
      { date: 'Jun', value: 0 }
    ],
    resume_score: [
      { date: 'Jan', value: 0 },
      { date: 'Feb', value: 0 },
      { date: 'Mar', value: 0 },
      { date: 'Apr', value: 0 },
      { date: 'May', value: 0 },
      { date: 'Jun', value: 0 }
    ],
    job_match_score: [
      { date: 'Jan', value: 0 },
      { date: 'Feb', value: 0 },
      { date: 'Mar', value: 0 },
      { date: 'Apr', value: 0 },
      { date: 'May', value: 0 },
      { date: 'Jun', value: 0 }
    ],
    courses_completed: [
      { name: 'Completed', value: 0 },
      { name: 'In Progress', value: 0 }
    ]
  })

  // Load user data from API
  useEffect(() => {
    loadUserProfile()
    loadAnalytics()
    loadActiveSessions()
  }, [])

  const loadUserProfile = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return

      const response = await fetch('http://127.0.0.1:5000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          setFormData(data.user)
          setNotificationSettings(data.user.notification_settings || notificationSettings)
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const loadAnalytics = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return

      const response = await fetch('http://127.0.0.1:5000/api/user/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
    }
  }

  const loadActiveSessions = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return

      const response = await fetch('http://127.0.0.1:5000/api/user/sessions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setActiveSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Error loading sessions:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSkillChange = (selectedSkills) => {
    setFormData(prev => ({
      ...prev,
      skills: selectedSkills
    }))
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const token = localStorage.getItem('auth_token')
      const formData = new FormData()
      formData.append('photo', file)

      const response = await fetch('http://127.0.0.1:5000/api/user/upload-photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({
          ...prev,
          profile_photo: data.photo_url
        }))
        alert('Profile photo uploaded successfully!')
      }
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Error uploading photo')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('auth_token')
      
      const response = await fetch('http://127.0.0.1:5000/api/user/profile/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          notification_settings: notificationSettings
        })
      })

      if (response.ok) {
        const data = await response.json()
        alert('Profile updated successfully!')
        setIsEditing(false)
      } else {
        alert('Error updating profile')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    loadUserProfile() // Reload original data
    setIsEditing(false)
  }

  const calculateProfileCompletion = () => {
    const fields = [
      'first_name', 'last_name', 'email', 'phone', 'location', 'bio',
      'target_job_role', 'experience_level', 'education', 'github_profile',
      'linkedin_profile', 'portfolio_website', 'profile_photo'
    ]
    
    const completedFields = fields.filter(field => {
      const value = formData[field]
      return value && value.toString().trim() !== ''
    })
    
    return Math.round((completedFields.length / fields.length) * 100)
  }

  const completionPercentage = calculateProfileCompletion()

  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handlePasswordChange = () => {
    // Handle password change
    setShowPasswordModal(false)
    setSecurityData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    alert('Password changed successfully!')
  }

  const handleTwoFactorToggle = () => {
    // Handle 2FA toggle
    setShowTwoFactorModal(false)
    setSecurityData(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }))
    alert(`Two-factor authentication ${!securityData.twoFactorEnabled ? 'enabled' : 'disabled'}!`)
  }

  const removeSession = (sessionId) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId))
    alert('Session removed successfully!')
  }

  const getPlaceholderText = (fieldName) => {
    const placeholders = {
      first_name: 'Enter your first name',
      last_name: 'Enter your last name',
      email: 'Enter your email address',
      phone: 'Enter your phone number',
      location: 'Enter your location',
      bio: 'Tell us about yourself',
      target_job_role: 'Select your target job role',
      experience_level: 'Select your experience level',
      education: 'Enter your education',
      github_profile: 'Enter your GitHub profile URL',
      linkedin_profile: 'Enter your LinkedIn profile URL',
      portfolio_website: 'Enter your portfolio website URL'
    }
    return placeholders[fieldName] || ''
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">User Profile</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {completionPercentage}% Complete
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{saving ? 'Saving...' : 'Save'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Photo and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Photo */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {formData.profile_photo ? (
                    <img
                      src={formData.profile_photo}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      {uploading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {formData.first_name && formData.last_name ? 
                      `${formData.first_name} ${formData.last_name}` : 
                      'Your Name'
                    }
                  </h2>
                  {formData.email && (
                    <p className="text-gray-600 flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {formData.email}
                    </p>
                  )}
                  {formData.location && (
                    <p className="text-gray-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {formData.location}
                    </p>
                  )}
                </div>

                {formData.bio && (
                  <div className="text-center">
                    <p className="text-gray-700 text-sm">{formData.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column - Tabs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {['personal', 'career', 'preferences', 'security', 'analytics'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab === 'personal' && 'Personal Information'}
                      {tab === 'career' && 'Career Information'}
                      {tab === 'preferences' && 'Preferences'}
                      {tab === 'security' && 'Security'}
                      {tab === 'analytics' && 'Analytics'}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={isEditing ? formData.first_name : (formData.first_name || getPlaceholderText('first_name'))}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder={getPlaceholderText('first_name')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={isEditing ? formData.last_name : (formData.last_name || getPlaceholderText('last_name'))}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder={getPlaceholderText('last_name')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={isEditing ? formData.email : (formData.email || getPlaceholderText('email'))}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder={getPlaceholderText('email')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={isEditing ? formData.phone : (formData.phone || getPlaceholderText('phone'))}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder={getPlaceholderText('phone')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={isEditing ? formData.location : (formData.location || getPlaceholderText('location'))}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder={getPlaceholderText('location')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={isEditing ? formData.bio : (formData.bio || getPlaceholderText('bio'))}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder={getPlaceholderText('bio')}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'career' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(formData.skills || []).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {isEditing && (
                        <div className="text-sm text-gray-500">
                          <Plus className="w-4 h-4 inline mr-2" />
                          Click to add skills
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Job Role</label>
                        <select
                          name="target_job_role"
                          value={isEditing ? formData.target_job_role : (formData.target_job_role || getPlaceholderText('target_job_role'))}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                          <option value="">{getPlaceholderText('target_job_role')}</option>
                          {jobRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                        <select
                          name="experience_level"
                          value={isEditing ? formData.experience_level : (formData.experience_level || getPlaceholderText('experience_level'))}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                          <option value="">{getPlaceholderText('experience_level')}</option>
                          {experienceLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                      <input
                        type="text"
                        name="education"
                        value={isEditing ? formData.education : (formData.education || getPlaceholderText('education'))}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder={getPlaceholderText('education')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                        <input
                          type="url"
                          name="github_profile"
                          value={isEditing ? formData.github_profile : (formData.github_profile || getPlaceholderText('github_profile'))}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder={getPlaceholderText('github_profile')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                        <input
                          type="url"
                          name="linkedin_profile"
                          value={isEditing ? formData.linkedin_profile : (formData.linkedin_profile || getPlaceholderText('linkedin_profile'))}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder={getPlaceholderText('linkedin_profile')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                      <input
                        type="url"
                        name="portfolio_website"
                        value={isEditing ? formData.portfolio_website : (formData.portfolio_website || getPlaceholderText('portfolio_website'))}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder={getPlaceholderText('portfolio_website')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                        <select
                          name="theme_preference"
                          value={isEditing ? formData.theme_preference : formData.theme_preference}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                          name="language_preference"
                          value={isEditing ? formData.language_preference : formData.language_preference}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                          {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notification Settings</label>
                      <div className="space-y-3">
                        {Object.entries(notificationSettings).map(([key, value]) => (
                          <label key={key} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={isEditing ? notificationSettings[key] : notificationSettings[key]}
                              onChange={(e) => {
                                if (isEditing) {
                                  handleNotificationChange(key, e.target.checked)
                                }
                              }}
                              disabled={!isEditing}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                            />
                            <span className="text-sm text-gray-700 capitalize">
                              {key.replace(/_/g, ' ')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Change Password</span>
                      </button>
                      <button
                        onClick={() => setShowTwoFactorModal(true)}
                        className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Enable Two-Factor Authentication</span>
                      </button>
                      <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Active Sessions</span>
                      </button>
                    </div>
                    
                    {activeSessions.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
                        <div className="space-y-3">
                          {activeSessions.map((session, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Globe className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{session.device_info?.browser || 'Unknown Device'}</p>
                                  <p className="text-xs text-gray-500">{session.ip_address}</p>
                                </div>
                              </div>
                              <button 
                                onClick={() => removeSession(session.id)}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Skills Growth</h3>
                        <div className="h-48 flex items-center justify-center text-gray-500">
                          <BarChart3 className="w-8 h-8" />
                          <p className="text-sm">No data available</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Resume Score</h3>
                        <div className="h-48 flex items-center justify-center text-gray-500">
                          <Award className="w-8 h-8" />
                          <p className="text-sm">No data available</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Job Match Score</h3>
                        <div className="h-48 flex items-center justify-center text-gray-500">
                          <Target className="w-8 h-8" />
                          <p className="text-sm">No data available</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Courses Completed</h3>
                        <div className="h-48 flex items-center justify-center text-gray-500">
                          <BookOpen className="w-8 h-8" />
                          <p className="text-sm">No data available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {showTwoFactorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
              <button
                onClick={() => setShowTwoFactorModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Enable two-factor authentication for enhanced security.
              </p>
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">
                  Status: {securityData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTwoFactorModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTwoFactorToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {securityData.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
