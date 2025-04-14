const express = require('express');
const router = express.Router();
const multer = require('multer');
const courseContentService = require('../services/courseContentService');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  }
});

// Upload course content (video/document)
router.post('/:courseId/upload', upload.single('file'), async (req, res) => {
  try {
    const { courseId } = req.params;
    const { contentType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const content = await courseContentService.uploadContent(file, courseId, contentType);
    res.json(content);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading content' });
  }
});

// Get course content list
router.get('/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const content = await courseContentService.getCourseContent(courseId);
    res.json(content);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Error fetching content' });
  }
});

// Get content URL
router.get('/:courseId/content/:contentId/url', async (req, res) => {
  try {
    const { courseId, contentId } = req.params;
    const content = await courseContentService.getCourseContent(courseId);
    const contentItem = content.find(item => item.contentId === contentId);
    
    if (!contentItem) {
      return res.status(404).json({ error: 'Content not found' });
    }

    const url = await courseContentService.getContentUrl(contentItem.s3Key);
    res.json({ url });
  } catch (error) {
    console.error('URL generation error:', error);
    res.status(500).json({ error: 'Error generating content URL' });
  }
});

// Delete course content
router.delete('/:courseId/content/:contentId', async (req, res) => {
  try {
    const { courseId, contentId } = req.params;
    await courseContentService.deleteContent(courseId, contentId);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Error deleting content' });
  }
});

module.exports = router; 