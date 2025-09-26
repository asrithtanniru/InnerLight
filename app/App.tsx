import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';

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
        console.log('Google Sign-In configured');

        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        console.log('Play Services available');
      } catch (error) {
        console.error('Google Sign-In setup error:', error);
      }
    };

    setupGoogleSignIn();

    // const registerForPushNotificationsAsync = async () => {
    //   let token;

    //   if (Device.isDevice) {
    //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //     let finalStatus = existingStatus;

    //     if (existingStatus !== 'granted') {
    //       const { status } = await Notifications.requestPermissionsAsync();
    //       finalStatus = status;
    //     }

    //     if (finalStatus !== 'granted') {
    //       console.log('Failed to get push token for push notification!');
    //       return;
    //     }

    //     token = (await Notifications.getExpoPushTokenAsync()).data;
    //     console.log('Expo Push Token:', token);
    //   } else {
    //     console.log('Must use physical device for Push Notifications');
    //   }

    //   if (Platform.OS === 'android') {
    //     Notifications.setNotificationChannelAsync('default', {
    //       name: 'default',
    //       importance: Notifications.AndroidImportance.MAX,
    //       vibrationPattern: [0, 250, 250, 250],
    //       lightColor: '#FF231F7C',
    //     });
    //   }

    //   return token;
    // };

    // registerForPushNotificationsAsync();
  }, []);

  if (!fontsLoaded) {
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
