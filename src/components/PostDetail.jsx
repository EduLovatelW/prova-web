import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <Container sx={{ mt: 4 }}>
      <CircularProgress />
    </Container>
  );

  if (!post) return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6">Post não encontrado</Typography>
    </Container>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        <Typography variant="body1" paragraph>{post.body}</Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Post ID: {post.id} | User ID: {post.userId}
        </Typography>
        <Button variant="contained" href="/post">Voltar à lista</Button>
      </Paper>
    </Container>
  );
}
