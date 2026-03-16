import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Star, ExternalLink, Play, DollarSign, Award } from 'lucide-react';

const CourseCard = ({ course, onClick, onEnroll, onSave, onShare }) => {
  const handleCardClick = () => {
    if (onClick) onClick(course);
    else if (course.url) window.open(course.url, '_blank');
  };

  const handleEnroll = (e) => {
    e.stopPropagation();
    if (onEnroll) onEnroll(course);
    else if (course.url) window.open(course.url, '_blank');
    else {
      // Fallback to Udemy search
      const query = encodeURIComponent(course.title);
      window.open(`https://www.udemy.com/courses/search/?q=${query}`, '_blank');
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (onSave) onSave(course);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) onShare(course);
    else if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `Check out this course: ${course.title} by ${course.provider}`,
        url: course.url || window.location.href
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

  const getProviderColor = (provider) => {
    switch (provider?.toLowerCase()) {
      case 'udemy':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'coursera':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'edx':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={handleCardClick}
    >
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="flex items-center justify-center h-full">
                  <BookOpen class="w-16 h-16 text-white/50" />
                </div>
              `;
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen className="w-16 h-16 text-white/50" />
          </div>
        )}
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProviderColor(course.provider)}`}>
            {course.provider}
          </span>
          {course.difficulty && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          )}
        </div>

        {/* Match Score */}
        {course.matchScore && (
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                {course.matchScore}% match
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        {course.instructor && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            By {course.instructor}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{course.rating || '4.5'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.students ? `${course.students.toLocaleString()}` : '1,234'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration || 'Self-paced'}</span>
          </div>
        </div>

        {/* Skills */}
        {course.skills && course.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {course.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                  +{course.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {course.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {course.description}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {course.price || 'Free'}
            </span>
            {course.originalPrice && course.originalPrice !== course.price && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {course.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Save Course"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Share Course"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
            </button>
            <button
              onClick={handleEnroll}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors text-sm font-medium flex items-center space-x-1"
            >
              <Play className="w-3 h-3" />
              <span>Enroll Now</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
