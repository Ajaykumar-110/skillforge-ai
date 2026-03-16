# SkillForge AI - Production-Ready User Profile System

A comprehensive AI-powered career assistant platform with a complete user profile management system.

## 🚀 Features

### User Profile System
- **Profile Management**: Complete CRUD operations for user profiles
- **Photo Upload**: Profile picture upload with validation
- **Profile Completion**: Automatic completion percentage calculation
- **Real-time Updates**: Live profile editing with save/cancel functionality

### Profile Sections
1. **Personal Information**
   - First Name, Last Name, Email, Phone
   - Location, Bio
   - Form validation and error handling

2. **Career Information**
   - Skills (multi-select from 100+ options)
   - Target Job Role, Experience Level
   - Education, GitHub, LinkedIn, Portfolio links

3. **Preferences**
   - Theme selection (Light/Dark)
   - Language preferences
   - Notification settings (email, push, job alerts, etc.)

4. **Security**
   - Password change functionality
   - Two-factor authentication
   - Active session management
   - Device tracking

5. **Analytics Dashboard**
   - Skills Growth Chart
   - Resume Score Progress
   - Job Match Score Trends
   - Courses Completed Statistics

## 🛠 Tech Stack

### Frontend
- **React 18** with hooks
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **Responsive Design** (Mobile-first)

### Backend
- **Flask** (Python web framework)
- **MySQL** database
- **JWT** authentication
- **Werkzeug** for file uploads
- **Flask-CORS** for cross-origin requests

### Database
- **MySQL** with optimized schema
- **Foreign key constraints**
- **Indexing for performance
- **JSON fields for flexible data

## 📁 Project Structure

```
skillforge-ai/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── database_schema.sql     # MySQL database schema
│   ├── requirements.txt        # Python dependencies
│   ├── setup.sh              # Backend setup script
│   └── uploads/
│       └── profile_photos/    # User uploaded photos
└── frontend/
    ├── src/
    │   └── pages/
    │       └── UserProfile.jsx  # Main profile component
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- MySQL 8.0+
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Run setup script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the server**
   ```bash
   source venv/bin/activate
   python app.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

### Database Setup

1. **Create MySQL database**
   ```sql
   CREATE DATABASE skillforge_ai;
   ```

2. **Import schema**
   ```bash
   mysql -u root -p skillforge_ai < backend/database_schema.sql
   ```

## 🎯 API Endpoints

### Profile Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile/update` - Update profile
- `POST /api/user/upload-photo` - Upload profile photo

### Analytics
- `GET /api/user/analytics` - Get user analytics data

### Security
- `GET /api/user/sessions` - Get active sessions
- `DELETE /api/user/sessions/:id` - Revoke session

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255),
    bio TEXT,
    profile_photo VARCHAR(500),
    target_job_role VARCHAR(100),
    experience_level ENUM('Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'),
    education VARCHAR(255),
    github_profile VARCHAR(255),
    linkedin_profile VARCHAR(255),
    portfolio_website VARCHAR(255),
    theme_preference ENUM('light', 'dark') DEFAULT 'light',
    notification_settings JSON,
    language_preference VARCHAR(10) DEFAULT 'en',
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Skills Table
- 100+ pre-loaded skills
- Categories: Programming, Design, Business, etc.
- Junction table for user-skill relationships

## 🎨 UI Components

### Profile Header
- Profile photo with upload functionality
- Name and contact information
- Profile completion percentage
- Edit/Save/Cancel buttons

### Tabbed Interface
- Personal Information tab
- Career Information tab
- Preferences tab
- Security tab
- Analytics tab

### Forms
- Real-time validation
- Disabled state for non-editing
- Proper focus states
- Error handling

### Analytics Charts
- Line charts for growth trends
- Bar charts for comparisons
- Pie charts for completion stats
- Responsive and interactive

## 🔒 Security Features

### Authentication
- JWT-based authentication
- Secure password hashing
- Session management
- Token expiration

### Data Validation
- Input sanitization
- SQL injection prevention
- XSS protection
- File upload validation

### Privacy Controls
- Profile visibility settings
- Data export functionality
- Account deletion
- GDPR compliance

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Features
- Mobile-first design
- Touch-friendly interfaces
- Adaptive layouts
- Optimized performance

## 🚀 Performance Optimizations

### Frontend
- Lazy loading components
- Image optimization
- Bundle splitting
- Caching strategies

### Backend
- Database indexing
- Query optimization
- Connection pooling
- Response caching

## 🧪 Testing

### Frontend Tests
- Component unit tests
- Integration tests
- E2E tests with Cypress

### Backend Tests
- API endpoint tests
- Database tests
- Security tests
- Performance tests

## 📈 Analytics & Monitoring

### User Analytics
- Profile completion tracking
- Feature usage metrics
- Engagement statistics
- Performance metrics

### System Monitoring
- Error tracking
- Performance monitoring
- Uptime monitoring
- Log aggregation

## 🔧 Development Tools

### Code Quality
- ESLint for JavaScript
- Prettier for formatting
- Pre-commit hooks
- Code review process

### Development Environment
- Hot module replacement
- Auto-reload on changes
- Debug tools
- DevTools integration

## 🚀 Deployment

### Production Setup
- Environment variables
- Build optimization
- Asset compression
- CDN integration

### Hosting Options
- AWS (EC2, S3, RDS)
- Google Cloud Platform
- DigitalOcean
- Heroku

## 📚 Documentation

### API Documentation
- OpenAPI/Swagger specs
- Endpoint examples
- Error codes
- Rate limiting

### User Guide
- Feature explanations
- Tutorial videos
- FAQ section
- Support contact

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review process

### Coding Standards
- Follow React best practices
- Use TypeScript for type safety
- Write comprehensive tests
- Document changes

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

### Getting Help
- Documentation: [Link to docs]
- Issues: GitHub Issues
- Email: support@skillforge.ai
- Community: Discord/Slack

---

**Built with ❤️ for the developer community**

## 🎯 Quick Demo

1. **Visit Profile**: Go to `/profile` route
2. **Edit Profile**: Click "Edit Profile" button
3. **Update Information**: Modify any field
4. **Upload Photo**: Click camera icon to upload
5. **View Analytics**: Switch to Analytics tab
6. **Manage Security**: Use Security tab for settings

The system is production-ready and can be deployed immediately! 🚀
