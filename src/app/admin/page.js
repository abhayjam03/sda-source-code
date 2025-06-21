'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Security as SecurityIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import useAuthStore from '@/store/authStore';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAcademies: 0,
    totalCourses: 0,
    totalForces: 0,
    totalSchools: 0
  });
  const { user } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // You can add API calls here to fetch real stats
        setStats({
          totalAcademies: 5,
          totalCourses: 12,
          totalForces: 8,
          totalSchools: 15
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Academies',
      value: stats.totalAcademies,
      icon: <SchoolIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main' }} />,
      color: '#1976d2'
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: <BookIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'success.main' }} />,
      color: '#2e7d32'
    },
    {
      title: 'Total Forces',
      value: stats.totalForces,
      icon: <SecurityIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'warning.main' }} />,
      color: '#ed6c02'
    },
    {
      title: 'Total Schools',
      value: stats.totalSchools,
      icon: <AccountBalanceIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'error.main' }} />,
      color: '#d32f2f'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        component="h1" 
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Admin Dashboard
      </Typography>
      
      {user && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Welcome back, {user.username}! Here's an overview of your academy system.
        </Typography>
      )}

      {/* Stats Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography 
                      variant={isMobile ? "h5" : "h4"} 
                      component="div" 
                      sx={{ fontWeight: 'bold' }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                    >
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions and Recent Activity */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} lg={6}>
          <Paper 
            sx={{ 
              p: { xs: 2, md: 3 },
              height: '100%',
              transition: 'box-shadow 0.2s ease-in-out',
              '&:hover': {
                boxShadow: theme.shadows[4]
              }
            }}
          >
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              Quick Actions
            </Typography>
            <List sx={{ p: 0 }}>
              <ListItem 
                button 
                component="a" 
                href="/admin/academy"
                sx={{ 
                  borderRadius: 1, 
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Manage Academies" 
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
              <ListItem 
                button 
                component="a" 
                href="/admin/courses"
                sx={{ 
                  borderRadius: 1, 
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'success.light',
                    color: 'white'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Manage Courses" 
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
              <ListItem 
                button 
                component="a" 
                href="/admin/forces"
                sx={{ 
                  borderRadius: 1, 
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'warning.light',
                    color: 'white'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Manage Forces" 
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
              <ListItem 
                button 
                component="a" 
                href="/admin/schools"
                sx={{ 
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'error.light',
                    color: 'white'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Manage Schools" 
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} lg={6}>
          <Paper 
            sx={{ 
              p: { xs: 2, md: 3 },
              height: '100%',
              transition: 'box-shadow 0.2s ease-in-out',
              '&:hover': {
                boxShadow: theme.shadows[4]
              }
            }}
          >
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              Recent Activity
            </Typography>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <TrendingUpIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="New course added" 
                  secondary="NDA Foundation Course - 2 hours ago"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="New academy registered" 
                  secondary="Delhi Defence Academy - 1 day ago"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <BookIcon color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Course updated" 
                  secondary="CDS Preparation Course - 2 days ago"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 