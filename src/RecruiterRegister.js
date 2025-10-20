import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterRegister.css';

const RecruiterRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    companyName: '',
    companyWebsite: '',
    industry: '',
    companySize: '',
    companyAddress: '',
    country: '',
    recruiterFullName: '',
    jobTitle: '',
    recruiterEmail: '',
    recruiterPhone: '',
    linkedInProfile: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role: 'Recruiter' }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        alert(data.msg || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form wide-form">
        <h2>Recruiter Registration</h2>
        
        <h4>Account Setup</h4>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>

        <h4>Company Information</h4>
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" name="companyName" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Company Website</label>
          <input type="text" name="companyWebsite" onChange={handleChange} />
        </div>

        <h4>Recruiter Contact Details</h4>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="recruiterFullName" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Job Title / Role</label>
          <input type="text" name="jobTitle" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="recruiterEmail" onChange={handleChange} required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RecruiterRegister;
