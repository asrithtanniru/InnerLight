import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { Typography } from '../../utils/typography';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <LinearGradient
        colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
        style={styles.topSection}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={styles.illustrationContainer}
        >
          <View style={styles.decorativeElements}>
            <View style={[styles.circle, styles.circle1]} />
            <View style={[styles.circle, styles.circle2]} />
            <View style={[styles.circle, styles.circle3]} />
            <View style={[styles.line, styles.line1]} />
            <View style={[styles.line, styles.line2]} />
          </View>

          <View style={styles.characterContainer}>
            <View style={styles.character}>
              <View style={styles.characterHead} />
              <View style={styles.characterBody} />
              <View style={styles.characterArm1} />
              <View style={styles.characterArm2} />
            </View>
          </View>
        </Animated.View>

        {/* Page Indicator */}
        {/* <View style={styles.pageIndicator}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View> */}
      </LinearGradient>

      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        style={styles.bottomSection}
      >
        <View style={styles.contentContainer}>
          {/* <View style={styles.stepBadge}>
            <Text style={styles.stepLabel}>STEP 1</Text>
          </View> */}

          <Text style={styles.title}>
            Personalize Your Mental{'\n'}
            <Text style={styles.titleHighlight}>Health State</Text> With AI
          </Text>

          <Text style={styles.subtitle}>
            Your mindful mental health AI companion for everyone, anywhere 🌱
          </Text>

          {/* Round Continue Button with Arrow */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.navigate('SignIn')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.arrowIcon}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  topSection: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  decorativeElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
  },
  circle1: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: '20%',
    left: '15%',
  },
  circle2: {
    width: 16,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: '30%',
    right: '20%',
  },
  circle3: {
    width: 12,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    bottom: '25%',
    left: '20%',
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  line1: {
    width: 30,
    height: 3,
    top: '15%',
    right: '15%',
    transform: [{ rotate: '30deg' }],
  },
  line2: {
    width: 25,
    height: 3,
    bottom: '20%',
    right: '25%',
    transform: [{ rotate: '-45deg' }],
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  characterHead: {
    width: 80,
    height: 80,
    backgroundColor: '#FDB5A6',
    borderRadius: 40,
    marginBottom: 8,
  },
  characterBody: {
    width: 120,
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 60,
    position: 'relative',
  },
  characterArm1: {
    position: 'absolute',
    width: 40,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    top: 88,
    left: -15,
    transform: [{ rotate: '20deg' }],
  },
  characterArm2: {
    position: 'absolute',
    width: 40,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    top: 88,
    right: -15,
    transform: [{ rotate: '-20deg' }],
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 24,
    borderRadius: 12,
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
    minHeight: height * 0.4,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  stepBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  stepLabel: {
    ...Typography.overline,
    fontSize: 12,
    color: '#8B5CF6',
  },
  title: {
    ...Typography.h5,
    fontSize: 32,
    color: '#2D3748',
    lineHeight: 40,
    marginBottom: 16,
  },
  titleHighlight: {
    color: '#8B5CF6',
    ...Typography.h4,
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 16,

  },
  subtitle: {
    ...Typography.h5,
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  continueButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    ...Typography.h3,
    fontSize: 34,
    color: '#FFFFFF',
    marginBottom: 8,
  },
});

export default WelcomeScreen;
