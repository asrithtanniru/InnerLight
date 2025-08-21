import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import bcrypt from 'bcryptjs';


interface RegisterRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, password }: RegisterRequestBody = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('InnerLight');

    const existingUser = await db.collection('admin').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('admin').insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error('[REGISTER_ERROR]', error);
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}
