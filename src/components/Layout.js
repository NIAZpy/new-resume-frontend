import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container centered-layout">
      <h1>Welcome to the Resume Builder</h1>
      <p>Please log in or register to start building your professional resume.</p>
      <div className="home-actions">
        <Link to="/jobs" className="btn-primary">View Jobs</Link>
        <Link to="/login" className="btn-secondary">Login / Register</Link>
      </div>
    </div>
  );
};

export default Layout;



