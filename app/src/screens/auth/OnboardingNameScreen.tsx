import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated'
import { Typography } from '../../utils/typography'
import { useAuth } from '../../contexts/AuthContext'
import { useCustomAlert } from '../../hooks/useCustomAlert'
import CustomAlert from '../../components/common/CustomAlert'

const { width, height } = Dimensions.get('window')

interface OnboardingNameScreenProps {
  navigation: any
}

const OnboardingNameScreen: React.FC<OnboardingNameScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('')
  const { signIn } = useAuth()
  const { showAlert, alertProps } = useCustomAlert()
  const currentStep = 2
  const totalSteps = 4

  const handleNext = () => {
    if (!name.trim()) {
      showAlert({
        title: 'Please enter your name',
        message: 'We need your name to personalize your experience.',
        type: 'warning',
      })
      return
    }
    navigation.navigate('OnboardingGoals', { userName: name.trim() })
  }

  const handleSkip = async () => {
    try {
      await signIn('demo@innerlight.com')
    } catch (error) {
      console.error('Failed to sign in:', error)
    }
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressBar, { width: width * 0.2 * (currentStep / totalSteps) }]} />
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
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨‍💼</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.textContainer}>
          <Text style={styles.title}>How should I call you?</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#9CA3AF"
            autoFocus={true}
            returnKeyType="next"
            onSubmitEditing={handleNext}
          />
          <View style={styles.underline} />
        </Animated.View>
      </View>

      {/* Next Button */}
      <Animated.View entering={FadeInDown.delay(900).springify()} style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.nextButton, !name.trim() && styles.nextButtonDisabled]} onPress={handleNext} disabled={!name.trim()}>
          <LinearGradient colors={name.trim() ? ['#8B5CF6', '#7C3AED', '#6D28D9'] : ['#D1D5DB', '#9CA3AF']} style={styles.nextButtonGradient}>
            <Text style={[styles.nextButtonText, !name.trim() && styles.nextButtonTextDisabled]}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
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
  },
  avatarCircle: {
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
  avatarEmoji: {
    fontSize: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    ...Typography.h2,
    fontSize: 28,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '700',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    ...Typography.body1,
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
})

export default OnboardingNameScreen
