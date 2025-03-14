import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';

// POST /api/likes - Toggle like on a post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { postId } = await request.json();
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    const userId = session.user.id;
    
    // Check if like already exists
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    
    if (existingLike) {
      // Unlike: delete the existing like
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Like: create a new like
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error in likes API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/likes?postId=xxx - Check if user has liked a post
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    const userId = session.user.id;
    
    const like = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    
    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error('Error in likes API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 