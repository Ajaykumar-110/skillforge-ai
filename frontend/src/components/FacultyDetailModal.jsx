import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const FacultyDetailModal = ({ open, onClose, faculty }) => {
  if (!faculty) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          bgcolor: '#0A192F',
          color: 'white',
          p: 4,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Avatar
          src={faculty.avatar}
          alt={faculty.name}
          sx={{
            width: 110,
            height: 110,
            mx: 'auto',
            mb: 2,
            border: '4px solid #D97706',
            boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)',
          }}
        />

        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {faculty.name}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: '#D97706', fontWeight: 600, mt: 0.5 }}>
          {faculty.title}
        </Typography>
        <Chip
          label={faculty.department}
          size="small"
          sx={{
            mt: 1.5,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        />
      </Box>

      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0F52BA', mb: 0.5 }}>
                <SchoolIcon fontSize="small" />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  Qualification
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                {faculty.qualification}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0F52BA', mb: 0.5 }}>
                <WorkspacePremiumIcon fontSize="small" />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  Experience
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                {faculty.experience}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
          Specialization Area
        </Typography>
        <Typography variant="body2" sx={{ color: '#0F52BA', fontWeight: 600, mb: 2 }}>
          {faculty.specialization}
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
          Biography & Research Focus
        </Typography>
        <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
          {faculty.bio}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MenuBookIcon sx={{ color: '#D97706' }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
              {faculty.publicationsCount || 0} International Publications
            </Typography>
          </Box>
          <Button
            component="a"
            href={`mailto:${faculty.email}`}
            startIcon={<EmailIcon />}
            variant="outlined"
            size="small"
          >
            Contact
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button variant="contained" onClick={onClose} fullWidth>
          Close Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FacultyDetailModal;
