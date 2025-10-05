// src/components/program/LessonSlide.tsx
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Image, StatusBar, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Slide } from '../../types/program-types'
import { colors } from '../../utils/colors'
import { Typography } from '../../utils/typography'

interface LessonSlideProps {
  slide: Slide
  onNext: () => void
  onPrevious?: () => void
  onClose?: () => void
  isFirst: boolean
  isLast: boolean
  slideNumber: number
  totalSlides: number
  lessonTitle?: string
}

const { width, height } = Dimensions.get('window')

// Calculate responsive top padding based on platform and screen height
const getResponsiveTopPadding = () => {
  const statusBarHeight = StatusBar.currentHeight || 0
  const baseStatusBarHeight = Platform.OS === 'ios' ? 44 : 24
  const calculatedHeight = Platform.OS === 'android' ? statusBarHeight + 20 : baseStatusBarHeight + 20

  // Add extra padding for larger screens
  const extraPadding = height > 800 ? 10 : 0

  return Math.max(calculatedHeight, 50) + extraPadding
}

export const LessonSlide: React.FC<LessonSlideProps> = ({ slide, onNext, onPrevious, onClose, isFirst, isLast, slideNumber, totalSlides, lessonTitle }) => {
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
        return '#FEF3C7'
      case 'reflection':
        return '#F3E8FF'
      case 'completion':
        return '#D1FAE5'
      default:
        return '#FFFFFF'
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getSlideBackgroundColor() }]}>
      {/* Top Progress Bar with Navigation */}
      <View style={styles.topBar}>
        {/* Progress segments */}
        <View style={styles.progressSegments}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <View key={index} style={[styles.progressSegment, index < slideNumber && styles.progressSegmentActive]} />
          ))}
        </View>

        {/* Navigation Icons */}
        <View style={styles.topNavigation}>
          {/* Back Button */}
          <TouchableOpacity style={styles.navButton} onPress={onPrevious || onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={28} color="#8B5CF6" />
          </TouchableOpacity>

          {/* Title (optional) */}
          {lessonTitle && (
            <View style={styles.topTitleContainer}>
              <Text style={styles.topTitle} numberOfLines={1}>
                {lessonTitle}
              </Text>
            </View>
          )}

          {/* Close Button */}
          {onClose && (
            <TouchableOpacity style={styles.navButton} onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={28} color="#8B5CF6" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Image if available */}
          {slide.image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: slide.image }} style={styles.slideImage} resizeMode="cover" />
            </View>
          )}

          {/* Title */}
          <Text style={styles.title}>{slide.title}</Text>

          {/* Subtitle if available */}
          {slide.subtitle && <Text style={styles.subtitle}>{slide.subtitle}</Text>}

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

      {/* Bottom Navigation Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleActionPress} activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>{slide.actionButton || (isLast ? 'Finish Lesson' : 'Continue')}</Text>
          {!isLast && <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingTop: getResponsiveTopPadding(),
    paddingBottom: 8,
  },
  progressSegments: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 4,
    marginBottom: 16,
  },
  progressSegment: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 2,
  },
  progressSegmentActive: {
    backgroundColor: '#8B5CF6',
  },
  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topTitleContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topTitle: {
    ...Typography.body1,
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    backgroundColor: '#F3F4F6',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...Typography.h2,
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
    paddingHorizontal: 8,
  },
  subtitle: {
    ...Typography.body1,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  textContainer: {
    marginBottom: 32,
  },
  content: {
    ...Typography.body1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
    textAlign: 'left',
  },
  reflectionContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  reflectionPrompt: {
    ...Typography.body2,
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  reflectionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reflectionPlaceholder: {
    ...Typography.body2,
    color: '#9CA3AF',
    fontStyle: 'italic',
    fontSize: 14,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
  continueButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginRight: 8,
  },
})
