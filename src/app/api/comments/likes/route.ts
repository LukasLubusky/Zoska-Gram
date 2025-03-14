import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';

// POST /api/comments/likes - Toggle like on a comment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { commentId } = await request.json();
    
    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }
    
    const userId = session.user.id;
    
    // Check if like already exists
    const existingLike = await prisma.commentLike.findFirst({
      where: {
        userId,
        commentId,
      },
    });
    
    if (existingLike) {
      // Unlike: delete the existing like
      await prisma.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Like: create a new like
      await prisma.commentLike.create({
        data: {
          userId,
          commentId,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error in comment likes API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/comments/likes?commentId=xxx - Check if user has liked a comment
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(request.url);
    const commentId = url.searchParams.get('commentId');
    
    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }
    
    const userId = session.user.id;
    
    const like = await prisma.commentLike.findFirst({
      where: {
        userId,
        commentId,
      },
    });
    
    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error('Error in comment likes API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 