import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const EnhancedChatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your AI career assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiService.askChatbot(currentInput, 'Career guidance and skill development');
      
      if (response.success) {
        const botMessage = { type: 'bot', text: response.reply };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage = { type: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chatbot API error:', error);
      setUsingFallback(true);
      
      // Fallback to mock responses when API fails
      const fallbackResponses = [
        "I'm here to help with your career development! Based on your question, I'd recommend focusing on building practical skills and creating a strong portfolio.",
        "That's a great question! For career growth, I suggest staying updated with industry trends and continuously learning new technologies.",
        "I understand you're looking for guidance. Consider networking with professionals in your field and seeking mentorship opportunities.",
        "Great question! The key to career success is balancing technical skills with soft skills like communication and problem-solving.",
        "I'd be happy to help! Remember that career growth is a journey - focus on consistent learning and building meaningful projects."
      ];
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      const botMessage = { type: 'bot', text: randomResponse };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      { type: 'bot', text: 'Hello! I\'m your AI career assistant. How can I help you today?' }
    ]);
    setUsingFallback(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">AI Career Chatbot</h1>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${usingFallback ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <span className="text-sm text-gray-600">
              {usingFallback ? 'Demo Mode' : 'AI Assistant'}
            </span>
          </div>
        </div>
        
        <div className="card">
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field flex-1"
              placeholder="Ask about careers, skills, or learning..."
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <button 
              onClick={() => setInput('What skills do I need for a Full Stack Developer role?')}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
            >
              Full Stack Skills
            </button>
            <button 
              onClick={() => setInput('How do I prepare for a technical interview?')}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
            >
              Interview Prep
            </button>
            <button 
              onClick={() => setInput('What is the job market like for Python developers?')}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
            >
              Job Market
            </button>
            {usingFallback && (
              <button 
                onClick={resetChat}
                className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200"
              >
                Reset Chat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedChatbot;
