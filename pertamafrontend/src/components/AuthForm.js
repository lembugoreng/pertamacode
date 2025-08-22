import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AuthForm = () => {
  const { action } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = action === 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/home');
    }
  }, [location, navigate]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbar({ open: true, message: 'Invalid email format.', severity: 'error' });
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
      setSnackbar({ open: true, message: 'Authentication failed.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white px-4">
      <div className="w-full max-w-md border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900 rounded-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">{isLogin ? 'Login' : 'Register'}</h1>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">Minimalist blog access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-black/40 focus:border-black dark:border-white/10 dark:bg-black dark:placeholder:text-white/40"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-black/40 focus:border-black dark:border-white/10 dark:bg-black dark:placeholder:text-white/40"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-black/40 focus:border-black dark:border-white/10 dark:bg-black dark:placeholder:text-white/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {loading ? 'Please wait…' : isLogin ? 'Login' : 'Register'}
          </button>

          <button
            type="button"
            onClick={() => window.location.href = 'http://localhost:8000/api/auth/github/redirect'}
            className="w-full rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
          >
            Continue with GitHub
          </button>
        </form>

        <button
          onClick={() => navigate(isLogin ? '/auth/register' : '/auth/login')}
          className="mt-4 w-full text-center text-sm text-black/70 hover:underline dark:text-white/70"
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>

        {snackbar.open && (
          <div
            className={`mt-4 w-full rounded-md px-3 py-2 text-sm ${snackbar.severity === 'error' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`}
            role="alert"
            onAnimationEnd={handleCloseSnackbar}
          >
            {snackbar.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
