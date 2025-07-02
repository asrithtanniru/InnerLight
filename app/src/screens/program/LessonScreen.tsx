// src/screens/program/LessonScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { AnimatedView } from '../../components/common/AnimatedView';
import Button from '../../components/common/Button';
import { ProgressBar } from '../../components/program/ProgressBar';
import dummyData from '../../services/dummyData';

interface LessonScreenProps {
  route: { params: { lessonId: string; dayNumber: number } };
  navigation: any;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({
  route,
  navigation,
}) => {
  const { lessonId, dayNumber } = route.params;
  const [lesson, setLesson] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const lessonData = dummyData.lessons.find(l => l.id === lessonId);
    setLesson(lessonData);
  }, [lessonId]);

  const handleNext = () => {
    if (lesson && currentSection < lesson.content.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // Navigate back with completion status
    navigation.goBack();
  };

  const renderContent = (content: any) => {
    switch (content.type) {
      case 'text':
        return (
          <Text style={styles.contentText}>{content.data}</Text>
        );
      case 'quote':
        return (
          <View style={styles.quoteContainer}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color={colors.primary.main} />
            <Text style={styles.quoteText}>{content.data}</Text>
          </View>
        );
      case 'list':
        return (
          <View style={styles.listContainer}>
            {content.data.map((item: string, index: number) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.listBullet} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      case 'image':
        return (
          <Image source={{ uri: content.data }} style={styles.contentImage} />
        );
      default:
        return null;
    }
  };

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const progress = lesson.content.length > 0 ? (currentSection + 1) / lesson.content.length : 0;
  const currentContent = lesson.content[currentSection];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.dayNumber}>Day {dayNumber}</Text>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={progress}
          showPercentage={false}
          height={4}
          animated={true}
        />
        <Text style={styles.progressText}>
          {currentSection + 1} of {lesson.content.length}
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <AnimatedView key={currentSection} animation="fadeIn" style={styles.contentSection}>
          {renderContent(currentContent)}
        </AnimatedView>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentSection === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentSection === 0}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={currentSection === 0 ? colors.text.secondary : colors.primary.main}
          />
          <Text style={[
            styles.navButtonText,
            currentSection === 0 && styles.navButtonTextDisabled
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        <Button
          title={currentSection === lesson.content.length - 1 ? "Complete Lesson" : "Next"}
          onPress={handleNext}
          variant="primary"
          style={styles.nextButton}
        />
      </View>

      {/* Key Takeaways */}
      {currentSection === lesson.content.length - 1 && (
        <AnimatedView animation="slideUp" style={styles.takeawaysContainer}>
          <Text style={styles.takeawaysTitle}>Key Takeaways</Text>
          {lesson.keyTakeaways.map((takeaway: string, index: number) => (
            <View key={index} style={styles.takeawayItem}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success.main} />
              <Text style={styles.takeawayText}>{takeaway}</Text>
            </View>
          ))}
        </AnimatedView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  dayNumber: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentSection: {
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.primary,
  },
  quoteContainer: {
    backgroundColor: colors.primary.background,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.text.primary,
    marginTop: 8,
    lineHeight: 24,
  },
  listContainer: {
    marginVertical: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary.main,
    marginTop: 9,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.primary,
  },
  contentImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginVertical: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: colors.primary.main,
    marginLeft: 4,
  },
  navButtonTextDisabled: {
    color: colors.text.secondary,
  },
  nextButton: {
    minWidth: 120,
  },
  takeawaysContainer: {
    backgroundColor: colors.success.background,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.success.light,
  },
  takeawaysTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success.main,
    marginBottom: 12,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  takeawayText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    marginLeft: 8,
    lineHeight: 20,
  },
});
