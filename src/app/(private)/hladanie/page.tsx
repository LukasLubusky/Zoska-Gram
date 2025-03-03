// src\app\hladanie\page.tsx

import { Container, Typography, Box } from '@mui/material';
import { fetchAllUsers } from '@/app/actions/users';
import UserCard from '@/components/UserCard';

export const metadata = { title: 'Vyhľadávanie | ZoskaGram' };

export default async function SearchPage() {
  const users = await fetchAllUsers();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Vyhľadávanie používateľov
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            image={user.image}
            profile={user.profile}
          />
        ))}
      </Box>
    </Container>
  );
}