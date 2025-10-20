import React, { useState } from 'react';
import AnalysisReport from './AnalysisReport';
import './AnalyzeModal.css';

const AnalyzeModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const [jobRole, setJobRole] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

    const handleAnalyze = async () => {
    if (!file) {
      alert('Please upload a resume file first.');
      return;
    }
    setIsLoading(true);
    setAnalysis('');

        const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobRole', jobRole);

    try {
            const response = await fetch('/analyze', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to analyze resume.');
      }

      // The backend now sends a structured JSON object.
      setAnalysis(result.analysis.detailedFeedback);
    } catch (error) {
      setAnalysis(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content analyze-modal">
        <h2>Resume Analyzer</h2>
        <p>Upload your resume (PDF or DOCX) to get instant feedback on keywords, formatting, and clarity.</p>
        
                <div className="form-group">
          <label htmlFor="jobRole">Target Job Role (Optional)</label>
          <input
            type="text"
            id="jobRole"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Software Engineer"
          />
        </div>

        <div className="upload-area">
          <input type="file" onChange={handleFileChange} accept=".pdf,.docx" />
        </div>

        {analysis && (
          <div className="analysis-results">
            <AnalysisReport analysis={analysis} />
          </div>
        )}

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Close</button>
          <button onClick={handleAnalyze} className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeModal;
