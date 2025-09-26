import OnboardingFlow from '../screens/auth/OnboardingFlow'; import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../utils/colors';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const { state } = useAuth();

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary }}>
        <ActivityIndicator size="large" color={colors.text.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {state.isAuthenticated ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
      <Stack.Screen name="OnboardingFlow" component={OnboardingFlow} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
