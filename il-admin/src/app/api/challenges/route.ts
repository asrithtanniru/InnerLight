import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import cloudinary from 'cloudinary';

interface CreateChallengeRequestBody {
  token: string;
  title: string;
  description: string;
  image?: string;
  difficulty: string;
  duration: string;
  expiry: string;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    // const lessons = formData.get('lessons');
    // const active = formData.get('active');
    const difficulty = formData.get('difficulty') as string;
    const duration = formData.get('duration') as string;
    const imageFile = formData.get('image');
    const expiry = formData.get('expiry') as string;

    if (!title || !description || !difficulty || !duration || !expiry) {
      return NextResponse.json({ message: 'Title, description, difficulty, duration, and expiry are required' }, { status: 400 });
    }
    const client = await connectDB();
    const db = client.db('InnerLight');

    // Get token from Authorization header or cookies
    let token = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const cookieHeader = request.headers.get('cookie') || '';
      const tokenMatch = cookieHeader.match(/token=([^;]+)/);
      token = tokenMatch ? tokenMatch[1] : null;
    }
    if (!token) {
      return NextResponse.json({ message: 'Missing authentication token' }, { status: 401 });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      console.error('[challenge_CREATE_ERROR][JWT]', err);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const userId = typeof decoded === 'object' && decoded !== null && 'userId' in decoded ? decoded.userId : null;
    if (!userId) {
      return NextResponse.json({ message: 'Invalid token payload' }, { status: 401 });
    }
    const adminUser = await db.collection('admin').findOne({ _id: new ObjectId(userId) });
    if (!adminUser) {
      return NextResponse.json({ message: 'Unauthorized: not an admin' }, { status: 403 });
    }
    let imageUrl = '';
    if (imageFile && typeof imageFile === 'object' && 'arrayBuffer' in imageFile) {
      // Configure Cloudinary
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      // Upload buffer to Cloudinary
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
            console.error('[Cloudinary Upload Error]', error);
            reject(error);
          } else {
            resolve(result?.secure_url || '');
          }
        });
        uploadStream.end(buffer);
      });
    }

    const newProgram = {
      title,
      description,
      image: imageUrl,
      difficulty,
      duration,
      expiry,
      createdAt: new Date(),
    };
    const result = await db.collection('challenges').insertOne(newProgram);
    if (!result.acknowledged) {
      return NextResponse.json({ message: 'Failed to create challenge' }, { status: 500 });
    }

    const createdChallenge = { ...newProgram, _id: result.insertedId };
    return NextResponse.json({ message: 'Challenge created successfully', challenge: createdChallenge });
  } catch (err) {
    console.error('[challenge_CREATE_ERROR]', err);
    return NextResponse.json({ message: 'An error occurred during challenge creation' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // Authenticate admin using Bearer or cookie
    let token = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const cookieHeader = request.headers.get('cookie') || '';
      const tokenMatch = cookieHeader.match(/token=([^;]+)/);
      token = tokenMatch ? tokenMatch[1] : null;
    }
    if (!token) {
      return NextResponse.json({ message: 'Missing authentication token' }, { status: 401 });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const userId = typeof decoded === 'object' && decoded !== null && 'userId' in decoded ? decoded.userId : null;
    if (!userId) {
      return NextResponse.json({ message: 'Invalid token payload' }, { status: 401 });
    }
    const client = await connectDB();
    const db = client.db('InnerLight');
    const challenges = await db.collection('challenges').find({}).toArray();
    return NextResponse.json({ challenges });
  } catch (err) {
    console.error('[challenge_GET_ERROR]', err);
    return NextResponse.json({ message: 'An Error occured' }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    // Authenticate admin using Bearer or cookie
    let token = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const cookieHeader = request.headers.get('cookie') || '';
      const tokenMatch = cookieHeader.match(/token=([^;]+)/);
      token = tokenMatch ? tokenMatch[1] : null;
    }
    if (!token) {
      return NextResponse.json({ message: 'Missing authentication token' }, { status: 401 });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const userId = typeof decoded === 'object' && decoded !== null && 'userId' in decoded ? decoded.userId : null;
    if (!userId) {
      return NextResponse.json({ message: 'Invalid token payload' }, { status: 401 });
    }
    const client = await connectDB();
    const db = client.db('InnerLight');
    const adminUser = await db.collection('admin').findOne({ _id: new ObjectId(userId) });
    if (!adminUser) {
      return NextResponse.json({ message: 'Unauthorized: not an admin' }, { status: 403 });
    }

    // Parse body
    const body = await request.json();
    const { id, title, description, category, duration, difficulty, image, lessons, expiry } = body;
    if (!id) {
      return NextResponse.json({ message: 'Challenge id is required' }, { status: 400 });
    }
    const updateFields: any = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (category !== undefined) updateFields.category = category;
    if (duration !== undefined) updateFields.duration = duration;
    if (difficulty !== undefined) updateFields.difficulty = difficulty;
    if (image !== undefined) updateFields.image = image;
    if (lessons !== undefined) updateFields.lessons = lessons;
    if (expiry !== undefined) updateFields.expiry = expiry;

    const result = await db.collection('challenges').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Challenge not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Challenge updated successfully' });
  } catch (err) {
    console.error('[challenge_UPDATE_ERROR]', err);
    return NextResponse.json({ message: 'An error occurred during challenge update' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Authenticate admin using Bearer or cookie
    let token = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const cookieHeader = request.headers.get('cookie') || '';
      const tokenMatch = cookieHeader.match(/token=([^;]+)/);
      token = tokenMatch ? tokenMatch[1] : null;
    }
    if (!token) {
      return NextResponse.json({ message: 'Missing authentication token' }, { status: 401 });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const userId = typeof decoded === 'object' && decoded !== null && 'userId' in decoded ? decoded.userId : null;
    if (!userId) {
      return NextResponse.json({ message: 'Invalid token payload' }, { status: 401 });
    }
    const client = await connectDB();
    const db = client.db('InnerLight');
    const adminUser = await db.collection('admin').findOne({ _id: new ObjectId(userId) });
    if (!adminUser) {
      return NextResponse.json({ message: 'Unauthorized: not an admin' }, { status: 403 });
    }

    // Get id from query or body
    let id = '';
    if (request.method === 'DELETE') {
      // Try to get id from query string
      const url = new URL(request.url);
      id = url.searchParams.get('id') || '';
      if (!id) {
        // Try to get id from body
        try {
          const body = await request.json();
          id = body.id || '';
        } catch { }
      }
    }
    if (!id) {
      return NextResponse.json({ message: 'Challenge id is required' }, { status: 400 });
    }
    const result = await db.collection('challenges').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Challenge not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Challenge deleted successfully' });
  } catch (err) {
    console.error('[challenge_DELETE_ERROR]', err);
    return NextResponse.json({ message: 'An error occurred during challenge deletion' }, { status: 500 });
  }
}
