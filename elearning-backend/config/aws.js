const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  region: 'ap-south-1',
  // Credentials will be automatically loaded from environment variables or IAM role
});

// Initialize S3 and DynamoDB clients
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

// S3 bucket configurations
const COURSE_CONTENT_BUCKET = 'elearning-course-content';

// DynamoDB table names
const TABLES = {
  COURSES: 'Courses',
  COURSE_CONTENT: 'CourseContent',
  USER_PROGRESS: 'UserProgress'
};

module.exports = {
  s3,
  dynamodb,
  COURSE_CONTENT_BUCKET,
  TABLES
}; 