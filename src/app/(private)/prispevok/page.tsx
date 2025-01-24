// // robertweb/src/app/prispevok/page.tsx

// import Typography from '@mui/material/Typography';

// export const metadata = { title: 'Zoznam prispevkov | RobertWeb'};

// export default function PostList() {
//   return (

//       <Typography> Zoznam prispevok </Typography>

      

//   );
// }

// robertweb/src/app/prispevok/page.tsx

import Typography from '@mui/material/Typography';

import PostView from '@/sections/PostsViev'; // Adjust the import path as needed

export const metadata = { title: 'Zoznam prispevkov | RobertWeb' };

export default function PostList() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Zoznam prispevkov
      </Typography>
      <PostView />
    </div>
  );
}
