import React from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Container,
  useTheme
} from '@mui/material';
import { 
  FaBook, 
  FaLaptopCode, 
  FaMobileAlt,
  FaArrowRight
} from 'react-icons/fa';
import Layout from './components/Layout';

function Home() {
  const theme = useTheme();

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Welcome to Your Learning Journey
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Discover, Learn, and Grow with Our Interactive Courses
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                endIcon={<FaArrowRight />}
                sx={{ mt: 2 }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  height: 'auto',
                  width: '100%',
                  maxHeight: 400,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
                alt="Students learning"
                src="/images/hero-image.jpg"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Why Choose Our Platform?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ fontSize: 48, mb: 2, color: theme.palette.primary.main }}>
                    <FaBook />
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    Comprehensive Courses
                  </Typography>
                  <Typography>
                    Access a wide range of courses designed by industry experts
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ fontSize: 48, mb: 2, color: theme.palette.primary.main }}>
                    <FaLaptopCode />
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    Interactive Learning
                  </Typography>
                  <Typography>
                    Engage with interactive content and practical exercises
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ fontSize: 48, mb: 2, color: theme.palette.primary.main }}>
                    <FaMobileAlt />
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    Learn Anywhere
                  </Typography>
                  <Typography>
                    Access your courses from any device, anytime
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              p: 6,
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Ready to Start Learning?
            </Typography>
            <Typography variant="h6" paragraph>
              Join thousands of students who are already learning with us
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default Home;
