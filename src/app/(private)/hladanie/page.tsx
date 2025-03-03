// src\app\hladanie\page.tsx

'use client';

import { Container, Typography, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import UserCard from '@/components/UserCard';
import { fetchAllUsers } from '@/app/actions/users';


export default function SearchPage() {
  const [users, setUsers] = useState<Array<{
    id: string;
    name: string | null;
    image: string | null;
    profile?: {
      bio: string | null;
      location: string | null;
      avatarUrl: string | null;
    } | null;
  }>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const loadedUsers = await fetchAllUsers();
        setUsers(loadedUsers);
      } catch (error) {
        console.error('Chyba pri načítaní používateľov:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (user.name?.toLowerCase().includes(searchLower) || false) ||
      (user.profile?.location?.toLowerCase().includes(searchLower) || false) ||
      (user.profile?.bio?.toLowerCase().includes(searchLower) || false)
    );
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Vyhľadávanie používateľov
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Hľadať používateľov podľa mena, lokácie alebo bio..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ mt: 2 }}>
        {isLoading ? (
          <Typography color="text.secondary" align="center">
            Načítavam používateľov...
          </Typography>
        ) : filteredUsers.length === 0 ? (
          <Typography color="text.secondary" align="center">
            {searchQuery ? 'Neboli nájdení žiadni používatelia' : 'Žiadni používatelia nie sú k dispozícii'}
          </Typography>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              image={user.image}
              profile={user.profile}
            />
          ))
        )}
      </Box>
    </Container>
  );
}