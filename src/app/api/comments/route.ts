import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';

// POST /api/comments - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { postId, content } = await request.json();
    
    if (!postId || !content) {
      return NextResponse.json({ error: 'Post ID and content are required' }, { status: 400 });
    }
    
    const userId = session.user.id;
    
    const newComment = await prisma.comment.create({
      data: {
        userId,
        postId,
        content,
      },
      include: {
        user: true,
      },
    });
    
    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Error in comments API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/comments?postId=xxx - Get comments for a post
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        likes: true,
      },
    });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error in comments API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/comments?id=xxx - Delete a comment
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(request.url);
    const commentId = url.searchParams.get('id');
    
    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }
    
    const userId = session.user.id;
    
    // First check if the comment belongs to the user
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    
    if (comment.userId !== userId) {
      return NextResponse.json({ error: 'Not authorized to delete this comment' }, { status: 403 });
    }
    
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in comments API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 