import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CourseContentUpload from '../components/CourseContentUpload';
import PDFViewer from '../components/PDFViewer';
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
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import {
  FaPlay,
  FaBook,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaFilePdf,
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPdfs = async () => {
      try {
        const response = await fetch(`/api/course-content/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${user.signInUserSession.accessToken.jwtToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPdfs(data.filter(content => content.type === 'pdf'));
        }
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchCourse();
    if (user) {
      fetchPdfs();
    }
  }, [courseId, user]);

  const handlePdfClick = async (pdf) => {
    try {
      const response = await fetch(`/api/course-content/${courseId}/content/${pdf.contentId}/url`, {
        headers: {
          'Authorization': `Bearer ${user.signInUserSession.accessToken.jwtToken}`
        }
      });
      if (response.ok) {
        const { url } = await response.json();
        setSelectedPdf(url);
      }
    } catch (error) {
      console.error('Error getting PDF URL:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <Container>
          <Typography>Course not found</Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Course Overview */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                {course.title}
              </Typography>
              <Typography color="text.secondary" paragraph>
                {course.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FaClock style={{ marginRight: 8 }} />
                  <Typography variant="body2">
                    {course.duration || '10 hours'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FaUsers style={{ marginRight: 8 }} />
                  <Typography variant="body2">
                    {course.enrolledStudents || '100'} students
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Tabs */}
            <Paper sx={{ mb: 3 }}>
              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                <Tab label="Content" />
                <Tab label="Course Materials" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {tabValue === 0 && (
                  <List>
                    {(course.content || []).map((item, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          {item.completed ? (
                            <FaCheckCircle color="success" />
                          ) : (
                            <FaBook />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          secondary={`${item.duration || '1 hour'}`}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FaPlay />}
                        >
                          Start
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                )}

                {tabValue === 1 && (
                  <>
                    {user && <CourseContentUpload courseId={courseId} />}
                    
                    <List>
                      {pdfs.map((pdf, index) => (
                        <ListItem
                          key={index}
                          button
                          onClick={() => handlePdfClick(pdf)}
                        >
                          <ListItemIcon>
                            <FaFilePdf />
                          </ListItemIcon>
                          <ListItemText
                            primary={pdf.title}
                            secondary={new Date(pdf.uploadedAt).toLocaleDateString()}
                          />
                        </ListItem>
                      ))}
                    </List>

                    {selectedPdf && (
                      <PDFViewer url={selectedPdf} />
                    )}
                  </>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Course Info Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Course Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <FaUsers />
                    </ListItemIcon>
                    <ListItemText
                      primary="Instructor"
                      secondary={course.instructor}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FaClock />
                    </ListItemIcon>
                    <ListItemText
                      primary="Total Duration"
                      secondary={course.duration || '10 hours'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FaBook />
                    </ListItemIcon>
                    <ListItemText
                      primary="Lessons"
                      secondary={`${course.content?.length || 0} lessons`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Course; 