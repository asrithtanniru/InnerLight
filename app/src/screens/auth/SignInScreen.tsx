import React, { useState, useEffect, useRef, JSX } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Alert
} from 'react-native';
import Animated, { FadeInDown, FadeInUp, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { Typography } from '../../utils/typography';
import { GoogleSignInButton } from '../../components/auth/GoogleSignInButton';
import { GoogleSignInButton as GoogleSignInButtonComponent } from '../../components/auth/GoogleSignInButton';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

interface SignInScreenProps {
  navigation: any;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'INNER LIGHT',
    subtitle: 'Transform your mindset, embrace your potential'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'INNER LIGHT',
    subtitle: 'Discover peace within, find strength beyond'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'INNER LIGHT',
    subtitle: 'Journey inward, shine outward, live fully'
  }
];

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { signInWithGoogle } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const slideAnimation = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => {
        const nextSlide = (prev + 1) % slides.length;
        scrollViewRef.current?.scrollTo({
          x: nextSlide * width,
          animated: true
        });
        return nextSlide;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const handleExploreApp = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Navigate to onboarding flow instead of signing in directly
      navigation.navigate('OnboardingIntro');
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
      await signInWithGoogle();
      // If successful, the AuthContext will handle the user state
      // and the AppNavigator will automatically redirect to the main app
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSlide = (slide: Slide, index: number): JSX.Element => (
    <View key={slide.id} style={styles.slideContainer}>
      <ImageBackground
        source={{ uri: slide.image }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}
        >
          <Animated.View
            entering={FadeInUp.delay(300).springify()}
            style={styles.logoSection}
          >
            <Text style={styles.logoText}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Image Slider */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.sliderContainer}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>

      {/* Bottom Section with Buttons */}
      <Animated.View
        entering={FadeInDown.delay(500).springify()}
        style={styles.bottomSection}
      >
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
          style={styles.bottomGradient}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Reach Your Potential</Text>

            {/* Page Indicator Dots */}
            <View style={styles.dotsContainer}>
              {slides.map((_, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentSlide === index ? styles.activeDot : null
                  ]}
                />
              ))}
            </View>

            {/* Buttons */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.exploreButton, isLoading && styles.buttonDisabled]}
                onPress={handleExploreApp}
                disabled={isLoading}
              >
                <Text style={styles.exploreButtonText}>
                  {isLoading ? 'Loading...' : 'Explore The App'}
                </Text>
              </TouchableOpacity>

              <GoogleSignInButtonComponent
                onPress={handleGoogleSignIn}
                disabled={isLoading}
              />
            </View>

            {/* Footer Text */}
            <Text style={styles.footerText}>
              By continuing you agree to INNER LIGHT's{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  sliderContainer: {
    flex: 1,
  },
  slideContainer: {
    width: width,
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoText: {
    ...Typography.h3,
    fontSize: 36,
    color: '#FFFFFF',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body1,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
  },
  bottomGradient: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  title: {
    ...Typography.h3,
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 24,
    borderRadius: 12,
  },
  buttonsContainer: {
    gap: 16,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  exploreButtonText: {
    ...Typography.button,
    color: '#8B5CF6',
    fontSize: 16,
  },
  footerText: {
    ...Typography.caption,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    ...Typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
