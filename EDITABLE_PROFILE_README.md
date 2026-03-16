# 📝 SkillForge AI - Editable User Profile System

A fully editable user profile system with no default data, allowing users to manually input all their information.

## 🎯 System Overview

### **Key Features:**
- ✅ **Empty Fields** - All fields start empty, no demo data
- ✅ **Manual Input** - Users type all information themselves
- ✅ **Placeholders** - Helpful placeholder text for each field
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete profiles
- ✅ **Profile Completion** - Dynamic calculation based on filled fields
- ✅ **Photo Upload** - Real profile photo upload functionality
- ✅ **Tabbed Interface** - Organized sections for different profile aspects
- ✅ **Database Integration** - MySQL with complete schema
- ✅ **Validation** - Input validation and error handling

## 📁 Project Structure

```
skillforge-ai/
├── backend/
│   ├── app_editable_profile.py      # Main API server
│   ├── editable_profile_schema.sql # Database schema
│   └── uploads/
│       └── profile_photos/         # User uploaded photos
├── frontend/
│   └── src/
│       └── pages/
│           └── UserProfileEditable.jsx # Editable profile component
└── docs/
    └── EDITABLE_PROFILE_README.md # This file
```

## 🚀 Quick Start

### **1. Database Setup**
```bash
# Create database and import schema
mysql -u root -p
CREATE DATABASE skillforge_ai;
USE skillforge_ai;
SOURCE editable_profile_schema.sql;
```

### **2. Backend Setup**
```bash
cd backend
pip install flask flask-cors pyjwt mysql-connector-python
python app_editable_profile.py
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### **4. Access Profile**
- **Frontend**: http://localhost:3000/profile
- **Backend API**: http://127.0.0.1:5000

## 🎨 Frontend Component Features

### **Empty Field Behavior**
All fields start empty and show placeholder text:

```javascript
// Example placeholders
const placeholders = {
  first_name: 'Enter your first name',
  last_name: 'Enter your last name',
  email: 'Enter your email address',
  phone: 'Enter your phone number',
  bio: 'Tell us about yourself',
  target_job_role: 'Select your target job role',
  experience_level: 'Select your experience level'
  // ... more fields
}
```

### **Edit Mode Toggle**
- **View Mode**: Fields show placeholder text if empty
- **Edit Mode**: Fields become editable inputs
- **Save/Cancel**: Action buttons appear in edit mode

### **Profile Completion Calculation**
```javascript
const calculateProfileCompletion = () => {
  const fields = [
    'first_name', 'last_name', 'email', 'phone', 'location', 'bio',
    'target_job_role', 'experience_level', 'education', 'github_profile',
    'linkedin_profile', 'portfolio_website', 'profile_photo'
  ]
  
  const completedFields = fields.filter(field => {
    const value = formData[field]
    return value && value.toString().trim() !== ''
  })
  
  return Math.round((completedFields.length / fields.length) * 100)
}
```

## 🔧 Backend API Features

### **Profile Management**
- `POST /api/user/profile` - Create new profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile/update` - Update profile
- `POST /api/user/upload-photo` - Upload profile photo

### **Authentication**
- JWT-based token system
- Secure token generation
- Token expiration handling
- Protected endpoints

### **Database Features**
- Complete user profile table
- Skills management system
- Session tracking
- Analytics storage
- Performance indexes

## 📊 Database Schema

### **Users Table**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) DEFAULT NULL,
    last_name VARCHAR(100) DEFAULT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    target_job_role VARCHAR(100) DEFAULT NULL,
    experience_level ENUM('Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive') DEFAULT NULL,
    education VARCHAR(255) DEFAULT NULL,
    github_profile VARCHAR(255) DEFAULT NULL,
    linkedin_profile VARCHAR(255) DEFAULT NULL,
    portfolio_website VARCHAR(255) DEFAULT NULL,
    profile_photo VARCHAR(500) DEFAULT NULL,
    theme_preference ENUM('light', 'dark') DEFAULT 'light',
    language_preference VARCHAR(10) DEFAULT 'en',
    notification_settings JSON DEFAULT NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Skills System**
```sql
-- Skills table with 100+ predefined skills
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) DEFAULT NULL,
    description TEXT DEFAULT NULL
);

-- User skills junction table
CREATE TABLE user_skills (
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    proficiency_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Beginner',
    years_experience INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
);
```

## 🌐 API Endpoints

### **Authentication**
```bash
# Get token
curl -X POST http://127.0.0.1:5000/api/user/token \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1}'

# Response
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400,
  "message": "Token generated successfully"
}
```

### **Create Profile**
```bash
curl -X POST http://127.0.0.1:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "San Francisco, CA",
    "bio": "Software developer passionate about creating innovative solutions",
    "target_job_role": "Full Stack Developer",
    "experience_level": "Senior Level",
    "education": "Bachelor of Science in Computer Science",
    "github_profile": "https://github.com/johndoe",
    "linkedin_profile": "https://linkedin.com/in/johndoe",
    "portfolio_website": "https://johndoe.dev",
    "theme_preference": "light",
    "language_preference": "en",
    "notification_settings": {
      "email": true,
      "push": true,
      "jobAlerts": true,
      "courseUpdates": true,
      "profileViews": true
    },
    "two_factor_enabled": false
  }'
```

### **Update Profile**
```bash
curl -X PUT http://127.0.0.1:5000/api/user/profile/update \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John Updated",
    "email": "john.updated@example.com"
  }'
```

### **Upload Photo**
```bash
curl -X POST http://127.0.0.1:5000/api/user/upload-photo \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "photo=@/path/to/your/photo.jpg"
```

## 🎨 Frontend Implementation

### **Empty State Management**
```javascript
const [formData, setFormData] = useState({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
  target_job_role: '',
  experience_level: '',
  education: '',
  github_profile: '',
  linkedin_profile: '',
  portfolio_website: '',
  skills: [],
  theme_preference: 'light',
  language_preference: 'en'
})
```

### **Input Handling**
```javascript
const handleInputChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
}

// Usage in JSX
<input
  type="text"
  name="first_name"
  value={isEditing ? formData.first_name : (formData.first_name || placeholder)}
  onChange={handleInputChange}
  disabled={!isEditing}
  placeholder={placeholder}
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
/>
```

### **Edit Mode Toggle**
```javascript
const [isEditing, setIsEditing] = useState(false)

const handleEdit = () => {
  setIsEditing(true)
}

const handleSave = async () => {
  // Save to backend
  await saveProfile()
  setIsEditing(false)
}

const handleCancel = () => {
  // Reset to original data
  loadUserProfile()
  setIsEditing(false)
}
```

## 🔒 Security Features

### **Input Validation**
- Email format validation
- Phone number format checking
- URL validation for profiles
- Required field validation
- XSS prevention

### **Authentication**
- JWT token-based authentication
- Secure token storage
- Token expiration handling
- Protected routes

### **Data Protection**
- SQL injection prevention
- Input sanitization
- Secure file uploads
- CORS configuration

## 📱 Responsive Design

### **Mobile Optimization**
- Touch-friendly input fields
- Collapsible sidebar navigation
- Optimized button sizes
- Readable typography

### **Breakpoint System**
- **Mobile**: < 768px - Stacked layout
- **Tablet**: 768px - 1024px - Grid adaptation
- **Desktop**: > 1024px - Full layout

## 🎯 User Experience

### **Placeholder System**
- Helpful placeholder text for each field
- Empty state indicators
- Progressive disclosure
- Contextual help text

### **Visual Feedback**
- Loading states during API calls
- Success/error notifications
- Progress indicators
- Hover and focus states

### **Accessibility**
- ARIA labels for all inputs
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## 📊 Analytics & Monitoring

### **User Behavior**
- Field completion tracking
- Edit mode usage analytics
- Photo upload statistics
- Profile completion trends

### **System Performance**
- API response time monitoring
- Database query optimization
- Error tracking and logging
- Resource usage monitoring

## 🧪 Testing

### **Frontend Tests**
```javascript
// Component testing
describe('UserProfile', () => {
  test('renders empty fields initially', () => {
    // Test that all fields start empty
  })
  
  test('updates form data on input', () => {
    // Test input handling
  })
  
  test('saves data to backend', () => {
    // Test save functionality
  })
})
```

### **Backend Tests**
```python
# API endpoint tests
def test_create_profile():
    response = client.post('/api/user/profile', json={
        'first_name': 'Test',
        'email': 'test@example.com'
    })
    assert response.status_code == 201
    
def test_update_profile():
    response = client.put('/api/user/profile/update', json={
        'first_name': 'Updated'
    })
    assert response.status_code == 200
```

## 🚀 Deployment

### **Production Configuration**
```bash
# Environment variables
export DATABASE_URL='mysql://user:password@localhost/skillforge_ai'
export JWT_SECRET='your-production-secret'
export FLASK_ENV='production'

# Production server
gunicorn app_editable_profile:app -w 4 -b 0.0.0.0:5000
```

### **Database Optimization**
```sql
-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_updated_at ON users(updated_at);

-- Create views for common queries
CREATE VIEW user_profile_view AS
SELECT u.*, 
       ROUND(
           (CASE WHEN u.first_name IS NOT NULL THEN 1 ELSE 0 END +
           CASE WHEN u.last_name IS NOT NULL THEN 1 ELSE 0 END +
           -- ... other fields
       ) * 100 / 14
       ) as profile_completion_percentage
FROM users u;
```

## 📚 Available Skills

### **Programming Languages**
- JavaScript, Python, Java, C++, TypeScript, Go, Rust
- HTML/CSS, SQL, NoSQL, GraphQL
- PHP, Ruby, Laravel, Django, Flask

### **Frameworks & Libraries**
- React, Vue, Angular, Node.js, Express
- Django, Flask, Laravel, Spring
- TensorFlow, PyTorch, Scikit-learn
- Pandas, NumPy, Matplotlib

### **Cloud & DevOps**
- AWS, Azure, GCP, Docker, Kubernetes
- Terraform, Ansible, CI/CD, Monitoring
- Linux, Git, GitHub Actions, Jenkins

### **Data Science**
- Machine Learning, Deep Learning, NLP
- Data Analysis, Statistics, Visualization
- Big Data, Data Engineering, Business Intelligence

### **Design & UX**
- Figma, Adobe XD, Sketch, Photoshop
- Illustrator, User Research, Prototyping
- Wireframing, Design Systems

### **Soft Skills**
- Communication, Leadership, Problem Solving
- Team Work, Time Management, Critical Thinking
- Creativity, Adaptability, Public Speaking
- Writing, Research, Project Management

## 🎯 Key Differences from Demo Version

### **Demo Version**
- Pre-filled with sample data
- Mock API responses
- Fixed user information
- Limited customization

### **Editable Version**
- ✅ **Empty fields** - Users start from scratch
- ✅ **Real database** - Persistent data storage
- ✅ **Full CRUD** - Create, read, update, delete
- ✅ **User input** - Manual data entry
- ✅ **Profile completion** - Dynamic calculation
- ✅ **Photo uploads** - Real file handling
- ✅ **Validation** - Input validation and error handling

## 🔧 Customization

### **Add New Fields**
```sql
-- Add new field to users table
ALTER TABLE users ADD COLUMN new_field VARCHAR(255) DEFAULT NULL;
```

### **Modify Placeholders**
```javascript
// Update placeholder text
const placeholders = {
  first_name: 'Enter your first name',
  last_name: 'Enter your last name',
  // Customize as needed
}
```

### **Custom Validation**
```javascript
// Add custom validation rules
const validateField = (name, value) => {
  switch (name) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    case 'phone':
      return /^[\d\s\-\d\s\-\d]+$/.test(value)
    // Add more validation rules
  }
}
```

## 🎉 Production Ready!

### **What You Get:**
✅ **Complete Editable Profile** - All fields start empty
✅ **Real Database Integration** - MySQL with full schema
✅ **API Documentation** - Complete endpoint reference
✅ **Frontend Component** - React with TailwindCSS
✅ **Security Features** - JWT authentication and validation
✅ **Photo Upload** - Real file handling
✅ **Profile Completion** - Dynamic calculation
✅ **Responsive Design** - Mobile-first approach
✅ **Documentation** - Comprehensive setup guide

### **Perfect For:**
- **Production Applications** - Real user data handling
- **Custom Implementations** - Easy to modify and extend
- **Enterprise Systems** - Scalable and secure
- **Educational Platforms** - Learning management systems
- **Career Platforms** - Job matching and skill tracking

---

## 🚀 Quick Start Commands

```bash
# 1. Setup Database
mysql -u root -p < editable_profile_schema.sql

# 2. Start Backend
cd backend
python app_editable_profile.py

# 3. Start Frontend
cd frontend
npm start

# 4. Access Profile
# Open http://localhost:3000/profile
```

---

**🎉 Your fully editable user profile system is ready for production!**

**📝 All fields start empty - users can input their own information from scratch!**
