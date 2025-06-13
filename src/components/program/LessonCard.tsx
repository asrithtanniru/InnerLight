// src/components/program/LessonCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { AnimatedView } from '../common/AnimatedView';

interface LessonCardProps {
  title: string;
  duration: string;
  type: 'lesson' | 'challenge' | 'exercise';
  isCompleted: boolean;
  isLocked: boolean;
  onPress: () => void;
  delay?: number;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  duration,
  type,
  isCompleted,
  isLocked,
  onPress,
  delay = 0,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'lesson':
        return 'book-outline';
      case 'challenge':
        return 'trophy-outline';
      case 'exercise':
        return 'fitness-outline';
      default:
        return 'book-outline';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'lesson':
        return colors.secondary.main;
      case 'challenge':
        return colors.accent.main;
      case 'exercise':
        return colors.primary.main;
      default:
        return colors.secondary.main;
    }
  };

  const getTypeGradient = () => {
    switch (type) {
      case 'lesson':
        return [colors.secondary.light, colors.secondary.main];
      case 'challenge':
        return [colors.accent.light, colors.accent.main];
      case 'exercise':
        return [colors.primary.light, colors.primary.main];
      default:
        return [colors.secondary.light, colors.secondary.main];
    }
  };

  return (
    <AnimatedView animation="slideUp" delay={delay}>
      <TouchableOpacity
        style={[
          styles.container,
          isLocked && styles.lockedContainer,
          isCompleted && styles.completedContainer
        ]}
        onPress={onPress}
        disabled={isLocked}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            isLocked
              ? [colors.background.secondary, colors.background.secondary] as [string, string]
              : getTypeGradient() as [string, string]
          }
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons
            name={isLocked ? 'lock-closed' : getTypeIcon()}
            size={24}
            color={isLocked ? colors.text.secondary : colors.text.inverse}
          />
        </LinearGradient>

        <View style={styles.content}>
          <Text style={[
            styles.title,
            isLocked && styles.lockedText
          ]}>
            {title}
          </Text>
          <View style={styles.metadata}>
            <Text style={[
              styles.duration,
              isLocked && styles.lockedText
            ]}>
              {duration}
            </Text>
            <Text style={[
              styles.type,
              { color: isLocked ? colors.text.secondary : getTypeColor() }
            ]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success.main} />
            </View>
          )}
          {!isLocked && !isCompleted && (
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          )}
        </View>
      </TouchableOpacity>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.shadow.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lockedContainer: {
    opacity: 0.6,
  },
  completedContainer: {
    borderColor: colors.success.light,
    backgroundColor: colors.success.background,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 12,
  },
  type: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lockedText: {
    color: colors.text.secondary,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadge: {
    padding: 4,
  },
});
