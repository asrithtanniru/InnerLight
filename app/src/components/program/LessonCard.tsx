// src/components/program/LessonCard.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../utils/colors'
import { Typography } from '../../utils/typography'

interface LessonCardProps {
  title: string
  duration?: string
  type?: string
  onPress: () => void
  isCompleted: boolean
  isLocked: boolean
  image?: string // Optional thumbnail image
}

export const LessonCard: React.FC<LessonCardProps> = ({ title, duration, type, onPress, isCompleted, isLocked, image }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={isLocked} activeOpacity={0.7}>
      <View style={styles.content}>
        {/* Thumbnail Image */}
        <View style={styles.thumbnailContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.thumbnail} />
          ) : (
            <View style={[styles.thumbnail, styles.placeholderThumbnail]}>
              <Ionicons name="book-outline" size={24} color="#9CA3AF" />
            </View>
          )}
        </View>

        {/* Title and Badge */}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          {/* Lesson Type Badge */}
          <View style={styles.badgeContainer}>
            <Ionicons name="book-outline" size={14} color="#F59E0B" />
            <Text style={styles.badgeText}>Lesson</Text>
          </View>
        </View>

        {/* Right side - Status indicator */}
        <View style={styles.rightContainer}>
          {isLocked ? (
            <Ionicons name="lock-closed" size={20} color="#9CA3AF" />
          ) : isCompleted ? (
            <View style={styles.checkmarkContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#0EA5E9" />
            </View>
          ) : null}
        </View>
      </View>

      {/* Separator line */}
      <View style={styles.separator} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingRight: 16,
  },
  thumbnailContainer: {
    marginRight: 16,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  placeholderThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.body1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F59E0B',
  },
  rightContainer: {
    marginLeft: 12,
  },
  checkmarkContainer: {
    // Empty for now, just contains the icon
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 80, // Align with text, after thumbnail
  },
})
