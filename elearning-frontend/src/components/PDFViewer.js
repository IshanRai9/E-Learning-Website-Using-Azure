import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  Box,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <IconButton 
          onClick={previousPage} 
          disabled={pageNumber <= 1}
        >
          <FaChevronLeft />
        </IconButton>
        <Typography sx={{ mx: 2, alignSelf: 'center' }}>
          Page {pageNumber} of {numPages}
        </Typography>
        <IconButton 
          onClick={nextPage} 
          disabled={pageNumber >= numPages}
        >
          <FaChevronRight />
        </IconButton>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        position: 'relative',
        minHeight: 500
      }}>
        {loading && (
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <CircularProgress />
          </Box>
        )}
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
        >
          <Page 
            pageNumber={pageNumber} 
            loading={null}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </Box>
    </Paper>
  );
}

export default PDFViewer; 