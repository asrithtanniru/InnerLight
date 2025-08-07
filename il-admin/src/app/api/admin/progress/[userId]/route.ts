
import { NextResponse } from 'next/server';
import { userProgress } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const progress = userProgress.filter(p => p.userId === params.userId);
  if (!progress.length) {
      return NextResponse.json({ message: `No progress found for user ${params.userId}`}, { status: 404 });
  }
  return NextResponse.json({ progress });
}
