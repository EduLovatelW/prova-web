import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Container sx={{ mt: 4, textAlign: 'center' }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Blog de Postagens</Typography>
      <Paper>
        <List>
          {posts.map(post => (
            <ListItemButton
              key={post.id}
              component="a"
              href={`/dados/${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary={post.title} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
