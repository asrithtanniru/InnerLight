
import { NextResponse } from 'next/server';
import { feedback } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const feedbackIndex = feedback.findIndex(f => f.id === params.id);
    if (feedbackIndex === -1) {
        return NextResponse.json({ message: `Feedback ${params.id} not found` }, { status: 404 });
    }
    feedback.splice(feedbackIndex, 1);
    return NextResponse.json({ message: `Feedback ${params.id} deleted` });
}
