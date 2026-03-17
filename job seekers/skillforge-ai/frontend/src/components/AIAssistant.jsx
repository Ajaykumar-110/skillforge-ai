import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Briefcase, BookOpen, Code, Award, TrendingUp, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI Career Assistant. I can help you with job roles, skills, courses, projects, and interview tips. You can type or use voice input. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const quickActions = [
    { icon: Briefcase, label: 'Job Roles', query: 'What are the best job roles for software developers?' },
    { icon: BookOpen, label: 'Skills to Learn', query: 'What skills should I learn for web development?' },
    { icon: Code, label: 'Projects', query: 'Suggest some beginner-friendly projects' },
    { icon: Award, label: 'Interview Tips', query: 'How can I prepare for technical interviews?' }
  ];

  // Check for speech recognition support
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = (userQuery) => {
    const responses = {
      'job': 'Based on your profile, I recommend these roles: Full Stack Developer, Frontend Developer, Backend Developer, DevOps Engineer, and Cloud Architect. Each offers great growth opportunities.',
      'skills': 'Essential skills for tech careers: JavaScript/Python, React/Vue, Node.js, Git, AWS/Cloud, SQL/NoSQL, and problem-solving. Focus on 2-3 areas first.',
      'courses': 'Top courses I recommend: CS50 (Harvard), The Complete Web Developer (Udemy), AWS Certified Solutions Architect, and Google UX Design Certificate.',
      'projects': 'Great project ideas: E-commerce website, Weather app, Task manager, Blog platform, Portfolio site, and API integration projects. Start small and add features.',
      'interview': 'Interview preparation tips: Practice coding challenges daily, study system design, prepare STAR method for behavioral questions, research the company, and prepare thoughtful questions to ask.',
      'default': 'I can help with job roles, skills, courses, projects, and interview preparation. What specific area would you like to explore?'
    };

    const query = userQuery.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (query.includes(key)) return response;
    }
    return responses.default;
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!voiceSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(input);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Auto-speak bot response
      speakText(response);
    }, 1000);
  };

  const toggleVoiceOutput = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (messages.length > 0) {
      const lastBotMessage = messages.filter(m => m.type === 'bot').pop();
      if (lastBotMessage) {
        speakText(lastBotMessage.content);
      }
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Career Assistant
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Career guidance • Voice Chat • Skills • Courses • Projects • Interview tips
            </p>
          </div>
        </div>
        {voiceSupported && (
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleVoiceOutput}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isSpeaking 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={isSpeaking ? 'Stop speaking' : 'Speak last response'}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => setInput(action.query)}
            className="flex flex-col items-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
          >
            <action.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 h-96 overflow-y-auto mb-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-start space-x-3 ${message.type === 'user' ? 'justify-end' : ''}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-xs md:max-w-md p-3 rounded-xl ${message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'}`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isListening ? "Listening..." : "Ask about careers, skills, courses, projects, or interviews..."}
          className={`flex-1 px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
            isListening ? 'border-red-300 dark:border-red-600 animate-pulse' : 'border-gray-300 dark:border-gray-600'
          }`}
          disabled={isListening}
        />
        
        {voiceSupported && (
          <button
            onClick={toggleListening}
            className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
              isListening 
                ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        )}
        
        <button
          onClick={handleSend}
          disabled={!input.trim() || isListening}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          <span>Send</span>
        </button>
      </div>

      {!voiceSupported && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Voice features are not supported in your browser. Please use Chrome, Edge, or Safari for voice input.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
