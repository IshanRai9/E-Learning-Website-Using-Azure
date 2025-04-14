import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './contexts/AuthContext';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Container,
  useTheme,
  CardMedia
} from '@mui/material';
import { 
  FaBook, 
  FaLaptopCode, 
  FaMobileAlt,
  FaArrowRight
} from 'react-icons/fa';
import Layout from './components/Layout';

const mockCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    instructor: "John Doe",
    price: 49.99,
    image: "https://source.unsplash.com/random/400x300?web",
  },
  {
    id: 2,
    title: "Python Programming Masterclass",
    description: "Master Python programming from scratch",
    instructor: "Jane Smith",
    price: 59.99,
    image: "https://source.unsplash.com/random/400x300?python",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis and visualization",
    instructor: "Mike Johnson",
    price: 69.99,
    image: "https://source.unsplash.com/random/400x300?data",
  },
];

function Home() {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Welcome to E-Learning Platform
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" color="textSecondary">
            Discover our featured courses
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {mockCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Typography>
                    {course.description}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
                    Instructor: {course.instructor}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${course.price}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/course/${course.id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    View Course
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

export default Home;
