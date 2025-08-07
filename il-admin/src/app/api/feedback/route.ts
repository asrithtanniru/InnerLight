
import { NextResponse } from 'next/server';
import { feedback, users } from '@/lib/placeholder-data';
import { Feedback } from '@/lib/types';

function getUserIdFromRequest(request: Request): string | null {
    const admin = users.find(u => u.role === 'admin');
    return admin ? admin.id : '1';
}

export async function POST(request: Request) {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    try {
        const { subject, content, programId, lessonId } = await request.json();

        if(!subject || !content) {
            return NextResponse.json({ message: 'Subject and content are required' }, { status: 400 });
        }

        const newFeedback: Feedback = {
            id: `FB${Date.now()}`,
            userId,
            subject,
            content,
            programId,
            lessonId,
            date: new Date().toISOString().split('T')[0],
            status: 'Unread',
        };

        feedback.push(newFeedback);
        
        return NextResponse.json({ message: 'Feedback submitted successfully', feedback: newFeedback }, { status: 201 });
    } catch(e) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
}
