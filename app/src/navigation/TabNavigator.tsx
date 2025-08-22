// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import HomeScreen from '../screens/main/HomeScreen';
import { ChatScreen } from '../screens/main/ChatScreen';
import { ExploreScreen } from '../screens/main/ExploreScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { ProgramOverviewScreen } from '../screens/program/ProgramOverviewScreen';
import { LessonScreen } from '../screens/program/LessonScreen';
import { ChallengeScreen } from '../screens/program/ChallengeScreen';
import { ExerciseScreen } from '../screens/program/ExerciseScreen';
import { Typography } from '../utils/typography';

// Define the param list for the Home Stack
export type HomeStackParamList = {
  HomeMain: undefined;
  ProgramOverview: { programId: string };
  Lesson: { lessonId: string; dayNumber: number };
  Challenge: { challengeId: string; dayNumber: number };
  Exercise: { exerciseId: string; dayNumber: number };
};

// Define the param list for the Tab Navigator
export type TabParamList = {
  Home: undefined;
  Chat: undefined;
  Explore: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<HomeStackParamList>();

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const getIconName = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return 'home';
      case 'Chat':
        return 'chatbubble';
      case 'Explore':
        return 'compass';
      case 'Profile':
        return 'person';
      default:
        return 'circle';
    }
  };

  return (
    <Ionicons
      name={focused ? getIconName(name) : `${getIconName(name)}-outline` as any}
      size={24}
      color={focused ? colors.primary.main : colors.text.secondary}
    />
  );
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="ProgramOverview" component={ProgramOverviewScreen} />
    <Stack.Screen name="Lesson" component={LessonScreen} />
    <Stack.Screen name="Challenge" component={ChallengeScreen} />
    <Stack.Screen name="Exercise" component={ExerciseScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.card,
          borderTopColor: colors.border.light,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
          shadowColor: colors.shadow.main,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
          fontFamily: Typography.caption.fontFamily,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ tabBarLabel: 'AI Coach' }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
