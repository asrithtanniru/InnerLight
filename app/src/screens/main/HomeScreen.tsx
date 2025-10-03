import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, Pressable, Image } from 'react-native'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { Typography } from '../../utils/typography'
import { useAuth } from '../../contexts/AuthContext'
import { useProgramContext } from '../../contexts/ProgramContext'
import { ProgramProgress, Program, Challenge } from '../../types/program-types'
import { ProgramCard } from '../../components/program/ProgramCard'

const { width } = Dimensions.get('window')

const HomeScreen = ({ navigation }: any) => {
  const { state } = useAuth()
  const user = state.user
  const { enrolledPrograms, programsMap, challenges, isLoading, refreshPrograms } = useProgramContext()

  // UI state for tabs
  const [activeTab, setActiveTab] = useState<string>('')

  // Set initial active tab when enrolled programs load
  useEffect(() => {
    if (enrolledPrograms.length > 0 && !activeTab) {
      setActiveTab(enrolledPrograms[0].programId)
    }
  }, [enrolledPrograms, activeTab])
  const [showChallengesModal, setShowChallengesModal] = useState(false)

  // Refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refreshPrograms()
    }, [])
  )

  const handleProgramPress = (programId: string) => {
    navigation.navigate('ProgramDetail', {
      programId,
      source: 'home',
    })
  }

  // Hide parent tab bar while modal is visible
  useEffect(() => {
    const parent = navigation.getParent && navigation.getParent()
    if (!parent) return

    // Hide tab bar when modal is open
    if (showChallengesModal) {
      parent.setOptions({ tabBarStyle: { display: 'none' } })
    } else {
      parent.setOptions({ tabBarStyle: undefined })
    }

    // cleanup: restore when component unmounts
    return () => {
      parent.setOptions({ tabBarStyle: undefined })
    }
  }, [showChallengesModal, navigation])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>My Programs</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Program Tabs - Show enrolled programs */}
          {enrolledPrograms.length > 0 && (
            <View style={styles.tabsContainer}>
              {enrolledPrograms.map((progress, index) => {
                const program = programsMap[progress.programId]
                if (!program) return null

                const isActive = activeTab === program.id
                return (
                  <TouchableOpacity key={program.id} accessible accessibilityRole="button" onPress={() => setActiveTab(program.id)} style={[styles.tab, isActive && styles.activeTab]}>
                    <Text style={isActive ? styles.activeTabText : styles.tabText}>{program.title}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          )}

          {/* Progress Indicators - Show progress for active program */}
          {(() => {
            const activeProgram = enrolledPrograms.find((p) => p.programId === activeTab)
            const currentProgram = activeProgram ? programsMap[activeProgram.programId] : null

            if (!currentProgram || !activeProgram) return null

            const totalModules = currentProgram.modules.length
            const completedModules = Math.floor((activeProgram.progressPercentage / 100) * totalModules)

            return (
              <View style={styles.progressContainer}>
                {Array.from({ length: Math.min(totalModules, 5) }, (_, index) => (
                  <React.Fragment key={index}>
                    <View style={[styles.progressDot, index < completedModules && styles.activeDot]}>
                      <Text style={[styles.progressDotText, index < completedModules && styles.activeDotText]}>{index + 1}</Text>
                    </View>
                    {index < Math.min(totalModules, 5) - 1 && <View style={styles.progressLine} />}
                  </React.Fragment>
                ))}
              </View>
            )
          })()}
        </Animated.View>

        {/* Program Content */}
        {enrolledPrograms.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No enrolled programs yet</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.exploreButtonText}>Explore Programs</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.programContentContainer}>
            {(() => {
              const activeProgram = enrolledPrograms.find((p) => p.programId === activeTab)
              const currentProgram = activeProgram ? programsMap[activeProgram.programId] : null

              if (!currentProgram) return null

              return (
                <View style={styles.lessonsContainer}>
                  {currentProgram.modules.slice(0, 2).map((module, moduleIndex) =>
                    module.lessons.slice(0, 2).map((lesson, lessonIndex) => (
                      <TouchableOpacity
                        key={`${module.id}-${lesson.id}`}
                        style={styles.lessonCard}
                        onPress={() => {
                          navigation.navigate('LessonSlide', {
                            programId: currentProgram.id,
                            moduleId: module.id,
                            lessonId: lesson.id,
                            slideIndex: 0,
                          })
                        }}
                      >
                        <View style={styles.lessonImageContainer}>
                          <Image source={{ uri: lesson.image || currentProgram.image }} style={styles.lessonImage} />
                        </View>
                        <View style={styles.lessonContent}>
                          <Text style={styles.lessonTitle}>{lesson.title}</Text>
                          <View style={styles.lessonTypeContainer}>
                            <Text style={styles.lessonType}>📖 Lesson</Text>
                          </View>
                        </View>
                        <View style={styles.lessonStatus}>
                          <View style={styles.checkCircle}>
                            <Text style={styles.checkMark}>✓</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              )
            })()}
          </View>
        )}

        {/* Full Program Button */}
        <Animated.View entering={FadeInDown.delay(800).springify()} style={styles.fullProgramContainer}>
          <TouchableOpacity
            style={styles.fullProgramButton}
            onPress={() => {
              const activeProgram = enrolledPrograms.find((p) => p.programId === activeTab)
              if (activeProgram) {
                navigation.navigate('ProgramDetail', {
                  programId: activeProgram.programId,
                  source: 'home',
                })
              }
            }}
          >
            <Text style={styles.fullProgramText}>≡ Full program</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Challenges Section */}
        <Animated.View entering={FadeInDown.delay(1000).springify()} style={styles.challengesSection}>
          <View style={styles.challengesHeader}>
            <Text style={styles.challengesTitle}>Challenges</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowChallengesModal(true)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.challengesSubtitle}>Take a challenge to get closer{'\n'}to your better self</Text>
        </Animated.View>

        {/* Bottom padding for navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Challenges Modal */}
      <Modal animationType="slide" transparent={true} visible={showChallengesModal} onRequestClose={() => setShowChallengesModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Challenges</Text>
              <Pressable onPress={() => setShowChallengesModal(false)} style={styles.modalClose}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView>
              {challenges.map((c) => (
                <TouchableOpacity key={c.id} style={styles.challengeRow}>
                  <Text style={styles.challengeText}>{c.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

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
    color: '#A0AEC0',
    fontSize: 14,
    fontWeight: '600',
  },
  activeDotText: {
    color: '#FFFFFF',
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    ...Typography.body1,
    color: '#718096',
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  programCardContainer: {
    marginRight: 16,
  },
  programContentContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  lessonsContainer: {
    gap: 16,
  },
  lessonCard: {
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
  lessonImageContainer: {
    marginRight: 16,
  },
  lessonImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    ...Typography.h6,
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '600',
    marginBottom: 6,
  },
  lessonTypeContainer: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  lessonType: {
    ...Typography.caption,
    color: '#FF8A65',
    fontSize: 12,
    fontWeight: '600',
  },
  lessonStatus: {
    marginLeft: 16,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  enrolledProgramsContainer: {
    marginBottom: 20,
  },
  enrolledProgramsTitle: {
    ...Typography.h5,
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 12,
  },
  enrolledProgramsScrollContainer: {
    paddingRight: 24,
  },
  enrolledProgramCard: {
    marginRight: 16,
    width: 280,
  },
})

export default HomeScreen
