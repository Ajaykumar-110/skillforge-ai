const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedInitialData = require('./seed/seedData');

// Load env vars
dotenv.config();

// Connect to Database
connectDB().then(async () => {
  await seedInitialData();
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/faculties', require('./routes/facultyRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/marks', require('./routes/markRoutes'));
app.use('/api/timetable', require('./routes/timetableRoutes'));
app.use('/api/library', require('./routes/libraryRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// Root Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'SkillForge College Management System API',
    timestamp: new Date(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    message: err.message || 'An unexpected server error occurred',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 SkillForge College Backend running on port ${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
