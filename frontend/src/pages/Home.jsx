import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { 
  ArrowRight, 
  GraduationCap, 
  Megaphone as CampaignIcon,
  Megaphone,
  Calendar as EventIcon,
  Calendar,
  Award as WorkspacePremiumIcon,
  Users as GroupsIcon,
  Users,
  Sparkles as AutoAwesomeIcon,
  Sparkles,
  MapPin as LocationOnIcon,
  MapPin,
  Clock as AccessTimeIcon,
  Clock,
  Monitor as ComputerIcon,
  Cpu as MemoryIcon,
  Wrench as EngineeringIcon,
  Briefcase as BusinessCenterIcon,
  FlaskConical as ScienceIcon,
  BookOpen,
  BookOpen as MenuBookIcon,
  Trophy as EmojiEventsIcon,
  TrendingUp as TrendingUpIcon,
  Star,
  Zap,
  Shield,
  Globe,
  Heart,
  Target,
  ChevronRight,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import DepartmentDetailModal from '../components/DepartmentDetailModal';
import { toast } from 'react-toastify';

const getDeptIcon = (iconName) => {
  switch (iconName) {
    case 'Computer': return <ComputerIcon size={32} />;
    case 'Memory': return <MemoryIcon size={32} />;
    case 'Engineering': return <EngineeringIcon size={32} />;
    case 'BusinessCenter': return <BusinessCenterIcon size={32} />;
    case 'Science': return <ScienceIcon size={32} />;
    default: return <MenuBookIcon size={32} />;
  }
};

const Home = () => {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [annRes, deptRes, evRes] = await Promise.all([
          api.get('/announcements'),
          api.get('/departments'),
          api.get('/events'),
        ]);
        setAnnouncements(annRes.data || []);
        setDepartments(deptRes.data || []);
        setEvents(evRes.data || []);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRegisterEvent = (eventTitle) => {
    toast.success(`You have successfully registered for "${eventTitle}"! Event pass sent to your email.`);
    setSelectedEvent(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box sx={{ overflowX: 'hidden', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '85vh',
          backgroundImage: 'linear-gradient(rgba(0, 48, 135, 0.75), rgba(0, 48, 135, 0.55)), url("/campus_hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pt: { xs: 16, md: 20 },
          pb: { xs: 20, md: 24 }, // Extra padding bottom to allow cards to overlap
          overflow: 'visible',
        }}
      >
        <Container maxWidth="lg" sx={{ zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Chip
              label="Welcome to EduNova University"
              size="small"
              sx={{
                mb: 3,
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFC72C', // Gold text
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontWeight: 600,
                borderRadius: '8px',
                px: 2,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '4rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              EDUNOVA UNIVERSITY
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#F3F4F6',
                mb: 4,
                fontWeight: 500,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              Shaping Tomorrow's Innovation
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <Button
                component={Link}
                to="/departments"
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #003087 0%, #E5A823 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: 4,
                  py: 1.8,
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0, 48, 135, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 24px rgba(0, 48, 135, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                EXPLORE DEPARTMENTS
              </Button>
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: 4,
                  py: 1.8,
                  borderRadius: '8px',
                  '&:hover': {
                    borderColor: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                INSTITUTIONAL OVERVIEW
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Floating Cards Section (Overlapping Hero Banner) */}
      <Box sx={{ mt: '-100px', position: 'relative', zIndex: 10, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              {
                icon: <LocationOnIcon size={32} color="#003087" />,
                title: 'Campus Life',
                description: 'Experience Innovation daily',
              },
              {
                icon: <MenuBookIcon size={32} color="#E5A823" />,
                title: 'Programs & Courses',
                description: 'Explore diverse curriculum programs',
              },
              {
                icon: <WorkspacePremiumIcon size={32} color="#003087" />,
                title: 'Admissions',
                description: 'Join our community of innovators',
              },
              {
                icon: <BookOpen size={32} color="#E5A823" />,
                title: 'Library System',
                description: 'Access rich knowledge resources',
              },
            ].map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 4,
                      minHeight: 180,
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #E2E8F0',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 15px 35px rgba(0, 48, 135, 0.15)',
                        borderColor: '#003087',
                      },
                    }}
                  >
                    <Box sx={{ mb: 2, p: 1.5, borderRadius: '50%', bgcolor: 'rgba(0, 48, 135, 0.04)' }}>
                      {card.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#475569' }}>
                      {card.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ py: 12, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {[
                { icon: <Users size={32} color="#2563EB" />, value: '15,000+', label: 'Students' },
                { icon: <GraduationCap size={32} color="#4F46E5" />, value: '200+', label: 'Faculty Members' },
                { icon: <BookOpen size={32} color="#F59E0B" />, value: '50+', label: 'Programs' },
                { icon: <WorkspacePremiumIcon size={32} color="#8B5CF6" />, value: '95%', label: 'Placement Rate' },
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        p: 4,
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 2px 16px rgba(15, 23, 42, 0.06)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12)',
                        },
                      }}
                    >
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: '#0F172A',
                          mb: 1,
                          fontSize: '2rem',
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: '#64748B', fontWeight: 500 }}
                      >
                        {stat.label}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 16, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 12 }}>
              <Chip
                label="Why Choose Us"
                size="small"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563EB',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: '#0F172A',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Excellence in Education
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}
              >
                Discover what makes EduNova the preferred choice for students seeking quality education and holistic development.
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {[
                {
                  icon: <Shield size={40} color="#2563EB" />,
                  title: 'World-Class Education',
                  description: 'Experience internationally recognized curriculum designed by industry experts and academic leaders.',
                },
                {
                  icon: <Target size={40} color="#4F46E5" />,
                  title: 'Career-Focused Learning',
                  description: 'Practical skills and industry connections that prepare you for successful careers.',
                },
                {
                  icon: <Globe size={40} color="#F59E0B" />,
                  title: 'Global Network',
                  description: 'Join a diverse community of students and alumni from around the world.',
                },
                {
                  icon: <Heart size={40} color="#8B5CF6" />,
                  title: 'Student Support',
                  description: 'Comprehensive support services including counseling, mentorship, and career guidance.',
                },
                {
                  icon: <Sparkles size={40} color="#EC4899" />,
                  title: 'Innovation Hub',
                  description: 'Access to cutting-edge technology and research facilities for creative exploration.',
                },
                {
                  icon: <Users size={40} color="#10B981" />,
                  title: 'Community Impact',
                  description: 'Engage in meaningful projects that make a difference in local and global communities.',
                },
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        p: 4,
                        height: '100%',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 2px 16px rgba(15, 23, 42, 0.06)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 40px rgba(15, 23, 42, 0.12)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '8px',
                          bgcolor: 'rgba(15, 23, 42, 0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, mb: 2, color: '#0F172A' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: '#64748B', lineHeight: 1.6 }}
                      >
                        {feature.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Departments Section */}
      <Box sx={{ py: 16, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 12 }}>
              <Chip
                label="Academic Excellence"
                size="small"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563EB',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: '#0F172A',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Our Departments
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}
              >
                Explore our diverse range of academic departments offering world-class education and research opportunities.
              </Typography>
            </Box>
          </motion.div>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#2563EB' }} />
            </Box>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Grid container spacing={4}>
                {departments.slice(0, 6).map((dept, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div variants={itemVariants}>
                      <Card
                        sx={{
                          height: '100%',
                          borderRadius: '8px',
                          border: '1px solid rgba(15, 23, 42, 0.08)',
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 2px 16px rgba(15, 23, 42, 0.06)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 40px rgba(15, 23, 42, 0.12)',
                          },
                        }}
                        onClick={() => setSelectedDept(dept)}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: '8px',
                              bgcolor: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 3,
                            }}
                          >
                            {getDeptIcon(dept.icon)}
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: 2, color: '#0F172A' }}
                          >
                            {dept.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: '#64748B', mb: 3, lineHeight: 1.6 }}
                          >
                            {dept.description?.substring(0, 100)}...
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: '#2563EB', fontWeight: 600 }}
                            >
                              {dept.intake} Seats
                            </Typography>
                            <ChevronRight size={16} color="#2563EB" />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              to="/departments"
              variant="outlined"
              sx={{
                borderColor: 'rgba(15, 23, 42, 0.2)',
                color: '#0F172A',
                fontWeight: 600,
                px: 4,
                py: 2,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  bordercolor: '#0F172A',
                  backgroundColor: 'rgba(15, 23, 42, 0.05)',
                },
              }}
              endIcon={<ArrowRight size={18} />}
            >
              View All Departments
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Events Section */}
      <Box sx={{ py: 16, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 12 }}>
              <Chip
                label="Campus Life"
                size="small"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563EB',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: '#0F172A',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Upcoming Events
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: '#64748B', maxWidth: 600, mx: 'auto' }}
              >
                Stay updated with the latest events, workshops, and activities happening on campus.
              </Typography>
            </Box>
          </motion.div>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#2563EB' }} />
            </Box>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Grid container spacing={4}>
                {events.slice(0, 3).map((event, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div variants={itemVariants}>
                      <Card
                        sx={{
                          height: '100%',
                          borderRadius: '8px',
                          border: '1px solid rgba(15, 23, 42, 0.08)',
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 2px 16px rgba(15, 23, 42, 0.06)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 40px rgba(15, 23, 42, 0.12)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 3,
                            }}
                          >
                            <Calendar size={20} color="#F59E0B" />
                            <Typography
                              variant="caption"
                              sx={{ color: '#64748B', fontWeight: 600 }}
                            >
                              {event.date}
                            </Typography>
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: 2, color: '#0F172A' }}
                          >
                            {event.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: '#64748B', mb: 3, lineHeight: 1.6 }}
                          >
                            {event.description?.substring(0, 120)}...
                          </Typography>
                          <Stack spacing={1.5} sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <MapPin size={16} color="#64748B" />
                              <Typography variant="caption" sx={{ color: '#64748B' }}>
                                {event.location}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Clock size={16} color="#64748B" />
                              <Typography variant="caption" sx={{ color: '#64748B' }}>
                                {event.time}
                              </Typography>
                            </Box>
                          </Stack>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
                              color: '#FFFFFF',
                              fontWeight: 600,
                              py: 1.5,
                              borderRadius: '8px',
                              textTransform: 'none',
                              '&:hover': {
                                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                              },
                            }}
                            onClick={() => setSelectedEvent(event)}
                          >
                            Register Now
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
        </Container>
      </Box>

      {/* Announcements Section */}
      <Box sx={{ py: 16, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 12 }}>
              <Chip
                label="Latest Updates"
                size="small"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563EB',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: '#0F172A',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Announcements
              </Typography>
            </Box>
          </motion.div>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#2563EB' }} />
            </Box>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={3} md={2}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Megaphone size={28} color="#2563EB" />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, color: '#0F172A' }}
                    >
                      News
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 3,
                      overflowX: 'auto',
                      pb: 2,
                      '&::-webkit-scrollbar': {
                        height: 6,
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#CBD5E1',
                        borderRadius: '8px',
                      },
                    }}
                  >
                    {announcements.slice(0, 4).map((announcement, index) => (
                      <Card
                        key={index}
                        sx={{
                          minWidth: 280,
                          borderRadius: '8px',
                          border: '1px solid rgba(15, 23, 42, 0.08)',
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 2px 16px rgba(15, 23, 42, 0.06)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: '#0F172A', mb: 1 }}
                          >
                            {announcement.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#64748B', display: 'block' }}
                          >
                            {announcement.date}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          )}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 16, bgcolor: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', color: '#FFFFFF' }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Ready to Begin Your Journey?
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 6, maxWidth: 600, mx: 'auto' }}
              >
                Join thousands of students who have transformed their futures at EduNova University.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'center' }}>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    px: 5,
                    py: 2,
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 24px rgba(37, 99, 235, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                  endIcon={<ArrowRight size={18} />}
                >
                  Apply Now
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    px: 5,
                    py: 2,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#FFFFFF',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Department Detail Modal */}
      <DepartmentDetailModal
        open={!!selectedDept}
        onClose={() => setSelectedDept(null)}
        department={selectedDept}
      />

      {/* Event Registration Dialog */}
      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>
          Event Registration
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
            You are about to register for:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#0F172A', mb: 2 }}>
            {selectedEvent?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            {selectedEvent?.date} at {selectedEvent?.time}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setSelectedEvent(null)}
            sx={{
              color: '#64748B',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleRegisterEvent(selectedEvent?.title)}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
              color: '#FFFFFF',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            Confirm Registration
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;