import React, { useEffect } from "react";
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { useAuth } from './contexts/AuthContext';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await Auth.federatedSignIn();
    } catch (error) {
      console.error('Error initiating sign in:', error);
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
            textAlign: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Welcome Back
          </Typography>
          <Typography color="text.secondary" paragraph>
            Click below to sign in to your account
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              mt: 3,
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
            }}
          >
            Sign In
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

export default Login;