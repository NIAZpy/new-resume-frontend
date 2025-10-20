import React from 'react';
import './AnalysisReport.css';

const AnalysisReport = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  const { executiveSummary, sectionScores, rewriteSuggestions } = analysis;

  return (
    <div className="analysis-report">
      <div className="report-section">
        <h3>Executive Summary</h3>
        <p><strong>Overall Score:</strong> {executiveSummary.overallScore}</p>
        <p><strong>Role Fit:</strong> {executiveSummary.roleFit}</p>
        <p><strong>ATS Readiness:</strong> {executiveSummary.atsReadiness}</p>
        <div className="summary-lists">
          <div>
            <h4>Strengths</h4>
            <ul>
              {executiveSummary.strengths.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h4>Risks</h4>
            <ul>
              {executiveSummary.risks.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h3>Section Scores</h3>
        {sectionScores.map((section, index) => (
          <div key={index} className="section-score-item">
            <p><strong>{section.title}:</strong> {section.score}</p>
            <p>{section.comment}</p>
          </div>
        ))}
      </div>

      <div className="report-section">
        <h3>Rewrite Suggestions</h3>
        {rewriteSuggestions.map((suggestion, index) => (
          <div key={index} className="rewrite-suggestion">
            <p><strong>Before:</strong> {suggestion.before}</p>
            <p><strong>After:</strong> {suggestion.after}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisReport;