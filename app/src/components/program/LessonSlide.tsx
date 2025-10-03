// src/components/program/LessonSlide.tsx
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { Slide } from '../../types/program-types'
import { colors } from '../../utils/colors'
import { Typography } from '../../utils/typography'

interface LessonSlideProps {
  slide: Slide
  onNext: () => void
  onPrevious?: () => void
  isFirst: boolean
  isLast: boolean
  slideNumber: number
  totalSlides: number
}

const { width, height } = Dimensions.get('window')

export const LessonSlide: React.FC<LessonSlideProps> = ({ slide, onNext, onPrevious, isFirst, isLast, slideNumber, totalSlides }) => {
  const [showReflection, setShowReflection] = useState(false)

  const handleActionPress = () => {
    if (slide.type === 'challenge' || slide.type === 'reflection') {
      if (!showReflection) {
        setShowReflection(true)
        return
      }
    }
    onNext()
  }

  const getSlideBackgroundColor = () => {
    switch (slide.type) {
      case 'challenge':
        return '#F0F9FF'
      case 'reflection':
        return '#F3F4F6'
      case 'completion':
        return '#F0FDF4'
      default:
        return '#FFFFFF'
    }
  }

  const getSlideIcon = () => {
    switch (slide.type) {
      case 'challenge':
        return '💪'
      case 'reflection':
        return '🤔'
      case 'completion':
        return '🎉'
      default:
        return '📖'
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getSlideBackgroundColor() }]}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(slideNumber / totalSlides) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {slideNumber} of {totalSlides}
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Slide Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.slideIcon}>{getSlideIcon()}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{slide.title}</Text>

          {/* Content */}
          <View style={styles.textContainer}>
            <Text style={styles.content}>{slide.content}</Text>
          </View>

          {/* Reflection Input (for challenge/reflection slides) */}
          {(slide.type === 'challenge' || slide.type === 'reflection') && showReflection && (
            <View style={styles.reflectionContainer}>
              <Text style={styles.reflectionPrompt}>Take a moment to reflect on this content. How does it apply to your life?</Text>
              <View style={styles.reflectionInput}>
                <Text style={styles.reflectionPlaceholder}>Tap here to add your thoughts... (This is a placeholder - actual input would be implemented)</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        <View style={styles.navigationButtons}>
          {!isFirst && onPrevious && (
            <TouchableOpacity style={styles.secondaryButton} onPress={onPrevious}>
              <Text style={styles.secondaryButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.primaryButton, isFirst && styles.primaryButtonFullWidth]} onPress={handleActionPress}>
            <Text style={styles.primaryButtonText}>{slide.actionButton || (isLast ? 'Finish' : 'Continue')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 2,
  },
  progressText: {
    ...Typography.caption,
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  slideIcon: {
    fontSize: 48,
  },
  title: {
    ...Typography.h2,
    fontSize: 28,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 36,
  },
  textContainer: {
    marginBottom: 32,
  },
  content: {
    ...Typography.body1,
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    textAlign: 'left',
  },
  reflectionContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
  },
  reflectionPrompt: {
    ...Typography.body2,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  reflectionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reflectionPlaceholder: {
    ...Typography.body2,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  navigationContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonFullWidth: {
    flex: 1,
  },
  primaryButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary.main,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  secondaryButtonText: {
    ...Typography.button,
    color: colors.primary.main,
    fontSize: 16,
    fontWeight: '600',
  },
})
