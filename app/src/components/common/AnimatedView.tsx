// src/components/common/AnimatedView.tsx
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  Easing,
} from 'react-native-reanimated';

interface AnimatedViewProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';
  duration?: number;
  delay?: number;
  style?: ViewStyle;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  animation = 'fadeIn',
  duration = 300,
  delay = 0,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const startAnimation = () => {
      switch (animation) {
        case 'fadeIn':
          opacity.value = withTiming(1, { duration, easing: Easing.out(Easing.quad) });
          break;
        case 'slideUp':
          opacity.value = withTiming(1, { duration });
          translateY.value = withTiming(0, { duration, easing: Easing.out(Easing.back(1.5)) });
          break;
        case 'slideDown':
          opacity.value = withTiming(1, { duration });
          translateY.value = withTiming(0, { duration, easing: Easing.out(Easing.back(1.5)) });
          break;
        case 'slideLeft':
          opacity.value = withTiming(1, { duration });
          translateX.value = withTiming(0, { duration, easing: Easing.out(Easing.back(1.5)) });
          break;
        case 'slideRight':
          opacity.value = withTiming(1, { duration });
          translateX.value = withTiming(0, { duration, easing: Easing.out(Easing.back(1.5)) });
          break;
        case 'scale':
          opacity.value = withTiming(1, { duration });
          scale.value = withSpring(1, { damping: 8, stiffness: 100 });
          break;
        case 'bounce':
          opacity.value = withTiming(1, { duration: duration / 2 });
          scale.value = withSequence(
            withTiming(1.1, { duration: duration / 2 }),
            withTiming(1, { duration: duration / 2 })
          );
          break;
      }
    };

    // Initialize values based on animation type
    switch (animation) {
      case 'slideUp':
        translateY.value = 50;
        break;
      case 'slideDown':
        translateY.value = -50;
        break;
      case 'slideLeft':
        translateX.value = 50;
        break;
      case 'slideRight':
        translateX.value = -50;
        break;
      case 'scale':
      case 'bounce':
        scale.value = 0;
        break;
    }

    const timer = setTimeout(startAnimation, delay);
    return () => clearTimeout(timer);
  }, [animation, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value || 1 },
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};
