import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import BlogPostDetail from './components/BlogPostDetail';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  return (
    <Router>
      <ThemeToggle setThemeMode={setThemeMode} />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/auth/:action" element={<AuthForm />} />
        <Route path="/posts/:id" element={<BlogPostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
