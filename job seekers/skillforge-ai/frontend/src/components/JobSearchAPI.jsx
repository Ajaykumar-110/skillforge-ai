import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Search,
  RefreshCw,
  AlertCircle,
  Building,
  Clock,
  Users
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const JobSearch = () => {
  const { darkMode } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchRole, setSearchRole] = useState('data-analyst');
  const [searchLocation, setSearchLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const jobRoles = [
    { value: 'data-analyst', label: 'Data Analyst' },
    { value: 'full-stack-developer', label: 'Full Stack Developer' },
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'machine-learning-engineer', label: 'Machine Learning Engineer' },
    { value: 'devops-engineer', label: 'DevOps Engineer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'ui-designer', label: 'UI/UX Designer' },
    { value: 'data-scientist', label: 'Data Scientist' }
  ];

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    setIsSearching(true);

    try {
      const params = new URLSearchParams();
      if (searchRole) params.set('role', searchRole);
      if (searchLocation) params.set('location', searchLocation);
      
      const response = await fetch(`http://localhost:5000/api/jobs?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setJobs(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch jobs');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchRole, searchLocation]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleApply = (url) => {
    window.open(url, '_blank');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-4"
            >
              <Briefcase className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Job Search
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Find your dream job in the AI industry
            </p>
          </div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-700"
          >
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Role
                  </label>
                  <select
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  >
                    {jobRoles.map(role => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g., San Francisco, CA or Remote"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    &nbsp;
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSearching}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        <span>Searching Jobs...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        <span>Search Jobs</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Results */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Searching for jobs...</p>
              </div>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </p>
              </div>
            </motion.div>
          ) : jobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-center">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Found {jobs.length} Jobs
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchJobs}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Job Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <Building className="w-5 h-5 mr-2 text-blue-600" />
                            {job.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleApply(job.apply_url)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
                        >
                          Apply Now
                        </motion.button>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {job.description}
                      </p>
                      
                      {/* Skills Required */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-purple-600" />
                          Skills Required
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills_required?.map((skill, skillIndex) => (
                            <motion.span
                              key={skillIndex}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: skillIndex * 0.05 }}
                              className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JobSearch;
