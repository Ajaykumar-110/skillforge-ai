import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import { 
  GraduationCap as SchoolIcon,
  Mail as EmailIcon,
  Phone as PhoneIcon,
  MapPin as LocationOnIcon,
  ShieldCheck as VerifiedIcon,
  ArrowRight,
  Share2,
  MessageCircle,
  Video,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing to EduNova College Newsletter!');
    setEmail('');
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
    <Box
      component="footer"
      sx={{
        backgroundColor: '#FFFFFF',
        color: '#0F172A',
        pt: 12,
        pb: 6,
        borderTop: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {/* Column 1: Institutional Overview */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
                <Typography variant="body2" sx={{ color: '#64748B', mb: 3.5, lineHeight: 1.7 }}>
                  Empowering next-generation leaders, innovators, and engineers with cutting-edge academic excellence, world-class research facilities, and holistic character development.
                </Typography>
                <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                  <Chip
                    icon={<VerifiedIcon size={16} color="#2563EB" />}
                    label="NAAC A++ Accredited"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563EB',
                      border: '1px solid rgba(37, 99, 235, 0.2)',
                      fontWeight: 600,
                      borderRadius: '8px',
                    }}
                  />
                  <Chip
                    label="NIRF Top 10 Ranked"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(79, 70, 229, 0.1)',
                      color: '#4F46E5',
                      border: '1px solid rgba(79, 70, 229, 0.2)',
                      fontWeight: 600,
                      borderRadius: '8px',
                    }}
                  />
                </Stack>
                
                {/* Social Media Icons */}
                <Stack direction="row" spacing={2}>
                  {[
                    { icon: Share2, name: 'Share' },
                    { icon: MessageCircle, name: 'Chat' },
                    { icon: Video, name: 'Video' },
                  ].map((social, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '8px',
                        bgcolor: 'rgba(15, 23, 42, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(37, 99, 235, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <social.icon size={20} color="#64748B" />
                    </Box>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Column 2: Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: '#0F172A' }}>
                  Quick Links
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Departments', path: '/departments' },
                    { name: 'Faculties', path: '/faculties' },
                    { name: 'FAQ', path: '/faq' },
                  ].map((link) => (
                    <Typography
                      key={link.name}
                      component={Link}
                      to={link.path}
                      variant="body2"
                      sx={{
                        color: '#64748B',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        fontWeight: 500,
                        '&:hover': { color: '#2563EB', transform: 'translateX(4px)' },
                      }}
                    >
                      {link.name}
                    </Typography>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Column 3: Legal & Support */}
            <Grid item xs={12} sm={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: '#0F172A' }}>
                  Legal & Policies
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    { name: 'Privacy Policy', path: '/privacy' },
                    { name: 'Terms & Conditions', path: '/terms' },
                    { name: 'Academic Integrity', path: '/terms#integrity' },
                    { name: 'Student Code of Conduct', path: '/terms#conduct' },
                    { name: 'Admissions FAQ', path: '/faq' },
                  ].map((link) => (
                    <Typography
                      key={link.name}
                      component={Link}
                      to={link.path}
                      variant="body2"
                      sx={{
                        color: '#64748B',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        fontWeight: 500,
                        '&:hover': { color: '#2563EB', transform: 'translateX(4px)' },
                      }}
                    >
                      {link.name}
                    </Typography>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Column 4: Contact & Newsletter */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: '#0F172A' }}>
                  Contact & Updates
                </Typography>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '8px', 
                      bgcolor: 'rgba(37, 99, 235, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <LocationOnIcon size={18} color="#2563EB" />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.5 }}>
                      EduNova Tech Campus, University Avenue, CA 90210
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '8px', 
                      bgcolor: 'rgba(37, 99, 235, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <EmailIcon size={18} color="#2563EB" />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      admissions@edunova.edu
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '8px', 
                      bgcolor: 'rgba(37, 99, 235, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <PhoneIcon size={18} color="#2563EB" />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      +1 (800) 555-EDU / +1 (800) 555-7545
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#0F172A' }}>
                  Subscribe to Newsletter
                </Typography>
                <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1.5 }}>
                  <TextField
                    variant="outlined"
                    placeholder="Enter your email"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      flexGrow: 1,
                      bgcolor: 'background.default',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        color: '#0F172A',
                        '& fieldset': { borderColor: 'rgba(15, 23, 42, 0.15)' },
                        '&:hover fieldset': { borderColor: '#2563EB' },
                        '&.Mui-focused fieldset': { borderColor: '#2563EB' },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      px: 3,
                      minWidth: 'auto',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
                      '&:hover': {
                        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                    endIcon={<ArrowRight size={16} />}
                  >
                    Subscribe
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        <Divider sx={{ my: 6, borderColor: 'rgba(15, 23, 42, 0.08)' }} />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              © 2026 EduNova University. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Typography
                component={Link}
                to="/privacy"
                variant="body2"
                sx={{ color: '#64748B', textDecoration: 'none', fontWeight: 500, '&:hover': { color: '#2563EB' } }}
              >
                Privacy Policy
              </Typography>
              <Typography
                component={Link}
                to="/terms"
                variant="body2"
                sx={{ color: '#64748B', textDecoration: 'none', fontWeight: 500, '&:hover': { color: '#2563EB' } }}
              >
                Terms of Service
              </Typography>
              <Typography
                component={Link}
                to="/contact"
                variant="body2"
                sx={{ color: '#64748B', textDecoration: 'none', fontWeight: 500, '&:hover': { color: '#2563EB' } }}
              >
                Cookie Policy
              </Typography>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;