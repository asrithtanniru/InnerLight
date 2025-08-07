
import { NextResponse } from 'next/server';
import { lessons } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const lessonIndex = lessons.findIndex(l => l.id === params.id);
  if (lessonIndex === -1) {
      return NextResponse.json({ message: `Lesson ${params.id} not found` }, { status: 404 });
  }
  try {
      const body = await request.json();
      lessons[lessonIndex] = { ...lessons[lessonIndex], ...body };
      return NextResponse.json({ message: `Lesson ${params.id} updated`, lesson: lessons[lessonIndex] });
  } catch (error) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const lessonIndex = lessons.findIndex(l => l.id === params.id);
    if (lessonIndex === -1) {
        return NextResponse.json({ message: `Lesson ${params.id} not found` }, { status: 404 });
    }
    lessons.splice(lessonIndex, 1);
    return NextResponse.json({ message: `Lesson ${params.id} deleted` });
}
