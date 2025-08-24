import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { configureGoogleSignIn } from './src/config/google';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    const setupGoogleSignIn = async () => {
      try {
        GoogleSignin.configure({
          webClientId: '361228792886-a1j7ib1dlgru6diov97nfu3od5h5h9ff.apps.googleusercontent.com',
          offlineAccess: true,
          forceCodeForRefreshToken: true,
          profileImageSize: 120,
        });
        console.log('✅ Google Sign-In configured');

        // Check if Play Services are available
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        console.log('✅ Play Services available');
      } catch (error) {
        console.error('❌ Google Sign-In setup error:', error);
      }
    };

    setupGoogleSignIn();
  }, []);

  if (!fontsLoaded) {
    // safe to return here, AFTER hooks are called
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar barStyle="dark-content" backgroundColor="#8B5CF6" />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
