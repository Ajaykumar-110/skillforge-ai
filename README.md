# 🎓 EduNova - Smart College Management System

<p align="center">
  <img src="client/public/logo.png" alt="EduNova Smart College Management System Logo" width="220" />
</p>

<p align="center">
  <strong>A complete, modern, production-ready MERN Stack College Management System built with Material UI (MUI), Express.js, JWT Authentication, and MongoDB.</strong>
</p>

---

## 🌟 Key Features

### 🎨 Modern Material UI Design
- **Color Theme**: Professional Blue (`#1E40AF`), Gold/Amber (`#D97706`), Deep Navy (`#0F172A`), and Crisp White (`#FFFFFF`).
- **Typography & Aesthetics**: Google Fonts (`Outfit` for headings, `Plus Jakarta Sans` for body text), smooth glassmorphism card elevation, animated statistics counters, and custom scrollbars.
- **Fully Responsive**: Sticky elevation Navbar with mobile drawer menu, active route indicators, user profile dropdown avatar, and deep navy institutional footer.

### 🔐 Authentication & Authorization
- **JWT & Bcrypt Hashing**: Secure password hashing with `bcryptjs` and stateless JSON Web Token authentication.
- **Form Validation**: Real-time validation for email formats, password strength matching, and required fields.
- **Protected Routes**: Custom `ProtectedRoute` React component enforcing auth checks and token persistence in `localStorage`.

### 🗄️ Backend REST APIs & Pre-Seeded Database
- **Express.js Server**: Clean controller-route-model architecture.
- **Zero-Config MongoDB Setup**: Connects to local MongoDB or automatically spins up `mongodb-memory-server` fallback out of the box.
- **Automatic Seed Data**: Pre-populates sample departments, faculty members, FAQs, announcements, and campus events on initial launch.

---

## 📄 Pages Built (9 Complete Pages)

1. **Home Page** (`/`):
   - Hero section with Framer Motion entry animations and CTA buttons.
   - Quick numerical stat counters (Students, Faculty, Placement Rate, Highest Package).
   - Live announcements ticker.
   - Featured academic departments grid with modal triggers.
   - Upcoming campus events with event pass registration dialog.
2. **About Us Page** (`/about`):
   - Institutional heritage & overview.
   - Vision, Mission, and Core Values cards.
   - Leadership & Governance team grid (Vice Chancellor, Deans, Research Directors).
   - Campus facilities highlights (AI Computational Center, Central Library, Sports Complex).
3. **Departments Page** (`/departments`):
   - Live search bar by department name or code (CSE, ECE, MECH, MBA, etc.).
   - Category filter chips (Engineering, Management, Basic Sciences, Humanities).
   - Interactive `DepartmentDetailModal` showing course offerings, HOD, and annual intake.
4. **Faculties Page** (`/faculties`):
   - Faculty directory with avatar cards, designations, and qualifications.
   - Department filter dropdown and search bar.
   - Interactive `FacultyDetailModal` detailing biography, specialization, and research publications.
5. **FAQ Page** (`/faq`):
   - Filterable accordions categorized by Admissions, Academics, Hostels & Facilities, Placements, and Examinations.
   - Live search filtering questions in real-time.
   - Direct Academic Helpdesk contact prompt.
6. **Privacy Policy Page** (`/privacy`):
   - Structured privacy policy covering FERPA & GDPR standards, data encryption, and DPO contacts.
7. **Terms & Conditions Page** (`/terms`):
   - Official terms of service, academic integrity honor code, student code of conduct, and IT network usage policies.
8. **Login Page** (`/login`):
   - Responsive card layout, email/password validation, togglable password visibility, "Remember Me", error alerts, and demo student credentials.
9. **Signup Page** (`/signup`):
   - Account creation form with Student / Faculty role selection and department pickers.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Material UI (MUI v5), Framer Motion, Axios, React Router v6, React Toastify, Vite |
| **Backend** | Node.js, Express.js, JWT (`jsonwebtoken`), `bcryptjs`, CORS, Dotenv |
| **Database** | MongoDB, Mongoose v8, `mongodb-memory-server` (automatic fallback) |

---

## 📁 Project Structure

```
Frontend/
├── README.md                  # Project Documentation
│
├── server/                    # Express.js Backend
│   ├── config/                # Database connection & memory fallback logic
│   ├── controllers/           # Auth, Department, Faculty, FAQ, Event, Announcement controllers
│   ├── middleware/            # JWT authentication middleware
│   ├── models/                # Mongoose models (User, Department, Faculty, FAQ, Event, Announcement)
│   ├── routes/                # Express API routes
│   ├── seed/                  # Initial data seeder script
│   ├── .env                   # Environment variables
│   ├── server.js              # Express entry point
│   └── package.json
│
└── client/                    # React + Vite Frontend
    ├── public/
    │   └── logo.png           # EduNova Official Logo
    ├── src/
    │   ├── assets/            # Images & Logo assets
    │   ├── components/        # Navbar, Footer, ProtectedRoute, Modals
    │   ├── context/           # AuthContext (JWT state & handlers)
    │   ├── pages/             # 9 React Pages (Home, About, Departments, etc.)
    │   ├── services/          # Axios API service instance with JWT interceptor
    │   ├── theme/             # Custom MUI Blue/Navy/Cyan theme
    │   ├── App.jsx            # React Router & ToastContainer setup
    │   ├── index.css          # CSS design tokens & glassmorphism utilities
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Run the Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies (if not already installed)
npm install

# Start Express server (runs on http://localhost:5000)
npm start
```

### 2. Run the Frontend Client

Open a new terminal window:

```bash
# Navigate to client directory
cd client

# Install dependencies (if not already installed)
npm install

# Start React Vite dev server (runs on http://localhost:5173)
npm run dev
```

---

## 🔐 Demo Credentials

You can log in directly using the pre-configured student credentials or create a new student/faculty account via the Signup page:

- **Email**: `student@skillforge.edu`
- **Password**: `password123`

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user & get JWT token | No |
| `GET` | `/api/auth/me` | Fetch currently logged in user profile | Yes (Bearer Token) |
| `GET` | `/api/departments` | Fetch all departments (optional `?category=` filter) | No |
| `GET` | `/api/faculties` | Fetch faculty directory (optional `?department=` filter) | No |
| `GET` | `/api/faqs` | Fetch FAQs (optional `?category=` filter) | No |
| `GET` | `/api/events` | Fetch upcoming campus events | No |
| `GET` | `/api/announcements` | Fetch latest institutional announcements | No |

---

## 📜 License

This project is licensed under the ISC License. © 2026 EduNova Smart College Management System.
