import React, { useState } from 'react';
import axios from '../axios';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const AuthForm = () => {
  const { action } = useParams();
  const isLogin = action === 'login'; 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  // Handle Snackbar Close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    //email format validation (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbar({ open: true, message: 'Invalid email format. Please enter a valid email address.', severity: 'error' });
      setLoading(false);
      return;
    }
  
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      const response = await axios.post(endpoint, payload);
  
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        navigate('/home');
      } else {
        setSnackbar({ open: true, message: 'Registration successful! Please log in.', severity: 'success' });
        navigate('/auth/login');
      }
    } catch (error) {
      if (error.response && error.response.data.message === 'The email has already been taken.') {
        setSnackbar({ open: true, message: 'This email is already registered. Please log in.', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Registration failed. Please check your details.', severity: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: 'background.paper' }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom color="primary">
            {isLogin ? 'Login' : 'Register'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ style: { color: '#b0bec5' } }}
            />
          )}
          <TextField
            label="Email"
            type="text"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <Button onClick={() => navigate(isLogin ? '/auth/register' : '/auth/login')} sx={{ mt: 2, color: 'secondary.main' }}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
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

export default AuthForm;
