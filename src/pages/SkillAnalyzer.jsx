import React, { useState, useEffect } from 'react'
import { Brain, TrendingUp, Award, Target, Plus, X, Edit, Trash2, Search, Filter } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

const SkillAnalyzer = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'Frontend' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const [skillCategories] = useState(['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'AI/ML'])

  // Load skills from API on component mount
  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      setLoading(true)
      
      // Simple working mock data
      const mockSkills = [
        { id: 1, name: 'JavaScript', level: 85, category: 'Frontend', experience: '3 years', projects: 12 },
        { id: 2, name: 'React', level: 80, category: 'Frontend', experience: '2.5 years', projects: 8 },
        { id: 3, name: 'Python', level: 75, category: 'Backend', experience: '2 years', projects: 6 },
        { id: 4, name: 'Node.js', level: 70, category: 'Backend', experience: '1.5 years', projects: 5 },
        { id: 5, name: 'SQL', level: 65, category: 'Database', experience: '2 years', projects: 4 },
        { id: 6, name: 'Docker', level: 60, category: 'DevOps', experience: '1 year', projects: 3 },
        { id: 7, name: 'React Native', level: 55, category: 'Mobile', experience: '6 months', projects: 2 },
        { id: 8, name: 'TensorFlow', level: 45, category: 'AI/ML', experience: '3 months', projects: 1 }
      ]
      
      setSkills(mockSkills)
    } catch (error) {
      console.error('Failed to load skills:', error)
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skillToAdd = {
        ...newSkill,
        id: Date.now(),
        experience: '0 years',
        projects: 0
      }
      setSkills([...skills, skillToAdd])
      setNewSkill({ name: '', level: 50, category: 'Frontend' })
      setShowAddForm(false)
    }
  }

  const removeSkill = (skillId) => {
    setSkills(skills.filter(skill => skill.id !== skillId))
  }

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getSkillLevelColor = (level) => {
    if (level >= 80) return 'text-green-600 bg-green-50'
    if (level >= 60) return 'text-blue-600 bg-blue-50'
    if (level >= 40) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getSkillLevelText = (level) => {
    if (level >= 80) return 'Expert'
    if (level >= 60) return 'Advanced'
    if (level >= 40) return 'Intermediate'
    return 'Beginner'
  }

  const radarData = skills.map(skill => ({
    skill: skill.name,
    level: skill.level,
    fullMark: 100
  }))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading skills...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skill Analyzer</h1>
          <p className="text-gray-600 mt-1">Track and analyze your technical skills</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{skills.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Skills</h3>
          <p className="text-xs text-gray-500 mt-1">Across all categories</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {skills.length > 0 ? Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length) : 0}%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Average Level</h3>
          <p className="text-xs text-gray-500 mt-1">Overall proficiency</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {skills.filter(skill => skill.level >= 80).length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Expert Skills</h3>
          <p className="text-xs text-gray-500 mt-1">80% or higher</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{skillCategories.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Categories</h3>
          <p className="text-xs text-gray-500 mt-1">Skill domains</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-200/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            {skillCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Skills List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Portfolio</h3>
        <div className="space-y-4">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 hover:border-indigo-300">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900">{skill.name}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSkillLevelColor(skill.level)}`}>
                      {getSkillLevelText(skill.level)}
                    </span>
                    <span className="text-xs text-gray-500">{skill.category}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>{skill.experience}</span>
                    <span>{skill.projects} projects</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-xs font-medium text-gray-700">{skill.level}%</span>
                  </div>
                </div>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Bar Chart */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Proficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredSkills}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="level" fill="#6366f1" name="Proficiency %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar Chart */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="skill" stroke="#9ca3af" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
              <Radar name="Level" dataKey="level" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Skill</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., React, Python, SQL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {skillCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level: {newSkill.level}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addSkill}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillAnalyzer
