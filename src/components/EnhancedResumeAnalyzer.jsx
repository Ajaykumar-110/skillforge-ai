import React, { useState } from 'react';
import apiService from '../services/api';

const EnhancedResumeAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Please select a PDF or DOCX file');
      }
    }
  };

  const analyzeResume = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const result = await apiService.analyzeResume(selectedFile);
      
      if (result.success) {
        setAnalysis(result.analysis);
      } else {
        setError(result.error || 'Failed to analyze resume');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Resume Analyzer</h1>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Powered by NLP AI</span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Resume</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-gray-600 mb-4">
              Upload your resume for AI-powered analysis
            </p>
            
            <input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.docx,.doc"
              className="hidden"
              id="resume-upload"
            />
            
            <label
              htmlFor="resume-upload"
              className="btn-primary cursor-pointer inline-block"
            >
              Choose File
            </label>
            
            {selectedFile && (
              <div className="mt-4 text-sm text-gray-600">
                Selected: {selectedFile.name}
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, DOCX, DOC
            </p>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="mt-4 flex justify-center">
            <button
              onClick={analyzeResume}
              disabled={!selectedFile || isAnalyzing}
              className="btn-primary disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Overall Assessment</h3>
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(analysis.resume_score)}`}>
                  {analysis.resume_score}
                </div>
                <div className={`text-lg font-medium ${getScoreColor(analysis.resume_score)} mt-2`}>
                  {getScoreLabel(analysis.resume_score)}
                </div>
                <div className="text-gray-600 mt-2">Resume Score</div>
              </div>
            </div>

            {/* Skills Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Technical Skills ({analysis.skills_analysis.technical_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills_analysis.technical_skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Soft Skills ({analysis.skills_analysis.soft_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills_analysis.soft_skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {analysis.skills_analysis.experience_years} years
                </div>
                <p className="text-gray-600">Total professional experience</p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                <div className="space-y-2">
                  {analysis.skills_analysis.education.map((edu, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-700">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Match Analysis */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Market Match</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">
                    {analysis.job_match_analysis.match_percentage}%
                  </div>
                  <div className="text-sm text-primary-700">Match Rate</div>
                </div>
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <div className="text-2xl font-bold text-success-600">
                    {analysis.job_match_analysis.matched_skills.length}
                  </div>
                  <div className="text-sm text-success-700">Matched Skills</div>
                </div>
                <div className="text-center p-4 bg-warning-50 rounded-lg">
                  <div className="text-2xl font-bold text-warning-600">
                    {analysis.job_match_analysis.missing_skills.length}
                  </div>
                  <div className="text-sm text-warning-700">Skills to Learn</div>
                </div>
              </div>

              {/* Recommendations */}
              {analysis.job_match_analysis.recommendations.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
                  <ul className="space-y-1">
                    {analysis.job_match_analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary-500 mt-1">•</span>
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedResumeAnalyzer;
