import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '361228792886-a1j7ib1dlgru6diov97nfu3od5h5h9ff.apps.googleusercontent.com',
    // androidClientId: '361228792886-op6s9q0llujv1qi2572qqeav14ji6qiu.apps.googleusercontent.com',
    // offlineAccess: true,
    profileImageSize: 120,
  });
};

// Initialize Google Sign-In
export const initGoogleSignIn = async () => {
  try {
    // First, try to sign out to clear any existing state
    try {
      await GoogleSignin.signOut();
      console.log('Cleared previous sign-in state');
    } catch (e) {
      console.log('No previous sign-in state to clear');
    }

    // Check Play Services
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('Play Services check passed');

    // Try silent sign in
    await GoogleSignin.signInSilently();
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('Got current user:', currentUser?.user);
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
