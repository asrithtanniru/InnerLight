
import { NextResponse } from 'next/server';
import { users } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function GET(request: Request) {
  return NextResponse.json(users);
}
