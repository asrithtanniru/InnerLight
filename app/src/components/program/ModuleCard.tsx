// src/components/program/ModuleCard.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Module } from '../../types/program-types'
import { colors } from '../../utils/colors'
import { Typography } from '../../utils/typography'

interface ModuleCardProps {
  module: Module
  onPress: () => void
  onToggleExpand: () => void
  isCompleted: boolean
  progressPercentage: number
  isExpanded: boolean
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onPress, isCompleted, progressPercentage, isExpanded }) => {
  // Map module icons
  const getModuleIcon = (moduleId: string) => {
    const iconMap: { [key: string]: any } = {
      foundation: 'cube-outline',
      communication_styles: 'people-outline',
      overcoming_blockers: 'ban-outline',
      effective_behaviors: 'star-outline',
      how_tos: 'information-circle-outline',
    }
    return iconMap[moduleId] || 'book-outline'
  }

  const getIconColor = (moduleId: string) => {
    const colorMap: { [key: string]: string } = {
      foundation: '#8B5CF6',
      communication_styles: '#8B5CF6',
      overcoming_blockers: '#EF4444',
      effective_behaviors: '#8B5CF6',
      how_tos: '#8B5CF6',
    }
    return colorMap[moduleId] || '#8B5CF6'
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: `${getIconColor(module.id)}15` }]}>
          <Ionicons name={getModuleIcon(module.id)} size={24} color={getIconColor(module.id)} />
        </View>

        {/* Title and Status */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{module.title}</Text>
        </View>

        {/* Right side - Checkmark and Chevron */}
        <View style={styles.rightContainer}>
          {isCompleted && (
            <View style={styles.checkmarkContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#0EA5E9" />
            </View>
          )}
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="#9CA3AF" />
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
    paddingVertical: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.h4,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkmarkContainer: {
    marginRight: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 64, // Align with text, after icon
  },
})
