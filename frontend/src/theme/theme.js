import { createTheme } from '@mui/material/styles';

// 1. Vellore Institute of Technology (VIT) inspired theme (Light Mode, Royal Blue & Gold)
export const iitmTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003087', // VIT Royal Blue
      dark: '#002147', // VIT Navy Blue
      light: '#3B82F6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E5A823', // VIT Gold
      dark: '#B45309',
      light: '#FFC72C',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0EA5E9',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#22C55E',
    },
    background: {
      default: '#F0F4F8',
      paper: '#F9FBFC',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: '3rem',
      color: '#0F172A',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: '2.25rem',
      color: '#0F172A',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8, // Structured academic 8px rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#003087',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#002147',
          },
        },
        containedSecondary: {
          backgroundColor: '#E5A823',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#B45309',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E2E8F0',
          background: '#FFFFFF',
          transition: 'all 0.3s ease',
          color: '#0F172A',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
  },
});

export const vitTheme = iitmTheme;

// 2. Midnight-Violet & Pink theme (Dark Mode, specifically tailored for stunning Login and Signup pages)
export const authTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A78BFA', // Light Purple
      dark: '#8B5CF6', // Purple
      light: '#C4B5FD',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EC4899', // Pink
      dark: '#DB2777',
      light: '#F472B6',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#06B6D4',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#10B981',
    },
    background: {
      default: '#0B0415', // Midnight black
      paper: '#1A0B2E', // Midnight purple
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      fontSize: '3.5rem',
      color: '#F8FAFC',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      fontSize: '2.5rem',
      color: '#F8FAFC',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 20, // 20px rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '12px 28px',
          textTransform: 'none',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', // Violet-to-Pink gradient buttons
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #DB2777 0%, #D97706 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(139, 92, 246, 0.15)', // Glowing violet glass borders
          background: 'rgba(26, 11, 46, 0.65)', // Midnight-purple glass cards
          backdropFilter: 'blur(25px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          color: '#F8FAFC',
          '&:hover': {
            background: 'rgba(26, 11, 46, 0.8)',
            borderColor: 'rgba(139, 92, 246, 0.3)',
            boxShadow: '0 12px 40px 0 rgba(139, 92, 246, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 20,
            backgroundColor: 'rgba(11, 4, 21, 0.6)',
            color: '#F8FAFC',
            '& fieldset': {
              borderColor: 'rgba(139, 92, 246, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(139, 92, 246, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8B5CF6',
              boxShadow: '0 0 12px rgba(139, 92, 246, 0.4)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#CBD5E1',
            '&.Mui-focused': {
              color: '#A78BFA',
            },
          },
        },
      },
    },
  },
});

// 3. Premium SaaS styling theme (Dark Mode, Royal Blue, Indigo & Cyan, 20px glassmorphism)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2563EB', // Royal Blue
      dark: '#1D4ED8',
      light: '#60A5FA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4F46E5', // Indigo
      dark: '#4338CA',
      light: '#818CF8',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#06B6D4', // Cyan
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#22C55E',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      fontSize: '3.5rem',
      color: '#F8FAFC',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      fontSize: '2.5rem',
      color: '#F8FAFC',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 20, // 20px rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '12px 28px',
          textTransform: 'none',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #1D4ED8 0%, #4338CA 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338CA 0%, #0891B2 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(51, 65, 85, 0.45)', // Glass effect
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          color: '#F8FAFC',
          '&:hover': {
            background: 'rgba(51, 65, 85, 0.6)',
            transform: 'translateY(-3px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 20,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            color: '#F8FAFC',
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.06)',
          color: '#CBD5E1',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04) !important',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 20,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            color: '#F8FAFC',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563EB',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#CBD5E1',
            '&.Mui-focused': {
              color: '#60A5FA',
            },
          },
        },
      },
    },
  },
});

const defaultTheme = vitTheme;
export default defaultTheme;