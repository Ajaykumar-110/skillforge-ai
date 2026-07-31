import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { motion } from 'framer-motion';

const leadershipTeam = [
  {
    name: 'Dr. Anandwardhan K. Sharma',
    title: 'Vice Chancellor & President',
    qualification: 'Ph.D. (MIT USA), PostDoc (Stanford)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Over 30 years of global academic leadership and research in high-performance computing.',
  },
  {
    name: 'Dr. Sunita Deshmukh',
    title: 'Dean of Academic Affairs',
    qualification: 'Ph.D. (IIT Delhi), M.Tech (IIT Kanpur)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneered outcome-based learning and international credit exchange agreements.',
  },
  {
    name: 'Prof. Marcus Vance',
    title: 'Director of Research & Innovation',
    qualification: 'Ph.D. (Cambridge University)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Directs EduNova Incubator, securing over $20M in industrial research grants.',
  },
];

const facilities = [
  {
    title: 'Advanced AI & Computational Center',
    icon: <ScienceIcon sx={{ fontSize: 32, color: '#D97706' }} />,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Equipped with Nvidia H100 GPU clusters for high-performance deep learning and quantum simulations.',
  },
  {
    title: 'Central Digital Knowledge Library',
    icon: <MenuBookIcon sx={{ fontSize: 32, color: '#1E40AF' }} />,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    description: 'Housing over 250,000 physical volumes and 24/7 digital access to IEEE, ACM, and Springer journals.',
  },
  {
    title: 'Olympic-Standard Sports Complex',
    icon: <SportsSoccerIcon sx={{ fontSize: 32, color: '#D97706' }} />,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    description: 'Features indoor badminton, heated swimming pool, synthetic athletic tracks, and multi-gym.',
  },
];

const AboutUs = () => {
  return (
    <Box sx={{ pb: 10 }}>
      {/* Header Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E40AF 60%, #0284C7 100%)',
          color: '#111827',
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Chip
              label="ABOUT SKILLFORGE"
              size="small"
              sx={{ bgcolor: 'rgba(79, 70, 229, 0.2)', color: '#D97706', fontWeight: 800, mb: 2 }}
            />
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
              Building a Tradition of Excellence & Innovation
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 400, lineHeight: 1.7 }}>
              Established in 1990, EduNova College has stood at the forefront of higher education, empowering generations of visionaries, engineers, and corporate leaders.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Vision, Mission, Values */}
      <Container maxWidth="xl" sx={{ mt: -5, mb: 10, position: 'relative', zIndex: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', p: 4, bgcolor: 'background.default', border: '1px solid #E5E7EB' }}>
              <Box sx={{ width: 50, height: 50, borderRadius: '8px', bgcolor: 'rgba(15, 82, 186, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                <VisibilityIcon sx={{ color: '#1E40AF', fontSize: 30 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                To become a premier global institution recognized for groundbreaking multidisciplinary research, transformative education, and fostering ethical leadership for a sustainable digital world.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', p: 4, bgcolor: 'background.default', border: '1px solid #E5E7EB' }}>
              <Box sx={{ width: 50, height: 50, borderRadius: '8px', bgcolor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                <TrackChangesIcon sx={{ color: '#D97706', fontSize: 30 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                To deliver accessible, world-class education through hands-on experiential learning, fostering industry partnerships, state-of-the-art laboratories, and incubation support.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', p: 4, bgcolor: 'background.default', border: '1px solid #E5E7EB' }}>
              <Box sx={{ width: 50, height: 50, borderRadius: '8px', bgcolor: 'rgba(15, 82, 186, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                <VerifiedUserIcon sx={{ color: '#1E40AF', fontSize: 30 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Core Values
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                Academic Rigor, Uncompromising Ethics, Inclusion & Diversity, Continuous Innovation, and Global Community Impact guide every endeavor at EduNova.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Leadership & Administration */}
      <Container maxWidth="xl" sx={{ mb: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip label="GOVERNANCE" size="small" sx={{ bgcolor: 'rgba(79, 70, 229, 0.12)', color: '#D97706', fontWeight: 800, mb: 1 }} />
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
            Institutional Leadership
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 650, mx: 'auto' }}>
            Guided by visionary academic administrators and industry leaders committed to educational excellence.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {leadershipTeam.map((leader, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <Avatar
                  src={leader.avatar}
                  alt={leader.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2.5,
                    border: '4px solid #1E40AF',
                    boxShadow: '0 8px 20px rgba(15, 82, 186, 0.2)',
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {leader.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#D97706', fontWeight: 700, mb: 1 }}>
                  {leader.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 600, display: 'block', mb: 2 }}>
                  {leader.qualification}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                  {leader.bio}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Facilities Highlight */}
      <Box sx={{ bgcolor: 'background.default', py: 10, borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
              World-Class Campus Infrastructure
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 650, mx: 'auto' }}>
              Designed to stimulate creativity, research, and holistic student growth.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {facilities.map((fac, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ height: '100%', overflow: 'hidden' }}>
                  <CardMedia component="img" height="200" image={fac.image} alt={fac.title} />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 1 }}>{fac.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                      {fac.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                      {fac.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;
