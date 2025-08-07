
import { NextResponse } from 'next/server';
import { users } from '@/lib/placeholder-data';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = users.find(u => u.email === email);

    // In a real app, you would verify the password hash
    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    
    // For this prototype, any password is fine if the user exists.
    // In a real app, you'd generate and return a JWT.
    return NextResponse.json({ token: `fake-jwt-for-${user.id}`, user });

  } catch (error) {
      return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
  }
}
