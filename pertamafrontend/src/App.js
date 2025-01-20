import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import BlogPostDetail from "./components/BlogPostDetail";
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'light'
        ? { background: { default: '#ffffff' }, text: { primary: '#000' } }
        : { background: { default: '#121212' }, text: { primary: '#fff' } }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
};

export default App;
