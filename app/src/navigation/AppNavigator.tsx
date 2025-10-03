import OnboardingFlow from '../screens/auth/OnboardingFlow'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../contexts/AuthContext'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'
import { View, ActivityIndicator } from 'react-native'
import { colors } from '../utils/colors'
import { ProgramDetailScreen } from '../screens/program/ProgramDetailScreen'
import { LessonSlideScreen } from '../screens/program/LessonSlideScreen'

// Define the navigation stack types
export type RootStackParamList = {
  Main: { screen?: string } | undefined
  Auth: undefined
  ProgramDetail: {
    programId: string
    source?: string
  }
  LessonSlide: {
    programId: string
    moduleId: string
    lessonId: string
    slideIndex?: number
  }
  OnboardingFlow: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  const { state } = useAuth()

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary }}>
        <ActivityIndicator size="large" color={colors.text.primary} />
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {state.isAuthenticated ? (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} />
          <Stack.Screen name="LessonSlide" component={LessonSlideScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
      <Stack.Screen name="OnboardingFlow" component={OnboardingFlow} />
    </Stack.Navigator>
  )
}

export default AppNavigator
