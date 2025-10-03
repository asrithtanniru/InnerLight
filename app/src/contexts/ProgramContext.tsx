// src/contexts/ProgramContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ProgramProgress, Program, Challenge } from '../types/program-types'
import { progressService } from '../services/progressService'
import { programService } from '../services/programService'

interface ProgramContextState {
  enrolledPrograms: ProgramProgress[]
  programsMap: { [key: string]: Program }
  challenges: Challenge[]
  isLoading: boolean
  refreshPrograms: () => Promise<void>
  enrollInProgram: (programId: string) => Promise<boolean>
  getProgramProgress: (programId: string) => ProgramProgress | undefined
}

const ProgramContext = createContext<ProgramContextState | undefined>(undefined)

interface ProgramProviderProps {
  children: ReactNode
}

export const ProgramProvider: React.FC<ProgramProviderProps> = ({ children }) => {
  const [enrolledPrograms, setEnrolledPrograms] = useState<ProgramProgress[]>([])
  const [programsMap, setProgramsMap] = useState<{ [key: string]: Program }>({})
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadPrograms = async () => {
    try {
      setIsLoading(true)

      // Load enrolled programs
      const userPrograms = await progressService.getEnrolledPrograms()
      setEnrolledPrograms(userPrograms)

      // Load program details for enrolled programs
      const programMap: { [key: string]: Program } = {}
      for (const progress of userPrograms) {
        const program = programService.getProgram(progress.programId)
        if (program) {
          programMap[program.id] = program
        }
      }
      setProgramsMap(programMap)

      // Load challenges
      const allChallenges = programService.getAllChallenges()
      setChallenges(allChallenges)
    } catch (error) {
      console.error('Error loading programs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshPrograms = async () => {
    await loadPrograms()
  }

  const enrollInProgram = async (programId: string): Promise<boolean> => {
    try {
      const progress = await progressService.enrollInProgram(programId)
      if (progress) {
        // Refresh the data after enrollment
        await refreshPrograms()
        return true
      }
      return false
    } catch (error) {
      console.error('Error enrolling in program:', error)
      return false
    }
  }

  const getProgramProgress = (programId: string): ProgramProgress | undefined => {
    return enrolledPrograms.find((p) => p.programId === programId)
  }

  useEffect(() => {
    loadPrograms()
  }, [])

  const value: ProgramContextState = {
    enrolledPrograms,
    programsMap,
    challenges,
    isLoading,
    refreshPrograms,
    enrollInProgram,
    getProgramProgress,
  }

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
}

export const useProgramContext = (): ProgramContextState => {
  const context = useContext(ProgramContext)
  if (context === undefined) {
    throw new Error('useProgramContext must be used within a ProgramProvider')
  }
  return context
}
