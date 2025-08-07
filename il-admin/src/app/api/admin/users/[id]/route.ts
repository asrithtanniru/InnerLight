
import { NextResponse } from 'next/server';
import { users } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const userIndex = users.findIndex(u => u.id === params.id);
  if (userIndex === -1) {
    return NextResponse.json({ message: `User ${params.id} not found` }, { status: 404 });
  }

  try {
    const { name, email, role } = await request.json();
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (role) users[userIndex].role = role;
    return NextResponse.json({ message: `User ${params.id} updated`, user: users[userIndex] });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const userIndex = users.findIndex(u => u.id === params.id);
    if (userIndex === -1) {
        return NextResponse.json({ message: `User ${params.id} not found` }, { status: 404 });
    }

    users.splice(userIndex, 1);
    return NextResponse.json({ message: `User ${params.id} deleted` });
}
