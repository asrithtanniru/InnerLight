// src/components/chat/ChatBubble.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { Typography } from '../../utils/typography';
import { AnimatedView } from '../common/AnimatedView';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
  isTyping = false,
}) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatedView animation="slideUp" delay={100}>
      <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
        {isUser ? (
          <LinearGradient
            colors={[colors.primary.light, colors.primary.main]}
            style={[styles.bubble, styles.userBubble]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.messageText, styles.userMessageText]}>{message}</Text>
          </LinearGradient>
        ) : (
          <View style={[styles.bubble, styles.aiBubble]}>
            <Text style={[styles.messageText, styles.aiMessageText]}>{message}</Text>
          </View>
        )}
        <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.aiTimestamp]}>
          {formatTime(timestamp)}
        </Text>
      </View>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.background.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  messageText: {
    ...Typography.body1,
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: colors.text.inverse,
  },
  aiMessageText: {
    color: colors.text.primary,
  },
  timestamp: {
    ...Typography.caption,
    fontSize: 12,
    marginTop: 4,
    marginHorizontal: 8,
  },
  userTimestamp: {
    color: colors.text.secondary,
    textAlign: 'right',
  },
  aiTimestamp: {
    color: colors.text.secondary,
    textAlign: 'left',
  },
});
