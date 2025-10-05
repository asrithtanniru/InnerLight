import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated'
import { Typography } from '../../utils/typography'
import { useAuth } from '../../contexts/AuthContext'
import { useCustomAlert } from '../../hooks/useCustomAlert'
import CustomAlert from '../../components/common/CustomAlert'

const { width, height } = Dimensions.get('window')

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'

interface OnboardingFlowProps {
  navigation: NativeStackNavigationProp<any>
  route?: RouteProp<any>
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [userName, setUserName] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('')
  const [isAutoProgressing, setIsAutoProgressing] = useState(false)
  const { signIn } = useAuth() as { signIn: (email: string) => Promise<any> }
  const { showAlert, alertProps } = useCustomAlert()

  const totalSteps = 4

  const goals = [
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
  ]

  useEffect(() => {
    if (currentStep === 4) {
      setIsAutoProgressing(true)
      const timer = setTimeout(async () => {
        try {
          await signIn('demo@innerlight.com')
          setIsAutoProgressing(false)
          navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })
        } catch (error) {
          console.error('Failed to sign in:', error)
          setIsAutoProgressing(false)
        }
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, signIn, navigation])

  const handleNext = () => {
    if (currentStep === 2 && !userName.trim()) {
      showAlert({
        title: 'Please enter your name',
        message: 'We need your name to personalize your experience.',
        type: 'warning',
      })
      return
    }
    if (currentStep === 3 && !selectedGoal) {
      showAlert({
        title: 'Please select a goal',
        message: "Choose what you'd like to improve.",
        type: 'warning',
      })
      return
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = async () => {
    try {
      await signIn('demo@innerlight.com')
      navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })
    } catch (error) {
      console.error('Failed to sign in:', error)
    }
  }

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressBar, { width: `${(currentStep / totalSteps) * 100}%` }]} />
      </View>
    </View>
  )

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={currentStep === 1}>
        <Text style={[styles.backIcon, { color: currentStep === 1 ? '#D1D5DB' : '#8B5CF6' }]}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  )

  const renderIntroScreen = () => (
    <>
      {renderProgressBar()}
      {renderHeader()}

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨‍💼</Text>
          </View>
          <View style={styles.waveContainer}>
            <Text style={styles.waveEmoji}>👋</Text>
          </View>
        </Animated.View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Hello, I'm Eden</Text>
          <Text style={styles.subtitle}>I'm an AI coach trained in psychology.{'\n'}I will help you along your journey.</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  )

  const renderNameScreen = () => (
    <>
      {renderProgressBar()}
      {renderHeader()}

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.avatarContainer}>
          <View style={styles.avatarCircleSmall}>
            <Text style={styles.avatarEmojiSmall}>👨‍💼</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.textContainer}>
          <Text style={styles.title}>How should I call you?</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter your name"
            placeholderTextColor="#9CA3AF"
            autoFocus={true}
            returnKeyType="next"
            onSubmitEditing={handleNext}
          />
          <View style={styles.underline} />
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(900).springify()} style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.nextButton, !userName.trim() && styles.nextButtonDisabled]} onPress={handleNext} disabled={!userName.trim()}>
          <LinearGradient colors={userName.trim() ? ['#8B5CF6', '#7C3AED', '#6D28D9'] : ['#D1D5DB', '#9CA3AF']} style={styles.nextButtonGradient}>
            <Text style={[styles.nextButtonText, !userName.trim() && styles.nextButtonTextDisabled]}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </>
  )

  const renderGoalsScreen = () => (
    <>
      {renderProgressBar()}
      {renderHeader()}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.titleContainer}>
          <Text style={styles.goalsTitle}>What Would You Like To{'\n'}Improve In Life?</Text>
          <Text style={styles.goalsSubtitle}>Select one goal, later you'll be able to add more</Text>
        </Animated.View>

        <View style={styles.goalsContainer}>
          <View style={styles.goalsRow}>
            {goals.slice(0, 2).map((goal, index) => (
              <Animated.View key={goal.id} entering={FadeInUp.delay(300 + index * 100).springify()}>
                <TouchableOpacity style={[styles.goalCard, selectedGoal === goal.id && styles.selectedGoalCard]} onPress={() => setSelectedGoal(goal.id)}>
                  <LinearGradient colors={goal.gradient as any} style={styles.goalGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
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
            ))}
          </View>
          <View style={styles.goalsRow}>
            {goals.slice(2, 4).map((goal, index) => (
              <Animated.View key={goal.id} entering={FadeInUp.delay(500 + index * 100).springify()}>
                <TouchableOpacity style={[styles.goalCard, selectedGoal === goal.id && styles.selectedGoalCard]} onPress={() => setSelectedGoal(goal.id)}>
                  <LinearGradient colors={goal.gradient as any} style={styles.goalGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
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
            ))}
          </View>
        </View>
      </ScrollView>

      <Animated.View entering={FadeInDown.delay(800).springify()} style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.nextButton, !selectedGoal && styles.nextButtonDisabled]} onPress={handleNext} disabled={!selectedGoal}>
          <LinearGradient colors={selectedGoal ? ['#8B5CF6', '#7C3AED', '#6D28D9'] : ['#D1D5DB', '#9CA3AF']} style={styles.nextButtonGradient}>
            <Text style={[styles.nextButtonText, !selectedGoal && styles.nextButtonTextDisabled]}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </>
  )

  const renderThankYouScreen = () => (
    <>
      {renderProgressBar()}
      {renderHeader()}

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.avatarContainer}>
          <View style={styles.avatarCircleLarge}>
            <Text style={styles.avatarEmojiLarge}>👨‍💼</Text>
          </View>
          <View style={styles.thumbsUp}>
            <Text style={styles.thumbsUpEmoji}>👍</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.textContainer}>
          <Text style={styles.title}>Thank you{userName ? `, ${userName}` : ''}!</Text>
          <Text style={styles.subtitle}>
            I have a program with lessons,{'\n'}
            exercises and real-life challenges for{'\n'}
            you.
          </Text>

          {isAutoProgressing && (
            <View style={styles.loadingContainer}>
              <View style={styles.spinner} />
              <Text style={styles.loadingText}>Starting your journey...</Text>
            </View>
          )}
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(700).springify()} style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient colors={['#8B5CF6', '#7C3AED', '#6D28D9']} style={styles.nextButtonGradient}>
            <Text style={styles.nextButtonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </>
  )

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 1:
        return renderIntroScreen()
      case 2:
        return renderNameScreen()
      case 3:
        return renderGoalsScreen()
      case 4:
        return renderThankYouScreen()
      default:
        return renderIntroScreen()
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {renderCurrentScreen()}

      {/* Bottom Progress Indicator */}
      <View style={styles.bottomProgressContainer}>
        <View style={styles.bottomProgressBar}>
          {[...Array(totalSteps)].map((_, index) => (
            <View key={index} style={[styles.progressDot, { backgroundColor: index < currentStep ? '#8B5CF6' : '#E5E5E5' }]} />
          ))}
        </View>
      </View>

      <CustomAlert {...alertProps} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
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
    position: 'relative',
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarCircleSmall: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarCircleLarge: {
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
    fontSize: 50,
  },
  avatarEmojiSmall: {
    fontSize: 40,
  },
  avatarEmojiLarge: {
    fontSize: 60,
  },
  waveContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  waveEmoji: {
    fontSize: 18,
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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
  },
  textInput: {
    fontSize: 20,
    color: '#1F2937',
    textAlign: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'transparent',
  },
  underline: {
    width: '60%',
    height: 2,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
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
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonTextDisabled: {
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  goalsTitle: {
    fontSize: 24,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 32,
  },
  goalsSubtitle: {
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
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 2,
  },
  goalSubtitle: {
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
  bottomProgressContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomProgressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  loadingContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  spinner: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderTopColor: 'transparent',
    borderRadius: 16,
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
  },
})

export default OnboardingFlow
