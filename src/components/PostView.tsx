'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// Helper function to ensure URLs have a protocol
const getFullUrl = (url: string | null) => {
  if (!url) return '/default-avatar.png'; // fallback if null
  // If the url starts with 'http', assume it's correct.
  if (url.startsWith('http')) return url;
  // Otherwise, prepend 'https://'
  return `https://${url}`;
};

interface User {
  id?: string;
  name: string | null;
  email?: string;
  emailVerified?: Date | null;
  image: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;
  user: User;
  likes?: {
    userId: string;
    createdAt: Date;
    id: string;
    commentId: string;
  }[];
}

interface PostViewProps {
  post: {
    id: string;
    userId?: string;
    imageUrl: string;
    caption?: string | null;
    createdAt: Date;
    updatedAt?: Date;
    user: User;
  };
  currentUserId: string;
  isLiked: boolean;
  likeCount?: number;
  isSaved: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onSave: (postId: string) => void;
  onDelete?: (postId: string) => void;
  comments?: Comment[];
  commentLikes?: Set<string>;
  commentLikeCounts?: Map<string, number>;
  onCommentLike?: (commentId: string) => void;
  onCommentSubmit?: (content: string) => void;
}

const PostView: React.FC<PostViewProps> = ({
  post,
  currentUserId,
  isLiked,
  likeCount = 0,
  isSaved,
  onLike,
  onComment,
  onSave,
  onDelete,
  comments = [],
  commentLikes = new Set(),
  commentLikeCounts = new Map(),
  onCommentLike,
  onCommentSubmit,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isMenuOpen = Boolean(menuAnchorEl);
  const isOwnPost = post.userId === currentUserId;

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDeletePost = () => {
    if (onDelete) {
      onDelete(post.id);
      handleMenuClose();
    }
  };

  const handleCommentClick = () => {
    onComment(post.id);
    setCommentDialogOpen(true);
  };

  // Handler for dialog comments
  const handleDialogCommentSubmit = () => {
    if (commentText.trim() && onCommentSubmit) {
      onComment(post.id); // Set current post ID first
      onCommentSubmit(commentText);
      setCommentText('');
    }
  };

  // Handler for underpost comments - using EXACT same implementation as dialog
  const handleUnderpostCommentSubmit = () => {
    if (commentText.trim() && onCommentSubmit) {
      console.log("Underpost comment submit for post:", post.id);
      // First set the current post ID
      onComment(post.id);
      // Then submit the comment with the post ID explicitly included
      onCommentSubmit(`${post.id}:::${commentText}`);
      setCommentText('');
    }
  };

  return (
    <Card sx={{
      width: '100%',
      boxShadow: 3,
      borderRadius: 2,
      overflow: 'hidden',
    }}>
      <CardHeader
        avatar={
          <Avatar
            src={getFullUrl(post.user.image)}
            alt={post.user.name || 'Anonymous'}
            sx={{ width: 40, height: 40 }}
            imgProps={{ referrerPolicy: "no-referrer" }}
          />
        }
        title={post.user.name || 'Anonymous'}
        subheader={`Posted on ${new Date(post.createdAt).toLocaleDateString()}`}
        action={
          isOwnPost && onDelete && (
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          )
        }
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
            onClick={() => onLike(post.id)}
            color={isLiked ? "primary" : "default"}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          {likeCount !== undefined && (
            <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
              {likeCount}
            </Typography>
          )}
          <IconButton 
            onClick={handleCommentClick}
            color="default"
          >
            <CommentIcon />
          </IconButton>
        </Box>
        <IconButton
          onClick={() => onSave(post.id)}
          color={isSaved ? "primary" : "default"}
        >
          {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>

      {/* Inline Comments Section */}
      <Box sx={{ px: 2, pb: 2 }}>
        {/* Comments Display Area */}
        {comments.length > 0 && (
          <Box 
            sx={{ 
              maxHeight: '200px', 
              overflowY: 'auto', 
              mb: 2,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
              },
            }}
          >
            <List disablePadding>
              {comments.map((comment) => (
                <ListItem 
                  key={comment.id}
                  alignItems="flex-start"
                  secondaryAction={
                    onCommentLike && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          edge="end" 
                          onClick={() => onCommentLike(comment.id)}
                          color={commentLikes.has(comment.id) ? "primary" : "default"}
                          size="small"
                        >
                          {commentLikes.has(comment.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        {commentLikeCounts.get(comment.id) !== undefined && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            component="span" 
                            sx={{ 
                              position: 'absolute',
                              right: 8,
                              top: '50%',
                              transform: 'translateY(-50%)'
                            }}
                          >
                            {commentLikeCounts.get(comment.id)}
                          </Typography>
                        )}
                      </Box>
                    )
                  }
                  sx={{ 
                    px: 0, 
                    py: 1,
                    pr: onCommentLike ? (commentLikeCounts.get(comment.id) ? '72px' : '48px') : 0 
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={getFullUrl(comment.user?.image)} 
                      alt={comment.user?.name || 'User'}
                      sx={{ width: 32, height: 32 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" component="span">
                        {comment.user?.name || 'Anonymous'}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'inline' }}
                        >
                          {comment.content}
                        </Typography>
                        {' · '}
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Comment Input Field */}
        {onCommentSubmit && (
          <Box 
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            className="under-post-comment-form"
            data-post-id={post.id}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Comment"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              size="small"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  console.log("Enter key pressed for post:", post.id);
                  onComment(post.id); // Set current post ID first
                  setTimeout(() => handleUnderpostCommentSubmit(), 50); // Add a small delay
                }
              }}
            />
            <IconButton 
              color="primary" 
              onClick={() => {
                console.log("Click submit for post:", post.id);
                onComment(post.id); // Set current post ID first
                setTimeout(() => handleUnderpostCommentSubmit(), 50); // Add a small delay
              }}
              disabled={!commentText.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Post Options Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleDeletePost} sx={{ color: 'error.main' }}>
          Delete Post
        </MenuItem>
      </Menu>

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
                    onCommentLike && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          edge="end" 
                          onClick={() => onCommentLike(comment.id)}
                          color={commentLikes.has(comment.id) ? "primary" : "default"}
                          size="small"
                        >
                          {commentLikes.has(comment.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        {commentLikeCounts.get(comment.id) !== undefined && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            component="span" 
                            sx={{ 
                              position: 'absolute',
                              right: 8,
                              top: '50%',
                              transform: 'translateY(-50%)'
                            }}
                          >
                            {commentLikeCounts.get(comment.id)}
                          </Typography>
                        )}
                      </Box>
                    )
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
        {onCommentSubmit && (
          <DialogActions sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              size="small"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onComment(post.id); // Set current post ID first
                  handleDialogCommentSubmit();
                }
              }}
            />
            <IconButton
              color="primary"
              onClick={() => {
                onComment(post.id); // Set current post ID first
                handleDialogCommentSubmit();
              }}
              disabled={!commentText.trim()}
            >
              <SendIcon />
            </IconButton>
          </DialogActions>
        )}
      </Dialog>
    </Card>
  );
};

export default PostView;