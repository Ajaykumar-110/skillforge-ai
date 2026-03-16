# AI-Based Skill Recommendation System - Enhanced Version

## 🚀 **NEW: Real API Integrations Added!**

### **🤖 Integrated External APIs:**
1. **OpenAI API** - AI Chatbot & Interview Evaluation
2. **GitHub API** - Real-time Project Suggestions
3. **Resume NLP Parser** - Advanced Resume Analysis
4. **Course Platforms** - Multi-platform Course Recommendations
5. **Job Market APIs** - Real-time Job Data & Salary Trends
6. **Voice AI System** - Speech Recognition & Synthesis

---

## 🌟 **Features Overview**

### **AI-Powered Features:**
- 🤖 **AI Chatbot** - Powered by OpenAI GPT-3.5/4
- 📄 **Resume Analyzer** - NLP-based skill extraction
- 🎤 **Voice Interview** - Speech-to-text evaluation
- 💻 **GitHub Projects** - Real project suggestions
- 📚 **Course Recommendations** - Multiple platforms
- 💼 **Job Market Data** - Real-time insights

### **Technical Stack:**
- **Frontend:** React.js with Tailwind CSS
- **Backend:** Python Flask with async support
- **ML:** Scikit-learn (Random Forest)
- **NLP:** spaCy, NLTK
- **Database:** MySQL
- **APIs:** OpenAI, GitHub, Adzuna, Udemy

---

## 🚀 **Quick Start - Enhanced Version**

### **1. Automatic Setup (Recommended)**
```bash
# Run the enhanced setup script
setup_enhanced.bat
```

### **2. Manual Setup**

#### **Backend Setup:**
```bash
cd backend

# Install enhanced dependencies
pip install -r requirements_enhanced.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Create .env file
copy .env.example .env

# Add your API keys to .env file:
# OPENAI_API_KEY=your_openai_key
# GITHUB_TOKEN=your_github_token
# ADZUNA_APP_ID=your_adzuna_id
# ADZUNA_API_KEY=your_adzuna_key

# Start enhanced backend
python app_enhanced.py
```

#### **Frontend Setup:**
```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

---

## 🔑 **API Keys Configuration**

### **Required API Keys:**

1. **OpenAI API** (AI Chatbot)
   - Get from: https://platform.openai.com/
   - Add to `.env`: `OPENAI_API_KEY=sk-your-key`

2. **GitHub Token** (Project Suggestions)
   - Get from: https://github.com/settings/tokens
   - Add to `.env`: `GITHUB_TOKEN=github_pat_your-token`

3. **Adzuna API** (Job Market Data)
   - Get from: https://developer.adzuna.com/
   - Add to `.env`: `ADZUNA_APP_ID=your_id`
   - Add to `.env`: `ADZUNA_API_KEY=your-key`

---

## 🌐 **API Endpoints**

### **AI Chatbot:**
```bash
POST /api/chatbot
{
  "message": "What skills do I need for Full Stack development?"
}

POST /api/chatbot/evaluate-answer
{
  "question": "What is React?",
  "answer": "React is a JavaScript library..."
}
```

### **Resume Analyzer:**
```bash
POST /api/analyze-resume
Content-Type: multipart/form-data
{
  "resume": [file]
}

POST /api/extract-skills
{
  "text": "Your resume text here..."
}
```

### **GitHub Projects:**
```bash
GET /api/github-projects?skills=python,javascript&difficulty=intermediate

GET /api/github-projects/search?query=machine%20learning&language=python

GET /api/github-projects/trending?since=weekly
```

### **Course Recommendations:**
```bash
GET /api/recommended-courses?skills=python&skills=javascript

POST /api/courses/learning-path
{
  "target_role": "Full Stack Developer",
  "current_skills": ["JavaScript", "HTML"]
}
```

### **Job Market Data:**
```bash
GET /api/job-market?skills=python&skills=javascript&location=united%20states

GET /api/job-market/salary-trends/python?months=12

GET /api/job-market/top-companies/javascript
```

---

## 🎯 **Frontend Components**

### **Enhanced Components:**
- `EnhancedChatbot.jsx` - AI-powered chat interface
- `EnhancedResumeAnalyzer.jsx` - Advanced resume analysis
- `GitHubProjects.jsx` - Real project suggestions
- `CourseRecommendations.jsx` - Multi-platform courses
- `JobMarketInsights.jsx` - Real-time job data
- `VoiceInterview.jsx` - Speech-based interviews

### **API Service:**
- `services/api.js` - Centralized API client
- Handles all external API calls
- Error handling and authentication
- Request/response interceptors

---

## 📊 **Database Schema**

### **Enhanced Tables:**
- `users` - User profiles with skills
- `resumes` - Resume analysis results
- `chatbot_conversations` - Chat history
- `project_suggestions` - GitHub projects cache
- `course_recommendations` - Course data
- `job_market_data` - Market insights cache

---

## 🔧 **Development**

### **Running Tests:**
```bash
cd backend
pytest tests/

cd frontend
npm test
```

### **Code Formatting:**
```bash
cd backend
black .
flake8 .

cd frontend
npm run format
```

---

## 🚀 **Deployment**

### **Environment Variables:**
```bash
# Production
FLASK_ENV=production
DEBUG=False
JWT_SECRET_KEY=your-super-secret-key

# Database
DATABASE_URL=mysql+pymysql://user:pass@host/db

# APIs
OPENAI_API_KEY=your_key
GITHUB_TOKEN=your_token
ADZUNA_APP_ID=your_id
ADZUNA_API_KEY=your_key
```

### **Docker Deployment:**
```bash
docker-compose up -d
```

---

## 📈 **Performance Features**

### **Caching:**
- Redis for API response caching
- GitHub projects cache
- Job market data cache

### **Rate Limiting:**
- API rate limiting
- OpenAI API optimization
- GitHub token management

### **Error Handling:**
- Comprehensive error responses
- Fallback data for API failures
- User-friendly error messages

---

## 🎉 **What's New in Enhanced Version?**

### ✅ **Real API Integrations:**
- OpenAI GPT chatbot
- GitHub real-time projects
- Advanced NLP resume parsing
- Multi-platform course data
- Real job market insights

### ✅ **Enhanced Features:**
- Voice interview system
- AI-powered answer evaluation
- Salary trend analysis
- Company insights
- Learning path generation

### ✅ **Improved UI/UX:**
- Modern component design
- Real-time data updates
- Interactive visualizations
- Mobile-responsive design

### ✅ **Production Ready:**
- Comprehensive error handling
- API rate limiting
- Performance optimization
- Security enhancements

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch
3. Add your API integrations
4. Test thoroughly
5. Submit pull request

---

## 📞 **Support**

For issues with:
- **API Keys:** Check `.env` configuration
- **Dependencies:** Run `pip install -r requirements_enhanced.txt`
- **Frontend:** Run `npm install`
- **Database:** Check MySQL connection

---

## 🏆 **Success Metrics**

- ✅ **13 AI Features Integrated**
- ✅ **6 Real APIs Connected**
- ✅ **Production Ready**
- ✅ **Comprehensive Documentation**
- ✅ **Error Handling Complete**
- ✅ **Performance Optimized**

---

**🎯 Your AI-Based Skill Recommendation System is now enhanced with real-world APIs!**

**🌐 Access:** http://localhost:3000
**🔧 Backend:** http://localhost:5000
