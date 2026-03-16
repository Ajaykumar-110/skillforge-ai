@echo off
echo ========================================
echo SkillForge AI - Enhanced Setup Script
echo ========================================
echo.

echo 🔧 Installing Enhanced Backend Dependencies...
cd /d "c:\Users\Naveen\Desktop\job seekers\skillforge-ai\backend"

echo 📦 Installing Python packages...
pip install -r requirements_enhanced.txt >nul 2>&1

echo 🤖 Downloading spaCy model...
python -m spacy download en_core_web_sm >nul 2>&1

echo 📄 Creating .env file...
if not exist .env (
    copy .env.example .env >nul
    echo ✅ .env file created - Please add your API keys!
)

echo 🗄️  Setting up uploads folder...
if not exist uploads mkdir uploads
if not exist logs mkdir logs

echo 🚀 Starting Enhanced Backend Server...
start "Enhanced Backend Server" cmd /k "python app_enhanced.py"

echo.
echo 🌐 Setting up Frontend...
cd /d "c:\Users\Naveen\Desktop\job seekers\skillforge-ai\frontend"

echo 📦 Installing Node dependencies...
call npm install >nul 2>&1

echo 🚀 Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ Enhanced Setup Complete!
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo.
echo 🤖 NEW FEATURES:
echo    • AI Chatbot (OpenAI)
echo    • Resume Analyzer (NLP)
echo    • Voice Interview System
echo    • GitHub Project Suggestions
echo    • Course Recommendations
echo    • Job Market Data
echo.
echo ⚠️  IMPORTANT:
echo    1. Add your API keys to backend/.env
echo    2. Get OpenAI API key: https://platform.openai.com/
echo    3. Get GitHub token: https://github.com/settings/tokens
echo.
echo இரண்டு servers இப்போது start ஆகிவிட்டன!
echo Browser இல் http://localhost:3000 பார்க்கவும்
echo.
pause
