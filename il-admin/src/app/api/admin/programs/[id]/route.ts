
import { NextResponse } from 'next/server';
import { programs } from '@/lib/placeholder-data';

// TODO: Add admin role protection

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const programIndex = programs.findIndex(p => p.id === params.id);
  if (programIndex === -1) {
      return NextResponse.json({ message: `Program ${params.id} not found` }, { status: 404 });
  }

  try {
      const body = await request.json();
      programs[programIndex] = { ...programs[programIndex], ...body };
      return NextResponse.json({ message: `Program ${params.id} updated`, program: programs[programIndex] });
  } catch (error) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const programIndex = programs.findIndex(p => p.id === params.id);
    if (programIndex === -1) {
        return NextResponse.json({ message: `Program ${params.id} not found` }, { status: 404 });
    }
    programs.splice(programIndex, 1);
    return NextResponse.json({ message: `Program ${params.id} deleted` });
}
