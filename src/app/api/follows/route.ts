import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';

// POST /api/follows - Toggle follow
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { followingId } = await request.json();
    
    if (!followingId) {
      return NextResponse.json({ error: 'Following ID is required' }, { status: 400 });
    }
    
    const followerId = session.user.id;
    
    // Prevent self-following
    if (followerId === followingId) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }
    
    // Get or create profiles for both users
    let followerProfile = await prisma.profile.findUnique({
      where: { userId: followerId },
    });
    
    if (!followerProfile) {
      followerProfile = await prisma.profile.create({
        data: {
          userId: followerId,
          interests: [],
        },
      });
    }
    
    let followingProfile = await prisma.profile.findUnique({
      where: { userId: followingId },
    });
    
    if (!followingProfile) {
      followingProfile = await prisma.profile.create({
        data: {
          userId: followingId,
          interests: [],
        },
      });
    }
    
    // Check if follow already exists
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: followerProfile.id,
        followingId: followingProfile.id,
      },
    });
    
    if (existingFollow) {
      // Unfollow: delete the existing follow
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });
      return NextResponse.json({ following: false });
    } else {
      // Follow: create a new follow
      await prisma.follow.create({
        data: {
          followerId: followerProfile.id,
          followingId: followingProfile.id,
        },
      });
      return NextResponse.json({ following: true });
    }
  } catch (error) {
    console.error('Error in follows API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/follows?userId=xxx - Check if user is following another user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(request.url);
    const followingId = url.searchParams.get('userId');
    
    if (!followingId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const followerId = session.user.id;
    
    // Get profiles for both users
    const followerProfile = await prisma.profile.findUnique({
      where: { userId: followerId },
    });
    
    const followingProfile = await prisma.profile.findUnique({
      where: { userId: followingId },
    });
    
    // If either profile doesn't exist, they can't be following each other
    if (!followerProfile || !followingProfile) {
      return NextResponse.json({ following: false });
    }
    
    // Check if a follow relationship exists
    const follow = await prisma.follow.findFirst({
      where: {
        followerId: followerProfile.id,
        followingId: followingProfile.id,
      },
    });
    
    return NextResponse.json({ following: !!follow });
  } catch (error) {
    console.error('Error in follows API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 