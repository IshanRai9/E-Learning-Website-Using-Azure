import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  MenuItem,
  Chip,
  Rating,
  IconButton,
  Skeleton,
} from '@mui/material';
import {
  FaPlay,
  FaClock,
  FaUsers,
  FaSearch,
  FaBookmark
} from 'react-icons/fa';

// Mock data - Replace with actual API calls
const MOCK_COURSES = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    thumbnail: '/images/courses/web-dev.jpg',
    duration: '10 hours',
    students: 1234,
    rating: 4.5,
    instructor: 'John Doe',
    level: 'Beginner',
    category: 'Web Development',
  },
  // Add more mock courses here
];

const CATEGORIES = [
  'All',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'DevOps',
];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  return (
    <Layout>
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          {/* Search and Filters */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search courses..."
                value={search}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <FaSearch style={{ marginRight: 8 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                value={level}
                onChange={handleLevelChange}
                label="Level"
              >
                {LEVELS.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Course Grid */}
          <Grid container spacing={4}>
            {(loading ? Array(6).fill({}) : MOCK_COURSES).map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course.id || index}>
                {loading ? (
                  <CourseCardSkeleton />
                ) : (
                  <CourseCard course={course} />
                )}
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

function CourseCard({ course }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardMedia
        component="div"
        sx={{
          pt: '56.25%', // 16:9 aspect ratio
          position: 'relative',
        }}
        image={course.thumbnail}
      >
        <Button
          variant="contained"
          startIcon={<FaPlay />}
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          Preview
        </Button>
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <FaBookmark />
        </IconButton>
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {course.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={course.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({course.rating})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaClock style={{ marginRight: 4 }} />
            <Typography variant="body2" color="text.secondary">
              {course.duration}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaUsers style={{ marginRight: 4 }} />
            <Typography variant="body2" color="text.secondary">
              {course.students} students
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Chip label={course.level} size="small" sx={{ mr: 1 }} />
          <Chip label={course.category} size="small" />
        </Box>
      </CardContent>
    </Card>
  );
}

function CourseCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton height={32} sx={{ mb: 1 }} />
        <Skeleton height={20} width="60%" />
        <Box sx={{ mt: 2 }}>
          <Skeleton height={24} width="40%" />
        </Box>
      </CardContent>
    </Card>
  );
}

export default Courses; 