import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Stack,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'; // Import Link
import { useLoginMutation } from '../../store/features/authApiSlice';
import { setAccessToken } from '../../store/features/baseSlice';
import { useAppDispatch } from '../../store/hooks';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const [loginData, { isError: errorCode, error: errorResp }] = useLoginMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    // Clear error and handle login logic here
    setError('');

    const loginResponse = await loginData({ email, password });
    if (loginResponse.data && loginResponse.data.accessToken) {
      dispatch(setAccessToken(loginResponse.data.accessToken));
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
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
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don’t have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'underline', color: 'blue' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
          {errorResp && errorCode && (
            <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
            {errorResp.data.error || 'Something went Wrong'}
          </Alert>
          )}
        </Paper>
      </Container>
    </Stack>
  );
}
