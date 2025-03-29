import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "elearning-frontend/src/authConfig.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
