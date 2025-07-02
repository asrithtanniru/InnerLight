// src/components/program/DayTimeline.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { AnimatedView } from '../common/AnimatedView';

interface Day {
  dayNumber: number;
  title: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrent: boolean;
}

interface DayTimelineProps {
  days: Day[];
  onDayPress: (day: Day) => void;
}

export const DayTimeline: React.FC<DayTimelineProps> = ({ days, onDayPress }) => {
  const renderDay = (day: Day, index: number) => {
    const isLast = index === days.length - 1;

    return (
      <AnimatedView key={day.dayNumber} animation="slideUp" delay={index * 50}>
        <View style={styles.dayContainer}>
          <View style={styles.dayContent}>
            <TouchableOpacity
              style={[
                styles.dayCircle,
                day.isCompleted && styles.completedCircle,
                day.isCurrent && styles.currentCircle,
                !day.isUnlocked && styles.lockedCircle,
              ]}
              onPress={() => day.isUnlocked && onDayPress(day)}
              disabled={!day.isUnlocked}
              activeOpacity={0.8}
            >
              {day.isCompleted ? (
                <LinearGradient
                  colors={[colors.success.light, colors.success.main]}
                  style={styles.circleGradient}
                >
                  <Ionicons name="checkmark" size={20} color={colors.text.inverse} />
                </LinearGradient>
              ) : day.isCurrent ? (
                <LinearGradient
                  colors={[colors.primary.light, colors.primary.main]}
                  style={styles.circleGradient}
                >
                  <Text style={styles.dayNumber}>{day.dayNumber}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.circleContent}>
                  <Text style={[
                    styles.dayNumber,
                    !day.isUnlocked && styles.lockedText,
                    day.isUnlocked && !day.isCurrent && styles.unlockedText
                  ]}>
                    {day.isUnlocked ? day.dayNumber : '🔒'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.dayInfo}>
              <Text style={[
                styles.dayTitle,
                !day.isUnlocked && styles.lockedText,
                day.isCurrent && styles.currentText
              ]}>
                Day {day.dayNumber}
              </Text>
              <Text style={[
                styles.daySubtitle,
                !day.isUnlocked && styles.lockedText
              ]}>
                {day.title}
              </Text>
            </View>
          </View>

          {!isLast && (
            <View style={[
              styles.connector,
              day.isCompleted && styles.completedConnector
            ]} />
          )}
        </View>
      </AnimatedView>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.timeline}>
        {days.map((day, index) => renderDay(day, index))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeline: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dayContainer: {
    position: 'relative',
  },
  dayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.border.light,
  },
  completedCircle: {
    borderColor: colors.success.main,
  },
  currentCircle: {
    borderColor: colors.primary.main,
  },
  lockedCircle: {
    borderColor: colors.border.light,
    backgroundColor: colors.background.secondary,
  },
  circleGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  lockedText: {
    color: colors.text.secondary,
  },
  unlockedText: {
    color: colors.text.primary,
  },
  currentText: {
    color: colors.primary.main,
    fontWeight: '600',
  },
  dayInfo: {
    flex: 1,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  daySubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  connector: {
    position: 'absolute',
    left: 43,
    top: 48,
    width: 2,
    height: 24,
    backgroundColor: colors.border.light,
  },
  completedConnector: {
    backgroundColor: colors.success.main,
  },
});
