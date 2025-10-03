// src/screens/program/LessonSlideScreen.tsx
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Alert, BackHandler } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Lesson, Slide } from '../../types/program-types'
import { programService } from '../../services/programService'
import { progressService } from '../../services/progressService'
import { LessonSlide } from '../../components/program/LessonSlide'

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
        Alert.alert('Error', 'Lesson not found')
        navigation.goBack()
        return
      }
      setLesson(lessonData)
    } catch (error) {
      console.error('Error loading lesson:', error)
      Alert.alert('Error', 'Failed to load lesson')
      navigation.goBack()
    } finally {
      setLoading(false)
    }
  }

  const handleBackPress = (): boolean => {
    Alert.alert('Exit Lesson', 'Are you sure you want to exit this lesson? Your progress will be saved.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Exit',
        style: 'destructive',
        onPress: () => navigation.goBack(),
      },
    ])
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

      Alert.alert(
        'Lesson Complete!',
        "Great job! You've completed this lesson.",
        [
          {
            text: 'Back to Program',
            onPress: () => {
              // Go back to ProgramDetail and reload the progress
              navigation.goBack()
            },
          },
          nextLesson
            ? {
                text: 'Next Lesson',
                onPress: () =>
                  navigation.replace('LessonSlide', {
                    programId,
                    moduleId: nextLesson.moduleId,
                    lessonId: nextLesson.lessonId,
                    slideIndex: 0,
                  }),
              }
            : null,
        ].filter(Boolean) as any[]
      )
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
