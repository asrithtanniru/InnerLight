import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // The webClientId is required for Google Sign-In
    // Replace this with your actual web client ID from the Google Cloud Console
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    // Optional: If you're using server-side authentication, you can set the following
    // offlineAccess: true,
    // forceCodeForRefreshToken: true,
    // iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  });
};

// Initialize Google Sign-In
export const initGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signInSilently();
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  } catch (error) {
    console.log('Google Sign-In initialization error:', error);
    return null;
  }
};

export const signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
    return true;
  } catch (error) {
    console.error('Google Sign-Out error:', error);
    return false;
  }
};
