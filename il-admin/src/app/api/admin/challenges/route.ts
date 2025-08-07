
import { NextResponse } from 'next/server';
import { challenges } from '@/lib/placeholder-data';
import { Challenge } from '@/lib/types';

// TODO: Add admin role protection

export async function GET(request: Request) {
  return NextResponse.json(challenges);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newChallenge: Challenge = {
            id: `CHL${Date.now()}`,
            ...body
        };
        challenges.push(newChallenge);
        return NextResponse.json({ message: 'Challenge created', challenge: newChallenge }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
}
