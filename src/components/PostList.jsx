import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActionArea,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setPosts(res.data.slice(0, 21))) // 21 posts para 7 linhas completas
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, px: 3 }}>
      
      <Typography
        variant="h4"
        gutterBottom
        sx={{ 
          textAlign: 'center', 
          color: '#fff',
          mb: 5
        }}
      >
        Prova Web - Post
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={post.id}>
            <Card sx={{ 
              width: '100%', 
              height: 280,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}>
              <CardActionArea 
                component={Link} 
                to={`/dados/${post.id}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  p: 2
                }}
              >
                <CardContent sx={{ p: 0, width: '100%' }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      mb: 2,
                      color: 'primary.main'
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: '1.6'
                    }}
                  >
                    {post.body}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}