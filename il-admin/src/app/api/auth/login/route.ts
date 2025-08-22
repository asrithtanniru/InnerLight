import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, password }: LoginRequestBody = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const client = await connectDB();
    const db = client.db('InnerLight');

    const user = await db.collection('admin').findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      {
        userId: (user._id as ObjectId).toString(),
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // Create a response object
    const response = NextResponse.json(
      {
        message: 'Login successful',
        token: token, // Include token in response body for frontend compatibility
        user: { userId: user._id, email: user.email }
      },
      { status: 200 }
    );

    // Set JWT in HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // secure cookies in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
  }
}
