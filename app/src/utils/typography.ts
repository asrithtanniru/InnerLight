import { TextStyle } from 'react-native';

// Font families
export const FontFamily = {
  light: 'Poppins_300Light',
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

// Typography scale
export const Typography = {
  // Headings
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  } as TextStyle,

  h2: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  } as TextStyle,

  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  } as TextStyle,

  h4: {
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  } as TextStyle,

  h5: {
    fontFamily: FontFamily.medium,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
  } as TextStyle,

  h6: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  } as TextStyle,

  // Body text
  body1: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  } as TextStyle,

  body2: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  } as TextStyle,

  // Captions and small text
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  } as TextStyle,

  overline: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  } as TextStyle,

  // Buttons
  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  } as TextStyle,

  buttonSmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  } as TextStyle,

  // Input text
  input: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  } as TextStyle,

  label: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  } as TextStyle,
};

// Helper function to create text style with color
export const createTextStyle = (typography: TextStyle, color: string): TextStyle => ({
  ...typography,
  color,
});
