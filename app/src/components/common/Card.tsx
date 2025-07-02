import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../utils/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

const Card: React.FC<CardProps> = ({ children, style, padding = 16 }) => {
  return (
    <View style={[styles.card, { padding }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary.background,
    borderRadius: 16,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default Card;
