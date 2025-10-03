// src/services/progressService.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProgramProgress, ModuleProgress, LessonProgress, SlideProgress, ChallengeProgress, UserProfile, ProgressUpdate } from '../types/program-types'
import { programService } from './programService'

class ProgressService {
  private readonly KEYS = {
    USER_PROFILE: 'user_profile',
    PROGRAM_PROGRESS: 'program_progress',
    MODULE_PROGRESS: 'module_progress',
    LESSON_PROGRESS: 'lesson_progress',
    SLIDE_PROGRESS: 'slide_progress',
    CHALLENGE_PROGRESS: 'challenge_progress',
  }

  /**
   * Initialize user profile
   */
  async initializeUserProfile(userId: string): Promise<UserProfile> {
    const defaultProfile: UserProfile = {
      id: userId,
      enrolledPrograms: [],
      enrolledChallenges: [],
      completedPrograms: [],
      completedChallenges: [],
      totalTimeSpent: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString(),
      preferences: {
        difficulty: 'beginner',
        categories: [],
      },
    }

    await AsyncStorage.setItem(this.KEYS.USER_PROFILE, JSON.stringify(defaultProfile))
    return defaultProfile
  }

  /**
   * Get user profile
   */
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const profileData = await AsyncStorage.getItem(this.KEYS.USER_PROFILE)
      return profileData ? JSON.parse(profileData) : null
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const currentProfile = await this.getUserProfile()
      if (!currentProfile) return null

      const updatedProfile = { ...currentProfile, ...updates }
      await AsyncStorage.setItem(this.KEYS.USER_PROFILE, JSON.stringify(updatedProfile))
      return updatedProfile
    } catch (error) {
      console.error('Error updating user profile:', error)
      return null
    }
  }

  /**
   * Enroll in a program
   */
  async enrollInProgram(programId: string): Promise<ProgramProgress | null> {
    try {
      const program = programService.getProgram(programId)
      if (!program) return null

      // Ensure user profile exists
      let profile = await this.getUserProfile()
      if (!profile) {
        profile = await this.initializeUserProfile('default-user')
      }

      // Check if already enrolled
      if (profile.enrolledPrograms.includes(programId)) {
        return await this.getProgramProgress(programId)
      }

      const programProgress: ProgramProgress = {
        programId,
        isEnrolled: true,
        enrolledAt: new Date().toISOString(),
        isCompleted: false,
        totalModules: program.modules.length,
        completedModules: 0,
        progressPercentage: 0,
        currentModuleId: program.modules[0]?.id,
        currentLessonId: program.modules[0]?.lessons[0]?.id,
        timeSpent: 0,
        lastAccessedAt: new Date().toISOString(),
      }

      // Save program progress
      await this.saveProgramProgress(programProgress)

      // Update user profile
      profile.enrolledPrograms.push(programId)
      await this.updateUserProfile(profile)

      return programProgress
    } catch (error) {
      console.error('Error enrolling in program:', error)
      return null
    }
  }

  /**
   * Get program progress
   */
  async getProgramProgress(programId: string): Promise<ProgramProgress | null> {
    try {
      const progressData = await AsyncStorage.getItem(`${this.KEYS.PROGRAM_PROGRESS}_${programId}`)
      return progressData ? JSON.parse(progressData) : null
    } catch (error) {
      console.error('Error getting program progress:', error)
      return null
    }
  }

  /**
   * Save program progress
   */
  async saveProgramProgress(progress: ProgramProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(`${this.KEYS.PROGRAM_PROGRESS}_${progress.programId}`, JSON.stringify(progress))
    } catch (error) {
      console.error('Error saving program progress:', error)
    }
  }

  /**
   * Get all enrolled programs with progress
   */
  async getEnrolledPrograms(): Promise<ProgramProgress[]> {
    try {
      const profile = await this.getUserProfile()
      if (!profile) return []

      const progressPromises = profile.enrolledPrograms.map(async (programId) => {
        return await this.getProgramProgress(programId)
      })

      const progressResults = await Promise.all(progressPromises)
      return progressResults.filter((progress): progress is ProgramProgress => progress !== null)
    } catch (error) {
      console.error('Error getting enrolled programs:', error)
      return []
    }
  }

  /**
   * Complete a slide
   */
  async completeSlide(slideId: string, lessonId: string, moduleId: string, programId: string, timeSpent?: number): Promise<void> {
    try {
      // Create slide progress
      const slideProgress: SlideProgress = {
        slideId,
        lessonId,
        moduleId,
        programId,
        isCompleted: true,
        completedAt: new Date().toISOString(),
        timeSpent: timeSpent || 0,
      }

      await AsyncStorage.setItem(`${this.KEYS.SLIDE_PROGRESS}_${slideId}`, JSON.stringify(slideProgress))

      // Update lesson progress
      await this.updateLessonProgress(lessonId, moduleId, programId)
    } catch (error) {
      console.error('Error completing slide:', error)
    }
  }

  /**
   * Update lesson progress
   */
  async updateLessonProgress(lessonId: string, moduleId: string, programId: string): Promise<void> {
    try {
      const lesson = programService.getLesson(programId, moduleId, lessonId)
      if (!lesson) return

      // Get completed slides for this lesson
      const slideProgressPromises = lesson.slides.map(async (slide) => {
        const progressData = await AsyncStorage.getItem(`${this.KEYS.SLIDE_PROGRESS}_${slide.id}`)
        return progressData ? JSON.parse(progressData) : null
      })

      const slideProgressResults = await Promise.all(slideProgressPromises)
      const completedSlides = slideProgressResults.filter((progress) => progress?.isCompleted).length
      const totalSlides = lesson.slides.length
      const isCompleted = completedSlides === totalSlides
      const progressPercentage = Math.round((completedSlides / totalSlides) * 100)

      const lessonProgress: LessonProgress = {
        lessonId,
        moduleId,
        programId,
        isCompleted,
        completedAt: isCompleted ? new Date().toISOString() : undefined,
        totalSlides,
        completedSlides,
        progressPercentage,
        timeSpent: slideProgressResults.reduce((total, progress) => total + (progress?.timeSpent || 0), 0),
      }

      await AsyncStorage.setItem(`${this.KEYS.LESSON_PROGRESS}_${lessonId}`, JSON.stringify(lessonProgress))

      // Update module progress
      await this.updateModuleProgress(moduleId, programId)
    } catch (error) {
      console.error('Error updating lesson progress:', error)
    }
  }

  /**
   * Update module progress
   */
  async updateModuleProgress(moduleId: string, programId: string): Promise<void> {
    try {
      const module = programService.getModule(programId, moduleId)
      if (!module) return

      // Get completed lessons for this module
      const lessonProgressPromises = module.lessons.map(async (lesson) => {
        const progressData = await AsyncStorage.getItem(`${this.KEYS.LESSON_PROGRESS}_${lesson.id}`)
        return progressData ? JSON.parse(progressData) : null
      })

      const lessonProgressResults = await Promise.all(lessonProgressPromises)
      const completedLessons = lessonProgressResults.filter((progress) => progress?.isCompleted).length
      const totalLessons = module.lessons.length
      const isCompleted = completedLessons === totalLessons
      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      const moduleProgress: ModuleProgress = {
        moduleId,
        programId,
        isCompleted,
        completedAt: isCompleted ? new Date().toISOString() : undefined,
        totalLessons,
        completedLessons,
        progressPercentage,
        timeSpent: lessonProgressResults.reduce((total, progress) => total + (progress?.timeSpent || 0), 0),
      }

      await AsyncStorage.setItem(`${this.KEYS.MODULE_PROGRESS}_${moduleId}`, JSON.stringify(moduleProgress))

      // Update program progress
      await this.updateProgramProgress(programId)
    } catch (error) {
      console.error('Error updating module progress:', error)
    }
  }

  /**
   * Update program progress
   */
  async updateProgramProgress(programId: string): Promise<void> {
    try {
      const program = programService.getProgram(programId)
      if (!program) return

      const currentProgress = await this.getProgramProgress(programId)
      if (!currentProgress) return

      // Get completed modules for this program
      const moduleProgressPromises = program.modules.map(async (module) => {
        const progressData = await AsyncStorage.getItem(`${this.KEYS.MODULE_PROGRESS}_${module.id}`)
        return progressData ? JSON.parse(progressData) : null
      })

      const moduleProgressResults = await Promise.all(moduleProgressPromises)
      const completedModules = moduleProgressResults.filter((progress) => progress?.isCompleted).length
      const totalModules = program.modules.length
      const isCompleted = completedModules === totalModules
      const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

      const updatedProgress: ProgramProgress = {
        ...currentProgress,
        isCompleted,
        completedAt: isCompleted ? new Date().toISOString() : currentProgress.completedAt,
        totalModules,
        completedModules,
        progressPercentage,
        timeSpent: moduleProgressResults.reduce((total, progress) => total + (progress?.timeSpent || 0), 0),
        lastAccessedAt: new Date().toISOString(),
      }

      await this.saveProgramProgress(updatedProgress)

      // Update user profile if program is completed
      if (isCompleted) {
        const profile = await this.getUserProfile()
        if (profile && !profile.completedPrograms.includes(programId)) {
          profile.completedPrograms.push(programId)
          await this.updateUserProfile(profile)
        }
      }
    } catch (error) {
      console.error('Error updating program progress:', error)
    }
  }

  /**
   * Get lesson progress
   */
  async getLessonProgress(lessonId: string): Promise<LessonProgress | null> {
    try {
      const progressData = await AsyncStorage.getItem(`${this.KEYS.LESSON_PROGRESS}_${lessonId}`)
      return progressData ? JSON.parse(progressData) : null
    } catch (error) {
      console.error('Error getting lesson progress:', error)
      return null
    }
  }

  /**
   * Get module progress
   */
  async getModuleProgress(moduleId: string): Promise<ModuleProgress | null> {
    try {
      const progressData = await AsyncStorage.getItem(`${this.KEYS.MODULE_PROGRESS}_${moduleId}`)
      return progressData ? JSON.parse(progressData) : null
    } catch (error) {
      console.error('Error getting module progress:', error)
      return null
    }
  }

  /**
   * Clear all progress (for testing/reset)
   */
  async clearAllProgress(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const progressKeys = keys.filter(
        (key) =>
          key.startsWith(this.KEYS.PROGRAM_PROGRESS) ||
          key.startsWith(this.KEYS.MODULE_PROGRESS) ||
          key.startsWith(this.KEYS.LESSON_PROGRESS) ||
          key.startsWith(this.KEYS.SLIDE_PROGRESS) ||
          key.startsWith(this.KEYS.CHALLENGE_PROGRESS)
      )

      await AsyncStorage.multiRemove(progressKeys)
    } catch (error) {
      console.error('Error clearing progress:', error)
    }
  }
}

export const progressService = new ProgressService()
