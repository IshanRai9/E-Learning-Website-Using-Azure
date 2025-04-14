import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Divider,
  Rating,
} from '@mui/material';
import {
  FaPlay,
  FaClock,
  FaBook,
  FaUsers,
  FaCertificate,
  FaChevronDown,
  FaVideo,
  FaFile,
  FaQuestionCircle,
  FaLock,
} from 'react-icons/fa';

// Mock data - Replace with API calls
const COURSE_DATA = {
  id: 1,
  title: 'Complete Web Development Bootcamp',
  description: 'Learn web development from scratch with this comprehensive course covering HTML, CSS, JavaScript, React, and more.',
  thumbnail: '/images/courses/web-dev.jpg',
  instructor: {
    name: 'John Doe',
    avatar: '/images/instructors/john-doe.jpg',
    title: 'Senior Web Developer',
    courses: 12,
    students: 15000,
  },
  stats: {
    enrolled: 2500,
    rating: 4.8,
    reviews: 450,
    duration: '30 hours',
    lectures: 280,
    level: 'Beginner to Advanced',
  },
  price: 99.99,
  curriculum: [
    {
      title: 'Introduction to Web Development',
      items: [
        { title: 'Course Overview', duration: '5:00', type: 'video', free: true },
        { title: 'Setting Up Your Development Environment', duration: '15:00', type: 'video' },
        { title: 'Web Development Basics', duration: '20:00', type: 'video' },
      ],
    },
    {
      title: 'HTML Fundamentals',
      items: [
        { title: 'HTML Structure', duration: '18:00', type: 'video' },
        { title: 'Working with Text', duration: '12:00', type: 'video' },
        { title: 'HTML Practice Quiz', type: 'quiz' },
      ],
    },
    // Add more sections as needed
  ],
};

function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ py: 3 }}>{children}</Box>;
}

function Course() {
  const { courseId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout>
      {/* Course Header */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                {COURSE_DATA.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                {COURSE_DATA.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Rating value={COURSE_DATA.stats.rating} precision={0.1} readOnly />
                <Typography>({COURSE_DATA.stats.reviews} reviews)</Typography>
                <Chip 
                  icon={<FaUsers />} 
                  label={`${COURSE_DATA.stats.enrolled} students`} 
                  variant="outlined" 
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={COURSE_DATA.instructor.avatar} />
                <Typography>Created by <strong>{COURSE_DATA.instructor.name}</strong></Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={4}>
                <CardContent>
                  <Box
                    component="img"
                    src={COURSE_DATA.thumbnail}
                    sx={{
                      width: '100%',
                      borderRadius: 1,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    ${COURSE_DATA.price}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mb: 2 }}
                  >
                    Enroll Now
                  </Button>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <FaClock />
                      </ListItemIcon>
                      <ListItemText 
                        primary={COURSE_DATA.stats.duration} 
                        secondary="Course Duration" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FaBook />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${COURSE_DATA.stats.lectures} lectures`} 
                        secondary="Total Lectures" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FaCertificate />
                      </ListItemIcon>
                      <ListItemText 
                        primary={COURSE_DATA.stats.level} 
                        secondary="Difficulty Level" 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Course Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Curriculum" />
            <Tab label="Overview" />
            <Tab label="Instructor" />
            <Tab label="Reviews" />
          </Tabs>
        </Box>

        {/* Curriculum Tab */}
        <TabPanel value={tabValue} index={0}>
          {COURSE_DATA.curriculum.map((section, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<FaChevronDown />}>
                <Typography variant="h6">{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {section.items.map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:last-child': { borderBottom: 0 },
                      }}
                    >
                      <ListItemIcon>
                        {item.type === 'video' ? <FaVideo /> : 
                         item.type === 'quiz' ? <FaQuestionCircle /> : 
                         <FaFile />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {item.title}
                            {!item.free && <FaLock style={{ marginLeft: 8, fontSize: 14 }} />}
                          </Box>
                        }
                        secondary={item.duration}
                      />
                      {item.free && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FaPlay />}
                        >
                          Preview
                        </Button>
                      )}
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            What you'll learn
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>✓</ListItemIcon>
                  <ListItemText primary="Build modern responsive websites" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>✓</ListItemIcon>
                  <ListItemText primary="Master HTML5, CSS3, and JavaScript" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>✓</ListItemIcon>
                  <ListItemText primary="Learn React and modern frameworks" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>✓</ListItemIcon>
                  <ListItemText primary="Build real-world projects" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Instructor Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Avatar
                src={COURSE_DATA.instructor.avatar}
                sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                {COURSE_DATA.instructor.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {COURSE_DATA.instructor.title}
              </Typography>
              <Box sx={{ my: 2 }}>
                <Chip 
                  icon={<FaBook />} 
                  label={`${COURSE_DATA.instructor.courses} courses`} 
                  sx={{ mr: 1 }} 
                />
                <Chip 
                  icon={<FaUsers />} 
                  label={`${COURSE_DATA.instructor.students} students`} 
                />
              </Box>
              <Typography paragraph>
                Professional web developer with over 10 years of experience in full-stack development.
                Passionate about teaching and helping others learn web development.
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Reviews Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Typography variant="h1" sx={{ mr: 3 }}>
              {COURSE_DATA.stats.rating}
            </Typography>
            <Box>
              <Rating value={COURSE_DATA.stats.rating} precision={0.1} readOnly size="large" />
              <Typography>Course Rating • {COURSE_DATA.stats.reviews} Reviews</Typography>
            </Box>
          </Box>
          {/* Add review list here */}
        </TabPanel>
      </Container>
    </Layout>
  );
}

export default Course; 