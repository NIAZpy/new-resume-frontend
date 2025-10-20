import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/public-jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs.');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Perform filtering logic directly before rendering
  const filteredJobs = jobs.filter(job => {
    const searchMatch = searchTerm ? 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    
    const locationMatch = locationFilter ? 
      job.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;
      
    const jobTypeMatch = jobTypeFilter ? 
      job.jobType === jobTypeFilter : true;
      
    return searchMatch && locationMatch && jobTypeMatch;
  });

  // Group the filtered jobs for rendering
  const groupedJobs = filteredJobs.reduce((acc, job) => {
    const type = job.jobType || 'Other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(job);
    return acc;
  }, {});

  return (
    <div className="jobs-container">
      <h1>Available Positions</h1>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-input"
        />
        <select
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="filter-input"
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="job-listings">
          {filteredJobs.length > 0 ? (
            Object.entries(groupedJobs).map(([type, jobsInCategory]) => (
              <div key={type} className="job-category-section">
                <h2>{type}</h2>
                {jobsInCategory.map(job => (
                  <Link to={`/jobs/${job._id}`} key={job._id} className="job-card-link">
                    <div className="job-card">
                      <h3>{job.title}</h3>
                      <p className="job-company">{job.companyName}</p>
                      <p className="job-location">{job.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))
          ) : (
            <p>No job openings match your criteria. Please check back later.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;