import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  useTheme,
  TextField,
  Alert,
  Snackbar
} from '@mui/material';
import {
  FaGoogle,
  FaFacebook,
  FaMicrosoft,
  FaLock
} from 'react-icons/fa';

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider = 'cognito') => {
    try {
      setLoading(true);
      setError('');

      if (provider === 'cognito') {
        // Handle email/password login
        const user = await Auth.signIn(email, password);
        console.log('Logged in user:', user);
        navigate('/dashboard');
      } else {
        // Handle social login
        await Auth.federatedSignIn({ provider });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, marginBottom: 8 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
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

            {/* Email Login Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                }}
              >
                {loading ? 'Signing in...' : 'Sign in with Email'}
              </Button>
            </form>

            <Box sx={{ my: 3 }}>
              <Divider>
                <Typography color="text.secondary" variant="body2">
                  OR
                </Typography>
              </Divider>
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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

            {/* Footer */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Typography
                  component="a"
                  href="#"
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Layout>
  );
}

export default Login;