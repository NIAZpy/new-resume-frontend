import React from 'react';
import './ApplicantsModal.css';

const ApplicantsModal = ({ applicants, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content applicants-modal">
        <h2>Job Applicants</h2>
        {applicants.length > 0 ? (
          <table className="applicants-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Resume</th>
                <th>Application Date</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(app => (
                <tr key={app._id}>
                  <td>{app.candidate.username}</td>
                  <td>
                    {app.resume ? (
                      <a href={`/resume/${app.resume._id}`} target="_blank" rel="noopener noreferrer" className="btn-view-resume">
                        View Resume
                      </a>
                    ) : 'No Resume'}
                  </td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applicants for this job yet.</p>
        )}
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsModal;