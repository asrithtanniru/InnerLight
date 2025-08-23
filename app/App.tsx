import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
    GoogleSignin.configure({
      webClientId: '361228792886-r9spd722ddgv4an05nugjg2c118tuu6r.apps.googleusercontent.com',
      profileImageSize: 120,
    });
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
