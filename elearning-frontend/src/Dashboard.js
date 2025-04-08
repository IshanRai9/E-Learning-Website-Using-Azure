import React, { useState, useEffect } from "react";
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  }

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.attributes.email}</h1>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default Dashboard;