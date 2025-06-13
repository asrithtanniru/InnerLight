// src/screens/main/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { AnimatedView } from '../../components/common/AnimatedView';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { ProgressBar } from '../../components/program/ProgressBar';
import { dummyData } from '../../services/dummyData';

export const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setUser(dummyData.currentUser);
    setStats(dummyData.userStats);
  }, []);

  const handleEditProfile = () => {
    // Navigate to edit profile screen
  };

  const handleSignOut = () => {
    // Handle sign out
  };

  if (!user || !stats) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <AnimatedView animation="fadeIn" style={styles.profileHeader}>
          <LinearGradient
            colors={[colors.primary.light, colors.primary.main]}
            style={styles.headerGradient}
          >
            <View style={styles.profileInfo}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <View style={styles.streakContainer}>
                  <Ionicons name="flame" size={16} color={colors.accent.main} />
                  <Text style={styles.streakText}>{user.streak} day streak</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Ionicons name="pencil" size={20} color={colors.text.inverse} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </AnimatedView>

        {/* Stats Overview */}
        <AnimatedView animation="slideUp" delay={200} style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Ionicons name="calendar" size={24} color={colors.primary.main} />
              <Text style={styles.statNumber}>{stats.totalDays}</Text>
              <Text style={styles.statLabel}>Days Completed</Text>
            </Card>
            <Card style={styles.statCard}>
              <Ionicons name="trophy" size={24} color={colors.accent.main} />
              <Text style={styles.statNumber}>{stats.achievements}</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </Card>
            <Card style={styles.statCard}>
              <Ionicons name="time" size={24} color={colors.secondary.main} />
              <Text style={styles.statNumber}>{stats.totalMinutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </Card>
            <Card style={styles.statCard}>
              <Ionicons name="trending-up" size={24} color={colors.success.main} />
              <Text style={styles.statNumber}>{stats.longestStreak}</Text>
              <Text style={styles.statLabel}>Best Streak</Text>
            </Card>
          </View>
        </AnimatedView>

        {/* Current Program */}
        {user.currentProgram && (
          <AnimatedView animation="slideUp" delay={400} style={styles.currentProgramSection}>
            <Text style={styles.sectionTitle}>Current Program</Text>
            <Card style={styles.programCard}>
              <View style={styles.programHeader}>
                <View style={styles.programInfo}>
                  <Text style={styles.programTitle}>{user.currentProgram.name}</Text>
                  <Text style={styles.programProgress}>
                    Day {user.currentProgram.currentDay} of {user.currentProgram.totalDays}
                  </Text>
                </View>
                <TouchableOpacity style={styles.continueButton}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.primary.main} />
                </TouchableOpacity>
              </View>
              <ProgressBar
                progress={user.currentProgram.progress}
                showPercentage={true}
                animated={true}
                delay={600}
              />
            </Card>
          </AnimatedView>
        )}

        {/* Achievements */}
        <AnimatedView animation="slideUp" delay={600} style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {user.achievements.slice(0, 5).map((achievement: any, index: number) => (
              <AnimatedView key={achievement.id} animation="slideUp" delay={700 + index * 100}>
                <Card style={styles.achievementCard}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDate}>
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </Text>
                </Card>
              </AnimatedView>
            ))}
          </ScrollView>
        </AnimatedView>

        {/* Settings */}
        <AnimatedView animation="slideUp" delay={800} style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <Card style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications" size={20} color={colors.text.primary} />
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border.light, true: colors.primary.light }}
                thumbColor={notifications ? colors.primary.main : colors.text.secondary}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="moon" size={20} color={colors.text.primary} />
                <Text style={styles.settingLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.border.light, true: colors.primary.light }}
                thumbColor={darkMode ? colors.primary.main : colors.text.secondary}
              />
            </View>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="time" size={20} color={colors.text.primary} />
                <Text style={styles.settingLabel}>Reminder Time</Text>
              </View>
              <View style={styles.settingValue}>
                <Text style={styles.settingValueText}>9:00 AM</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.text.secondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="language" size={20} color={colors.text.primary} />
                <Text style={styles.settingLabel}>Language</Text>
              </View>
              <View style={styles.settingValue}>
                <Text style={styles.settingValueText}>English</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.text.secondary} />
              </View>
            </TouchableOpacity>
          </Card>
        </AnimatedView>

        {/* Support */}
        <AnimatedView animation="slideUp" delay={1000} style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Support</Text>

          <Card style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="help-circle" size={20} color={colors.text.primary} />
                <Text style={styles.settingLabel}>Help & FAQ</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.text.secondary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="mail" size={20} color={colors.text.primary} />
                <Text style={styles.settingLabel}>Contact Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.text.secondary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="document-text" size={20} color={colors.text.primary} />
                <Text style={styles.settingLabel}>Privacy Policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.text.secondary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="shield-checkmark" size={20} color={colors.text.primary} />
                <Text style={styles.settingLabel}>Terms of Service</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.text.secondary} />
            </TouchableOpacity>
          </Card>
        </AnimatedView>

        {/* Sign Out */}
        <AnimatedView animation="slideUp" delay={1200} style={styles.signOutSection}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            style={styles.signOutButton}
            textStyle={styles.signOutButtonText}
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
  profileHeader: {
    marginBottom: 24,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.inverse,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.text.inverse,
    opacity: 0.8,
    marginBottom: 8,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 14,
    color: colors.accent.main,
    marginLeft: 4,
    fontWeight: '600',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  currentProgramSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  programCard: {
    padding: 20,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  programInfo: {
    flex: 1,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  programProgress: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  continueButtonText: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
    marginRight: 4,
  },
  achievementsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
  },
  achievementCard: {
    width: 120,
    padding: 16,
    alignItems: 'center',
    marginLeft: 20,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 12,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 8,
  },
  supportSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  signOutSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  signOutButton: {
    borderColor: colors.error.main,
  },
  signOutButtonText: {
    color: colors.error.main,
  },
});
