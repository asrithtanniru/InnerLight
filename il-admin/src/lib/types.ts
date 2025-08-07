
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl: string;
  fallback: string;
  joined: string;
  onboarding?: {
    goals: string[];
    interests: string[];
  };
  progress: string[]; // a list of progress IDs
  achievements: string[]; // a list of achievement IDs
}

export interface Program {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  difficulty: string;
  duration: string;
  active: boolean;
  lessons: string[]; // a list of lesson IDs
}

export interface Lesson {
  id: string;
  title: string;
  programId: string;
  order: number;
  time: string;
  active: boolean;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  expiryDate: string;
  programId?: string;
  lessonId?: string;
}

export interface Achievement {
  id: string;
  name: string;
  category: string;
  criteria: string;
  icon: string;
}

export interface Feedback {
  id: string;
  userId: string;
  subject: string;
  content: string;
  date: string;
  status: 'Read' | 'Unread';
  programId?: string;
  lessonId?: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  programId?: string;
  lessonId?: string;
  challengeId?: string;
  completed: boolean;
  date: string;
}
