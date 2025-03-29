import React from "react";
import { useMsal } from "@azure/msal-react";

function Login() {
  const { instance } = useMsal();

  const handleLogin = async () => {
    await instance.loginPopup();
    window.location.href = "/dashboard";
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Sign in with Azure AD B2C</button>
    </div>
  );
}

export default Login;
