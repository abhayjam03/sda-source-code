'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Fab
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Security as SecurityIcon,
  AccountBalance as AccountBalanceIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import useAuthStore from '@/store/authStore';

const drawerWidth = 280;
const collapsedDrawerWidth = 70;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Academy', icon: <SchoolIcon />, path: '/admin/academy' },
  { text: 'Courses', icon: <BookIcon />, path: '/admin/courses' },
  { text: 'Forces', icon: <SecurityIcon />, path: '/admin/forces' },
  { text: 'Schools', icon: <AccountBalanceIcon />, path: '/admin/schools' }
];

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuthStore();

  // Auto-collapse drawer on mobile
  useEffect(() => {
    if (isMobile) {
      setDrawerCollapsed(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerCollapse = () => {
    setDrawerCollapsed(!drawerCollapsed);
  };

  const handleNavigation = (path) => {
    router.push(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const isActiveRoute = (path) => {
    return pathname === path;
  };

  const currentDrawerWidth = drawerCollapsed ? collapsedDrawerWidth : drawerWidth;

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          minHeight: 64,
          borderBottom: 1,
          borderColor: 'divider',
          flexShrink: 0
        }}
      >
        {!drawerCollapsed && (
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
            SDA Admin
          </Typography>
        )}
        <IconButton onClick={handleDrawerCollapse} sx={{ ml: 'auto' }}>
          {drawerCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {/* Navigation Menu - Scrollable */}
      <Box sx={{ flexGrow: 1 }}>
        <List sx={{ pt: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 1,
                backgroundColor: isActiveRoute(item.path) ? 'primary.main' : 'transparent',
                color: isActiveRoute(item.path) ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: isActiveRoute(item.path) ? 'primary.dark' : 'action.hover',
                  cursor: 'pointer',
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: isActiveRoute(item.path) ? 'white' : 'inherit',
                minWidth: drawerCollapsed ? 40 : 56
              }}>
                {item.icon}
              </ListItemIcon>
              {!drawerCollapsed && (
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontWeight: isActiveRoute(item.path) ? 'bold' : 'normal'
                    }
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>

    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { md: `${currentDrawerWidth}px` },
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Surya Defence Academy - Admin Panel
          </Typography>

          {/* Top Bar Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Home Button */}
            <Tooltip title="Go to Home">
              <IconButton
                color="inherit"
                onClick={() => router.push('/')}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                onClick={handleNotificationsOpen}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Tooltip title="Profile">
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Navigation Drawer */}
      <Box
        component="nav"
        sx={{ 
          width: { md: currentDrawerWidth }, 
          flexShrink: { md: 0 },
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: theme.zIndex.drawer
        }}
        aria-label="admin navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              height: '100vh',
              top: 0,
              left: 0,
              zIndex: theme.zIndex.drawer
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: currentDrawerWidth,
              height: '100vh',
              top: 0,
              left: 0,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              zIndex: theme.zIndex.drawer,
              overflow: 'hidden'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: { 
            xs: '100%',
            md: `calc(100% - ${currentDrawerWidth}px)` 
          },
          ml: { 
            xs: 0,
            md: `${currentDrawerWidth}px` 
          },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflow: 'hidden'
        }}
      >
        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            mt: { xs: 7, md: 8 }, // Account for AppBar height
            mb: { xs: 8, md: 0 }, // Space for mobile FAB
            width: '100%',
            maxWidth: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 'calc(100vh - 64px)', // Subtract AppBar height
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#c1c1c1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#a8a8a8',
            },
          }}
        >
          {children}
        </Box>

      </Box>

      {/* Mobile Floating Action Button for Navigation */}
      <Fab
        color="primary"
        aria-label="menu"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'block', md: 'none' },
          zIndex: 1000
        }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </Fab>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2">New course added</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2">Academy registration pending</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2">System update available</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
} 