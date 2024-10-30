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
} from '@mui/material';

const ShowUploadedData = ({ uploadedFiles }) => {
  // Create an array to hold the table rows
  const tableRows = [];
  
  for (let i = 0; i < uploadedFiles.length; i++) {
    const file = uploadedFiles[i]; // Get the current file
    tableRows.push(
      <TableRow key={file.id}> {/* Use a unique key, like file.id */}
        <TableCell>{file.filename}</TableCell>
        <TableCell>{file.tags.join(', ')}</TableCell>
        <TableCell>{new Date(file.uploadedAt).toLocaleString()}</TableCell>
        <TableCell>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Uploaded Files
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Upload Date</TableCell>
            <TableCell>Shareable Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows} {/* Render the array of table rows */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowUploadedData;
