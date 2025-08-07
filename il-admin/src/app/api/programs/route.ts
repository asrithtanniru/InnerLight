
import { NextResponse } from 'next/server';
import { programs } from '@/lib/placeholder-data';

export async function GET(request: Request) {
  // Only return active programs to general users
  const activePrograms = programs.filter(p => p.active);
  return NextResponse.json(activePrograms);
}
