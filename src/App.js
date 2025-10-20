import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './Register';
import CandidateRegister from './CandidateRegister';
import RecruiterRegister from './RecruiterRegister';
import RecruiterDashboard from './RecruiterDashboard';
import CandidateDashboard from './CandidateDashboard';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Jobs from './Jobs';
import JobDetails from './JobDetails';
import ResumeDisplay from './components/ResumeDisplay';
import Login from './Login';
import Navbar from './components/Navbar';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import useResumeStore from './stores/resumeStore';

// A new component to handle the root redirect logic
const HomeRedirect = () => {
  const token = localStorage.getItem('token');
  // If token exists, redirect to dashboard; otherwise, show the layout.
  return token ? <Navigate to="/dashboard" replace /> : <Layout />;
};

// This component handles the dashboard redirect logic
const DashboardRedirect = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.user.role;

    if (userRole === 'Admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'Recruiter') {
      return <Navigate to="/recruiter-dashboard" replace />;
    } else if (userRole === 'Candidate') {
      return <Navigate to="/candidate-dashboard" replace />;
    } else {
      // Fallback if role is not defined
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    // If token is invalid, redirect to login
    console.error('Invalid token:', error);
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const fetchMyResume = useResumeStore(state => state.fetchMyResume);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchMyResume();
    }
  }, [fetchMyResume]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* The root path now redirects logged-in users to their dashboard */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/candidate" element={<CandidateRegister />} />
          <Route path="/register/recruiter" element={<RecruiterRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/resume/:id" element={<ResumeDisplay />} />
          
          {/* The /dashboard route now intelligently redirects based on role */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
          <Route path="/candidate-dashboard" element={<ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />
          <Route path="/recruiter-dashboard" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;