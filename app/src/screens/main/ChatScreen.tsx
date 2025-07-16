import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Typography } from '../../utils/typography';
import { ChatBubble } from '../../components/chat/ChatBubble';
import { ChatInput } from '../../components/chat/ChatInput';
import { TypingIndicator } from '../../components/chat/TypingIndicator';
import { dummyData } from '../../services/dummyData';

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Load initial messages or create welcome message
    const initialMessages = [
      {
        id: '1',
        content: "Go ahead - ask me anything 😊",
        sender: 'ai',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        type: 'text',
      },
      {
        id: '2',
        content: "How have you been lately?",
        sender: 'ai',
        timestamp: new Date().toISOString(),
        type: 'text',
      }
    ];

    setMessages(initialMessages);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        type: 'text',
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "I understand how you're feeling. It's completely normal to experience these emotions. Let's work through this together.",
      "That's a great insight! Recognizing these patterns is the first step toward positive change.",
      "Thank you for sharing that with me. Your awareness of your thoughts and feelings shows real growth.",
      "I hear you. These situations can be challenging. Let's explore some strategies that might help.",
      "You're doing great by taking the time to reflect on this. What do you think might be a small first step you could take?",
      "I'm here to listen and support you. How does that make you feel?",
      "That sounds like a positive step forward. What would you like to focus on next?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const renderMessage = ({ item, index }: { item: any; index: number }) => {
    const showDate = index === 0 ||
      formatMessageDate(item.timestamp) !== formatMessageDate(messages[index - 1]?.timestamp);

    return (
      <Animated.View entering={FadeInDown.delay(index * 100)}>
        {showDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {formatMessageDate(item.timestamp)}
            </Text>
          </View>
        )}
        <ChatBubble
          message={item.content}
          isUser={item.sender === 'user'}
          timestamp={item.timestamp}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View
        entering={FadeInDown.delay(200)}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>🤖</Text>
          </View>
          <Text style={styles.headerTitle}>Eden AI</Text>
        </View>
        <View style={styles.headerDivider} />
      </Animated.View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        <TypingIndicator isVisible={isTyping} />

        <ChatInput
          onSendMessage={handleSendMessage}
          placeholder="Your message"
          disabled={isTyping}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  headerTitle: {
    ...Typography.h5,
    fontSize: 18,
    color: '#2D3748',
    fontWeight: '600',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 16,
  },
  keyboardContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateText: {
    ...Typography.caption,
    fontSize: 12,
    color: '#A0AEC0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

// Updated ChatBubble component styles (you'll need to update this component)
const ChatBubbleStyles = StyleSheet.create({
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
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: '#8B5CF6',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    ...Typography.body2,
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#2D3748',
  },
  timestamp: {
    ...Typography.caption,
    fontSize: 11,
    color: '#A0AEC0',
    marginTop: 4,
  },
});

// Updated ChatInput component styles (you'll need to update this component)
const ChatInputStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F7FAFC',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  textInput: {
    flex: 1,
    ...Typography.body2,
    fontSize: 16,
    color: '#2D3748',
    maxHeight: 80,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#CBD5E0',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatScreen;
