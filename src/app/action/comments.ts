"use server";

// Import Prisma client
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

// Create a new comment
export const createComment = async (userId: string, postId: string, content: string) => {
  try {
    // First check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    
    if (!post) {
      throw new Error("Post not found");
    }
    
    // Create the comment with user information
    const newComment = await prisma.comment.create({
      data: {
        userId,
        postId,
        content,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    
    if (!newComment) {
      throw new Error("Failed to create comment");
    }
    
    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error; // Throw error to handle it in the component
  }
};

// Get comments for a post
export const getPostComments = async (postId: string) => {
  try {
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
    
    return comments;
  } catch (error) {
    console.error("Error getting post comments:", error);
    return []; // Return empty array on error
  }
};

// Delete a comment
export const deleteComment = async (commentId: string, userId: string) => {
  try {
    // First check if the comment belongs to the user
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment || comment.userId !== userId) {
      return false; // Not authorized to delete
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false; // Return false on error
  }
};

// Toggle like on a comment
export const toggleCommentLike = async (userId: string, commentId: string) => {
  try {
    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    
    if (!comment) {
      console.error("Comment not found:", commentId);
      return false;
    }
    
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
      return false; // Return false to indicate comment is now unliked
    } else {
      // Like: create a new like
      await prisma.commentLike.create({
        data: {
          userId,
          commentId,
        },
      });
      return true; // Return true to indicate comment is now liked
    }
  } catch (error) {
    console.error("Error toggling comment like:", error);
    return false; // Return false on error
  }
};

// Check if a user has liked a comment
export const checkCommentLike = async (userId: string, commentId: string) => {
  try {
    const like = await prisma.commentLike.findFirst({
      where: {
        userId,
        commentId,
      },
    });
    
    return !!like; // Return true if like exists, false otherwise
  } catch (error) {
    console.error("Error checking comment like:", error);
    return false; // Return false on error
  }
};

// Get likes count for a comment
export const getCommentLikesCount = async (commentId: string) => {
  try {
    const count = await prisma.commentLike.count({
      where: {
        commentId,
      },
    });
    
    return count;
  } catch (error) {
    console.error("Error getting comment likes count:", error);
    return 0; // Return 0 on error
  }
}; 