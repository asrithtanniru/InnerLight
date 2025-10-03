// src/data/programs/intro.ts
import { Program } from '../../types/program-types'

export const introProgram: Program = {
  id: 'intro',
  title: 'Intro',
  description: 'Welcome to Inner Light. Start your journey to break free from fears and discover your inner strength.',
  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
  difficulty: 'beginner',
  category: 'Foundation',
  tags: ['introduction', 'welcome', 'anxiety', 'confidence', 'inner-light'],
  estimatedDuration: '4-5 days',
  totalLessons: 8,
  author: 'Inner Light Team',
  version: '1.0.0',
  lastUpdated: '2024-10-03',
  modules: [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Start your journey with Inner Light',
      icon: '🌟',
      order: 1,
      estimatedDuration: '1 day',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'welcome-intro',
          title: "Welcome, It's Time to Start FACING IT",
          description: 'Welcome to Inner Light and begin your transformation journey',
          type: 'lesson',
          order: 1,
          duration: 4,
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
          slides: [
            {
              id: 'welcome-slide-1',
              type: 'content',
              title: 'Welcome to Inner Light',
              content: `You're here because you want to break free from fears that hold you back.

By opening this app, you've already taken the first step toward uncovering the strength and light that already live inside you.

On this journey, you'll learn to find calm, build confidence, and speak with clarity — even in the moments that feel challenging.`,
              actionButton: 'Continue',
            },
            {
              id: 'welcome-slide-2',
              type: 'content',
              title: 'A Gentle Truth',
              content: `Want to know a secret?

Feeling nervous when speaking or meeting new people is completely normal. We're all wired to want acceptance and connection, so it's natural to feel anxious when expressing ourselves.

But here's the truth: your inner light shines brightest when you allow yourself to show up authentically. There's no need to feel ashamed — anxiety is just a sign that you care.`,
              actionButton: 'Continue',
            },
            {
              id: 'welcome-slide-3',
              type: 'content',
              title: 'Moving Beyond Avoidance',
              content: `Sometimes fear makes us avoid the very moments that help us grow. In fact, many people miss opportunities because they fear judgment or mistakes.

But avoiding only dims your inner light. The more you step forward — even in small ways — the more you discover your natural strength and confidence.

That's why Inner Light was created: to guide you in facing fears with gentle steps and to help you shine brighter every day.`,
              actionButton: 'Continue',
            },
            {
              id: 'welcome-slide-4',
              type: 'content',
              title: 'The Goal',
              content: `The goal of Inner Light is simple: To help you communicate clearly, feel confident, and stay calm in any situation that matters to you.

Every day, you'll receive lessons, reflections, and challenges designed to help you grow — step by step. Like physical exercise, the more you train your inner light, the stronger and brighter it becomes.

Think of it as building your inner muscle of peace and confidence.`,
              actionButton: 'Finish Lesson',
            },
          ],
        },
        {
          id: 'imagine-ideal-life',
          title: 'Imagine Your Ideal Life',
          description: 'Visualization exercise to connect with your goals',
          type: 'lesson',
          order: 2,
          duration: 5,
          image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
          slides: [
            {
              id: 'ideal-life-intro',
              type: 'content',
              title: 'Imagine Your Ideal Life',
              content: `Take a moment to visualize the person you want to become. This exercise will help you connect with your goals and motivate your journey forward.`,
              actionButton: 'Start Visualization',
            },
            {
              id: 'ideal-life-exercise',
              type: 'challenge',
              title: 'Visualization Exercise',
              content: `**Follow these steps:**

1. Take 5 quiet minutes and close your eyes.
2. Imagine your ideal self — calm, confident, and free from fear.
3. Write down one small action you can do today that your ideal self would take. (It could be raising your hand in class, greeting someone, or practicing a few sentences out loud.)
4. Do it — no matter how small.

**Visualization:** Picture yourself taking that step confidently, with a soft light glowing inside you, reminding you: This is who I am becoming.`,
              actionButton: 'Complete Challenge',
            },
            {
              id: 'ideal-life-complete',
              type: 'completion',
              title: 'Well Done!',
              content: `✅ By completing this challenge, you've already started walking toward your ideal life.

Remember, every small step counts toward becoming your best self.`,
              actionButton: 'Finish Lesson',
            },
          ],
        },
      ],
    },
    {
      id: 'understanding-avoidance',
      title: 'Understanding Avoidance',
      description: 'Learn about the cycle of avoidance and how to break it',
      icon: '🚫',
      order: 2,
      estimatedDuration: '1-2 days',
      color: '#F59E0B',
      lessons: [
        {
          id: 'avoidance-cycle',
          title: 'The Cycle of Avoidance',
          description: 'Understand how avoidance creates more anxiety over time',
          type: 'lesson',
          order: 1,
          duration: 8,
          slides: [
            {
              id: 'avoidance-intro',
              type: 'content',
              title: 'Avoidance Creates More Anxiety',
              content: `When we avoid difficult situations, we might feel relief at first — but in the long run, it makes those same situations feel even scarier.

Think of it like this: every time we avoid, we tell our mind, "This is dangerous." Over time, our fears grow stronger instead of weaker.

For example: if you avoid speaking up in a meeting, the next time it will feel even harder, and your anxiety will grow.`,
              actionButton: 'Continue',
            },
            {
              id: 'avoidance-examples',
              type: 'content',
              title: 'Everyday Examples of Avoidance',
              content: `Common ways we avoid challenges:

• Pretending there isn't a problem
• Hiding your emotions
• Avoiding important conversations
• Not responding to messages
• Not meeting people
• Saying "yes" when you want to say "no"

**Inner Light Takeaway:** Avoiding challenges dims your inner light. By stepping into uncomfortable moments, you give yourself the chance to grow, shine, and reduce anxiety over time.`,
              actionButton: 'Continue',
            },
            {
              id: 'breaking-cycle',
              type: 'content',
              title: 'How to Break the Cycle',
              content: `The way forward isn't to erase anxiety — it's to accept it's there and face it with courage.

When you take action instead of avoiding:
• You engage more effectively
• You gain new learning experiences
• You build higher confidence & skills

This is how your inner light grows brighter each time you face a fear.

**Think of it Like Exercise:** Every time you practice facing your fears, it's like a workout for your courage. The more you train, the easier it gets, and the stronger you become.`,
              actionButton: 'Continue',
            },
            {
              id: 'avoidance-challenge',
              type: 'challenge',
              title: 'Challenge: Take One Small Step Forward',
              content: `**Today's Challenge:**

Often, we wait for the "perfect moment" before starting something important. But in reality, progress is built on small, imperfect steps taken consistently.

**Reflection prompt:**
• What is one small step you've been postponing that you can take today?
• How might taking this step shift your mindset or energy?

Take that step today, no matter how small it feels.`,
              actionButton: 'Complete Challenge',
            },
          ],
        },
      ],
    },
    {
      id: 'body-confidence',
      title: 'Body & Confidence',
      description: 'Learn how body language affects confidence',
      icon: '💪',
      order: 3,
      estimatedDuration: '1 day',
      color: '#10B981',
      lessons: [
        {
          id: 'body-language',
          title: 'Let Your Body Speak Confidence',
          description: 'Use body language to build confidence from the outside in',
          type: 'lesson',
          order: 1,
          duration: 7,
          slides: [
            {
              id: 'body-intro',
              type: 'content',
              title: 'Your Body Speaks First',
              content: `Before you even say a word, your body is already sending signals. The way you sit, stand, walk, or look at others speaks louder than you think.

When you feel nervous, your body might shrink — shoulders bent, eyes down, fidgeting. This makes your anxiety stronger.

But when you change your body language, you send a message of confidence not only to others but also to your own brain.`,
              actionButton: 'Continue',
            },
            {
              id: 'why-body-matters',
              type: 'content',
              title: 'Why Body Language Matters',
              content: `**Mind-Body Connection:** Your body and mind are linked. If you stand tall and breathe calmly, your brain believes you are confident.

**First Impressions:** People often notice your posture and expressions before they hear your words.

**Self-Empowerment:** Confident body language makes you feel stronger inside, even if you started out nervous.

Think of your body as a bridge between your inner light and the outside world. When you open up your posture, you allow that light to shine through.`,
              actionButton: 'Continue',
            },
            {
              id: 'practice-steps',
              type: 'content',
              title: 'Steps to Practice Today',
              content: `**5 Simple Steps:**

1. **Stand Tall** – Keep your back straight and shoulders relaxed. Avoid slouching.
2. **Lift Your Head** – Look ahead, not down at the floor.
3. **Relax Your Breath** – Slow, deep breaths calm your mind and body.
4. **Gentle Eye Contact** – Looking into someone's eyes shows presence, but keep it natural.
5. **Smile Softly** – A small, relaxed smile shows warmth and openness.`,
              actionButton: 'Continue',
            },
            {
              id: 'body-challenge',
              type: 'challenge',
              title: "Today's Body Language Challenge",
              content: `Choose one moment today — maybe when answering in class, greeting a teacher, or talking with a friend — and practice confident body language.

Stand tall, breathe steady, and let your body reflect the confidence you are building.

**Reflection Questions:**
• Did my body language make me feel different?
• How did others respond when I stood tall and looked confident?
• Did I feel my "Inner Light" shining a little brighter?

**Reminder:** Confidence is not about being perfect — it's about showing up with openness and courage.`,
              actionButton: 'Complete Challenge',
            },
          ],
        },
      ],
    },
    {
      id: 'discovering-values',
      title: 'Discovering Values',
      description: 'Find your inner compass and guiding principles',
      icon: '🧭',
      order: 4,
      estimatedDuration: '1 day',
      color: '#EF4444',
      lessons: [
        {
          id: 'your-values',
          title: 'Discovering Your Values',
          description: 'Learn about your personal values and how they guide you',
          type: 'lesson',
          order: 1,
          duration: 10,
          slides: [
            {
              id: 'values-intro',
              type: 'content',
              title: 'What Are Values?',
              content: `When life feels overwhelming or when anxiety takes control, it's easy to forget what really matters to us. That's where values come in.

Values are like your inner compass—the guiding principles that give your life meaning, direction, and purpose.

Values are the things that are most important to you deep inside. They're not just goals you tick off a list but the qualities of life you want to live by.`,
              actionButton: 'Continue',
            },
            {
              id: 'values-examples',
              type: 'content',
              title: 'Examples of Values',
              content: `Some examples of values:

• **Honesty** – Being truthful and authentic
• **Kindness** – Showing compassion to others
• **Courage** – Facing fears and challenges
• **Learning** – Growing and discovering new things
• **Friendship** – Building meaningful connections
• **Respect** – Treating others with dignity
• **Growth** – Becoming a better version of yourself

Values are not about what others expect from you. They're about what truly matters to you.`,
              actionButton: 'Continue',
            },
            {
              id: 'values-help-anxiety',
              type: 'content',
              title: 'How Values Help With Anxiety',
              content: `Dealing with anxiety can feel overwhelming, but having strong values makes the journey easier. Values act like a compass, guiding you toward the actions that matter most, even in stressful moments.

When you know your values:
• You can make decisions with more clarity, instead of letting fear take over
• You find strength to keep moving forward, even when challenges arise

If anxiety feels heavy, pause and reflect on what truly matters to you. By understanding your values and choosing to live in line with them, you'll discover a sense of direction and purpose that helps you rise above your worries.`,
              actionButton: 'Continue',
            },
            {
              id: 'values-challenges',
              type: 'challenge',
              title: 'Discover Your Values',
              content: `**Challenge 1: List Your Top 3 Values**
• Take a moment and think: What really matters to you in life?
• Write down 3 values that feel true for you (e.g., honesty, courage, creativity, family, kindness).

**Challenge 2: Act on One Value Today**
• Pick one of your values and take a small action to live it.
  • If you chose kindness, smile or say something supportive to a friend.
  • If you chose courage, try raising your hand once in class.
  • If you chose growth, read something new or practice a skill.

At the end of the day, reflect: Did living my value help me feel stronger than my anxiety?

**Reminder:** Your values are your anchor. Anxiety may shake you, but when you hold on to your values, you always know where you are going.`,
              actionButton: 'Complete Challenge',
            },
          ],
        },
      ],
    },
  ],
}
