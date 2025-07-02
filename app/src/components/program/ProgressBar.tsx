// src/components/program/ProgressBar.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../utils/colors';

interface ProgressBarProps {
  progress: number; // 0 to 1
  label?: string;
  showPercentage?: boolean;
  height?: number;
  animated?: boolean;
  delay?: number;
  color?: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  height = 8,
  animated = true,
  delay = 0,
  color = [colors.primary.light, colors.primary.main],
}) => {
  const animatedWidth = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      animatedOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
      animatedWidth.value = withDelay(
        delay + 200,
        withTiming(progress, {
          duration: 800,
          easing: Easing.out(Easing.cubic),
        })
      );
    } else {
      animatedWidth.value = progress;
      animatedOpacity.value = 1;
    }
  }, [progress, animated, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value * 100}%`,
      opacity: animatedOpacity.value,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  const percentage = Math.round(progress * 100);

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      {(label || showPercentage) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && <Text style={styles.percentage}>{percentage}%</Text>}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <Animated.View style={[styles.progressContainer, animatedStyle, { height }]}>
          <LinearGradient
            colors={color as [string, string, ...string[]]}
            style={styles.progress}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
  },
  track: {
    backgroundColor: colors.background.secondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    flex: 1,
    borderRadius: 4,
  },
});
