// src/data/programs/communication-skills.ts
import { Program } from '../../types/program-types'

export const communicationSkillsProgram: Program = {
  id: 'communication-skills',
  title: 'Communication Skills',
  description: 'Learn to communicate assertively while respecting yourself and others.',
  image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
  difficulty: 'beginner',
  category: 'Personal Development',
  tags: ['assertiveness', 'communication', 'confidence', 'relationships'],
  estimatedDuration: '2-3 weeks',
  totalLessons: 6,
  author: 'Inner Light Team',
  version: '1.0.0',
  lastUpdated: '2024-10-03',
  modules: [
    {
      id: 'foundation',
      title: 'Foundation',
      description: 'Learn the fundamentals of assertive communication',
      icon: '🎯',
      order: 1,
      estimatedDuration: '3-4 days',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'assertiveness',
          title: 'Assertiveness',
          description: 'What is assertiveness and why do we want it',
          type: 'lesson',
          order: 1,
          duration: 15,
          image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
          slides: [
            {
              id: 'assertiveness-intro',
              type: 'content',
              title: 'What is Assertiveness?',
              content: `Assertiveness is the light within you that allows you to express your thoughts, feelings, and needs with honesty and respect. It's about shining brightly without dimming the light of others.

Being assertive doesn't mean being forceful or submissive—it's finding that balanced place where you respect yourself and the people around you.

When you practice assertiveness, you strengthen your confidence, reduce self-doubt, and open the door to healthier communication. It's a skill—and like any skill, it can be learned and nurtured with practice.`,
              actionButton: 'Continue',
            },
            {
              id: 'communication-styles',
              type: 'content',
              title: 'Types of Communication Styles',
              content: `There are different ways people tend to communicate:

**Passive** – You silence your own needs, putting others first at your own expense.

**Aggressive** – You push your needs forward but ignore or harm the needs of others.

**Assertive** – You honor both your needs and the needs of others with respect.

Assertiveness is the balanced path—where your Inner Light shines strong, without overpowering or shrinking back.`,
              actionButton: 'Continue',
            },
            {
              id: 'assertiveness-vs-aggression',
              type: 'content',
              title: 'Assertiveness is Not Aggression',
              content: `Some people confuse assertiveness with aggression, but they are very different. Assertiveness respects boundaries—both yours and others'. Aggression crosses those boundaries.

Think of it this way:
• **Assertiveness** is a steady flame, warm and calm.
• **Aggression** is a wildfire, burning out of control.

Your Inner Light grows stronger when you express yourself kindly yet firmly, without harming yourself or others.`,
              actionButton: 'Continue',
            },
            {
              id: 'benefits-of-assertiveness',
              type: 'content',
              title: 'Benefits of Assertiveness',
              content: `**Clarity**: You know what you want and can ask for it directly.

**Balance**: You respect your needs and others' needs equally.

**Peace**: Less stress, resentment, and anxiety build up inside you.

**Growth**: You create stronger, healthier relationships.

On the other hand, when we are not assertive, we may feel invisible, stressed, or disconnected from ourselves. Over time, this can increase anxiety and leave us feeling powerless.`,
              actionButton: 'Continue',
            },
            {
              id: 'why-unassertive',
              type: 'content',
              title: 'Why We Become Unassertive',
              content: `We are all born naturally assertive—babies cry when they need food or comfort. But as we grow, our environment teaches us how to respond. 

Maybe you learned to stay quiet to avoid conflict, or to always put others first. These patterns can shape how you express yourself today.

The good news is: you can relearn and return to your natural assertiveness. Your Inner Light is always there—it just needs space to shine.`,
              actionButton: 'Continue',
            },
            {
              id: 'challenge-light-your-voice',
              type: 'challenge',
              title: 'Challenge: "Light Your Voice"',
              content: `**Today's Challenge:**

1. **Reflect**: Think of one small situation where you held back from speaking your truth (e.g., not sharing an opinion in a group).

2. **Act**: Today, choose one moment—big or small—where you will speak up respectfully for yourself. Use simple words like: "I feel…", "I need…", "I'd prefer…".

3. **Note the Glow**: Afterward, reflect on how it felt. Did you feel lighter? Stronger? More connected?`,
              actionButton: 'Complete Challenge',
            },
            {
              id: 'lesson-complete',
              type: 'completion',
              title: 'Excellent!',
              content: `In the coming lessons, we will examine how we can train our assertiveness skills to get what we deserve in life.`,
              actionButton: 'Finish Lesson',
            },
          ],
        },
        {
          id: 'know-what-you-want',
          title: 'Know What You Want',
          description: 'Clarity before connection - understanding your needs',
          type: 'lesson',
          order: 2,
          duration: 12,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          slides: [
            {
              id: 'clarity-intro',
              type: 'content',
              title: 'Clarity Before Connection',
              content: `Before you can communicate well with others, you need to be clear with yourself. Communication becomes difficult when you don't know what you truly want to express.

Many times, anxiety or fear clouds our message, and we either say too little, too much, or avoid speaking at all.

This lesson helps you pause, reflect, and recognize your needs before you share them with others.`,
              actionButton: 'Continue',
            },
            {
              id: 'why-clarity-matters',
              type: 'content',
              title: 'Why Clarity Matters',
              content: `• When you know your needs, you express yourself with confidence.
• Clear communication reduces misunderstandings.
• It prevents resentment from building up when your needs go unheard.

**Inner Light Perspective**: Clarity is like polishing a lantern—when you know your truth, your Inner Light shines brighter. It guides both you and the people around you.`,
              actionButton: 'Continue',
            },
            {
              id: 'steps-to-clarity',
              type: 'content',
              title: 'Simple Steps to Gain Clarity',
              content: `**1. Pause before speaking** – Ask yourself: "What am I really trying to say?"

**2. Use feeling + need statements** – Example: "I feel nervous because I need support."

**3. Set an intention** – Decide what outcome you hope for before you start the conversation.`,
              actionButton: 'Continue',
            },
            {
              id: 'challenge-name-your-light',
              type: 'challenge',
              title: 'Challenge: "Name Your Light"',
              content: `**Today's Challenge:**

1. **Write down** one situation where you usually stay quiet or feel anxious speaking.

2. **Ask yourself**: "What do I really want in this situation?"

3. **Practice** saying it aloud in front of a mirror or to yourself, starting with "I feel…" or "I need…".`,
              actionButton: 'Complete Challenge',
            },
            {
              id: 'lesson-complete-2',
              type: 'completion',
              title: 'Well Done!',
              content: `You've learned the importance of clarity in communication. Tomorrow we'll explore how to overcome communication blockers.`,
              actionButton: 'Finish Lesson',
            },
          ],
        },
      ],
    },
    {
      id: 'communication-styles',
      title: 'Communication Styles',
      description: 'Understanding different ways people communicate',
      icon: '💬',
      order: 2,
      estimatedDuration: '3-4 days',
      color: '#10B981',
      lessons: [
        {
          id: 'understanding-styles',
          title: 'Understanding Communication Styles',
          description: 'Learn the three main communication styles',
          type: 'lesson',
          order: 1,
          duration: 18,
          slides: [
            {
              id: 'styles-intro',
              type: 'content',
              title: 'Three Communication Styles',
              content: `Understanding communication styles helps you recognize patterns in yourself and others:

**Passive Communication**
- Avoids conflict at all costs
- Puts others' needs first
- Difficulty expressing opinions
- Often feels unheard or resentful

**Aggressive Communication**
- Dominates conversations
- Ignores others' feelings
- Uses blame and criticism
- Creates conflict and tension

**Assertive Communication**
- Expresses needs clearly and respectfully
- Listens to others
- Maintains healthy boundaries
- Creates mutual respect`,
              actionButton: 'Continue',
            },
          ],
        },
      ],
    },
    {
      id: 'overcoming-blockers',
      title: 'Overcoming Blockers',
      description: 'Identify and overcome communication barriers',
      icon: '🚫',
      order: 3,
      estimatedDuration: '4-5 days',
      color: '#F59E0B',
      lessons: [
        {
          id: 'stress-and-blockers',
          title: 'Understanding Stress and Social Blockers',
          description: 'Learn how stress affects communication',
          type: 'lesson',
          order: 1,
          duration: 20,
          slides: [
            {
              id: 'stress-intro',
              type: 'content',
              title: 'Understanding Stress and Social Blockers',
              content: `When you feel anxious or stressed before speaking, your body reacts as if it's in danger. This response is called the fight-or-flight reaction. Your heartbeat gets faster, your palms sweat, and your mind may go blank.

While this reaction is natural, it often becomes a blocker to effective communication.`,
              actionButton: 'Continue',
            },
            {
              id: 'types-of-blockers',
              type: 'content',
              title: 'Types of Communication Blockers',
              content: `Blockers are the invisible barriers that stop you from expressing yourself freely:

**Mental blockers** – negative self-talk, overthinking, or imagining worst-case scenarios.

**Emotional blockers** – low confidence, past failures, or fear of rejection.

**Physical blockers** – shaky voice, dry mouth, or trembling hands.

**Social blockers** – the belief that others are constantly judging or criticizing you.`,
              actionButton: 'Continue',
            },
            {
              id: 'reframing-stress',
              type: 'content',
              title: 'Reframing Stress',
              content: `By learning to recognize these blockers, you gain the power to manage them. Stress does not mean weakness—it simply shows that your body is preparing to do something important.

When you view stress as a sign of readiness rather than fear, you begin to turn anxiety into a source of strength.

**Inner Light Insight**: Instead of saying "I'm anxious to speak," try reframing it as "I'm energized to share." This small shift can reduce fear and boost confidence.`,
              actionButton: 'Continue',
            },
          ],
        },
      ],
    },
    {
      id: 'effective-behaviors',
      title: 'Effective Behaviors',
      description: 'Learn practical assertive communication techniques',
      icon: '✨',
      order: 4,
      estimatedDuration: '5-6 days',
      color: '#EF4444',
      lessons: [],
    },
    {
      id: 'how-tos',
      title: "How-to's",
      description: 'Practical guides for real-world situations',
      icon: 'ℹ️',
      order: 5,
      estimatedDuration: '4-5 days',
      color: '#3B82F6',
      lessons: [],
    },
  ],
}
