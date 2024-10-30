import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from '@mui/material';

const ShowUploadedData = (uploadedFiles) => {

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
                {uploadedFiles.map((file, index) => (
                  <TableRow key={index}>
                    <TableCell>{file.filename}</TableCell>
                    <TableCell>{file.tags.join(', ')}</TableCell>
                    <TableCell>{new Date(file.uploadedAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        View File
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
  );
};

export default ShowUploadedData;
