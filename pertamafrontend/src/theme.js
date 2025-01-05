import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue
    },
    secondary: {
      main: '#e0e0e0', // Soft grey/white for secondary elements
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Slightly lighter dark for cards
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0bec5', // Grey text
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Disable uppercase text for buttons
    },
  },
});

export default darkTheme;
