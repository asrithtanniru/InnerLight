import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Typography } from '../../utils/typography';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

interface Goal {
  id: string;
  title: string;
  subtitle: string;
  gradient: [string, string, string];
  emoji: string;
}

interface OnboardingGoalsScreenProps {
  navigation: any;
  route: any;
}

const goals: Goal[] = [
  {
    id: 'relationships',
    title: 'Relationships with',
    subtitle: 'Colleagues',
    gradient: ['#F59E0B', '#D97706', '#B45309'],
    emoji: '🤝',
  },
  {
    id: 'communication',
    title: 'Communication',
    subtitle: 'Skills',
    gradient: ['#EF4444', '#DC2626', '#B91C1C'],
    emoji: '💬',
  },
  {
    id: 'public-speaking',
    title: 'Public Speaking',
    subtitle: 'Skills',
    gradient: ['#8B5CF6', '#7C3AED', '#6D28D9'],
    emoji: '🎤',
  },
  {
    id: 'romantic',
    title: 'Romantic',
    subtitle: 'Relationships',
    gradient: ['#EC4899', '#DB2777', '#BE185D'],
    emoji: '💕',
  },
];

const OnboardingGoalsScreen: React.FC<OnboardingGoalsScreenProps> = ({ navigation, route }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const userName = route?.params?.userName || 'there';
  const { signIn } = useAuth();
  const currentStep = 3;
  const totalSteps = 4;

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleNext = () => {
    navigation.navigate('OnboardingThankYou', {
      userName,
      selectedGoal: goals.find(g => g.id === selectedGoal)
    });
  };

  const handleSkip = async () => {
    try {
      await signIn('demo@innerlight.com');
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderGoalCard = (goal: Goal, index: number) => (
    <Animated.View
      key={goal.id}
      entering={FadeInUp.delay(300 + index * 100).springify()}
    >
      <TouchableOpacity
        style={[styles.goalCard, selectedGoal === goal.id && styles.selectedGoalCard]}
        onPress={() => handleGoalSelect(goal.id)}
      >
        <LinearGradient
          colors={goal.gradient}
          style={styles.goalGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.goalContent}>
            <Text style={styles.goalEmoji}>{goal.emoji}</Text>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalSubtitle}>{goal.subtitle}</Text>
            </View>
          </View>
          {selectedGoal === goal.id && (
            <View style={styles.selectedIndicator}>
              <Text style={styles.selectedCheckmark}>✓</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressBar, { width: (width * 0.2) * (currentStep / totalSteps) }]} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>What Would You Like To{'\n'}Improve In Life?</Text>
          <Text style={styles.subtitle}>Select one goal, later you'll be able to add more</Text>
        </Animated.View>

        <View style={styles.goalsContainer}>
          <View style={styles.goalsRow}>
            {renderGoalCard(goals[0], 0)}
            {renderGoalCard(goals[1], 1)}
          </View>
          <View style={styles.goalsRow}>
            {renderGoalCard(goals[2], 2)}
            {renderGoalCard(goals[3], 3)}
          </View>
        </View>
      </ScrollView>

      {/* Next Button */}
      <Animated.View
        entering={FadeInDown.delay(800).springify()}
        style={styles.buttonContainer}
      >
        <TouchableOpacity
          style={[styles.nextButton, !selectedGoal && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selectedGoal}
        >
          <LinearGradient
            colors={selectedGoal ? ['#8B5CF6', '#7C3AED', '#6D28D9'] : ['#D1D5DB', '#9CA3AF']}
            style={styles.nextButtonGradient}
          >
            <Text style={[styles.nextButtonText, !selectedGoal && styles.nextButtonTextDisabled]}>
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  progressContainer: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 1,
  },
  progressBackground: {
    width: width * 0.2,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 28,
    color: '#8B5CF6',
    fontWeight: '300',
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    ...Typography.body1,
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    fontSize: 24,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    ...Typography.body1,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  goalsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  goalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  goalCard: {
    width: (width - 64) / 2,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  selectedGoalCard: {
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    transform: [{ scale: 1.02 }],
  },
  goalGradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  goalContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  goalEmoji: {
    fontSize: 24,
    alignSelf: 'flex-start',
  },
  goalTextContainer: {
    alignItems: 'flex-start',
  },
  goalTitle: {
    ...Typography.body1,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 2,
  },
  goalSubtitle: {
    ...Typography.body1,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckmark: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
  },
  nextButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  nextButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  nextButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  nextButtonTextDisabled: {
    color: '#6B7280',
  },
});

export default OnboardingGoalsScreen;
