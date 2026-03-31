import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, Building, Users } from 'lucide-react';

const JobCard = ({ job, onClick, onApply, onSave, onShare }) => {
  const handleCardClick = () => {
    if (onClick) onClick(job);
    else if (job.url) window.open(job.url, '_blank');
  };

  const handleApply = (e) => {
    e.stopPropagation();
    if (onApply) onApply(job);
    else if (job.applyUrl) window.open(job.applyUrl, '_blank');
    else if (job.url) window.open(job.url, '_blank');
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (onSave) onSave(job);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) onShare(job);
    else if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: job.url || window.location.href
      });
    }
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              {job.company?.charAt(0) || 'J'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {job.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {job.company}
              </p>
            </div>
          </div>
          {job.match && (
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {job.match}%
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">match</p>
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{job.location || 'Remote'}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">{job.salary || 'Competitive'}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{job.type || 'Full-time'}</span>
          </div>
          {job.experience && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">{job.experience}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                  +{job.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {job.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {job.description}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{job.postedAt || 'Recently'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Save Job"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Share Job"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors text-sm font-medium"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
