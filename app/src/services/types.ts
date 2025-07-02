// src/services/types.ts

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
  streak: number;
  totalDaysCompleted: number;
  currentProgram?: UserProgram;
  achievements: Achievement[];
}

export interface UserProgram {
  id: string;
  name: string;
  currentDay: number;
  totalDays: number;
  progress: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// Authentication Types
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface GoogleSignInRequest {
  idToken: string;
  accessToken: string;
}

// Program Types
export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalLessons: number;
  totalChallenges: number;
  totalExercises: number;
  thumbnail: string;
  isEnrolled: boolean;
}

export interface ProgramDay {
  dayNumber: number;
  title: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  lesson?: LessonItem;
  challenge?: LessonItem;
  exercise?: LessonItem;
}

export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  type: 'lesson' | 'challenge' | 'exercise';
  isCompleted: boolean;
}

// Lesson Content Types
export interface Lesson {
  id: string;
  title: string;
  content: LessonContent[];
  duration: string;
  keyTakeaways: string[];
}

export interface LessonContent {
  type: 'text' | 'image' | 'video' | 'audio' | 'quote' | 'list';
  data: string | string[];
}

// Chat Types
export interface ChatConversation {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageAt: string;
  isRead: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type: 'text' | 'image' | 'audio';
}

export interface ChatResponse {
  conversationId: string;
  messages: ChatMessage[];
}

// Explore Types
export interface ExploreCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  itemCount: number;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'exercise' | 'article' | 'video' | 'audio';
  thumbnail: string;
  isFavorited: boolean;
  category?: string;
}

// Progress Types
export interface ProgressOverview {
  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  weeklyProgress: WeeklyProgressItem[];
  monthlyStats: MonthlyStats;
}

export interface WeeklyProgressItem {
  day: string;
  completed: boolean;
}

export interface MonthlyStats {
  lessonsCompleted: number;
  challengesCompleted: number;
  exercisesCompleted: number;
  totalMinutes: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Chat: undefined;
  Explore: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ProgramOverview: { programId: string };
  Lesson: { lessonId: string; dayNumber: number };
  Challenge: { challengeId: string; dayNumber: number };
  Exercise: { exerciseId: string; dayNumber: number };
};

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  padding?: number;
  margin?: number;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  style?: any;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Storage Types
export interface CacheItem<T> {
  data: T;
  expiration: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  reminderTime?: string;
  language: string;
}
