// src/components/auth/GoogleSignInButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { LoadingSpinner } from '../common/LoadingSpinner';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface GoogleSignInButtonProps {
  onPress: () => Promise<void>;
  disabled?: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const scale = useSharedValue(1);

  const handlePress = async () => {
    if (disabled || isLoading) return;

    try {
      setIsLoading(true);
      await onPress();
    } catch (error) {
      console.error('Google Sign-In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[
          styles.button,
          (disabled || isLoading) && styles.buttonDisabled
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || isLoading}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          {isLoading ? (
            <LoadingSpinner size="small" color={colors.text.primary} />
          ) : (
            <View style={styles.googleIcon}>
              <Ionicons name="logo-google" size={20} color="#4285F4" />
            </View>
          )}
          <Text style={[
            styles.buttonText,
            (disabled || isLoading) && styles.buttonTextDisabled
          ]}>
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.shadow.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  buttonTextDisabled: {
    color: colors.text.secondary,
  },
});
