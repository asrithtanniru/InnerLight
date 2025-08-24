import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
  useAnimatedProps,
  withSpring,
  withRepeat,
  withSequence
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../utils/colors';
import { Typography } from '../../utils/typography';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface Exercise {
  id: string;
  title: string;
  image: string;
  duration?: number; // in seconds
}

interface ExerciseModalProps {
  isVisible: boolean;
  onClose: () => void;
  exercise: Exercise | null;
}

const EXERCISE_DURATION = 120;

// Party confetti component
const PartyConfetti = ({ show }: { show: boolean }) => {
  const confettiPieces = Array.from({ length: 20 }, (_, i) => i);
  return (
    <View style={styles.confettiContainer} pointerEvents="none">
      {show && confettiPieces.map((_, index) => (
        <ConfettiPiece key={index} delay={index * 50} />
      ))}
    </View>
  );
};

const ConfettiPiece = ({ delay }: { delay: number }) => {
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(Math.random() * 300 - 150);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    const startAnimation = () => {
      translateY.value = withTiming(600, { duration: 3000 });
      rotation.value = withRepeat(withTiming(360, { duration: 1000 }), 3);
      opacity.value = withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 2500 })
      );
      scale.value = withSequence(
        withSpring(1.2),
        withTiming(0.8, { duration: 2500 })
      );
    };

    const timer = setTimeout(startAnimation, delay);
    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Animated.View style={[styles.confettiPiece, { backgroundColor: color }, animatedStyle]} />
  );
};

export const ExerciseModal: React.FC<ExerciseModalProps> = ({ isVisible, onClose, exercise }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXERCISE_DURATION);
  const [selectedDuration, setSelectedDuration] = useState(EXERCISE_DURATION);
  const [instruction, setInstruction] = useState('');
  const [showParty, setShowParty] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Animated values
  const progress = useSharedValue(1); // Start at 1 (full circle)
  const celebrationScale = useSharedValue(1);

  const totalDuration = selectedDuration;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isVisible && exercise) {
      const defaultDuration = exercise.duration || EXERCISE_DURATION;
      setSelectedDuration(defaultDuration);
      setTimeLeft(defaultDuration);
      progress.value = 1;
      setShowParty(false);
      celebrationScale.value = 1;
    } else {
      // Reset state when modal is closed
      setIsStarted(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      progress.value = 1;
      setShowParty(false);
    }
  }, [isVisible, exercise]);

  useEffect(() => {
    if (isStarted) {
      const duration = selectedDuration;
      setTimeLeft(duration);

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsStarted(false);

            // Trigger celebration animation
            runOnJS(setShowParty)(true);
            celebrationScale.value = withSequence(
              withSpring(1.2, { duration: 300 }),
              withSpring(1, { duration: 300 })
            );

            // Close modal after celebration
            setTimeout(() => {
              runOnJS(onClose)();
            }, 3000);

            return 0;
          }
          const newTime = prev - 1;
          const newProgress = newTime / duration;
          progress.value = withTiming(newProgress, { duration: 1000 });
          return newTime;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, selectedDuration, onClose]);

  // Add this to your useEffect for breathing instructions
  useEffect(() => {
    if (isStarted && exercise?.title === 'Breathing Exercise') {
      const cycleTime = 10;
      const interval = setInterval(() => {
        setInstruction('Inhale...');
        setTimeout(() => {
          setInstruction('Exhale...');
        }, 4000);
      }, cycleTime * 1000);
      setInstruction('Inhale...');
      setTimeout(() => {
        setInstruction('Exhale...');
      }, 4000);
      return () => clearInterval(interval);
    } else if (isStarted) {
      setInstruction("Focus on the present moment.");
    }
  }, [isStarted, exercise]);

  // Animated styles
  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  const celebrationStyle = useAnimatedStyle(() => ({
    transform: [{ scale: celebrationScale.value }],
  }));

  if (!exercise) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={30} color={colors.text.secondary} />
          </TouchableOpacity>

          {!isStarted ? (
            <Animated.View style={celebrationStyle}>
              <Text style={styles.title}>{exercise.title}</Text>

              <TouchableOpacity
                style={styles.startButton}
                onPress={() => setIsStarted(true)}
              >
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={[styles.exerciseContainer, celebrationStyle]}>
              <Text style={styles.title}>{exercise.title}</Text>

              <View style={styles.progressWrapper}>
                <Svg width={200} height={200} style={styles.svg}>
                  <Circle
                    cx={100}
                    cy={100}
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth={10}
                    fill="transparent"
                  />
                  <AnimatedCircle
                    cx={100}
                    cy={100}
                    r={radius}
                    stroke={colors.primary.main}
                    strokeWidth={10}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                    animatedProps={animatedCircleProps}
                    transform={`rotate(-90 100 100)`}
                  />
                </Svg>

                <View style={styles.progressCenter}>
                  <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                </View>
              </View>

              <Text style={styles.instructionText}>{instruction}</Text>
              {showParty && <Text style={styles.completedText}>✨ Well Done! ✨</Text>}
            </Animated.View>
          )}

          <PartyConfetti show={showParty} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 40, // Added for safe area
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '80%', // Increased height
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  title: {
    ...Typography.h3,
    marginBottom: 15,
    textAlign: 'center',
    color: colors.text.primary,
  },
  duration: {
    ...Typography.body1,
    color: colors.text.secondary,
    marginBottom: 25,
  },
  startButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    elevation: 2,
    alignSelf: 'center',
    minWidth: 120,
  },
  startButtonText: {
    ...Typography.button,
    color: 'white',
    fontSize: 18,
  },
  exerciseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  progressWrapper: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  progressCenter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  timerText: {
    ...Typography.h1,
    fontSize: 36,
    color: colors.text.primary,
    fontWeight: '300',
    fontFamily: 'Courier',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  instructionText: {
    ...Typography.h4,
    color: colors.primary.main,
    marginTop: 20,
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  completedText: {
    ...Typography.h4,
    color: colors.primary.main,
    marginTop: 15,
    fontWeight: 'bold',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  confettiPiece: {
    position: 'absolute',
    width: 8,
    height: 8,
    top: 100,
    left: '50%',
  },

});
