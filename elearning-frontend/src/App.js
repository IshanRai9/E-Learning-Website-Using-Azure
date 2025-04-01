import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "elearning-frontend/src/authConfig.js";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Logout from "./Logout";

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;
