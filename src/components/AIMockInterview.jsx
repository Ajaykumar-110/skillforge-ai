import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  Award, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Brain,
  Star,
  Volume2,
  User,
  ArrowRight
} from 'lucide-react';

const AIMockInterview = () => {
  const [user, setUser] = useState(null);
  const [interviewState, setInterviewState] = useState('setup'); // setup, introduction, technical, problem, behavioral, feedback, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setSelectedRole(parsedUser.targetJobRole || 'Full Stack Developer');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isRecording && isVoiceMode) {
      startVoiceRecording();
    } else {
      stopVoiceRecording();
    }
  }, [isRecording, isVoiceMode]);

  const questionBanks = {
    'Frontend Developer': {
      introduction: [
        {
          question: "Tell me about yourself and your experience with frontend development.",
          category: "introduction",
          evaluation: "Assesses communication skills and background"
        }
      ],
      technical: [
        {
          question: "What is the Virtual DOM in React and how does it improve performance?",
          category: "technical",
          evaluation: "Tests React knowledge and understanding of performance concepts"
        },
        {
          question: "Explain the difference between var, let, and const in JavaScript.",
          category: "technical",
          evaluation: "Tests JavaScript fundamentals"
        },
        {
          question: "What is event delegation in JavaScript and why is it useful?",
          category: "technical",
          evaluation: "Tests understanding of DOM manipulation and performance"
        }
      ],
      problem: [
        {
          question: "How would you optimize a slow React application that's taking 5 seconds to load?",
          category: "problem-solving",
          evaluation: "Tests performance optimization and problem-solving approach"
        }
      ],
      behavioral: [
        {
          question: "Tell me about a challenging frontend project you worked on and how you overcame the difficulties.",
          category: "behavioral",
          evaluation: "Assesses problem-solving and project experience"
        }
      ]
    },
    'Data Scientist': {
      introduction: [
        {
          question: "Tell me about your background in data science and what excites you about this field.",
          category: "introduction",
          evaluation: "Assesses passion and background"
        }
      ],
      technical: [
        {
          question: "What is the difference between supervised and unsupervised learning?",
          category: "technical",
          evaluation: "Tests ML fundamentals"
        },
        {
          question: "Explain overfitting and underfitting in machine learning models.",
          category: "technical",
          evaluation: "Tests understanding of model performance issues"
        },
        {
          question: "What is cross-validation and why is it important?",
          category: "technical",
          evaluation: "Tests model evaluation knowledge"
        }
      ],
      problem: [
        {
          question: "For an e-commerce website, how would you design a product recommendation system?",
          category: "problem-solving",
          evaluation: "Tests system design and practical application"
        }
      ],
      behavioral: [
        {
          question: "Describe a time when you had to explain complex data insights to non-technical stakeholders.",
          category: "behavioral",
          evaluation: "Assesses communication and stakeholder management"
        }
      ]
    },
    'Machine Learning Engineer': {
      introduction: [
        {
          question: "Tell me about your experience in machine learning engineering and your career goals.",
          category: "introduction",
          evaluation: "Assesses experience and ambition"
        }
      ],
      technical: [
        {
          question: "Explain the difference between batch normalization and layer normalization.",
          category: "technical",
          evaluation: "Tests deep learning knowledge"
        },
        {
          question: "What is the difference between online and offline learning?",
          category: "technical",
          evaluation: "Tests ML system design concepts"
        },
        {
          question: "How do you handle concept drift in production ML models?",
          category: "technical",
          evaluation: "Tests production ML experience"
        }
      ],
      problem: [
        {
          question: "Design an MLOps pipeline for a real-time fraud detection system.",
          category: "problem-solving",
          evaluation: "Tests system design and MLOps knowledge"
        }
      ],
      behavioral: [
        {
          question: "Tell me about a time when a model you deployed failed in production. How did you handle it?",
          category: "behavioral",
          evaluation: "Tests crisis management and debugging skills"
        }
      ]
    },
    'DevOps Engineer': {
      introduction: [
        {
          question: "Tell me about your DevOps experience and what interests you about this field.",
          category: "introduction",
          evaluation: "Assesses background and motivation"
        }
      ],
      technical: [
        {
          question: "Explain the difference between Docker containers and virtual machines.",
          category: "technical",
          evaluation: "Tests containerization knowledge"
        },
        {
          question: "What is a Kubernetes pod and how does it differ from a deployment?",
          category: "technical",
          evaluation: "Tests K8s understanding"
        },
        {
          question: "Explain the concept of Infrastructure as Code.",
          category: "technical",
          evaluation: "Tests IaC principles"
        }
      ],
      problem: [
        {
          question: "How would you set up a CI/CD pipeline for a microservices application?",
          category: "problem-solving",
          evaluation: "Tests DevOps pipeline design"
        }
      ],
      behavioral: [
        {
          question: "Describe a time when you had to implement a critical fix under pressure.",
          category: "behavioral",
          evaluation: "Tests performance under pressure"
        }
      ]
    },
    'Full Stack Developer': {
      introduction: [
        {
          question: "Tell me about your full-stack development experience and your preferred tech stack.",
          category: "introduction",
          evaluation: "Assesses overall experience and tech preferences"
        }
      ],
      technical: [
        {
          question: "Explain REST vs GraphQL and when you would use each.",
          category: "technical",
          evaluation: "Tests API design knowledge"
        },
        {
          question: "What is database indexing and how does it improve query performance?",
          category: "technical",
          evaluation: "Tests database knowledge"
        },
        {
          question: "Explain JWT authentication and how it works in web applications.",
          category: "technical",
          evaluation: "Tests security and authentication knowledge"
        }
      ],
      problem: [
        {
          question: "Design a scalable user authentication system for a SaaS application.",
          category: "problem-solving",
          evaluation: "Tests system design and security knowledge"
        }
      ],
      behavioral: [
        {
          question: "Tell me about a full-stack project you're most proud of and why.",
          category: "behavioral",
          evaluation: "Assesses project ownership and technical depth"
        }
      ]
    }
  };

  const startInterview = () => {
    const roleQuestions = questionBanks[selectedRole] || questionBanks['Full Stack Developer'];
    
    let selectedQuestions = [];
    
    // Select questions based on difficulty
    const questionCount = difficulty === 'beginner' ? 3 : difficulty === 'intermediate' ? 4 : 5;
    
    selectedQuestions = [
      roleQuestions.introduction[0],
      ...roleQuestions.technical.slice(0, questionCount),
      roleQuestions.problem[0],
      roleQuestions.behavioral[0]
    ];
    
    setInterviewQuestions(selectedQuestions);
    setInterviewState('introduction');
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeElapsed(0);
    startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const submitAnswer = () => {
    if (!currentAnswer.trim()) return;
    
    const newAnswer = {
      question: interviewQuestions[currentQuestion].question,
      answer: currentAnswer,
      category: interviewQuestions[currentQuestion].category,
      timeSpent: timeElapsed
    };
    
    setAnswers([...answers, newAnswer]);
    setCurrentAnswer('');
    
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      
      // Update interview state based on question category
      const nextQuestion = interviewQuestions[currentQuestion + 1];
      if (nextQuestion.category === 'technical') {
        setInterviewState('technical');
      } else if (nextQuestion.category === 'problem-solving') {
        setInterviewState('problem');
      } else if (nextQuestion.category === 'behavioral') {
        setInterviewState('behavioral');
      }
    } else {
      completeInterview();
    }
  };

  const completeInterview = () => {
    stopTimer();
    setInterviewState('feedback');
    generateFeedback();
  };

  const generateFeedback = () => {
    // Calculate scores based on answers
    const technicalScore = calculateTechnicalScore();
    const problemSolvingScore = calculateProblemSolvingScore();
    const communicationScore = calculateCommunicationScore();
    const confidenceScore = calculateConfidenceScore();
    
    const overallScore = Math.round((technicalScore + problemSolvingScore + communicationScore + confidenceScore) / 4);
    
    setFinalScore({
      overall: overallScore,
      technical: technicalScore,
      problemSolving: problemSolvingScore,
      communication: communicationScore,
      confidence: confidenceScore
    });
    
    setFeedback(generateDetailedFeedback(technicalScore, problemSolvingScore, communicationScore, confidenceScore));
  };

  const calculateTechnicalScore = () => {
    const technicalAnswers = answers.filter(a => a.category === 'technical');
    if (technicalAnswers.length === 0) return 70;
    
    // Simple scoring based on answer length and keywords
    const avgScore = technicalAnswers.reduce((sum, answer) => {
      let score = 70; // Base score
      
      // Check for technical keywords
      const keywords = ['explain', 'because', 'therefore', 'however', 'example', 'implementation'];
      keywordCount = keywords.filter(keyword => answer.answer.toLowerCase().includes(keyword)).length;
      score += keywordCount * 5;
      
      // Length bonus
      if (answer.answer.length > 100) score += 10;
      if (answer.answer.length > 200) score += 5;
      
      return sum + Math.min(score, 100);
    }, 0);
    
    return Math.round(avgScore / technicalAnswers.length);
  };

  const calculateProblemSolvingScore = () => {
    const problemAnswers = answers.filter(a => a.category === 'problem-solving');
    if (problemAnswers.length === 0) return 70;
    
    const avgScore = problemAnswers.reduce((sum, answer) => {
      let score = 70;
      
      // Check for problem-solving keywords
      const keywords = ['approach', 'solution', 'implement', 'design', 'architecture', 'optimize'];
      keywordCount = keywords.filter(keyword => answer.answer.toLowerCase().includes(keyword)).length;
      score += keywordCount * 6;
      
      return sum + Math.min(score, 100);
    }, 0);
    
    return Math.round(avgScore / problemAnswers.length);
  };

  const calculateCommunicationScore = () => {
    const allAnswers = answers;
    if (allAnswers.length === 0) return 75;
    
    const avgLength = allAnswers.reduce((sum, answer) => sum + answer.answer.length, 0) / allAnswers.length;
    
    let score = 75;
    if (avgLength > 150) score += 10;
    if (avgLength > 250) score += 5;
    
    return Math.min(score, 100);
  };

  const calculateConfidenceScore = () => {
    // Based on answer time and completeness
    const avgTime = answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / answers.length;
    
    let score = 80;
    if (avgTime < 60) score += 10; // Quick responses show confidence
    if (avgTime > 300) score -= 10; // Too slow might indicate uncertainty
    
    return Math.max(60, Math.min(score, 100));
  };

  const generateDetailedFeedback = (technical, problem, communication, confidence) => {
    const strengths = [];
    const improvements = [];
    
    if (technical >= 80) strengths.push("Strong technical knowledge and concept understanding");
    if (problem >= 80) strengths.push("Excellent problem-solving approach");
    if (communication >= 80) strengths.push("Clear and articulate communication");
    if (confidence >= 80) strengths.push("Confident and well-paced responses");
    
    if (technical < 70) improvements.push("Study core technical concepts and fundamentals");
    if (problem < 70) improvements.push("Practice system design and problem-solving frameworks");
    if (communication < 70) improvements.push("Work on explaining concepts more clearly and concisely");
    if (confidence < 70) improvements.push("Build confidence through practice and preparation");
    
    return { strengths, improvements };
  };

  const startVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setCurrentAnswer(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in your browser. Please use text input.');
      setIsVoiceMode(false);
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  const resetInterview = () => {
    setInterviewState('setup');
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentAnswer('');
    setFeedback(null);
    setFinalScore(null);
    setTimeElapsed(0);
    stopTimer();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Profile Required</h2>
          <p className="text-gray-600 dark:text-gray-400">Please register or login to access the AI Mock Interview.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-4"
            >
              <Mic className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              AI Mock Interview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Practice your interview skills with AI-powered realistic mock interviews
            </p>
          </div>

          {interviewState === 'setup' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interview Setup</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Role</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Cloud Engineer">Cloud Engineer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isVoiceMode}
                      onChange={(e) => setIsVoiceMode(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Voice Mode</span>
                  </label>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startInterview}
                  disabled={!selectedRole}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Interview
                  <Play className="w-4 h-4 ml-2 inline" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {(interviewState === 'introduction' || interviewState === 'technical' || interviewState === 'problem' || interviewState === 'behavioral') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              {/* Interview Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Question {currentQuestion + 1} of {interviewQuestions.length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {formatTime(timeElapsed)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      interviewState === 'introduction' ? 'bg-blue-100 text-blue-800' :
                      interviewState === 'technical' ? 'bg-purple-100 text-purple-800' :
                      interviewState === 'problem' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {interviewState.charAt(0).toUpperCase() + interviewState.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
                      {interviewQuestions[currentQuestion]?.question}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 ml-11">
                    {interviewQuestions[currentQuestion]?.evaluation}
                  </p>
                </div>

                {/* Answer Input */}
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={6}
                    />
                    {isVoiceMode && (
                      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsRecording(!isRecording)}
                          className={`p-2 rounded-full ${
                            isRecording ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {currentAnswer.length} characters
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentAnswer('')}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Clear
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={submitAnswer}
                        disabled={!currentAnswer.trim()}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Answer
                        <ArrowRight className="w-4 h-4 ml-2 inline" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {interviewState === 'feedback' && feedback && finalScore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Interview Complete! 🎉
              </h2>

              {/* Overall Score */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">{finalScore.overall}</div>
                    <div className="text-sm text-blue-100">Overall Score</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Out of 100</div>
              </div>

              {/* Category Scores */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{finalScore.technical}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Technical</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{finalScore.problemSolving}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Problem Solving</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{finalScore.communication}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Communication</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{finalScore.confidence}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Confidence</div>
                </div>
              </div>

              {/* Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                    Areas to Improve
                  </h3>
                  <ul className="space-y-2">
                    {feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <TrendingUp className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recommended Improvements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Topics to Revise</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Core technical concepts</li>
                      <li>• System design principles</li>
                      <li>• Best practices and patterns</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Practice Areas</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Algorithm problems</li>
                      <li>• Mock interviews</li>
                      <li>• Real-world projects</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Encouraging Message */}
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <div className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                  🚀 Great job on completing the interview!
                </div>
                <p className="text-green-700 dark:text-green-300">
                  You're on the right path toward becoming a {selectedRole}. With a little more practice in the recommended areas, you'll perform even better in real interviews.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetInterview}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Interview
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Pro Feature
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIMockInterview;
