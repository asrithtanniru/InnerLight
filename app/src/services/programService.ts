// src/services/programService.ts
import { programs, challenges, getProgramById, getChallengeById } from '../data/programs'
import { Program, Challenge, Module, Lesson } from '../types/program-types'

class ProgramService {
  /**
   * Get all available programs
   */
  getAllPrograms(): Program[] {
    return programs
  }

  /**
   * Get all available challenges
   */
  getAllChallenges(): Challenge[] {
    return challenges
  }

  /**
   * Get a specific program by ID
   */
  getProgram(programId: string): Program | null {
    return getProgramById(programId) || null
  }

  /**
   * Get a specific challenge by ID
   */
  getChallenge(challengeId: string): Challenge | null {
    return getChallengeById(challengeId) || null
  }

  /**
   * Get a specific module from a program
   */
  getModule(programId: string, moduleId: string): Module | null {
    const program = this.getProgram(programId)
    if (!program) return null

    return program.modules.find((module) => module.id === moduleId) || null
  }

  /**
   * Get a specific lesson from a module
   */
  getLesson(programId: string, moduleId: string, lessonId: string): Lesson | null {
    const module = this.getModule(programId, moduleId)
    if (!module) return null

    return module.lessons.find((lesson) => lesson.id === lessonId) || null
  }

  /**
   * Get the next lesson in a program
   */
  getNextLesson(
    programId: string,
    currentModuleId: string,
    currentLessonId: string
  ): {
    moduleId: string
    lessonId: string
  } | null {
    const program = this.getProgram(programId)
    if (!program) return null

    const currentModuleIndex = program.modules.findIndex((m) => m.id === currentModuleId)
    if (currentModuleIndex === -1) return null

    const currentModule = program.modules[currentModuleIndex]
    const currentLessonIndex = currentModule.lessons.findIndex((l) => l.id === currentLessonId)

    if (currentLessonIndex === -1) return null

    // Check if there's a next lesson in the current module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      return {
        moduleId: currentModuleId,
        lessonId: currentModule.lessons[currentLessonIndex + 1].id,
      }
    }

    // Check if there's a next module
    if (currentModuleIndex < program.modules.length - 1) {
      const nextModule = program.modules[currentModuleIndex + 1]
      if (nextModule.lessons.length > 0) {
        return {
          moduleId: nextModule.id,
          lessonId: nextModule.lessons[0].id,
        }
      }
    }

    return null // No more lessons
  }

  /**
   * Get the previous lesson in a program
   */
  getPreviousLesson(
    programId: string,
    currentModuleId: string,
    currentLessonId: string
  ): {
    moduleId: string
    lessonId: string
  } | null {
    const program = this.getProgram(programId)
    if (!program) return null

    const currentModuleIndex = program.modules.findIndex((m) => m.id === currentModuleId)
    if (currentModuleIndex === -1) return null

    const currentModule = program.modules[currentModuleIndex]
    const currentLessonIndex = currentModule.lessons.findIndex((l) => l.id === currentLessonId)

    if (currentLessonIndex === -1) return null

    // Check if there's a previous lesson in the current module
    if (currentLessonIndex > 0) {
      return {
        moduleId: currentModuleId,
        lessonId: currentModule.lessons[currentLessonIndex - 1].id,
      }
    }

    // Check if there's a previous module
    if (currentModuleIndex > 0) {
      const previousModule = program.modules[currentModuleIndex - 1]
      if (previousModule.lessons.length > 0) {
        return {
          moduleId: previousModule.id,
          lessonId: previousModule.lessons[previousModule.lessons.length - 1].id,
        }
      }
    }

    return null // No previous lessons
  }

  /**
   * Get programs by category
   */
  getProgramsByCategory(category: string): Program[] {
    return programs.filter((program) => program.category === category)
  }

  /**
   * Search programs by title, description, or tags
   */
  searchPrograms(query: string): Program[] {
    const lowercaseQuery = query.toLowerCase()
    return programs.filter(
      (program) =>
        program.title.toLowerCase().includes(lowercaseQuery) || program.description.toLowerCase().includes(lowercaseQuery) || program.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  /**
   * Get challenges related to a program
   */
  getRelatedChallenges(programId: string): Challenge[] {
    return challenges.filter((challenge) => challenge.relatedProgramIds?.includes(programId))
  }

  /**
   * Get all available categories
   */
  getCategories(): string[] {
    const categories = new Set<string>()
    programs.forEach((program) => categories.add(program.category))
    return Array.from(categories)
  }

  /**
   * Get program statistics
   */
  getProgramStats(programId: string): {
    totalModules: number
    totalLessons: number
    estimatedDuration: string
    difficulty: string
  } | null {
    const program = this.getProgram(programId)
    if (!program) return null

    const totalLessons = program.modules.reduce((total, module) => total + module.lessons.length, 0)

    return {
      totalModules: program.modules.length,
      totalLessons,
      estimatedDuration: program.estimatedDuration,
      difficulty: program.difficulty,
    }
  }
}

export const programService = new ProgramService()
