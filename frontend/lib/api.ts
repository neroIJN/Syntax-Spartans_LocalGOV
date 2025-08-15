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
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    console.log('Auth token present:', !!token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added Authorization header')
    } else {
      console.log('No auth token found in localStorage')
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response success:', response.status, response.config.url)
    return response;
  },
  (error) => {
    console.error('API Response error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    })
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log('401 Unauthorized - clearing auth token and redirecting to login')
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

// Appointment API services
export const appointmentAPI = {
  // Get all user appointments with filtering
  getAllAppointments: async (filters?: { status?: string; page?: number; limit?: number; upcoming?: boolean }) => {
    try {
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== 'All') params.append('status', filters.status.toLowerCase());
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.upcoming) params.append('upcoming', filters.upcoming.toString());

      const response = await apiClient.get(`/mysql/appointments?${params.toString()}`);
      console.log('All appointments API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch all appointments:', error);
      throw error;
    }
  },

  // Get single appointment
  getAppointment: async (appointmentId: string) => {
    try {
      const response = await apiClient.get(`/mysql/appointments/${appointmentId}`);
      console.log('Single appointment API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch appointment:', error);
      throw error;
    }
  },

  // Create new appointment
  createAppointment: async (appointmentData: {
    serviceName: string;
    department: string;
    appointmentDate: string;
    timeSlot: string;
    location?: string;
    description?: string;
    priority?: string;
  }) => {
    try {
      console.log('Creating appointment with data:', appointmentData);
      const response = await apiClient.post('/mysql/appointments', appointmentData);
      console.log('Create appointment API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to create appointment:', error);
      throw error;
    }
  },

  // Update appointment
  updateAppointment: async (appointmentId: string, updateData: {
    appointmentDate?: string;
    timeSlot?: string;
    description?: string;
    priority?: string;
  }) => {
    try {
      const response = await apiClient.put(`/mysql/appointments/${appointmentId}`, updateData);
      console.log('Update appointment API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update appointment:', error);
      throw error;
    }
  },

  // Cancel appointment
  cancelAppointment: async (appointmentId: string, reason?: string) => {
    try {
      const response = await apiClient.delete(`/mysql/appointments/${appointmentId}`, {
        data: { reason }
      });
      console.log('Cancel appointment API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
      throw error;
    }
  },

  // Reschedule appointment
  rescheduleAppointment: async (appointmentId: string, newDate: string, newTime: string) => {
    try {
      const response = await apiClient.put(`/mysql/appointments/${appointmentId}/reschedule`, {
        appointmentDate: newDate,
        timeSlot: newTime
      });
      console.log('Reschedule appointment API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to reschedule appointment:', error);
      throw error;
    }
  },

  // Get available time slots for a date (placeholder for now)
  getAvailableSlots: async (date: string, department?: string) => {
    try {
      const params = new URLSearchParams();
      params.append('date', date);
      if (department) params.append('department', department);

      const response = await apiClient.get(`/mysql/appointments/slots?${params.toString()}`);
      console.log('Available slots API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      throw error;
    }
  }
};

// Profile API services
export const profileAPI = {
  // Update user details
  updateDetails: async (userData: any) => {
    const response = await apiClient.put('/auth/mysql/updatedetails', userData);
    return response.data;
  },

  // Update password
  updatePassword: async (passwords: { currentPassword: string; newPassword: string }) => {
    const response = await apiClient.put('/auth/mysql/updatepassword', passwords);
    return response.data;
  },

  // Update profile photo
  updatePhoto: async (formData: FormData) => {
    const response = await apiClient.put('/auth/mysql/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/mysql/me');
    return response.data;
  }
};

export default apiClient;
