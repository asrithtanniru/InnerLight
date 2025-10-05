// src/types/program-types.ts

export interface Slide {
  subtitle: any
  id: string
  type: 'content' | 'challenge' | 'reflection' | 'completion'
  title: string
  content: string
  actionButton?: string
  duration?: number // in seconds
  image?: string
  metadata?: {
    nextSlideId?: string
    previousSlideId?: string
    isSkippable?: boolean
    requiresCompletion?: boolean
  }
}

export interface Lesson {
  id: string
  title: string
  description: string
  type: 'lesson' | 'challenge'
  slides: Slide[]
  duration?: number // estimated duration in minutes
  order: number
  prerequisites?: string[] // lesson IDs that must be completed first
  image?: string
  metadata?: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    tags?: string[]
  }
}

export interface Module {
  id: string
  title: string
  description: string
  icon: string
  lessons: Lesson[]
  order: number
  estimatedDuration: string // e.g., "5-7 days"
  color?: string
  isLocked?: boolean
}

export interface Program {
  id: string
  title: string
  description: string
  image: string
  modules: Module[]
  totalLessons: number
  estimatedDuration: string // e.g., "2-3 weeks"
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  tags: string[]
  author?: string
  version: string
  lastUpdated: string
  prerequisites?: string[] // program IDs
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'milestone'
  duration: string // e.g., "7 days"
  image: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  tasks: ChallengeTask[]
  rewards?: string[]
  relatedProgramIds?: string[]
}

export interface ChallengeTask {
  id: string
  title: string
  description: string
  type: 'action' | 'reflection' | 'practice'
  isCompleted: boolean
  completedAt?: string
  order: number
}

// Progress Tracking Types
export interface SlideProgress {
  slideId: string
  lessonId: string
  moduleId: string
  programId: string
  isCompleted: boolean
  completedAt?: string
  timeSpent?: number // in seconds
  rating?: number // 1-5 stars
}

export interface LessonProgress {
  lessonId: string
  moduleId: string
  programId: string
  isCompleted: boolean
  completedAt?: string
  totalSlides: number
  completedSlides: number
  progressPercentage: number
  currentSlideId?: string
  timeSpent?: number // total time in seconds
  rating?: number
}

export interface ModuleProgress {
  moduleId: string
  programId: string
  isCompleted: boolean
  completedAt?: string
  totalLessons: number
  completedLessons: number
  progressPercentage: number
  currentLessonId?: string
  timeSpent?: number
}

export interface ProgramProgress {
  programId: string
  isEnrolled: boolean
  enrolledAt: string
  isCompleted: boolean
  completedAt?: string
  totalModules: number
  completedModules: number
  progressPercentage: number
  currentModuleId?: string
  currentLessonId?: string
  timeSpent?: number // total time in seconds
  rating?: number
  lastAccessedAt: string
}

export interface ChallengeProgress {
  challengeId: string
  isEnrolled: boolean
  enrolledAt: string
  isCompleted: boolean
  completedAt?: string
  currentDay: number
  totalDays: number
  progressPercentage: number
  completedTasks: string[]
  lastAccessedAt: string
}

// User Profile Types
export interface UserProfile {
  id: string
  enrolledPrograms: string[]
  enrolledChallenges: string[]
  completedPrograms: string[]
  completedChallenges: string[]
  totalTimeSpent: number
  streak: number
  lastActiveDate: string
  preferences: {
    reminderTime?: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    categories: string[]
  }
}

// API Response Types
export interface ProgramResponse {
  programs: Program[]
  total: number
  page: number
  limit: number
}

export interface ProgressResponse {
  programProgress: ProgramProgress[]
  challengeProgress: ChallengeProgress[]
  lastUpdated: string
}

// Utility Types
export type ProgressType = 'slide' | 'lesson' | 'module' | 'program' | 'challenge'

export interface ProgressUpdate {
  type: ProgressType
  id: string
  isCompleted: boolean
  timeSpent?: number
  rating?: number
  metadata?: Record<string, any>
}

export interface NavigationState {
  programId: string
  moduleId: string
  lessonId: string
  slideId: string
}

// Filter and Search Types
export interface ProgramFilter {
  category?: string
  difficulty?: string
  duration?: string
  tags?: string[]
  isEnrolled?: boolean
  isCompleted?: boolean
}

export interface SearchResult {
  type: 'program' | 'lesson' | 'challenge'
  id: string
  title: string
  description: string
  relevanceScore: number
}
