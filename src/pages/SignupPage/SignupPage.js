// pages/SignupPage/SignupPage.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useSignupMutation } from '../../store/features/authApiSlice'; // Update this according to your API slice
import { useAppDispatch } from '../../store/hooks';
import { setAccessToken } from '../../store/features/baseSlice';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useAppDispatch();

  const [signupData, { isError, error: errorResp }] = useSignupMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    setError('');
    setSuccessMessage('');

    const signupResponse = await signupData({ email, password });
    if (signupResponse.data && signupResponse.data.accessToken) {
      dispatch(setAccessToken(signupResponse.data.accessToken));
      setSuccessMessage('Signup successful! You can now log in.');
    }
  };

  return (
    <Stack
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{
      minHeight: {
        xs: 'calc(100vh)',
        marginTop: '-5rem',
      },
    }}
  >
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" component="h1" align="center">
          Signup
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="primary" variant="body2" align="center">
              {successMessage}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </Box>
        {errorResp && isError && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            {errorResp}
          </Alert>
        )}
      </Paper>
    </Container>
    </Stack>
  );
}
