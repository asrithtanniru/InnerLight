import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import OnboardingIntroScreen from '../screens/auth/OnboardingIntroScreen';
import OnboardingNameScreen from '../screens/auth/OnboardingNameScreen';
import OnboardingGoalsScreen from '../screens/auth/OnboardingGoalsScreen';
import OnboardingThankYouScreen from '../screens/auth/OnboardingThankYouScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="OnboardingIntro" component={OnboardingIntroScreen} />
      <Stack.Screen name="OnboardingName" component={OnboardingNameScreen} />
      <Stack.Screen name="OnboardingGoals" component={OnboardingGoalsScreen} />
      <Stack.Screen name="OnboardingThankYou" component={OnboardingThankYouScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
