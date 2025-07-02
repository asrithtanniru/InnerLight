// src/services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.innerlight.app'; // Replace with actual API URL

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private async loadToken() {
    try {
      this.token = await AsyncStorage.getItem('accessToken');
    } catch (error) {
      console.error('Error loading token:', error);
    }
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = await this.getHeaders();

      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Authentication
  async googleSignIn(idToken: string, accessToken: string) {
    return this.request('/auth/google-signin', {
      method: 'POST',
      body: JSON.stringify({ idToken, accessToken }),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async logout() {
    const response = await this.request('/auth/logout', { method: 'POST' });
    this.token = null;
    await AsyncStorage.removeItem('accessToken');
    return response;
  }

  // User Profile
  async getUserProfile() {
    return this.request('/user/profile');
  }

  async updateUserProfile(data: { name?: string; avatar?: string }) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Programs
  async getPrograms() {
    return this.request('/programs');
  }

  async getProgramDays(programId: string) {
    return this.request(`/programs/${programId}/days`);
  }

  // Lessons
  async getLesson(lessonId: string) {
    return this.request(`/lessons/${lessonId}`);
  }

  async completeLesson(lessonId: string) {
    return this.request(`/lessons/${lessonId}/complete`, { method: 'POST' });
  }

  // Chat
  async getChatConversations() {
    return this.request('/chat/conversations');
  }

  async getChatMessages(conversationId: string) {
    return this.request(`/chat/conversations/${conversationId}/messages`);
  }

  async sendChatMessage(conversationId: string, content: string) {
    return this.request(`/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, type: 'text' }),
    });
  }

  // Explore
  async getExploreCategories() {
    return this.request('/explore/categories');
  }

  async getCategoryContent(categoryId: string) {
    return this.request(`/explore/categories/${categoryId}/content`);
  }

  async getFeaturedContent() {
    return this.request('/explore/featured');
  }

  // Progress
  async getProgressOverview() {
    return this.request('/progress/overview');
  }

  // Set token for authenticated requests
  setToken(token: string) {
    this.token = token;
    AsyncStorage.setItem('accessToken', token);
  }
}

export const apiService = new ApiService();
export default apiService;
