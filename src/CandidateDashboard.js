import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResumeForm from './components/ResumeForm';
import TemplateModal from './components/TemplateModal';
import useResumeStore from './stores/resumeStore';
import './CandidateDashboard.css';

const CandidateDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const resume = useResumeStore(state => state.resume);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/candidate/applications', {
          headers: { 'x-auth-token': token },
        });
        const data = await response.json();
        if (response.ok) {
          setAppliedJobs(data);
        }
      } catch (error) {
        console.error('Failed to fetch applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleEditResume = () => {
    document.querySelector('.resume-section').scrollIntoView({ behavior: 'smooth' });
    setIsDropdownOpen(false);
  };

  const handleDeleteResume = async () => {
    setIsDropdownOpen(false);
    if (window.confirm('Are you sure you want to delete your resume? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/resume', {
          method: 'DELETE',
          headers: { 'x-auth-token': token },
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.msg);
          window.location.reload();
        } else {
          alert(data.msg || 'Failed to delete resume.');
        }
      } catch (error) {
        console.error('Error deleting resume:', error);
        alert('An error occurred while deleting the resume.');
      }
    }
  };

  const handleChangeTemplate = () => {
    setIsTemplateModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleTemplateSelect = (templateId) => {
    useResumeStore.getState().updateTemplate(templateId);
    setIsTemplateModalOpen(false);
  };

  const handleViewResume = () => {
    setIsDropdownOpen(false);
    if (resume && resume._id) {
      window.open(`/resume/${resume._id}`, '_blank');
    } else {
      alert('Could not find your resume. Please create one first.');
    }
  };

  return (
    <div className="dashboard-container candidate-dashboard">
      <header className="dashboard-header">
        <h1>Candidate Dashboard</h1>
        <div className="header-actions">
          <div className="dropdown">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="btn-my-resume">My Resume</button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleViewResume}>View Resume</button>
                <button onClick={handleEditResume}>Edit Resume</button>
                <button onClick={handleChangeTemplate}>Change Template</button>
                <button onClick={handleDeleteResume} className="danger">Delete Resume</button>
              </div>
            )}
          </div>
          <Link to="/jobs" className="btn-find-jobs">Find New Jobs</Link>
        </div>
      </header>

      <div className="dashboard-content-split">
        <div className="resume-section">
          <h2>Your Resume</h2>
          <p>Keep your resume up-to-date to stand out to recruiters.</p>
          <ResumeForm existingResume={resume} />
        </div>

        <div className="applied-jobs-section">
          <h2>Your Applications</h2>
          <div className="applied-jobs-list">
            {appliedJobs.length > 0 ? (
              appliedJobs.map(app => (
                <div key={app._id} className="applied-job-card">
                  <h3>{app.job.jobTitle}</h3>
                  <p>{app.job.companyName} - {app.job.location}</p>
                  <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
                </div>
              ))
            ) : (
              <p>You haven't applied to any jobs yet. Use the 'Find New Jobs' button to start applying!</p>
            )}
          </div>
        </div>
      </div>

      {isTemplateModalOpen && 
        <TemplateModal 
          onClose={() => setIsTemplateModalOpen(false)} 
          onTemplateSelect={handleTemplateSelect} 
        />
      }
    </div>
  );
};

export default CandidateDashboard;