// src/screens/program/ExerciseScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { AnimatedView } from '../../components/common/AnimatedView';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { ProgressBar } from '../../components/program/ProgressBar';
import { dummyData } from '../../services/dummyData';

interface ExerciseScreenProps {
  route: { params: { exerciseId: string; dayNumber: number } };
  navigation: any;
}

export const ExerciseScreen: React.FC<ExerciseScreenProps> = ({
  route,
  navigation,
}) => {
  const { exerciseId, dayNumber } = route.params;
  const [exercise, setExercise] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const exerciseData = dummyData.exercises.find(e => e.id === exerciseId);
    setExercise(exerciseData);
    if (exerciseData && exerciseData.phases) {
      setTimeRemaining(exerciseData.phases[0].duration);
    }
  }, [exerciseId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            handlePhaseComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const handlePhaseComplete = () => {
    if (exercise && currentPhase < exercise.phases.length - 1) {
      const nextPhase = currentPhase + 1;
      setCurrentPhase(nextPhase);
      setTimeRemaining(exercise.phases[nextPhase].duration);
    } else {
      setIsActive(false);
      setIsCompleted(true);
    }
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase(0);
    if (exercise) {
      setTimeRemaining(exercise.phases[0].duration);
    }
    setIsCompleted(false);
  };

  const handleComplete = () => {
    navigation.goBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const currentPhaseData = exercise.phases[currentPhase];
  const totalDuration = exercise.phases.reduce((sum: number, phase: any) => sum + phase.duration, 0);
  const elapsedTime = exercise.phases.slice(0, currentPhase).reduce((sum: number, phase: any) => sum + phase.duration, 0) +
    (exercise.phases[currentPhase].duration - timeRemaining);
  const progress = totalDuration > 0 ? elapsedTime / totalDuration : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.dayNumber}>Day {dayNumber} Exercise</Text>
          <Text style={styles.exerciseTitle}>{exercise.title}</Text>
        </View>
      </View>

      {/* Exercise Hero */}
      <AnimatedView animation="fadeIn" style={styles.heroSection}>
        <LinearGradient
          colors={[colors.primary.light, colors.primary.main]}
          style={styles.heroGradient}
        >
          <Ionicons name="fitness" size={48} color={colors.text.inverse} />
          <Text style={styles.exerciseDescription}>{exercise.description}</Text>
          <View style={styles.exerciseStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={colors.text.inverse} />
              <Text style={styles.statText}>{exercise.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="layers-outline" size={16} color={colors.text.inverse} />
              <Text style={styles.statText}>{exercise.phases.length} Phases</Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedView>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Timer Section */}
        <AnimatedView animation="slideUp" delay={200} style={styles.timerSection}>
          <Card style={styles.timerCard}>
            <Text style={styles.phaseTitle}>{currentPhaseData.name}</Text>
            <View style={styles.timerDisplay}>
              <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
            </View>

            <ProgressBar
              progress={progress}
              showPercentage={false}
              height={6}
              animated={true}
              color={[colors.primary.light, colors.primary.main]}
            />

            <Text style={styles.phaseDescription}>{currentPhaseData.instruction}</Text>

            <View style={styles.timerControls}>
              {!isActive && !isCompleted && (
                <Button
                  title={timeRemaining === exercise.phases[currentPhase].duration ? "Start" : "Resume"}
                  onPress={handleStart}
                  variant="primary"
                  style={styles.controlButton}
                />
              )}

              {isActive && (
                <Button
                  title="Pause"
                  onPress={handlePause}
                  variant="secondary"
                  style={styles.controlButton}
                />
              )}

              <Button
                title="Reset"
                onPress={handleReset}
                variant="outline"
                style={styles.controlButton}
              />
            </View>
          </Card>
        </AnimatedView>

        {/* Phase Overview */}
        <AnimatedView animation="slideUp" delay={400} style={styles.phasesSection}>
          <Text style={styles.sectionTitle}>Exercise Phases</Text>
          {exercise.phases.map((phase: any, index: number) => (
            <Card key={index} style={{
              ...styles.phaseCard,
              ...(index === currentPhase ? styles.activePhaseCard : {}),
              ...(index < currentPhase ? styles.completedPhaseCard : {})
            }}>
              <View style={styles.phaseHeader}>
                <View style={styles.phaseInfo}>
                  <Text style={[
                    styles.phaseNumber,
                    index === currentPhase && styles.activePhaseText,
                    index < currentPhase && styles.completedPhaseText
                  ]}>
                    Phase {index + 1}
                  </Text>
                  <Text style={[
                    styles.phaseName,
                    index === currentPhase && styles.activePhaseText
                  ]}>
                    {phase.name}
                  </Text>
                </View>
                <View style={styles.phaseDuration}>
                  <Text style={[
                    styles.durationText,
                    index === currentPhase && styles.activePhaseText
                  ]}>
                    {formatTime(phase.duration)}
                  </Text>
                  {index < currentPhase && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.success.main} />
                  )}
                  {index === currentPhase && isActive && (
                    <Ionicons name="play-circle" size={20} color={colors.primary.main} />
                  )}
                </View>
              </View>
              <Text style={[
                styles.phaseInstruction,
                index === currentPhase && styles.activePhaseText
              ]}>
                {phase.instruction}
              </Text>
            </Card>
          ))}
        </AnimatedView>

        {/* Completion */}
        {isCompleted && (
          <AnimatedView animation="slideUp" style={styles.completionSection}>
            <Card style={styles.completionCard}>
              <Ionicons name="trophy" size={48} color={colors.success.main} />
              <Text style={styles.completionTitle}>Exercise Complete!</Text>
              <Text style={styles.completionText}>
                Great job! You've successfully completed this wellness exercise.
              </Text>
              <Button
                title="Finish Exercise"
                onPress={handleComplete}
                variant="primary"
                style={styles.finishButton}
              />
            </Card>
          </AnimatedView>
        )}

        {/* Tips */}
        {exercise.tips && (
          <AnimatedView animation="slideUp" delay={600} style={styles.tipsSection}>
            <Card style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Tips for Success</Text>
              {exercise.tips.map((tip: string, index: number) => (
                <Text key={index} style={styles.tipText}>• {tip}</Text>
              ))}
            </Card>
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
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  dayNumber: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroGradient: {
    padding: 20,
    alignItems: 'center',
  },
  exerciseDescription: {
    fontSize: 16,
    color: colors.text.inverse,
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 22,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  statText: {
    fontSize: 14,
    color: colors.text.inverse,
    marginLeft: 4,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timerSection: {
    marginBottom: 20,
  },
  timerCard: {
    padding: 24,
    alignItems: 'center',
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  timerDisplay: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primary.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: colors.primary.light,
  },
  timerText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary.main,
  },
  phaseDescription: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 22,
    marginVertical: 16,
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  controlButton: {
    marginHorizontal: 8,
    minWidth: 100,
  },
  phasesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  phaseCard: {
    padding: 16,
    marginBottom: 12,
  },
  activePhaseCard: {
    borderWidth: 2,
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.background,
  },
  completedPhaseCard: {
    backgroundColor: colors.success.background,
    borderWidth: 1,
    borderColor: colors.success.light,
  },
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  phaseInfo: {
    flex: 1,
  },
  phaseNumber: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  phaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  activePhaseText: {
    color: colors.primary.main,
  },
  completedPhaseText: {
    color: colors.success.main,
  },
  phaseDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 8,
    fontWeight: '500',
  },
  phaseInstruction: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  completionSection: {
    marginBottom: 20,
  },
  completionCard: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.success.background,
    borderWidth: 1,
    borderColor: colors.success.light,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.success.main,
    marginVertical: 12,
  },
  completionText: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  finishButton: {
    minWidth: 160,
  },
  tipsSection: {
    marginBottom: 40,
  },
  tipsCard: {
    padding: 16,
    backgroundColor: colors.primary.background,
    borderWidth: 1,
    borderColor: colors.primary.light,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary.main,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 6,
  },
});
