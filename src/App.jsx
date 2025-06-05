import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/post" replace />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/dados/:id" element={<PostDetail />} />
        <Route path="*" element={<h2>404 - Página não encontrada</h2>} />
      </Routes>
    </Router>
  );
}
