const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService');
const { Auth } = require('aws-amplify');

// Middleware to verify user authentication
const authenticateUser = async (req, res, next) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Create a new course
router.post('/', authenticateUser, async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Error creating course' });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// Get course by ID
router.get('/:courseId', async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Error fetching course' });
  }
});

// Update course
router.put('/:courseId', authenticateUser, async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.courseId, req.body);
    res.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Error updating course' });
  }
});

// Delete course
router.delete('/:courseId', authenticateUser, async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.courseId);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Error deleting course' });
  }
});

// Update user progress
router.post('/:courseId/progress', authenticateUser, async (req, res) => {
  try {
    const { progress } = req.body;
    const userId = req.user.username;
    const courseId = req.params.courseId;

    const userProgress = await courseService.updateUserProgress(userId, courseId, progress);
    res.json(userProgress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Error updating progress' });
  }
});

// Get user progress for a course
router.get('/:courseId/progress', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.username;
    const courseId = req.params.courseId;

    const progress = await courseService.getUserProgress(userId, courseId);
    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Error fetching progress' });
  }
});

// Get all courses for a user with progress
router.get('/user/enrolled', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.username;
    const courses = await courseService.getUserCourses(userId);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Error fetching user courses' });
  }
});

module.exports = router; 