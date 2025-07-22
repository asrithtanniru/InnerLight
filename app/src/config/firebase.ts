import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, User } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';

// Complete the auth session
WebBrowser.maybeCompleteAuthSession();

// Your Firebase config (you'll get this from Firebase Console)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Debug environment variables
console.log('🔥 Firebase Config Check:');
console.log('API Key:', process.env.EXPO_PUBLIC_FIREBASE_API_KEY ? 'SET' : 'NOT SET');
console.log('Auth Domain:', process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log('Project ID:', process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerData: any[];
}

// This function will be called from AuthContext with the Google OAuth result
export const signInWithGoogleCredential = async (idToken: string): Promise<FirebaseUser> => {
  try {
    console.log('🚀 Starting Firebase Google Sign-In with credential...');

    // Create credential with Firebase
    const credential = GoogleAuthProvider.credential(idToken);

    // Sign in with Firebase
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    console.log('👤 Firebase user signed in:', user.email);

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerData: user.providerData,
    };
  } catch (error) {
    console.error('❌ Firebase Google Sign-In error:', error);
    throw error;
  }
};

export const signOutFirebase = async (): Promise<void> => {
  try {
    await auth.signOut();
    console.log('👋 Firebase user signed out');
  } catch (error) {
    console.error('❌ Firebase sign out error:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
}; 
