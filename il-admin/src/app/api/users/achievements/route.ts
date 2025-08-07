
import { NextResponse } from 'next/server';
import { users, achievements } from '@/lib/placeholder-data';

function getUserIdFromRequest(request: Request): string | null {
    const admin = users.find(u => u.role === 'admin');
    return admin ? admin.id : '1';
}

export async function GET(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const earnedAchievements = achievements.filter(ach => user.achievements.includes(ach.id));

  return NextResponse.json(earnedAchievements);
}
