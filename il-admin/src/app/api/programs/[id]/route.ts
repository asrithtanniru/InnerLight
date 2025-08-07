
import { NextResponse } from 'next/server';
import { programs, lessons } from '@/lib/placeholder-data';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const program = programs.find(p => p.id === params.id);
  
  if (!program || !program.active) {
    return NextResponse.json({ error: 'Program not found or not active' }, { status: 404 });
  }
  
  const programLessons = lessons.filter(l => program.lessons.includes(l.id) && l.active);
  
  return NextResponse.json({ ...program, lessons: programLessons });
}
