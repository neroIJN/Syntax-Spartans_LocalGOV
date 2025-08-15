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
    try {
      const response = await apiClient.get('/mysql/appointments/dashboard');
      console.log('Appointments API response:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      throw error;
    }
  },

  // Get dashboard notifications
  getNotifications: async () => {
    try {
      const response = await apiClient.get('/mysql/notifications/dashboard');
      console.log('Notifications API response:', response.data);
      
      // The backend returns { success: true, data: { notifications: [...], unreadCount: ... } }
      if (response.data?.success && response.data?.data) {
        return {
          notifications: response.data.data.notifications || [],
          unreadCount: response.data.data.unreadCount || 0
        };
      }
      
      return { notifications: [], unreadCount: 0 };
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  },

  // Get dashboard documents
  getDocuments: async () => {
    try {
      const response = await apiClient.get('/mysql/documents/dashboard');
      console.log('Documents API response:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      throw error;
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId: string) => {
    const response = await apiClient.put(`/mysql/notifications/${notificationId}/read`);
    return response.data;
  },

  // Get unread notifications count
  getUnreadCount: async () => {
    try {
      const response = await apiClient.get('/mysql/notifications/unread-count');
      console.log('Unread count API response:', response.data);
      return response.data.count || 0;
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
      throw error;
    }
  }
};

export default apiClient;
