'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { fetchPosts, deletePost } from '@/app/action/posts';
import { togglePostLike, checkPostLikesBatch, getPostLikesCountBatch } from '@/app/action/likes';
import { createComment, getPostComments, toggleCommentLike, checkCommentLike, deleteComment } from '@/app/action/comments';
import { toggleSavePost, checkSavedPostsBatch } from '@/app/action/saves';
import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import PostView from '@/components/PostView';

interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
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

export default function PostsView() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Map<string, number>>(new Map());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  
  // Comment state
  const [postComments, setPostComments] = useState<Map<string, Comment[]>>(new Map());
  const [commentLikes, setCommentLikes] = useState<Set<string>>(new Set());
  const [currentPostId, setCurrentPostId] = useState<string>('');

  // Get the current user ID from the session
  useEffect(() => {
    if (session?.user) {
      console.log("Session data:", session);
      const userId = session.user.id;
      console.log("Found user ID:", userId);
      
      if (userId) {
        setCurrentUserId(userId);
      } else {
        console.error("Could not find user ID in session:", session);
      }
    }
  }, [session]);

  // Load posts and their like/save status in batch
  useEffect(() => {
    async function loadPostsAndStatus() {
      try {
        console.log("Loading posts and status, current user ID:", currentUserId);
        const fetchedPosts = await fetchPosts();
        console.log("Posts loaded:", fetchedPosts.length);
        setPosts(fetchedPosts);

        if (currentUserId && fetchedPosts.length > 0) {
          const postIds = fetchedPosts.map(post => post.id);
          
          // Load likes, saves, and comments in parallel
          type LikesResult = [Set<string>, Map<string, number>, Set<string>];
          const [likedPostIds, postLikeCounts, savedPostIds] = await Promise.all([
            checkPostLikesBatch(currentUserId, postIds),
            getPostLikesCountBatch(postIds),
            checkSavedPostsBatch(currentUserId, postIds)
          ]) as LikesResult;

          setLikedPosts(likedPostIds);
          setLikeCounts(postLikeCounts);
          setSavedPosts(savedPostIds);

          // Load comments for all posts
          const commentsMap = new Map<string, Comment[]>();
          const commentLikesSet = new Set<string>();

          await Promise.all(postIds.map(async (postId) => {
            try {
              const postComments = await getPostComments(postId);
              if (postComments) {
                commentsMap.set(postId, postComments.map(ensureCommentShape));
                
                // Check likes for each comment
                await Promise.all(postComments.map(async (comment) => {
                  const isLiked = await checkCommentLike(currentUserId, comment.id);
                  if (isLiked) {
                    commentLikesSet.add(comment.id);
                  }
                }));
              }
            } catch (error) {
              console.error(`Error loading comments for post ${postId}:`, error);
            }
          }));

          setPostComments(commentsMap);
          setCommentLikes(commentLikesSet);
        }
      } catch (error) {
        console.error('Error loading posts and status:', error);
      }
    }
    
    loadPostsAndStatus();
  }, [currentUserId]);
  
  const handleLikeClick = useCallback(async (postId: string) => {
    if (!session) {
      console.error("No session found");
      return;
    }

    if (!currentUserId) {
      console.error("No user ID found in session:", session);
      return;
    }

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
        newCounts.set(postId, isCurrentlyLiked ? currentCount - 1 : currentCount + 1);
        return newCounts;
      });

      // Actual API call
      console.log("Attempting to toggle like for post:", postId, "by user:", currentUserId);
      const result = await togglePostLike(currentUserId, postId);
      console.log("Like result:", result);
      
      // If the API call fails or returns unexpected result, revert the optimistic update
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
      // Revert optimistic update on error
      const isCurrentlyLiked = likedPosts.has(postId);
      const currentCount = likeCounts.get(postId) || 0;
      
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
  }, [session, currentUserId, likedPosts, likeCounts]);
  
  // Handle setting current post ID for comments
  const handleCommentClick = useCallback(async (postId: string) => {
    console.log("Setting current post ID for comment dialog:", postId);
    setCurrentPostId(postId);
    
    // Load comments for this post if they haven't been loaded yet
    if (!postComments.has(postId)) {
      try {
        console.log("Loading comments for post:", postId);
        const comments = await getPostComments(postId);
        console.log("Comments loaded:", comments);
        
        if (comments) {
          setPostComments(prev => {
            const newMap = new Map(prev);
            newMap.set(postId, comments.map(ensureCommentShape));
            return newMap;
          });
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    }
  }, [postComments]);

  // Handle comment submission
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
    
    if (!postIdToUse || !contentToSubmit || !session?.user) {
      console.log("Missing comment text, post ID, or user session");
      return;
    }
    
    if (!currentUserId) {
      console.log("User ID not found");
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
            emailVerified: null,
            image: session.user.image || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          likes: []
        };

        console.log("Shaped comment:", commentWithUser);
        const shapedComment = ensureCommentShape(commentWithUser);
        
        // Update the comments map with the new comment (optimistic update)
        setPostComments(prev => {
          const newMap = new Map(prev);
          const currentComments = Array.from(newMap.get(postIdToUse) || []);
          const updatedComments = [shapedComment, ...currentComments];
          console.log("Updated comments:", updatedComments);
          newMap.set(postIdToUse, updatedComments);
          return newMap;
        });

        // Always fetch fresh comments after a short delay to ensure consistency
        // IMPORTANT: Store the postId in a constant to prevent race conditions
        const postIdForRefresh = postIdToUse;
        console.log("Scheduling comment refresh after delay for post:", postIdForRefresh);
        setTimeout(async () => {
          try {
            console.log("Refreshing comments for post:", postIdForRefresh);
            const updatedComments = await getPostComments(postIdForRefresh);
            console.log("Refreshed comments for post", postIdForRefresh, ":", updatedComments);
            
            if (updatedComments) {
              setPostComments(prev => {
                const newMap = new Map(prev);
                newMap.set(postIdForRefresh, updatedComments.map(ensureCommentShape));
                return newMap;
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
      
      // Find which post this comment belongs to
      let postId = '';
      let commentToDelete: Comment | undefined;
      
      postComments.forEach((comments, pId) => {
        const found = comments.find(c => c.id === commentId);
        if (found) {
          postId = pId;
          commentToDelete = found;
        }
      });
      
      if (!postId || !commentToDelete) {
        console.error("Could not find post for comment:", commentId);
        return;
      }
      
      if (commentToDelete.userId !== currentUserId) {
        console.error("User is not authorized to delete this comment");
        return;
      }
      
      // Optimistic update - remove the comment from UI first
      setPostComments(prev => {
        const newMap = new Map(prev);
        const currentComments = Array.from(newMap.get(postId) || []);
        const updatedComments = currentComments.filter(c => c.id !== commentId);
        newMap.set(postId, updatedComments);
        return newMap;
      });
      
      // Actually delete the comment
      const result = await deleteComment(commentId, currentUserId);
      console.log("Comment delete result:", result);
      
      // If deletion fails, revert the optimistic update
      if (!result) {
        console.error("Failed to delete comment:", commentId);
        // Refresh comments to revert UI
        const updatedComments = await getPostComments(postId);
        if (updatedComments) {
          setPostComments(prev => {
            const newMap = new Map(prev);
            newMap.set(postId, updatedComments.map(ensureCommentShape));
            return newMap;
          });
        }
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleSaveClick = async (postId: string) => {
    if (!session) {
      console.error("No session found");
      return;
    }

    if (!currentUserId) {
      console.error("No user ID found in session:", session);
      return;
    }

    try {
      const isCurrentlySaved = savedPosts.has(postId);

      // Optimistic update
      setSavedPosts(prev => {
        const newSaved = new Set(prev);
        if (isCurrentlySaved) {
          newSaved.delete(postId);
        } else {
          newSaved.add(postId);
        }
        return newSaved;
      });

      // Actual API call
      console.log("Attempting to toggle save for post:", postId, "by user:", currentUserId);
      const result = await toggleSavePost(currentUserId, postId);
      console.log("Save result:", result);
      
      // If the API call fails, revert the optimistic update
      if (result !== !isCurrentlySaved) {
        setSavedPosts(prev => {
          const newSaved = new Set(prev);
          if (isCurrentlySaved) {
            newSaved.add(postId);
          } else {
            newSaved.delete(postId);
          }
          return newSaved;
        });
      }
    } catch (error) {
      console.error('Error in handleSaveClick:', error);
      // Revert optimistic update on error
      const isCurrentlySaved = savedPosts.has(postId);
      setSavedPosts(prev => {
        const newSaved = new Set(prev);
        if (isCurrentlySaved) {
          newSaved.add(postId);
        } else {
          newSaved.delete(postId);
        }
        return newSaved;
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!currentUserId) return;
    
    try {
      await deletePost(postId, currentUserId);
      // Remove the post from the local state
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default', // uses the theme's background setting
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Posts
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {posts.map((post) => (
          <Grid
            item
            xs={12}
            key={post.id}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box sx={{ width: { xs: '90%', sm: '80%', md: '50%', lg: '40%' } }}>
              <PostView
                post={post}
                currentUserId={currentUserId}
                isLiked={likedPosts.has(post.id)}
                likeCount={likeCounts.get(post.id) || 0}
                isSaved={savedPosts.has(post.id)}
                onLike={handleLikeClick}
                onComment={handleCommentClick}
                onSave={handleSaveClick}
                onDelete={post.userId === currentUserId ? handleDeletePost : undefined}
                comments={postComments.get(post.id) || []}
                commentLikes={commentLikes}
                onCommentLike={handleCommentLike}
                onCommentSubmit={handleCommentSubmit}
                onCommentDelete={handleCommentDelete}
              />
            </Box>
          </Grid>
        ))}
        {posts.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" align="center">
              No posts yet
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
