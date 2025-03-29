import React from "react";
import { useMsal } from "@azure/msal-react";

function Dashboard() {
  const { accounts } = useMsal();

  return (
    <div>
      <h1>Welcome, {accounts[0]?.name}</h1>
      <a href="/logout">Logout</a>
    </div>
  );
}

export default Dashboard;
