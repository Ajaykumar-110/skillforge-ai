import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Button,
  Grid,
  Card,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import EmailIcon from '@mui/icons-material/Email';
import api from '../services/api';
import { toast } from 'react-toastify';

const categories = ['All', 'Admissions', 'Academics', 'Hostel & Facilities', 'Placements', 'Examinations'];

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, [selectedCategory]);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      const res = await api.get('/faqs', { params });
      setFaqs(res.data || []);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleContactHelpdesk = () => {
    toast.info('Directing to EduNova Academic Helpdesk support line: admissions@skillforge.edu');
  };

  return (
    <Box sx={{ pb: 10 }}>
      {/* Header Banner */}
      <Box
        sx={{
          background: '#FFFFFF',
          color: '#111827',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
          mb: 6,
          borderBottom: '4px solid #4F46E5',
        }}
      >
        <Container maxWidth="md">
          <Chip label="SUPPORT & HELP" size="small" sx={{ bgcolor: '#4F46E5', color: '#FFFFFF', fontWeight: 800, mb: 2, borderRadius: '8px' }} />
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1.5 }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', maxWidth: 600, mx: 'auto' }}>
            Find immediate answers regarding admissions, academic policies, hostel amenities, campus placements, and semester examinations.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Controls */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Search questions (e.g., scholarships, hostel, JEE rank)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#1E40AF' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={7}>
              <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 0.5 }}>
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    onClick={() => setSelectedCategory(cat)}
                    sx={{
                      px: 2,
                      py: 2.2,
                      fontWeight: 700,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      bgcolor: selectedCategory === cat ? '#111827' : '#FFFFFF',
                      color: selectedCategory === cat ? 'white' : '#111827',
                      border: '1px solid',
                      borderColor: selectedCategory === cat ? '#111827' : '#E5E7EB',
                      '&:hover': {
                        bgcolor: selectedCategory === cat ? '#111827' : '#F9FAFB',
                        borderColor: selectedCategory === cat ? '#111827' : '#4F46E5',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* FAQ Accordions */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress color="primary" size={50} />
          </Box>
        ) : filteredFaqs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'white', borderRadius: '8px', border: '1px solid #BAE6FD' }}>
            <Typography variant="h6" sx={{ color: '#64748B' }}>
              No matching questions found.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2} sx={{ mb: 8 }}>
            {filteredFaqs.map((faq, index) => (
              <Accordion
                key={faq._id || index}
                expanded={expanded === index}
                onChange={handleAccordionChange(index)}
                sx={{
                  borderRadius: '8px',
                  border: '1px solid #BAE6FD',
                  boxShadow: expanded === index ? '0 8px 25px rgba(15, 82, 186, 0.12)' : 'none',
                  '&:before': { display: 'none' },
                  overflow: 'hidden',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#1E40AF' }} />}
                  sx={{
                    p: 2.5,
                    bgcolor: expanded === index ? 'rgba(15, 82, 186, 0.03)' : 'white',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <HelpOutlinedIcon sx={{ color: '#D97706' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '1.05rem' }}>
                      {faq.question}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 3, pt: 1, bgcolor: 'white' }}>
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={faq.category}
                      size="small"
                      sx={{ bgcolor: 'rgba(79, 70, 229, 0.15)', color: '#0891B2', fontWeight: 700 }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        )}

        {/* Still Have Questions Box */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, #0F172A 0%, #0F172A 100%)',
            color: 'white',
            p: 4,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '8px',
                bgcolor: 'rgba(79, 70, 229, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ContactSupportIcon sx={{ color: '#D97706', fontSize: 36 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Still Have Questions?
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Our academic counseling team is available Monday - Saturday to assist you.
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<EmailIcon />}
            onClick={handleContactHelpdesk}
          >
            Contact Helpdesk
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default FAQ;
