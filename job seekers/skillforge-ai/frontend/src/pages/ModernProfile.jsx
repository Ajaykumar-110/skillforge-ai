import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Briefcase, 
  Award, 
  Edit2,
  Save,
  X,
  Plus,
  ChevronDown,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import apiService from '../services/api';

const ModernProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [],
    targetRole: '',
    experienceLevel: 'entry',
    location: '',
    bio: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'junior', label: 'Junior (2-4 years)' },
    { value: 'mid', label: 'Mid-Level (4-7 years)' },
    { value: 'senior', label: 'Senior (7-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const jobRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'AI/ML Engineer',
    'Data Scientist',
    'Software Architect',
    'Product Manager',
    'UX/UI Designer',
    'Mobile Developer',
    'Game Developer',
    'Blockchain Developer',
    'Cloud Engineer',
    'Security Engineer'
  ];

  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'C++', 'C#',
    'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'SQL', 'MongoDB', 'PostgreSQL',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Ansible',
    'Git', 'CI/CD', 'Machine Learning', 'Data Science', 'REST API', 'GraphQL',
    'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Figma'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        skills: user.skills || [],
        targetRole: user.targetJobRole || '',
        experienceLevel: user.experienceLevel || 'entry',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await apiService.post('/api/user/profile', formData);
      
      if (response.success) {
        // Update local user data
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setMessage('Profile updated successfully!');
        setMessageType('success');
        setEditMode(false);
        
        // Update auth context if needed
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } else {
        setMessage(response.error || 'Failed to update profile');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage('Failed to update profile. Please try again.');
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        skills: user.skills || [],
        targetRole: user.targetJobRole || '',
        experienceLevel: user.experienceLevel || 'entry',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
    setEditMode(false);
    setMessage('');
  };

  const handleSkillAdd = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Profile
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your personal information and career preferences
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {editMode ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mx-6 mt-4 p-4 rounded-lg ${
                messageType === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center">
                {messageType === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                <span>{message}</span>
              </div>
            </motion.div>
          )}

          {/* Profile Form */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Target Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Role
                  </label>
                  <div className="relative">
                    <select
                      value={formData.targetRole}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetRole: e.target.value }))}
                      disabled={!editMode}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed appearance-none"
                    >
                      <option value="">Select your target role</option>
                      {jobRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <Briefcase className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <div className="relative">
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                      disabled={!editMode}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed appearance-none"
                    >
                      {experienceLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                    <Award className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!editMode}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed pl-10"
                      placeholder="City, State/Country"
                    />
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills & Technologies
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          {editMode && (
                            <button
                              onClick={() => handleSkillRemove(skill)}
                              className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    
                    {editMode && (
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Type a skill and press Enter"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const skill = e.target.value.trim();
                              if (skill) {
                                handleSkillAdd(skill);
                                e.target.value = '';
                              }
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <Plus className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    
                    {editMode && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {commonSkills.filter(skill => !formData.skills.includes(skill)).slice(0, 8).map((skill, index) => (
                            <button
                              key={index}
                              onClick={() => handleSkillAdd(skill)}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!editMode}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed resize-none"
                    placeholder="Tell us about yourself, your experience, and career goals..."
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernProfile;
