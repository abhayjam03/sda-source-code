'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Card,
  CardContent
} from '@mui/material';
import {
  School as SchoolIcon,
  Add as AddIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import axios from '@/utils/axios';

export default function AcademyCMS() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
    overview: '',
    features: [],
    specialConcessions: []
  });
  const [newFeature, setNewFeature] = useState('');
  const [newConcession, setNewConcession] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchAcademyData();
  }, []);

  const fetchAcademyData = async () => {
    try {
      const response = await axios.get('/api/academy');
      setFormData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching academy data');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleAddConcession = () => {
    if (newConcession.trim()) {
      setFormData({
        ...formData,
        specialConcessions: [...formData.specialConcessions, newConcession.trim()]
      });
      setNewConcession('');
    }
  };

  const handleRemoveConcession = (index) => {
    setFormData({
      ...formData,
      specialConcessions: formData.specialConcessions.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put('/api/academy', formData);
      setSuccess('Academy information updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error updating academy information');
      setTimeout(() => setError(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SchoolIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main', mr: 2 }} />
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1"
          sx={{ fontWeight: 'bold' }}
        >
          Academy Information
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper 
        sx={{ 
          p: { xs: 2, md: 3 },
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[4]
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 2 }}
              >
                Basic Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Academy Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: { xs: 1, md: 0 } }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: { xs: 1, md: 0 } }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Information"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                variant="outlined"
                helperText="Phone number, email, or address"
                sx={{ mb: { xs: 1, md: 0 } }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                multiline
                rows={4}
                required
                variant="outlined"
                helperText="Brief description of the academy"
                sx={{ mb: { xs: 1, md: 0 } }}
              />
            </Grid>

            {/* Features Section */}
            <Grid item xs={12}>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    Academy Features
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Add Feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddFeature}
                      disabled={!newFeature.trim()}
                      startIcon={<AddIcon />}
                      sx={{ 
                        minWidth: { xs: '100%', sm: 'auto' },
                        height: { xs: 40, sm: 56 }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        onDelete={() => handleRemoveFeature(index)}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))}
                    {formData.features.length === 0 && (
                      <Typography variant="body2" color="text.secondary">
                        No features added yet
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Special Concessions Section */}
            <Grid item xs={12}>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    Special Concessions
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Add Concession"
                      value={newConcession}
                      onChange={(e) => setNewConcession(e.target.value)}
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddConcession}
                      disabled={!newConcession.trim()}
                      startIcon={<AddIcon />}
                      sx={{ 
                        minWidth: { xs: '100%', sm: 'auto' },
                        height: { xs: 40, sm: 56 }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.specialConcessions.map((concession, index) => (
                      <Chip
                        key={index}
                        label={concession}
                        onDelete={() => handleRemoveConcession(index)}
                        color="secondary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))}
                    {formData.specialConcessions.length === 0 && (
                      <Typography variant="body2" color="text.secondary">
                        No concessions added yet
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={saving}
                  startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                  sx={{
                    minWidth: { xs: '100%', sm: 200 },
                    height: { xs: 48, sm: 56 }
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
} 