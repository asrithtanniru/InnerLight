import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { Typography } from '../../utils/typography';

const { width, height } = Dimensions.get('window');

interface SignInScreenProps {
  navigation: any;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signInWithGoogle } = useAuth();

  const handleExploreApp = async (): Promise<void> => {
    setIsLoading(true);
    try {
      navigation.navigate('OnboardingFlow');
    } catch (error) {
      Alert.alert('Error', 'Failed to explore app. Please try again.', [
        { text: 'OK' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Top Section with Static Image and Gradient */}
      <View style={styles.topSection}>
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
          style={styles.topGradient}
        >
          <Animated.View
            entering={FadeInUp.delay(300).springify()}
            style={styles.contentSection}
          >
            <Text style={styles.mainTitle}>Light Up Your</Text>
            <Text style={styles.mainTitleBold}>Inner Peace!</Text>
            <Text style={styles.description}>
              Transform your mindset and discover the power within you. Start your journey to inner peace today.
            </Text>

            {/* Static Illustration Placeholder */}
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationPlaceholder}>
                {/* You can replace this with your actual image */}
                <Image
                  source={require('../../../assets/med.png')}
                  style={styles.illustrationImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
      </View>

      {/* Bottom Section with White Background */}
      <Animated.View
        entering={FadeInDown.delay(500).springify()}
        style={styles.bottomSection}
      >
        <View style={styles.bottomContent}>
          <Text style={styles.welcomeTitle}>Welcome to Inner Light!</Text>


          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.otpButton, isLoading && styles.buttonDisabled]}
              onPress={handleExploreApp}
              disabled={isLoading}
            >
              <Text style={styles.otpButtonText}>
                Get Started
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.googleButton, isLoading && styles.buttonDisabled, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
              onPress={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png'
                }}
                style={[{ width: 20, height: 20, marginRight: 10 }]}
                resizeMode="contain"
              />
              <Text style={styles.googleButtonText}>
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Text */}
          <Text style={styles.footerText}>
            By continuing, you agree to Inner Light's{' '}
            <Text style={styles.linkText}>policies</Text> and our{' '}
            <Text style={styles.linkText}>Terms & Conditions</Text>.
          </Text>

        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  topSection: {
    flex: 0.8,
  },
  topGradient: {
    flex: 1,
    paddingTop: 60,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  mainTitle: {
    ...Typography.h1,
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: 20,
  },
  mainTitleBold: {
    ...Typography.h2,
    fontSize: 32,
    color: '#000000',
    marginTop: 2,
  },
  description: {
    ...Typography.body1,
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginTop: 16,
    opacity: 0.9,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  illustrationPlaceholder: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: 380,
    height: 380,
    resizeMode: 'contain',
  },
  bottomSection: {
    flex: 0.4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  bottomContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  welcomeTitle: {
    ...Typography.h3,
    fontSize: 24,
    color: '#1F2937',
    fontWeight: '600',
    marginBottom: 30,
  },

  buttonsContainer: {
    gap: 16,
    marginBottom: 20,
  },
  otpButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  otpButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButtonText: {
    ...Typography.button,
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    ...Typography.caption,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  linkText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
});


export default SignInScreen;
