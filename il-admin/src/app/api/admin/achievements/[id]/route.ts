
import { NextResponse } from 'next/server';
import { achievements } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const achievementIndex = achievements.findIndex(a => a.id === params.id);
  if (achievementIndex === -1) {
      return NextResponse.json({ message: `Achievement ${params.id} not found` }, { status: 404 });
  }
  try {
      const body = await request.json();
      achievements[achievementIndex] = { ...achievements[achievementIndex], ...body };
      return NextResponse.json({ message: `Achievement ${params.id} updated`, achievement: achievements[achievementIndex] });
  } catch (error) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const achievementIndex = achievements.findIndex(a => a.id === params.id);
    if (achievementIndex === -1) {
        return NextResponse.json({ message: `Achievement ${params.id} not found` }, { status: 404 });
    }
    achievements.splice(achievementIndex, 1);
    return NextResponse.json({ message: `Achievement ${params.id} deleted` });
}
