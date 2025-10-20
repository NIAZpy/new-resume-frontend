import React, { useState } from 'react';
import './PostJobModal.css';

const PostJobModal = ({ onClose, onJobPosted }) => {
  const [jobData, setJobData] = useState({
    jobTitle: '',
    department: '',
    reportsTo: '',
    location: '',
    employmentType: 'Full-time',
    jobSummary: '',
    keyResponsibilities: '',
    requiredQualifications: '',
    preferredQualifications: '',
    coreCompetencies: '',
    workEnvironment: '',
    compensationAndBenefits: '',
    applicationInstructions: '',
    companyName: '',
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          ...jobData,
          keyResponsibilities: jobData.keyResponsibilities.split('\n'),
          requiredQualifications: jobData.requiredQualifications.split('\n'),
          preferredQualifications: jobData.preferredQualifications.split('\n'),
          coreCompetencies: jobData.coreCompetencies.split('\n'),
        }),
      });
      const newJob = await response.json();
      if (response.ok) {
        alert('Job posted successfully!');
        onJobPosted(newJob);
        onClose();
      } else {
        alert(newJob.msg || 'Failed to post job.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('An error occurred while posting the job.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Post a New Job</h2>
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" name="jobTitle" value={jobData.jobTitle} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" name="companyName" value={jobData.companyName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" value={jobData.department} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Reports To</label>
            <input type="text" name="reportsTo" value={jobData.reportsTo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={jobData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Employment Type</label>
            <select name="employmentType" value={jobData.employmentType} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="form-group">
            <label>Job Summary</label>
            <textarea name="jobSummary" value={jobData.jobSummary} rows="3" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Key Responsibilities (one per line)</label>
            <textarea name="keyResponsibilities" value={jobData.keyResponsibilities} rows="5" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Required Qualifications (one per line)</label>
            <textarea name="requiredQualifications" value={jobData.requiredQualifications} rows="5" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Preferred Qualifications (one per line)</label>
            <textarea name="preferredQualifications" value={jobData.preferredQualifications} rows="3" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Core Competencies (one per line)</label>
            <textarea name="coreCompetencies" value={jobData.coreCompetencies} rows="3" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Work Environment</label>
            <input type="text" name="workEnvironment" value={jobData.workEnvironment} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Compensation and Benefits</label>
            <input type="text" name="compensationAndBenefits" value={jobData.compensationAndBenefits} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Application Instructions</label>
            <input type="text" name="applicationInstructions" value={jobData.applicationInstructions} onChange={handleChange} />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-submit">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobModal;
