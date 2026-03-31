import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Star,
  GitBranch,
  Calendar,
  ExternalLink,
  Download,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ResumeAnalyzer = () => {
  const { darkMode } = useTheme();
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please enter your resume text');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume_text: resumeText,
          target_role: targetRole
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.data);
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const jobRoles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Data Scientist',
    'Machine Learning Engineer',
    'DevOps Engineer',
    'Product Manager',
    'UI/UX Designer'
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl mb-4"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              AI Resume Analyzer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Get instant AI-powered insights about your resume
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Resume Input
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Role
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  >
                    {jobRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resume Text
                  </label>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here..."
                    className="w-full h-64 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3"
                  >
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {error}
                    </p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !resumeText.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      <span>Analyzing with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      <span>Analyze Resume</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {analysis && (
                <>
                  {/* Overall Score */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Job Fit Score
                    </h3>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {analysis.job_fit_score || 0}%
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${analysis.job_fit_score || 0}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                      Extracted Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.skills?.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Experience Level */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                      Experience Level
                    </h3>
                    <div className="text-2xl font-bold text-purple-600">
                      {analysis.experience_level || 'Not Assessed'}
                    </div>
                  </motion.div>

                  {/* Missing Skills */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                      Skills to Develop
                    </h3>
                    <div className="space-y-2">
                      {analysis.missing_skills?.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                          <span className="text-orange-800 dark:text-orange-200">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-600" />
                      Recommendations
                    </h3>
                    <div className="space-y-3">
                      {analysis.recommendations?.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl"
                        >
                          <CheckCircle className="w-5 h-5 mr-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-yellow-800 dark:text-yellow-200">{rec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
