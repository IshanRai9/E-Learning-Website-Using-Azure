import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { FaFilePdf, FaUpload, FaTrash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

function CourseContentUpload({ courseId }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const { user } = useAuth();

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
  };

  const handleUpload = async () => {
    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contentType', 'pdf');

      try {
        const response = await fetch(`/api/course-content/${courseId}/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${user.signInUserSession.accessToken.jwtToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        setUploadProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setUploading(false);
    setFiles([]);
    setUploadProgress(0);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Course Materials
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id="pdf-upload"
          type="file"
          multiple
          onChange={handleFileSelect}
        />
        <label htmlFor="pdf-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<FaUpload />}
          >
            Select PDF Files
          </Button>
        </label>
      </Box>

      {files.length > 0 && (
        <>
          <List>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Button
                    onClick={() => removeFile(index)}
                    color="error"
                    startIcon={<FaTrash />}
                  >
                    Remove
                  </Button>
                }
              >
                <ListItemIcon>
                  <FaFilePdf />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                />
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
            sx={{ mt: 2 }}
          >
            Upload Files
          </Button>
        </>
      )}

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            {Math.round(uploadProgress)}%
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default CourseContentUpload; 