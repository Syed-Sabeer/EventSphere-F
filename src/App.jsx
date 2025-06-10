import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ExposPage from './pages/public/ExposPage';
import ExpoDetailPage from './pages/public/ExpoDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Dashboard Pages
import DashboardHome from './pages/shared/DashboardHome';

// Admin Pages
import ExpoManagement from './pages/admin/ExpoManagement';
import UserManagement from './pages/admin/UserManagement';
import AnalyticsPage from './pages/admin/AnalyticsPage';

// Organizer Pages
import CreateExpo from './pages/organizer/CreateExpo';
import ManageExpos from './pages/organizer/ManageExpos';
import OrganizerExhibitorApplications from './pages/organizer/ExhibitorApplications';
import AttendeeManagement from './pages/organizer/AttendeeManagement';
import BoothManagement from './pages/organizer/BoothManagement';
import ScheduleManagement from './pages/organizer/ScheduleManagement';

// Exhibitor Pages
import ExhibitorProfile from './pages/exhibitor/ExhibitorProfile';
import ExhibitorApplications from './pages/exhibitor/ExhibitorApplications';
import BoothDetails from './pages/exhibitor/BoothDetails';
import ExhibitorAnalytics from './pages/exhibitor/ExhibitorAnalytics';

// Attendee Pages
import AttendeeProfile from './pages/attendee/AttendeeProfile';
import MyRegistrations from './pages/attendee/MyRegistrations';
import SessionSchedule from './pages/attendee/SessionSchedule';
import ExhibitorDirectory from './pages/attendee/ExhibitorDirectory';
import NetworkingPage from './pages/attendee/NetworkingPage';

// Shared Pages
import ProfilePage from './pages/shared/ProfilePage';
import FeedbackPage from './pages/shared/FeedbackPage';
import MessagesPage from './pages/shared/MessagesPage';
import NotificationsPage from './pages/shared/NotificationsPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Styles
import './App.css';
import 'flowbite/dist/flowbite.min.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider>
              <Router>
                <div className="App min-h-screen bg-gray-50 dark:bg-gray-900">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<PublicLayout />}>
                      <Route index element={<HomePage />} />
                      <Route path="expos" element={<ExposPage />} />
                      <Route path="expos/:id" element={<ExpoDetailPage />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />

                    {/* Protected Dashboard Routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }>
                      {/* Unified Dashboard Home Route */}
                      <Route index element={<Navigate to="/dashboard/home" replace />} />
                      <Route path="home" element={<DashboardHome />} />
                      
                      {/* Admin Routes */}
                      <Route path="expos" element={
                        <RoleBasedRoute allowedRoles={['admin']}>
                          <ExpoManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="users" element={
                        <RoleBasedRoute allowedRoles={['admin']}>
                          <UserManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="analytics" element={
                        <RoleBasedRoute allowedRoles={['admin']}>
                          <AnalyticsPage />
                        </RoleBasedRoute>
                      } />

                      {/* Organizer Routes */}
                      <Route path="create-expo" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer']}>
                          <CreateExpo />
                        </RoleBasedRoute>
                      } />
                      <Route path="my-expos" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer']}>
                          <ManageExpos />
                        </RoleBasedRoute>
                      } />
                      <Route path="exhibitor-applications" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer']}>
                          <OrganizerExhibitorApplications />
                        </RoleBasedRoute>
                      } />
                      <Route path="attendees" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer']}>
                          <AttendeeManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="booths" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer']}>
                          <BoothManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="schedule" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer']}>
                          <ScheduleManagement />
                        </RoleBasedRoute>
                      } />

                      {/* Exhibitor Routes */}
                      <Route path="company-profile" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor']}>
                          <ExhibitorProfile />
                        </RoleBasedRoute>
                      } />
                      <Route path="applications" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor']}>
                          <ExhibitorApplications />
                        </RoleBasedRoute>
                      } />
                      <Route path="booth" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor']}>
                          <BoothDetails />
                        </RoleBasedRoute>
                      } />
                      <Route path="exhibitor-analytics" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor']}>
                          <ExhibitorAnalytics />
                        </RoleBasedRoute>
                      } />

                      {/* Attendee Routes */}
                      <Route path="attendee-profile" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor', 'attendee']}>
                          <AttendeeProfile />
                        </RoleBasedRoute>
                      } />
                      <Route path="registrations" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor', 'attendee']}>
                          <MyRegistrations />
                        </RoleBasedRoute>
                      } />
                      <Route path="sessions" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor', 'attendee']}>
                          <SessionSchedule />
                        </RoleBasedRoute>
                      } />
                      <Route path="exhibitors" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor', 'attendee']}>
                          <ExhibitorDirectory />
                        </RoleBasedRoute>
                      } />
                      <Route path="networking" element={
                        <RoleBasedRoute allowedRoles={['admin', 'organizer', 'exhibitor', 'attendee']}>
                          <NetworkingPage />
                        </RoleBasedRoute>
                      } />

                      {/* Shared Protected Routes */}
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="feedback" element={<FeedbackPage />} />
                      <Route path="messages" element={<MessagesPage />} />
                      <Route path="notifications" element={<NotificationsPage />} />
                    </Route>

                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>

                  {/* Global Components */}
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#363636',
                        color: '#fff',
                      },
                      success: {
                        duration: 3000,
                        theme: {
                          primary: 'green',
                          secondary: 'black',
                        },
                      },
                    }}
                  />
                </div>
              </Router>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
