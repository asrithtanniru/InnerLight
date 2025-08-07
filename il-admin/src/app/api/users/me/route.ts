
import { NextResponse } from 'next/server';
import { users } from '@/lib/placeholder-data';

// This is a mock implementation. In a real app, you'd get the user ID from a validated JWT.
function getUserIdFromRequest(request: Request): string | null {
    const admin = users.find(u => u.role === 'admin');
    return admin ? admin.id : '1'; // Default to user '1' if no admin
}


export async function GET(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  
  try {
    const body = await request.json();
    // Only allow updating specific fields
    const { name, avatarUrl, onboarding } = body;
    if (name) users[userIndex].name = name;
    if (avatarUrl) users[userIndex].avatarUrl = avatarUrl;
    if (onboarding) users[userIndex].onboarding = onboarding;

    return NextResponse.json({ message: 'Profile updated successfully', user: users[userIndex] });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}
