   import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('');

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token).user : null;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/public-jobs/${id}`);
        if (!response.ok) {
          throw new Error('Job not found.');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchJobDetails();
  }, [id]);

  if (error) {
    return <div className="job-details-container"><p className="error-message">{error}</p></div>;
  }

  if (!job) {
    return <div className="job-details-container"><p>Loading...</p></div>;
  }

  const handleApply = async () => {
    setApplicationStatus('Applying...');
    try {
      const response = await fetch(`/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to apply.');
      }
      setApplicationStatus(data.msg);
    } catch (err) {
      setApplicationStatus(err.message);
    }
  };

  const renderSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;
    return (
      <>
        <h2>{title}</h2>
        {Array.isArray(content) ? (
          <ul>
            {content.map((item, index) => item && <li key={index}>{item}</li>)}
          </ul>
        ) : (
          <p>{content}</p>
        )}
      </>
    );
  };

  return (
    <div className="job-details-container">
      <div className="job-header">
        <div className="job-header-main">
          <h1>{job.jobTitle}</h1>
          <p className="company-name">{job.companyName}</p>
        </div>
        <div className="job-header-meta">
          {job.department && <span className="job-meta-item"><strong>Department:</strong> {job.department}</span>}
          {job.reportsTo && <span className="job-meta-item"><strong>Reports To:</strong> {job.reportsTo}</span>}
          <span className="job-meta-item"><strong>Location:</strong> {job.location}</span>
          <span className="job-meta-item"><strong>Type:</strong> {job.employmentType}</span>
        </div>
      </div>

      <div className="job-body">
        {renderSection('Job Summary', job.jobSummary)}
        {renderSection('Key Responsibilities', job.keyResponsibilities)}
        {renderSection('Required Qualifications', job.requiredQualifications)}
        {renderSection('Preferred Qualifications', job.preferredQualifications)}
        {renderSection('Core Competencies / Skills', job.coreCompetencies)}
        {renderSection('Work Environment / Schedule', job.workEnvironment)}
        {renderSection('Compensation and Benefits', job.compensationAndBenefits)}
        {renderSection('Application Instructions', job.applicationInstructions)}
      </div>

      {user && user.role === 'Candidate' && (
        <div className="apply-section">
          <button onClick={handleApply} className="btn-apply" disabled={!!applicationStatus}>
            {applicationStatus ? 'Processing...' : 'Apply Now'}
          </button>
          {applicationStatus && <p className="application-status">{applicationStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default JobDetails;