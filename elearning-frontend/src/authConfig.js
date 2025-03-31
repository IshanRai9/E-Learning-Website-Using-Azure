import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "310c4a66-3747-42a5-bbc5-a08c64103c9a", // Replace with your Azure AD Client ID
    authority: "https://login.microsoftonline.com/372a529e-01fe-41d3-af0e-629c487c0be9", // Replace with your Tenant ID
    redirectUri: "http://localhost:3000", // Adjust if needed
  },
  cache: {
    cacheLocation: "sessionStorage", // Use "localStorage" if you want persistence
    storeAuthStateInCookie: false, // Recommended for browsers that block cookies
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
