// Zoska-Gram/src/app/pridat/page.tsx

import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import AddPostView from '@/sections/AddPostView';

export const metadata = { title: 'Pridanie prispevku | Zoska-Gram'};

export default function AddPost() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom> 
        Pridanie prispevku 
      </Typography>
      <AddPostView />
    </Container>
  );
}