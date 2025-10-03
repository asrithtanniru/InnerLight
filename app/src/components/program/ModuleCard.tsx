// src/components/program/ModuleCard.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Module } from '../../types/program-types'
import { colors } from '../../utils/colors'
import { Typography } from '../../utils/typography'

interface ModuleCardProps {
  module: Module
  onPress: () => void
  isCompleted?: boolean
  progressPercentage?: number
  isExpanded?: boolean
  onToggleExpand?: () => void
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onPress, isCompleted = false, progressPercentage = 0, isExpanded = false, onToggleExpand }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggleExpand || onPress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{module.icon}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{module.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {module.description}
          </Text>
          <Text style={styles.duration}>{module.estimatedDuration}</Text>
        </View>

        <View style={styles.statusContainer}>
          {isCompleted ? (
            <View style={styles.completedIcon}>
              <Text style={styles.completedIconText}>✓</Text>
            </View>
          ) : (
            <View style={styles.expandIcon}>
              <Text style={styles.expandIconText}>{isExpanded ? '▲' : '▼'}</Text>
            </View>
          )}
        </View>
      </View>

      {progressPercentage > 0 && !isCompleted && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.progressText}>{progressPercentage}% complete</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.h6,
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    ...Typography.body2,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  duration: {
    ...Typography.caption,
    fontSize: 12,
    color: colors.text.secondary,
  },
  statusContainer: {
    marginLeft: 12,
  },
  completedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  expandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandIconText: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 3,
  },
  progressText: {
    ...Typography.caption,
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
})
