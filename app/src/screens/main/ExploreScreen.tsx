// src/screens/main/ExploreScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { Typography } from '../../utils/typography';
import { AnimatedView } from '../../components/common/AnimatedView';

export const ExploreScreen: React.FC = () => {
  // Mock data with web images
  const challenges = [
    {
      id: '1',
      title: 'Talk to Someone New Every Day',
      duration: '7 days',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Speak with Confidence',
      duration: '17 days',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Make New Friends',
      duration: '14 days',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'Public Speaking',
      duration: '21 days',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop'
    },
    {
      id: '5',
      title: 'Social Anxiety',
      duration: '30 days',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=400&fit=crop'
    }
  ];

  const programs = [
    {
      id: '1',
      title: 'Intro',
      progress: 0.7,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Relationships with Colleagues',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Communication Skills',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'Leadership Development',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop'
    },
    {
      id: '5',
      title: 'Team Building',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=400&fit=crop'
    }
  ];

  const exercises = [
    {
      id: '1',
      title: 'Breathing Exercise',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Meditation',
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Mindfulness',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'Relaxation',
      image: 'https://images.unsplash.com/photo-1506629905880-b2ce6d4d9dde?w=400&h=400&fit=crop'
    },
    {
      id: '5',
      title: 'Stress Relief',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
    }
  ];

  const renderCard = ({ item, showProgress = false }: { item: any; showProgress?: boolean }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
        </View>
      </TouchableOpacity>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>

        {item.duration && (
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={14} color={colors.text.secondary} />
            <Text style={styles.cardDuration}>{item.duration}</Text>
          </View>
        )}

        {showProgress && item.progress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <AnimatedView animation="fadeIn" style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover content to support your wellness journey</Text>
        </AnimatedView>

        {/* Challenges Section */}
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

          <FlatList
            data={programs}
            renderItem={({ item }) => renderCard({ item, showProgress: true })}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
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
            renderItem={({ item }) => renderCard({ item })}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
};

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
});
