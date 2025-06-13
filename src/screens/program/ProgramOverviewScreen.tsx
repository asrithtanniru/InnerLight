// src/screens/program/ProgramOverviewScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { AnimatedView } from '../../components/common/AnimatedView';
import { ProgressBar } from '../../components/program/ProgressBar';
import { DayTimeline } from '../../components/program/DayTimeline';
import Button from '../../components/common/Button';
import dummyData from '../../services/dummyData';

interface ProgramOverviewScreenProps {
  route: { params: { programId: string } };
  navigation: any;
}

export const ProgramOverviewScreen: React.FC<ProgramOverviewScreenProps> = ({
  route,
  navigation,
}) => {
  const { programId } = route.params;
  const [program, setProgram] = useState<any>(null);
  const [days, setDays] = useState<any[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // Load program data
    const programData = dummyData.programs.find(p => p.id === programId);
    setProgram(programData);
    setIsEnrolled(programData?.isEnrolled || false);

    // Load program days
    const programDays = dummyData.programDays.filter(day => day.programId === programId);
    setDays(programDays);
  }, [programId]);

  const handleDayPress = (day: any) => {
    if (day.lesson) {
      navigation.navigate('Lesson', { lessonId: day.lesson.id, dayNumber: day.dayNumber });
    } else if (day.challenge) {
      navigation.navigate('Challenge', { challengeId: day.challenge.id, dayNumber: day.dayNumber });
    } else if (day.exercise) {
      navigation.navigate('Exercise', { exerciseId: day.exercise.id, dayNumber: day.dayNumber });
    }
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    // Update first day to be unlocked
    const updatedDays = days.map((day, index) => ({
      ...day,
      isUnlocked: index === 0 ? true : day.isUnlocked
    }));
    setDays(updatedDays);
  };

  if (!program) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const completedDays = days.filter(day => day.isCompleted).length;
  const progress = days.length > 0 ? completedDays / days.length : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Program Hero */}
        <AnimatedView animation="fadeIn" style={styles.heroSection}>
          <LinearGradient
            colors={[colors.primary.light, colors.primary.main]}
            style={styles.heroGradient}
          >
            <Text style={styles.programTitle}>{program.title}</Text>
            <Text style={styles.programDescription}>{program.description}</Text>

            <View style={styles.programStats}>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={20} color={colors.text.inverse} />
                <Text style={styles.statText}>{program.duration}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="trophy-outline" size={20} color={colors.text.inverse} />
                <Text style={styles.statText}>{program.difficulty}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="book-outline" size={20} color={colors.text.inverse} />
                <Text style={styles.statText}>{days.length} Days</Text>
              </View>
            </View>
          </LinearGradient>
        </AnimatedView>

        {/* Progress Section */}
        {isEnrolled && (
          <AnimatedView animation="slideUp" delay={200} style={styles.progressSection}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <ProgressBar
              progress={progress}
              label={`${completedDays} of ${days.length} days completed`}
              showPercentage={true}
              animated={true}
              delay={400}
            />

            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{completedDays}</Text>
                <Text style={styles.progressLabel}>Days Completed</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{days.length - completedDays}</Text>
                <Text style={styles.progressLabel}>Days Remaining</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{Math.round(progress * 100)}%</Text>
                <Text style={styles.progressLabel}>Progress</Text>
              </View>
            </View>
          </AnimatedView>
        )}

        {/* Program Timeline */}
        <AnimatedView animation="slideUp" delay={isEnrolled ? 400 : 200} style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Program Timeline</Text>
          <DayTimeline days={days} onDayPress={handleDayPress} />
        </AnimatedView>

        {/* Enrollment Button */}
        {!isEnrolled && (
          <AnimatedView animation="slideUp" delay={600} style={styles.enrollSection}>
            <Button
              title="Start Your Journey"
              onPress={handleEnroll}
              variant="primary"
              size="large"
            />
            <Text style={styles.enrollNote}>
              Begin your mental wellness journey with personalized lessons and exercises
            </Text>
          </AnimatedView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroGradient: {
    padding: 24,
  },
  programTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.inverse,
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 16,
    color: colors.text.inverse,
    opacity: 0.9,
    lineHeight: 24,
    marginBottom: 20,
  },
  programStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: colors.text.inverse,
    marginLeft: 6,
    fontWeight: '500',
  },
  progressSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary.main,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  timelineSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  enrollSection: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  enrollNote: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
});
