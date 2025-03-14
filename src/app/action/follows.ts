"use server";

// Import Prisma client
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

// Check if a user is following another user
export const checkFollowing = async (followerId: string, followingId: string) => {
  try {
    // First, get the profiles for both users
    const followerProfile = await prisma.profile.findUnique({
      where: { userId: followerId },
    });
    
    const followingProfile = await prisma.profile.findUnique({
      where: { userId: followingId },
    });
    
    // If either profile doesn't exist, they can't be following each other
    if (!followerProfile || !followingProfile) {
      return false;
    }
    
    // Check if a follow relationship exists
    const follow = await prisma.follow.findFirst({
      where: {
        followerId: followerProfile.id,
        followingId: followingProfile.id,
      },
    });
    
    return !!follow; // Return true if follow exists, false otherwise
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false; // Return false on error
  }
};

// Toggle follow (follow if not following, unfollow if already following)
export const toggleFollow = async (followerId: string, followingId: string) => {
  try {
    // Prevent self-following
    if (followerId === followingId) {
      console.log("Cannot follow yourself");
      return false;
    }

    // First check if both users exist
    const [followerUser, followingUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: followerId } }),
      prisma.user.findUnique({ where: { id: followingId } })
    ]);

    if (!followerUser || !followingUser) {
      throw new Error("One or both users not found");
    }

    // Get or create profiles for both users
    let [followerProfile, followingProfile] = await Promise.all([
      prisma.profile.findUnique({ where: { userId: followerId } }),
      prisma.profile.findUnique({ where: { userId: followingId } })
    ]);

    // Create profiles if they don't exist
    if (!followerProfile) {
      followerProfile = await prisma.profile.create({
        data: {
          userId: followerId,
          interests: []
        }
      });
    }

    if (!followingProfile) {
      followingProfile = await prisma.profile.create({
        data: {
          userId: followingId,
          interests: []
        }
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
      return false; // Return false to indicate user is now unfollowed
    } else {
      // Follow: create a new follow
      await prisma.follow.create({
        data: {
          followerId: followerProfile.id,
          followingId: followingProfile.id,
        },
      });
      return true; // Return true to indicate user is now followed
    }
  } catch (error) {
    console.error("Error toggling follow:", error);
    throw error;
  }
};

// Get followers count for a user
export const getFollowersCount = async (userId: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });
    
    if (!profile) {
      return 0;
    }
    
    const count = await prisma.follow.count({
      where: {
        followingId: profile.id,
      },
    });
    
    return count;
  } catch (error) {
    console.error("Error getting followers count:", error);
    return 0; // Return 0 on error
  }
};

// Get following count for a user
export const getFollowingCount = async (userId: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });
    
    if (!profile) {
      return 0;
    }
    
    const count = await prisma.follow.count({
      where: {
        followerId: profile.id,
      },
    });
    
    return count;
  } catch (error) {
    console.error("Error getting following count:", error);
    return 0; // Return 0 on error
  }
}; 