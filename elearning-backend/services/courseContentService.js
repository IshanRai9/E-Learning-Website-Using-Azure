const { s3, dynamodb, COURSE_CONTENT_BUCKET, TABLES } = require('../config/aws');

class CourseContentService {
  // Upload course content (video/document) to S3
  async uploadContent(file, courseId, contentType) {
    const key = `${courseId}/${Date.now()}-${file.originalname}`;
    
    const uploadParams = {
      Bucket: COURSE_CONTENT_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    try {
      const uploadResult = await s3.upload(uploadParams).promise();
      
      // Store content metadata in DynamoDB
      const contentItem = {
        TableName: TABLES.COURSE_CONTENT,
        Item: {
          contentId: Date.now().toString(),
          courseId: courseId,
          type: contentType, // 'video' or 'document'
          title: file.originalname,
          s3Key: key,
          s3Url: uploadResult.Location,
          uploadedAt: new Date().toISOString()
        }
      };

      await dynamodb.put(contentItem).promise();
      return contentItem.Item;
    } catch (error) {
      console.error('Error uploading content:', error);
      throw error;
    }
  }

  // Get course content metadata
  async getCourseContent(courseId) {
    const params = {
      TableName: TABLES.COURSE_CONTENT,
      KeyConditionExpression: 'courseId = :courseId',
      ExpressionAttributeValues: {
        ':courseId': courseId
      }
    };

    try {
      const result = await dynamodb.query(params).promise();
      return result.Items;
    } catch (error) {
      console.error('Error fetching course content:', error);
      throw error;
    }
  }

  // Generate presigned URL for content viewing
  async getContentUrl(s3Key) {
    const params = {
      Bucket: COURSE_CONTENT_BUCKET,
      Key: s3Key,
      Expires: 3600 // URL expires in 1 hour
    };

    try {
      return await s3.getSignedUrlPromise('getObject', params);
    } catch (error) {
      console.error('Error generating content URL:', error);
      throw error;
    }
  }

  // Delete course content
  async deleteContent(courseId, contentId) {
    // First get the content item to get the S3 key
    const getParams = {
      TableName: TABLES.COURSE_CONTENT,
      Key: {
        courseId: courseId,
        contentId: contentId
      }
    };

    try {
      const content = await dynamodb.get(getParams).promise();
      if (!content.Item) {
        throw new Error('Content not found');
      }

      // Delete from S3
      await s3.deleteObject({
        Bucket: COURSE_CONTENT_BUCKET,
        Key: content.Item.s3Key
      }).promise();

      // Delete from DynamoDB
      await dynamodb.delete(getParams).promise();

      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  }
}

module.exports = new CourseContentService(); 