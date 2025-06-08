import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

export default function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Blog de Postagens
          </Typography>
          <Routes>
            <Route path="/" element={<Navigate to="/post" replace />} />
            <Route path="/post" element={<PostList />} />
            <Route path="/dados/:id" element={<PostDetail />} />
            <Route path="*" element={<Typography variant="h6">404 - Página não encontrada</Typography>} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}