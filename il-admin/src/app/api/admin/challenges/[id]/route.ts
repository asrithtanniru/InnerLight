
import { NextResponse } from 'next/server';
import { challenges } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const challengeIndex = challenges.findIndex(c => c.id === params.id);
  if (challengeIndex === -1) {
      return NextResponse.json({ message: `Challenge ${params.id} not found` }, { status: 404 });
  }
  try {
      const body = await request.json();
      challenges[challengeIndex] = { ...challenges[challengeIndex], ...body };
      return NextResponse.json({ message: `Challenge ${params.id} updated`, challenge: challenges[challengeIndex] });
  } catch (error) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const challengeIndex = challenges.findIndex(c => c.id === params.id);
    if (challengeIndex === -1) {
        return NextResponse.json({ message: `Challenge ${params.id} not found` }, { status: 404 });
    }
    challenges.splice(challengeIndex, 1);
    return NextResponse.json({ message: `Challenge ${params.id} deleted` });
}
