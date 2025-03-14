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
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

export default function SearchView() {
  const router = useRouter();
  const { data: session } = useSession();
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
        
        // Organize users by first letter of name
        const organizedUsers = new Map<string, User[]>();
        data.forEach((user: User) => {
          const firstLetter = user.name?.charAt(0)?.toUpperCase() || '?';
          if (!organizedUsers.has(firstLetter)) {
            organizedUsers.set(firstLetter, []);
          }
          organizedUsers.get(firstLetter)?.push(user);
        });
        
        // Convert the Map to an array and sort it
        const organizedUsersArray = Array.from(organizedUsers.entries())
          .sort((a, b) => a[0].localeCompare(b[0]))
          .flatMap(entry => entry[1]);

        // Move current user to the front if they exist
        const userId = session?.user?.id;
        if (userId) {
          const currentUserIndex = organizedUsersArray.findIndex(user => user.id === userId);
          if (currentUserIndex !== -1) {
            const [currentUser] = organizedUsersArray.splice(currentUserIndex, 1);
            organizedUsersArray.unshift(currentUser);
          }
        }
        
        setUsers(organizedUsersArray);
        setFilteredUsers(organizedUsersArray);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [session?.user?.id]);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredUsers(users); // Keep original order when no search
      return;
    }
    const filtered = users.filter((user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleUserClick = (userId: string) => {
    if (userId === session?.user?.id) {
      router.push('/profil'); // Go to /profil for own profile
    } else {
      router.push(`/profil/${userId}`); // Go to /profil/[id] for other profiles
    }
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
                  // Highlight current user's entry
                  ...(user.id === session?.user?.id && {
                    backgroundColor: 'action.selected',
                  }),
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.image || '/default-avatar.png'} alt={user.name || 'User'} />
                </ListItemAvatar>
                <ListItemText 
                  primary={user.name || 'Unnamed User'} 
                  secondary={user.id === session?.user?.id ? '(You)' : ''}
                />
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
