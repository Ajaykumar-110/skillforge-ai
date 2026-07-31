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
  Shield as SecurityIcon,
  CircleCheck,
  Lock as LockIcon,
  ShieldCheck as ShieldIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
              label="LEGAL COMPLIANCE" 
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
              Privacy Policy & Data Protection
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
              EduNova College Management System is dedicated to protecting student, faculty, and institutional data with industry-grade privacy standards.
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
                  <SecurityIcon size={32} color="#2563EB" />
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    Institutional Privacy Framework
                  </Typography>
                </Box>

                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 3 }}>
                  Last Updated: July 30, 2026 | Effective for all EduNova Portal Users
                </Typography>

                <Divider sx={{ mb: 4, borderColor: 'rgba(15, 23, 42, 0.08)' }} />

                {/* Section 1 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    1. Information We Collect
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7, mb: 2 }}>
                    When you register for or use the EduNova College Management System, we collect personal and academic data strictly necessary for institutional operations:
                  </Typography>
                  <List>
                    {[
                      'Personal Identification: Name, email address, contact telephone, profile photograph.',
                      'Academic Records: Department affiliation, course enrollment, grade history, attendance.',
                      'Authentication Data: Encrypted password hashes (bcrypt), JWT authorization tokens.',
                      'Technical Telemetry: Device IP address, browser type, and portal access timestamps.',
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

                {/* Section 2 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    2. How We Use Your Data
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7, mb: 2 }}>
                    Your information is utilized solely for legitimate educational and administrative purposes:
                  </Typography>
                  <List>
                    {[
                      'Facilitating academic course registration, grading, and transcript generation.',
                      'Authenticating secure portal access for students, faculty, and administrative staff.',
                      'Dispatching critical announcements, examination schedules, and emergency alerts.',
                      'Conducting aggregated internal research to enhance institutional curriculum quality.',
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
                    3. Data Security & Encryption Standards
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                    We implement robust technical and organizational measures to safeguard user data against unauthorized access, loss, or alteration. Passwords are cryptographically hashed using bcrypt with salt rounds. All API traffic between the React client and Express server is encrypted over SSL/TLS protocols.
                  </Typography>
                </Box>

                {/* Section 4 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    4. Non-Disclosure & Third-Party Sharing
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                    EduNova College does not sell, rent, or trade student or faculty personal information to commercial entities. Information is shared only with verified educational partners or governmental accreditation bodies when legally required.
                  </Typography>
                </Box>

                {/* Section 5 */}
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                    5. Contact Data Protection Officer (DPO)
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                    If you have inquiries regarding your privacy rights or wish to request data correction, please email our Data Protection Office at <strong>privacy@edunova.edu</strong>.
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
                    <ShieldIcon size={32} color="#2563EB" />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      Security Highlights
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.7, mb: 3 }}>
                    Our commitment to student record privacy meets FERPA and global GDPR compliance benchmarks.
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(15, 23, 42, 0.08)', mb: 3 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <LockIcon size={18} color="#2563EB" />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F172A' }}>
                      256-Bit SSL Encryption
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LockIcon size={18} color="#2563EB" />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F172A' }}>
                      Stateless JWT Authentication
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;