import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import { 
  Gavel,
  CircleCheck,
  BookOpen as MenuBookIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

const TermsConditions = () => {
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
    <Box sx={{ pb: 10, bgcolor: 'background.default' }}>
      {/* Header Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F5F3FF 0%, #F5F3FF 50%, #FFFFFF 100%)',
          color: '#0F172A',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip 
              label="CAMPUS GOVERNANCE" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(37, 99, 235, 0.1)', 
                color: '#2563EB', 
                fontWeight: 800, 
                mb: 3,
                borderRadius: '8px',
                px: 2,
              }} 
            />
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: '#0F172A',
              }}
            >
              Terms & Academic Conditions
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748B', 
                maxWidth: 600, 
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              Official terms of service governing portal usage, academic honor codes, and institutional conduct at EduNova College.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper 
                sx={{ 
                  p: { xs: 3, sm: 5 }, 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 16px rgba(15, 23, 42, 0.06)',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Gavel size={32} color="#2563EB" />
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    Institutional Code & Terms
                  </Typography>
                </Box>

                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 3 }}>
                  Effective Academic Year 2026-2027 | Applicable to All Enrolled Students & Faculty
                </Typography>

                <Divider sx={{ mb: 4, borderColor: 'rgba(15, 23, 42, 0.08)' }} />

                {/* Section 1 */}
                <Box sx={{ mb: 4 }} id="conduct">
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    1. Acceptance of Terms
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                    By accessing or registering an account on the EduNova College Management Portal, you agree to comply with all campus regulations, academic honor codes, and system usage guidelines established by the Board of Governors.
                  </Typography>
                </Box>

                {/* Section 2 */}
                <Box sx={{ mb: 4 }} id="integrity">
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    2. Academic Integrity Policy
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7, mb: 2 }}>
                    EduNova College maintains a zero-tolerance policy regarding academic dishonesty, including but not limited to:
                  </Typography>
                  <List>
                    {[
                      'Plagiarism or uncredited copying in assignments, research projects, or thesis work.',
                      'Unauthorized assistance or impersonation during mid-term or end-semester examinations.',
                      'Falsification of laboratory data, research metrics, or institutional credentials.',
                      'Sharing login credentials to allow non-enrolled individuals access to portal resources.',
                    ].map((text, idx) => (
                      <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CircleCheck size={18} color="#2563EB" />
                        </ListItemIcon>
                        <ListItemText primary={text} slotProps={{ primaryTypography: { variant: 'body2', color: '#64748B' } }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {/* Section 3 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    3. IT Resources & Network Security
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                    Users must utilize college servers, laboratory workstations, and campus Wi-Fi networks exclusively for legitimate academic and research purposes. Any attempt to breach system security, execute unauthorized scripts, or degrade network performance will result in immediate suspension.
                  </Typography>
                </Box>

                {/* Section 4 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    4. Tuition Fees & Cancellation Policy
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                    Tuition fees for each semester must be paid prior to course registration deadlines. Refund requests for course withdrawals are processed according to the official EduNova Academic Registrar refund schedule.
                  </Typography>
                </Box>

                {/* Section 5 */}
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    5. Institutional Disclaimer & Revisions
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                    EduNova College reserves the right to modify course offerings, fee structures, and campus policies at any time. Notice of significant policy updates will be communicated through the portal announcements.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Side Info Box */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Paper 
                  sx={{ 
                    p: 4, 
                    borderRadius: '8px', 
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    boxShadow: '0 2px 16px rgba(15, 23, 42, 0.06)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <MenuBookIcon size={32} color="#2563EB" />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      Student Handbook
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.7, mb: 3 }}>
                    For the full 2026 Student Honor Code and Disciplinary Proceedings, refer to the Registrar Student Office.
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(15, 23, 42, 0.08)', mb: 3 }} />
                  <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 700 }}>
                    REGISTRAR CONTACT
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#0F172A', fontWeight: 600, mt: 0.5 }}>
                    registrar@edunova.edu
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TermsConditions;