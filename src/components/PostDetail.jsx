import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <Container sx={{ mt: 4, textAlign: 'center' }}>
      <CircularProgress />
    </Container>
  );

  if (!post || Object.keys(post).length === 0) return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#f00' }}>
        Post não encontrado
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/post')}>
        Voltar à lista
      </Button>
    </Container>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff' }}>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        <Typography variant="body1" paragraph>{post.body}</Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Post ID: {post.id} | User ID: {post.userId}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/post')} color="primary">
          Voltar à lista
        </Button>
      </Paper>
    </Container>
  );
}
