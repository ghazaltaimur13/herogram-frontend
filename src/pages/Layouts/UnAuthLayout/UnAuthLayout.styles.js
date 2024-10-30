import { styled, Grid2 as Grid, Box } from '@mui/material';

export const UnauthLayoutContainer = styled(Grid)({
  width: '100%',
  position: 'relative',
  height: '100%',
  paddingBottom: '5rem',
  background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient colors
});

export const PageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});
