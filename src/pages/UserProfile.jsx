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
  Smartphone, 
  Globe, 
  Github, 
  Linkedin, 
  Lock, 
  Key, 
  Trash2, 
  Eye,
  Bell,
  Palette,
  Languages,
  BarChart3,
  TrendingUp,
  Award,
  BookOpen,
  Target
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false)
  const [activeSessions, setActiveSessions] = useState([])
  const [analytics, setAnalytics] = useState(null)

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
    theme_preference: 'light',
    language_preference: 'en'
  })

  const mockUserProfile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    target_job_role: 'Full Stack Developer',
    experience_level: 'Senior Level',
    education: 'Bachelor of Science in Computer Science',
    github_profile: 'https://github.com/johndoe',
    linkedin_profile: 'https://linkedin.com/in/johndoe',
    portfolio_website: 'https://johndoe.dev',
    profile_photo: 'https://images.unsplash.com/photo-1472099645785-565eab4b4c1?w=150&h=150&fit=crop&crop=faces',
    theme_preference: 'light',
    language_preference: 'en',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    created_at: '2023-01-15'
  }

  const mockAnalytics = {
    skills_growth: [
      { date: 'Jan', value: 5 },
      { date: 'Feb', value: 8 },
      { date: 'Mar', value: 12 },
      { date: 'Apr', value: 15 },
      { date: 'May', value: 18 },
      { date: 'Jun', value: 22 }
    ],
    resume_score: [
      { date: 'Jan', value: 65 },
      { date: 'Feb', value: 72 },
      { date: 'Mar', value: 78 },
      { date: 'Apr', value: 85 },
      { date: 'May', value: 88 },
      { date: 'Jun', value: 92 }
    ],
    job_match_score: [
      { date: 'Jan', value: 75 },
      { date: 'Feb', value: 82 },
      { date: 'Mar', value: 85 },
      { date: 'Apr', value: 88 },
      { date: 'May', value: 91 },
      { date: 'Jun', value: 94 }
    ],
    courses_completed: [
      { name: 'Completed', value: 12 },
      { name: 'In Progress', value: 3 }
    ]
  }

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

  useEffect(() => {
    setTimeout(() => {
      setUserProfile(mockUserProfile)
      setFormData(mockUserProfile)
      setAnalytics(mockAnalytics)
      setActiveSessions([
        {
          id: 1,
          device_info: { browser: 'Chrome on Windows', device: 'Desktop' },
          ip_address: '192.168.1.100',
          created_at: '2024-03-14T10:30:00Z'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setTimeout(() => {
      const photoUrl = `https://images.unsplash.com/photo-${Date.now()}?w=150&h=150&fit=crop&crop=faces`
      setUserProfile(prev => ({
        ...prev,
        profile_photo: photoUrl
      }))
      setUploading(false)
      alert('Profile photo uploaded successfully!')
    }, 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    setTimeout(() => {
      setUserProfile(formData)
      setIsEditing(false)
      setSaving(false)
      alert('Profile updated successfully!')
    }, 1500)
  }

  const handleCancel = () => {
    setFormData(userProfile)
    setIsEditing(false)
  }

  const calculateProfileCompletion = () => {
    if (!userProfile) return 0
    
    const fields = [
      'first_name', 'last_name', 'email', 'phone', 'location', 'bio',
      'target_job_role', 'experience_level', 'education', 'github_profile',
      'linkedin_profile', 'portfolio_website', 'profile_photo'
    ]
    
    const completedFields = fields.filter(field => {
      const value = userProfile[field]
      return value && value.toString().trim() !== ''
    })
    
    return Math.round((completedFields.length / fields.length) * 100)
  }

  const completionPercentage = calculateProfileCompletion()

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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">User Profile</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{completionPercentage}% Complete</span>
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
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {userProfile?.profile_photo ? (
                    <img
                      src={userProfile.profile_photo}
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

              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </h2>
                  <p className="text-gray-600 flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {userProfile?.email}
                  </p>
                  {userProfile?.location && (
                    <p className="text-gray-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {userProfile.location}
                    </p>
                  )}
                </div>

                {userProfile?.bio && (
                  <div className="text-center">
                    <p className="text-gray-700 text-sm">{userProfile.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
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

              <div className="p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={isEditing ? formData.first_name : userProfile?.first_name || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={isEditing ? formData.last_name : userProfile?.last_name || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
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
                          value={isEditing ? formData.email : userProfile?.email || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={isEditing ? formData.phone : userProfile?.phone || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={isEditing ? formData.location : userProfile?.location || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={isEditing ? formData.bio : userProfile?.bio || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
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
                      <div className="flex flex-wrap gap-2">
                        {(userProfile?.skills || []).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Job Role</label>
                        <select
                          name="target_job_role"
                          value={isEditing ? formData.target_job_role : userProfile?.target_job_role || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                          <option value="">Select a role</option>
                          {jobRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                        <select
                          name="experience_level"
                          value={isEditing ? formData.experience_level : userProfile?.experience_level || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                          <option value="">Select level</option>
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
                        value={isEditing ? formData.education : userProfile?.education || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                        <input
                          type="url"
                          name="github_profile"
                          value={isEditing ? formData.github_profile : userProfile?.github_profile || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                        <input
                          type="url"
                          name="linkedin_profile"
                          value={isEditing ? formData.linkedin_profile : userProfile?.linkedin_profile || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                      <input
                        type="url"
                        name="portfolio_website"
                        value={isEditing ? formData.portfolio_website : userProfile?.portfolio_website || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
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
                          value={isEditing ? formData.theme_preference : userProfile?.theme_preference || 'light'}
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
                          value={isEditing ? formData.language_preference : userProfile?.language_preference || 'en'}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="zh">中文</option>
                        </select>
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
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && analytics && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Skills Growth</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={analytics.skills_growth || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Resume Score</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={analytics.resume_score || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Job Match Score</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={analytics.job_match_score || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#6366f1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Courses Completed</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Completed', value: analytics.courses_completed?.[0]?.value || 12 },
                                { name: 'In Progress', value: analytics.courses_completed?.[1]?.value || 3 }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#10b981" />
                              <Cell fill="#f59e0b" />
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
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
              <p className="text-gray-600">Enable two-factor authentication for enhanced security.</p>
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">Status: Currently Disabled</span>
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
