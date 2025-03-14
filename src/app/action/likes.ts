"use server";

// Import Prisma client
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

// Check if a user has liked a post
export const checkPostLike = async (userId: string, postId: string) => {
  try {
    const like = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    
    return !!like; // Return true if like exists, false otherwise
  } catch (error) {
    console.error("Error checking post like:", error);
    return false; // Return false on error
  }
};

// Toggle like on a post (like if not liked, unlike if already liked)
export const togglePostLike = async (userId: string, postId: string) => {
  if (!userId || !postId) {
    console.error("Missing required parameters:", { userId, postId });
    throw new Error("Missing required parameters");
  }

  try {
    // Use a transaction to ensure atomic operations
    return await prisma.$transaction(async (tx) => {
      // Check if user and post exist in a single query
      const [user, post] = await Promise.all([
        tx.user.findUnique({ where: { id: userId }, select: { id: true } }),
        tx.post.findUnique({ where: { id: postId }, select: { id: true } })
      ]);

      if (!user) {
        console.error(`User not found with ID: ${userId}`);
        throw new Error(`User not found with ID: ${userId}`);
      }

      if (!post) {
        console.error(`Post not found with ID: ${postId}`);
        throw new Error(`Post not found with ID: ${postId}`);
      }

      // Look for an existing like
      const existingLike = await tx.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });

      // If like exists, delete it (unlike)
      if (existingLike) {
        await tx.like.delete({
          where: {
            userId_postId: {
              userId,
              postId
            }
          }
        });
        console.log(`Successfully unliked post ${postId} by user ${userId}`);
        return false;
      }
    
      // If no like exists, create it (like)
      await tx.like.create({
        data: {
          userId,
          postId,
        }
      });
      console.log(`Successfully liked post ${postId} by user ${userId}`);
      return true;
    });

  } catch (error) {
    console.error("Error in togglePostLike:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to toggle like: ${error.message}`);
    }
    throw new Error("Failed to toggle like");
  }
};

// Get likes count for a post
export const getPostLikesCount = async (postId: string) => {
  try {
    const count = await prisma.like.count({
      where: {
        postId,
      },
    });
    
    return count;
  } catch (error) {
    console.error("Error getting post likes count:", error);
    return 0; // Return 0 on error
  }
};

// Batch check multiple post likes at once
export const checkPostLikesBatch = async (userId: string, postIds: string[]) => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        userId,
        postId: {
          in: postIds
        }
      },
      select: {
        postId: true
      }
    });
    
    // Convert to Set for O(1) lookups
    return new Set(likes.map(like => like.postId));
  } catch (error) {
    console.error("Error checking post likes batch:", error);
    return new Set(); // Return empty set on error
  }
};

// Get likes count for multiple posts at once
export const getPostLikesCountBatch = async (postIds: string[]) => {
  try {
    const likeCounts = await prisma.like.groupBy({
      by: ['postId'],
      where: {
        postId: {
          in: postIds
        }
      },
      _count: {
        postId: true
      }
    });
    
    // Convert to Map for O(1) lookups
    return new Map(
      likeCounts.map(count => [count.postId, count._count.postId])
    );
  } catch (error) {
    console.error("Error getting post likes count batch:", error);
    return new Map(); // Return empty map on error
  }
}; 