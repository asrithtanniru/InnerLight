
import { NextResponse } from 'next/server';
import { achievements } from '@/lib/placeholder-data';

export async function GET(request: Request) {
  return NextResponse.json(achievements);
}
