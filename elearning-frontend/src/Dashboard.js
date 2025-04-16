import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  LinearProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import {
  FaPlay,
  FaBook,
  FaClock,
  FaTrophy,
  FaCalendarAlt,
  FaUserGraduate,
  FaChartLine,
  FaEdit,
} from 'react-icons/fa';

function Dashboard() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const achievements = [
    { id: 1, title: 'First Course Completed', date: '2024-01-15' },
    { id: 2, title: 'Perfect Score Quiz', date: '2024-02-01' },
  ];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: 'relative' }}>
              <IconButton 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                aria-label="edit profile"
              >
                <FaEdit />
              </IconButton>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    margin: '0 auto 16px',
                    bgcolor: 'primary.main',
                  }}
                >
                  {user?.attributes?.email?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {user?.attributes?.email}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Member since {new Date().toLocaleDateString()}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      <FaBook />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Enrolled Courses" 
                    secondary={enrolledCourses.length}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.light' }}>
                      <FaTrophy />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Achievements" 
                    secondary={achievements.length}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'info.light' }}>
                      <FaChartLine />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Total Learning Hours" 
                    secondary="24 hours"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Current Progress */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <FaUserGraduate style={{ marginRight: 8 }} />
                Your Learning Progress
              </Typography>
              <Grid container spacing={3}>
                {enrolledCourses.map((course) => (
                  <Grid item xs={12} key={course.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            component="img"
                            sx={{
                              width: 80,
                              height: 60,
                              borderRadius: 1,
                              mr: 2,
                              objectFit: 'cover',
                            }}
                            src={course.thumbnail || '/images/default-thumbnail.jpg'}
                            alt={course.title}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              {course.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <FaClock style={{ marginRight: 4, fontSize: 14 }} />
                              <Typography variant="body2" color="text.secondary">
                                Duration: {course.duration}
                              </Typography>
                            </Box>
                          </Box>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<FaPlay />}
                            sx={{ minWidth: 100 }}
                          >
                            Start
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Recent Achievements */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <FaTrophy style={{ marginRight: 8 }} />
                Recent Achievements
              </Typography>
              <List>
                {achievements.map((achievement) => (
                  <React.Fragment key={achievement.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'warning.light' }}>
                          <FaTrophy />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={achievement.title}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FaCalendarAlt style={{ marginRight: 4, fontSize: 14 }} />
                            {achievement.date}
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Dashboard;