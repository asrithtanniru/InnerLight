// src/data/programs/index.ts
import { Program, Challenge } from '../../types/program-types'
import { communicationSkillsProgram } from './communication-skills'
import { publicSpeakingProgram } from './public-speaking'
import { introProgram } from './intro'

export const programs: Program[] = [introProgram, communicationSkillsProgram, publicSpeakingProgram]

export const challenges: Challenge[] = [
  {
    id: 'talk-to-someone-new',
    title: 'Talk to Someone New Every Day',
    description: 'Challenge yourself to have a meaningful conversation with someone new each day.',
    type: 'daily',
    duration: '7 days',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop',
    difficulty: 'easy',
    category: 'Social Skills',
    relatedProgramIds: ['communication-skills'],
    tasks: [
      {
        id: 'day-1-new-conversation',
        title: 'Day 1: Start a conversation',
        description: "Start a conversation with someone you don't know well. Ask about their day or interests.",
        type: 'action',
        isCompleted: false,
        order: 1,
      },
      {
        id: 'day-1-reflection',
        title: 'Day 1: Reflect',
        description: 'How did it feel? What did you learn about them or yourself?',
        type: 'reflection',
        isCompleted: false,
        order: 2,
      },
    ],
  },
  {
    id: 'speak-with-confidence',
    title: 'Speak with Confidence',
    description: 'Build confidence in expressing your thoughts and opinions clearly.',
    type: 'weekly',
    duration: '17 days',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    difficulty: 'medium',
    category: 'Communication',
    relatedProgramIds: ['communication-skills', 'public-speaking'],
    tasks: [
      {
        id: 'confidence-week-1',
        title: 'Week 1: Practice assertive statements',
        description: 'Use "I" statements to express your needs and opinions confidently.',
        type: 'practice',
        isCompleted: false,
        order: 1,
      },
    ],
  },
  {
    id: 'express-needs-respectfully',
    title: 'Express Your Needs Respectfully',
    description: 'Learn to communicate your needs while maintaining respect for others.',
    type: 'daily',
    duration: '14 days',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=400&fit=crop',
    difficulty: 'medium',
    category: 'Assertiveness',
    relatedProgramIds: ['communication-skills'],
    tasks: [
      {
        id: 'needs-day-1',
        title: 'Day 1: Identify your needs',
        description: "Write down 3 needs you have that you haven't expressed recently.",
        type: 'reflection',
        isCompleted: false,
        order: 1,
      },
    ],
  },
]

// Helper functions
export const getProgramById = (id: string): Program | undefined => {
  return programs.find((program) => program.id === id)
}

export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find((challenge) => challenge.id === id)
}

export const getProgramsByCategory = (category: string): Program[] => {
  return programs.filter((program) => program.category === category)
}

export const getChallengesByCategory = (category: string): Challenge[] => {
  return challenges.filter((challenge) => challenge.category === category)
}

export const getRelatedChallenges = (programId: string): Challenge[] => {
  return challenges.filter((challenge) => challenge.relatedProgramIds?.includes(programId))
}

export const searchPrograms = (query: string): Program[] => {
  const lowercaseQuery = query.toLowerCase()
  return programs.filter(
    (program) =>
      program.title.toLowerCase().includes(lowercaseQuery) || program.description.toLowerCase().includes(lowercaseQuery) || program.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export const getAllCategories = (): string[] => {
  const categories = new Set<string>()
  programs.forEach((program) => categories.add(program.category))
  challenges.forEach((challenge) => categories.add(challenge.category))
  return Array.from(categories)
}
