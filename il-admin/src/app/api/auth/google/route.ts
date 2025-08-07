
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: Implement Google OAuth logic
  return NextResponse.json({ token: 'fake-google-jwt-token' });
}
