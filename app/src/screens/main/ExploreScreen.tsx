// src/screens/main/ExploreScreen.tsx
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../utils/colors'
import { Typography } from '../../utils/typography'
import { AnimatedView } from '../../components/common/AnimatedView'
import { ExerciseModal, Exercise } from '../../components/common/ExerciseModal'
import { images } from '../../../src/utils/assets'
import { useNavigation } from '@react-navigation/native'
import { programService } from '../../services/programService'
import { progressService } from '../../services/progressService'
import { Program, Challenge, ProgramProgress } from '../../types/program-types'
import { ProgramCard } from '../../components/program/ProgramCard'

export const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<any>()
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [programs, setPrograms] = useState<Program[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [programProgresses, setProgramProgresses] = useState<{ [key: string]: ProgramProgress }>({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    // Load programs and challenges
    const allPrograms = programService.getAllPrograms()
    const allChallenges = programService.getAllChallenges()

    setPrograms(allPrograms)
    setChallenges(allChallenges)

    // Load program progresses
    const enrolledPrograms = await progressService.getEnrolledPrograms()
    const progressMap: { [key: string]: ProgramProgress } = {}
    enrolledPrograms.forEach((progress) => {
      progressMap[progress.programId] = progress
    })
    setProgramProgresses(progressMap)
  }

  useEffect(() => {
    const parent = navigation.getParent()
    if (!parent) return

    if (isModalVisible) {
      parent.setOptions({ tabBarStyle: { display: 'none' } })
    } else {
      parent.setOptions({ tabBarStyle: undefined })
    }
  }, [isModalVisible, navigation])

  // Mock data with web images
  const exercises: Exercise[] = [
    {
      id: '1',
      title: 'Meditation',
      image: images.meditation,
      duration: 60,
    },
    {
      id: '2',
      title: 'Stress Relief',
      image: images.stressRelief,
      duration: 60,
    },
    {
      id: '3',
      title: 'Breathing Exercise',
      image: images.breathingExercise,
      duration: 60,
    },
    {
      id: '4',
      title: 'Mindfulness',
      image: images.mindfulness,
      duration: 60,
    },
    {
      id: '5',
      title: 'Relaxation',
      image: images.relaxation,
      duration: 60,
    },
  ]

  const handleExercisePress = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setModalVisible(true)
  }

  const handleProgramPress = (program: Program) => {
    navigation.navigate('ProgramDetail', {
      programId: program.id,
      source: 'explore',
    })
  }

  const renderProgramCard = ({ item }: { item: Program }) => (
    <ProgramCard
      program={item}
      onPress={() => handleProgramPress(item)}
      showProgress={!!programProgresses[item.id]}
      progressPercentage={programProgresses[item.id]?.progressPercentage || 0}
      isEnrolled={!!programProgresses[item.id]}
    />
  )

  const renderCard = ({ item, onPress }: { item: any; onPress?: () => void }) => {
    const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.card} onPress={onPress}>
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.cardImage} />
          </View>
        </TouchableOpacity>

        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>

          {item.duration && typeof item.duration === 'string' && (
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.cardDuration}>{item.duration}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AnimatedView animation="fadeIn" style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover content to support your wellness journey</Text>
        </AnimatedView>

        <AnimatedView animation="slideUp" delay={200} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Challenges</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all ›</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={challenges}
            renderItem={({ item }) => renderCard({ item })}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </AnimatedView>

        {/* Programs Section */}
        <AnimatedView animation="slideUp" delay={400} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Programs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all ›</Text>
            </TouchableOpacity>
          </View>

          <FlatList data={programs} renderItem={renderProgramCard} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList} />
        </AnimatedView>

        {/* Exercises Section */}
        <AnimatedView animation="slideUp" delay={600} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all ›</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={exercises}
            renderItem={({ item }) => renderCard({ item, onPress: () => handleExercisePress(item) })}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </AnimatedView>
      </ScrollView>
      <ExerciseModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} exercise={selectedExercise} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    ...Typography.h2,
    color: colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...Typography.body1,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    ...Typography.h3,
    color: colors.text.primary,
  },
  seeAllText: {
    ...Typography.body2,
    color: colors.text.primary,
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  cardWrapper: {
    width: 180,
    marginRight: 16,
  },
  card: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardInfo: {
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  cardTitle: {
    ...Typography.h6,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: 6,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  cardDuration: {
    ...Typography.body2,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 2,
  },
})
