// src/screens/main/ChatScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../utils/colors';
import { ChatBubble } from '../../components/chat/ChatBubble';
import { ChatInput } from '../../components/chat/ChatInput';
import { TypingIndicator } from '../../components/chat/TypingIndicator';
import { dummyData } from '../../services/dummyData';

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Load initial messages
    setMessages(dummyData.chatMessages);
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
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderMessage = ({ item }: { item: any }) => (
    <ChatBubble
      message={item.content}
      isUser={item.sender === 'user'}
      timestamp={item.timestamp}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        <TypingIndicator isVisible={isTyping} />

        <ChatInput
          onSendMessage={handleSendMessage}
          placeholder="Share what's on your mind..."
          disabled={isTyping}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  messagesList: {
    flex: 1,
    paddingVertical: 16,
  },
});
