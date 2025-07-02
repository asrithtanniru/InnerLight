// src/services/dummyData.ts

// Users
export const dummyUsers = [
  {
    id: '1',
    email: 'demo@innerlight.com',
    name: 'Demo User',
    avatar: 'https://via.placeholder.com/100x100/6B9EF5/FFFFFF?text=DU',
    createdAt: '2024-01-15T08:00:00.000Z',
    lastLoginAt: '2025-06-11T04:00:00.000Z',
    streak: 7,
    totalDaysCompleted: 15,
    currentProgram: {
      id: '1',
      name: 'Social Confidence Builder',
      currentDay: 3,
      totalDays: 30,
      progress: 0.1,
    },
    achievements: [
      {
        id: '1',
        name: 'First Step',
        description: 'Completed your first lesson',
        icon: '🎯',
        unlockedAt: '2025-06-05T10:00:00.000Z',
      },
      {
        id: '2',
        name: 'Week Warrior',
        description: 'Maintained a 7-day streak',
        icon: '🔥',
        unlockedAt: '2025-06-11T09:00:00.000Z',
      },
      {
        id: '3',
        name: 'Mindful Master',
        description: 'Completed 5 mindfulness exercises',
        icon: '🧘',
        unlockedAt: '2025-06-08T14:30:00.000Z',
      },
    ],
  },
];

export const currentUser = dummyUsers[0];

// User Statistics
export const userStats = {
  totalDays: 15,
  achievements: 3,
  totalMinutes: 180,
  longestStreak: 12,
  weeklyProgress: [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: true },
  ],
  monthlyStats: {
    lessonsCompleted: 8,
    challengesCompleted: 6,
    exercisesCompleted: 12,
    totalMinutes: 180,
  },
};

// Programs
export const dummyPrograms = [
  {
    id: '1',
    title: 'Social Confidence Builder',
    description: 'Build lasting confidence in social situations through daily lessons and challenges.',
    duration: '30 days',
    difficulty: 'Beginner' as const,
    totalLessons: 30,
    totalChallenges: 30,
    totalExercises: 15,
    thumbnail: 'https://via.placeholder.com/300x200/6B9EF5/FFFFFF?text=Program',
    isEnrolled: true,
  },
  {
    id: '2',
    title: 'Mindfulness Mastery',
    description: 'Develop a consistent mindfulness practice for inner peace.',
    duration: '21 days',
    difficulty: 'Intermediate' as const,
    totalLessons: 21,
    totalChallenges: 21,
    totalExercises: 21,
    thumbnail: 'https://via.placeholder.com/300x200/9B7EF5/FFFFFF?text=Mindfulness',
    isEnrolled: false,
  },
];

// Program Days
export const programDays = [
  {
    programId: '1',
    dayNumber: 1,
    title: 'Understanding Social Anxiety',
    isCompleted: true,
    isUnlocked: true,
    isCurrent: false,
    lesson: {
      id: '1',
      title: 'What is Social Anxiety?',
      duration: '5 min',
      type: 'lesson' as const,
      isCompleted: true,
    },
    challenge: {
      id: '2',
      title: 'Identify Your Triggers',
      duration: '10 min',
      type: 'challenge' as const,
      isCompleted: true,
    },
    exercise: {
      id: '3',
      title: 'Breathing Exercise',
      duration: '3 min',
      type: 'exercise' as const,
      isCompleted: true,
    },
  },
  {
    programId: '1',
    dayNumber: 2,
    title: 'Mindful Awareness',
    isCompleted: true,
    isUnlocked: true,
    isCurrent: false,
    lesson: {
      id: '4',
      title: 'The Power of Mindfulness',
      duration: '6 min',
      type: 'lesson' as const,
      isCompleted: true,
    },
    challenge: {
      id: '5',
      title: 'Mindful Observation',
      duration: '8 min',
      type: 'challenge' as const,
      isCompleted: true,
    },
    exercise: {
      id: '6',
      title: 'Body Scan Meditation',
      duration: '5 min',
      type: 'exercise' as const,
      isCompleted: true,
    },
  },
  {
    programId: '1',
    dayNumber: 3,
    title: 'Positive Self-Talk',
    isCompleted: false,
    isUnlocked: true,
    isCurrent: true,
    lesson: {
      id: '7',
      title: 'Reframing Negative Thoughts',
      duration: '7 min',
      type: 'lesson' as const,
      isCompleted: false,
    },
    challenge: {
      id: '8',
      title: 'Challenge Your Inner Critic',
      duration: '12 min',
      type: 'challenge' as const,
      isCompleted: false,
    },
    exercise: {
      id: '9',
      title: 'Affirmation Practice',
      duration: '4 min',
      type: 'exercise' as const,
      isCompleted: false,
    },
  },
  {
    programId: '1',
    dayNumber: 4,
    title: 'Building Confidence',
    isCompleted: false,
    isUnlocked: false,
    isCurrent: false,
    lesson: {
      id: '10',
      title: 'Confidence From Within',
      duration: '8 min',
      type: 'lesson' as const,
      isCompleted: false,
    },
    challenge: {
      id: '11',
      title: 'Small Wins Challenge',
      duration: '15 min',
      type: 'challenge' as const,
      isCompleted: false,
    },
    exercise: {
      id: '12',
      title: 'Power Posing',
      duration: '3 min',
      type: 'exercise' as const,
      isCompleted: false,
    },
  },
];

// Lessons Content
export const lessons = [
  {
    id: '1',
    title: 'What is Social Anxiety?',
    content: [
      {
        type: 'text',
        data: 'Social anxiety is more than just shyness. It\'s a persistent fear of social situations where you might be judged, embarrassed, or humiliated.',
      },
      {
        type: 'quote',
        data: 'The cave you fear to enter holds the treasure you seek. - Joseph Campbell',
      },
      {
        type: 'text',
        data: 'Understanding social anxiety is the first step toward overcoming it. Let\'s explore what makes social situations feel so challenging.',
      },
      {
        type: 'list',
        data: [
          'Physical symptoms like rapid heartbeat or sweating',
          'Negative thoughts about being judged',
          'Avoidance of social situations',
          'Difficulty making eye contact or speaking up',
        ],
      },
    ],
    duration: '5 min',
    keyTakeaways: [
      'Social anxiety affects millions of people worldwide',
      'It\'s a treatable condition with the right strategies',
      'Recognition is the first step toward healing',
    ],
  },
  {
    id: '7',
    title: 'Reframing Negative Thoughts',
    content: [
      {
        type: 'text',
        data: 'Our thoughts shape our reality. When we learn to reframe negative thoughts, we can transform our entire experience of social situations.',
      },
      {
        type: 'text',
        data: 'Cognitive reframing is a powerful technique that helps you identify and challenge unhelpful thought patterns.',
      },
      {
        type: 'list',
        data: [
          'Notice the negative thought',
          'Question its validity',
          'Look for evidence against it',
          'Create a more balanced perspective',
        ],
      },
    ],
    duration: '7 min',
    keyTakeaways: [
      'Thoughts are not facts',
      'We can choose how to interpret situations',
      'Practice makes reframing automatic',
    ],
  },
];

// Challenges
export const challenges = [
  {
    id: '8',
    title: 'Challenge Your Inner Critic',
    description: 'Learn to identify and counter the negative voice in your head that holds you back from social confidence.',
    duration: '12 min',
    steps: [
      {
        title: 'Identify Your Inner Critic',
        description: 'The first step is recognizing when your inner critic is speaking.',
        action: 'For the next 24 hours, notice when you have self-critical thoughts. Write them down without judgment.',
        tips: [
          'Common phrases: "I\'m not good enough", "They think I\'m weird"',
          'Notice physical sensations that accompany these thoughts',
          'Pay attention to triggers that activate your inner critic',
        ],
        reflection: 'What patterns do you notice in your self-critical thoughts?',
      },
      {
        title: 'Question the Evidence',
        description: 'Challenge your inner critic by examining the evidence for and against these thoughts.',
        action: 'Take one critical thought from step 1 and list evidence for and against it.',
        tips: [
          'Ask: "Is this thought helpful or harmful?"',
          'Consider: "What would I tell a friend in this situation?"',
          'Look for alternative explanations',
        ],
        reflection: 'How does questioning these thoughts change how you feel about them?',
      },
      {
        title: 'Create a Compassionate Response',
        description: 'Develop a kind, supportive inner voice to counter criticism.',
        action: 'Write a compassionate response to each critical thought you identified.',
        tips: [
          'Use the same tone you\'d use with a good friend',
          'Focus on growth rather than perfection',
          'Acknowledge your efforts and progress',
        ],
        reflection: 'How does it feel to speak to yourself with kindness?',
      },
    ],
  },
];

// Exercises
export const exercises = [
  {
    id: '9',
    title: 'Affirmation Practice',
    description: 'Build self-confidence through positive affirmations that rewire your brain for success.',
    duration: '4 min',
    phases: [
      {
        name: 'Preparation',
        instruction: 'Find a comfortable seated position. Close your eyes and take three deep breaths.',
        duration: 30,
      },
      {
        name: 'Affirmation Repetition',
        instruction: 'Repeat each affirmation slowly and with intention: "I am confident and capable", "I deserve respect and kindness", "I have valuable contributions to make".',
        duration: 180,
      },
      {
        name: 'Visualization',
        instruction: 'Visualize yourself in a social situation, feeling confident and at ease. See yourself speaking clearly and connecting with others.',
        duration: 60,
      },
      {
        name: 'Integration',
        instruction: 'Take three deep breaths and slowly open your eyes. Carry this feeling of confidence with you.',
        duration: 30,
      },
    ],
    tips: [
      'Repeat affirmations with conviction, even if you don\'t fully believe them yet',
      'Practice daily for best results',
      'Create personal affirmations that resonate with you',
      'Notice how your body feels when you say positive things about yourself',
    ],
  },
];

// Explore Categories
export const exploreCategories = [
  {
    id: '1',
    name: 'Breathing Exercises',
    description: 'Calm your mind with guided breathing techniques',
    icon: 'wind',
    color: '#6B9EF5',
    itemCount: 12,
  },
  {
    id: '2',
    name: 'Mindfulness',
    description: 'Practice present moment awareness',
    icon: 'leaf',
    color: '#9B7EF5',
    itemCount: 18,
  },
  {
    id: '3',
    name: 'Confidence Building',
    description: 'Exercises to boost your self-confidence',
    icon: 'star',
    color: '#F59E7E',
    itemCount: 15,
  },
  {
    id: '4',
    name: 'Stress Relief',
    description: 'Techniques to manage and reduce stress',
    icon: 'heart',
    color: '#7EF59B',
    itemCount: 20,
  },
];

// Explore Content
export const exploreContent = [
  {
    id: '1',
    title: '5-Minute Morning Breathing',
    description: 'Start your day with calm and clarity through this gentle breathing exercise.',
    duration: '5 min',
    type: 'exercise' as const,
    thumbnail: 'https://via.placeholder.com/200x120/6B9EF5/FFFFFF?text=Breathing',
    isFavorited: false,
    category: '1',
  },
  {
    id: '2',
    title: 'Understanding Mindfulness',
    description: 'Learn the fundamentals of mindfulness practice and its benefits.',
    duration: '8 min',
    type: 'article' as const,
    thumbnail: 'https://via.placeholder.com/200x120/9B7EF5/FFFFFF?text=Article',
    isFavorited: true,
    category: '2',
  },
  {
    id: '3',
    title: 'Confidence in Conversations',
    description: 'Practical tips for feeling more confident in social interactions.',
    duration: '12 min',
    type: 'video' as const,
    thumbnail: 'https://via.placeholder.com/200x120/F59E7E/FFFFFF?text=Video',
    isFavorited: false,
    category: '3',
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Release tension and stress with this guided relaxation technique.',
    duration: '15 min',
    type: 'audio' as const,
    thumbnail: 'https://via.placeholder.com/200x120/7EF59B/FFFFFF?text=Audio',
    isFavorited: true,
    category: '4',
  },
];

// Featured Content
export const featuredContent = [
  {
    id: 'f1',
    title: 'Daily Confidence Boost',
    duration: '3 min',
    type: 'exercise' as const,
  },
  {
    id: 'f2',
    title: 'Mindful Moments',
    duration: '5 min',
    type: 'exercise' as const,
  },
  {
    id: 'f3',
    title: 'Stress-Free Evening',
    duration: '10 min',
    type: 'exercise' as const,
  },
];

// Chat Messages
export const chatMessages = [
  {
    id: '1',
    content: 'Hello! I\'m your AI wellness coach. How are you feeling today?',
    sender: 'ai' as const,
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    type: 'text' as const,
  },
  {
    id: '2',
    content: 'I\'m feeling a bit anxious about a social event tonight.',
    sender: 'user' as const,
    timestamp: new Date(Date.now() - 3500000).toISOString(),
    type: 'text' as const,
  },
  {
    id: '3',
    content: 'I understand that social events can feel overwhelming. It\'s completely normal to feel anxious. Let\'s work through some strategies that can help you feel more confident and prepared.',
    sender: 'ai' as const,
    timestamp: new Date(Date.now() - 3400000).toISOString(),
    type: 'text' as const,
  },
];

// Export all data as a single object for easy access
export const dummyData = {
  currentUser,
  users: dummyUsers,
  userStats,
  programs: dummyPrograms,
  programDays,
  lessons,
  challenges,
  exercises,
  exploreCategories,
  exploreContent,
  featuredContent,
  chatMessages,
};

export default dummyData;
