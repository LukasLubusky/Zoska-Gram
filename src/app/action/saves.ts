'use server';

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export async function toggleSavePost(userId: string, postId: string) {
  try {
    console.log("toggleSavePost called with userId:", userId, "postId:", postId);
    
    // Check if the user and post exist
    const [user, post] = await Promise.all([
      prisma.user.findUnique({ 
        where: { id: userId },
        include: { savedPosts: true }
      }),
      prisma.post.findUnique({ where: { id: postId } })
    ]);

    console.log("User data:", user?.id);
    console.log("Post data:", post?.id);

    if (!user) {
      console.log("User not found in toggleSavePost:", userId);
      return false;
    }

    if (!post) {
      console.log("Post not found in toggleSavePost:", postId);
      return false;
    }

    // Check if post is already saved
    const isCurrentlySaved = user.savedPosts.some(savedPost => savedPost.id === postId);
    console.log("Is post currently saved:", isCurrentlySaved);

    let result;
    if (isCurrentlySaved) {
      // If saved, disconnect it
      console.log("Disconnecting post from user's saved posts");
      
      await prisma.user.update({
        where: { id: userId },
        data: {
          savedPosts: {
            disconnect: { id: postId }
          }
        }
      });
      result = false; // Post is now unsaved
    } else {
      // If not saved, connect it
      console.log("Connecting post to user's saved posts");
      
      await prisma.user.update({
        where: { id: userId },
        data: {
          savedPosts: {
            connect: { id: postId }
          }
        }
      });
      result = true; // Post is now saved
    }
    
    // Verify the update worked
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { savedPosts: true }
    });
    console.log("After update, saved posts count:", updatedUser?.savedPosts.length);
    
    return result;
  } catch (error) {
    console.error('Error in toggleSavePost:', error);
    return false; // Return false on error
  }
}

export async function getSavedPosts(userId: string) {
  try {
    console.log("getSavedPosts called with userId:", userId);
    
    // Get the user with their saved posts
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        savedPosts: {
          include: {
            user: true
          }
        }
      }
    });
    
    console.log("User data in getSavedPosts:", user?.id);

    if (!user) {
      console.log("User not found in getSavedPosts:", userId);
      return []; // Return empty array if user not found
    }
    
    console.log("Found saved posts:", user.savedPosts.length);

    // Map the results to match the expected format
    return user.savedPosts.map(post => ({
      exists: true,
      post: {
        id: post.id,
        userId: post.userId,
        imageUrl: post.imageUrl,
        caption: post.caption,
        createdAt: post.createdAt,
        user: post.user || {
          name: 'Unknown',
          image: null
        }
      }
    }));
  } catch (error) {
    console.error('Error in getSavedPosts:', error);
    return []; // Return empty array on error
  }
}

export async function checkSavedPostsBatch(userId: string, postIds: string[]) {
  try {
    console.log("checkSavedPostsBatch called with userId:", userId);
    console.log("Checking post IDs:", postIds);
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        savedPosts: {
          where: {
            id: {
              in: postIds
            }
          },
          select: {
            id: true
          }
        }
      }
    });
    
    console.log("User data in checkSavedPostsBatch:", user?.id);

    if (!user) {
      console.log("User not found in checkSavedPostsBatch:", userId);
      return new Set(); // Return empty set if user not found
    }
    
    const savedPostIds = user.savedPosts.map(post => post.id);
    console.log("Saved posts in batch:", savedPostIds);
    
    return new Set(savedPostIds);
  } catch (error) {
    console.error('Error in checkSavedPostsBatch:', error);
    return new Set(); // Return empty set on error
  }
} 