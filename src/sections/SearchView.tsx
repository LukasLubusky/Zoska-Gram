'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Container,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

export default function SearchView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/search');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleUserClick = (userId: string) => {
    router.push(`/profil/${userId}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Vyhladavanie používateľov
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Vyhľadať používateľa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 4 }}
        />

        {isLoading && (
          <Typography align="center">Loading...</Typography>
        )}

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {!isLoading && !error && (
          <List>
            {filteredUsers.map((user) => (
              <ListItem
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  borderRadius: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.image || '/default-avatar.png'} alt={user.name || 'User'} />
                </ListItemAvatar>
                <ListItemText primary={user.name || 'Unnamed User'} />
              </ListItem>
            ))}
            {filteredUsers.length === 0 && (
              <Typography color="text.secondary" align="center">
                Neboli nájdení žiadni používatelia
              </Typography>
            )}
          </List>
        )}
      </Box>
    </Container>
  );
}
