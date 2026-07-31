import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const DepartmentDetailModal = ({ open, onClose, department }) => {
  if (!department) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          overflow: 'hidden',
        },
      }}
    >
      {/* Header Banner */}
      <Box
        sx={{
          height: 180,
          position: 'relative',
          backgroundImage: `linear-gradient(to bottom, rgba(10, 25, 47, 0.3), rgba(10, 25, 47, 0.9)), url(${department.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: 'white',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Chip
          label={department.category}
          size="small"
          sx={{
            width: 'fit-content',
            mb: 1,
            bgcolor: '#D97706',
            color: '#0F172A',
            fontWeight: 800,
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {department.name} ({department.code})
        </Typography>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0F52BA', mb: 0.5 }}>
                <PersonIcon />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  Head of Department
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
                {department.hod}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0F52BA', mb: 0.5 }}>
                <CalendarMonthIcon />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  Established Year
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
                {department.established}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0F52BA', mb: 0.5 }}>
                <GroupsIcon />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  Annual Student Intake
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
                {department.intake} Seats
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#0F172A' }}>
          Department Overview
        </Typography>
        <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
          {department.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: '#0F172A' }}>
          Offered Academic Degree Programs
        </Typography>
        <Grid container spacing={1}>
          {department.courses?.map((course, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: '8px',
                  bgcolor: 'rgba(15, 82, 186, 0.04)',
                  border: '1px solid rgba(15, 82, 186, 0.1)',
                }}
              >
                <CheckCircleOutlinedIcon sx={{ color: '#D97706' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                  {course}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button variant="contained" color="primary" onClick={onClose} sx={{ px: 4 }}>
          Close Overview
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentDetailModal;
