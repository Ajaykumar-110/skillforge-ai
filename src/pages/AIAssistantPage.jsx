import React from 'react';
import AIAssistant from '../components/AIAssistant';

const AIAssistantPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Career Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get instant career guidance, skill recommendations, course suggestions, project ideas, and interview tips.
          </p>
        </div>
        
        <AIAssistant />
      </div>
    </div>
  );
};

export default AIAssistantPage;
