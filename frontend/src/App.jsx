import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import DemoBanner from './components/common/DemoBanner';
import ToastContainer from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute';

// Modals
import CandidateProfileModal from './components/modals/CandidateProfileModal';
import InviteConfirmationModal from './components/modals/InviteConfirmationModal';
import CreateTeamModal from './components/modals/CreateTeamModal';
import EditProfileModal from './components/modals/EditProfileModal';
import AuthPromptModal from './components/modals/AuthPromptModal';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import HackathonsPage from './pages/HackathonsPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import FindTeammatesPage from './pages/FindTeammatesPage';
import TeamsPage from './pages/TeamsPage';
import TeamDetailPage from './pages/TeamDetailPage';
import CreateTeamPage from './pages/CreateTeamPage';
import CreateHackathonPage from './pages/CreateHackathonPage';
import ProfilePage from './pages/ProfilePage';
import InvitationsPage from './pages/InvitationsPage';
import SavedHackathonsPage from './pages/SavedHackathonsPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Interactive Demo Presentation Helper Banner */}
      <DemoBanner />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Routes */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/hackathons" element={<HackathonsPage />} />
          <Route path="/hackathons/:id" element={<HackathonDetailPage />} />

          {/* Authenticated / Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-teammates"
            element={
              <ProtectedRoute>
                <FindTeammatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <TeamsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams/:id"
            element={
              <ProtectedRoute>
                <TeamDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-team"
            element={
              <ProtectedRoute>
                <CreateTeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-hackathon"
            element={
              <ProtectedRoute>
                <CreateHackathonPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invitations"
            element={
              <ProtectedRoute>
                <InvitationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <SavedHackathonsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Modals & Notifications */}
      <CandidateProfileModal />
      <InviteConfirmationModal />
      <CreateTeamModal />
      <EditProfileModal />
      <AuthPromptModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
