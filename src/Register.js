import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <div className="auth-container">
      <div className="role-selection-card">
        <h2>Join as a Candidate or Recruiter</h2>
        <div className="role-options">
          <Link to="/register/candidate" className="role-option">
            <h3>I'm a Candidate</h3>
            <p>Build and manage your resume.</p>
          </Link>
          <Link to="/register/recruiter" className="role-option">
            <h3>I'm a Recruiter</h3>
            <p>Post jobs and find talent.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;