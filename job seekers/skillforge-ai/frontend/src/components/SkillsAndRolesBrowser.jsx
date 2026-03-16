import React, { useState, useMemo } from 'react';
import { 
  Search,
  Filter,
  Code,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Brain,
  BarChart,
  Briefcase,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';
import { skillsData, jobRolesData, skillCategories, jobCategories, experienceLevels, demandLevels, growthLevels } from '../data/skillsAndRoles';

const SkillsAndRolesBrowser = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDemand, setSelectedDemand] = useState('all');
  const [selectedGrowth, setSelectedGrowth] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      'Programming Languages': Code,
      'Web Development': Code,
      'Cloud & DevOps': Cloud,
      'Databases': Database,
      'AI & Machine Learning': Brain,
      'Mobile Development': Smartphone,
      'Cybersecurity': Shield,
      'Blockchain & Web3': Brain,
      'Other Technologies': Code,
      'Architecture': Briefcase
    };
    const Icon = icons[category] || Code;
    return <Icon className="w-4 h-4" />;
  };

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skillsData.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel;
      const matchesDemand = selectedDemand === 'all' || skill.demand === selectedDemand;
      return matchesSearch && matchesCategory && matchesLevel && matchesDemand;
    });
  }, [searchTerm, selectedCategory, selectedLevel, selectedDemand]);

  // Filter job roles
  const filteredJobs = useMemo(() => {
    return jobRolesData.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || job.level === selectedLevel;
      const matchesDemand = selectedDemand === 'all' || job.demand === selectedDemand;
      const matchesGrowth = selectedGrowth === 'all' || job.growth === selectedGrowth;
      return matchesSearch && matchesCategory && matchesLevel && matchesDemand && matchesGrowth;
    });
  }, [searchTerm, selectedCategory, selectedLevel, selectedDemand, selectedGrowth]);

  // Group skills by category
  const skillsByCategory = useMemo(() => {
    const grouped = {};
    filteredSkills.forEach(skill => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  }, [filteredSkills]);

  // Group jobs by category
  const jobsByCategory = useMemo(() => {
    const grouped = {};
    filteredJobs.forEach(job => {
      if (!grouped[job.category]) {
        grouped[job.category] = [];
      }
      grouped[job.category].push(job);
    });
    return grouped;
  }, [filteredJobs]);

  // Toggle category expansion
  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Get level color
  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-orange-100 text-orange-800',
      'Senior': 'bg-red-100 text-red-800',
      'Executive': 'bg-purple-100 text-purple-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  // Get demand color
  const getDemandColor = (demand) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-blue-100 text-blue-800',
      'High': 'bg-orange-100 text-orange-800',
      'Very High': 'bg-red-100 text-red-800'
    };
    return colors[demand] || 'bg-gray-100 text-gray-800';
  };

  // Get growth color
  const getGrowthColor = (growth) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-blue-100 text-blue-800',
      'High': 'bg-green-100 text-green-800',
      'Very High': 'bg-emerald-100 text-emerald-800'
    };
    return colors[growth] || 'bg-gray-100 text-gray-800';
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedDemand('all');
    setSelectedGrowth('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Job Roles Explorer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore 100+ skills and 100+ job roles with detailed insights and market data
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'skills' ? 'skills' : 'job roles'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters ? <ChevronDown className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
            </button>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedDemand !== 'all' || selectedGrowth !== 'all') && (
              <button
                onClick={clearFilters}
                className="btn btn-secondary flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {(activeTab === 'skills' ? skillCategories : jobCategories).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Levels</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Demand
                </label>
                <select
                  value={selectedDemand}
                  onChange={(e) => setSelectedDemand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Demand Levels</option>
                  {demandLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {activeTab === 'jobs' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Growth
                  </label>
                  <select
                    value={selectedGrowth}
                    onChange={(e) => setSelectedGrowth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Growth Levels</option>
                    {growthLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('skills')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'skills'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Skills ({skillsData.length})
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Job Roles ({jobRolesData.length})
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {activeTab === 'skills' ? filteredSkills.length : filteredJobs.length} of {activeTab === 'skills' ? skillsData.length : jobRolesData.length} {activeTab === 'skills' ? 'skills' : 'job roles'}
          </p>
        </div>

        {/* Content */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(category)}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({skills.length} skills)
                      </span>
                    </div>
                    {expandedCategories.has(category) ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {expandedCategories.has(category) && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                      {skills.map(skill => (
                        <div key={skill.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {skill.name}
                            </h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Demand</span>
                              <span className={`px-2 py-1 text-xs rounded ${getDemandColor(skill.demand)}`}>
                                {skill.demand}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Avg Salary</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                ${skill.avgSalary.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {Object.entries(jobsByCategory).map(([category, jobs]) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({jobs.length} roles)
                      </span>
                    </div>
                    {expandedCategories.has(category) ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {expandedCategories.has(category) && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                      {jobs.map(job => (
                        <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {job.title}
                            </h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(job.level)}`}>
                              {job.level}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Salary</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                ${job.avgSalary.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Demand</span>
                              <span className={`px-2 py-1 text-xs rounded ${getDemandColor(job.demand)}`}>
                                {job.demand}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Growth</span>
                              <span className={`px-2 py-1 text-xs rounded ${getGrowthColor(job.growth)}`}>
                                {job.growth}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {((activeTab === 'skills' && filteredSkills.length === 0) || (activeTab === 'jobs' && filteredJobs.length === 0)) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No {activeTab === 'skills' ? 'skills' : 'job roles'} found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsAndRolesBrowser;
