import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  Button,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material';
import { 
  Search as SearchIcon,
  Mail as EmailIcon,
  GraduationCap as SchoolIcon,
  BookOpen,
  BookOpen as MenuBookIcon,
  Trophy as Award,
  User,
  Building2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import FacultyDetailModal from '../components/FacultyDetailModal';

const departmentsFilterOptions = [
  'All',
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Mechanical & Automation Engineering',
  'School of Business & Management',
  'Department of Applied Sciences & Physics',
  'Department of Humanities & Social Sciences',
];

const Faculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [activeModalFaculty, setActiveModalFaculty] = useState(null);

  useEffect(() => {
    fetchFaculties();
  }, [selectedDept]);

  const fetchFaculties = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedDept !== 'All') params.department = selectedDept;
      const res = await api.get('/faculties', { params });
      setFaculties(res.data || []);
    } catch (err) {
      console.error('Error fetching faculties:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculties = faculties.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.specialization.toLowerCase().includes(search.toLowerCase())
  );

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
              label="OUR EXPERTS" 
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
              Faculty Directory
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
              Meet our world-class professors, researchers, and mentors committed to pushing the boundaries of technology and academic scholarship.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* Search & Filter */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                placeholder="Search faculty by name, designation, or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    '&:hover fieldset': {
                      borderColor: '#2563EB',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563EB',
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon size={20} color="#64748B" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                select
                fullWidth
                label="Filter by Department"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    '&:hover fieldset': {
                      borderColor: '#2563EB',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563EB',
                    },
                  },
                }}
              >
                {departmentsFilterOptions.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>

        {/* Faculty Grid */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#2563EB' }} size={50} />
          </Box>
        ) : filteredFaculties.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            bgcolor: 'background.default', 
            borderRadius: '8px', 
            border: '1px solid rgba(15, 23, 42, 0.08)',
          }}>
            <User size={48} color="#64748B" style={{ marginBottom: 16 }} />
            <Typography variant="h6" sx={{ color: '#64748B' }}>
              No faculty members found.
            </Typography>
          </Box>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              {filteredFaculties.map((fac) => (
                <Grid item xs={12} sm={6} md={4} key={fac._id}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 4,
                        textAlign: 'center',
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
                      <Avatar
                        src={fac.avatar}
                        alt={fac.name}
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 3,
                          border: '3px solid rgba(37, 99, 235, 0.2)',
                          boxShadow: '0 4px 16px rgba(37, 99, 235, 0.15)',
                        }}
                      />

                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                        {fac.name}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ color: '#2563EB', fontWeight: 600, mb: 2 }}>
                        {fac.title}
                      </Typography>

                      <Chip
                        label={fac.department}
                        size="small"
                        sx={{
                          width: 'fit-content',
                          mx: 'auto',
                          mb: 2,
                          bgcolor: 'rgba(37, 99, 235, 0.1)',
                          color: '#2563EB',
                          fontWeight: 600,
                          borderRadius: '8px',
                        }}
                      />

                      <Typography variant="body2" sx={{ color: '#64748B', mb: 3, fontSize: '0.9rem' }}>
                        <strong>Qualification:</strong> {fac.qualification}
                      </Typography>

                      <Divider sx={{ my: 2, borderColor: 'rgba(15, 23, 42, 0.08)' }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                          <BookOpen size={16} color="#F59E0B" />
                          <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A' }}>
                            {fac.publicationsCount} Papers
                          </Typography>
                        </Stack>

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => setActiveModalFaculty(fac)}
                          sx={{
                            borderRadius: '8px',
                            borderColor: 'rgba(15, 23, 42, 0.2)',
                            color: '#0F172A',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                              borderColor: '#2563EB',
                              backgroundColor: 'rgba(37, 99, 235, 0.05)',
                            },
                          }}
                        >
                          View Profile
                        </Button>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>

      {/* Modal */}
      <FacultyDetailModal
        open={Boolean(activeModalFaculty)}
        onClose={() => setActiveModalFaculty(null)}
        faculty={activeModalFaculty}
      />
    </Box>
  );
};

export default Faculties;