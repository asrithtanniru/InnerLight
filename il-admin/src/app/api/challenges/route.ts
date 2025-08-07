
import { NextResponse } from 'next/server';
import { challenges } from '@/lib/placeholder-data';

export async function GET(request: Request) {
  return NextResponse.json(challenges);
}
