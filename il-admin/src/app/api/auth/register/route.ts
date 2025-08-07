
import { NextResponse } from 'next/server';
import { users } from '@/lib/placeholder-data';
import { User } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !name || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const newUser: User = {
      id: `USR${Date.now()}`,
      name,
      email,
      role: 'user',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatarUrl: 'https://placehold.co/100x100.png',
      fallback: name.substring(0, 2).toUpperCase(),
      achievements: [],
      progress: []
    };

    users.push(newUser);

    // In a real app, you'd return a JWT token here
    return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
  }
}
