import React from "react";
import { useMsal } from "@azure/msal-react";

function Logout() {
  const { instance } = useMsal();

  const handleLogout = async () => {
    await instance.logoutPopup();
    window.location.href = "/";
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
