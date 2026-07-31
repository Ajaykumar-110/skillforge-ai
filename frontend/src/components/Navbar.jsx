import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Container,
  Chip,
  useScrollTrigger,
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  X as CloseIcon, 
  GraduationCap as SchoolIcon,
  Home,
  Info,
  Building2 as BusinessIcon,
  Users as PeopleIcon,
  HelpCircle as HelpOutlinedIcon,
  Shield as SecurityIcon,
  FileText as GavelIcon,
  LogOut as LogoutIcon,
  User as PersonIcon,
  LogIn as LoginIcon,
  UserPlus as PersonAddIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const navItems = [
  { label: 'Home', path: '/', icon: <Home size={18} /> },
  { label: 'About Us', path: '/about', icon: <Info size={18} /> },
  { label: 'Departments', path: '/departments', icon: <BusinessIcon size={18} /> },
  { label: 'Faculties', path: '/faculties', icon: <PeopleIcon size={18} /> },
  { label: 'FAQ', path: '/faq', icon: <HelpOutlinedIcon size={18} /> },
  { label: 'Privacy', path: '/privacy', icon: <SecurityIcon size={18} /> },
  { label: 'Terms', path: '/terms', icon: <GavelIcon size={18} /> },
];

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  return React.cloneElement(children, {
    style: {
      backgroundColor: trigger ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: trigger ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(15, 23, 42, 0.05)',
      boxShadow: trigger ? '0 4px 20px rgba(15, 23, 42, 0.08)' : 'none',
      transition: 'all 0.3s ease-in-out',
    },
  });
}

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const isCurrentPath = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <ElevationScroll>
        <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
              <Box
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="EduNova Logo"
                  sx={{
                    height: 52,
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              {/* Desktop Nav Items */}
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                {navItems.map((item) => {
                  const active = isCurrentPath(item.path);
                  return (
                    <Button
                      key={item.label}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: active ? '#0F172A' : '#64748B',
                        fontWeight: active ? 700 : 500,
                        fontSize: '0.85rem',
                        px: 2.5,
                        py: 1,
                        borderRadius: '8px',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        textTransform: 'none',
                        letterSpacing: '0.01em',
                        backgroundColor: active ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                        border: active ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid transparent',
                        '&:hover': {
                          color: '#0F172A',
                          backgroundColor: 'rgba(37, 99, 235, 0.05)',
                          border: '1px solid rgba(37, 99, 235, 0.1)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>

              {/* Auth Buttons / Profile Avatar */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {isAuthenticated ? (
                  <>
                    <Box
                      onClick={handleMenuOpen}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        cursor: 'pointer',
                        p: 1,
                        pl: 2,
                        pr: 2,
                        borderRadius: '8px',
                        backgroundColor: 'rgba(15, 23, 42, 0.03)',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(37, 99, 235, 0.05)',
                          border: '1px solid rgba(37, 99, 235, 0.2)',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '1rem',
                          border: '2px solid rgba(37, 99, 235, 0.2)',
                        }}
                      >
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: '#0F172A',
                            fontSize: '0.85rem',
                          }}
                        >
                          {user?.name || 'User'}
                        </Typography>
                      </Box>
                    </Box>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      sx={{
                        '& .MuiPaper-root': {
                          borderRadius: '8px',
                          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12)',
                          border: '1px solid rgba(15, 23, 42, 0.08)',
                          minWidth: 200,
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          navigate('/dashboard');
                        }}
                        sx={{
                          borderRadius: '8px',
                          mx: 1,
                          my: 0.5,
                          color: '#0F172A',
                          '&:hover': {
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <PersonIcon size={18} color="#2563EB" />
                        </ListItemIcon>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Dashboard
                        </Typography>
                      </MenuItem>
                      <Divider sx={{ my: 1 }} />
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          borderRadius: '8px',
                          mx: 1,
                          my: 0.5,
                          color: '#EF4444',
                          '&:hover': {
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <LogoutIcon size={18} color="#EF4444" />
                        </ListItemIcon>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Logout
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      component={Link}
                      to="/login"
                      sx={{
                        color: '#0F172A',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        px: 2.5,
                        py: 1,
                        borderRadius: '8px',
                        textTransform: 'none',
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(15, 23, 42, 0.05)',
                          border: '1px solid rgba(15, 23, 42, 0.2)',
                        },
                      }}
                    >
                      Log In
                    </Button>
                    <Button
                      component={Link}
                      to="/signup"
                      sx={{
                        background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        px: 2.5,
                        py: 1,
                        borderRadius: '8px',
                        textTransform: 'none',
                        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
                        '&:hover': {
                          boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}

                {/* Mobile Menu Button */}
                <IconButton
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{
                    display: { lg: 'none' },
                    color: '#0F172A',
                    backgroundColor: 'rgba(15, 23, 42, 0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(15, 23, 42, 0.1)',
                    },
                  }}
                >
                  {mobileOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
            Navigation Menu
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#0F172A' }}>
            <CloseIcon size={24} />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(15, 23, 42, 0.08)' }} />
        <List sx={{ p: 2 }}>
          {navItems.map((item) => {
            const active = isCurrentPath(item.path);
            return (
              <ListItem
                key={item.label}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: '8px',
                  mb: 1,
                  backgroundColor: active ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                  color: active ? '#0F172A' : '#64748B',
                  fontWeight: active ? 600 : 500,
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    color: '#0F172A',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: active ? '#2563EB' : '#64748B' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
        <Divider sx={{ borderColor: 'rgba(15, 23, 42, 0.08)' }} />
        {!isAuthenticated && (
          <Box sx={{ p: 2 }}>
            <Button
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              fullWidth
              variant="outlined"
              sx={{
                mb: 1,
                borderRadius: '8px',
                color: '#0F172A',
                borderColor: 'rgba(15, 23, 42, 0.2)',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/signup"
              onClick={handleDrawerToggle}
              fullWidth
              variant="contained"
              sx={{
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default Navbar;