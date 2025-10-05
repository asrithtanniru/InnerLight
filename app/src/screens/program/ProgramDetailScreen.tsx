// src/screens/program/ProgramDetailScreen.tsx
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { Program, ProgramProgress, ModuleProgress, LessonProgress } from '../../types/program-types'
import { programService } from '../../services/programService'
import { progressService } from '../../services/progressService'
import { useProgramContext } from '../../contexts/ProgramContext'
import { ModuleCard } from '../../components/program/ModuleCard'
import { LessonCard } from '../../components/program/LessonCard'
import { colors } from '../../utils/colors'
import { Typography } from '../../utils/typography'
import { useCustomAlert } from '../../hooks/useCustomAlert'
import CustomAlert from '../../components/common/CustomAlert'

type RootStackParamList = {
  ProgramDetail: { programId: string; source?: string }
  LessonSlide: {
    programId: string
    moduleId: string
    lessonId: string
    slideIndex?: number
  }
  Main: { screen?: string }
}

type ProgramDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProgramDetail'>
type ProgramDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProgramDetail'>

interface Props {
  route: ProgramDetailScreenRouteProp
  navigation: ProgramDetailScreenNavigationProp
}

const { width } = Dimensions.get('window')

export const ProgramDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { programId } = route.params
  const { enrollInProgram: enrollInProgramContext, getProgramProgress } = useProgramContext()
  const { showAlert, alertProps } = useCustomAlert()

  const [program, setProgram] = useState<Program | null>(null)
  const [programProgress, setProgramProgress] = useState<ProgramProgress | null>(null)
  const [moduleProgresses, setModuleProgresses] = useState<{ [key: string]: ModuleProgress }>({})
  const [lessonProgresses, setLessonProgresses] = useState<{ [key: string]: LessonProgress }>({})
  const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgramData()
  }, [programId])

  useFocusEffect(
    React.useCallback(() => {
      loadProgramData()
    }, [programId])
  )

  const loadProgramData = async () => {
    try {
      setLoading(true)

      // Load program
      const programData = programService.getProgram(programId)
      if (!programData) {
        showAlert({
          title: 'Error',
          message: 'Program not found',
          type: 'error',
          onConfirm: () => navigation.goBack(),
        })
        return
      }
      setProgram(programData)

      const progress = getProgramProgress(programId)
      setProgramProgress(progress || null)

      const moduleProgressData: { [key: string]: ModuleProgress } = {}
      for (const module of programData.modules) {
        const moduleProgress = await progressService.getModuleProgress(module.id)
        if (moduleProgress) {
          moduleProgressData[module.id] = moduleProgress
        }
      }
      setModuleProgresses(moduleProgressData)

      const lessonProgressData: { [key: string]: LessonProgress } = {}
      for (const module of programData.modules) {
        for (const lesson of module.lessons) {
          const lessonProgress = await progressService.getLessonProgress(lesson.id)
          if (lessonProgress) {
            lessonProgressData[lesson.id] = lessonProgress
          }
        }
      }
      setLessonProgresses(lessonProgressData)

      if (!progress || progress.progressPercentage < 100) {
        const firstIncompleteModule = programData.modules.find((module) => !moduleProgressData[module.id]?.isCompleted)
        if (firstIncompleteModule) {
          setExpandedModules({ [firstIncompleteModule.id]: true })
        }
      }
    } catch (error) {
      console.error('Error loading program data:', error)
      showAlert({
        title: 'Error',
        message: 'Failed to load program data',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEnrollPress = async () => {
    try {
      if (!program) return

      const success = await enrollInProgramContext(programId)
      if (success) {
        await loadProgramData()
        showAlert({
          title: 'Success',
          message: `You have been enrolled in ${program.title}!`,
          type: 'success',
        })
      } else {
        showAlert({
          title: 'Error',
          message: 'Failed to enroll in program. Please try again.',
          type: 'error',
        })
      }
    } catch (error) {
      console.error('Error enrolling in program:', error)
      showAlert({
        title: 'Error',
        message: 'Failed to enroll in program. Please try again.',
        type: 'error',
      })
    }
  }

  const handleModuleToggle = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  const handleLessonPress = (moduleId: string, lessonId: string) => {
    navigation.navigate('LessonSlide', {
      programId,
      moduleId,
      lessonId,
      slideIndex: 0,
    })
  }

  const isLessonLocked = (moduleId: string, lessonId: string): boolean => {
    return false
  }

  if (loading || !program) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: program.image }} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack()
                } else {
                  navigation.navigate('Main', { screen: 'Explore' })
                }
              }}
            >
              <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Program Info */}
        <View style={styles.programInfoContainer}>
          <Text style={styles.programTitle}>{program.title}</Text>
          <Text style={styles.programDescription}>{program.description}</Text>

          {/* Progress */}
          {programProgress && (
            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>{programProgress.progressPercentage}% completed</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${programProgress.progressPercentage}%` }]} />
              </View>
            </View>
          )}

          {/* Enroll Button */}
          {!programProgress?.isEnrolled && (
            <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
              <Text style={styles.enrollButtonText}>Start Program</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Modules Container with white background */}
        <View style={styles.modulesWrapper}>
          {program.modules.map((module, index) => (
            <View key={module.id}>
              <ModuleCard
                module={module}
                onPress={() => handleModuleToggle(module.id)}
                onToggleExpand={() => handleModuleToggle(module.id)}
                isCompleted={moduleProgresses[module.id]?.isCompleted || false}
                progressPercentage={moduleProgresses[module.id]?.progressPercentage || 0}
                isExpanded={expandedModules[module.id] || false}
              />

              {/* Lessons - shown when module is expanded */}
              {expandedModules[module.id] && (
                <View style={styles.lessonsContainer}>
                  {module.lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      title={lesson.title}
                      duration={lesson.duration ? `${lesson.duration} min` : '5 min'}
                      type={lesson.type}
                      onPress={() => handleLessonPress(module.id, lesson.id)}
                      isCompleted={lessonProgresses[lesson.id]?.isCompleted || false}
                      isLocked={isLessonLocked(module.id, lesson.id)}
                    />
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <CustomAlert {...alertProps} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.body1,
    color: colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
    height: Math.max(250, width * 0.6),
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  programInfoContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    marginBottom: 16,
  },
  programTitle: {
    ...Typography.h2,
    fontSize: 28,
    color: colors.text.primary,
    marginBottom: 12,
  },
  programDescription: {
    ...Typography.body1,
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressLabel: {
    ...Typography.body2,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 3,
  },
  enrollButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  enrollButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modulesWrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 8,
    borderRadius: 20,
    marginHorizontal: 0,
  },
  lessonsContainer: {
    paddingLeft: 0,
    backgroundColor: '#F9FAFB',
    marginLeft: 0,
    marginRight: -24,
    paddingRight: 24,
    // paddingLeft: 24,
    paddingVertical: 8,
  },
  bottomPadding: {
    height: 40,
  },
})
