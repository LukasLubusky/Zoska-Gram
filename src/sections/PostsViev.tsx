// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchPosts } from '@/app/action/posts';
// import { 
//   Box, 
//   Typography, 
//   Card, 
//   CardContent, 
//   CardMedia, 
//   Grid 
// } from '@mui/material';

// interface User {
//   id: string;
//   name: string | null;
//   email: string;
//   emailVerified: Date | null;
//   image: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface Post {
//   id: string;
//   userId: string;
//   imageUrl: string;
//   caption: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   user: User;
// }

// const PostView = () => {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         const fetchedPosts = await fetchPosts();
//         setPosts(fetchedPosts);
//       } catch (error) {
//         console.error('Error loading posts:', error);
//         // Handle error (e.g., show error message to user)
//       }
//     };
//     loadPosts();
//   }, []);

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Posts
//       </Typography>
//       <Grid container spacing={3}>
//         {posts.map((post) => (
//           <Grid item xs={12} sm={6} md={4} key={post.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={post.imageUrl}
//                 alt="Post image"
//               />
//               <CardContent>
//                 {post.caption && (
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     {post.caption}
//                   </Typography>
//                 )}
//                 <Typography variant="body2" color="text.secondary">
//                   Posted by {post.user.name || 'Anonymous'} on {new Date(post.createdAt).toLocaleDateString()}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default PostView;

'use client';

import { useEffect, useState } from 'react';
import { fetchPosts } from '@/app/action/posts';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

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

const PostView = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        // Handle error (e.g., show error message to user)
      }
    };
    loadPosts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Posts
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ 
              width: { 
                xs: '90%',  // 90% width on extra small screens (mobile)
                sm: '80%',  // 80% width on small screens
                md: '50%',  // 50% width on medium screens (tablets)
                lg: '40%'   // 40% width on large screens (desktop)
              },
            }}>
              <CardMedia
                component="img"
                sx={{
                height: { 
                    xs: '200px',  // Height for mobile screens
                    sm: '250px',  // Height for small screens
                    md: '300px',  // Height for medium screens
                    lg: '350px'   // Height for large screens (PC)
                },
                objectFit: 'cover'  // This ensures the image covers the area without stretching
                }}
                image={post.imageUrl}
                alt="Post image"
                />
              <CardContent>
                {post.caption && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {post.caption}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  Posted by {post.user.name || 'Anonymous'} on{' '}
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostView;

