import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Typography } from '../../utils/typography';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

interface OnboardingIntroScreenProps {
  navigation: any;
  currentStep?: number;
  totalSteps?: number;
}

const OnboardingIntroScreen: React.FC<OnboardingIntroScreenProps> = ({
  navigation,
  currentStep = 1,
  totalSteps = 4
}) => {
  const { signIn } = useAuth();

  const handleNext = () => {
    navigation.navigate('OnboardingName');
  };

  const handleSkip = async () => {
    try {
      // Skip to next screen based on current step
      if (currentStep === 1) {
        navigation.navigate('OnboardingName');
      } else if (currentStep === 2) {
        navigation.navigate('OnboardingGoals');
      } else if (currentStep === 3) {
        navigation.navigate('OnboardingFinal');
      } else {
        // Last screen - sign in with demo account
        await signIn('demo@innerlight.com');
      }
    } catch (error) {
      console.error('Failed to skip:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Full Width Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressBar, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>
      </View>

      {/* Header with Back Button and Skip */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Animated.View
          entering={FadeInUp.delay(300).springify()}
          style={styles.avatarContainer}
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨‍💼</Text>
          </View>
        </Animated.View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Hello, I'm Kev</Text>
          <Text style={styles.subtitle}>
            I'm an AI coach trained in psychology.{'\n'}
            I will help you along your journey.
          </Text>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Progress Indicator */}
      <View style={styles.bottomProgressContainer}>
        <View style={styles.bottomProgressBar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    zIndex: 1,
  },
  progressBackground: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E5E5',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#8B5CF6',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    zIndex: 2,
  },
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#8B5CF6',
    fontWeight: '400',
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  avatarContainer: {
    marginBottom: 60,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 50,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#1A1A1A',
    marginBottom: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.8,
    fontWeight: '400',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomProgressContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomProgressBar: {
    width: width * 0.3,
    height: 4,
    backgroundColor: '#1A1A1A',
    borderRadius: 2,
  },
});

export default OnboardingIntroScreen;
