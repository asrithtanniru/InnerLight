import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { colors } from '../../utils/colors';
import { useAuth } from '../../contexts/AuthContext';
import { dummyPrograms } from '../../services/dummyData';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { state } = useAuth();
  const user = state.user;
  const program = dummyPrograms[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <LinearGradient
      colors={colors.gradients.primary as [string, string, ...string[]]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
            <TouchableOpacity style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Streak Card */}
        <Animated.View
          entering={FadeInRight.delay(400).springify()}
          style={styles.section}
        >
          <Card style={styles.streakCard}>
            <View style={styles.streakContent}>
              <View style={styles.streakInfo}>
                <Text style={styles.streakNumber}>{user?.streak || 0}</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
              </View>
              <View style={styles.streakDivider} />
              <View style={styles.streakInfo}>
                <Text style={styles.streakNumber}>{user?.totalDaysCompleted || 0}</Text>
                <Text style={styles.streakLabel}>Total Days</Text>
              </View>
            </View>
            <Text style={styles.streakMessage}>
              🔥 Keep it up! You're building a great habit.
            </Text>
          </Card>
        </Animated.View>

        {/* Current Program */}
        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Continue Your Journey</Text>
          <Card style={styles.programCard}>
            <View style={styles.programHeader}>
              <View style={styles.programInfo}>
                <Text style={styles.programTitle}>{program.title}</Text>
                <Text style={styles.programSubtitle}>
                  Day {('currentDay' in program ? (program as any).currentDay : 1)} of {('duration' in program ? (program as any).duration : 1)}
                </Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${('progress' in program ? (program as any).progress : 0) * 100}%` }
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(('progress' in program ? (program as any).progress : 0) * 100)}%
                </Text>
              </View>
            </View>
            <Button
              title="Continue Program"
              onPress={() => navigation.navigate('ProgramOverview')}
              style={styles.continueButton}
            />
          </Card>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInDown.delay(800).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickActionCard
              icon="💬"
              title="Chat with AI"
              subtitle="Get instant support"
              onPress={() => navigation.navigate('Chat')}
            />
            <QuickActionCard
              icon="🧘"
              title="Breathing Exercise"
              subtitle="3 min relaxation"
              onPress={() => navigation.navigate('Explore')}
            />
          </View>
        </Animated.View>

        {/* Today's Inspiration */}
        <Animated.View
          entering={FadeInDown.delay(1000).springify()}
          style={[styles.section, { paddingBottom: 100 }]}
        >
          <Card style={styles.inspirationCard}>
            <Text style={styles.inspirationTitle}>💡 Today's Inspiration</Text>
            <Text style={styles.inspirationText}>
              "The journey of a thousand miles begins with one step. Every small action
              you take today brings you closer to the confident, peaceful person you're becoming."
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const QuickActionCard = ({ icon, title, subtitle, onPress }: {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
    <Text style={styles.quickActionIcon}>{icon}</Text>
    <Text style={styles.quickActionTitle}>{title}</Text>
    <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  streakCard: {
    padding: 20,
  },
  streakContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakInfo: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
  },
  streakLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  streakDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.primary.background,
  },
  streakMessage: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 22,
  },
  programCard: {
    padding: 20,
  },
  programHeader: {
    marginBottom: 20,
  },
  programInfo: {
    marginBottom: 12,
  },
  programTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  programSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.primary.background,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.text.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.secondary,
  },
  continueButton: {
    // Additional styling if needed
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.primary.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  inspirationCard: {
    padding: 20,
  },
  inspirationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  inspirationText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
