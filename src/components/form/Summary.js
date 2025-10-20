import React from 'react';
import './Summary.css';

const Summary = ({ summary, setSummary }) => {
  return (
    <div className="summary-container">
      <h3>Summary</h3>
      <textarea
        placeholder="Write a brief summary of your career objectives and qualifications..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
    </div>
  );
};

export default Summary;
