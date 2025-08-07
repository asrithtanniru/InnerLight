
import { NextResponse } from 'next/server';
import { feedback } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function GET(request: Request) {
  return NextResponse.json(feedback);
}
