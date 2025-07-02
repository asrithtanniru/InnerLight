import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/common/Button';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={colors.gradients.primary as [string, string, ...string[]]}
      style={styles.container}
    >
      <Animated.View
        entering={FadeInUp.delay(200).springify()}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>✨</Text>
        </View>
        <Text style={styles.title}>Inner Light</Text>
        <Text style={styles.subtitle}>
          Your journey to mental wellness starts here
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        style={styles.content}
      >
        <Text style={styles.description}>
          Build confidence, reduce anxiety, and develop mindfulness through
          personalized daily lessons and AI-powered guidance.
        </Text>

        <View style={styles.features}>
          <FeatureItem
            icon="🎯"
            text="Personalized daily lessons and challenges"
          />
          <FeatureItem
            icon="🤖"
            text="AI wellness coach available 24/7"
          />
          <FeatureItem
            icon="📈"
            text="Track your progress and build streaks"
          />
          <FeatureItem
            icon="🧘"
            text="Mindfulness and breathing exercises"
          />
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(600).springify()}
        style={styles.footer}
      >
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('SignIn')}
          size="large"
          style={styles.button}
        />
        <Text style={styles.footerText}>
          Start your wellness journey today
        </Text>
      </Animated.View>
    </LinearGradient>
  );
};

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary.background,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  features: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  button: {
    width: width - 48,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
