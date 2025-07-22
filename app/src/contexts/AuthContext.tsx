import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { auth, signInWithGoogleCredential, signOutFirebase, onAuthStateChanged, FirebaseUser } from '../config/firebase';
import { apiService } from '../services/api';

// Complete the auth session
WebBrowser.maybeCompleteAuthSession();

// Debug environment variables
console.log('🔍 Environment Variables Check:');
console.log('EXPO_PUBLIC_FIREBASE_API_KEY:', process.env.EXPO_PUBLIC_FIREBASE_API_KEY ? 'SET' : 'NOT SET');
console.log('EXPO_PUBLIC_FIREBASE_PROJECT_ID:', process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);
console.log('EXPO_PUBLIC_GOOGLE_CLIENT_ID:', process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID);
console.log('EXPO_PUBLIC_API_URL:', process.env.EXPO_PUBLIC_API_URL);

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  streak?: number;
  totalDaysCompleted?: number;
  currentProgram?: string;
  lastActive?: Date;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SIGN_OUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Set up Google OAuth request
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    console.log('🔍 Setting up Firebase auth state listener...');

    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      console.log('🔥 Firebase auth state changed:', firebaseUser ? 'USER LOGGED IN' : 'NO USER');

      if (firebaseUser) {
        try {
          // Convert Firebase user to our app's user format
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            avatar: firebaseUser.photoURL || undefined,
            streak: 0,
            totalDaysCompleted: 0,
            lastActive: new Date(),
          };

          console.log('👤 Converted Firebase user to app user:', user);

          // Get Firebase ID token for backend API calls
          const idToken = await firebaseUser.getIdToken();
          console.log('🔑 Got Firebase ID token for backend');

          // Store user data and token
          await AsyncStorage.setItem('user', JSON.stringify(user));
          await AsyncStorage.setItem('firebaseToken', idToken);
          apiService.setToken(idToken);

          // Send user data to backend to sync
          try {
            await apiService.syncUserWithBackend(user, idToken);
            console.log('✅ User synced with backend');
          } catch (error) {
            console.warn('⚠️ Failed to sync with backend:', error);
            // Continue anyway - user is still authenticated
          }

          dispatch({ type: 'SET_USER', payload: user });
        } catch (error) {
          console.error('❌ Error processing Firebase user:', error);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        // User signed out
        console.log('👋 User signed out, clearing data...');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('firebaseToken');
        apiService.clearToken();
        dispatch({ type: 'SIGN_OUT' });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    console.log('🚀 Starting Google OAuth flow...');
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Use expo-auth-session to get Google OAuth token
      console.log('📱 Prompting Google OAuth...');
      const result = await promptAsync();

      if (result?.type === 'success') {
        console.log('✅ Google OAuth successful, getting ID token...');

        // Get the ID token from the result
        const { id_token } = result.params;

        if (!id_token) {
          throw new Error('No ID token received from Google OAuth');
        }

        console.log('🔑 Got ID token from Google, signing in with Firebase...');

        // Sign in with Firebase using the Google ID token
        const firebaseUser = await signInWithGoogleCredential(id_token);
        console.log('✅ Firebase Google Sign-In successful:', firebaseUser.email);

        // The Firebase auth state listener will handle the rest
        // No need to manually dispatch here as Firebase will trigger the listener

      } else if (result?.type === 'cancel') {
        console.log('❌ Google OAuth cancelled by user');
        dispatch({ type: 'SET_LOADING', payload: false });
      } else {
        console.log('❌ Google OAuth failed:', result);
        dispatch({ type: 'SET_LOADING', payload: false });
        throw new Error('Google OAuth failed');
      }

    } catch (error) {
      console.error('❌ Google Sign-In error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const signOut = async () => {
    console.log('🚪 Starting sign out process...');
    try {
      await signOutFirebase();
      // Firebase auth state listener will handle clearing the state
      console.log('✅ Sign out successful');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      throw error;
    }
  };

  const value = {
    state,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
