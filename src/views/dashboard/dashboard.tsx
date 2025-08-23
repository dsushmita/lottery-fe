// app/dashboard/page.tsx (for App Router)
// OR pages/dashboard.tsx (for Pages Router)

"use client";

import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      Hello Dashboard
    </div>
  );
};

export default Dashboard;