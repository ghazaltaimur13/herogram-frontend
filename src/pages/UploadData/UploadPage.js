import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Container,
  Typography,
  Box,
  TextField,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Stack,
  Paper,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useUploadFileMutation } from '../../store/features/fileApiSlice';
import ShowUploadedData from '../../components/ShowUploadedData';

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [uploadData, { isError, error, isSuccess, isLoading }] = useUploadFileMutation();

  const onDrop = (acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      tags: '',
    }));
    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleTagChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index].tags = event.target.value;
    setFiles(newFiles);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const uploadFiles = async () => {
    const formData = new FormData();

    files.forEach((fileObj, index) => {
      formData.append('files', fileObj.file);
      formData.append(`tags[${index}]`, fileObj.tags);
    });

    try {
      const response = await uploadData(formData).unwrap(); 

      if (response.message && Array.isArray(response.uploadedFiles)) {
        setUploadedFiles(response.uploadedFiles); // Only if it's in expected format
      } else {
        console.log("Unexpected response format:", response.data.uploadedFiles);
        setUploadedFiles([]); // fallback to empty if unexpected response
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,video/*',
  });

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: { xs: 'calc(100vh)', marginTop: '-5rem' },
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            File Upload with Tags
          </Typography>
          <Box
            {...getRootProps({ className: 'dropzone' })}
            sx={{
              border: '2px dashed #0087f7',
              borderRadius: '5px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="body1">
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {files.map((uploadedFile, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component={uploadedFile.file.type.startsWith('image/') ? 'img' : 'video'}
                    src={uploadedFile.preview}
                    controls={!uploadedFile.file.type.startsWith('image/')}
                    height="140"
                    alt={uploadedFile.file.name}
                  />
                  <CardContent>
                    <TextField
                      fullWidth
                      label="Add tags"
                      value={uploadedFile.tags}
                      onChange={(event) => handleTagChange(index, event)}
                    />
                    <IconButton
                      onClick={() => removeFile(index)}
                      color="error"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={uploadFiles}
            fullWidth
            sx={{ marginTop: 2 }}
            startIcon={isLoading && <CircularProgress size={16} />}
            disabled={isLoading || files.length === 0}
          >
            {isLoading ? "Uploading..." : "Upload Files"}
          </Button>
          {isError && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
              {error?.data?.message || "Failed to upload files."}
            </Alert>
          )}
          {isSuccess && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Uploaded Successfully
            </Alert>
          )}
          

        </Paper>
        {uploadedFiles.length > 0 && (
            <ShowUploadedData uploadedFiles={uploadedFiles} />
          )}
      </Container>
    </Stack>
  );
};

export default UploadPage;
