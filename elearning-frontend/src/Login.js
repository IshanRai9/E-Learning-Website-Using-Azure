import React from "react";
import { Auth } from 'aws-amplify';
import Layout from './components/Layout';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  useTheme
} from '@mui/material';
import {
  FaGoogle,
  FaFacebook,
  FaMicrosoft,
  FaLock
} from 'react-icons/fa';

function Login() {
  const theme = useTheme();

  const handleLogin = async (provider = 'cognito') => {
    try {
      await Auth.federatedSignIn({ provider });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <FaLock size={40} color={theme.palette.primary.main} />
              <Typography component="h1" variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                Welcome Back
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Sign in to continue your learning journey
              </Typography>
            </Box>

            {/* Social Login Buttons */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => handleLogin('Google')}
                  startIcon={<FaGoogle />}
                  sx={{
                    borderColor: '#DB4437',
                    color: '#DB4437',
                    '&:hover': {
                      borderColor: '#DB4437',
                      backgroundColor: 'rgba(219, 68, 55, 0.04)',
                    },
                  }}
                >
                  Continue with Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => handleLogin('Facebook')}
                  startIcon={<FaFacebook />}
                  sx={{
                    borderColor: '#4267B2',
                    color: '#4267B2',
                    '&:hover': {
                      borderColor: '#4267B2',
                      backgroundColor: 'rgba(66, 103, 178, 0.04)',
                    },
                  }}
                >
                  Continue with Facebook
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => handleLogin('Microsoft')}
                  startIcon={<FaMicrosoft />}
                  sx={{
                    borderColor: '#00A4EF',
                    color: '#00A4EF',
                    '&:hover': {
                      borderColor: '#00A4EF',
                      backgroundColor: 'rgba(0, 164, 239, 0.04)',
                    },
                  }}
                >
                  Continue with Microsoft
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ my: 3 }}>
              <Divider>
                <Typography color="text.secondary" variant="body2">
                  OR
                </Typography>
              </Divider>
            </Box>

            {/* Cognito Login Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => handleLogin()}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
              }}
            >
              Sign in with Email
            </Button>

            {/* Footer */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                By continuing, you agree to our{' '}
                <Typography
                  component="a"
                  href="#"
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Terms of Service
                </Typography>
                {' '}and{' '}
                <Typography
                  component="a"
                  href="#"
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Privacy Policy
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
}

export default Login;