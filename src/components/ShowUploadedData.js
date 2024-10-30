import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Alert,
  Button
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { useTrackFileMutation } from '../store/features/fileApiSlice';

const ShowUploadedData = ({ uploadedFiles, isLoading, fetchError, isFetchError, setRefreshFiles }) => {
  const [trackFile] = useTrackFileMutation();

  const handleLinkClick = async (fileId, url) => {
    try {
      await trackFile(fileId).unwrap();
      setRefreshFiles(prev => !prev); // Trigger refetch of files
      window.open(url, '_blank', 'noopener,noreferrer'); // Open the link in a new tab
    } catch (error) {
      console.error("Failed to track file view:", error);
    }
  };

  const tableRows = uploadedFiles.map((file) => (
    <TableRow key={file.id}>
      <TableCell>{file.filename}</TableCell>
      <TableCell>{file.tags.join(', ')}</TableCell>
      <TableCell>{new Date(file.uploadedAt).toLocaleString()}</TableCell>
      <TableCell>{file.views}</TableCell>
      <TableCell>
        <Button
          onClick={(e) => {
            e.preventDefault(); // Prevent the default button behavior
            handleLinkClick(file.id, file.url);
          }}
          sx={{
            textDecoration: 'underline',
            color: 'primary.main',
            background: 'none',
            padding: 0,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          View File
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4, maxWidth: { xs: '100%', sm: '80%' } }}>
      <Typography variant="h6" align="center" gutterBottom sx={{ padding: '2rem'}}>
        Uploaded Files
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '150px' }}>
          <CircularProgress />
        </Box>
      ) : isFetchError && fetchError ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          {fetchError?.data?.message || "Failed to load files."}
        </Alert>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ccc'}}>
              <TableCell>File Name</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>File Views</TableCell>
              <TableCell>Shareable Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows} {/* Render the array of table rows */}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ShowUploadedData;
