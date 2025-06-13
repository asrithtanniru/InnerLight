// src/utils/animations.ts
import { Easing } from 'react-native-reanimated';

export const animations = {
  // Timing configurations
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },

  // Easing functions
  easing: {
    easeIn: Easing.in(Easing.quad),
    easeOut: Easing.out(Easing.quad),
    easeInOut: Easing.inOut(Easing.quad),
    bounce: Easing.bounce,
    elastic: Easing.elastic(1.5),
    back: Easing.back(1.5),
    bezier: Easing.bezier(0.25, 0.1, 0.25, 1),
  },

  // Spring configurations
  spring: {
    gentle: {
      damping: 15,
      stiffness: 150,
      mass: 1,
    },
    bouncy: {
      damping: 8,
      stiffness: 100,
      mass: 1,
    },
    snappy: {
      damping: 20,
      stiffness: 300,
      mass: 1,
    },
    slow: {
      damping: 25,
      stiffness: 100,
      mass: 1,
    },
  },

  // Common animation presets
  presets: {
    fadeIn: {
      duration: 300,
      easing: Easing.out(Easing.quad),
    },
    slideUp: {
      duration: 400,
      easing: Easing.out(Easing.back(1.5)),
    },
    slideDown: {
      duration: 400,
      easing: Easing.out(Easing.back(1.5)),
    },
    scale: {
      duration: 200,
      easing: Easing.out(Easing.quad),
    },
    bounce: {
      duration: 600,
      easing: Easing.bounce,
    },
  },

  // Layout animation configurations
  layout: {
    springify: {
      type: 'spring',
      property: 'opacity',
      springDamping: 0.7,
      duration: 300,
    },
    easeInEaseOut: {
      type: 'easeInEaseOut',
      duration: 300,
    },
    linear: {
      type: 'linear',
      duration: 200,
    },
  },

  // Gesture configurations
  gesture: {
    swipe: {
      velocityThreshold: 500,
      directionalOffsetThreshold: 80,
    },
    pan: {
      minPointers: 1,
      maxPointers: 1,
      avgTouches: true,
    },
  },
};

// Animation helper functions
export const createFadeAnimation = (duration: number = 300) => ({
  duration,
  easing: animations.easing.easeOut,
});

export const createSlideAnimation = (duration: number = 400) => ({
  duration,
  easing: animations.easing.back,
});

export const createScaleAnimation = (duration: number = 200) => ({
  duration,
  easing: animations.easing.easeOut,
});

export const createBounceAnimation = (duration: number = 600) => ({
  duration,
  easing: animations.easing.bounce,
});

// Stagger animation helper
export const createStaggeredAnimation = (
  itemCount: number,
  baseDelay: number = 100,
  animationType: 'fadeIn' | 'slideUp' | 'scale' = 'slideUp'
) => {
  return Array.from({ length: itemCount }, (_, index) => ({
    ...animations.presets[animationType],
    delay: index * baseDelay,
  }));
};
// src/utils/animations.ts (continued from previous)
export const createSequenceAnimation = (
  animations: Array<{ delay: number; duration: number; easing?: any }>,
  stagger: number = 100
) => {
  return animations.map((anim, index) => ({
    ...anim,
    delay: anim.delay + (index * stagger),
  }));
};

// Gesture animation configurations
export const gestureAnimations = {
  swipeThreshold: 50,
  snapPoints: {
    quarter: 0.25,
    half: 0.5,
    threeQuarter: 0.75,
    full: 1,
  },

  // Card swipe animations
  cardSwipe: {
    translateX: {
      inputRange: [-200, -50, 0, 50, 200],
      outputRange: [-200, -50, 0, 50, 200],
      extrapolate: 'clamp',
    },
    rotate: {
      inputRange: [-200, 0, 200],
      outputRange: ['-15deg', '0deg', '15deg'],
      extrapolate: 'clamp',
    },
    opacity: {
      inputRange: [-200, -50, 0, 50, 200],
      outputRange: [0.5, 0.8, 1, 0.8, 0.5],
      extrapolate: 'clamp',
    },
  },

  // Bottom sheet animations
  bottomSheet: {
    snapAnimation: {
      damping: 50,
      stiffness: 200,
      mass: 0.3,
    },
    backdropOpacity: {
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: 'clamp',
    },
  },

  // Pull to refresh
  pullToRefresh: {
    threshold: 80,
    maxPull: 120,
    snapBack: {
      damping: 15,
      stiffness: 150,
    },
  },
};

// Layout transition presets
export const layoutTransitions = {
  entering: {
    slideInFromRight: {
      duration: 300,
      easing: animations.easing.easeOut,
    },
    slideInFromLeft: {
      duration: 300,
      easing: animations.easing.easeOut,
    },
    slideInFromBottom: {
      duration: 400,
      easing: animations.easing.back,
    },
    fadeIn: {
      duration: 250,
      easing: animations.easing.easeOut,
    },
    zoomIn: {
      duration: 300,
      easing: animations.easing.back,
    },
  },

  exiting: {
    slideOutToRight: {
      duration: 250,
      easing: animations.easing.easeIn,
    },
    slideOutToLeft: {
      duration: 250,
      easing: animations.easing.easeIn,
    },
    slideOutToBottom: {
      duration: 300,
      easing: animations.easing.easeIn,
    },
    fadeOut: {
      duration: 200,
      easing: animations.easing.easeIn,
    },
    zoomOut: {
      duration: 250,
      easing: animations.easing.easeIn,
    },
  },
};

// Micro-interaction animations
export const microAnimations = {
  buttonPress: {
    scale: 0.95,
    duration: 150,
    easing: animations.easing.easeOut,
  },

  heartbeat: {
    scale: [1, 1.2, 1],
    duration: 600,
    easing: animations.easing.easeInOut,
  },

  shake: {
    translateX: [0, -10, 10, -10, 10, 0],
    duration: 500,
    easing: animations.easing.easeInOut,
  },

  pulse: {
    scale: [1, 1.05, 1],
    duration: 1000,
    easing: animations.easing.easeInOut,
    repeat: -1,
  },

  wiggle: {
    rotate: ['0deg', '-3deg', '3deg', '-3deg', '0deg'],
    duration: 500,
    easing: animations.easing.easeInOut,
  },
};

// Loading animations
export const loadingAnimations = {
  spinner: {
    rotate: '360deg',
    duration: 1000,
    easing: animations.easing.easeInOut,
    repeat: -1,
  },

  dots: {
    scale: [1, 1.2, 1],
    duration: 600,
    easing: animations.easing.easeInOut,
    repeat: -1,
  },

  wave: {
    translateY: [-5, 5, -5],
    duration: 800,
    easing: animations.easing.easeInOut,
    repeat: -1,
  },

  breathe: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    duration: 2000,
    easing: animations.easing.easeInOut,
    repeat: -1,
  },
};

// Notification animations
export const notificationAnimations = {
  slideInFromTop: {
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 400,
    easing: animations.easing.back,
  },

  slideOutToTop: {
    translateY: [0, -100],
    opacity: [1, 0],
    duration: 300,
    easing: animations.easing.easeIn,
  },

  bounce: {
    scale: [0.3, 1.05, 0.9, 1],
    duration: 500,
    easing: animations.easing.easeOut,
  },
};

// Helper functions for complex animations
export const createParallaxAnimation = (
  scrollY: any,
  inputRange: number[],
  outputRange: number[]
) => {
  return {
    transform: [{
      translateY: scrollY.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp',
      }),
    }],
  };
};

export const createFadeScrollAnimation = (
  scrollY: any,
  fadeStart: number,
  fadeEnd: number
) => {
  return {
    opacity: scrollY.interpolate({
      inputRange: [fadeStart, fadeEnd],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
};

export const createScaleScrollAnimation = (
  scrollY: any,
  scaleStart: number,
  scaleEnd: number,
  minScale: number = 0.8
) => {
  return {
    transform: [{
      scale: scrollY.interpolate({
        inputRange: [scaleStart, scaleEnd],
        outputRange: [1, minScale],
        extrapolate: 'clamp',
      }),
    }],
  };
};

// Animation utility functions
export const withDelay = (animation: any, delay: number) => ({
  ...animation,
  delay,
});

export const withRepeat = (animation: any, repeatCount: number = -1) => ({
  ...animation,
  repeat: repeatCount,
});

export const withSequence = (...animations: any[]) => ({
  sequence: animations,
});

export const runOnJS = (callback: () => void) => {
  'worklet';
  return callback;
};

// Sequence animation helper
