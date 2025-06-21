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
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import axios from '@/utils/axios';

export default function SchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    examPatterns: [{
      class: '',
      mode: '',
      duration: '',
      totalQuestions: '',
      totalMarks: '',
      subjects: [{ name: '', questions: '', marks: '' }],
      markingScheme: {
        correct: '',
        incorrect: ''
      }
    }]
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/schools');
      setSchools(response.data);
    } catch (error) {
      setError('Error fetching schools');
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (school = null) => {
    if (school) {
      setEditingSchool(school);
      setFormData(school);
    } else {
      setEditingSchool(null);
      setFormData({
        name: '',
        type: '',
        description: '',
        examPatterns: [{
          class: '',
          mode: '',
          duration: '',
          totalQuestions: '',
          totalMarks: '',
          subjects: [{ name: '', questions: '', marks: '' }],
          markingScheme: {
            correct: '',
            incorrect: ''
          }
        }]
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSchool(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingSchool) {
        await axios.put(`/api/schools/${editingSchool._id}`, formData);
        setSuccess('School updated successfully');
      } else {
        await axios.post('/api/schools', formData);
        setSuccess('School added successfully');
      }
      handleClose();
      fetchSchools();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error saving school');
      console.error('Error saving school:', error);
      setTimeout(() => setError(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      try {
        await axios.delete(`/api/schools/${id}`);
        setSuccess('School deleted successfully');
        fetchSchools();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Error deleting school');
        console.error('Error deleting school:', error);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const addExamPattern = () => {
    setFormData({
      ...formData,
      examPatterns: [
        ...formData.examPatterns,
        {
          class: '',
          mode: '',
          duration: '',
          totalQuestions: '',
          totalMarks: '',
          subjects: [{ name: '', questions: '', marks: '' }],
          markingScheme: {
            correct: '',
            incorrect: ''
          }
        }
      ]
    });
  };

  const removeExamPattern = (index) => {
    const newPatterns = formData.examPatterns.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      examPatterns: newPatterns
    });
  };

  const updateExamPattern = (index, field, value) => {
    const newPatterns = [...formData.examPatterns];
    newPatterns[index] = {
      ...newPatterns[index],
      [field]: value
    };
    setFormData({
      ...formData,
      examPatterns: newPatterns
    });
  };

  const addSubject = (patternIndex) => {
    const newPatterns = [...formData.examPatterns];
    newPatterns[patternIndex].subjects.push({
      name: '',
      questions: '',
      marks: ''
    });
    setFormData({
      ...formData,
      examPatterns: newPatterns
    });
  };

  const removeSubject = (patternIndex, subjectIndex) => {
    const newPatterns = [...formData.examPatterns];
    newPatterns[patternIndex].subjects = newPatterns[patternIndex].subjects.filter(
      (_, i) => i !== subjectIndex
    );
    setFormData({
      ...formData,
      examPatterns: newPatterns
    });
  };

  const updateSubject = (patternIndex, subjectIndex, field, value) => {
    const newPatterns = [...formData.examPatterns];
    newPatterns[patternIndex].subjects[subjectIndex] = {
      ...newPatterns[patternIndex].subjects[subjectIndex],
      [field]: value
    };
    setFormData({
      ...formData,
      examPatterns: newPatterns
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
        <AccountBalanceIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main', mr: 2 }} />
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1"
          sx={{ fontWeight: 'bold', flexGrow: 1 }}
        >
          Schools Management
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
          {isMobile ? 'Add' : 'Add School'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Mobile Card View */}
      {isMobile ? (
        <Grid container spacing={2}>
          {schools.map((school) => (
            <Grid item xs={12} key={school._id}>
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
                    {school.name}
                  </Typography>
                  <Chip 
                    label={school.type} 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {school.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                  <Tooltip title="Edit">
                    <IconButton 
                      onClick={() => handleOpen(school)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      onClick={() => handleDelete(school._id)}
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
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schools.map((school) => (
                <TableRow key={school._id} hover>
                  <TableCell sx={{ fontWeight: 'medium' }}>{school.name}</TableCell>
                  <TableCell>
                    <Chip label={school.type} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{school.description}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpen(school)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(school._id)} color="error">
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
            {editingSchool ? 'Edit School' : 'Add School'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="School Name"
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
                  label="School Type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  variant="outlined"
                >
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Secondary">Secondary</MenuItem>
                  <MenuItem value="Higher Secondary">Higher Secondary</MenuItem>
                  <MenuItem value="International">International</MenuItem>
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                </TextField>
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
            {saving ? 'Saving...' : (editingSchool ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}