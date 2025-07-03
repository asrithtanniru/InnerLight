// src/components/auth/GoogleSignInButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Typography } from '../../utils/typography';
interface GoogleSignInButtonProps {
  onPress: () => Promise<void>;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
  disabled = false,
  variant = 'outline',
  size = 'large',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePress = async () => {
    if (disabled || isLoading) return;

    try {
      setIsLoading(true);

      // Add haptic feedback animation
      scale.value = withSequence(
        withTiming(0.96, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );

      await onPress();
    } catch (error) {
      console.error('Google Sign-In error:', error);

      // Error shake animation
      scale.value = withSequence(
        withTiming(1.02, { duration: 100 }),
        withTiming(0.98, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 });
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withTiming(1, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${size}`]];

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primaryButton];
      case 'secondary':
        return [...baseStyle, styles.secondaryButton];
      case 'outline':
      default:
        return [...baseStyle, styles.outlineButton];
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText, styles[`buttonText_${size}`]];

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primaryButtonText];
      case 'secondary':
        return [...baseStyle, styles.secondaryButtonText];
      case 'outline':
      default:
        return [...baseStyle, styles.outlineButtonText];
    }
  };

  const renderIcon = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size={size === 'small' ? 16 : 20}
            color={variant === 'primary' ? '#FFFFFF' : '#4285F4'}
          />
        </View>
      );
    }

    return (
      <View style={[styles.iconContainer, styles[`iconContainer_${size}`]]}>
        <Ionicons
          name="logo-google"
          size={size === 'small' ? 16 : size === 'medium' ? 18 : 20}
          color="#000"
        />
      </View>
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[
          ...getButtonStyle(),
          (disabled || isLoading) && styles.buttonDisabled
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || isLoading}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          {renderIcon()}
          <Text style={[
            ...getTextStyle(),
            (disabled || isLoading) && styles.buttonTextDisabled
          ]}>
            {isLoading ? 'Signing in...' : 'Sign up with Google'}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button_small: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  button_medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  button_large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: '#4285F4',
    borderWidth: 0,
  },
  secondaryButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  outlineButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer_small: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  iconContainer_medium: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  iconContainer_large: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  loadingContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buttonText: {
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Quicksand_600SemiBold',
  },
  buttonText_small: {
    fontSize: 14,
  },
  buttonText_medium: {
    fontSize: 15,
  },
  buttonText_large: {
    fontSize: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#1F2937',
  },
  outlineButtonText: {
    color: '#1F2937',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
});

