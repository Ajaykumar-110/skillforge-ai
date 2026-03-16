import { CheckCircle, X, Save, Edit2, User, Camera, Mail, MapPin, Calendar, Linkedin, Github, Twitter, EyeOff, Eye, BookOpen, Target, Award, TrendingUp } from 'lucide-react';
import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { handleCancel, handleSave, handleEdit, getCompletionColor, profileCompletion, getCompletionMessage, tabs, handleInputChange, handlePreferenceChange, handleSecurityChange, activityData, skillsProgress, achievementData, learningStreak } from './UserProfile';

return (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        <p className="text-gray-600 mt-1">Manage your profile settings and preferences</p>
      </div>
      <div className="flex items-center space-x-3">
        {saveMessage && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">{saveMessage}</span>
          </div>
        )}
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>
    </div>

    {/* Profile Overview Card */}
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {profileData.personal.firstName} {profileData.personal.lastName}
          </h2>
          <p className="text-gray-600">{profileData.professional.title}</p>
          <p className="text-sm text-gray-500 mt-1">{profileData.professional.company}</p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{profileData.personal.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{profileData.personal.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Joined January 2024</span>
            </div>
          </div>
          <p className="mt-3 text-gray-700">{profileData.personal.bio}</p>
          <div className="flex items-center space-x-3 mt-4">
            <a href={profileData.professional.linkedin} className="text-blue-600 hover:text-blue-700">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={profileData.professional.github} className="text-gray-900 hover:text-gray-700">
              <Github className="w-5 h-5" />
            </a>
            <a href={profileData.professional.twitter} className="text-blue-400 hover:text-blue-500">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getCompletionColor()}`}>{profileCompletion}%</div>
          <p className="text-sm text-gray-600">Profile Complete</p>
          <p className="text-xs text-gray-500 mt-1">{getCompletionMessage()}</p>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
            <div className={`bg-gradient-to-r h-2 rounded-full transition-all duration-500 ${profileCompletion === 100 ? 'from-green-500 to-green-600' :
                profileCompletion >= 80 ? 'from-indigo-500 to-purple-600' :
                  profileCompletion >= 60 ? 'from-blue-500 to-blue-600' :
                    profileCompletion >= 40 ? 'from-orange-500 to-orange-600' :
                      'from-red-500 to-red-600'}`} style={{ width: `${profileCompletion}%` }} />
          </div>
        </div>
      </div>
    </div>

    {/* Tabs */}
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={isEditing ? (tempProfileData.personal?.firstName || '') : profileData.personal.firstName}
                  onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
              </div>
            </div>
            ){'}'}

            {/* Professional Tab */}
            {activeTab === 'professional' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={isEditing ? tempProfileData.professional.title : profileData.professional.title}
                      onChange={(e) => handleInputChange('professional', 'title', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={isEditing ? tempProfileData.professional.company : profileData.professional.company}
                      onChange={(e) => handleInputChange('professional', 'company', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    <input
                      type="text"
                      value={isEditing ? tempProfileData.professional.experience : profileData.professional.experience}
                      onChange={(e) => handleInputChange('professional', 'experience', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <input
                      type="text"
                      value={isEditing ? tempProfileData.professional.education : profileData.professional.education}
                      onChange={(e) => handleInputChange('professional', 'education', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {(isEditing ? tempProfileData.professional.skills : profileData.professional.skills).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={isEditing ? tempProfileData.professional.linkedin : profileData.professional.linkedin}
                      onChange={(e) => handleInputChange('professional', 'linkedin', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                    <input
                      type="url"
                      value={isEditing ? tempProfileData.professional.github : profileData.professional.github}
                      onChange={(e) => handleInputChange('professional', 'github', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    <input
                      type="url"
                      value={isEditing ? tempProfileData.professional.twitter : profileData.professional.twitter}
                      onChange={(e) => handleInputChange('professional', 'twitter', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">General Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                          value={isEditing ? tempProfileData.preferences.language : profileData.preferences.language}
                          onChange={(e) => handlePreferenceChange('general', 'language', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select
                          value={isEditing ? tempProfileData.preferences.timezone : profileData.preferences.timezone}
                          onChange={(e) => handlePreferenceChange('general', 'timezone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        >
                          <option>PST (UTC-8)</option>
                          <option>EST (UTC-5)</option>
                          <option>CST (UTC-6)</option>
                          <option>MST (UTC-7)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                        <select
                          value={isEditing ? tempProfileData.preferences.theme : profileData.preferences.theme}
                          onChange={(e) => handlePreferenceChange('general', 'theme', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        >
                          <option>Light</option>
                          <option>Dark</option>
                          <option>Auto</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.preferences.notifications.email : profileData.preferences.notifications.email}
                          onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">Email notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.preferences.notifications.push : profileData.preferences.notifications.push}
                          onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">Push notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.preferences.notifications.sms : profileData.preferences.notifications.sms}
                          onChange={(e) => handlePreferenceChange('notifications', 'sms', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">SMS notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.preferences.notifications.marketing : profileData.preferences.notifications.marketing}
                          onChange={(e) => handlePreferenceChange('notifications', 'marketing', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">Marketing emails</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Privacy Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                      <select
                        value={isEditing ? tempProfileData.preferences.privacy.profileVisibility : profileData.preferences.privacy.profileVisibility}
                        onChange={(e) => handlePreferenceChange('privacy', 'profileVisibility', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                      >
                        <option>Public</option>
                        <option>Private</option>
                        <option>Friends Only</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.preferences.privacy.showEmail : profileData.preferences.privacy.showEmail}
                          onChange={(e) => handlePreferenceChange('privacy', 'showEmail', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">Show email publicly</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.preferences.privacy.showPhone : profileData.preferences.privacy.showPhone}
                          onChange={(e) => handlePreferenceChange('privacy', 'showPhone', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">Show phone publicly</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.preferences.privacy.allowMessages : profileData.preferences.privacy.allowMessages}
                          onChange={(e) => handlePreferenceChange('privacy', 'allowMessages', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">Allow messages from other users</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={isEditing ? tempProfileData.security.currentPassword : ''}
                            onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 pr-10" />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={isEditing ? tempProfileData.security.newPassword : ''}
                            onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 pr-10" />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={isEditing ? tempProfileData.security.confirmPassword : ''}
                            onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 pr-10" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Security Options</h4>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.security.twoFactorEnabled : profileData.security.twoFactorEnabled}
                          onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">Enable two-factor authentication</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isEditing ? tempProfileData.security.loginAlerts : profileData.security.loginAlerts}
                          onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50" />
                        <span className="text-sm text-gray-700">Send login alerts</span>
                      </label>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                        <select
                          value={isEditing ? tempProfileData.security.sessionTimeout : profileData.security.sessionTimeout}
                          onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        >
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                          <option>Never</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Analytics</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-900">12</span>
                    </div>
                    <p className="text-sm font-medium text-blue-900">Courses Completed</p>
                    <p className="text-xs text-blue-700">+3 this month</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="w-8 h-8 text-green-600" />
                      <span className="text-2xl font-bold text-green-900">8</span>
                    </div>
                    <p className="text-sm font-medium text-green-900">Skills Learned</p>
                    <p className="text-xs text-green-700">+2 this month</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <Award className="w-8 h-8 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-900">15</span>
                    </div>
                    <p className="text-sm font-medium text-purple-900">Interviews</p>
                    <p className="text-xs text-purple-700">+5 this month</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-900">85%</span>
                    </div>
                    <p className="text-sm font-medium text-orange-900">Success Rate</p>
                    <p className="text-xs text-orange-700">+5% improvement</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Activity Overview</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="logins" stroke="#6366f1" name="Logins" />
                        <Line type="monotone" dataKey="courses" stroke="#10b981" name="Courses" />
                        <Line type="monotone" dataKey="interviews" stroke="#f59e0b" name="Interviews" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Skills Progress</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={skillsProgress}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="skill" angle={-45} textAnchor="end" height={60} stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="level" fill="#6366f1" name="Current Level" />
                        <Bar dataKey="target" fill="#e5e7eb" name="Target Level" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Achievements</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={achievementData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {achievementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {achievementData.map((achievement) => (
                        <div key={achievement.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: achievement.color }} />
                            <span className="text-sm text-gray-600">{achievement.name}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{achievement.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Learning Streak (Hours/Day)</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={learningStreak}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="hours"
                          stroke="#6366f1"
                          fill="#6366f1"
                          fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>)}
      </div>
    </div>
    )

    export default UserProfile
  </>);
