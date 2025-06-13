// src/utils/colors.ts
export const colors = {
  // Primary colors - soft blue palette
  primary: {
    main: '#6B9EF5',        // Soft blue
    light: '#A8C8F7',       // Light blue
    dark: '#4A7BC8',        // Darker blue
    background: '#F0F6FF',   // Very light blue background
  },

  // Secondary colors - soft purple palette
  secondary: {
    main: '#9B7EF5',        // Soft purple
    light: '#C4B5F7',       // Light purple
    dark: '#7B5BC8',        // Darker purple
    background: '#F5F0FF',   // Very light purple background
  },

  // Accent colors - warm coral/pink
  accent: {
    main: '#F59E7E',        // Soft coral
    light: '#F7C4A8',       // Light coral
    dark: '#C87B5B',        // Darker coral
    background: '#FFF5F0',   // Very light coral background
  },

  // Success colors - soft green
  success: {
    main: '#7EF59B',        // Soft green
    light: '#A8F7C4',       // Light green
    dark: '#5BC87B',        // Darker green
    background: '#F0FFF5',   // Very light green background
  },

  // Warning colors - soft yellow
  warning: {
    main: '#F5D67E',        // Soft yellow
    light: '#F7E4A8',       // Light yellow
    dark: '#C8B15B',        // Darker yellow
    background: '#FFFDF0',   // Very light yellow background
  },

  // Error colors - soft red
  error: {
    main: '#F57E7E',        // Soft red
    light: '#F7A8A8',       // Light red
    dark: '#C85B5B',        // Darker red
    background: '#FFF0F0',   // Very light red background
  },

  // Text colors
  text: {
    primary: '#2D3748',     // Dark gray for primary text
    secondary: '#718096',    // Medium gray for secondary text
    tertiary: '#A0AEC0',    // Light gray for tertiary text
    inverse: '#FFFFFF',     // White text for dark backgrounds
    disabled: '#CBD5E0',    // Very light gray for disabled text
  },

  // Background colors
  background: {
    primary: '#FFFFFF',     // Main background
    secondary: '#F7FAFC',   // Secondary background
    tertiary: '#EDF2F7',    // Tertiary background
    card: '#FFFFFF',        // Card background
    modal: '#FFFFFF',       // Modal background
    overlay: 'rgba(0, 0, 0, 0.5)', // Overlay background
  },

  // Border colors
  border: {
    light: '#E2E8F0',       // Light border
    medium: '#CBD5E0',      // Medium border
    dark: '#A0AEC0',        // Dark border
    focus: '#6B9EF5',       // Focus border (primary color)
  },

  // Shadow colors
  shadow: {
    main: '#000000',        // Main shadow color
    light: 'rgba(0, 0, 0, 0.1)', // Light shadow
    medium: 'rgba(0, 0, 0, 0.15)', // Medium shadow
    dark: 'rgba(0, 0, 0, 0.25)',   // Dark shadow
  },

  // 
  // t definitions
  gradients: {
    primary: ['#A8C8F7', '#6B9EF5'],
    secondary: ['#C4B5F7', '#9B7EF5'],
    accent: ['#F7C4A8', '#F59E7E'],
    success: ['#A8F7C4', '#7EF59B'],
    sunset: ['#F7C4A8', '#F59E7E', '#F5D67E'],
    ocean: ['#A8C8F7', '#6B9EF5', '#9B7EF5'],
    forest: ['#A8F7C4', '#7EF59B', '#6B9EF5'],
  },

  // Semantic colors for specific use cases
  semantic: {
    info: '#6B9EF5',        // Information
    link: '#4A7BC8',        // Links
    visited: '#7B5BC8',     // Visited links
    highlight: '#F5D67E',   // Highlighted text
    selection: '#A8C8F7',   // Text selection
  },

  // Chart/data visualization colors
  chart: {
    primary: '#6B9EF5',
    secondary: '#9B7EF5',
    tertiary: '#F59E7E',
    quaternary: '#7EF59B',
    quinary: '#F5D67E',
    senary: '#F57E7E',
  },

  // Status colors
  status: {
    online: '#7EF59B',      // Online status
    offline: '#A0AEC0',     // Offline status
    away: '#F5D67E',        // Away status
    busy: '#F57E7E',        // Busy status
  },

  // Mood tracking colors (for mental wellness app)
  mood: {
    excellent: '#7EF59B',   // Excellent mood
    good: '#A8F7C4',        // Good mood
    neutral: '#F5D67E',     // Neutral mood
    poor: '#F7C4A8',        // Poor mood
    terrible: '#F57E7E',    // Terrible mood
  },

  // Wellness activity colors
  wellness: {
    meditation: '#9B7EF5',  // Meditation activities
    exercise: '#F59E7E',    // Exercise activities
    journaling: '#6B9EF5', // Journaling activities
    breathing: '#7EF59B',   // Breathing exercises
    sleep: '#C4B5F7',       // Sleep tracking
  },

  // Time-based colors
  timeOfDay: {
    morning: '#F5D67E',     // Morning activities
    afternoon: '#6B9EF5',   // Afternoon activities
    evening: '#9B7EF5',     // Evening activities
    night: '#4A7BC8',       // Night activities
  },

  // Opacity variants for overlays and states
  opacity: {
    disabled: 0.4,
    pressed: 0.8,
    hover: 0.9,
    overlay: 0.5,
    backdrop: 0.3,
  },
};

// Helper functions for color manipulation
export const colorHelpers = {
  // Add opacity to any color
  withOpacity: (color: string, opacity: number): string => {
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
      return `#${hex}${alpha}`;
    }
    return color;
  },

  // Get contrasting text color for a background
  getContrastText: (backgroundColor: string): string => {
    // Simple contrast calculation - in a real app, you'd use a more sophisticated algorithm
    const lightColors = [
      colors.primary.light,
      colors.secondary.light,
      colors.accent.light,
      colors.success.light,
      colors.warning.light,
      colors.error.light,
      colors.background.primary,
      colors.background.secondary,
      colors.background.tertiary,
    ];

    return lightColors.includes(backgroundColor)
      ? colors.text.primary
      : colors.text.inverse;
  },

  // Get semantic color based on value
  getSemanticColor: (value: number, type: 'progress' | 'score' | 'mood'): string => {
    switch (type) {
      case 'progress':
        if (value >= 80) return colors.success.main;
        if (value >= 60) return colors.warning.main;
        if (value >= 40) return colors.accent.main;
        return colors.error.main;

      case 'score':
        if (value >= 90) return colors.success.main;
        if (value >= 70) return colors.primary.main;
        if (value >= 50) return colors.warning.main;
        return colors.error.main;

      case 'mood':
        if (value >= 4) return colors.mood.excellent;
        if (value >= 3) return colors.mood.good;
        if (value >= 2) return colors.mood.neutral;
        if (value >= 1) return colors.mood.poor;
        return colors.mood.terrible;

      default:
        return colors.primary.main;
    }
  },
};

// Theme variants (for potential dark mode support)
export const themes = {
  light: colors,

  dark: {
    ...colors,
    text: {
      primary: '#F7FAFC',
      secondary: '#E2E8F0',
      tertiary: '#CBD5E0',
      inverse: '#2D3748',
      disabled: '#4A5568',
    },
    background: {
      primary: '#1A202C',
      secondary: '#2D3748',
      tertiary: '#4A5568',
      card: '#2D3748',
      modal: '#1A202C',
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    border: {
      light: '#4A5568',
      medium: '#718096',
      dark: '#A0AEC0',
      focus: '#6B9EF5',
    },
  },
};

export default colors;
