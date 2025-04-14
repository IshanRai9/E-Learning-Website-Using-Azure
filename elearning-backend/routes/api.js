const express = require("express");
const router = express.Router();
const courseContentRoutes = require('./courseContent');
const courseRoutes = require('./courses');

// Course content routes
router.use('/course-content', courseContentRoutes);

// Course routes
router.use('/courses', courseRoutes);

// Example API endpoint
router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// Add more routes as needed
// Example: A sample endpoint to fetch courses
router.get("/courses", (req, res) => {
  res.json([
    { id: 1, name: "JavaScript Basics" },
    { id: 2, name: "Advanced Node.js" },
  ]);
});

module.exports = router;
