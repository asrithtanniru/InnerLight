
import { NextResponse } from 'next/server';
import { users, userProgress } from '@/lib/placeholder-data';
import { UserProgress } from '@/lib/types';

function getUserIdFromRequest(request: Request): string | null {
    const admin = users.find(u => u.role === 'admin');
    return admin ? admin.id : '1';
}

export async function GET(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const progress = userProgress.filter(p => p.userId === userId);
  return NextResponse.json({ progress });
}

export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const { lessonId, challengeId, programId, completed } = await request.json();
    if (!lessonId && !challengeId) {
        return NextResponse.json({ message: 'lessonId or challengeId is required' }, { status: 400 });
    }

    const newProgress: UserProgress = {
        id: `PROG${Date.now()}`,
        userId,
        lessonId,
        challengeId,
        programId,
        completed,
        date: new Date().toISOString().split('T')[0],
    };
    userProgress.push(newProgress);
    
    // Also update the user's progress array
    const user = users.find(u => u.id === userId);
    if(user) {
        user.progress.push(newProgress.id);
    }

    return NextResponse.json({ message: 'Progress updated', progress: newProgress });
  } catch(error) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
