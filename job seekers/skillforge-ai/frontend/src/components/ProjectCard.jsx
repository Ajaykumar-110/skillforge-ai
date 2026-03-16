import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Users, GitBranch, ExternalLink, Code, Clock, Eye } from 'lucide-react';

const ProjectCard = ({ project, onClick, onView, onSave, onShare }) => {
  const handleCardClick = () => {
    if (onClick) onClick(project);
    else if (project.url) window.open(project.url, '_blank');
  };

  const handleViewCode = (e) => {
    e.stopPropagation();
    if (onView) onView(project);
    else if (project.url) window.open(project.url, '_blank');
    else if (project.html_url) window.open(project.html_url, '_blank');
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (onSave) onSave(project);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) onShare(project);
    else if (navigator.share) {
      navigator.share({
        title: project.name || project.title,
        text: `Check out this project: ${project.name || project.title}`,
        url: project.url || project.html_url || window.location.href
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Python': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Java': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'C++': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'C#': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Go': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      'Rust': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Ruby': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'PHP': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Swift': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Kotlin': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-1">
                {project.name || project.title}
              </h3>
              {project.fullName && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project.fullName}
                </p>
              )}
            </div>
          </div>
          
          {/* Language Badge */}
          {project.language && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(project.language)}`}>
              {project.language}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description || 'No description available'}
        </p>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{formatNumber(project.stargazers_count || project.stars || 0)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitBranch className="w-4 h-4" />
            <span>{formatNumber(project.forks_count || project.forks || 0)}</span>
          </div>
          {project.watchers_count && (
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(project.watchers_count)}</span>
            </div>
          )}
        </div>

        {/* Topics/Tags */}
        {project.topics && project.topics.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.topics.slice(0, 3).map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
              {project.topics.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                  +{project.topics.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {project.tech && project.tech.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                  +{project.tech.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Difficulty and Duration */}
        {(project.difficulty || project.duration) && (
          <div className="flex items-center space-x-3 mb-4 text-sm">
            {project.difficulty && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty}
              </span>
            )}
            {project.duration && (
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{project.duration}</span>
              </div>
            )}
          </div>
        )}

        {/* Suggested Use */}
        {project.suggestedUse && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <span className="font-medium">Suggested Use:</span> {project.suggestedUse}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Github className="w-3 h-3" />
            <span>Updated {project.updated_at ? new Date(project.updated_at).toLocaleDateString() : 'Recently'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Save Project"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Share Project"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
            </button>
            <button
              onClick={handleViewCode}
              className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-lg hover:from-gray-700 hover:to-gray-500 transition-colors text-sm font-medium flex items-center space-x-1"
            >
              <Code className="w-3 h-3" />
              <span>View Code</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
