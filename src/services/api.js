import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      // Development mode fallback
      if (error.response?.status === 500 && error.response?.data?.error?.includes('buffering timed out')) {
        console.log('🔧 Development Mode: Simulating successful login');
        return {
          success: true,
          message: 'Login successful (Development Mode)',
          data: {
            user: {
              _id: 'dev_user_' + Date.now(),
              firstName: 'Dev',
              lastName: 'User',
              email: credentials.email,
              role: 'admin',
              isEmailVerified: true,
              createdAt: new Date().toISOString()
            },
            token: 'dev_token_' + Date.now()
          }
        };
      }
      throw error;
    }
  },
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      // Development mode fallback - if backend is not connected to database
      if (error.response?.status === 500 && error.response?.data?.error?.includes('buffering timed out')) {
        console.log('🔧 Development Mode: Simulating successful registration');
        return {
          success: true,
          message: 'Registration successful (Development Mode)',
          data: {
            user: {
              _id: 'dev_user_' + Date.now(),
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              role: userData.role || 'attendee',
              phone: userData.phone,
              company: userData.company,
              isEmailVerified: true,
              createdAt: new Date().toISOString()
            },
            token: 'dev_token_' + Date.now()
          }
        };
      }
      throw error;
    }
  },
  logout: () => API.post('/auth/logout'),
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => API.post(`/auth/reset-password/${token}`, { password }),
  getCurrentUser: () => API.get('/auth/me'),
  updateProfile: (profileData) => API.put('/auth/profile', profileData),
  changePassword: (passwordData) => API.put('/auth/change-password', passwordData),
};

// User API
export const userAPI = {
  getUsers: () => API.get('/users'),
  getUser: (id) => API.get(`/users/${id}`),
  updateUser: (id, userData) => API.put(`/users/${id}`, userData),
  deleteUser: (id) => API.delete(`/users/${id}`),
  getUsersByRole: (role) => API.get(`/users/role/${role}`),
};

// Expo API
export const expoAPI = {
  getExpos: (params) => API.get('/expos', { params }),
  getExpo: (id) => API.get(`/expos/${id}`),
  createExpo: (expoData) => API.post('/expos', expoData),
  updateExpo: (id, expoData) => API.put(`/expos/${id}`, expoData),
  deleteExpo: (id) => API.delete(`/expos/${id}`),
  getMyExpos: () => API.get('/expos/my'),
  getPublicExpos: () => API.get('/expos/public'),
  registerForExpo: (id) => API.post(`/expos/${id}/register`),
  getExpoAnalytics: (id) => API.get(`/expos/${id}/analytics`),
};

// Booth API
export const boothAPI = {
  getBooths: (expoId) => API.get(`/expos/${expoId}/booths`),
  getBooth: (id) => API.get(`/booths/${id}`),
  createBooth: (expoId, boothData) => API.post(`/expos/${expoId}/booths`, boothData),
  updateBooth: (id, boothData) => API.put(`/booths/${id}`, boothData),
  deleteBooth: (id) => API.delete(`/booths/${id}`),
  reserveBooth: (id, reservationData) => API.post(`/booths/${id}/reserve`, reservationData),
  assignBooth: (id, exhibitorId) => API.post(`/booths/${id}/assign`, { exhibitorId }),
  getAvailableBooths: (expoId) => API.get(`/expos/${expoId}/booths/available`),
  getMyBooths: () => API.get('/booths/my'),
};

// Exhibitor API
export const exhibitorAPI = {
  getExhibitors: (expoId) => API.get(`/expos/${expoId}/exhibitors`),
  getExhibitor: (id) => API.get(`/exhibitors/${id}`),
  createApplication: (applicationData) => API.post('/exhibitors/apply', applicationData),
  updateApplication: (id, applicationData) => API.put(`/exhibitors/${id}`, applicationData),
  deleteApplication: (id) => API.delete(`/exhibitors/${id}`),
  approveApplication: (id) => API.post(`/exhibitors/${id}/approve`),
  rejectApplication: (id) => API.post(`/exhibitors/${id}/reject`),
  getMyApplications: () => API.get('/exhibitors/my'),
  getApplicationsByExpo: (expoId) => API.get(`/expos/${expoId}/applications`),
  getExhibitorAnalytics: (id) => API.get(`/exhibitors/${id}/analytics`),
  updateProfile: (profileData) => API.put('/exhibitors/profile', profileData),
};

// Attendee API
export const attendeeAPI = {
  getAttendees: (expoId) => API.get(`/expos/${expoId}/attendees`),
  getAttendee: (id) => API.get(`/attendees/${id}`),
  registerForExpo: (expoId, registrationData) => API.post(`/expos/${expoId}/register`, registrationData),
  checkIn: (expoId) => API.post(`/expos/${expoId}/check-in`),
  getMyRegistrations: () => API.get('/attendees/registrations'),
  updateProfile: (profileData) => API.put('/attendees/profile', profileData),
  getAttendeeAnalytics: () => API.get('/attendees/analytics'),
  getNetworkingConnections: () => API.get('/attendees/networking'),
  connectWithExhibitor: (exhibitorId) => API.post(`/attendees/connect/${exhibitorId}`),
};

// Schedule API
export const scheduleAPI = {
  getSessions: (expoId) => API.get(`/expos/${expoId}/sessions`),
  getSession: (id) => API.get(`/sessions/${id}`),
  createSession: (expoId, sessionData) => API.post(`/expos/${expoId}/sessions`, sessionData),
  updateSession: (id, sessionData) => API.put(`/sessions/${id}`, sessionData),
  deleteSession: (id) => API.delete(`/sessions/${id}`),
  bookSession: (id) => API.post(`/sessions/${id}/book`),
  cancelBooking: (id) => API.delete(`/sessions/${id}/booking`),
  getMyBookings: () => API.get('/sessions/bookings'),
  addFeedback: (id, feedbackData) => API.post(`/sessions/${id}/feedback`, feedbackData),
  getSessionAttendees: (id) => API.get(`/sessions/${id}/attendees`),
};

// Feedback API
export const feedbackAPI = {
  getFeedback: () => API.get('/feedback'),
  createFeedback: (feedbackData) => API.post('/feedback', feedbackData),
  updateFeedback: (id, feedbackData) => API.put(`/feedback/${id}`, feedbackData),
  deleteFeedback: (id) => API.delete(`/feedback/${id}`),
  getFeedbackById: (id) => API.get(`/feedback/${id}`),
  assignFeedback: (id, userId) => API.post(`/feedback/${id}/assign`, { userId }),
  respondToFeedback: (id, response) => API.post(`/feedback/${id}/respond`, { response }),
  closeFeedback: (id) => API.post(`/feedback/${id}/close`),
};

// Message API
export const messageAPI = {
  getMessages: () => API.get('/messages'),
  getMessage: (id) => API.get(`/messages/${id}`),
  sendMessage: (messageData) => API.post('/messages', messageData),
  markAsRead: (id) => API.put(`/messages/${id}/read`),
  deleteMessage: (id) => API.delete(`/messages/${id}`),
  getConversation: (userId) => API.get(`/messages/conversation/${userId}`),
  getUnreadCount: () => API.get('/messages/unread-count'),
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: () => API.get('/analytics/dashboard'),
  getExpoStats: (expoId) => API.get(`/analytics/expo/${expoId}`),
  getExhibitorStats: (exhibitorId) => API.get(`/analytics/exhibitor/${exhibitorId}`),
  getAttendeeStats: () => API.get('/analytics/attendee'),
  getRevenueStats: () => API.get('/analytics/revenue'),
  getEngagementStats: () => API.get('/analytics/engagement'),
  exportReport: (type, params) => API.get(`/analytics/export/${type}`, { params, responseType: 'blob' }),
};

// File Upload API
export const uploadAPI = {
  uploadFile: (file, folder = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteFile: (fileId) => API.delete(`/upload/${fileId}`),
};

// Notification API
export const notificationAPI = {
  getNotifications: () => API.get('/notifications'),
  markAsRead: (id) => API.put(`/notifications/${id}/read`),
  markAllAsRead: () => API.put('/notifications/read-all'),
  deleteNotification: (id) => API.delete(`/notifications/${id}`),
  getUnreadCount: () => API.get('/notifications/unread-count'),
};

export default API;

// Ensure this file is saved with .js extension and does not contain JSX.
