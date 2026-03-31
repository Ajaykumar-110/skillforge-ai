import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Star, 
  GitBranch, 
  ExternalLink, 
  Eye, 
  Code, 
  Calendar, 
  TrendingUp,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const GitHubProjects = () => {
  const { darkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(['python', 'javascript', 'react']);

  const skillOptions = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'devops', label: 'DevOps' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Azure' },
    { value: 'gcp', label: 'Google Cloud' }
  ];

  const fetchProjects = async () => {
    setLoading(true);
    setError('');

    try {
      const skillsQuery = selectedSkills.join(',');
      const response = await fetch(`http://localhost:5000/api/github-projects?skills=${skillsQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setProjects(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch projects');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedSkills]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleRefresh = () => {
    fetchProjects();
  };

  const handleViewOnGitHub = (url) => {
    window.open(url, '_blank');
  };

  const formatStars = (stars) => {
    if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`;
    } else if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`;
    }
    return stars.toString();
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
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl shadow-xl mb-4"
            >
              <Github className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              GitHub Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover trending repositories based on your skills
            </p>
          </div>

          {/* Skills Filter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-600" />
                Filter by Skills
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRefresh}
                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <motion.button
                  key={skill.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSkillToggle(skill.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedSkills.includes(skill.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {skill.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading GitHub projects...</p>
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
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-center">
                <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your skill filters or check back later for new projects.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Project Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Github className="w-5 h-5 mr-2 text-blue-600" />
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {project.description || 'No description available'}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <div className="text-right">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                            <Star className="w-4 h-4 mr-1" />
                            {formatStars(project.stars)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <GitBranch className="w-4 h-4 mr-1" />
                            {project.forks || 0}
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleViewOnGitHub(project.html_url)}
                          className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Language</div>
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                          {project.language || 'Unknown'}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Updated</div>
                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                          {formatDate(project.updated_at)}
                        </div>
                      </div>
                    </div>

                    {/* Topics */}
                    {project.topics && project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.topics.slice(0, 5).map((topic, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium"
                          >
                            {topic}
                          </motion.span>
                        ))}
                        {project.topics.length > 5 && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium"
                          >
                            +{project.topics.length - 5}
                          </motion.span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GitHubProjects;
