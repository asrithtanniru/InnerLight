// src/components/program/ProgramCard.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
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

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onPress, showProgress = false, progressPercentage = 0, isEnrolled = false }) => {
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: program.image }} style={styles.cardImage} />
          {isEnrolled && (
            <View style={styles.enrolledBadge}>
              <Text style={styles.enrolledText}>Enrolled</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {program.title}
        </Text>

        {showProgress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: 180,
    marginRight: 16,
  },
  card: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  cardImage: {
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
  cardInfo: {
    paddingTop: 12,
    paddingHorizontal: 4,
    minHeight: 60, // Changed to minHeight to allow for progress bar
  },
  cardTitle: {
    ...Typography.h6,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 8,
    height: 40, // Fixed height for title area (2 lines max)
  },
  progressContainer: {
    marginTop: 4, // Reduced margin to fit better
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 2,
  },
})
