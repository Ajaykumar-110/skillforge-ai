import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  Download, 
  Settings,
  User,
  Bot,
  Clock,
  Star,
  TrendingUp,
  BookOpen,
  Target,
  Briefcase,
  Code,
  Palette,
  Brain,
  Globe,
  Award,
  Zap,
  FileText,
  Video,
  Phone,
  Mail,
  Share2,
  Trash2,
  Plus
} from 'lucide-react';
import apiService from '../services/api';

const EnhancedChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: '👋 Welcome to SkillForge AI Assistant! I\'m your comprehensive career guide. I can help you with:\n\n🎯 Career guidance & job search\n📚 Learning recommendations\n💼 Interview preparation\n📊 Resume building\n🚀 Skill development\n\nHow can I assist you today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const categories = [
    { id: 'general', name: 'General', icon: MessageCircle, color: 'bg-blue-500' },
    { id: 'career', name: 'Career', icon: Briefcase, color: 'bg-green-500' },
    { id: 'skills', name: 'Skills', icon: Code, color: 'bg-purple-500' },
    { id: 'interview', name: 'Interview', icon: Target, color: 'bg-red-500' },
    { id: 'learning', name: 'Learning', icon: BookOpen, color: 'bg-yellow-500' },
    { id: 'resume', name: 'Resume', icon: FileText, color: 'bg-indigo-500' }
  ];

  const quickQuestions = {
    general: [
      'What is SkillForge AI platform?',
      'How do I start my career journey?',
      'What are the top tech skills in 2024?',
      'How to stay motivated while learning?'
    ],
    career: [
      'What career path suits my personality?',
      'How to switch careers successfully?',
      'What are the highest paying tech jobs?',
      'How to negotiate salary effectively?'
    ],
    skills: [
      'What programming language should I learn first?',
      'How to improve problem-solving skills?',
      'Best way to learn new technologies?',
      'How to build a strong portfolio?'
    ],
    interview: [
      'Common interview questions for developers?',
      'How to prepare for technical interviews?',
      'Behavioral interview tips?',
      'How to handle salary negotiations?'
    ],
    learning: [
      'Best online learning platforms?',
      'How to create a study schedule?',
      'Free vs paid courses - what to choose?',
      'How to stay updated with industry trends?'
    ],
    resume: [
      'How to write a compelling resume?',
      'Resume mistakes to avoid?',
      'How to tailor resume for each job?',
      'Cover letter best practices?'
    ]
  };

  const comprehensiveFallbackResponses = [
    {
      category: 'career',
      keywords: ['career', 'job', 'profession', 'work'],
      response: '🎯 Career Guidance:\n\nBased on current market trends, I recommend:\n• Focus on in-demand technical skills\n• Build a strong portfolio\n• Network with industry professionals\n• Consider certifications from top platforms\n\nWhat specific career field interests you?'
    },
    {
      category: 'skills',
      keywords: ['skills', 'learn', 'programming', 'technology'],
      response: '💻 Skill Development:\n\nTop skills to learn in 2024:\n• AI/ML - TensorFlow, PyTorch\n• Web Dev - React, Node.js, TypeScript\n• Cloud - AWS, Azure, GCP\n• Mobile - React Native, Flutter\n\nWhich skill area would you like to explore?'
    },
    {
      category: 'interview',
      keywords: ['interview', 'prepare', 'questions'],
      response: '🎤 Interview Preparation:\n\nKey preparation steps:\n• Research the company thoroughly\n• Practice common technical questions\n• Prepare STAR method responses\n• Have thoughtful questions for interviewer\n\nWould you like specific interview questions?'
    },
    {
      category: 'learning',
      keywords: ['learn', 'course', 'education', 'study'],
      response: '📚 Learning Recommendations:\n\nTop learning resources:\n• Google Career Certificates\n• IBM Professional Certificates\n• Microsoft Learn\n• Coursera Specializations\n• Udemy Bootcamps\n\nWhat subject do you want to learn?'
    },
    {
      category: 'resume',
      keywords: ['resume', 'cv', 'cover letter'],
      response: '📄 Resume Building:\n\nBest practices:\n• Quantify achievements with numbers\n• Use action verbs\n• Tailor to job description\n• Include relevant keywords\n• Keep it 1-2 pages max\n\nNeed help with a specific section?'
    },
    {
      category: 'general',
      keywords: [],
      response: '🤖 AI Assistant:\n\nI\'m here to help with your career journey! I can assist with:\n\n📊 Career planning and guidance\n🎓 Skill development recommendations\n💼 Job search strategies\n📝 Resume and cover letter help\n🎯 Interview preparation\n📈 Industry insights\n\nWhat specific area would you like help with?'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSmartResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    for (const category of comprehensiveFallbackResponses) {
      const hasKeyword = category.keywords.some(keyword => 
        lowerInput.includes(keyword)
      );
      
      if (hasKeyword || category.category === selectedCategory) {
        return category.response;
      }
    }
    
    return comprehensiveFallbackResponses[5].response; // General response
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      type: 'user', 
      text: input,
      timestamp: new Date().toISOString(),
      category: selectedCategory
    };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await apiService.sendChatMessage('user123', {
        message: currentInput,
        category: selectedCategory,
        context: messages.slice(-5) // Last 5 messages for context
      });
      
      if (response.success) {
        const botMessage = { 
          type: 'bot', 
          text: response.reply,
          timestamp: new Date().toISOString(),
          category: selectedCategory
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      console.error('Chatbot API error:', error);
      setUsingFallback(true);
      
      const smartResponse = getSmartResponse(currentInput);
      const botMessage = { 
        type: 'bot', 
        text: smartResponse,
        timestamp: new Date().toISOString(),
        category: selectedCategory,
        isFallback: true
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // Voice recording implementation
    setTimeout(() => {
      setIsRecording(false);
      setInput('Voice input: Tell me about career opportunities in tech');
    }, 2000);
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
  };

  const uploadFile = () => {
    // File upload implementation
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setInput(`I've uploaded my resume: ${file.name}. Please review it.`);
      }
    };
    input.click();
  };

  const resetChat = () => {
    setMessages([
      { 
        type: 'bot', 
        text: '👋 Welcome back! How can I help you with your career journey today?' 
      }
    ]);
    setUsingFallback(false);
    setSelectedCategory('general');
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type.toUpperCase()}: ${msg.text}\n`
    ).join('\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.txt';
    a.click();
  };

  const clearChat = () => {
    setMessages([
      { 
        type: 'bot', 
        text: 'Chat cleared! How can I help you?' 
      }
    ]);
  };

  const shareChat = () => {
    const shareText = messages.slice(-3).map(msg => 
      `${msg.type}: ${msg.text}`
    ).join('\n\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'SkillForge AI Chat',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  SkillForge AI Assistant
                </h1>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${usingFallback ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {usingFallback ? 'Demo Mode' : 'AI Powered'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
              <button
                onClick={exportChat}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Export chat"
              >
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={shareChat}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Share chat"
              >
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={clearChat}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Clear chat"
              >
                <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Category Selection */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="h-96 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-lg px-4 py-3 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <div className="flex items-start space-x-2">
                    {msg.type === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-line">{msg.text}</div>
                      {msg.isFallback && (
                        <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                          ⚠️ AI service unavailable - using smart responses
                        </div>
                      )}
                      {msg.timestamp && (
                        <div className="text-xs opacity-60 mt-2">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder={`Ask about ${selectedCategory}...`}
              disabled={isLoading}
            />
            
            <button
              onClick={uploadFile}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              title="Upload file"
            >
              <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <button
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              className={`p-3 rounded-lg ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title="Voice input"
            >
              {isRecording ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quick Questions ({selectedCategory})
                </h3>
                <button
                  onClick={() => setShowQuickActions(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Hide
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {quickQuestions[selectedCategory].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {!showQuickActions && (
            <button
              onClick={() => setShowQuickActions(true)}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Show quick questions
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedChatbot;
