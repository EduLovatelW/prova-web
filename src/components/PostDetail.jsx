import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Box,
} from '@mui/material';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingPost(true);
    setError(null);
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoadingPost(false);
        if (res.data && res.data.userId) {
          setLoadingUser(true);
          // Buscar dados do usuário depois que post carregar
          axios.get(`https://jsonplaceholder.typicode.com/users/${res.data.userId}`)
            .then(userRes => {
              setUser(userRes.data);
              setLoadingUser(false);
            })
            .catch(err => {
              console.error("Erro ao buscar usuário:", err);
              setLoadingUser(false);
            });
        }
      })
      .catch(err => {
        console.error("Erro ao buscar post:", err);
        setError("Post não encontrado");
        setLoadingPost(false);
      });
  }, [id]);

  if (loadingPost) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button variant="contained" onClick={() => navigate('/post')} sx={{ mt: 2 }}>
          Voltar à lista
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff' }}>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        <Typography variant="body1" paragraph>{post.body}</Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Post ID: {post.id}
        </Typography>

        {loadingUser && <Typography>Carregando dados do usuário...</Typography>}

        {user && (
          <Box sx={{ mt: 2, p: 2, border: '1px solid #444', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Informações do Usuário</Typography>
            <Typography><strong>Nome:</strong> {user.name}</Typography>
            <Typography><strong>Username:</strong> {user.username}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>Telefone:</strong> {user.phone}</Typography>
            <Typography><strong>Website:</strong> {user.website}</Typography>
          </Box>
        )}

        <Button variant="contained" onClick={() => navigate('/post')} sx={{ mt: 3 }}>
          Voltar à lista
        </Button>
      </Paper>
    </Container>
  );
}
