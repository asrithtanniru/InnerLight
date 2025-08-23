import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Typography } from '../../utils/typography';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

// Color scheme from SignInScreen
const colors = {
  primary: '#8B5CF6',
  primaryLight: '#A78BFA',
  primaryDark: '#7C3AED',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
  darkGray: '#374151',
  purple: '#8B5CF6',
  background: '#F9FAFB',
};

interface ModalContentProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({ title, onClose, children }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.darkGray} />
        </TouchableOpacity>
      </View>
      <View style={styles.modalContent}>
        {children}
      </View>
    </View>
  );
};

export const ProfileScreen: React.FC = () => {
  const { signOut, state } = useAuth();
  const user = state.user;
  const [stats, setStats] = useState<any>(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const modalAnimation = useSharedValue(0);
  const overlayAnimation = useSharedValue(0);

  useEffect(() => {
    // Keep some sample stats for now (could be replaced by real API)
    setStats({ streak: 0, totalDaysCompleted: 0 });
  }, []);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
    overlayAnimation.value = withTiming(1, { duration: 200 });
    modalAnimation.value = withSpring(1, { damping: 15, stiffness: 100 });
  };

  const closeModal = () => {
    overlayAnimation.value = withTiming(0, { duration: 200 });
    modalAnimation.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setActiveModal)(null);
    });
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          }
        }
      ]
    );
  };

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: (1 - modalAnimation.value) * height },
        { scale: 0.9 + modalAnimation.value * 0.1 },
      ],
      opacity: modalAnimation.value,
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayAnimation.value,
    };
  });

  const renderAccountModal = () => (
    <ModalContent title="Account" onClose={closeModal}>
      <View style={styles.accountSection}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: user?.avatar }} style={styles.modalAvatar} />
          <View style={styles.userDetails}>
            <Text style={styles.modalUserName}>{user?.name}</Text>
            <Text style={styles.modalUserEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.accountOptions}>
          <TouchableOpacity style={styles.accountOption}>
            <Ionicons name="person-outline" size={20} color={colors.darkGray} />
            <Text style={styles.accountOptionText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.accountOption}>
            <Ionicons name="key-outline" size={20} color={colors.darkGray} />
            <Text style={styles.accountOptionText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.accountOption}>
            <Ionicons name="notifications-outline" size={20} color={colors.darkGray} />
            <Text style={styles.accountOptionText}>Notification Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </View>
    </ModalContent>
  );

  const renderChallengeLogModal = () => (
    <ModalContent title="Challenge Log" onClose={closeModal}>
      <ScrollView style={styles.challengeList}>
        {[1, 2, 3, 4, 5].map((challenge) => (
          <View key={challenge} style={styles.challengeItem}>
            <View style={styles.challengeDate}>
              <Text style={styles.challengeDateText}>Day {challenge}</Text>
              <Text style={styles.challengeStatus}>Completed</Text>
            </View>
            <Text style={styles.challengeTitle}>Morning Meditation</Text>
            <Text style={styles.challengeDescription}>
              15 minutes of mindfulness practice
            </Text>
          </View>
        ))}
      </ScrollView>
    </ModalContent>
  );

  const renderInviteFriendsModal = () => (
    <ModalContent title="Invite Friends" onClose={closeModal}>
      <View style={styles.inviteSection}>
        <Text style={styles.inviteTitle}>Share INNER LIGHT with Friends</Text>
        <Text style={styles.inviteDescription}>
          Help your friends discover their inner potential
        </Text>

        <View style={styles.shareOptions}>
          <TouchableOpacity style={styles.shareOption}>
            <Ionicons name="share-social" size={24} color={colors.primary} />
            <Text style={styles.shareOptionText}>Share Link</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareOption}>
            <Ionicons name="mail" size={24} color={colors.primary} />
            <Text style={styles.shareOptionText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareOption}>
            <Ionicons name="logo-whatsapp" size={24} color={colors.primary} />
            <Text style={styles.shareOptionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalContent>
  );

  const renderShareFeedbackModal = () => (
    <ModalContent title="Share Feedback" onClose={closeModal}>
      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackTitle}>Would like to see other features?</Text>
        <Text style={styles.feedbackDescription}>
          Tell us. We read every suggestion.
        </Text>

        <View style={styles.feedbackOptions}>
          <TouchableOpacity style={styles.feedbackOption}>
            <Ionicons name="star" size={24} color={colors.primary} />
            <Text style={styles.feedbackOptionText}>Rate the App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.feedbackOption}>
            <Ionicons name="chatbubble" size={24} color={colors.primary} />
            <Text style={styles.feedbackOptionText}>Send Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.feedbackOption}>
            <Ionicons name="bug" size={24} color={colors.primary} />
            <Text style={styles.feedbackOptionText}>Report a Bug</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalContent>
  );

  if (!user || !stats) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My profile</Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => openModal('account')}
          >
            <Text style={styles.optionText}>Account</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => openModal('challenge')}
          >
            <Text style={styles.optionText}>Challenge log</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => openModal('invite')}
          >
            <Text style={styles.optionText}>Invite friends to INNER LIGHT</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.feedbackOption}
            onPress={() => openModal('feedback')}
          >
            <View style={styles.feedbackContent}>
              <Text style={styles.feedbackTitle}>Share feedback</Text>
              <Text style={styles.feedbackSubtitle}>
                Would like to see other features?
              </Text>
              <Text style={styles.feedbackDescription}>
                Tell us. We read every suggestion.
              </Text>
            </View>
            <View style={styles.feedbackArrow}>
              <Ionicons name="chevron-forward" size={20} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Start Free Trial Button */}
        <View style={styles.trialButtonContainer}>
          <TouchableOpacity style={styles.trialButton}>
            <Text style={styles.trialButtonText}>Start Free trial</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal */}
      {activeModal && (
        <Modal
          visible={activeModal !== null}
          transparent
          animationType="none"
          statusBarTranslucent
        >
          <Animated.View style={[styles.modalOverlay, overlayAnimatedStyle]}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={closeModal}
              activeOpacity={1}
            />
            <Animated.View style={[styles.modalWrapper, modalAnimatedStyle]}>
              {activeModal === 'account' && renderAccountModal()}
              {activeModal === 'challenge' && renderChallengeLogModal()}
              {activeModal === 'invite' && renderInviteFriendsModal()}
              {activeModal === 'feedback' && renderShareFeedbackModal()}
            </Animated.View>
          </Animated.View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.body1,
    color: colors.darkGray,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerTitle: {
    ...Typography.h4,
    fontSize: 26,
    color: colors.darkGray,
  },
  optionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    ...Typography.body1,
    fontSize: 18,
    color: colors.darkGray,
    fontWeight: '500',
  },
  feedbackOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackTitle: {
    ...Typography.body1,
    fontSize: 18,
    color: colors.darkGray,
    fontWeight: '600',
    marginBottom: 4,
  },
  feedbackSubtitle: {
    ...Typography.body2,
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  feedbackDescription: {
    ...Typography.caption,
    fontSize: 12,
    color: colors.gray,
  },
  feedbackArrow: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trialButtonContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  trialButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  trialButtonText: {
    ...Typography.button,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  signOutContainer: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  signOutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signOutText: {
    ...Typography.button,
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    ...Typography.h3,
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  accountSection: {
    flex: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  modalUserName: {
    ...Typography.body1,
    fontSize: 18,
    color: colors.darkGray,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalUserEmail: {
    ...Typography.body2,
    fontSize: 14,
    color: colors.gray,
  },
  accountOptions: {
    flex: 1,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  accountOptionText: {
    ...Typography.body1,
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 12,
    flex: 1,
  },
  challengeList: {
    flex: 1,
  },
  challengeItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  challengeDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeDateText: {
    ...Typography.caption,
    fontSize: 12,
    color: colors.gray,
    fontWeight: '600',
  },
  challengeStatus: {
    ...Typography.caption,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  challengeTitle: {
    ...Typography.body1,
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: '600',
    marginBottom: 4,
  },
  challengeDescription: {
    ...Typography.body2,
    fontSize: 14,
    color: colors.gray,
  },
  inviteSection: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  inviteTitle: {
    ...Typography.h3,
    fontSize: 24,
    color: colors.darkGray,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  inviteDescription: {
    ...Typography.body2,
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 40,
  },
  shareOptions: {
    width: '100%',
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  shareOptionText: {
    ...Typography.body1,
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 16,
    fontWeight: '500',
  },
  feedbackSection: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  feedbackOptions: {
    width: '100%',
  },
  feedbackOptionText: {
    ...Typography.body1,
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 16,
    fontWeight: '500',
  },
});
