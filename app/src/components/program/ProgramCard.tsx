// src/components/program/ProgramCard.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Program } from '../../types/program-types'
import { colors } from '../../utils/colors'
import { Typography } from '../../utils/typography'

interface ProgramCardProps {
  program: Program
  onPress: () => void
  showProgress?: boolean
  progressPercentage?: number
  isEnrolled?: boolean
}

const { width } = Dimensions.get('window')
const cardWidth = (width - 60) / 2 // 20px padding on each side + 20px gap

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onPress, showProgress = false, progressPercentage = 0, isEnrolled = false }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: program.image }} style={styles.image} />
        {isEnrolled && (
          <View style={styles.enrolledBadge}>
            <Text style={styles.enrolledText}>Enrolled</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {program.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {program.description}
        </Text>

        <View style={styles.metadata}>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{program.difficulty.charAt(0).toUpperCase() + program.difficulty.slice(1)}</Text>
          </View>

          <Text style={styles.duration}>{program.estimatedDuration}</Text>
        </View>

        {showProgress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>{progressPercentage}% complete</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  enrolledBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.primary.main,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  enrolledText: {
    ...Typography.caption,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    ...Typography.h6,
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    ...Typography.body2,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  difficultyBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    ...Typography.caption,
    color: '#FF8A65',
    fontSize: 10,
    fontWeight: '600',
  },
  duration: {
    ...Typography.caption,
    fontSize: 10,
    color: colors.text.secondary,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 2,
  },
  progressText: {
    ...Typography.caption,
    fontSize: 10,
    color: colors.text.secondary,
    textAlign: 'center',
  },
})
