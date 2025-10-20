import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostJobModal from './components/PostJobModal';
import ApplicantsModal from './components/ApplicantsModal';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJobApplicants, setSelectedJobApplicants] = useState([]);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);

    useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/jobs', {
          headers: {
            'x-auth-token': token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setJobs(data);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

    const handleJobPosted = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));
  };

  const handleViewApplicants = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/jobs/${jobId}/applications`, {
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSelectedJobApplicants(data);
        setIsApplicantsModalOpen(true);
      } else {
        alert(data.msg || 'Failed to fetch applicants.');
      }
    } catch (error) {
      console.error('Error fetching applicants:', error);
      alert('An error occurred while fetching applicants.');
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/jobs/${jobId}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': token,
          },
        });

        if (response.ok) {
          setJobs(jobs.filter(job => job._id !== jobId));
          alert('Job deleted successfully.');
        } else {
          const data = await response.json();
          alert(data.msg || 'Failed to delete job.');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('An error occurred while deleting the job.');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Recruiter Dashboard</h1>
        <button onClick={() => setIsModalOpen(true)} className="post-job-button">Post a New Job</button>
      </header>
      <main className="dashboard-main">
        <h2>Your Job Postings</h2>
        <div className="job-postings-list">
          {jobs.length === 0 ? (
            <p>You have no active job postings.</p>
          ) : (
            jobs.map(job => (
              <div key={job._id} className="job-posting-item">
                <div className="job-info">
                  <h3>{job.jobTitle}</h3>
                  <p>{job.companyName} - {job.location}</p>
                </div>
                <div className="job-actions">
                  <Link to={`/jobs/${job._id}`} className="btn-view">View</Link>
                  <button onClick={() => handleViewApplicants(job._id)} className="btn-view-applicants">View Applicants</button>
                  <button onClick={() => handleEdit(job)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(job._id)} className="btn-delete">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {isModalOpen && <PostJobModal onClose={() => setIsModalOpen(false)} onJobPosted={handleJobPosted} />}
      {isEditModalOpen && editingJob && 
        <PostJobModal 
          jobToEdit={editingJob} 
          onClose={() => setIsEditModalOpen(false)} 
          onJobUpdated={handleJobUpdated} 
        />
      }
      {isApplicantsModalOpen && 
        <ApplicantsModal 
          applicants={selectedJobApplicants} 
          onClose={() => setIsApplicantsModalOpen(false)} 
        />
      }
    </div>
  );
};

export default RecruiterDashboard;

