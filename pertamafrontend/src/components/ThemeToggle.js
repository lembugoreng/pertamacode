import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggle = ({ setThemeMode }) => {
  const handleToggle = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <IconButton onClick={handleToggle} color="inherit" sx={{ position: 'absolute', right: 20, top: 20 }}>
      {localStorage.getItem('theme') === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
