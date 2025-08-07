
import { NextResponse } from 'next/server';
import { achievements } from '@/lib/placeholder-data';
import { Achievement } from '@/lib/types';

// TODO: Add admin role protection

export async function GET(request: Request) {
  return NextResponse.json(achievements);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newAchievement: Achievement = {
            id: `ACH${Date.now()}`,
            ...body
        };
        achievements.push(newAchievement);
        return NextResponse.json({ message: 'Achievement created', achievement: newAchievement }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
}
