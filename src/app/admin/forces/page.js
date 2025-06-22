'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Chip,
  Alert,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import axios from '@/utils/axios';

export default function ForcesPage() {
  const [forces, setForces] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingForce, setEditingForce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    established: '',
    description: '',
    responsibilities: [''],
    examPattern: {
      mode: '',
      duration: '',
      totalQuestions: '',
      totalMarks: '',
      subjects: [{ name: '', questions: '' }],
      markingScheme: {
        correct: '',
        incorrect: ''
      }
    }
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchForces();
  }, []);

  const fetchForces = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/forces');
      setForces(response.data);
    } catch (error) {
      setError('Error fetching forces');
      console.error('Error fetching forces:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (force = null) => {
    if (force) {
      setEditingForce(force);
      setFormData(force);
    } else {
      setEditingForce(null);
      setFormData({
        name: '',
        type: '',
        established: '',
        description: '',
        responsibilities: [''],
        examPattern: {
          mode: '',
          duration: '',
          totalQuestions: '',
          totalMarks: '',
          subjects: [{ name: '', questions: '' }],
          markingScheme: {
            correct: '',
            incorrect: ''
          }
        }
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingForce(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingForce) {
        await axios.put(`/api/forces/${editingForce._id}`, formData);
        setSuccess('Force updated successfully');
      } else {
        await axios.post('/api/forces', formData);
        setSuccess('Force added successfully');
      }
      handleClose();
      fetchForces();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error saving force');
      console.error('Error saving force:', error);
      setTimeout(() => setError(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this force?')) {
      try {
        await axios.delete(`/api/forces/${id}`);
        setSuccess('Force deleted successfully');
        fetchForces();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Error deleting force');
        console.error('Error deleting force:', error);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, '']
    });
  };

  const updateResponsibility = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({
      ...formData,
      responsibilities: newResponsibilities
    });
  };

  const removeResponsibility = (index) => {
    const newResponsibilities = formData.responsibilities.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      responsibilities: newResponsibilities
    });
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
        <SecurityIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main', mr: 2 }} />
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1"
          sx={{ fontWeight: 'bold', flexGrow: 1 }}
        >
          Forces Management
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => handleOpen()}
          startIcon={<AddIcon />}
          sx={{ 
            minWidth: { xs: 'auto', sm: 140 },
            height: { xs: 40, sm: 48 }
          }}
        >
          {isMobile ? 'Add' : 'Add Force'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Mobile Card View */}
      {isMobile ? (
        <Grid container spacing={2}>
          {forces.map((force) => (
            <Grid item xs={12} key={force._id}>
              <Card 
                sx={{ 
                  transition: 'box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {force.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={force.type} 
                      color="primary" 
                      size="small"
                    />
                    <Chip 
                      label={force.established} 
                      color="secondary" 
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {force.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                  <Tooltip title="Edit">
                    <IconButton 
                      onClick={() => handleOpen(force)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      onClick={() => handleDelete(force._id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        /* Desktop Table View */
        <TableContainer component={Paper} sx={{ boxShadow: theme.shadows[2] }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Established</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forces.map((force) => (
                <TableRow key={force._id} hover>
                  <TableCell sx={{ fontWeight: 'medium' }}>{force.name}</TableCell>
                  <TableCell>
                    <Chip label={force.type} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{force.established}</TableCell>
                  <TableCell>{force.description}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpen(force)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(force._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 'bold' }}>
            {editingForce ? 'Edit Force' : 'Add Force'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Force Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Force Type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  variant="outlined"
                >
                  <MenuItem value="Army">Army</MenuItem>
                  <MenuItem value="Navy">Navy</MenuItem>
                  <MenuItem value="Air Force">Air Force</MenuItem>
                  <MenuItem value="Paramilitary">Paramilitary</MenuItem>
                  <MenuItem value="Police">Police</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Established Year"
                  value={formData.established}
                  onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, md: 3 } }}>
          <Button onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : null}
          >
            {saving ? 'Saving...' : (editingForce ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 