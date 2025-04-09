import React from "react";
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const handleLogin = async () => {
    try {
      // Opens the Cognito hosted UI for authentication
      await Auth.federatedSignIn();
      // The redirect to dashboard will be handled by the OAuth callback
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Sign in with AWS Cognito</button>
    </div>
  );
}

export default Login;