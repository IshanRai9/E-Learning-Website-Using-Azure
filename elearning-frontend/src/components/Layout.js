import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaBook, FaUser } from 'react-icons/fa';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{ mr: 2 }}
            >
              <FaBook />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E-Learning Platform
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/courses">
              Courses
            </Button>
            <Button color="inherit" component={Link} to="/login">
              <FaUser style={{ marginRight: '8px' }} />
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} E-Learning Platform. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout; 