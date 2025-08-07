
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { User, Program, Lesson, Challenge, Achievement, Feedback, UserProgress } from '@/lib/types';

export const stats = [
    { title: "Total Users", value: "45,231", change: "+20.1% from last month", icon: DollarSign },
    { title: "Active Users", value: "+2,350", change: "+180.1% from last month", icon: Users },
    { title: "Completion Rate", value: "+12,234", change: "+19% from last month", icon: CreditCard },
    { title: "Active Now", value: "+573", change: "+201 since last hour", icon: Activity },
];

export const chartData = [
    { month: "January", users: Math.floor(Math.random() * 5000) + 1000 },
    { month: "February", users: Math.floor(Math.random() * 5000) + 1000 },
    { month: "March", users: Math.floor(Math.random() * 5000) + 1000 },
    { month: "April", users: Math.floor(Math.random() * 5000) + 1000 },
    { month: "May", users: Math.floor(Math.random() * 5000) + 1000 },
    { month: "June", users: Math.floor(Math.random() * 5000) + 1000 },
];

let achievements: Achievement[] = [
    { id: "ACH001", name: "First Step", category: "Milestone", criteria: "Complete your first lesson.", icon: "footprints" },
    { id: "ACH002", name: "Zen Master", category: "Programs", criteria: "Complete the 'Mindful Morning' program.", icon: "brain-circuit" },
    { id: "ACH003", name: "Streak Keeper", category: "Consistency", criteria: "Log in 7 days in a row.", icon: "calendar-days" },
    { id: "ACH004", name: "Challenger", category: "Challenges", criteria: "Complete 5 challenges.", icon: "swords" },
];

let challenges: Challenge[] = [
    { id: "CHL001", title: "Meditate for 5 Days", difficulty: "Easy", points: 50, expiryDate: "2024-12-31" },
    { id: "CHL002", title: "Digital Detox Weekend", difficulty: "Medium", points: 150, expiryDate: "2024-11-30" },
    { id: "CHL003", title: "30-Day Journaling", difficulty: "Hard", points: 500, expiryDate: "2025-01-15" },
    { id: "CHL004", title: "Mindful Eating Challenge", difficulty: "Easy", points: 75, expiryDate: "2024-12-01" },
];

let lessons: Lesson[] = [
    { id: "LES001", programId: "PROG001", title: "Introduction to Mindfulness", order: 1, time: "10 min", active: true, content: "This is the content for the lesson.", videoUrl: "https://example.com/video.mp4" },
    { id: "LES002", programId: "PROG002", title: "Breathing Exercises", order: 1, time: "15 min", active: true, content: "This is the content for the lesson.", videoUrl: "https://example.com/video.mp4" },
    { id: "LES003", programId: "PROG003", title: "Sleep Hygiene", order: 1, time: "5 min", active: false, content: "This is the content for the lesson.", videoUrl: "https://example.com/video.mp4" },
    { id: "LES004", programId: "PROG004", title: "The Pomodoro Technique", order: 2, time: "20 min", active: true, content: "This is the content for the lesson.", videoUrl: "https://example.com/video.mp4" },
];

let programs: Program[] = [
    { id: "PROG001", title: "Mindful Morning", description: "Start your day with calm and focus.", category: "Mindfulness", difficulty: "Beginner", duration: "10 Days", active: true, imageUrl: "https://placehold.co/300x200.png", lessons: ["LES001"] },
    { id: "PROG002", title: "Stress Reduction", description: "Learn techniques to manage stress.", category: "Wellness", difficulty: "Intermediate", duration: "14 Days", active: true, imageUrl: "https://placehold.co/300x200.png", lessons: ["LES002"] },
    { id: "PROG003", title: "Deep Sleep", description: "Improve your sleep quality.", category: "Sleep", difficulty: "Beginner", duration: "7 Days", active: false, imageUrl: "https://placehold.co/300x200.png", lessons: ["LES003"] },
    { id: "PROG004", title: "Focus Boost", description: "Enhance your concentration.", category: "Productivity", difficulty: "Advanced", duration: "21 Days", active: true, imageUrl: "https://placehold.co/300x200.png", lessons: ["LES004"] },
];

let users: User[] = [
    { id: '1', name: "Olivia Martin", email: "olivia.martin@email.com", role: 'admin', joined: "2 days ago", avatarUrl: "https://placehold.co/100x100.png", fallback: "OM", achievements: ["ACH001"], progress: ["PROG001_LES001"] },
    { id: '2', name: "Jackson Lee", email: "jackson.lee@email.com", role: 'user', joined: "3 days ago", avatarUrl: "https://placehold.co/100x100.png", fallback: "JL", achievements: [], progress: [] },
    { id: '3', name: "Isabella Nguyen", email: "isabella.nguyen@email.com", role: 'user', joined: "5 days ago", avatarUrl: "https://placehold.co/100x100.png", fallback: "IN", achievements: [], progress: [] },
    { id: '4', name: "William Kim", email: "will@email.com", role: 'user', joined: "1 week ago", avatarUrl: "https://placehold.co/100x100.png", fallback: "WK", achievements: [], progress: [] },
    { id: '5', name: "Sofia Davis", email: "sofia.davis@email.com", role: 'user', joined: "1 week ago", avatarUrl: "https://placehold.co/100x100.png", fallback: "SD", achievements: [], progress: [] },
];

let feedback: Feedback[] = [
    { id: "FB001", userId: "1", subject: "App is great!", date: "2024-07-20", status: "Read", content: "I really love the mindful morning program!" },
    { id: "FB002", userId: "2", subject: "Feature Request: Dark Mode", date: "2024-07-19", status: "Unread", content: "A dark mode would be easier on the eyes at night." },
    { id: "FB003", userId: "3", subject: "Bug report on lesson page", date: "2024-07-18", status: "Unread", content: "The video for 'Breathing Exercises' isn't loading." },
    { id: "FB004", userId: "4", subject: "Suggestion for new program", date: "2024-07-17", status: "Read", content: "I would love to see a program on mindful eating." },
];

let userProgress: UserProgress[] = [
    { id: "PROG001_LES001", userId: "1", lessonId: "LES001", completed: true, date: "2024-07-28" }
]


// Make a copy of the original data to modify it in the API routes
let mutablePrograms = [...programs];
let mutableLessons = [...lessons];
let mutableChallenges = [...challenges];
let mutableAchievements = [...achievements];
let mutableUsers = [...users];
let mutableFeedback = [...feedback];
let mutableUserProgress = [...userProgress];


export {
    mutablePrograms as programs,
    mutableLessons as lessons,
    mutableChallenges as challenges,
    mutableAchievements as achievements,
    mutableUsers as users,
    mutableFeedback as feedback,
    mutableUserProgress as userProgress
};

export const recentUsers = users.slice(0, 5);
