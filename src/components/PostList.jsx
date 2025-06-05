import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  CircularProgress,
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

  const handleClick = (id) => {
    window.open(`/dados/${id}`, '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Lista de Posts</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper>
          <List>
            {posts.map(post => (
              <ListItem
                button
                key={post.id}
                onClick={() => handleClick(post.id)}
                divider
              >
                <ListItemText
                  primary={post.title}
                  secondary={`Post ID: ${post.id}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}
