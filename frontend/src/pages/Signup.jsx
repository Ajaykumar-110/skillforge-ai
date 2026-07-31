import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  MenuItem,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import { 
  Eye as Visibility,
  EyeOff as VisibilityOff,
  GraduationCap as SchoolIcon,
  User as PersonOutlinedIcon,
  Mail as EmailOutlinedIcon,
  Lock as LockOutlinedIcon,
  Briefcase as WorkOutlinedIcon,
  Building2 as BusinessIcon,
  ArrowRight as ArrowForwardIcon,
  CircleCheck,
  Zap,
  Shield,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import api from '../services/api';

const departmentsList = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Mechanical & Automation Engineering',
  'School of Business & Management',
  'Department of Applied Sciences & Physics',
  'Department of Humanities & Social Sciences',
];

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: 'Computer Science & Engineering',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please check again.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
      });

      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      const msg = err.response?.data?.message || 'Failed to create account. Email may already exist.';
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
              {/* Left Column: Form */}
              <Grid item xs={12} md={7} sx={{ p: { xs: 4, sm: 6 }, background: 'transparent' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                  Create Account
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                  Join EduNova College Portal to manage courses, research, and campus activities.
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

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.8 }}>
                        Full Name
                      </Typography>
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(11, 4, 21, 0.4)',
                            borderRadius: '8px',
                            '& fieldset': {
                              borderColor: 'rgba(15, 23, 42, 0.1)',
                            },
                            '&:hover fieldset': {
                              bordercolor: '#A78BFA',
                            },
                            '&.Mui-focused fieldset': {
                              bordercolor: '#A78BFA',
                            },
                          },
                        }}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutlinedIcon size={20} color="#64748B" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.8 }}>
                        Institutional Email Address
                      </Typography>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@EduNova.edu"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(11, 4, 21, 0.4)',
                            borderRadius: '8px',
                            '& fieldset': {
                              borderColor: 'rgba(15, 23, 42, 0.1)',
                            },
                            '&:hover fieldset': {
                              bordercolor: '#A78BFA',
                            },
                            '&.Mui-focused fieldset': {
                              bordercolor: '#A78BFA',
                            },
                          },
                        }}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailOutlinedIcon size={20} color="#64748B" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.8 }}>
                        Password
                      </Typography>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(11, 4, 21, 0.4)',
                            borderRadius: '8px',
                            '& fieldset': {
                              borderColor: 'rgba(15, 23, 42, 0.1)',
                            },
                            '&:hover fieldset': {
                              bordercolor: '#A78BFA',
                            },
                            '&.Mui-focused fieldset': {
                              bordercolor: '#A78BFA',
                            },
                          },
                        }}
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
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.8 }}>
                        Confirm Password
                      </Typography>
                      <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(11, 4, 21, 0.4)',
                            borderRadius: '8px',
                            '& fieldset': {
                              borderColor: 'rgba(15, 23, 42, 0.1)',
                            },
                            '&:hover fieldset': {
                              bordercolor: '#A78BFA',
                            },
                            '&.Mui-focused fieldset': {
                              bordercolor: '#A78BFA',
                            },
                          },
                        }}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOutlinedIcon size={20} color="#64748B" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.8 }}>
                        Role
                      </Typography>
                      <TextField
                        fullWidth
                        id="role"
                        name="role"
                        select
                        value={formData.role}
                        onChange={handleChange}
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(11, 4, 21, 0.4)',
                            borderRadius: '8px',
                            '& fieldset': {
                              borderColor: 'rgba(15, 23, 42, 0.1)',
                            },
                            '&:hover fieldset': {
                              bordercolor: '#A78BFA',
                            },
                            '&.Mui-focused fieldset': {
                              bordercolor: '#A78BFA',
                            },
                          },
                        }}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <WorkOutlinedIcon size={20} color="#64748B" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="faculty">Faculty</MenuItem>
                        <MenuItem value="admin">Administrator</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.8 }}>
                        Department
                      </Typography>
                      <TextField
                        fullWidth
                        id="department"
                        name="department"
                        select
                        value={formData.department}
                        onChange={handleChange}
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(11, 4, 21, 0.4)',
                            borderRadius: '8px',
                            '& fieldset': {
                              borderColor: 'rgba(15, 23, 42, 0.1)',
                            },
                            '&:hover fieldset': {
                              bordercolor: '#A78BFA',
                            },
                            '&.Mui-focused fieldset': {
                              bordercolor: '#A78BFA',
                            },
                          },
                        }}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <BusinessIcon size={20} color="#64748B" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      >
                        {departmentsList.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: 3,
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
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Box>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Typography component="span" sx={{ color: '#A78BFA', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                        Sign In
                      </Typography>
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22C55E' }}></span>
                    Server Endpoint: <a href={api.defaults.baseURL} target="_blank" rel="noopener noreferrer" style={{ color: '#003087', fontWeight: 700, textDecoration: 'underline' }}>{api.defaults.baseURL}</a>
                  </Typography>
                </Box>
              </Grid>

              {/* Right Column: Promotional Content */}
              <Grid
                item
                xs={12}
                md={5}
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
                    Join Our Academic Community
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
                    Create your account to access world-class educational resources, connect with faculty, and manage your academic journey.
                  </Typography>
                </Box>

                <Box sx={{ position: 'relative', zIndex: 1, mt: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, letterSpacing: '0.05em' }}>
                    WHY CHOOSE EDUNOVA?
                  </Typography>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '8px', 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <CircleCheck size={20} color="#FFFFFF" />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          World-Class Education
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Industry-leading curriculum
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '8px', 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Zap size={20} color="#FFFFFF" />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Modern Learning
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Cutting-edge technology
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '8px', 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Shield size={20} color="#FFFFFF" />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Secure Platform
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Enterprise-grade security
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '8px', 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Users size={20} color="#FFFFFF" />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Global Network
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Connect with peers worldwide
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Signup;