
import { NextResponse } from 'next/server';
import { users } from '@/lib/placeholder-data';

// This is a mock implementation. In a real app, you'd get the user ID from a validated JWT.
function getUserIdFromRequest(request: Request): string | null {
    // For now, let's assume the first admin user is logged in.
    const admin = users.find(u => u.role === 'admin');
    return admin ? admin.id : null;
}

export async function GET(request: Request) {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const user = users.find(u => u.id === userId);

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
}
