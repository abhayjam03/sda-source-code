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
  Book as BookIcon
} from '@mui/icons-material';
import axios from '@/utils/axios';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    examPattern: {
      mode: '',
      duration: '',
      totalQuestions: '',
      totalMarks: '',
      subjects: [],
      markingScheme: {
        correct: '',
        incorrect: ''
      },
      passingMarks: ''
    },
    eligibility: {
      education: '',
      age: {
        min: '',
        max: ''
      },
      physicalRequirements: []
    }
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      setError('Error fetching courses');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData(course);
    } else {
      setEditingCourse(null);
      setFormData({
        name: '',
        type: '',
        description: '',
        examPattern: {
          mode: '',
          duration: '',
          totalQuestions: '',
          totalMarks: '',
          subjects: [],
          markingScheme: {
            correct: '',
            incorrect: ''
          },
          passingMarks: ''
        },
        eligibility: {
          education: '',
          age: {
            min: '',
            max: ''
          },
          physicalRequirements: []
        }
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCourse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCourse) {
        await axios.put(`/api/courses/${editingCourse._id}`, formData);
        setSuccess('Course updated successfully');
      } else {
        await axios.post('/api/courses', formData);
        setSuccess('Course added successfully');
      }
      handleClose();
      fetchCourses();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error saving course');
      console.error('Error saving course:', error);
      setTimeout(() => setError(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/courses/${id}`);
        setSuccess('Course deleted successfully');
        fetchCourses();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Error deleting course');
        console.error('Error deleting course:', error);
        setTimeout(() => setError(''), 3000);
      }
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
        <BookIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main', mr: 2 }} />
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1"
          sx={{ fontWeight: 'bold', flexGrow: 1 }}
        >
          Courses Management
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
          {isMobile ? 'Add' : 'Add Course'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Mobile Card View */}
      {isMobile ? (
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid item xs={12} key={course._id}>
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
                    {course.name}
                  </Typography>
                  <Chip 
                    label={course.type} 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                  <Tooltip title="Edit">
                    <IconButton 
                      onClick={() => handleOpen(course)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      onClick={() => handleDelete(course._id)}
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
              {courses.map((course) => (
                <TableRow key={course._id} hover>
                  <TableCell sx={{ fontWeight: 'medium' }}>{course.name}</TableCell>
                  <TableCell>
                    <Chip label={course.type} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpen(course)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(course._id)} color="error">
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
            {editingCourse ? 'Edit Course' : 'Add Course'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course Name"
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
                  label="Course Type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  variant="outlined"
                >
                  <MenuItem value="Army">Army</MenuItem>
                  <MenuItem value="Navy">Navy</MenuItem>
                  <MenuItem value="Air Force">Air Force</MenuItem>
                  <MenuItem value="NDA">NDA</MenuItem>
                  <MenuItem value="CDS">CDS</MenuItem>
                  <MenuItem value="AFCAT">AFCAT</MenuItem>
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
            {saving ? 'Saving...' : (editingCourse ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 