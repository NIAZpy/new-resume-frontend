import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnalyzeModal from './AnalyzeModal';
import './Navbar.css';

const Navbar = () => {
  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Resume Builder</Link>
        <div className="navbar-links">
          <button onClick={() => setIsAnalyzeModalOpen(true)} className="nav-button-secondary">Analyze Resume</button>
          {token ? (
            <button onClick={handleLogout} className="nav-button">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </nav>
      {isAnalyzeModalOpen && <AnalyzeModal onClose={() => setIsAnalyzeModalOpen(false)} />}
    </>
  );
};

export default Navbar;

