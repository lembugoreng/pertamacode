import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './theme';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import BlogPostDetail from "./components/BlogPostDetail";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* ✅ Redirect / to /auth/login */}
          <Route path="/" element={<Navigate to="/auth/login" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/auth/:action" element={<AuthForm />} />
          <Route path="/posts/:id" element={<BlogPostDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
