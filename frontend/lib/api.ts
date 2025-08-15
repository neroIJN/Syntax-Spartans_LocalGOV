import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard API services
export const dashboardAPI = {
  // Get dashboard appointments
  getAppointments: async () => {
    const response = await apiClient.get('/mysql/appointments/dashboard');
    return response.data.data;
  },

  // Get dashboard notifications
  getNotifications: async () => {
    const response = await apiClient.get('/mysql/notifications/dashboard');
    return response.data.data;
  },

  // Get dashboard documents
  getDocuments: async () => {
    const response = await apiClient.get('/mysql/documents/dashboard');
    return response.data.data;
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId: string) => {
    const response = await apiClient.put(`/mysql/notifications/${notificationId}/read`);
    return response.data;
  },

  // Get unread notifications count
  getUnreadCount: async () => {
    const response = await apiClient.get('/mysql/notifications/unread-count');
    return response.data.count;
  }
};

export default apiClient;
