import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Typography } from '../../utils/typography';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

interface OnboardingThankYouScreenProps {
  navigation: any;
  route: any;
}

const OnboardingThankYouScreen: React.FC<OnboardingThankYouScreenProps> = ({ navigation, route }) => {
  const userName = route?.params?.userName || 'there';
  const selectedGoal = route?.params?.selectedGoal;
  const { signIn } = useAuth();
  const currentStep = 4;
  const totalSteps = 4;

  useEffect(() => {
    // Auto-navigate to sign in after 3 seconds
    const timer = setTimeout(() => {
      handleNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = async () => {
    try {
      // Sign in the user with demo credentials and navigate to home
      await signIn('demo@innerlight.com');
      // Store user preferences for later use
      // Auth state will handle navigation to the main app
    } catch (error) {
      console.error('Failed to sign in:', error);
      // Fallback: do nothing; auth state may not have updated
    }
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

  return (<View style={styles.container}>
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
    <View style={styles.content}>
      <Animated.View
        entering={FadeInUp.delay(300).springify()}
        style={styles.avatarContainer}
      >
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>👨‍💼</Text>
          <View style={styles.thumbsUp}>
            <Text style={styles.thumbsUpEmoji}>👍</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(500).springify()}
        style={styles.textContainer}
      >
        <Text style={styles.title}>Thank you, {userName}!</Text>
        <Text style={styles.subtitle}>
          I have a program with lessons,{'\n'}
          exercises and real-life challenges for{'\n'}
          you.
        </Text>
      </Animated.View>
    </View>

    {/* Next Button */}
    <Animated.View
      entering={FadeInDown.delay(700).springify()}
      style={styles.buttonContainer}
    >
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
          style={styles.nextButtonGradient}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    paddingBottom: 20,
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatarContainer: {
    marginBottom: 40,
    position: 'relative',
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarEmoji: {
    fontSize: 60,
  },
  thumbsUp: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbsUpEmoji: {
    fontSize: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    fontSize: 32,
    color: '#1F2937',
    marginBottom: 20,
    fontWeight: '700',
  },
  subtitle: {
    ...Typography.body1,
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: width * 0.9,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 60,
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
});

export default OnboardingThankYouScreen;
