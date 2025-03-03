import { prisma } from '@/app/api/auth/[...nextauth]/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Fetching users...');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
    console.log('Users found:', users);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}