import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [bigContent, setBigContent] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setTimeout(() => navigate('/home'), 1200);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create the post. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Create New Blog Post</h1>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Title</label>
            <input
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Summary</label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Full Content (Big Content)</label>
            <textarea
              rows={8}
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black"
              value={bigContent}
              onChange={(e) => setBigContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {loading ? 'Creating…' : 'Create Post'}
          </button>
        </form>

        <button
          className="mt-3 w-full rounded-md border border-black/20 px-4 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5"
          onClick={() => navigate('/home')}
        >
          Back to Home
        </button>

        {snackbar.open && (
          <div className={`mt-4 w-full rounded-md px-3 py-2 text-sm ${snackbar.severity === 'error' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`} onAnimationEnd={handleCloseSnackbar}>
            {snackbar.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
