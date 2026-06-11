import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2fbf71',
      light: '#78e0a4',
      dark: '#147a48',
    },
    secondary: {
      main: '#f5c84c',
      light: '#ffe08a',
      dark: '#b98710',
    },
    background: {
      default: '#091117',
      paper: '#111c24',
    },
    text: {
      primary: '#f4f7f2',
      secondary: '#b8c7bd',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: 'clamp(2rem, 3.2vw, 4rem)',
      fontWeight: 800,
      lineHeight: 1,
    },
    h2: {
      fontSize: 'clamp(1.35rem, 1.8vw, 2rem)',
      fontWeight: 800,
      lineHeight: 1.1,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 800,
      lineHeight: 1.2,
    },
    button: {
      fontWeight: 800,
      textTransform: 'none',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})
