import React, { useState } from 'react';
import axios from '../axios';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [bigContent, setBigContent] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title || !content || !bigContent) {
      setSnackbar({ open: true, message: 'All fields are required', severity: 'error' });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/blog-posts',
        { title, content, big_content: bigContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnackbar({ open: true, message: 'Post created successfully!', severity: 'success' });
      setTimeout(() => navigate('/home'), 2000);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create the post. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle closing of the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: 'background.paper' }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom color="primary">
            Create New Blog Post
          </Typography>
        </Box>

        <form onSubmit={handleCreatePost}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            sx={{
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#90caf9',
                },
                '&:hover fieldset': {
                  borderColor: '#64b5f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#42a5f5',
                },
              },
            }}
          />
          <TextField
            label="Summary"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            sx={{
              textarea: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#90caf9',
                },
                '&:hover fieldset': {
                  borderColor: '#64b5f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#42a5f5',
                },
              },
            }}
          />
          <TextField
            label="Full Content (Big Content)"
            fullWidth
            margin="normal"
            multiline
            rows={8}
            value={bigContent}
            onChange={(e) => setBigContent(e.target.value)}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            sx={{
              textarea: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#90caf9',
                },
                '&:hover fieldset': {
                  borderColor: '#64b5f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#42a5f5',
                },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Post'}
          </Button>
        </form>

        {/* ✅ Back Button */}
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/home')}
        >
          Back to Home
        </Button>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatePost;
