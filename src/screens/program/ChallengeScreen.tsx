// src/screens/program/ChallengeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { AnimatedView } from '../../components/common/AnimatedView';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import dummyData from '../../services/dummyData';

interface ChallengeScreenProps {
  route: { params: { challengeId: string; dayNumber: number } };
  navigation: any;
}

export const ChallengeScreen: React.FC<ChallengeScreenProps> = ({
  route,
  navigation,
}) => {
  const { challengeId, dayNumber } = route.params;
  const [challenge, setChallenge] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const challengeData = dummyData.challenges.find(c => c.id === challengeId);
    setChallenge(challengeData);
    if (challengeData) {
      setCompletedSteps(new Array(challengeData.steps.length).fill(false));
    }
  }, [challengeId]);

  const handleStepComplete = (stepIndex: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex] = true;
    setCompletedSteps(newCompletedSteps);

    // Check if all steps are completed
    if (newCompletedSteps.every(step => step)) {
      setIsCompleted(true);
    }
  };

  const handleNext = () => {
    if (challenge && currentStep < challenge.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    navigation.goBack();
  };

  if (!challenge) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const currentStepData = challenge.steps[currentStep];

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
          <Text style={styles.dayNumber}>Day {dayNumber} Challenge</Text>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
        </View>
      </View>

      {/* Challenge Hero */}
      <AnimatedView animation="fadeIn" style={styles.heroSection}>
        <LinearGradient
          colors={[colors.accent.light, colors.accent.main]}
          style={styles.heroGradient}
        >
          <Ionicons name="trophy" size={48} color={colors.text.inverse} />
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          <View style={styles.challengeStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={colors.text.inverse} />
              <Text style={styles.statText}>{challenge.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="list-outline" size={16} color={colors.text.inverse} />
              <Text style={styles.statText}>{challenge.steps.length} Steps</Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedView>

      {/* Progress Indicator */}
      <View style={styles.progressIndicator}>
        {challenge.steps.map((_: any, index: number) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentStep && styles.progressDotActive,
              completedSteps[index] && styles.progressDotCompleted,
            ]}
          />
        ))}
      </View>

      {/* Current Step */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <AnimatedView key={currentStep} animation="slideUp" style={styles.stepContainer}>
          <Card style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>Step {currentStep + 1}</Text>
              {completedSteps[currentStep] && (
                <Ionicons name="checkmark-circle" size={24} color={colors.success.main} />
              )}
            </View>
            <Text style={styles.stepTitle}>{currentStepData.title}</Text>
            <Text style={styles.stepDescription}>{currentStepData.description}</Text>

            {currentStepData.action && (
              <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Your Action:</Text>
                <Text style={styles.actionText}>{currentStepData.action}</Text>
              </View>
            )}

            {currentStepData.tips && (
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>💡 Tips:</Text>
                {currentStepData.tips.map((tip: string, index: number) => (
                  <Text key={index} style={styles.tipText}>• {tip}</Text>
                ))}
              </View>
            )}

            {!completedSteps[currentStep] && (
              <Button
                title="Mark as Complete"
                onPress={() => handleStepComplete(currentStep)}
                variant="primary"
                style={styles.completeButton}
              />
            )}
          </Card>
        </AnimatedView>

        {/* Reflection Section */}
        {completedSteps[currentStep] && currentStepData.reflection && (
          <AnimatedView animation="slideUp" delay={200} style={styles.reflectionContainer}>
            <Card style={styles.reflectionCard}>
              <Text style={styles.reflectionTitle}>Reflect on this step:</Text>
              <Text style={styles.reflectionText}>{currentStepData.reflection}</Text>
            </Card>
          </AnimatedView>
        )}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={currentStep === 0 ? colors.text.secondary : colors.accent.main}
          />
          <Text style={[
            styles.navButtonText,
            currentStep === 0 && styles.navButtonTextDisabled
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        {isCompleted ? (
          <Button
            title="Complete Challenge"
            onPress={handleComplete}
            variant="primary"
            style={styles.nextButton}
          />
        ) : currentStep === challenge.steps.length - 1 ? (
          <Button
            title="Review Challenge"
            onPress={() => setCurrentStep(0)}
            variant="secondary"
            style={styles.nextButton}
          />
        ) : (
          <Button
            title="Next Step"
            onPress={handleNext}
            variant="primary"
            style={styles.nextButton}
            disabled={!completedSteps[currentStep]}
          />
        )}
      </View>
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
    color: colors.accent.main,
    fontWeight: '600',
  },
  challengeTitle: {
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
  challengeDescription: {
    fontSize: 16,
    color: colors.text.inverse,
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 22,
  },
  challengeStats: {
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
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border.light,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: colors.accent.main,
    transform: [{ scale: 1.2 }],
  },
  progressDotCompleted: {
    backgroundColor: colors.success.main,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepCard: {
    padding: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 14,
    color: colors.accent.main,
    fontWeight: '600',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    marginBottom: 16,
  },
  actionContainer: {
    backgroundColor: colors.accent.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent.main,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: colors.primary.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary.main,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 4,
  },
  completeButton: {
    marginTop: 16,
  },
  reflectionContainer: {
    marginBottom: 20,
  },
  reflectionCard: {
    padding: 16,
    backgroundColor: colors.secondary.background,
    borderWidth: 1,
    borderColor: colors.secondary.light,
  },
  reflectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary.main,
    marginBottom: 8,
  },
  reflectionText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: colors.accent.main,
    marginLeft: 4,
  },
  navButtonTextDisabled: {
    color: colors.text.secondary,
  },
  nextButton: {
    minWidth: 120,
  },
});
