import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Typography } from '../../utils/typography';
import { useAuth } from '../../contexts/AuthContext';
import { dummyPrograms } from '../../services/dummyData';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { state } = useAuth();
  const user = state.user;

  // UI state for tabs
  const [activeTab, setActiveTab] = useState<'Intro' | 'Communication skills'>('Intro');

  // Sample program data based on the image
  const programModules = [
    {
      id: 1,
      title: "Welcome, It's Time to Start FACING IT",
      type: "Lesson",
      duration: "4 min",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      isActive: true
    },
    {
      id: 2,
      title: "Imagine Your Ideal Life",
      type: "Audio",
      duration: "5 min",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      isActive: false
    },
    {
      id: 3,
      title: "Take a Step Towards Your Ideal Life",
      type: "Challenge",
      duration: "",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      isActive: false
    }
  ];

  // Example communication skills modules (replace with real data)
  const communicationModules = [
    {
      id: 11,
      title: 'Active Listening Basics',
      type: 'Lesson',
      duration: '6 min',
      image: '',
      isActive: false,
    },
    {
      id: 12,
      title: 'Assertive Responses Practice',
      type: 'Challenge',
      duration: '',
      image: '',
      isActive: false,
    },
  ];

  const displayedModules = activeTab === 'Intro' ? programModules : communicationModules;

  // Modal state for listing challenges
  const [showChallengesModal, setShowChallengesModal] = useState(false);

  // Sample list of all available challenges
  const allChallenges = [
    { id: 'c1', title: '30-minute Gratitude Walk' },
    { id: 'c2', title: 'One Small Habit Change' },
    { id: 'c3', title: 'Daily Journaling for 7 Days' },
    { id: 'c4', title: 'Reach Out to a Friend' },
  ];

  // Hide parent tab bar while modal is visible
  useEffect(() => {
    const parent = navigation.getParent && navigation.getParent();
    if (!parent) return;

    // Hide tab bar when modal is open
    if (showChallengesModal) {
      parent.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      parent.setOptions({ tabBarStyle: undefined });
    }

    // cleanup: restore when component unmounts
    return () => {
      parent.setOptions({ tabBarStyle: undefined });
    };
  }, [showChallengesModal, navigation]);

  const ProgramModule = ({ module, index }: any) => (
    <Animated.View
      entering={FadeInDown.delay(300 + index * 100).springify()}
      style={styles.moduleContainer}
    >
      <TouchableOpacity style={styles.moduleCard}>
        <View style={styles.moduleImageContainer}>
          <View style={[styles.moduleImage, { backgroundColor: getModuleColor(index) }]}>
            <Text style={styles.moduleImageText}>🎯</Text>
          </View>
        </View>
        <View style={styles.moduleContent}>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <View style={styles.moduleInfo}>
            <View style={styles.moduleTypeContainer}>
              <Text style={styles.moduleType}>{module.type}</Text>
            </View>
            {module.duration && (
              <View style={styles.moduleDuration}>
                <Text style={styles.moduleDurationText}>⏱ {module.duration}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const getModuleColor = (index: number) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
    return colors[index % colors.length];
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>My Programs</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Program Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              accessible
              accessibilityRole="button"
              onPress={() => setActiveTab('Intro')}
              style={[styles.tab, activeTab === 'Intro' && styles.activeTab]}
            >
              <Text style={activeTab === 'Intro' ? styles.activeTabText : styles.tabText}>Intro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessible
              accessibilityRole="button"
              onPress={() => setActiveTab('Communication skills')}
              style={[styles.tab, activeTab === 'Communication skills' && styles.activeTab]}
            >
              <Text style={activeTab === 'Communication skills' ? styles.activeTabText : styles.tabText}>Communication skills</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.activeDot]}>
              <Text style={styles.progressDotText}>1</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressDot}>
              <Text style={styles.progressDotText}>2</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressDot}>
              <Text style={styles.progressDotText}>3</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressDot}>
              <Text style={styles.progressDotText}>4</Text>
            </View>
          </View>
        </Animated.View>

        {/* Program Modules */}
        <View style={styles.modulesContainer}>
          {displayedModules.map((module, index) => (
            <ProgramModule key={module.id} module={module} index={index} />
          ))}
        </View>

        {/* Full Program Button */}
        <Animated.View
          entering={FadeInDown.delay(800).springify()}
          style={styles.fullProgramContainer}
        >
          <TouchableOpacity style={styles.fullProgramButton}>
            <Text style={styles.fullProgramText}>≡ Full program</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Challenges Section */}
        <Animated.View
          entering={FadeInDown.delay(1000).springify()}
          style={styles.challengesSection}
        >
          <View style={styles.challengesHeader}>
            <Text style={styles.challengesTitle}>Challenges</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowChallengesModal(true)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.challengesSubtitle}>
            Take a challenge to get closer{'\n'}to your better self
          </Text>
        </Animated.View>

        {/* Bottom padding for navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Challenges Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showChallengesModal}
        onRequestClose={() => setShowChallengesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Challenges</Text>
              <Pressable onPress={() => setShowChallengesModal(false)} style={styles.modalClose}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView>
              {allChallenges.map((c) => (
                <TouchableOpacity key={c.id} style={styles.challengeRow}>
                  <Text style={styles.challengeText}>{c.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    ...Typography.h2,
    fontSize: 28,
    color: '#2D3748',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
  },
  activeTabText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tabText: {
    ...Typography.button,
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: '#8B5CF6',
  },
  progressDotText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  progressLine: {
    width: 24,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  modulesContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  moduleContainer: {
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  moduleImageContainer: {
    marginRight: 16,
  },
  moduleImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleImageText: {
    fontSize: 24,
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    ...Typography.h6,
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  moduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleTypeContainer: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  moduleType: {
    ...Typography.caption,
    color: '#FF8A65',
    fontSize: 12,
    fontWeight: '600',
  },
  moduleDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleDurationText: {
    ...Typography.caption,
    color: '#718096',
    fontSize: 12,
  },
  fullProgramContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 32,
  },
  fullProgramButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullProgramText: {
    ...Typography.button,
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
  },
  challengesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  challengesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengesTitle: {
    ...Typography.h4,
    fontSize: 24,
    color: '#2D3748',
    // fontWeight: '700',
  },
  challengesSubtitle: {
    ...Typography.body2,
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: Math.round(Dimensions.get('window').height * 0.75),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    ...Typography.h4,
    fontSize: 18,
  },
  modalClose: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 18,
  },
  challengeRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  challengeText: {
    ...Typography.body2,
    color: '#1F2937',
  },
});

export default HomeScreen;
