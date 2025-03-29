import { PublicClientApplication } from "@azure/msal-browser";
const msalConfig = {
  auth: {
    clientId: "310c4a66-3747-42a5-bbc5-a08c64103c9a",
    authority: "https://elearningb2c.b2clogin.com/372a529e-01fe-41d3-af0e-629c487c0be9.onmicrosoft.com/B2C_1_SignUpSignIn",
    redirectUri: "http://localhost:3000/auth/callback",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
