'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Skeleton,
  Card,
  CardMedia,
  Button,
  IconButton,
  Stack,
  Divider,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { togglePostLike, checkPostLike } from '@/app/action/likes';
import { toggleFollow, checkFollowing, getFollowersCount, getFollowingCount } from '@/app/action/follows';
import { createComment, getPostComments, toggleCommentLike, checkCommentLike } from '@/app/action/comments';
import EditIcon from '@mui/icons-material/Edit';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  imageUrl: string;
  caption: string | null;
  createdAt: string;
}

interface Profile {
  bio: string | null;
  location: string | null;
  interests: string[];
}

interface User {
  id: string;
  name: string | null;
  image: string | null;
  profile: Profile | null;
  posts: Post[];
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

interface ProfileViewProps {
  userId: string;
  isOwnProfile?: boolean;
}

// Helper function to ensure URLs have a protocol
const getFullUrl = (url: string | null) => {
  if (!url) return '/default-avatar.png'; // fallback if null
  if (url.startsWith('http')) return url;
  return `https://${url}`;
};

// Helper function to ensure comment object matches our interface
const ensureCommentShape = (comment: Partial<Comment>): Comment => {
  if (!comment.id || !comment.content || !comment.userId || !comment.postId) {
    throw new Error('Missing required comment fields');
  }
  
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
    likes: comment.likes,
  };
};

export default function ProfileView({ userId, isOwnProfile = false }: ProfileViewProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  
  // Comment state
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLikes, setCommentLikes] = useState<Set<string>>(new Set());

  const router = useRouter();

  // Get the current user ID from the session
  useEffect(() => {
    if (session?.user?.id) {
      setCurrentUserId(session.user.id);
    }
  }, [session]);

  const handleFollowClick = async () => {
    try {
      console.log("Attempting to toggle follow for user:", userId);
      const result = await toggleFollow(currentUserId, userId);
      console.log("Follow toggled successfully:", result);
      setIsFollowing(result);
      
      // Update followers count
      const newCount = await getFollowersCount(userId);
      setFollowersCount(newCount);
    } catch (error) {
      console.error('Error in handleFollowClick:', error);
    }
  };

  const handleLikeClick = async (postId: string) => {
    try {
      console.log("Attempting to toggle like for post:", postId);
      const result = await togglePostLike(currentUserId, postId);
      console.log("Like toggled successfully:", result);
      
      setLikedPosts(prev => {
        const newLiked = new Set(prev);
        if (result) {
          newLiked.add(postId);
        } else {
          newLiked.delete(postId);
        }
        return newLiked;
      });
    } catch (error) {
      console.error('Error in handleLikeClick:', error);
    }
  };

  const handleSaveClick = (postId: string) => {
    setSavedPosts(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(postId)) {
        newSaved.delete(postId);
      } else {
        newSaved.add(postId);
      }
      return newSaved;
    });
  };
  
  const handleCommentClick = async (postId: string) => {
    setCurrentPostId(postId);
    await loadComments(postId);
    setCommentDialogOpen(true);
  };
  
  const loadComments = async (postId: string) => {
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
  };
  
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !currentPostId) {
      console.log("Missing comment text or post ID");
      return;
    }
    
    try {
      console.log("Attempting to create comment for post:", currentPostId);
      const newComment = await createComment(currentUserId, currentPostId, commentText);
      console.log("Comment created successfully:", newComment);
      
      if (newComment) {
        const commentWithUser = {
          ...newComment,
          user: {
            id: session?.user?.id || '',
            name: session?.user?.name || null,
            email: session?.user?.email || '',
            emailVerified: null,
            image: session?.user?.image || null,
            createdAt: new Date(),
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setUser(data);
        
        // Check if current user is following this profile
        if (currentUserId) {
          const isFollowing = await checkFollowing(currentUserId, userId);
          setIsFollowing(isFollowing);
          
          // Check which posts the current user has liked
          const likedPostIds = new Set<string>();
          for (const post of data.posts || []) {
            const isLiked = await checkPostLike(currentUserId, post.id);
            if (isLiked) {
              likedPostIds.add(post.id);
            }
          }
          setLikedPosts(likedPostIds);
        }
        
        // Get followers and following counts
        const followers = await getFollowersCount(userId);
        const following = await getFollowingCount(userId);
        setFollowersCount(followers);
        setFollowingCount(following);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId, currentUserId]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
        <Box sx={{ py: 4 }}>
          <Skeleton variant="circular" width={150} height={150} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" height={40} width="50%" sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" height={20} width="70%" sx={{ mx: 'auto', mb: 3 }} />
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
        <Typography color="error" align="center" sx={{ py: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
        <Typography align="center" sx={{ py: 4 }}>
          Profile not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
      <Box sx={{ py: 4 }}>
        {/* Profile Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 4, flexWrap: 'wrap' }}>
          <Avatar
            src={getFullUrl(user.image)}
            alt={user.name || 'User'}
            sx={{ width: 150, height: 150 }}
          />
          
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h4">
                {user.name || 'Unnamed User'}
              </Typography>
              {isOwnProfile ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => router.push(`/profil/${userId}/edit`)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<BookmarksIcon />}
                    onClick={() => router.push(`/profil/${userId}/saved/allPosts`)}
                  >
                    Saved Posts
                  </Button>
                </Box>
              ) : (
                <Button
                  variant={isFollowing ? "outlined" : "contained"}
                  onClick={handleFollowClick}
                  sx={{ ml: 2 }}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </Box>

            <Stack
              direction="row"
              spacing={4}
              sx={{ mb: 2 }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box>
                <Typography variant="h6">{user.posts.length}</Typography>
                <Typography color="text.secondary">Posts</Typography>
              </Box>
              <Box>
                <Typography variant="h6">{followersCount}</Typography>
                <Typography color="text.secondary">Followers</Typography>
              </Box>
              <Box>
                <Typography variant="h6">{followingCount}</Typography>
                <Typography color="text.secondary">Following</Typography>
              </Box>
            </Stack>

            {user.profile && (
              <Box>
                {user.profile.bio && (
                  <Typography variant="body1" gutterBottom>
                    {user.profile.bio}
                  </Typography>
                )}
                {user.profile.location && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    📍 {user.profile.location}
                  </Typography>
                )}
                {user.profile.interests.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {user.profile.interests.map((interest, index) => (
                      <Typography
                        key={index}
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          bgcolor: 'primary.light',
                          borderRadius: 1,
                          color: 'white',
                          fontSize: '0.875rem',
                        }}
                      >
                        {interest}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Posts Grid */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Posts
        </Typography>
        <Grid container spacing={2}>
          {user.posts.length > 0 ? (
            user.posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 250,
                      objectFit: 'cover',
                    }}
                    image={post.imageUrl}
                    alt={post.caption || 'Post image'}
                  />
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton 
                        onClick={() => handleLikeClick(post.id)}
                        color={likedPosts.has(post.id) ? "primary" : "default"}
                      >
                        {likedPosts.has(post.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <IconButton 
                        onClick={() => handleCommentClick(post.id)}
                        color="default"
                      >
                        <CommentIcon />
                      </IconButton>
                    </Box>
                    <IconButton 
                      onClick={() => handleSaveClick(post.id)}
                      color={savedPosts.has(post.id) ? "primary" : "default"}
                    >
                      {savedPosts.has(post.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No posts yet
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      
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
    </Container>
  );
}
