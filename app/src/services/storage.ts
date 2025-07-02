// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

class StorageService {
  // Regular AsyncStorage methods
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // JSON storage methods
  async setObject(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error setting object ${key}:`, error);
      throw error;
    }
  }

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await this.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting object ${key}:`, error);
      return null;
    }
  }

  // Secure storage methods (for sensitive data)
  async setSecureItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`Error setting secure item ${key}:`, error);
      throw error;
    }
  }

  async getSecureItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`Error getting secure item ${key}:`, error);
      return null;
    }
  }

  async removeSecureItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`Error removing secure item ${key}:`, error);
      throw error;
    }
  }

  // User preferences
  async setUserPreferences(preferences: any): Promise<void> {
    await this.setObject('userPreferences', preferences);
  }

  async getUserPreferences(): Promise<any> {
    return await this.getObject('userPreferences');
  }

  // Authentication tokens
  async setAuthTokens(accessToken: string, refreshToken: string): Promise<void> {
    await this.setSecureItem('accessToken', accessToken);
    await this.setSecureItem('refreshToken', refreshToken);
  }

  async getAuthTokens(): Promise<{ accessToken: string | null; refreshToken: string | null }> {
    const accessToken = await this.getSecureItem('accessToken');
    const refreshToken = await this.getSecureItem('refreshToken');
    return { accessToken, refreshToken };
  }

  async clearAuthTokens(): Promise<void> {
    await this.removeSecureItem('accessToken');
    await this.removeSecureItem('refreshToken');
  }

  // User data
  async setUserData(userData: any): Promise<void> {
    await this.setObject('userData', userData);
  }

  async getUserData(): Promise<any> {
    return await this.getObject('userData');
  }

  async clearUserData(): Promise<void> {
    await this.removeItem('userData');
  }

  // App state
  async setAppState(state: any): Promise<void> {
    await this.setObject('appState', state);
  }

  async getAppState(): Promise<any> {
    return await this.getObject('appState');
  }

  // Cache management
  async setCacheItem(key: string, value: any, expirationMinutes: number = 60): Promise<void> {
    const expirationTime = Date.now() + (expirationMinutes * 60 * 1000);
    const cacheItem = {
      data: value,
      expiration: expirationTime,
    };
    await this.setObject(`cache_${key}`, cacheItem);
  }

  async getCacheItem<T>(key: string): Promise<T | null> {
    const cacheItem = await this.getObject<{ data: T; expiration: number }>(`cache_${key}`);

    if (!cacheItem) {
      return null;
    }

    if (Date.now() > cacheItem.expiration) {
      await this.removeItem(`cache_${key}`);
      return null;
    }

    return cacheItem.data;
  }

  async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

export const storageService = new StorageService();
export default storageService;
