import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ModernSidebar from './components/ModernSidebar';
import DynamicDashboard from './components/DynamicDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EnhancedRegister from './components/EnhancedRegister';
import ResumeUploadEnhanced from './components/ResumeUploadEnhanced';
import RealJobSearch from './components/RealJobSearch';
import CareerRoadmapGenerator from './components/CareerRoadmapGenerator';
import JobRecommendationsReal from './pages/JobRecommendationsReal';
import GitHubProjectsUpgraded from './pages/GitHubProjectsUpgraded';
import CourseRecommendationsReal from './pages/CourseRecommendationsReal';
import JobMarketInsightsEnhanced from './pages/JobMarketInsightsEnhanced';
import VoiceInterview from './pages/VoiceInterview';
import AIMockInterview from './components/AIMockInterview';
import UserProfile from './pages/UserProfile';
import SkillAnalyzer from './pages/SkillAnalyzer';
import SkillsAndRolesBrowser from './components/SkillsAndRolesBrowser';
import JobSearch from './pages/JobSearch';
import CareerRoadmap from './pages/CareerRoadmap';
import AIAssistantPage from './pages/AIAssistantPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/dashboard" element={<DynamicDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            
            {/* Auth Routes */}
            <Route path="/register" element={<EnhancedRegister />} />
            <Route path="/login" element={<Login />} />
            
            {/* Resume Routes */}
            <Route path="/resume-upload" element={<ResumeUploadEnhanced />} />
            
            {/* Skill Routes */}
            <Route path="/skill-analyzer" element={<SkillAnalyzer />} />
            <Route path="/skills-roles" element={<SkillsAndRolesBrowser />} />
            
            {/* Job Routes */}
            <Route path="/job-recommendations" element={<JobRecommendationsReal />} />
            <Route path="/job-search" element={<RealJobSearch />} />
            <Route path="/real-job-search" element={<JobSearch />} />
            
            {/* Learning Routes */}
            <Route path="/github-projects" element={<GitHubProjectsUpgraded />} />
            <Route path="/course-recommendations" element={<CourseRecommendationsReal />} />
            
            {/* Market & Interview Routes */}
            <Route path="/job-market" element={<JobMarketInsightsEnhanced />} />
            <Route path="/job-market-insights" element={<JobMarketInsightsEnhanced />} />
            <Route path="/voice-interview" element={<VoiceInterview />} />
            <Route path="/ai-mock-interview" element={<AIMockInterview />} />
            
            {/* AI Routes */}
            <Route path="/chatbot" element={<CareerRoadmap />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/career-roadmap" element={<CareerRoadmapGenerator />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
