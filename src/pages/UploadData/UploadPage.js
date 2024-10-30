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
import CloseIcon from '@mui/icons-material/Close';

import { useUploadFileMutation, useGetFilesQuery } from '../../store/features/fileApiSlice';
import ShowUploadedData from '../../components/ShowUploadedData';

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [refreshFiles, setRefreshFiles] = useState(false); // New state to control refetching

  const { data: filesData, error, isLoading: isFetchingFiles, isError: isFetchError, refetch } = useGetFilesQuery();
  const [uploadData, { isError, error: uploadError, isSuccess, isLoading }] = useUploadFileMutation();

  // Fetch uploaded files on component mount or when refreshFiles changes
  useEffect(() => {
    if (filesData) {
      setUploadedFiles(filesData);
    }
  }, [filesData]);
  useEffect(() => {
    refetch();
  }, [refreshFiles, refetch]); // Refetch when refreshFiles changes

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

      if (response.message) {
        refetch();
        setFiles([])
      } 
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,video/*',
  });

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: { xs: 'calc(100vh)', paddingTop: '1rem' },
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
            <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
              {uploadError?.data?.message || "Failed to upload files."}
            </Alert>
          )}
          {isSuccess && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Uploaded Successfully
            </Alert>
          )}
        </Paper>
      </Container>
      {isFetchingFiles ? (
        <CircularProgress />
      ) : (
        <ShowUploadedData
          uploadedFiles={uploadedFiles}
          isLoading={isFetchingFiles}
          fetchError={error}
          isFetchError={isFetchError}
          setRefreshFiles={setRefreshFiles} // Pass the setter to ShowUploadedData
        />
      )}
    </Stack>
  );
};

export default UploadPage;
