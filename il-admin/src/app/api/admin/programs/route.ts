
import { NextResponse } from 'next/server';
import { programs } from '@/lib/placeholder-data';
import { Program } from '@/lib/types';

// TODO: Add admin role protection

export async function GET(request: Request) {
  return NextResponse.json(programs);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newProgram: Program = {
            id: `PROG${Date.now()}`,
            lessons: [],
            ...body
        };
        programs.push(newProgram);
        return NextResponse.json({ message: 'Program created', program: newProgram }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
}
