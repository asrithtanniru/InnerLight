
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
    try {
        // Get token from cookies
        const cookieHeader = request.headers.get('cookie');
        const token = cookieHeader
            ?.split(';')
            ?.find(c => c.trim().startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        // Get user from database
        const client = await connectDB();
        const db = client.db('InnerLight');

        const user = await db.collection('admin').findOne({
            _id: new ObjectId(decoded.userId)
        }, {
            projection: { password: 0 } // Exclude password from response
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            user: {
                userId: user._id,
                email: user.email,
            }
        }, { status: 200 });

    } catch (error) {
        console.error('[AUTH_ME_ERROR]', error);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}
