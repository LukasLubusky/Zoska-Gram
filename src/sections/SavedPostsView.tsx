'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getSavedPosts, toggleSavePost } from '@/app/action/saves';
import { togglePostLike, checkPostLikesBatch, getPostLikesCountBatch } from '@/app/action/likes';
import { createComment, getPostComments, toggleCommentLike, checkCommentLike, deleteComment } from '@/app/action/comments';
import { deletePost } from '@/app/action/posts';
import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import PostView from '@/components/PostView';

interface SavedPost {
  exists: boolean;
  post: {
    id: string;
    userId?: string;
    imageUrl?: string;
    caption?: string | null;
    createdAt?: Date;
    user?: {
      id?: string;
      name: string | null;
      image: string | null;
    };
  };
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  likes?: {
    userId: string;
    createdAt: Date;
    id: string;
    commentId: string;
  }[];
}

// Helper function to ensure comment object matches our interface
const ensureCommentShape = (comment: Partial<Comment> & { id: string; content: string; userId: string; postId: string }): Comment => {
  return {
    id: comment.id,
    content: comment.content,
    userId: comment.userId,
    postId: comment.postId,
    user: {
      id: comment.user?.id || '',
      name: comment.user?.name || null,
      email: comment.user?.email || '',
      emailVerified: comment.user?.emailVerified || null,
      image: comment.user?.image || null,
      createdAt: new Date(comment.user?.createdAt || Date.now()),
      updatedAt: new Date(comment.user?.updatedAt || Date.now()),
    },
    createdAt: new Date(comment.createdAt || Date.now()),
    updatedAt: new Date(comment.updatedAt || Date.now()),
    likes: comment.likes || [],
  };
};

export default function SavedPostsView() {
  const { data: session } = useSession();
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Map<string, number>>(new Map());
  const [currentPostId, setCurrentPostId] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLikes, setCommentLikes] = useState<Set<string>>(new Set());
  const [commentsLoaded, setCommentsLoaded] = useState<Set<string>>(new Set());

  // Get the current user ID from the session
  useEffect(() => {
    if (session?.user) {
      const userId = session.user.id;
      if (userId) {
        setCurrentUserId(userId);
      }
    }
  }, [session]);

  // Load saved posts
  useEffect(() => {
    async function loadSavedPosts() {
      if (!currentUserId) return;
      
      try {
        const posts = await getSavedPosts(currentUserId);
        console.log("Loaded saved posts:", posts);
        setSavedPosts(posts);
        
        // Get post IDs for batch operations
        const postIds = posts
          .filter((post: SavedPost) => post.exists)
          .map((post: SavedPost) => post.post.id);
        
        if (postIds.length > 0) {
          // Load likes and like counts in parallel
          type BatchResult = [Set<string>, Map<string, number>];
          const [likedPostIds, postLikeCounts] = await Promise.all([
            checkPostLikesBatch(currentUserId, postIds),
            getPostLikesCountBatch(postIds)
          ]) as BatchResult;
          
          setLikedPosts(likedPostIds);
          setLikeCounts(postLikeCounts);
          
          // Automatically load comments for all posts
          await Promise.all(postIds.map(loadComments));
        }
      } catch (error) {
        console.error('Error loading saved posts:', error);
      }
    }

    loadSavedPosts();
  }, [currentUserId]);

  const loadComments = async (postId: string) => {
    try {
      // Skip if we've already loaded comments for this post
      if (commentsLoaded.has(postId)) {
        return;
      }
      
      console.log("Loading comments for post:", postId);
      const postComments = await getPostComments(postId);
      console.log("Comments loaded:", postComments?.length || 0);
      
      if (postComments) {
        // Add to loaded posts set
        setCommentsLoaded(prev => new Set(prev).add(postId));
        setComments(prev => [...(postComments || []).map(ensureCommentShape), ...prev]);
        
        // Process comment likes
        const likedCommentIds = new Set<string>(commentLikes);
        await Promise.all(postComments.map(async (comment) => {
          const isLiked = await checkCommentLike(currentUserId, comment.id);
          if (isLiked) {
            likedCommentIds.add(comment.id);
          }
        }));
        setCommentLikes(likedCommentIds);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleUnsave = async (postId: string) => {
    try {
      await toggleSavePost(currentUserId, postId);
      setSavedPosts(prev => prev.filter(post => post.post.id !== postId));
    } catch (error) {
      console.error('Error unsaving post:', error);
    }
  };

  const handleLikeClick = async (postId: string) => {
    try {
      const isCurrentlyLiked = likedPosts.has(postId);
      const currentCount = likeCounts.get(postId) || 0;
      
      // Optimistic update
      setLikedPosts(prev => {
        const newLiked = new Set(prev);
        if (isCurrentlyLiked) {
          newLiked.delete(postId);
        } else {
          newLiked.add(postId);
        }
        return newLiked;
      });
      
      setLikeCounts(prev => {
        const newCounts = new Map(prev);
        newCounts.set(postId, isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1);
        return newCounts;
      });

      // Actual API call
      const result = await togglePostLike(currentUserId, postId);
      
      // If the API call fails, revert the optimistic update
      if (result !== !isCurrentlyLiked) {
        setLikedPosts(prev => {
          const newLiked = new Set(prev);
          if (isCurrentlyLiked) {
            newLiked.add(postId);
          } else {
            newLiked.delete(postId);
          }
          return newLiked;
        });
        
        setLikeCounts(prev => {
          const newCounts = new Map(prev);
          newCounts.set(postId, currentCount);
          return newCounts;
        });
      }
    } catch (error) {
      console.error('Error in handleLikeClick:', error);
    }
  };

  const handleCommentClick = async (postId: string) => {
    setCurrentPostId(postId);
    // No need to load comments here as they're loaded automatically
  };

  const handleCommentSubmit = async (content: string) => {
    console.log("Submitting comment for post:", currentPostId, "Content:", content);
    
    // Check if the content includes the post ID in the special format (postId:::content)
    let postIdToUse = currentPostId;
    let contentToSubmit = content.trim();
    
    // Parse special format if present (postId:::content)
    if (contentToSubmit.includes(':::')) {
      const parts = contentToSubmit.split(':::');
      if (parts.length === 2) {
        postIdToUse = parts[0];
        contentToSubmit = parts[1];
        console.log("Extracted post ID from content:", postIdToUse);
      }
    }
    
    if (!contentToSubmit || !postIdToUse || !session?.user) {
      console.log("Missing comment text, post ID, or user session");
      return;
    }
    
    try {
      console.log("Creating comment for post:", postIdToUse);
      const newComment = await createComment(currentUserId, postIdToUse, contentToSubmit);
      console.log("Comment created successfully:", newComment);
      
      if (newComment) {
        // Create a properly typed user object from session data
        const commentWithUser = {
          ...newComment,
          user: {
            id: session.user.id || '',
            name: session.user.name || null,
            email: session.user.email || '',
            emailVerified: null, // We don't have this in the session, so default to null
            image: session.user.image || null,
            createdAt: new Date(), // New comment, so use current time
            updatedAt: new Date(),
          },
          likes: []
        };

        console.log("Shaped comment:", commentWithUser);
        const shapedComment = ensureCommentShape(commentWithUser);
        
        // Update comments with the new comment (optimistic update)
        setComments(prev => [shapedComment, ...prev]);

        // Always fetch fresh comments after a short delay to ensure consistency
        const postIdForRefresh = postIdToUse;
        console.log("Scheduling comment refresh after delay for post:", postIdForRefresh);
        setTimeout(async () => {
          try {
            console.log("Refreshing comments for post:", postIdForRefresh);
            const updatedComments = await getPostComments(postIdForRefresh);
            console.log("Refreshed comments for post", postIdForRefresh, ":", updatedComments);
            
            if (updatedComments) {
              setComments(prev => {
                // Remove old comments for this post
                const filteredComments = prev.filter(c => c.postId !== postIdForRefresh);
                // Add the fresh comments
                return [...updatedComments.map(ensureCommentShape), ...filteredComments];
              });
            }
          } catch (error) {
            console.error('Error fetching updated comments:', error);
          }
        }, 500);
      }
    } catch (error) {
      console.error('Error in handleCommentSubmit:', error);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    try {
      console.log("Toggling like for comment:", commentId);
      const result = await toggleCommentLike(currentUserId, commentId);
      console.log("Comment like result:", result);
      
      setCommentLikes(prev => {
        const newLiked = new Set(prev);
        if (result) {
          newLiked.add(commentId);
        } else {
          newLiked.delete(commentId);
        }
        return newLiked;
      });
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!currentUserId) {
      console.error("No user ID found");
      return;
    }

    try {
      console.log("Deleting comment:", commentId);
      
      // Find the comment we want to delete
      const commentToDelete = comments.find(c => c.id === commentId);
      
      if (!commentToDelete) {
        console.error("Could not find comment:", commentId);
        return;
      }
      
      if (commentToDelete.userId !== currentUserId) {
        console.error("User is not authorized to delete this comment");
        return;
      }
      
      // Optimistic update - remove the comment from UI first
      setComments(prev => prev.filter(c => c.id !== commentId));
      
      // Actually delete the comment
      const result = await deleteComment(commentId, currentUserId);
      console.log("Comment delete result:", result);
      
      // If deletion fails, revert the optimistic update
      if (!result) {
        console.error("Failed to delete comment:", commentId);
        // Refresh comments for the relevant post to revert UI
        const postId = commentToDelete.postId;
        const updatedComments = await getPostComments(postId);
        if (updatedComments) {
          setComments(prev => {
            // Remove old comments for this post
            const filteredComments = prev.filter(c => c.postId !== postId);
            // Add the fresh comments
            return [...updatedComments.map(ensureCommentShape), ...filteredComments];
          });
        }
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!currentUserId) return;
    
    try {
      await deletePost(postId, currentUserId);
      // Remove the post from the local state
      setSavedPosts(prev => prev.filter(post => post.post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Saved Posts
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {savedPosts.map((savedPost) => (
          savedPost.exists ? (
            <Grid item xs={12} key={savedPost.post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: { xs: '90%', sm: '80%', md: '50%', lg: '40%' } }}>
                <PostView
                  post={{
                    id: savedPost.post.id,
                    userId: savedPost.post.userId,
                    imageUrl: savedPost.post.imageUrl || '',
                    caption: savedPost.post.caption || null,
                    createdAt: savedPost.post.createdAt || new Date(),
                    user: {
                      id: savedPost.post.user?.id,
                      name: savedPost.post.user?.name || null,
                      image: savedPost.post.user?.image || null
                    }
                  }}
                  currentUserId={currentUserId}
                  isLiked={likedPosts.has(savedPost.post.id)}
                  likeCount={likeCounts.get(savedPost.post.id) || 0}
                  isSaved={true}
                  onLike={handleLikeClick}
                  onComment={handleCommentClick}
                  onSave={handleUnsave}
                  onDelete={handleDeletePost}
                  comments={comments.filter(comment => comment.postId === savedPost.post.id)}
                  commentLikes={commentLikes}
                  onCommentLike={handleCommentLike}
                  onCommentSubmit={handleCommentSubmit}
                  onCommentDelete={handleCommentDelete}
                />
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} key={savedPost.post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: { xs: '90%', sm: '80%', md: '50%', lg: '40%' } }}>
                <Typography variant="h6" color="text.secondary" align="center" sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
                  This post has been deleted
                </Typography>
              </Box>
            </Grid>
          )
        ))}
        {savedPosts.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" align="center">
              No saved posts yet
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
