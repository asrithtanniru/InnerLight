
import { NextResponse } from 'next/server';
import { lessons } from '@/lib/placeholder-data';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const lesson = lessons.find(l => l.id === params.id);

  if (!lesson || !lesson.active) {
    return NextResponse.json({ error: 'Lesson not found or not active' }, { status: 404 });
  }
  
  return NextResponse.json(lesson);
}
