import React from 'react';
import { UserAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const user = UserAuth();

  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  );
}
