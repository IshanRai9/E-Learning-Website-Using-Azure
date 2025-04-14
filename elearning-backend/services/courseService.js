const { dynamodb, TABLES } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

class CourseService {
  // Create a new course
  async createCourse(courseData) {
    const courseId = uuidv4();
    const params = {
      TableName: TABLES.COURSES,
      Item: {
        courseId,
        title: courseData.title,
        description: courseData.description,
        instructor: courseData.instructor,
        price: courseData.price,
        thumbnail: courseData.thumbnail,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    try {
      await dynamodb.put(params).promise();
      return params.Item;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  // Get all courses
  async getAllCourses() {
    const params = {
      TableName: TABLES.COURSES
    };

    try {
      const result = await dynamodb.scan(params).promise();
      return result.Items;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  // Get course by ID
  async getCourseById(courseId) {
    const params = {
      TableName: TABLES.COURSES,
      Key: {
        courseId
      }
    };

    try {
      const result = await dynamodb.get(params).promise();
      return result.Item;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  }

  // Update course
  async updateCourse(courseId, updateData) {
    const params = {
      TableName: TABLES.COURSES,
      Key: { courseId },
      UpdateExpression: 'set ',
      ExpressionAttributeValues: {},
      ExpressionAttributeNames: {},
      ReturnValues: 'ALL_NEW'
    };

    let prefix = 'set ';
    const attributes = Object.keys(updateData);

    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      const attributeValue = updateData[attribute];
      const attributeName = `#${attribute}`;
      const attributeValuePlaceholder = `:${attribute}`;

      params.UpdateExpression += `${prefix}${attributeName} = ${attributeValuePlaceholder}`;
      params.ExpressionAttributeValues[attributeValuePlaceholder] = attributeValue;
      params.ExpressionAttributeNames[attributeName] = attribute;
      prefix = ', ';
    }

    // Always update the updatedAt timestamp
    params.UpdateExpression += `${prefix}#updatedAt = :updatedAt`;
    params.ExpressionAttributeValues[':updatedAt'] = new Date().toISOString();
    params.ExpressionAttributeNames['#updatedAt'] = 'updatedAt';

    try {
      const result = await dynamodb.update(params).promise();
      return result.Attributes;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  // Delete course
  async deleteCourse(courseId) {
    const params = {
      TableName: TABLES.COURSES,
      Key: {
        courseId
      }
    };

    try {
      await dynamodb.delete(params).promise();
      return true;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }

  // Track user progress
  async updateUserProgress(userId, courseId, progress) {
    const params = {
      TableName: TABLES.USER_PROGRESS,
      Item: {
        userId,
        courseId,
        progress,
        lastAccessed: new Date().toISOString()
      }
    };

    try {
      await dynamodb.put(params).promise();
      return params.Item;
    } catch (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }
  }

  // Get user progress for a course
  async getUserProgress(userId, courseId) {
    const params = {
      TableName: TABLES.USER_PROGRESS,
      Key: {
        userId,
        courseId
      }
    };

    try {
      const result = await dynamodb.get(params).promise();
      return result.Item;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }
  }

  // Get all courses for a user with progress
  async getUserCourses(userId) {
    const params = {
      TableName: TABLES.USER_PROGRESS,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };

    try {
      const progress = await dynamodb.query(params).promise();
      const courseIds = progress.Items.map(item => item.courseId);
      
      // Get course details for each enrolled course
      const courses = await Promise.all(
        courseIds.map(courseId => this.getCourseById(courseId))
      );

      // Combine course details with progress
      return courses.map((course, index) => ({
        ...course,
        progress: progress.Items[index].progress,
        lastAccessed: progress.Items[index].lastAccessed
      }));
    } catch (error) {
      console.error('Error fetching user courses:', error);
      throw error;
    }
  }
}

module.exports = new CourseService(); 