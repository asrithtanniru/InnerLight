
import { NextResponse } from 'next/server';
import { lessons, programs } from '@/lib/placeholder-data';
import { Lesson } from '@/lib/types';

// TODO: Add admin role protection

export async function GET(request: Request) {
  return NextResponse.json(lessons);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newLesson: Lesson = {
            id: `LES${Date.now()}`,
            ...body
        };
        lessons.push(newLesson);

        // Also add the lesson to its program
        const program = programs.find(p => p.id === newLesson.programId);
        if (program) {
            program.lessons.push(newLesson.id);
        }

        return NextResponse.json({ message: 'Lesson created', lesson: newLesson }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
}
