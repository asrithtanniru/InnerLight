import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/api';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
  givenName?: string;
  familyName?: string;
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
  signInWithGoogle: () => Promise<User | void>;
  signIn: (email: string) => Promise<void>;
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

  // Restore stored user/token on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('firebaseToken');
        if (raw) {
          const storedUser: User = JSON.parse(raw);
          if (token) apiService.setToken(token);
          dispatch({ type: 'SET_USER', payload: storedUser });
          console.log('🔁 Restored user from storage');
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (err) {
        console.warn('⚠️ Failed to restore auth state:', err);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
  }, []);

  // Google sign-in
  const signInWithGoogle = async (): Promise<User | void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo: any = await GoogleSignin.signIn();
      console.log('📱 Google Sign-In User Info:', JSON.stringify(userInfo, null, 2));

      // Attempt to fetch idToken (may not be available on all setups)
      let idToken: string | null = null;
      try {
        const tokens = await GoogleSignin.getTokens();
        idToken = tokens.idToken ?? null;
        console.log('🔑 Google Tokens:', JSON.stringify(tokens, null, 2));
      } catch (tErr) {
        console.warn('⚠️ Could not get tokens after signIn:', tErr);
      }

      const profile = userInfo?.user || {};
      console.log('👤 User Profile:', JSON.stringify(profile, null, 2));

      const appUser: User = {
        id: profile.id || 'google-user',
        email: profile.email || '',
        name: profile.name || 'User',
        photo: profile.photo,
        givenName: profile.givenName,
        familyName: profile.familyName,
        streak: 0,
        totalDaysCompleted: 0,
        lastActive: new Date(),
      };      // Persist and set token for api calls
      await AsyncStorage.setItem('user', JSON.stringify(appUser));
      if (idToken) {
        await AsyncStorage.setItem('firebaseToken', idToken);
        apiService.setToken(idToken);
      }

      dispatch({ type: 'SET_USER', payload: appUser });
    } catch (err: any) {
      // Helpful guidance for common native config errors
      const message = String(err?.message || err);
      if (message.includes('DEVELOPER_ERROR')) {
        console.error('❌ Sign in error: DEVELOPER_ERROR — likely native config issue:', err);
        throw new Error(
          'DEVELOPER_ERROR: Native Google Sign-In configuration issue. See https://react-native-google-signin.github.io/docs/troubleshooting and ensure the correct webClientId / OAuth SHA keys are set in your Firebase/Google Cloud Console. Rebuild the app after updating credentials.'
        );
      }

      if (err && err.code) {
        switch (err.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.warn('Sign in cancelled');
            break;
          case statusCodes.IN_PROGRESS:
            console.warn('Sign in in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.warn('Play services not available');
            break;
          default:
            console.error('❌ Sign in error:', err);
        }
      } else {
        console.error('❌ Sign in error:', err);
      }
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // DEV helper: sign in with an email (demo account)
  const signIn = async (email: string) => {
    console.log(`🚀 DEV signIn called for ${email}`);
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const demoUser: User = {
        id: 'demo-user',
        email: email || 'demo@innerlight.com',
        name: 'Demo User',
        avatar: undefined,
        streak: 0,
        totalDaysCompleted: 0,
        lastActive: new Date(),
      };

      await AsyncStorage.setItem('user', JSON.stringify(demoUser));
      const placeholderToken = 'demo-token';
      await AsyncStorage.setItem('firebaseToken', placeholderToken);
      apiService.setToken(placeholderToken);
      dispatch({ type: 'SET_USER', payload: demoUser });
      console.log('✅ DEV signIn completed');
    } catch (error) {
      console.error('❌ DEV signIn error:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const signOut = async () => {
    console.log('🚪 Starting sign out process...');
    try {
      try {
        // Sign out from Google (if configured)
        await GoogleSignin.signOut();
      } catch (gErr) {
        console.warn('⚠️ Google signOut failed or not configured:', gErr);
      }

      // Clear storage and api token
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('firebaseToken');
      apiService.clearToken();
      dispatch({ type: 'SIGN_OUT' });
      console.log('✅ Sign out completed locally');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    state,
    signInWithGoogle,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
