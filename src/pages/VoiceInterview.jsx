import React, { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Play, Pause, RotateCcw, Download, Clock, TrendingUp, Award, Brain, Volume2 } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const VoiceInterview = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [recordingTime, setRecordingTime] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [overallScore, setOverallScore] = useState(0)
  const [browserSupported, setBrowserSupported] = useState(true)
  const [micPermission, setMicPermission] = useState('prompt')
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)

  // Check browser support on mount
  useEffect(() => {
    const checkBrowserSupport = async () => {
      // Check if MediaDevices API is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setBrowserSupported(false)
        return
      }

      // Check microphone permission
      try {
        const permission = await navigator.permissions.query({ name: 'microphone' })
        setMicPermission(permission.state)
        
        permission.addEventListener('change', () => {
          setMicPermission(permission.state)
        })
      } catch (error) {
        // Some browsers don't support permissions API
        console.log('Permissions API not supported')
      }
    }

    checkBrowserSupport()
  }, [])

  const interviewQuestions = [
    {
      id: 1,
      question: "Tell me about yourself and your experience in software development.",
      category: "Introduction",
      difficulty: "Easy",
      tips: "Focus on your relevant experience and key achievements",
      keywords: ["experience", "development", "projects", "skills"]
    },
    {
      id: 2,
      question: "Describe a challenging technical problem you solved recently.",
      category: "Problem Solving",
      difficulty: "Medium",
      tips: "Use the STAR method: Situation, Task, Action, Result",
      keywords: ["problem", "solution", "technical", "challenge"]
    },
    {
      id: 3,
      question: "How do you stay updated with the latest technology trends?",
      category: "Learning",
      difficulty: "Easy",
      tips: "Mention specific resources and your learning habits",
      keywords: ["learning", "technology", "trends", "updates"]
    },
    {
      id: 4,
      question: "Explain a complex technical concept to a non-technical person.",
      category: "Communication",
      difficulty: "Medium",
      tips: "Use analogies and simple language",
      keywords: ["explain", "technical", "simple", "communication"]
    },
    {
      id: 5,
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      difficulty: "Easy",
      tips: "Be honest and show ambition",
      keywords: ["career", "goals", "future", "ambition"]
    }
  ]

  const performanceData = [
    { metric: 'Clarity', score: 85 },
    { metric: 'Confidence', score: 78 },
    { metric: 'Content', score: 92 },
    { metric: 'Fluency', score: 88 },
    { metric: 'Pacing', score: 76 }
  ]

  const progressData = [
    { session: 'Session 1', score: 65 },
    { session: 'Session 2', score: 72 },
    { session: 'Session 3', score: 78 },
    { session: 'Session 4', score: 85 },
    { session: 'Session 5', score: 89 }
  ]

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRecording])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const saveSession = () => {
    const sessionData = {
      date: new Date().toISOString(),
      duration: formatTime(recordingTime),
      questionsAnswered: currentQuestion + 1,
      totalQuestions: interviewQuestions.length,
      performance: performanceData,
      recordings: audioChunksRef.current.length,
      completed: currentQuestion === interviewQuestions.length - 1
    }
    
    const sessionContent = `
Voice Interview Session Report
============================
Date: ${new Date().toLocaleString()}
Duration: ${sessionData.duration}
Questions: ${sessionData.questionsAnswered}/${sessionData.totalQuestions}
Recordings: ${sessionData.recordings}

Performance Scores:
${performanceData.map(p => `- ${p.metric}: ${p.score}%`).join('\n')}

Status: ${sessionData.completed ? 'Completed' : 'In Progress'}
    `.trim()
    
    const blob = new Blob([sessionContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `voice-interview-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    alert('Interview session saved successfully!')
  }

  const startRecording = async () => {
    // Check browser support first
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support audio recording. Please use Chrome, Firefox, or Edge.')
      return
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      })
      
      // Check if MediaRecorder is supported
      if (!window.MediaRecorder) {
        alert('MediaRecorder is not supported in your browser. Please use Chrome, Firefox, or Edge.')
        stream.getTracks().forEach(track => track.stop())
        return
      }

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAnswers([...answers, {
          questionId: interviewQuestions[currentQuestion].id,
          audioUrl,
          duration: recordingTime,
          timestamp: new Date()
        }])
        analyzeAnswer(audioBlob)
      }

      mediaRecorderRef.current.onerror = (event) => {
        console.error('MediaRecorder error:', event.error)
        alert('Recording failed. Please check your microphone and try again.')
        setIsRecording(false)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
      setMicPermission('granted')
    } catch (error) {
      console.error('Error accessing microphone:', error)
      if (error.name === 'NotAllowedError') {
        alert('Microphone access was denied. Please allow microphone access to use this feature.')
        setMicPermission('denied')
      } else if (error.name === 'NotFoundError') {
        alert('No microphone was found. Please connect a microphone and try again.')
      } else if (error.name === 'NotReadableError') {
        alert('Microphone is already in use by another application.')
      } else {
        alert('Error accessing microphone: ' + error.message)
      }
      setIsRecording(false)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  const analyzeAnswer = (audioBlob) => {
    // Simulate AI analysis
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70
      setFeedback({
        score,
        clarity: Math.floor(Math.random() * 20) + 80,
        confidence: Math.floor(Math.random() * 25) + 75,
        fluency: Math.floor(Math.random() * 30) + 70,
        pacing: Math.floor(Math.random() * 20) + 75
      })
      setOverallScore(score)
    }, 2000)
  }

  const resetInterview = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setFeedback(null)
    setOverallScore(0)
    setRecordingTime(0)
    setIsRecording(false)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Hard': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Voice Interview
          </h1>
          <p className="text-gray-600">Practice your interview skills with AI-powered voice analysis</p>
        </div>

        {/* Browser Support Warning */}
        {!browserSupported && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-900">Browser Not Supported</h3>
                <p className="text-sm text-red-700">
                  Your browser doesn't support audio recording. Please use Chrome, Firefox, or Edge for the best experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Microphone Permission Warning */}
        {browserSupported && micPermission === 'denied' && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900">Microphone Access Denied</h3>
                <p className="text-sm text-yellow-700">
                  Please allow microphone access in your browser settings to use the voice recording feature.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Question & Recording */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Question {currentQuestion + 1} of {interviewQuestions.length}
                </h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(interviewQuestions[currentQuestion].difficulty)}`}>
                  {interviewQuestions[currentQuestion].difficulty}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-600">Category: {interviewQuestions[currentQuestion].category}</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-900 font-medium">{interviewQuestions[currentQuestion].question}</p>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> {interviewQuestions[currentQuestion].tips}
                </p>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </button>
              <p className="text-sm text-gray-600">
                {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
              </p>
              {isRecording && (
                <div className="text-2xl font-mono text-gray-900">
                  {formatTime(recordingTime)}
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="metric" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="score" fill="#6366f1" name="Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="mt-6 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="session" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line 
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={2}
                name="Score"
                dot={{ fill: '#6366f1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Control Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button 
            onClick={resetInterview}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button 
            onClick={saveSession}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Save Session</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoiceInterview
