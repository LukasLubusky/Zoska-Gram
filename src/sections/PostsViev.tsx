'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { fetchPosts } from '@/app/action/posts';
import { togglePostLike, checkPostLikesBatch, getPostLikesCountBatch } from '@/app/action/likes';
import { createComment, getPostComments, toggleCommentLike, checkCommentLike } from '@/app/action/comments';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardHeader,
  Avatar,
  IconButton,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';

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

// Helper function to ensure URLs have a protocol
const getFullUrl = (url: string | null) => {
  if (!url) return '/default-avatar.png'; // fallback if null
  // If the url starts with 'http', assume it's correct.
  if (url.startsWith('http')) return url;
  // Otherwise, prepend 'https://'
  return `https://${url}`;
};

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
  
  // Comment state
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLikes, setCommentLikes] = useState<Set<string>>(new Set());

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
          
          // Load likes in parallel
          type LikesResult = [Set<string>, Map<string, number>];
          const [likedPostIds, postLikeCounts] = await Promise.all([
            checkPostLikesBatch(currentUserId, postIds),
            getPostLikesCountBatch(postIds)
          ]) as LikesResult;

          setLikedPosts(likedPostIds);
          setLikeCounts(postLikeCounts);
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
  
  const loadComments = useCallback(async (postId: string) => {
    try {
      console.log("Loading comments for post:", postId);
      const postComments = await getPostComments(postId);
      console.log("Comments loaded:", postComments?.length || 0);
      setComments((postComments || []).map(ensureCommentShape));
      
      const likedCommentIds = new Set<string>();
      for (const comment of postComments || []) {
        const isLiked = await checkCommentLike(currentUserId, comment.id);
        if (isLiked) {
          likedCommentIds.add(comment.id);
        }
      }
      setCommentLikes(likedCommentIds);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }, [currentUserId]);
  
  const handleCommentClick = useCallback(async (postId: string) => {
    setCurrentPostId(postId);
    await loadComments(postId);
    setCommentDialogOpen(true);
  }, [loadComments]);
  
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !currentPostId || !session?.user) {
      console.log("Missing comment text, post ID, or user session");
      return;
    }
    
    try {
      console.log("Attempting to create comment for post:", currentPostId);
      const newComment = await createComment(currentUserId, currentPostId, commentText);
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
          }
        };
        setComments(prev => [ensureCommentShape(commentWithUser), ...prev]);
        setCommentText('');
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

  // Memoize rendered posts for performance
  const renderedPosts = useMemo(
    () =>
      posts.map((post) => (
        <Grid
          item
          xs={12}
          key={post.id}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card
            sx={{
              width: { xs: '90%', sm: '80%', md: '50%', lg: '40%' },
              boxShadow: 3,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={getFullUrl(post.user.image)}
                  alt={post.user.name || 'Anonymous'}
                  sx={{ width: 40, height: 40 }}
                />
              }
              title={post.user.name || 'Anonymous'}
              subheader={`Posted on ${new Date(
                post.createdAt
              ).toLocaleDateString()}`}
              sx={{ bgcolor: 'background.paper', p: 1 }}
            />
            <CardMedia
              component="img"
              sx={{
                height: { xs: 200, sm: 250, md: 300, lg: 350 },
                objectFit: 'cover',
              }}
              image={post.imageUrl}
              alt="Post image"
            />
            <CardContent sx={{ p: 2 }}>
              {post.caption && (
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ mb: 1, fontStyle: 'italic' }}
                >
                  {post.caption}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                {`Posted by ${post.user.name || 'Anonymous'}`}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
              <Box>
                <IconButton 
                  onClick={() => handleLikeClick(post.id)}
                  color={likedPosts.has(post.id) ? "primary" : "default"}
                >
                  {likedPosts.has(post.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                  {likeCounts.get(post.id) || 0} likes
                </Typography>
                <IconButton 
                  onClick={() => handleCommentClick(post.id)}
                  color="default"
                >
                  <CommentIcon />
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      )),
    [posts, likedPosts, likeCounts, handleLikeClick, handleCommentClick]
  );

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
        {renderedPosts}
      </Grid>
      
      {/* Comments Dialog */}
      <Dialog 
        open={commentDialogOpen} 
        onClose={() => setCommentDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent dividers>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ListItem 
                  key={comment.id}
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      onClick={() => handleCommentLike(comment.id)}
                      color={commentLikes.has(comment.id) ? "primary" : "default"}
                    >
                      {commentLikes.has(comment.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={getFullUrl(comment.user?.image)} alt={comment.user?.name || 'User'} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.user?.name || 'Anonymous'}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {comment.content}
                        </Typography>
                        {' — '}
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No comments yet. Be the first to comment!" />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            size="small"
          />
          <IconButton 
            color="primary" 
            onClick={handleCommentSubmit}
            disabled={!commentText.trim()}
          >
            <SendIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}






