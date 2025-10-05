// src/screens/program/LessonSlideScreen.tsx
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, BackHandler } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Lesson, Slide } from '../../types/program-types'
import { programService } from '../../services/programService'
import { progressService } from '../../services/progressService'
import { LessonSlide } from '../../components/program/LessonSlide'
import { useCustomAlert } from '../../hooks/useCustomAlert'
import CustomAlert from '../../components/common/CustomAlert'

type RootStackParamList = {
  LessonSlide: {
    programId: string
    moduleId: string
    lessonId: string
    slideIndex?: number
  }
  ProgramDetail: { programId: string }
}

type LessonSlideScreenRouteProp = RouteProp<RootStackParamList, 'LessonSlide'>
type LessonSlideScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LessonSlide'>

interface Props {
  route: LessonSlideScreenRouteProp
  navigation: LessonSlideScreenNavigationProp
}

export const LessonSlideScreen: React.FC<Props> = ({ route, navigation }) => {
  const { programId, moduleId, lessonId, slideIndex = 0 } = route.params
  const { showAlert, alertProps } = useCustomAlert()

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(slideIndex)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLesson()
    setStartTime(Date.now())
  }, [programId, moduleId, lessonId])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return () => backHandler.remove()
  }, [])

  const loadLesson = () => {
    try {
      const lessonData = programService.getLesson(programId, moduleId, lessonId)
      if (!lessonData) {
        showAlert({
          title: 'Error',
          message: 'Lesson not found',
          type: 'error',
          onConfirm: () => navigation.goBack(),
        })
        return
      }
      setLesson(lessonData)
    } catch (error) {
      console.error('Error loading lesson:', error)
      showAlert({
        title: 'Error',
        message: 'Failed to load lesson',
        type: 'error',
        onConfirm: () => navigation.goBack(),
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBackPress = (): boolean => {
    showAlert({
      title: 'Exit Lesson',
      message: 'Are you sure you want to exit this lesson? Your progress will be saved.',
      type: 'warning',
      showCancel: true,
      confirmText: 'Exit',
      cancelText: 'Cancel',
      onConfirm: () => navigation.goBack(),
    })
    return true
  }

  const handleNext = async () => {
    if (!lesson) return

    // Mark current slide as completed
    const currentSlide = lesson.slides[currentSlideIndex]
    const timeSpent = Math.floor((Date.now() - startTime) / 1000)

    await progressService.completeSlide(currentSlide.id, lessonId, moduleId, programId, timeSpent)

    // Check if this is the last slide
    if (currentSlideIndex >= lesson.slides.length - 1) {
      // Lesson completed
      handleLessonComplete()
    } else {
      // Move to next slide
      setCurrentSlideIndex(currentSlideIndex + 1)
      setStartTime(Date.now())
    }
  }

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
      setStartTime(Date.now())
    }
  }

  const handleLessonComplete = async () => {
    try {
      // Check if there's a next lesson
      const nextLesson = programService.getNextLesson(programId, moduleId, lessonId)

      if (nextLesson) {
        showAlert({
          title: 'Lesson Complete!',
          message: "Great job! You've completed this lesson. Continue to the next lesson?",
          type: 'success',
          showCancel: true,
          confirmText: 'Next Lesson',
          cancelText: 'Back to Program',
          onConfirm: () =>
            navigation.replace('LessonSlide', {
              programId,
              moduleId: nextLesson.moduleId,
              lessonId: nextLesson.lessonId,
              slideIndex: 0,
            }),
        })
      } else {
        showAlert({
          title: 'Lesson Complete!',
          message: "Great job! You've completed this lesson.",
          type: 'success',
          confirmText: 'Back to Program',
          onConfirm: () => navigation.goBack(),
        })
      }
    } catch (error) {
      console.error('Error handling lesson completion:', error)
      navigation.goBack()
    }
  }

  if (loading || !lesson) {
    return <View style={styles.container}>{/* Add loading component here */}</View>
  }

  const currentSlide = lesson.slides[currentSlideIndex]
  if (!currentSlide) {
    navigation.goBack()
    return null
  }

  return (
    <View style={styles.container}>
      <LessonSlide
        slide={currentSlide}
        onNext={handleNext}
        onPrevious={currentSlideIndex > 0 ? handlePrevious : undefined}
        isFirst={currentSlideIndex === 0}
        isLast={currentSlideIndex === lesson.slides.length - 1}
        slideNumber={currentSlideIndex + 1}
        totalSlides={lesson.slides.length}
      />

      <CustomAlert {...alertProps} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
