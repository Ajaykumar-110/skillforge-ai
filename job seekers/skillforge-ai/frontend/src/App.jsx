import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<EnhancedRegister />} />
            
            {/* Default Route - Redirect to register */}
            <Route path="/" element={<Navigate to="/register" replace />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <DynamicDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <UserProfile />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/resume-upload" element={
              <ProtectedRoute>
                <Layout>
                  <ResumeUploadEnhanced />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/skill-analyzer" element={
              <ProtectedRoute>
                <Layout>
                  <SkillAnalyzer />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/career-roadmap" element={
              <ProtectedRoute>
                <Layout>
                  <CareerRoadmapGenerator />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/course-recommendations" element={
              <ProtectedRoute>
                <Layout>
                  <CourseRecommendationsReal />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/github-projects" element={
              <ProtectedRoute>
                <Layout>
                  <GitHubProjectsUpgraded />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/job-search" element={
              <ProtectedRoute>
                <Layout>
                  <RealJobSearch />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/real-job-search" element={
              <ProtectedRoute>
                <Layout>
                  <JobSearch />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/job-recommendations" element={
              <ProtectedRoute>
                <Layout>
                  <JobRecommendationsReal />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/job-market" element={
              <ProtectedRoute>
                <Layout>
                  <JobMarketInsightsEnhanced />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/job-market-insights" element={
              <ProtectedRoute>
                <Layout>
                  <JobMarketInsightsEnhanced />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/voice-interview" element={
              <ProtectedRoute>
                <Layout>
                  <VoiceInterview />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/ai-mock-interview" element={
              <ProtectedRoute>
                <Layout>
                  <AIMockInterview />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/ai-assistant" element={
              <ProtectedRoute>
                <Layout>
                  <AIAssistantPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/chatbot" element={
              <ProtectedRoute>
                <Layout>
                  <CareerRoadmap />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Fallback */}
            <Route path="*" element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
