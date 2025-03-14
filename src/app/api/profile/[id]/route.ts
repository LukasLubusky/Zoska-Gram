import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Verify user is updating their own profile
    if (session.user.id !== params.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Get update data from request body
    const data = await request.json();
    const { name, bio, location } = data;

    // Update user and create/update profile
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        name,
        profile: {
          upsert: {
            create: {
              bio,
              location,
            },
            update: {
              bio,
              location,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// GET endpoint for fetching profile
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        profile: true,
        posts: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}