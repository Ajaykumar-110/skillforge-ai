# 🛠️ Manual Configuration Guide

## 📝 Easy Manual Changes

### **Backend Changes** - Edit `backend/app_simple.py`

#### **User Profile Defaults** (Lines 25-50):
```python
DEFAULT_USER = {
    "first_name": "John",           # 👈 Change this
    "last_name": "Doe",            # 👈 Change this
    "email": "john.doe@example.com", # 👈 Change this
    "phone": "+1 (555) 123-4567",   # 👈 Change this
    "location": "San Francisco, CA",     # 👈 Change this
    "bio": "Your bio here...",           # 👈 Change this
    "target_job_role": "Full Stack Developer",  # 👈 Change this
    "experience_level": "Senior Level",        # 👈 Change this
    "education": "Your education",            # 👈 Change this
    "github_profile": "https://github.com/yourname",      # 👈 Change this
    "linkedin_profile": "https://linkedin.com/in/yourname",  # 👈 Change this
    "portfolio_website": "https://yourwebsite.dev",         # 👈 Change this
    "skills": ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"], # 👈 Change this
}
```

#### **Analytics Data** (Lines 60-85):
```python
DEFAULT_ANALYTICS = {
    "skills_growth": [
        {"date": "Jan", "value": 5},   # 👈 Change values
        {"date": "Feb", "value": 8},   # 👈 Change values
        # ... add more months
    ],
    "resume_score": [
        {"date": "Jan", "value": 65},  # 👈 Change values
        # ... add more months
    ]
}
```

### **Frontend Changes** - Edit `frontend/.env`

```bash
# Simple Configuration - Easy to modify
VITE_API_BASE_URL=http://127.0.0.1:5000    # 👈 Change if different port
VITE_APP_TITLE=SkillForge AI                  # 👈 Change app title
VITE_APP_VERSION=1.0.0                      # 👈 Change version
```

## 🚀 Quick Start Commands

### **1. Start Simple Backend**
```bash
cd backend
python app_simple.py
```

### **2. Start Frontend**
```bash
cd frontend
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend**: http://127.0.0.1:5000
- **API Health**: http://127.0.0.1:5000/api/health

## 🔄 How to Make Changes

### **Step 1: Stop Servers**
- Press `Ctrl+C` in both terminal windows

### **Step 2: Edit Files**
1. **User Data**: Edit `backend/app_simple.py`
2. **Frontend Config**: Edit `frontend/.env`

### **Step 3: Restart Servers**
1. **Backend**: `python app_simple.py`
2. **Frontend**: `npm start`

### **Step 4: Test Changes**
1. Open http://localhost:3000
2. Navigate to profile
3. See your changes!

## 🎯 Common Changes

### **Change User Name**
```python
# In app_simple.py
DEFAULT_USER = {
    "first_name": "YourName",     # 👈 Change
    "last_name": "YourLastName",   # 👈 Change
}
```

### **Change Skills**
```python
# In app_simple.py
DEFAULT_USER = {
    "skills": ["YourSkill1", "YourSkill2", "YourSkill3"],  # 👈 Change
}
```

### **Change Analytics Values**
```python
# In app_simple.py
DEFAULT_ANALYTICS = {
    "skills_growth": [
        {"date": "Jan", "value": 10},  # 👈 Change to your values
        {"date": "Feb", "value": 15},  # 👈 Change to your values
    ]
}
```

## 📱 Testing Your Changes

### **1. Get Token**
```bash
curl -X POST http://127.0.0.1:5000/api/user/token
```

### **2. Get Profile**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://127.0.0.1:5000/api/user/profile
```

### **3. Update Profile**
```bash
curl -X PUT -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"first_name": "NewName"}' \
     http://127.0.0.1:5000/api/user/profile/update
```

### **4. Reset to Defaults**
```bash
curl -X POST http://127.0.0.1:5000/api/reset
```

## 🔧 Available Endpoints

- `GET /` - API info
- `GET /api/health` - Health check
- `POST /api/user/token` - Get auth token
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile/update` - Update profile
- `POST /api/user/upload-photo` - Upload photo
- `GET /api/user/analytics` - Get analytics
- `POST /api/reset` - Reset to defaults

## 🎨 Customization Tips

### **Add New Fields to Profile**
```python
# Add to DEFAULT_USER
DEFAULT_USER = {
    "new_field": "default_value",  # 👈 Add new field
}
```

### **Change Chart Colors**
```javascript
// In frontend components
const chartColors = {
    primary: '#your-color',  # 👈 Change colors
    secondary: '#your-color'
};
```

### **Modify Theme**
```css
/* In your CSS files */
:root {
    --primary-color: #your-color;  /* 👈 Change theme colors */
    --secondary-color: #your-color;
}
```

## 🚨 Important Notes

### **File Locations**
- **Backend**: `backend/app_simple.py`
- **Frontend Config**: `frontend/.env`
- **User Profile Component**: `frontend/src/pages/UserProfile.jsx`

### **Data Persistence**
- Changes are stored in memory only
- Reset when server restarts
- Use `POST /api/reset` to restore defaults

### **No Database Required**
- Uses in-memory storage
- Perfect for testing and demos
- Easy to modify and test

---

**🎉 That's it! You can now easily make manual changes and see them immediately!**
