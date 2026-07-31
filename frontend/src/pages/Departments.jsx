import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import { 
  Search as SearchIcon,
  Monitor as ComputerIcon,
  Cpu as MemoryIcon,
  Wrench as EngineeringIcon,
  Briefcase as BusinessCenterIcon,
  FlaskConical as ScienceIcon,
  BookOpen as MenuBookIcon,
  Users as GroupsIcon,
  Building2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import DepartmentDetailModal from '../components/DepartmentDetailModal';

const categories = ['All', 'Engineering', 'Management', 'Basic Sciences', 'Humanities'];

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

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalDept, setActiveModalDept] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, [selectedCategory]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      const res = await api.get('/departments', { params });
      setDepartments(res.data || []);
    } catch (err) {
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(search.toLowerCase()) ||
      dept.code.toLowerCase().includes(search.toLowerCase()) ||
      dept.description.toLowerCase().includes(search.toLowerCase())
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
      {/* Page Banner */}
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
              label="ACADEMICS" 
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
              Academic Departments
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
              Explore our multidisciplinary departments, cutting-edge laboratory facilities, and comprehensive undergraduate & postgraduate degree programs.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* Controls: Search & Category Filter */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search departments by name, code, or description..."
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

            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    onClick={() => setSelectedCategory(cat)}
                    sx={{
                      borderRadius: '8px',
                      fontWeight: 600,
                      px: 1,
                      py: 0.5,
                      bgcolor: selectedCategory === cat ? 'rgba(37, 99, 235, 0.1)' : 'rgba(15, 23, 42, 0.05)',
                      color: selectedCategory === cat ? '#2563EB' : '#64748B',
                      border: selectedCategory === cat ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid transparent',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(37, 99, 235, 0.05)',
                        color: '#2563EB',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Department Grid */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#2563EB' }} size={50} />
          </Box>
        ) : filteredDepartments.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            bgcolor: 'background.default', 
            borderRadius: '8px', 
            border: '1px solid rgba(15, 23, 42, 0.08)',
          }}>
            <Building2 size={48} color="#64748B" style={{ marginBottom: 16 }} />
            <Typography variant="h6" sx={{ color: '#64748B' }}>
              No departments found matching your criteria.
            </Typography>
          </Box>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              {filteredDepartments.map((dept) => (
                <Grid item xs={12} sm={6} md={4} key={dept._id}>
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
                      onClick={() => setActiveModalDept(dept)}
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
                          sx={{ fontWeight: 700, mb: 1, color: '#0F172A' }}
                        >
                          {dept.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: '#2563EB', fontWeight: 600, mb: 2, display: 'block' }}
                        >
                          {dept.code}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: '#64748B', mb: 3, lineHeight: 1.6 }}
                        >
                          {dept.description?.substring(0, 120)}...
                        </Typography>
                        <Divider sx={{ my: 2, borderColor: 'rgba(15, 23, 42, 0.08)' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <GroupsIcon size={16} color="#64748B" />
                              <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A' }}>
                                {dept.intake} Seats
                              </Typography>
                            </Box>
                          </Stack>
                          <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 600 }}>
                            View Details →
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>

      {/* Modal */}
      <DepartmentDetailModal
        open={Boolean(activeModalDept)}
        onClose={() => setActiveModalDept(null)}
        department={activeModalDept}
      />
    </Box>
  );
};

export default Departments;