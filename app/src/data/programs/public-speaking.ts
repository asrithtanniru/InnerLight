// src/data/programs/public-speaking.ts
import { Program } from '../../types/program-types'

export const publicSpeakingProgram: Program = {
  id: 'public-speaking',
  title: 'Public Speaking',
  description: 'Overcome speaking anxiety and develop confident presentation skills.',
  image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop',
  difficulty: 'intermediate',
  category: 'Communication',
  tags: ['public-speaking', 'confidence', 'presentation', 'anxiety'],
  estimatedDuration: '3-4 weeks',
  totalLessons: 8,
  author: 'Inner Light Team',
  version: '1.0.0',
  lastUpdated: '2024-10-03',
  modules: [
    {
      id: 'understanding-anxiety',
      title: 'Understanding Anxiety',
      description: 'Learn about public speaking anxiety and how to manage it',
      icon: '🧠',
      order: 1,
      estimatedDuration: '3-4 days',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'anxiety-is-normal',
          title: 'Anxiety is Normal',
          description: 'Understanding that public speaking anxiety is common and manageable',
          type: 'lesson',
          order: 1,
          duration: 15,
          image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop',
          slides: [
            {
              id: 'anxiety-intro',
              type: 'content',
              title: 'Public Speaking Anxiety is Normal',
              content: `Public speaking anxiety is one of the most common fears in the world. In fact, almost 3 out of 4 people experience it. Even successful leaders, teachers, or actors who seem confident on stage have admitted that they still get nervous before facing an audience.

The truth is: the goal is not to eliminate anxiety. Instead, it's about learning how to manage it and use it as fuel.`,
              actionButton: 'Continue',
            },
            {
              id: 'fight-or-flight',
              type: 'content',
              title: "Understanding Your Body's Response",
              content: `When you feel your heart beating fast, your palms sweating, or your voice trembling—this is your body's natural "fight-or-flight" response. It means your body is preparing you to perform at your best.

What feels like "fear" is often just your system giving you extra energy, alertness, and focus.`,
              actionButton: 'Continue',
            },
            {
              id: 'managing-anxiety',
              type: 'content',
              title: 'How to Manage Anxiety',
              content: `Instead of fighting the anxiety or trying to "make it go away," the key is to:

• **Accept it** – Remind yourself, "This feeling is normal and temporary."
• **Channel it** – Turn nervous energy into enthusiasm and passion.
• **Practice gently** – The more often you face small speaking moments, the more comfortable you'll become.

**Inner Light Insight**: Your nervousness is proof that you care about your message. With practice, this energy can transform into confidence.`,
              actionButton: 'Continue',
            },
            {
              id: 'challenge-reframe-fears',
              type: 'challenge',
              title: 'Challenge: Reframe Your Fears',
              content: `**Step 1**: Write down your top 3 fears about public speaking.
For example:
• "I'm afraid I'll forget my words."
• "I'm worried people will judge me."
• "I might look nervous, and everyone will notice."

**Step 2**: Reframe each fear into a strength.
For example:
• If I forget my words, I can pause and smile—it shows I'm human, not a robot.
• If people judge me, it means they are paying attention. I can use that to engage them more.
• If I look nervous, that's okay—my passion will still shine through.

**Step 3**: Practice acceptance.
Every time you feel nervous today, remind yourself: "This is my body helping me. I am ready."`,
              actionButton: 'Complete Challenge',
            },
          ],
        },
      ],
    },
    {
      id: 'breath-and-voice',
      title: 'Breath and Voice',
      description: 'Master breathing techniques for confident speaking',
      icon: '🫁',
      order: 2,
      estimatedDuration: '4-5 days',
      color: '#10B981',
      lessons: [
        {
          id: 'power-of-breath',
          title: 'The Power of Breath',
          description: 'Learn breathing techniques to calm nerves and strengthen your voice',
          type: 'lesson',
          order: 1,
          duration: 18,
          slides: [
            {
              id: 'breath-intro',
              type: 'content',
              title: 'Breathe to Speak with Confidence',
              content: `When we get nervous, our body thinks we're in danger—even though we're just speaking in front of people. The brain sends signals that make the heart beat faster, muscles tighten, and breathing become shallow and quick. This is called the "fight-or-flight" response.

The problem? Shallow breathing feeds anxiety. You feel out of breath, your voice shakes, and your thoughts race.

The solution? Deep, controlled breathing.`,
              actionButton: 'Continue',
            },
            {
              id: 'breathing-benefits',
              type: 'content',
              title: 'How Breathing Helps',
              content: `Breathing slowly and deeply activates the parasympathetic nervous system (the body's "calm mode"). This:

• Lowers your heart rate
• Relaxes your muscles  
• Clears your mind
• Strengthens your voice
• Improves your posture
• Decreases anxiety

Most professional speakers, singers, and actors practice breathing before stepping on stage. They don't eliminate anxiety—they manage it with the breath.`,
              actionButton: 'Continue',
            },
            {
              id: 'breathing-techniques',
              type: 'content',
              title: 'Breathing Techniques',
              content: `**1. Box Breathing (4-4-4-4)**
• Inhale through your nose for 4 counts
• Hold for 4 counts
• Exhale through your mouth for 4 counts
• Pause for 4 counts
• Repeat 4–5 times
📌 Great for calming nerves right before speaking.

**2. Diaphragmatic Breathing (Belly Breathing)**
• Put one hand on your chest, one on your belly
• Inhale deeply so your belly (not chest) rises
• Exhale slowly and fully
• Repeat 5–10 times
📌 Helps strengthen your voice and keeps you grounded.`,
              actionButton: 'Continue',
            },
            {
              id: 'voice-practice',
              type: 'content',
              title: 'Breath + Voice Practice',
              content: `**3. Breath + Voice Practice**
• Take a deep breath, then exhale slowly while saying "Ahhh" or reading a short sentence.
• Focus on making your sound steady and smooth.
📌 Builds control and reduces shaky voice.

**Inner Light Insight**: Your breath is your secret weapon. Each slow inhale and exhale is a reminder: you are safe, you are steady, you are ready.`,
              actionButton: 'Continue',
            },
            {
              id: 'breathing-challenge',
              type: 'challenge',
              title: 'Challenge: Master Your Breath',
              content: `**1. Morning Practice (5 min)**
• Do box breathing as soon as you wake up. Notice how calm and clear you feel.

**2. Voice Control Exercise (5 min)**
• Practice speaking one paragraph while focusing on breathing from your belly. Record yourself if possible.

**3. Real-Life Application**
• Before talking in class, at work, or with a group today, pause and take 3 deep breaths. Notice the difference in your confidence.

**Reflection Prompt**:
• Did your breath feel shallow or deep before the exercise?
• How did your body change after practicing?
• Could you feel your voice sounding steadier?`,
              actionButton: 'Complete Challenge',
            },
          ],
        },
        {
          id: 'keys-to-speaking',
          title: 'The Keys to Public Speaking',
          description: 'Essential principles for confident speaking',
          type: 'lesson',
          order: 2,
          duration: 20,
          slides: [
            {
              id: 'speaking-keys-intro',
              type: 'content',
              title: 'Unlocking Confidence Through Simple Steps',
              content: `Public speaking may feel overwhelming, but the truth is—it's a skill, not a talent. Just like riding a bicycle or learning to swim, anyone can become better with practice. 

There are a few key principles that every great speaker uses, and you can too.`,
              actionButton: 'Continue',
            },
            {
              id: 'know-your-message',
              type: 'content',
              title: 'Know Your Message, Not Just Your Words',
              content: `• Don't try to memorize every single sentence. Instead, focus on your main points.
• Ask yourself: "What do I really want people to remember after I speak?"
• When you know your message deeply, small mistakes won't throw you off.

**Inner Light Insight**: Confidence comes from connection, not perfection. People care more about your message than a perfect script.`,
              actionButton: 'Continue',
            },
            {
              id: 'structure-speech',
              type: 'content',
              title: 'Structure Your Speech',
              content: `A clear structure helps both you and your audience.

**Introduction** – Grab attention with a story, question, or surprising fact.
**Main Body** – Share 2–3 key points with simple examples.
**Conclusion** – End with a strong message or call to action.

Think of it like telling a story—beginning, middle, and end.`,
              actionButton: 'Continue',
            },
            {
              id: 'practice-with-intention',
              type: 'content',
              title: 'Practice with Intention',
              content: `**Not all practice is equal. Here's how to practice effectively:**

• **Start small** – Practice with a mirror, then a friend, then a small group.
• **Focus on connection** – Look at your audience (or imaginary audience) and speak to them, not at them.
• **Record yourself** – You'll notice things you can't feel while speaking.
• **Practice the opening** – The first 30 seconds set the tone for everything.

Remember: You don't need to be perfect. You just need to be prepared.`,
              actionButton: 'Continue',
            },
          ],
        },
      ],
    },
    {
      id: 'delivery-techniques',
      title: 'Delivery Techniques',
      description: 'Master voice, body language, and stage presence',
      icon: '🎤',
      order: 3,
      estimatedDuration: '5-6 days',
      color: '#F59E0B',
      lessons: [],
    },
    {
      id: 'advanced-skills',
      title: 'Advanced Skills',
      description: 'Storytelling, audience engagement, and persuasion',
      icon: '🎭',
      order: 4,
      estimatedDuration: '6-7 days',
      color: '#EF4444',
      lessons: [],
    },
  ],
}
