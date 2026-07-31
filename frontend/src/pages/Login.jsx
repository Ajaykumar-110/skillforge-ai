import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { 
  Eye as Visibility,
  EyeOff as VisibilityOff,
  GraduationCap as SchoolIcon,
  Lock as LockOutlinedIcon,
  Mail as EmailOutlinedIcon,
  ArrowRight as ArrowForwardIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back to EduNova Portal!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        py: 6,
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Effects */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              display: 'flex',
              borderRadius: '8px',
              
              overflow: 'hidden',
              
              
              backdropFilter: 'blur(20px)',
            }}
          >
            <Grid container>
              {/* Left Column: Graphic Banner */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)',
                  color: 'white',
                  p: { xs: 4, md: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -80,
                    right: -80,
                    width: 250,
                    height: 250,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Box
                      component="img"
                      src="/logo.png"
                      alt="EduNova Logo"
                      sx={{
                        height: 52,
                        width: 'auto',
                        objectFit: 'contain',
                        backgroundColor: 'rgba(11, 4, 21, 0.4)',
                        padding: '4px',
                      }}
                    />
                  </Box>

                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
                    Welcome to Academic Portal
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
                    Access your personalized student dashboard, course materials, faculty schedules, and grade records seamlessly.
                  </Typography>
                </Box>

                <Box sx={{ position: 'relative', zIndex: 1, mt: 6 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 700, letterSpacing: '0.1em' }}>
                    DEMO STUDENT LOGIN CREDENTIALS
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      p: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.95)' }}>
                      Email: student@EduNova.edu
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 0.5, color: 'rgba(255, 255, 255, 0.95)' }}>
                      Password: password123
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Right Column: Form */}
              <Grid item xs={12} md={6} sx={{ p: { xs: 4, sm: 6 }, background: 'transparent' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                  Sign In
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                  Enter your registered institutional credentials to access your account.
                </Typography>

                {errorMsg && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: '8px',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: '#EF4444',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    {errorMsg}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your institutional email"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlinedIcon size={20} color="#64748B" />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'rgba(11, 4, 21, 0.4)',
                          '&:hover fieldset': {
                            bordercolor: '#A78BFA',
                          },
                          '&.Mui-focused fieldset': {
                            bordercolor: '#A78BFA',
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon size={20} color="#64748B" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ color: 'text.secondary' }}
                              >
                                {showPassword ? <VisibilityOff size={20} /> : <Visibility size={20} />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'rgba(11, 4, 21, 0.4)',
                          '&:hover fieldset': {
                            bordercolor: '#A78BFA',
                          },
                          '&.Mui-focused fieldset': {
                            bordercolor: '#A78BFA',
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          sx={{
                            color: '#A78BFA',
                            '&.Mui-checked': {
                              color: '#A78BFA',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          Remember me
                        </Typography>
                      }
                    />
                    <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                      <Typography variant="body2" sx={{ color: '#A78BFA', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                        Forgot password?
                      </Typography>
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 2.5,
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 4px 16px rgba(139, 92, 246, 0.2)',
                      '&:hover': {
                        boxShadow: '0 6px 24px rgba(139, 92, 246, 0.3)',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: 'rgba(15, 23, 42, 0.1)',
                      },
                    }}
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon size={18} />}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Box>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                      <Typography component="span" sx={{ color: '#A78BFA', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                        Create Account
                      </Typography>
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;